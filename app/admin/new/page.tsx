'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/lib/auth-context'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import MarkdownEditor from '@/components/editor/MarkdownEditor'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function NewPostPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  
  // Form state
  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')
  const [description, setDescription] = useState('')
  const [content, setContent] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [tags, setTags] = useState<string[]>([])
  const [published, setPublished] = useState(false)

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/?auth=login')
    }
  }, [user, loading, router])

  // Auto-generate slug from title
  useEffect(() => {
    const generatedSlug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
    setSlug(generatedSlug)
  }, [title])

  const handleSave = async (publish: boolean = false) => {
    if (!user || !title || !content) return

    setSaving(true)
    try {
      const { error } = await supabase
        .from('blog_posts')
        .insert({
          title,
          slug,
          description,
          content,
          image_url: imageUrl || null,
          author_id: user.id,
          published: publish,
          featured: false,
          tags,
          published_at: publish ? new Date().toISOString() : null,
        })

      if (error) throw error

      router.push('/admin')
    } catch (error) {
      console.error('Error saving post:', error)
      alert('Error saving post. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Create New Post</h1>
            <p className="text-muted-foreground">Write and publish your blog post</p>
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
              {saving ? 'Publishing...' : 'Publish'}
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

        {/* Slug Preview */}
        <Card className="mt-6 border-[5px]">
          <CardHeader>
            <CardTitle>Post URL</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Your post will be available at: <code className="bg-muted px-2 py-1 rounded">/blogpost/{slug}</code>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
