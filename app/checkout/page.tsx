"use client";

import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Suspense, useMemo } from "react";
import { ArrowLeft, ShieldCheck, Truck, Mail, User, MapPin, Building2, Hash, CreditCard } from "lucide-react";
import Link from "next/link";
import FooterSection from "../../components/sections/FooterSection";

type WatchId = "daytona" | "spirit" | "phantom" | "royale" | "yellow";

const WATCHES: Record<
  WatchId,
  { name: string; subtitle: string; imageSrc: string; price: string }
> = {
  daytona: {
    name: "LBM Obsidian Moon",
    subtitle: "Exquisite & Timeless",
    imageSrc: "/image/daytona.png",
    price: "₹24,500",
  },
  spirit: {
    name: "LBM Velaris",
    subtitle: "Sophisticated & Refined",
    imageSrc: "/image/Spirits.png",
    price: "₹18,900",
  },
  phantom: {
    name: "LBM Etna Rosso",
    subtitle: "Mysterious & Opulent",
    imageSrc: "/image/Phantomes.png",
    price: "₹32,000",
  },
  royale: {
    name: "LBM Solar Monarch – Gold",
    subtitle: "Regal & Majestic",
    imageSrc: "/image/Suprans.png",
    price: "₹150,000",
  },
  yellow: {
    name: "LBM Sole Edition",
    subtitle: "Vibrant & Bold",
    imageSrc: "/image/Yellow.png",
    price: "₹21,000",
  },
};

function normalizeWatchId(value: string | null): WatchId {
  if (
    value === "daytona" ||
    value === "spirit" ||
    value === "phantom" ||
    value === "royale" ||
    value === "yellow"
  ) {
    return value;
  }
  return "daytona";
}

