'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useTheme } from 'next-themes'
import { ArrowLeft, Construction, Clock, Code, Users, Play, Award, Star } from 'lucide-react'
import { useEffect, useState } from 'react'
import BackToTopButton from '@/components/BackToTopButton'

export default function NotFound() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Fix hydration issue
  useEffect(() => {
    setMounted(true)
  }, [])

  // Don't render until mounted to prevent hydration mismatch
  if (!mounted) {
    return null
  }

  const developmentFeatures = [
    {
      title: 'Sistem Autentikasi',
      description: 'Implementasi login dan register yang aman dengan enkripsi tingkat enterprise',
      icon: <Code className="w-6 h-6" />,
      progress: 70
    },
    {
      title: 'Manajemen Profil',
      description: 'Dashboard pengguna dengan customization dan pengaturan personal',
      icon: <Users className="w-6 h-6" />,
      progress: 60
    },
    {
      title: 'Integrasi Sosial',
      description: 'Login dengan Google, GitHub, dan platform media sosial lainnya',
      icon: <Play className="w-6 h-6" />,
      progress: 65
    }
  ]

  return (
    <div className={`min-h-screen transition-all duration-300 ${
      theme === 'dark' 
        ? 'bg-gradient-to-b from-gray-900 via-gray-900 to-gray-900' 
        : 'bg-white text-gray-900'
    }`}>
      {/* Background gradient overlay - Same as home */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-purple-600/5 to-pink-600/5 dark:from-blue-600/10 dark:via-purple-600/10 dark:to-pink-600/10"></div>
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-blue-400 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      {/* Main Section - Same container structure as home */}
      <section className="relative z-10 container mx-auto px-4 py-20">
        <div className="lg:flex lg:items-center lg:space-x-12">
          {/* Left Content */}
          <div className="lg:w-1/2 space-y-8">
            {/* Badge - Same style as home */}
            <motion.div
              className="inline-flex items-center space-x-2 bg-orange-100 dark:bg-orange-600/20 border border-orange-200 dark:border-orange-500/30 rounded-full px-4 py-2 backdrop-blur-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Construction className="w-4 h-4 text-orange-500 dark:text-orange-400" />
              <span className="text-sm font-medium text-orange-500 dark:text-orange-400">Dalam Pengembangan</span>
            </motion.div>
            
            {/* Main heading - Same style as home */}
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h1 className="text-3xl lg:text-4xl font-bold font-pixel leading-tight">
                NOT FOUND <span className="bg-gradient-to-r from-orange-400 via-red-400 to-pink-400 bg-clip-text text-transparent">
                  404
                </span>
                <br />
                <span className="bg-gradient-to-r from-orange-400 via-red-400 to-pink-400 bg-clip-text text-transparent">
                  Maaf </span>ya
                <br />
                Fitur Lagi <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-green-400 bg-clip-text text-transparent">
                  Dikembangin hehe
                </span>
              </h1>
            </motion.div>
            
            {/* Description - Same style as home */}
            <motion.p
              className="text-lg text-gray-500 dark:text-gray-400 max-w-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Maaf, fitur sementara belum tersedia. Tim kami sedang bekerja keras mengembangkan sistem yang aman dan user friendly untuk memberikan pengalaman terbaik bagi Anda.
            </motion.p>
            
            {/* Status indicators */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="flex items-center space-x-2 px-4 py-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-full">
                <Clock className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
                <span className="text-sm font-medium text-yellow-700 dark:text-yellow-300">
                  Estimasi: 2-3 minggu
                </span>
              </div>
              <div className="flex items-center space-x-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                <Code className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
                  Progress: 65%
                </span>
              </div>
            </motion.div>
            
            {/* CTA Buttons - Same style as home */}
            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <Link 
                href="/"
                className="group bg-gradient-to-r from-blue-500 to-purple-600 px-8 py-4 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg text-white text-xs lg:text-sm font-pixel"
              >
                <div className="flex items-center space-x-2">
                  <ArrowLeft className="w-5 h-5" />
                  <span>Kembali ke Beranda</span>
                </div>
              </Link>
              <button 
                onClick={() => {
                  document.getElementById('stats')?.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                  })
                }}
                className="font-pixel text-xs lg:text-sm group border border-gray-300 dark:border-gray-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 dark:hover:bg-gray-800 transition-all text-gray-900 dark:text-white"
              >
                <div className="flex items-center space-x-2">
                  <span>Lihat Progress</span>
                  <Construction className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                </div>
              </button>
            </motion.div>
          </div>
          
          {/* Right Content - Code Window like home */}
          <div className="lg:w-1/2 mt-12 lg:mt-0">
            <motion.div
              className="relative max-w-2xl mx-auto"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-orange-200/20 to-red-200/20 dark:from-orange-500/20 dark:to-red-600/20 rounded-2xl blur-3xl"></div>
              <div className="relative bg-white dark:bg-gradient-to-br dark:from-gray-800 dark:to-gray-900 p-14 rounded-3xl border border-gray-200 dark:border-gray-700">
                <div className="space-y-6">
                  <div className="flex space-x-3">
                    <div className="w-4 h-4 bg-red-400 dark:bg-red-500 rounded-full"></div>
                    <div className="w-4 h-4 bg-yellow-300 dark:bg-yellow-500 rounded-full"></div>
                    <div className="w-4 h-4 bg-green-400 dark:bg-green-500 rounded-full"></div>
                  </div>
                  
                  <div className="space-y-2 font-mono text-lg">
                    <div>
                      <span className="text-purple-500">const</span>
                      <span className="text-blue-500"> authStatus </span>
                      <span className="text-gray-400">=</span>
                      <span className="text-gray-400"> {'{'}</span>
                    </div>
                    <div className="pl-4">
                      <span className="text-pink-500">login:</span>
                      <span className="text-orange-500"> "under_development"</span>
                      <span className="text-gray-400">,</span>
                    </div>
                    <div className="pl-4">
                      <span className="text-pink-500">register:</span>
                      <span className="text-orange-500"> "under_development"</span>
                      <span className="text-gray-400">,</span>
                    </div>
                    <div className="pl-4">
                      <span className="text-pink-500">progress:</span>
                      <span className="text-green-600"> "65%"</span>
                      <span className="text-gray-400">,</span>
                    </div>
                    <div className="pl-4">
                      <span className="text-pink-500">eta:</span>
                      <span className="text-green-600"> "2-3 weeks"</span>
                    </div>
                    <div>
                      <span className="text-gray-400">{'}'}</span>
                    </div>
                    <div className="pt-4">
                      <span className="text-gray-500">// Coming soon...</span>
                    </div>
                    <div>
                      <span className="text-purple-500">console</span>
                      <span className="text-gray-400">.</span>
                      <span className="text-blue-500">log</span>
                      <span className="text-gray-400">(</span>
                      <span className="text-green-600">"Stay tuned!"</span>
                      <span className="text-gray-400">)</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Development Features Section - Same structure as services */}
      <section id='stats' className="relative z-10 container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-2xl font-pixel font-bold mb-4">
            Yang Sedang{' '}
            <span className="bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
              Dikembangkan
            </span>
          </h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            Fitur fitur yang sedang dalam tahap pengembangan untuk memberikan pengalaman terbaik
          </p>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-8">
          {developmentFeatures.map((feature, index) => (
            <motion.div
              key={index}
              className="group relative overflow-hidden rounded-2xl bg-gray-100/80 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700 hover:bg-gray-200/80 dark:hover:bg-gray-800/70 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 + 0.9 }}
            >
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-orange-100/10 via-red-100/10 to-pink-100/10 dark:from-orange-500/10 dark:via-red-500/10 dark:to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="relative p-8 pt-16 pb-20">
                {/* Icon */}
                <div className="flex justify-center mb-4">
                  <div className="p-3 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-500 dark:text-orange-400">
                    {feature.icon}
                  </div>
                </div>
                
                {/* Title */}
                <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white text-center group-hover:text-orange-500 dark:group-hover:text-orange-400 transition-colors">
                  {feature.title}
                </h3>
                
                {/* Description */}
                <p className="text-gray-500 dark:text-gray-400 mb-6 leading-relaxed text-center">
                  {feature.description}
                </p>
                
                {/* Progress bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-500 dark:text-gray-400">Progress</span>
                    <span className="text-orange-500 dark:text-orange-400 font-semibold">{feature.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <motion.div
                      className="h-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${feature.progress}%` }}
                      transition={{ duration: 2, delay: index * 0.1 + 1.2, ease: "easeOut" }}
                    />
                  </div>
                </div>
                
                {/* Status at bottom */}
                <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-center space-x-2 text-sm">
                    <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
                    <span className="text-orange-500 dark:text-orange-400 font-medium">In Development</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
        <BackToTopButton/>
    </div>
  )
}