import { supabase } from "../../config/supabase";

export interface UserProfile {
    id: string;
    email: string;
    fullname: string | null;
    credits: number;
    created_at: string;
}

export const userService = {
    /**
     * Get user profile from profiles table
     */
    async getProfile(userId: string): Promise<UserProfile | null> {
        try {
            const { data, error } = await supabase
                .from("profiles")
                .select("id, email, fullname, credits, created_at")
                .eq("id", userId)
                .single();

            if (error || !data) {
                console.warn("Profile fetch failed:", error?.message);
                return null;
            }

            return {
                id: data.id,
                email: data.email,
                fullname: data.fullname,
                credits: data.credits ?? 0,
                created_at: data.created_at,
            };
        } catch (error) {
            console.error("User service error:", error);
            return null;
        }
    },
};
