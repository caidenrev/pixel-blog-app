const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

// Load .env.local manually
const envPath = path.join(process.cwd(), '.env.local');
if (fs.existsSync(envPath)) {
  const envFile = fs.readFileSync(envPath, 'utf8');
  envFile.split('\n').forEach(line => {
    const [key, ...valueParts] = line.split('=');
    if (key && valueParts.length > 0) {
      process.env[key.trim()] = valueParts.join('=').trim();
    }
  });
}

// Supabase configuration
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Error: Please set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY environment variables');
  console.error('Make sure you have a .env.local file with the correct values');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function createAdminUser() {
  console.log('🔧 Creating admin user...');
  
  // Test database connection
  try {
    const { data, error } = await supabase.from('users').select('count').limit(1);
    if (error) throw error;
    console.log('✅ Database connection successful');
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    return;
  }

  // Check if admin already exists
  const { data: existingAdmin } = await supabase
    .from('users')
    .select('*')
    .eq('role', 'admin')
    .single();

  if (existingAdmin) {
    console.log('⚠️  Admin user already exists:');
    console.log(`   Email: ${existingAdmin.email}`);
    console.log(`   Name: ${existingAdmin.full_name}`);
    console.log(`   Role: ${existingAdmin.role}`);
    return;
  }

  // Create admin user directly in auth.users table
  const adminEmail = 'admin@pixelblog.com';
  const adminPassword = 'admin123456';
  const adminName = 'Admin User';

  try {
    // Create user in auth.users
    const { data: authUser, error: authError } = await supabase.auth.admin.createUser({
      email: adminEmail,
      password: adminPassword,
      email_confirm: true, // Auto confirm email
      user_metadata: {
        full_name: adminName
      }
    });

    if (authError) throw authError;

    console.log('✅ Admin user created in auth system');

    // Create corresponding record in public.users
    const { error: userError } = await supabase
      .from('users')
      .insert({
        id: authUser.user.id,
        email: adminEmail,
        full_name: adminName,
        role: 'admin'
      });

    if (userError) throw userError;

    console.log('✅ Admin user created successfully!');
    console.log('\n📋 Admin Credentials:');
    console.log(`   Email: ${adminEmail}`);
    console.log(`   Password: ${adminPassword}`);
    console.log('\n🔐 You can now login at /auth with these credentials');
    console.log('   After login, you can access admin dashboard at /admin');

  } catch (error) {
    console.error('❌ Error creating admin user:', error.message);
  }
}

createAdminUser().catch(console.error);
