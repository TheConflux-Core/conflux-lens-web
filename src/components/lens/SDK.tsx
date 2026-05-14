'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Copy, Check } from 'lucide-react';

const codeExamples = [
  {
    title: 'Proxy Server',
    language: 'typescript',
    code: `import { createProxyServer } from '@conflux/sdk';

const proxy = createProxyServer({ 
  port: 9876,
  https: true 
});

proxy.on('request', (ctx) => {
  console.log('→', ctx.request.url);
  console.log('Tokens:', ctx.usage?.total_tokens);
});

await proxy.start();
console.log('Proxy running at localhost:9876');`
  },
  {
    title: 'Interceptor Mode',
    language: 'typescript',
    code: `import { createInterceptor } from '@conflux/sdk';

const interceptor = createInterceptor({
  target: 'all',
  captureBody: true,
  
  onRequest: (ctx) => {
    console.log('LLM Request:', ctx.method);
    console.log('Model:', ctx.model);
    console.log('System Prompt:', ctx.systemPrompt);
  },
  
  onResponse: (ctx) => {
    console.log('Tokens:', ctx.usage?.total_tokens);
    console.log('Cost: $', ctx.cost?.estimated);
  }
});

await interceptor.start(); // No proxy config needed!`
  },
  {
    title: 'WebSocket Live Feed',
    language: 'typescript',
    code: `import { AgentClient } from '@conflux/sdk';

const client = new AgentClient({
  proxyUrl: 'ws://localhost:9877'
});

client.on('frame', (frame) => {
  const { method, url, statusCode, usage } = frame;
  
  // Real-time request/response data
  console.log(\`\${method} \${url} → \${statusCode}\`);
  console.log(\`Tokens: \${usage?.prompt_tokens} + \${usage?.completion_tokens}\`);
  
  // Tool calls if present
  if (frame.toolCalls) {
    frame.toolCalls.forEach(tc => {
      console.log(\`🔧 Tool: \${tc.function.name}\`);
    });
  }
});

await client.connect();`
  }
];

export default function SDK() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [activeTab, setActiveTab] = useState(0);
  const [copied, setCopied] = useState(false);

  const copyCode = () => {
    navigator.clipboard.writeText(codeExamples[activeTab].code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      id="sdk"
      className="py-32 px-6 relative mesh-gradient-sdk overflow-hidden"
      ref={ref}
    >
      {/* Background grid */}
      <div className="absolute inset-0 grid-pattern opacity-20" />

      {/* Floating ambient orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="floating-orb orb-1" style={{ width: '280px', height: '280px', top: '20%', left: '10%', animationDelay: '-4s' }} />
        <div className="floating-orb orb-2" style={{ width: '320px', height: '320px', bottom: '10%', right: '5%', animationDelay: '-9s' }} />
        <div className="floating-orb orb-3" style={{ width: '200px', height: '200px', top: '60%', left: '70%', animationDelay: '-14s' }} />
      </div>

      {/* Decorative shards */}
      <div className="shard-deco shard-left" />
      <div className="shard-deco shard-right" />
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-[#D4AF37] text-sm font-semibold tracking-wider uppercase mb-4 block">
            For Developers
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-[#FAFAFA] mb-6">
            Powerful SDK
          </h2>
          <div className="section-divider mb-6" />
          <p className="text-[#888] text-xl max-w-2xl mx-auto">
            Programmatic control with a clean TypeScript API. Start the proxy,
            intercept requests, or stream events — all from code.
          </p>
        </motion.div>

        {/* Code showcase */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="glass-card rounded-2xl overflow-hidden"
        >
          {/* Tabs */}
          <div className="flex border-b border-[#1F1F1F]/50">
            {codeExamples.map((example, index) => (
              <button
                key={example.title}
                onClick={() => setActiveTab(index)}
                className={`px-6 py-4 text-sm font-medium transition-all ${
                  activeTab === index
                    ? 'text-[#F4D03F] border-b-2 border-[#F4D03F] bg-[#0D0D0D]'
                    : 'text-[#888] hover:text-[#FAFAFA]'
                }`}
              >
                {example.title}
              </button>
            ))}
          </div>

          {/* Code */}
          <div className="relative">
            <pre className="p-6 font-mono text-sm overflow-x-auto bg-[#080808]">
              <code className="text-[#FAFAFA]">
                {codeExamples[activeTab].code}
              </code>
            </pre>

            {/* Copy button */}
            <button
              onClick={copyCode}
              className="absolute top-4 right-4 p-2 rounded-lg bg-[#0D0D0D] border border-[#1F1F1F] hover:border-[#D4AF37] transition-colors"
            >
              {copied ? (
                <Check size={16} className="text-[#28C840]" />
              ) : (
                <Copy size={16} className="text-[#888]" />
              )}
            </button>
          </div>
        </motion.div>

        {/* Install hint */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 text-center"
        >
          <div className="inline-flex items-center gap-3 bg-[#0D0D0D] border border-[#1F1F1F] rounded-full px-6 py-3">
            <span className="text-[#888]">npm install</span>
            <span className="shimmer-text font-mono font-bold">@conflux/sdk ws</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}