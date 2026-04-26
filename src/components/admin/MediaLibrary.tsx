"use client";

import { Copy, File, Loader2, Trash2, Upload } from "lucide-react";
import { useEffect, useState } from "react";

type MediaAsset = {
  id: string;
  filename: string;
  url: string;
  mimeType: string;
  size: number;
  createdAt: string;
};

export function MediaLibrary() {
  const [assets, setAssets] = useState<MediaAsset[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function load() {
    setLoading(true);
    const response = await fetch("/api/admin/media");
    const data = await response.json().catch(() => []);
    if (!response.ok) {
      setError(data.error || "Unable to load media.");
      setLoading(false);
      return;
    }
    setAssets(Array.isArray(data) ? data : []);
    setLoading(false);
  }

  useEffect(() => {
    void load();
  }, []);

  async function upload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    setError("");
    const form = new FormData();
    form.append("file", file);
    const response = await fetch("/api/admin/media", { method: "POST", body: form });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      setError(data.error || "Upload failed.");
      return;
    }
    setAssets((current) => [data, ...current]);
  }

  async function remove(asset: MediaAsset) {
    if (!window.confirm("Delete this media asset?")) return;
    const response = await fetch(`/api/admin/media/${asset.id}`, { method: "DELETE" });
    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      setError(data.error || "Unable to delete media.");
      return;
    }
    setAssets((current) => current.filter((item) => item.id !== asset.id));
  }

  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-ink">Media Library</h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
            Upload, reuse, copy, and delete images or documents used by pages, services, posts, projects, and partnerships.
          </p>
        </div>
        <label className="inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-full bg-teal px-5 text-sm font-semibold text-white transition hover:bg-tealDark">
          <Upload className="h-4 w-4" />
          Upload file
          <input type="file" className="sr-only" onChange={upload} />
        </label>
      </div>
      {error ? <p className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p> : null}
      {loading ? (
        <div className="mt-8 flex items-center gap-2 text-sm text-slate-500">
          <Loader2 className="h-4 w-4 animate-spin" />
          Loading media...
        </div>
      ) : assets.length ? (
        <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {assets.map((asset) => (
            <article key={asset.id} className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
              {asset.mimeType.startsWith("image/") ? (
                <img src={asset.url} alt="" className="h-44 w-full object-cover" />
              ) : (
                <div className="grid h-44 place-items-center bg-slate-100 text-slate-400">
                  <File className="h-8 w-8" />
                </div>
              )}
              <div className="p-4">
                <h2 className="truncate text-sm font-semibold text-ink">{asset.filename}</h2>
                <p className="mt-1 truncate text-xs text-slate-500">{asset.url}</p>
                <div className="mt-4 flex gap-2">
                  <button
                    type="button"
                    onClick={() => navigator.clipboard.writeText(asset.url)}
                    className="grid h-9 w-9 place-items-center rounded-full bg-slate-100 text-slate-600"
                    aria-label="Copy URL"
                  >
                    <Copy className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => remove(asset)}
                    className="grid h-9 w-9 place-items-center rounded-full bg-red-50 text-red-600"
                    aria-label="Delete media"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="mt-8 rounded-lg border border-dashed border-slate-300 p-8 text-center text-sm text-slate-500">
          No media uploaded yet.
        </div>
      )}
    </section>
  );
}
