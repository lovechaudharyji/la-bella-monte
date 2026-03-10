"use client";

import Image from "next/image";
import Link from "next/link";
import { use, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Clock, Square, Sun, Droplets, Feather, ShieldCheck, Zap, Moon, RefreshCcw, Shield, MapPin, Maximize, Weight, ShoppingBag, CreditCard } from "lucide-react";
import FooterSection from "../../../components/sections/FooterSection";

const commonWatchData = {
  description: "Men's Automatic Mechanical Watch | Barrel-Shaped Skeleton Dial | Luminous Waterproof Wristwatch with Skin-Friendly Silicone Strap",
  features: [
    { title: "Automatic Mechanical Movement", desc: "No battery required! Powered by your wrist’s natural motion for precise and reliable timekeeping.", icon: Clock },
    { title: "Barrel-Shaped Design", desc: "A bold and modern barrel-shaped case with a skeleton dial, offering a glimpse into the sophisticated automatic movement.", icon: Square },
    { title: "Luminous Hands & Markers", desc: "Glow-in-the-dark feature ensures easy readability even in low-light conditions.", icon: Sun },
    { title: "Waterproof & Sweat-Resistant", desc: "Designed for daily use, resistant to minor water exposure like splashes and rain.", icon: Droplets },
    { title: "Skin-Friendly Silicone Strap", desc: "Lightweight, breathable, and ultra-comfortable for all-day wear. Ideal for sensitive skin.", icon: Feather }
  ],
  highlights: [
    { text: "1 Year Warranty", icon: ShieldCheck },
    { text: "Automatic", icon: Zap },
    { text: "3 ATM Water Resistance", icon: Droplets },
    { text: "Glow in Dark", icon: Moon },
    { text: "6 Months Replacement", icon: RefreshCcw },
    { text: "Stainless Steel", icon: Shield },
    { text: "Design in Italy", icon: MapPin }
  ]
};

type Product = {
  id: string;
  slug: string;
  name: string;
  tagline: string | null;
  description: string | null;
  price_minor: number;
  currency: string | null;
  image_url: string | null;
  color_name: string | null;
  color_hex: string | null;
  hero_bg_image_url: string | null;
  hero_bg_video_url: string | null;
  movement_type?: string | null;
  water_resistance?: string | null;
  case_diameter_mm?: number | null;
  strap_type?: string | null;
  weight_g?: number | null;
};

function formatINR(value: number, currency?: string | null) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: currency || "INR",
    maximumFractionDigits: 0
  }).format(value);
}

export default function WatchDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const router = useRouter();
  const [activeSlug, setActiveSlug] = useState(slug);
  const [product, setProduct] = useState<Product | null>(null);
  const [variants, setVariants] = useState<Product[]>([]);

  useEffect(() => {
    setActiveSlug(slug);
  }, [slug]);

  useEffect(() => {
    let ignore = false;
    fetch(`/api/products/${slug}`)
      .then((r) => r.ok ? r.json() : null)
      .then((d) => { if (!ignore) setProduct(d); });
    fetch(`/api/products`)
      .then((r) => r.ok ? r.json() : [])
      .then((d) => { if (!ignore) setVariants(d); });
    return () => { ignore = true; };
  }, [slug]);

  useEffect(() => {
    if (activeSlug && activeSlug !== slug) {
      router.replace(`/watches/${activeSlug}`);
    }
  }, [activeSlug, slug, router]);

  const primaryImage =
    (product?.image_url?.trim().replace(/[)\s]+$/, "")) ||
    "/image/daytona.png";

  const bgRaw = product?.hero_bg_image_url || undefined;
  const imgName = (primaryImage || "").replace(/\?.*$/, "").split("/").pop()?.toLowerCase();
  const bgName = (bgRaw || "").replace(/\?.*$/, "").split("/").pop()?.toLowerCase();
  const bgImageNormalized = imgName && bgName && imgName === bgName ? undefined : bgRaw;

  const watch = {
    name: product?.name || "",
    tagline: product?.tagline || "",
    price: formatINR(product?.price_minor || 0, product?.currency),
    image: primaryImage,
    description: product?.description || "",
    bgImage: bgImageNormalized,
    bgVideo: product?.hero_bg_video_url || undefined
  };

  const [imageSrc, setImageSrc] = useState(watch.image);
  const [bgSrc, setBgSrc] = useState(watch.bgImage ? watch.bgImage.replace(/[)\s]+$/, "") : "/image/2.webp");

  useEffect(() => {
    setImageSrc(watch.image);
    setBgSrc(watch.bgImage ? watch.bgImage.replace(/[)\s]+$/, "") : "/image/2.webp");
  }, [watch.image, watch.bgImage]);

  if (!product) {
    return (
      <div className="min-h-screen bg-white text-black flex items-center justify-center">
        <span>Loading…</span>
      </div>
    );
  }


  const colors = variants.map((p) => ({
    name: p.color_name || p.slug,
    slug: p.slug,
    hex: p.color_hex || "#000000"
  }));

  const specs = {
    caseDiameter: product.case_diameter_mm ? `${product.case_diameter_mm} millimeter` : "47 millimeter",
    strap: product.strap_type || "Silicone",
    movementType: product.movement_type || "Quartz",
    weight: product.weight_g ? `${product.weight_g}g` : "150g",
  };

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
              src={bgSrc}
              alt={`${watch.name} background`}
              fill
              className="object-cover opacity-50"
              onError={() => setBgSrc("/image/2.webp")}
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
              src={imageSrc}
              alt={watch.name}
              fill
              className="object-contain drop-shadow-2xl"
              priority
              onError={() => setImageSrc("/image/daytona.png")}
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
              onClick={() => router.push(`/checkout?watch=${activeSlug}`)}
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
                  <span className="text-black font-medium font-sans text-sm">{specs.caseDiameter}</span>
                </div>
                <div className="flex justify-between items-center border-b border-black/5 pb-2">
                  <div className="flex items-center gap-3">
                    <Feather className="w-4 h-4 text-neutral-400" />
                    <span className="text-neutral-500 font-sans text-sm">Strap</span>
                  </div>
                  <span className="text-black font-medium font-sans text-sm">{specs.strap}</span>
                </div>
                <div className="flex justify-between items-center border-b border-black/5 pb-2">
                  <div className="flex items-center gap-3">
                    <Clock className="w-4 h-4 text-neutral-400" />
                    <span className="text-neutral-500 font-sans text-sm">Movement</span>
                  </div>
                  <span className="text-black font-medium font-sans text-sm">{specs.movementType}</span>
                </div>
                <div className="flex justify-between items-center border-b border-black/5 pb-2">
                  <div className="flex items-center gap-3">
                    <Weight className="w-4 h-4 text-neutral-400" />
                    <span className="text-neutral-500 font-sans text-sm">Weight</span>
                  </div>
                  <span className="text-black font-medium font-sans text-sm">{specs.weight}</span>
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
