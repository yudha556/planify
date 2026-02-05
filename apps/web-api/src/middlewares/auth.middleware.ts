import { Request, Response, NextFunction } from "express";
import { ErrorCodes } from "../utils/app-error";
import { tokenBlacklist } from "../utils/token-blacklist";

import { supabase } from "../config/supabase";

export const authenticate = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<any> => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({
            success: false,
            message: "No token provided",
            code: ErrorCodes.TOKEN_MISSING,
        });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Invalid token format",
            code: ErrorCodes.TOKEN_INVALID,
        });
    }

    // Check if token is blacklisted (logged out)
    if (tokenBlacklist.isBlacklisted(token)) {
        return res.status(401).json({
            success: false,
            message: "Token has been revoked",
            code: ErrorCodes.TOKEN_REVOKED,
        });
    }

    try {
        const { data, error } = await supabase.auth.getUser(token);

        if (error || !data.user) {
            return res.status(401).json({
                success: false,
                message: "Invalid or expired token",
                code: ErrorCodes.TOKEN_INVALID,
            });
        }

        req.user = {
            userId: data.user.id,
            email: data.user.email || "",
        };

        next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Authentication failed",
            code: ErrorCodes.INTERNAL_ERROR,
        });
    }
};
