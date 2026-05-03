/*
  # Create Translation Management System

  1. New Tables
    - `translation_keys`: Stores all translation keys from source (English)
      - `id` (uuid, primary key)
      - `key` (text, unique) - translation key path (e.g., "heroTitle")
      - `english_text` (text) - English source text
      - `category` (text) - category for organization
      - `status` (enum) - active, deprecated, pending
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `translation_values`: Stores translated text for each language
      - `id` (uuid, primary key)
      - `translation_key_id` (uuid, foreign key)
      - `language` (text) - language code (e.g., "id", "en")
      - `translated_text` (text) - translated text
      - `is_synced` (boolean) - whether it's synced from file
      - `last_synced_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `translation_reports`: Audit trail and validation reports
      - `id` (uuid, primary key)
      - `report_type` (text) - "missing_keys", "mismatched", "deprecated", "sync"
      - `details` (jsonb) - detailed information
      - `severity` (text) - "error", "warning", "info"
      - `resolved` (boolean)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for reading and managing translations
    - Restrict updates to authenticated users only

  3. Indexes
    - Index on translation_keys(status)
    - Index on translation_values(language)
    - Index on translation_reports(report_type, created_at)
*/

CREATE TABLE IF NOT EXISTS translation_keys (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  key text UNIQUE NOT NULL,
  english_text text NOT NULL,
  category text DEFAULT 'general',
  status text CHECK (status IN ('active', 'deprecated', 'pending')) DEFAULT 'active',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS translation_values (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  translation_key_id uuid NOT NULL REFERENCES translation_keys(id) ON DELETE CASCADE,
  language text NOT NULL,
  translated_text text NOT NULL,
  is_synced boolean DEFAULT false,
  last_synced_at timestamptz,
  updated_at timestamptz DEFAULT now(),
  UNIQUE(translation_key_id, language)
);

CREATE TABLE IF NOT EXISTS translation_reports (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  report_type text NOT NULL,
  details jsonb DEFAULT '{}',
  severity text CHECK (severity IN ('error', 'warning', 'info')) DEFAULT 'info',
  resolved boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE translation_keys ENABLE ROW LEVEL SECURITY;
ALTER TABLE translation_values ENABLE ROW LEVEL SECURITY;
ALTER TABLE translation_reports ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read active translation keys"
  ON translation_keys FOR SELECT
  USING (status = 'active');

CREATE POLICY "Authenticated users can read all translation keys"
  ON translation_keys FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can update translation keys"
  ON translation_keys FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Anyone can read translation values for active keys"
  ON translation_values FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM translation_keys
      WHERE translation_keys.id = translation_values.translation_key_id
      AND translation_keys.status = 'active'
    )
  );

CREATE POLICY "Authenticated users can read all translation values"
  ON translation_values FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can update translation values"
  ON translation_values FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can insert translation values"
  ON translation_values FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Anyone can read translation reports"
  ON translation_reports FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can insert translation reports"
  ON translation_reports FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update translation reports"
  ON translation_reports FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE INDEX idx_translation_keys_status ON translation_keys(status);
CREATE INDEX idx_translation_values_language ON translation_values(language);
CREATE INDEX idx_translation_reports_type_date ON translation_reports(report_type, created_at);
