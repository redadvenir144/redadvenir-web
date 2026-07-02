"use client";

import { useEffect, useRef, useState } from "react";
import Hls from "hls.js";

import { TV_STREAMS, DEFAULT_TV_STREAM } from "@/lib/streams";

export default function LiveTVPlayer() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const hlsRef = useRef<Hls | null>(null);
  // Arranca en "Alta" (480p): es la calidad más estable. El HD (720p) de
  // streamhost es intermitente (a veces sirve los segmentos más lento que el
  // tiempo real y se queda cargando), por eso queda solo como opción manual.
  const [current, setCurrent] = useState(DEFAULT_TV_STREAM.src);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  // Overlay de audio muteado.
  // muteHintVisible controla la opacidad (fade-out); dismissed lo desmonta
  // de forma definitiva una vez que el usuario activó el sonido por primera vez.
  const [muteHintVisible, setMuteHintVisible] = useState(true);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    setLoading(true);

    // Safari/iOS reproduce HLS de forma nativa.
    if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = current;
      return;
    }

    if (Hls.isSupported()) {
      // Streams HLS estándar (no LL-HLS). El servidor solo publica ~3 segmentos
      // en vivo (~30s de ventana), así que afinamos hacia ESTABILIDAD, no baja
      // latencia (importa sobre todo en HD, cuyos segmentos pesan más):
      //  - liveSyncDurationCount 4: reproducir lo más atrás posible dentro de la
      //    ventana => máximo colchón antes de drenar el buffer.
      //  - maxBufferLength 60: acumular todo lo que la ventana permita.
      //  - maxLiveSyncPlaybackRate 1.5: si nos atrasamos, acelerar suave para
      //    reengancharnos en vez de saltar/recargar (que es lo que se siente
      //    como "se quedó cargando"). Por eso NO fijamos liveMaxLatencyDuration.
      const hls = new Hls({
        enableWorker: true,
        liveSyncDurationCount: 4,
        maxBufferLength: 60,
        maxLiveSyncPlaybackRate: 1.5,
        startFragPrefetch: true,
      });
      hlsRef.current = hls;
      hls.loadSource(current);
      hls.attachMedia(video);
      hls.on(Hls.Events.ERROR, (_e, data) => {
        if (!data.fatal) return;
        // Recuperar en vez de rendirse: reintentar red / recuperar media.
        if (data.type === Hls.ErrorTypes.NETWORK_ERROR) {
          hls.startLoad();
        } else if (data.type === Hls.ErrorTypes.MEDIA_ERROR) {
          hls.recoverMediaError();
        } else {
          setError(true);
        }
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

  // Indicador de carga: oculto cuando reproduce, visible mientras bufferea.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const onPlaying = () => setLoading(false);
    const onWaiting = () => setLoading(true);
    video.addEventListener("playing", onPlaying);
    video.addEventListener("waiting", onWaiting);
    return () => {
      video.removeEventListener("playing", onPlaying);
      video.removeEventListener("waiting", onWaiting);
    };
  }, []);

  // Oculta el aviso si el usuario activa el sonido por cualquier medio
  // (clic en el overlay, control de volumen del navegador, etc.).
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const onVolumeChange = () => {
      if (!video.muted && video.volume > 0) {
        setMuteHintVisible(false);
        window.setTimeout(() => setDismissed(true), 300);
      }
    };
    video.addEventListener("volumechange", onVolumeChange);
    return () => video.removeEventListener("volumechange", onVolumeChange);
  }, []);

  const enableSound = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = false;
    if (video.volume === 0) video.volume = 1;
    // El listener de 'volumechange' se encarga del fade-out y desmontado.
  };

  const selectQuality = (src: string) => {
    setError(false);
    setCurrent(src);
  };

  return (
    <div className="overflow-hidden rounded-xl bg-black shadow-lg ring-1 ring-black/5">
      <div className="relative aspect-video">
        <video
          ref={videoRef}
          className="h-full w-full"
          poster="/player-poster.svg"
          controls
          playsInline
          autoPlay
          muted
        />

        {/* Indicador de carga */}
        {loading && !error && (
          <div className="pointer-events-none absolute inset-0 z-20 flex flex-col items-center justify-center gap-3 bg-black/40 backdrop-blur-sm">
            <div className="h-10 w-10 animate-spin rounded-full border-2 border-white/30 border-t-white" />
            <span className="text-sm font-medium text-white/80">Cargando señal…</span>
          </div>
        )}

        {/* Aviso de audio muteado (esquina superior derecha) */}
        {!dismissed && (
          <button
            type="button"
            onClick={enableSound}
            aria-label="Activar el sonido"
            className={[
              "absolute right-3 top-3 z-10 inline-flex items-center gap-2 rounded-full px-4 py-2",
              "text-sm font-medium text-white shadow-lg backdrop-blur-md",
              "transition-opacity duration-300",
              muteHintVisible ? "opacity-100" : "pointer-events-none opacity-0",
            ].join(" ")}
            style={{ backgroundColor: "rgba(11, 37, 69, 0.85)" }}
          >
            <i className="bi bi-volume-up-fill animate-pulse text-lg" aria-hidden="true" />
            Activa el sonido
          </button>
        )}
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
            {/* Selector de calidad: cada nivel es un manifiesto HLS independiente
                (no ABR), por eso se cambia la fuente. Solo un botón activo a la vez. */}
            <div className="flex overflow-hidden rounded-full bg-white/10 p-0.5">
              {TV_STREAMS.map((q) => {
                const isActive = current === q.src;
                return (
                  <button
                    key={q.src}
                    onClick={() => selectQuality(q.src)}
                    aria-pressed={isActive}
                    className={[
                      "rounded-full px-3 py-1 text-xs font-medium transition-colors",
                      isActive
                        ? "bg-white text-brand"
                        : "text-white/80 hover:text-white",
                    ].join(" ")}
                  >
                    {q.label}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
