import React from "react";

export default function WomenPage() {
  return (
    <div className="relative min-h-screen bg-black text-white flex flex-col items-center justify-center pt-20">
      <h1 className="text-4xl font-suave tracking-wide uppercase">
        Women's Collection
      </h1>
      <p className="mt-4 text-sm text-neutral-400 font-sans tracking-wide">
        Elegant and timeless designs for women.
      </p>
      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8 px-10 max-w-7xl w-full">
        {/* Placeholder cards */}
        {[1, 2, 3].map((item) => (
          <div key={item} className="aspect-[3/4] bg-neutral-900 rounded-lg flex items-center justify-center border border-white/10">
             <span className="text-neutral-500 font-light">Watch {item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
