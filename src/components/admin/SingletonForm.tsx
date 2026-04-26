"use client";

import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { MediaPicker } from "@/components/admin/MediaPicker";
import type { AdminField } from "@/types/admin";

type SingletonFormProps = {
  title: string;
  description: string;
  endpoint: string;
  fields: AdminField[];
};

export function SingletonForm({ title, description, endpoint, fields }: SingletonFormProps) {
  const [form, setForm] = useState<Record<string, unknown>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      setLoading(true);
      const response = await fetch(endpoint);
      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        setError(data.error || "Unable to load content.");
        setLoading(false);
        return;
      }
      const next: Record<string, unknown> = {};
      for (const field of fields) {
        next[field.name] = field.type === "checkbox" ? Boolean(data[field.name]) : data[field.name] ?? field.defaultValue ?? "";
      }
      setForm(next);
      setLoading(false);
    }
    void load();
  }, [endpoint, fields]);

  async function save(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setMessage("");
    setError("");
    const response = await fetch(endpoint, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });
    const data = await response.json().catch(() => ({}));
    setSaving(false);
    if (!response.ok) {
      setError(data.error || "Unable to save changes.");
      return;
    }
    setMessage("Changes saved.");
  }

  function update(name: string, value: unknown) {
    setForm((current) => ({ ...current, [name]: value }));
  }

  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div>
        <h1 className="text-2xl font-semibold text-ink">{title}</h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">{description}</p>
      </div>
      {loading ? (
        <div className="mt-8 flex items-center gap-2 text-sm text-slate-500">
          <Loader2 className="h-4 w-4 animate-spin" />
          Loading content...
        </div>
      ) : (
        <form onSubmit={save} className="mt-6 grid gap-4 lg:grid-cols-2">
          {fields.map((field) => (
            <Field
              key={field.name}
              field={field}
              value={form[field.name]}
              onChange={(value) => update(field.name, value)}
            />
          ))}
          <div className="lg:col-span-2">
            {error ? <p className="mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p> : null}
            {message ? <p className="mb-4 rounded-lg bg-teal/10 px-4 py-3 text-sm text-tealDark">{message}</p> : null}
            <button
              type="submit"
              disabled={saving}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-teal px-6 text-sm font-semibold text-white transition hover:bg-tealDark disabled:opacity-70"
            >
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
              {saving ? "Saving" : "Save changes"}
            </button>
          </div>
        </form>
      )}
    </section>
  );
}

function Field({
  field,
  value,
  onChange
}: {
  field: AdminField;
  value: unknown;
  onChange: (value: unknown) => void;
}) {
  const wide = field.type === "textarea" || field.type === "media";
  if (field.type === "checkbox") {
    return (
      <label className="flex items-center gap-3 rounded-lg bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700">
        <input
          type="checkbox"
          checked={Boolean(value)}
          onChange={(event) => onChange(event.target.checked)}
          className="h-4 w-4 rounded border-slate-300 text-teal"
        />
        {field.label}
      </label>
    );
  }
  return (
    <label className={`grid gap-2 text-sm font-medium text-slate-700 ${wide ? "lg:col-span-2" : ""}`}>
      {field.label}
      {field.type === "textarea" ? (
        <textarea
          value={String(value || "")}
          onChange={(event) => onChange(event.target.value)}
          className="min-h-28 rounded-lg border border-slate-200 px-4 py-3 text-sm font-normal outline-none focus:border-teal"
        />
      ) : field.type === "media" ? (
        <MediaPicker value={String(value || "")} onChange={(next) => onChange(next)} />
      ) : (
        <input
          type={field.type === "url" ? "url" : field.type === "email" ? "email" : "text"}
          value={String(value || "")}
          onChange={(event) => onChange(event.target.value)}
          className="min-h-12 rounded-lg border border-slate-200 px-4 text-sm font-normal outline-none focus:border-teal"
        />
      )}
      {field.help ? <span className="text-xs font-normal text-slate-500">{field.help}</span> : null}
    </label>
  );
}
