import React from "react";
import { LoginPage } from "./components/login/LoginPage";
import { Dashboard } from "./components/Dashboard";

import { Routes, Route, useNavigate } from "react-router-dom";
import { ProtectRouteUser, UnProtectRouteUser } from "./utils/routeProtector";
import { enqueueSnackbar } from "notistack";

const App: React.FC = () => {
  const navigate = useNavigate();
  const handleLogout = (): void => {
    localStorage.clear();
    navigate("/");
    enqueueSnackbar("user logged out", {
      variant: "info",
      anchorOrigin: {
        vertical: "bottom",
        horizontal: "right",
      },
    });
  };
  return (
    <Routes>
      <Route element={<UnProtectRouteUser />}>
        <Route path="/" element={<LoginPage />} />
      </Route>
      <Route element={<ProtectRouteUser />}>
        <Route
          path="/dashboard"
          element={
            <Dashboard onLogout={handleLogout} />
          }
        />
      </Route>
    </Routes>
  );

  //   setCurrentPage('dashboard');
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
