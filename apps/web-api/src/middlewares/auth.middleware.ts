import { Request, Response, NextFunction } from "express";
import jwt, { TokenExpiredError, JsonWebTokenError } from "jsonwebtoken";
import { env } from "../config/env";
import { AuthPayload } from "../types";
import { ErrorCodes } from "../utils/app-error";
import { tokenBlacklist } from "../utils/token-blacklist";

export const authenticate = (
    req: Request,
    res: Response,
    next: NextFunction
): void | any => {
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
        const decoded = jwt.verify(token, env.jwtSecret) as AuthPayload;
        req.user = decoded;
        next();
    } catch (error) {
        // Differentiate between expired and invalid tokens
        if (error instanceof TokenExpiredError) {
            return res.status(401).json({
                success: false,
                message: "Token has expired",
                code: ErrorCodes.TOKEN_EXPIRED,
            });
        }

        if (error instanceof JsonWebTokenError) {
            return res.status(401).json({
                success: false,
                message: "Invalid token",
                code: ErrorCodes.TOKEN_INVALID,
            });
        }

        return res.status(401).json({
            success: false,
            message: "Authentication failed",
            code: ErrorCodes.TOKEN_INVALID,
        });
    }
};
