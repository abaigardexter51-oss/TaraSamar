import { createClient } from "@supabase/supabase-js";

// Supabase project configuration (from MCP)
const supabaseUrl = "https://xviduagpusgwwieshuut.supabase.co";

// Use the legacy anon key so auth sessions work correctly in the browser.
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh2aWR1YWdwdXNnd3dpZXNodXV0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUzNTAxNDIsImV4cCI6MjA4MDkyNjE0Mn0.h1f2sUap2ARGYSb9IVda-rJwNYWFbwUMF08t-JyJ084";

if (!supabaseUrl || !supabaseAnonKey) {
  // This should never happen in this setup, but provides a clear error during development.
  // eslint-disable-next-line no-console
  console.error("Supabase URL or anon key is missing. Check supabaseClient.ts configuration.");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);


