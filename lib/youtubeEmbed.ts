// Utilidades para convertir lo que se carga en el admin (ID de lista, ID de
// video, o una URL de YouTube pegada) en URLs de embed / de YouTube.

// Devuelve la URL de embed, o null si el dato es inválido/placeholder.
export function buildEmbedUrl(raw: string | undefined): string | null {
  if (!raw) return null;
  let value = raw.trim();

  // IDs de ejemplo del contenido de demostración (PLxxxx…).
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

// URL para abrir el video/lista directamente en YouTube (respaldo si un
// bloqueador del navegador rompe el reproductor embebido).
export function buildWatchUrl(raw: string | undefined): string | null {
  if (!raw) return null;
  const value = raw.trim();
  if (/x{4,}/i.test(value)) return null;
  if (value.includes("youtube.com") || value.includes("youtu.be")) return value;
  if (/^(PL|UU|FL|OL|RD|LL)[\w-]+$/.test(value)) {
    return `https://www.youtube.com/playlist?list=${value}`;
  }
  return `https://www.youtube.com/watch?v=${value}`;
}

// ¿El programa tiene un video reproducible (no placeholder)?
export function hasPlayableVideo(raw: string | undefined): boolean {
  return buildEmbedUrl(raw) !== null;
}
