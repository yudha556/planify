# **Dokumentasi API Planify**

Dokumen ini menjelaskan endpoint API yang digunakan oleh aplikasi Planify untuk kebutuhan autentikasi, pembuatan dokumentasi berbasis AI, manajemen project, serta ekspor dokumen ke PDF/Markdown.

Dokumentasi ini ditujukan untuk **Frontend Developer** dan pihak lain yang perlu memahami cara berkomunikasi dengan backend Planify.

> **Dokumentasi interaktif (disarankan):** buka `/api/docs` di browser
> (Swagger UI) atau `/api/docs.json` buat spec mentahnya.

---

# **BAGIAN A — API v1 (dipakai sekarang)**

**Base URL (Development):**

```
http://localhost:4000/api/v1
```

**Autentikasi:**
Sebagian besar endpoint membutuhkan autentikasi menggunakan **Bearer Token (JWT)**.

Token dikirim melalui header:

```
Authorization: Bearer <ACCESS_TOKEN>
```

Endpoint yang **tidak memerlukan autentikasi**:

* `POST /auth/register`
* `POST /auth/login`
* `GET /ai/status`
* `GET /health`

**Batasan (rate limit):**

* Global: **100 request / 15 menit** per IP
* Register & login: **5 request / 15 menit** per IP (anti brute-force)
* Generate AI: **20 request / jam** per IP
* Export PDF/Markdown: **10 request / jam** per IP

Kalau kena limit, responsenya `429` dengan code `RATE_LIMIT_EXCEEDED`.

**Validasi input:**
Semua body POST/PUT/PATCH divalidasi pakai Zod. Kalau gagal,
responsenya `400` dengan code `VALIDATION_ERROR` plus detail field yang salah:

```json
{
  "success": false,
  "message": "Validation failed",
  "code": "VALIDATION_ERROR",
  "error": "[{\"field\":\"body.email\",\"message\":\"Invalid email format\"}]"
}
```

**Batas ukuran body:** maksimal **1MB** per request.

---

## **A.1. Health Check**

```
GET /health
```

Response (200):

```json
{ "status": "ok" }
```

---

## **A.2. Autentikasi User**

### **A.2.1 Registrasi User**

```
POST /auth/register
```

**Request Body:**

```json
{
  "email": "user@example.com",
  "password": "securePassword123",
  "name": "John Doe"
}
```

**Aturan validasi:**

* `email`: wajib, format email valid
* `password`: wajib, minimal 8 karakter
* `name`: opsional, maksimal 100 karakter

**Response Berhasil (201):**

```json
{
  "success": true,
  "message": "User registered successfully",
  "data": { "id": "uuid", "email": "user@example.com", "name": "John Doe" }
}
```

**Error:**

* `VALIDATION_ERROR` — email/password tidak valid
* `AUTH_EMAIL_EXISTS` — email sudah terdaftar

---

### **A.2.2 Login User**

```
POST /auth/login
```

**Request Body:**

```json
{
  "email": "user@example.com",
  "password": "securePassword123"
}
```

**Response Berhasil (200):**

```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "eyJhbG...",
    "user": { "id": "uuid", "email": "user@example.com", "name": "John Doe" }
  }
}
```

**Catatan:**

* Token disimpan di FE (localStorage/state) dan dikirim di header `Authorization` tiap request yang butuh auth.
* `AUTH_INVALID_CREDENTIALS` — email/password salah.

---

### **A.2.3 Profil User Login (butuh token)**

```
GET /auth/me
```

Response (200): `{ success: true, message: "...", data: { userId, email } }`

---

### **A.2.4 Logout (butuh token)**

```
POST /auth/logout
```

Token yang dipakai langsung masuk blacklist dan nggak bisa dipakai lagi.
FE wajib hapus token dari localStorage/state setelah logout.

**Error token:**

* `TOKEN_MISSING` — tidak ada token di header
* `TOKEN_INVALID` — token tidak valid/kadaluarsa
* `TOKEN_REVOKED` — token sudah di-logout

---

## **A.3. AI & Pembuatan Dokumen**

> Catatan: generate brief & diagram preview itu **GRATIS**.
> Koin cuma kepotong pas export PDF/Markdown (dan generate diagram terpisah).

### **A.3.1 Status Layanan AI (publik)**

```
GET /ai/status
```

Response (200): `{ success: true, data: { available: boolean, provider: "groq" } }`

---

### **A.3.2 Generate Project Brief (butuh token)**

```
POST /ai/project-brief
```

**Request Body:**

```json
{
  "projectName": "E-Commerce App",
  "projectDescription": "A marketplace platform for small businesses",
  "projectType": "webapp",
  "documentStyle": "professional",
  "targetAudience": "Small business owners",
  "keyFeatures": ["Cart", "Checkout"],
  "techStack": ["Next.js", "Supabase"],
  "includeDiagram": false
}
```

**Aturan validasi:**

* `projectName`: wajib, 1–200 karakter
* `projectDescription`: wajib, minimal 10 karakter, maksimal 5000
* `projectType`: `webapp` | `mobile` | `research` | `enterprise`
* `documentStyle`: `professional` | `formal` | `concise`

