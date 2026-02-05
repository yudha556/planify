/**
 * ============================================
 * COIN SERVICE
 * In-memory coin management for testing
 * ============================================
 */

import { supabase } from "../supabase";

// Coin costs
export const COIN_COSTS = {
    BRIEF_DRAFT: 2,
    BRIEF_POLISHED: 4,
    DIAGRAM: 2,
    PDF: 1,
} as const;

export const coinService = {
    /**
     * Get user's coin balance from Supabase
     */
    async getBalance(userId: string): Promise<number> {
        // If anonymous, return 0 (or a default if we want to allow guests)
        if (!userId || userId === "anonymous") return 0;

        const { data, error } = await supabase
            .from("profiles")
            .select("credits")
            .eq("id", userId)
            .single();

        if (error || !data) {
            // Profile might not exist yet if syncing failed, or RLS issue
            return 0;
        }

        return data.credits;
    },

    /**
     * Check if user has enough coins
     */
    async hasEnough(userId: string, amount: number): Promise<boolean> {
        const balance = await this.getBalance(userId);
        return balance >= amount;
    },

    /**
     * Deduct coins from user in Supabase (Atomic RPC)
     * @returns true if successful, false if insufficient/error
     */
    async deduct(userId: string, amount: number): Promise<boolean> {
        if (!userId || userId === "anonymous") return false;

        // Call database function for atomic update
        const { data, error } = await supabase.rpc('deduct_credits', {
            p_user_id: userId,
            p_amount: amount
        });

        if (error) {
            console.error("Error deducting credits:", error);
            return false;
        }

        return data; // Returns TRUE if deducted, FALSE if insufficient funds
    },

    /**
     * Add coins to user
     */
    async add(userId: string, amount: number): Promise<void> {
        if (!userId || userId === "anonymous") return;

        const balance = await this.getBalance(userId);
        await supabase
            .from("profiles")
            .update({ credits: balance + amount })
            .eq("id", userId);
    },

    /**
     * Reset user's coins to default
     */
    async reset(userId: string): Promise<void> {
        if (!userId || userId === "anonymous") return;

        await supabase
            .from("profiles")
            .update({ credits: 10 })
            .eq("id", userId);
    },
};
