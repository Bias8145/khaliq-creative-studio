-- Enable RLS on objects if not already enabled
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Create the images bucket if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('images', 'images', true)
ON CONFLICT (id) DO UPDATE
SET public = true;

-- Drop existing policies to avoid conflicts
DROP POLICY IF EXISTS "Public Access" ON storage.objects;
DROP POLICY IF EXISTS "Allow Public Uploads" ON storage.objects;
DROP POLICY IF EXISTS "Allow Public Updates" ON storage.objects;
DROP POLICY IF EXISTS "Allow Public Deletes" ON storage.objects;
DROP POLICY IF EXISTS "Give me access" ON storage.objects;

-- Create a comprehensive policy for ALL operations (Select, Insert, Update, Delete)
-- This allows anyone (anon key) to perform any action on the 'images' bucket
CREATE POLICY "Public Access"
ON storage.objects FOR ALL
TO public
USING ( bucket_id = 'images' )
WITH CHECK ( bucket_id = 'images' );
