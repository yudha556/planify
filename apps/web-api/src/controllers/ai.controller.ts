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
import { ErrorCodes } from "../utils/app-error";

// AI-specific error codes
const AI_ERROR_CODES = {
    INSUFFICIENT_COINS: "INSUFFICIENT_COINS",
};

export const aiController = {
    /**
     * Generate Project Brief
     * @route POST /api/ai/project-brief
     */
    generateProjectBrief: asyncHandler(
        async (req: Request, res: Response): Promise<any> => {
            const { projectName, projectDescription, projectType, targetAudience, keyFeatures, techStack, mode, includeDiagram } =
                req.body;
            const userId = (req as any).user?.userId || "anonymous";

            // Validate required fields
            if (!projectName || !projectDescription) {
                return res.status(400).json({
                    success: false,
                    message: "projectName and projectDescription are required",
                    code: ErrorCodes.VALIDATION_ERROR,
                });
            }

            // Check coins
            // Draft: 2, Polished: 4, Diagram: 2
            const briefCost = mode === "polished" ? COIN_COSTS.BRIEF_POLISHED : COIN_COSTS.BRIEF_DRAFT;
            const diagramCost = includeDiagram ? COIN_COSTS.DIAGRAM : 0;
            const totalCost = briefCost + diagramCost;

            const hasEnough = await coinService.hasEnough(userId, totalCost);
            if (!hasEnough) {
                const balance = await coinService.getBalance(userId);
                return res.status(402).json({
                    success: false,
                    message: `Insufficient coins. Need ${totalCost}, have ${balance}`,
                    code: AI_ERROR_CODES.INSUFFICIENT_COINS,
                    coins: balance,
                });
            }

            const input: ProjectBriefInput = {
                projectName,
                projectDescription,
                projectType: projectType || "webapp",
                targetAudience,
                keyFeatures,
                techStack,
                mode: mode === "polished" ? "polished" : "draft",
            };

            // 1. Generate Brief
            const result = await aiService.generateProjectBrief(input);
            const briefData = result.data;

            // 2. Generate Diagram (if requested)
            let diagramData = undefined;
            if (includeDiagram && briefData) {
                // Use the structured output from the brief to inform the diagram generation if possible,
                // or just stay consistent with inputs.
                // Using input is faster/parallel, but using brief might be more consistent.
                // Let's stick to using input for now to avoid complexity of "chained" prompts in a simple controller.
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

            // Deduct coins on success
            await coinService.deduct(userId, totalCost);
            const newBalance = await coinService.getBalance(userId);

            return res.status(200).json({
                success: true,
                message: "Project brief generated successfully",
                data: briefData,
                metadata: {
                    ...result.metadata,
                    diagramIncluded: !!diagramData
                },
                coins: newBalance,
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
            coins: coins,
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
