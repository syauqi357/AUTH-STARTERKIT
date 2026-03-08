# PLAN

> Next steps — Docker dev/prod split

---

## Goal

memisahkan Docker config antara development dan production agar lebih proper.

---

## Struktur File

```
AUTH-STARTERKIT/
├── docker-compose.yml          ← base config (db, shared settings)
├── docker-compose.dev.yml      ← override dev (hot reload, dev mode)
├── docker-compose.prod.yml     ← override prod (build static, optimized)
└── package.json                ← script shortcut
```

---

## Yang Perlu Dibuat

### 1. `docker-compose.dev.yml`

- Frontend jalanin `npm run dev` dengan `--host` flag
- Backend jalanin `npm run dev` (nodemon)
- Pakai **volumes** buat hot reload — perubahan code langsung kedetect tanpa rebuild

### 2. `docker-compose.prod.yml`

- Frontend build dulu (`npm run build`) lalu serve static pakai `serve`
- Backend jalanin `npm run start` (tsx langsung, tanpa nodemon)
- No volumes — semua di-copy waktu build

### 3. Root `package.json`

Tambahin scripts biar ga perlu ketik command panjang:

```json
{
  "scripts": {
    "docker:dev": "docker compose -f docker-compose.yml -f docker-compose.dev.yml up --build",
    "docker:prod": "docker compose -f docker-compose.yml -f docker-compose.prod.yml up --build",
    "docker:down": "docker compose down",
    "docker:fresh": "docker compose down -v && docker compose up --build"
  }
}
```

---

## Konsep Penting yang Harus Dipahami

### Multiple Compose Files

Docker compose bisa di-merge — file kedua **override** file pertama:

```bash
docker compose -f base.yml -f override.yml up
```

### Volumes untuk Hot Reload

```yaml
volumes:
  - ./backend:/app # sync folder local ke container
  - /app/node_modules # exclude node_modules dari sync
```

Tanpa volumes, setiap perubahan code harus `--build` ulang.

### Dev vs Prod Trade-off

|          | Dev                 | Prod           |
| -------- | ------------------- | -------------- |
| Speed    | Lambat (hot reload) | Cepat (static) |
| Build    | Tidak perlu         | Perlu          |
| Debug    | Mudah               | Sulit          |
| Resource | Boros               | Hemat          |

---

## Urutan Pengerjaan

1. Buat `docker-compose.dev.yml`
2. Buat `docker-compose.prod.yml`
3. Test dev mode: `npm run docker:dev`
4. Test prod mode: `npm run docker:prod`
5. Update `README.md` dengan cara penggunaan baru

---

## Referensi

- [Docker Compose extends](https://docs.docker.com/compose/multiple-compose-files/extends/)
- [Vite Docker setup](https://vitejs.dev/guide/env-and-mode)
