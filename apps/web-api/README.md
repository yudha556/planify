# Planify API

**Backend API untuk Planify** 🚀

REST API buat generate dokumen proyek berbasis AI: autentikasi user,
generate brief + diagram (Groq), sistem koin, export PDF/Markdown,
manajemen project, dan riwayat aktivitas. Datanya di Supabase.

---

## Cara Jalanin

```bash
# Dari root repo
pnpm install

# Jalanin API (http://localhost:4000)
pnpm --filter web-api dev

# Atau masuk ke foldernya dulu
cd apps/web-api
pnpm dev
```

| Script | Buat apa |
|--------|----------|
| `pnpm dev` | Jalanin server (hot-reload) |
| `pnpm build` | Compile TypeScript ke `dist/` |
| `pnpm test` | Jalanin unit test (Vitest, 40 test) |
| `pnpm check-types` | Cek type error (`tsc --noEmit`, src + tests) |

Dari root repo juga bisa: `pnpm test` dan `pnpm check-types`
(jalan via Turbo ke semua package yang punya script itu).

---

## Environment Variables

Copy `.env.example` jadi `.env`, terus isi:

| Var | Buat apa |
|-----|----------|
| `PORT` / `NODE_ENV` / `JWT_SECRET` | Server + auth (wajib, tanpa default di production) |
| `SUPABASE_URL` / `SUPABASE_SERVICE_ROLE_KEY` | Database + auth |
| `GROQ_API_KEY` | AI engine |
| `CORS_ORIGIN` | Domain frontend yang dibolehin |
| `REDIS_URL` | Blacklist token (opsional, fallback ke in-memory) |

---

## Endpoint

Base URL: `http://localhost:4000/api/v1` (endpoint lama `/api/...`
masih jalan tapi deprecated).

Dokumentasi lengkap: [`API-Endpoint-Docs.md`](./API-Endpoint-Docs.md),
atau buka Swagger UI di `/api/docs` pas server jalan.

---

## Struktur Folder

```bash
src/
├─ app.ts              # Setup Express (helmet, cors, rate-limit, dsb)
├─ server.ts           # Entry point + graceful shutdown
├─ config/             # env, supabase, redis
├─ routes/             # Definisi route per fitur + routes/v1 (agregator versi)
├─ controllers/        # Handler request/response
├─ services/           # Bisnis logic (auth, ai, coin, pdf, markdown, ...)
├─ middlewares/        # auth, rate-limit, validation, error handler
├─ validators/         # Schema Zod per endpoint
├─ utils/              # logger, app-error, token-blacklist, async-handler
├─ docs/               # Setup Swagger
└─ types/              # Deklarasi tipe tambahan
tests/                 # Unit test (Vitest)
```

---

## Keamanan (ringkas)

Rate limiting, Helmet headers, validasi Zod di semua endpoint tulis,
CORS terbatas, JWT secret wajib di production, blacklist token via Redis,
logging JSON per-request, limit body 1MB, XSS + HPP guard.