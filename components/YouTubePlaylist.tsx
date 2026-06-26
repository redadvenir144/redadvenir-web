import type { Program } from "@/lib/types";
import { buildEmbedUrl, buildWatchUrl } from "@/lib/youtubeEmbed";

export default function YouTubePlaylist({ program }: { program: Program }) {
  const src = buildEmbedUrl(program.youtubePlaylistId);
  const watchUrl = buildWatchUrl(program.youtubePlaylistId);

  return (
    <article className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="aspect-video bg-slate-900">
        {src ? (
          <iframe
            title={program.title}
            src={src}
            className="h-full w-full"
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-2 px-4 text-center text-slate-400">
            <i className="bi bi-youtube text-4xl text-live/70" />
            <p className="text-sm">Video pendiente de configurar</p>
            <p className="text-xs text-slate-500">
              Agrega el ID de la lista de YouTube desde el panel de administración.
            </p>
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
