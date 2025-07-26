import { Outlet,Navigate } from "react-router-dom";
export function ProtectRouteUser(){
  let setIsAuthorised = false;

  const token = localStorage.getItem("userToken");
  if (token && typeof token === "string") {
    setIsAuthorised = true;
  }
  return setIsAuthorised ?<Outlet />:<Navigate to="/"/>;
};
export const UnProtectRouteUser: React.FC = () => {
  let setIsAuthorised = false;

  const token = localStorage.getItem("userToken");
  if (token && typeof token === "string") {
    setIsAuthorised = true;
  }

  return setIsAuthorised ? <Navigate to="/dashboard" /> : <Outlet/>;
};
