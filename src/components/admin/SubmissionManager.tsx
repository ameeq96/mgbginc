"use client";

import { CheckCircle2, Loader2, Search, Trash2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

type SubmissionManagerProps = {
  title: string;
  description: string;
  endpoint: string;
  type: "contact" | "booking";
};

type Row = Record<string, unknown> & { id: string };

export function SubmissionManager({ title, description, endpoint, type }: SubmissionManagerProps) {
  const [items, setItems] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("");

  async function load() {
    setLoading(true);
    const response = await fetch(endpoint);
    const data = await response.json().catch(() => []);
    if (!response.ok) {
      setError(data.error || "Unable to load submissions.");
      setLoading(false);
      return;
    }
    setItems(Array.isArray(data) ? data : []);
    setLoading(false);
  }

  useEffect(() => {
    void load();
  }, [endpoint]);

  const filtered = useMemo(() => {
    const needle = query.toLowerCase();
    return items.filter((item) => {
      const matchesQuery =
        !needle || Object.values(item).some((value) => String(value || "").toLowerCase().includes(needle));
      const matchesStatus =
        !status ||
        (type === "booking" ? String(item.status) === status : status === "replied" ? Boolean(item.replied) : !item.replied);
      return matchesQuery && matchesStatus;
    });
  }, [items, query, status, type]);

  async function update(item: Row, patch: Record<string, unknown>) {
    const response = await fetch(`${endpoint}/${item.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...item, ...patch })
    });
    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      setError(data.error || "Unable to update submission.");
      return;
    }
    await load();
  }

  async function remove(item: Row) {
    if (!window.confirm("Delete this submission?")) return;
    const response = await fetch(`${endpoint}/${item.id}`, { method: "DELETE" });
    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      setError(data.error || "Unable to delete submission.");
      return;
    }
    await load();
  }

  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-ink">{title}</h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">{description}</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="flex min-h-11 items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4">
            <Search className="h-4 w-4 text-slate-400" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search"
              className="bg-transparent text-sm outline-none"
            />
          </div>
          <select
            value={status}
            onChange={(event) => setStatus(event.target.value)}
            className="min-h-11 rounded-full border border-slate-200 bg-slate-50 px-4 text-sm outline-none"
          >
            <option value="">All</option>
            {type === "booking" ? (
              <>
                <option value="NEW">New</option>
                <option value="CONTACTED">Contacted</option>
                <option value="SCHEDULED">Scheduled</option>
                <option value="COMPLETED">Completed</option>
                <option value="CANCELLED">Cancelled</option>
              </>
            ) : (
              <>
                <option value="unreplied">Unreplied</option>
                <option value="replied">Replied</option>
              </>
            )}
          </select>
        </div>
      </div>
      {error ? <p className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p> : null}
      <div className="mt-6 overflow-hidden rounded-lg border border-slate-200">
        {loading ? (
          <div className="flex items-center gap-2 p-6 text-sm text-slate-500">
            <Loader2 className="h-4 w-4 animate-spin" />
            Loading submissions...
          </div>
        ) : filtered.length ? (
          <div className="divide-y divide-slate-200">
            {filtered.map((item) => (
              <article key={item.id} className="grid gap-5 p-5 lg:grid-cols-[1fr_auto]">
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <h2 className="text-lg font-semibold text-ink">{String(item.name || "Unknown")}</h2>
                    <a className="text-sm font-medium text-teal" href={`mailto:${String(item.email || "")}`}>
                      {String(item.email || "")}
                    </a>
                    {type === "booking" ? (
                      <span className="rounded-full bg-gold/[0.15] px-3 py-1 text-xs font-semibold text-gold">
                        {String(item.status || "NEW")}
                      </span>
                    ) : (
                      <span className={`rounded-full px-3 py-1 text-xs font-semibold ${item.replied ? "bg-teal/10 text-tealDark" : "bg-slate-100 text-slate-500"}`}>
                        {item.replied ? "Replied" : "Unreplied"}
                      </span>
                    )}
                  </div>
                  <div className="mt-3 grid gap-1 text-sm text-slate-500 md:grid-cols-2">
                    {item.phone ? <p>Phone: {String(item.phone)}</p> : null}
                    {item.company ? <p>Company: {String(item.company)}</p> : null}
                    {item.serviceInterest ? <p>Interest: {String(item.serviceInterest)}</p> : null}
                    {item.preferredAt ? <p>Preferred: {new Date(String(item.preferredAt)).toLocaleString()}</p> : null}
                    {item.subject ? <p>Subject: {String(item.subject)}</p> : null}
                  </div>
                  <p className="mt-4 text-sm leading-7 text-slate-700">{String(item.message || "")}</p>
                  {type === "booking" ? (
                    <textarea
                      value={String(item.notes || "")}
                      onChange={(event) =>
                        setItems((current) =>
                          current.map((row) => (row.id === item.id ? { ...row, notes: event.target.value } : row))
                        )
                      }
                      onBlur={(event) => update(item, { notes: event.target.value })}
                      placeholder="Internal notes"
                      className="mt-4 min-h-20 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-teal"
                    />
                  ) : null}
                </div>
                <div className="flex flex-row gap-2 lg:flex-col">
                  {type === "booking" ? (
                    <select
                      value={String(item.status || "NEW")}
                      onChange={(event) => update(item, { status: event.target.value })}
                      className="min-h-10 rounded-full border border-slate-200 px-3 text-sm outline-none"
                    >
                      <option value="NEW">New</option>
                      <option value="CONTACTED">Contacted</option>
                      <option value="SCHEDULED">Scheduled</option>
                      <option value="COMPLETED">Completed</option>
                      <option value="CANCELLED">Cancelled</option>
                    </select>
                  ) : (
                    <button
                      type="button"
                      onClick={() => update(item, { replied: !item.replied })}
                      className="inline-flex h-10 items-center justify-center gap-2 rounded-full bg-teal/10 px-4 text-sm font-semibold text-tealDark"
                    >
                      <CheckCircle2 className="h-4 w-4" />
                      {item.replied ? "Unmark" : "Replied"}
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => remove(item)}
                    className="inline-flex h-10 items-center justify-center gap-2 rounded-full bg-red-50 px-4 text-sm font-semibold text-red-600"
                  >
                    <Trash2 className="h-4 w-4" />
                    Delete
                  </button>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center text-sm text-slate-500">No submissions found.</div>
        )}
      </div>
    </section>
  );
}
