"use client";

import { useEffect, useState } from "react";

import { getCurrentAndNext } from "@/lib/schedule";

export default function NowPlaying() {
  const [state, setState] = useState(() => getCurrentAndNext());

  useEffect(() => {
    // Actualiza cada 30 s para mantener fresca la barra de progreso.
    const interval = setInterval(() => {
      setState(getCurrentAndNext());
    }, 30_000);
    return () => clearInterval(interval);
  }, []);

  const { current, next, progressPercent } = state;

  if (!current) return null;

  return (
    <aside className="flex h-full flex-col rounded-xl border border-slate-200 bg-white p-7 shadow-sm">
      {/* Eyebrow */}
      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-accent-600">
        <span className="live-dot h-2 w-2 rounded-full bg-live" />
        Ahora en pantalla
      </div>

      {/* Título principal */}
      <h2 className="mt-3 text-2xl font-bold leading-tight tracking-tight text-brand md:text-3xl">
        {current.title}
      </h2>

      {/* Meta */}
      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm text-slate-600">
        <span className="inline-flex items-center gap-1.5">
          <i className="bi bi-clock" aria-hidden="true" />
          {current.time} – {current.endTime}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <i className="bi bi-tv" aria-hidden="true" />
          {current.category}
        </span>
      </div>

      {/* Barra de progreso */}
      <div className="mt-5">
        <div className="h-1.5 overflow-hidden rounded-full bg-slate-200">
          <div
            className="h-full rounded-full bg-gradient-to-r from-brand to-brand-500 transition-all duration-1000"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* A continuación */}
      {next && (
        <div className="mt-6 border-t border-slate-200 pt-5">
          <div className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">
            A continuación
          </div>
          <div className="mt-2 flex items-baseline justify-between">
            <div className="font-semibold text-slate-800">{next.title}</div>
            <div className="ml-3 shrink-0 text-sm text-slate-500">{next.time}</div>
          </div>
        </div>
      )}
    </aside>
  );
}
