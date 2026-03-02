import { createClient } from '@supabase/supabase-js'

// IMPORTANT: This file uses the service_role key and must ONLY be used server-side.
// Do not import this file into client-side components.

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
// The user explicitly asked to use SUPABASE_MCP_SECRET_KEY for the service role
const supabaseSecret = process.env.SUPABASE_MCP_SECRET_KEY!

if (!supabaseSecret) {
  throw new Error('Missing SUPABASE_MCP_SECRET_KEY')
}

export const supabaseMCP = createClient(supabaseUrl, supabaseSecret, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
    detectSessionInUrl: false
  },
})
