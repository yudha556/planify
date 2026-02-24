import { stepRegistry } from "../step.registry"
import { ProjectType } from "../types"
import type { WebAppFormData, GenerateProjectResponse } from "../types"

interface Props {
  type: ProjectType | null
  step: number
  setType: (type: ProjectType) => void
  setStep: (step: number) => void
  formData: WebAppFormData
  updateField: <K extends keyof WebAppFormData>(field: K, value: WebAppFormData[K]) => void
  canProceedToDetails: boolean
  canProceedToReview: boolean
  onGenerate: (formData: WebAppFormData, includeDiagram?: boolean) => Promise<void>
  isGenerating: boolean
  generateError: string | null
  generateResult: GenerateProjectResponse | null
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
  onGenerate,
  isGenerating,
  generateError,
  generateResult,
}: Props) {
  const StepComponent =
    type ? (stepRegistry[type]?.[step] || stepRegistry.web_app[step]) : stepRegistry.web_app[1]

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
        onGenerate={onGenerate}
        isGenerating={isGenerating}
        generateError={generateError}
        generateResult={generateResult}
      />
    </div>
  )
}
