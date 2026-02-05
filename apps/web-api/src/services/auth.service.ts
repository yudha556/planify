import { supabase } from "../config/supabase";
import { AppError, ErrorCodes } from "../utils/app-error";

export const authService = {
  async createUser(email: string, password: string, name?: string) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name }, // Metadata for user
      },
    });

    if (error) {
      // Map Supabase errors to AppError
      if (error.message.includes("already registered")) {
        throw new AppError(
          "Email already registered",
          400,
          ErrorCodes.AUTH_EMAIL_EXISTS
        );
      }
      throw new AppError(error.message, 400, ErrorCodes.VALIDATION_ERROR);
    }

    if (!data.user) {
      throw new AppError("Registration failed", 500, ErrorCodes.INTERNAL_ERROR);
    }

    return {
      id: data.user.id,
      email: data.user.email,
      name: data.user.user_metadata?.name,
      createdAt: data.user.created_at,
    };
  },

  async loginUser(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw new AppError(
        "Invalid credentials",
        401,
        ErrorCodes.AUTH_INVALID_CREDENTIALS
      );
    }

    if (!data.session) {
      throw new AppError("Login failed", 500, ErrorCodes.INTERNAL_ERROR);
    }

    return {
      token: data.session.access_token,
      user: {
        id: data.user.id,
        email: data.user.email,
        name: data.user.user_metadata?.name,
      },
    };
  },

  async verifyToken(token: string) {
    const { data, error } = await supabase.auth.getUser(token);

    if (error || !data.user) {
      throw new AppError("Invalid token", 401, ErrorCodes.TOKEN_INVALID);
    }

    // Return format matching AuthPayload interface
    return {
      userId: data.user.id,
      email: data.user.email || "",
    };
  },
};
