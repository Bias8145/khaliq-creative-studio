-- Fix Storage RLS Policies for 'images' bucket

-- 1. Drop existing policies to avoid conflicts
DROP POLICY IF EXISTS "Public Access" ON storage.objects;
DROP POLICY IF EXISTS "Public Upload" ON storage.objects;
DROP POLICY IF EXISTS "Public Update" ON storage.objects;
DROP POLICY IF EXISTS "Public Delete" ON storage.objects;
DROP POLICY IF EXISTS "Allow Public Uploads" ON storage.objects;
DROP POLICY IF EXISTS "Allow Public Updates" ON storage.objects;
DROP POLICY IF EXISTS "Allow Public Deletes" ON storage.objects;

-- 2. Create comprehensive policies for the 'images' bucket
-- Allow public read access (Viewing)
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
TO public
USING ( bucket_id = 'images' );

-- Allow public insert access (Uploading)
CREATE POLICY "Public Upload"
ON storage.objects FOR INSERT
TO public
WITH CHECK ( bucket_id = 'images' );

-- Allow public update access (Editing)
CREATE POLICY "Public Update"
ON storage.objects FOR UPDATE
TO public
USING ( bucket_id = 'images' );

-- Allow public delete access (Removing)
CREATE POLICY "Public Delete"
ON storage.objects FOR DELETE
TO public
USING ( bucket_id = 'images' );
