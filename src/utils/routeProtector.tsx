import { Navigate } from "react-router-dom";
import { useAuth } from "../contexApi";
import type React from "react";

export const ProtectRouteUser: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { authenticated } = useAuth();

  if (!authenticated) return <Navigate to="/" replace/>;
  return children
};

