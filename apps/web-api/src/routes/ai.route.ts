import { type Router as ExpressRouter } from "express";
import { Router } from "express";
import { aiController } from "../controllers/ai.controller";
import { authenticate } from "../middlewares/auth.middleware";

const router: ExpressRouter = Router();

/**
 * ============================================
 * AI ROUTES - FE baca ini plis
 * Base URL: /api/ai
 * ============================================
 */

/**
 * GET /api/ai/status
 * Check AI service availability
 *
 * Success Response (200):
 *   { success: true, data: { available: boolean, provider: string } }
 *
 * Notes:
 *   - No auth required
 *   - Use to check if AI generation is available before showing feature
 */
router.get("/status", aiController.getStatus);

/**
 * POST /api/ai/project-brief
 * Generate project brief menggunakan AI
 * REQUIRES: Authorization header dengan Bearer token
 * Deducts coins: draft=1, polished=3
 */
router.post("/project-brief", authenticate, aiController.generateProjectBrief);

/**
 * POST /api/ai/diagram
 * Generate Mermaid architecture diagram
 * REQUIRES: Authorization header dengan Bearer token
 * Deducts coins: 2
 */
router.post("/diagram", authenticate, aiController.generateDiagram);

/**
 * GET /api/ai/coins
 * Get user's coin balance
 * REQUIRES: Authorization header dengan Bearer token
 */
router.get("/coins", authenticate, aiController.getCoins);

export default router;
