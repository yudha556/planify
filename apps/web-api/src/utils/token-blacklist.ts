// In-memory token blacklist
// For production with multiple instances, use Redis instead
const blacklistedTokens = new Set<string>();

export const tokenBlacklist = {
    add(token: string): void {
        blacklistedTokens.add(token);
    },

    isBlacklisted(token: string): boolean {
        return blacklistedTokens.has(token);
    },

    remove(token: string): void {
        blacklistedTokens.delete(token);
    },

    clear(): void {
        blacklistedTokens.clear();
    },

    size(): number {
        return blacklistedTokens.size;
    },
};
