import { stepRegistry } from "../step.registry"
import { ProjectType } from "../types"
import type { WebAppFormData } from "../types"

interface Props {
  type: ProjectType | null
  step: number
  setType: (type: ProjectType) => void
  setStep: (step: number) => void
  formData: WebAppFormData
  updateField: <K extends keyof WebAppFormData>(field: K, value: WebAppFormData[K]) => void
  canProceedToDetails: boolean
  canProceedToReview: boolean
}

export function StepContent({
  type,
  step,
  setType,
  setStep,
  formData,
  updateField,
  canProceedToDetails,
  canProceedToReview,
}: Props) {
  const StepComponent =
    type ? stepRegistry[type]?.[step] : stepRegistry.web_app[1]

  if (!StepComponent) return null

  return (
    <div className="flex-1 p-8">
      <StepComponent
        setType={setType}
        setStep={setStep}
        formData={formData}
        updateField={updateField}
        canProceedToDetails={canProceedToDetails}
        canProceedToReview={canProceedToReview}
      />
    </div>
  )
}
