"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";
import { Skeleton } from "@/components/ui/Skeleton";
import { FcGoogle } from "react-icons/fc";

interface LoginForm {
  email: string;
  password: string;
}

export default function LoginPage() {
  const router = useRouter();
  const { login, loading } = useAuth();

  const [form, setForm] = useState<LoginForm>({ email: "", password: "" });
  // const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // setLoading(true)
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

    if(loading) return (
      <Skeleton className="h-20 w-2/4" />
    )

  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-md">
        {/* <h1 className="text-2xl font-bold mb-6 text-center">Login</h1> */}

        {error && <p className="text-red-600 mb-4">{error}</p>}
        <button className="mb-4 flex items-center justify-center gap-4 w-full rounded-lg p-4 font-semibold text-xl bg-neutral-900 text-white" onClick={() => {
          window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/api/auth/google`
        }}>
          <span><FcGoogle size={25} /></span>
          <p>Contine with Google</p>
        </button>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border rounded-md"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border rounded-md"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full font-medium py-3 bg-neutral-900 text-white rounded-md"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-sm text-center mt-4">
          Don’t have an account?{" "}
          <Link href="/register" className="text-indigo-600 font-semibold">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
