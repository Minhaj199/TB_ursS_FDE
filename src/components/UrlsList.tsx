import React from 'react';
import { Eye, Calendar, MousePointer } from 'lucide-react';
import {type UrlItem } from '../types';

interface UrlsListProps {
  urls: UrlItem[];
  onViewAnalytics: (url: UrlItem) => void;
}

export const UrlsList: React.FC<UrlsListProps> = ({ urls, onViewAnalytics }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm">
      <div className="p-6 border-b">
        <h2 className="text-xl font-semibold text-gray-900">Your URLs</h2>
      </div>
      <div className="divide-y">
        {urls.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            No URLs created yet. Create your first short URL above!
          </div>
        ) : (
          urls.map((url) => (
            <div key={url.id} className="p-6 hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <span className="text-lg font-mono text-indigo-600">{url.shortUrl}</span>
                    <button
                      onClick={() => onViewAnalytics(url)}
                      className="flex items-center space-x-1 text-sm text-gray-600 hover:text-indigo-600"
                    >
                      <Eye className="h-4 w-4" />
                      <span>Analytics</span>
                    </button>
                  </div>
                  <p className="text-gray-600 text-sm truncate">{url.longUrl}</p>
                  <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                    <span className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>Expires: {url.expiresAt}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <MousePointer className="h-4 w-4" />
                      <span>{url.clicks} clicks</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
