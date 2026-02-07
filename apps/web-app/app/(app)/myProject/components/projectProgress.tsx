
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
  GraduationCap,
  Pencil,
  Trash,
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function ProjectProgress() {
    return (
        <Card className="flex flex-col gap-8 p-4 w-full min-h-59">
          <div className="w-full flex flex-row justify-between items-center">
            <div className="flex flex-row gap-3 items-center">
              <div className="flex items-center justify-center w-12 h-12 rounded-sm bg-blue-100">
                <GraduationCap className="size-7 text-blue-600" />
              </div>
              <div className="flex flex-col gap-1">
                <h1 className="font-semibold text-md">
                  Student Research Portal
                </h1>
                <p className="text-sm text-gray-500">Web App . Education</p>
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
                <DropdownMenuItem>
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
                <DropdownMenuItem variant="destructive">
                  <Trash />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <Field className="w-full ">
            <FieldLabel htmlFor="progress-upload">
              <span>Completed</span>
              <span className="ml-auto">66%</span>
            </FieldLabel>
            <Progress value={66} id="progress-upload" />
          </Field>

          <div className="flex flex-row justify-between items-center w-full">
            <p className="text-gray-500 font-semibold text-sm">Edited 5 mins ago</p>
            <Button variant={"link"} className="cursor-pointer text-blue-600 flex flex-row gap-2 items-center">
                Continue <ArrowRight className="text-blue-600 size-4" />
            </Button>
          </div>
        </Card>
    )
}