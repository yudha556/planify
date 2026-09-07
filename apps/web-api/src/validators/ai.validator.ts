import { z } from "zod";

export const generateProjectBriefSchema = z.object({
  body: z.object({
    projectName: z.string().min(1, "Project name is required").max(200),
    projectDescription: z.string().min(10, "Description must be at least 10 characters").max(5000),
    projectType: z.enum(["webapp", "mobile", "research", "enterprise"]).optional(),
    documentStyle: z.enum(["professional", "formal", "concise"]).optional(),
    outputLanguage: z.string().optional(),
    projectStatus: z.string().optional(),
    targetAudience: z.string().optional(),
    keyFeatures: z.array(z.string()).optional(),
    techStack: z.array(z.string()).optional(),
    primaryMetric: z.string().optional(),
    outOfScope: z.string().optional(),
    integrationRequirements: z.string().optional(),
    knownConstraints: z.string().optional(),
    includeDiagram: z.boolean().optional(),
  }),
});

export const generateDiagramSchema = z.object({
  body: z.object({
    projectName: z.string().min(1, "Project name is required").max(200),
    projectDescription: z.string().min(10, "Description must be at least 10 characters").max(5000),
    techStack: z.array(z.string()).optional(),
    projectType: z.enum(["webapp", "mobile", "research", "enterprise"]).optional(),
  }),
});