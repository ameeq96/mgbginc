"use client";

import { CalendarDays, Loader2, Send } from "lucide-react";
import { useState } from "react";

type FormState = "idle" | "loading" | "success" | "error";

const inputClass =
  "focus-ring min-h-12 w-full rounded-lg border border-slate-200 bg-white px-4 text-sm text-ink shadow-sm transition placeholder:text-slate-400 focus:border-teal";
const textareaClass =
  "focus-ring min-h-36 w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-ink shadow-sm transition placeholder:text-slate-400 focus:border-teal";

export function ContactForm() {
  const [state, setState] = useState<FormState>("idle");
  const [message, setMessage] = useState("");

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    setState("loading");
    setMessage("");
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(Object.fromEntries(formData))
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      setState("error");
      setMessage(data.error || "Unable to send your inquiry.");
      return;
    }
    form.reset();
    setState("success");
    setMessage("Your inquiry has been received. MGBG will follow up soon.");
  }

  return (
    <form onSubmit={submit} className="grid gap-4 rounded-lg border border-slate-200 bg-white p-6 shadow-soft">
      <div className="grid gap-4 md:grid-cols-2">
        <input name="name" required placeholder="Name" className={inputClass} />
        <input name="email" required type="email" placeholder="Email" className={inputClass} />
        <input name="phone" placeholder="Phone" className={inputClass} />
        <input name="company" placeholder="Company" className={inputClass} />
      </div>
      <input name="subject" placeholder="Subject" className={inputClass} />
      <textarea name="message" required placeholder="Tell us what you need help with" className={textareaClass} />
      <SubmitButton state={state} label="Send Inquiry" icon="send" />
      <StatusMessage state={state} message={message} />
    </form>
  );
}

export function ConsultationForm({ services }: { services: string[] }) {
  const [state, setState] = useState<FormState>("idle");
  const [message, setMessage] = useState("");

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    setState("loading");
    setMessage("");
    const response = await fetch("/api/consultation", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(Object.fromEntries(formData))
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      setState("error");
      setMessage(data.error || "Unable to book your consultation.");
      return;
    }
    form.reset();
    setState("success");
    setMessage("Your consultation request is in. MGBG will contact you to confirm the schedule.");
  }

  return (
    <form onSubmit={submit} className="grid gap-4 rounded-lg border border-slate-200 bg-white p-6 shadow-soft">
      <div className="grid gap-4 md:grid-cols-2">
        <input name="name" required placeholder="Name" className={inputClass} />
        <input name="email" required type="email" placeholder="Email" className={inputClass} />
        <input name="phone" placeholder="Phone" className={inputClass} />
        <input name="company" placeholder="Company" className={inputClass} />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <select name="serviceInterest" className={inputClass} defaultValue="">
          <option value="">Service interest</option>
          {services.map((service) => (
            <option key={service} value={service}>
              {service}
            </option>
          ))}
        </select>
        <input name="preferredAt" type="datetime-local" className={inputClass} />
      </div>
      <textarea name="message" required placeholder="Share your goals, timeline, or challenge" className={textareaClass} />
      <SubmitButton state={state} label="Request Consultation" icon="calendar" />
      <StatusMessage state={state} message={message} />
    </form>
  );
}

function SubmitButton({ state, label, icon }: { state: FormState; label: string; icon: "send" | "calendar" }) {
  const Icon = state === "loading" ? Loader2 : icon === "send" ? Send : CalendarDays;
  return (
    <button
      type="submit"
      disabled={state === "loading"}
      className="focus-ring inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-teal px-6 text-sm font-semibold text-white transition hover:bg-tealDark disabled:cursor-not-allowed disabled:opacity-70 sm:w-fit"
    >
      <Icon className={`h-4 w-4 ${state === "loading" ? "animate-spin" : ""}`} />
      {state === "loading" ? "Sending" : label}
    </button>
  );
}

function StatusMessage({ state, message }: { state: FormState; message: string }) {
  if (!message) return null;
  return (
    <p className={`text-sm ${state === "error" ? "text-red-600" : "text-tealDark"}`}>
      {message}
    </p>
  );
}
