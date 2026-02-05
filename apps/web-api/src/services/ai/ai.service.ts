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

const SYSTEM_PROMPTS: Record<AITaskType, string> = {
  generate_project_brief_draft: `You are a professional software project planner.
Generate a CONCISE Product Requirements Document (Draft Mode).
Output MUST be valid JSON with ONLY these sections:

{
  "title": "Project title",
  "overview": "Start immediately with 'A [platform type] designed for [audience] that enables [core value]'. No marketing fluff.",
  "targetAudience": {
    "primary": "Main user group",
    "secondary": "Secondary users (optional)",
    "admin": "Admin/operator users (optional)"
  },
  "platformCategory": "web/mobile/desktop/API",
  
  "problemStatement": {
    "painPoints": ["List 3 key pain points (concise)"],
    "businessImpact": "Brief bullet points (concise)"
  },
  
  "objectives": ["Objective 1", "Objective 2"],
  "successCriteria": [
    { "metric": "KPI", "target": "Target" }
  ],
  
  "keyFeatures": [
    {
      "name": "Feature name",
      "description": "Short description (1 sentence)",
      "priority": "Must/Should"
    }
  ],
  
  "recommendedTechStack": [
    { "category": "Category", "technology": "Tech", "reason": "Brief reason (1 sentence)" }
  ],
  
  "constraints": ["If user provided budget/timeline, use them. IF NOT provided, use '[To be determined]'"]
}

RULES:
- Overview: Concise elevator pitch (1 paragraph).
- Target Audience: Identify primary users.
- Key Features: Max 5 core features. NO User Stories or AC.
- Tech Stack: Max 3 main technologies.
- NO OTHER SECTIONS ALLOWED. Optimize for minimum tokens.`,

  generate_project_brief_polished: `You are a professional software project planner creating enterprise-grade PRDs.
Generate a COMPLETE Product Requirements Document based on user input.

Output MUST be valid JSON with ALL sections below:

{
  "title": "Project title",
  "overview": "Start immediately with 'A [platform type] designed for [audience] that enables [core value]'. No marketing fluff.",
  "targetAudience": {
    "primary": "Main user group",
    "secondary": "Secondary users (optional)",
    "admin": "Admin/operator users (optional)"
  },
  "platformCategory": "web/mobile/desktop/API",
  
  "problemStatement": {
    "painPoints": ["MUST include 3+ specific pain points with quantitative data (e.g., '15% loss', '5 hours/week') or concrete scenarios."],
    "businessImpact": "Use bullet points. Focus on tangible loss (revenue, time, opportunity) if not solved."
  },
  
  "objectives": ["Strategic objective 1", "Objective 2"],
  "successCriteria": [
    { "metric": "KPI name", "target": "Measurable target value" }
  ],
  
  "keyFeatures": [
    {
      "name": "Feature name",
      "description": "What it does",
      "priority": "Must/Should/Could/Won't",
      "userStory": "As a [role], I want [action] so that [benefit]",
      "acceptanceCriteria": ["Specific testable criteria 1", "Criteria 2"]
    }
  ],
  
  "userFlow": {
    "steps": ["Step 1: User does X", "Step 2: System responds Y"],
    "diagramDsl": "graph TD\\n  A[Start] --> B[Action]"
  },
  
  "srsModules": [
    {
      "moduleName": "Module name (e.g. Authentication)",
      "requirements": [
        {
          "id": "REQ-XXX-001",
          "userStory": "As a [role], I want...",
          "acceptanceCriteria": ["AC with specific numbers/limits"]
        }
      ]
    }
  ],
  
  "recommendedTechStack": [
    { "category": "Frontend/Backend/Database/etc", "technology": "Tech name", "reason": "Reasoning must be specific to THIS project's needs (e.g., 'chosen for real-time capabilities'). Max 2 sentences." }
  ],
  "nonFunctionalRequirements": {
    "security": ["Specific security requirement with method"],
    "performance": ["Response time < X ms", "Concurrent users: Y"],
    "scalability": ["Horizontal/vertical scaling approach"],
    "codeQuality": ["Test coverage %, linting rules"]
  },
  
  "scope": {
    "inScope": ["What IS included"],
    "outOfScope": ["What is NOT included"],
    "mvpFeatures": ["Minimum features for V1.0 launch"]
  },
  
  "risks": [
    { "risk": "Risk description", "type": "Technical/Business/Operational", "mitigation": "How to prevent/handle" }
  ],
  "assumptions": ["Pre-condition that must be true"],
  
  "clarificationLog": [
    { "date": "YYYY-MM-DD", "topic": "Technical Decision / Question", "advice": "Brief reasoning/advice given by AI" }
  ]
}

RULES:
- Overview: Concise elevator pitch.
- Key Features: EXTRACT ALL features mentioned in description + INFER implicit required features (e.g., Auth, Settings). Aim for 5-8 core features.
- SRS Modules: Generate 4-5 core modules based on Key Features.
- Tech Stack: Contextual reasoning, no generic pros/cons.
- Risks: Include Technical, Business, and Operational risks.
- Clarification Log: Simulate 2-3 key technical decisions or advice relevant to this project (e.g., 'Auth Strategy', 'Database Scaling'). Use current date.`,

  recover_json_error: `You are a JSON fixer.
User input is invalid JSON. Output VALID JSON.`,

  regenerate_section: `You are an expert Product Manager rewriting a specific section of a PRD.
    
INPUT:
1. Full Context: The entire PRD for context.
2. Target Section: The specific key to rewrite.
3. Instruction: User's specific request for changes.

OUTPUT:
- Return ONLY valid JSON content for THAT SPECIFIC SECTION.
- Do NOT return the full document.
- Do NOT wrap in markdown.
- MAINTAIN consistency with the rest of the document.`,

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

const MODELS = {
  FAST: "llama-3.1-8b-instant",
  QUALITY: "llama-3.3-70b-versatile",
};

export const aiService = {
  /**
   * Check if AI provider is available
   */
  isAvailable(): boolean {
    return groqProvider.isAvailable();
  },

  /**
   * Get provider name
   */
  getProviderName(): string {
    return "Groq (Hybrid: 8b/70b)";
  },

  /**
   * Generate Project Brief (Draft or Polished)
   */
  async generateProjectBrief(input: ProjectBriefInput): Promise<LLMResponse<ProjectBriefOutput>> {
    if (!this.isAvailable()) {
      throw new Error("AI provider is not configured");
    }

    const mode = input.mode || "draft";

    // Dynamic Model Selection
    // Draft -> Fast (8b)
    // Polished -> Quality (70b)
    const targetModel = mode === "polished" ? MODELS.QUALITY : MODELS.FAST;

    const taskType: AITaskType = mode === "polished"
      ? "generate_project_brief_polished"
      : "generate_project_brief_draft";

    const prompt = `
Project Name: ${input.projectName}
Description: ${input.projectDescription}
Target Audience: ${input.targetAudience || "Not specified"}
Key Features: ${input.keyFeatures?.join(", ") || "Not specified"}
Tech Stack Preference: ${input.techStack?.join(", ") || "Not specified"}
Budget: ${input.budget || "Not specified"}
Timeline: ${input.timeline || "Not specified"}

Generate the ${mode.toUpperCase()} PRD JSON based on the system prompt.
`;

    const response = await groqProvider.generate<ProjectBriefOutput>(
      prompt,
      SYSTEM_PROMPTS[taskType],
      targetModel
    );

    // Inject metadata into the content
    if (response.success && response.data) {
      response.data.metadata = {
        mode: mode,
        version: mode === "polished" ? 1.0 : 0.1,
        generatedAt: new Date().toISOString(),
        cost: mode === "polished" ? 4 : 2
      };
    }

    return response;
  },

  /**
   * Regenerate a specific section
   */
  async regenerateSection(
    fullContext: ProjectBriefOutput,
    sectionKey: string,
    instruction: string
  ): Promise<LLMResponse<any>> {
    if (!this.isAvailable()) {
      throw new Error("AI provider is not configured");
    }

    // Check the mode of the original project
    const projectMode = fullContext.metadata?.mode || "draft"; // Default to draft for legacy/unknown
    const currentVersion = fullContext.metadata?.version || (projectMode === "polished" ? 1.0 : 0.1);

    // Select model based on project mode (Anti-Cheat)
    const targetModel = projectMode === "polished" ? MODELS.QUALITY : MODELS.FAST;

    const prompt = `
FULL CONTEXT (JSON):
${JSON.stringify(fullContext, null, 2)}

TARGET SECTION: "${sectionKey}"

INSTRUCTION: ${instruction}

CRITICAL INSTRUCTION:
1. Analyze the 'problemStatement', 'objectives', and 'keyFeatures' from the FULL CONTEXT first.
2. Ensure your rewrite of "${sectionKey}" aligns perfectly with the rest of the document.
3. Do not contradict other sections.
4. Return ONLY the JSON value for this key.
`;

    const response = await groqProvider.generate<any>(
      prompt,
      SYSTEM_PROMPTS["regenerate_section"],
      targetModel
    );

    // Increment Version Metadata
    if (response.success && response.metadata) {
      // Calculate new version (e.g., 0.1 -> 0.2, 1.0 -> 1.1)
      const newVersion = parseFloat((currentVersion + 0.1).toFixed(1));

      // Return combined metadata (Provider Stats + Project Version)
      return {
        ...response,
        metadata: {
          ...response.metadata, // Keep model, tokensUsed
          version: newVersion,
          generatedAt: new Date().toISOString()
        }
      };
    }

    return response;
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

};
