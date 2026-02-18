import { stepRegistry } from "../step.registry"
import { ProjectType } from "../types"

interface Props {
  type: ProjectType | null
  step: number
  setType: (type: ProjectType) => void
  setStep: (step: number) => void
}

export function StepContent({
  type,
  step,
  setType,
  setStep,
}: Props) {
  const StepComponent =
    type ? stepRegistry[type]?.[step] : stepRegistry.web_app[1]

  if (!StepComponent) return null

  return (
    <div className="flex-1 p-8">
      <StepComponent
        setType={setType}
        setStep={setStep}
      />
    </div>
  )
}
