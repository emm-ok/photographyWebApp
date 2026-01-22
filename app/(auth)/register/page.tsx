"use client";

import React, { useState } from "react";
import { registerUser } from "../../../lib/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";
import { FcGoogle } from "react-icons/fc";

export default function RegisterPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { register } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await register(form);
      toast.success("Sign up successful");
      router.replace("/");
    } catch (err: any) {
      const message = err?.message || "Registration failed";
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md  shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Create Account</h1>

        {error && <p className="text-red-500 mb-4">{error}</p>}
        <button
          className="mb-4 flex items-center justify-center gap-4 w-full rounded-lg p-4 font-bold bg-black text-white"
          onClick={() => {
            window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/api/auth/google`;
          }}
        >
          <span>
            <FcGoogle size={25} />
          </span>
          <p>Contine with google</p>
        </button>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border rounded-md"
          />

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
            className="w-full py-3 bg-neutral-800 text-white rounded-md"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <Link href="/login" className="text-indigo-600 font-semibold">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
