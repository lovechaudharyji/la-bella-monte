"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Search, ShoppingCart } from "lucide-react";

export default function Home() {
  const scrollAreaRef = useRef<HTMLDivElement | null>(null);
  
  // Track visibility of each section for the "curtain" effect
  const [sectionProgress, setSectionProgress] = useState({
    daytona: 0,
    spirit: 0,
    phantom: 0,
    royale: 0,
  });

  useEffect(() => {
    const handleScroll = () => {
      const daytona = document.getElementById('section-daytona');
      const spirit = document.getElementById('section-spirit');
      const phantom = document.getElementById('section-phantom');
      const royale = document.getElementById('section-royale');

      if (!daytona || !spirit || !phantom || !royale) return;

      const getVisibility = (el: HTMLElement) => {
        const rect = el.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        // Calculate how much of the section is visible from the bottom up
        // When rect.top is at viewportHeight, visibility is 0
        // When rect.top is at 0, visibility is 1 (fully covers screen)
        // We clamp between 0 and 1
        return Math.max(0, Math.min(1, (viewportHeight - rect.top) / viewportHeight));
      };

      setSectionProgress({
        daytona: getVisibility(daytona),
        spirit: getVisibility(spirit),
        phantom: getVisibility(phantom),
        royale: getVisibility(royale),
      });
    };

    window.addEventListener("scroll", handleScroll);
    // Initial check
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Track visibility of each section for the "curtain" effect

  return (
    <div className="relative min-h-screen bg-black text-white">
      <header className="fixed left-0 right-0 top-0 z-[100] flex items-center justify-between px-10 py-2 bg-black/30 backdrop-blur-md border-b border-white/10">
        <div className="text-3xl font-suave font-normal tracking-normal uppercase">
          LA BELLA MONTE
        </div>
        <nav className="hidden items-center gap-10 text-sm tracking-normal uppercase md:flex">
          <a href="#" className="hover:text-yellow-100">
            Home
          </a>
          <a href="#" className="hover:text-yellow-100">
            Men
          </a>
          <a href="#" className="hover:text-yellow-100">
            Women
          </a>
          <a href="#" className="hover:text-yellow-100">
            News
          </a>
        </nav>
        <div className="flex items-center gap-6">
          <div className="relative">
            <button className="flex items-center justify-center text-white hover:text-gray-300 transition-colors">
              <Search className="w-5 h-5" />
            </button>
          </div>
          <div className="relative">
            <button className="flex items-center justify-center text-white hover:text-gray-300 transition-colors">
              <ShoppingCart className="w-5 h-5" />
            </button>
            <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-[10px] font-semibold">
              0
            </span>
          </div>
        </div>
      </header>

      {/* Fixed Watch Display - "Curtain Reveal" Effect */}
      <div className="fixed inset-0 z-[60] pointer-events-none">
        {/* Daytona Watch - Revealed by Daytona Section */}
        <div 
          className="absolute inset-0 flex items-center justify-center bg-transparent"
          style={{ 
            clipPath: `inset(${100 - (sectionProgress.daytona * 100)}% 0 ${sectionProgress.spirit * 100}% 0)`
          }}
        >
          <Image
            src="/image/daytona.png"
            alt="Daytona Watch"
            width={1200}
            height={1200}
            className="max-h-[85vh] w-auto object-contain"
            style={{ transform: 'scale(1.35) translateY(10%)' }}
          />
        </div>

        {/* Spirit Watch - Revealed by Spirit Section */}
        <div 
          className="absolute inset-0 flex items-center justify-center bg-transparent"
          style={{ 
            clipPath: `inset(${100 - (sectionProgress.spirit * 100)}% 0 ${sectionProgress.phantom * 100}% 0)`
          }}
        >
          <Image
            src="/image/Spirits.png"
            alt="Spirit Watch"
            width={1400}
            height={1400}
            className="max-h-[90vh] w-auto object-contain"
            style={{ transform: 'scale(1.45) translateY(5%)' }}
          />
        </div>

        {/* Phantom Watch - Revealed by Phantom Section */}
        <div 
          className="absolute inset-0 flex items-center justify-center bg-transparent"
          style={{ 
            clipPath: `inset(${100 - (sectionProgress.phantom * 100)}% 0 ${sectionProgress.royale * 100}% 0)`
          }}
        >
          <Image
            src="/image/Phantomes.png"
            alt="Phantom Watch"
            width={1200}
            height={1200}
            className="max-h-[85vh] w-auto object-contain"
            style={{ transform: 'scale(1.35) translateY(10%)' }}
          />
        </div>

        {/* Royale Watch - Revealed by Royale Section */}
        <div 
          className="absolute inset-0 flex items-center justify-center bg-transparent"
          style={{ 
            clipPath: `inset(${100 - (sectionProgress.royale * 100)}% 0 0 0)`
          }}
        >
          <Image
            src="/image/Suprans.png"
            alt="Royale Watch"
            width={1200}
            height={1200}
            className="max-h-[85vh] w-auto object-contain"
            style={{ transform: 'scale(1.8) translateX(5%)' }}
          />
        </div>
      </div>

      <div ref={scrollAreaRef} className="relative flex flex-col">
        
        <section className="sticky top-0 z-10 h-screen overflow-hidden flex-shrink-0">
          <div className="absolute inset-0">
            <video
              className="h-full w-full object-cover"
              src="/image/hero1.mp4"
              autoPlay
              loop
              muted
              playsInline
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/90" />
          </div>

          <div className="relative z-10 flex h-[calc(100vh-80px)] flex-col items-center justify-center px-4 text-center">
            <div className="mb-3 text-xs tracking-normal uppercase text-white/70 font-medium font-sans">
              Luxor Watches
            </div>
            <div className="mb-6 h-[2px] w-32 bg-red-600" />
            <h1 className="text-4xl font-normal tracking-normal uppercase md:text-6xl font-sans">
              Luxury Of Time
            </h1>
          </div>
        </section>

        {/* Section 1: Daytona */}
        <section id="section-daytona" className="sticky top-0 z-20 h-screen w-full flex-shrink-0 overflow-hidden bg-black text-white">
          <div className="absolute inset-0">
            <Image
              src="/image/2.webp"
              alt="Daytona background"
              fill
              sizes="100vw"
              className="object-cover"
            />
          </div>

          <div className="relative mx-auto flex h-full max-w-7xl items-center justify-between gap-6">
            <div className="text-2xl font-semibold tracking-normal uppercase md:text-3xl flex-1 text-left">
              Daytona
            </div>
            {/* Watch space placeholder - Watch is now fixed above */}
            <div className="relative flex h-full flex-[2] items-center justify-center">
            </div>
            <div className="text-xs tracking-normal uppercase text-right flex-1">
              Exquisite & Timeless
            </div>
          </div>
        </section>

        {/* Section 2: Spirit */}
        <section id="section-spirit" className="sticky top-0 z-30 h-screen w-full flex-shrink-0 overflow-hidden bg-black text-white">
          <div className="absolute inset-0">
            <Image
              src="/image/3S.png"
              alt="Spirit background"
              fill
              sizes="100vw"
              className="object-cover"
            />
          </div>

          <div className="relative mx-auto flex h-full max-w-7xl items-center justify-between gap-6">
            <div className="mt-4 text-2xl font-semibold tracking-normal uppercase md:text-3xl flex-1 text-left">
              SPIRIT
            </div>
            {/* Watch space placeholder - Watch is now fixed above */}
            <div className="relative flex h-full flex-[2] items-center justify-center">
            </div>
            <div className="mt-4 text-xs tracking-normal uppercase text-right flex-1">
              SOPHISTICATED & REFINED
            </div>
          </div>
        </section>

        {/* Section 3: Phantom */}
        <section id="section-phantom" className="sticky top-0 z-40 h-screen w-full flex-shrink-0 overflow-hidden bg-black text-white">
          <div className="absolute inset-0">
            <Image
              src="/image/4.avif"
              alt="Phantom background"
              fill
              sizes="100vw"
              className="object-cover"
            />
          </div>

          <div className="relative mx-auto flex h-full max-w-7xl items-center justify-between gap-6">
            <div className="mt-4 text-2xl font-semibold tracking-normal uppercase md:text-3xl flex-1 text-left">
              PHANTOM
            </div>
            {/* Watch space placeholder - Watch is now fixed above */}
            <div className="relative flex h-full flex-[2] items-center justify-center">
            </div>
            <div className="mt-4 text-xs tracking-normal uppercase text-right flex-1">
              MYSTERIOUS & OPULENT
            </div>
          </div>
        </section>

        {/* Section 4: Royale */}
        <section id="section-royale" className="sticky top-0 z-50 h-screen w-full flex-shrink-0 overflow-hidden bg-black text-white">
          <div className="absolute inset-0">
            <video
              className="h-full w-full object-cover"
              src="/image/5.mp4"
              autoPlay
              loop
              muted
              playsInline
            />
          </div>

          <div className="relative mx-auto flex h-full max-w-7xl items-center justify-between gap-6">
            <div className="mt-4 text-2xl font-semibold tracking-normal uppercase md:text-3xl flex-1 text-left">
              ROYALE
            </div>
            {/* Watch space placeholder - Watch is now fixed above */}
            <div className="relative flex h-full flex-[2] items-center justify-center">
            </div>
            <div className="mt-4 text-xs tracking-normal uppercase text-right flex-1">
              REGAL & MAJESTIC
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
