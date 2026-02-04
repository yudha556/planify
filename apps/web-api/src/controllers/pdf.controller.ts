/**
 * ============================================
 * PDF CONTROLLER
 * Handles PDF generation requests
 * ============================================
 */

import { Request, Response } from "express";
import { asyncHandler } from "../utils/async-handler";
import { pdfService } from "../services/pdf/pdf.service";
import { ProjectBriefOutput } from "../services/ai/types";
import { coinService, COIN_COSTS } from "../services/coin";
import { ErrorCodes } from "../utils/app-error";

export const pdfController = {
    /**
     * Generate PDF from Project Brief
     * @route POST /api/pdf/brief
     * @body ProjectBriefOutput
     */
    generateBriefPdf: asyncHandler(
        async (req: Request, res: Response): Promise<any> => {
            const brief: ProjectBriefOutput = req.body;
            const userId = (req as any).user?.userId || "anonymous";

            if (!brief || !brief.title) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid project brief data",
                    code: ErrorCodes.VALIDATION_ERROR,
                });
            }

            // Check coins
            const cost = COIN_COSTS.PDF;
            if (!coinService.hasEnough(userId, cost)) {
                return res.status(402).json({
                    success: false,
                    message: `Insufficient coins. Need ${cost}, have ${coinService.getBalance(userId)}`,
                    code: "INSUFFICIENT_COINS",
                });
            }

            // Convert brief to HTML
            // This logic mirrors the frontend rendering but server-side
            const htmlContent = `
                <div class="section">
                    <h3>Overview</h3>
                    <p>${brief.overview}</p>
                </div>

                <div class="section">
                    <h3>Objectives</h3>
                    <ul>
                        ${brief.objectives.map(o => `<li>${o}</li>`).join("")}
                    </ul>
                </div>

                <div class="section">
                    <h3>Target Audience</h3>
                    <p>${brief.targetAudience}</p>
                </div>

                <div class="section page-break-before">
                    <h3>Key Features</h3>
                    ${brief.keyFeatures.map(f => `
                        <div style="margin-bottom: 10px;">
                            <strong>${f.name}</strong>
                            <p>${f.description}</p>
                        </div>
                    `).join("")}
                </div>

                <div class="section page-break-before">
                    <h3>Tech Stack Recommendations</h3>
                    ${brief.recommendedTechStack.map(t => `
                        <div style="margin-bottom: 10px;">
                            <span class="tag">${t.category}</span>
                            <strong>${t.technology}</strong>
                            <p>${t.reason}</p>
                        </div>
                    `).join("")}
                </div>
                
                ${brief.diagram ? `
                <div class="mermaid-section">
                    <h3>Architecture Diagram</h3>
                    <p style="margin-bottom: 1rem;">${brief.diagram.description}</p>
                    <div class="mermaid">
                        ${brief.diagram.diagram}
                    </div>
                </div>
                ` : ''}
            `;

            const fullHtml = pdfService.createHtmlTemplate(brief.title, htmlContent);

            // Generate PDF
            const pdfBuffer = await pdfService.generatePdf(fullHtml);

            // Deduct coins
            coinService.deduct(userId, cost);

            // Send response
            res.setHeader("Content-Type", "application/pdf");
            res.setHeader("Content-Disposition", `attachment; filename="${brief.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_brief.pdf"`);
            // Custom header to inform client about updated coins (difficult in binary response, so we skip or use header)
            res.setHeader("X-Coins-Remaining", coinService.getBalance(userId).toString());

            return res.send(pdfBuffer);
        }
    ),
};
