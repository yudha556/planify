import express, { Express } from "express";
import cors from "cors";
import path from "path";
import healthRoute from "./routes/health.route";
import authRoute from "./routes/auth.route";
import aiRoute from "./routes/ai.route";
import pdfRoute from "./routes/pdf.route";
import markdownRoute from "./routes/markdown.route";
import projectsRoute from "./routes/projects.route";
import historyRoute from "./routes/history.route";
import userRoute from "./routes/user.route";
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
app.use("/api/ai", aiRoute);
app.use("/api/pdf", pdfRoute);
app.use("/api/markdown", markdownRoute);
app.use("/api/projects", projectsRoute);
app.use("/api/history", historyRoute);
app.use("/api/user", userRoute);

// Error handler (must be last)
app.use(errorHandler);

export default app;
