import { describe, it, expect, vi, beforeEach } from "vitest";
import { errorHandler } from "../src/middlewares/error.middleware";
import { AppError, ErrorCodes } from "../src/utils/app-error";

function mockRes() {
  const res: any = {};
  res.status = vi.fn().mockReturnValue(res);
  res.json = vi.fn().mockReturnValue(res);
  return res;
}

describe("errorHandler", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("handles AppError with its status code and error code", () => {
    const res = mockRes();
    const err = new AppError("Email already registered", 400, ErrorCodes.AUTH_EMAIL_EXISTS);
    errorHandler(err, { reqId: "test-1" } as any, res, (() => {}) as any);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        success: false,
        message: "Email already registered",
        code: "AUTH_EMAIL_EXISTS",
      })
    );
  });

  it("handles ZodError-shaped errors with 400 VALIDATION_ERROR", () => {
    const res = mockRes();
    const err: any = new Error("Validation failed");
    err.name = "ZodError";
    err.errors = [{ field: "body.email", message: "Invalid email format" }];
    errorHandler(err, { reqId: "test-2" } as any, res, (() => {}) as any);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ success: false, code: ErrorCodes.VALIDATION_ERROR })
    );
  });

  it("handles unknown errors with 500 INTERNAL_ERROR", () => {
    const res = mockRes();
    errorHandler(new Error("Something broke"), { reqId: "test-3" } as any, res, (() => {}) as any);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ success: false, code: ErrorCodes.INTERNAL_ERROR })
    );
  });

  it("respects custom status on unknown errors", () => {
    const res = mockRes();
    const err: any = new Error("Too many");
    err.status = 429;
    err.code = "RATE_LIMIT_EXCEEDED";
    errorHandler(err, {} as any, res, (() => {}) as any);
    expect(res.status).toHaveBeenCalledWith(429);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ success: false, code: "RATE_LIMIT_EXCEEDED" })
    );
  });
});
