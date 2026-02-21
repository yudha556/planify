export type ProjectType = "web_app" | "research"

export type DocumentStyle = "profesional" | "formal" | "concise"
export type OutputLanguage = "english" | "indonesia"
export type ProjectStatus = "new_idea" | "in_progress" | "maintenance"

export interface WebAppFormData {
    // Step 1 - Select Type
    projectType: ProjectType | null
    projectStatus: ProjectStatus | null

    // Step 2 - Project Info
    projectName: string
    projectDescription: string
    outputLanguage: OutputLanguage
    documentStyle: DocumentStyle | null

    // Step 3 - Details & Scope
    targetAudience: string
    primaryMetric: string
    keyFeatures: string
    outOfScope: string
    techStack: string[]
    integrationRequirements: string
    knownConstraints: string
}

export interface GenerateProjectInput {
    projectName: string
    projectDescription: string
    projectType: string
    targetAudience?: string
    keyFeatures?: string
    techStack?: string[]
    mode?: "draft" | "polished"
    includeDiagram?: boolean
}

export interface GenerateProjectResponse {
    overview?: any
    problemStatement?: any
    objectives?: any
    keyFeatures?: any
    userFlow?: any
    srsModules?: any
    recommendedTechStack?: any
    scope?: any
    risks?: any
    clarificationLog?: any
    diagram?: any
}
