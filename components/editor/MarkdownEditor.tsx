'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

// Dynamically import MDEditor to avoid SSR issues
const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { 
  ssr: false,
  loading: () => <div className="h-96 flex items-center justify-center">Loading editor...</div>
})

interface MarkdownEditorProps {
  content: string
  onChange: (content: string) => void
  title?: string
  onTitleChange?: (title: string) => void
  description?: string
  onDescriptionChange?: (description: string) => void
  imageUrl?: string
  onImageUrlChange?: (imageUrl: string) => void
  tags?: string[]
  onTagsChange?: (tags: string[]) => void
}

export default function MarkdownEditor({
  content,
  onChange,
  title = '',
  onTitleChange,
  description = '',
  onDescriptionChange,
  imageUrl = '',
  onImageUrlChange,
  tags = [],
  onTagsChange,
}: MarkdownEditorProps) {
  const [tagInput, setTagInput] = useState('')

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      onTagsChange?.([...tags, tagInput.trim()])
      setTagInput('')
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    onTagsChange?.(tags.filter(tag => tag !== tagToRemove))
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleAddTag()
    }
  }

  return (
    <div className="space-y-6">
      {/* Post Metadata */}
      <Card className="border-[5px]">
        <CardHeader>
          <CardTitle>Post Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {onTitleChange && (
            <div>
              <label className="block text-sm font-medium mb-1 text-foreground">Title</label>
              <Input
                value={title}
                onChange={(e) => onTitleChange(e.target.value)}
                placeholder="Enter post title"
              />
            </div>
          )}

          {onDescriptionChange && (
            <div>
              <label className="block text-sm font-medium mb-1 text-foreground">Description</label>
              <Input
                value={description}
                onChange={(e) => onDescriptionChange(e.target.value)}
                placeholder="Enter post description"
              />
            </div>
          )}

          {onImageUrlChange && (
            <div>
              <label className="block text-sm font-medium mb-1 text-foreground">Image URL</label>
              <Input
                value={imageUrl}
                onChange={(e) => onImageUrlChange(e.target.value)}
                placeholder="Enter image URL"
              />
            </div>
          )}

          {onTagsChange && (
            <div>
              <label className="block text-sm font-medium mb-1 text-foreground">Tags</label>
              <div className="flex gap-2 mb-2">
                <Input
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Enter tag and press Enter"
                />
                <Button type="button" onClick={handleAddTag}>
                  Add
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-primary/10 text-primary"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                      className="ml-1 text-primary hover:text-primary/80"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Markdown Editor */}
      <Card className="border-[5px]">
        <CardHeader>
          <CardTitle>Content Editor</CardTitle>
        </CardHeader>
        <CardContent>
          <div data-color-mode="light">
            <MDEditor
              value={content}
              onChange={(val) => onChange(val || '')}
              height={500}
              preview="edit"
              data-color-mode="light"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
