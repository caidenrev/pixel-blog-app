# Migration Guide

## Langkah-langkah Migrasi Konten

### 1. Setup Database
1. Buka Supabase Dashboard
2. Pergi ke SQL Editor
3. Copy dan jalankan script dari `supabase-schema-simple.sql`

### 2. Setup Environment Variables
Buat file `.env.local` di root project:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

### 3. Buat Admin User
**PENTING**: Buat admin user terlebih dahulu!

```bash
npm run create-admin
```

Script ini akan membuat admin user dengan:
- Email: `admin@pixelblog.com`
- Password: `admin123456`
- Role: `admin`

### 4. Jalankan Migrasi
Setelah admin user dibuat:

```bash
npm run migrate
```

### 5. Login sebagai Admin
1. Buka `http://localhost:3000/auth`
2. Login dengan credentials admin
3. Akses dashboard admin di `/admin`

## Troubleshooting

### Error: "No users found in database"
**Solusi**: Register user pertama dulu di `/auth`, lalu jalankan migrasi lagi.

### Error: "Database connection failed"
**Solusi**: 
1. Check environment variables di `.env.local`
2. Pastikan Supabase project aktif
3. Restart development server

### Error: "Permission denied"
**Solusi**: 
1. Gunakan `supabase-schema-simple.sql` (bukan yang lama)
2. Pastikan RLS policies sudah dijalankan

## Setelah Migrasi Berhasil

1. Buka `http://localhost:3000/admin`
2. Login dengan user yang sudah terdaftar
3. Anda akan melihat semua posts yang sudah di-migrate
4. Posts sudah otomatis published dan bisa dilihat di `/blog`

## Tips

- Pastikan user pertama yang didaftarkan memiliki role 'admin' (otomatis)
- Jika ada error, check console untuk detail error
- Database connection test akan berjalan otomatis saat migrasi
