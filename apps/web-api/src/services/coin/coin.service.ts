/**
 * ============================================
 * COIN SERVICE
 * In-memory coin management for testing
 * ============================================
 */

// Coin costs
export const COIN_COSTS = {
    BRIEF_DRAFT: 2,
    BRIEF_POLISHED: 4,
    DIAGRAM: 2,
    PDF: 1,
} as const;

// In-memory coin store (per user)
const userCoins = new Map<string, number>();

// Default starting coins
const DEFAULT_COINS = 10;

export const coinService = {
    /**
     * Get user's coin balance
     */
    getBalance(userId: string): number {
        if (!userCoins.has(userId)) {
            userCoins.set(userId, DEFAULT_COINS);
        }
        return userCoins.get(userId)!;
    },

    /**
     * Check if user has enough coins
     */
    hasEnough(userId: string, amount: number): boolean {
        return this.getBalance(userId) >= amount;
    },

    /**
     * Deduct coins from user
     * @returns true if successful, false if insufficient
     */
    deduct(userId: string, amount: number): boolean {
        const balance = this.getBalance(userId);
        if (balance < amount) {
            return false;
        }
        userCoins.set(userId, balance - amount);
        return true;
    },

    /**
     * Add coins to user
     */
    add(userId: string, amount: number): void {
        const balance = this.getBalance(userId);
        userCoins.set(userId, balance + amount);
    },

    /**
     * Reset user's coins to default
     */
    reset(userId: string): void {
        userCoins.set(userId, DEFAULT_COINS);
    },
};
