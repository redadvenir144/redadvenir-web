import type { Program } from "@/lib/types";

// Acepta un ID de lista (PL…), un ID de video, o una URL de YouTube pegada.
// Devuelve la URL de embed o null si el dato es inválido/placeholder.
function buildEmbedUrl(raw: string | undefined): string | null {
  if (!raw) return null;
  let value = raw.trim();

  // IDs de ejemplo del contenido de demostración.
  if (/x{4,}/i.test(value)) return null;

  // Si pegaron una URL completa, extraer list= o v=.
  if (value.includes("youtube.com") || value.includes("youtu.be")) {
    try {
      const url = new URL(value);
      const list = url.searchParams.get("list");
      const v = url.searchParams.get("v");
      const short = url.hostname.includes("youtu.be")
        ? url.pathname.slice(1)
        : null;
      value = list || v || short || "";
    } catch {
      return null;
    }
  }

  if (!value) return null;

  // Listas de reproducción (PL, UU, FL, OL, RD…).
  if (/^(PL|UU|FL|OL|RD|LL)[\w-]+$/.test(value)) {
    return `https://www.youtube.com/embed/videoseries?list=${value}`;
  }
  // De lo contrario, lo tratamos como ID de video.
  return `https://www.youtube.com/embed/${value}`;
}

export default function YouTubePlaylist({ program }: { program: Program }) {
  const src = buildEmbedUrl(program.youtubePlaylistId);

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
      </div>
    </article>
  );
}
