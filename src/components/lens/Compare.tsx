'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Check, X, ArrowRight } from 'lucide-react';

const comparison = [
  { feature: 'Price', lens: 'Free (MIT)', burp: '$449/year' },
  { feature: 'HTTP Proxy', lens: true, burp: true },
  { feature: 'HTTPS Intercept', lens: true, burp: true },
  { feature: 'LLM Token Display', lens: true, burp: false },
  { feature: 'Cost Tracking', lens: true, burp: false },
  { feature: 'Tool Call View', lens: true, burp: false },
  { feature: 'System Prompt View', lens: true, burp: false },
  { feature: 'Streaming Support', lens: true, burp: false },
  { feature: 'No Browser Extension', lens: true, burp: false },
  { feature: 'Open Source', lens: true, burp: false },
];

export default function Compare() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      id="compare"
      className="py-32 px-6 relative mesh-gradient-compare overflow-hidden"
      ref={ref}
    >
      {/* Background grid */}
      <div className="absolute inset-0 grid-pattern opacity-20" />

      {/* Floating ambient orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="floating-orb orb-1" style={{ width: '320px', height: '320px', top: '10%', left: '-10%', animationDelay: '-5s' }} />
        <div className="floating-orb orb-3" style={{ width: '240px', height: '240px', bottom: '15%', left: '30%', animationDelay: '-11s' }} />
      </div>

      {/* Decorative shards */}
      <div className="shard-deco shard-left" />
      <div className="shard-deco shard-right" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-[#D4AF37] text-sm font-semibold tracking-wider uppercase mb-4 block">
            Why Conflux Lens
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-[#FAFAFA] mb-6">
            Built for AI Agents
          </h2>
          <div className="section-divider mb-6" />
          <p className="text-[#888] text-xl max-w-2xl mx-auto">
            BurpSuite was built for web security. We built Lens for AI agent debugging.
          </p>
        </motion.div>

        {/* Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="glass-card rounded-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="grid grid-cols-3 bg-[#0D0D0D]/80 border-b border-[#1F1F1F]/50">
            <div className="p-6 text-[#888] font-medium">Feature</div>
            <div className="p-6 text-center bg-[#0D0D0D]/80">
              <span className="shimmer-text font-bold text-lg">Conflux Lens</span>
            </div>
            <div className="p-6 text-center bg-[#0D0D0D]/80 text-[#888]">
              BurpSuite Pro
            </div>
          </div>

          {/* Rows */}
          {comparison.map((row, index) => (
            <motion.div
              key={row.feature}
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.3 + index * 0.05 }}
              className={`grid grid-cols-3 border-b border-[#1F1F1F]/30 last:border-b-0 ${
                index % 2 === 0 ? 'bg-[#0D0D0D]/40' : 'bg-[#080808]/40'
              }`}
            >
              <div className="p-5 text-[#FAFAFA] font-medium">{row.feature}</div>
              <div className="p-5 flex justify-center items-center">
                {typeof row.lens === 'boolean' ? (
                  row.lens ? (
                    <Check size={20} className="text-[#28C840]" />
                  ) : (
                    <X size={20} className="text-[#FF5F57]" />
                  )
                ) : (
                  <span className="text-[#F4D03F] font-semibold">{row.lens}</span>
                )}
              </div>
              <div className="p-5 flex justify-center items-center">
                {typeof row.burp === 'boolean' ? (
                  row.burp ? (
                    <Check size={20} className="text-[#888]" />
                  ) : (
                    <X size={20} className="text-[#888]" />
                  )
                ) : (
                  <span className="text-[#888]">{row.burp}</span>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12 text-center"
        >
          <a 
            href="https://github.com/TheConflux-Core/conflux-lens" 
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline inline-flex items-center gap-2"
          >
            View on GitHub
            <ArrowRight size={16} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}