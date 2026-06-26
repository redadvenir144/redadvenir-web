import type { Program } from "@/lib/types";
import { buildWatchUrl, getThumbnailId, hasPlayableVideo } from "@/lib/youtubeEmbed";

export default function YouTubePlaylist({ program }: { program: Program }) {
  const watchUrl = buildWatchUrl(program.youtubePlaylistId);
  const playable = hasPlayableVideo(program.youtubePlaylistId);
  const thumbId = getThumbnailId(program.youtubePlaylistId);
  // Miniatura directa de YouTube (carga aunque el sitio tenga problemas de cert).
  const thumb = thumbId
    ? `https://i.ytimg.com/vi/${thumbId}/hqdefault.jpg`
    : null;

  return (
    <article className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-md">
      <div className="relative aspect-video bg-slate-900">
        {playable && watchUrl ? (
          // Abre el video directamente en YouTube (evita el Error 153 del
          // reproductor embebido mientras el sitio no tenga un cert válido).
          <a
            href={watchUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Ver ${program.title} en YouTube`}
            className="group absolute inset-0 block"
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
          </a>
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
