"use client";

import { useState } from "react";
import { Card } from "@workspace/ui/components/card";
import { Field, FieldLabel } from "@workspace/ui/components/field";
import { Input } from "@workspace/ui/components/input";
import { Label } from "@workspace/ui/components/label";
import { Separator } from "@workspace/ui/components/separator";
import { ArrowRight, Cpu, Goal, ListTodo } from "lucide-react";
import { TagInput } from "./components/tagInput";
import { Button } from "@workspace/ui/components/button";

interface Props {
  setStep: (step: number) => void;
}

export function DetailsScopeStep({ setStep }: Props) {
  const [techStack, setTechStack] = useState<string[]>([]);
  return (
    <div className="space-y-4 mb-25">
      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-semibold">Details & Scope</h2>
        <p className="text-sm text-gray-500">
          Define the features, techincal requirements, and constraints for the
          AI to generate
        </p>
      </div>

      <Card className="p-4 flex flex-col gap-6">
        <div className="flex flex-row items-center gap-3">
          <div className="flex items-center justify-center h-8 w-8 rounded-md bg-gray-200 shadow-md">
            <Goal className="w-5x h-5" />
          </div>
          <h1 className="text-md font-semibold">Overview & Goals</h1>
        </div>

        <Separator className="h-px bg-gray-500" orientation="horizontal" />

        <Field>
          <FieldLabel htmlFor="audience">Target Audience</FieldLabel>
          <Input
            id="audience"
            placeholder="e.g. Warehouse Managers, Supply Chain Officers"
            className="h-10 bg-white shadow-md border-gray-300"
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="metric">Primary Success Metric</FieldLabel>
          <Input
            id="metric"
            placeholder="e.g. Reduce inventory counting time by 40%"
            className="h-10 bg-white shadow-md border border-gray-300"
          />
        </Field>
      </Card>

      <Card className="p-4 flex flex-col gap-6">
        <div className="flex flex-row items-center gap-3">
          <div className="flex items-center justify-center h-8 w-8 rounded-md bg-gray-200 shadow-md">
            <ListTodo className="w-5x h-5" />
          </div>
          <h1 className="text-md font-semibold">Feature & Scope</h1>
        </div>

        <Separator className="h-px bg-gray-500" orientation="horizontal" />

        <Field>
          <Label htmlFor="feature">Key Feature (In Scope)</Label>
          <textarea
            id="feature"
            placeholder="Type your short description"
            className="w-full min-h-28 px-3 py-2 text-sm rounded-md border border-input bg-background shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:shadow-blue-400 focus:shadow disabled:opacity-50 disabled:cursor-not-allowed resize-none "
          />
        </Field>

        <Field>
          <Label htmlFor="out_of_scope">Out of Scope (Optional)</Label>
          <Input
            id="out_of_scope"
            placeholder="e.g. Mobile App, Office mode support"
            className="h-10 bg-white shadow-md border border-gray-300"
          />
        </Field>
      </Card>

      <Card className="p-4 flex flex-col gap-6">
        <div className="flex flex-row items-center gap-3">
          <div className="flex items-center justify-center h-8 w-8 rounded-md bg-gray-200 shadow-md">
            <Cpu className="w-5x h-5" />
          </div>
          <h1 className="text-md font-semibold">Technical Preference</h1>
        </div>

        <Separator className="h-px bg-gray-500" orientation="horizontal" />

        <Field>
          <Label>Tech Stack</Label>
          <TagInput
            value={techStack}
            onChange={setTechStack}
            placeholder="Add technology..."
          />
        </Field>

        <Field>
          <Label htmlFor="integration_requirements">Integration Requirements</Label>
          <Input
            id="integration_requirements"
            placeholder="e.g. Stripe Payment Gateway, Google Maps API"
            className="h-10 bg-white shadow-md border border-gray-300"
          />
        </Field>
      </Card>

      <Card className="p-4 flex flex-col gap-6">
        <Field>
          <Label htmlFor="know_constrain">Known Constraints</Label>
          <Input
            id="know_constrain"
            placeholder="e.g. Must run on legacy IE11 browser, 3 month timeline"
            className="h-10 bg-white shadow-md border border-gray-300"
          />
        </Field>
      </Card>

   <div className="flex flex-row justify-between items-center">
        <Button
          onClick={() => setStep(3)}
          variant={"outline"}
          className="flex flex-row gap-4 items-center text-sm px-5 py-5 hover:translate-y-1 hover:shadow-md cursor-pointer "
        >Back</Button>
        <Button
          onClick={() => setStep(4)}
          // disabled={!selectStyle}
          className="flex flex-row gap-4 items-center text-sm px-5 py-5 hover:translate-y-1 hover:shadow-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Continue to Review
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
