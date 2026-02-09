/**
 * ============================================
 * GROQ LLM PROVIDER
 * Adapter for Groq API with key rotation support
 * ============================================
 */

import Groq from "groq-sdk";
import { LLMProvider, LLMResponse } from "../types";
import { groqKeyManager } from "../key-manager";
import { AppError } from "../../../utils/app-error";

// Add AI-specific error codes
export const AIErrorCodes = {
    AI_NO_API_KEY: "AI_NO_API_KEY",
    AI_RATE_LIMITED: "AI_RATE_LIMITED",
    AI_TIMEOUT: "AI_TIMEOUT",
    AI_INVALID_OUTPUT: "AI_INVALID_OUTPUT",
    AI_PROVIDER_ERROR: "AI_PROVIDER_ERROR",
} as const;

// Default model to use
const DEFAULT_MODEL = "llama-3.3-70b-versatile";

class GroqProvider implements LLMProvider {
    name = "groq";
    private client: Groq | null = null;

    /**
     * Initialize Groq client with current API key
     */
    private initClient(): Groq | null {
        const apiKey = groqKeyManager.getCurrentKey();
        if (!apiKey) {
            return null;
        }
        this.client = new Groq({ apiKey });
        return this.client;
    }

    /**
     * Check if provider is available (has valid API key)
     */
    isAvailable(): boolean {
        return groqKeyManager.hasAvailableKey();
    }

    /**
     * Generate completion from Groq API
     * Handles rate limiting with automatic key rotation
     */
    async generate<T>(prompt: string, systemPrompt?: string): Promise<LLMResponse<T>> {
        const startTime = Date.now();
        let attempts = 0;
        const maxAttempts = groqKeyManager.getTotalKeys() + 1;

        while (attempts < maxAttempts) {
            attempts++;

            // Get fresh client with current key
            const client = this.initClient();
            if (!client) {
                throw new AppError(
                    "No API key available",
                    503,
                    AIErrorCodes.AI_NO_API_KEY
                );
            }

            try {
                const messages: Groq.Chat.ChatCompletionMessageParam[] = [];

                if (systemPrompt) {
                    messages.push({ role: "system", content: systemPrompt });
                }
                messages.push({ role: "user", content: prompt });

                const completion = await client.chat.completions.create({
                    model: DEFAULT_MODEL,
                    messages,
                    temperature: 0.7,
                    max_tokens: 4096,
                    response_format: { type: "json_object" },
                });

                const content = completion.choices[0]?.message?.content;
                if (!content) {
                    throw new AppError(
                        "Empty response from AI",
                        500,
                        AIErrorCodes.AI_INVALID_OUTPUT
                    );
                }

                // Parse JSON response
                let parsed: T;
                try {
                    parsed = JSON.parse(content) as T;
                } catch {
                    throw new AppError(
                        "Failed to parse AI response as JSON",
                        500,
                        AIErrorCodes.AI_INVALID_OUTPUT
                    );
                }

                return {
                    success: true,
                    data: parsed,
                    metadata: {
                        model: DEFAULT_MODEL,
                        tokensUsed: completion.usage?.total_tokens,
                        inputTokens: completion.usage?.prompt_tokens,
                        outputTokens: completion.usage?.completion_tokens,
                        processingTime: Date.now() - startTime,
                        keyIndex: groqKeyManager.getCurrentKeyIndex(),
                    },
                };
            } catch (error: any) {
                // Handle rate limiting (429)
                if (error?.status === 429 || error?.message?.includes("rate_limit")) {
                    console.log(`[AI] Rate limit hit, attempting key rotation...`);
                    const switched = groqKeyManager.markRateLimited();

                    if (!switched) {
                        throw new AppError(
                            "All API keys are rate limited",
                            429,
                            AIErrorCodes.AI_RATE_LIMITED
                        );
                    }

                    // Retry with new key
                    continue;
                }

                // Handle timeout errors
                if (
                    error?.code === "ETIMEDOUT" ||
                    error?.code === "ECONNABORTED" ||
                    error?.message?.includes("timeout") ||
                    error?.message?.includes("Timeout")
                ) {
                    throw new AppError(
                        "AI request timed out",
                        504,
                        AIErrorCodes.AI_TIMEOUT
                    );
                }

                // Handle other errors
                if (error instanceof AppError) {
                    throw error;
                }

                throw new AppError(
                    error?.message || "AI provider error",
                    500,
                    AIErrorCodes.AI_PROVIDER_ERROR
                );
            }
        }

        // Should not reach here
        throw new AppError(
            "Max retry attempts reached",
            500,
            AIErrorCodes.AI_PROVIDER_ERROR
        );
    }
}

// Export singleton instance
export const groqProvider = new GroqProvider();
