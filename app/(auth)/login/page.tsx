"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";
import { Skeleton } from "@/components/ui/Skeleton";
import { FcGoogle } from "react-icons/fc";
import { LoginCredentials } from "@/types/auth";
import Image from "next/image";
import image5 from "../../../public/img8.jpg";

export default function LoginPage() {
  const router = useRouter();
  const { login, loading } = useAuth();

  const [form, setForm] = useState<LoginCredentials>({
    email: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      await login(form);
      toast.success("Login successful");
      router.push("/");
    } catch (err: any) {
      const message = err?.message || "Login failed";
      setError(message);
      toast.error(message);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Skeleton className="h-32 w-72 rounded-lg" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      {/* <div className="w-full max-w-3xl overflow-hidden rounded-xl border border-border bg-card shadow-card transition-all duration-500 md:grid md:grid-cols-2"> */}
      <div className="w-full max-w-3xl overflow-hidden rounded-xl shadow-md bg-card shadow-card transition-all duration-500 md:grid md:grid-cols-2">
        
        {/* Image Section */}
        <div className="relative hidden md:block">
          <Image
            src={image5}
            alt="Login"
            width={500}
            height={500}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute bottom-6 left-6 right-6 text-white">
            <h2 className="text-lg font-semibold">Welcome back</h2>
            <p className="text-xs opacity-90">
              Sign in to manage your dashboard
            </p>
          </div>
        </div>

        {/* Form Section */}
        <div className="p-5 sm:p-6">
          <div className="mb-4">
            <h1 className="text-base font-semibold text-foreground">
              Login
            </h1>
            <p className="text-xs text-muted">
              Access your account
            </p>
          </div>

          {error && (
            <p className="mb-3 rounded-md bg-danger/10 px-3 py-2 text-xs text-danger">
              {error}
            </p>
          )}

          <button
            // className="mb-4 flex w-full items-center justify-center gap-2 rounded-md border border-border bg-background px-3 py-2 text-xs font-medium text-foreground transition hover:bg-muted"
            className="mb-4 flex w-full items-center justify-center gap-2 rounded-md bg-background bg-neutral-800 px-3 py-2 text-xs font-medium text-foreground text-white transition hover:bg-muted"
            onClick={() => {
              window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/api/auth/google`;
            }}
          >
            <FcGoogle size={18} />
            Continue with Google
          </button>

          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full rounded-md border-2 border-border bg-background px-3 py-2 text-xs text-foreground placeholder:text-muted focus:outline-none focus:ring-primary"
              // className="w-full rounded-md border border-border bg-background px-3 py-2 text-xs text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary"
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full rounded-md border-2 border-border bg-background px-3 py-2 text-xs text-foreground placeholder:text-muted focus:outline-none focus:ring-primary"
              // className="w-full rounded-md border border-border bg-background px-3 py-2 text-xs text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary"
            />

            <button
              type="submit"
              disabled={loading}
             className="w-full rounded-md bg-primary bg-neutral-800 px-3 py-2 text-xs font-medium text-primaryForeground text-white transition hover:opacity-90"
              // className="w -full rounded-md bg-primary px-3 py-2 text-xs font-medium text-primaryForeground transition hover:opacity-90"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="mt-4 text-center text-[11px] text-muted">
            Don’t have an account?{" "}
            <Link
              href="/register"
              className="font-medium text-primary transition hover:underline"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
