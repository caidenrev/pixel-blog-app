import { Metadata } from "next";
import fs from "fs";
import matter from "gray-matter";
import BlogList, { BlogType } from "./blog-list";

export const metadata: Metadata = {
  title: 'Courses - Pixel Rhythm Society',
  description: 'A comprehensive blog for coders of all levels...',
};

const getBlogs = (): BlogType[] => {
  const dirContent = fs.readdirSync("content", "utf-8");
  return dirContent.map((file) => {
    const fileContent = fs.readFileSync(`content/${file}`, "utf-8");
    const { data } = matter(fileContent);
    return {
      slug: data.slug,
      title: data.title,
      description: data.description,
      imageUrl: data?.imageUrl,
      date: data?.date,
      category: data?.category,
      readTime: data?.readTime,
      tags: data?.tags,
    };
  });
};

export default function BlogPage() {
  const blogs = getBlogs();
  return <BlogList blogs={blogs} />;
}
