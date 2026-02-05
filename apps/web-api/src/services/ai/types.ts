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
    | "regenerate_section"
    | "generate_srs"
    | "generate_technical_overview"
    | "generate_architecture_diagram"
    | "generate_roadmap"
    | "recover_json_error";

// Generation mode
export type GenerationMode = "draft" | "polished";

// Input for project brief generation
export interface ProjectBriefInput {
    projectName: string;
    projectDescription: string;
    targetAudience?: string;
    keyFeatures?: string[];
    techStack?: string[];
    mode?: GenerationMode; // draft = concise, polished = detailed
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

    // === Metadata ===
    metadata?: {
        mode: GenerationMode;
        version: number;
        generatedAt: string;
        cost?: number;
    };

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
}

// Input for diagram generation
export interface DiagramInput {
    projectName: string;
    projectDescription: string;
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
    metadata: {
        model: string;
        tokensUsed?: number;
        processingTime?: number;
        keyIndex?: number;
        [key: string]: any; // Allow custom metadata
    };
}

// Provider interface - all LLM providers must implement this
export interface LLMProvider {
    name: string;
    generate<T>(prompt: string, systemPrompt?: string, model?: string): Promise<LLMResponse<T>>;
    isAvailable(): boolean;
}

// Key rotation state
export interface KeyState {
    key: string;
    index: number;
    isRateLimited: boolean;
    rateLimitResetAt?: Date;
}
