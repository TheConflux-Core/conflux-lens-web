'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { 
  Eye, Zap, DollarSign, Code2, GitBranch, Activity 
} from 'lucide-react';

const features = [
  {
    icon: Eye,
    title: 'System Prompt Visibility',
    description: 'See the exact system prompt being constructed and sent — not just the final response.',
    color: '#F4D03F'
  },
  {
    icon: Zap,
    title: 'Real-Time Streaming',
    description: 'Watch streaming responses (SSE) render live as tokens arrive from the API.',
    color: '#D4AF37'
  },
  {
    icon: DollarSign,
    title: 'Cost & Token Tracking',
    description: 'Track per-call and cumulative token usage with cost estimation per model.',
    color: '#F4D03F'
  },
  {
    icon: Code2,
    title: 'Tool Call Visualization',
    description: 'See every tool call, function signature, and result in a structured tree view.',
    color: '#D4AF37'
  },
  {
    icon: GitBranch,
    title: 'Multi-Step Loop Tracking',
    description: 'Follow agent reasoning chains across multi-turn conversations and tool loops.',
    color: '#F4D03F'
  },
  {
    icon: Activity,
    title: 'Dashboard UI',
    description: 'Beautiful real-time dashboard with request feed, filters, and detailed inspectors.',
    color: '#D4AF37'
  }
];

export default function Features() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="features" className="py-32 px-6 relative" ref={ref}>
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="text-[#D4AF37] text-sm font-semibold tracking-wider uppercase mb-4 block">
            What Lens Does
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-[#FAFAFA] mb-6">
            Everything Your AI Agent Hides
          </h2>
          <p className="text-[#888] text-xl max-w-2xl mx-auto">
            AI agents send complex HTTP payloads you can't see. Conflux Lens exposes 
            the full picture — from raw JSON to token counts.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="feature-card rounded-2xl p-8 group cursor-default"
            >
              {/* Icon */}
              <div 
                className="feature-icon w-14 h-14 rounded-xl bg-gradient-to-br from-[#D4AF37]/20 to-[#B8860B]/20 flex items-center justify-center mb-6 transition-all duration-300"
                style={{ 
                  border: `1px solid ${feature.color}33`,
                  boxShadow: `0 0 20px ${feature.color}11`
                }}
              >
                <feature.icon size={28} style={{ color: feature.color }} />
              </div>

              {/* Content */}
              <h3 className="text-[#FAFAFA] text-xl font-semibold mb-3 group-hover:text-[#F4D03F] transition-colors">
                {feature.title}
              </h3>
              <p className="text-[#888] leading-relaxed">
                {feature.description}
              </p>

              {/* Corner accent */}
              <div 
                className="absolute top-0 right-0 w-20 h-20 opacity-0 group-hover:opacity-100 transition-opacity"
                style={{
                  background: `radial-gradient(circle at top right, ${feature.color}08, transparent 70%)`
                }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}