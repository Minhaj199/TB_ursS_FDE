import React, { useEffect, useState } from "react";
import { type DashboardProps, type IUrl, type UrlsResponse } from "../../types";
import { Navbar } from "../../components/Navbar";
import { UrlCreationForm } from "../../components/UrlCreationForm"; 
import { UrlsList } from "../../components/UrlsList"; 
import { request } from "../../utils/axiosUtil";
import { handleAlert } from "../../utils/alert/SweeAlert";
import { useNavigate } from "react-router-dom";
import { Pagination } from "@mui/material";
import { useQuery } from "@tanstack/react-query";

export const Dashboard: React.FC<DashboardProps> = ({
  onLogout,
  authenticated
}) => {
  useEffect(()=>{
    if(!authenticated){
      navigate('/')
    }
  },[authenticated])
  const [dailyUsage, setDailyUsage] = useState<number>(0);
  const [page, setPage] = useState(1);
  const limit = 4;
  async function fetchUrl(page: number, limit: number): Promise<UrlsResponse> {
    const fetchAllUrls: { urls: IUrl[]; dialyLimit: number; totalUrl: number } =
      await request({ url: `/api/fetch-urls?page=${page}&limit=${limit}`,headers:{'Content-Type':'application/json'},withCredentials:true});
      return fetchAllUrls;
  }
  const { data, isError, error, refetch } = useQuery<UrlsResponse, Error>({
    queryKey: ["urls", page],
    queryFn: () => fetchUrl(page, limit),
  });
  const navigate = useNavigate(); 

  const totalPage = Math.ceil((data?.totalUrl || 0) / limit);

  if (isError) {
    const isCode = parseInt(error.message);
    if (!isNaN(isCode)) {
      localStorage.clear();
      navigate("/");
      handleAlert("error", "session expired");
    } else {
      handleAlert("error", error.message || "internal error");
    }
  }

  const handleCreateUrl = (): void => {
    refetch();
    setDailyUsage((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar dailyUsage={data?.dialyLimit} onLogout={onLogout} />

      <div className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        <UrlCreationForm
          dailyUsage={dailyUsage}
          onCreateUrl={handleCreateUrl}
        />
        <UrlsList urls={data?.urls || []}  />
      </div>
      <div className="w-full pb-6 flex justify-center items-center">
        <Pagination
          onChange={(_e, value) => setPage(value)}
          count={totalPage}
          page={page}
          variant="outlined"
          color="primary"
        />
      </div>
    </div>
  );
};
