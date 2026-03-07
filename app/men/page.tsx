"use client";

import Link from "next/link";
import { ArrowRight, ShieldCheck, Truck, Award, Star, ShoppingBag } from "lucide-react";
import FooterSection from "../../components/sections/FooterSection";

export default function MenPage() {
  const watches = [
    {
      id: "royale",
      name: "LBM Solar Monarch",
      category: "Chronograph",
      badge: "HERITAGE",
      image: "/image/Suprans.png",
      link: "/watches/royale",
      price: "₹150,000"
    },
    {
      id: "spirit",
      name: "LBM Velaris",
      category: "Diver",
      badge: "PROFESSIONAL",
      image: "/image/Spirits.png",
      link: "/watches/spirit",
      price: "₹18,900"
    },
    {
      id: "daytona",
      name: "LBM Obsidian Moon",
      category: "Skeleton",
      badge: "BLACK EDITION",
      image: "/image/daytona.png",
      link: "/watches/daytona",
      price: "₹24,500"
    },
    {
      id: "phantom",
      name: "LBM Etna Rosso",
      category: "Sport",
      badge: "RACING",
      image: "/image/Phantomes.png",
      link: "/watches/phantom",
      price: "₹32,000"
    },
    {
      id: "yellow",
      name: "LBM Sole Edition",
      category: "Dress",
      badge: "LIMITED",
      image: "/image/Yellow.png",
      link: "/watches/yellow",
      price: "₹21,000"
    }
  ];

  return (
    <div className="relative min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative h-screen w-full overflow-hidden">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src="/image/Mens1.mp4"
          autoPlay
          loop
          muted
          playsInline
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
        
        <div className="relative z-10 h-full flex flex-col justify-center px-6 md:px-20 max-w-7xl mx-auto">
            {/* Breadcrumbs */}
            <div className="text-xs md:text-sm text-neutral-400 mb-8 uppercase tracking-widest font-sans">
                <Link href="/" className="hover:text-white transition-colors">Home</Link>
                <span className="mx-2">/</span>
                <span className="text-neutral-400">Collections</span>
                <span className="mx-2">/</span>
                <span className="text-yellow-500">Men</span>
            </div>

            {/* Subtitle */}
            <h3 className="text-yellow-500 tracking-[0.2em] uppercase font-bold text-sm md:text-base mb-4 font-sans">
                The Men&apos;s Collection
            </h3>

            {/* Title */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-suave text-white mb-6 leading-tight">
                Crafted for <br/> Distinction
            </h1>

            {/* Description */}
            <p className="text-neutral-300 text-sm md:text-lg max-w-2xl font-sans tracking-wide leading-relaxed mb-10">
                Discover timepieces where Swiss heritage meets contemporary vision. 
                Each watch is an expression of mastery, precision, and individual style.
            </p>

            {/* Buttons */}
            <div className="flex flex-col md:flex-row gap-4">
                <button className="bg-yellow-500 text-black px-8 py-4 uppercase tracking-widest text-xs font-bold hover:bg-yellow-400 transition-colors flex items-center gap-2">
                    Explore Collection <ArrowRight className="w-4 h-4" />
                </button>
                <button className="border border-white/30 text-white px-8 py-4 uppercase tracking-widest text-xs font-bold hover:bg-white hover:text-black transition-colors">
                    Featured Piece
                </button>
            </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-b border-white/10 bg-neutral-900/50 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-6 md:px-20">
            <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10 border-x border-white/10">
                {/* Item 1 */}
                <div className="flex flex-col items-center justify-center py-12 text-center">
                    <span className="text-3xl md:text-4xl font-suave text-yellow-500 mb-2">186</span>
                    <span className="text-xs tracking-[0.2em] text-neutral-500 uppercase font-sans">Timepieces</span>
                </div>
                {/* Item 2 */}
                <div className="flex flex-col items-center justify-center py-12 text-center">
                    <span className="text-3xl md:text-4xl font-suave text-yellow-500 mb-2">12</span>
                    <span className="text-xs tracking-[0.2em] text-neutral-500 uppercase font-sans">Collections</span>
                </div>
                {/* Item 3 */}
                <div className="flex flex-col items-center justify-center py-12 text-center">
                    <span className="text-3xl md:text-4xl font-suave text-yellow-500 mb-2">Swiss</span>
                    <span className="text-xs tracking-[0.2em] text-neutral-500 uppercase font-sans">Origin</span>
                </div>
                {/* Item 4 */}
                <div className="flex flex-col items-center justify-center py-12 text-center">
                    <span className="text-3xl md:text-4xl font-suave text-yellow-500 mb-2">1847</span>
                    <span className="text-xs tracking-[0.2em] text-neutral-500 uppercase font-sans">Est.</span>
                </div>
            </div>
        </div>
      </section>

      {/* Featured Timepiece Section */}
      <section className="bg-black py-24">
        <div className="mx-auto max-w-7xl px-6 md:px-20">
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
            
            {/* Left Column: Image */}
            <div className="relative w-full lg:w-1/2 aspect-square lg:aspect-[4/5] bg-gradient-to-br from-neutral-900 to-black rounded-sm overflow-hidden group">
              {/* Using a placeholder or existing image - replacing with Suprans.png for gold look */}
              <div className="absolute inset-0 flex items-center justify-center p-8">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src="/image/Suprans.png" 
                  alt="Tourbillon Elite" 
                  className="w-full h-full object-contain drop-shadow-2xl transform group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              
              {/* Limited Edition Badge */}
              <div className="absolute bottom-8 right-0 bg-yellow-600 text-black px-6 py-3 uppercase text-xs font-bold tracking-widest shadow-lg">
                Limited Edition
              </div>
            </div>

            {/* Right Column: Content */}
            <div className="w-full lg:w-1/2 space-y-10">
              <div>
                <span className="text-yellow-500 text-xs font-bold tracking-[0.2em] uppercase block mb-4">
                  Featured Timepiece
                </span>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-suave text-white mb-6">
                  Tourbillon Elite
                </h2>
                <p className="text-neutral-400 font-sans text-sm md:text-base leading-relaxed max-w-lg">
                  A masterpiece of horological excellence. The Tourbillon Elite features a hand-finished platinum case housing our most complex movement — 387 individual components working in perfect harmony to deliver unmatched precision.
                </p>
              </div>

              {/* Specs Grid */}
              <div className="grid grid-cols-2 gap-y-8 gap-x-12 border-t border-white/10 pt-8">
                <div>
                  <span className="block text-xs text-neutral-500 uppercase tracking-widest mb-2">Movement</span>
                  <span className="text-white font-suave text-lg">Tourbillon</span>
                </div>
                <div>
                  <span className="block text-xs text-neutral-500 uppercase tracking-widest mb-2">Case</span>
                  <span className="text-white font-suave text-lg">Platinum</span>
                </div>
                <div>
                  <span className="block text-xs text-neutral-500 uppercase tracking-widest mb-2">Power Reserve</span>
                  <span className="text-white font-suave text-lg">72 Hours</span>
                </div>
                <div>
                  <span className="block text-xs text-neutral-500 uppercase tracking-widest mb-2">Water Resistance</span>
                  <span className="text-white font-suave text-lg">100M</span>
                </div>
              </div>

              {/* Price & Action */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8 pt-4">
                <span className="text-3xl font-suave text-yellow-500">$42,000</span>
                <button className="bg-yellow-600 text-black px-8 py-4 uppercase tracking-widest text-xs font-bold hover:bg-yellow-500 transition-colors flex items-center gap-2">
                  Reserve Now <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* The Collection Section */}
      <section className="bg-black py-24 border-t border-white/10">
        <div className="mx-auto max-w-7xl px-6 md:px-20">
            {/* Header */}
            <div className="text-center mb-16">
                <span className="text-yellow-500 text-xs font-bold tracking-[0.2em] uppercase block mb-4">
                    Curated Selection
                </span>
                <h2 className="text-4xl md:text-5xl font-suave text-white mb-6">
                    The Collection
                </h2>
                <p className="text-neutral-400 font-sans text-sm md:text-base leading-relaxed max-w-lg mx-auto">
                    Explore our complete range of men&apos;s timepieces, from everyday elegance to grand complications.
                </p>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {watches.map((watch) => (
                    <div key={watch.id} className="group">
                        <Link href={watch.link} className="block relative aspect-[4/5] bg-neutral-900 overflow-hidden mb-6">
                            {/* Badge */}
                            <div className="absolute top-6 left-6 z-10">
                                <span className="bg-yellow-500 text-black text-[10px] font-bold uppercase tracking-widest px-3 py-1.5">
                                    {watch.badge}
                                </span>
                            </div>
                            
                            {/* Image */}
                            <div className="absolute inset-0 flex items-center justify-center p-8 transition-transform duration-700 group-hover:scale-110">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={watch.image} alt={watch.name} className="w-full h-full object-contain drop-shadow-xl" />
                            </div>

                            {/* Hover Overlay */}
                            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </Link>

                        <div className="flex flex-col">
                            <Link href={watch.link}>
                                <h3 className="text-xl font-suave text-white group-hover:text-yellow-500 transition-colors">
                                    {watch.name}
                                </h3>
                            </Link>
                            <p className="text-neutral-500 text-xs uppercase tracking-widest mt-2">
                                {watch.category}
                            </p>
                            
                            <div className="flex justify-between items-center mt-4 pt-4 border-t border-white/10">
                                <span className="text-yellow-500 font-suave text-lg">{watch.price}</span>
                                <button 
                                    className="text-white text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 hover:text-yellow-500 transition-colors"
                                    onClick={(e) => {
                                        // In a real app, this would add to cart context
                                        e.preventDefault();
                                        window.location.href = watch.link; // Or open cart drawer
                                    }}
                                >
                                    Add to Bag <ShoppingBag className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* The Chronos Promise Section */}
      <section className="bg-black py-24 border-t border-white/10">
        <div className="mx-auto max-w-7xl px-6 md:px-20">
          <div className="text-center mb-16">
            <span className="text-yellow-500 text-xs font-bold tracking-[0.2em] uppercase block mb-4">
              The Chronos Promise
            </span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 text-center">
            {/* Promise 1 */}
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full border border-yellow-500/30 flex items-center justify-center mb-6 text-yellow-500">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-white font-suave text-lg mb-3">Authenticity Guaranteed</h3>
              <p className="text-neutral-500 text-sm font-sans leading-relaxed">
                Every timepiece certified with origin documentation
              </p>
            </div>

            {/* Promise 2 */}
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full border border-yellow-500/30 flex items-center justify-center mb-6 text-yellow-500">
                <Truck className="w-6 h-6" />
              </div>
              <h3 className="text-white font-suave text-lg mb-3">Complimentary Shipping</h3>
              <p className="text-neutral-500 text-sm font-sans leading-relaxed">
                Insured worldwide delivery within 3-5 business days
              </p>
            </div>

            {/* Promise 3 */}
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full border border-yellow-500/30 flex items-center justify-center mb-6 text-yellow-500">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-white font-suave text-lg mb-3">5-Year International Warranty</h3>
              <p className="text-neutral-500 text-sm font-sans leading-relaxed">
                Full coverage with authorized service centers globally
              </p>
            </div>

            {/* Promise 4 */}
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full border border-yellow-500/30 flex items-center justify-center mb-6 text-yellow-500">
                <Star className="w-6 h-6" />
              </div>
              <h3 className="text-white font-suave text-lg mb-3">Concierge Service</h3>
              <p className="text-neutral-500 text-sm font-sans leading-relaxed">
                Personal horological advisor for every purchase
              </p>
            </div>
          </div>
        </div>
      </section>

      <FooterSection />
    </div>
  );
}
