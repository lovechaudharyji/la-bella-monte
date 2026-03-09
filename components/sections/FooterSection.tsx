"use client";

import Link from "next/link";
import { Mail, Phone, Clock, Instagram, Twitter } from "lucide-react";

export default function FooterSection() {
  return (
    <footer className="relative z-[60] w-full bg-black text-white border-t border-white/10">
      <div className="mx-auto max-w-7xl px-6 md:px-20 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="space-y-4">
            <div className="text-xs tracking-[0.2em] uppercase text-white/70">
              LA BELLA MONTE Watches
            </div>
            <div className="text-2xl md:text-3xl font-sans font-normal tracking-normal uppercase">
              Luxury Of Time
            </div>
            <div className="text-sm text-white/60 leading-relaxed max-w-md">
              Crafted for collectors who value precision, presence, and timeless
              design.
            </div>
          </div>

          <div className="space-y-3">
            <div className="text-xs tracking-[0.2em] uppercase text-white/70">
              Explore
            </div>
            <div className="flex flex-col gap-2 text-sm">
              <Link href="/" className="text-white/80 hover:text-white">
                Home
              </Link>
              <Link href="/men" className="text-white/80 hover:text-white">
                Men
              </Link>
              <Link href="/checkout" className="text-white/80 hover:text-white">
                Checkout
              </Link>
            </div>
          </div>

          <div className="space-y-3">
            <div className="text-xs tracking-[0.2em] uppercase text-white/70">
              Contact
            </div>
            <div className="text-sm text-white/70 space-y-3">
              <a href="mailto:support@labellemonte.com" className="flex items-center gap-3 hover:text-white transition-colors">
                <Mail className="w-4 h-4 text-white/60" />
                <span>support@labellemonte.com</span>
              </a>
              <a href="tel:+919643906583" className="flex items-center gap-3 hover:text-white transition-colors">
                <Phone className="w-4 h-4 text-white/60" />
                <span>+91 9643906583</span>
              </a>
              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-white/60" />
                <span>Mon–Sat · 10:00–18:00</span>
              </div>
              <div className="flex items-center gap-4 pt-2">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram"
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                >
                  <Instagram className="w-4 h-4 text-white" />
                </a>
                <a
                  href="https://x.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="X"
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                >
                  <Twitter className="w-4 h-4 text-white" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col md:flex-row gap-4 md:items-center md:justify-between border-t border-white/10 pt-8 text-xs tracking-[0.2em] uppercase text-white/50">
          <div>© {new Date().getFullYear()} LA BELLA MONTE Watches</div>
          <div className="flex items-center gap-6">
            <Link href="/" className="hover:text-white/80">
              Privacy
            </Link>
            <Link href="/" className="hover:text-white/80">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
