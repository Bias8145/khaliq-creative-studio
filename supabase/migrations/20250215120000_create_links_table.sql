/*
  # Create Links Table

  ## Query Description: Creates a table to store link metadata and enables RLS.
  
  ## Metadata:
  - Schema-Category: "Structural"
  - Impact-Level: "Medium"
  - Requires-Backup: false
  - Reversible: true
  
  ## Structure Details:
  - Table: links
  - Columns: id, created_at, url, title, description, image_url, category
*/

create table if not exists public.links (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  url text not null,
  title text,
  description text,
  image_url text,
  category text default 'General'
);

-- Enable RLS
alter table public.links enable row level security;

-- Create policies (Open for demo purposes, restrict in production)
create policy "Allow public read access" 
  on public.links for select 
  using (true);

create policy "Allow public insert access" 
  on public.links for insert 
  with check (true);
  
create policy "Allow public delete access" 
  on public.links for delete 
  using (true);
