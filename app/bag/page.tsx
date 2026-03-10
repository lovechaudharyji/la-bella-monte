"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2, Plus, Minus, ArrowLeft, ShoppingBag } from "lucide-react";
import FooterSection from "../../components/sections/FooterSection";
import { CartItem, getCart, setCart, removeFromCart, setQuantity, computeTotals } from "../../lib/cart";

function formatINR(value: number, currency?: string | null) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: currency || "INR",
    maximumFractionDigits: 0
  }).format(value);
}

export default function BagPage() {
  const router = useRouter();
  const [items, setItems] = useState<CartItem[]>(() => getCart());

  const totals = useMemo(() => computeTotals(items), [items]);
  const currency = items[0]?.currency || "INR";

  const updateQty = (id: string, q: number) => {
    setQuantity(id, q);
    setItems(getCart());
  };

  const remove = (id: string) => {
    removeFromCart(id);
    setItems(getCart());
  };

  return (
    <div className="min-h-screen bg-white text-black">
      <div className="max-w-6xl mx-auto px-6 md:px-20 py-12 md:py-16">
        <div className="mb-8 flex items-center justify-between">
          <Link href="/men" className="flex items-center gap-2 text-sm uppercase tracking-widest text-neutral-500 hover:text-black transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back
          </Link>
          <div className="text-xl font-suave tracking-normal">Your Bag</div>
        </div>

        {items.length === 0 ? (
          <div className="text-center py-24">
            <div className="text-2xl mb-4">Your bag is empty</div>
            <Link href="/men" className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 uppercase tracking-widest text-xs font-bold">
              <ShoppingBag className="w-4 h-4" />
              Shop Men
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 space-y-6">
              {items.map((it) => (
                <div key={it.product_id} className="flex items-center gap-6 p-4 border border-neutral-200 rounded-lg">
                  <div className="relative w-24 h-24 bg-neutral-50 rounded">
                    <Image
                      src={it.image_url || "/image/daytona.png"}
                      alt={it.name}
                      fill
                      className="object-contain"
                      sizes="96px"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">{it.name}</div>
                    <div className="text-sm text-neutral-600 mt-1">{formatINR(it.price_minor, it.currency)}</div>
                    <div className="mt-3 flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => updateQty(it.product_id, Math.max(1, it.quantity - 1))}
                        className="w-8 h-8 flex items-center justify-center border border-neutral-300 rounded hover:bg-neutral-50"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <div className="w-12 text-center">{it.quantity}</div>
                      <button
                        type="button"
                        onClick={() => updateQty(it.product_id, it.quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center border border-neutral-300 rounded hover:bg-neutral-50"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => remove(it.product_id)}
                        className="ml-4 text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">{formatINR(it.price_minor * it.quantity, it.currency)}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-4">
              <div className="border border-neutral-200 rounded-lg p-6 bg-neutral-50">
                <div className="flex justify-between text-sm text-neutral-600">
                  <span>Subtotal</span>
                  <span className="text-black font-medium">{formatINR(totals.subtotal, currency)}</span>
                </div>
                <div className="flex justify-between text-sm text-neutral-600 mt-2">
                  <span>GST (18%)</span>
                  <span className="text-black font-medium">{formatINR(totals.tax, currency)}</span>
                </div>
                <div className="flex justify-between text-sm text-neutral-600 mt-2">
                  <span>Shipping</span>
                  <span className="text-green-600 font-medium uppercase text-xs">{totals.shipping === 0 ? "Free" : formatINR(totals.shipping, currency)}</span>
                </div>
                <div className="pt-4 mt-4 border-t border-neutral-200 flex justify-between items-center">
                  <span className="text-sm uppercase tracking-widest text-black font-semibold">Total</span>
                  <span className="text-xl font-light text-black">{formatINR(totals.total, currency)}</span>
                </div>
                <button
                  type="button"
                  onClick={() => router.push("/checkout")}
                  className="mt-6 w-full bg-black text-white h-12 uppercase tracking-widest text-sm font-bold hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2"
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <FooterSection />
    </div>
  );
}
