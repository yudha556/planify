import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL || "";
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY || "";

if (!supabaseUrl || !supabaseServiceKey) {
    console.warn("SUPABASE_URL or SUPABASE_SERVICE_KEY is missing. Supabase features will fail.");
}

// Create Supabase client with Service Role Key (Admin Access)
// This allows the backend to perform actions bypassing RLS (like deducting credits)
export const supabase = createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
        autoRefreshToken: false,
        persistSession: false
    }
});
