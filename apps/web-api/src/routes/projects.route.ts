import { Router, type Router as ExpressRouter } from "express";
import { projectsController } from "../controllers/projects.controller";
import { authenticate } from "../middlewares/auth.middleware";

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
router.get("/:id", authenticate, projectsController.getProject);

/**
 * POST /api/projects
 * Create new project
 */
router.post("/", authenticate, projectsController.createProject);

/**
 * PUT /api/projects/:id
 * Update project (auto-save)
 */
router.put("/:id", authenticate, projectsController.updateProject);

/**
 * DELETE /api/projects/:id
 * Delete project
 */
router.delete("/:id", authenticate, projectsController.deleteProject);

export default router;
