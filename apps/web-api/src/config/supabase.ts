import { createClient } from "@supabase/supabase-js";
import { env } from "./env";

if (!env.supabaseUrl || !env.supabaseServiceRoleKey) {
    console.warn(" Supabase URL or Key is missing. Check .env file.");
}

export const supabase = createClient(
    env.supabaseUrl,
    env.supabaseServiceRoleKey,
    {
        auth: {
            autoRefreshToken: false,
            persistSession: false,
        },
    }
);
