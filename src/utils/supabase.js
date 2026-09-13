import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

const supabaseClient = async (token) => {
  return createClient(supabaseUrl, supabaseKey, {
    accessToken: async () => token,
  });
};

export default supabaseClient;