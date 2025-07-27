import React, { useEffect, useState } from "react";
import { type IUrl, type UrlItem, type User } from "../types";
import { Navbar } from "./Navbar";
import { UrlCreationForm } from "./UrlCreationForm";
import { UrlsList } from "./UrlsList";
import { useLocation, useNavigate } from "react-router-dom";
import { enqueueSnackbar } from "notistack";
import { useMutation } from "@tanstack/react-query";
import { createUrl } from "../api";
import { request } from "../utils/axiosUtil";

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

  const location = useLocation();
  const navigate = useNavigate();
  useEffect(()=>{
    (async()=>{
      alert('herer')
      const fetchAllUrls:{urls:IUrl[]}=await request({url:'/api/fetch-urls'})
      console.log(fetchAllUrls)
      setUrls(fetchAllUrls.urls)
    })()
  },[])
  useEffect(()=>{
    console.log(urls)
  },[urls])
  useEffect(() => {
    if (location.state?.loggedIn) {
      enqueueSnackbar("user logged successfully", {
        variant: "success",
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "right",
        },
      });
    }
  }, [location.state]);
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
