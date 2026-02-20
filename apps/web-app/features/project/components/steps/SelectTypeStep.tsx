"use client";

import { useState } from "react";
import { Button } from "@workspace/ui/components/button";
import { ProjectType } from "../../types";
import { ArrowRight, Microscope, Monitor } from "lucide-react";
import { Separator } from "@workspace/ui/components/separator";
import { cn } from "@workspace/ui/lib/utils";

type ProjectStatus = "new_idea" | "in_progress" | "maintenance";

interface Props {
  setType: (type: ProjectType) => void;
  setStep: (step: number) => void;
}

export function SelectTypeStep({ setType, setStep }: Props) {
  const [selectedType, setSelectedType] = useState<ProjectType | null>(null);
  const [selectStatus, setSelectStatus] = useState<ProjectStatus | null>(null);

  const handleContinue = () => {
    if (!selectedType) return;
    setType(selectedType);
    setStep(2);
  };

  const options: {
    value: ProjectStatus;
    title: string;
  }[] = [
    { value: "new_idea", title: "New Idea" },
    { value: "in_progress", title: "In Progress" },
    { value: "maintenance", title: "Maintenance" },
  ];

  return (
    <div className="space-y-10 w-full mb-[100px]">
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Choose Project Type</h2>
        <p className="text-sm text-muted-foreground">
          Select the type of project you want to generate documentation for.
          This determines the structure of your output.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div
          onClick={() => setSelectedType("web_app")}
          className={`cursor-pointer rounded-xl border p-6 transition-all shadow-md
            ${
              selectedType === "web_app"
                ? "border-blue-600 shadow-md shadow-blue-600/30 bg-blue-50"
                : "border-gray-200 hover:border-blue-400"
            }
          `}
        >
          <div className="flex items-center justify-center w-10 h-10 rounded-md bg-gray-100 shadow-md mb-3">
            <Monitor className="w-5 h-5 " />
          </div>
          <h3 className="font-medium">Web Application</h3>
          <p className="text-sm text-muted-foreground mt-1">
            SaaS, dashboard, platform, internal tools
          </p>
        </div>

        <div
          onClick={() => setSelectedType("research")}
          className={`cursor-pointer rounded-xl border p-6 transition-all shadow-md
            ${
              selectedType === "research"
                ? "border-blue-600 shadow-md shadow-blue-600/30 bg-blue-50"
                : "border-gray-200 hover:border-blue-400"
            }
          `}
        >
          <div className="flex items-center justify-center w-10 h-10 rounded-md bg-gray-100 shadow-md mb-3">
            <Microscope className="w-5 h-5 " />
          </div>
          <h3 className="font-medium">Research Project</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Academic, thesis, experiment, scientific report
          </p>
        </div>
      </div>

      <Separator orientation="horizontal" className="h-0.5" />

      <div className="flex flex-col gap-4">
        <h1 className="text-lg font-semibold">
          What stage is this project in?
        </h1>
        <div className="flex flex-row gap-3 items-center">
          {options.map((option) => (
            <Button
              key={option.value}
              onClick={() => setSelectStatus(option.value)}
              variant={"outline"}
              className={cn(
                "cursor-pointer transition-all min-w-30 py-2 shadow-md",
                selectStatus === option.value
                  ? "border-blue-600 shadow-md shadow-blue-600/30 bg-blue-50 text-blue-600 text-sm"
                  : "hover:border-blue-400 hover:text-blue-400 hover:translate-y-1",
              )}
            >
              {option.title}
            </Button>
          ))}
        </div>
        <p className="text-sm text-gray-500">We'll adjust the document intro based on maturity</p>
      </div>

      <Separator orientation="horizontal" className="h-0.5" />

      <div className="flex justify-end">
        <Button onClick={handleContinue} disabled={!selectedType} className="flex flex-row gap-4 items-center text-sm px-5 py-5 hover:translate-y-1 hover:shadow-md cursor-pointer">
          Continue to Project Info
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
