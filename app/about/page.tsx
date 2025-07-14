'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { 
  Users, 
  Award, 
  Lightbulb, 
  Target, 
  Heart,
  ArrowRight,
  CheckCircle,
  Star,
  Sparkles,
  Github,
  Linkedin,
  Twitter,
  Instagram,
  Mail,
  BookOpen,
  Coffee,
  Zap,
  Server,
  Database,
  Layout
} from 'lucide-react'

// Update the VisibilityState interface to include new properties
interface VisibilityState {
  hero?: boolean;
  journey?: boolean;
  skills?: boolean;
  story?: boolean;
  contact?: boolean;
  tech?: boolean;    // Add new property
  features?: boolean; // Add new property
  team?: boolean;    // Add new property
}

interface Particle {
  left: string;
  top: string;
  delay: string;
  duration: string;
}

export default function About() {
  const [isVisible, setIsVisible] = useState<VisibilityState>({
    hero: false,
    journey: false,
    skills: false,
    story: false,
    contact: false,
    tech: false,    // Add new states
    features: false,
    team: false
  });

  const [particles, setParticles] = useState<Particle[]>([]);

  // Updated techStack with custom images
  const techStack = [
    {
      name: 'Next.js 14',
      image: '/images/next.js.svg', // Replace with your actual image path
      description: 'Latest Next.js for optimal performance and SEO',
      color: 'from-blue-500 to-blue-700',
      largeImage: true // Add flag for larger image
    },
    {
      name: 'TypeScript',
      image: '/images/typescript.svg', // Replace with your actual image path
      description: 'Type-safe development for robust code',
      color: 'from-blue-400 to-blue-600'
    },
    {
      name: 'Tailwind CSS',
      image: '/images/tailwindcss.svg', // Replace with your actual image path
      description: 'Modern utility-first CSS framework',
      color: 'from-teal-500 to-teal-700'
    },
    {
      name: 'Amazon Web Service',
      image: '/images/aws.svg', // Replace with your actual image path
      description: 'Easy content management for blog posts',
      color: 'from-purple-500 to-purple-700',
      largeImage: true // Add flag for larger image
    }
  ]

  const features = [
    {
      name: 'Dark Mode',
      icon: <Lightbulb className="w-6 h-6" />,
      description: 'Comfortable reading experience in any lighting',
      color: 'from-yellow-500 to-yellow-700'
    },
    {
      name: 'Responsive Design',
      icon: <Target className="w-6 h-6" />,
      description: 'Perfect viewing on all devices',
      color: 'from-green-500 to-green-700'
    },
    {
      name: 'Fast Loading',
      icon: <Zap className="w-6 h-6" />,
      description: 'Optimized performance and quick page loads',
      color: 'from-red-500 to-red-700'
    },
    {
      name: 'SEO Optimized',
      icon: <Server className="w-6 h-6" />,
      description: 'Better visibility in search results',
      color: 'from-indigo-500 to-indigo-700'
    }
  ]

  // Update the team data with more details
  const team = [
    {
      name: "Eka Revandi",
      role: "Moderator",
      image: "/images/naruto.jpg",  // Updated path without 'public'
      bio: "Frontend Engineer with experience in web and mobile app development, skilled in UX/UI design and cloud computing.",
      expertise: ["Google UX Academy", "Google Developer Groups", "Frontend Engineer", "Web Engineer"],
      github: "#",
      linkedin: "#",
      instagram: "#"
    },
    {
      name: "Yudi Setiawan",
      role: "Founder", 
      image: "/images/sasuke.jpg",  // Updated path without 'public'
      bio: "Backend Engineer specializing in system architecture and API integration, with expertise in infrastructure management.",
      expertise: ["Software Architecture", "Lua Programming", "Bot Engineering"],
      github: "#",
      linkedin: "#",
      twitter: "#"
    },
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(prev => ({
            ...prev,
            [entry.target.id]: entry.isIntersecting
          }))
        })
      },
      { threshold: 0.1 }
    )

    const elements = document.querySelectorAll('[id]')
    elements.forEach(el => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const particlesArray: Particle[] = [...Array(20)].map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`, 
      delay: `${Math.random() * 3}s`,
      duration: `${3 + Math.random() * 2}s`
    }));
    setParticles(particlesArray);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Hero Section */}
      <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
          {particles.map((particle, i) => (
            <div
              key={i}
              className="absolute animate-pulse"
              style={{
                left: particle.left,
                top: particle.top,
                animationDelay: particle.delay,
                animationDuration: particle.duration
              }}
            >
              <Sparkles className="w-4 h-4 text-blue-500/40" />
            </div>
          ))}
        </div>
        
        <div className="relative z-10 max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className={`transition-all duration-1000 ${isVisible.hero ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0'}`}>
              <div className="mb-6">
                <span className="inline-flex items-center px-4 py-2 rounded-full bg-blue-500/10 text-blue-400 text-sm font-medium">
                  <Coffee className="w-4 h-4 mr-2" />
                  Gen Z Learning Platform
                </span>
              </div>
              
              <h1 className="text-3xl font-pixel md:text-4xl font-black text-white mb-6 leading-tight">
                Tentang <br></br>
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  {" "}Pixel Learn
                </span>
              </h1>
              
              <p className="text-xl text-gray-300 mb-6 leading-relaxed">
                A modern blogging platform built with the latest web technologies, designed to provide an exceptional writing and reading experience.
              </p>

              <p className="text-lg text-gray-400 mb-8 leading-relaxed">
                Created by developers for developers, Pixel Blog combines beautiful design with powerful features to make your content stand out.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <button className="group px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-xl">
                  Start Writing
                  <ArrowRight className="inline-block ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="px-8 py-4 border-2 border-gray-700 text-gray-300 rounded-2xl font-bold text-lg hover:bg-gray-800 transition-all duration-300">
                  View Features
                </button>
              </div>
            </div>

            <div className={`transition-all duration-1000 delay-300 ${isVisible.hero ? 'translate-x-0 opacity-100' : 'translate-x-20 opacity-0'}`}>
              <div className="relative w-full aspect-video rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800"
                  alt="Modern Workspace"
                  layout="fill"
                  objectFit="cover"
                  className="transition-transform duration-500 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-gray-900/20 to-transparent"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

       {/* Tech Stack Section - Updated with custom images */}
      <section id="tech" className="py-24 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black text-white mb-6">Tech Stack</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Built with modern technologies for optimal performance and developer experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {techStack.map((tech, index) => (
              <div
                key={tech.name}
                className={`group relative overflow-hidden rounded-3xl p-8 bg-gray-900 border border-gray-800 hover:border-blue-500/50 transition-all duration-700 transform hover:-translate-y-4 ${
                  isVisible.tech ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className={`${tech.largeImage ? 'w-28 h-28' : 'w-20 h-20'} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <div className="relative w-full h-full">
                    <Image
                      src={tech.image}
                      alt={`${tech.name} logo`}
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white">{tech.name}</h3>
                <p className="text-gray-400 leading-relaxed">{tech.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black text-white mb-6">Key Features</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Everything you need for a modern blogging experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={feature.name}
                className={`group relative overflow-hidden rounded-3xl p-8 bg-gray-800 border border-gray-700 hover:border-blue-500/50 transition-all duration-700 transform hover:-translate-y-4 ${
                  isVisible.features ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white">{feature.name}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-24 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black text-white mb-6">Meet the Team</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              The talented people behind Pixel Blog
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {team.map((member, index) => (
              <div
                key={member.name}
                className={`group relative overflow-hidden rounded-3xl p-8 bg-gray-900/50 backdrop-blur-lg border border-gray-800 hover:border-blue-500/50 transition-all duration-700 transform hover:-translate-y-4 ${
                  isVisible.team ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                {/* Gradient Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Content */}
                <div className="relative z-10">
                  {/* Profile Image */}
                  <div className="relative w-40 h-40 mx-auto mb-8">
                    {/* Glowing border effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full blur-xl opacity-20 group-hover:opacity-30 transition-opacity" />
                    
                    {/* Double border with gradient */}
                    <div className="w-40 h-40 rounded-full p-1 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500">
                      <div className="w-full h-full rounded-full overflow-hidden border-4 border-gray-900">
                        <Image
                          src={member.image}
                          alt={member.name}
                          width={160}
                          height={160}
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                          style={{
                            objectFit: 'cover',
                            objectPosition: 'center'
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-white mb-2">{member.name}</h3>
                    <p className="text-blue-400 font-medium mb-4">{member.role}</p>
                    <p className="text-gray-400 mb-6 line-clamp-3 hover:line-clamp-none transition-all duration-300">
                      {member.bio}
                    </p>

                    {/* Expertise Tags */}
                    <div className="flex flex-wrap gap-2 justify-center mb-6">
                      {member.expertise.map((skill) => (
                        <span
                          key={skill}
                          className="px-3 py-1 text-sm bg-gray-800/50 text-gray-300 rounded-full border border-gray-700 hover:border-blue-500/50 transition-colors"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                    {/* Social Links */}
                    <div className="flex justify-center gap-4">
                      <a href={member.github} className="text-gray-400 hover:text-white transition-colors transform hover:scale-110">
                        <Github className="w-6 h-6" />
                      </a>
                      <a href={member.linkedin} className="text-gray-400 hover:text-white transition-colors transform hover:scale-110">
                        <Linkedin className="w-6 h-6" />
                      </a>
                      <a href={member.twitter} className="text-gray-400 hover:text-white transition-colors transform hover:scale-110">
                        <Twitter className="w-6 h-6" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-5xl font-black mb-6 text-white">Get In Touch</h2>
          <p className="text-xl mb-12 text-gray-300">
            Have questions or want to contribute? We'd love to hear from you!
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            {[
              { icon: <Github className="w-8 h-8" />, label: 'GitHub', href: '#' },
              { icon: <Linkedin className="w-8 h-8" />, label: 'LinkedIn', href: '#' },
              { icon: <Twitter className="w-8 h-8" />, label: 'Twitter', href: '#' },
              { icon: <Mail className="w-8 h-8" />, label: 'Email', href: '#' }
            ].map((social, index) => (
              <a
                key={social.label}
                href={social.href}
                className={`group flex flex-col items-center gap-3 p-6 bg-gray-800/50 backdrop-blur-sm rounded-2xl hover:bg-gray-700/50 transition-all duration-300 transform hover:scale-105 ${
                  isVisible.contact ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="group-hover:scale-110 transition-transform duration-300">
                  {social.icon}
                </div>
                <span className="font-semibold">{social.label}</span>
              </a>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105">
              Start Contributing
            </button>
            <button className="px-8 py-4 border-2 border-gray-700 text-white rounded-2xl font-bold text-lg hover:bg-gray-800 transition-all duration-300">
              View Documentation
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}