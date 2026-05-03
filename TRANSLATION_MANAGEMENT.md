# Translation Management System

A comprehensive automated translation validation and synchronization system for maintaining multilingual content (English & Indonesian).

## System Overview

The translation system provides:
- **Automated validation** of translation consistency
- **Supabase integration** for centralized translation management
- **CLI tools** for validation and synchronization
- **Edge Functions** for serverless translation sync
- **Dashboard component** for monitoring translation health

## Components

### 1. Translation Validation (`src/utils/translationValidator.ts`)

Core validation utilities that detect:
- Missing translations in Indonesian
- Deprecated keys (keys in Indonesian but not English)
- Empty translations
- Translation coverage statistics

**Functions:**
- `validateTranslations()` - Full validation with detailed reports
- `getTranslationStats()` - Translation coverage metrics
- `getMissingTranslations()` - List missing Indonesian translations
- `validateKey(key)` - Check if a key exists
- `exportTranslationsForReview()` - Export all translations for review

### 2. Supabase Integration (`src/utils/supabaseTranslationSync.ts`)

Handles syncing translations to Supabase database.

**Functions:**
- `syncTranslationsToSupabase()` - Sync current translations
- `getTranslationsFromSupabase()` - Retrieve translations from database
- `getValidationReports(limit)` - Fetch validation reports

**Tables:**
- `translation_keys` - Source translation keys
- `translation_values` - Translated values per language
- `translation_reports` - Validation audit trail

### 3. Edge Function (`supabase/functions/sync-translations/`)

Serverless function for handling translation sync requests.

**Endpoints:**
- `POST /sync-translations` - Sync translations data
- `GET /sync-translations` - Retrieve all translations

### 4. CLI Scripts (`scripts/`)

#### `validateTranslations.js`
Validates translation consistency in local files.

```bash
npm run validate:translations
```

Output:
- Lists missing Indonesian translations
- Shows empty translations
- Reports deprecated keys
- Displays coverage statistics

#### `generateTranslationReport.js`
Creates detailed JSON reports for analysis.

```bash
npm run validate:translations:report
```

Creates reports in `translation-reports/` directory with:
- Timestamp
- Summary statistics
- Detailed issue list
- Coverage metrics

#### `syncTranslations.js`
Synchronizes local translations to Supabase.

```bash
npm run sync:translations
```

**Requires environment variables:**
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

Output:
- Keys created/updated
- Translations created/updated
- Error summary

### 5. Dashboard Component (`src/components/admin/TranslationDashboard.tsx`)

Visual dashboard showing:
- Translation statistics
- Validation status
- Error and warning lists
- Missing translations table
- Available CLI commands

## Database Schema

### translation_keys
```sql
- id (uuid, pk)
- key (text, unique) - Translation key path
- english_text (text) - Source English text
- category (text) - Organization category
- status (enum) - active|deprecated|pending
- created_at, updated_at
```

### translation_values
```sql
- id (uuid, pk)
- translation_key_id (uuid, fk)
- language (text) - Language code
- translated_text (text) - Translated content
- is_synced (boolean) - Sync status
- last_synced_at (timestamp)
- updated_at
```

### translation_reports
```sql
- id (uuid, pk)
- report_type (text) - missing_keys|mismatched|deprecated|sync
- details (jsonb) - Issue details
- severity (text) - error|warning|info
- resolved (boolean)
- created_at
```

## Workflow

### Adding New Translations

1. Add English key and text to `src/translations/index.ts` (en object)
2. Add corresponding Indonesian translation to id object
3. Run validation:
   ```bash
   npm run validate:translations
   ```
4. If valid, sync to database:
   ```bash
   npm run sync:translations
   ```

### Fixing Missing Translations

1. Run validation to identify missing keys:
   ```bash
   npm run validate:translations
   ```
2. Add missing Indonesian translations to `src/translations/index.ts`
3. Validate again to confirm fixes
4. Sync to database

### Monitoring Translation Health

1. Generate report:
   ```bash
   npm run validate:translations:report
   ```
2. Review report in `translation-reports/` directory
3. Check dashboard component for visual status

## CI/CD Integration

### GitHub Actions Example

```yaml
name: Translation Validation

on: [push, pull_request]

jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm install
      - run: npm run validate:translations
```

### Pre-commit Hook

Create `.git/hooks/pre-commit`:
```bash
#!/bin/bash
npm run validate:translations
if [ $? -ne 0 ]; then
  echo "Translation validation failed!"
  exit 1
fi
```

## Translation Key Naming Convention

- Use camelCase for keys
- Group related keys with dot notation: `section.subsection.key`
- Examples:
  - `heroTitle`
  - `pricing.pricingRange`
  - `footer.footerCopyright`

## Best Practices

1. **Always validate before committing**
   ```bash
   npm run validate:translations
   ```

2. **Keep translations in sync**
   - Update both English and Indonesian together
   - Never leave translations empty

3. **Review reports regularly**
   - Run `validate:translations:report` weekly
   - Check for deprecated keys
   - Monitor coverage percentage

4. **Use the dashboard**
   - Import `TranslationDashboard` component
   - Display for internal monitoring
   - Identify issues early

5. **Maintain consistency**
   - Use consistent terminology
   - Follow existing translation patterns
   - Keep tone and style consistent

## Troubleshooting

### Validation Fails with Missing Keys

1. Identify missing keys in error message
2. Add Indonesian translations for each missing key
3. Re-run validation

### Sync to Supabase Fails

1. Check environment variables are set
2. Verify Supabase credentials are valid
3. Ensure Edge Function is deployed
4. Check network connectivity

### Translation Not Updating

1. Verify local translations are correct
2. Run sync command again
3. Check Supabase dashboard for data
4. Clear browser cache if needed

## Useful Commands Reference

```bash
# Validate translations locally
npm run validate:translations

# Generate detailed report
npm run validate:translations:report

# Sync to Supabase
npm run sync:translations

# View translation dashboard
# (Import TranslationDashboard component in your app)
```

## Future Enhancements

- [ ] Automated translation using external APIs
- [ ] Translation memory system
- [ ] Multi-language support beyond EN/ID
- [ ] Real-time collaboration features
- [ ] Batch import/export functionality
- [ ] Translation analytics dashboard
- [ ] Automated workflow for adding new languages
