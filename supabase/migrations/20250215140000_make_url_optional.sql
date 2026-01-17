-- Make the url column optional to support gallery-only projects
ALTER TABLE links ALTER COLUMN url DROP NOT NULL;
