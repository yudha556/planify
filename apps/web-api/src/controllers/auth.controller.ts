import { Request, Response } from "express";
import { asyncHandler } from "../utils/async-handler";
import { authService } from "../services/auth.service";
import { ErrorCodes } from "../utils/app-error";
import { tokenBlacklist } from "../utils/token-blacklist";

/**
 * ============================================
 * AUTH CONTROLLER
 * Handles authentication-related operations
 * ============================================
 */
export const authController = {
  /**
   * Register - Mendaftarkan user baru
   * @route POST /api/auth/register
   * @body { email: string, password: string, name?: string }
   * @returns { success, message, data: { id, email, name, createdAt, updatedAt } }
   */
  register: asyncHandler(async (req: Request, res: Response): Promise<any> => {
    const { email, name, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
        code: ErrorCodes.AUTH_MISSING_FIELDS,
      });
    }

    const user = await authService.createUser(email, password, name);

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: user,
    });
  }),

  /**
   * Login - Autentikasi user dan generate JWT token
   * @route POST /api/auth/login
   * @body { email: string, password: string }
   * @returns { success, message, data: { token, user: { id, email, name } } }
   *
   * Token harus disimpan di FE (localStorage/state) dan dikirim
   * di header Authorization untuk request yang butuh auth.
   */
  login: asyncHandler(async (req: Request, res: Response): Promise<any> => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
        code: ErrorCodes.AUTH_MISSING_FIELDS,
      });
    }

    const { token, user } = await authService.loginUser(email, password);

    return res.status(200).json({
      success: true,
      message: "Login successful",
      data: { token, user },
    });
  }),

  /**
   * GetMe - Mendapatkan data user yang sedang login
   * @route GET /api/auth/me
   * @header Authorization: "Bearer <token>"
   * @returns { success, message, data: { userId, email } }
   *
   * Endpoint ini protected, harus kirim token di header.
   */
  getMe: asyncHandler(async (req: Request, res: Response): Promise<any> => {
    return res.status(200).json({
      success: true,
      message: "User profile retrieved",
      data: req.user,
    });
  }),

  /**
   * Logout - Invalidate token (masuk blacklist)
   * @route POST /api/auth/logout
   * @header Authorization: "Bearer <token>"
   * @returns { success, message }
   *
   * Setelah logout, token yang sama tidak bisa dipakai lagi.
   * FE harus hapus token dari localStorage/state setelah hit endpoint ini.
   */
  logout: asyncHandler(async (req: Request, res: Response): Promise<any> => {
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(" ")[1];

    if (token) {
      tokenBlacklist.add(token);
    }

    return res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  }),
};
