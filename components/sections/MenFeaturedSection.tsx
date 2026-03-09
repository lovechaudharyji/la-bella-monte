import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function MenFeaturedSection() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6 md:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Image Side */}
          <div className="relative group">
            <div className="absolute -inset-4 bg-gradient-to-r from-orange-500/20 to-purple-500/20 rounded-full blur-3xl opacity-30 group-hover:opacity-50 transition-opacity duration-700" />
            <div className="relative aspect-square bg-gradient-to-br from-neutral-100 to-neutral-200 rounded-2xl p-8 flex items-center justify-center overflow-hidden border border-black/10">
              <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10" />
              <img 
                src="/image/Suprans.png" 
                alt="Tourbillon Elite" 
                className="w-full h-full object-contain drop-shadow-2xl transform group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            
            {/* Floating Badge */}
            <div className="absolute top-8 right-8 bg-orange-500 text-black text-xs font-bold px-4 py-2 uppercase tracking-widest rounded-full shadow-lg z-10">
              Masterpiece
            </div>
          </div>

          {/* Content Side */}
          <div className="flex flex-col space-y-8">
            <div>
              <span className="text-orange-500 text-sm font-sans font-medium tracking-normal uppercase mb-4 block">
                Featured Timepiece
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-sans font-normal tracking-normal uppercase text-black mb-6">
                        LBM Solar Monarch – Gold
                      </h2>
                      <p className="text-neutral-600 text-lg leading-relaxed font-sans font-normal tracking-normal">
                        A tribute to the royal warmth, radiating power, confidence, and timeless luxury.
                      </p>
                    </div>
                    {/* Specs Grid */}
                    <div className="grid grid-cols-2 gap-8 border-y border-black/10 py-8">
                      <div>
                        <span className="block text-xs text-neutral-500 uppercase mb-1 font-sans font-medium tracking-normal">Case Diameter</span>
                        <span className="text-xl text-black font-sans font-normal tracking-normal">47 mm</span>
                      </div>
                      <div>
                        <span className="block text-xs text-neutral-500 uppercase mb-1 font-sans font-medium tracking-normal">Strap</span>
                        <span className="text-xl text-black font-sans font-normal tracking-normal">Silicone</span>
                      </div>
                      <div>
                        <span className="block text-xs text-neutral-500 uppercase mb-1 font-sans font-medium tracking-normal">Movement</span>
                        <span className="text-xl text-black font-sans font-normal tracking-normal">Quartz</span>
                      </div>
                      <div>
                        <span className="block text-xs text-neutral-500 uppercase mb-1 font-sans font-medium tracking-normal">Weight</span>
                        <span className="text-xl text-black font-sans font-normal tracking-normal">150g</span>
                      </div>
                    </div>

            <div className="flex items-center gap-8">
              <div>
                <span className="text-3xl text-orange-500 font-sans font-normal tracking-normal">₹9,000</span>
              </div>
              <Link href="/watches/royale" className="flex-1 bg-black text-white py-4 px-8 uppercase font-sans font-medium tracking-normal hover:bg-neutral-800 transition-colors text-center">
                View Details
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
