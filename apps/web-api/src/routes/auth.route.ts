import { type Router as ExpressRouter } from "express";
import { Router } from "express";
import { authController } from "../controllers/auth.controller";

import { authenticate } from "../middlewares/auth.middleware";

const router: ExpressRouter = Router();

/**
 * ============================================
 * AUTH ROUTES - FE baca ini plis
 * Base URL: /api/auth
 * ============================================
 */

/**
 * POST /api/auth/register
 * Mendaftarkan user baru
 *
 * Request Body:
 *   - email: string (required)
 *   - password: string (required)
 *   - name: string (optional)
 *
 * Success Response (201):
 *   { success: true, message: "...", data: { id, email, name, createdAt, updatedAt } }
 *
 * Error Codes:
 *   - AUTH_MISSING_FIELDS: email/password tidak diisi
 *   - AUTH_EMAIL_EXISTS: email sudah terdaftar
 */
router.post("/register", authController.register);

/**
 * POST /api/auth/login
 * Login dan mendapatkan JWT token
 *
 * Request Body:
 *   - email: string (required)
 *   - password: string (required)
 *
 * Success Response (200):
 *   { success: true, message: "...", data: { token, user: { id, email, name } } }
 *
 * Error Codes:
 *   - AUTH_MISSING_FIELDS: email/password tidak diisi
 *   - AUTH_INVALID_CREDENTIALS: email/password salah
 */
router.post("/login", authController.login);

/**
 * GET /api/auth/me
 * Mendapatkan data user yang sedang login
 * REQUIRES: Authorization header dengan Bearer token
 *
 * Request Headers:
 *   - Authorization: "Bearer <token>"
 *
 * Success Response (200):
 *   { success: true, message: "...", data: { userId, email } }
 *
 * Error Codes:
 *   - TOKEN_MISSING: tidak ada token di header
 *   - TOKEN_INVALID: token tidak valid
 *   - TOKEN_EXPIRED: token sudah kadaluarsa
 *   - TOKEN_REVOKED: token sudah di-logout (blacklisted)
 */
router.get("/me", authenticate, authController.getMe);

/**
 * POST /api/auth/logout
 * Logout dan invalidate token (masuk blacklist)
 * REQUIRES: Authorization header dengan Bearer token
 *
 * Request Headers:
 *   - Authorization: "Bearer <token>"
 *
 * Success Response (200):
 *   { success: true, message: "Logged out successfully" }
 *
 * Note: Setelah logout, token yang sama tidak bisa dipakai lagi.
 *       FE harus hapus token dari localStorage/state.
 */
router.post("/logout", authenticate, authController.logout);

export default router;
