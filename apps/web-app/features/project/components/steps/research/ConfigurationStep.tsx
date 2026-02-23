"use client";

import { useState } from "react";
import { Button } from "@workspace/ui/components/button";
import { Card } from "@workspace/ui/components/card";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldTitle,
} from "@workspace/ui/components/field";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select";
import { Switch } from "@workspace/ui/components/switch";
import { AlertCircleIcon, ArrowRight, FileText, Focus, Quote, SparklesIcon } from "lucide-react";
import { cn } from "@workspace/ui/lib/utils";
import { Alert, AlertDescription } from "@workspace/ui/components/alert";

interface Props {
  setStep: (step: number) => void;
}

type WritingStyle = "formal_academic" | "journal_ready" | "proposal_friendly";
type DetailLevel = "short" | "standar" | "detailed";
type GuidanceLevel   = "consertative" | "balanced" | "explorative";

export function ConfigurationStep({ setStep }: Props) {
  const [selectOption, setSelectOption] = useState<WritingStyle | null>(null);
  const [selectLevel, setSelectLevel] = useState<DetailLevel | null>(null);
  const [selectGuidanceLevel, setSelectGuidanceLevel] = useState<GuidanceLevel | null>(null)

  const options: {
    value: WritingStyle;
    title: String;
    description: String;
  }[] = [
    {
      value: "formal_academic",
      title: "Formal Academic",
      description: "Struktur ketat, nada objektif",
    },
    {
      value: "journal_ready",
      title: "Journal Ready",
      description: "Lebih mengalir, layak publikasi",
    },
    {
      value: "proposal_friendly",
      title: "Proposal Friendly",
      description: "Lebih persuasi & mudah dibaca",
    },
  ];

  const DetailLevelDummy: {
    value: DetailLevel;
    title: String;
    describ: String;
  }[] = [
    {
      value: "short",
      title: "Short",
      describ: "Outline-level only.",
    },
    {
      value: "standar",
      title: "Standard",
      describ: "Balanced depth for proposals.",
    },
    {
      value: "detailed",
      title: "Detailed",
      describ: "In-depth, more comperehensive.",
    },
  ];

  const GudanceLevelDummy: {
    value: GuidanceLevel;
    title: String;
  }[] = [
    {
      value: "consertative",
      title: "Consertative"
    },
    {
      value: "balanced",
      title: "balanced"
    },
    {
      value: "explorative",
      title: "Explorative"
    }
  ]
  return (
    <div className="space-y-8 w-full flex flex-col justify-center mb-25">
      <div className="flex flex-col gap-3 mb-10">
        <h1 className="text-xl font-semibold">
          Configuration & Academic Preference
        </h1>
        <p className="text-sm text-gray-500">
          Atur bahasa, gaya akademik, dan aturan sitasi yang akan digunakan
          untuk menyusun dokumen riset anda. ini mengatur format & standar,
          bukan isi
        </p>
      </div>

      <Card className="p-4 flex flex-col gap-6">
        <div className="flex flex-row gap-4 items-center">
          <FileText className="text-blue-600" />
          <h1 className="text-md font-semibold">Output Settings</h1>
        </div>

        <Field>
          <FieldLabel>Output Language</FieldLabel>
          <Select>
            <SelectTrigger className="w-full py-6 shadow-md">
              <SelectValue placeholder="Select Language" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="english">English</SelectItem>
                <SelectItem value="indonesia">Indonesia</SelectItem>
              </SelectGroup>
            </SelectContent>
            <FieldDescription className="text-xs text-gray-500">
              The language used in the generated research document.
            </FieldDescription>
          </Select>
        </Field>

        <Field>
          <FieldLabel>Academic Writing Style</FieldLabel>
          <div className="flex flex-row items-center gap-3">
            {options.map((option) => (
              <Button
                key={option.value}
                onClick={() => setSelectOption(option.value)}
                variant={"outline"}
                className={cn(
                  "cursor-pointer transition-all h-full px-4 py-6 shadow-md flex flex-col gap-2 items-start justify-center lg:min-w-72",
                  selectOption === option.value
                    ? "border-blue-600 shadow-md shadow-blue-600/30 bg-blue-50 text-blue-600 text-sm"
                    : "hover:border-blue-400 hover:text-blue-400 hover:translate-y-1",
                )}
              >
                <h1 className="text-md font-semibold">{option.title}</h1>
                <p className="text-xs text-gray-500">{option.description}</p>
              </Button>
            ))}
          </div>
        </Field>
      </Card>

      <Card className="p-4 flex flex-col gap-6">
        <div className="flex flex-row gap-4 items-center">
          <Quote className="text-blue-500" />
          <h1 className="text-md font-semibold">Citation & References</h1>
        </div>

        <Field>
          <FieldLabel>Citation Style</FieldLabel>
          <Select>
            <SelectTrigger className="w-full py-6 shadow-md">
              <SelectValue placeholder="Select Citation Style" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="APA">APA</SelectItem>
                <SelectItem value="IEEE">IEEE</SelectItem>
              </SelectGroup>
            </SelectContent>
            <FieldDescription className="text-xs text-gray-500">
              Choose the citation standard required by your instution or
              journal.
            </FieldDescription>
          </Select>
        </Field>

        <Field>
          <FieldLabel htmlFor="institution_rule">
            Custom / Institution Rule{" "}
            <span className="text-gray-500">(Optional)</span>
          </FieldLabel>
          <FieldDescription className="text-xs text-gray-500">
            Describe institution or supervisor citation requirements.
          </FieldDescription>
          <textarea
            id="institution_role"
            placeholder="APA 7 or other"
            className="w-full min-h-28 px-3 py-2 text-sm rounded-md border border-input bg-background shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:shadow-blue-400 focus:shadow disabled:opacity-50 disabled:cursor-not-allowed resize-none "
          />
        </Field>
        <FieldGroup className="w-full">
          <FieldLabel htmlFor="switch-share" className="bg-gray-200 shadow-md">
            <Field orientation={"horizontal"}>
              <FieldContent className="">
                <FieldTitle>Include References Section</FieldTitle>
                <FieldDescription>
                  Generate a references / bilbilography section at the end of
                  the document.
                </FieldDescription>
              </FieldContent>
              <Switch id="switch-share" defaultChecked className="py-2.5 " />
            </Field>
          </FieldLabel>
          <FieldLabel
            htmlFor="switch-notifications"
            className="bg-gray-200 shadow-md"
          >
            <Field orientation="horizontal">
              <FieldContent>
                <FieldTitle>Enable notifications</FieldTitle>
                <FieldDescription>
                  Receive notifications when focus mode is enabled or disabled.
                </FieldDescription>
              </FieldContent>
              <Switch
                id="switch-notifications"
                defaultChecked
                className="py-2.5"
              />
            </Field>
          </FieldLabel>

          <FieldLabel>
            <Field orientation={"horizontal"} className="shadow">
              <FieldContent>
                <FieldTitle>Advanced reference preferences</FieldTitle>
                <FieldDescription>
                  Optional * e.g. recent sources only, journals only.
                </FieldDescription>
              </FieldContent>
              <Button disabled variant={"outline"}>
                Collapsed
              </Button>
            </Field>
          </FieldLabel>
        </FieldGroup>
      </Card>

      <Card className="p-4 flex flex-col gap-6">
        <div className="flex flex-row gap-4 items-center">
          <Focus className="text-blue-500" />
          <h1 className="text-md font-semibold">Depth & Lenght</h1>
        </div>

        <Field>
          <FieldLabel>Detail Level</FieldLabel>
          <div className="flex flex-row items-center justify-between w-full gap-3">
            {DetailLevelDummy.map((level) => (
              <Button
                key={level.value}
                onClick={() => setSelectLevel(level.value)}
                variant={"outline"}
                className={cn(
                  "cursor-pointer transition-all h-full px-4 py-6 shadow-md flex flex-col gap-2 items-start justify-center lg:min-w-72",
                  selectLevel === level.value
                    ? "border-blue-600 shadow-md shadow-blue-600/30 bg-blue-50 text-blue-600 text-sm"
                    : "hover:border-blue-400 hover:text-blue-400 hover:translate-y-1",
                )}
              >
                <h1 className="text-md font-semibold">{level.title}</h1>
                <p className="text-xs text-gray-500">{level.describ}</p>
              </Button>
            ))}
          </div>
        </Field>
        <Alert className="w-full bg-accent/50">
          <AlertCircleIcon />
          <AlertDescription className="text-black">
            Estimated length: 8-12 pages (will adjust based on objectives &
            methodology).
          </AlertDescription>
        </Alert>
      </Card>

      <Card className="p-4 flex flex-col gap-4">
        <div className="flex flex-row gap-4 items-center">
          <SparklesIcon className="text-blue-500" />
          <h1 className="text-md font-semibold">AI Guidance Level</h1>
        </div>
        <div className="flex flex-row gap-3 items-center justify-between w-full">
          {GudanceLevelDummy.map((item) => (
            <Button
            key={item.value}
            onClick={() => setSelectGuidanceLevel(item.value)}
            variant={"outline"}
                            className={cn(
                  "cursor-pointer transition-all h-full px-4 py-6 shadow-md flex flex-col gap-2 items-start justify-center lg:min-w-72",
                  selectGuidanceLevel === item.value
                    ? "border-blue-600 shadow-md shadow-blue-600/30 bg-blue-50 text-blue-600 text-sm"
                    : "hover:border-blue-400 hover:text-blue-400 hover:translate-y-1",
                )}
                >
                  {item.title}
                </Button>
          ))}
        </div>

        <FieldDescription className="mx-auto text-xs text-gray-500">Controls how explanatory and flexible the AI writing style will be.</FieldDescription>

      </Card>

      <div className="flex flex-row justify-between items-center">
        <Button
          onClick={() => setStep(2)}
          variant={"outline"}
          className="flex flex-row gap-4 items-center text-sm px-5 py-5 hover:translate-y-1 hover:shadow-md cursor-pointer "
        >Cancel</Button>
        <Button
          onClick={() => setStep(4)}
          className="flex flex-row gap-4 items-center text-sm px-5 py-5 hover:translate-y-1 hover:shadow-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Continue to Details
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
