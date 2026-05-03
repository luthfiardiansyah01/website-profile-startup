import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const translationsPath = path.join(__dirname, '../src/translations/index.ts');
const reportDir = path.join(__dirname, '../translation-reports');

function ensureReportDir() {
  if (!fs.existsSync(reportDir)) {
    fs.mkdirSync(reportDir, { recursive: true });
  }
}

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

function generateReport(translations) {
  const englishFlat = flattenTranslations(translations.en);
  const indonesianFlat = flattenTranslations(translations.id);

  const missingInIndonesian = [];
  const deprecatedKeys = [];
  const emptyEnglish = [];
  const emptyIndonesian = [];

  for (const key in englishFlat) {
    if (!(key in indonesianFlat)) {
      missingInIndonesian.push({ key, english: englishFlat[key] });
    }
    if (!englishFlat[key]?.trim()) {
      emptyEnglish.push(key);
    }
  }

  for (const key in indonesianFlat) {
    if (!(key in englishFlat)) {
      deprecatedKeys.push(key);
    }
    if (!indonesianFlat[key]?.trim()) {
      emptyIndonesian.push(key);
    }
  }

  const report = {
    timestamp: new Date().toISOString(),
    summary: {
      totalKeys: Object.keys(englishFlat).length,
      englishCoverage: Object.values(englishFlat).filter(v => v?.trim()).length,
      indonesianCoverage: Object.values(indonesianFlat).filter(v => v?.trim()).length,
      completeness: Math.round((Object.keys(indonesianFlat).length / Object.keys(englishFlat).length) * 100),
    },
    issues: {
      missingInIndonesian: missingInIndonesian.length,
      deprecatedKeys: deprecatedKeys.length,
      emptyEnglish: emptyEnglish.length,
      emptyIndonesian: emptyIndonesian.length,
    },
    details: {
      missingInIndonesian,
      deprecatedKeys,
      emptyEnglish,
      emptyIndonesian,
    },
  };

  return report;
}

// Dynamic import of translations
const translationsModule = await import(translationsPath, { assert: { type: 'json' } }).catch(() => null);

if (!translationsModule) {
  console.error('Failed to load translations file');
  process.exit(1);
}

ensureReportDir();

const translations = translationsModule.translations;
const report = generateReport(translations);

const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
const reportPath = path.join(reportDir, `translation-report-${timestamp}.json`);

fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));

console.log('\n=== TRANSLATION REPORT GENERATED ===\n');
console.log(`Report saved to: ${reportPath}\n`);
console.log(`Summary:`);
console.log(`  Total keys: ${report.summary.totalKeys}`);
console.log(`  English coverage: ${report.summary.englishCoverage}/${report.summary.totalKeys}`);
console.log(`  Indonesian coverage: ${report.summary.indonesianCoverage}/${report.summary.totalKeys}`);
console.log(`  Completeness: ${report.summary.completeness}%\n`);

console.log(`Issues found:`);
console.log(`  Missing in Indonesian: ${report.issues.missingInIndonesian}`);
console.log(`  Deprecated keys: ${report.issues.deprecatedKeys}`);
console.log(`  Empty English: ${report.issues.emptyEnglish}`);
console.log(`  Empty Indonesian: ${report.issues.emptyIndonesian}\n`);

if (report.details.missingInIndonesian.length > 0) {
  console.log(`Missing Indonesian translations:`);
  report.details.missingInIndonesian.forEach(item => {
    console.log(`  - ${item.key}: "${item.english}"`);
  });
  console.log();
}
