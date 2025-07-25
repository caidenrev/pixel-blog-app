'use client';

import React, { useState, useMemo } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import BackToTopButton from "@/components/BackToTopButton";
import { Search, Calendar, Clock, ArrowRight, BookOpen } from "lucide-react";

export interface BlogType {
  slug: string;
  title: string;
  description: string;
  imageUrl?: string;
  date?: string;
  category?: string;
  readTime?: string;
  tags?: string[];
}

interface BlogListProps {
  blogs: BlogType[];
}

const BlogList = ({ blogs }: BlogListProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredBlogs = useMemo(() => {
    return blogs.filter(blog =>
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [searchTerm, blogs]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto px-4 py-8">
        {/* Heading */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-pixel font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Our Courses
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Discovers comprehensive coding tutorials and enhance your programming skills
          </p>
        </div>

        {/* Search Only */}
        <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-row flex-wrap items-center justify-center mb-10 gap-2 max-w-2xl mx-auto"
            >
            <div className="relative flex-1 min-w-[200px] max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4 pointer-events-none" />
                <Input
                type="text"
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 py-2 text-sm rounded-md bg-background/70 border border-white text-white placeholder:text-white/60 focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-200"
                />
            </div>

            <Button
                type="submit"
                variant="default"
                className="px-6 py-2 text-sm whitespace-nowrap"
            >
                <Search className="w-4 h-4 mr-2" />
                Search
            </Button>
            </form>


        {/* Result Count */}
        {searchTerm && (
          <div className="text-center mb-6">
            <p className="text-muted-foreground">
              Found {filteredBlogs.length} course{filteredBlogs.length !== 1 ? 's' : ''} for "{searchTerm}"
            </p>
          </div>
        )}

        {/* Blog Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredBlogs.map((blog, index) => (
            <Card
              key={index}
              className="group hover:shadow-xl transition-all duration-300 hover:scale-[1.02] bg-card/50 backdrop-blur-sm border-border/50 overflow-hidden"
            >
              <div className="relative overflow-hidden">
                <img
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                  src={blog.imageUrl || "/blogimg.jpg"}
                  alt={blog.title}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                {blog.category && (
                  <Badge variant="secondary" className="absolute top-3 left-3 bg-primary/90 text-primary-foreground">
                    {blog.category}
                  </Badge>
                )}
              </div>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-semibold line-clamp-2 group-hover:text-primary transition-colors duration-200">
                  {blog.title}
                </CardTitle>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  {blog.date && (
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>{blog.date}</span>
                    </div>
                  )}
                  {blog.readTime && (
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{blog.readTime}</span>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-muted-foreground mb-4 line-clamp-3">{blog.description}</p>
                {blog.tags && blog.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-4">
                    {blog.tags.slice(0, 3).map((tag, tagIndex) => (
                      <Badge key={tagIndex} variant="outline" className="text-xs">{tag}</Badge>
                    ))}
                    {blog.tags.length > 3 && (
                      <Badge variant="outline" className="text-xs">+{blog.tags.length - 3}</Badge>
                    )}
                  </div>
                )}
                <Link
                  href={`/blogpost/${blog.slug}`}
                  className={buttonVariants({
                    variant: "default",
                    className: "w-full group-hover:bg-primary/90 transition-all duration-200 flex items-center justify-center gap-2"
                  })}
                >
                  <BookOpen className="w-4 h-4" />
                  Baca Modul
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredBlogs.length === 0 && (
          <div className="text-center py-12">
            <div className="mb-4">
              <BookOpen className="w-16 h-16 mx-auto text-muted-foreground/50" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No courses found</h3>
            <p className="text-muted-foreground mb-4">
              No courses match your search "{searchTerm}"
            </p>
            <Button
              variant="outline"
              onClick={() => setSearchTerm("")}
              className="transition-all duration-200 hover:scale-105"
            >
              Clear Search
            </Button>
          </div>
        )}

        <BackToTopButton />
      </div>
    </div>
  );
};

export default BlogList;
