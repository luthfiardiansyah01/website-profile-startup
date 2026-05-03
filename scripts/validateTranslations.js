import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const translationsPath = path.join(__dirname, '../src/translations/index.ts');

function flattenTranslations(obj, prefix = '') {
  const result = {};

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const value = obj[key];
      const newKey = prefix ? `${prefix}.${key}` : key;

      if (typeof value === 'string') {
        result[newKey] = value;
      } else if (typeof value === 'object' && value !== null) {
        Object.assign(result, flattenTranslations(value, newKey));
      }
    }
  }

  return result;
}

function validateTranslations(translations) {
  const englishFlat = flattenTranslations(translations.en);
  const indonesianFlat = flattenTranslations(translations.id);

  const errors = [];
  const warnings = [];
  const info = [];

  // Check for missing keys in Indonesian
  const missingInIndonesian = [];
  for (const key in englishFlat) {
    if (!(key in indonesianFlat)) {
      missingInIndonesian.push(key);
    }
  }

  if (missingInIndonesian.length > 0) {
    errors.push(`Missing ${missingInIndonesian.length} translations in Indonesian:`);
    missingInIndonesian.forEach(key => {
      errors.push(`  - ${key}: "${englishFlat[key]}"`);
    });
  }

  // Check for deprecated keys
  const deprecatedKeys = [];
  for (const key in indonesianFlat) {
    if (!(key in englishFlat)) {
      deprecatedKeys.push(key);
    }
  }

  if (deprecatedKeys.length > 0) {
    warnings.push(`Found ${deprecatedKeys.length} deprecated keys in Indonesian (not in English):`);
    deprecatedKeys.forEach(key => {
      warnings.push(`  - ${key}`);
    });
  }

  // Check for empty translations
  const emptyEnglish = Object.entries(englishFlat).filter(([_, v]) => !v?.trim());
  const emptyIndonesian = Object.entries(indonesianFlat).filter(([_, v]) => !v?.trim());

  if (emptyEnglish.length > 0) {
    warnings.push(`Found ${emptyEnglish.length} empty English translations:`);
    emptyEnglish.forEach(([key]) => {
      warnings.push(`  - ${key}`);
    });
  }

  if (emptyIndonesian.length > 0) {
    warnings.push(`Found ${emptyIndonesian.length} empty Indonesian translations:`);
    emptyIndonesian.forEach(([key]) => {
      warnings.push(`  - ${key}`);
    });
  }

  info.push(`Total translation keys: ${Object.keys(englishFlat).length}`);
  info.push(`English coverage: ${Object.values(englishFlat).filter(v => v?.trim()).length}/${Object.keys(englishFlat).length}`);
  info.push(`Indonesian coverage: ${Object.values(indonesianFlat).filter(v => v?.trim()).length}/${Object.keys(englishFlat).length}`);
  info.push(`Translation completeness: ${Math.round((Object.keys(indonesianFlat).length / Object.keys(englishFlat).length) * 100)}%`);

  return { errors, warnings, info };
}

// Dynamic import of translations
const translationsModule = await import(translationsPath, { assert: { type: 'json' } }).catch(() => null);

if (!translationsModule) {
  console.error('Failed to load translations file');
  process.exit(1);
}

const translations = translationsModule.translations;
const { errors, warnings, info } = validateTranslations(translations);

console.log('\n=== TRANSLATION VALIDATION REPORT ===\n');

if (info.length > 0) {
  console.log('INFO:');
  info.forEach(msg => console.log(`  ✓ ${msg}`));
  console.log();
}

if (warnings.length > 0) {
  console.log('WARNINGS:');
  warnings.forEach(msg => console.log(`  ⚠ ${msg}`));
  console.log();
}

if (errors.length > 0) {
  console.log('ERRORS:');
  errors.forEach(msg => console.log(`  ✗ ${msg}`));
  console.log();
  process.exit(1);
} else {
  console.log('✓ All translations are valid!\n');
  process.exit(0);
}
