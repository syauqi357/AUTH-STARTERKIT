# Better Auth — Session Management

> Catatan belajar session management di better-auth

**Sumber:** https://better-auth.com/docs/concepts/session-management

---

## Gimana Session Bekerja

Better Auth menggunakan **cookie-based session** kemudian session disimpan di cookie dan dikirim ke server saat melakukan request. Server verifikasi session dan return data user jika session valid.

**Tabel session menyimpan:**

- `id` — unique identifier
- `token` — session token (juga dipakai sebagai cookie)
- `userId` — ID user
- `expiresAt` — tanggal expired
- `ipAddress` — IP address user
- `userAgent` — browser/client info

---

## Session Expiration

**Default:** session expire setelah **7 hari**.

namun setiap kali session digunakan dan `updateAge` tercapai, expiration akan di-_extend_ secara otomatis.

### Config di `auth.ts`

```typescript
session: {
  expiresIn: 60 * 60 * 24 * 7,  // 7 hari (default)
  updateAge: 60 * 60 * 24        // update tiap 1 hari (default)
}
```

### Contoh kasus:

- `expiresIn: 30 hari` → session expired setelah 30 hari tidak aktif
- `updateAge: 1 hari` → tiap hari aktif, timer di-reset ke 30 hari lagi

---

## rememberMe

Di frontend saat login:

```typescript
await authClient.signIn.username({
  username,
  password,
  rememberMe: true, // session persistent
});
```

Kalau `rememberMe: false` → session mati pas browser ditutup (pakai `dont_remember` cookie).

---

## Session Freshness

Beberapa endpoint butuh session yang **"fresh"** — artinya session dibuat dalam waktu `freshAge`.

**Default freshAge:** 1 hari.

```typescript
session: {
  freshAge: 60 * 5; // fresh kalau dibuat dalam 5 menit terakhir
}
```

Disable freshness check:

```typescript
session: {
  freshAge: 0; // disable — tidak recommended untuk sensitive actions
}
```

**Penting:** Freshness TIDAK bisa di-refresh tanpa user re-authenticate. Ini fitur keamanan — kalau butuh fresh session, user harus login ulang.

---

## Cookie Cache (Performa)

By default, `getSession` selalu query ke database. Kalau mau lebih cepat, aktifkan cookie cache:

```typescript
session: {
  cookieCache: {
    enabled: true,
    maxAge: 15 * 60,  // 15 minutes cache
    strategy: "jwe",  // "jwe" | "compact"
    refreshCache: true
  }
}
```

**Trade-off:** lebih cepat, tapi session data di cookie mungkin stale sampai cache expired.

---

## Disable Session Refresh

Kalau ga mau session di-extend otomatis:

```typescript
session: {
  disableSessionRefresh: true;
}
```

---

## Revoke Session

```typescript
// Revoke semua session user
await authClient.revokeSessions();

// Revoke session lain saat ganti password
await authClient.changePassword({
  currentPassword,
  newPassword,
  revokeOtherSessions: true, // logout di semua device lain
});
```

---

## Recommended Config untuk UX yang Baik

```typescript
// auth.ts
session: {
  expiresIn: 60 * 60 * 24 * 30, // 30 hari
  updateAge: 60 * 60 * 24,       // update tiap 1 hari
  freshAge: 60 * 60 * 24         // fresh selama 1 hari (default)
}

// login form (frontend)
await authClient.signIn.username({
  username,
  password,
  rememberMe: true
})
```

---

## Trade-off Security vs UX

| Config                        | UX                        | Security       |
| ----------------------------- | ------------------------- | -------------- |
| `expiresIn` pendek (1 hari)   | Sering login ulang        | Lebih aman ✅  |
| `expiresIn` panjang (30 hari) | Nyaman ✅                 | Less secure ⚠️ |
| `rememberMe: true`            | Persistent login ✅       | Less secure ⚠️ |
| `rememberMe: false`           | Logout tiap tutup browser | Lebih aman ✅  |

**Rule of thumb:**

- App biasa (social media, dashboard) → `expiresIn` panjang + `rememberMe: true`
- App sensitif (banking, finance) → `expiresIn` pendek + `rememberMe: false`
