import { Router, type Router as ExpressRouter } from "express";
import { pdfController } from "../controllers/pdf.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { validate } from "../middlewares/validation.middleware";
import { exportPdfSchema } from "../validators/export.validator";
import { exportLimiter } from "../middlewares/rate-limit";

const router: ExpressRouter = Router();

/**
 * POST /api/pdf/brief
 * Generate PDF from project brief JSON
 * Cost: 1 coin
 */
router.post("/brief", authenticate, exportLimiter, validate(exportPdfSchema), pdfController.generateBriefPdf);

export default router;
