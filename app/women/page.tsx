import React from "react";
import Link from "next/link";

export default function WomenPage() {
  return (
    <div className="relative min-h-screen bg-black text-white flex flex-col items-center justify-center">
      <div className="text-center px-4">
        <h1 className="text-4xl md:text-6xl font-suave tracking-widest uppercase mb-6">
          Coming Soon
        </h1>
        <div className="w-20 h-0.5 bg-red-600 mx-auto mb-8"></div>
        <p className="text-sm md:text-base text-neutral-400 font-sans tracking-wide max-w-md mx-auto mb-12">
          We are crafting an exquisite collection of timepieces for women. Stay tuned for the unveiling of elegance.
        </p>
        <Link 
          href="/"
          className="inline-block border border-white px-8 py-3 text-xs tracking-[0.2em] uppercase text-white transition-all hover:bg-white hover:text-black"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
