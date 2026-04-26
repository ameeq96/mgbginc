"use client";

import { Edit3, Loader2, Plus, Search, Trash2, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { MediaPicker } from "@/components/admin/MediaPicker";
import { RichTextEditor } from "@/components/admin/RichTextEditor";
import type { AdminField, AdminResourceConfig } from "@/types/admin";

type Row = Record<string, unknown> & { id: string };

export function ResourceManager({ config }: { config: AdminResourceConfig }) {
  const [items, setItems] = useState<Row[]>([]);
  const [form, setForm] = useState<Record<string, unknown>>(() => defaults(config.fields));
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");

  async function load() {
    setLoading(true);
    setError("");
    const response = await fetch(config.endpoint);
    const data = await response.json().catch(() => []);
    if (!response.ok) {
      setError(data.error || `Unable to load ${config.title}.`);
      setLoading(false);
      return;
    }
    setItems(Array.isArray(data) ? data : []);
    setLoading(false);
  }

  useEffect(() => {
    void load();
  }, [config.endpoint]);

  const filtered = useMemo(() => {
    const needle = query.toLowerCase();
    if (!needle) return items;
    return items.filter((item) =>
      Object.values(item).some((value) => String(value || "").toLowerCase().includes(needle))
    );
  }, [items, query]);

  function update(name: string, value: unknown) {
    setForm((current) => ({ ...current, [name]: value }));
  }

  function edit(item: Row) {
    const next = defaults(config.fields);
    for (const field of config.fields) {
      next[field.name] = toInputValue(field, item[field.name]);
    }
    setForm(next);
    setEditingId(item.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function reset() {
    setForm(defaults(config.fields));
    setEditingId(null);
    setError("");
  }

  async function save(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setError("");
    const method = editingId ? "PUT" : "POST";
    const url = editingId ? `${config.endpoint}/${editingId}` : config.endpoint;
    const response = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });
    const data = await response.json().catch(() => ({}));
    setSaving(false);
    if (!response.ok) {
      setError(data.error || `Unable to save ${config.noun}.`);
      return;
    }
    reset();
    await load();
  }

  async function remove(item: Row) {
    if (!window.confirm(`Delete this ${config.noun}?`)) return;
    const response = await fetch(`${config.endpoint}/${item.id}`, { method: "DELETE" });
    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      setError(data.error || `Unable to delete ${config.noun}.`);
      return;
    }
    await load();
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
      <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-ink">{config.title}</h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">{config.description}</p>
          </div>
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-ink px-4 py-2 text-sm font-semibold text-white transition hover:bg-teal"
          >
            <Plus className="h-4 w-4" />
            New {config.noun}
          </button>
        </div>
        <div className="mt-5 flex min-h-11 items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4">
          <Search className="h-4 w-4 text-slate-400" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={`Search ${config.title.toLowerCase()}`}
            className="flex-1 bg-transparent text-sm outline-none"
          />
        </div>
        <div className="mt-5 overflow-hidden rounded-lg border border-slate-200">
          {loading ? (
            <div className="flex items-center gap-2 p-6 text-sm text-slate-500">
              <Loader2 className="h-4 w-4 animate-spin" />
              Loading {config.title.toLowerCase()}...
            </div>
          ) : filtered.length ? (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[720px] text-left text-sm">
                <thead className="bg-slate-50 text-xs uppercase tracking-[0.12em] text-slate-500">
                  <tr>
                    {config.columns.map((column) => (
                      <th key={column.key} className="px-4 py-3 font-semibold">
                        {column.label}
                      </th>
                    ))}
                    <th className="px-4 py-3 text-right font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 bg-white">
                  {filtered.map((item) => (
                    <tr key={item.id} className="align-top">
                      {config.columns.map((column) => (
                        <td key={column.key} className="max-w-xs px-4 py-4 text-slate-700">
                          {renderCell(item[column.key], column.type)}
                        </td>
                      ))}
                      <td className="px-4 py-4">
                        <div className="flex justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => edit(item)}
                            className="grid h-9 w-9 place-items-center rounded-full bg-slate-100 text-slate-600 transition hover:bg-teal/10 hover:text-teal"
                            aria-label="Edit"
                          >
                            <Edit3 className="h-4 w-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => remove(item)}
                            className="grid h-9 w-9 place-items-center rounded-full bg-red-50 text-red-600 transition hover:bg-red-100"
                            aria-label="Delete"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-8 text-center text-sm text-slate-500">No {config.title.toLowerCase()} found.</div>
          )}
        </div>
      </section>

      <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold text-ink">
              {editingId ? `Edit ${config.noun}` : `Create ${config.noun}`}
            </h2>
            <p className="mt-1 text-sm text-slate-500">Changes publish through the secure API immediately.</p>
          </div>
          {editingId ? (
            <button
              type="button"
              onClick={reset}
              className="grid h-9 w-9 place-items-center rounded-full bg-slate-100 text-slate-500"
              aria-label="Cancel edit"
            >
              <X className="h-4 w-4" />
            </button>
          ) : null}
        </div>
        {error ? <p className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p> : null}
        <form onSubmit={save} className="mt-5 grid gap-4">
          {config.fields.map((field) => (
            <FieldInput
              key={field.name}
              field={field}
              value={form[field.name]}
              onChange={(value) => update(field.name, value)}
            />
          ))}
          <button
            type="submit"
            disabled={saving}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-teal px-6 text-sm font-semibold text-white transition hover:bg-tealDark disabled:opacity-70"
          >
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
            {saving ? "Saving" : "Save changes"}
          </button>
        </form>
      </section>
    </div>
  );
}

function FieldInput({
  field,
  value,
  onChange
}: {
  field: AdminField;
  value: unknown;
  onChange: (value: unknown) => void;
}) {
  const label = (
    <span>
      {field.label}
      {field.required ? <span className="text-red-500"> *</span> : null}
    </span>
  );

  if (field.type === "checkbox") {
    return (
      <label className="flex items-center gap-3 rounded-lg bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700">
        <input
          type="checkbox"
          checked={Boolean(value)}
          onChange={(event) => onChange(event.target.checked)}
          className="h-4 w-4 rounded border-slate-300 text-teal"
        />
        {label}
      </label>
    );
  }

  return (
    <label className="grid gap-2 text-sm font-medium text-slate-700">
      {label}
      {field.type === "textarea" ? (
        <textarea
          required={field.required}
          value={String(value || "")}
          onChange={(event) => onChange(event.target.value)}
          placeholder={field.placeholder}
          className="min-h-28 rounded-lg border border-slate-200 px-4 py-3 text-sm font-normal outline-none focus:border-teal"
        />
      ) : field.type === "richtext" ? (
        <RichTextEditor value={String(value || "")} onChange={(next) => onChange(next)} />
      ) : field.type === "select" ? (
        <select
          required={field.required}
          value={String(value || "")}
          onChange={(event) => onChange(event.target.value)}
          className="min-h-12 rounded-lg border border-slate-200 px-4 text-sm font-normal outline-none focus:border-teal"
        >
          <option value="">Select</option>
          {field.options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : field.type === "media" ? (
        <MediaPicker value={String(value || "")} onChange={(next) => onChange(next)} />
      ) : (
        <input
          required={field.required}
          type={field.type === "datetime" ? "datetime-local" : field.type}
          value={String(value || "")}
          onChange={(event) =>
            onChange(field.type === "number" ? Number(event.target.value || 0) : event.target.value)
          }
          placeholder={field.placeholder}
          className="min-h-12 rounded-lg border border-slate-200 px-4 text-sm font-normal outline-none focus:border-teal"
        />
      )}
      {field.help ? <span className="text-xs font-normal text-slate-500">{field.help}</span> : null}
    </label>
  );
}

function defaults(fields: AdminField[]) {
  return fields.reduce<Record<string, unknown>>((acc, field) => {
    acc[field.name] = field.defaultValue ?? (field.type === "checkbox" ? false : "");
    return acc;
  }, {});
}

function toInputValue(field: AdminField, value: unknown) {
  if (field.type === "date" && value) {
    return new Date(String(value)).toISOString().slice(0, 10);
  }
  if (field.type === "datetime" && value) {
    return new Date(String(value)).toISOString().slice(0, 16);
  }
  if (field.type === "checkbox") return Boolean(value);
  return value ?? "";
}

function renderCell(value: unknown, type?: string) {
  if (type === "boolean") {
    return (
      <span className={`rounded-full px-3 py-1 text-xs font-semibold ${value ? "bg-teal/10 text-tealDark" : "bg-slate-100 text-slate-500"}`}>
        {value ? "Yes" : "No"}
      </span>
    );
  }
  if (type === "status") {
    return <span className="rounded-full bg-gold/[0.15] px-3 py-1 text-xs font-semibold text-gold">{String(value || "New")}</span>;
  }
  if (type === "image") {
    return value ? <img src={String(value)} alt="" className="h-12 w-12 rounded-lg object-cover" /> : <span className="text-slate-400">None</span>;
  }
  if (type === "date") {
    return value ? new Intl.DateTimeFormat("en", { dateStyle: "medium" }).format(new Date(String(value))) : "None";
  }
  if (type === "rating") {
    return `${String(value || 0)} / 5`;
  }
  const text = String(value || "");
  return text.length > 90 ? `${text.replace(/<[^>]+>/g, " ").slice(0, 90)}...` : text;
}
