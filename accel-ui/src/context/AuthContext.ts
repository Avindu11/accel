import React,{ createContext, useContext, useEffect, useState } from "react";

type User = {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  admin: {
    id: number;
    userId: number;
    status: number;
  } | null;
  sales_person: {
    id: number;
    userId: number;
    status: number;
  } | null;
};

type AuthContextType = {
  user: User | null;
  accessToken: string | null;
  login: (data: { email: string; password: string }) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("auth");
    if (stored) {
      const parsed = JSON.parse(stored);
      setUser(parsed?.user);
      setAccessToken(parsed?.accessToken);
    }
  }, []);

  async function login(credentials: { email: string; password: string }) {



  }

  function logout() {
    localStorage.removeItem("auth");
    setUser(null);
    setAccessToken(null);
  }

  return (
    <AuthContext.Provider
      value={{ user, accessToken, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};