import { describe, it, expect } from "vitest";
import { registerSchema, loginSchema } from "../src/validators/auth.validator";

describe("registerSchema", () => {
  it("accepts valid register payload", () => {
    const result = registerSchema.safeParse({
      body: { email: "user@example.com", password: "securePassword123", name: "John Doe" },
    });
    expect(result.success).toBe(true);
  });

  it("accepts payload without optional name", () => {
    const result = registerSchema.safeParse({
      body: { email: "user@example.com", password: "securePassword123" },
    });
    expect(result.success).toBe(true);
  });

  it("rejects invalid email format", () => {
    const result = registerSchema.safeParse({
      body: { email: "not-an-email", password: "securePassword123" },
    });
    expect(result.success).toBe(false);
  });

  it("rejects password shorter than 8 chars", () => {
    const result = registerSchema.safeParse({
      body: { email: "user@example.com", password: "short" },
    });
    expect(result.success).toBe(false);
  });

  it("rejects missing email and password", () => {
    const result = registerSchema.safeParse({ body: {} });
    expect(result.success).toBe(false);
  });
});

describe("loginSchema", () => {
  it("accepts valid login payload", () => {
    const result = loginSchema.safeParse({
      body: { email: "user@example.com", password: "securePassword123" },
    });
    expect(result.success).toBe(true);
  });

  it("rejects invalid email format", () => {
    const result = loginSchema.safeParse({
      body: { email: "invalid", password: "securePassword123" },
    });
    expect(result.success).toBe(false);
  });

  it("rejects empty password", () => {
    const result = loginSchema.safeParse({
      body: { email: "user@example.com", password: "" },
    });
    expect(result.success).toBe(false);
  });
});
