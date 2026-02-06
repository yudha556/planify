import { Card } from "@workspace/ui/components/card";
import {
  ArrowRight,
  Badge,
  Check,
  FileText,
  GitMerge,
  ListTodo,
} from "lucide-react";

export default function Feature() {
  return (
    <div className="px-4 sm:px-8 md:px-14 py-14 md:py-30 flex flex-col w-full gap-8 md:gap-12">
      <div className="w-full items-center justify-between">
        <div className="flex flex-col gap-2 md:gap-4">
          <h1 className="text-2xl sm:text-3xl font-bold">
            Professional Output Every Time
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-500">
            From quick brief to detailed technical specifications.
          </p>
        </div>

        {/* <Badge */}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 w-full mt-6 md:mt-10 gap-4 md:gap-8">
        <Card className="p-3 md:p-4 flex flex-col gap-4 md:gap-8">
          <div className="w-10 h-10 flex items-center justify-center rounded-sm bg-gray-300">
            <FileText className="text-blue-500" />
          </div>
          <div className="flex flex-col gap-2">
            <h1 className="font-bold text-lg md:text-xl">Project Briefs</h1>
            <p className="text-xs md:text-sm text-gray-500">
              Define the core problems, goals, scope, and stakeholders in a
              concise on-page format.
            </p>
          </div>

          <Card className="bg-gray-200 p-3 md:p-4 flex flex-col gap-2 md:gap-3">
            <h1 className="font-semibold text-base md:text-lg">
              Brief structure
            </h1>
            <div className="flex flex-row gap-2 items-center">
              <Check className="text-green-500 size-4 md:size-5" />
              <p className="text-xs md:text-sm">Project Overview</p>
            </div>
            <div className="flex flex-row gap-2 items-center">
              <Check className="text-green-500 size-4 md:size-5" />
              <p className="text-xs md:text-sm">Target Audience</p>
            </div>
            <div className="flex flex-row gap-2 items-center">
              <Check className="text-green-500 size-4 md:size-5" />
              <p className="text-xs md:text-sm">Key Metrics</p>
            </div>
          </Card>
        </Card>
        <Card className="p-3 md:p-4 flex flex-col gap-4 md:gap-8">
          <div className="w-10 h-10 flex items-center justify-center rounded-sm bg-gray-300">
            <ListTodo className="text-blue-500" />
          </div>
          <div className="flex flex-col gap-2">
            <h1 className="font-bold text-lg md:text-xl">
              Feature Prioritization
            </h1>
            <p className="text-xs md:text-sm text-gray-500">
              Structured MoSCoW view that keeps discussions focused on impact,
              not opinions.
            </p>
          </div>

          <Card className="bg-gray-200 p-3 md:p-4 flex flex-col gap-2 md:gap-3">
            <h1 className="font-semibold text-base md:text-lg">
              Brief structure
            </h1>
            <div className="flex flex-row gap-2 items-center justify-between">
              <p className="text-xs md:text-md text-gray-500">
                User Authentication
              </p>
              <p className="text-xs md:text-md text-gray-500 font-semibold">
                MUST
              </p>
            </div>
            <div className="flex flex-row gap-2 items-center justify-between">
              <p className="text-xs md:text-md text-gray-500">
                Onboarding Checklist
              </p>
              <p className="text-xs md:text-md text-gray-500 font-semibold">
                SHOULD
              </p>
            </div>
            <div className="flex flex-row gap-2 items-center justify-between">
              <p className="text-xs md:text-md text-gray-500">Dark Mode</p>
              <p className="text-xs md:text-md text-gray-500 font-semibold">
                COULD
              </p>
            </div>
          </Card>
        </Card>
        <Card className="p-3 md:p-4 flex flex-col gap-4 md:gap-8">
          <div className="w-10 h-10 flex items-center justify-center rounded-sm bg-gray-300">
            <GitMerge className="text-blue-500" />
          </div>
          <div className="flex flex-col gap-2">
            <h1 className="font-bold text-lg md:text-xl">User Flows</h1>
            <p className="text-xs md:text-sm text-gray-500">
              High-level user journeys from entry to success, ready to share
              with design and engineering.
            </p>
          </div>

          <Card className="bg-gray-200 p-3 md:p-4 flex flex-row gap-1 md:gap-2 items-center min-h-32 md:min-h-38">
            <div className="bg-white shadow-md rounded-sm w-full px-1 items-center justify-center flex">
              <p className="text-xs md:text-sm text-gray-500">Landing</p>
            </div>
            <div className="bg-white shadow-md rounded-sm w-full px-1 items-center justify-center flex">
              <p className="text-xs md:text-sm text-gray-500">Dashboard</p>
            </div>
            <div className="bg-white shadow-md rounded-sm w-full px-1 items-center justify-center flex">
              <p className="text-xs md:text-sm text-gray-500">Create PRD</p>
            </div>
          </Card>
        </Card>
      </div>
    </div>
  );
}
