import { Request, Response } from "express";
import { asyncHandler } from "../utils/async-handler";
import { supabase } from "../services/supabase";
import { ErrorCodes } from "../utils/app-error";

export const projectsController = {
    /**
     * List user's projects
     * @route GET /api/projects
     */
    getProjects: asyncHandler(async (req: Request, res: Response) => {
        const userId = (req as any).user?.userId;

        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
                code: ErrorCodes.TOKEN_MISSING
            });
        }

        const { data, error } = await supabase
            .from("projects")
            .select("id, title, description, created_at, mode") // Added mode if exists, or remove if not in schema yet
            .eq("user_id", userId)
            .order("created_at", { ascending: false });

        if (error) {
            throw error;
        }

        return res.json({
            success: true,
            data: data
        });
    }),

    /**
     * Get project details
     * @route GET /api/projects/:id
     */
    getProject: asyncHandler(async (req: Request, res: Response) => {
        const userId = (req as any).user?.userId;
        const { id } = req.params;

        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
                code: ErrorCodes.TOKEN_MISSING
            });
        }

        const { data, error } = await supabase
            .from("projects")
            .select("*")
            .eq("id", id)
            .eq("user_id", userId)
            .single();

        if (error || !data) {
            return res.status(404).json({
                success: false,
                message: "Project not found",
                code: ErrorCodes.NOT_FOUND
            });
        }

        return res.json({
            success: true,
            data: data
        });
    }),

    /**
     * Delete project
     * @route DELETE /api/projects/:id
     */
    deleteProject: asyncHandler(async (req: Request, res: Response) => {
        const userId = (req as any).user?.userId;
        const { id } = req.params;

        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
                code: ErrorCodes.TOKEN_MISSING
            });
        }

        const { error } = await supabase
            .from("projects")
            .delete()
            .eq("id", id)
            .eq("user_id", userId);

        if (error) {
            throw error;
        }

        return res.json({
            success: true,
            message: "Project deleted successfully"
        });
    })
};
