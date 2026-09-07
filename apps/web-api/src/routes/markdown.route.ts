import { Router, type Router as ExpressRouter } from "express";
import { markdownController } from "../controllers/markdown.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { validate } from "../middlewares/validation.middleware";
import { exportMarkdownSchema } from "../validators/export.validator";
import { exportLimiter } from "../middlewares/rate-limit";

const router: ExpressRouter = Router();

/**
 * POST /api/markdown/brief
 * Generate Markdown from project brief JSON
 * Cost: 1 coin
 */
router.post("/brief", authenticate, exportLimiter, validate(exportMarkdownSchema), markdownController.generateBriefMarkdown);

export default router;
