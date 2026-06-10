import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import CinematicIntro from '@/components/lens/CinematicIntro';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const baseUrl = "https://lens.theconflux.com";

export const metadata: Metadata = {
  // === Base URL for resolving OG/Twitter images ===
  metadataBase: new URL(baseUrl),

  // === Core ===
  title: "Conflux Lens — LLM-aware HTTP Proxy for AI Agents",
  description:
    "See what your AI sees. Conflux Lens is an open-source, LLM-aware HTTP proxy that intercepts, inspects, and visualizes every AI agent request and response in real-time. Debug, log, and optimize your LLM calls.",
  applicationName: "Conflux Lens",
  keywords: [
    "LLM proxy",
    "AI agent debugger",
    "HTTP proxy for AI",
    "LLM observability",
    "AI agent monitoring",
    "OpenAI proxy",
    "LLM traffic inspector",
    "AI debugging tool",
    "Conflux",
    "agent observability",
    "LLM request inspector",
    "AI development tool",
    "LLM logging",
  ],
  authors: [{ name: "The Conflux Core Team", url: "https://github.com/TheConflux-Core" }],

  // === Canonical URL ===
  alternates: {
    canonical: "https://lens.theconflux.com",
  },

  // === Icons ===
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
    shortcut: "/favicon.png",
  },

  // === Open Graph ===
  openGraph: {
    title: "Conflux Lens — LLM-aware HTTP Proxy",
    description:
      "Open-source HTTP proxy for AI agents. Intercept, inspect, and visualize every LLM call in real-time. Debug faster, build better.",
    url: "https://lens.theconflux.com",
    siteName: "Conflux Lens",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Conflux Lens — LLM-aware HTTP Proxy for AI Agents",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  // === Twitter Card ===
  twitter: {
    card: "summary_large_image",
    title: "Conflux Lens — LLM-aware HTTP Proxy",
    description:
      "See what your AI sees. Open-source HTTP proxy for debugging and monitoring AI agent LLM calls.",
    images: ["/og-image.png"],
    site: "@TheConflux",
    creator: "@TheConflux",
  },

  // === Robots ===
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // === Additional meta ===
  other: {
    "theme-color": "#050505",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
    "google-site-verification": "", // Fill in after Search Console verification
  },

  // === Verification (Bing, Yandex, etc.) ===
  verification: {
    // google: "", // Add after verification — or use other.google-site-verification above
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Conflux Lens",
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Linux, macOS, Windows",
    description:
      "An open-source, LLM-aware HTTP proxy for AI agents. Intercepts, inspects, and visualizes every LLM request and response in real-time.",
    url: "https://lens.theconflux.com",
    sameAs: [
      "https://github.com/TheConflux-Core/conflux-lens",
      "https://www.npmjs.com/package/@theconflux/lens-sdk",
    ],
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      description: "Open source (MIT License)",
    },
    author: {
      "@type": "Organization",
      name: "The Conflux Core Team",
      url: "https://github.com/TheConflux-Core",
    },
  };

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        {/* Cinematic grain overlay */}
        <div className="grain-overlay" />
        {/* Cinematic intro — one-time per session */}
        <CinematicIntro />
        {children}
      </body>
    </html>
  );
}
