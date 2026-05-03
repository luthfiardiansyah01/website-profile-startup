import React, { useEffect, useState } from 'react';
import { AlertCircle, CheckCircle, Info, AlertTriangle } from 'lucide-react';
import { validateTranslations, getTranslationStats, getMissingTranslations } from '../../utils/translationValidator';

interface ValidationResult {
  isValid: boolean;
  reports: any[];
  summary: any;
}

export const TranslationDashboard: React.FC = () => {
  const [validation, setValidation] = useState<ValidationResult | null>(null);
  const [stats, setStats] = useState<any>(null);
  const [missingKeys, setMissingKeys] = useState<Record<string, string>>({});

  useEffect(() => {
    const result = validateTranslations();
    setValidation(result);

    const translationStats = getTranslationStats();
    setStats(translationStats);

    const missing = getMissingTranslations();
    setMissingKeys(missing);
  }, []);

  if (!validation || !stats) {
    return <div className="p-4">Loading translation validation...</div>;
  }

  const errorReports = validation.reports.filter(r => r.severity === 'error');
  const warningReports = validation.reports.filter(r => r.severity === 'warning');

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Translation Management Dashboard</h1>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="text-sm font-medium text-blue-900">Total Keys</div>
          <div className="text-2xl font-bold text-blue-600">{stats.totalKeys}</div>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <div className="text-sm font-medium text-green-900">English Coverage</div>
          <div className="text-2xl font-bold text-green-600">{stats.coverage.en}/{stats.totalKeys}</div>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg">
          <div className="text-sm font-medium text-purple-900">Indonesian Completeness</div>
          <div className="text-2xl font-bold text-purple-600">{stats.completeness}%</div>
        </div>
      </div>

      {/* Validation Status */}
      <div className={`p-4 rounded-lg mb-6 flex items-center gap-3 ${validation.isValid ? 'bg-green-50' : 'bg-red-50'}`}>
        {validation.isValid ? (
          <>
            <CheckCircle className="text-green-600" size={24} />
            <div>
              <div className="font-semibold text-green-900">Validation Passed</div>
              <div className="text-sm text-green-700">All translations are consistent</div>
            </div>
          </>
        ) : (
          <>
            <AlertCircle className="text-red-600" size={24} />
            <div>
              <div className="font-semibold text-red-900">Validation Failed</div>
              <div className="text-sm text-red-700">{errorReports.length} error(s) found</div>
            </div>
          </>
        )}
      </div>

      {/* Reports */}
      <div className="space-y-4">
        {errorReports.length > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <AlertCircle className="text-red-600" size={20} />
              <h2 className="font-semibold text-red-900">Errors ({errorReports.length})</h2>
            </div>
            <div className="space-y-2">
              {errorReports.map((report, idx) => (
                <div key={idx} className="bg-white p-3 rounded border-l-4 border-red-500">
                  <div className="font-medium text-red-900">{report.type}</div>
                  {report.details.missingKeys && (
                    <div className="text-sm text-red-700 mt-1">
                      Missing keys: {report.details.missingKeys.slice(0, 5).join(', ')}
                      {report.details.missingKeys.length > 5 && ` +${report.details.missingKeys.length - 5} more`}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {warningReports.length > 0 && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle className="text-yellow-600" size={20} />
              <h2 className="font-semibold text-yellow-900">Warnings ({warningReports.length})</h2>
            </div>
            <div className="space-y-2">
              {warningReports.map((report, idx) => (
                <div key={idx} className="bg-white p-3 rounded border-l-4 border-yellow-500">
                  <div className="font-medium text-yellow-900">{report.type}</div>
                  {report.details.deprecatedKeys && (
                    <div className="text-sm text-yellow-700 mt-1">
                      Deprecated keys: {report.details.deprecatedKeys.slice(0, 5).join(', ')}
                      {report.details.deprecatedKeys.length > 5 && ` +${report.details.deprecatedKeys.length - 5} more`}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Missing Keys Table */}
      {Object.keys(missingKeys).length > 0 && (
        <div className="mt-6 bg-orange-50 border border-orange-200 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-3">
            <Info className="text-orange-600" size={20} />
            <h2 className="font-semibold text-orange-900">Missing Indonesian Translations ({Object.keys(missingKeys).length})</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-orange-100">
                <tr>
                  <th className="px-4 py-2 text-left font-semibold text-orange-900">Key</th>
                  <th className="px-4 py-2 text-left font-semibold text-orange-900">English Text</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(missingKeys)
                  .slice(0, 10)
                  .map(([key, value]) => (
                    <tr key={key} className="border-t border-orange-200 hover:bg-orange-100">
                      <td className="px-4 py-2 font-mono text-xs text-orange-900">{key}</td>
                      <td className="px-4 py-2 text-orange-900">{value}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
            {Object.keys(missingKeys).length > 10 && (
              <div className="text-center py-2 text-sm text-orange-700">
                +{Object.keys(missingKeys).length - 10} more missing translations
              </div>
            )}
          </div>
        </div>
      )}

      {/* CLI Commands */}
      <div className="mt-8 bg-gray-50 border border-gray-200 rounded-lg p-4">
        <h2 className="font-semibold text-gray-900 mb-3">Available Commands</h2>
        <div className="space-y-2 font-mono text-sm bg-gray-900 text-green-400 p-4 rounded overflow-x-auto">
          <div>$ npm run validate:translations</div>
          <div className="text-gray-500">Validate translation consistency</div>
          <div className="mt-3">$ npm run validate:translations:report</div>
          <div className="text-gray-500">Generate detailed translation report</div>
          <div className="mt-3">$ npm run sync:translations</div>
          <div className="text-gray-500">Sync translations to Supabase</div>
        </div>
      </div>
    </div>
  );
};

export default TranslationDashboard;
