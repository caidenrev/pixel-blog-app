'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/lib/auth-context'
import { supabase, BlogPost, User } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function AdminDashboard() {
  const { user, loading, signOut } = useAuth()
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loadingPosts, setLoadingPosts] = useState(true)
  const [userData, setUserData] = useState<User | null>(null)
  const router = useRouter()


  useEffect(() => {
    // Only redirect if we're sure there's no user and not loading
    if (!loading && !user) {
      console.log('Admin page: No user found, redirecting to login')
      router.replace('/?auth=login')
    } else if (user) {
      console.log('Admin page: User found:', user.email)
      // Don't redirect if user exists, let fetchUserData handle role checking
    }
  }, [user, loading, router])

  useEffect(() => {
    if (user) {
      fetchUserData()
      fetchPosts()
    }
  }, [user])

  const fetchUserData = async () => {
    try {
      console.log('Fetching user data for:', user?.id)
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', user?.id)
        .single()

      if (error) {
        console.error('Error fetching user data:', error)
        // If user doesn't exist in users table, create them
        if (error.code === 'PGRST116' && user) {
          console.log('User not found in users table, creating user...')
          
          // Check if this is the admin user by email
          const isAdmin = user.email === 'admin@pixelblog.com'
          const userRole = isAdmin ? 'admin' : 'user'
          
          const { error: insertError } = await supabase
            .from('users')
            .insert({
              id: user.id,
              email: user.email || '',
              full_name: user.user_metadata?.full_name || 'User',
              role: userRole
            })
          
          if (insertError) {
            throw insertError
          }
          
          // Set user data with correct role
          setUserData({
            id: user.id,
            email: user.email || '',
            full_name: user.user_metadata?.full_name || 'User',
            avatar_url: null,
            role: userRole,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          })
          
          console.log(`User created with ${userRole} role`)
          
          // If not admin, redirect to home
          if (!isAdmin) {
            console.log('User is not admin, redirecting to home')
            router.replace('/')
            return
          }
          
          // If admin, continue to dashboard
          console.log('User is admin, proceeding to dashboard')
        }
        throw error
      }
      
      console.log('User data fetched:', data)
      setUserData(data)

      // Check if user is admin
      if (data.role !== 'admin') {
        console.log('User is not admin, role:', data.role, 'redirecting to home')
        router.replace('/')
        return
      }
      
      console.log('User is admin, proceeding to dashboard')
    } catch (error) {
      console.error('Error fetching user data:', error)
      router.replace('/')
    }
  }

  const fetchPosts = async () => {
    try {
      console.log('Fetching posts...')
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      console.log('Posts fetched:', data?.length || 0)
      setPosts(data || [])
    } catch (error) {
      console.error('Error fetching posts:', error)
    } finally {
      console.log('Setting loadingPosts to false')
      setLoadingPosts(false)
    }
  }

  const handleDeletePost = async (id: string) => {
    if (!confirm('Are you sure you want to delete this post?')) return

    try {
      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', id)

      if (error) throw error
      fetchPosts()
    } catch (error) {
      console.error('Error deleting post:', error)
    }
  }

  const handleTogglePublished = async (id: string, published: boolean) => {
    try {
      const { error } = await supabase
        .from('blog_posts')
        .update({ 
          published: !published,
          published_at: !published ? new Date().toISOString() : null
        })
        .eq('id', id)

      if (error) throw error
      fetchPosts()
    } catch (error) {
      console.error('Error updating post:', error)
    }
  }

  const handleToggleFeatured = async (id: string, featured: boolean) => {
    try {
      const { error } = await supabase
        .from('blog_posts')
        .update({ 
          featured: !featured
        })
        .eq('id', id)

      if (error) throw error
      fetchPosts()
    } catch (error) {
      console.error('Error updating post:', error)
    }
  }

  if (loading) {
    console.log('Admin page: Loading authentication...')
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-foreground">Loading authentication...</p>
        </div>
      </div>
    )
  }

  if (loadingPosts) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-foreground">Loading posts...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <p className="text-lg text-foreground">No user found. Please login first.</p>
          <button 
            onClick={() => router.replace('/?auth=login')}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Go to Login
          </button>
        </div>
      </div>
    )
  }

  if (!userData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <p className="text-lg text-foreground">Loading user data...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage content, users, and system settings</p>
            {userData && (
              <div className="mt-2 flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Welcome, {userData.full_name}</span>
                <Badge variant={userData.role === 'admin' ? 'default' : 'secondary'}>
                  {userData.role}
                </Badge>
              </div>
            )}
          </div>
          <div className="flex gap-4">
            <Link href="/admin/new">
              <Button>Create New Post</Button>
            </Link>
            <Button variant="outline" onClick={signOut}>
              Logout
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-[5px]">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Posts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{posts.length}</div>
              <p className="text-xs text-gray-500">All content</p>
            </CardContent>
          </Card>
          <Card className="border-[5px]">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Published</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {posts.filter(post => post.published).length}
              </div>
              <p className="text-xs text-gray-500">Live content</p>
            </CardContent>
          </Card>
          <Card className="border-[5px]">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Drafts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">
                {posts.filter(post => !post.published).length}
              </div>
              <p className="text-xs text-gray-500">In progress</p>
            </CardContent>
          </Card>
          <Card className="border-[5px]">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Featured</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                {posts.filter(post => post.featured).length}
              </div>
              <p className="text-xs text-gray-500">Highlighted</p>
            </CardContent>
          </Card>
        </div>

        {/* Posts List */}
        <div className="space-y-4">
          {posts.length === 0 ? (
            <Card className="border-[5px]">
              <CardContent className="text-center py-8">
                <p className="text-gray-500">No posts yet. Create your first post!</p>
                <Link href="/admin/new">
                  <Button className="mt-4">Create Post</Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            posts.map((post) => (
              <Card key={post.id} className="border-[5px]">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <CardTitle className="text-xl">{post.title}</CardTitle>
                      <CardDescription className="mt-1">
                        {post.description}
                      </CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Badge variant={post.published ? "default" : "secondary"}>
                        {post.published ? "Published" : "Draft"}
                      </Badge>
                      {post.featured && (
                        <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                          ⭐ Featured
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-gray-500">
                      Created: {new Date(post.created_at).toLocaleDateString()}
                      {post.published_at && (
                        <span className="ml-4">
                          Published: {new Date(post.published_at).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleTogglePublished(post.id, post.published)}
                        className={post.published ? "text-orange-600 hover:text-orange-700" : "text-green-600 hover:text-green-700"}
                      >
                        {post.published ? "Unpublish" : "Publish"}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleToggleFeatured(post.id, post.featured)}
                        className={post.featured ? "text-yellow-600 hover:text-yellow-700" : "text-gray-600 hover:text-gray-700"}
                      >
                        {post.featured ? "Unfeature" : "Feature"}
                      </Button>
                      <Link href={`/admin/edit/${post.id}`}>
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                      </Link>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeletePost(post.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
