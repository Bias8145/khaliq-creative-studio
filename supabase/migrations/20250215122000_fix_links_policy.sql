/*
  # Fix Links Table Policies
  
  ## Query Description:
  This migration safely sets up the links table and its policies.
  It handles cases where the table or policies might already exist from previous failed runs.
  
  ## Metadata:
  - Schema-Category: "Safe"
  - Impact-Level: "Low"
  - Requires-Backup: false
  - Reversible: true
*/

-- Create table if it doesn't exist
create table if not exists public.links (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  url text not null,
  title text,
  description text,
  image_url text,
  category text default 'General'
);

-- Enable RLS (idempotent operation usually, but good to be sure)
alter table public.links enable row level security;

-- Drop policies if they exist to avoid "policy already exists" error
drop policy if exists "Allow public read access" on public.links;
drop policy if exists "Allow public insert access" on public.links;
drop policy if exists "Allow public delete access" on public.links;

-- Recreate policies
create policy "Allow public read access" on public.links for select using (true);
create policy "Allow public insert access" on public.links for insert with check (true);
create policy "Allow public delete access" on public.links for delete using (true);
