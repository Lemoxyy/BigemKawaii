"use client";

import { createClient } from "@supabase/supabase-js";

let supabase = null;

if (typeof window !== "undefined") {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (
    supabaseUrl &&
    supabaseKey &&
    supabaseUrl !== "your_supabase_project_url"
  ) {
    supabase = createClient(supabaseUrl, supabaseKey);
  }
}

export { supabase };
