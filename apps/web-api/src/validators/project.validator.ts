import { z } from "zod";

export const createProjectSchema = z.object({
  body: z.object({
    title: z.string().min(1, "Title is required").max(200),
    description: z.string().max(2000).optional(),
    projectType: z.enum(["webapp", "mobile", "research", "enterprise"]).optional(),
    documentStyle: z.enum(["professional", "formal", "concise"]).optional(),
    formData: z.record(z.any()).optional(),
    currentStep: z.number().int().min(1).max(10).optional(),
  }),
});

export const updateProjectSchema = z.object({
  params: z.object({
    id: z.string().uuid("Invalid project ID"),
  }),
  body: z.object({
    title: z.string().min(1).max(200).optional(),
    description: z.string().max(2000).optional(),
    projectType: z.enum(["webapp", "mobile", "research", "enterprise"]).optional(),
    currentStep: z.number().int().min(1).max(10).optional(),
    formData: z.record(z.any()).optional(),
    generatedBrief: z.record(z.any()).nullable().optional(),
    documentStyle: z.enum(["professional", "formal", "concise"]).optional(),
    status: z.enum(["draft", "published", "archived"]).optional(),
  }),
});

export const getProjectSchema = z.object({
  params: z.object({
    id: z.string().uuid("Invalid project ID"),
  }),
});

export const deleteProjectSchema = z.object({
  params: z.object({
    id: z.string().uuid("Invalid project ID"),
  }),
});