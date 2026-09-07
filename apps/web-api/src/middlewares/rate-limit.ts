import rateLimit from "express-rate-limit";
import { Request, Response } from "express";

const createLimiter = (windowMs: number, max: number, message: string) =>
  rateLimit({
    windowMs,
    max,
    message: { success: false, message, code: "RATE_LIMIT_EXCEEDED" },
    standardHeaders: true,
    legacyHeaders: false,
    keyGenerator: (_req: Request) => _req.ip || "unknown",
    handler: (_req: Request, res: Response) => {
      res.status(429).json({
        success: false,
        message,
        code: "RATE_LIMIT_EXCEEDED",
      });
    },
    skip: (_req: Request) => {
      if (process.env.NODE_ENV === "test") return true;
      return false;
    },
  });

export const generalLimiter = createLimiter(
  15 * 60 * 1000,
  100,
  "Too many requests from this IP, please try again later."
);

export const authLimiter = createLimiter(
  15 * 60 * 1000,
  5,
  "Too many authentication attempts, please try again later."
);

export const aiLimiter = createLimiter(
  60 * 60 * 1000,
  20,
  "Too many AI generation requests, please try again later."
);

export const exportLimiter = createLimiter(
  60 * 60 * 1000,
  10,
  "Too many export requests, please try again later."
);