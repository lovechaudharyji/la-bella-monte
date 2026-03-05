"use client";

import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Suspense, useMemo } from "react";
import { ArrowLeft, ShieldCheck, Truck } from "lucide-react";
import Link from "next/link";

type WatchId = "daytona" | "spirit" | "phantom" | "royale" | "yellow";

const WATCHES: Record<
  WatchId,
  { name: string; subtitle: string; imageSrc: string; price: string }
> = {
  daytona: {
    name: "Daytona",
    subtitle: "Precision & Performance",
    imageSrc: "/image/daytona.png",
    price: "$12,800",
  },
  spirit: {
    name: "Spirit",
    subtitle: "Sophisticated & Refined",
    imageSrc: "/image/Spirits.png",
    price: "$14,200",
  },
  phantom: {
    name: "Phantom",
    subtitle: "Mysterious & Opulent",
    imageSrc: "/image/Phantomes.png",
    price: "$16,900",
  },
  royale: {
    name: "Royale",
    subtitle: "Regal & Majestic",
    imageSrc: "/image/Suprans.png",
    price: "$18,500",
  },
  yellow: {
    name: "Yellow",
    subtitle: "Vibrant & Bold",
    imageSrc: "/image/Yellow.png",
    price: "$15,500",
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

  return (
    <div className="min-h-screen bg-white text-black selection:bg-black/10">
      <div className="flex flex-col lg:flex-row min-h-screen">
        {/* Left Section - Product Showcase */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative w-full lg:w-[45%] lg:fixed lg:h-screen lg:border-r border-neutral-200 bg-neutral-50 overflow-hidden"
        >
          <div className="absolute top-8 left-8 z-10">
            <Link 
              href="/" 
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
          className="w-full lg:w-[55%] lg:ml-auto min-h-screen bg-white"
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
                  <div className="group">
                    <input 
                      type="email" 
                      placeholder="Email Address"
                      className="w-full bg-transparent border-b border-neutral-300 py-3 text-black placeholder-neutral-400 focus:outline-none focus:border-black transition-colors text-lg"
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
                  <input 
                    type="text" 
                    placeholder="First Name"
                    className="w-full bg-transparent border-b border-neutral-300 py-3 text-black placeholder-neutral-400 focus:outline-none focus:border-black transition-colors"
                  />
                  <input 
                    type="text" 
                    placeholder="Last Name"
                    className="w-full bg-transparent border-b border-neutral-300 py-3 text-black placeholder-neutral-400 focus:outline-none focus:border-black transition-colors"
                  />
                  <input 
                    type="text" 
                    placeholder="Address"
                    className="w-full bg-transparent border-b border-neutral-300 py-3 text-black placeholder-neutral-400 focus:outline-none focus:border-black transition-colors md:col-span-2"
                  />
                  <input 
                    type="text" 
                    placeholder="City"
                    className="w-full bg-transparent border-b border-neutral-300 py-3 text-black placeholder-neutral-400 focus:outline-none focus:border-black transition-colors"
                  />
                  <input 
                    type="text" 
                    placeholder="Postal Code"
                    className="w-full bg-transparent border-b border-neutral-300 py-3 text-black placeholder-neutral-400 focus:outline-none focus:border-black transition-colors"
                  />
                </div>
              </section>

              {/* Order Summary Details */}
              <section className="bg-neutral-50 rounded-lg p-6 space-y-4 border border-neutral-100">
                <div className="flex justify-between text-sm text-neutral-600">
                  <span>Subtotal</span>
                  <span className="text-black font-medium">{watch.price}</span>
                </div>
                <div className="flex justify-between text-sm text-neutral-600">
                  <span>Shipping</span>
                  <span className="text-neutral-500 uppercase text-xs">Calculated at next step</span>
                </div>
                <div className="pt-4 border-t border-neutral-200 flex justify-between items-center">
                  <span className="text-sm uppercase tracking-widest text-black font-semibold">Total</span>
                  <span className="text-xl font-light text-black">{watch.price}</span>
                </div>
              </section>

              {/* Action */}
              <div className="space-y-6">
                <button 
                  type="button"
                  className="w-full bg-black text-white h-14 uppercase tracking-widest text-sm font-bold hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all"
                >
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
