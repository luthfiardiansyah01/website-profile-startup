/*
  # Fix Translation RLS Security Issues

  1. Add Columns
    - Add `created_by` (uuid) to translation_keys, translation_values, translation_reports
    - Add `is_admin` (boolean) to track admin users in app_metadata

  2. Update RLS Policies
    - Replace "always true" policies with proper ownership checks
    - Implement role-based access control
    - Add support for admin override with proper checks

  3. Security Rules
    - Users can only read public active translations
    - Only creators/admins can update their translations
    - Reports are only readable by admins and creators
    - Insert operations require authentication
    - Delete operations restricted to admins only

  4. Public Access
    - Active translation keys readable by anyone
    - Translation values readable by anyone for active keys
    - Reports NOT readable by unauthenticated users
*/

-- Add created_by columns if they don't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'translation_keys' AND column_name = 'created_by'
  ) THEN
    ALTER TABLE translation_keys ADD COLUMN created_by uuid REFERENCES auth.users(id) ON DELETE CASCADE;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'translation_values' AND column_name = 'created_by'
  ) THEN
    ALTER TABLE translation_values ADD COLUMN created_by uuid REFERENCES auth.users(id) ON DELETE CASCADE;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'translation_reports' AND column_name = 'created_by'
  ) THEN
    ALTER TABLE translation_reports ADD COLUMN created_by uuid REFERENCES auth.users(id) ON DELETE CASCADE;
  END IF;
END $$;

-- Drop existing insecure policies
DROP POLICY IF EXISTS "Authenticated users can update translation keys" ON translation_keys;
DROP POLICY IF EXISTS "Authenticated users can insert translation values" ON translation_values;
DROP POLICY IF EXISTS "Authenticated users can update translation values" ON translation_values;
DROP POLICY IF EXISTS "Authenticated users can insert translation reports" ON translation_reports;
DROP POLICY IF EXISTS "Authenticated users can update translation reports" ON translation_reports;

-- Translation Keys Policies

-- Anyone can read active keys
DROP POLICY IF EXISTS "Anyone can read active translation keys" ON translation_keys;
CREATE POLICY "Anyone can read active translation keys"
  ON translation_keys FOR SELECT
  USING (status = 'active');

-- Authenticated admins can read all keys
DROP POLICY IF EXISTS "Authenticated users can read all translation keys" ON translation_keys;
CREATE POLICY "Authenticated admins can read all translation keys"
  ON translation_keys FOR SELECT
  TO authenticated
  USING ((auth.jwt()->>'app_metadata')::jsonb->>'is_admin' = 'true');

-- Only creators and admins can update keys
DROP POLICY IF EXISTS "Authenticated admins can update translation keys" ON translation_keys;
CREATE POLICY "Only creators and admins can update translation keys"
  ON translation_keys FOR UPDATE
  TO authenticated
  USING (
    created_by = auth.uid() OR
    ((auth.jwt()->>'app_metadata')::jsonb->>'is_admin' = 'true')
  )
  WITH CHECK (
    created_by = auth.uid() OR
    ((auth.jwt()->>'app_metadata')::jsonb->>'is_admin' = 'true')
  );

-- Only authenticated users can insert keys
CREATE POLICY "Authenticated users can insert translation keys"
  ON translation_keys FOR INSERT
  TO authenticated
  WITH CHECK (created_by = auth.uid());

-- Only admins can delete keys
CREATE POLICY "Only admins can delete translation keys"
  ON translation_keys FOR DELETE
  TO authenticated
  USING ((auth.jwt()->>'app_metadata')::jsonb->>'is_admin' = 'true');

-- Translation Values Policies

-- Anyone can read values for active keys
DROP POLICY IF EXISTS "Anyone can read translation values for active keys" ON translation_values;
CREATE POLICY "Anyone can read translation values for active keys"
  ON translation_values FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM translation_keys
      WHERE translation_keys.id = translation_values.translation_key_id
      AND translation_keys.status = 'active'
    )
  );

-- Authenticated admins can read all values
DROP POLICY IF EXISTS "Authenticated users can read all translation values" ON translation_values;
CREATE POLICY "Authenticated admins can read all translation values"
  ON translation_values FOR SELECT
  TO authenticated
  USING (
    ((auth.jwt()->>'app_metadata')::jsonb->>'is_admin' = 'true')
  );

-- Only creators and admins can update values
DROP POLICY IF EXISTS "Authenticated admins can update translation values" ON translation_values;
CREATE POLICY "Only creators and admins can update translation values"
  ON translation_values FOR UPDATE
  TO authenticated
  USING (
    created_by = auth.uid() OR
    ((auth.jwt()->>'app_metadata')::jsonb->>'is_admin' = 'true')
  )
  WITH CHECK (
    created_by = auth.uid() OR
    ((auth.jwt()->>'app_metadata')::jsonb->>'is_admin' = 'true')
  );

-- Only authenticated users can insert values
CREATE POLICY "Authenticated users can insert translation values"
  ON translation_values FOR INSERT
  TO authenticated
  WITH CHECK (created_by = auth.uid());

-- Only admins can delete values
CREATE POLICY "Only admins can delete translation values"
  ON translation_values FOR DELETE
  TO authenticated
  USING ((auth.jwt()->>'app_metadata')::jsonb->>'is_admin' = 'true');

-- Translation Reports Policies

-- Only admins and creators can read reports
DROP POLICY IF EXISTS "Anyone can read translation reports" ON translation_reports;
CREATE POLICY "Only admins and creators can read translation reports"
  ON translation_reports FOR SELECT
  TO authenticated
  USING (
    created_by = auth.uid() OR
    ((auth.jwt()->>'app_metadata')::jsonb->>'is_admin' = 'true')
  );

-- Unauthenticated users cannot read reports
CREATE POLICY "Unauthenticated users cannot read reports"
  ON translation_reports FOR SELECT
  TO anon
  USING (false);

-- Only authenticated users can create reports
DROP POLICY IF EXISTS "Authenticated users can insert translation reports" ON translation_reports;
CREATE POLICY "Authenticated users can create translation reports"
  ON translation_reports FOR INSERT
  TO authenticated
  WITH CHECK (created_by = auth.uid());

-- Only creators and admins can update reports
DROP POLICY IF EXISTS "Authenticated users can update translation reports" ON translation_reports;
CREATE POLICY "Only creators and admins can update translation reports"
  ON translation_reports FOR UPDATE
  TO authenticated
  USING (
    created_by = auth.uid() OR
    ((auth.jwt()->>'app_metadata')::jsonb->>'is_admin' = 'true')
  )
  WITH CHECK (
    created_by = auth.uid() OR
    ((auth.jwt()->>'app_metadata')::jsonb->>'is_admin' = 'true')
  );

-- Only admins can delete reports
CREATE POLICY "Only admins can delete translation reports"
  ON translation_reports FOR DELETE
  TO authenticated
  USING ((auth.jwt()->>'app_metadata')::jsonb->>'is_admin' = 'true');

-- Add indexes for common queries
CREATE INDEX IF NOT EXISTS idx_translation_keys_created_by ON translation_keys(created_by);
CREATE INDEX IF NOT EXISTS idx_translation_values_created_by ON translation_values(created_by);
CREATE INDEX IF NOT EXISTS idx_translation_reports_created_by ON translation_reports(created_by);
