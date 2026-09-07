import { Request, Response, NextFunction } from "express";
import { AppError, ErrorCodes } from "../utils/app-error";
import { logger } from "../utils/logger";

interface ErrorResponse {
  success: boolean;
  message: string;
  code: string;
  error?: string;
}

export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  _next: NextFunction
): void {
  const reqId = (req as any).reqId || "unknown";

  // Handle AppError instances
  if (err instanceof AppError) {
    const response: ErrorResponse = {
      success: false,
      message: err.message,
      code: err.code,
      error: process.env.NODE_ENV === "development" ? err.stack : undefined,
    };

    logger.warn({ reqId, code: err.code, message: err.message, status: err.statusCode }, "AppError");
    res.status(err.statusCode).json(response);
    return;
  }

  // Handle Zod validation errors
  if (err.name === "ZodError") {
    const response: ErrorResponse = {
      success: false,
      message: "Validation failed",
      code: ErrorCodes.VALIDATION_ERROR,
      error: process.env.NODE_ENV === "development" ? JSON.stringify(err.errors) : undefined,
    };

    logger.warn({ reqId, errors: err.errors }, "Zod Validation Error");
    res.status(400).json(response);
    return;
  }

  // Handle unknown errors
  const status = err.status || err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  const code = err.code || ErrorCodes.INTERNAL_ERROR;

  logger.error({ reqId, code, status, message, stack: err.stack }, "Internal Error");

  const response: ErrorResponse = {
    success: false,
    message,
    code,
    error: process.env.NODE_ENV === "development" ? err.stack : undefined,
  };

  res.status(status).json(response);
}
