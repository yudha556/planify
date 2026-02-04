import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { prisma } from "../config/db";
import { env } from "../config/env";
import { AuthPayload } from "../types";
import { AppError, ErrorCodes } from "../utils/app-error";

export const authService = {
  async createUser(email: string, password: string, name?: string) {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new AppError(
        "Email already registered",
        400,
        ErrorCodes.AUTH_EMAIL_EXISTS
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
      },
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return user;
  },

  async loginUser(email: string, password: string) {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new AppError(
        "Invalid credentials",
        401,
        ErrorCodes.AUTH_INVALID_CREDENTIALS
      );
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new AppError(
        "Invalid credentials",
        401,
        ErrorCodes.AUTH_INVALID_CREDENTIALS
      );
    }

    const payload: AuthPayload = { userId: user.id, email: user.email };
    const token = jwt.sign(payload, env.jwtSecret, { expiresIn: "7d" });

    return {
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    };
  },

  async verifyToken(token: string) {
    try {
      const decoded = jwt.verify(token, env.jwtSecret) as AuthPayload;
      return decoded;
    } catch (_error) {
      throw new AppError("Invalid token", 401, ErrorCodes.TOKEN_INVALID);
    }
  },
};
