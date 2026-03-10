"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type RecentOrder = {
  id: string;
  total_minor: number;
  currency: string | null;
  status: string | null;
  created_at: string;
};

function formatINR(value: number, currency?: string | null) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: currency || "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

export default function AdminDashboard() {
  const [ordersCount, setOrdersCount] = useState(0);
  const [productsCount, setProductsCount] = useState(0);
  const [recentOrders, setRecentOrders] = useState<RecentOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        setLoading(true);
        const [ordersRes, productsRes] = await Promise.all([
          fetch("/api/orders", { cache: "no-store" }),
          fetch("/api/products", { cache: "no-store" }),
        ]);
        if (!ordersRes.ok) throw new Error("Orders API failed");
        const ordersJson = (await ordersRes.json()) as { count: number; recent: RecentOrder[] };
        const productsJson = (await productsRes.json()) as Array<unknown>;
        if (!cancelled) {
          setOrdersCount(ordersJson.count || 0);
          setProductsCount(Array.isArray(productsJson) ? productsJson.length : 0);
          setRecentOrders(Array.isArray(ordersJson.recent) ? ordersJson.recent : []);
        }
      } catch (e) {
        if (!cancelled) setError("Failed to load admin data");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <main className="min-h-screen bg-neutral-50">
      <div className="mx-auto max-w-7xl px-4 py-8 md:px-8">
        <div className="mb-8 flex items-baseline justify-between">
          <h1 className="text-xl font-semibold uppercase tracking-[0.25em] text-neutral-900">Admin Dashboard</h1>
          <Link href="/" className="text-xs uppercase tracking-widest text-neutral-600 hover:text-neutral-900">
            Back to site
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="rounded-lg border border-neutral-200 bg-white p-6 shadow-sm">
            <div className="text-xs uppercase tracking-widest text-neutral-500">Total Orders</div>
            <div className="mt-2 text-3xl font-semibold text-neutral-900">{loading ? "—" : ordersCount}</div>
          </div>
          <div className="rounded-lg border border-neutral-200 bg-white p-6 shadow-sm">
            <div className="text-xs uppercase tracking-widest text-neutral-500">Total Watches</div>
            <div className="mt-2 text-3xl font-semibold text-neutral-900">{loading ? "—" : productsCount}</div>
          </div>
        </div>

        <div className="mt-8 rounded-lg border border-neutral-200 bg-white shadow-sm">
          <div className="border-b border-neutral-200 px-6 py-4">
            <div className="text-sm font-semibold uppercase tracking-widest text-neutral-900">Recent Orders</div>
          </div>
          <div className="divide-y divide-neutral-200">
            {error ? (
              <div className="px-6 py-8 text-sm text-red-600">{error}</div>
            ) : loading ? (
              <div className="px-6 py-8 text-sm text-neutral-600">Loading…</div>
            ) : recentOrders.length === 0 ? (
              <div className="px-6 py-8 text-sm text-neutral-600">No orders yet</div>
            ) : (
              recentOrders.map((o) => (
                <div key={o.id} className="flex items-center justify-between px-6 py-4">
                  <div className="min-w-0">
                    <div className="text-xs font-semibold uppercase tracking-widest text-neutral-900">
                      {o.id.slice(0, 8)}…
                    </div>
                    <div className="mt-0.5 text-xs text-neutral-500">
                      {new Date(o.created_at).toLocaleString()}
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-xs uppercase tracking-widest text-neutral-700">
                      {o.status || "—"}
                    </div>
                    <div className="text-sm font-medium text-neutral-900">
                      {formatINR(o.total_minor, o.currency)}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
