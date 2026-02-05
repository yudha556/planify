import { Request, Response, NextFunction } from "express";
import { authService } from "../services/auth.service";
import { ErrorCodes } from "../utils/app-error";
import { tokenBlacklist } from "../utils/token-blacklist";

export const authenticate = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void | any> => {
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
        const decoded = await authService.verifyToken(token);
        req.user = decoded;
        next();
    } catch (error) {
        // AppError handling usually happens in error middleware, but here we catch inline
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token",
            code: ErrorCodes.TOKEN_INVALID,
        });
    }
};
