import { Metadata } from "next";
import { supabase } from "@/lib/supabase";
import BlogList, { BlogType } from "./blog-list";

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  description: string;
  content: string;
  image_url?: string;
  author_id: string;
  published: boolean;
  featured: boolean;
  tags?: string[];
  created_at: string;
  updated_at: string;
  published_at?: string;
}

export const metadata: Metadata = {
  title: 'Courses - Pixel Rhythm Society',
  description: 'A comprehensive blog for coders of all levels...',
};

const getBlogs = async (): Promise<BlogType[]> => {
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('published', true)
      .order('created_at', { ascending: false });

    if (error) throw error;

    return data?.map((post: BlogPost) => ({
      id: post.id,
      slug: post.slug,
      title: post.title,
      description: post.description,
      imageUrl: post.image_url,
      date: new Date(post.published_at || post.created_at).toLocaleDateString(),
      category: post.tags?.[0] || 'Tutorial',
      readTime: '5 min read',
      tags: post.tags || [],
      content: post.content,
      published: post.published,
      author_id: post.author_id,
      created_at: post.created_at,
      updated_at: post.updated_at
    })) || [];
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return [];
  }
};

export const revalidate = 0; // Disable caching

export default async function BlogPage() {
  const blogs = await getBlogs();
  return <BlogList blogs={blogs} />;
}
