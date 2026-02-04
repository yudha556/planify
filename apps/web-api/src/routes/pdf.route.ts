import { Router, type Router as ExpressRouter } from "express";
import { pdfController } from "../controllers/pdf.controller";
import { authenticate } from "../middlewares/auth.middleware";

const router: ExpressRouter = Router();

/**
 * POST /api/pdf/brief
 * Generate PDF from project brief JSON
 * Cost: 1 coin
 */
router.post("/brief", authenticate, pdfController.generateBriefPdf);

export default router;
