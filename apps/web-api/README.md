# Planify API

**Backend API untuk Planify** 🚀

Planify API menyediakan endpoint untuk berinteraksi dengan AI engine, menerima input dari user, dan menghasilkan dokumen proyek lengkap. API ini digunakan oleh frontend `apps/web` untuk memproses data proyek dan memanggil AI engine.

---

## 🛠️ Teknologi

- Node.js + TypeScript  
- Framework: [Express / Fastify / Next.js API Routes] (sesuaikan implementasi)  
- Monorepo: Turborepo + pnpm  
- AI Engine Integration (LLM / OpenAI API)

---
# Cara Jalanin API

```bash
# Masuk ke folder API
cd apps/api

# Install dependencies
pnpm install

# Jalankan server
pnpm dev
```

# Struktur Folder 
```bash
api/
├─ routes/            # Semua route API (generate, suggest, dll)
├─ controllers/       # Logic untuk memproses request
├─ services/          # Integrasi AI engine, helper functions
├─ middlewares/       # Middleware (auth, logging, error handling)
├─ utils/             # Utility functions
├─ package.json       # Dependencies & scripts
└─ tsconfig.json      # TypeScript configuration
```