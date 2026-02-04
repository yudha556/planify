export class AppError extends Error {
    public readonly statusCode: number;
    public readonly code: string;
    public readonly isOperational: boolean;

    constructor(message: string, statusCode: number, code: string) {
        super(message);
        this.statusCode = statusCode;
        this.code = code;
        this.isOperational = true;

        Error.captureStackTrace(this, this.constructor);
    }
}

// Auth Error Codes
export const ErrorCodes = {
    // Auth
    AUTH_INVALID_CREDENTIALS: "AUTH_INVALID_CREDENTIALS",
    AUTH_EMAIL_EXISTS: "AUTH_EMAIL_EXISTS",
    AUTH_MISSING_FIELDS: "AUTH_MISSING_FIELDS",

    // Token
    TOKEN_MISSING: "TOKEN_MISSING",
    TOKEN_INVALID: "TOKEN_INVALID",
    TOKEN_EXPIRED: "TOKEN_EXPIRED",
    TOKEN_REVOKED: "TOKEN_REVOKED",

    // General
    VALIDATION_ERROR: "VALIDATION_ERROR",
    NOT_FOUND: "NOT_FOUND",
    INTERNAL_ERROR: "INTERNAL_ERROR",
} as const;

export type ErrorCode = (typeof ErrorCodes)[keyof typeof ErrorCodes];
