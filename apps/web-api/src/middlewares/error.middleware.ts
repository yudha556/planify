import { Request, Response, NextFunction } from "express";
import { ApiResponse } from "../types";

export function errorHandler(
  err: any,
  _: Request,
  res: Response,
  __: NextFunction
) {
  const status = err.status || err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  console.error("[ERROR]", {
    status,
    message,
    stack: err.stack,
  });

  const response: ApiResponse = {
    success: false,
    message,
    error: process.env.NODE_ENV === "development" ? err.stack : undefined,
  };

  res.status(status).json(response);
}
