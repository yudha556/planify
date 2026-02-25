/**
 * ============================================
 * AI SERVICE TYPES
 * Types for LLM integration
 * ============================================
 */

// Supported task types for AI generation
export type AITaskType =
    | "generate_project_brief_draft"
    | "generate_project_brief_polished"
    | "generate_srs"
    | "generate_technical_overview"
    | "generate_architecture_diagram"
    | "generate_roadmap";

// Document style (replaces draft/polished mode)
export type DocumentStyle = "professional" | "formal" | "concise";

// Project types for multi-domain support
export type ProjectType = "webapp" | "mobile" | "research" | "enterprise";

// Input for project brief generation
export interface ProjectBriefInput {
    projectName: string;
    projectDescription: string;
    projectType?: ProjectType; // Determines prompt strategy
    documentStyle?: DocumentStyle; // professional/formal/concise (replaces mode)
    outputLanguage?: string; // e.g. "English", "Indonesia"
    projectStatus?: string; // e.g. "New Idea", "In Progress", "Maintenance"
    targetAudience?: string;
    keyFeatures?: string[];
    techStack?: string[];
    primaryMetric?: string;
    outOfScope?: string;
    integrationRequirements?: string;
    knownConstraints?: string;
    includeDiagram?: boolean;
    budget?: string;
    timeline?: string;
}

// Output from project brief generation (Full 10-Section PRD)
export interface ProjectBriefOutput {
    // === Section 1: Executive Summary ===
    title: string;
    overview: string; // elevator pitch
    targetAudience: {
        primary: string;
        secondary?: string;
        admin?: string;
    };
    platformCategory: string; // web/mobile/desktop/API

    // === Section 2: Problem Statement ===
    problemStatement: {
        painPoints: string[];
        businessImpact: string; // cost of inaction
    };

    // === Section 3: Goals & Success Criteria ===
    objectives: string[];
    successCriteria: {
        metric: string;
        target: string;
    }[];

    // === Section 4: Features (MoSCoW) ===
    keyFeatures: {
        name: string;
        description: string;
        priority: "Must" | "Should" | "Could" | "Won't";
        userStory?: string;
        acceptanceCriteria?: string[];
    }[];

    // === Section 5: User Flow ===
    userFlow?: {
        steps: string[];
        diagramDsl?: string; // Mermaid flowchart
    };

    // === Section 6: SRS (Software Requirements Specification) ===
    srsModules?: {
        moduleName: string;
        requirements: {
            id: string; // e.g. "REQ-AUTH-001"
            userStory: string;
            acceptanceCriteria: string[];
        }[];
    }[];

    // === Section 7: Technical Architecture ===
    recommendedTechStack: {
        category: string;
        technology: string;
        reason: string;
    }[];
    nonFunctionalRequirements?: {
        security: string[];
        performance: string[];
        scalability: string[];
        codeQuality?: string[];
    };

    // === Section 8: Scope & MVP ===
    scope?: {
        inScope: string[];
        outOfScope: string[];
        mvpFeatures: string[];
    };

    // === Section 9: Risks & Assumptions ===
    risks?: {
        risk: string;
        type: "Technical" | "Business";
        mitigation: string;
    }[];
    assumptions?: string[];

    // === Section 10: AI Clarification Log ===
    clarificationLog: {
        date: string;
        topic: string;
        advice: string;
    }[];

    // === Architecture Diagram (Optional) ===
    diagram?: {
        diagram: string;
        description: string;
        diagramType: string;
    };

    // === Research Document Fields (Optional) ===
    abstract?: string;
    researchQuestions?: string[] | { question: string; type?: string }[];
    methodology?: {
        approach: string;
        population?: string;
        dataCollection?: {
            methods?: string[];
            instruments?: string[];
        };
        dataAnalysis?: {
            techniques?: string[];
            tools?: string[];
            software?: string | string[];
        };
    };
    expectedOutcomes?: string[] | { outcome: string; indicator?: string }[];
    timeline?: {
        phases?: {
            name?: string;
            phase?: string;
            duration?: string;
            weeks?: string;
            activities?: string[] | string;
            description?: string;
        }[];
    };
    variables?: {
        name?: string;
        variable?: string;
        type?: string;
        indicators?: string[] | string;
    }[];
    hypotheses?: string[] | { hypothesis?: string; statement?: string }[];
}

// Input for diagram generation
export interface DiagramInput {
    projectName: string;
    projectDescription: string;
    projectType?: ProjectType;
    techStack?: string[];
}

// Output from diagram generation
export interface DiagramOutput {
    diagram: string; // Mermaid DSL
    description: string;
    diagramType: string;
}

// Generic LLM request
export interface LLMRequest {
    task: AITaskType;
    input: Record<string, any>;
    options?: {
        temperature?: number;
        maxTokens?: number;
    };
}

// Generic LLM response
export interface LLMResponse<T = any> {
    success: boolean;
    data?: T;
    error?: string;
    metadata?: {
        model: string;
        tokensUsed?: number;
        inputTokens?: number;
        outputTokens?: number;
        processingTime?: number;
        keyIndex?: number;
    };
}

// Provider interface - all LLM providers must implement this
export interface LLMProvider {
    name: string;
    generate<T>(prompt: string, systemPrompt?: string): Promise<LLMResponse<T>>;
    isAvailable(): boolean;
}

// Key rotation state
export interface KeyState {
    key: string;
    index: number;
    isRateLimited: boolean;
    rateLimitResetAt?: Date;
}
