"use client"

import { useState, useCallback, useEffect, useRef } from "react"
import { createProject, updateProject, getProjectById } from "../../../../../../services/project.service"
import type { WebAppFormData, ProjectType, GenerateProjectResponse } from "../../../../types"

interface UseProjectAutoSaveOptions {
    formData: WebAppFormData
    type: ProjectType | null
    step: number
    generateResult: GenerateProjectResponse | null
}

interface UseProjectAutoSaveReturn {
    projectId: string | null
    isSaving: boolean
    isLoadingProject: boolean
    loadError: string | null
    saveProject: () => Promise<void>
    loadProject: (id: string) => Promise<any>
    setProjectId: (id: string | null) => void
}

export function useProjectAutoSave({
    formData,
    type,
    step,
    generateResult,
}: UseProjectAutoSaveOptions): UseProjectAutoSaveReturn {
    const [projectId, setProjectId] = useState<string | null>(null)
    const [isSaving, setIsSaving] = useState(false)
    const [isLoadingProject, setIsLoadingProject] = useState(false)
    const [loadError, setLoadError] = useState<string | null>(null)
    const saveTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)
    const isResuming = useRef(false)

    /**
     * Load existing project from API
     */
    const loadProject = useCallback(async (id: string) => {
        setIsLoadingProject(true)
        setLoadError(null)
        isResuming.current = true

        try {
            const res = await getProjectById(id)
            if (res.success && res.data) {
                setProjectId(id)
                return res.data
            } else {
                setLoadError("Project not found")
                return null
            }
        } catch (e: any) {
            setLoadError(e.message || "Failed to load project")
            return null
        } finally {
            setIsLoadingProject(false)
            // Delay clearing resume flag so auto-save effects don't fire
            // during the state restore cycle
            setTimeout(() => {
                isResuming.current = false
            }, 3000)
        }
    }, [])

    /**
     * Create or update project in DB
     */
    const saveProject = useCallback(async () => {
        // Don't save if resuming or no project name yet
        if (isResuming.current) return
        if (!formData.projectName.trim()) return

        setIsSaving(true)

        try {
            if (projectId) {
                // Update existing
                await updateProject(projectId, {
                    title: formData.projectName,
                    description: formData.projectDescription,
                    projectType: type || "web_app",
                    currentStep: step,
                    formData: formData as any,
                    documentStyle: formData.documentStyle || "professional",
                    generatedBrief: generateResult || undefined,
                    status: generateResult ? "generated" : "draft",
                })
            } else {
                // Create new
                const res = await createProject({
                    title: formData.projectName,
                    description: formData.projectDescription,
                    projectType: type || "web_app",
                    documentStyle: formData.documentStyle || "professional",
                    formData: formData as any,
                    currentStep: step,
                })

                if (res.success && res.data) {
                    setProjectId((res.data as any).id)
                }
            }
        } catch (e: any) {
            console.error("Auto-save failed:", e.message)
            // Silent fail — don't block user
        } finally {
            setIsSaving(false)
        }
    }, [projectId, formData, step, generateResult, type])

    /**
     * Debounced auto-save: triggers 2s after last form change
     */
    useEffect(() => {
        // Skip during resume or if no project name
        if (isResuming.current) return
        if (!formData.projectName.trim()) return

        if (saveTimeout.current) {
            clearTimeout(saveTimeout.current)
        }

        saveTimeout.current = setTimeout(() => {
            saveProject()
        }, 2000)

        return () => {
            if (saveTimeout.current) {
                clearTimeout(saveTimeout.current)
            }
        }
    }, [formData, step])

    /**
     * Immediate save on step change
     */
    useEffect(() => {
        if (isResuming.current) return
        if (formData.projectName.trim() && step > 1) {
            saveProject()
        }
    }, [step])

    /**
     * Save when generate result comes in
     */
    useEffect(() => {
        if (isResuming.current) return
        if (generateResult && formData.projectName.trim()) {
            saveProject()
        }
    }, [generateResult])

    return {
        projectId,
        isSaving,
        isLoadingProject,
        loadError,
        saveProject,
        loadProject,
        setProjectId,
    }
}
