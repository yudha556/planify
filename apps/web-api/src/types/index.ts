// import { Request } from "express"; // Removed unused import

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

export interface AuthPayload {
  userId: number;
  email: string;
}

export interface User {
  id: number;
  email: string;
  name?: string | null;
}

declare global {
  namespace Express {
    interface Request {
      user?: AuthPayload;
    }
  }
}
