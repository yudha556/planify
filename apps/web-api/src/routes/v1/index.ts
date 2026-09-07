import { Router, type Router as ExpressRouter } from "express";
import healthRoute from "../health.route";
import authRoute from "../auth.route";
import aiRoute from "../ai.route";
import pdfRoute from "../pdf.route";
import markdownRoute from "../markdown.route";
import projectsRoute from "../projects.route";
import historyRoute from "../history.route";
import userRoute from "../user.route";

/**
 * ============================================
 * API v1 ROUTER
 * Mounted at: /api/v1
 * ============================================
 *
 * Semua route versi 1 dikumpulin di sini.
 * Kalau nanti ada breaking change, bikin folder v2/
 * tanpa ngerusak endpoint v1 yang udah dipake FE.
 */
const v1Router: ExpressRouter = Router();

v1Router.use("/health", healthRoute);
v1Router.use("/auth", authRoute);
v1Router.use("/ai", aiRoute);
v1Router.use("/pdf", pdfRoute);
v1Router.use("/markdown", markdownRoute);
v1Router.use("/projects", projectsRoute);
v1Router.use("/history", historyRoute);
v1Router.use("/user", userRoute);

export default v1Router;
