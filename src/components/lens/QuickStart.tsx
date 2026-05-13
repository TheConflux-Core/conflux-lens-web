'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { GitBranch, Terminal, Globe, Shield, Play } from 'lucide-react';

const steps = [
  {
    number: '01',
    title: 'Clone & Install',
    description: 'Get the project and install dependencies with npm.',
    code: 'git clone https://github.com/TheConflux-Core/conflux-lens.git\ncd conflux-lens\nnpm install',
    icon: GitBranch
  },
  {
    number: '02',
    title: 'Set Up HTTPS Trust',
    description: 'Generate and trust the CA certificate for HTTPS interception.',
    code: 'npm run setup-trust setup\n\n# Follow the printed instructions\n# to configure NODE_EXTRA_CA_CERTS',
    icon: Shield
  },
  {
    number: '03',
    title: 'Start the Proxy',
    description: 'Launch the proxy server and dashboard.',
    code: 'npm start\n\n# Shows:\n# Proxy Server: localhost:9876\n# Dashboard:   localhost:3000',
    icon: Terminal
  },
  {
    number: '04',
    title: 'Configure Your Client',
    description: 'Point your AI agent or Node.js app to the proxy.',
    code: 'export HTTP_PROXY=http://localhost:9876\nexport HTTPS_PROXY=http://localhost:9876\nexport NODE_EXTRA_CA_CERTS="$HOME/.conflux-lens/ca.pem"\n\n# Windows PowerShell:\n$env:HTTP_PROXY="http://localhost:9876"',
    icon: Globe
  },
  {
    number: '05',
    title: 'Open Dashboard',
    description: 'Watch your AI traffic in real-time.',
    code: '# macOS\nopen http://localhost:3000\n\n# Windows\nstart http://localhost:3000\n\n# Linux\nxdg-open http://localhost:3000',
    icon: Play
  }
];

export default function QuickStart() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [activeStep, setActiveStep] = useState(0);
  const [typedLines, setTypedLines] = useState(0);

  // Auto-cycle through steps for animation
  useEffect(() => {
    if (!isInView) return;
    const interval = setInterval(() => {
      setActiveStep(prev => (prev + 1) % steps.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [isInView]);

  // Reset typed lines when step changes
  useEffect(() => {
    setTypedLines(0);
    const lines = steps[activeStep].code.split('\n').length;
    let count = 0;
    const interval = setInterval(() => {
      count++;
      setTypedLines(count);
      if (count >= lines) clearInterval(interval);
    }, 80);
    return () => clearInterval(interval);
  }, [activeStep]);

  return (
    <section id="quickstart" className="py-32 px-6 relative bg-[#050505]" ref={ref}>
      {/* Background grid */}
      <div className="absolute inset-0 grid-pattern opacity-50" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="text-[#D4AF37] text-sm font-semibold tracking-wider uppercase mb-4 block">
            Get Running in 60 Seconds
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-[#FAFAFA] mb-6">
            Quick Start Guide
          </h2>
          <p className="text-[#888] text-xl max-w-2xl mx-auto">
            From zero to seeing every AI API call in under a minute.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="space-y-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, x: -40 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="flex flex-col lg:flex-row gap-6 lg:gap-12 items-start"
            >
              {/* Step number + connector */}
              <div className="flex items-center gap-4 lg:flex-col lg:items-center lg:w-24">
                <div className={`step-number flex-shrink-0 ${activeStep === index ? 'glow-pulse' : ''}`}>
                  {step.number}
                </div>
                {index < steps.length - 1 && (
                  <div className="step-connector w-full h-px lg:h-24 lg:w-px" />
                )}
              </div>

              {/* Content */}
              <div className="flex-1 w-full">
                <div className="flex items-center gap-3 mb-3">
                  <step.icon 
                    size={20} 
                    className={activeStep === index ? 'text-[#F4D03F]' : 'text-[#888]'} 
                  />
                  <h3 className="text-[#FAFAFA] text-xl font-semibold">{step.title}</h3>
                </div>
                <p className="text-[#888] mb-4">{step.description}</p>

                {/* Code block */}
                <div className="code-block">
                  <div className="code-header">
                    <div className="dot dot-red" />
                    <div className="dot dot-yellow" />
                    <div className="dot dot-green" />
                    <span className="text-[#888] text-sm ml-2">{step.title.toLowerCase().replace(' ', '-')}</span>
                  </div>
                  <pre className="p-4 font-mono text-sm overflow-x-auto">
                    {step.code.split('\n').slice(0, typedLines).map((line, i) => (
                      <div key={i} className={line.startsWith('#') ? 'text-[#888]' : 'text-[#FAFAFA]'}>
                        {line || ' '}
                      </div>
                    ))}
                    {typedLines < step.code.split('\n').length && (
                      <span className="text-[#F4D03F] animate-pulse">▋</span>
                    )}
                  </pre>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Platform selector hint */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <p className="text-[#888] text-sm">
            Works on macOS, Linux, and Windows. Full platform-specific instructions in the docs.
          </p>
        </motion.div>
      </div>
    </section>
  );
}