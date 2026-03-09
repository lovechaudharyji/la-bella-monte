"use client";

import Link from "next/link";

export default function RoyaleSection() {
  return (
    <section id="section-royale" className="sticky top-0 z-50 h-screen w-full flex-shrink-0 overflow-hidden bg-black text-white">
      <div className="absolute inset-0">
        <video
          className="h-full w-full object-cover object-center"
          src="/image/orange1.mp4"
          autoPlay
          loop
          muted
          playsInline
        />
      </div>

      <div className="relative mx-auto flex h-full max-w-7xl flex-col md:flex-row items-center justify-between gap-6 pt-32 pb-2 md:py-0">
        <div className="text-4xl font-semibold tracking-normal uppercase md:text-3xl flex-1 text-center md:text-left order-1">
          LBM Solar Monarch – Gold
        </div>
        <div className="relative flex h-full flex-[2] items-center justify-center order-2">
          <Link
            href="/watches/royale"
            aria-label="View Royale Details"
            className="absolute inset-0"
          >
            <span className="sr-only">View Royale Details</span>
          </Link>
        </div>
        <div className="text-base md:text-xs font-bold tracking-normal uppercase text-center md:text-right flex-1 order-3 mb-2 md:mb-0 flex flex-col justify-end w-full pb-20 md:pb-0">
          REGAL & MAJESTIC
        </div>
      </div>
    </section>
  );
}
