/**
 * ============================================
 * HISTORY CONTROLLER
 * Handles activity history retrieval
 * ============================================
 */

import { Request, Response } from "express";
import { asyncHandler } from "../utils/async-handler";
import { historyService } from "../services/history/history.service";
import { ErrorCodes } from "../utils/app-error";

export const historyController = {
    /**
     * Get user's activity history
     * @route GET /api/history
     * @query limit (default 20, max 100)
     * @query offset (default 0)
     */
    getHistory: asyncHandler(async (req: Request, res: Response): Promise<any> => {
        const userId = (req as any).user?.userId;

        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
                code: ErrorCodes.TOKEN_MISSING,
            });
        }

        const limit = Math.min(parseInt(req.query.limit as string) || 20, 100);
        const offset = parseInt(req.query.offset as string) || 0;

        const result = await historyService.getHistory(userId, limit, offset);

        return res.json({
            success: true,
            data: result.logs,
            pagination: {
                total: result.total,
                limit: result.limit,
                offset: result.offset,
            },
        });
    }),
};
