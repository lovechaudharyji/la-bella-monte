"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Suspense, useEffect, useMemo, useState } from "react";
import { ArrowLeft, ShieldCheck, Truck, Mail, User, MapPin, Building2, Hash, CreditCard } from "lucide-react";
import Link from "next/link";
import FooterSection from "../../components/sections/FooterSection";
import { CartItem, getCart, clearCart, computeTotals } from "../../lib/cart";

 

function formatINR(value: number, currency?: string | null) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: currency || "INR",
    maximumFractionDigits: 0
  }).format(value);
}

function CheckoutContent() {
  const router = useRouter();
  const [items, setItems] = useState<CartItem[]>(() => getCart());
  const currency = items[0]?.currency || "INR";
  const totals = useMemo(() => computeTotals(items), [items]);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    country: "",
    postalCode: ""
  });

  useEffect(() => {
    const refresh = () => setItems(getCart());
    window.addEventListener("lbm_cart_updated", refresh);
    window.addEventListener("storage", refresh);
    return () => {
      window.removeEventListener("lbm_cart_updated", refresh);
      window.removeEventListener("storage", refresh);
    };
  }, []);

  const placeOrder = async () => {
    if (items.length === 0) return;
    const res = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        customer: {
          first_name: form.firstName,
          last_name: form.lastName,
          email: form.email,
          phone: form.phone,
          address_line1: form.address1,
          address_line2: form.address2,
          city: form.city,
          state: form.state,
          country: form.country,
          postal_code: form.postalCode
        },
        items
      })
    });
    if (!res.ok) return;
    const data = await res.json();
    clearCart();
    router.replace(`/order-success?order=${encodeURIComponent(data.id)}`);
  };

  return (
    <div className="min-h-screen bg-white text-black selection:bg-black/10">
      <div className="flex flex-col lg:flex-row min-h-screen">
        {/* Left Section - Items Review */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative w-full lg:w-[45%] lg:sticky lg:top-0 lg:h-screen lg:border-r border-neutral-200 bg-neutral-50 overflow-hidden"
        >
          <div className="absolute top-24 left-8 z-10">
            <Link 
              href="/bag"
              className="group flex items-center gap-2 text-sm uppercase tracking-widest text-neutral-500 hover:text-black transition-colors"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              Back
            </Link>
          </div>

          <div className="h-full flex flex-col p-8 pt-28 relative">
            <div className="mb-4">
              <h2 className="text-xl font-suave tracking-normal text-black">Your Items</h2>
              <p className="text-neutral-500 text-xs uppercase tracking-widest mt-1">
                {items.length} {items.length === 1 ? "item" : "items"}
              </p>
            </div>
            <div className="flex-1 overflow-auto pr-2">
              {items.length === 0 ? (
                <div className="h-full flex items-center justify-center text-neutral-500 text-sm">
                  Your bag is empty
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((it) => (
                    <div key={it.product_id} className="flex items-center gap-4 rounded border border-neutral-200 bg-white p-3">
                      <div className="relative h-16 w-16 flex-shrink-0 bg-neutral-50 rounded">
                        <Image
                          src={it.image_url || "/image/daytona.png"}
                          alt={it.name}
                          fill
                          sizes="64px"
                          className="object-contain"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="truncate text-xs font-semibold uppercase tracking-widest text-black">
                          {it.name}
                        </div>
                        <div className="mt-1 text-xs text-neutral-500">
                          Qty {it.quantity}
                        </div>
                      </div>
                      <div className="text-sm text-black font-medium">
                        {formatINR(it.price_minor * it.quantity, it.currency || currency)}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="mt-6 border-t border-neutral-200 pt-4">
              <div className="flex items-center justify-between">
                <span className="text-sm uppercase tracking-widest text-neutral-600">Subtotal</span>
                <span className="text-lg font-light text-black">{formatINR(totals.subtotal, currency)}</span>
              </div>
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

            <form className="space-y-12" onSubmit={(e) => { e.preventDefault(); }}>
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
                      value={form.email}
                      onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                      className="w-full bg-transparent border-b border-neutral-300 py-3 pl-8 text-black placeholder-neutral-400 focus:outline-none focus:border-black transition-colors text-lg"
                    />
                  </div>
                </div>
              </section>

              <section className="space-y-6">
                <h3 className="text-sm font-medium uppercase tracking-widest text-neutral-900 border-b border-neutral-200 pb-2">
                  Shipping Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="relative md:col-span-2 group">
                    <User className="absolute left-0 top-3.5 w-5 h-5 text-neutral-400 group-focus-within:text-black transition-colors" />
                    <input 
                      type="text" 
                      placeholder="First Name"
                      value={form.firstName}
                      onChange={(e) => setForm((f) => ({ ...f, firstName: e.target.value }))}
                      className="w-full bg-transparent border-b border-neutral-300 py-3 pl-8 text-black placeholder-neutral-400 focus:outline-none focus:border-black transition-colors"
                    />
                  </div>
                  <div className="relative md:col-span-2 group">
                    <input 
                      type="text" 
                      placeholder="Last Name"
                      value={form.lastName}
                      onChange={(e) => setForm((f) => ({ ...f, lastName: e.target.value }))}
                      className="w-full bg-transparent border-b border-neutral-300 py-3 text-black placeholder-neutral-400 focus:outline-none focus:border-black transition-colors"
                    />
                  </div>
                  <input 
                    type="tel" 
                    placeholder="Phone"
                    value={form.phone}
                    onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                    className="w-full bg-transparent border-b border-neutral-300 py-3 text-black placeholder-neutral-400 focus:outline-none focus:border-black transition-colors md:col-span-2"
                  />
                  <div className="relative md:col-span-2 group">
                    <MapPin className="absolute left-0 top-3.5 w-5 h-5 text-neutral-400 group-focus-within:text-black transition-colors" />
                    <input 
                      type="text" 
                      placeholder="Address Line 1"
                      value={form.address1}
                      onChange={(e) => setForm((f) => ({ ...f, address1: e.target.value }))}
                      className="w-full bg-transparent border-b border-neutral-300 py-3 pl-8 text-black placeholder-neutral-400 focus:outline-none focus:border-black transition-colors"
                    />
                  </div>
                  <input 
                    type="text" 
                    placeholder="Address Line 2"
                    value={form.address2}
                    onChange={(e) => setForm((f) => ({ ...f, address2: e.target.value }))}
                    className="w-full bg-transparent border-b border-neutral-300 py-3 text-black placeholder-neutral-400 focus:outline-none focus:border-black transition-colors md:col-span-2"
                  />
                  <div className="relative group">
                    <Building2 className="absolute left-0 top-3.5 w-5 h-5 text-neutral-400 group-focus-within:text-black transition-colors" />
                    <input 
                      type="text" 
                      placeholder="City"
                      value={form.city}
                      onChange={(e) => setForm((f) => ({ ...f, city: e.target.value }))}
                      className="w-full bg-transparent border-b border-neutral-300 py-3 pl-8 text-black placeholder-neutral-400 focus:outline-none focus:border-black transition-colors"
                    />
                  </div>
                  <div className="relative group">
                    <input 
                      type="text" 
                      placeholder="State"
                      value={form.state}
                      onChange={(e) => setForm((f) => ({ ...f, state: e.target.value }))}
                      className="w-full bg-transparent border-b border-neutral-300 py-3 text-black placeholder-neutral-400 focus:outline-none focus:border-black transition-colors"
                    />
                  </div>
                  <div className="relative group">
                    <input 
                      type="text" 
                      placeholder="Country"
                      value={form.country}
                      onChange={(e) => setForm((f) => ({ ...f, country: e.target.value }))}
                      className="w-full bg-transparent border-b border-neutral-300 py-3 text-black placeholder-neutral-400 focus:outline-none focus:border-black transition-colors"
                    />
                  </div>
                  <div className="relative group">
                    <Hash className="absolute left-0 top-3.5 w-5 h-5 text-neutral-400 group-focus-within:text-black transition-colors" />
                    <input 
                      type="text" 
                      placeholder="Postal Code"
                      value={form.postalCode}
                      onChange={(e) => setForm((f) => ({ ...f, postalCode: e.target.value }))}
                      className="w-full bg-transparent border-b border-neutral-300 py-3 pl-8 text-black placeholder-neutral-400 focus:outline-none focus:border-black transition-colors"
                    />
                  </div>
                </div>
              </section>

              <section className="bg-neutral-50 rounded-lg p-6 space-y-4 border border-neutral-100">
                <div className="flex justify-between text-sm text-neutral-600">
                  <span>Subtotal</span>
                  <span className="text-black font-medium">{formatINR(totals.subtotal, currency)}</span>
                </div>
                <div className="flex justify-between text-sm text-neutral-600">
                  <span>GST (18%)</span>
                  <span className="text-black font-medium">{formatINR(totals.tax, currency)}</span>
                </div>
                <div className="flex justify-between text-sm text-neutral-600">
                  <span>Shipping</span>
                  <span className="text-green-600 font-medium uppercase text-xs">{totals.shipping === 0 ? "Free" : formatINR(totals.shipping, currency)}</span>
                </div>
                <div className="pt-4 border-t border-neutral-200 flex justify-between items-center">
                  <span className="text-sm uppercase tracking-widest text-black font-semibold">Total</span>
                  <span className="text-xl font-light text-black">{formatINR(totals.total, currency)}</span>
                </div>
              </section>

              <div className="space-y-6">
                <button 
                  type="button"
                  onClick={placeOrder}
                  className="w-full bg-black text-white h-14 uppercase tracking-widest text-sm font-bold hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all"
                >
                  <CreditCard className="w-5 h-5" />
                  Place Order
                </button>
                
                <div className="grid grid-cols-2 gap-4 text-xs text-neutral-500">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-neutral-400" />
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
