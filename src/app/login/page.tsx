"use client";

import Link from "next/link";
import { redirect } from "next/navigation";
import { useState } from "react";

const slug = process.env.NEXT_PUBLIC_SLUG;

export default function LoginCard() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    const resp = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password, slug }),
    });
    if (!resp.ok) {
      console.error("Login failed");
      return;
    }
    redirect("/editor");
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-sm rounded-xl p-6 bg-neutral-900 shadow-md">
        <h1 className="mb-6 text-center text-2xl font-semibold">Sign in</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-200">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-md border px-3 py-2 text-sm outline-none"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-200">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-md border px-3 py-2 text-sm outline-none"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-md py-2 text-sm font-medium text-white bg-indigo-400 cursor-pointer hover:bg-gray-700 transition-colors"
          >
            Login
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-500">
          Don't have an account?{" "}
          <Link href="/register" className="text-gray-200 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
