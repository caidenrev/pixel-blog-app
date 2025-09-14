# Role-Based Access Control

Sistem admin blog ini menggunakan role-based access control dimana hanya user dengan role 'admin' yang bisa mengakses dashboard admin.

## Roles

### 1. **Admin Role**
- **Akses**: Dashboard admin (`/admin`)
- **Fitur**:
  - Lihat semua posts
  - Create, edit, delete posts
  - Toggle publish/unpublish
  - Manage featured posts
  - View statistics

### 2. **User Role** (Default)
- **Akses**: Hanya halaman public
- **Fitur**:
  - Lihat published posts di `/blog`
  - Baca individual posts di `/blogpost/[slug]`
  - Tidak bisa akses admin dashboard

## Setup Admin User

### Cara 1: Menggunakan Script (Recommended)
```bash
npm run create-admin
```

Script ini akan membuat admin user dengan:
- **Email**: `admin@pixelblog.com`
- **Password**: `admin123456`
- **Role**: `admin`

### Cara 2: Register Manual
1. Buka `/auth`
2. Daftar dengan email yang valid
3. Check email dan klik verification
4. **PENTING**: Setelah register, update role di database:
   ```sql
   UPDATE users SET role = 'admin' WHERE email = 'your-email@example.com';
   ```

## Security Features

### 1. **Middleware Protection**
- File: `middleware.ts`
- Melindungi semua route `/admin/*`
- Redirect ke `/auth` jika tidak login
- Redirect ke `/` jika bukan admin

### 2. **Client-Side Protection**
- Admin dashboard check role user
- Redirect jika role bukan 'admin'
- Display role badge di dashboard

### 3. **Database Level Security**
- Row Level Security (RLS) enabled
- Users hanya bisa lihat/edit posts mereka sendiri
- Admin bisa manage semua posts

## Testing Access Control

### Test Admin Access
1. Login dengan admin credentials
2. Akses `/admin` - should work
3. Lihat role badge di dashboard

### Test User Access
1. Register user baru di `/auth`
2. Login dengan user biasa
3. Akses `/admin` - should redirect to `/`
4. Akses `/blog` - should work

## Admin Credentials

```
Email: admin@pixelblog.com
Password: admin123456
```

**⚠️ PENTING**: Ganti password admin setelah setup pertama!

## Troubleshooting

### Error: "Access Denied" di admin dashboard
- Pastikan user sudah login
- Check role user di database
- Pastikan middleware berjalan dengan benar

### Error: "User not found" saat login
- Pastikan user sudah terdaftar
- Check email verification
- Pastikan user ada di tabel `users`

### Error: "Permission denied" di database
- Check RLS policies
- Pastikan user memiliki role yang benar
- Check foreign key constraints

## Database Schema

### Users Table
```sql
CREATE TABLE users (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  role TEXT DEFAULT 'user' CHECK (role IN ('admin', 'user')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### RLS Policies
```sql
-- Users can only see their own profile
CREATE POLICY "Users can view their own profile" ON users
  FOR SELECT USING (auth.uid() = id);

-- Admin can see all posts, users can see their own
CREATE POLICY "Admin can see all posts" ON blog_posts
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = auth.uid() AND users.role = 'admin'
    )
  );
```
