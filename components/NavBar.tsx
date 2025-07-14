"use client"
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image' // Add this import
import { Button, buttonVariants } from "@/components/ui/button"
import { Code, Menu } from 'lucide-react'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import LoadingBar from 'react-top-loading-bar'
import { usePathname } from 'next/navigation'
import MobileNav from './mobile-nav'
import { useTheme } from 'next-themes'

const NavBar = () => {
    const [progress, setProgress] = useState(0)
    const [isOpen, setIsOpen] = useState(false)
    const [mounted, setMounted] = useState(false)
    const pathname = usePathname()
    const { theme, setTheme } = useTheme()

    // Fix hydration issue
    useEffect(() => {
        setMounted(true)
    }, [])

    // Page change effect
    useEffect(() => {
        setProgress(30)
        
        const timer1 = setTimeout(() => { 
            setProgress(70)
        }, 100)

        const timer2 = setTimeout(() => { 
            setProgress(100)
        }, 800)

        return () => {
            clearTimeout(timer1)
            clearTimeout(timer2)
        }
    }, [pathname])

    // Reset progress after completion
    useEffect(() => {
        if (progress === 100) {
            const timer = setTimeout(() => { 
                setProgress(0)
            }, 100)
            return () => clearTimeout(timer)
        }
    }, [progress])

    const toggleTheme = () => {
        if (mounted) {
            setTheme(theme === 'dark' ? 'light' : 'dark')
        }
    }

    return (
        <nav className='z-50 px-4 font-pixel py-6 bg-background/80 backdrop-blur-md border-b border-border/40 sticky top-0'>
            <LoadingBar
                color='#3b82f6'
                progress={progress}
                onLoaderFinished={() => setProgress(0)}
                height={3}
            />
            
            <div className="container mx-auto flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center space-x-2 group">
                        <Image 
                          src="/images/logo pixel.png" // Update with your logo path
                          alt="Pixel Code Logo"
                          width={24}
                          height={24}
                          className="w-10 h-10 object-contain"
                        />
                    <span className="text-lg font-bold bg-white transition-colors duration-300 hover:bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        Pixel Learn
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center space-x-8">
                    <Link 
                        href="/" 
                        className={`hover:text-blue-400 transition-colors duration-300 font-medium relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-blue-400 after:transition-all after:duration-300 hover:after:w-full ${
                            pathname === '/' ? 'text-blue-400 after:w-full' : ''
                        }`}
                    >
                        Home
                    </Link>
                    <Link 
                        href="/about" 
                        className={`hover:text-blue-400 transition-colors duration-300 font-medium relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-blue-400 after:transition-all after:duration-300 hover:after:w-full ${
                            pathname === '/about' ? 'text-blue-400 after:w-full' : ''
                        }`}
                    >
                        About
                    </Link>
                    <Link 
                        href="/blog" 
                        className={`hover:text-blue-400 transition-colors duration-300 font-medium relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-blue-400 after:transition-all after:duration-300 hover:after:w-full ${
                            pathname === '/blog' ? 'text-blue-400 after:w-full' : ''
                        }`}
                    >
                        Blog
                    </Link>
                    <Link 
                        href="/contact" 
                        className={`hover:text-blue-400 transition-colors duration-300 font-medium relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-blue-400 after:transition-all after:duration-300 hover:after:w-full ${
                            pathname === '/contact' ? 'text-blue-400 after:w-full' : ''
                        }`}
                    >
                        Contact
                    </Link>
                </div>

                {/* Desktop Actions */}
                <div className="hidden md:flex items-center space-x-4">
                    {/* Theme Toggle - Only render after mounted */}
                    {mounted && (
                        <button 
                            onClick={toggleTheme}
                            className="p-2 rounded-full hover:bg-muted/50 transition-colors duration-300 text-2xl"
                            aria-label="Toggle theme"
                        >
                            {theme === 'dark' ? '☀️' : '🌙'}
                        </button>
                    )}
                    <Link 
                        href="/404" 
                        className={`${buttonVariants({ variant: "ghost" })} hover:text-blue-400 transition-colors duration-300`}
                    >
                        Login
                    </Link>
                    <Link 
                        href="/404" 
                        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-2 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                    >
                        Sign Up
                    </Link>
                </div>

                {/* Mobile Actions */}
                <div className="flex md:hidden items-center space-x-2">
                    {/* Mobile Theme Toggle */}
                    {mounted && (
                        <button 
                            onClick={toggleTheme}
                            className="p-2 rounded-full hover:bg-muted/50 transition-colors duration-300 text-xl"
                            aria-label="Toggle theme"
                        >
                            {theme === 'dark' ? '☀️' : '🌙'}
                        </button>
                    )}
                    
                    {/* Mobile Menu */}
                    <Sheet open={isOpen} onOpenChange={setIsOpen}>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="hover:bg-muted/50">
                                <Menu className="h-6 w-6" />
                                <span className="sr-only">Toggle menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent className="w-[300px] sm:w-[400px]">
                            <SheetHeader>
                                <SheetTitle className="flex items-center space-x-2">
                                    <span className="text-lg font-pixel bg-white hover:bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                        Pixel Learn
                                    </span>
                                </SheetTitle>
                                <SheetDescription className="sr-only">
                                    Navigation menu
                                </SheetDescription>
                            </SheetHeader>
                            <MobileNav onItemClick={() => setIsOpen(false)} />
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </nav>
    )
}

export default NavBar
