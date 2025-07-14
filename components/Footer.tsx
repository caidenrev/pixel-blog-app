"use client";
import React from "react";

const socialLinks = [
  { name: "GitHub", url: "https://github.com/", icon: "🐙" },
  { name: "Twitter", url: "https://twitter.com/", icon: "🐦" },
  { name: "Instagram", url: "https://instagram.com/", icon: "📸" },
  { name: "LinkedIn", url: "https://linkedin.com/", icon: "💼" },
  { name: "YouTube", url: "https://youtube.com/", icon: "🎬" },
];

const quickLinks = [
  { name: "Home", url: "/" },
  { name: "Blog", url: "/blog" },
  { name: "About", url: "/about" },
  { name: "Contact", url: "/contact" },
];

const officeLocations = [
  {
    city: "Jakarta",
    address: "Jl. Sudirman No. 123",
    area: "Central Jakarta",
    postal: "10220",
    country: "Indonesia",
    phone: "+62 123 456 789",
    email: "jakarta@pixelblog.com"
  },
  {
    city: "Bandung",
    address: "Jl. Asia Afrika No. 456",
    area: "Central Bandung",
    postal: "40111",
    country: "Indonesia",
    phone: "+62 987 654 321",
    email: "bandung@pixelblog.com"
  }
];

const Footer: React.FC = () => {
  return (
    <footer className="relative w-full bg-transparent text-gray-600 dark:text-gray-300 mt-8 sm:mt-12 overflow-hidden transition-all duration-300">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm"></div>
      
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12 sm:py-16 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            
            {/* Brand Section */}
            <div className="lg:col-span-4 text-center lg:text-left">
              <div className="mb-6">
                <h2 className="text-xl font-pixel sm:text-xl lg:text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 dark:from-blue-400 dark:via-purple-400 dark:to-indigo-400 bg-clip-text text-transparent mb-3 tracking-tight">
                  Pixel Blog
                </h2>
                <div className="w-24 h-1 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 dark:from-blue-400 dark:via-purple-400 dark:to-indigo-400 rounded-full mx-auto lg:mx-0"></div>
              </div>
              
              <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-8 max-w-md mx-auto lg:mx-0">
                Temukan inspirasi, bagikan cerita, dan jelajahi dunia pixel dengan komunitas kreatif yang dinamis dan inovatif.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-500 dark:to-purple-500 text-white px-6 py-3 rounded-full font-medium hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105 active:scale-95">
                  <a href="https://discord.gg/DwgAJbkE">Join Discord </a>
                </button>
                <button className="border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-6 py-3 rounded-full font-medium hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300">
                  Learn More
                </button>
              </div>
            </div>

            {/* Navigation & Office Locations */}
            <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              
              {/* Quick Links */}
              <div>
                <h3 className="text-lg font-semibold mb-6 text-gray-900 dark:text-white">
                  Navigation
                </h3>
                <ul className="space-y-4">
                  {quickLinks.map((link) => (
                    <li key={link.name}>
                      <a
                        href={link.url}
                        className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 flex items-center group"
                      >
                        <span className="w-0 group-hover:w-2 h-0.5 bg-blue-500 transition-all duration-200 mr-0 group-hover:mr-2"></span>
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Office Locations */}
              <div className="md:col-span-2 lg:col-span-1">
                <h3 className="text-lg font-semibold mb-6 text-gray-900 dark:text-white">
                  Our Offices
                </h3>
                <div className="grid gap-6">
                  {officeLocations.map((office) => (
                    <div 
                      key={office.city}
                      className="p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 hover:shadow-lg transition-all duration-300"
                    >
                      <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                        {office.city}
                      </h4>
                      <address className="not-italic text-sm space-y-1">
                        <p>{office.address}</p>
                        <p>{office.area}</p>
                        <p>{office.postal}, {office.country}</p>
                        <p className="mt-2">
                          <span className="inline-block mr-2">📞</span>
                          {office.phone}
                        </p>
                        <p>
                          <span className="inline-block mr-2">📧</span>
                          {office.email}
                        </p>
                      </address>
                    </div>
                  ))}
                </div>
              </div>

              {/* Social Media & Newsletter */}
              <div>
                <h3 className="text-lg font-semibold mb-6 text-gray-900 dark:text-white">
                  Connect With Us
                </h3>
                {/* Social Links Grid - Made more compact */}
                <div className="grid grid-cols-5 gap-2 mb-6">
                  {socialLinks.map((link) => (
                    <a
                      key={link.name}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={link.name}
                      className="group aspect-square bg-gray-50 dark:bg-gray-800 rounded-lg flex items-center justify-center text-xl transition-all duration-300 hover:scale-110 border border-gray-200 dark:border-gray-700 hover:border-current"
                    >
                      <span className="group-hover:scale-125 transition-transform duration-200">
                        {link.icon}
                      </span>
                    </a>
                  ))}
                </div>
                
                {/* Newsletter - Simplified design */}
                <div className="mt-6">
                  <p className="text-sm mb-3">
                    Subscribe to our newsletter
                  </p>
                  <div className="flex">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="flex-1 px-4 py-2 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-current focus:border-transparent"
                    />
                    <button className="px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-sm font-medium rounded-r-lg hover:opacity-90 transition-opacity duration-200">
                      Subscribe
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar - Simplified */}
        <div className="border-t border-gray-200 dark:border-gray-800 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="text-sm text-center sm:text-left">
              &copy; {new Date().getFullYear()} Pixel Blog. All rights reserved.
            </div>
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <a href="/privacy" className="hover:underline">Privacy Policy</a>
              <a href="/terms" className="hover:underline">Terms of Service</a>
              <a href="/cookies" className="hover:underline">Cookies</a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10"></div>
    </footer>
  );
};

export default Footer;