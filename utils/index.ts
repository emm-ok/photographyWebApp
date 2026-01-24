"use client";

import { useAuth } from "@/context/AuthContext";

export const Initials = (name: string) => {
    const { user } = useAuth();
    
    const initials =
    user?.name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase() ?? "?"
    return initials;
}