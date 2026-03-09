"use client";

import { Droplets, ShieldCheck, Sun, RefreshCcw, Clock, Shield, MapPin } from "lucide-react";

const FEATURES = [
  { title: "1 Year Warranty", Icon: ShieldCheck },
  { title: "Automatic", Icon: Clock },
  { title: "3 ATM Water Resistance", Icon: Droplets },
  { title: "Glow in Dark", Icon: Sun },
  { title: "6 Months Replacement", Icon: RefreshCcw },
  { title: "Stainless Steel", Icon: Shield },
  { title: "Design in Italy", Icon: MapPin },
];

export default function FeaturesGridSection() {
  return (
    <section className="relative z-[60] w-full bg-white text-black py-24 border-t border-black/10">
      <div className="mx-auto max-w-7xl px-6 md:px-20">
        <div className="text-center mb-16">
          <div className="text-xs tracking-[0.2em] uppercase text-neutral-500">
            Why LA BELLA MONTE
          </div>
          <div className="mx-auto mt-2 h-[2px] w-16 bg-red-600" />
          <h2 className="mt-6 text-3xl md:text-5xl font-sans font-normal tracking-normal uppercase">
            Crafted For Presence
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-8 place-items-center">
          {FEATURES.map(({ title, Icon }) => (
            <div
              key={title}
              className="p-2"
            >
              <div className="flex flex-col items-center gap-3">
                <div className="h-16 w-16 rounded-full bg-neutral-100 flex items-center justify-center">
                  <Icon className="h-8 w-8 md:h-9 md:w-9 text-neutral-900" strokeWidth={1.75} />
                </div>
                <div className="text-sm sm:text-base md:text-lg uppercase tracking-normal text-neutral-900 text-center font-sans">
                  {title}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
