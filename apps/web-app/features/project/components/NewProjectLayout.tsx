"use client"

import { useState } from "react"
import { ProjectType } from "../types"
import { StepSidebar } from "./StepSidebar"
import { StepContent } from "./StepContent"

export function NewProjectLayout() {
  const [type, setType] = useState<ProjectType | null>(null)
  const [step, setStep] = useState(1)

  return (
    <div className="flex w-full h-full overflow-x-hidden">
        <div className="sticky min-h-full flex">

      <StepSidebar type={type} step={step} />
        </div>
      <StepContent
        type={type}
        step={step}
        setType={setType}
        setStep={setStep}
      />
    </div>
  )
}
