"use client"

import { useState, useCallback } from "react"
import { generateProjectBrief } from "../../../../services/project.service"
import type { WebAppFormData, GenerateProjectInput, GenerateProjectResponse } from "../../../../types"

interface UseGenerateProjectReturn {
    isLoading: boolean
    error: string | null
    result: GenerateProjectResponse | null
    generate: (formData: WebAppFormData, mode?: "draft" | "polished", includeDiagram?: boolean) => Promise<void>
    clearError: () => void
    clearResult: () => void
}

export function useGenerateProject(): UseGenerateProjectReturn {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [result, setResult] = useState<GenerateProjectResponse | null>(null)

    const generate = useCallback(
        async (
            formData: WebAppFormData,
            mode: "draft" | "polished" = "draft",
            includeDiagram: boolean = false
        ) => {
            setIsLoading(true)
            setError(null)

            try {
                const input: GenerateProjectInput = {
                    projectName: formData.projectName,
                    projectDescription: formData.projectDescription,
                    projectType: formData.projectType || "webapp",
                    targetAudience: formData.targetAudience || undefined,
                    keyFeatures: formData.keyFeatures || undefined,
                    techStack: formData.techStack.length > 0 ? formData.techStack : undefined,
                    mode,
                    includeDiagram,
                }

                const response = await generateProjectBrief(input)

                if (response.success && response.data) {
                    setResult(response.data)
                } else {
                    setError(response.message || "Failed to generate project brief")
                }
            } catch (err: any) {
                setError(err.message || "An unexpected error occurred")
            } finally {
                setIsLoading(false)
            }
        },
        []
    )

    const clearError = useCallback(() => setError(null), [])
    const clearResult = useCallback(() => setResult(null), [])

    return {
        isLoading,
        error,
        result,
        generate,
        clearError,
        clearResult,
    }
}
