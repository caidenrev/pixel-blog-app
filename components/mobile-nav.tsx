import React from 'react'
import Link from 'next/link'
import { Button, buttonVariants } from './ui/button'
import { usePathname } from 'next/navigation'
import { Home, User, BookOpen, Mail, LogIn, UserPlus } from 'lucide-react'

interface MobileNavProps {
  onItemClick?: () => void
}

const MobileNav: React.FC<MobileNavProps> = ({ onItemClick }) => {
  const pathname = usePathname()
  
  const navItems = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/about', label: 'About', icon: User },
    { href: '/blog', label: 'Blog', icon: BookOpen },
    { href: '/contact', label: 'Contact', icon: Mail },
  ]

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

      {/* Auth Buttons */}
      <div className="space-y-3">
        <Link
          href="/login"
          onClick={onItemClick}
          className={`${buttonVariants({ variant: "outline" })} w-full justify-start space-x-2 hover:bg-muted hover:text-blue-400 transition-colors duration-300`}
        >
          <LogIn className="w-4 h-4" />
          <span>Login</span>
        </Link>
        
        <Link
          href="/signup"
          onClick={onItemClick}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
        >
          <UserPlus className="w-4 h-4" />
          <span>Sign Up</span>
        </Link>
      </div>

      {/* Additional Info */}
      <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg border">
        <p className="text-sm text-muted-foreground text-center">
          Join thousands of developers learning with TechForge
        </p>
      </div>
    </div>
  )
}

export default MobileNav