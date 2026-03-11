"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import FooterSection from "../../components/sections/FooterSection";

function OrderSuccessContent() {
  const params = useSearchParams();
  const id = params.get("order");
  return (
    <div className="min-h-screen bg-white text-black">
      <div className="max-w-3xl mx-auto px-6 md:px-20 py-24 text-center">
        <div className="text-3xl font-suave tracking-normal">Thank you</div>
        <div className="mt-4 text-neutral-600">Your order has been placed successfully.</div>
        {id ? <div className="mt-2 text-sm text-neutral-500">Order ID: {id}</div> : null}
        <div className="mt-8">
          <Link href="/men" className="inline-block bg-black text-white px-6 py-3 uppercase tracking-widest text-xs font-bold">Continue Shopping</Link>
        </div>
      </div>
      <FooterSection />
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white" />}>
      <OrderSuccessContent />
    </Suspense>
  );
}
