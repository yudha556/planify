import { Router, type Router as ExpressRouter } from "express";
import { markdownController } from "../controllers/markdown.controller";
import { authenticate } from "../middlewares/auth.middleware";

const router: ExpressRouter = Router();

/**
 * POST /api/markdown/brief
 * Generate Markdown from project brief JSON
 * Cost: 1 coin
 */
router.post("/brief", authenticate, markdownController.generateBriefMarkdown);

export default router;
