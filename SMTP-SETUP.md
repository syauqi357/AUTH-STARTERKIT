# SMTP Email Setup

Guide ini menjelaskan cara setup email provider untuk fitur forgot password.

---

## Pilihan Email Provider

| Provider | Free Tier | Keterangan |
|---|---|---|
| **Mailtrap** | 1.000 email/bulan | Khusus testing, email ga beneran kekirim |
| **Resend** | 3.000 email/bulan | Developer-friendly, recommended untuk production |
| **SendGrid** | 100 email/hari | Popular, butuh verifikasi domain |
| **Gmail SMTP** | Unlimited | Butuh App Password, tidak recommended untuk production |

---

## Option 1 — Mailtrap (Development/Testing)

Cocok untuk development — semua email ke-capture di dashboard, tidak terkirim ke inbox asli.

### Setup
1. Daftar di [mailtrap.io](https://mailtrap.io)
2. Masuk ke **Email Testing → Inboxes → SMTP Settings**
3. Copy credentials

### .env
```env
SMTP_HOST=sandbox.smtp.mailtrap.io
SMTP_PORT=2525
SMTP_USER=your_mailtrap_user
SMTP_PASS=your_mailtrap_pass
SMTP_FROM=no-reply@starterkit.dev
```

---

## Option 2 — Resend (Production)

Recommended untuk production — free tier generous, API simple.

### Setup
1. Daftar di [resend.com](https://resend.com)
2. Buat API Key di dashboard
3. (Opsional) Verifikasi domain lo untuk custom sender

### Install
```bash
npm install resend
```

### .env
```env
RESEND_API_KEY=re_xxxxxxxxxxxxxx
SMTP_FROM=no-reply@yourdomain.com
```

### Implementasi di auth.ts
```typescript
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

// di sendResetPassword:
sendResetPassword: async ({ user, url }: { user: { email: string }, url: string }) => {
  await resend.emails.send({
    from: process.env.SMTP_FROM!,
    to: user.email,
    subject: "Reset your password",
    html: `
      <h2>Reset your password</h2>
      <p>Click the link below to reset your password. This link expires in 1 hour.</p>
      <a href="${url}">Reset Password</a>
      <p>If you didn't request this, you can safely ignore this email.</p>
    `
  })
}
```

---

## Option 3 — Nodemailer + SMTP (Universal)

Bisa dipakai dengan provider SMTP apapun (Mailtrap, Gmail, SendGrid, dll).

### Install
```bash
npm install nodemailer
npm install -D @types/nodemailer
```

### .env
```env
SMTP_HOST=sandbox.smtp.mailtrap.io
SMTP_PORT=2525
SMTP_USER=your_smtp_user
SMTP_PASS=your_smtp_pass
SMTP_FROM=no-reply@starterkit.dev
```

### Implementasi di auth.ts
```typescript
import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
})

// di sendResetPassword:
sendResetPassword: async ({ user, url }: { user: { email: string }, url: string }) => {
  await transporter.sendMail({
    from: process.env.SMTP_FROM,
    to: user.email,
    subject: "Reset your password",
    html: `
      <h2>Reset your password</h2>
      <p>Click the link below to reset your password. This link expires in 1 hour.</p>
      <a href="${url}">Reset Password</a>
      <p>If you didn't request this, you can safely ignore this email.</p>
    `
  })
}
```

---

## Testing

Setelah setup, test flow forgot password:

1. Buka `/forgot-password`
2. Masukkan email yang terdaftar
3. Cek inbox Mailtrap / email asli
4. Klik link reset password
5. Set password baru di `/reset-password`

---

## Troubleshooting

**Email tidak terkirim**
- Pastikan `sendResetPassword` sudah di-implement di `auth.ts`
- Restart backend setelah edit `auth.ts`
- Cek credentials SMTP di `.env`

**"Reset password isn't enabled"**
- Pastikan `sendResetPassword` ada di dalam `emailAndPassword` config
- Jangan lupa restart backend

**Link reset expired**
- Default expiry better-auth adalah 1 jam
- Minta reset link baru di `/forgot-password`