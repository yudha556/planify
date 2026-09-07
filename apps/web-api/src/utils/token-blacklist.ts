import { getRedisClient } from "../config/redis";

// In-memory fallback for when Redis is not available
const memoryBlacklist = new Set<string>();
let useMemoryFallback = false;

function decodeTokenPayload(token: string): { exp?: number } | null {
  try {
    const payload = token.split(".")[1];
    const decoded = Buffer.from(payload, "base64").toString();
    return JSON.parse(decoded);
  } catch {
    return null;
  }
}

function getTokenTtl(token: string): number {
  const payload = decodeTokenPayload(token);
  if (!payload?.exp) return 24 * 60 * 60; // default 24h
  const ttl = payload.exp - Math.floor(Date.now() / 1000);
  return Math.max(ttl, 60); // minimum 1 minute
}

export const tokenBlacklist = {
  async add(token: string): Promise<void> {
    const redis = getRedisClient();
    const ttl = getTokenTtl(token);

    if (redis && !useMemoryFallback) {
      try {
        await redis.setex(`blacklist:${token}`, ttl, "1");
        return;
      } catch (error) {
        console.warn("Redis add failed, falling back to memory:", error);
        useMemoryFallback = true;
      }
    }

    memoryBlacklist.add(token);
  },

  async isBlacklisted(token: string): Promise<boolean> {
    const redis = getRedisClient();

    if (redis && !useMemoryFallback) {
      try {
        const result = await redis.exists(`blacklist:${token}`);
        return result === 1;
      } catch (error) {
        console.warn("Redis check failed, falling back to memory:", error);
        useMemoryFallback = true;
      }
    }

    return memoryBlacklist.has(token);
  },

  async remove(token: string): Promise<void> {
    const redis = getRedisClient();

    if (redis && !useMemoryFallback) {
      try {
        await redis.del(`blacklist:${token}`);
        return;
      } catch (error) {
        console.warn("Redis remove failed, falling back to memory:", error);
        useMemoryFallback = true;
      }
    }

    memoryBlacklist.delete(token);
  },

  async clear(): Promise<void> {
    const redis = getRedisClient();

    if (redis && !useMemoryFallback) {
      try {
        // Note: This is a simplified clear - in production use SCAN
        const keys = await redis.keys("blacklist:*");
        if (keys.length > 0) await redis.del(...keys);
        return;
      } catch (error) {
        console.warn("Redis clear failed:", error);
      }
    }

    memoryBlacklist.clear();
  },

  size(): number {
    return memoryBlacklist.size;
  },

  isUsingFallback(): boolean {
    return useMemoryFallback;
  },
};
