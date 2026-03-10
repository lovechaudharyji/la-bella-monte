"use client";

import { useState } from "react";

export default function InquiryFormSection() {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

  function toast(detail: { type?: "success" | "info" | "error"; title?: string; message: string }) {
    try {
      window.dispatchEvent(new CustomEvent("lbm_toast", { detail }));
    } catch {
      // noop
    }
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.firstName || !form.email || !form.message) {
      toast({ type: "error", title: "Missing fields", message: "Please fill required fields." });
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          first_name: form.firstName,
          last_name: form.lastName || null,
          email: form.email,
          phone: form.phone || null,
          message: form.message,
        }),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(data?.error || "Failed to send inquiry");
      }
      toast({ type: "success", title: "Inquiry Sent", message: "We will get back within 24 hours." });
      setForm({ firstName: "", lastName: "", email: "", phone: "", message: "" });
    } catch (err) {
      toast({ type: "error", title: "Failed", message: err instanceof Error ? err.message : "Try again later." });
    } finally {
      setLoading(false);
    }
  }

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
            <form onSubmit={onSubmit} className="grid grid-cols-1 gap-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  required
                  name="firstName"
                  placeholder="First Name"
                  value={form.firstName}
                  onChange={(e) => setForm((f) => ({ ...f, firstName: e.target.value }))}
                  className="h-12 px-4 border border-black/15 outline-none focus:border-black text-sm"
                />
                <input
                  name="lastName"
                  placeholder="Last Name (optional)"
                  value={form.lastName}
                  onChange={(e) => setForm((f) => ({ ...f, lastName: e.target.value }))}
                  className="h-12 px-4 border border-black/15 outline-none focus:border-black text-sm"
                />
              </div>
              <input
                required
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                className="h-12 px-4 border border-black/15 outline-none focus:border-black text-sm"
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone (optional)"
                value={form.phone}
                onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                className="h-12 px-4 border border-black/15 outline-none focus:border-black text-sm"
              />
              <textarea
                required
                name="message"
                placeholder="Message"
                rows={5}
                value={form.message}
                onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                className="px-4 py-3 border border-black/15 outline-none focus:border-black text-sm resize-none"
              />

              <button
                type="submit"
                disabled={loading}
                className="h-12 bg-black text-white uppercase text-xs tracking-[0.2em] hover:bg-neutral-800 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? "Sending…" : "Send Inquiry"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
