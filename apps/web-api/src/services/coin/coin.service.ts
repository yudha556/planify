import { supabase } from "../../config/supabase";

// Coin costs
export const COIN_COSTS = {
    BRIEF_DRAFT: 2,
    BRIEF_POLISHED: 4,
    DIAGRAM: 2,
    PDF: 1,
    MARKDOWN: 1,
} as const;

export const coinService = {
    /**
     * Get user's coin balance from Supabase
     */
    async getBalance(userId: string): Promise<number> {
        try {
            const { data, error } = await supabase
                .from("profiles")
                .select("credits")
                .eq("id", userId)
                .single();

            if (error || !data) {
                // If profile not found, return 0 (or default if you want)
                // console.warn("Coin fetch failed or profile missing:", error?.message);
                return 0;
            }

            return data.credits ?? 0;
        } catch (error) {
            console.error("Supabase error:", error);
            return 0;
        }
    },

    /**
     * Check if user has enough coins
     */
    async hasEnough(userId: string, amount: number): Promise<boolean> {
        const balance = await this.getBalance(userId);
        return balance >= amount;
    },

    /**
     * Deduct coins from user
     */
    async deduct(userId: string, amount: number): Promise<boolean> {
        // Optimistic check
        const hasEnough = await this.hasEnough(userId, amount);
        if (!hasEnough) return false;

        // Try RPC first (Atomic)
        const { error } = await supabase.rpc("deduct_credits", {
            user_id: userId,
            amount: amount
        });

        if (error) {
            console.warn("RPC deduct_credits failed, trying manual update", error.message);
            // Fallback: Manual update (Race condition possible but acceptable for MVP)
            const currentBalance = await this.getBalance(userId);
            if (currentBalance < amount) return false;

            const { error: updateError } = await supabase
                .from("profiles")
                .update({ credits: currentBalance - amount })
                .eq("id", userId);

            return !updateError;
        }

        return true;
    },
};
