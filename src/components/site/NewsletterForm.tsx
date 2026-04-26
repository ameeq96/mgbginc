"use client";

import { useState } from "react";
import { Send } from "lucide-react";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setMessage("");
    const response = await fetch("/api/newsletter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email })
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      setStatus("error");
      setMessage(data.error || "Unable to subscribe right now.");
      return;
    }
    setEmail("");
    setStatus("success");
    setMessage("You are subscribed to MGBG updates.");
  }

  return (
    <form onSubmit={submit} className="mt-7 flex flex-col gap-3 sm:flex-row">
      <input
        type="email"
        required
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder="Email address"
        className="focus-ring min-h-12 flex-1 rounded-full border border-white/20 bg-white/10 px-5 text-white placeholder:text-white/[0.52]"
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="focus-ring inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-gold px-6 text-sm font-semibold text-ink transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-70"
      >
        <Send className="h-4 w-4" />
        {status === "loading" ? "Subscribing" : "Subscribe"}
      </button>
      {message ? (
        <p className={`sm:basis-full text-sm ${status === "error" ? "text-red-200" : "text-teal-100"}`}>
          {message}
        </p>
      ) : null}
    </form>
  );
}
