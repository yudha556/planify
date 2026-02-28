/**
 * ============================================
 * PROJECT SERVICE
 * CRUD operations for projects table via Supabase
 * ============================================
 */

import { supabase } from "../../config/supabase";

export interface CreateProjectInput {
    userId: string;
    title: string;
    description?: string;
    projectType?: string;
    documentStyle?: string;
    formData?: Record<string, any>;
    currentStep?: number;
}

export interface UpdateProjectInput {
    title?: string;
    description?: string;
    projectType?: string;
    currentStep?: number;
    formData?: Record<string, any>;
    generatedBrief?: Record<string, any> | null;
    documentStyle?: string;
    status?: string;
}

export const projectService = {
    /**
     * Get all projects for a user (summary list)
     */
    async getProjects(userId: string) {
        const { data, error } = await supabase
            .from("projects")
            .select("id, title, description, project_type, current_step, document_style, status, created_at, updated_at")
            .eq("user_id", userId)
            .order("updated_at", { ascending: false });

        if (error) throw error;
        return data || [];
    },

    /**
     * Get single project by ID (full detail)
     */
    async getProjectById(userId: string, projectId: string) {
        const { data, error } = await supabase
            .from("projects")
            .select("*")
            .eq("id", projectId)
            .eq("user_id", userId)
            .single();

        if (error) return null;
        return data;
    },

    /**
     * Create a new project
     */
    async createProject(input: CreateProjectInput) {
        const { data, error } = await supabase
            .from("projects")
            .insert({
                user_id: input.userId,
                title: input.title,
                description: input.description || "",
                project_type: input.projectType || "webapp",
                document_style: input.documentStyle || "professional",
                form_data: input.formData || {},
                current_step: input.currentStep || 1,
                status: "draft",
            })
            .select()
            .single();

        if (error) throw error;
        return data;
    },

    /**
     * Update project (auto-save)
     */
    async updateProject(userId: string, projectId: string, input: UpdateProjectInput) {
        const updateData: Record<string, any> = {};

        if (input.title !== undefined) updateData.title = input.title;
        if (input.description !== undefined) updateData.description = input.description;
        if (input.projectType !== undefined) updateData.project_type = input.projectType;
        if (input.currentStep !== undefined) updateData.current_step = input.currentStep;
        if (input.formData !== undefined) updateData.form_data = input.formData;
        if (input.generatedBrief !== undefined) updateData.generated_brief = input.generatedBrief;
        if (input.documentStyle !== undefined) updateData.document_style = input.documentStyle;
        if (input.status !== undefined) updateData.status = input.status;

        const { data, error } = await supabase
            .from("projects")
            .update(updateData)
            .eq("id", projectId)
            .eq("user_id", userId)
            .select()
            .single();

        if (error) throw error;
        return data;
    },

    /**
     * Delete a project
     */
    async deleteProject(userId: string, projectId: string) {
        const { error } = await supabase
            .from("projects")
            .delete()
            .eq("id", projectId)
            .eq("user_id", userId);

        if (error) throw error;
        return true;
    },
};
