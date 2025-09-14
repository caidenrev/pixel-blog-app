# Troubleshooting Guide

## Error: "permission denied to set parameter app.jwt_secret"

### Penyebab
Error ini terjadi karena kita tidak memiliki permission untuk mengatur parameter database `app.jwt_secret` di Supabase.

### Solusi
1. **Gunakan file schema yang sudah diperbaiki:**
   - Gunakan `supabase-schema-simple.sql` bukan `supabase-schema.sql`
   - File ini sudah menghapus baris yang menyebabkan error

2. **Langkah-langkah:**
   ```sql
   -- Copy dan jalankan script dari supabase-schema-simple.sql
   -- Jangan jalankan baris yang mengandung:
   -- ALTER DATABASE postgres SET "app.jwt_secret" TO 'your-jwt-secret';
   ```

## Error: "Invalid API key" atau "Database connection failed"

### Penyebab
Environment variables tidak ter-set dengan benar atau Supabase credentials salah.

### Solusi
1. **Pastikan file `.env.local` ada dan berisi:**
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   ```

2. **Cara mendapatkan credentials:**
   - Login ke Supabase Dashboard
   - Pilih project Anda
   - Pergi ke Settings > API
   - Copy Project URL dan API keys

3. **Restart development server:**
   ```bash
   npm run dev
   ```

## Error: "Row Level Security" atau "Permission denied"

### Penyebab
RLS policies belum di-setup dengan benar atau user tidak memiliki permission.

### Solusi
1. **Pastikan RLS policies sudah dijalankan:**
   - Jalankan script `supabase-schema-simple.sql` di SQL Editor
   - Pastikan semua policies berhasil dibuat

2. **Check user permissions:**
   - Pastikan user sudah terdaftar dan verified
   - Check di Supabase Auth > Users

## Error: "User not found" saat login

### Penyebab
User belum terdaftar atau email belum di-verify.

### Solusi
1. **Register user baru:**
   - Pergi ke `/auth`
   - Daftar dengan email yang valid
   - Check email untuk verification link

2. **Manual verification (jika perlu):**
   - Pergi ke Supabase Dashboard > Auth > Users
   - Klik pada user yang ingin di-verify
   - Klik "Confirm user"

## Error: "Post not found" di halaman blog

### Penyebab
- Database kosong atau posts belum di-migrate
- Posts tidak published
- Slug tidak cocok

### Solusi
1. **Jalankan migrasi konten:**
   ```bash
   npm run migrate
   ```

2. **Check posts di database:**
   - Pergi ke Supabase Dashboard > Table Editor
   - Check tabel `blog_posts`
   - Pastikan ada posts dengan `published = true`

## Error: "Module not found" saat menjalankan migrate

### Penyebab
Dependencies belum terinstall.

### Solusi
```bash
npm install
npm run migrate
```

## Error: "Invalid slug" atau "Slug already exists"

### Penyebab
Slug duplikat atau format slug tidak valid.

### Solusi
1. **Check slug di database:**
   ```sql
   SELECT slug FROM blog_posts WHERE slug = 'your-slug';
   ```

2. **Update slug yang duplikat:**
   ```sql
   UPDATE blog_posts SET slug = 'new-unique-slug' WHERE id = 'post-id';
   ```

## Error: "Cannot read properties of undefined"

### Penyebab
Data tidak ter-load dengan benar dari database.

### Solusi
1. **Check database connection:**
   - Pastikan Supabase project aktif
   - Check API keys benar

2. **Add error handling:**
   ```javascript
   if (!data) {
     console.log('No data found');
     return;
   }
   ```

## Tips Debugging

### 1. Check Console Browser
- Buka Developer Tools (F12)
- Lihat tab Console untuk error client-side

### 2. Check Terminal
- Lihat terminal tempat menjalankan `npm run dev`
- Error server-side akan muncul di sini

### 3. Check Supabase Dashboard
- Pergi ke Logs untuk melihat database queries
- Check Table Editor untuk melihat data

### 4. Test Database Connection
```bash
# Jalankan script test
node -e "
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
supabase.from('blog_posts').select('count').then(console.log);
"
```

## Still Having Issues?

1. **Check file `.env.local` exists dan berisi credentials yang benar**
2. **Restart development server setelah update environment variables**
3. **Pastikan semua dependencies terinstall: `npm install`**
4. **Check Supabase project status di dashboard**
5. **Pastikan RLS policies sudah di-setup dengan benar**

Jika masih ada masalah, coba:
1. Hapus `node_modules` dan `package-lock.json`
2. Jalankan `npm install` lagi
3. Restart development server
