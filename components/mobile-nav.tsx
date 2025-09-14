import React from 'react'
import Link from 'next/link'
import { Button, buttonVariants } from './ui/button'
import { usePathname } from 'next/navigation'
import { Home, User, BookOpen, Mail, LogIn, UserPlus, LogOut } from 'lucide-react'
import { useAuth } from '@/lib/auth-context'
import { supabase, User as UserType } from '@/lib/supabase'
import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'

interface MobileNavProps {
  onItemClick?: () => void
}

const MobileNav: React.FC<MobileNavProps> = ({ onItemClick }) => {
  const pathname = usePathname()
  const { user, signOut } = useAuth()
  const [userData, setUserData] = useState<UserType | null>(null)
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()
  
  const navItems = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/about', label: 'About', icon: User },
    { href: '/blog', label: 'Courses', icon: BookOpen },
    { href: '/contact', label: 'Contact', icon: Mail },
  ]

  // Fix hydration issue
  useEffect(() => {
    setMounted(true)
  }, [])

  // Fetch user data to check role
  useEffect(() => {
    if (user) {
      const fetchUserData = async () => {
        try {
          const { data, error } = await supabase
            .from('users')
            .select('*')
            .eq('id', user.id)
            .single()

          if (!error && data) {
            setUserData(data)
          }
        } catch (error) {
          console.error('Error fetching user data:', error)
        }
      }
      fetchUserData()
    } else {
      setUserData(null)
    }
  }, [user])

  const toggleTheme = () => {
    if (mounted) {
      setTheme(theme === 'dark' ? 'light' : 'dark')
    }
  }

  return (
    <div className="flex flex-col space-y-6 mt-6">
      {/* Navigation Links */}
      <div className="space-y-2">
        {navItems.map((item) => {
          const IconComponent = item.icon
          const isActive = pathname === item.href
          
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onItemClick}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 group ${
                isActive 
                  ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-600 border-l-4 border-blue-500' 
                  : 'hover:bg-muted hover:text-blue-400 hover:translate-x-1'
              }`}
            >
              <IconComponent className={`w-5 h-5 ${isActive ? 'text-blue-600' : 'text-muted-foreground group-hover:text-blue-400'}`} />
              <span className="font-medium">{item.label}</span>
            </Link>
          )
        })}
      </div>

      {/* Divider */}
      <div className="border-t border-border"></div>

      {/* Theme Toggle */}
      {mounted && (
        <div className="flex items-center justify-center">
          <button 
            onClick={toggleTheme}
            className="p-3 rounded-full hover:bg-muted/50 transition-colors duration-300 text-2xl flex items-center justify-center w-full"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? '☀️' : '🌙'}
            <span className="ml-2 text-sm font-medium">
              {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
            </span>
          </button>
        </div>
      )}

      {/* Divider */}
      <div className="border-t border-border"></div>

      {/* Auth Buttons */}
      <div className="space-y-3">
        {user ? (
          <>
            <Link
              href={userData?.role === 'admin' ? "/admin" : "/dashboard"}
              onClick={onItemClick}
              className={`${buttonVariants({ variant: "outline" })} w-full justify-start space-x-2 hover:bg-muted hover:text-blue-400 transition-colors duration-300`}
            >
              <BookOpen className="w-4 h-4" />
              <span>{userData?.role === 'admin' ? 'Admin Dashboard' : 'Dashboard'}</span>
            </Link>
            
            <button
              onClick={() => {
                signOut()
                onItemClick?.()
              }}
              className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </>
        ) : (
          <>
            <Link
              href="/?auth=login"
              onClick={onItemClick}
              className={`${buttonVariants({ variant: "outline" })} w-full justify-start space-x-2 hover:bg-muted hover:text-blue-400 transition-colors duration-300`}
            >
              <LogIn className="w-4 h-4" />
              <span>Login</span>
            </Link>
            
            <Link
              href="/?auth=register"
              onClick={onItemClick}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
            >
              <UserPlus className="w-4 h-4" />
              <span>Sign Up</span>
            </Link>
          </>
        )}
      </div>

      {/* Additional Info */}
      <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg border">
        <p className="text-sm text-muted-foreground text-center">
          Gabung bersama developer serta engineer berbakat lainnya di komunitas kami.
        </p>
      </div>
    </div>
  )
}

export default MobileNav