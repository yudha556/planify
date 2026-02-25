# Web API — Project Structure

```
web-api/
├── .env                          # Environment variables (GROQ keys, JWT secret, Supabase)
├── .gitignore
├── package.json
├── tsconfig.json
├── API-Endpoint-Docs.md          # Full API endpoint documentation
├── CHANGELOG.md
├── README.md
│
├── dist/                         # Compiled output (auto-generated)
├── node_modules/                 # Dependencies (auto-generated)
├── .turbo/                       # Turborepo cache (auto-generated)
│
├── public/
│   └── index.html                # Built-in API test playground UI
│
└── src/
    ├── server.ts                 # Entry point — starts Express server
    ├── app.ts                    # Express app setup (middleware, routes, CORS)
    │
    ├── config/
    │   ├── env.ts                # Environment variable loader & validation
    │   └── supabase.ts           # Supabase client initialization
    │
    ├── controllers/
    │   ├── ai.controller.ts      # AI generation handlers (project-brief, diagram, coins)
    │   ├── auth.controller.ts    # Auth handlers (login, register, logout, refresh)
    │   └── pdf.controller.ts     # PDF export handler
    │
    ├── middlewares/
    │   ├── auth.middleware.ts     # JWT authentication middleware
    │   └── error.middleware.ts    # Global error handler
    │
    ├── routes/
    │   ├── ai.route.ts           # /api/ai/* routes
    │   ├── auth.route.ts         # /api/auth/* routes
    │   ├── health.route.ts       # /api/health check route
    │   └── pdf.route.ts          # /api/pdf/* routes
    │
    ├── services/
    │   ├── auth.service.ts       # Supabase auth operations
    │   │
    │   ├── ai/
    │   │   ├── index.ts          # Barrel export for AI service
    │   │   ├── ai.service.ts     # Main AI service (generateProjectBrief, generateDiagram)
    │   │   ├── types.ts          # AI types (ProjectBriefInput/Output, DocumentStyle, etc.)
    │   │   ├── key-manager.ts    # Groq API key rotation & rate limit handling
    │   │   │
    │   │   ├── prompts/
    │   │   │   ├── index.ts              # Prompt registry (getPrompt, getAvailableTypes)
    │   │   │   ├── webapp.prompt.ts      # Web app PRD prompts (professional/formal/concise)
    │   │   │   ├── mobile.prompt.ts      # Mobile app PRD prompts (professional/formal/concise)
    │   │   │   ├── research.prompt.ts    # Research document prompts (professional/formal/concise)
    │   │   │   └── enterprise.prompt.ts  # Enterprise system prompts (professional/formal/concise)
    │   │   │
    │   │   └── providers/
    │   │       └── groq.provider.ts      # Groq LLM provider (API calls, retry, key rotation)
    │   │
    │   ├── coin/
    │   │   ├── index.ts          # Barrel export for coin service
    │   │   └── coin.service.ts   # Coin balance, deduction, Supabase RPC
    │   │
    │   └── pdf/
    │       └── pdf.service.ts    # PDF generation from project brief data
    │
    ├── types/
    │   └── index.ts              # Shared TypeScript types
    │
    └── utils/
        ├── app-error.ts          # Custom AppError class & error codes
        ├── async-handler.ts      # Express async route wrapper
        └── token-blacklist.ts    # JWT token blacklist for logout
```
