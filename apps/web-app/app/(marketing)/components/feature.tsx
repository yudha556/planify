import { Card } from "@workspace/ui/components/card";
import { ArrowRight, Badge, Check, FileText, GitMerge, ListTodo } from "lucide-react";

export default function Feature() {
  return (
    <div className="px-14 py-30 flex flex-col w-full gap-12">
      <div className="w-full items-center justify-between">
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold">Professional Output Every Time</h1>
          <p className="text-xl text-gray-500">
            From quick brief to detailed technical specifications.
          </p>
        </div>

        {/* <Badge */}
      </div>

      <div className="flex flex-row items-center justify-between w-full mt-10 gap-8">
        <Card className="p-4 flex flex-col gap-8">
          <div className="w-10 h-10 flex items-center justify-center rounded-sm bg-gray-300">
            <FileText className="text-blue-500" />
          </div>
          <div className="flex flex-col gap-2">
            <h1 className="font-bold text-xl">Project Briefs</h1>
            <p className="text-sm text-gray-500">
              Define the core problems, goals, scope, and stakeholders in a
              concise on-page format.
            </p>
          </div>

          <Card className="bg-gray-200 p-4 flex flex-col gap-3">
            <h1 className="font-semibold text-lg">Brief structure</h1>
            <div className="flex flex-row gap-2 items-center">
                <Check className="text-green-500 size-5" />
                <p className="text-sm">Project Overview</p>
            </div>
            <div className="flex flex-row gap-2 items-center">
                <Check className="text-green-500 size-5" />
                <p className="text-sm">Target Audience</p>
            </div>
            <div className="flex flex-row gap-2 items-center">
                <Check className="text-green-500 size-5" />
                <p className="text-sm">Key Metrics</p>
            </div>
          </Card>
        </Card>
        <Card className="p-4 flex flex-col gap-8">
          <div className="w-10 h-10 flex items-center justify-center rounded-sm bg-gray-300">
            <ListTodo className="text-blue-500" />
          </div>
          <div className="flex flex-col gap-2">
            <h1 className="font-bold text-xl">Feature Prioritization</h1>
            <p className="text-sm text-gray-500">
              Structured MoSCoW view that keeps discussions focused on impact, not opinions.
            </p>
          </div>

          <Card className="bg-gray-200 p-4 flex flex-col gap-3">
            <h1 className="font-semibold text-lg">Brief structure</h1>
            <div className="flex flex-row gap-2 items-center justify-between">
                <p className="text-md text-gray-500">User Authentication</p>
                <p className="text-md text-gray-500 font-semibold">MUST</p>
            </div>
            <div className="flex flex-row gap-2 items-center justify-between">
                <p className="text-md text-gray-500">Onboarding Checklist</p>
                <p className="text-md text-gray-500 font-semibold">SHOULD</p>
            </div>
            <div className="flex flex-row gap-2 items-center justify-between">
                <p className="text-md text-gray-500">Dark Mode</p>
                <p className="text-md text-gray-500 font-semibold">COULD</p>
            </div>
            
          </Card>
        </Card>
        <Card className="p-4 flex flex-col gap-8">
          <div className="w-10 h-10 flex items-center justify-center rounded-sm bg-gray-300">
            <GitMerge className="text-blue-500" />
          </div>
          <div className="flex flex-col gap-2">
            <h1 className="font-bold text-xl">User Flows</h1>
            <p className="text-sm text-gray-500">
              High-level user journeys from entry to success, ready to share with design and engineering.
            </p>
          </div>

          <Card className="bg-gray-200 p-4 flex flex-row gap-2 items-center min-h-38">
            <div className="bg-white shadow-md rounded-sm w-full px-1 items-center justify-center flex">
                <p className="text-sm text-gray-500">Landing</p>
            </div>


             <div className="bg-white shadow-md rounded-sm w-full px-1 items-center justify-center flex">
                <p className="text-sm text-gray-500">Dashboard</p>
            </div>

             <div className="bg-white shadow-md rounded-sm w-full px-1 items-center justify-center flex">
                <p className="text-sm text-gray-500">Create PRD</p>
            </div>
             {/* <div className="bg-white shadow-md rounded-sm w-full px-1 items-center justify-center flex">
                <p className="text-sm text-gray-500">Export</p>
            </div> */}

          </Card>
        </Card>
      </div>
    </div>
  );
}
