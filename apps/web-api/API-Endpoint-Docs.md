# **Dokumentasi API Planify**

Dokumen ini menjelaskan endpoint API yang digunakan oleh aplikasi Planify untuk kebutuhan autentikasi, pembuatan dokumentasi berbasis AI, manajemen project, serta ekspor dokumen ke PDF.

Dokumentasi ini ditujukan untuk **Frontend Developer** dan pihak lain yang perlu memahami cara berkomunikasi dengan backend Planify.

---

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