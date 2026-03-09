"use client";

import Link from "next/link";

export default function MenHeroSection() {
  return (
    <section className="relative z-[50] h-[90vh] min-h-[640px] w-full overflow-hidden bg-black text-white">
      <div className="absolute inset-0">
        <video
          className="h-full w-full object-cover"
          src="/image/Mens1.mp4"
          autoPlay
          loop
          muted
          playsInline
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/40 to-black/90" />
      </div>

      <div className="relative mx-auto flex h-full max-w-7xl flex-col justify-end px-6 md:px-20 pb-28 md:pb-36">
        <div className="max-w-3xl">
          <div className="mb-4 text-xs tracking-[0.15em] uppercase text-white/60">
            Home <span className="mx-2">/</span> Collections <span className="mx-2">/</span> <span className="text-white">Men</span>
          </div>
          <div className="text-[11px] md:text-xs tracking-[0.2em] uppercase text-orange-500">
            The Men's Collection
          </div>
          <h1 className="mt-4 text-6xl md:text-8xl leading-[1.05] font-suave tracking-normal">
            <span className="text-white">Crafted for</span>
            <br />
            <span className="text-orange-500">Distinction</span>
          </h1>
          <p className="mt-6 text-sm md:text-base text-white/70 leading-relaxed max-w-2xl">
            Discover timepieces where Swiss heritage meets contemporary vision.
            Each watch is an expression of mastery, precision, and individual style.
          </p>

          <div className="mt-10 flex items-center gap-4">
            <Link
              href="#men-collection"
              className="h-12 inline-flex items-center justify-center bg-orange-500 text-black px-6 text-xs tracking-[0.2em] uppercase font-medium hover:bg-orange-400 transition-colors"
            >
              Explore Collection
            </Link>
            <Link
              href="/watches/royale"
              className="h-12 inline-flex items-center justify-center border border-white/30 px-6 text-xs tracking-[0.2em] uppercase text-white hover:bg-white hover:text-black transition-colors"
            >
              Featured Piece
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
