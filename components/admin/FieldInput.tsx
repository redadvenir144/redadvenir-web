"use client";

import type { Field } from "@/lib/resources";
import Uploader from "./Uploader";

const inputClass =
  "w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none transition-colors focus:border-brand focus:ring-2 focus:ring-brand/20";

export default function FieldInput({
  field,
  value,
  onChange,
}: {
  field: Field;
  value: unknown;
  onChange: (v: unknown) => void;
}) {
  const v = value ?? "";

  return (
    <div>
      <label className="mb-1 block text-sm font-medium text-slate-700">
        {field.label}
        {field.required && <span className="text-red-500"> *</span>}
      </label>

      {field.type === "text" && (
        <input
          type="text"
          className={inputClass}
          placeholder={field.placeholder}
          value={v as string}
          onChange={(e) => onChange(e.target.value)}
        />
      )}

      {field.type === "number" && (
        <input
          type="number"
          className={inputClass}
          value={v as number}
          onChange={(e) => onChange(e.target.value)}
        />
      )}

      {field.type === "date" && (
        <input
          type="date"
          className={inputClass}
          value={(v as string)?.slice(0, 10)}
          onChange={(e) => onChange(e.target.value)}
        />
      )}

      {field.type === "textarea" && (
        <textarea
          rows={3}
          className={inputClass}
          placeholder={field.placeholder}
          value={v as string}
          onChange={(e) => onChange(e.target.value)}
        />
      )}

      {field.type === "richtext" && (
        <textarea
          rows={8}
          className={inputClass}
          placeholder={field.placeholder}
          value={v as string}
          onChange={(e) => onChange(e.target.value)}
        />
      )}

      {field.type === "select" && (
        <select className={inputClass} value={v as string} onChange={(e) => onChange(e.target.value)}>
          <option value="">— Selecciona —</option>
          {field.options?.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      )}

      {field.type === "tags" && (
        <input
          type="text"
          className={inputClass}
          placeholder="palabra1, palabra2, palabra3"
          value={Array.isArray(value) ? (value as string[]).join(", ") : (v as string)}
          onChange={(e) => onChange(e.target.value)}
        />
      )}

      {field.type === "image" && (
        <Uploader
          kind="image"
          accept="image/*"
          value={v as string}
          onChange={(url) => onChange(url)}
        />
      )}

      {field.type === "pdf" && (
        <Uploader
          kind="pdf"
          accept="application/pdf"
          value={v as string}
          onChange={(url) => onChange(url)}
        />
      )}

      {field.help && <p className="mt-1 text-xs text-slate-400">{field.help}</p>}
    </div>
  );
}
