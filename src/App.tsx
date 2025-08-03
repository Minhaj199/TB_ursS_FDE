import React from "react";
import { LoginPage } from "./pages/login/LoginPage";
import { Dashboard } from "./pages/dashboard/Dashboard";

import { Routes, Route, useNavigate } from "react-router-dom";
import { ProtectRouteUser } from "./utils/routeProtector";
import { enqueueSnackbar } from "notistack";
import { request } from "./utils/axiosUtil";
import { useAuth } from "./contexApi";

const App: React.FC = () => {
  const navigate = useNavigate();
  const {authenticated,setIsAuthenticated}=useAuth()
  const handleLogout = async(): Promise<void >=> {
    
   const result:{success:boolean}= await request({url:'/api/signout',method:'post',headers:{'Content-Type':'application/json'},withCredentials:true})
   if(result.success){
      enqueueSnackbar("user logged out", {
      variant: "info",
      anchorOrigin: {
        vertical: "bottom",
        horizontal: "right",
      },
    });
    setIsAuthenticated(false)
    navigate("/");
   }
 
  };
  return (
    <Routes>
      
        <Route path="/" element={<LoginPage authenticated={authenticated} />} />
      
      <Route path="/dashboard" element={<ProtectRouteUser><Dashboard authenticated={authenticated} onLogout={handleLogout}/></ProtectRouteUser>} />
    </Routes>
  );

  // };

  // return (
  //   <div>
  //     {currentPage === 'login' && <LoginPage onLogin={handleLogin} />}
  //     {currentPage === 'dashboard' && user && (
  //       <Dashboard
  //         user={user}
  //         onLogout={handleLogout}
  //         onViewAnalytics={handleViewAnalytics}
  //       />
  //     )}
  //     {currentPage === 'analytics' && (
  //       <AnalyticsPage
  //         selectedUrl={selectedUrl}
  //         onBackToDashboard={handleBackToDashboard}
  //       />
  //     )}
  //   </div>
  // );
};

export default App;
