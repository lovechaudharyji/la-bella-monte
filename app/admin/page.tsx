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
  const [inquiriesCount, setInquiriesCount] = useState(0);
  const [recentInquiries, setRecentInquiries] = useState<Array<{ id: string; first_name: string; email: string; status: string | null; created_at: string; message?: string }>>([]);
  const [stockTotal, setStockTotal] = useState(0);
  const [soldToday, setSoldToday] = useState(0);
  const [ordersToday, setOrdersToday] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        setLoading(true);
        const [ordersRes, productsRes, inquiriesRes, metricsRes] = await Promise.all([
          fetch("/api/orders", { cache: "no-store" }),
          fetch("/api/products", { cache: "no-store" }),
          fetch("/api/inquiries", { cache: "no-store" }),
          fetch("/api/admin/metrics", { cache: "no-store" }),
        ]);
        if (!ordersRes.ok) throw new Error("Orders API failed");
        if (!inquiriesRes.ok) throw new Error("Inquiries API failed");
        const ordersJson = (await ordersRes.json()) as { count: number; recent: RecentOrder[] };
        const productsJson = (await productsRes.json()) as Array<unknown>;
        const inquiriesJson = (await inquiriesRes.json()) as { count: number; recent: Array<{ id: string; first_name: string; email: string; status: string | null; created_at: string; message?: string }> };
        const metricsJson = (await metricsRes.json()) as Partial<{ productsActive: number; stockTotal: number; inquiriesTotal: number; soldToday: number; ordersToday: number }>;
        if (!cancelled) {
          setOrdersCount(ordersJson.count || 0);
          setProductsCount(Array.isArray(productsJson) ? productsJson.length : 0);
          setRecentOrders(Array.isArray(ordersJson.recent) ? ordersJson.recent : []);
          setInquiriesCount(inquiriesJson?.count || 0);
          setRecentInquiries(Array.isArray(inquiriesJson?.recent) ? inquiriesJson.recent : []);
          setStockTotal(Number(metricsJson?.stockTotal || 0));
          setSoldToday(Number(metricsJson?.soldToday || 0));
          setOrdersToday(Number(metricsJson?.ordersToday || 0));
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

        <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
          <div className="rounded-lg border border-neutral-200 bg-white p-6 shadow-sm">
            <div className="text-xs uppercase tracking-widest text-neutral-500">Total Watches</div>
            <div className="mt-2 text-3xl font-semibold text-neutral-900">{loading ? "—" : productsCount}</div>
          </div>
          <div className="rounded-lg border border-neutral-200 bg-white p-6 shadow-sm">
            <div className="text-xs uppercase tracking-widest text-neutral-500">Stock in Hand</div>
            <div className="mt-2 text-3xl font-semibold text-neutral-900">{loading ? "—" : stockTotal}</div>
          </div>
          <div className="rounded-lg border border-neutral-200 bg-white p-6 shadow-sm">
            <div className="text-xs uppercase tracking-widest text-neutral-500">Inquiries</div>
            <div className="mt-2 text-3xl font-semibold text-neutral-900">{loading ? "—" : inquiriesCount}</div>
          </div>
          <div className="rounded-lg border border-neutral-200 bg-white p-6 shadow-sm">
            <div className="text-xs uppercase tracking-widest text-neutral-500">Orders (Today)</div>
            <div className="mt-2 text-3xl font-semibold text-neutral-900">{loading ? "—" : ordersToday}</div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="rounded-lg border border-neutral-200 bg-white p-6 shadow-sm">
            <div className="text-xs uppercase tracking-widest text-neutral-500">Watches Sold Today</div>
            <div className="mt-2 text-3xl font-semibold text-neutral-900">{loading ? "—" : soldToday}</div>
          </div>
          <div className="rounded-lg border border-neutral-200 bg-white p-6 shadow-sm md:col-span-2">
            <div className="text-xs uppercase tracking-widest text-neutral-500">Total Orders</div>
            <div className="mt-2 text-3xl font-semibold text-neutral-900">{loading ? "—" : ordersCount}</div>
          </div>
        </div>

        {/* Tables */}
        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Recent Orders Table */}
          <div className="rounded-lg border border-neutral-200 bg-white shadow-sm">
            <div className="border-b border-neutral-200 px-6 py-4">
              <div className="text-sm font-semibold uppercase tracking-widest text-neutral-900">Recent Orders</div>
            </div>
            {error ? (
              <div className="px-6 py-8 text-sm text-red-600">{error}</div>
            ) : loading ? (
              <div className="px-6 py-8 text-sm text-neutral-600">Loading…</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-neutral-50 text-neutral-600">
                    <tr className="border-b border-neutral-200">
                      <th className="px-6 py-3 font-medium uppercase tracking-widest text-xs">Order</th>
                      <th className="px-6 py-3 font-medium uppercase tracking-widest text-xs">Date</th>
                      <th className="px-6 py-3 font-medium uppercase tracking-widest text-xs">Status</th>
                      <th className="px-6 py-3 font-medium uppercase tracking-widest text-xs text-right">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentOrders.length === 0 ? (
                      <tr>
                        <td colSpan={4} className="px-6 py-6 text-neutral-500">No orders yet</td>
                      </tr>
                    ) : (
                      recentOrders.map((o) => (
                        <tr key={o.id} className="border-b border-neutral-200">
                          <td className="px-6 py-3 font-mono text-xs">{o.id.slice(0, 8)}…</td>
                          <td className="px-6 py-3">{new Date(o.created_at).toLocaleString()}</td>
                          <td className="px-6 py-3 uppercase tracking-widest text-xs">{o.status || "—"}</td>
                          <td className="px-6 py-3 text-right">{formatINR(o.total_minor, o.currency)}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Recent Inquiries Table */}
          <div className="rounded-lg border border-neutral-200 bg-white shadow-sm">
            <div className="border-b border-neutral-200 px-6 py-4">
              <div className="text-sm font-semibold uppercase tracking-widest text-neutral-900">Recent Inquiries</div>
            </div>
            {error ? (
              <div className="px-6 py-8 text-sm text-red-600">{error}</div>
            ) : loading ? (
              <div className="px-6 py-8 text-sm text-neutral-600">Loading…</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-neutral-50 text-neutral-600">
                    <tr className="border-b border-neutral-200">
                      <th className="px-6 py-3 font-medium uppercase tracking-widest text-xs">Name</th>
                      <th className="px-6 py-3 font-medium uppercase tracking-widest text-xs">Email</th>
                      <th className="px-6 py-3 font-medium uppercase tracking-widest text-xs">Date</th>
                      <th className="px-6 py-3 font-medium uppercase tracking-widest text-xs">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentInquiries.length === 0 ? (
                      <tr>
                        <td colSpan={4} className="px-6 py-6 text-neutral-500">No inquiries yet</td>
                      </tr>
                    ) : (
                      recentInquiries.map((q) => (
                        <tr key={q.id} className="border-b border-neutral-200">
                          <td className="px-6 py-3">{q.first_name}</td>
                          <td className="px-6 py-3">{q.email}</td>
                          <td className="px-6 py-3">{new Date(q.created_at).toLocaleString()}</td>
                          <td className="px-6 py-3 uppercase tracking-widest text-xs">{q.status || "new"}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
