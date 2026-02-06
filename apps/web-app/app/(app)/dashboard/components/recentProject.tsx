"use client";

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
import {
  Plus,
} from "lucide-react";
import { useRouter } from "next/navigation";
import ProjectProgress from "./projectProgress";

export default function RecentProject() {
  const router = useRouter();

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

      <div className=" items-center justify-between grid grid-cols-3  gap-6">
        <Card className=" w-full">
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
            <EmptyContent>
              <Button
                onClick={() => router.push("/newProject")}
                variant={"outline"}
                size={"lg"}
                className="cursor-pointer hover:shadow-md hover:translate-y-1"
              >
                Create Project
              </Button>
            </EmptyContent>
          </Empty>
        </Card>

        <ProjectProgress />
        <ProjectProgress />
        <ProjectProgress />
      </div>
    </div>
  );
}
