import { Request, Response } from "express";
import { asyncHandler } from "../utils/async-handler";
import { userService } from "../services/user/user.service";

export const userController = {
    /**
     * Get current user's profile
     * @route GET /api/user/me
     */
    getMe: asyncHandler(async (req: Request, res: Response): Promise<any> => {
        const userId = (req as any).user?.userId || "anonymous";

        const profile = await userService.getProfile(userId);

        if (!profile) {
            return res.status(404).json({
                success: false,
                message: "User profile not found",
            });
        }

        return res.status(200).json({
            success: true,
            data: profile,
        });
    }),
};
