"use client";

import Image from "next/image";
import Link from "next/link";
import { use, useState, useEffect } from "react";
import { ArrowLeft, Clock, Square, Sun, Droplets, Feather, ShieldCheck, Zap, Moon, RefreshCcw, Shield, MapPin, Maximize, Weight, ShoppingBag, CreditCard } from "lucide-react";
import FooterSection from "../../../components/sections/FooterSection";

// Color mapping for the watch selector
const colors = [
  { name: 'Black', slug: 'daytona', hex: '#000000' },
  { name: 'Blue', slug: 'spirit', hex: '#1d4ed8' },
  { name: 'Red', slug: 'phantom', hex: '#b91c1c' },
  { name: 'Yellow', slug: 'yellow', hex: '#eab308' },
  { name: 'Orange', slug: 'royale', hex: '#ea580c' },
];

// Common watch data used across all watches
const commonWatchData = {
  description: "Men's Automatic Mechanical Watch | Barrel-Shaped Skeleton Dial | Luminous Waterproof Wristwatch with Skin-Friendly Silicone Strap",
  features: [
    {
      title: "Automatic Mechanical Movement",
      desc: "No battery required! Powered by your wrist’s natural motion for precise and reliable timekeeping.",
      icon: Clock
    },
    {
      title: "Barrel-Shaped Design",
      desc: "A bold and modern barrel-shaped case with a skeleton dial, offering a glimpse into the sophisticated automatic movement.",
      icon: Square
    },
    {
      title: "Luminous Hands & Markers",
      desc: "Glow-in-the-dark feature ensures easy readability even in low-light conditions.",
      icon: Sun
    },
    {
      title: "Waterproof & Sweat-Resistant",
      desc: "Designed for daily use, resistant to minor water exposure like splashes and rain.",
      icon: Droplets
    },
    {
      title: "Skin-Friendly Silicone Strap",
      desc: "Lightweight, breathable, and ultra-comfortable for all-day wear. Ideal for sensitive skin.",
      icon: Feather
    }
  ],
  highlights: [
    { text: "1 Year Warranty", icon: ShieldCheck },
    { text: "Automatic", icon: Zap },
    { text: "3 ATM Water Resistance", icon: Droplets },
    { text: "Glow in Dark", icon: Moon },
    { text: "6 Months Replacement", icon: RefreshCcw },
    { text: "Stainless Steel", icon: Shield },
    { text: "Design in Italy", icon: MapPin }
  ],
  specs: {
    caseDiameter: "47 millimeter",
    strap: "Silicone",
    movementType: "Quartz",
    weight: "150g"
  }
};

// Specific watch data
const watches: Record<string, {
  name: string;
  tagline: string;
  price: string;
  image: string;
  description: string;
  bgImage?: string;
  bgVideo?: string;
}> = {
  daytona: {
    name: "LBM Obsidian Moon",
    tagline: "Exquisite & Timeless",
    price: "₹9,000",
    image: "/image/daytona.png",
    description: "Inspired by the mysterious elegance of Italy’s midnight skies, where obsidian tones meet the quiet glow of the moon.",
    bgImage: "/image/2.webp",
  },
  spirit: {
    name: "LBM Velaris",
    tagline: "Sophisticated & Refined",
    price: "₹7,000",
    image: "/image/Spirits.png",
    description: "Echoing the deep blue horizons of the Mediterranean, crafted for those who carry calm confidence and limitless vision.",
    bgImage: "/image/3S.png",
  },
  phantom: {
    name: "LBM Etna Rosso",
    tagline: "Mysterious & Opulent",
    price: "₹7,000",
    image: "/image/Phantomes.png",
    description: "Inspired by the fiery spirit of Mount Etna, symbolizing passion, strength, and unstoppable energy.",
    bgImage: "/image/4.avif",
  },
  royale: {
    name: "LBM Solar Monarch – Gold",
    tagline: "Regal & Majestic",
    price: "₹9,000",
    image: "/image/Suprans.png",
    description: "A tribute to the royal warmth, radiating power, confidence, and timeless luxury.",
    bgVideo: "/image/orange1.mp4",
  },
  yellow: {
    name: "LBM Sole Edition",
    tagline: "Vibrant & Bold",
    price: "₹7,000",
    image: "/image/Yellow.png",
    description: "A celebration of Italy’s golden sunshine, capturing brightness, optimism, and the joy of every new moment.",
    bgImage: "/image/yellowwatch.png"
  }
};

