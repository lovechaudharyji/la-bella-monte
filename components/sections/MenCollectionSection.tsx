'use client'
import Link from "next/link";
import { ShoppingBag, Heart, Eye } from "lucide-react";
import { useRouter } from "next/navigation";

export default function MenCollectionSection() {
  const router = useRouter();
  const watches = [
   
      {
      id: 1,
      name: "LBM Velaris",
      image: "/image/Spirits.png",
      price: "₹7,000",
      tag: "Classic",
      link: "/watches/spirit",
      bgImage: "/image/3S.png",
      imageClass: "scale-135 -translate-y-17"
    },
    {
      id: 2,
      name: "LBM Solar Monarch – Gold",
      image: "/image/Suprans.png",
      price: "₹9,000",
      tag: "New Arrival",
      link: "/watches/royale",
      bgImage: "/image/orange1.mp4",
      imageClass: "-translate-y-23 scale-135"
    },
    {
      id: 3,
      name: "LBM Etna Rosso",
      image: "/image/Phantomes.png",
      price: "₹7,000",
      tag: "Limited",
      link: "/watches/phantom",
      bgImage: "/image/4.avif",
      imageClass: "-translate-y-14 scale-105"
    },
    {
      id: 4,
      name: "LBM Obsidian Moon",
      image: "/image/daytona.png",
      price: "₹9,000",
      tag: "Exclusive",
      link: "/watches/daytona",
      bgImage: "/image/2.webp",
            imageClass: "-translate-y-10 scale-119"

    },
  
     {
      id: 5,
      name: "LBM Sole Edition",
      image: "/image/Yellow.png",
      price: "₹7,000",
      tag: "Best Seller",
      link: "/watches/yellow",
      bgImage: "/image/yellowwatch.png",
      imageClass: "-translate-y-12 scale-118 "
    },
  ];

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
              {watches.map((watch) => (
                  <Link key={watch.id} href={watch.link} className="group relative w-full aspect-[3/4] bg-white overflow-hidden rounded-sm shadow-md hover:shadow-xl transition-all duration-500 border border-neutral-100 block">
                      
                      {/* Top Badges/Icons */}
                      <div className="absolute top-6 left-6 z-20">
                          <span className="bg-orange-500 text-black text-[10px] font-bold px-3 py-1 uppercase tracking-widest shadow-md">
                              {watch.tag}
                          </span>
                      </div>
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
                              {watch.bgImage?.endsWith('.mp4') ? (
                                  <video 
                                      src={watch.bgImage} 
                                      autoPlay 
                                      loop 
                                      muted 
                                      playsInline
                                      preload="auto"
                                      className="w-full h-full object-cover opacity-100 transition-transform duration-700"
                                  />
                              ) : (
                                  <img 
                                      src={watch.bgImage} 
                                      alt=""
                                      className="w-full h-full object-cover opacity-100 transition-transform duration-700"
                                  />
                              )}
                          </div>
                          
                          {/* Radial Gradient Background behind watch for depth (skip for video to keep it plain) */}
                          {!watch.bgImage?.endsWith('.mp4') && (
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-white/50 to-transparent opacity-80 z-10" />
                          )}
                          
                          <img 
                              src={watch.image} 
                              alt={watch.name}
                              className={`relative z-20 w-full h-full object-contain drop-shadow-xl transition-transform duration-700 ${watch.imageClass || ""}`}
                          />
                      </div>

                      {/* Bottom Content Overlay */}
                      <div className="absolute bottom-0 left-0 right-0 p-6 z-20 bg-gradient-to-t from-white via-white/95 to-transparent pt-32 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
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
                                  {watch.price}
                              </div>
                          </div>
                          
                          <div className="flex items-center justify-between border-t border-black/10 pt-4">
                              <div className="flex gap-2">
                                  <button
                                    type="button"
                                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); router.push('/checkout'); }}
                                    className="bg-black text-white px-4 py-2 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 hover:bg-orange-500 hover:text-black transition-all duration-300 shadow-lg shadow-black/10"
                                  >
                                    <ShoppingBag size={12} strokeWidth={2} />
                                    Add to Bag
                                  </button>
                                  <button
                                    type="button"
                                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); router.push(watch.link); }}
                                    className="bg-white text-black border border-black px-4 py-2 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 hover:bg-orange-500 hover:text-black hover:border-orange-500 transition-all duration-300 shadow-lg shadow-black/10"
                                  >
                                    View More
                                  </button>
                              </div>
                          </div>
                      </div>
                  </Link>
              ))}
          </div>
      </div>
    </section>
  );
}
