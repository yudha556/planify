import { Router, type Router as ExpressRouter } from "express";
import { historyController } from "../controllers/history.controller";
import { authenticate } from "../middlewares/auth.middleware";

const router: ExpressRouter = Router();

/**
 * GET /api/history
 * Get user's activity history (paginated)
 */
router.get("/", authenticate, historyController.getHistory);

export default router;
