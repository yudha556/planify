import { describe, it, expect } from "vitest";
import {
  createProjectSchema,
  updateProjectSchema,
  getProjectSchema,
  deleteProjectSchema,
} from "../src/validators/project.validator";

const VALID_UUID = "123e4567-e89b-12d3-a456-426614174000";

describe("createProjectSchema", () => {
  it("accepts minimal valid payload (title only)", () => {
    const result = createProjectSchema.safeParse({ body: { title: "App A" } });
    expect(result.success).toBe(true);
  });

  it("accepts full valid payload", () => {
    const result = createProjectSchema.safeParse({
      body: {
        title: "App A",
        description: "Desc",
        projectType: "mobile",
        documentStyle: "formal",
        formData: { step1: "done" },
        currentStep: 3,
      },
    });
    expect(result.success).toBe(true);
  });

  it("rejects missing title", () => {
    const result = createProjectSchema.safeParse({ body: {} });
    expect(result.success).toBe(false);
  });

  it("rejects invalid projectType", () => {
    const result = createProjectSchema.safeParse({
      body: { title: "App A", projectType: "desktop" },
    });
    expect(result.success).toBe(false);
  });

  it("rejects currentStep out of range", () => {
    const result = createProjectSchema.safeParse({
      body: { title: "App A", currentStep: 99 },
    });
    expect(result.success).toBe(false);
  });
});

describe("updateProjectSchema", () => {
  it("accepts valid params + partial body", () => {
    const result = updateProjectSchema.safeParse({
      params: { id: VALID_UUID },
      body: { title: "New title", status: "published" },
    });
    expect(result.success).toBe(true);
  });

  it("rejects non-UUID id", () => {
    const result = updateProjectSchema.safeParse({
      params: { id: "not-a-uuid" },
      body: { title: "New title" },
    });
    expect(result.success).toBe(false);
  });

  it("rejects invalid status value", () => {
    const result = updateProjectSchema.safeParse({
      params: { id: VALID_UUID },
      body: { status: "deleted" },
    });
    expect(result.success).toBe(false);
  });
});

describe("getProjectSchema / deleteProjectSchema", () => {
  it("accepts valid UUID param", () => {
    expect(getProjectSchema.safeParse({ params: { id: VALID_UUID } }).success).toBe(true);
    expect(deleteProjectSchema.safeParse({ params: { id: VALID_UUID } }).success).toBe(true);
  });

  it("rejects non-UUID param", () => {
    expect(getProjectSchema.safeParse({ params: { id: "abc" } }).success).toBe(false);
    expect(deleteProjectSchema.safeParse({ params: { id: "abc" } }).success).toBe(false);
  });
});
