"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, ShoppingCart } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const isLightPage = pathname === "/checkout" || pathname.startsWith("/watches/");

  return (
    <header className={`fixed left-0 right-0 top-0 z-[100] flex items-center justify-between px-10 py-4 backdrop-blur-md border-b transition-colors duration-300 ${
      isLightPage 
        ? "bg-white/80 border-black/10 text-black" 
        : "bg-black/30 border-white/10 text-white"
    }`}>
      <div className="text-xl font-suave font-normal tracking-normal uppercase">
        <Link href="/">LA BELLA MONTE</Link>
      </div>
      <nav className="hidden items-center gap-10 text-sm tracking-normal uppercase md:flex">
        <Link href="/" className={`transition-colors ${isLightPage ? "hover:text-neutral-600" : "hover:text-yellow-100"}`}>
          Home
        </Link>
        <Link href="/men" className={`transition-colors ${isLightPage ? "hover:text-neutral-600" : "hover:text-yellow-100"}`}>
          Men
        </Link>
        <Link href="/women" className={`transition-colors ${isLightPage ? "hover:text-neutral-600" : "hover:text-yellow-100"}`}>
          Women
        </Link>
        <Link href="/news" className={`transition-colors ${isLightPage ? "hover:text-neutral-600" : "hover:text-yellow-100"}`}>
          News
        </Link>
      </nav>
      <div className="flex items-center gap-6">
        <div className="relative">
          <button className={`flex items-center justify-center transition-colors ${isLightPage ? "text-black hover:text-neutral-600" : "text-white hover:text-gray-300"}`}>
            <Search className="w-5 h-5" />
          </button>
        </div>
        <div className="relative">
          <button className={`flex items-center justify-center transition-colors ${isLightPage ? "text-black hover:text-neutral-600" : "text-white hover:text-gray-300"}`}>
            <ShoppingCart className="w-5 h-5" />
          </button>
          <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-[10px] font-semibold text-white">
            0
          </span>
        </div>
      </div>
    </header>
  );
}
