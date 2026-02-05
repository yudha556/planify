import { Router } from "express";
import { projectsController } from "../controllers/projects.controller";
import { authenticate } from "../middlewares/auth.middleware";

const router: Router = Router();

router.get("/", authenticate, projectsController.getProjects);
router.get("/:id", authenticate, projectsController.getProject);
router.delete("/:id", authenticate, projectsController.deleteProject);

export default router;