**Response Berhasil (200):**

```json
{
  "success": true,
  "message": "Project brief generated successfully",
  "data": { "...": "FULL_DOCUMENT_JSON" },
  "metadata": { "...": "PROVIDER_INFO", "diagramIncluded": false },
  "coins": 48
}
```

---

### **A.3.3 Generate Diagram (butuh token, 2 koin)**

```
POST /ai/diagram
```

**Request Body:**

```json
{
  "projectName": "E-Commerce App",
  "projectDescription": "A marketplace platform for small businesses",
  "techStack": ["Next.js", "Supabase"]
}
```

Kalau koin kurang: `402` dengan code `INSUFFICIENT_COINS`.

---

### **A.3.4 Saldo Koin (butuh token)**

```
GET /ai/coins
```

Response (200): `{ success: true, data: { credits: 50 } }`

---

## **A.4. Manajemen Project (butuh token)**

### **A.4.1 Daftar Project**

```
GET /projects
```

Response (200): `{ success: true, data: [ { id, title, description, ... } ] }`

---

### **A.4.2 Detail Project**

```
GET /projects/:id
```

* `:id` harus UUID valid, kalau nggak: `400 VALIDATION_ERROR`.
* Kalau bukan milik user / tidak ada: `404 NOT_FOUND`.

---

### **A.4.3 Buat Project**

```
POST /projects
```

**Request Body:**

```json
{
  "title": "App A",
  "description": "Deskripsi singkat",
  "projectType": "webapp",
  "documentStyle": "professional",
  "formData": {},
  "currentStep": 1
}
```

* `title`: wajib, 1–200 karakter.

Response (201): `{ success: true, message: "Project created", data: {...} }`

---

### **A.4.4 Update Project (auto-save)**

```
PUT /projects/:id
```

Semua field opsional: `title`, `description`, `projectType`,
`currentStep`, `formData`, `generatedBrief`, `documentStyle`, `status`
(`draft` | `published` | `archived`).

---

### **A.4.5 Hapus Project**

```
DELETE /projects/:id
```

Response (200): `{ success: true, message: "Project deleted successfully" }`

---

## **A.5. Ekspor Dokumen (butuh token, 1 koin)**

### **A.5.1 Ekspor ke PDF**

```
POST /pdf/brief
```

Body: JSON `ProjectBriefOutput` (field `title` wajib).
Response: file PDF (`Content-Type: application/pdf`), header `X-Coins-Remaining` berisi sisa koin.

### **A.5.2 Ekspor ke Markdown**

```
POST /markdown/brief
```

Body: JSON `ProjectBriefOutput` (field `title` wajib).
Response: file `.md` (`Content-Type: text/markdown`), header `X-Coins-Remaining` berisi sisa koin.

---

## **A.6. Riwayat Aktivitas (butuh token)**

```
GET /history?limit=20&offset=0
```

* `limit`: default 20, maksimal 100.
* Response: `{ success: true, data: [...], pagination: { total, limit, offset } }`

---

## **A.7. Profil User (butuh token)**

```
GET /user/me
```

Response (200): `{ success: true, data: { id, email, fullname, credits, created_at } }`

---

## **A.8. Format Error Standar**

Semua error punya format:

```json
{
  "success": false,
  "message": "",
  "code": ""
}
```

**Daftar code:**

| Code | Arti |
|------|------|
| `VALIDATION_ERROR` | Input tidak valid (lihat detail field) |
| `RATE_LIMIT_EXCEEDED` | Kebanyakan request, coba lagi nanti |
| `TOKEN_MISSING` / `TOKEN_INVALID` / `TOKEN_REVOKED` | Masalah token auth |
| `AUTH_MISSING_FIELDS` | Email/password kosong |
| `AUTH_EMAIL_EXISTS` | Email sudah terdaftar |
| `AUTH_INVALID_CREDENTIALS` | Email/password salah |
| `INSUFFICIENT_COINS` | Koin kurang (HTTP 402) |
| `NOT_FOUND` | Data tidak ditemukan (HTTP 404) |
| `INTERNAL_ERROR` | Error server (HTTP 500) |

> Di mode development, response error menyertakan stack trace di field `error`.
> Di production, stack trace disembunyikan.

---

# **BAGIAN B — LEGACY (deprecated, jangan dipakai buat fitur baru)**

> Endpoint di bawah ini adalah dokumentasi lama **tanpa prefix versi**
> (`/api/...` bukan `/api/v1/...`). Masih bisa diakses dan otomatis
> ngasih header `Deprecation: true`, tapi **sebagian isinya sudah basi**
> (mis. `/ai/generate`, `/ai/regenerate-section`, dan `/pdf/generate`
> sudah tidak ada di kode — gantinya ada di Bagian A).
>
> Buat integrasi baru, selalu pakai **Bagian A**.

## **1. Informasi Umum**

**Base URL (Development):**

```
http://localhost:4000/api
```

**Autentikasi:**
Sebagian besar endpoint membutuhkan autentikasi menggunakan **Bearer Token (JWT)**.

Token dikirim melalui header:

```
Authorization: Bearer <ACCESS_TOKEN>
```

