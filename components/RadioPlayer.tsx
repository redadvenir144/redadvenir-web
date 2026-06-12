"use client";

import { useRef, useState } from "react";
import Image from "next/image";

import { RADIO_STATIONS } from "@/lib/streams";

function Equalizer({ active }: { active: boolean }) {
  return (
    <div className="flex h-5 items-end gap-0.5" aria-hidden="true">
      {[0, 1, 2, 3].map((i) => (
        <span
          key={i}
          className={`w-1 rounded-full bg-accent ${active ? "eq-bar" : "h-1.5 opacity-40"}`}
          style={active ? { animationDelay: `${i * 0.15}s` } : undefined}
        />
      ))}
    </div>
  );
}

export default function RadioPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playingSrc, setPlayingSrc] = useState<string | null>(null);
  const [loading, setLoading] = useState<string | null>(null);

  const toggle = (src: string) => {
    const audio = audioRef.current;
    if (!audio) return;

    if (playingSrc === src) {
      audio.pause();
      setPlayingSrc(null);
      return;
    }
    setLoading(src);
    audio.src = src;
    audio
      .play()
      .then(() => setPlayingSrc(src))
      .catch(() => setPlayingSrc(null))
      .finally(() => setLoading(null));
  };

  return (
    <div>
      <div className="mb-5 flex items-center gap-2">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand text-white">
          <i className="bi bi-broadcast" />
        </span>
        <div>
          <h2 className="text-xl font-bold text-brand">Radio en vivo</h2>
          <p className="text-sm text-slate-500">Escucha nuestras emisoras donde estés</p>
        </div>
      </div>

      <audio ref={audioRef} className="hidden" />

      <div className="grid gap-4 sm:grid-cols-2">
        {RADIO_STATIONS.map((st) => {
          const active = playingSrc === st.src;
          const isLoading = loading === st.src;
          return (
            <div
              key={st.src}
              className={`group flex items-center gap-4 rounded-2xl border p-4 shadow-sm transition-all ${
                active
                  ? "border-accent bg-accent/5 ring-1 ring-accent/30"
                  : "border-slate-200 bg-white hover:shadow-md"
              }`}
            >
              {/* Carátula */}
              <button
                onClick={() => toggle(st.src)}
                className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-slate-100"
                aria-label={active ? `Pausar ${st.name}` : `Escuchar ${st.name}`}
              >
                {st.image && (
                  <Image
                    src={st.image}
                    alt={st.name}
                    fill
                    sizes="80px"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                )}
                <span className="absolute inset-0 flex items-center justify-center bg-black/35 opacity-0 transition-opacity group-hover:opacity-100">
                  <i className={`bi bi-${active ? "pause-fill" : "play-fill"} text-3xl text-white`} />
                </span>
              </button>

              {/* Info */}
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="truncate font-semibold text-slate-800">{st.name}</h3>
                  {active && <Equalizer active />}
                </div>
                <p className="mt-0.5 flex items-center gap-1 text-xs text-slate-500">
                  <span className={`inline-block h-1.5 w-1.5 rounded-full ${active ? "live-dot bg-live" : "bg-slate-300"}`} />
                  {active ? "Reproduciendo" : "En vivo"}
                </p>

                <div className="mt-2 flex items-center gap-2">
                  <button
                    onClick={() => toggle(st.src)}
                    className="inline-flex items-center gap-1.5 rounded-full bg-brand px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-brand-700"
                  >
                    <i className={`bi bi-${isLoading ? "arrow-repeat animate-spin" : active ? "pause-fill" : "play-fill"}`} />
                    {active ? "Pausar" : "Escuchar"}
                  </button>
                  {st.appUrl && (
                    <a
                      href={st.appUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 rounded-full border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 hover:border-brand hover:text-brand"
                    >
                      <i className="bi bi-google-play" /> App
                    </a>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
