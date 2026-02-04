import { Button } from "@workspace/ui/components/button";
import { Card } from "@workspace/ui/components/card";
import { Badge } from "@workspace/ui/components/badge";
import { Tabs, TabsList, TabsTrigger } from "@workspace/ui/components/tabs";
import { Clock, Play, Sparkle, WandSparkles } from "lucide-react";

export default function Hero() {
  return (
    <div className="w-full h-full bg-accent/50 flex flex-col space-y-13 justify-center items-center pt-20 px-14">
      <div className="flex flex-row items-center justify-center w-full">
        {/* kiri */}
        <div className="flex flex-col space-y-10 w-full">
          <div className="flex flex-row gap-14 items-center">
            <div className="flex flex-row items-center gap-2">
              <Badge
                variant="secondary"
                className="shadow-md px-3 py-2 text-sm font-medium"
              >
                Project Manager
              </Badge>
              <Badge
                variant="secondary"
                className="shadow-md px-3 py-2 text-sm font-medium"
              >
                Student
              </Badge>
              <Badge
                variant="secondary"
                className="shadow-md px-3 py-2 text-sm font-medium"
              >
                Developer
              </Badge>
            </div>

            <Badge
              variant={"secondary"}
              className="shadow-md px-3 py-2 text-sm font-medium"
            >
              New: Export to Markdown
            </Badge>
          </div>

          <div className="flex flex-col gap-6">
            <h1 className="text-5xl font-bold">
              Generate Project Documents <br />
              <span className="text-indigo-500">in Minutes</span>
            </h1>
            <h3 className="text-lg font-medium text-gray-500">
              PRD, Project Brief, Feature List, and User Flow - Structured,
              Professional, and Export-ready in a guided workspace
            </h3>
          </div>

          <div className="flex flex-col gap-6">
            <div className="flex flex-row gap-6 items-center">
              <Button
                variant="default"
                size="lg"
                className="min-w-60 py-6 cursor-pointer hover:shadow-md hover:translate-y-1 "
              >
                Get Started
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="min-w-60 py-6 cursor-pointer hover:shadow-md hover:translate-y-1 flex flex-row gap-2 items-center justify-center"
              >
                <Play className="size-5" />
                View Example Output
              </Button>
            </div>

            <div className="flex flex-row gap-10 items-center">
                <Badge variant="secondary" className="shadow-md px-3 py-1 text-sm font-medium flex flex-row gap-3">
                    <Sparkle className="size-4 " />
                    Guided 5-step planning wizard
                </Badge>

                <p className="text-md text-gray-500">No creadit card required - Export only when you're ready</p>
            </div>
          </div>
        </div>

        {/* kanan */}
        <div className="flex flex-col space-y-6 w-full items-center">
            <Card className="w-full max-w-xl shadow-xl rounded-xl flex flex-col p-4 gap-8 border-none">
                <div className="flex flex-row gap-4 items-center">
                    <Badge variant="default" className="shadow-md px-3 py-2 text-sm font-medium">PRD</Badge>
                    <Badge variant="secondary" className="shadow-md px-3 py-2 text-sm font-medium">Project Brief</Badge>
                    <Badge variant="secondary" className="shadow-md px-3 py-2 text-sm font-medium">User Flow</Badge>
                </div>

                <div className="flex flex-row justify-between items-center">
                    <Badge variant={"outline"} className="py-1 flex flex-row items-center gap-2 text-sm font-medium">
                        <WandSparkles className="size-6" />
                        AI Draft Ready
                    </Badge>

                    <div className="flex flex-row gap-3 items-center">
                        <Clock className="size-4 text-gray-400" />
                        <p className="text-md font-medium text-gray-500">~ 12 second</p>
                    </div>

                </div>
                    <div className="flex flex-row gap-4">
                      {/* kanan */}
                        <Card className="w-full h-full rounded-sm bg-gray-200 p-4 flex flex-col gap-6 shadow-md">
                          <div className="flex flex-row justify-between items-center">
                            <h1 className="font-semibold text-xl">Steps</h1>
                            <h1 className="font-bold text-lg text-gray-500">3/5</h1>
                          </div>

                          <div className="flex flex-col gap-3 ">
                            <div className="flex flex-row gap-2 items-center ">
                              <div className="h-4 w-4 rounded-full border border-gray-500" />
                              <p className="text-md text-gray-500">Project Brief</p>
                            </div>
                            <div className="flex flex-row gap-2 items-center ">
                              <div className="h-4 w-4 rounded-full border border-gray-500" />
                              <p className="text-md text-gray-500">Project Brief</p>
                            </div>
                            <div className="flex flex-row gap-2 items-center ">
                              <div className="h-4 w-4 rounded-full border border-gray-500" />
                              <p className="text-md text-gray-500">Project Brief</p>
                            </div>
                            <div className="flex flex-row gap-2 items-center ">
                              <div className="h-4 w-4 rounded-full border border-gray-500" />
                              <p className="text-md text-gray-500">Project Brief</p>
                            </div>
                          </div>
                        </Card>

                        {/* kiri */}
                        <div className="flex flex-col gap-2 w-full">
                          <h1 className="text-lg font-bold">PRD. Project Overview</h1>
                          <p>Auto-generated outline based on your brief.</p>

                          <Card className="flex flex-col gap-2 p-4">
                            <div className="flex flex-row justify-between items-center">
                              <h1>Section</h1>
                              <h1>Status</h1>
                            </div>

                            <div className="flex flex-row justify-between items-center">
                              <p>1. Project Overview</p>
                              <Badge  className="px-2 py-1 text-xs bg-green-500">Ready</Badge>
                            </div>

                            <div className="flex flex-row justify-between items-center">
                              <p>2. Goals & Metrics</p>
                              <Badge  className="px-2 py-1 text-xs bg-gray-300">Editing</Badge>
                            </div>

                            <div className="flex flex-row justify-between items-center">
                              <p>3. Feature Breakdown</p>
                              <Badge  className="px-2 py-1 text-xs bg-gray-300">Next</Badge>
                            </div>

                          </Card>
                        </div>
                    </div>
            </Card>
        </div>
      </div>
    </div>
  );
}
