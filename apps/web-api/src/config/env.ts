import "dotenv/config";

const requiredEnvVars = ["JWT_SECRET"];

requiredEnvVars.forEach((envVar) => {
  if (!process.env[envVar]) {
    console.warn(` Missing environment variable: ${envVar}`);
  }
});

export const env = {
  port: parseInt(process.env.PORT || "4000", 10),
  jwtSecret: process.env.JWT_SECRET || "your-secret-key",
  databaseUrl: process.env.DATABASE_URL || "file:./prisma/dev.db",
  nodeEnv: process.env.NODE_ENV || "development",
};
