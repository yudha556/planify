import { Router, type Router as ExpressRouter } from "express";
import { projectsController } from "../controllers/projects.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { validate } from "../middlewares/validation.middleware";
import { createProjectSchema, updateProjectSchema, getProjectSchema, deleteProjectSchema } from "../validators/project.validator";

const router: ExpressRouter = Router();

/**
 * GET /api/projects
 * List user's projects
 */
router.get("/", authenticate, projectsController.getProjects);

/**
 * GET /api/projects/:id
 * Get project detail
 */
router.get("/:id", authenticate, validate(getProjectSchema), projectsController.getProject);

/**
 * POST /api/projects
 * Create new project
 */
router.post("/", authenticate, validate(createProjectSchema), projectsController.createProject);

/**
 * PUT /api/projects/:id
 * Update project (auto-save)
 */
router.put("/:id", authenticate, validate(updateProjectSchema), projectsController.updateProject);

/**
 * DELETE /api/projects/:id
 * Delete project
 */
router.delete("/:id", authenticate, validate(deleteProjectSchema), projectsController.deleteProject);

export default router;
