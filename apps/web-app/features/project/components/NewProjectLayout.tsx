"use client"

import { useState } from "react"
import { ProjectType } from "../types"
import type { WebAppFormData } from "../types"
import { StepSidebar } from "./StepSidebar"
import { StepContent } from "./StepContent"
import { ReviewSidebar } from "./reviewSidebar"
import { useWebAppForm } from "./steps/webApp/hooks"

export function NewProjectLayout() {
  const [type, setType] = useState<ProjectType | null>(null)
  const [step, setStep] = useState(1)

  const { formData, updateField, resetForm, canProceedToDetails, canProceedToReview } = useWebAppForm()

  const isReview = step === 4

  return (
    <div className="h-full flex overflow-hidden">

      <aside className="w-72 border-r h-full overflow-hidden">
        <StepSidebar type={type} step={step} />
      </aside>

      <main className="flex-1 overflow-y-auto ">
        <StepContent
          type={type}
          step={step}
          setType={setType}
          setStep={setStep}
          formData={formData}
          updateField={updateField}
          canProceedToDetails={canProceedToDetails}
          canProceedToReview={canProceedToReview}
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
