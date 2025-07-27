import React, { useState } from "react";
import { AlertCircle } from "lucide-react";
import { type UrlItem } from "../types";
import { urlSchema } from "../utils/validation";
import { createUrl } from "../api";
import { enqueueSnackbar } from "notistack";
import type { UrlCreationFormProps } from "../types"; 

export const UrlCreationForm: React.FC<UrlCreationFormProps> = ({
  dailyUsage,
  onCreateUrl,
}) => {
  const [longUrl, setLongUrl] = useState<string>("");
  const [urlError, setUrlError] = useState<string>("");
  const [urlTouched, setUrlTouched] = useState<boolean>(false);
  const dialLimit = import.meta.env.VITE_DAILY_LIMIT;
  const validateUrl = (url: string): string | null => {
    const result = urlSchema.url.safeParse(url);
    return result.success ? null : result.error!.issues[0].message;
  };

  const handleUrlChange = (value: string): void => {
    setLongUrl(value);
    if (urlError) {
      setUrlError("");
    }
  };

  const handleUrlBlur = (): void => {
    setUrlTouched(true);
    const error = validateUrl(longUrl);
    setUrlError(error || "");
  };

  const handleCreateUrl = async (): Promise<void> => {
    try {
      const error = validateUrl(longUrl);
      setUrlError(error || "");
      setUrlTouched(true);
      if (error || dailyUsage >= dialLimit) return;
      const createShortUrl = await createUrl({ url: longUrl as string });
      if (createShortUrl.success) {
        const newUrl: UrlItem = {
          _id: Date.now().toLocaleString(),
          originalUrl: longUrl,
          shortUrl: createShortUrl.shortUrl,
          clicks: 0,
          createdAt: new Date().toISOString().split("T")[0],
          expiresAt: new Date(createShortUrl.expiresAt).toLocaleDateString(),
        };
        onCreateUrl(newUrl);
        setLongUrl("");
        setUrlError("");
        setUrlTouched(false);
        enqueueSnackbar("url created successfully", {
          variant: "success",
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "right",
          },
        });
      }
    } catch (error: any) {
      if (
        "errorType" in error &&
        error["errorType"] === "fieldError" &&
        "result" in error
      ) {
        (error.result as Record<string, string>[]).forEach((element) => {
          Object.values(element).forEach((value) => {
            setUrlError(value);
          });
        });
      } else if (error instanceof Error) {
        enqueueSnackbar(error.message, {
          variant: "error",
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "right",
          },
        });
      }
    }
  };

  const getUrlInputClassName = (): string => {
    const baseClass =
      "flex-1 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors";
    if (urlError && urlTouched) {
      return `${baseClass} border-red-300 focus:ring-red-500`;
    }
    return `${baseClass} border-gray-300`;
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
      <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">
        Create Short URL
      </h2>
      <div className="space-y-3">
        {/* Input + Button Row */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <input
            type="url"
            value={longUrl}
            onChange={(e) => handleUrlChange(e.target.value)}
            onBlur={handleUrlBlur}
            className={`${getUrlInputClassName()} flex-1`}
            placeholder="Enter your long URL here... (e.g., https://example.com)"
          />
          <button
            onClick={handleCreateUrl}
            disabled={
              dailyUsage >= dialLimit || !longUrl || (!!urlError && urlTouched)
            }
            className="w-full sm:w-auto px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 disabled:bg-gray-400 transition-colors"
          >
            Shorten
          </button>
        </div>

        {/* Error Messages */}
        {urlError && urlTouched && (
          <div className="flex items-center space-x-1 text-red-600 text-sm">
            <AlertCircle className="h-4 w-4" />
            <span>{urlError}</span>
          </div>
        )}
        {dailyUsage >= dialLimit && (
          <div className="flex items-center space-x-1 text-red-600 text-sm">
            <AlertCircle className="h-4 w-4" />
            <span>Daily limit reached {`(${dialLimit}/${dialLimit})`}</span>
          </div>
        )}
      </div>
    </div>
  );
};
