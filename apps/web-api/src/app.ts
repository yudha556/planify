import express, { Express } from "express";
import cors from "cors";
import path from "path";
import healthRoute from "./routes/health.route";
import authRoute from "./routes/auth.route";
import { errorHandler } from "./middlewares/error.middleware";

const app: Express = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static test UI
app.use(express.static(path.join(__dirname, "../public")));

// API info endpoint
app.get("/api", (_req, res) => {
    res.json({
        message: "Planify API is running 🚀",
        status: "OK",
        timestamp: new Date().toISOString(),
    });
});

app.use("/api/health", healthRoute);
app.use("/api/auth", authRoute);

// Error handler (must be last)
app.use(errorHandler);

export default app;
