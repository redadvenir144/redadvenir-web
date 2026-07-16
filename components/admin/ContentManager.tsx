"use client";

import { useMemo, useState } from "react";

type Block = {
  key: string;
  label: string;
  type: "text" | "textarea" | "richtext";
  help: string | null;
  value: string;
  default: string;
};

type Group = {
  key: string;
  label: string;
  icon: string;
  blocks: Block[];
};

export default function ContentManager({ groups }: { groups: Group[] }) {
  // Estado plano clave → valor actual en el formulario.
  const initial = useMemo(() => {
    const m: Record<string, string> = {};
    for (const g of groups) for (const b of g.blocks) m[b.key] = b.value;
    return m;
  }, [groups]);
  const defaults = useMemo(() => {
    const m: Record<string, string> = {};
    for (const g of groups) for (const b of g.blocks) m[b.key] = b.default;
    return m;
  }, [groups]);

  const [values, setValues] = useState<Record<string, string>>(initial);
  const [saved, setSaved] = useState<Record<string, string>>(initial);
  const [status, setStatus] = useState<"idle" | "saving" | "ok" | "error">(
    "idle",
  );
  const [error, setError] = useState("");

  const dirtyKeys = Object.keys(values).filter((k) => values[k] !== saved[k]);
  const isDirty = dirtyKeys.length > 0;

  function set(key: string, value: string) {
    setValues((v) => ({ ...v, [key]: value }));
    setStatus("idle");
  }

  async function save() {
    if (!isDirty) return;
    setStatus("saving");
    setError("");
    const payload: Record<string, string> = {};
    for (const k of dirtyKeys) payload[k] = values[k];
    try {
      const res = await fetch("/api/admin/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ values: payload }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "No se pudo guardar.");
      }
      setSaved(values);
      setStatus("ok");
    } catch (e) {
      setStatus("error");
      setError(e instanceof Error ? e.message : "No se pudo guardar.");
    }
  }

  return (
    <div className="pb-28">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-brand">Textos del sitio</h1>
        <p className="mt-1 text-sm text-slate-500">
          Edita el texto de las páginas. Los cambios se publican al guardar.
        </p>
      </div>

      <div className="space-y-8">
        {groups.map((g) => (
          <section
            key={g.key}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <div className="mb-5 flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand text-white">
                <i className={`bi bi-${g.icon}`} />
              </span>
              <h2 className="text-lg font-bold text-brand">{g.label}</h2>
            </div>

            <div className="space-y-5">
              {g.blocks.map((b) => {
                const changed = values[b.key] !== saved[b.key];
                return (
                  <div key={b.key}>
                    <label className="mb-1 flex items-center gap-2 text-sm font-medium text-slate-700">
                      {b.label}
                      {changed && (
                        <span className="rounded bg-amber-100 px-1.5 py-0.5 text-[10px] font-semibold uppercase text-amber-700">
                          sin guardar
                        </span>
                      )}
                    </label>
                    {b.type === "textarea" ? (
                      <textarea
                        value={values[b.key]}
                        onChange={(e) => set(b.key, e.target.value)}
                        rows={3}
                        className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-brand"
                      />
                    ) : (
                      <input
                        type="text"
                        value={values[b.key]}
                        onChange={(e) => set(b.key, e.target.value)}
                        className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-brand"
                      />
                    )}
                    {b.help && (
                      <p className="mt-1 text-xs text-slate-400">{b.help}</p>
                    )}
                    {changed && values[b.key] !== defaults[b.key] && (
                      <button
                        type="button"
                        onClick={() => set(b.key, defaults[b.key])}
                        className="mt-1 text-xs text-slate-400 hover:text-brand-500 hover:underline"
                      >
                        Restaurar texto por defecto
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        ))}
      </div>

      {/* Barra de guardado fija */}
      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-slate-200 bg-white/95 backdrop-blur lg:left-64">
        <div className="mx-auto flex max-w-4xl items-center justify-between gap-4 px-6 py-3">
          <div className="text-sm">
            {status === "ok" && !isDirty && (
              <span className="text-green-600">
                <i className="bi bi-check-circle-fill" /> Cambios guardados.
              </span>
            )}
            {status === "error" && (
              <span className="text-red-600">
                <i className="bi bi-exclamation-triangle-fill" /> {error}
              </span>
            )}
            {isDirty && status !== "error" && (
              <span className="text-slate-500">
                {dirtyKeys.length} cambio{dirtyKeys.length === 1 ? "" : "s"} sin
                guardar
              </span>
            )}
          </div>
          <button
            onClick={save}
            disabled={!isDirty || status === "saving"}
            className="inline-flex items-center gap-2 rounded-md bg-brand px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {status === "saving" ? (
              <>
                <i className="bi bi-arrow-repeat animate-spin" /> Guardando…
              </>
            ) : (
              <>
                <i className="bi bi-save" /> Guardar cambios
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
