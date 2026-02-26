import React from "react";
import Link from "next/link";
import { Search, ShoppingCart } from "lucide-react";

export default function Navbar() {
  return (
    <header className="fixed left-0 right-0 top-0 z-[100] flex items-center justify-between px-10 py-4 bg-black/30 backdrop-blur-md border-b border-white/10 text-white">
      <div className="text-xl font-suave font-normal tracking-normal uppercase">
        <Link href="/">LA BELLA MONTE</Link>
      </div>
      <nav className="hidden items-center gap-10 text-sm tracking-normal uppercase md:flex">
        <Link href="/" className="hover:text-yellow-100 transition-colors">
          Home
        </Link>
        <Link href="/men" className="hover:text-yellow-100 transition-colors">
          Men
        </Link>
        <Link href="/women" className="hover:text-yellow-100 transition-colors">
          Women
        </Link>
        <Link href="/news" className="hover:text-yellow-100 transition-colors">
          News
        </Link>
      </nav>
      <div className="flex items-center gap-6">
        <div className="relative">
          <button className="flex items-center justify-center text-white hover:text-gray-300 transition-colors">
            <Search className="w-5 h-5" />
          </button>
        </div>
        <div className="relative">
          <button className="flex items-center justify-center text-white hover:text-gray-300 transition-colors">
            <ShoppingCart className="w-5 h-5" />
          </button>
          <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-[10px] font-semibold">
            0
          </span>
        </div>
      </div>
    </header>
  );
}
