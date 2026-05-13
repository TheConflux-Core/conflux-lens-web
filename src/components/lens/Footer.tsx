'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { FileCode, Package, ExternalLink } from 'lucide-react';

export default function Footer() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <footer ref={ref} className="py-20 px-6 border-t border-[#1F1F1F]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="grid md:grid-cols-4 gap-12 mb-16"
        >
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#D4AF37] to-[#B8860B] flex items-center justify-center">
                <span className="text-black font-bold text-lg">L</span>
              </div>
              <span className="text-[#F4D03F] font-bold text-xl">Conflux Lens</span>
            </div>
            <p className="text-[#888] max-w-sm mb-6">
              Open source HTTP proxy for AI agent developers. 
              See everything. Debug anything.
            </p>
            <div className="flex items-center gap-4">
              <a 
                href="https://github.com/TheConflux-Core/conflux-lens" 
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[#888] hover:text-[#F4D03F] transition-colors"
              >
                <FileCode size={18} />
                <span className="text-sm">GitHub</span>
              </a>
              <a 
                href="https://www.npmjs.com/package/@conflux/sdk" 
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[#888] hover:text-[#F4D03F] transition-colors"
              >
                <Package size={18} />
                <span className="text-sm">npm</span>
              </a>
              <a 
                href="https://github.com/TheConflux-Core/conflux-lens/releases" 
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[#888] hover:text-[#F4D03F] transition-colors"
              >
                <ExternalLink size={18} />
                <span className="text-sm">Releases</span>
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-[#FAFAFA] font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              <li><a href="#features" className="text-[#888] hover:text-[#F4D03F] text-sm">Features</a></li>
              <li><a href="#quickstart" className="text-[#888] hover:text-[#F4D03F] text-sm">Quick Start</a></li>
              <li><a href="#sdk" className="text-[#888] hover:text-[#F4D03F] text-sm">SDK Docs</a></li>
              <li><a href="#compare" className="text-[#888] hover:text-[#F4D03F] text-sm">Comparison</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[#FAFAFA] font-semibold mb-4">Project</h4>
            <ul className="space-y-2">
              <li><a href="https://github.com/TheConflux-Core/conflux-lens" target="_blank" rel="noopener noreferrer" className="text-[#888] hover:text-[#F4D03F] text-sm">GitHub</a></li>
              <li><a href="https://github.com/TheConflux-Core/conflux-lens/issues" target="_blank" rel="noopener noreferrer" className="text-[#888] hover:text-[#F4D03F] text-sm">Issues</a></li>
              <li><a href="https://github.com/TheConflux-Core/conflux-lens/blob/main/LICENSE" target="_blank" rel="noopener noreferrer" className="text-[#888] hover:text-[#F4D03F] text-sm">MIT License</a></li>
              <li><span className="text-[#888] text-sm">v0.3.0</span></li>
            </ul>
          </div>
        </motion.div>

        {/* Bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="pt-8 border-t border-[#1F1F1F] flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <p className="text-[#888] text-sm">
            © 2026 The Conflux, LLC. MIT License.
          </p>
          <p className="text-[#888] text-sm">
            Built with ❤️ for the AI agent community
          </p>
        </motion.div>
      </div>
    </footer>
  );
}