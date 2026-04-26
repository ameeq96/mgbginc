"use client";

import { ImagePlus, Loader2, Upload } from "lucide-react";
import { useEffect, useState } from "react";

type MediaAsset = {
  id: string;
  filename: string;
  url: string;
  mimeType: string;
  size: number;
  altText?: string | null;
};

type MediaPickerProps = {
  value?: string | null;
  onChange: (value: string) => void;
};

export function MediaPicker({ value, onChange }: MediaPickerProps) {
  const [assets, setAssets] = useState<MediaAsset[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function load() {
    setLoading(true);
    const response = await fetch("/api/admin/media");
    const data = await response.json().catch(() => []);
    setAssets(Array.isArray(data) ? data : []);
    setLoading(false);
  }

  useEffect(() => {
    if (open) void load();
  }, [open]);

  async function upload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    setError("");
    setLoading(true);
    const form = new FormData();
    form.append("file", file);
    const response = await fetch("/api/admin/media", { method: "POST", body: form });
    const data = await response.json().catch(() => ({}));
    setLoading(false);
    if (!response.ok) {
      setError(data.error || "Upload failed.");
      return;
    }
    setAssets((current) => [data, ...current]);
    onChange(data.url);
  }

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-3">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="flex min-h-14 flex-1 items-center gap-3 rounded-lg bg-slate-50 px-3">
          {value ? (
            value.match(/\.(png|jpe?g|gif|webp|svg)$/i) || value.startsWith("http") ? (
              <img src={value} alt="" className="h-10 w-10 rounded-md object-cover" />
            ) : (
              <ImagePlus className="h-5 w-5 text-slate-400" />
            )
          ) : (
            <ImagePlus className="h-5 w-5 text-slate-400" />
          )}
          <input
            value={value || ""}
            onChange={(event) => onChange(event.target.value)}
            placeholder="Media URL"
            className="min-w-0 flex-1 bg-transparent text-sm outline-none"
          />
        </div>
        <button
          type="button"
          onClick={() => setOpen((current) => !current)}
          className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-teal hover:text-teal"
        >
          Browse
        </button>
        <label className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-full bg-ink px-4 py-2 text-sm font-semibold text-white transition hover:bg-teal">
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
          Upload
          <input type="file" className="sr-only" onChange={upload} />
        </label>
      </div>
      {error ? <p className="mt-3 text-sm text-red-600">{error}</p> : null}
      {open ? (
        <div className="mt-4 grid max-h-72 gap-3 overflow-auto rounded-lg bg-slate-50 p-3 sm:grid-cols-2 lg:grid-cols-3">
          {loading ? <p className="text-sm text-slate-500">Loading media...</p> : null}
          {!loading && assets.length === 0 ? <p className="text-sm text-slate-500">No media uploaded yet.</p> : null}
          {assets.map((asset) => (
            <button
              key={asset.id}
              type="button"
              onClick={() => {
                onChange(asset.url);
                setOpen(false);
              }}
              className={`overflow-hidden rounded-lg border text-left transition hover:border-teal ${
                value === asset.url ? "border-teal bg-teal/5" : "border-slate-200 bg-white"
              }`}
            >
              {asset.mimeType.startsWith("image/") ? (
                <img src={asset.url} alt="" className="h-24 w-full object-cover" />
              ) : (
                <div className="grid h-24 place-items-center bg-slate-100 text-slate-400">
                  <ImagePlus className="h-6 w-6" />
                </div>
              )}
              <span className="block truncate px-3 py-2 text-xs text-slate-600">{asset.filename}</span>
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
