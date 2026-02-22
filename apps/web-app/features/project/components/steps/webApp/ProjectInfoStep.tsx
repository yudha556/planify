"use client";

import { Button } from "@workspace/ui/components/button";
import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@workspace/ui/components/field";
import { Input } from "@workspace/ui/components/input";
import { Label } from "@workspace/ui/components/label";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@workspace/ui/components/tabs";
import { Textarea } from "@workspace/ui/components/textarea";
import { cn } from "@workspace/ui/lib/utils";
import { Separator } from "@workspace/ui/components/separator";
import { ArrowRight } from "lucide-react";
import type { WebAppFormData, DocumentStyle, OutputLanguage } from "../../../types";

interface Props {
  setStep: (step: number) => void;
  formData: WebAppFormData;
  updateField: <K extends keyof WebAppFormData>(field: K, value: WebAppFormData[K]) => void;
  canProceedToDetails: boolean;
}

export function ProjectInfoStep({ setStep, formData, updateField, canProceedToDetails }: Props) {
  const options: {
    value: DocumentStyle;
    title: string;
    description: string;
  }[] = [
      {
        value: "professional",
        title: "Professional",
        description: "Standar business tone, balanced detail.",
      },
      {
        value: "formal",
        title: "Formal",
        description: "Strict academic of corporate structure.",
      },
      {
        value: "concise",
        title: "Concise",
        description: "Brief, direct, and action-oriented.",
      },
    ];
  return (
    <div className="space-y-8 w-full flex flex-col justify-center mb-25">
      <div className="flex flex-col gap-3 mb-10">
        <h2 className="text-xl font-semibold">Basic Project Information</h2>
        <p className="text-sm text-gray-500">
          Provide the core details of your project to set the context for the
          generated documents.
        </p>
      </div>

      <Field>
        <FieldLabel htmlFor="project_name">Project Name</FieldLabel>
        <Input
          id="project_name"
          placeholder="Project Name"
          className="h-10 bg-white shadow-md border border-gray-300"
          value={formData.projectName}
          onChange={(e) => updateField("projectName", e.target.value)}
        />
      </Field>

      <div className="w-full space-y-2">
        <Label
          htmlFor="project_description"
          className="text-sm font-medium text-foreground"
        >
          Short Description
        </Label>

        <textarea
          id="project_description"
          placeholder="Type your short description"
          className="w-full min-h-28 px-3 py-2 text-sm rounded-md border border-input bg-background shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:shadow-blue-400 focus:shadow disabled:opacity-50 disabled:cursor-not-allowed resize-none "
          value={formData.projectDescription}
          onChange={(e) => updateField("projectDescription", e.target.value)}
        />
        <FieldDescription className="text-sm text-muted-foreground">
          This summary will appear in the the introduction of your PRD
        </FieldDescription>
      </div>

      <Field className="flex flex-col gap-2">
        <Label>Output Language</Label>
        <Tabs
          defaultValue={formData.outputLanguage}
          onValueChange={(value) => updateField("outputLanguage", value as OutputLanguage)}
        >
          <TabsList className="bg-accent/50 ">
            <TabsTrigger value="english">English</TabsTrigger>
            <TabsTrigger value="indonesia">Indonesia</TabsTrigger>
          </TabsList>
          <TabsContent value="english" />
          <TabsContent value="indonesia" />
        </Tabs>
      </Field>

      <div className="flex flex-row gap-4 items-center w-full">
        {options.map((option) => (
          <Button
            key={option.value}
            onClick={() => updateField("documentStyle", option.value)}
            variant={"outline"}
            className={cn(
              `cursor-pointer transition-all h-full px-4 py-6 shadow-md flex flex-col gap-2 items-start justify-center`,
              formData.documentStyle === option.value
                ? "border-blue-600 shadow-md shadow-blue-600/30 bg-blue-50 text-blue-600 text-sm"
                : "hover:border-blue-400  hover:translate-y-1",
            )}
          >
            <h1 className="text-sm font-semibold">{option.title}</h1>
            <p className="text-xs text-gray-500">{option.description}</p>
          </Button>
        ))}
      </div>

      <Separator orientation="horizontal" className="h-0.5 text-gray-900" />

      <div className="flex flex-row justify-between items-center">
        <Button
          onClick={() => setStep(1)}
          variant={"outline"}
          className="flex flex-row gap-4 items-center text-sm px-5 py-5 hover:translate-y-1 hover:shadow-md cursor-pointer "
        >Cancel</Button>
        <Button
          onClick={() => setStep(3)}
          disabled={!formData.documentStyle}
          className="flex flex-row gap-4 items-center text-sm px-5 py-5 hover:translate-y-1 hover:shadow-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Continue to Details
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
