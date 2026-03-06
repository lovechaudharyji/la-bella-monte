"use client";

import Image from "next/image";
import Link from "next/link";

export default function FeaturedAmbassadorSection() {
  return (
    <section className="relative z-[60] w-full bg-gradient-to-b from-white via-gray-400 to-black h-[450px] md:h-[600px] overflow-hidden">
      <div className="w-full h-full grid grid-cols-[65%_35%] md:grid-cols-[55%_45%] gap-0">
        <div className="relative w-full h-full overflow-hidden group">
          <Image
            src="/image/sahilkhan.png"
            alt="Featured Ambassador"
            fill
            className="object-contain object-left-bottom md:object-center scale-[1.2] md:scale-[1.15] transition-transform duration-700 group-hover:scale-[1.25] md:group-hover:scale-[1.2]"
          />
        </div>

        <div className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden">
          <div className="z-20 mb-[-10px] text-sm tracking-[0.2em] uppercase text-neutral-300 font-medium hidden md:block">
            Featured
          </div>

          <div className="relative w-full max-w-[320px] sm:max-w-[380px] md:max-w-[500px] aspect-square flex items-center justify-center mt-44 mb-1 md:mt-0 md:-mb-24">
            <Image
              src="/image/daytona.png"
              alt="Luxor Daytona"
              fill
              className="object-contain scale-[1.65] md:scale-100"
            />
          </div>

          <div className="flex flex-col items-center justify-center z-20 text-center">
            <h3 className="text-xl md:text-5xl font-suave tracking-normal text-white mt-8 md:mt-12 mb-2 md:mb-3">
              Luxor Daytona
            </h3>
          </div>

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
  );
}
