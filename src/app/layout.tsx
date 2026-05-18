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

export const metadata: Metadata = {
  title: "Conflux Lens — LLM-aware HTTP Proxy",
  description: "See what your AI sees. Conflux Lens is an LLM-aware HTTP proxy that intercepts, inspects, and visualizes AI agent requests in real-time.",
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
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
