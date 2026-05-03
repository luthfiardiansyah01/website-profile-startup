import { createClient } from '@supabase/supabase-js';
import { translations } from '../translations';
import { validateTranslations, flattenTranslations } from './translationValidator';

const supabaseUrl = process.env.VITE_SUPABASE_URL || '';
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || '';

export interface SyncResult {
  success: boolean;
  keysCreated: number;
  keysUpdated: number;
  translationsCreated: number;
  translationsUpdated: number;
  reportsGenerated: number;
  errors: string[];
}

export async function syncTranslationsToSupabase(): Promise<SyncResult> {
  if (!supabaseUrl || !supabaseKey) {
    return {
      success: false,
      keysCreated: 0,
      keysUpdated: 0,
      translationsCreated: 0,
      translationsUpdated: 0,
      reportsGenerated: 0,
      errors: ['Supabase credentials not configured'],
    };
  }

  const supabase = createClient(supabaseUrl, supabaseKey);
  const result: SyncResult = {
    success: true,
    keysCreated: 0,
    keysUpdated: 0,
    translationsCreated: 0,
    translationsUpdated: 0,
    reportsGenerated: 0,
    errors: [],
  };

  const englishFlat = flattenTranslations(translations.en);
  const indonesianFlat = flattenTranslations(translations.id);

  try {
    // Sync translation keys
    for (const [key, value] of Object.entries(englishFlat)) {
      const category = key.split('.')[0] || 'general';

      const { data: existing, error: fetchError } = await supabase
        .from('translation_keys')
        .select('id')
        .eq('key', key)
        .maybeSingle();

      if (fetchError) {
        result.errors.push(`Error checking key ${key}: ${fetchError.message}`);
        continue;
      }

      if (existing) {
        const { error: updateError } = await supabase
          .from('translation_keys')
          .update({ english_text: value, updated_at: new Date() })
          .eq('id', existing.id);

        if (updateError) {
          result.errors.push(`Error updating key ${key}: ${updateError.message}`);
        } else {
          result.keysUpdated++;
        }
      } else {
        const { error: insertError } = await supabase.from('translation_keys').insert({
          key,
          english_text: value,
          category,
          status: 'active',
        });

        if (insertError) {
          result.errors.push(`Error creating key ${key}: ${insertError.message}`);
        } else {
          result.keysCreated++;
        }
      }
    }

    // Sync translation values
    for (const [key, value] of Object.entries(englishFlat)) {
      const { data: keyData, error: keyError } = await supabase
        .from('translation_keys')
        .select('id')
        .eq('key', key)
        .maybeSingle();

      if (keyError || !keyData) {
        result.errors.push(`Could not find key ${key}`);
        continue;
      }

      // Sync Indonesian translation
      if (indonesianFlat[key]) {
        const { data: existing, error: fetchError } = await supabase
          .from('translation_values')
          .select('id')
          .eq('translation_key_id', keyData.id)
          .eq('language', 'id')
          .maybeSingle();

        if (fetchError) {
          result.errors.push(`Error checking translation ${key} (id): ${fetchError.message}`);
          continue;
        }

        if (existing) {
          const { error: updateError } = await supabase
            .from('translation_values')
            .update({ translated_text: indonesianFlat[key], is_synced: true, last_synced_at: new Date() })
            .eq('id', existing.id);

          if (updateError) {
            result.errors.push(`Error updating translation ${key} (id): ${updateError.message}`);
          } else {
            result.translationsUpdated++;
          }
        } else {
          const { error: insertError } = await supabase.from('translation_values').insert({
            translation_key_id: keyData.id,
            language: 'id',
            translated_text: indonesianFlat[key],
            is_synced: true,
            last_synced_at: new Date(),
          });

          if (insertError) {
            result.errors.push(`Error creating translation ${key} (id): ${insertError.message}`);
          } else {
            result.translationsCreated++;
          }
        }
      }
    }

    // Generate validation report
    const validation = validateTranslations();
    if (!validation.isValid) {
      for (const report of validation.reports) {
        const { error: reportError } = await supabase.from('translation_reports').insert({
          report_type: report.type,
          details: report.details,
          severity: report.severity,
        });

        if (!reportError) {
          result.reportsGenerated++;
        } else {
          result.errors.push(`Error creating report: ${reportError.message}`);
        }
      }
    }

    result.success = result.errors.length === 0;
  } catch (error) {
    result.success = false;
    result.errors.push(`Unexpected error: ${error instanceof Error ? error.message : String(error)}`);
  }

  return result;
}

export async function getTranslationsFromSupabase(): Promise<Record<string, Record<string, string>> | null> {
  if (!supabaseUrl || !supabaseKey) {
    console.error('Supabase credentials not configured');
    return null;
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  try {
    const { data: keys, error: keysError } = await supabase
      .from('translation_keys')
      .select('id, key')
      .eq('status', 'active');

    if (keysError || !keys) {
      console.error('Error fetching translation keys:', keysError);
      return null;
    }

    const result: Record<string, Record<string, string>> = {};

    for (const keyRow of keys) {
      const { data: values, error: valuesError } = await supabase
        .from('translation_values')
        .select('language, translated_text')
        .eq('translation_key_id', keyRow.id);

      if (valuesError) {
        console.error(`Error fetching translations for ${keyRow.key}:`, valuesError);
        continue;
      }

      for (const valueRow of values || []) {
        if (!result[valueRow.language]) {
          result[valueRow.language] = {};
        }
        result[valueRow.language][keyRow.key] = valueRow.translated_text;
      }
    }

    return result;
  } catch (error) {
    console.error('Unexpected error fetching translations:', error);
    return null;
  }
}

export async function getValidationReports(limit = 50): Promise<any[]> {
  if (!supabaseUrl || !supabaseKey) {
    console.error('Supabase credentials not configured');
    return [];
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  try {
    const { data, error } = await supabase
      .from('translation_reports')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) {
      console.error('Error fetching reports:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Unexpected error fetching reports:', error);
    return [];
  }
}
