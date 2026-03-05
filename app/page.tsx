"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

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
              <Link
                href="/checkout?watch=daytona"
                aria-label="Checkout Daytona"
                className="absolute inset-0"
              >
                <span className="sr-only">Checkout Daytona</span>
              </Link>
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
              <Link
                href="/checkout?watch=spirit"
                aria-label="Checkout Spirit"
                className="absolute inset-0"
              >
                <span className="sr-only">Checkout Spirit</span>
              </Link>
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
              <Link
                href="/checkout?watch=phantom"
                aria-label="Checkout Phantom"
                className="absolute inset-0"
              >
                <span className="sr-only">Checkout Phantom</span>
              </Link>
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
              <Link
                href="/checkout?watch=royale"
                aria-label="Checkout Royale"
                className="absolute inset-0"
              >
                <span className="sr-only">Checkout Royale</span>
              </Link>
            </div>
            <div className="mt-4 text-xs tracking-normal uppercase text-right flex-1">
              REGAL & MAJESTIC
            </div>
          </div>
        </section>

        <section className="relative z-[60] w-full bg-white py-24 text-black">
          <div className="max-w-4xl mx-auto text-center mb-20 px-6">
            <div className="flex flex-col items-center justify-center gap-3 mb-4">
              <span className="text-xs tracking-widest uppercase text-gray-500">Luxor Watches</span>
              <div className="w-12 h-0.5 bg-red-600"></div>
            </div>
            <h2 className="text-4xl md:text-5xl font-suave tracking-normal mb-6 text-black">OUR SIGNATURE</h2>
            <p className="text-gray-500 text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
              At LUXOR, luxury is more than a purchase—it&apos;s a lifestyle. Become a part of our exclusive
              community of collectors and enthusiasts who value the art of horology. Experience the finest in
              high-end watches, delivered with unmatched service and attention to detail.
            </p>
          </div>

          <div className="w-full flex overflow-x-auto snap-x snap-mandatory sm:grid sm:grid-cols-2 lg:grid-cols-5 gap-0 no-scrollbar">
            {/* Watch 1: Spirit */}
            <Link href="/checkout?watch=spirit" className="min-w-[50%] flex-shrink-0 snap-center sm:min-w-0 flex flex-col items-center gap-6 group">
              <div className="relative w-full aspect-[3/4] overflow-hidden">
                <Image
                  src="/image/Spirits.png"
                  alt="Luxor Spirit"
                  fill
                  className="object-contain transition-transform duration-700 scale-[1.75] translate-y-5 group-hover:scale-[1.85] group-hover:translate-y-5"
                />
              </div>
              <div className="flex flex-col items-center gap-3">
                <div className="w-8 h-0.5 bg-red-600"></div>
                <span className="text-sm font-semibold tracking-widest uppercase text-black">Luxor Spirit</span>
              </div>
            </Link>

            {/* Watch 2: Daytona */}
            <Link href="/checkout?watch=daytona" className="min-w-[50%] flex-shrink-0 snap-center sm:min-w-0 flex flex-col items-center gap-6 group">
              <div className="relative w-full aspect-[3/4] overflow-hidden">
                <Image
                  src="/image/daytona.png"
                  alt="Luxor Daytona"
                  fill
                  className="object-contain transition-transform duration-700 scale-[1.55] translate-y-10 group-hover:scale-[1.65] group-hover:translate-y-10"
                />
              </div>
              <div className="flex flex-col items-center gap-3">
                <div className="w-8 h-0.5 bg-red-600"></div>
                <span className="text-sm font-semibold tracking-widest uppercase text-black">Luxor Daytona</span>
              </div>
            </Link>

            {/* Watch 3: Royale */}
            <Link href="/checkout?watch=royale" className="min-w-[50%] flex-shrink-0 snap-center sm:min-w-0 flex flex-col items-center gap-6 group">
              <div className="relative w-full aspect-[3/4] overflow-hidden">
                <Image
                  src="/image/Suprans.png"
                  alt="Luxor Royale"
                  fill
                  className="object-contain transition-transform duration-700 scale-[2.00] -translate-y-6 group-hover:scale-[2.10] group-hover:-translate-y-6"
                />
              </div>
              <div className="flex flex-col items-center gap-3">
                <div className="w-8 h-0.5 bg-red-600"></div>
                <span className="text-sm font-semibold tracking-widest uppercase text-black">Luxor Royale</span>
              </div>
            </Link>

            {/* Watch 4: Phantom */}
            <Link href="/checkout?watch=phantom" className="min-w-[50%] flex-shrink-0 snap-center sm:min-w-0 flex flex-col items-center gap-6 group">
              <div className="relative w-full aspect-[3/4] overflow-hidden">
                <Image
                  src="/image/Phantomes.png"
                  alt="Luxor Phantom"
                  fill
                  className="object-contain transition-transform duration-700 scale-[1.55] translate-y-10 group-hover:scale-[1.65] group-hover:translate-y-10"
                />
              </div>
              <div className="flex flex-col items-center gap-3">
                <div className="w-8 h-0.5 bg-red-600"></div>
                <span className="text-sm font-semibold tracking-widest uppercase text-black">Luxor Phantom</span>
              </div>
            </Link>

            {/* Watch 5: Yellow */}
            <Link href="/checkout?watch=yellow" className="min-w-[50%] flex-shrink-0 snap-center sm:min-w-0 flex flex-col items-center gap-6 group">
              <div className="relative w-full aspect-[3/4] overflow-hidden">
                <Image
                  src="/image/Yellow.png"
                  alt="Luxor Yellow"
                  fill
                  className="object-contain transition-transform duration-700 scale-[1.55] translate-y-10 group-hover:scale-[1.65] group-hover:translate-y-10"
                />
              </div>
              <div className="flex flex-col items-center gap-3">
                <div className="w-8 h-0.5 bg-red-600"></div>
                <span className="text-sm font-semibold tracking-widest uppercase text-black">Luxor Yellow</span>
              </div>
            </Link>
          </div>
        </section>



        <section className="relative z-[60] w-full bg-white px-6 md:px-10 py-16 md:py-24 text-black">
          <div className="mx-auto max-w-7xl">
            <div className="flex items-center gap-6 mb-10 md:mb-14">
              <div className="h-px flex-1 bg-neutral-200"></div>
              <div className="text-xs md:text-sm uppercase tracking-normal text-neutral-500">
                Explore Collections
              </div>
              <div className="h-px flex-1 bg-neutral-200"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              <Link href="/men" className="group relative h-[420px] md:h-[520px] rounded-xl overflow-hidden">
                <video
                  className="absolute inset-0 h-full w-full object-cover"
                  src="/image/hero2.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                />
                <div className="absolute inset-0 bg-black/30 transition-colors group-hover:bg-black/40"></div>
                <div className="absolute inset-0 flex items-end p-8">
                  <div>
                    <h3 className="text-2xl md:text-3xl font-suave tracking-normal text-white">Men Collection</h3>
                    <div className="mt-2 inline-flex items-center gap-2 text-white">
                      <span className="text-sm tracking-normal">Shop Now</span>
                      <span aria-hidden>→</span>
                    </div>
                  </div>
                </div>
              </Link>

              <Link href="/women" className="group relative h-[420px] md:h-[520px] rounded-xl overflow-hidden">
                <Image
                  src="/image/Women.png"
                  alt="Women Watches"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/20 transition-colors group-hover:bg-black/30"></div>
                <div className="absolute inset-0 flex items-end p-8">
                  <div>
                    <h3 className="text-2xl md:text-3xl font-suave tracking-normal text-white">Women Collection</h3>
                    <div className="mt-2 inline-flex items-center gap-2 text-white">
                      <span className="text-sm tracking-normal">Shop Now</span>
                      <span aria-hidden>→</span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </section>




        {/* Feature Section: Sahil Khan & Watch */}
        <section className="relative z-[60] w-full bg-gradient-to-b from-white via-gray-400 to-black h-[450px] md:h-[600px] overflow-hidden">
          <div className="w-full h-full grid grid-cols-1 md:grid-cols-[65%_35%] gap-0">
            {/* Left Side - Image */}
            <div className="relative w-full h-full overflow-hidden group">
              <Image
                src="/image/sahilkhan.png"
                alt="Featured Ambassador"
                fill
                className="object-contain object-bottom scale-[1.15] transition-transform duration-700 group-hover:scale-[1.2]"
              />
            </div>

            {/* Right Side - Watch & Text */}
            <div className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden">
              {/* Featured Label */}
              <div className="z-20 mb-[-10px] text-sm tracking-[0.2em] uppercase text-neutral-300 font-medium">
                Featured
              </div>

              {/* Watch Container */}
              <div className="relative w-full max-w-[500px] aspect-square flex items-center justify-center -mb-24">
                <Image
                  src="/image/daytona.png"
                  alt="Luxor Daytona"
                  fill
                  className="object-contain scale-100"
                />
              </div>

              {/* Text Below Watch */}
              <div className="flex flex-col items-center justify-center z-20 text-center">
                 <h3 className="text-3xl md:text-5xl font-suave tracking-normal text-white mt-12 mb-3">
                  Luxor Daytona
                </h3>
              </div>

              {/* CTA Button */}
              <div className="z-20">
                 <Link 
                  href="/checkout?watch=daytona"
                  className="inline-block border border-white px-8 py-3 text-xs tracking-widest uppercase text-white transition-colors hover:bg-white hover:text-black"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="relative z-[60] w-full bg-black px-10 py-20 text-white">
          <div className="mx-auto flex max-w-7xl flex-col gap-10 md:flex-row md:justify-between">
            <div className="flex flex-col gap-4">
              <div className="text-4xl font-suave font-normal tracking-normal uppercase">
                LA BELLA MONTE
              </div>
              <p className="max-w-xs text-sm text-neutral-400 font-sans tracking-wide">
                Elevating timekeeping to an art form. Swiss precision meets Italian elegance.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-20">
              <div className="flex flex-col gap-4">
                <h3 className="text-xs font-semibold uppercase tracking-widest text-neutral-500">
                  Collections
                </h3>
                <ul className="flex flex-col gap-2 text-sm font-light tracking-wide text-neutral-300">
                  <li><a href="#" className="hover:text-white transition-colors">Daytona</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Spirit</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Phantom</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Royale</a></li>
                </ul>
              </div>
              
              <div className="flex flex-col gap-4">
                <h3 className="text-xs font-semibold uppercase tracking-widest text-neutral-500">
                  Legal
                </h3>
                <ul className="flex flex-col gap-2 text-sm font-light tracking-wide text-neutral-300">
                  <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="mx-auto mt-20 flex max-w-7xl flex-col items-center justify-between gap-4 border-t border-white/10 pt-10 text-xs font-light tracking-wider text-neutral-500 md:flex-row">
            <p>&copy; {new Date().getFullYear()} LA BELLA MONTE. All rights reserved.</p>
            <div className="flex gap-6 uppercase tracking-widest">
              <a href="#" className="hover:text-white transition-colors">Instagram</a>
              <a href="#" className="hover:text-white transition-colors">Twitter</a>
              <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
