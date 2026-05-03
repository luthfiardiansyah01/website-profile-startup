import { translations } from '../translations';

export interface TranslationReport {
  type: 'missing_keys' | 'mismatched' | 'deprecated' | 'sync';
  severity: 'error' | 'warning' | 'info';
  details: Record<string, any>;
  timestamp: string;
}

export interface TranslationValidationResult {
  isValid: boolean;
  reports: TranslationReport[];
  summary: {
    totalKeys: number;
    englishKeys: number;
    indonesianKeys: number;
    missingKeys: string[];
    mismatchedLanguages: Record<string, string[]>;
    missingInIndonesian: string[];
  };
}

function flattenTranslations(obj: any, prefix = ''): Record<string, string> {
  const result: Record<string, string> = {};

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

export function validateTranslations(): TranslationValidationResult {
  const reports: TranslationReport[] = [];
  const englishFlat = flattenTranslations(translations.en);
  const indonesianFlat = flattenTranslations(translations.id);

  const summary = {
    totalKeys: Object.keys(englishFlat).length,
    englishKeys: Object.keys(englishFlat).length,
    indonesianKeys: Object.keys(indonesianFlat).length,
    missingKeys: [] as string[],
    mismatchedLanguages: {} as Record<string, string[]>,
    missingInIndonesian: [] as string[],
  };

  // Check for missing keys in Indonesian
  const missingInIndonesian: string[] = [];
  for (const key in englishFlat) {
    if (!(key in indonesianFlat)) {
      missingInIndonesian.push(key);
    }
  }

  if (missingInIndonesian.length > 0) {
    summary.missingInIndonesian = missingInIndonesian;
    reports.push({
      type: 'missing_keys',
      severity: 'error',
      details: { missingKeys: missingInIndonesian, language: 'id' },
      timestamp: new Date().toISOString(),
    });
  }

  // Check for deprecated keys (keys in Indonesian but not in English)
  const deprecatedKeys: string[] = [];
  for (const key in indonesianFlat) {
    if (!(key in englishFlat)) {
      deprecatedKeys.push(key);
    }
  }

  if (deprecatedKeys.length > 0) {
    reports.push({
      type: 'deprecated',
      severity: 'warning',
      details: { deprecatedKeys },
      timestamp: new Date().toISOString(),
    });
  }

  // Check for empty translations
  const emptyTranslations: Record<string, string[]> = {};
  for (const key in englishFlat) {
    if (englishFlat[key]?.trim() === '') {
      if (!emptyTranslations.en) emptyTranslations.en = [];
      emptyTranslations.en.push(key);
    }
  }
  for (const key in indonesianFlat) {
    if (indonesianFlat[key]?.trim() === '') {
      if (!emptyTranslations.id) emptyTranslations.id = [];
      emptyTranslations.id.push(key);
    }
  }

  if (Object.keys(emptyTranslations).length > 0) {
    reports.push({
      type: 'mismatched',
      severity: 'warning',
      details: { emptyTranslations },
      timestamp: new Date().toISOString(),
    });
    summary.mismatchedLanguages = emptyTranslations;
  }

  const isValid = reports.every(r => r.severity !== 'error');

  return {
    isValid,
    reports,
    summary,
  };
}

export function getTranslationStats(): {
  totalKeys: number;
  coverage: { en: number; id: number };
  completeness: number;
} {
  const englishFlat = flattenTranslations(translations.en);
  const indonesianFlat = flattenTranslations(translations.id);
  const totalKeys = Object.keys(englishFlat).length;

  return {
    totalKeys,
    coverage: {
      en: Object.values(englishFlat).filter(v => v?.trim()).length,
      id: Object.values(indonesianFlat).filter(v => v?.trim()).length,
    },
    completeness: Math.round((Object.keys(indonesianFlat).length / totalKeys) * 100),
  };
}

export function getMissingTranslations(): Record<string, string> {
  const englishFlat = flattenTranslations(translations.en);
  const indonesianFlat = flattenTranslations(translations.id);
  const missing: Record<string, string> = {};

  for (const key in englishFlat) {
    if (!(key in indonesianFlat)) {
      missing[key] = englishFlat[key];
    }
  }

  return missing;
}

export function validateKey(key: string): boolean {
  const englishFlat = flattenTranslations(translations.en);
  return key in englishFlat;
}

export function exportTranslationsForReview(): {
  english: Record<string, string>;
  indonesian: Record<string, string>;
  missingInIndonesian: Record<string, string>;
} {
  const englishFlat = flattenTranslations(translations.en);
  const indonesianFlat = flattenTranslations(translations.id);
  const missing: Record<string, string> = {};

  for (const key in englishFlat) {
    if (!(key in indonesianFlat)) {
      missing[key] = englishFlat[key];
    }
  }

  return {
    english: englishFlat,
    indonesian: indonesianFlat,
    missingInIndonesian: missing,
  };
}


export { flattenTranslations }