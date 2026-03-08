# STRAIGHTUP.md
> Apa yang gue pelajarin dari bikin auth starterkit ini

---

## 1. Better Auth
- Setup better-auth di Express backend
- Plugin `username()` buat login pakai username bukan email
- `emailAndPassword` config buat enable login & forgot password
- `sendResetPassword` — better-auth handle token, lo yang handle kirim emailnya
- Better-auth punya field `image` bawaan di tabel `user`

## 2. Drizzle ORM
- `better-auth generate` → auto-generate schema dari config
- `drizzle-kit generate` → generate migration files
- `drizzle-kit migrate` → apply migration ke DB
- `drizzle-kit push` → langsung sync ke DB tanpa migration files
- Bedanya MySQL vs PostgreSQL di Drizzle: dialect, driver, dan syntax query berbeda
- Migration files lama harus dihapus kalau ganti DB

## 3. Express + TypeScript
- Setup Express dengan TypeScript pakai `tsx` sebagai runner
- `toNodeHandler(auth)` buat mount better-auth di Express
- Route wildcard di Express 5: `/api/auth/{*splat}`
- Listen di `0.0.0.0` bukan `localhost` biar bisa diakses dari luar (Docker)
- `dotenv.config()` harus dipanggil sebelum akses `process.env`

## 4. SvelteKit
- Svelte 5 Runes: `$state()`, `$props()`, `$effect()`
- `$state` = reaktivitas UI, bukan pengganti TypeScript interface
- `useSession()` dari `better-auth/svelte` = reactive session store, akses pakai `$session`
- `onMount` = jalanin code setelah component di-render di browser
- `(protected)` route group = semua route di dalamnya kena guard dari `+layout.svelte`
- `{@render children()}` wajib ada di layout biar konten anaknya ke-render
- `export const ssr = false` di `+layout.ts` = disable SSR untuk static adapter
- Asset di `src/lib/assets/` harus di-`import`, bukan langsung di `src=""`
- Asset di `static/` bisa diakses langsung via URL `/namafile.png`
- `adapter-static` butuh `fallback: 'index.html'` buat SPA mode

## 5. Nodemailer + SMTP
- Better-auth ga handle kirim email — lo yang provide fungsi `sendResetPassword`
- Nodemailer butuh SMTP credentials (host, port, user, pass)
- Mailtrap = email testing sandbox, email ga beneran kekirim ke inbox asli
- `SMTP_FROM` bisa diisi bebas di Mailtrap karena cuma testing

## 6. Docker
- **Image** = resep, **Container** = hasil jadinya
- **Dockerfile** = instruksi cara build image
- **docker-compose** = orchestrate beberapa container sekaligus
- `COPY . .` = copy semua file dari host ke container
- Di Docker, service komunikasi pakai nama service bukan `localhost` — contoh: `db` bukan `localhost`
- `0.0.0.0` = listen ke semua interface, wajib buat Express di Docker
- `pg_isready` = cek PostgreSQL udah ready belum sebelum migrate
- `healthcheck` di compose = pastiin DB healthy sebelum backend start
- Static files SvelteKit perlu `fallback: 'index.html'` buat jalan di Docker
- Root `.env` = dibaca docker-compose, beda sama `.env` di masing-masing app

## 7. Git & Best Practices
- `.env` selalu di `.gitignore`
- `.env.example` di-commit sebagai template
- `uploads/` di `.gitignore`, tapi keep folder dengan `.gitkeep`
- Branch terpisah buat eksperimen (Docker, fitur baru) sebelum merge ke main
- Migration files bisa di-gitignore, jalanin ulang di tiap environment

## 8. Konsep Penting
- **CI/CD** = otomatisasi build → test → deploy, Docker adalah fondasinya
- **"Works on my machine"** = problem yang Docker solve
- **Static adapter** = SvelteKit generate static files, ga ada server-side rendering
- **Client-side guard** = proteksi route di frontend, bukan pengganti server-side auth
- **SMTP FROM** = email pengirim yang lo set sendiri, bukan dari provider
- Baca error dari **bawah ke atas**, fokus ke file lo bukan node_modules

---

> Dari zip → Docker. Growth is real. 💪