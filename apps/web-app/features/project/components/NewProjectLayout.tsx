"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { ProjectType } from "../types"
import type { WebAppFormData } from "../types"
import { StepSidebar } from "./StepSidebar"
import { StepContent } from "./StepContent"
import { ReviewSidebar } from "./reviewSidebar"
import { useWebAppForm } from "./steps/webApp/hooks"
import { useGenerateProject } from "./steps/webApp/hooks"
import { useProjectAutoSave } from "./steps/webApp/hooks"
import { Loader2, CloudOff, Check } from "lucide-react"

export function NewProjectLayout() {
  const searchParams = useSearchParams()
  const resumeId = searchParams.get("projectId")

  const [type, setType] = useState<ProjectType | null>(null)
  const [step, setStep] = useState(1)

  const { formData, updateField, setFormData, resetForm, canProceedToDetails, canProceedToReview } = useWebAppForm()
  const { isLoading: isGenerating, error: generateError, result: generateResult, generate, clearError, setResult } = useGenerateProject()

  const {
    projectId,
    isSaving,
    isLoadingProject,
    loadError,
    loadProject,
  } = useProjectAutoSave({
    formData,
    type,
    step,
    generateResult,
  })

  // Resume existing project if projectId in URL
  useEffect(() => {
    if (resumeId) {
      loadProject(resumeId).then((data: any) => {
        if (data) {
          // Restore form state (bulk)
          if (data.form_data) {
            setFormData(data.form_data as WebAppFormData)
          }
          // Restore generated brief
          if (data.generated_brief) {
            setResult(data.generated_brief)
          }
          // Restore type (normalize DB values to match ProjectType keys)
          if (data.project_type) {
            const typeMap: Record<string, ProjectType> = {
              webapp: "web_app",
              web_app: "web_app",
              research: "research",
            }
            setType(typeMap[data.project_type] || "web_app")
          }
          // Restore step (last so UI renders with all data ready)
          if (data.current_step) {
            setStep(data.current_step)
          }
        }
      })
    }
  }, [resumeId])

  const isReview = step === 4

  // Loading state for resume
  if (isLoadingProject) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="animate-spin text-blue-500 size-10" />
          <p className="text-gray-500 text-sm">Loading project...</p>
        </div>
      </div>
    )
  }

  if (loadError) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <CloudOff className="text-red-400 size-10" />
          <p className="text-red-500 text-sm">{loadError}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full flex overflow-hidden">

      {!isReview && (
        <aside className="w-72 border-r h-full overflow-hidden">
          <StepSidebar type={type} step={step} />
        </aside>
      )}

      <main className="flex-1 overflow-y-auto relative">
        {/* Auto-save indicator */}
        {isSaving && (
          <div className="absolute top-3 right-4 flex items-center gap-2 text-xs text-gray-400 z-10">
            <Loader2 className="animate-spin size-3" />
            Saving...
          </div>
        )}
        {!isSaving && projectId && (
          <div className="absolute top-3 right-4 flex items-center gap-2 text-xs text-green-500 z-10">
            <Check className="size-3" />
            Saved
          </div>
        )}

        <StepContent
          type={type}
          step={step}
          setType={setType}
          setStep={setStep}
          formData={formData}
          updateField={updateField}
          canProceedToDetails={canProceedToDetails}
          canProceedToReview={canProceedToReview}
          onGenerate={generate}
          isGenerating={isGenerating}
          generateError={generateError}
          generateResult={generateResult}
        />
      </main>

      {isReview && (
        <aside className="w-80 border-l overflow-y-auto">
          <ReviewSidebar />
        </aside>
      )}

    </div>
  )
}
