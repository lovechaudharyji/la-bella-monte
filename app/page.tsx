"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import HeroSection from "../components/sections/HeroSection";
import DaytonaSection from "../components/sections/DaytonaSection";
import SpiritSection from "../components/sections/SpiritSection";
import PhantomSection from "../components/sections/PhantomSection";
import RoyaleSection from "../components/sections/RoyaleSection";
import SignatureCarouselSection from "../components/sections/SignatureCarouselSection";
import FeaturesGridSection from "../components/sections/FeaturesGridSection";
import FeaturedAmbassadorSection from "../components/sections/FeaturedAmbassadorSection";
import InquiryFormSection from "../components/sections/InquiryFormSection";
import FooterSection from "../components/sections/FooterSection";

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
        
        <HeroSection />
        <DaytonaSection />
        <SpiritSection />
        <PhantomSection />
        <RoyaleSection />
        <SignatureCarouselSection />
        <FeaturesGridSection />
        <FeaturedAmbassadorSection />
        <InquiryFormSection />
        <FooterSection />
      </div>
    </div>
  );
}
