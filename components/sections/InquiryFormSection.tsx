"use client";

import { useMemo, useState } from "react";

export default function InquiryFormSection() {
  const [status, setStatus] = useState<"idle" | "sent">("idle");

  const mailtoHref = useMemo(() => {
    const subject = encodeURIComponent("LA BELLA MONTE Watches Inquiry");
    const body = encodeURIComponent(
      "Hi LA BELLA MONTE Team,%0D%0A%0D%0AI'm interested in:%0D%0A%0D%0AName:%0D%0AEmail:%0D%0AMessage:%0D%0A"
    );
    return `mailto:support@labellemonte.com?subject=${subject}&body=${body}`;
  }, []);

  return (
    <section className="relative z-[60] w-full bg-white text-black py-24 border-t border-black/10">
      <div className="mx-auto max-w-7xl px-6 md:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div className="space-y-6">
            <div className="text-xs tracking-[0.2em] uppercase text-neutral-500">
              Inquiry
            </div>
            <h2 className="text-4xl md:text-5xl font-sans font-normal tracking-normal uppercase">
              Speak With Us
            </h2>
            <p className="text-neutral-600 text-sm md:text-base leading-relaxed max-w-xl">
              Tell us which timepiece you’re considering and we’ll help with
              availability, sizing, and delivery.
            </p>

            <div className="flex items-center gap-3 text-xs tracking-[0.2em] uppercase text-neutral-500">
              <div className="h-px w-12 bg-black/20" />
              <div>Reply within 24 hours</div>
            </div>
          </div>

          <div className="border border-black/10 rounded-sm p-6 md:p-8 bg-white shadow-sm">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setStatus("sent");
                window.location.href = mailtoHref;
              }}
              className="grid grid-cols-1 gap-4"
            >
              <input
                required
                name="name"
                placeholder="Name"
                className="h-12 px-4 border border-black/15 outline-none focus:border-black text-sm"
              />
              <input
                required
                type="email"
                name="email"
                placeholder="Email"
                className="h-12 px-4 border border-black/15 outline-none focus:border-black text-sm"
              />
              <textarea
                required
                name="message"
                placeholder="Message"
                rows={5}
                className="px-4 py-3 border border-black/15 outline-none focus:border-black text-sm resize-none"
              />

              <button
                type="submit"
                className="h-12 bg-black text-white uppercase text-xs tracking-[0.2em] hover:bg-neutral-800 transition-colors"
              >
                Send Inquiry
              </button>

              {status === "sent" ? (
                <div className="text-xs tracking-[0.15em] uppercase text-neutral-500">
                  Opening your email client…
                </div>
              ) : null}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

