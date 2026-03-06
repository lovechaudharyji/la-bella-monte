"use client";

import Link from "next/link";

export default function FooterSection() {
  return (
    <footer className="relative z-[60] w-full bg-black px-10 py-20 text-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 md:flex-row md:justify-between">
        <div className="flex flex-col gap-4">
          <div className="text-4xl font-suave font-normal tracking-normal uppercase">
            LA BELLA MONTE
          </div>
          <p className="max-w-xs text-sm text-neutral-400 font-sans tracking-wide">
            Elevating timekeeping to an art form. Swiss precision meets Italian elegance.
          </p>
        </div>

        <div className="flex flex-wrap gap-20">
          <div className="flex flex-col gap-4">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-neutral-500">
              Collections
            </h3>
            <ul className="flex flex-col gap-2 text-sm font-light tracking-wide text-neutral-300">
              <li>
                <Link href="/watches/daytona" className="hover:text-white transition-colors">
                  LBM Obsidian Moon
                </Link>
              </li>
              <li>
                <Link href="/watches/spirit" className="hover:text-white transition-colors">
                  LBM Velaris
                </Link>
              </li>
              <li>
                <Link href="/watches/phantom" className="hover:text-white transition-colors">
                  LBM Etna Rosso
                </Link>
              </li>
              <li>
                <Link href="/watches/royale" className="hover:text-white transition-colors">
                  LBM Solar Monarch – Gold
                </Link>
              </li>
              <li>
                <Link href="/watches/yellow" className="hover:text-white transition-colors">
                  LBM Sole Edition
                </Link>
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-neutral-500">
              Legal
            </h3>
            <ul className="flex flex-col gap-2 text-sm font-light tracking-wide text-neutral-300">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-20 flex max-w-7xl flex-col items-center justify-between gap-4 border-t border-white/10 pt-10 text-xs font-light tracking-wider text-neutral-500 md:flex-row">
        <p>&copy; {new Date().getFullYear()} LA BELLA MONTE. All rights reserved.</p>
        <div className="flex gap-6 uppercase tracking-widest">
          <a href="#" className="hover:text-white transition-colors">
            Instagram
          </a>
          <a href="#" className="hover:text-white transition-colors">
            Twitter
          </a>
          <a href="#" className="hover:text-white transition-colors">
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}

