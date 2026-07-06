"use client";

import { useEffect, useRef, useState } from "react";
import videojs from "video.js";
import type Player from "video.js/dist/types/player";
import "video.js/dist/video-js.css";

import { TV_STREAMS, DEFAULT_TV_STREAM } from "@/lib/streams";

// Reproductor de la señal en vivo con Video.js + VHS (videojs-http-streaming),
// el mismo motor que usa el sitio anterior (redadvenir.org) y que reproduce
// estos manifiestos HLS de forma estable. VHS viene incluido en Video.js 8.
export default function LiveTVPlayer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<Player | null>(null);
  // La fuente inicial la carga el efecto de init; este ref evita que el efecto
  // de cambio de calidad vuelva a cargarla en el montaje (doble carga).
  const skipInitialSrc = useRef(true);
  // Recuperación ante caídas de red del stream en vivo: el handler de error se
  // registra una sola vez, así que lee la fuente actual desde un ref.
  const currentSrcRef = useRef(DEFAULT_TV_STREAM.src);
  const retryCountRef = useRef(0);
  const retryTimerRef = useRef<number | null>(null);
  const [current, setCurrent] = useState(DEFAULT_TV_STREAM.src);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  // Overlay de audio muteado.
  // muteHintVisible controla la opacidad (fade-out); dismissed lo desmonta
  // de forma definitiva una vez que el usuario activó el sonido por primera vez.
  const [muteHintVisible, setMuteHintVisible] = useState(true);
  const [dismissed, setDismissed] = useState(false);

  // Mantener el ref de la fuente sincronizado con la calidad seleccionada,
  // para que el handler de error (registrado una sola vez) recargue la correcta.
  useEffect(() => {
    currentSrcRef.current = current;
  }, [current]);

  // Inicializa el player una sola vez (y lo destruye al desmontar).
  useEffect(() => {
    if (!playerRef.current) {
      // El stream en vivo se cae/reintenta seguido; VHS lo reporta con logs de
      // error ruidosos (incl. un TypeError interno de 'duration' cuando el
      // chunklist no llega). Nuestro propio manejo de error + reintento cubre el
      // estado visible, así que silenciamos ese ruido de la consola.
      videojs.log.level("off");

      // Video.js recomienda crear el elemento a mano e insertarlo en un
      // contenedor propio para no chocar con el renderizado de React.
      const videoEl = document.createElement("video-js");
      videoEl.classList.add("vjs-big-play-centered");
      containerRef.current?.appendChild(videoEl);

      const player = (playerRef.current = videojs(videoEl, {
        controls: true,
        autoplay: true,
        muted: true,
        playsinline: true,
        preload: "auto",
        fill: true, // ocupa el contenedor aspect-video
        poster: "/player-poster.svg",
        sources: [{ src: current, type: "application/x-mpegURL" }],
      }));

      player.on("playing", () => {
        setLoading(false);
        setError(false);
        retryCountRef.current = 0; // reproducción OK => reiniciar reintentos
      });
      player.on("waiting", () => setLoading(true));

      // Recuperación ante error: si es de red/medios (típico en vivo), reiniciar
      // la fuente con backoff en vez de rendirse; tras varios intentos, mostrar
      // el aviso de error. Esto además corta el bucle de reintentos internos de
      // VHS que dispara el TypeError de 'duration'.
      player.on("error", () => {
        const err = player.error();
        const recoverable = !err || err.code !== 1; // todo salvo abort del usuario
        if (recoverable && retryCountRef.current < 5) {
          retryCountRef.current += 1;
          setError(false);
          setLoading(true);
          if (retryTimerRef.current) window.clearTimeout(retryTimerRef.current);
          retryTimerRef.current = window.setTimeout(() => {
            if (player.isDisposed()) return;
            // Reasignar la fuente reinicia los loaders de VHS y limpia el error.
            player.src({ src: currentSrcRef.current, type: "application/x-mpegURL" });
            player.play()?.catch(() => {});
          }, 3000);
        } else {
          setError(true);
        }
      });

      // Oculta el aviso si el usuario activa el sonido por cualquier medio.
      player.on("volumechange", () => {
        if (!player.muted() && (player.volume() ?? 0) > 0) {
          setMuteHintVisible(false);
          window.setTimeout(() => setDismissed(true), 300);
        }
      });
    }

    return () => {
      if (retryTimerRef.current) window.clearTimeout(retryTimerRef.current);
      const player = playerRef.current;
      if (player && !player.isDisposed()) {
        player.dispose();
        playerRef.current = null;
      }
    };
    // Solo al montar: la fuente inicial se toma de `current` una vez; los
    // cambios de calidad los maneja el efecto de abajo.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Cambio de calidad: cada nivel es un manifiesto HLS independiente (no ABR),
  // así que se recarga la fuente. Se evita recargar si ya es la fuente actual
  // (incluye el montaje inicial, donde init ya cargó `current`).
  useEffect(() => {
    if (skipInitialSrc.current) {
      skipInitialSrc.current = false;
      return;
    }
    const player = playerRef.current;
    if (!player) return;
    if (retryTimerRef.current) window.clearTimeout(retryTimerRef.current);
    retryCountRef.current = 0;
    setError(false);
    setLoading(true);
    player.src({ src: current, type: "application/x-mpegURL" });
    player.play()?.catch(() => {});
  }, [current]);

  const enableSound = () => {
    const player = playerRef.current;
    if (!player) return;
    player.muted(false);
    if (player.volume() === 0) player.volume(1);
    // El listener de 'volumechange' se encarga del fade-out y desmontado.
  };

  const selectQuality = (src: string) => {
    setError(false);
    setCurrent(src);
  };

  return (
    <div className="overflow-hidden rounded-xl bg-black shadow-lg ring-1 ring-black/5">
      <div className="relative aspect-video" ref={containerRef} data-vjs-player>
        {/* Video.js inyecta aquí el elemento <video-js> */}

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
