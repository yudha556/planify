/**
 * ============================================
 * AI SERVICE TYPES
 * Types for LLM integration
 * ============================================
 */

// Supported task types for AI generation
export type AITaskType =
    | "generate_project_brief"
    | "generate_srs"
    | "generate_technical_overview"
    | "generate_architecture_diagram"
    | "generate_roadmap";

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
}

// Output from project brief generation
export interface ProjectBriefOutput {
    title: string;
    overview: string;
    objectives: string[];
    targetAudience: string;
    keyFeatures: {
        name: string;
        description: string;
    }[];
    constraints: string[];
    successCriteria: string[];
    recommendedTechStack: {
        category: string;
        technology: string;
        reason: string;
    }[];
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
    metadata?: {
        model: string;
        tokensUsed?: number;
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
