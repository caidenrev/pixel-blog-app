'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/lib/auth-context'
import { supabase, BlogPost } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

declare module 'react' {
  interface JSX {
    IntrinsicElements: any;
  }
}
import MarkdownEditor from '@/components/editor/MarkdownEditor'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface EditPostPageProps {
  params: {
    id: string
  }
}

export default function EditPostPage({ params }: EditPostPageProps) {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [loadingPost, setLoadingPost] = useState(true)
  const [post, setPost] = useState<BlogPost | null>(null)
  
  // Form state
  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')
  const [description, setDescription] = useState('')
  const [content, setContent] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [tags, setTags] = useState<string[]>([])
  const [published, setPublished] = useState(false)
  const [featured, setFeatured] = useState(false)

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/?auth=login')
    }
  }, [user, loading, router])

  useEffect(() => {
    if (user && params.id) {
      fetchPost()
    }
  }, [user, params.id])

  const fetchPost = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('id', params.id)
        .single()

      if (error) throw error

      setPost(data)
      setTitle(data.title)
      setSlug(data.slug)
      setDescription(data.description)
      setContent(data.content)
      setImageUrl(data.image_url || '')
      setTags(data.tags || [])
      setPublished(data.published)
      setFeatured(data.featured)
    } catch (error) {
      console.error('Error fetching post:', error)
      router.push('/admin')
    } finally {
      setLoadingPost(false)
    }
  }

  const handleSave = async (publish: boolean = false) => {
    if (!user || !post || !title || !content) return

    setSaving(true)
    try {
      const { error } = await supabase
        .from('blog_posts')
        .update({
          title,
          slug,
          description,
          content,
          image_url: imageUrl || null,
          published: publish,
          featured,
          tags,
          published_at: publish && !published ? new Date().toISOString() : post.published_at,
          updated_at: new Date().toISOString()
        })
        .eq('id', params.id)

      if (error) throw error

      // Force revalidation of the blog pages
      await fetch('/api/revalidate?path=/blog', { method: 'POST' });
      await fetch(`/api/revalidate?path=/blogpost/${slug}`, { method: 'POST' });
      
      // Redirect with router.refresh() to ensure fresh data
      router.refresh();
      router.push('/admin');
    } catch (error) {
      console.error('Error saving post:', error)
      alert('Error saving post. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  if (loading || loadingPost) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user || !post) {
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Edit Post</h1>
            <p className="text-muted-foreground">Update your blog post</p>
          </div>
          <div className="flex gap-4">
            <Button variant="outline" onClick={() => router.push('/admin')}>
              Cancel
            </Button>
            <Button
              variant="outline"
              onClick={() => handleSave(false)}
              disabled={saving || !title || !content}
            >
              {saving ? 'Saving...' : 'Save Draft'}
            </Button>
            <Button
              onClick={() => handleSave(true)}
              disabled={saving || !title || !content}
            >
              {saving ? 'Publishing...' : published ? 'Update' : 'Publish'}
            </Button>
          </div>
        </div>

        {/* Editor */}
        <MarkdownEditor
          content={content}
          onChange={setContent}
          title={title}
          onTitleChange={setTitle}
          description={description}
          onDescriptionChange={setDescription}
          imageUrl={imageUrl}
          onImageUrlChange={setImageUrl}
          tags={tags}
          onTagsChange={setTags}
        />

        {/* Additional Options */}
        <Card className="mt-6 border-[5px]">
          <CardHeader>
            <CardTitle>Post Options</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="featured"
                checked={featured}
                onChange={(e) => setFeatured(e.target.checked)}
                className="rounded"
              />
              <label htmlFor="featured" className="text-sm font-medium text-foreground">
                Featured Post
              </label>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1 text-foreground">Custom Slug</label>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground"
                placeholder="custom-slug"
              />
              <p className="text-xs text-muted-foreground mt-1">
                URL: <code className="bg-muted px-2 py-1 rounded">/blogpost/{slug}</code>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
