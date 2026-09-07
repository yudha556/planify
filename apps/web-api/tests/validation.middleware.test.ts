import { describe, it, expect, vi } from "vitest";
import { validate } from "../src/middlewares/validation.middleware";
import { loginSchema } from "../src/validators/auth.validator";

function mockReq(body: unknown) {
  return { body, query: {}, params: {} } as any;
}

describe("validate middleware", () => {
  it("calls next() with no args on valid payload", async () => {
    const next = vi.fn();
    await validate(loginSchema)(
      mockReq({ email: "user@example.com", password: "secret123" }),
      {} as any,
      next
    );
    expect(next).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledWith();
  });

  it("calls next(err) with ZodError shape on invalid payload", async () => {
    const next = vi.fn();
    await validate(loginSchema)(mockReq({ email: "bad", password: "" }), {} as any, next);
    expect(next).toHaveBeenCalledTimes(1);
    const err = next.mock.calls[0][0];
    expect(err.name).toBe("ZodError");
    expect(err.message).toBe("Validation failed");
    expect(Array.isArray(err.errors)).toBe(true);
    expect(err.errors.length).toBeGreaterThan(0);
    expect(err.errors[0]).toHaveProperty("field");
    expect(err.errors[0]).toHaveProperty("message");
  });
});
