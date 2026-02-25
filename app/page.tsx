"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

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
      <header className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between border-b border-white/15 bg-gradient-to-b from-black/10 via-[#b6721f]/40 to-black/10 px-10 py-5 shadow-[0_10px_30px_rgba(0,0,0,0.6)] backdrop-blur-xl">
        <div className="text-2xl font-semibold tracking-[0.6em] uppercase">
          LUXOR
        </div>
        <nav className="hidden items-center gap-10 text-sm tracking-[0.4em] uppercase md:flex">
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
          <button className="text-lg drop-shadow">
            🔍
          </button>
          <div className="relative">
            <button className="text-lg drop-shadow">
              🛒
            </button>
            <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-[10px] font-semibold">
              0
            </span>
          </div>
        </div>
      </header>

      <div ref={scrollAreaRef} className="relative flex flex-col">
        <section className="relative z-20 h-screen overflow-hidden flex-shrink-0">
          <div
            className="absolute inset-0 will-change-transform"
            style={{
              transform: `translateY(${heroBackgroundOffset}px)`,
              transition:
                "transform 700ms cubic-bezier(0.22, 0.61, 0.36, 1)",
            }}
          >
            <video
              className="h-full w-full object-cover"
              src="/image/1.mp4"
              autoPlay
              loop
              muted
              playsInline
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/40 via-black/40 to-black/90" />
          </div>

          <div
            className="relative z-10 flex h-[calc(100vh-80px)] flex-col items-center justify-center px-4 text-center will-change-transform"
            style={{
              transform: `translateY(${heroTextOffset}px)`,
              opacity: heroTextOpacity,
              transition:
                "transform 700ms cubic-bezier(0.22, 0.61, 0.36, 1), opacity 700ms cubic-bezier(0.22, 0.61, 0.36, 1)",
            }}
          >
            <div className="mb-3 text-xs tracking-[0.4em] uppercase text-zinc-200">
              Luxor Watches
            </div>
            <div className="mb-6 h-[2px] w-16 bg-red-600" />
            <h1 className="text-4xl font-semibold tracking-[0.35em] uppercase md:text-6xl">
              Luxury Of Time
            </h1>
          </div>
        </section>

        <section
          className="relative z-20 flex h-screen flex-col justify-center overflow-hidden bg-black px-8 pb-24 pt-20 md:px-12 lg:px-20 flex-shrink-0"
          style={{
            transform: `translateY(${daytonaTranslateY}px)`,
            opacity: daytonaOpacity,
            transition:
              "transform 700ms cubic-bezier(0.22, 0.61, 0.36, 1), opacity 700ms cubic-bezier(0.22, 0.61, 0.36, 1)",
          }}
        >
          <div className="pointer-events-none absolute inset-0 -z-10 opacity-90">
            <Image
              src="/image/2.webp"
              alt="Daytona background"
              fill
              sizes="100vw"
              className="object-cover"
            />
          </div>

          <div className="relative mx-auto flex max-w-6xl items-start justify-between gap-6">
            <div className="mt-4 text-2xl font-semibold tracking-[0.35em] uppercase md:text-3xl">
              Daytona
            </div>
            <div className="relative flex flex-1 justify-center">
              <Image
                src="/image/2.png"
                alt="Daytona watch"
                width={800}
                height={480}
                className="max-h-[480px] w-auto object-contain"
              />
            </div>
            <div className="mt-4 text-xs tracking-[0.35em] uppercase text-right">
              Exquisite & Timeless
            </div>
          </div>
        </section>

        <section
          className="relative z-20 flex h-screen flex-col justify-center overflow-hidden bg-black px-8 pb-24 pt-20 md:px-12 lg:px-20 flex-shrink-0"
          style={{
            transform: `translateY(${spiritTranslateY}px)`,
            opacity: spiritOpacity,
            transition:
              "transform 700ms cubic-bezier(0.22, 0.61, 0.36, 1), opacity 700ms cubic-bezier(0.22, 0.61, 0.36, 1)",
          }}
        >
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
            <div className="mt-4 text-2xl font-semibold tracking-[0.35em] uppercase md:text-3xl flex-1 text-left">
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
            <div className="mt-4 text-xs tracking-[0.35em] uppercase text-right flex-1">
              SOPHISTICATED & REFINED
            </div>
          </div>
        </section>

        <section
          className="relative z-20 flex h-screen flex-col justify-center overflow-hidden bg-black px-8 pb-24 pt-20 md:px-12 lg:px-20 flex-shrink-0"
          style={{
            transform: `translateY(${phantomTranslateY}px)`,
            opacity: phantomOpacity,
            transition:
              "transform 700ms cubic-bezier(0.22, 0.61, 0.36, 1), opacity 700ms cubic-bezier(0.22, 0.61, 0.36, 1)",
          }}
        >
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
            <div className="mt-4 text-2xl font-semibold tracking-[0.35em] uppercase md:text-3xl flex-1 text-left">
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
            <div className="mt-4 text-xs tracking-[0.35em] uppercase text-right flex-1">
              MYSTERIOUS & OPULENT
            </div>
          </div>
        </section>

        <section
          className="relative z-20 flex h-screen flex-col justify-center overflow-hidden bg-black px-8 pb-24 pt-20 md:px-12 lg:px-20 flex-shrink-0"
          style={{
            transform: `translateY(${royaleTranslateY}px)`,
            opacity: royaleOpacity,
            transition:
              "transform 700ms cubic-bezier(0.22, 0.61, 0.36, 1), opacity 700ms cubic-bezier(0.22, 0.61, 0.36, 1)",
          }}
        >
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
            <div className="mt-4 text-2xl font-semibold tracking-[0.35em] uppercase md:text-3xl flex-1 text-left">
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
            <div className="mt-4 text-xs tracking-[0.35em] uppercase text-right flex-1">
              REGAL & MAJESTIC
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