export default function WatchDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  // Unwrap params using React.use()
  const { slug } = use(params);
  
  // State for active watch selection (defaults to current slug)
  const [activeSlug, setActiveSlug] = useState(slug);

  // Update activeSlug if the URL slug changes (e.g. navigation)
  useEffect(() => {
    setActiveSlug(slug);
  }, [slug]);

  const watch = watches[activeSlug as string];

  if (!watch) {
    return (
      <div className="min-h-screen bg-white text-black flex flex-col items-center justify-center">
        <h1 className="text-4xl font-suave mb-4">Watch Not Found</h1>
        <Link href="/" className="text-neutral-600 hover:text-black underline">
          Return Home
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-black overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          {watch.bgVideo ? (
            <video
              className="h-full w-full object-cover opacity-50"
              src={watch.bgVideo}
              autoPlay
              loop
              muted
              playsInline
            />
          ) : (
            <Image
              src={watch.bgImage || "/image/2.webp"} // Fallback image
              alt={`${watch.name} background`}
              fill
              className="object-cover opacity-50"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/50 to-white"></div>
        </div>

        {/* Back Button */}
        <div className="absolute top-24 left-6 md:left-10 z-20">
          <Link 
            href="/" 
            className="group flex items-center gap-2 text-sm uppercase tracking-widest text-black/60 hover:text-black transition-colors"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Back
          </Link>
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between w-full max-w-7xl px-6 md:px-12 h-full pt-20 gap-12">
          {/* Watch Image */}
          <div className="flex-1 relative w-full h-[50vh] md:h-[80vh]">
            <Image
              src={watch.image}
              alt={watch.name}
              fill
              className="object-contain drop-shadow-2xl"
              priority
            />
          </div>

          {/* Text Content */}
          <div className="flex-1 text-center md:text-left mb-10 md:mb-0">
            <h1 className="text-3xl md:text-6xl font-suave tracking-normal uppercase mb-4 text-black">
              {watch.name}
            </h1>
            <p className="text-lg md:text-xl font-sans tracking-widest text-neutral-500 uppercase mb-8">
              {watch.tagline}
            </p>

            {/* Short Description */}
            <div className="mb-8">
              <span className="text-xs font-bold tracking-widest uppercase text-neutral-500 block mb-2">
                Description
              </span>
              <p className="text-neutral-700 font-sans text-sm leading-relaxed">
                {watch.description}
              </p>
            </div>

            {/* Color Selection */}
            <div className="mb-8">
              <span className="text-xs font-bold tracking-widest uppercase text-neutral-500 block mb-3">
                Select Color
              </span>
              <div className="flex gap-4 justify-center md:justify-start">
                {colors.map((color) => (
                  <button
                    key={color.slug}
                    onClick={() => setActiveSlug(color.slug)}
                    className={`w-8 h-8 rounded-full transition-all duration-300 ${
                      activeSlug === color.slug 
                        ? 'ring-2 ring-black ring-offset-2 scale-110' 
                        : 'hover:scale-110 ring-1 ring-neutral-200'
                    }`}
                    style={{ backgroundColor: color.hex }}
                    aria-label={`Select ${color.name}`}
                    title={color.name}
                  />
                ))}
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-6 justify-center md:justify-start">
              <button 
                onClick={() => alert("Added to bag!")}
                className="flex items-center gap-3 bg-transparent border border-black text-black px-8 py-4 text-xs tracking-[0.2em] uppercase font-bold hover:bg-black hover:text-white transition-colors"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Bag</span>
              </button>
              <Link 
                href={`/checkout?watch=${activeSlug}`}
                className="flex items-center gap-3 bg-black text-white px-8 py-4 text-xs tracking-[0.2em] uppercase font-bold hover:bg-neutral-800 transition-colors"
              >
                <CreditCard className="w-4 h-4" />
                <span>Checkout</span>
              </Link>
              <span className="flex items-center text-xl font-sans text-black ml-4">
                {watch.price}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Details Section */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left Column: Description & Features */}
          <div>
            <h2 className="text-3xl font-suave mb-6 text-black">About This Item</h2>
            <div className="space-y-8">
              {commonWatchData.features.map((feature, index) => (
                <div key={index} className="flex gap-4 items-start">
                  <div className="flex-shrink-0 mt-1 p-2 bg-neutral-100 rounded-full">
                    <feature.icon className="w-5 h-5 text-black" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-black mb-1">{feature.title}</h3>
                    <p className="text-neutral-600 font-sans text-sm leading-relaxed">
                      {feature.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-12">
              <h3 className="text-xl font-suave mb-4 text-black">Description</h3>
              <p className="text-neutral-700 leading-relaxed font-sans text-base p-4 bg-neutral-100 border border-black/5 rounded-sm">
                {watch.description}
              </p>
            </div>
          </div>

          {/* Right Column: Highlights & Specs */}
          <div className="space-y-10">
            {/* Highlights Grid */}
            <div className="bg-neutral-50 p-8 border border-black/10 rounded-sm">
              <h2 className="text-2xl font-suave mb-6 text-black">Key Highlights</h2>
              <div className="grid grid-cols-2 gap-4">
                {commonWatchData.highlights.map((highlight, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="p-1.5 bg-neutral-100 rounded-full flex-shrink-0">
                      <highlight.icon className="w-4 h-4 text-black" />
                    </div>
                    <span className="text-sm text-neutral-600 font-sans tracking-wide">{highlight.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Technical Specs */}
            <div className="bg-neutral-50 p-8 border border-black/10 rounded-sm">
              <h2 className="text-2xl font-suave mb-6 text-black">Technical Specifications</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b border-black/5 pb-2">
                  <div className="flex items-center gap-3">
                    <Maximize className="w-4 h-4 text-neutral-400" />
                    <span className="text-neutral-500 font-sans text-sm">Case Diameter</span>
                  </div>
                  <span className="text-black font-medium font-sans text-sm">{commonWatchData.specs.caseDiameter}</span>
                </div>
                <div className="flex justify-between items-center border-b border-black/5 pb-2">
                  <div className="flex items-center gap-3">
                    <Feather className="w-4 h-4 text-neutral-400" />
                    <span className="text-neutral-500 font-sans text-sm">Strap</span>
                  </div>
                  <span className="text-black font-medium font-sans text-sm">{commonWatchData.specs.strap}</span>
                </div>
                <div className="flex justify-between items-center border-b border-black/5 pb-2">
                  <div className="flex items-center gap-3">
                    <Clock className="w-4 h-4 text-neutral-400" />
                    <span className="text-neutral-500 font-sans text-sm">Movement</span>
                  </div>
                  <span className="text-black font-medium font-sans text-sm">{commonWatchData.specs.movementType}</span>
                </div>
                <div className="flex justify-between items-center border-b border-black/5 pb-2">
                  <div className="flex items-center gap-3">
                    <Weight className="w-4 h-4 text-neutral-400" />
                    <span className="text-neutral-500 font-sans text-sm">Weight</span>
                  </div>
                  <span className="text-black font-medium font-sans text-sm">{commonWatchData.specs.weight}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Navigation Footer */}
      <div className="py-12 text-center border-t border-black/10">
        <Link href="/" className="text-neutral-500 hover:text-black uppercase tracking-widest text-xs transition-colors">
          Back to Collection
        </Link>
      </div>
      <FooterSection />
    </div>
  );
}
