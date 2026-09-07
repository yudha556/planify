import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";
import { env } from "../config/env";

const swaggerOptions: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Planify API",
      version: "1.0.0",
      description: "RESTful API for Planify - AI-powered project documentation generator",
      contact: {
        name: "Planify Team",
      },
    },
    servers: [
      {
        url: env.nodeEnv === "production" ? "https://api.planify.example.com/api/v1" : `http://localhost:${env.port}/api/v1`,
        description: env.nodeEnv === "production" ? "Production server" : "Development server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        ErrorResponse: {
          type: "object",
          properties: {
            success: { type: "boolean", example: false },
            message: { type: "string" },
            code: { type: "string" },
            error: { type: "string" },
          },
        },
        SuccessResponse: {
          type: "object",
          properties: {
            success: { type: "boolean", example: true },
            message: { type: "string" },
            data: { type: "object" },
          },
        },
        User: {
          type: "object",
          properties: {
            id: { type: "string", format: "uuid" },
            email: { type: "string", format: "email" },
            name: { type: "string" },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" },
          },
        },
        AuthResponse: {
          type: "object",
          properties: {
            success: { type: "boolean", example: true },
            message: { type: "string" },
            data: {
              type: "object",
              properties: {
                token: { type: "string" },
                user: { $ref: "#/components/schemas/User" },
              },
            },
          },
        },
        Project: {
          type: "object",
          properties: {
            id: { type: "string", format: "uuid" },
            title: { type: "string" },
            description: { type: "string" },
            projectType: { type: "string", enum: ["webapp", "mobile", "research", "enterprise"] },
            documentStyle: { type: "string", enum: ["professional", "formal", "concise"] },
            currentStep: { type: "integer" },
            status: { type: "string", enum: ["draft", "published", "archived"] },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" },
          },
        },
        ProjectDetail: {
          allOf: [
            { $ref: "#/components/schemas/Project" },
            {
              type: "object",
              properties: {
                formData: { type: "object" },
                generatedBrief: { type: "object" },
              },
            },
          ],
        },
        CoinBalance: {
          type: "object",
          properties: {
            success: { type: "boolean", example: true },
            data: {
              type: "object",
              properties: {
                credits: { type: "integer" },
              },
            },
          },
        },
        AIStatus: {
          type: "object",
          properties: {
            success: { type: "boolean", example: true },
            data: {
              type: "object",
              properties: {
                available: { type: "boolean" },
                provider: { type: "string" },
              },
            },
          },
        },
        ActivityLog: {
          type: "object",
          properties: {
            id: { type: "string", format: "uuid" },
            userId: { type: "string", format: "uuid" },
            projectId: { type: "string", format: "uuid", nullable: true },
            action: { type: "string", enum: ["generate_brief", "export_pdf", "export_markdown"] },
            coinsUsed: { type: "integer" },
            metadata: { type: "object" },
            createdAt: { type: "string", format: "date-time" },
          },
        },
        PaginatedResponse: {
          type: "object",
          properties: {
            success: { type: "boolean", example: true },
            data: { type: "array", items: { type: "object" } },
            pagination: {
              type: "object",
              properties: {
                total: { type: "integer" },
                limit: { type: "integer" },
                offset: { type: "integer" },
              },
            },
          },
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
    tags: [
      { name: "Health", description: "Health check endpoints" },
      { name: "Authentication", description: "User authentication endpoints" },
      { name: "AI Generation", description: "AI-powered document generation" },
      { name: "Projects", description: "Project CRUD operations" },
      { name: "PDF Export", description: "Export documents to PDF" },
      { name: "Markdown Export", description: "Export documents to Markdown" },
      { name: "History", description: "Activity history" },
      { name: "User", description: "User profile" },
    ],
  },
  apis: [
    "./src/routes/*.route.ts",
    "./src/controllers/*.controller.ts",
  ],
};

export const swaggerSpec = swaggerJsdoc(swaggerOptions);

export function setupSwagger(app: Express): void {
  app.use(
    "/api/docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec, {
      customCss: ".swagger-ui .topbar { display: none }",
      customSiteTitle: "Planify API Documentation",
      swaggerOptions: {
        persistAuthorization: true,
      },
    })
  );

  app.get("/api/docs.json", (_req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });
}