'use client';

import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { ArrowRight, Play } from 'lucide-react';

const Hero3D = dynamic(() => import('./Hero3D'), { 
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-[#050505]" />
});

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden grid-pattern">
      {/* 3D Background */}
      <Hero3D />

      {/* Radial gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050505]/50 to-[#050505] pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/80 via-transparent to-[#050505]/80 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <span className="inline-flex items-center gap-2 bg-[#0D0D0D] border border-[#1F1F1F] rounded-full px-4 py-2 text-sm">
            <span className="w-2 h-2 rounded-full bg-[#F4D03F] animate-pulse" />
            <span className="text-[#888]">Open Source</span>
            <span className="text-[#1F1F1F]">|</span>
            <span className="text-[#F4D03F]">MIT License</span>
          </span>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6"
        >
          <span className="text-[#FAFAFA]">See Through the </span>
          <span className="shimmer-text">AI Black Box</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl md:text-2xl text-[#888] max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          A purpose-built HTTP proxy for AI agents. Inspect every request, 
          response, token, and tool call — in real time.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a href="#quickstart" className="btn-gold flex items-center gap-2 text-lg px-8 py-4">
            Get Started
            <ArrowRight size={18} />
          </a>
          <a 
            href="#features" 
            className="btn-outline flex items-center gap-2 text-lg px-8 py-4"
          >
            <Play size={16} className="fill-current" />
            See How It Works
          </a>
        </motion.div>

        {/* Terminal preview snippet */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-16 max-w-xl mx-auto"
        >
          <div className="code-block">
            <div className="code-header">
              <div className="dot dot-red" />
              <div className="dot dot-yellow" />
              <div className="dot dot-green" />
              <span className="text-[#888] text-sm ml-2">terminal</span>
            </div>
            <div className="p-4 text-left font-mono text-sm">
              <div className="text-[#888]">$ git clone https://github.com/...</div>
              <div className="text-[#888]">$ cd conflux-lens && npm install</div>
              <div className="text-[#F4D03F]">$ npm start</div>
              <div className="mt-2 text-[#D4AF37]">
                <span className="text-[#28C840]">✓</span> Proxy: localhost:9876
              </div>
              <div className="text-[#D4AF37]">
                <span className="text-[#28C840]">✓</span> Dashboard: localhost:3000
              </div>
            </div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-[#1F1F1F] rounded-full flex justify-center pt-2">
            <div className="w-1 h-3 bg-[#F4D03F] rounded-full animate-bounce" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}