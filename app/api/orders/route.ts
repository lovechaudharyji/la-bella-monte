import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL as string,
  process.env.SUPABASE_SERVICE_ROLE_KEY as string
);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const customer = body?.customer;
    const items = body?.items as Array<{
      product_id: string;
      name: string;
      slug?: string | null;
      price_minor: number;
      quantity: number;
      currency?: string | null;
    }>;
    if (!customer || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }
    const subtotal = items.reduce((s, it) => s + Number(it.price_minor || 0) * Number(it.quantity || 1), 0);
    const tax = Math.round(subtotal * 0.18);
    const shipping = 0;
    const total = subtotal + tax + shipping;
    const currency = items[0]?.currency || "INR";

    const { data: order, error: orderErr } = await supabase
      .from("orders")
      .insert({
        customer_name: [customer.first_name || "", customer.last_name || ""].filter(Boolean).join(" ").trim(),
        customer_email: customer.email,
        customer_phone: customer.phone || null,
        shipping_address_line1: customer.address_line1,
        shipping_address_line2: customer.address_line2 || null,
        city: customer.city,
        state: customer.state,
        country: customer.country,
        postal_code: customer.postal_code,
        status: "pending",
        payment_method: "test",
        payment_status: "paid",
        subtotal_minor: subtotal,
        tax_minor: tax,
        shipping_minor: shipping,
        total_minor: total,
        currency,
      })
      .select("id")
      .single();

    if (orderErr || !order?.id) {
      return NextResponse.json({ error: orderErr?.message || "Failed to create order" }, { status: 500 });
    }

    const rows = items.map((it) => ({
      order_id: order.id,
      product_id: it.product_id,
      product_name: it.name,
      product_slug: it.slug || null,
      quantity: it.quantity,
      unit_price_minor: it.price_minor,
      line_total_minor: it.price_minor * it.quantity,
    }));
    const { error: itemsErr } = await supabase.from("order_items").insert(rows);
    if (itemsErr) {
      return NextResponse.json({ error: itemsErr.message }, { status: 500 });
    }
    return NextResponse.json({ id: order.id });
  } catch (e) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
