export const prerender = false;

import type { APIRoute } from "astro";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.SUPABASE_URL,
  import.meta.env.SUPABASE_KEY
);

export const GET: APIRoute = async () => {
  try {
    const { data, error } = await supabase.from("referidos").select("*");
    
    if (error) {
      return new Response(JSON.stringify({ error: error.message }), { status: 400 });
    }
    
    return new Response(JSON.stringify(data || []), { status: 200 });
  } catch (err) {
    console.error("GET referidos - exception:", err);
    return new Response(JSON.stringify({ error: "Error interno" }), { status: 500 });
  }
};

export const POST: APIRoute = async ({ request }) => {
  const body = await request.json();
  const { data, error } = await supabase.from("referidos").insert([body]).select();
  if (error) return new Response(JSON.stringify({ error: error.message }), { status: 400 });
  return new Response(JSON.stringify(data), { status: 200 });
};
