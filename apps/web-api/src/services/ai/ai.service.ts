/**
 * ============================================
 * AI SERVICE
 * Main service for LLM operations
 * ============================================
 */

import { groqProvider } from "./providers/groq.provider";
import {
  LLMResponse,
  ProjectBriefInput,
  ProjectBriefOutput,
  DiagramInput,
  DiagramOutput,
  DocumentStyle,
} from "./types";
import { getPrompt, getAvailableTypes, ProjectType } from "./prompts";

// Diagram prompt for Apps (Web/Mobile)
const ARCH_DIAGRAM_PROMPT = `You are a software architect. Generate a Mermaid diagram for system architecture.
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
6. Keep it simple: 5-10 nodes max.`;

// Diagram prompt for Research (Conceptual Framework)
const RESEARCH_DIAGRAM_PROMPT = `You are an academic research consultant. Generate a Mermaid diagram for a Conceptual Framework.
Output MUST be valid JSON:
{
  "diagram": "graph TD\\n  A[Independent Variable] -->|influences| B[Mediating Variable]\\n  B --> C[Dependent Variable]",
  "description": "Brief description of the conceptual framework and relationships",
  "diagramType": "conceptual"
}
Key Rules for Mermaid:
1. Start with "graph TD" or "graph LR".
2. Use ONLY standard arrows: "-->", "---", "-.->".
3. Labels on arrows should describe relationships like: "A -->|influences| B".
4. Show key variables: Independent, Dependent, Mediating, Moderating.
5. Use plain text for node labels without special characters.
6. Keep it simple: 5-8 nodes max.`;

export const aiService = {
  /**
   * Generate a project brief based on user input
   * @param input.documentStyle - "professional" | "formal" | "concise"
   * @param input.projectType - "webapp" | "mobile" | "research" | "enterprise"
   */
  async generateProjectBrief(
    input: ProjectBriefInput
  ): Promise<LLMResponse<ProjectBriefOutput>> {
    const documentStyle: DocumentStyle = input.documentStyle || "professional";
    const projectType: ProjectType = input.projectType || "webapp";

    // Get the appropriate prompt from registry
    const promptConfig = getPrompt(projectType, documentStyle);

    // Build style instruction
    let styleInstruction = "";
    switch (documentStyle) {
      case "formal":
        styleInstruction = "Use strict academic/corporate structure. Provide EXTREMELY detailed, comprehensive descriptions. Include quantitative data where applicable. SRS modules are REQUIRED.";
        break;
      case "concise":
        styleInstruction = "Keep it brief, direct, and action-oriented. Short descriptions only. Optimize for minimum tokens. STRICTLY FOLLOW the concise JSON schema.";
        break;
      case "professional":
      default:
        styleInstruction = "Use standard business tone with balanced detail. Professional but not overly verbose.";
        break;
    }

    // Build language instruction
    const languageInstruction = input.outputLanguage && input.outputLanguage.toLowerCase() !== "english"
      ? `IMPORTANT: Generate ALL text content in ${input.outputLanguage}. All descriptions, pain points, user stories, and advice must be written in ${input.outputLanguage}.`
      : "";

    // Build project status context
    const statusContext = input.projectStatus
      ? `**Project Status:** ${input.projectStatus} (adjust maturity level and tone accordingly — e.g., "New Idea" = exploratory, "In Progress" = focused refinements, "Maintenance" = stability/optimization focus)`
      : "";

    const prompt = `
Generate a project brief for:

**Project Name:** ${input.projectName}
**Description:** ${input.projectDescription}
${input.targetAudience ? `**Target Audience:** ${input.targetAudience}` : ""}
${statusContext}
${input.primaryMetric ? `**Primary Success Metric:** ${input.primaryMetric}` : ""}
${input.budget ? `**Budget:** ${input.budget}` : ""}
${input.timeline ? `**Timeline:** ${input.timeline}` : ""}
${input.keyFeatures?.length ? `**Key Features:** ${input.keyFeatures.join(", ")}` : ""}
${input.techStack?.length ? `**Technology Stack:** ${input.techStack.join(", ")}` : ""}
${input.outOfScope ? `**Out of Scope:** ${input.outOfScope}` : ""}
${input.integrationRequirements ? `**Integration Requirements:** ${input.integrationRequirements}` : ""}
${input.knownConstraints ? `**Known Constraints:** ${input.knownConstraints}` : ""}

${styleInstruction}
${languageInstruction}
    `.trim();

    return groqProvider.generate<ProjectBriefOutput>(
      prompt,
      promptConfig.systemPrompt
    );
  },

  /**
   * Generate diagram (Architecture for Apps, Conceptual Framework for Research)
   */
  async generateDiagram(
    input: DiagramInput
  ): Promise<LLMResponse<DiagramOutput>> {
    const isResearch = input.projectType === 'research';

    const prompt = isResearch
      ? `
Generate a Conceptual Framework diagram for this research:

**Title:** ${input.projectName}
**Description:** ${input.projectDescription}

Create a diagram showing the relationships between key variables (independent, dependent, mediating, moderating).
For the "description" field: Explain the theoretical basis for the relationships shown.
      `.trim()
      : `
Generate a system architecture diagram for:

**Project:** ${input.projectName}
**Description:** ${input.projectDescription}
${input.techStack?.length ? `**Tech Stack:** ${input.techStack.join(", ")}` : ""}

Create a simple, clear architecture diagram showing main components and their relationships.
For the "description" field: Provide a professional architectural summary explaining WHY specific components were chosen.
      `.trim();

    const systemPrompt = isResearch ? RESEARCH_DIAGRAM_PROMPT : ARCH_DIAGRAM_PROMPT;

    return groqProvider.generate<DiagramOutput>(
      prompt,
      systemPrompt
    );
  },

  /**
   * Get all available project types
   */
  getProjectTypes() {
    return getAvailableTypes();
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
