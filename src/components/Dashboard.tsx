import React, { useEffect, useState } from "react";
import { type IUrl, type UrlItem } from "../types";
import { Navbar } from "./Navbar";
import { UrlCreationForm } from "./UrlCreationForm";
import { UrlsList } from "./UrlsList";

import { request } from "../utils/axiosUtil";
import { handleAlert } from "../utils/alert/SweeAlert";
import { useNavigate } from "react-router-dom";

interface DashboardProps {
  onLogout: () => void;
  onViewAnalytics: (url: UrlItem) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  onLogout,
  onViewAnalytics,
}) => {
  const [urls, setUrls] = useState<UrlItem[]>([]);
  const [dailyUsage, setDailyUsage] = useState<number>(0);

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const fetchAllUrls: { urls: IUrl[]; dialyLimit: number } =
          await request({ url: "/api/fetch-urls" });
        setUrls(fetchAllUrls.urls);
        setDailyUsage(fetchAllUrls.dialyLimit);
      } catch (error: any) {
        const isCode = parseInt(error.message);
        if (!isNaN(isCode)) {
          localStorage.clear();
          navigate("/");
          handleAlert("error", "session expired");
        } else {
          handleAlert("error", error.message || "internal error");
        }
      }
    })();
  }, []);

  const handleCreateUrl = (newUrl: UrlItem): void => {
    setUrls([newUrl, ...urls]);
    setDailyUsage(dailyUsage + 1);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar dailyUsage={dailyUsage} onLogout={onLogout} />

      <div className="max-w-6xl mx-auto px-4 py-8">
        <UrlCreationForm
          dailyUsage={dailyUsage}
          onCreateUrl={handleCreateUrl}
        />

        <UrlsList urls={urls} onViewAnalytics={onViewAnalytics} />
      </div>
    </div>
  );
};
