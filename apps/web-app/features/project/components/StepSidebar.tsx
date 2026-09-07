import { projectFlows } from "../flows.config"
import { ProjectType } from "../types"

interface Props {
  type: ProjectType | null
  step: number
}

export function StepSidebar({ type, step }: Props) {
  const baseStep = [
    {
      title: "Select Type",
      description: "Choose project category",
    },
  ]

  const steps = type ? (projectFlows[type] || projectFlows.web_app) : baseStep

  return (
    <div className="h-full flex flex-col shadow-md ">
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {steps.map((item, index) => {
          const stepNumber = index + 1
          const isActive = step === stepNumber
          const isCompleted = step > stepNumber

          return (
            <div key={index} className="flex items-start gap-4">
              <div
                className={`min-w-8 h-8 flex items-center justify-center rounded-full text-sm font-semibold
                  ${isActive
                    ? "bg-blue-600 text-white"
                    : isCompleted
                      ? "bg-green-500 text-white"
                      : "border border-gray-300 text-gray-500"
                  }
                `}
              >
                {isCompleted ? "✓" : stepNumber}
              </div>

              <div>
                <div
                  className={`font-medium ${isActive ? "text-blue-600" : "text-gray-800"
                    }`}
                >
                  {item.title}
                </div>
                <div className="text-sm text-gray-500">
                  {item.description}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
