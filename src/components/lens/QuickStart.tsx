'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { GitBranch, Terminal, Globe, Shield, Play, Copy, Check, Zap } from 'lucide-react';

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

function CopyButton({ text, label }: { text: string; label: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#0D0D0D] border border-[#1F1F1F] hover:border-[#D4AF37] transition-all text-sm"
    >
      {copied ? (
        <>
          <Check size={14} className="text-[#28C840]" />
          <span className="text-[#28C840]">Copied</span>
        </>
      ) : (
        <>
          <Copy size={14} className="text-[#888]" />
          <span className="text-[#888]">{label}</span>
        </>
      )}
    </button>
  );
}

export default function QuickStart() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const [activeStep, setActiveStep] = useState(0);
  const [typedLines, setTypedLines] = useState(0);

  // Auto-cycle through steps — stop after all shown
  useEffect(() => {
    if (!isInView) return;

    const interval = setInterval(() => {
      setActiveStep(prev => {
        const next = prev + 1;
        if (next >= steps.length) {
          clearInterval(interval);
          return prev; // stay on last step
        }
        return next;
      });
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
    <section
      id="quickstart"
      className="py-32 px-6 relative mesh-gradient-quickstart overflow-hidden"
      ref={sectionRef}
    >
      {/* Background grid */}
      <div className="absolute inset-0 grid-pattern opacity-30" />

      {/* Floating ambient orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="floating-orb orb-2" style={{ width: '300px', height: '300px', animationDelay: '-3s' }} />
        <div className="floating-orb orb-1" style={{ width: '220px', height: '220px', top: '40%', left: '60%', animationDelay: '-8s' }} />
      </div>

      {/* Decorative shards */}
      <div className="shard-deco shard-left" />
      <div className="shard-deco shard-right" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-[#D4AF37] text-sm font-semibold tracking-wider uppercase mb-4 block">
            Get Running in 60 Seconds
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-[#FAFAFA] mb-6">
            Quick Start Guide
          </h2>
          <div className="section-divider mb-6" />
          <p className="text-[#888] text-xl max-w-2xl mx-auto">
            From zero to seeing every AI API call in under a minute.
          </p>
        </motion.div>

        {/* ═══════════════════════════════════════════════════════════════
           One-Line Install Callout
           ═══════════════════════════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-20"
        >
          <div className="gold-border-glow rounded-2xl p-8 md:p-10 bg-[#0D0D0D] relative overflow-hidden">
            {/* Subtle background shine */}
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#F4D03F] opacity-[0.03] rounded-full blur-3xl pointer-events-none" />

            <div className="flex flex-col lg:flex-row items-start gap-6 relative z-10">
              {/* Left: badge + description */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-[#D4AF37]/20 to-[#F4D03F]/10 border border-[#D4AF37]/30">
                    <Zap size={20} className="text-[#F4D03F]" />
                  </div>
                  <span className="shimmer-text font-bold text-lg">One-Line Install</span>
                </div>
                <p className="text-[#888] text-sm leading-relaxed max-w-md">
                  No git clone, no npm install — just run one command and
                  everything is set up automatically.
                </p>
              </div>

              {/* Right: command lines */}
              <div className="flex-1 w-full space-y-3">
                {/* Linux/macOS */}
                <div className="code-block">
                  <div className="code-header">
                    <div className="dot dot-red" />
                    <div className="dot dot-yellow" />
                    <div className="dot dot-green" />
                    <span className="text-[#888] text-xs ml-2">macOS / Linux</span>
                    <div className="ml-auto">
                      <CopyButton
                        text="curl -fsSL https://lens.theconflux.com/install.sh | bash"
                        label="Copy"
                      />
                    </div>
                  </div>
                  <pre className="p-4 font-mono text-sm overflow-x-auto bg-[#080808]">
                    <code className="text-[#28C840]">
                      curl -fsSL https://lens.theconflux.com/install.sh | bash
                    </code>
                  </pre>
                </div>

                {/* Windows */}
                <div className="code-block">
                  <div className="code-header">
                    <div className="dot dot-red" />
                    <div className="dot dot-yellow" />
                    <div className="dot dot-green" />
                    <span className="text-[#888] text-xs ml-2">Windows PowerShell</span>
                    <div className="ml-auto">
                      <CopyButton
                        text='powershell -c "irm https://lens.theconflux.com/install.ps1 | iex"'
                        label="Copy"
                      />
                    </div>
                  </div>
                  <pre className="p-4 font-mono text-sm overflow-x-auto bg-[#080808]">
                    <code className="text-[#28C840]">
                      powershell -c &quot;irm https://lens.theconflux.com/install.ps1 | iex&quot;
                    </code>
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ═══════════════════════════════════════════════════════════════
           Full Install (Manual) — existing steps below
           ═══════════════════════════════════════════════════════════════ */}

        {/* Manual install header */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="flex items-center gap-4 mb-10"
        >
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#1F1F1F] to-transparent" />
          <span className="inline-flex items-center gap-2 text-[#888] text-sm font-medium tracking-wide uppercase">
            <Terminal size={14} />
            Full Install (Manual)
          </span>
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#1F1F1F] to-transparent" />
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
                <div className="code-block code-dressed mt-4">
                  <div className="code-header">
                    <div className="dot dot-red" />
                    <div className="dot dot-yellow" />
                    <div className="dot dot-green" />
                    <span className="text-[#888] text-sm ml-2">{step.title.toLowerCase().replace(' ', '-')}</span>
                  </div>
                  <pre className="p-4 font-mono text-sm overflow-x-auto bg-[#080808]">
                    {index === activeStep
                      ? step.code.split('\n').slice(0, typedLines).map((line, i) => (
                          <div key={i} className={line.startsWith('#') ? 'text-[#888]' : 'text-[#FAFAFA]'}>
                            {line || ' '}
                          </div>
                        ))
                      : step.code.split('\n').map((line, i) => (
                          <div key={i} className={line.startsWith('#') ? 'text-[#888]' : 'text-[#FAFAFA]'}>
                            {line || ' '}
                          </div>
                        ))}
                    {index === activeStep && typedLines < step.code.split('\n').length && (
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
