"use client";

import Image from "next/image";
import Link from "next/link";

export default function SignatureCarouselSection() {
  return (
    <section className="relative z-[60] w-full bg-white py-24 text-black">
      <div className="max-w-4xl mx-auto text-center mb-20 px-6">
        <div className="flex flex-col items-center justify-center gap-3 mb-4">
          <span className="text-xs tracking-widest uppercase text-gray-500">LA BELLA MONTE Watches</span>
          <div className="w-12 h-0.5 bg-red-600"></div>
        </div>
        <h2 className="text-4xl md:text-5xl font-suave tracking-normal mb-6 text-black">OUR SIGNATURE</h2>
        <p className="text-gray-500 text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
          At LA BELLA MONTE, luxury is more than a purchase—it&apos;s a lifestyle. Become a part of our exclusive
          community of collectors and enthusiasts who value the art of horology. Experience the finest in
          high-end watches, delivered with unmatched service and attention to detail.
        </p>
      </div>

      <div className="w-full flex overflow-x-auto snap-x snap-mandatory sm:grid sm:grid-cols-2 lg:grid-cols-5 gap-0 no-scrollbar">
        <Link href="/watches/spirit" className="min-w-[50%] flex-shrink-0 snap-center sm:min-w-0 flex flex-col items-center gap-6 group">
          <div className="relative w-full aspect-[3/4] overflow-hidden">
            <Image
              src="/image/Spirits.png"
              alt="LBM Velaris"
              fill
              className="object-contain transition-transform duration-700 scale-[1.75] translate-y-5 group-hover:scale-[1.85] group-hover:translate-y-5"
            />
          </div>
          <div className="flex flex-col items-center gap-3">
            <div className="w-8 h-0.5 bg-red-600"></div>
            <span className="text-sm font-semibold tracking-widest uppercase text-black">LBM Velaris</span>
          </div>
        </Link>

        <Link href="/watches/daytona" className="min-w-[50%] flex-shrink-0 snap-center sm:min-w-0 flex flex-col items-center gap-6 group">
          <div className="relative w-full aspect-[3/4] overflow-hidden">
            <Image
              src="/image/daytona.png"
              alt="LBM Obsidian Moon"
              fill
              className="object-contain transition-transform duration-700 scale-[1.55] translate-y-10 group-hover:scale-[1.65] group-hover:translate-y-10"
            />
          </div>
          <div className="flex flex-col items-center gap-3">
            <div className="w-8 h-0.5 bg-red-600"></div>
            <span className="text-sm font-semibold tracking-widest uppercase text-black">LBM Obsidian Moon</span>
          </div>
        </Link>

        <Link href="/watches/royale" className="min-w-[50%] flex-shrink-0 snap-center sm:min-w-0 flex flex-col items-center gap-6 group">
          <div className="relative w-full aspect-[3/4] overflow-hidden">
            <Image
              src="/image/Suprans.png"
              alt="LBM Solar Monarch – Gold"
              fill
              className="object-contain transition-transform duration-700 scale-[2.00] -translate-y-1 md:-translate-y-6 group-hover:scale-[2.10] group-hover:-translate-y-1 md:group-hover:-translate-y-6"
            />
          </div>
          <div className="flex flex-col items-center gap-3">
            <div className="w-8 h-0.5 bg-red-600"></div>
            <span className="text-sm font-semibold tracking-widest uppercase text-black">LBM Solar Monarch – Gold</span>
          </div>
        </Link>

        <Link href="/watches/phantom" className="min-w-[50%] flex-shrink-0 snap-center sm:min-w-0 flex flex-col items-center gap-6 group">
          <div className="relative w-full aspect-[3/4] overflow-hidden">
            <Image
              src="/image/Phantomes.png"
              alt="LBM Etna Rosso"
              fill
              className="object-contain transition-transform duration-700 scale-[1.55] translate-y-10 group-hover:scale-[1.65] group-hover:translate-y-10"
            />
          </div>
          <div className="flex flex-col items-center gap-3">
            <div className="w-8 h-0.5 bg-red-600"></div>
            <span className="text-sm font-semibold tracking-widest uppercase text-black">LBM Etna Rosso</span>
          </div>
        </Link>

        <Link href="/watches/yellow" className="min-w-[50%] flex-shrink-0 snap-center sm:min-w-0 flex flex-col items-center gap-6 group">
          <div className="relative w-full aspect-[3/4] overflow-hidden">
            <Image
              src="/image/Yellow.png"
              alt="LBM Sole Edition"
              fill
              className="object-contain transition-transform duration-700 scale-[1.55] translate-y-10 group-hover:scale-[1.65] group-hover:translate-y-10"
            />
          </div>
          <div className="flex flex-col items-center gap-3">
            <div className="w-8 h-0.5 bg-red-600"></div>
            <span className="text-sm font-semibold tracking-widest uppercase text-black">LBM Sole Edition</span>
          </div>
        </Link>
      </div>
    </section>
  );
}
