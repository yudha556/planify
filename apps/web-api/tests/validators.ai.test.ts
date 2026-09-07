import { describe, it, expect } from "vitest";
import { generateProjectBriefSchema, generateDiagramSchema } from "../src/validators/ai.validator";

describe("generateProjectBriefSchema", () => {
  it("accepts minimal valid payload", () => {
    const result = generateProjectBriefSchema.safeParse({
      body: {
        projectName: "E-Commerce App",
        projectDescription: "A marketplace platform for small businesses",
      },
    });
    expect(result.success).toBe(true);
  });

  it("accepts full valid payload", () => {
    const result = generateProjectBriefSchema.safeParse({
      body: {
        projectName: "E-Commerce App",
        projectDescription: "A marketplace platform for small businesses",
        projectType: "webapp",
        documentStyle: "concise",
        keyFeatures: ["Cart", "Checkout"],
        techStack: ["Next.js"],
        includeDiagram: true,
      },
    });
    expect(result.success).toBe(true);
  });

  it("rejects missing projectName", () => {
    const result = generateProjectBriefSchema.safeParse({
      body: { projectDescription: "A marketplace platform for small businesses" },
    });
    expect(result.success).toBe(false);
  });

  it("rejects description shorter than 10 chars", () => {
    const result = generateProjectBriefSchema.safeParse({
      body: { projectName: "App", projectDescription: "short" },
    });
    expect(result.success).toBe(false);
  });

  it("rejects invalid projectType", () => {
    const result = generateProjectBriefSchema.safeParse({
      body: {
        projectName: "App",
        projectDescription: "A valid description here",
        projectType: "desktop",
      },
    });
    expect(result.success).toBe(false);
  });
});

describe("generateDiagramSchema", () => {
  it("accepts valid payload", () => {
    const result = generateDiagramSchema.safeParse({
      body: {
        projectName: "E-Commerce App",
        projectDescription: "A marketplace platform for small businesses",
        techStack: ["Next.js", "Supabase"],
      },
    });
    expect(result.success).toBe(true);
  });

  it("rejects missing fields", () => {
    const result = generateDiagramSchema.safeParse({ body: {} });
    expect(result.success).toBe(false);
  });
});
