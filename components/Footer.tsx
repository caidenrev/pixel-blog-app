"use client";
import React from "react";

const socialLinks = [
  { name: "GitHub", url: "https://github.com/", icon: "🐙" },
  { name: "Twitter", url: "https://twitter.com/", icon: "🐦" },
  { name: "Instagram", url: "https://instagram.com/", icon: "📸" },
];

const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-gradient-to-r from-[#0f2027] via-[#203a43] to-[#2c5364] text-white mt-12 shadow-inner">
      <div className="max-w-5xl mx-auto px-4 py-10 flex flex-col items-center">
        <h2 className="text-2xl font-bold tracking-widest mb-2">Pixel Blog</h2>
        <p className="mb-4 text-center text-lg opacity-90">
          Temukan inspirasi, bagikan cerita, dan jelajahi dunia pixel!
        </p>
        <div className="flex space-x-6 mb-4">
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.name}
              className="text-3xl hover:scale-125 transition-transform duration-200 hover:text-cyan-300"
            >
              {link.icon}
            </a>
          ))}
        </div>
        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/30 to-transparent mb-4" />
        <div className="text-sm opacity-70">
          &copy; {new Date().getFullYear()} Pixel Blog. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;