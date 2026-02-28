"use client";

import { useState, useEffect } from "react";
import { Button } from "@workspace/ui/components/button";
import { Card } from "@workspace/ui/components/card";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@workspace/ui/components/empty";
import { Field, FieldLabel } from "@workspace/ui/components/field";
import { Progress } from "@workspace/ui/components/progress";
import {
  Plus,
  ArrowRight,
  LayoutTemplate,
  BookOpen,
  Smartphone,
  Building2,
  Loader2,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { getProjects } from "@/services/project.service";

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

export default function RecentProject() {
  const router = useRouter();
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProjects()
      .then((res: any) => {
        if (res.success && res.data && Array.isArray(res.data)) {
          // Take max 3 most recent
          setProjects(res.data.slice(0, 3));
        }
      })
      .catch(() => { })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="w-full gap-8 flex flex-col">
      <div className="flex flex-row justify-between items-center w-full">
        <h2 className="text-xl font-semibold">Recent Project</h2>
        <Button
          onClick={() => router.push("/myProject")}
          size={"lg"}
          variant={"outline"}
          className="px-8 cursor-pointer hover:shadow-md border-gray-300 hover:translate-y-1"
        >
          View All
        </Button>
      </div>

      <div className="items-center justify-between grid grid-cols-3 gap-6">
        {/* Create New Project Card */}
        <Button
          onClick={() => router.push("/newProject")}
          variant={"outline"}
          className="w-full h-full p-4 cursor-pointer bg-white hover:shadow-md hover:translate-y-1 transition-all duration-200"
        >
          <Empty className="py-1">
            <EmptyHeader>
              <EmptyMedia
                variant={"icon"}
                className="bg-blue-100 size-14 rounded-full"
              >
                <Plus className="size-8 text-blue-600" />
              </EmptyMedia>
              <EmptyTitle>Create New Project</EmptyTitle>
              <EmptyDescription>
                Start a new wizard for PRD, Feature List, or Research Proposals
              </EmptyDescription>
            </EmptyHeader>
            <EmptyContent />
          </Empty>
        </Button>

        {/* Loading state */}
        {loading && (
          <>
            <Card className="flex items-center justify-center p-4 min-h-59">
              <Loader2 className="animate-spin text-gray-400 size-6" />
            </Card>
            <Card className="flex items-center justify-center p-4 min-h-59">
              <Loader2 className="animate-spin text-gray-400 size-6" />
            </Card>
          </>
        )}

        {/* Real project cards */}
        {!loading && projects.map((project) => {
          const Icon = TYPE_ICONS[project.project_type] || LayoutTemplate;
          const typeLabel = TYPE_LABELS[project.project_type] || project.project_type;
          const progress = getProgress(project.current_step, project.status);
          const statusLabel = project.status === "draft" ? "In Progress" : project.status === "generated" ? "Generated" : "Completed";

          return (
            <Card key={project.id} className="flex flex-col gap-8 p-4 w-full min-h-59">
              <div className="w-full flex flex-row justify-between items-center">
                <div className="flex flex-row gap-3 items-center">
                  <div className="flex items-center justify-center w-12 h-12 rounded-sm bg-blue-100">
                    <Icon className="size-7 text-blue-600" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <h1 className="font-semibold text-md">{project.title}</h1>
                    <p className="text-sm text-gray-500">{typeLabel} · {project.document_style}</p>
                  </div>
                </div>
              </div>

              <Field className="w-full">
                <FieldLabel htmlFor={`progress-${project.id}`}>
                  <span>{statusLabel}</span>
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
        })}

        {/* Empty state fillers if less than 2 projects */}
        {!loading && projects.length === 0 && (
          <>
            <Card className="flex items-center justify-center p-4 min-h-59 border-dashed">
              <p className="text-sm text-gray-400">No projects yet</p>
            </Card>
            <Card className="flex items-center justify-center p-4 min-h-59 border-dashed">
              <p className="text-sm text-gray-400">No projects yet</p>
            </Card>
          </>
        )}
      </div>
    </div>
  );
}
