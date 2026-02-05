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
import { supabase } from "../services/supabase";

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
            const {
                projectName,
                projectDescription,
                targetAudience,
                keyFeatures,
                techStack,
                mode,
                includeDiagram,
                budget,
                timeline
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

            // ... imports


            // ... inside generateProjectBrief ...

            // Check coins
            // Draft: 2, Polished: 4, Diagram: 2
            const briefCost = mode === "polished" ? COIN_COSTS.BRIEF_POLISHED : COIN_COSTS.BRIEF_DRAFT;
            const diagramCost = includeDiagram ? COIN_COSTS.DIAGRAM : 0;
            const totalCost = briefCost + diagramCost;

            // [MODIFIED]: await async coin check
            const hasCoins = await coinService.hasEnough(userId, totalCost);
            const currentBalance = await coinService.getBalance(userId);

            if (!hasCoins) {
                return res.status(402).json({
                    success: false,
                    message: `Insufficient coins. Need ${totalCost}, have ${currentBalance}`,
                    code: AI_ERROR_CODES.INSUFFICIENT_COINS,
                    coins: currentBalance,
                });
            }

            const input: ProjectBriefInput = {
                projectName,
                projectDescription,
                targetAudience,
                keyFeatures,
                techStack,
                budget,
                timeline,
                mode: mode === "polished" ? "polished" : "draft",
            };

            // 1. Generate Brief
            const result = await aiService.generateProjectBrief(input);
            const briefData = result.data;

            // 2. Generate Diagram (if requested)
            let diagramData = undefined;
            if (includeDiagram && briefData) {
                const diagramInput: DiagramInput = {
                    projectName,
                    projectDescription,
                    techStack: briefData.recommendedTechStack.map(t => t.technology)
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

            // [NEW] Save to Supabase 'projects' table
            if (userId && userId !== "anonymous") {
                await supabase.from("projects").insert({
                    user_id: userId,
                    title: projectName,
                    description: projectDescription,
                    content: briefData,
                });
            }

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
            if (!coinService.hasEnough(userId, cost)) {
                return res.status(402).json({
                    success: false,
                    message: `Insufficient coins. Need ${cost}, have ${coinService.getBalance(userId)}`,
                    code: AI_ERROR_CODES.INSUFFICIENT_COINS,
                    coins: coinService.getBalance(userId),
                });
            }

            const input: DiagramInput = { projectName, projectDescription, techStack };
            const result = await aiService.generateDiagram(input);

            // Deduct coins
            coinService.deduct(userId, cost);

            return res.status(200).json({
                success: true,
                message: "Diagram generated successfully",
                data: result.data,
                metadata: result.metadata,
                coins: coinService.getBalance(userId),
            });
        }
    ),

    /**
     * Get user's coin balance
     * @route GET /api/ai/coins
     */
    getCoins: asyncHandler(async (req: Request, res: Response): Promise<any> => {
        const userId = (req as any).user?.userId || "anonymous";
        return res.status(200).json({
            success: true,
            coins: await coinService.getBalance(userId),
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

    /**
     * Regenerate a specific section
     * @route POST /api/ai/regenerate-section
     */
    regenerateSection: asyncHandler(
        async (req: Request, res: Response): Promise<any> => {
            const { currentContent, section, instruction } = req.body;
            const userId = (req as any).user?.userId || "anonymous";

            if (!currentContent || !section || !instruction) {
                return res.status(400).json({
                    success: false,
                    message: "currentContent, section, and instruction are required",
                    code: ErrorCodes.VALIDATION_ERROR,
                });
            }

            // Check coins (Cost: 1)
            const cost = 1;
            if (!await coinService.hasEnough(userId, cost)) {
                return res.status(402).json({
                    success: false,
                    message: `Insufficient coins. Need ${cost}, have ${await coinService.getBalance(userId)}`,
                    code: AI_ERROR_CODES.INSUFFICIENT_COINS,
                    coins: await coinService.getBalance(userId),
                });
            }

            // Allowed sections
            const ALLOWED_SECTIONS = [
                "overview", "problemStatement", "objectives", "keyFeatures",
                "userFlow", "srsModules", "recommendedTechStack",
                "scope", "risks", "clarificationLog"
            ];

            if (!ALLOWED_SECTIONS.includes(section)) {
                return res.status(400).json({
                    success: false,
                    message: `Invalid section. Allowed: ${ALLOWED_SECTIONS.join(", ")}`,
                    code: ErrorCodes.VALIDATION_ERROR,
                });
            }

            const result = await aiService.regenerateSection(currentContent, section, instruction);

            // Deduct coins
            await coinService.deduct(userId, cost);

            return res.status(200).json({
                success: true,
                message: "Section regenerated successfully",
                data: result.data,
                metadata: result.metadata,
                coins: await coinService.getBalance(userId),
            });
        }
    ),
};
