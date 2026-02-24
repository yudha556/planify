"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@workspace/ui/components/button";
import { Card } from "@workspace/ui/components/card";
import { Badge } from "@workspace/ui/components/badge";
import { Clock, Download, Play, Sparkle, WandSparkles } from "lucide-react";
import { Skeleton } from "@workspace/ui/components/skeleton";

const tabs = ["PRD", "Project Brief", "User Flow"] as const;
type TabType = (typeof tabs)[number];

const tabContent: Record<
  TabType,
  {
    title: string;
    description: string;
    steps: string[];
    sections: { name: string; status: "Ready" | "Editing" | "Next" }[];
  }
> = {
  PRD: {
    title: "PRD. Project Overview",
    description: "Auto-generated outline based on your brief.",
    steps: [
      "Project Brief",
      "Goals & Metrics",
      "Feature Breakdown",
      "User Flow",
      "Release Plan",
    ],
    sections: [
      { name: "Project Overview", status: "Ready" },
      { name: "Goals & Metrics", status: "Editing" },
      { name: "Feature Breakdown", status: "Next" },
    ],
  },
  "Project Brief": {
    title: "Project Brief",
    description: "Define the core problem and audience.",
    steps: ["Problem", "Target Users", "Scope", "Constraints"],
    sections: [
      { name: "Problem Statement", status: "Ready" },
      { name: "Target Audience", status: "Editing" },
      { name: "Scope", status: "Next" },
    ],
  },
  "User Flow": {
    title: "User Flow",
    description: "Visualize the end-to-end user journey.",
    steps: ["Entry Point", "Main Flow", "Edge Cases"],
    sections: [
      { name: "Landing → Signup", status: "Ready" },
      { name: "Dashboard Flow", status: "Editing" },
      { name: "Error States", status: "Next" },
    ],
  },
};
export default function Hero() {
  const [activeTab, setActiveTab] = useState<TabType>("PRD");
  const [direction, setDirection] = useState(0);

  const handleTabChange = (tab: TabType) => {
    const newIndex = tabs.indexOf(tab);
    const currentIndex = tabs.indexOf(activeTab);
    setDirection(newIndex > currentIndex ? 1 : -1);
    setActiveTab(tab);
  };

  return (
    <div className="w-full h-full bg-accent/50 flex flex-col space-y-20 justify-center items-center pt-25 pb-14 px-14 overflow-x-hidden">
      <div className="flex flex-row items-center justify-center w-full">
        {/* kiri */}
        <div className="flex flex-col space-y-16 w-full">
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

          <div className="flex flex-col gap-8">
            <h1 className="text-5xl font-bold">
              Generate Project Documents <br />
              <span className="text-blue-600">in Minutes</span>
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
              <Badge
                variant="secondary"
                className="shadow-md px-3 py-1 text-sm font-medium flex flex-row gap-3"
              >
                <Sparkle className="size-4 " />
                Guided 5-step planning wizard
              </Badge>

              <p className="text-md text-gray-500">
                No creadit card required - Export only when you're ready
              </p>
            </div>
          </div>
        </div>

        {/* kanan */}
        <div className="flex flex-col space-y-6 w-full items-center">
          <Card className="w-full max-w-xl shadow-xl rounded-xl flex flex-col p-4 gap-8 border-none">
            <div className="flex flex-row gap-4 items-center relative">
              {tabs.map((tab) => (
                <motion.button
                  key={tab}
                  onClick={() => handleTabChange(tab)}
                  whileTap={{ scale: 0.95 }}
                  className="relative"
                >
                  <Badge
                    variant={activeTab === tab ? "default" : "secondary"}
                    className="px-3 py-2 text-sm font-medium cursor-pointer hover:shadow-sm hover:translate-y-1 transition-all duration-300"
                  >
                    {tab}
                  </Badge>

                  {activeTab === tab && (
                    <motion.div
                      layoutId="activeTabIndicator"
                      className="absolute -bottom-1 left-0 right-0 h-1  rounded-full"
                    />
                  )}
                </motion.button>
              ))}
            </div>

            <div className="flex flex-row justify-between items-center">
              <Badge
                variant={"outline"}
                className="py-1 flex flex-row items-center gap-2 text-sm font-medium"
              >
                <WandSparkles className="size-6" />
                AI Draft Ready
              </Badge>

              <div className="flex flex-row gap-3 items-center">
                <Clock className="size-4 text-gray-400" />
                <p className="text-md font-medium text-gray-500">~ 12 second</p>
              </div>
            </div>

            <div className="flex flex-row justify-between items-center w-full gap-4">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, x: direction * -60 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: direction * 60 }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                  className="w-full"
                >
                  <Card className="w-full h-full rounded-sm bg-gray-200 p-4 flex flex-col gap-6 shadow-md">
                    <div className="flex flex-row justify-between items-center">
                      <h1 className="font-semibold text-xl">Steps</h1>
                      <h1 className="font-bold text-lg text-gray-500">
                        {tabContent[activeTab].steps.length} Steps
                      </h1>
                    </div>

                    <div className="flex flex-col gap-3">
                      {tabContent[activeTab].steps.map((step, i) => (
                        <motion.div
                          key={step}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.08 }}
                          className="flex flex-row gap-2 items-center"
                        >
                          <div className="h-4 w-4 rounded-full border border-gray-500" />
                          <p className="text-md text-gray-500">{step}</p>
                        </motion.div>
                      ))}
                    </div>
                  </Card>
                </motion.div>
              </AnimatePresence>


              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, x: direction * 60 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: direction * -60 }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                  className="w-full"
                >
                  <div className="flex flex-col gap-2 w-full">
                    <h1 className="text-lg font-bold">
                      {tabContent[activeTab].title}
                    </h1>
                    <p>{tabContent[activeTab].description}</p>

                    <Card className="flex flex-col gap-2 p-4 mt-2">
                      <div className="flex flex-row justify-between items-center">
                        <h1>Section</h1>
                        <h1>Status</h1>
                      </div>

                      {tabContent[activeTab].sections.map((section, i) => (
                        <motion.div
                          key={section.name}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.07 }}
                          className="flex flex-row justify-between items-center"
                        >
                          <p>{section.name}</p>
                          <Badge
                            className={`px-2 py-1 text-xs ${
                              section.status === "Ready"
                                ? "bg-green-500"
                                : section.status === "Editing"
                                  ? "bg-gray-300"
                                  : "bg-gray-200"
                            }`}
                          >
                            {section.status}
                          </Badge>
                        </motion.div>
                      ))}
                    </Card>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </Card>
        </div>
      </div>

      <div className="flex flex-row justify-between items-center w-full mt-18">
        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-bold">Example PRD Output</h2>
          <p className="text-md font-normal text-gray-500">
            Preview the structure before you decide to export.
          </p>
        </div>

        <Badge variant={"secondary"} className="py-2 px-3">
          <Download className="size-4 mr-2" />
          Export Locked - 1 coin to unlock
        </Badge>
      </div>

      <div className="w-full flex items-center justify-center">
        <Card className="bg-white shadow-2xl p-4 w-full max-w-4xl">
          <Card className="p-4 flex flex-col">
            <div className="flex flex-col w-full justify-end items-end gap-3 border-b pb-6">
              <Badge
                variant={"secondary"}
                className="flex flex-row gap-2 shadow-md py-2 px-4"
              >
                <Clock className="size-4 mr-2" />
                <h1>AI - structured PRD</h1>
              </Badge>
              <h1 className="text-md text-gray-500">Created with Planify</h1>
            </div>

            <div className="flex flex-row mt-5">
              <div className="flex flex-col w-full max-w-sm mt-6 gap-4">
                <h1 className="text-xl font-bold">Sections</h1>
                <div className="w-full max-w-xs flex flex-col gap-2">
                  <Skeleton className=" w-full h-4" />
                  <Skeleton className=" w-[80%] h-4" />
                  <Skeleton className=" w-[80%] h-4" />
                  <Skeleton className=" w-[80%] h-4" />
                </div>
              </div>

              <div className="flex flex-col gap-6 w-full">
                <div className="flex flex-col gap-2">
                  <h1 className="text-xl font-bold">1. Project Overview</h1>
                  <p className="text-md text-gray-500">
                    Planify is an AI-assited project documentation tool designed
                    to streamline the workflow of Project Managers, Student, and
                    Developers. By automating the creation of PRDs, briefs, and
                    user flows, teams can move from idea to execution witf
                    clarity and speed.
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  <h1 className="text-xl font-bold">2. Objective</h1>

                  <div className="flex flex-row gap-4 items-center w-full justify-between">
                    <Card className="bg-secondary flex flex-col gap-3 p-4 min-w-50">
                      <h1 className="text-sm font-bold">Speed</h1>
                      <p className="text-sm text-gray-500">
                        Reduce documentation time by up to 80% for new projects.
                      </p>
                    </Card>
                    <Card className="bg-secondary flex flex-col gap-3 p-4 min-w-50">
                      <h1 className="text-sm font-bold">Clarity</h1>
                      <p className="text-sm text-gray-500">
                        Standarize formats so stakeholders always know where to
                        look.
                      </p>
                    </Card>
                  </div>
                  <div className="flex flex-col gap-2 w-full mt-2">
                    <Skeleton className=" w-full h-3" />
                    <Skeleton className=" w-[80%] h-3" />
                    <Skeleton className=" w-[80%] h-3" />
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </Card>
      </div>
    </div>
  );
}
