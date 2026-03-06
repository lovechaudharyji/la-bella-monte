"use client";

export default function HeroSection() {
  return (
    <section className="sticky top-0 z-10 h-screen overflow-hidden flex-shrink-0">
      <div className="absolute inset-0">
        <video
          className="h-full w-full object-cover"
          src="/image/hero1.mp4"
          autoPlay
          loop
          muted
          playsInline
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/90" />
      </div>

      <div className="relative z-10 flex h-[calc(100vh-80px)] flex-col items-center justify-center px-4 text-center">
        <div className="mb-3 text-xs tracking-normal uppercase text-white/70 font-medium font-sans">
          LA BELLA MONTE Watches
        </div>
        <div className="mb-6 h-[2px] w-32 bg-red-600" />
        <h1 className="text-4xl font-normal tracking-normal uppercase md:text-6xl font-sans">
          Luxury Of Time
        </h1>
      </div>
    </section>
  );
}
