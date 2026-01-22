// context/AuthContext.tsx
"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { api, apiError } from "@/lib/api";
import { redirect } from "next/navigation";


type User = {
  id: string;
  name: string;
  email: string;
  role: "CLIENT" | "ADMIN";
  image?: string | null;
};

const AuthContext = createContext<{
  user: User | null;
  loading: boolean;
  login: (data: any) => Promise<void>;
  register: (data: any) => Promise<void>;
  logout: () => Promise<void>;
} | null>(null);


export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const res = await api.get("/api/auth/me");
      setUser(res.data.user);
    } catch (err) {
      console.error("fetchUser failed:", err);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (data) => {
    try {
      await api.post("/api/auth/login", data);
      await fetchUser();
    } catch (error) {
      throw apiError(error);
    }
  };

  const register = async (data) => {
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
    redirect('/login')
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
