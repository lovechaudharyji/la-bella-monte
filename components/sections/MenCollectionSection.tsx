'use client'
import Link from "next/link";
import { ShoppingBag, Heart, Eye } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { addToCart, getCart } from "../../lib/cart";

type Product = {
  id: string;
  slug: string;
  name: string;
  tagline: string | null;
  price_minor: number;
  currency: string | null;
  image_url: string | null;
  hero_bg_image_url: string | null;
};

function formatINR(value: number, currency?: string | null) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: currency || "INR",
    maximumFractionDigits: 0
  }).format(value);
}

export default function MenCollectionSection() {
  const router = useRouter();
  const [items, setItems] = useState<Product[]>([]);
  const [added, setAdded] = useState<Record<string, boolean>>(() => {
    const ids = new Set(getCart().map((c) => c.product_id));
    const map: Record<string, boolean> = {};
    ids.forEach((id) => {
      map[id] = true;
    });
    return map;
  });

  useEffect(() => {
    let ignore = false;
    const load = async () => {
      try {
        const r = await fetch("/api/products");
        const d = r.ok ? await r.json() : [];
        if (!ignore) setItems(d);
      } catch {
        if (!ignore) setItems([]);
      }
    };
    load();
    return () => { ignore = true; };
  }, []);

  return (
    <section id="men-collection" className="bg-white py-24 border-t border-black/10 scroll-mt-16 md:scroll-mt-20">
      <div className="mx-auto max-w-7xl px-6 md:px-20">
          {/* Header */}
          <div className="text-center mb-16">
            <span className="text-orange-500 text-xs font-medium tracking-normal uppercase mb-4 block font-sans">
              The Collection
            </span>
            <h2 className="text-3xl md:text-5xl font-sans font-normal tracking-normal text-black mb-6 uppercase">
              Masterpieces
            </h2>
            <p className="text-neutral-600 max-w-2xl mx-auto font-sans text-sm md:text-base tracking-normal leading-relaxed">
              Explore our curated selection of fine timepieces, each representing the pinnacle of Swiss craftsmanship and design.
            </p>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
              {items.map((watch) => {
                  const primaryImage =
                    watch.image_url?.trim() ||
                    "/image/daytona.png";
                  const bgRaw = watch.hero_bg_image_url?.trim() || "/image/2.webp";
                  const primaryName = (primaryImage || "").replace(/\?.*$/, "").split("/").pop()?.toLowerCase();
                  const bgName = (bgRaw || "").replace(/\?.*$/, "").split("/").pop()?.toLowerCase();
                  const bg = primaryName && bgName && primaryName === bgName ? "/image/2.webp" : bgRaw;
                  const isVideo = bg.endsWith(".mp4");
                  return (
                  <Link key={watch.id} href={`/watches/${watch.slug}`} className="group relative w-full aspect-[3/4] bg-white overflow-hidden rounded-sm shadow-md hover:shadow-xl transition-all duration-500 border border-neutral-100 block">
                      
                      <div className="absolute top-6 right-6 z-20 flex flex-col gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-x-4 group-hover:translate-x-0">
                          <button className="w-10 h-10 rounded-full border border-neutral-200 bg-white/80 backdrop-blur-sm flex items-center justify-center text-black hover:bg-orange-500 hover:border-orange-500 hover:text-black transition-all duration-300 shadow-sm" onClick={(e) => e.preventDefault()}>
                              <Heart size={16} />
                          </button>
                          <button className="w-10 h-10 rounded-full border border-neutral-200 bg-white/80 backdrop-blur-sm flex items-center justify-center text-black hover:bg-orange-500 hover:border-orange-500 hover:text-black transition-all duration-300 delay-75 shadow-sm" onClick={(e) => e.preventDefault()}>
                              <Eye size={16} />
                          </button>
                      </div>

                      {/* Image */}
                      <div className="absolute inset-0 flex items-center justify-center p-8 z-10">
                          {/* Background Image/Video with Overlay */}
                          <div className="absolute inset-0 z-0">
                          {isVideo ? (
                                  <video 
                                      src={bg} 
                                      autoPlay 
                                      loop 
                                      muted 
                                      playsInline
                                      preload="auto"
                                      className="w-full h-full object-cover opacity-100 transition-transform duration-700"
                                  />
                              ) : (
                              <img 
                                      src={bg} 
                                      alt=""
                                      className="w-full h-full object-cover opacity-100 transition-transform duration-700"
                                      onError={(e) => { (e.currentTarget as HTMLImageElement).src = "/image/2.webp"; }}
                                  />
                              )}
                          </div>
                          
                          {/* Radial Gradient Background behind watch for depth (skip for video to keep it plain) */}
                          {!isVideo && (
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-white/50 to-transparent opacity-80 z-10" />
                          )}
                          
                          {/* Foreground Watch */}
                          <img 
                            src={primaryImage} 
                            alt={watch.name}
                            className="relative z-20 w-full h-full object-contain drop-shadow-xl transition-transform duration-700"
                            onError={(e) => { (e.currentTarget as HTMLImageElement).src = "/image/daytona.png"; }}
                          />

                          {/* Bottom Fade Mask above the watch */}
                          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 z-30 bg-gradient-to-t from-white via-white/90 to-transparent" />
                      </div>

                      {/* Bottom Content Overlay */}
                      <div className="absolute bottom-0 left-0 right-0 p-6 z-40 bg-gradient-to-t from-white via-white/95 to-transparent pt-32 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                          <div className="flex flex-col gap-2 mb-2">
                              <div className="w-10 h-0.5 bg-orange-500" />
                              <h3 className="text-black text-lg font-semibold tracking-widest uppercase">
                                  {watch.name}
                              </h3>
                              <div className="flex items-center gap-2 text-neutral-500 text-[10px] font-medium tracking-[0.2em] uppercase">
                                  <span>Automatic</span>
                                  <span className="w-1 h-1 bg-neutral-400 rounded-full" />
                                  <span>Steel</span>
                              </div>
                              <div className="text-black font-medium text-lg tracking-wider pt-">
                                  {formatINR(watch.price_minor, watch.currency)}
                              </div>
                          </div>
                          
                          <div className="flex items-center justify-between border-t border-black/10 pt-4">
                              <div className="flex gap-2">
                                  <button
                                    type="button"
                                    disabled={!!added[watch.id]}
                                    onClick={(e) => { 
                                      e.preventDefault(); 
                                      e.stopPropagation(); 
                                      if (added[watch.id]) return;
                                      addToCart({
                                        product_id: watch.id,
                                        slug: watch.slug,
                                        name: watch.name,
                                        price_minor: Number(watch.price_minor || 0),
                                        currency: watch.currency || "INR",
                                        image_url: (watch.image_url || "/image/daytona.png"),
                                        quantity: 1
                                      });
                                      setAdded((prev) => ({ ...prev, [watch.id]: true }));
                                    }}
                                    className={`px-4 py-2 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 transition-all duration-300 shadow-lg shadow-black/10 ${
                                      added[watch.id]
                                        ? "bg-neutral-200 text-neutral-700 cursor-default"
                                        : "bg-black text-white hover:bg-orange-500 hover:text-black"
                                    }`}
                                  >
                                    <ShoppingBag size={12} strokeWidth={2} />
                                    {added[watch.id] ? "Added" : "Add to Bag"}
                                  </button>
                                  <button
                                    type="button"
                                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); router.push(`/watches/${watch.slug}`); }}
                                    className="bg-white text-black border border-black px-4 py-2 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 hover:bg-orange-500 hover:text-black hover:border-orange-500 transition-all duration-300 shadow-lg shadow-black/10"
                                  >
                                    View More
                                  </button>
                              </div>
                          </div>
                      </div>
                  </Link>
              )})}
          </div>
      </div>
    </section>
  );
}
