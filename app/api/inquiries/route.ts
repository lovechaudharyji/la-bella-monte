import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL as string,
  process.env.SUPABASE_SERVICE_ROLE_KEY as string
);

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Partial<{
      first_name: string;
      last_name?: string | null;
      email: string;
      phone?: string | null;
      message: string;
    }>;

    const first_name = (body.first_name || "").trim();
    const last_name = (body.last_name || "").trim() || null;
    const email = (body.email || "").trim();
    const phone = (body.phone || "").trim() || null;
    const message = (body.message || "").trim();

    if (!first_name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("inquiries")
      .insert([{ first_name, last_name, email, phone, message }])
      .select("id")
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ id: data?.id }, { status: 201 });
  } catch (e) {
    const msg =
      e instanceof Error ? e.message : typeof e === "string" ? e : "Unknown error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

