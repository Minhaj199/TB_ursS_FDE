import React, { useState } from 'react';
import { AlertCircle } from 'lucide-react';
import {type UrlItem } from '../types';
import { urlSchema } from '../utils/validation';

interface UrlCreationFormProps {
  dailyUsage: number;
  onCreateUrl: (url: UrlItem) => void;
}

export const UrlCreationForm: React.FC<UrlCreationFormProps> = ({ dailyUsage, onCreateUrl }) => {
  const [longUrl, setLongUrl] = useState<string>('');
  const [urlError, setUrlError] = useState<string>('');
  const [urlTouched, setUrlTouched] = useState<boolean>(false);

  const generateShortUrl = (): string => {
    return 'ly.sh/' + Math.random().toString(36).substring(2, 8);
  };

  const validateUrl = (url: string): string | null => {
    const result = urlSchema.url.safeParse(url);
    return result.success ? null : result.error!.issues[0].message;
  };

  const handleUrlChange = (value: string): void => {
    setLongUrl(value);
    if (urlError) {
      setUrlError('');
    }
  };

  const handleUrlBlur = (): void => {
    setUrlTouched(true);
    const error = validateUrl(longUrl);
    setUrlError(error || '');
  };

  const handleCreateUrl = (): void => {
    const error = validateUrl(longUrl);
    setUrlError(error || '');
    setUrlTouched(true);
    
    if (error || dailyUsage >= 100) return;

    const newUrl: UrlItem = {
      id: Date.now(),
      longUrl,
      shortUrl: generateShortUrl(),
      clicks: Math.floor(Math.random() * 100),
      createdAt: new Date().toISOString().split('T')[0],
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    };

    onCreateUrl(newUrl);
    setLongUrl('');
    setUrlError('');
    setUrlTouched(false);
  };

  const getUrlInputClassName = (): string => {
    const baseClass = "flex-1 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors";
    if (urlError && urlTouched) {
      return `${baseClass} border-red-300 focus:ring-red-500`;
    }
    return `${baseClass} border-gray-300`;
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Create Short URL</h2>
      <div className="space-y-3">
        <div className="flex gap-4">
          <input
            type="url"
            value={longUrl}
            onChange={(e) => handleUrlChange(e.target.value)}
            onBlur={handleUrlBlur}
            className={getUrlInputClassName()}
            placeholder="Enter your long URL here... (e.g., https://example.com)"
          />
          <button
            onClick={handleCreateUrl}
            disabled={dailyUsage >= 100 || !longUrl || (!!urlError && urlTouched)}
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 disabled:bg-gray-400 transition-colors"
          >
            Shorten
          </button>
        </div>
        {urlError && urlTouched && (
          <div className="flex items-center space-x-1 text-red-600 text-sm">
            <AlertCircle className="h-4 w-4" />
            <span>{urlError}</span>
          </div>
        )}
        {dailyUsage >= 100 && (
          <div className="flex items-center space-x-1 text-red-600 text-sm">
            <AlertCircle className="h-4 w-4" />
            <span>Daily limit reached (100/100)</span>
          </div>
        )}
      </div>
    </div>
  );
};