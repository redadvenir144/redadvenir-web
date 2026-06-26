"use client";

import { useState } from "react";

import type { Program } from "@/lib/types";
import {
  buildEmbedUrl,
  buildWatchUrl,
  getThumbnailId,
} from "@/lib/youtubeEmbed";

export default function YouTubePlaylist({ program }: { program: Program }) {
  const [activated, setActivated] = useState(false);

  const src = buildEmbedUrl(program.youtubePlaylistId);
  const watchUrl = buildWatchUrl(program.youtubePlaylistId);
  const thumbId = getThumbnailId(program.youtubePlaylistId);
  // Miniatura directa de YouTube (carga aunque el reproductor embebido falle).
  const thumb = thumbId
    ? `https://i.ytimg.com/vi/${thumbId}/hqdefault.jpg`
    : null;

  const embedSrc = src
    ? `${src}${src.includes("?") ? "&" : "?"}autoplay=1`
    : null;

  return (
    <article className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="relative aspect-video bg-slate-900">
        {activated && embedSrc ? (
          <iframe
            title={program.title}
            src={embedSrc}
            className="h-full w-full"
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : src ? (
          <button
            type="button"
            onClick={() => setActivated(true)}
            aria-label={`Reproducir ${program.title}`}
            className="group absolute inset-0 h-full w-full"
          >
            {thumb ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={thumb}
                alt={program.title}
                loading="lazy"
                className="h-full w-full object-cover"
              />
            ) : (
              <span className="flex h-full items-center justify-center">
                <i className="bi bi-youtube text-5xl text-live/80" />
              </span>
            )}
            <span className="absolute inset-0 flex items-center justify-center bg-black/30 transition-colors group-hover:bg-black/45">
              <i className="bi bi-play-circle-fill text-6xl text-white drop-shadow-lg" />
            </span>
          </button>
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-2 px-4 text-center text-slate-400">
            <i className="bi bi-youtube text-4xl text-live/70" />
            <p className="text-sm">Video pendiente de configurar</p>
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-slate-800">{program.title}</h3>
        {program.description && (
          <p className="mt-1 text-sm text-slate-600">{program.description}</p>
        )}
        {watchUrl && (
          <a
            href={watchUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-brand-500 hover:underline"
          >
            <i className="bi bi-youtube text-live" /> Ver en YouTube
          </a>
        )}
      </div>
    </article>
  );
}
