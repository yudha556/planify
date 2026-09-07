import app from "./app";
import { env } from "./config/env";
import { logger } from "./utils/logger";
import { closeRedis } from "./config/redis";

const PORT = env.port || 4000;

const server = app.listen(PORT, () => {
  logger.info({ port: PORT, env: env.nodeEnv }, "Server started");
  console.log(`API running on http://localhost:${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
});

const shutdown = async (signal: string) => {
  logger.info({ signal }, "Shutting down...");
  server.close(async () => {
    await closeRedis();
    logger.info("Server closed");
    process.exit(0);
  });
};

process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("SIGINT", () => shutdown("SIGINT"));
