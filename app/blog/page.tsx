import { Metadata } from "next";
import { supabase } from "@/lib/supabase";
import BlogList, { BlogType } from "./blog-list";

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

    return data?.map((post) => ({
      slug: post.slug,
      title: post.title,
      description: post.description,
      imageUrl: post.image_url,
      date: post.published_at || post.created_at,
      category: 'Tutorial',
      readTime: '5 min read',
      tags: post.tags || [],
    })) || [];
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return [];
  }
};

export default async function BlogPage() {
  const blogs = await getBlogs();
  return <BlogList blogs={blogs} />;
}
