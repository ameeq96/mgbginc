"use client";

import { Loader2, LockKeyhole } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function LoginForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    const formData = new FormData(event.currentTarget);
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(Object.fromEntries(formData))
    });
    const data = await response.json().catch(() => ({}));
    setLoading(false);
    if (!response.ok) {
      setError(data.error || "Unable to sign in.");
      return;
    }
    router.replace("/admin");
    router.refresh();
  }

  return (
    <form onSubmit={submit} className="w-full max-w-md rounded-lg border border-white/10 bg-white p-8 shadow-soft">
      <div className="grid h-12 w-12 place-items-center rounded-2xl bg-teal/10 text-teal">
        <LockKeyhole className="h-5 w-5" />
      </div>
      <h1 className="mt-6 text-3xl font-semibold text-ink">Admin Login</h1>
      <p className="mt-2 text-sm leading-6 text-slate-600">
        Manage MGBG website content, inquiries, bookings, media, SEO, and pages.
      </p>
      <div className="mt-8 grid gap-4">
        <label className="grid gap-2 text-sm font-medium text-slate-700">
          Email
          <input
            name="email"
            type="email"
            required
            className="focus-ring min-h-12 rounded-lg border border-slate-200 px-4 text-ink"
            placeholder="admin@mgbginc.com"
          />
        </label>
        <label className="grid gap-2 text-sm font-medium text-slate-700">
          Password
          <input
            name="password"
            type="password"
            required
            className="focus-ring min-h-12 rounded-lg border border-slate-200 px-4 text-ink"
            placeholder="••••••••"
          />
        </label>
      </div>
      {error ? <p className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p> : null}
      <button
        type="submit"
        disabled={loading}
        className="focus-ring mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-teal px-6 text-sm font-semibold text-white transition hover:bg-tealDark disabled:opacity-70"
      >
        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <LockKeyhole className="h-4 w-4" />}
        {loading ? "Signing in" : "Sign in"}
      </button>
    </form>
  );
}
