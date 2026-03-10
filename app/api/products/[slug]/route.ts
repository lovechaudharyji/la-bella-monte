
import { type NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL as string,
  process.env.SUPABASE_SERVICE_ROLE_KEY as string
);

export async function GET(
  _request: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  const { slug } = await context.params;
  const { data, error } = await supabase
    .from("products")
    .select(
      "id,slug,name,tagline,description,price_minor,currency,image_url,color_name,color_hex,hero_bg_image_url,hero_bg_video_url,is_active,movement_type,water_resistance,case_diameter_mm,strap_type,weight_g,product_images(image_url,alt_text,sort_order)"
    )
    .eq("slug", slug)
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 404 });
  }

  return NextResponse.json(data);
}
