import { Calendar, MousePointer } from "lucide-react";
import { type UrlsListProps } from "../types";

export const UrlsList: React.FC<UrlsListProps> = ({
  urls,
}) => {
  const handleUrlClick = async (targetUrl: string) => {
    window.location.href = targetUrl;
  };
  return (
    <div className="bg-white rounded-xl shadow-sm  p-4 sm:p-6 mb-6">
      <div className="p-6 border-b">
        <h2 className="text-xl font-semibold text-gray-900">Your URLs</h2>
      </div>
      <div className="divide-y overflow-hidden">
        {Array.isArray(urls) && urls.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            No URLs created yet. Create your first short URL above!
          </div>
        ) : (
          urls?.map((url) => (
            <div key={url._id} className="p-6 hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2 overflow: hidden;">
                    <span
                      onClick={() => handleUrlClick(url.shortUrl)}
                      className="text-lg font-mono text-indigo-600 cursor-pointer"
                    >
                      {url.shortUrl}
                    </span>
                    <button
                      className="flex items-center space-x-1 text-sm text-gray-600 hover:text-indigo-600"
                    >
                    </button>
                  </div>
                  <p className="text-gray-600 text-sm truncate">
                    {url.originalUrl}
                  </p>
                  <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                    <span className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>
                        Expires: {new Date(url.expiresAt).toLocaleDateString()}
                      </span>
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
