import { createBrowserClient } from '@supabase/ssr'

// Create ONE instance and reuse it
let client: ReturnType<typeof createBrowserClient> | null = null;

export function createClient() {
  if (client) return client; // ← return existing instance

  client = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
  )

  return client;
}