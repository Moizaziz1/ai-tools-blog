"use client";
import { createContext, useContext, useEffect, useState, ReactNode } from "react";

interface AuthCtx {
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthCtx>({ token: null, login: () => {}, logout: () => {}, isLoading: true });

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("admin_token");
    if (stored) setToken(stored);
    setIsLoading(false);
  }, []);

  const login = (t: string) => { localStorage.setItem("admin_token", t); setToken(t); };
  const logout = () => { localStorage.removeItem("admin_token"); setToken(null); };

  return <AuthContext.Provider value={{ token, login, logout, isLoading }}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
