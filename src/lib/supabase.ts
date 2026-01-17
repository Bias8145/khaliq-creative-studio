import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Link = {
  id: string;
  created_at: string;
  url: string | null; // Now nullable
  title: string | null;
  description: string | null;
  image_url: string | null; // Can store a single URL or a JSON string of URLs
  category: string;
};
