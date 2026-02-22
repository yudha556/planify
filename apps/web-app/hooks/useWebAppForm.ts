"use client"

import { useState, useCallback } from "react"
import type { WebAppFormData, DocumentStyle, OutputLanguage, ProjectStatus } from "../features/project/types"

const initialFormData: WebAppFormData = {
    // Step 1
    projectType: null,
    projectStatus: null,

    // Step 2
    projectName: "",
    projectDescription: "",
    outputLanguage: "english",
    documentStyle: null,

    // Step 3
    targetAudience: "",
    primaryMetric: "",
    keyFeatures: "",
    outOfScope: "",
    techStack: [],
    integrationRequirements: "",
    knownConstraints: "",
}

export function useWebAppForm() {
    const [formData, setFormData] = useState<WebAppFormData>(initialFormData)

    const updateField = useCallback(
        <K extends keyof WebAppFormData>(field: K, value: WebAppFormData[K]) => {
            setFormData((prev) => ({ ...prev, [field]: value }))
        },
        []
    )

    const resetForm = useCallback(() => {
        setFormData(initialFormData)
    }, [])

    // Validasi step 2 — minimal projectName dan documentStyle harus ada
    const canProceedToDetails =
        formData.projectName.trim() !== "" && formData.documentStyle !== null

    // Validasi step 3 — minimal targetAudience dan keyFeatures
    const canProceedToReview =
        formData.targetAudience.trim() !== "" && formData.keyFeatures.trim() !== ""

    return {
        formData,
        updateField,
        resetForm,
        canProceedToDetails,
        canProceedToReview,
    }
}
