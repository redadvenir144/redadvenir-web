"use client";

import { useState } from "react";

export default function Uploader({
  value,
  onChange,
  accept,
  kind,
}: {
  value: string;
  onChange: (url: string) => void;
  accept: string;
  kind: "image" | "pdf";
}) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  async function handleFile(file: File) {
    setUploading(true);
    setError("");
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Error al subir");
      onChange(data.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-3">
        <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
          <i className={`bi bi-${uploading ? "arrow-repeat animate-spin" : "upload"}`} />
          {uploading ? "Subiendo…" : "Subir archivo"}
          <input
            type="file"
            accept={accept}
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) handleFile(f);
            }}
          />
        </label>
        {value && (
          <button
            type="button"
            onClick={() => onChange("")}
            className="text-sm text-red-600 hover:underline"
          >
            Quitar
          </button>
        )}
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      {value && kind === "image" && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={value} alt="Vista previa" className="h-28 w-auto rounded-lg border border-slate-200 object-cover" />
      )}
      {value && kind === "pdf" && (
        <a href={value} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-sm text-brand-500 hover:underline">
          <i className="bi bi-file-earmark-pdf" /> Ver PDF subido
        </a>
      )}
    </div>
  );
}
