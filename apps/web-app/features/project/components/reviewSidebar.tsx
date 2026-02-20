import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@workspace/ui/components/alert";
import { Button } from "@workspace/ui/components/button";
import { Card } from "@workspace/ui/components/card";
import { Separator } from "@workspace/ui/components/separator";
import {
  AlertCircle,
  CheckCircle2Icon,
  Coins,
  FileText,
  LockIcon,
  Sparkles,
} from "lucide-react";
export function ReviewSidebar() {
  return (
    <div className="p-6 space-y-6 bg-white shadow-md">
      <div>
        <h3 className="text-lg font-semibold">Document Actions</h3>
        <p className="text-sm text-muted-foreground">
          Review and export your project
        </p>
      </div>

      <Separator className="h-px bg-gray-500" />

      <Alert className="max-w-md bg-accent/50">
        <CheckCircle2Icon className="text-blue-600" color="blue" />
        <AlertTitle className="text-blue-500 ">
          Preview first, pay only to export
        </AlertTitle>
        <AlertDescription className="text-sm">
          You are viewing the full AI-generated draft with a ligth watermark.
          Reviewing and editing content is always free. Coins are only used when
          you export.
        </AlertDescription>
      </Alert>

      <Card className="p-4 flex flex-col gap-6 shadow-md bg-gray-200">
        <h1 className="text-sm font-semibol">Project Summary</h1>

        <div className="flex flex-col gap-2 w-full">
          <div className="flex flex-row justify-between items-center w-full">
            <p className="text-sm text-gray-500">Type</p>
            <p className="text-bold text-sm">Web App</p>
          </div>
          <div className="flex flex-row justify-between items-center w-full">
            <p className="text-sm text-gray-500">Role</p>
            <p className="text-bold text-sm">PM</p>
          </div>
          <div className="flex flex-row justify-between items-center w-full">
            <p className="text-sm text-gray-500">Est. Pages</p>
            <p className="text-bold text-sm">12 Pages</p>
          </div>
          <div className="flex flex-row justify-between items-center w-full">
            <p className="text-sm text-gray-500">AI quality</p>
            <p className="text-bold text-sm">Ready to export</p>
          </div>
        </div>
      </Card>

      <Card className="p-4 flex flex-col gap-6">
        <div className="flex flex-row justify-between items-center">
          <h1 className="text-sm font-bold">AI Feedback</h1>
          <p className="text-xs text-gray-500">v1 draft</p>
        </div>

        <p className="text-sm text-gray-500 ">
          Overall structure looks solid. Consider tightening the problem
          statement and adding 1-2 measurable success metrics before exporting.
        </p>

        <div className="flex flex-row gap-3 items-center">
          <CheckCircle2Icon color="green" />
          <p className="text-sm">
            Section convered: Problem, Goals, Scope, Technical requirements
          </p>
        </div>
        <div className="flex flex-row gap-3 items-center">
          <AlertCircle color="red" />
          <p className="text-sm">
            Optional: refine language tone before export.
          </p>
        </div>
      </Card>

      <Separator className="h-px text-gray-500" />

      <div className="flex flex-col gap-2">
        <h1 className="font-bold text-sm">Export & Unlock</h1>
        <p className="text-sm text-gray-500">
          Choose your format. Coins are charged once per export. No
          subscriptions, no auto-renewal.
        </p>
      </div>

      <Card className="p-4 flex flex-col gap-4">
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-row gap-1 items-center">
            <FileText color="red" className="w-5 h-5" />
            <h1 className="text-sm font-semibold">PDF Document</h1>
          </div>

          <div className="flex flex-row items-center justify-center gap-2 border py-1 px-2 bg-yellow-200 rounded-xl shadow-md ">
            <LockIcon className="w-3 h-3 text-yellow-600" />
            <p className="font-semibold text-sm text-yellow-600">Locked</p>
          </div>
        </div>

        <p className="text-sm text-gray-500">
          Clean, paginate layout, ideal for stakeholders, clients, or academic
          supervisors.
        </p>

        <div className="flex flex-row items-center justify-between">
          <p className="text-sm text-gray-500">
            One-time export + Lifetime accesss
          </p>
          <div className="flex flex-row items-center justify-center gap-1 rounded-xl bg-yellow-200 shadow-md px-3 py-1">
            <Coins className="w-6 h-6 text-yellow-600" />
            <p className="text-yellow-600 text-sm font-medium">30 Coins</p>
          </div>
        </div>

        <Button variant={"default"} size={"lg"}>
          Unlock PDF Export
        </Button>
        <p className="text-xs text-gray-500">
          After unlock, this action becomes{" "}
          <span className="text-black">Download PDF</span>for this project
        </p>
      </Card>

      <Card className="p-4 flex flex-col gap-4">
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-row gap-1 items-center">
            <FileText color="black" className="w-5 h-5" />
            <h1 className="text-sm font-semibold">Markdown</h1>
          </div>

          <div className="flex flex-row items-center justify-center gap-2 border py-1 px-2 bg-yellow-200 rounded-xl shadow-md ">
            <LockIcon className="w-3 h-3 text-yellow-600" />
            <p className="font-semibold text-sm text-yellow-600">Locked</p>
          </div>
        </div>

        <p className="text-sm text-gray-500">
          Perfect for Notion, Obsidian, GitHub, or your own documentation
          pipeline.
        </p>

        <div className="flex flex-row items-center justify-between">
          <p className="text-sm text-gray-500">Markdown + copy to clipboard</p>
          <div className="flex flex-row items-center justify-center gap-1 rounded-xl bg-yellow-200 shadow-md px-3 py-1">
            <Coins className="w-6 h-6 text-yellow-600" />
            <p className="text-yellow-600 text-sm font-medium">30 Coins</p>
          </div>
        </div>

        <Button variant={"default"} size={"lg"}>
          Unlock Markdown Export
        </Button>
        <p className="text-xs text-gray-500">
          After unlock, this action becomes{" "}
          <span className="text-black">Download. md</span> and{" "}
          <span className="text-black">Copy Markdown</span>
        </p>
      </Card>

      <div className="flex flex-col gap-2">
        <p className="text-xs text-gray-500">
          Need to adjust the draft before paying?
        </p>
        <Button
          variant={"outline"}
          size={"lg"}
          className="flex flex-row gap-2 item-center"
        >
          <Sparkles className="w-4 h-4 text-blue-600" />
          Request AI Revision (10 Coins)
        </Button>

        <p className="text-xs text-gray-500">
          AI revision creates a new version of this document. Your current
          preview remains accessible.
        </p>
      </div>
    </div>
  );
}
