
"use client";

import { Button } from "@workspace/ui/components/button";
import { Card } from "@workspace/ui/components/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu";

import { Field, FieldLabel } from "@workspace/ui/components/field";
import { Progress } from "@workspace/ui/components/progress";
import {
  ArrowRight,
  Copy,
  Download,
  Ellipsis,
  Eye,
  LayoutTemplate,
  BookOpen,
  Smartphone,
  Building2,
  Pencil,
  Trash,
} from "lucide-react";
import { useRouter } from "next/navigation";

type Project = {
  id: string;
  title: string;
  description: string;
  project_type: string;
  current_step: number;
  document_style: string;
  status: string;
  created_at: string;
  updated_at: string;
};

const TYPE_ICONS: Record<string, any> = {
  webapp: LayoutTemplate,
  web_app: LayoutTemplate,
  mobile: Smartphone,
  research: BookOpen,
  enterprise: Building2,
};

const TYPE_LABELS: Record<string, string> = {
  webapp: "Web App",
  web_app: "Web App",
  mobile: "Mobile App",
  research: "Research",
  enterprise: "Enterprise",
};

function getProgress(step: number, status: string): number {
  if (status === "exported") return 100;
  if (status === "generated") return 75;
  // Step 1-4 = 25% each
  return Math.min(step * 25, 100);
}

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins} min${mins > 1 ? "s" : ""} ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  const days = Math.floor(hours / 24);
  return `${days} day${days > 1 ? "s" : ""} ago`;
}

export default function ProjectProgress({
  project,
  onDelete,
}: {
  project: Project;
  onDelete: (id: string) => void;
}) {
  const router = useRouter();
  const Icon = TYPE_ICONS[project.project_type] || LayoutTemplate;
  const typeLabel = TYPE_LABELS[project.project_type] || project.project_type;
  const progress = getProgress(project.current_step, project.status);

  return (
    <Card className="flex flex-col gap-8 p-4 w-full min-h-59">
      <div className="w-full flex flex-row justify-between items-center">
        <div className="flex flex-row gap-3 items-center">
          <div className="flex items-center justify-center w-12 h-12 rounded-sm bg-blue-100">
            <Icon className="size-7 text-blue-600" />
          </div>
          <div className="flex flex-col gap-1">
            <h1 className="font-semibold text-md">
              {project.title}
            </h1>
            <p className="text-sm text-gray-500">{typeLabel} · {project.document_style}</p>
          </div>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant={"outline"}
              className="hover:shadow-md hover:translate-y-1 cursor-pointer"
            >
              <Ellipsis />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" sideOffset={8} className="flex flex-col gap-1">
            <DropdownMenuItem onClick={() => router.push(`/newProject?projectId=${project.id}`)}>
              <Pencil />
              Edit Project
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Eye />
              View Preview
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Copy />
              Duplicate
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Download />
              Export PDF
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive" onClick={() => onDelete(project.id)}>
              <Trash />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Field className="w-full ">
        <FieldLabel htmlFor={`progress-${project.id}`}>
          <span>{project.status === "draft" ? "In Progress" : project.status === "generated" ? "Generated" : "Completed"}</span>
          <span className="ml-auto">{progress}%</span>
        </FieldLabel>
        <Progress value={progress} id={`progress-${project.id}`} />
      </Field>

      <div className="flex flex-row justify-between items-center w-full">
        <p className="text-gray-500 font-semibold text-sm">Edited {timeAgo(project.updated_at)}</p>
        <Button
          variant={"link"}
          className="cursor-pointer text-blue-600 flex flex-row gap-2 items-center"
          onClick={() => router.push(`/newProject?projectId=${project.id}`)}
        >
          Continue <ArrowRight className="text-blue-600 size-4" />
        </Button>
      </div>
    </Card>
  );
}