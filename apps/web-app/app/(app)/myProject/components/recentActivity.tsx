"use client";

import { useEffect, useState } from "react";
import { getProjects, deleteProject } from "@/services/project.service";
import ProjectProgress from "./projectProgress";
import { Loader2, FileText } from "lucide-react";

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

export default function RecentActivity() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const res = await getProjects();
      setProjects((res.data as any) || []);
    } catch (e: any) {
      setError(e.message || "Failed to load projects");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await deleteProject(id);
      setProjects((prev) => prev.filter((p) => p.id !== id));
    } catch (e: any) {
      alert(e.message || "Failed to delete project");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="animate-spin text-gray-400 size-8" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-md">
        <p className="text-sm text-red-600">{error}</p>
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-gray-400">
        <FileText className="size-12 mb-4 opacity-50" />
        <p>No projects yet. Create a new project to get started!</p>
      </div>
    );
  }

  return (
    <div className="w-full gap-8 flex flex-col mt-10">
      <div className="flex flex-row justify-between items-center w-full">
        <h2 className="text-xl font-semibold">Recent Activity</h2>
        <p className="text-gray-500 text-sm">Showing {projects.length} project{projects.length !== 1 ? "s" : ""}</p>
      </div>

      <div className="items-center justify-between grid grid-cols-3 gap-6">
        {projects.map((project) => (
          <ProjectProgress
            key={project.id}
            project={project}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}
