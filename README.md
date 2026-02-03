# Planify

**AI-powered Project Documentation Generator** 🚀

Planify adalah aplikasi berbasis AI yang membantu project manager, mahasiswa, atau freelancer dalam **membuat dokumen proyek lengkap secara otomatis** — mulai dari **Project Brief hingga SRS (Software Requirements Specification)**. Pengguna hanya perlu mengisi beberapa field input, dan AI akan menghasilkan dokumen proyek siap pakai yang bisa di-download.

---

## Fitur Utama

- Generate dokumen proyek lengkap dengan input minimal:
  - Judul proyek
  - Deskripsi masalah
  - Teknologi yang dipakai (opsional, AI dapat menyarankan)
- Dokumen yang dihasilkan termasuk:
  - Project Brief
  - Scope & Objective
  - Requirement Specification (SRS)
  - Timeline / Milestone (opsional)
- Download dokumen dalam format siap pakai
- AI memberikan saran otomatis jika input tidak lengkap

---

## Cara Kerja

1. Pengguna mengisi field input yang disediakan.
2. AI menganalisis input dan menyusun dokumen proyek lengkap.
3. Pengguna dapat melakukan review atau edit sebelum men-download dokumen.

---

## Teknologi

- **Frontend & UI:** Next.js + Tailwind CSS  
- **Backend AI Engine:** LLM Engine (OpenAI API atau custom AI Engine)  
- **Monorepo Setup:** pnpm + Turborepo  
- **Bahasa Pemrograman:** TypeScript

---

## 🚀 Instalasi & Jalankan

```bash
# Clone repositori
git clone https://github.com/yudha556/planify.git
cd planify

# Install dependencies
pnpm install

# Jalankan development server
pnpm dev
```

Buka browser dan akses http://localhost:3000 untuk mulai menggunakan Planify.

# Struktur Proyek
```bash
planify/
├─ .vscode/                  # Konfigurasi VSCode khusus proyek
├─ apps/                      # Aplikasi utama
│  ├─ web/                    # Frontend Next.js
│  │  ├─ components/          # UI components
│  │  ├─ pages/               # Halaman Next.js
│  │  ├─ public/              # Assets publik
│  │  └─ styles/              # Tailwind / CSS
│  └─ api/                    # Backend API untuk interaksi AI
├─ packages/                  # Library internal / utilities
│  ├─ ui/                     # Shared UI components
│  └─ utils/                  # Shared utilities & helpers
├─ pnpm-workspace.yaml        # Konfigurasi monorepo pnpm
├─ turbo.json                 # Konfigurasi Turborepo
├─ tsconfig.json              # Konfigurasi TypeScript
├─ package.json               # Konfigurasi dependencies dan scripts
└─ README.md                  # Dokumentasi proyek
```

Folder apps berisi frontend dan backend API, sedangkan packages berisi library dan utilitas yang bisa digunakan bersama.

# Kontribusi
Planify terbuka untuk kontribusi. Untuk menambahkan fitur baru atau memperbaiki bug:
1. Fork repositori ini
2. Buat branch baru: git checkout -b fitur-baru
3. Commit perubahan: git commit -m "Tambah fitur baru"
4. Push branch: git push origin fitur-baru
5. Buat Pull Request