function CheckoutContent() {
  const searchParams = useSearchParams();
  const watchId = normalizeWatchId(searchParams.get("watch"));
  const watch = useMemo(() => WATCHES[watchId], [watchId]);

  const priceBreakdown = useMemo(() => {
    const priceValue = parseInt(watch.price.replace(/[^0-9]/g, ''), 10);
    const gst = priceValue * 0.18;
    const shipping = 0;
    const total = priceValue + gst + shipping;

    const formatCurrency = (value: number) =>
      new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0,
      }).format(value);

    return {
      subtotal: watch.price,
      gst: formatCurrency(gst),
      shipping: shipping === 0 ? "Free" : formatCurrency(shipping),
      total: formatCurrency(total)
    };
  }, [watch]);

  return (
    <div className="min-h-screen bg-white text-black selection:bg-black/10">
      <div className="flex flex-col lg:flex-row min-h-screen">
        {/* Left Section - Product Showcase */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative w-full lg:w-[45%] lg:sticky lg:top-0 lg:h-screen lg:border-r border-neutral-200 bg-neutral-50 overflow-hidden"
        >
          <div className="absolute top-24 left-8 z-10">
            <Link 
              href={`/watches/${watchId}`}
              className="group flex items-center gap-2 text-sm uppercase tracking-widest text-neutral-500 hover:text-black transition-colors"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              Back
            </Link>
          </div>

          <div className="h-full flex flex-col items-center justify-center p-10 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="relative w-full aspect-square max-w-md"
            >
              <Image
                src={watch.imageSrc}
                alt={watch.name}
                fill
                className="object-contain drop-shadow-2xl"
                priority
                sizes="(max-width: 1024px) 100vw, 45vw"
              />
            </motion.div>
            
            <div className="mt-8 text-center">
              <h2 className="text-3xl font-suave tracking-normal text-black">{watch.name}</h2>
              <p className="text-neutral-500 text-sm tracking-widest uppercase mt-2">{watch.subtitle}</p>
              <p className="text-2xl font-light mt-4 tracking-tight text-neutral-900">{watch.price}</p>
            </div>
          </div>
        </motion.div>

        {/* Right Section - Checkout Form */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="w-full lg:w-[55%] min-h-screen bg-white"
        >
          <div className="max-w-2xl mx-auto px-6 py-12 lg:py-24 lg:px-16">
            <div className="mb-12">
              <h1 className="text-2xl font-suave tracking-normal mb-2 text-black">Checkout</h1>
              <p className="text-neutral-500 text-sm">Complete your acquisition.</p>
            </div>

            <form className="space-y-12">
              {/* Contact Info */}
              <section className="space-y-6">
                <h3 className="text-sm font-medium uppercase tracking-widest text-neutral-900 border-b border-neutral-200 pb-2">
                  Contact Information
                </h3>
                <div className="grid gap-6">
                  <div className="relative group">
                    <Mail className="absolute left-0 top-3.5 w-5 h-5 text-neutral-400 group-focus-within:text-black transition-colors" />
                    <input 
                      type="email" 
                      placeholder="Email Address"
                      className="w-full bg-transparent border-b border-neutral-300 py-3 pl-8 text-black placeholder-neutral-400 focus:outline-none focus:border-black transition-colors text-lg"
                    />
                  </div>
                </div>
              </section>

              {/* Shipping Address */}
              <section className="space-y-6">
                <h3 className="text-sm font-medium uppercase tracking-widest text-neutral-900 border-b border-neutral-200 pb-2">
                  Shipping Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="relative md:col-span-2 group">
                    <User className="absolute left-0 top-3.5 w-5 h-5 text-neutral-400 group-focus-within:text-black transition-colors" />
                    <input 
                      type="text" 
                      placeholder="Full Name"
                      className="w-full bg-transparent border-b border-neutral-300 py-3 pl-8 text-black placeholder-neutral-400 focus:outline-none focus:border-black transition-colors"
                    />
                  </div>
                  <div className="relative md:col-span-2 group">
                    <MapPin className="absolute left-0 top-3.5 w-5 h-5 text-neutral-400 group-focus-within:text-black transition-colors" />
                    <input 
                      type="text" 
                      placeholder="Address"
                      className="w-full bg-transparent border-b border-neutral-300 py-3 pl-8 text-black placeholder-neutral-400 focus:outline-none focus:border-black transition-colors"
                    />
                  </div>
                  <div className="relative group">
                    <Building2 className="absolute left-0 top-3.5 w-5 h-5 text-neutral-400 group-focus-within:text-black transition-colors" />
                    <input 
                      type="text" 
                      placeholder="City"
                      className="w-full bg-transparent border-b border-neutral-300 py-3 pl-8 text-black placeholder-neutral-400 focus:outline-none focus:border-black transition-colors"
                    />
                  </div>
                  <div className="relative group">
                    <Hash className="absolute left-0 top-3.5 w-5 h-5 text-neutral-400 group-focus-within:text-black transition-colors" />
                    <input 
                      type="text" 
                      placeholder="Postal Code"
                      className="w-full bg-transparent border-b border-neutral-300 py-3 pl-8 text-black placeholder-neutral-400 focus:outline-none focus:border-black transition-colors"
                    />
                  </div>
                </div>
              </section>

              {/* Order Summary Details */}
              <section className="bg-neutral-50 rounded-lg p-6 space-y-4 border border-neutral-100">
                <div className="flex justify-between text-sm text-neutral-600">
                  <span>Subtotal</span>
                  <span className="text-black font-medium">{priceBreakdown.subtotal}</span>
                </div>
                <div className="flex justify-between text-sm text-neutral-600">
                  <span>GST (18%)</span>
                  <span className="text-black font-medium">{priceBreakdown.gst}</span>
                </div>
                <div className="flex justify-between text-sm text-neutral-600">
                  <span>Shipping</span>
                  <span className="text-green-600 font-medium uppercase text-xs">{priceBreakdown.shipping}</span>
                </div>
                <div className="pt-4 border-t border-neutral-200 flex justify-between items-center">
                  <span className="text-sm uppercase tracking-widest text-black font-semibold">Total</span>
                  <span className="text-xl font-light text-black">{priceBreakdown.total}</span>
                </div>
              </section>

              {/* Action */}
              <div className="space-y-6">
                <button 
                  type="button"
                  className="w-full bg-black text-white h-14 uppercase tracking-widest text-sm font-bold hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all"
                >
                  <CreditCard className="w-5 h-5" />
                  Proceed to Payment
                </button>
                
                <div className="grid grid-cols-2 gap-4 text-xs text-neutral-500">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-neutral-400" />
                    <span>Secure Encrypted Payment</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Truck className="w-4 h-4 text-neutral-400" />
                    <span>Complimentary Shipping</span>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
      <FooterSection />
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black" />}>
      <CheckoutContent />
    </Suspense>
  );
}
