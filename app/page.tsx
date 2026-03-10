"use client";

import Image from "next/image";
import Link from "next/link";
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
    const sections = {
      daytona: document.getElementById("section-daytona"),
      spirit: document.getElementById("section-spirit"),
      phantom: document.getElementById("section-phantom"),
      royale: document.getElementById("section-royale"),
    };

    let ticking = false;

    const getVisibility = (el: HTMLElement) => {
      const rect = el.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const v = Math.max(0, Math.min(1, (viewportHeight - rect.top) / viewportHeight));
      return Math.round(v * 100) / 100; // reduce state churn
    };

    const update = () => {
      const d = sections.daytona;
      const s = sections.spirit;
      const p = sections.phantom;
      const r = sections.royale;
      if (!d || !s || !p || !r) {
        ticking = false;
        return;
      }
      const next = {
        daytona: getVisibility(d),
        spirit: getVisibility(s),
        phantom: getVisibility(p),
        royale: getVisibility(r),
      };
      setSectionProgress((prev) => {
        if (
          prev.daytona === next.daytona &&
          prev.spirit === next.spirit &&
          prev.phantom === next.phantom &&
          prev.royale === next.royale
        ) {
          return prev;
        }
        return next;
      });
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Track visibility of each section for the "curtain" effect

  return (
    <div className="relative min-h-screen bg-black text-white">

      {/* Fixed Watch Display - "Curtain Reveal" Effect */}
      <div className="fixed inset-0 z-[60] pointer-events-none">
        {/* Daytona Watch - Revealed by Daytona Section */}
        <div 
          className="absolute inset-0 flex items-center justify-center bg-transparent pointer-events-auto"
          style={{ 
            clipPath: `inset(${100 - (sectionProgress.daytona * 100)}% 0 ${sectionProgress.spirit * 100}% 0)`,
            willChange: "clip-path, transform"
          }}
        >
          <Link href="/watches/daytona" className="relative flex items-center justify-center h-full w-full">
            <Image
              src="/image/daytona.png"
              alt="Daytona Watch"
              width={1200}
              height={1200}
              className="max-h-[85vh] w-auto object-contain transform transition-transform duration-700 scale-[0.9] md:scale-[1.35] translate-y-[10%]"
            />
          </Link>
        </div>

        {/* Spirit Watch - Revealed by Spirit Section */}
        <div 
          className="absolute inset-0 flex items-center justify-center bg-transparent pointer-events-auto"
          style={{ 
            clipPath: `inset(${100 - (sectionProgress.spirit * 100)}% 0 ${sectionProgress.phantom * 100}% 0)`,
            willChange: "clip-path, transform"
          }}
        >
          <Link href="/watches/spirit" className="relative flex items-center justify-center h-full w-full">
            <Image
              src="/image/Spirits.png"
              alt="Spirit Watch"
              width={1400}
              height={1400}
              className="max-h-[90vh] w-auto object-contain transform transition-transform duration-700 scale-[1.05] md:scale-[1.45] translate-y-[5%]"
            />
          </Link>
        </div>

        {/* Phantom Watch - Revealed by Phantom Section */}
        <div 
          className="absolute inset-0 flex items-center justify-center bg-transparent pointer-events-auto"
          style={{ 
            clipPath: `inset(${100 - (sectionProgress.phantom * 100)}% 0 ${sectionProgress.royale * 100}% 0)`,
            willChange: "clip-path, transform"
          }}
        >
          <Link href="/watches/phantom" className="relative flex items-center justify-center h-full w-full">
            <Image
              src="/image/Phantomes.png"
              alt="Phantom Watch"
              width={1200}
              height={1200}
              className="max-h-[85vh] w-auto object-contain transform transition-transform duration-700 scale-[0.9] md:scale-[1.35] translate-y-[10%] -translate-x-[2%] md:-translate-x-[2%]"
            />
          </Link>
        </div>

        {/* Royale Watch - Revealed by Royale Section */}
        <div 
          className="absolute inset-0 flex items-center justify-center bg-transparent pointer-events-auto"
          style={{ 
            clipPath: `inset(${100 - (sectionProgress.royale * 100)}% 0 0 0)`,
            willChange: "clip-path, transform"
          }}
        >
          <Link href="/watches/royale" className="relative flex items-center justify-center h-full w-full">
            <Image
              src="/image/Suprans.png"
              alt="Royale Watch"
              width={1200}
              height={1200}
              className="max-h-[85vh] w-auto object-contain transform transition-transform duration-700 scale-[0.9] md:scale-[1.7] translate-x-[5%] md:-translate-y-[2%]"
            />
          </Link>
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
