import { Button } from "@workspace/ui/components/button";
import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@workspace/ui/components/field";
import { Input } from "@workspace/ui/components/input";
import { Label } from "@workspace/ui/components/label";
import { ArrowRight } from "lucide-react";

interface Props {
  setStep: (step: number) => void;
}

export function ResearchDetailsStep({ setStep }: Props) {
  return (
    <div className="space-y-8  flex flex-col justify-center mb-25">
      <div className="flex flex-col gap-3 mb-10">
        <h1 className="text-xl font-semibold">Research Detail</h1>
        <p className="text-sm text-gray-500">
          Isi detail perencanaan riset anda. Fokus pada konteks, tujuan, dan
          rencana metodologi - bukan hasil
        </p>
      </div>
      <div className="flex flex-row w-full gap-6 justify-between items-center">
        <Field>
          <FieldLabel htmlFor="title">Research Title</FieldLabel>
          <Input
            id="title"
            placeholder="e.g. The Role of AI-Assisted Tools in Undergraded"
            className="h-10 bg-white shadow-md border border-gray-300"
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="study">Field of Study</FieldLabel>
          <Input
            id="study"
            placeholder="e.g. Computer Science, Education, Sociology"
            className="h-10 bg-white shadow-md border border-gray-300"
          />
        </Field>
      </div>
      <p className="text-xs text-gray-500 -mt-4">
        Working title, can be refined later.
      </p>

      <Field>
        <FieldLabel htmlFor="background">Background & Context</FieldLabel>
        <textarea
          id="background"
          placeholder="Describe the context and motivation of the study. No Conclusion required"
          className="w-full min-h-28 px-3 py-2 text-sm rounded-md border border-input bg-background shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:shadow-blue-400 focus:shadow disabled:opacity-50 disabled:cursor-not-allowed resize-none "
        />
        <FieldDescription className="text-xs text-gray-500">Describe the context and motivation of the study. No conclusions required.</FieldDescription>
      </Field>
      <Field>
        <FieldLabel htmlFor="problem">Problem Statement</FieldLabel>
        <textarea
          id="background"
          placeholder="What problem does this research aim to explore or address?"
          className="w-full min-h-28 px-3 py-2 text-sm rounded-md border border-input bg-background shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:shadow-blue-400 focus:shadow disabled:opacity-50 disabled:cursor-not-allowed resize-none "
        />
        <FieldDescription className="text-xs text-gray-500">Focus on the core problem or gap. not on the solution</FieldDescription>
      </Field>
      <Field>
        <FieldLabel htmlFor="objective">Research Objective</FieldLabel>
        <textarea
          id="objective"
          placeholder="To identify ..."
          className="w-full min-h-28 px-3 py-2 text-sm rounded-md border border-input bg-background shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:shadow-blue-400 focus:shadow disabled:opacity-50 disabled:cursor-not-allowed resize-none "
        />
        <FieldDescription className="text-xs text-gray-500">List intended objective, not outcomes. One objective per line or bullet.</FieldDescription>
      </Field>
      <Field>
        <FieldLabel htmlFor="hypothesis">Research Questions / Hypothesis <span className="text-gray-500">(Optional)</span></FieldLabel>
        <textarea
          id="hypothesis"
          placeholder="Optional: key research questions or hypotesis you expect to test."
          className="w-full min-h-28 px-3 py-2 text-sm rounded-md border border-input bg-background shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:shadow-blue-400 focus:shadow disabled:opacity-50 disabled:cursor-not-allowed resize-none "
        />
      </Field>
      <Field>
        <FieldLabel htmlFor="methodology">Proposed Methodology (high-Level) <span className="text-gray-500">(Optional)</span></FieldLabel>
        <textarea
          id="methodology"
          placeholder="e.g. literature review, qualitative initerviews, experimental setup"
          className="w-full min-h-28 px-3 py-2 text-sm rounded-md border border-input bg-background shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:shadow-blue-400 focus:shadow disabled:opacity-50 disabled:cursor-not-allowed resize-none "
        />
        <FieldDescription className="text-xs text-gray-500">This is a plan, not final methodology, High-level overview is sufficient</FieldDescription>
      </Field>
      <Field>
        <FieldLabel htmlFor="scope">Scope & Limitations <span className="text-gray-500">(Optional)</span><span className="text-gray-500">(Optional)</span></FieldLabel>
        <textarea
          id="scope"
          placeholder="Optional: boundaries of the study, populations included, time frame, and key limitations."
          className="w-full min-h-28 px-3 py-2 text-sm rounded-md border border-input bg-background shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:shadow-blue-400 focus:shadow disabled:opacity-50 disabled:cursor-not-allowed resize-none "
        />
      </Field>
        <Button
          onClick={() => setStep(3)}
          // disabled={!canProceedToReview}
          className="ml-auto flex flex-row gap-4 items-center text-sm px-5 py-5 hover:translate-y-1 hover:shadow-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Continue to Configuration
          <ArrowRight className="w-4 h-4" />
        </Button>
    </div>
  );
}
