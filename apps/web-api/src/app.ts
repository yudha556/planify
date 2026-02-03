import express, { Express } from "express";
import cors from "cors";
import healthRoute from "./routes/health.route";
import authRoute from "./routes/auth.route";
import { errorHandler } from "./middlewares/error.middleware";

const app: Express = express(); 

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/health", healthRoute);
app.use("/api/auth", authRoute);

// Error handler (must be last)
app.use(errorHandler);

export default app;
