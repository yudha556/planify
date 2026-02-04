/**
 * ============================================
 * AI SERVICE
 * Main service for LLM operations
 * ============================================
 */

import { groqProvider } from "./providers/groq.provider";
import {
    AITaskType,
    LLMResponse,
    ProjectBriefInput,
    ProjectBriefOutput,
    DiagramInput,
    DiagramOutput,
} from "./types";

// System prompts for different tasks
const SYSTEM_PROMPTS: Record<AITaskType, string> = {
    generate_project_brief: `You are a professional software project planner.
Generate a project brief based on user input. Be concise and avoid over-explanation.
Output MUST be valid JSON:
{
  "title": "Project title",
  "overview": "1-2 paragraph overview",
  "objectives": ["objective 1", "objective 2"],
  "targetAudience": "Who will use this",
  "keyFeatures": [
    { "name": "Feature name", "description": "Brief description" }
  ],
  "constraints": ["constraint 1"],
  "successCriteria": ["criteria 1"],
  "recommendedTechStack": [
    { "category": "Frontend/Backend/Database", "technology": "Tech name", "reason": "Brief reason" }
  ]
}
Keep descriptions short but informative. Max 3-5 items per array.`,

    generate_srs: `You are a software requirements analyst.
Generate a Software Requirements Specification based on input.
Output valid JSON with sections, requirements, and acceptance criteria.`,

    generate_technical_overview: `You are a technical architect.
Generate a technical overview document based on project requirements.
Output valid JSON with architecture decisions, tech stack rationale, and considerations.`,

    generate_architecture_diagram: `You are a software architect. Generate a Mermaid diagram for system architecture.
Output MUST be valid JSON:
{
  "diagram": "graph TD\\n  A[Client] -->|HTTPS| B[API]\\n  B --> C[Database]",
  "description": "Brief description of the architecture",
  "diagramType": "flowchart"
}
Key Rules for Mermaid:
1. Start with "graph TD" or "graph LR".
2. Use ONLY standard arrows: "-->", "---", "-.->".
3. DO NOT use complex arrows like "-->|text|>" or "<-->".
4. Labels on arrows must be like: "A -->|Label| B".
5. Use plain text for node labels without special characters.
6. Keep it simple: 5-10 nodes max.`,

    generate_roadmap: `You are a project manager.
Generate a project roadmap with milestones and timelines.
Output valid JSON with phases, milestones, and dependencies.`,
};

export const aiService = {
    /**
     * Generate a project brief based on user input
     * @param input.mode - "draft" (concise) or "polished" (detailed)
     */
    async generateProjectBrief(
        input: ProjectBriefInput
    ): Promise<LLMResponse<ProjectBriefOutput>> {
        const mode = input.mode || "draft";

        const modeInstruction = mode === "polished"
            ? "Provide EXTREMELY detailed, professional, and comprehensive descriptions. Elaborate on every section. Key features must have deep technical explanations. Tech stack recommendations can include alternatives but must include trade-off analysis."
            : "Keep it concise. Short descriptions only.";

        const prompt = `
Generate a project brief for:

**Project Name:** ${input.projectName}
**Description:** ${input.projectDescription}
${input.targetAudience ? `**Target Audience:** ${input.targetAudience}` : ""}
${input.keyFeatures?.length ? `**Key Features:** ${input.keyFeatures.join(", ")}` : ""}
${input.techStack?.length ? `**Technology Stack:** ${input.techStack.join(", ")}` : ""}

${modeInstruction}
    `.trim();

        return groqProvider.generate<ProjectBriefOutput>(
            prompt,
            SYSTEM_PROMPTS.generate_project_brief
        );
    },

    /**
     * Generate architecture diagram (Mermaid DSL)
     */
    async generateDiagram(
        input: DiagramInput
    ): Promise<LLMResponse<DiagramOutput>> {
        const prompt = `
Generate a system architecture diagram for:

**Project:** ${input.projectName}
**Description:** ${input.projectDescription}
${input.techStack?.length ? `**Tech Stack:** ${input.techStack.join(", ")}` : ""}

Create a simple, clear architecture diagram showing main components and their relationships.
For the "description" field: Provide a professional architectural summary explaining WHY specific components were chosen (e.g. why load balancer, why queue, why separation). This caption will be used in an executive report.
    `.trim();

        return groqProvider.generate<DiagramOutput>(
            prompt,
            SYSTEM_PROMPTS.generate_architecture_diagram
        );
    },

    /**
     * Check if AI service is available
     */
    isAvailable(): boolean {
        return groqProvider.isAvailable();
    },

    /**
     * Get provider name
     */
    getProviderName(): string {
        return groqProvider.name;
    },
};
