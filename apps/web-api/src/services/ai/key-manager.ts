/**
 * ============================================
 * GROQ API KEY MANAGER
 * Handles multi-key rotation for rate limit handling
 * ============================================
 */

import { KeyState } from "./types";

// Cooldown duration after rate limit (in ms)
const RATE_LIMIT_COOLDOWN = 60 * 1000; // 1 minute

class GroqKeyManager {
    private keys: KeyState[] = [];
    private currentIndex = 0;

    constructor() {
        this.loadKeys();
    }

    /**
     * Load all GROQ API keys from environment variables
     * Supports: GROQ_API_KEY, GROQ_API_KEY_1, GROQ_API_KEY_2, GROQ_API_KEY_3
     */
    private loadKeys(): void {
        const keyNames = [
            "GROQ_API_KEY",
            "GROQ_API_KEY_1",
            "GROQ_API_KEY_2",
            "GROQ_API_KEY_3",
        ];

        keyNames.forEach((keyName, index) => {
            const key = process.env[keyName];
            if (key) {
                this.keys.push({
                    key,
                    index,
                    isRateLimited: false,
                });
            }
        });

        if (this.keys.length === 0) {
            console.warn("[AI] No GROQ API keys found in environment variables");
        } else {
            console.log(`[AI] Loaded ${this.keys.length} GROQ API key(s)`);
        }
    }

    /**
     * Get current active API key
     */
    getCurrentKey(): string | null {
        if (this.keys.length === 0) return null;

        // Check if current key is rate limited and cooldown has passed
        const currentKey = this.keys[this.currentIndex];
        if (currentKey.isRateLimited && currentKey.rateLimitResetAt) {
            if (new Date() > currentKey.rateLimitResetAt) {
                currentKey.isRateLimited = false;
                currentKey.rateLimitResetAt = undefined;
                console.log(`[AI] Key ${this.currentIndex} cooldown ended, reactivated`);
            }
        }

        // If current key is still rate limited, try to switch
        if (currentKey.isRateLimited) {
            const switched = this.switchToNextAvailableKey();
            if (!switched) {
                console.warn("[AI] All keys are rate limited!");
                return null;
            }
        }

        return this.keys[this.currentIndex].key;
    }

    /**
     * Mark current key as rate limited and switch to next
     */
    markRateLimited(): boolean {
        if (this.keys.length === 0) return false;

        const key = this.keys[this.currentIndex];
        key.isRateLimited = true;
        key.rateLimitResetAt = new Date(Date.now() + RATE_LIMIT_COOLDOWN);

        console.log(
            `[AI] Key ${this.currentIndex} marked as rate limited, cooldown until ${key.rateLimitResetAt.toISOString()}`
        );

        return this.switchToNextAvailableKey();
    }

    /**
     * Switch to next available (non-rate-limited) key
     */
    private switchToNextAvailableKey(): boolean {
        const startIndex = this.currentIndex;
        let attempts = 0;

        while (attempts < this.keys.length) {
            this.currentIndex = (this.currentIndex + 1) % this.keys.length;
            attempts++;

            const key = this.keys[this.currentIndex];

            // Check if cooldown has passed
            if (key.isRateLimited && key.rateLimitResetAt) {
                if (new Date() > key.rateLimitResetAt) {
                    key.isRateLimited = false;
                    key.rateLimitResetAt = undefined;
                }
            }

            if (!key.isRateLimited) {
                if (this.currentIndex !== startIndex) {
                    console.log(`[AI] Switched to key ${this.currentIndex}`);
                }
                return true;
            }
        }

        // All keys are rate limited
        return false;
    }

    /**
     * Get current key index (for logging/metadata)
     */
    getCurrentKeyIndex(): number {
        return this.currentIndex;
    }

    /**
     * Get total number of keys
     */
    getTotalKeys(): number {
        return this.keys.length;
    }

    /**
     * Check if any key is available
     */
    hasAvailableKey(): boolean {
        return this.getCurrentKey() !== null;
    }
}

// Export singleton instance
export const groqKeyManager = new GroqKeyManager();
