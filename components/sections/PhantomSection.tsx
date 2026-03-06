"use client";

import Image from "next/image";
import Link from "next/link";

export default function PhantomSection() {
  return (
    <section id="section-phantom" className="sticky top-0 z-40 h-screen w-full flex-shrink-0 overflow-hidden bg-black text-white">
      <div className="absolute inset-0">
        <Image
          src="/image/4.avif"
          alt="Phantom background"
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>

      <div className="relative mx-auto flex h-full max-w-7xl flex-col md:flex-row items-center justify-between gap-6 pt-32 pb-2 md:py-0">
        <div className="text-4xl font-semibold tracking-normal uppercase md:text-3xl flex-1 text-center md:text-left order-1">
          PHANTOM
        </div>
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
  );
}
