import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

export async function GET() {
  // Fetch the user's shopping list
  const { data, error } = await supabase
    .from("shopping_list_items")
    .select("*")
    .order("created_at", { ascending: true });

  if (error) {
    return NextResponse.json(
      { error: "Failed to fetch shopping list" },
      { status: 500 }
    );
  }

  return NextResponse.json({ items: data });
}

export async function PUT(req: NextRequest) {
  const { items } = await req.json();

  // Update the order of items in the database
  const updates = items.map((item: any, index: number) => ({
    id: item.id,
    order: index,
  }));

  const { error } = await supabase
    .from("shopping_list_items")
    .upsert(updates, { onConflict: "id" });

  if (error) {
    return NextResponse.json(
      { error: "Failed to update shopping list order" },
      { status: 500 }
    );
  }

  return NextResponse.json({
    message: "Shopping list order updated successfully",
  });
}
