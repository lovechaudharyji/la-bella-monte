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
            className="max-h-[85vh] w-auto object-contain transform transition-transform duration-700 scale-[0.9] md:scale-[1.35] translate-y-[10%]"
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
            className="max-h-[90vh] w-auto object-contain transform transition-transform duration-700 scale-[1.05] md:scale-[1.45] translate-y-[5%]"
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
            className="max-h-[85vh] w-auto object-contain transform transition-transform duration-700 scale-[0.9] md:scale-[1.35] translate-y-[10%] -translate-x-[2%] md:-translate-x-[2%]"
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
            className="max-h-[85vh] w-auto object-contain transform transition-transform duration-700 scale-[0.9] md:scale-[1.7] translate-x-[5%] md:-translate-y-[2%]"
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
              className="object-cover object-right md:object-center"
            />
          </div>

          <div className="relative mx-auto flex h-full max-w-7xl flex-col md:flex-row items-center justify-between gap-6 pt-32 pb-2 md:py-0">
            <div className="text-4xl font-semibold tracking-normal uppercase md:text-3xl flex-1 text-center md:text-left order-1">
              Daytona
            </div>
            {/* Watch space placeholder - Watch is now fixed above */}
            <div className="relative flex h-full flex-[2] items-center justify-center order-2">
              <Link
                href="/checkout?watch=daytona"
                aria-label="Checkout Daytona"
                className="absolute inset-0"
              >
                <span className="sr-only">Checkout Daytona</span>
              </Link>
            </div>
            <div className="text-base md:text-xs font-bold tracking-normal uppercase text-center md:text-right flex-1 order-3 mb-2 md:mb-0 flex flex-col justify-end w-full pb-20 md:pb-0">
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
              className="object-cover object-right md:object-center"
            />
          </div>

          <div className="relative mx-auto flex h-full max-w-7xl flex-col md:flex-row items-center justify-between gap-6 pt-32 pb-2 md:py-0">
            <div className="text-4xl font-semibold tracking-normal uppercase md:text-3xl flex-1 text-center md:text-left order-1">
              SPIRIT
            </div>
            {/* Watch space placeholder - Watch is now fixed above */}
            <div className="relative flex h-full flex-[2] items-center justify-center order-2">
              <Link
                href="/checkout?watch=spirit"
                aria-label="Checkout Spirit"
                className="absolute inset-0"
              >
                <span className="sr-only">Checkout Spirit</span>
              </Link>
            </div>
            <div className="text-base md:text-xs font-bold tracking-normal uppercase text-center md:text-right flex-1 order-3 mb-2 md:mb-0 flex flex-col justify-end w-full pb-20 md:pb-0">
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
              className="object-cover object-right md:object-center"
            />
          </div>

          <div className="relative mx-auto flex h-full max-w-7xl flex-col md:flex-row items-center justify-between gap-6 pt-32 pb-2 md:py-0">
            <div className="text-4xl font-semibold tracking-normal uppercase md:text-3xl flex-1 text-center md:text-left order-1">
              PHANTOM
            </div>
            {/* Watch space placeholder - Watch is now fixed above */}
            <div className="relative flex h-full flex-[2] items-center justify-center order-2">
              <Link
                href="/checkout?watch=phantom"
                aria-label="Checkout Phantom"
                className="absolute inset-0"
              >
                <span className="sr-only">Checkout Phantom</span>
              </Link>
            </div>
            <div className="text-base md:text-xs font-bold tracking-normal uppercase text-center md:text-right flex-1 order-3 mb-2 md:mb-0 flex flex-col justify-end w-full pb-20 md:pb-0">
              MYSTERIOUS & OPULENT
            </div>
          </div>
        </section>

        {/* Section 4: Royale */}
        <section id="section-royale" className="sticky top-0 z-50 h-screen w-full flex-shrink-0 overflow-hidden bg-black text-white">
          <div className="absolute inset-0">
            <video
              className="h-full w-full object-cover object-right md:object-center"
              src="/image/5.mp4"
              autoPlay
              loop
              muted
              playsInline
            />
          </div>

          <div className="relative mx-auto flex h-full max-w-7xl flex-col md:flex-row items-center justify-between gap-6 pt-32 pb-2 md:py-0">
            <div className="text-4xl font-semibold tracking-normal uppercase md:text-3xl flex-1 text-center md:text-left order-1">
              ROYALE
            </div>
            {/* Watch space placeholder - Watch is now fixed above */}
            <div className="relative flex h-full flex-[2] items-center justify-center order-2">
              <Link
                href="/checkout?watch=royale"
                aria-label="Checkout Royale"
                className="absolute inset-0"
              >
                <span className="sr-only">Checkout Royale</span>
              </Link>
            </div>
            <div className="text-base md:text-xs font-bold tracking-normal uppercase text-center md:text-right flex-1 order-3 mb-2 md:mb-0 flex flex-col justify-end w-full pb-20 md:pb-0">
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
                  className="object-contain transition-transform duration-700 scale-[2.00] -translate-y-1 md:-translate-y-6 group-hover:scale-[2.10] group-hover:-translate-y-1 md:group-hover:-translate-y-6"
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

        {/* Product Features Bar */}
        <section className="relative z-[60] w-full bg-white py-24 border-t border-neutral-100">
          <div className="w-full px-4">
            <div className="flex flex-col items-center justify-center gap-3 mb-16">
              <span className="text-xs tracking-widest uppercase text-gray-500">LA BELLA MONTE</span>
              <div className="w-12 h-0.5 bg-red-600"></div>
              <h2 className="text-4xl md:text-5xl font-suave tracking-normal text-black mt-2">FEATURES</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-8 md:gap-4 justify-items-center text-center">
              {[
                {
                  icon: (
                    <svg className="w-12 h-12 stroke-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor"/>
                      <path d="M12 6V12L16 14" stroke="currentColor"/>
                    </svg>
                  ),
                  text: "1 Year Warranty"
                },
                {
                  icon: (
                    <svg className="w-12 h-12 stroke-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor"/>
                      <path d="M2 17L12 22L22 17" stroke="currentColor"/>
                      <path d="M2 12L12 17L22 12" stroke="currentColor"/>
                    </svg>
                  ),
                  text: "Automatic"
                },
                {
                  icon: (
                    <svg className="w-12 h-12 stroke-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor"/>
                      <path d="M8 12C8 12 10 14 12 14C14 14 16 12 16 12" stroke="currentColor"/>
                      <path d="M12 2V6" stroke="currentColor"/>
                    </svg>
                  ),
                  text: "3 ATM Water Resistance"
                },
                {
                  icon: (
                    <svg className="w-12 h-12 stroke-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 3V5" stroke="currentColor"/>
                      <path d="M12 19V21" stroke="currentColor"/>
                      <path d="M21 12H19" stroke="currentColor"/>
                      <path d="M5 12H3" stroke="currentColor"/>
                      <path d="M18.364 5.63604L16.9498 7.05025" stroke="currentColor"/>
                      <path d="M7.05025 16.9497L5.63604 18.364" stroke="currentColor"/>
                      <path d="M18.364 18.364L16.9498 16.9497" stroke="currentColor"/>
                      <path d="M7.05025 7.05025L5.63604 5.63604" stroke="currentColor"/>
                    </svg>
                  ),
                  text: "Glow in Dark"
                },
                {
                  icon: (
                    <svg className="w-12 h-12 stroke-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20 6L9 17L4 12" stroke="currentColor"/>
                    </svg>
                  ),
                  text: "6 Months Replacement"
                },
                {
                  icon: (
                    <svg className="w-12 h-12 stroke-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor"/>
                      <path d="M12 22V12" stroke="currentColor"/>
                      <path d="M22 7V17L12 22" stroke="currentColor"/>
                      <path d="M2 7V17L12 22" stroke="currentColor"/>
                    </svg>
                  ),
                  text: "Stainless Steel"
                },
                {
                  icon: (
                    <svg className="w-12 h-12 stroke-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3 21H21" stroke="currentColor"/>
                      <path d="M5 21V7L13 3L21 7V21" stroke="currentColor"/>
                    </svg>
                  ),
                  text: "Design in Italy"
                }
              ].map((feature, index) => (
                <div key={index} className="flex flex-col items-center gap-4 group">
                  <div className="w-24 h-24 rounded-full bg-neutral-50 flex items-center justify-center text-neutral-800 transition-colors duration-500 group-hover:bg-black group-hover:text-white">
                    {feature.icon}
                  </div>
                  <span className="text-xs uppercase tracking-[0.2em] font-medium text-neutral-600 max-w-[120px]">
                    {feature.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>






        {/* Feature Section: Sahil Khan & Watch */}
        <section className="relative z-[60] w-full bg-gradient-to-b from-white via-gray-400 to-black h-[450px] md:h-[600px] overflow-hidden">
          <div className="w-full h-full grid grid-cols-[65%_35%] md:grid-cols-[55%_45%] gap-0">
            {/* Left Side - Image */}
            <div className="relative w-full h-full overflow-hidden group">
              <Image
                src="/image/sahilkhan.png"
                alt="Featured Ambassador"
                fill
                className="object-contain object-left-bottom md:object-center scale-[1.2] md:scale-[1.15] transition-transform duration-700 group-hover:scale-[1.25] md:group-hover:scale-[1.2]"
              />
            </div>

            {/* Right Side - Watch & Text */}
            <div className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden">
              {/* Featured Label */}
              <div className="z-20 mb-[-10px] text-sm tracking-[0.2em] uppercase text-neutral-300 font-medium hidden md:block">
                Featured
              </div>

              {/* Watch Container */}
              <div className="relative w-full max-w-[320px] sm:max-w-[380px] md:max-w-[500px] aspect-square flex items-center justify-center mt-44 mb-1 md:mt-0 md:-mb-24">
                <Image
                  src="/image/daytona.png"
                  alt="Luxor Daytona"
                  fill
                  className="object-contain scale-[1.65] md:scale-100"
                />
              </div>

              {/* Text Below Watch */}
              <div className="flex flex-col items-center justify-center z-20 text-center">
                 <h3 className="text-xl md:text-5xl font-suave tracking-normal text-white mt-8 md:mt-12 mb-2 md:mb-3">
                  Luxor Daytona
                </h3>
              </div>

              {/* CTA Button */}
              <div className="z-20 mt-3 md:mt-8">
                 <Link 
                  href="/men"
                  className="inline-block border border-white px-5 py-2 text-[10px] md:text-xs tracking-[0.15em] md:tracking-widest uppercase text-white transition-colors hover:bg-white hover:text-black"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Inquiry Form Section */}
        <section className="relative z-[60] w-full bg-white py-20 px-6 md:px-12 lg:px-24">
          <div className="mx-auto max-w-4xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-suave tracking-normal text-black mb-4">
                Make an Inquiry
              </h2>
              <p className="text-neutral-600 font-sans tracking-wide max-w-xl mx-auto">
                Interested in a timepiece? Connect with our concierge for personalized assistance and availability.
              </p>
            </div>
            
            <form className="space-y-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="relative group">
                  <input 
                    type="text" 
                    id="firstName" 
                    className="block w-full bg-transparent border-b border-neutral-300 py-4 text-black focus:outline-none focus:border-black transition-colors peer placeholder-transparent" 
                    placeholder="First Name"
                  />
                  <label 
                    htmlFor="firstName" 
                    className="absolute left-0 -top-3.5 text-xs text-neutral-500 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-neutral-500 peer-placeholder-shown:top-4 peer-focus:-top-3.5 peer-focus:text-xs peer-focus:text-black uppercase tracking-widest"
                  >
                    First Name
                  </label>
                </div>
                
                <div className="relative group">
                  <input 
                    type="text" 
                    id="lastName" 
                    className="block w-full bg-transparent border-b border-neutral-300 py-4 text-black focus:outline-none focus:border-black transition-colors peer placeholder-transparent" 
                    placeholder="Last Name"
                  />
                  <label 
                    htmlFor="lastName" 
                    className="absolute left-0 -top-3.5 text-xs text-neutral-500 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-neutral-500 peer-placeholder-shown:top-4 peer-focus:-top-3.5 peer-focus:text-xs peer-focus:text-black uppercase tracking-widest"
                  >
                    Last Name
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="relative group">
                  <input 
                    type="email" 
                    id="email" 
                    className="block w-full bg-transparent border-b border-neutral-300 py-4 text-black focus:outline-none focus:border-black transition-colors peer placeholder-transparent" 
                    placeholder="Email Address"
                  />
                  <label 
                    htmlFor="email" 
                    className="absolute left-0 -top-3.5 text-xs text-neutral-500 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-neutral-500 peer-placeholder-shown:top-4 peer-focus:-top-3.5 peer-focus:text-xs peer-focus:text-black uppercase tracking-widest"
                  >
                    Email Address
                  </label>
                </div>
                
                <div className="relative group">
                  <input 
                    type="tel" 
                    id="phone" 
                    className="block w-full bg-transparent border-b border-neutral-300 py-4 text-black focus:outline-none focus:border-black transition-colors peer placeholder-transparent" 
                    placeholder="Phone Number"
                  />
                  <label 
                    htmlFor="phone" 
                    className="absolute left-0 -top-3.5 text-xs text-neutral-500 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-neutral-500 peer-placeholder-shown:top-4 peer-focus:-top-3.5 peer-focus:text-xs peer-focus:text-black uppercase tracking-widest"
                  >
                    Phone Number
                  </label>
                </div>
              </div>

              <div className="relative group">
                <textarea 
                  id="message" 
                  rows={4}
                  className="block w-full bg-transparent border-b border-neutral-300 py-4 text-black focus:outline-none focus:border-black transition-colors peer placeholder-transparent resize-none" 
                  placeholder="Your Message"
                ></textarea>
                <label 
                  htmlFor="message" 
                  className="absolute left-0 -top-3.5 text-xs text-neutral-500 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-neutral-500 peer-placeholder-shown:top-4 peer-focus:-top-3.5 peer-focus:text-xs peer-focus:text-black uppercase tracking-widest"
                >
                  Your Message (Optional)
                </label>
              </div>

              <div className="flex justify-center pt-8">
                <button 
                  type="submit"
                  className="inline-block border border-black px-12 py-4 text-xs tracking-[0.2em] uppercase text-black transition-all hover:bg-black hover:text-white focus:outline-none focus:ring-1 focus:ring-black focus:ring-offset-2 focus:ring-offset-white"
                >
                  Submit Inquiry
                </button>
              </div>
            </form>
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
