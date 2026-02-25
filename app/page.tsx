"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Search, ShoppingCart } from "lucide-react";

export default function Home() {
  const scrollAreaRef = useRef<HTMLDivElement | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const el = scrollAreaRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const height = el.offsetHeight;
      const viewportHeight = window.innerHeight || 1;
      const maxDistance = height - viewportHeight;

      if (maxDistance <= 0) {
        setScrollProgress(0);
        return;
      }

      const distance = Math.min(Math.max(-rect.top, 0), maxDistance);
      const animationDistance = maxDistance;
      const progress =
        animationDistance > 0
          ? Math.min(distance / animationDistance, 1)
          : 0;
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const progress = Math.min(Math.max(scrollProgress, 0), 1);
  const t1 = Math.min(progress * 4, 1);
  const t2 = Math.min(Math.max((progress - 0.25) * 4, 0), 1);
  const t3 = Math.min(Math.max((progress - 0.5) * 4, 0), 1);
  const t4 = Math.max((progress - 0.75) * 4, 0);

  const heroBackgroundOffset = t1 * -40;
  const heroTextOffset = t1 * -40;
  const heroTextOpacity = 1 - Math.min(t1 / 0.7, 1);
  
  const daytonaTranslateY = (1 - t1) * 200;
  const daytonaOpacity =
    t1 <= 0.3 ? 0 : t1 >= 0.8 ? 1 : (t1 - 0.3) / (0.8 - 0.3);

  const spiritTranslateY = (1 - t2) * 200;
  const spiritOpacity =
    t2 <= 0.2 ? 0 : t2 >= 0.6 ? 1 : (t2 - 0.2) / (0.6 - 0.2);

  const phantomTranslateY = (1 - t3) * 200;
  const phantomOpacity =
    t3 <= 0.2 ? 0 : t3 >= 0.6 ? 1 : (t3 - 0.2) / (0.6 - 0.2);

  const royaleTranslateY = (1 - t4) * 200;
  const royaleOpacity =
    t4 <= 0.2 ? 0 : t4 >= 0.6 ? 1 : (t4 - 0.2) / (0.6 - 0.2);

  return (
    <div className="relative min-h-screen bg-black text-white">
      <header className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between px-10 py-2 bg-black/30 backdrop-blur-md border-b border-white/10">
        <div className="text-3xl font-suave font-normal tracking-normal uppercase">
          LUXOR
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

      <div className="relative flex flex-col">
        <section className="sticky top-0 z-20 h-screen overflow-hidden flex-shrink-0">
          <div className="absolute inset-0">
            <video
              className="h-full w-full object-cover"
              src="/image/1.mp4"
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

        <section className="sticky top-0 z-20 flex h-screen flex-col justify-center overflow-hidden bg-black px-8 pb-24 pt-20 md:px-12 lg:px-20 flex-shrink-0">
          <div className="pointer-events-none absolute inset-0 -z-10 opacity-90">
            <Image
              src="/image/2.webp"
              alt="Daytona background"
              fill
              sizes="100vw"
              className="object-cover"
            />
          </div>

          <div className="relative mx-auto flex max-w-6xl items-center justify-between gap-6">
            <div className="text-2xl font-semibold tracking-normal uppercase md:text-3xl flex-1 text-left">
              Daytona
            </div>
            <div className="relative flex flex-[2] justify-center">
              <Image
                src="/image/2.png"
                alt="Daytona watch"
                width={1000}
                height={600}
                className="max-h-[600px] w-auto object-contain scale-125"
              />
            </div>
            <div className="text-xs tracking-normal uppercase text-right flex-1">
              Exquisite & Timeless
            </div>
          </div>
        </section>

        <section className="sticky top-0 z-20 flex h-screen flex-col justify-center overflow-hidden bg-black px-8 pb-24 pt-20 md:px-12 lg:px-20 flex-shrink-0">
          <div className="pointer-events-none absolute inset-0 -z-10 opacity-90">
            <Image
              src="/image/3.avif"
              alt="Spirit background"
              fill
              sizes="100vw"
              className="object-cover"
            />
          </div>

          <div className="relative mx-auto flex max-w-6xl items-center justify-between gap-6">
            <div className="mt-4 text-2xl font-semibold tracking-normal uppercase md:text-3xl flex-1 text-left">
              SPIRIT
            </div>
            <div className="relative flex flex-[2] justify-center">
              <Image
                src="/image/3.png"
                alt="Spirit watch"
                width={1400}
                height={1000}
                className="max-h-[1000px] w-auto object-contain scale-175"
              />
            </div>
            <div className="mt-4 text-xs tracking-normal uppercase text-right flex-1">
              SOPHISTICATED & REFINED
            </div>
          </div>
        </section>

        <section className="sticky top-0 z-20 flex h-screen flex-col justify-center overflow-hidden bg-black px-8 pb-24 pt-20 md:px-12 lg:px-20 flex-shrink-0">
          <div className="pointer-events-none absolute inset-0 -z-10 opacity-90">
            <Image
              src="/image/4.avif"
              alt="Phantom background"
              fill
              sizes="100vw"
              className="object-cover"
            />
          </div>

          <div className="relative mx-auto flex max-w-6xl items-center justify-between gap-6">
            <div className="mt-4 text-2xl font-semibold tracking-normal uppercase md:text-3xl flex-1 text-left">
              PHANTOM
            </div>
            <div className="relative flex flex-[2] justify-center">
              <Image
                src="/image/4.png"
                alt="Phantom watch"
                width={1100}
                height={700}
                className="max-h-[700px] w-auto object-contain scale-140"
              />
            </div>
            <div className="mt-4 text-xs tracking-normal uppercase text-right flex-1">
              MYSTERIOUS & OPULENT
            </div>
          </div>
        </section>

        <section className="sticky top-0 z-20 flex h-screen flex-col justify-center overflow-hidden bg-black px-8 pb-24 pt-20 md:px-12 lg:px-20 flex-shrink-0">
          <div className="pointer-events-none absolute inset-0 -z-10 opacity-90">
            <video
              className="h-full w-full object-cover"
              src="/image/5.mp4"
              autoPlay
              loop
              muted
              playsInline
            />
          </div>

          <div className="relative mx-auto flex max-w-6xl items-center justify-between gap-6">
            <div className="mt-4 text-2xl font-semibold tracking-normal uppercase md:text-3xl flex-1 text-left">
              ROYALE
            </div>
            <div className="relative flex flex-[2] justify-center">
              <Image
                src="/image/5 (2).png"
                alt="Royale watch"
                width={1100}
                height={700}
                className="max-h-[700px] w-auto object-contain scale-140"
              />
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
