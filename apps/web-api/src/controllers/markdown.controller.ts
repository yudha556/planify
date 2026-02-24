/**
 * ============================================
 * MARKDOWN CONTROLLER
 * Handles Markdown export requests
 * ============================================
 */

import { Request, Response } from "express";
import { asyncHandler } from "../utils/async-handler";
import { markdownService } from "../services/markdown/markdown.service";
import { ProjectBriefOutput } from "../services/ai/types";
import { coinService, COIN_COSTS } from "../services/coin";
import { ErrorCodes } from "../utils/app-error";

export const markdownController = {
    /**
     * Generate Markdown from Project Brief
     * @route POST /api/markdown/brief
     * @body ProjectBriefOutput
     */
    generateBriefMarkdown: asyncHandler(
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
            const cost = COIN_COSTS.MARKDOWN;
            const hasEnough = await coinService.hasEnough(userId, cost);

            if (!hasEnough) {
                const balance = await coinService.getBalance(userId);
                return res.status(402).json({
                    success: false,
                    message: `Insufficient coins. Need ${cost}, have ${balance}`,
                    code: "INSUFFICIENT_COINS",
                });
            }

            // Generate Markdown
            const markdown = markdownService.generateMarkdown(brief);

            // Deduct coins
            await coinService.deduct(userId, cost);

            // Send as downloadable .md file
            const filename = `${brief.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_brief.md`;
            const newBalance = await coinService.getBalance(userId);

            res.setHeader("Content-Type", "text/markdown; charset=utf-8");
            res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
            res.setHeader("X-Coins-Remaining", newBalance.toString());

            return res.send(markdown);
        }
    ),
};
