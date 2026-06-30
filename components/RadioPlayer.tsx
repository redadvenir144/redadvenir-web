"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

import { RADIO_STATIONS } from "@/lib/streams";

function Equalizer() {
  return (
    <div className="flex h-4 items-end gap-0.5" aria-hidden="true">
      {[0, 1, 2, 3, 4].map((i) => (
        <span
          key={i}
          className="eq-bar w-1 rounded-full bg-accent"
          style={{ animationDelay: `${i * 0.12}s` }}
        />
      ))}
    </div>
  );
}

export default function RadioPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playingSrc, setPlayingSrc] = useState<string | null>(null);
  const [loadingSrc, setLoadingSrc] = useState<string | null>(null);
  const [errorSrc, setErrorSrc] = useState<string | null>(null);
  const [volume, setVolume] = useState(0.8);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onError = () => {
      setErrorSrc(audio.src);
      setPlayingSrc(null);
      setLoadingSrc(null);
    };
    audio.addEventListener("error", onError);
    return () => audio.removeEventListener("error", onError);
  }, []);

  const toggle = (src: string) => {
    const audio = audioRef.current;
    if (!audio) return;

    if (playingSrc === src) {
      audio.pause();
      setPlayingSrc(null);
      return;
    }

    setErrorSrc(null);
    setLoadingSrc(src);
    audio.src = src;
    audio.volume = volume;
    audio
      .play()
      .then(() => setPlayingSrc(src))
      .catch(() => {
        setErrorSrc(src);
        setPlayingSrc(null);
      })
      .finally(() => setLoadingSrc(null));
  };

  const changeVolume = (v: number) => {
    setVolume(v);
    if (audioRef.current) audioRef.current.volume = v;
  };

  return (
    <div>
      <div className="mb-6">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-sky-300">
          Radio en vivo
        </p>
        <h2 className="mt-2 text-2xl font-bold text-white sm:text-3xl">
          Escucha nuestras emisoras
        </h2>
      </div>

      <audio ref={audioRef} className="hidden" preload="none" />

      <div className="grid gap-5 lg:grid-cols-2">
        {RADIO_STATIONS.map((st) => {
          const active = playingSrc === st.src;
          const isLoading = loadingSrc === st.src;
          const hasError = errorSrc === st.src;

          return (
            <div
              key={st.src}
              id={st.anchor}
              className={[
                "flex scroll-mt-24 gap-5 rounded-2xl border p-5 transition-colors",
                active
                  ? "border-accent/40 bg-gradient-to-br from-white/10 to-white/5"
                  : "border-white/10 bg-white/5 hover:border-white/20",
              ].join(" ")}
            >
              {/* Carátula */}
              <button
                onClick={() => toggle(st.src)}
                aria-label={active ? `Pausar ${st.name}` : `Escuchar ${st.name}`}
                className="group relative h-28 w-28 shrink-0 overflow-hidden rounded-xl bg-white/10"
              >
                {st.image && (
                  <Image
                    src={st.image}
                    alt={st.name}
                    fill
                    sizes="112px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                )}
                <span className="absolute inset-0 flex items-center justify-center bg-black/40 transition-opacity group-hover:bg-black/55">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-accent text-brand shadow-lg">
                    <i
                      className={`bi text-2xl ${
                        isLoading
                          ? "bi-arrow-repeat animate-spin"
                          : active
                            ? "bi-pause-fill"
                            : "bi-play-fill"
                      }`}
                    />
                  </span>
                </span>
              </button>

              {/* Info + controles */}
              <div className="flex min-w-0 flex-1 flex-col">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="truncate text-lg font-bold text-white">{st.name}</h3>
                  {active && <Equalizer />}
                </div>

                <p className="mt-1 flex items-center gap-1.5 text-xs text-white/60">
                  <span
                    className={`inline-block h-1.5 w-1.5 rounded-full ${
                      active ? "live-dot bg-live" : "bg-white/40"
                    }`}
                  />
                  {hasError
                    ? "Sin conexión"
                    : active
                      ? "Reproduciendo ahora"
                      : "En vivo"}
                </p>

                {hasError ? (
                  <p className="mt-2 rounded-lg bg-red-500/10 px-3 py-2 text-xs text-red-300">
                    No se pudo conectar a la emisora.{" "}
                    {st.appUrl && "Probá la app de abajo."}
                  </p>
                ) : (
                  <div className="mt-auto flex items-center gap-3 pt-3">
                    <button
                      onClick={() => toggle(st.src)}
                      className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-sm font-semibold text-brand transition-colors hover:bg-accent-600"
                    >
                      <i
                        className={`bi ${
                          isLoading
                            ? "bi-arrow-repeat animate-spin"
                            : active
                              ? "bi-pause-fill"
                              : "bi-play-fill"
                        }`}
                      />
                      {active ? "Pausar" : "Escuchar"}
                    </button>

                    {active && (
                      <label className="flex flex-1 items-center gap-2 text-white/70">
                        <i className="bi bi-volume-up-fill" aria-hidden="true" />
                        <input
                          type="range"
                          min={0}
                          max={1}
                          step={0.05}
                          value={volume}
                          onChange={(e) => changeVolume(Number(e.target.value))}
                          aria-label="Volumen"
                          className="h-1 w-full cursor-pointer accent-accent"
                        />
                      </label>
                    )}
                  </div>
                )}

                {st.appUrl && (
                  <a
                    href={st.appUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex w-fit items-center gap-1.5 text-xs font-medium text-sky-300 hover:text-white"
                  >
                    <i className="bi bi-google-play" /> Descargar la app
                  </a>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
