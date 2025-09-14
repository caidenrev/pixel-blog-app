'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'
import { supabase, BlogPost, User } from '@/lib/supabase'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { BookOpen, Clock, TrendingUp, Eye, Calendar } from 'lucide-react'

export default function UserDashboard() {
  const { user, loading } = useAuth()
  const [userData, setUserData] = useState<User | null>(null)
  const [recentPosts, setRecentPosts] = useState<BlogPost[]>([])
  const [loadingPosts, setLoadingPosts] = useState(true)
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/?auth=login')
    }
  }, [user, loading, router])

  useEffect(() => {
    if (user) {
      fetchUserData()
      fetchRecentPosts()
    }
  }, [user])

  const fetchUserData = async () => {
    try {
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
            console.error('Error creating user:', insertError)
            return
          }
          
          // Set user data with correct role
          const newUserData = {
            id: user.id,
            email: user.email || '',
            full_name: user.user_metadata?.full_name || 'User',
            avatar_url: null,
            role: userRole,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          }
          
          setUserData(newUserData)
          console.log(`User created with ${userRole} role`)
          return
        }
        
        return
      }
      
      setUserData(data)
    } catch (error) {
      console.error('Error fetching user data:', error)
    }
  }

  const fetchRecentPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('published', true)
        .order('created_at', { ascending: false })
        .limit(6)

      if (error) throw error
      setRecentPosts(data || [])
    } catch (error) {
      console.error('Error fetching posts:', error)
    } finally {
      setLoadingPosts(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-foreground">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="mt-2 text-muted-foreground">
            Selamat datang kembali, {userData?.full_name || user.email}!
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-[5px]">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Artikel</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{recentPosts.length}</div>
              <p className="text-xs text-muted-foreground">
                Artikel tersedia
              </p>
            </CardContent>
          </Card>

          <Card className="border-[5px]">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Artikel Terbaru</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {recentPosts.filter(post => {
                  const postDate = new Date(post.created_at)
                  const weekAgo = new Date()
                  weekAgo.setDate(weekAgo.getDate() - 7)
                  return postDate > weekAgo
                }).length}
              </div>
              <p className="text-xs text-muted-foreground">
                Minggu ini
              </p>
            </CardContent>
          </Card>

          <Card className="border-[5px]">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Kategori Populer</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {new Set(recentPosts.flatMap(post => post.tags)).size}
              </div>
              <p className="text-xs text-muted-foreground">
                Kategori berbeda
              </p>
            </CardContent>
          </Card>

          <Card className="border-[5px]">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Member Sejak</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {userData?.created_at ? new Date(userData.created_at).toLocaleDateString('id-ID', { 
                  month: 'short', 
                  year: 'numeric' 
                }) : 'N/A'}
              </div>
              <p className="text-xs text-muted-foreground">
                Bergabung
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Posts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="border-[5px]">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Artikel Terbaru
              </CardTitle>
              <CardDescription>
                Artikel terbaru yang bisa Anda baca
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loadingPosts ? (
                <div className="space-y-4">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="animate-pulse">
                      <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                      <div className="h-3 bg-muted rounded w-1/2"></div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {recentPosts.slice(0, 5).map((post) => (
                    <div key={post.id} className="border-b-[5px] pb-4 last:border-b-0">
                      <Link 
                        href={`/blogpost/${post.slug}`}
                        className="block hover:bg-muted/50 p-2 rounded-md transition-colors"
                      >
                        <h3 className="font-medium text-foreground line-clamp-2">
                          {post.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                          {post.description}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge variant="secondary" className="text-xs">
                            {new Date(post.created_at).toLocaleDateString('id-ID')}
                          </Badge>
                          {post.tags.slice(0, 2).map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="border-[5px]">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5" />
                Aktivitas Membaca
              </CardTitle>
              <CardDescription>
                Riwayat dan rekomendasi untuk Anda
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-center py-8 text-muted-foreground">
                  <BookOpen className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
                  <p className="text-sm">
                    Mulai membaca artikel untuk melihat aktivitas Anda di sini
                  </p>
                  <Button asChild className="mt-4">
                    <Link href="/blog">
                      Jelajahi Artikel
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="mt-8 border-[5px]">
          <CardHeader>
            <CardTitle>Aksi Cepat</CardTitle>
            <CardDescription>
              Akses cepat ke fitur-fitur utama
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button asChild variant="outline" className="h-20 flex-col">
                <Link href="/blog">
                  <BookOpen className="h-6 w-6 mb-2" />
                  <span>Baca Artikel</span>
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-20 flex-col">
                <Link href="/about">
                  <TrendingUp className="h-6 w-6 mb-2" />
                  <span>Tentang Kami</span>
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-20 flex-col">
                <Link href="/contact">
                  <Calendar className="h-6 w-6 mb-2" />
                  <span>Hubungi Kami</span>
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}