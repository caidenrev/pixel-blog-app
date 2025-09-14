'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '@/lib/auth-context'
import { supabase, User } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { BookOpen, Settings, Users, BarChart3 } from 'lucide-react'
import Link from 'next/link'

export default function RoleBasedDashboard() {
  const { user, loading } = useAuth()
  const [userData, setUserData] = useState<User | null>(null)
  const [loadingUser, setLoadingUser] = useState(true)
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/?auth=login')
      return
    }

    if (user) {
      fetchUserData()
    }
  }, [user, loading, router])

  const fetchUserData = async () => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', user?.id)
        .single()

      if (error) throw error
      setUserData(data)

      // Auto redirect based on role
      if (data.role === 'admin') {
        router.push('/admin')
      } else {
        router.push('/dashboard')
      }
    } catch (error) {
      console.error('Error fetching user data:', error)
      router.push('/')
    } finally {
      setLoadingUser(false)
    }
  }

  if (loading || loadingUser) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user || !userData) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Welcome, {userData.full_name}!</h1>
          <p className="text-gray-600 mt-2">Choose your dashboard</p>
          <Badge variant={userData.role === 'admin' ? 'default' : 'secondary'} className="mt-2">
            {userData.role}
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Admin Dashboard */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Admin Dashboard
              </CardTitle>
              <CardDescription>
                Manage content, users, and system settings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <BarChart3 className="h-4 w-4" />
                  <span>Content Management</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Users className="h-4 w-4" />
                  <span>User Management</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Settings className="h-4 w-4" />
                  <span>System Settings</span>
                </div>
              </div>
              <div className="mt-6">
                <Link href="/admin">
                  <Button className="w-full">
                    Access Admin Panel
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Student Dashboard */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Student Dashboard
              </CardTitle>
              <CardDescription>
                Track your learning progress and activities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <BookOpen className="h-4 w-4" />
                  <span>Course Progress</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <BarChart3 className="h-4 w-4" />
                  <span>Learning Analytics</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Users className="h-4 w-4" />
                  <span>Community</span>
                </div>
              </div>
              <div className="mt-6">
                <Link href="/dashboard">
                  <Button variant="outline" className="w-full">
                    Access Student Panel
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            You will be automatically redirected to the appropriate dashboard based on your role.
          </p>
        </div>
      </div>
    </div>
  )
}
