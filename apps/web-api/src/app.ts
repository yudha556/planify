import express, { Express, Request, Response, NextFunction } from "express";
import cors from "cors";
import helmet from "helmet";
import xss from "xss-clean";
import hpp from "hpp";
import path from "path";
import { env } from "./config/env";
import { logger, httpLogger } from "./utils/logger";
import { generalLimiter, authLimiter } from "./middlewares/rate-limit";
import { setupSwagger } from "./docs/swagger";
import v1Router from "./routes/v1";
import healthRoute from "./routes/health.route";
import authRoute from "./routes/auth.route";
import aiRoute from "./routes/ai.route";
import pdfRoute from "./routes/pdf.route";
import markdownRoute from "./routes/markdown.route";
import projectsRoute from "./routes/projects.route";
import historyRoute from "./routes/history.route";
import userRoute from "./routes/user.route";
import { errorHandler } from "./middlewares/error.middleware";

/**
 * Tandain endpoint lama (/api/...) sebagai deprecated.
 * FE masih bisa pake, tapi disarankan pindah ke /api/v1/...
 */
const deprecated = (_req: Request, res: Response, next: NextFunction) => {
  res.setHeader("Deprecation", "true");
  res.setHeader("Sunset", "Sat, 01 Aug 2026 00:00:00 GMT");
  res.setHeader("Link", '</api/v1>; rel="successor-version"');
  next();
};

const app: Express = express();

// Setup Swagger documentation
setupSwagger(app);

// Trust proxy (needed for rate limiting behind reverse proxy)
app.set("trust proxy", 1);

// Security headers
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        scriptSrc: ["'self'"],
        imgSrc: ["'self'", "data:", "https:"],
        connectSrc: ["'self'"],
        fontSrc: ["'self'"],
        objectSrc: ["'none'"],
        mediaSrc: ["'self'"],
        frameSrc: ["'none'"],
      },
    },
    crossOriginEmbedderPolicy: false,
  })
);

// Prevent XSS attacks
app.use(xss());

// Prevent HTTP Parameter Pollution
app.use(hpp());

// CORS configuration
app.use(
  cors({
    origin: env.corsOrigin,
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Request size limits
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true, limit: "1mb" }));

// HTTP request logging
app.use((req: Request, _res: Response, next: NextFunction) => {
  const start = Date.now();
  const reqId = Math.random().toString(36).substring(7);
  (req as any).reqId = reqId;

  logger.info({ reqId, method: req.method, url: req.url, ip: req.ip }, "Incoming request");

  _res.on("finish", () => {
    const duration = Date.now() - start;
    httpLogger.info(
      { reqId, method: req.method, url: req.url, status: _res.statusCode, duration },
      "Request completed"
    );
  });

  next();
});

// Rate limiting (cover versi lama + v1)
app.use("/api/", generalLimiter);
app.use("/api/auth/register", authLimiter);
app.use("/api/auth/login", authLimiter);
app.use("/api/v1/auth/register", authLimiter);
app.use("/api/v1/auth/login", authLimiter);

// Serve static test UI
app.use(express.static(path.join(__dirname, "../public")));

// API info endpoint (versi lama, deprecated)
app.get("/api", deprecated, (_req: Request, res: Response) => {
  res.json({
    message: "Planify API is running 🚀",
    status: "OK",
    version: "v1",
    docs: "/api/docs",
    timestamp: new Date().toISOString(),
  });
});

// API info endpoint (v1)
app.get("/api/v1", (_req: Request, res: Response) => {
  res.json({
    message: "Planify API is running 🚀",
    status: "OK",
    version: "v1",
    docs: "/api/docs",
    timestamp: new Date().toISOString(),
  });
});

// v1 routes (dipake ke depannya)
app.use("/api/v1", v1Router);

// Legacy routes tanpa versi (masih jalan, tapi deprecated)
// FE lama tetap bisa pake endpoint ini tanpa perubahan
app.use("/api/health", deprecated, healthRoute);
app.use("/api/auth", deprecated, authRoute);
app.use("/api/ai", deprecated, aiRoute);
app.use("/api/pdf", deprecated, pdfRoute);
app.use("/api/markdown", deprecated, markdownRoute);
app.use("/api/projects", deprecated, projectsRoute);
app.use("/api/history", deprecated, historyRoute);
app.use("/api/user", deprecated, userRoute);

// Error handler (must be last)
app.use(errorHandler);

export default app;
