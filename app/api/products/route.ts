import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL as string,
  process.env.SUPABASE_SERVICE_ROLE_KEY as string
);

export async function GET() {
  const { data, error } = await supabase
    .from("products")
    .select(
      "id,slug,name,tagline,description,price_minor,currency,image_url,color_name,color_hex,hero_bg_image_url,hero_bg_video_url,is_active,product_images(image_url,alt_text,sort_order)"
    )
    .eq("is_active", true)
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data);
}
