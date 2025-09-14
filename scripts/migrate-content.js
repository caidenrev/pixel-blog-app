const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
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

async function migrateContent() {
  console.log('🚀 Starting content migration...');
  
  const contentDir = path.join(process.cwd(), 'content');
  
  if (!fs.existsSync(contentDir)) {
    console.error('❌ Content directory not found. Make sure you have a "content" folder with markdown files.');
    return;
  }
  
  const files = fs.readdirSync(contentDir).filter(file => file.endsWith('.md'));

  if (files.length === 0) {
    console.log('⚠️  No markdown files found in content directory');
    return;
  }

  console.log(`📁 Found ${files.length} markdown files to migrate`);

  // Test database connection
  try {
    const { data, error } = await supabase.from('blog_posts').select('count').limit(1);
    if (error) throw error;
    console.log('✅ Database connection successful');
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    return;
  }

  let successCount = 0;
  let skipCount = 0;
  let errorCount = 0;

  for (const file of files) {
    try {
      const filePath = path.join(contentDir, file);
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const { data: frontmatter, content } = matter(fileContent);

      if (!frontmatter.slug || !frontmatter.title) {
        console.log(`⚠️  Skipping ${file}: Missing required frontmatter (slug or title)`);
        skipCount++;
        continue;
      }

      // Check if post already exists
      const { data: existingPost } = await supabase
        .from('blog_posts')
        .select('id')
        .eq('slug', frontmatter.slug)
        .single();

      if (existingPost) {
        console.log(`⏭️  Post with slug "${frontmatter.slug}" already exists, skipping...`);
        skipCount++;
        continue;
      }

      // Get admin user for migration
      let authorId;
      
      // First, try to get admin user
      const { data: adminUser } = await supabase
        .from('users')
        .select('id')
        .eq('role', 'admin')
        .single();

      if (adminUser) {
        authorId = adminUser.id;
        console.log('👤 Using admin user for migration');
      } else {
        // If no admin exists, try to get any user
        const { data: anyUser } = await supabase
          .from('users')
          .select('id')
          .limit(1)
          .single();

        if (anyUser) {
          authorId = anyUser.id;
          console.log('👤 Using existing user for migration');
        } else {
          console.log('⚠️  No users found in database. Please create admin user first:');
          console.log('   Run: npm run create-admin');
          console.log('   Or register a user at /auth');
          errorCount++;
          continue;
        }
      }

      // Insert blog post
      const { error } = await supabase
        .from('blog_posts')
        .insert({
          title: frontmatter.title,
          slug: frontmatter.slug,
          description: frontmatter.description || 'No description provided',
          content: content,
          image_url: frontmatter.imageUrl || null,
          author_id: authorId,
          published: true,
          featured: false,
          tags: frontmatter.tags || [],
          published_at: new Date().toISOString()
        });

      if (error) {
        console.error(`❌ Error inserting post "${frontmatter.title}":`, error.message);
        errorCount++;
      } else {
        console.log(`✅ Successfully migrated: ${frontmatter.title}`);
        successCount++;
      }
    } catch (error) {
      console.error(`❌ Error processing file ${file}:`, error.message);
      errorCount++;
    }
  }

  console.log('\n📊 Migration Summary:');
  console.log(`✅ Successfully migrated: ${successCount} posts`);
  console.log(`⏭️  Skipped: ${skipCount} posts`);
  console.log(`❌ Errors: ${errorCount} posts`);
  
  if (successCount > 0) {
    console.log('\n🎉 Migration completed successfully!');
    console.log('You can now access your admin dashboard at /admin');
  }
}

migrateContent().catch(console.error);
