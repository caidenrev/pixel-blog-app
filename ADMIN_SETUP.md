# Admin Setup Guide

Panduan lengkap untuk setup sistem admin blog dengan Supabase.

## 1. Setup Supabase

1. Buat akun di [Supabase](https://supabase.com)
2. Buat project baru
3. Pergi ke Settings > API untuk mendapatkan:
   - Project URL
   - Anon Key
   - Service Role Key

## 2. Environment Variables

Buat file `.env.local` di root project dengan isi:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret_key
```

## 3. Database Setup

1. Pergi ke SQL Editor di Supabase Dashboard
2. Copy dan jalankan script dari file `supabase-schema-simple.sql`
3. Script ini akan membuat:
   - Tabel `users` untuk data pengguna
   - Tabel `blog_posts` untuk konten blog
   - Row Level Security (RLS) policies
   - Triggers untuk auto-update timestamps

**Catatan:** Gunakan `supabase-schema-simple.sql` yang sudah diperbaiki untuk menghindari error permission.

## 4. Buat Admin User

**PENTING**: Buat admin user terlebih dahulu!

```bash
npm run create-admin
```

Script ini akan membuat admin user dengan:
- **Email**: `admin@pixelblog.com`
- **Password**: `admin123456`
- **Role**: `admin`

## 5. Migrasi Konten

Setelah admin user dibuat:

```bash
npm run migrate
```

Script ini akan:
- Membaca semua file markdown dari folder `content/`
- Memasukkan data ke database Supabase
- Menggunakan admin user sebagai author

## 6. Login sebagai Admin

1. Buka `http://localhost:3000/auth`
2. Login dengan credentials admin
3. Akses dashboard admin di `/admin`

Lihat `MIGRATION_GUIDE.md` dan `ROLE_BASED_ACCESS.md` untuk panduan detail.

## 7. Menjalankan Aplikasi

```bash
npm run dev
```

## 8. Fitur Admin

### Role-Based Access Control
- **Admin Role**: Akses penuh ke dashboard admin
- **User Role**: Hanya akses halaman public
- **Middleware Protection**: Otomatis redirect jika bukan admin

### Dashboard Admin
- **URL**: `/admin` (hanya untuk admin)
- Fitur:
  - Lihat semua posts (published & draft)
  - Statistik posts
  - Toggle publish/unpublish
  - Edit/Delete posts
  - Create new posts
  - Role display di header

### Rich Editor
- Markdown editor dengan preview
- Support untuk:
  - Syntax highlighting
  - Code blocks
  - Tables
  - Images
  - Headings dengan auto-generated TOC

### Post Management
- **Create**: `/admin/new`
- **Edit**: `/admin/edit/[id]`
- Metadata:
  - Title, slug, description
  - Image URL
  - Tags
  - Featured post option
  - Publish status

## 9. Database Schema

### Users Table
```sql
- id (UUID, Primary Key)
- email (TEXT, Unique)
- full_name (TEXT)
- avatar_url (TEXT)
- role (TEXT: 'admin' | 'user')
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

### Blog Posts Table
```sql
- id (UUID, Primary Key)
- title (TEXT)
- slug (TEXT, Unique)
- description (TEXT)
- content (TEXT)
- image_url (TEXT)
- author_id (UUID, Foreign Key)
- published (BOOLEAN)
- featured (BOOLEAN)
- tags (TEXT[])
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
- published_at (TIMESTAMP)
```

## 10. Security Features

- **Row Level Security (RLS)** enabled
- **Role-based access control** untuk admin dashboard
- **Middleware protection** untuk route admin
- Users hanya bisa melihat/mengedit posts mereka sendiri
- Published posts bisa dilihat semua orang
- Admin bisa mengelola semua posts

## 11. Troubleshooting

Jika mengalami error, lihat file `TROUBLESHOOTING.md` untuk panduan lengkap.

### Error Umum:
- **"permission denied to set parameter app.jwt_secret"**: Gunakan `supabase-schema-simple.sql`
- **"Invalid API key"**: Check environment variables di `.env.local`
- **"Row Level Security"**: Pastikan RLS policies sudah dijalankan
- **"User not found"**: Pastikan user sudah terdaftar dan verified

Lihat `TROUBLESHOOTING.md` untuk solusi detail.

## 12. Production Deployment

1. Update environment variables di hosting platform
2. Pastikan Supabase project sudah di-configure untuk production
3. Update NEXTAUTH_URL ke domain production
4. Jalankan migrasi konten di production

## Support

Jika ada masalah, check:
1. Console browser untuk error client-side
2. Terminal untuk error server-side
3. Supabase dashboard untuk database logs
4. Network tab untuk API calls
