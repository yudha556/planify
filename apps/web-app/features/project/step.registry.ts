import { SelectTypeStep } from "./components/steps/SelectTypeStep"
import { ProjectInfoStep } from "./components/steps/webApp/ProjectInfoStep"
import { DetailsScopeStep } from "./components/steps/webApp/DetailsScopeStep"
import { ResearchDetailsStep } from "./components/steps/research/ResearchDetailsStep"
import { ConfigurationStep } from "./components/steps/research/ConfigurationStep"
import { ReviewStep } from "./components/steps/ReviewStep"

import type { ProjectType } from "./types"

type StepComponent = React.ComponentType<any>

type StepMap = {
  [key: number]: StepComponent
}

export const stepRegistry: Record<ProjectType, StepMap> = {
  web_app: {
    1: SelectTypeStep,
    2: ProjectInfoStep,
    3: DetailsScopeStep,
    4: ReviewStep,
  },
  research: {
    1: SelectTypeStep,
    2: ResearchDetailsStep,
    3: ConfigurationStep,
    4: ReviewStep,
  },
}
