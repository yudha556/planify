import Redis from "ioredis";
import { env } from "./env";

let redis: Redis | null = null;

export function getRedisClient(): Redis | null {
  if (redis) return redis;

  if (!env.redisUrl) {
    console.warn("REDIS_URL not set, token blacklist will use in-memory fallback");
    return null;
  }

  try {
    redis = new Redis(env.redisUrl, {
      maxRetriesPerRequest: 3,
      retryStrategy: (times) => {
        if (times > 3) return null;
        return Math.min(times * 200, 2000);
      },
      lazyConnect: true,
    });

    redis.on("error", (err) => {
      console.error("Redis connection error:", err.message);
    });

    redis.on("connect", () => {
      console.log("Redis connected for token blacklist");
    });

    redis.connect().catch((err) => {
      console.error("Failed to connect to Redis:", err.message);
      redis = null;
    });

    return redis;
  } catch (error) {
    console.error("Failed to initialize Redis:", error);
    return null;
  }
}

export function closeRedis(): void {
  if (redis) {
    redis.quit();
    redis = null;
  }
}