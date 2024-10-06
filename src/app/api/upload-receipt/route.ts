import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get("receipt") as File;

  if (!file) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
  }

  // Upload file to Supabase storage
  const { data, error } = await supabase.storage
    .from("receipts")
    .upload(`receipts/${file.name}`, file);

  if (error) {
    return NextResponse.json(
      { error: "Failed to upload file" },
      { status: 500 }
    );
  }

  // Get public URL of the uploaded file
  const {
    data: { publicUrl },
  } = supabase.storage.from("receipts").getPublicUrl(`receipts/${file.name}`);

  // Use OpenAI to analyze the receipt
  const response = await openai.chat.completions.create({
    model: "gpt-4-vision-preview",
    messages: [
      {
        role: "user",
        content: [
          {
            type: "text",
            text: "Analyze this receipt and extract the following information: store name, date of purchase, total amount, and a list of items with their quantities and prices.",
          },
          { type: "image_url", image_url: publicUrl },
        ],
      },
    ],
  });

  // Parse the OpenAI response and store the data in Supabase
  // (You'll need to implement this part based on the AI's response format)

  return NextResponse.json({ message: "Receipt processed successfully" });
}
