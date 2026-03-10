"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { computeTotals, getCart, removeFromCart, setQuantity, type CartItem } from "@/lib/cart";
import Image from "next/image";
import { CheckCircle2, Info, XCircle, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

function formatINR(value: number, currency?: string | null) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: currency || "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [toasts, setToasts] = useState<
    Array<{ id: number; type?: "success" | "info" | "error"; title?: string; message: string; duration?: number }>
  >([]);

  const refreshCart = () => {
    setCartItems(getCart());
  };

  useEffect(() => {
    const onUpdate = () => setCartItems(getCart());
    const raf = window.requestAnimationFrame(onUpdate);
    window.addEventListener("lbm_cart_updated", onUpdate);
    window.addEventListener("storage", onUpdate);
    const onToast = (e: Event) => {
      const detail = (e as CustomEvent).detail as {
        type?: "success" | "info" | "error";
        title?: string;
        message: string;
        duration?: number;
      } | undefined;
      if (!detail) return;
      const id = Date.now() + Math.random();
      const duration = Math.max(2000, Math.min(detail.duration ?? 4200, 10000));
      setToasts((prev) => [...prev, { id, ...detail, duration }]);
      window.setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, duration);
    };
    window.addEventListener("lbm_toast", onToast as EventListener);
    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener("lbm_cart_updated", onUpdate);
      window.removeEventListener("storage", onUpdate);
      window.removeEventListener("lbm_toast", onToast as EventListener);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const cartCount = useMemo(
    () => cartItems.reduce((sum, it) => sum + Number(it.quantity || 0), 0),
    [cartItems]
  );

  const currency = cartItems[0]?.currency || "INR";
  const totals = useMemo(() => computeTotals(cartItems), [cartItems]);

  return (
    <>
      <header className="sticky top-0 z-[80] w-full border-b border-white/10 bg-black/20 backdrop-blur-lg backdrop-saturate-150">
        <div className="relative mx-auto flex h-16 max-w-7xl items-center px-4 md:px-8 text-white">
          <div className="flex items-center">
            <Link
              href="/"
              className="text-[13px] font-semibold tracking-[0.25em] uppercase hover:text-white/80 transition-colors"
            >
              LA BELLA MONTE
            </Link>
          </div>

          <nav className="pointer-events-auto absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-8 text-[12px] font-semibold tracking-[0.25em] uppercase md:flex">
            <Link href="/" className="hover:text-white/70 transition-colors">
              Home
            </Link>
            <Link href="/men" className="hover:text-white/70 transition-colors">
              Men
            </Link>
            <Link href="/women" className="hover:text-white/70 transition-colors">
              Women
            </Link>
            <Link href="/#news" className="hover:text-white/70 transition-colors">
              News
            </Link>
          </nav>

          <nav className="ml-auto flex items-center gap-4">
            <button
              type="button"
              aria-label="Menu"
              onClick={() => setMobileOpen((v) => !v)}
              className="md:hidden relative inline-flex h-7 w-7 items-center justify-center rounded-full text-white/80 hover:text-white transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
                aria-hidden="true"
              >
                <line x1="4" y1="6" x2="20" y2="6" />
                <line x1="4" y1="12" x2="20" y2="12" />
                <line x1="4" y1="18" x2="20" y2="18" />
              </svg>
            </button>

            <Link
              href="/search"
              aria-label="Search"
              className="relative inline-flex h-7 w-7 items-center justify-center rounded-full text-white/80 hover:text-white transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-4 w-4"
                aria-hidden="true"
              >
                <path d="M21.53 20.47 18 16.94a8.5 8.5 0 1 0-1.06 1.06l3.53 3.53a.75.75 0 1 0 1.06-1.06ZM4.5 10.5a6 6 0 1 1 12 0 6 6 0 0 1-12 0Z" />
              </svg>
            </Link>

            <button
              type="button"
              aria-label="Bag"
              onClick={() => {
                refreshCart();
                setMobileOpen(false);
                setOpen(true);
              }}
              className="hover:text-white/70 transition-colors"
            >
              <span className="relative inline-flex h-7 w-7 items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-4 w-4"
                  aria-hidden="true"
                >
                  <path d="M7.5 6.75A3.75 3.75 0 0 1 11.25 3h1.5A3.75 3.75 0 0 1 16.5 6.75V7.5H19.5a.75.75 0 0 1 .737.62l1.5 9a.75.75 0 0 1-.737.88H3.75a.75.75 0 0 1-.737-.88l1.5-9A.75.75 0 0 1 5.25 7.5H7.5v-.75Zm1.5 0V7.5h6V6.75A2.25 2.25 0 0 0 12.75 4.5h-1.5A2.25 2.25 0 0 0 9 6.75Z" />
                  <path d="M8.25 19.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Zm7.5 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" />
                </svg>
                {cartCount > 0 && (
                  <span className="absolute -right-0.5 -top-0.5 inline-flex h-3 min-w-3 items-center justify-center rounded-full bg-red-600 px-0.5 text-[9px] font-semibold leading-none text-white">
                    {cartCount > 9 ? "9+" : cartCount}
                  </span>
                )}
              </span>
            </button>
          </nav>
        </div>
      </header>

      {mobileOpen && (
        <div
          className="fixed inset-0 z-[85] bg-black/60 md:hidden"
          onClick={() => setMobileOpen(false)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="absolute left-0 right-0 top-16 bg-black/95 backdrop-blur-lg border-b border-white/10 px-6 py-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col gap-5 text-[12px] font-semibold tracking-[0.25em] uppercase text-white">
              <Link href="/" onClick={() => setMobileOpen(false)} className="hover:text-white/70 transition-colors">
                Home
              </Link>
              <Link href="/men" onClick={() => setMobileOpen(false)} className="hover:text-white/70 transition-colors">
                Men
              </Link>
              <Link href="/women" onClick={() => setMobileOpen(false)} className="hover:text-white/70 transition-colors">
                Women
              </Link>
            </div>
          </div>
        </div>
      )}

      {open && (
        <div
          className="fixed inset-0 z-[90] bg-black/50"
          onClick={() => setOpen(false)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="absolute right-0 top-0 h-full w-full max-w-md bg-white text-black shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex h-full flex-col">
              <div className="flex items-center justify-between border-b border-neutral-200 px-5 py-4">
                <div className="text-sm font-semibold uppercase tracking-widest">Checkout</div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="h-8 w-8 rounded-full border border-neutral-200 text-neutral-700 hover:bg-neutral-50"
                  aria-label="Close"
                >
                  ×
                </button>
              </div>

              <div className="flex-1 overflow-auto px-5 py-4">
                {cartItems.length === 0 ? (
                  <div className="py-10 text-center text-sm text-neutral-600">
                    Your bag is empty
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cartItems.map((it) => (
                      <div key={it.product_id} className="flex items-center justify-between gap-4 border border-neutral-200 p-3 rounded">
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="relative h-12 w-12 bg-neutral-50 rounded overflow-hidden flex-shrink-0">
                            <Image
                              src={it.image_url || "/image/daytona.png"}
                              alt={it.name}
                              fill
                              sizes="48px"
                              className="object-contain"
                            />
                          </div>
                          <div className="truncate text-xs font-semibold uppercase tracking-widest">{it.name}</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => {
                              setQuantity(it.product_id, Number(it.quantity || 0) - 1);
                              refreshCart();
                            }}
                            className="h-8 w-8 rounded border border-neutral-300 hover:bg-neutral-100"
                          >
                            -
                          </button>
                          <div className="min-w-8 text-center text-xs font-semibold tracking-widest">
                            {Number(it.quantity || 0)}
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              setQuantity(it.product_id, Number(it.quantity || 0) + 1);
                              refreshCart();
                            }}
                            className="h-8 w-8 rounded border border-neutral-300 hover:bg-neutral-100"
                          >
                            +
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              removeFromCart(it.product_id);
                              refreshCart();
                            }}
                            className="ml-1 h-8 w-8 rounded border border-neutral-300 text-neutral-700 hover:bg-neutral-100"
                            aria-label="Remove"
                          >
                            ×
                          </button>
                          <div className="ml-2 hidden sm:block text-xs text-neutral-600 min-w-[70px] text-right">
                            {formatINR(it.price_minor * (it.quantity || 0), it.currency || currency)}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="border-t border-neutral-200 px-5 py-4">
                <div className="flex items-center justify-between text-xs uppercase tracking-widest text-neutral-600">
                  <span>Total</span>
                  <span className="text-black">{formatINR(totals.total, currency)}</span>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-3">
                  <Link
                    href="/bag"
                    onClick={() => setOpen(false)}
                    className="inline-flex h-11 items-center justify-center border border-black text-xs font-bold uppercase tracking-widest text-black hover:bg-neutral-50"
                  >
                    View Bag
                  </Link>
                  <Link
                    href="/checkout"
                    onClick={() => setOpen(false)}
                    className="inline-flex h-11 items-center justify-center bg-black text-xs font-bold uppercase tracking-widest text-white hover:bg-neutral-800"
                  >
                    Checkout
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div
        className="pointer-events-none fixed right-4 top-20 z-[95] w-[90vw] max-w-sm"
        role="region"
        aria-live="polite"
      >
        <AnimatePresence initial={false}>
          {toasts.map((t) => {
            const Icon = t.type === "error" ? XCircle : t.type === "info" ? Info : CheckCircle2;
            const borderColor =
              t.type === "error"
                ? "border-red-200"
                : t.type === "info"
                ? "border-blue-200"
                : "border-green-200";
            const bgPill =
              t.type === "error"
                ? "bg-red-50"
                : t.type === "info"
                ? "bg-blue-50"
                : "bg-green-50";
            const iconColor =
              t.type === "error"
                ? "text-red-600"
                : t.type === "info"
                ? "text-blue-600"
                : "text-green-600";
            const barColor =
              t.type === "error"
                ? "bg-red-600"
                : t.type === "info"
                ? "bg-blue-600"
                : "bg-green-600";
            return (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, x: 24, scale: 0.98 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 24, scale: 0.98 }}
                transition={{ type: "spring", stiffness: 380, damping: 30, mass: 0.8 }}
                className={`pointer-events-auto mb-2 overflow-hidden rounded-lg border ${borderColor} bg-white shadow-lg shadow-black/10`}
              >
                <div className="flex items-start gap-3 p-4">
                  <div className={`mt-0.5 rounded-full p-1 ${bgPill}`}>
                    <Icon className={`h-4 w-4 ${iconColor}`} />
                  </div>
                  <div className="min-w-0 flex-1">
                    {t.title ? (
                      <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-900">
                        {t.title}
                      </div>
                    ) : null}
                    <div className="mt-0.5 text-sm text-neutral-700">{t.message}</div>
                  </div>
                  <button
                    type="button"
                    aria-label="Dismiss"
                    className="ml-2 rounded p-1 text-neutral-500 hover:bg-neutral-100 hover:text-neutral-800"
                    onClick={() =>
                      setToasts((prev) => prev.filter((x) => x.id !== t.id))
                    }
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
                <div className="h-1 w-full bg-neutral-100">
                  <div
                    className={`h-full ${barColor}`}
                    style={{
                      width: "100%",
                      transition: `width linear ${t.duration ?? 4200}ms`,
                    }}
                    // Trigger width collapse after mount
                    ref={(el) => {
                      if (!el) return;
                      // force reflow then set width to 0 for transition effect
                      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                      el.offsetWidth;
                      el.style.width = "0%";
                    }}
                  />
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </>
  );
}
