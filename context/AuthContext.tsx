// context/AuthContext.tsx
"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { api, apiError } from "@/lib/api";
import { redirect, usePathname } from "next/navigation";
import { LoginCredentials, RegisterCredentials } from "@/types/auth";
import axios from "axios";

type User = {
  id: string;
  name: string;
  email: string;
  role: "client" | "admin";
  image?: string | null;
};

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterCredentials) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();

  const fetchUser = async () => {
    try {
      const res = await api.get("/api/auth/me");
      setUser(res.data.user);
    } catch (err) {
      if (!axios.isAxiosError(err) || err.response?.status !== 401) {
        console.error("Unexpected auth error:", err);
      }
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials: LoginCredentials) => {
    try {
      await api.post("/api/auth/login", credentials);
      await fetchUser();
    } catch (error) {
      throw apiError(error);
    }
  };

  const register = async (data: RegisterCredentials) => {
    try {
      await api.post("/api/auth/register", data);
      await fetchUser();
    } catch (error) {
      throw apiError(error);
    }
  };

  const logout = async () => {
    await api.post("/api/auth/logout");
    setUser(null);
    redirect("/login");
  };

  useEffect(() => {
    const publicRoutes = ["/login", "/register", "/forgot-password"];

    if (publicRoutes.includes(pathname)) {
      setLoading(false);
      return;
    }

    fetchUser();
  }, [pathname]);

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
};
