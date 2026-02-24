/**
 * ============================================
 * PROJECT SERVICE
 * API calls for project-related endpoints
 * ============================================
 */

import { apiClient } from "./api"
import type { GenerateProjectInput, GenerateProjectResponse } from "../features/project/types"

/**
 * Generate Project Brief via AI
 * POST /ai/project-brief
 */
export async function generateProjectBrief(input: GenerateProjectInput) {
    return apiClient<GenerateProjectResponse>("/ai/project-brief", {
        method: "POST",
        body: input,
    })
}

/**
 * Regenerate a specific section of a document
 * POST /ai/regenerate-section
 */
export async function regenerateSection(input: {
    currentContent: any
    section: string
    instruction: string
}) {
    return apiClient("/ai/regenerate-section", {
        method: "POST",
        body: input,
    })
}

/**
 * Get user's coin balance
 * GET /ai/coins
 */
export async function getCoins() {
    return apiClient<{ coins: number }>("/ai/coins")
}

/**
 * Get list of user's projects
 * GET /projects
 */
export async function getProjects() {
    return apiClient("/projects")
}

/**
 * Get project detail by ID
 * GET /projects/:id
 */
export async function getProjectById(id: string) {
    return apiClient(`/projects/${id}`)
}

/**
 * Create a new project
 * POST /projects
 */
export async function createProject(input: {
    title: string
    description?: string
    projectType?: string
    documentStyle?: string
    formData?: Record<string, any>
    currentStep?: number
}) {
    return apiClient("/projects", {
        method: "POST",
        body: input,
    })
}

/**
 * Update project (auto-save)
 * PUT /projects/:id
 */
export async function updateProject(id: string, input: {
    title?: string
    description?: string
    projectType?: string
    currentStep?: number
    formData?: Record<string, any>
    generatedBrief?: Record<string, any> | null
    documentStyle?: string
    status?: string
}) {
    return apiClient(`/projects/${id}`, {
        method: "PUT",
        body: input,
    })
}

/**
 * Delete a project
 * DELETE /projects/:id
 */
export async function deleteProject(id: string) {
    return apiClient(`/projects/${id}`, {
        method: "DELETE",
    })
}

/**
 * Get user's activity history
 * GET /history?limit=&offset=
 */
export async function getHistory(limit: number = 20, offset: number = 0) {
    return apiClient(`/history?limit=${limit}&offset=${offset}`)
}

/**
 * Export project to PDF
 * POST /pdf/brief
 */
export async function exportPdf(briefData: any) {
    return apiClient("/pdf/brief", {
        method: "POST",
        body: briefData,
    })
}

/**
 * Export project to Markdown
 * POST /markdown/brief
 */
export async function exportMarkdown(briefData: any) {
    return apiClient("/markdown/brief", {
        method: "POST",
        body: briefData,
    })
}
