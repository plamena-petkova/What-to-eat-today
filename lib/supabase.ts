import { createClient, SupabaseClient } from '@supabase/supabase-js';

/**
 * Safe Supabase client singleton
 * Works on both server and client
 */

// Use NEXT_PUBLIC_* if this client is imported on the frontend
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  throw new Error(
    'Supabase environment variables are not set. ' +
    'Make sure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are in .env.local'
  );
}

// Singleton pattern ensures one client
export const supabase: SupabaseClient = createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);
