import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

interface AuthContextType {
  authenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

// Default values: you can use dummy function for default setter
const AuthContext = createContext<AuthContextType>({
  authenticated: false,
  setIsAuthenticated: () => {}
});

export function AuthenticationContext({ children }: { children: React.ReactNode }) {
  const [authenticated, setIsAuthenticated] = useState(false);

  const checkAuth = async () => {
    try {
        const { data }= await axios.post(`${import.meta.env.VITE_BACKENT_URL}api/generate-newtoken`,{},{headers:{'Content-Type': 'application/json'}, withCredentials: true});
      if (data.success) {
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.log(error)
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ authenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}

// Example hook for usage
export const useAuth = () => useContext(AuthContext);
