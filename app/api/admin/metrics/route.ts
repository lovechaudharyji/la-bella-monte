import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL as string,
  process.env.SUPABASE_SERVICE_ROLE_KEY as string
);

export async function GET() {
  try {
    const start = new Date();
    start.setHours(0, 0, 0, 0);
    const startISO = start.toISOString();

    // Products (active) for stock
    const { data: products, error: productsErr } = await supabase
      .from("products")
      .select("id, stock_quantity, is_active")
      .eq("is_active", true);
    if (productsErr) {
      return NextResponse.json({ error: productsErr.message }, { status: 500 });
    }
    const productsActive = products?.length ?? 0;
    const stockTotal = (products || []).reduce((sum, p: any) => sum + (Number(p.stock_quantity || 0)), 0);

    // Inquiries
    const { count: inquiriesTotal, error: inquiriesErr } = await supabase
      .from("inquiries")
      .select("*", { count: "exact", head: true });
    if (inquiriesErr) {
      return NextResponse.json({ error: inquiriesErr.message }, { status: 500 });
    }
    const { count: inquiriesToday, error: inquiriesTodayErr } = await supabase
      .from("inquiries")
      .select("*", { count: "exact", head: true })
      .gte("created_at", startISO);
    if (inquiriesTodayErr) {
      return NextResponse.json({ error: inquiriesTodayErr.message }, { status: 500 });
    }

    // Orders today
    const { count: ordersToday, error: ordersTodayErr } = await supabase
      .from("orders")
      .select("*", { count: "exact", head: true })
      .gte("created_at", startISO);
    if (ordersTodayErr) {
      return NextResponse.json({ error: ordersTodayErr.message }, { status: 500 });
    }

    // Watches sold today (sum of quantities in order_items today)
    const { data: itemsToday, error: itemsErr } = await supabase
      .from("order_items")
      .select("quantity, created_at")
      .gte("created_at", startISO);
    if (itemsErr) {
      return NextResponse.json({ error: itemsErr.message }, { status: 500 });
    }
    const soldToday = (itemsToday || []).reduce((sum, it: any) => sum + Number(it.quantity || 0), 0);

    return NextResponse.json({
      productsActive,
      stockTotal,
      inquiriesTotal: inquiriesTotal || 0,
      inquiriesToday: inquiriesToday || 0,
      ordersToday: ordersToday || 0,
      soldToday,
    });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Server error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

