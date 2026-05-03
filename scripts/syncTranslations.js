import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const translationsPath = path.join(__dirname, '../src/translations/index.ts');

async function syncTranslations() {
  const supabaseUrl = process.env.VITE_SUPABASE_URL;
  const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.error('Error: VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY must be set');
    process.exit(1);
  }

  try {
    // Dynamic import of translations
    const translationsModule = await import(translationsPath, { assert: { type: 'json' } }).catch(() => null);

    if (!translationsModule) {
      console.error('Failed to load translations file');
      process.exit(1);
    }

    const translations = translationsModule.translations;

    console.log('Syncing translations to Supabase...\n');

    const apiUrl = `${supabaseUrl}/functions/v1/sync-translations`;
    const headers = {
      'Authorization': `Bearer ${supabaseKey}`,
      'Content-Type': 'application/json',
    };

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify({ translations }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error(`Sync failed: ${response.status} - ${error}`);
      process.exit(1);
    }

    const result = await response.json();

    console.log('=== SYNC COMPLETE ===\n');
    console.log(`Keys created: ${result.keysCreated}`);
    console.log(`Keys updated: ${result.keysUpdated}`);
    console.log(`Translations created: ${result.translationsCreated}`);
    console.log(`Translations updated: ${result.translationsUpdated}\n`);

    if (result.errors && result.errors.length > 0) {
      console.log('Errors occurred:');
      result.errors.forEach(err => console.log(`  - ${err}`));
      process.exit(1);
    } else {
      console.log('✓ All translations synced successfully!\n');
      process.exit(0);
    }
  } catch (error) {
    console.error('Unexpected error:', error);
    process.exit(1);
  }
}

syncTranslations();
