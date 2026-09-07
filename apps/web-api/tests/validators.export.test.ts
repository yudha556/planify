import { describe, it, expect } from "vitest";
import { exportPdfSchema, exportMarkdownSchema } from "../src/validators/export.validator";

describe("exportPdfSchema", () => {
  it("accepts title-only payload", () => {
    const result = exportPdfSchema.safeParse({ body: { title: "My Brief" } });
    expect(result.success).toBe(true);
  });

  it("accepts full brief payload", () => {
    const result = exportPdfSchema.safeParse({
      body: {
        title: "My Brief",
        overview: "Overview text",
        platformCategory: "webapp",
        objectives: ["Goal 1"],
        keyFeatures: [{ name: "Login" }],
        diagram: { diagram: "graph TD; A-->B;" },
      },
    });
    expect(result.success).toBe(true);
  });

  it("rejects missing title", () => {
    const result = exportPdfSchema.safeParse({ body: { overview: "No title" } });
    expect(result.success).toBe(false);
  });
});

describe("exportMarkdownSchema", () => {
  it("accepts title-only payload", () => {
    const result = exportMarkdownSchema.safeParse({ body: { title: "My Brief" } });
    expect(result.success).toBe(true);
  });

  it("rejects missing title", () => {
    const result = exportMarkdownSchema.safeParse({ body: {} });
    expect(result.success).toBe(false);
  });
});
