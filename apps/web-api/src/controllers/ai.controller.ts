/**
 * ============================================
 * AI CONTROLLER
 * Handles AI generation requests
 * ============================================
 */

import { Request, Response } from "express";
import { asyncHandler } from "../utils/async-handler";
import { aiService, ProjectBriefInput, DiagramInput } from "../services/ai";
import { coinService, COIN_COSTS } from "../services/coin";
import { historyService } from "../services/history/history.service";
import { ErrorCodes } from "../utils/app-error";

// AI-specific error codes
const AI_ERROR_CODES = {
    INSUFFICIENT_COINS: "INSUFFICIENT_COINS",
};

export const aiController = {
    /**
     * Generate Project Brief
     * @route POST /api/ai/project-brief
     * NOTE: Generation is FREE (preview). Coins only for export (PDF/Markdown).
     */
    generateProjectBrief: asyncHandler(
        async (req: Request, res: Response): Promise<any> => {
            const {
                projectName,
                projectDescription,
                projectType,
                documentStyle,
                outputLanguage,
                projectStatus,
                targetAudience,
                keyFeatures,
                techStack,
                primaryMetric,
                outOfScope,
                integrationRequirements,
                knownConstraints,
                includeDiagram
            } = req.body;
            const userId = (req as any).user?.userId || "anonymous";

            // Validate required fields
            if (!projectName || !projectDescription) {
                return res.status(400).json({
                    success: false,
                    message: "projectName and projectDescription are required",
                    code: ErrorCodes.VALIDATION_ERROR,
                });
            }

            const input: ProjectBriefInput = {
                projectName,
                projectDescription,
                projectType: projectType || "webapp",
                documentStyle: documentStyle || "professional",
                outputLanguage,
                projectStatus,
                targetAudience,
                keyFeatures,
                techStack,
                primaryMetric,
                outOfScope,
                integrationRequirements,
                knownConstraints,
            };

            // 1. Generate Brief (FREE - no coin deduction)
            const result = await aiService.generateProjectBrief(input);
            const briefData = result.data;

            // 2. Generate Diagram (if requested, also FREE)
            let diagramData = undefined;
            if (includeDiagram && briefData) {
                const diagramInput: DiagramInput = {
                    projectName,
                    projectDescription,
                    projectType: projectType || "webapp",
                    techStack: briefData.recommendedTechStack?.map(t => t.technology) || techStack || []
                };

                const diagramResult = await aiService.generateDiagram(diagramInput);
                if (diagramResult.success && diagramResult.data) {
                    diagramData = diagramResult.data;
                    briefData.diagram = diagramData; // Attach to brief output
                }
            }

            // Get coin balance for display (not deducting)
            const coins = await coinService.getBalance(userId);

            // Log activity (non-blocking)
            historyService.logActivity({
                userId,
                action: "generate_brief",
                coinsUsed: 0,
                metadata: {
                    projectTitle: briefData?.title || projectName,
                    projectType: projectType || "webapp",
                    documentStyle: documentStyle || "professional",
                    diagramIncluded: !!diagramData,
                },
            });

            return res.status(200).json({
                success: true,
                message: "Project brief generated successfully",
                data: briefData,
                metadata: {
                    ...result.metadata,
                    diagramIncluded: !!diagramData
                },
                coins: coins,
            });
        }
    ),

    /**
     * Generate Architecture Diagram
     * @route POST /api/ai/diagram
     */
    generateDiagram: asyncHandler(
        async (req: Request, res: Response): Promise<any> => {
            const { projectName, projectDescription, techStack } = req.body;
            const userId = (req as any).user?.userId || "anonymous";

            if (!projectName || !projectDescription) {
                return res.status(400).json({
                    success: false,
                    message: "projectName and projectDescription are required",
                    code: ErrorCodes.VALIDATION_ERROR,
                });
            }

            // Check coins
            const cost = COIN_COSTS.DIAGRAM;
            const hasEnough = await coinService.hasEnough(userId, cost);
            if (!hasEnough) {
                const balance = await coinService.getBalance(userId);
                return res.status(402).json({
                    success: false,
                    message: `Insufficient coins. Need ${cost}, have ${balance}`,
                    code: AI_ERROR_CODES.INSUFFICIENT_COINS,
                    coins: balance,
                });
            }

            const input: DiagramInput = { projectName, projectDescription, techStack };
            const result = await aiService.generateDiagram(input);

            // Deduct coins
            await coinService.deduct(userId, cost);
            const newBalance = await coinService.getBalance(userId);

            return res.status(200).json({
                success: true,
                message: "Diagram generated successfully",
                data: result.data,
                metadata: result.metadata,
                coins: newBalance,
            });
        }
    ),

    /**
     * Get user's coin balance
     * @route GET /api/ai/coins
     */
    getCoins: asyncHandler(async (req: Request, res: Response): Promise<any> => {
        const userId = (req as any).user?.userId || "anonymous";
        const coins = await coinService.getBalance(userId);
        return res.status(200).json({
            success: true,
            data: { credits: coins },
        });
    }),

    /**
     * Check AI service status
     * @route GET /api/ai/status
     */
    getStatus: asyncHandler(async (_req: Request, res: Response): Promise<any> => {
        const available = aiService.isAvailable();
        const provider = aiService.getProviderName();

        return res.status(200).json({
            success: true,
            data: { available, provider },
        });
    }),
};
