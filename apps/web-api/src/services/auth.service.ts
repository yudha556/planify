import { supabase } from "./supabase";
import { AuthPayload } from "../types";
import { AppError, ErrorCodes } from "../utils/app-error";

export const authService = {
  async createUser(email: string, password: string, name?: string) {
    // Supabase Auth SignUp
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name,
        },
      },
    });

    if (error) {
      // Map Supabase errors to AppError
      throw new AppError(error.message, 400, ErrorCodes.AUTH_EMAIL_EXISTS);
    }

    if (!data.user) {
      throw new AppError("Registration failed", 500, ErrorCodes.INTERNAL_ERROR);
    }

    return {
      id: data.user.id,
      email: data.user.email,
      name: data.user.user_metadata?.full_name,
      createdAt: data.user.created_at,
      updatedAt: data.user.updated_at
    };
  },

  async loginUser(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      throw new AppError(
        "Invalid credentials",
        401,
        ErrorCodes.AUTH_INVALID_CREDENTIALS
      );
    }

    return {
      token: data.session.access_token,
      user: {
        id: data.user.id,
        email: data.user.email,
        name: data.user.user_metadata?.full_name,
      },
    };
  },

  async verifyToken(token: string) {
    try {
      // Verify token by fetching user
      const { data, error } = await supabase.auth.getUser(token);

      if (error || !data.user) {
        throw new Error("Invalid token");
      }

      const payload: AuthPayload = {
        userId: data.user.id,
        email: data.user.email || "",
      };

      return payload;
    } catch (_error) {
      throw new AppError("Invalid token", 401, ErrorCodes.TOKEN_INVALID);
    }
  },
};
