/**
 * ============================================
 * PROJECTS CONTROLLER
 * Handles project CRUD + auto-save
 * ============================================
 */

import { Request, Response } from "express";
import { asyncHandler } from "../utils/async-handler";
import { projectService } from "../services/project/project.service";
import { ErrorCodes } from "../utils/app-error";

export const projectsController = {
    /**
     * List user's projects
     * @route GET /api/projects
     */
    getProjects: asyncHandler(async (req: Request, res: Response): Promise<any> => {
        const userId = (req as any).user?.userId;

        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
                code: ErrorCodes.TOKEN_MISSING,
            });
        }

        const projects = await projectService.getProjects(userId);

        return res.json({
            success: true,
            data: projects,
        });
    }),

    /**
     * Get project detail
     * @route GET /api/projects/:id
     */
    getProject: asyncHandler(async (req: Request, res: Response): Promise<any> => {
        const userId = (req as any).user?.userId;
        const { id } = req.params;

        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
                code: ErrorCodes.TOKEN_MISSING,
            });
        }

        const project = await projectService.getProjectById(userId, id);

        if (!project) {
            return res.status(404).json({
                success: false,
                message: "Project not found",
                code: ErrorCodes.NOT_FOUND,
            });
        }

        return res.json({
            success: true,
            data: project,
        });
    }),

    /**
     * Create new project
     * @route POST /api/projects
     */
    createProject: asyncHandler(async (req: Request, res: Response): Promise<any> => {
        const userId = (req as any).user?.userId;

        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
                code: ErrorCodes.TOKEN_MISSING,
            });
        }

        const { title, description, projectType, documentStyle, formData, currentStep } = req.body;

        if (!title) {
            return res.status(400).json({
                success: false,
                message: "Title is required",
                code: ErrorCodes.VALIDATION_ERROR,
            });
        }

        const project = await projectService.createProject({
            userId,
            title,
            description,
            projectType,
            documentStyle,
            formData,
            currentStep,
        });

        return res.status(201).json({
            success: true,
            message: "Project created",
            data: project,
        });
    }),

    /**
     * Update project (auto-save)
     * @route PUT /api/projects/:id
     */
    updateProject: asyncHandler(async (req: Request, res: Response): Promise<any> => {
        const userId = (req as any).user?.userId;
        const { id } = req.params;

        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
                code: ErrorCodes.TOKEN_MISSING,
            });
        }

        // Check project exists and belongs to user
        const existing = await projectService.getProjectById(userId, id);
        if (!existing) {
            return res.status(404).json({
                success: false,
                message: "Project not found",
                code: ErrorCodes.NOT_FOUND,
            });
        }

        const { title, description, projectType, currentStep, formData, generatedBrief, documentStyle, status } = req.body;

        const updated = await projectService.updateProject(userId, id, {
            title,
            description,
            projectType,
            currentStep,
            formData,
            generatedBrief,
            documentStyle,
            status,
        });

        return res.json({
            success: true,
            message: "Project updated",
            data: updated,
        });
    }),

    /**
     * Delete project
     * @route DELETE /api/projects/:id
     */
    deleteProject: asyncHandler(async (req: Request, res: Response): Promise<any> => {
        const userId = (req as any).user?.userId;
        const { id } = req.params;

        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
                code: ErrorCodes.TOKEN_MISSING,
            });
        }

        await projectService.deleteProject(userId, id);

        return res.json({
            success: true,
            message: "Project deleted successfully",
        });
    }),
};
