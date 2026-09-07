import { Router, type Router as ExpressRouter } from "express";
import { userController } from "../controllers/user.controller";
import { authenticate } from "../middlewares/auth.middleware";

const router: ExpressRouter = Router();

/**
 * GET /api/user/me
 * Get current user's profile (coins, name, email, etc.)
 */
router.get("/me", authenticate, userController.getMe);

export default router;
