'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '@/lib/auth-context'
import { supabase, User } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function MainDashboard() {
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
          <p className="mt-4">Redirecting to your dashboard...</p>
        </div>
      </div>
    )
  }

  return null
}
