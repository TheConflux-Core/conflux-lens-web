'use client';

import { motion } from 'framer-motion';
import { FileCode, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
      {/* Glass background */}
      <div className="absolute inset-0 bg-[#050505]/80 backdrop-blur-xl border-b border-[#1F1F1F]/30 -z-10" />

      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <motion.div
          className="flex items-center gap-3"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#D4AF37] to-[#B8860B] flex items-center justify-center ring-1 ring-[#D4AF37]/30">
              <span className="text-black font-bold text-lg">L</span>
            </div>
            <div className="absolute -inset-1 bg-gradient-to-r from-[#F4D03F] to-[#D4AF37] rounded-lg blur opacity-30 -z-10" />
          </div>
          <div>
            <span className="text-[#F4D03F] font-bold text-xl tracking-tight">Conflux Lens</span>
            <span className="text-[#888] text-sm ml-2 hidden sm:inline">for AI Agents</span>
          </div>
        </motion.div>

        {/* Desktop Nav */}
        <motion.div 
          className="hidden md:flex items-center gap-8"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <a href="#features" className="text-[#888] hover:text-[#F4D03F] transition-colors text-sm">Features</a>
          <a href="#quickstart" className="text-[#888] hover:text-[#F4D03F] transition-colors text-sm">Quick Start</a>
          <a href="#sdk" className="text-[#888] hover:text-[#F4D03F] transition-colors text-sm">SDK</a>
          <a href="#compare" className="text-[#888] hover:text-[#F4D03F] transition-colors text-sm">Compare</a>
          
          {/* GitHub Star */}
          <a 
            href="https://github.com/TheConflux-Core/conflux-lens" 
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-[#0D0D0D] border border-[#1F1F1F] rounded-full px-4 py-2 hover:border-[#D4AF37] transition-colors"
          >
            <FileCode size={16} className="text-[#F4D03F]" />
            <span className="text-[#888] text-sm">Star on GitHub</span>
          </a>

          {/* CTA */}
          <a href="#quickstart" className="btn-gold text-sm py-2 px-5">Get Started</a>
        </motion.div>

        {/* Mobile menu button */}
        <button 
          className="md:hidden text-[#F4D03F]"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <motion.div 
          className="md:hidden absolute top-full left-0 right-0 bg-[#0D0D0D] border-b border-[#1F1F1F] px-6 py-6 flex flex-col gap-4"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <a href="#features" className="text-[#888] hover:text-[#F4D03F]" onClick={() => setMobileOpen(false)}>Features</a>
          <a href="#quickstart" className="text-[#888] hover:text-[#F4D03F]" onClick={() => setMobileOpen(false)}>Quick Start</a>
          <a href="#sdk" className="text-[#888] hover:text-[#F4D03F]" onClick={() => setMobileOpen(false)}>SDK</a>
          <a href="#compare" className="text-[#888] hover:text-[#F4D03F]" onClick={() => setMobileOpen(false)}>Compare</a>
          <a 
            href="https://github.com/TheConflux-Core/conflux-lens" 
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-[#888]"
          >
            <FileCode size={16} /> GitHub
          </a>
          <a href="#quickstart" className="btn-gold text-center" onClick={() => setMobileOpen(false)}>Get Started</a>
        </motion.div>
      )}
    </nav>
  );
}