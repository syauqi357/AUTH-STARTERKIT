# ERRORS.md
> Error yang harus lo aware — biar ga muter-muter lagi

---

## Better Auth

### "Reset password isn't enabled"
**Penyebab:** `sendResetPassword` belum di-implement di `emailAndPassword` config
**Fix:** Tambahin fungsi `sendResetPassword` di `auth.ts`, restart backend

### "Property 'forgetPassword' does not exist"
**Penyebab:** Import dari `better-auth/svelte` atau plugin belum ke-load
**Fix:** Pastiin `createAuthClient` dari `better-auth/client` atau `better-auth/svelte`, bukan path lain

### "Unknown column 'username' in field list" (MySQL)
**Penyebab:** Plugin `username()` ditambahin tapi tabel belum di-migrate
**Fix:** `drizzle-kit push` atau `drizzle-kit migrate`

### 401 Unauthorized saat login
**Penyebab:** User belum ada di DB, atau password salah
**Fix:** Register dulu, baru login

---

## Drizzle ORM

### "No schema files found"
**Penyebab:** Folder schema kosong atau path di `drizzle.config.ts` salah
**Fix:** Jalanin `better-auth generate` dulu, pastiin path schema bener

### "data is malformed"
**Penyebab:** Migration files lama dari DB yang berbeda (MySQL → PostgreSQL)
**Fix:** Hapus folder migrations, generate ulang

### Syntax error backtick di PostgreSQL
**Penyebab:** Migration files generate dengan dialect MySQL, dijalanin di PostgreSQL
**Fix:** Hapus migrations, ganti dialect ke `postgresql`, generate ulang

---

## Express + TypeScript

### "Cannot find module '/app/src/server.ts'"
**Penyebab:** Di Docker, `COPY . .` ga ke-execute dengan bener atau urutan Dockerfile salah
**Fix:** Pastiin `COPY . .` sebelum `RUN npm install` di Dockerfile

### "Cannot read properties of undefined (reading 'promise')"
**Penyebab:** `drizzle()` dipanggil dengan string URL langsung, bukan pool/connection
**Fix:** Buat pool dulu: `mysql.createPool(url)` atau `new pg.Pool({ connectionString: url })`

### "Cannot read properties of undefined (reading 'isServer')"
**Penyebab:** `process.env.DATABASE_URL` undefined — dotenv belum di-load
**Fix:** Tambahin `dotenv.config()` di file yang butuh env, atau pastiin di-load sebelum import DB

### Port already in use
**Penyebab:** Ada process lain yang pakai port yang sama
**Fix:** `npx kill-port 3000` atau ganti PORT di `.env`

---

## SvelteKit

### "snippet is not a function" / children not rendering
**Penyebab:** `{@render children()}` ga ada di layout, atau `let { children } = $props()` belum dideklarasi
**Fix:** Tambahin keduanya di `+layout.svelte`

### "store_invalid_shape" — `$session` is not a store
**Penyebab:** `session` adalah `$state`, bukan store — ga perlu prefix `$`
**Fix:** Akses langsung `session.user.name`, bukan `$session.user.name`

### Route tidak ke-render sama sekali
**Penyebab:** Layout tidak punya `{@render children()}`
**Fix:** Tambahin `{@render children()}` di layout

### "all routes must be fully prerenderable"
**Penyebab:** `adapter-static` ga support dynamic routes tanpa config tambahan
**Fix:** Tambahin `fallback: 'index.html'` di `svelte.config.js`

### Gambar tidak muncul
**Penyebab:** Pakai `src="$lib/assets/..."` — `$lib` tidak valid di atribut HTML
**Fix:** Import dulu `import img from '$lib/assets/img.png'` lalu `src={img}`, atau taruh di `static/`

---

## Docker

### "ECONNREFUSED" saat migrate
**Penyebab:** Backend start sebelum PostgreSQL siap
**Fix:** Pakai `pg_isready` loop di CMD, atau `healthcheck` + `depends_on` di compose

### "path not found" saat build
**Penyebab:** `context` di `docker-compose.yml` pointing ke folder yang salah
**Fix:** Sesuaikan path `context` dengan struktur folder lo

### Container jalan tapi tidak bisa diakses
**Penyebab:** Express listen di `localhost` bukan `0.0.0.0`
**Fix:** `app.listen(port, '0.0.0.0', callback)`

### Env variable "not set, defaulting to blank"
**Penyebab:** Docker compose ga nemuin `.env` di root repo
**Fix:** Bikin `.env` di root repo (sejajar `docker-compose.yml`)

### Service tidak bisa connect ke DB
**Penyebab:** `DATABASE_URL` pakai `localhost` bukan nama service
**Fix:** Ganti `localhost` ke nama service di compose, contoh: `db`

---

## General

### Works local, error di Docker/server
**Penyebab:** Environment variable beda, atau path hardcoded
**Fix:** Selalu pakai `process.env`, pastiin semua env ada di `.env` Docker

### TypeScript "implicitly has any type"
**Penyebab:** Parameter fungsi tidak diberi type
**Fix:** Tambahin type annotation: `({ user }: { user: { email: string } })`

### "Object literal may only specify known properties"
**Penyebab:** Kirim field yang tidak ada di type definition
**Fix:** Sesuaikan field dengan yang diminta — cek autocomplete atau docs