Endpoint yang **tidak memerlukan autentikasi**:

* `/auth/register`
* `/auth/login`

---

## **2. Autentikasi User**

### **2.1 Registrasi User**

Endpoint ini digunakan untuk membuat akun baru di Planify.

**Endpoint:**

```
POST /auth/register
```

**Request Body:**

```json
{
  "email": "user@example.com",
  "password": "securePassword123",
  "name": "John Doe"
}
```

**Response Berhasil (201):**

```json
{
  "success": true,
  "user": {
    "id": "uuid",
    "email": "user@example.com"
  }
}
```

---

### **2.2 Login User**

Endpoint ini digunakan untuk autentikasi user dan mendapatkan token akses.

**Endpoint:**

```
POST /auth/login
```

**Request Body:**

```json
{
  "email": "user@example.com",
  "password": "securePassword123"
}
```

**Response Berhasil (200):**

```json
{
  "success": true,
  "token": "eyJhbG...",
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "name": "John Doe"
  }
}
```

**Catatan:**

* Token digunakan untuk mengakses endpoint yang dilindungi
* Token disimpan di localStorage atau Cookie

---

## **3. AI & Pembuatan Dokumen**

Endpoint pada bagian ini digunakan untuk menghasilkan dokumentasi project berbasis AI.

---

### **3.1 Generate Dokumentasi Project**

Digunakan untuk menghasilkan PRD, SRS, User Flow, dan Diagram berdasarkan input user.

**Endpoint:**

```
POST /ai/generate
```

**Biaya Koin:**

* Mode Draft: **2 koin**
* Mode Polished: **4 koin**
* Tambahan Diagram Arsitektur: **+2 koin**

**Request Body:**

```json
{
  "projectName": "E-Commerce App",
  "projectDescription": "A marketplace platform for small businesses",
  "projectType": "webapp",
  "mode": "draft",
  "targetAudience": "Small business owners",
  "techStack": ["Next.js", "Supabase"],
  "includeDiagram": false
}
```

**Jenis Project (`projectType`):**

* `webapp`
* `mobile`
* `research`
* `enterprise`

**Response Berhasil:**

```json
{
  "success": true,
  "data": { "...": "FULL_DOCUMENT_JSON" },
  "coins": 48
}
```

---

### **3.2 Regenerate Bagian Tertentu**

Digunakan untuk memperbarui **satu bagian dokumen saja** tanpa mengulang seluruh proses generate.

**Endpoint:**

```
POST /ai/regenerate-section
```

**Biaya:** **1 koin**

**Request Body:**

```json
{
  "currentContent": { "...": "FULL_DOCUMENT_JSON" },
  "section": "problemStatement",
  "instruction": "Make the pain points more quantitative"
}
```

**Bagian yang Bisa Diregenerate:**

* overview
* problemStatement
* objectives
* keyFeatures
* userFlow
* srsModules
* recommendedTechStack
* scope
* risks
* clarificationLog

**Response Berhasil:**

```json
{
  "success": true,
  "data": { "...": "UPDATED_SECTION_CONTENT" },
  "coins": 47
}
```

---

### **3.3 Informasi Saldo Koin**

Digunakan untuk mengecek jumlah koin user saat ini.

**Endpoint:**

```
GET /ai/coins
```

**Response:**

```json
{
  "success": true,
  "coins": 50
}
```

---

## **4. Manajemen Project**

Endpoint berikut digunakan untuk mengelola project yang telah dibuat.

---

### **4.1 Daftar Project**

Mengambil daftar project milik user (hanya metadata).

**Endpoint:**

```
GET /projects
```

**Response:**

```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "title": "App A",
      "created_at": "2026-02-05T08:47:00Z"
    }
  ]
}
```

---

### **4.2 Detail Project**

Mengambil isi lengkap dokumentasi dari sebuah project.

**Endpoint:**

```
GET /projects/:id
```

**Response:**

```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "content": { "...": "FULL_DOCUMENT_JSON" }
  }
}
```

---

### **4.3 Hapus Project**

Menghapus project milik user.

**Endpoint:**

```
DELETE /projects/:id
```

**Response:**

```json
{
  "success": true,
  "message": "Project deleted"
}
```

---

## **5. Ekspor Dokumen**

### **5.1 Ekspor ke PDF**

Digunakan untuk mengunduh dokumentasi project dalam bentuk PDF.

**Endpoint:**

```
POST /pdf/generate
```

**Biaya:** **1 koin**

**Request Body:**

```json
{
  "content": { "...": "FULL_DOCUMENT_JSON" },
  "diagramImage": "data:image/png;base64,..."
}
```

**Response:**
File PDF akan otomatis terunduh melalui browser.

---

## **6. Catatan Penting**

* Semua request menggunakan **JSON body**
* Tidak menggunakan query string untuk payload utama
* Semua response memiliki format standar:

```json
{
  "success": true | false,
  "data": {},
  "message": "",
  "code": ""
}
```

---

### Penutup

Dokumentasi ini dibuat untuk memudahkan integrasi frontend dengan backend Planify serta menjadi referensi utama dalam pengembangan fitur lanjutan.

---
