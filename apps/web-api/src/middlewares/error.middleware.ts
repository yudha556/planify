import { Request, Response, NextFunction } from "express";
import { AppError, ErrorCodes } from "../utils/app-error";

interface ErrorResponse {
  success: boolean;
  message: string;
  code: string;
  error?: string;
}

export function errorHandler(
  err: any,
  _: Request,
  res: Response,
  __: NextFunction
): void {
  // Handle AppError instances
  if (err instanceof AppError) {
    const response: ErrorResponse = {
      success: false,
      message: err.message,
      code: err.code,
      error: process.env.NODE_ENV === "development" ? err.stack : undefined,
    };

    console.error(`[ERROR] [${err.code}]`, err.message);
    res.status(err.statusCode).json(response);
    return;
  }

  // Handle unknown errors
  const status = err.status || err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  const code = err.code || ErrorCodes.INTERNAL_ERROR;

  console.error("[ERROR]", {
    code,
    status,
    message,
    stack: err.stack,
  });

  const response: ErrorResponse = {
    success: false,
    message,
    code,
    error: process.env.NODE_ENV === "development" ? err.stack : undefined,
  };

  res.status(status).json(response);
}
