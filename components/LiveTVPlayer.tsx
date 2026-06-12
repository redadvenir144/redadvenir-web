"use client";

import { useEffect, useRef, useState } from "react";
import Hls from "hls.js";

import { TV_STREAMS, DEFAULT_TV_STREAM } from "@/lib/streams";

export default function LiveTVPlayer() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const hlsRef = useRef<Hls | null>(null);
  const [current, setCurrent] = useState(DEFAULT_TV_STREAM.src);
  const [error, setError] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Safari/iOS reproduce HLS de forma nativa.
    if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = current;
      return;
    }

    if (Hls.isSupported()) {
      const hls = new Hls({ enableWorker: true, lowLatencyMode: true });
      hlsRef.current = hls;
      hls.loadSource(current);
      hls.attachMedia(video);
      hls.on(Hls.Events.ERROR, (_e, data) => {
        if (data.fatal) setError(true);
      });
      return () => {
        hls.destroy();
        hlsRef.current = null;
      };
    }

    // Navegador sin soporte de HLS: marcar error fuera del cuerpo síncrono.
    const id = setTimeout(() => setError(true), 0);
    return () => clearTimeout(id);
  }, [current]);

  const selectQuality = (src: string) => {
    setError(false);
    setCurrent(src);
  };

  return (
    <div className="overflow-hidden rounded-xl bg-black shadow-lg ring-1 ring-black/5">
      <div className="aspect-video">
        <video
          ref={videoRef}
          className="h-full w-full"
          controls
          playsInline
          autoPlay
          muted
        />
      </div>

      <div className="flex items-center justify-between gap-3 bg-brand px-4 py-2.5">
        <span className="inline-flex items-center gap-2 text-sm font-semibold tracking-wide text-white">
          <span className="live-dot inline-block h-2.5 w-2.5 rounded-full bg-live" />
          EN VIVO
        </span>

        {error ? (
          <span className="text-xs text-red-300">
            No se pudo cargar la señal. Prueba otra calidad.
          </span>
        ) : (
          <div className="inline-flex items-center gap-1.5">
            <i className="bi bi-gear text-xs text-white/50" aria-hidden="true" />
            {/* Selector de calidad minimalista (los streams son endpoints separados, no ABR). */}
            <div className="flex overflow-hidden rounded-full bg-white/10 p-0.5">
              {TV_STREAMS.map((q) => (
                <button
                  key={q.src}
                  onClick={() => selectQuality(q.src)}
                  aria-pressed={current === q.src}
                  className={[
                    "rounded-full px-3 py-1 text-xs font-medium transition-colors",
                    current === q.src
                      ? "bg-white text-brand"
                      : "text-white/80 hover:text-white",
                  ].join(" ")}
                >
                  {q.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
