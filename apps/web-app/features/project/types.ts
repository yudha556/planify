export type ProjectType = "web_app" | "research"

export type DocumentStyle = "professional" | "formal" | "concise"
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
    documentStyle?: string
    outputLanguage?: string
    projectStatus?: string
    targetAudience?: string
    primaryMetric?: string
    keyFeatures?: string
    techStack?: string[]
    outOfScope?: string
    integrationRequirements?: string
    knownConstraints?: string
    includeDiagram?: boolean
}

export interface GenerateProjectResponse {
    title?: string
    overview?: any
    targetAudience?: any
    problemStatement?: any
    objectives?: any
    successCriteria?: any
    keyFeatures?: any
    userFlow?: any
    srsModules?: any
    recommendedTechStack?: any
    nonFunctionalRequirements?: any
    scope?: any
    risks?: any
    assumptions?: any
    clarificationLog?: any
    diagram?: any
    [key: string]: any  // Allow any additional fields from AI
}
