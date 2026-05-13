import Navigation from '@/components/lens/Navigation';
import Hero from '@/components/lens/Hero';
import Features from '@/components/lens/Features';
import QuickStart from '@/components/lens/QuickStart';
import SDK from '@/components/lens/SDK';
import Compare from '@/components/lens/Compare';
import Footer from '@/components/lens/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#050505] text-[#FAFAFA]">
      <Navigation />
      <Hero />
      <Features />
      <QuickStart />
      <SDK />
      <Compare />
      <Footer />
    </main>
  );
}