"use client";
import React, { useEffect, useRef, useState } from 'react';
import { Search, Eye, MessageCircle, Code, Smartphone, Cloud, Play, ChevronRight, Star, Zap, Users, Award } from 'lucide-react';
import { useTheme } from 'next-themes';
import BackToTopButton from '@/components/BackToTopButton';

const strings = ['Tailwind CSS', 'React', 'TypeScript', 'Next.js'];

export default function ModernTechLanding() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [typedText, setTypedText] = useState('');
  const [currentStringIndex, setCurrentStringIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  // Fix hydration issue
  useEffect(() => {
    setMounted(true);
  }, []);

  // Typing animation
  useEffect(() => {
    if (!mounted) return;

    const timer = setTimeout(() => {
      const currentString = strings[currentStringIndex];
      if (!isDeleting && currentCharIndex < currentString.length) {
        setTypedText(currentString.slice(0, currentCharIndex + 1));
        setCurrentCharIndex(prev => prev + 1);
      } else if (isDeleting && currentCharIndex > 0) {
        setTypedText(currentString.slice(0, currentCharIndex - 1));
        setCurrentCharIndex(prev => prev - 1);
      } else if (!isDeleting && currentCharIndex === currentString.length) {
        setTimeout(() => setIsDeleting(true), 1500);
      } else if (isDeleting && currentCharIndex === 0) {
        setIsDeleting(false);
        setCurrentStringIndex(prev => (prev + 1) % strings.length);
      }
    }, isDeleting ? 50 : 100);
    
    return () => clearTimeout(timer);
  }, [currentCharIndex, isDeleting, currentStringIndex, mounted]);

  // Don't render until mounted to prevent hydration mismatch
  if (!mounted) {
    return null;
  }

  const services = [
    {
    id: 'web-dev',
    category: 'PENGEMBANGAN WEB',
    title: 'Solusi Full-Stack',
    description: 'Membangun aplikasi web yang tangguh, skalabel, dan responsif menggunakan teknologi modern seperti React, Node.js, dan lainnya.',
    icon: <Code className="w-6 h-6" />,
    views: '2,4K',
    comments: '32'
  },

  {
    id: 'mobile-dev',
    category: 'PENGEMBANGAN MOBILE',
    title: 'Aplikasi Lintas Platform',
    description: 'Menciptakan pengalaman mobile yang mulus untuk Android dan iOS dengan framework seperti React Native dan Flutter.',
    icon: <Smartphone className="w-6 h-6" />,
    views: '1,8K',
    comments: '18'
  },

  {
    id: 'cloud-solutions',
    category: 'SOLUSI CLOUD',
    title: 'Infrastruktur Skalabel',
    description: 'Mengimplementasikan dan mengelola lingkungan cloud menggunakan AWS, Azure, dan GCP untuk memastikan aplikasi Anda mudah diskalakan.',
    icon: <Cloud className="w-6 h-6" />,
    views: '3,1K',
    comments: '24'
  }
  ];

  const stats = [
    { number: '50+', label: 'Pengguna Aktif', icon: <Users className="w-6 h-6" /> },
    { number: '10+', label: 'Modul Belajar', icon: <Play className="w-6 h-6" /> },
    { number: '5+', label: 'Mentor Gen Z', icon: <Award className="w-6 h-6" /> },
    { number: '95%', label: 'Rating', icon: <Star className="w-6 h-6" /> }
  ];

  return (
    <div className={`min-h-screen transition-all duration-300 ${
      theme === 'dark' 
        ? 'bg-gradient-to-b from-gray-900 via-gray-900 to-gray-900' 
        : 'bg-white text-gray-900'
    }`}>
      {/* Background gradient overlay */}
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

      {/* Hero Section */}
      <section className="relative z-10 container mx-auto px-4 py-20">
        <div className="lg:flex lg:items-center lg:space-x-12">
          <div className="lg:w-1/2 space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 bg-blue-100 dark:bg-blue-600/20 border border-blue-200 dark:border-blue-500/30 rounded-full px-4 py-2 backdrop-blur-sm">
              <Zap className="w-4 h-4 text-blue-500 dark:text-blue-400" />
              <span className="text-sm font-medium text-blue-500 dark:text-blue-400">By Pixel Rhythm Society Community</span>
            </div>
            
            {/* Main heading */}
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-5xl font-bold font-pixel leading-tight">
                Belajar
                <br />
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-green-400 bg-clip-text text-transparent">
                  Programming
                </span>
                <br />
                Gak perlu mikirin <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-green-400 bg-clip-text text-transparent">
                  Biaya </span> Mahal!
              </h1>
              <div className="text-sm lg:text-xl font-pixel">
                <span className="text-gray-500 dark:text-gray-400">Dibuat Menggunakan </span>
                <span className="font-semibold text-blue-500 dark:text-blue-400 border-b-2 border-blue-500 dark:border-blue-400">
                  {typedText}
                  <span className="animate-pulse">|</span>
                </span>
              </div>
            </div>
            
            {/* Description */}
            <p className="text-lg text-gray-500 dark:text-gray-400 max-w-xl">
              Belajar coding gak perlu ribet mikirin biaya yang mahal. Di sini, kamu bisa belajar berbagai bahasa pemrograman dan teknologi terbaru secara gratis! Dari dasar-dasar HTML, CSS, JavaScript, hingga framework modern seperti React dan Next.js, semua tersedia untuk kamu eksplorasi.
            </p>
            
            
            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <button className="group bg-gradient-to-r from-blue-500 to-purple-600 px-8 py-4 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg text-white text-xs lg:text-sm font-pixel">
                <div className="flex items-center space-x-2">
                  <a href="/blog">Mulai Belajar</a>
                  <Play className="w-5 h-5" />
                </div>
              </button>
              <button className="font-pixel text-xs lg:text-sm group border bg-blue-600 border-gray-300 dark:border-gray-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 dark:hover:bg-indigo-600 transition-all text-gray-900 dark:text-white">
                <div className="flex items-center space-x-2">

                  <a href="https://discord.gg/DwgAJbkE"
                  className="inline-flex items-center gap-2 text-white hover:transform hover:scale-105 transition-all"
                  target="_blank"
                  rel="noopener noreferrer">
                  Discord
                  <img
                    src="/images/discord.png"
                    alt="Discord Logo"
                    className="w-7 h-5"
                  />
                </a>
                </div>
              </button>
            </div>
          </div>
          
          {/* Hero Image */}
          <div className="lg:w-1/2 mt-12 lg:mt-0">
            <div className="relative max-w-2xl mx-auto">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-200/20 to-purple-200/20 dark:from-blue-500/20 dark:to-purple-600/20 rounded-2xl blur-3xl"></div>
              <div className="relative bg-white dark:bg-gradient-to-br dark:from-gray-800 dark:to-gray-900 p-14 rounded-3xl border border-gray-200 dark:border-gray-700">
                <div className="space-y-6">
                  <div className="flex space-x-3">
                    <div className="w-4 h-4 bg-red-400 dark:bg-red-500 rounded-full"></div>
                    <div className="w-4 h-4 bg-yellow-300 dark:bg-yellow-500 rounded-full"></div>
                    <div className="w-4 h-4 bg-green-400 dark:bg-green-500 rounded-full"></div>
                  </div>
                  
                  <div className="space-y-2 font-mono text-lg">
                    <div>
                      <span className="text-purple-500">import</span>
                      <span className="text-blue-500"> React </span>
                      <span className="text-purple-500">from</span>
                      <span className="text-green-600"> 'react'</span>
                      <span className="text-gray-400">;</span>
                    </div>
                    <div>
                      <span className="text-purple-500">export default function</span>
                      <span className="text-blue-500"> Home</span>
                      <span className="text-gray-400">() {'{'}</span>
                    </div>
                    <div className="pl-4">
                      <span className="text-purple-500">return</span>
                      <span className="text-gray-400"> (</span>
                    </div>
                    <div className="pl-8">
                      <span className="text-blue-500">&lt;main</span>
                      <span className="text-pink-500"> className=</span>
                      <span className="text-green-600">"flex min-h-screen flex-col items-center justify-between p-24"</span>
                      <span className="text-blue-500">&gt;</span>
                    </div>
                    <div className="pl-12">
                      <span className="text-blue-500">&lt;h1&gt;</span>
                      <span className="text-yellow-500">Woi, Join DC!</span>
                      <span className="text-blue-500">&lt;/h1&gt;</span>
                    </div>
                    <div className="pl-8">
                      <span className="text-blue-500">&lt;/main&gt;</span>
                    </div>
                    <div className="pl-4">
                      <span className="text-gray-400">);</span>
                    </div>
                    <div>
                      <span className="text-gray-400">{'}'}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Stats */}
        <div className="mt-20 grid font-pixel grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="text-center p-6 rounded-xl bg-gray-100/80 dark:bg-gray-800/30 backdrop-blur-sm border border-gray-200 dark:border-gray-700 hover:bg-gray-200/80 dark:hover:bg-gray-800/50 transition-all"
            >
              <div className="flex justify-center mb-2 text-blue-500 dark:text-blue-400">
                {stat.icon}
              </div>
              <div className="text-sm font-bold text-blue-500 dark:text-blue-400">{stat.number}</div>
              <div className="text-xs text-gray-600 dark:text-white">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>
      
      {/* Services Section */}
      <section className="relative z-10 container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-2xl font-pixel font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Layanan <br/> {' '}
            <span className="text-white">Pixel Learn
              </span>
          </h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            Temukan beragam layanan pengembangan kami yang dirancang untuk mewujudkan ide ide Anda menjadi kenyataan.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          {services.map((service, index) => (
            <div
              key={service.id}
              className="group relative overflow-hidden rounded-2xl bg-gray-100/80 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700 hover:bg-gray-200/80 dark:hover:bg-gray-800/70 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
              style={{ 
                animation: `fade-in-up 0.6s ease-out forwards`,
                animationDelay: `${index * 0.1}s`,
                opacity: 0
              }}
            >
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-100/10 via-purple-100/10 to-pink-100/10 dark:from-blue-500/10 dark:via-purple-500/10 dark:to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="relative p-8 pt-16 pb-20">
                {/* Category */}
                <div className="text-xs font-medium tracking-widest text-gray-500 dark:text-gray-400 mb-2">
                  {service.category}
                </div>
                
                {/* Title */}
                <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors">
                  {service.title}
                </h3>
                
                {/* Description */}
                <p className="text-gray-500 dark:text-gray-400 mb-6 leading-relaxed">
                  {service.description}
                </p>
                
                {/* Learn More Link */}
                <button className="group/link inline-flex items-center text-blue-500 dark:text-blue-400 hover:text-blue-400 dark:hover:text-blue-300 transition-colors mb-6">
                  <a href="/404">Baca Selengkapnya</a>
                  <ChevronRight className="w-4 h-4 ml-2 group-hover/link:translate-x-1 transition-transform" />
                </button>
                
                {/* Stats at bottom */}
                <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-center space-x-6 text-sm text-gray-400 dark:text-gray-500">
                    <div className="flex items-center space-x-2">
                      <div className="p-1 rounded-full bg-gray-200 dark:bg-gray-700">
                        <Eye className="w-4 h-4" />
                      </div>
                      <span>{service.views} Dilihat</span>
                    </div>
                    <div className="w-px h-4 bg-gray-300 dark:bg-gray-600"></div>
                    <div className="flex items-center space-x-2">
                      <div className="p-1 rounded-full bg-gray-200 dark:bg-gray-700">
                        <MessageCircle className="w-4 h-4" />
                      </div>
                      <span>{service.comments} Komentar</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      
      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
      <BackToTopButton />
    </div>
  );
}