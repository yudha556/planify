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
 * Delete a project
 * DELETE /projects/:id
 */
export async function deleteProject(id: string) {
    return apiClient(`/projects/${id}`, {
        method: "DELETE",
    })
}

/**
 * Export project to PDF
 * POST /pdf/generate
 */
export async function exportPdf(input: {
    content: any
    diagramImage?: string
}) {
    return apiClient("/pdf/generate", {
        method: "POST",
        body: input,
    })
}

/**
 * Export project to Markdown
 * POST /markdown/generate
 */
export async function exportMarkdown(input: {
    content: any
    diagramImage?: string
}) {
    return apiClient("/markdown/generate", {
        method: "POST",
        body: input,
    })
}