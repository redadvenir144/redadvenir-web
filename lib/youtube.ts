// Trae los últimos videos del canal de YouTube vía YouTube Data API v3.
// Requiere la variable de entorno YOUTUBE_API_KEY. Si no está configurada,
// devuelve [] (la sección simplemente no se muestra).
//
// Cómo obtener la clave:
//   1. https://console.cloud.google.com → crear proyecto
//   2. Habilitar "YouTube Data API v3"
//   3. Crear una API key (Credenciales) y ponerla en .env.local como
//      YOUTUBE_API_KEY=...
//   4. (Opcional) YOUTUBE_CHANNEL_HANDLE=ADvenir  (sin la @)

export type YouTubeVideo = {
  id: string;
  title: string;
  thumbnail: string;
  publishedAt: string;
};

const API_KEY = process.env.YOUTUBE_API_KEY;
const CHANNEL_HANDLE = process.env.YOUTUBE_CHANNEL_HANDLE || "ADvenir";

type ChannelResp = {
  items?: { contentDetails?: { relatedPlaylists?: { uploads?: string } } }[];
};
type PlaylistResp = {
  items?: {
    snippet: {
      title: string;
      publishedAt: string;
      resourceId: { videoId: string };
      thumbnails?: Record<string, { url: string }>;
    };
  }[];
};

async function ytFetch<T>(url: string): Promise<T> {
  // Cache de 1 hora para no agotar la cuota de la API.
  const res = await fetch(url, { next: { revalidate: 3600 } });
  if (!res.ok) throw new Error(`YouTube API ${res.status}`);
  return res.json() as Promise<T>;
}

export async function getChannelVideos(max = 6): Promise<YouTubeVideo[]> {
  if (!API_KEY) return [];
  try {
    // 1. Handle del canal → playlist de "subidas".
    const ch = await ytFetch<ChannelResp>(
      `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&forHandle=${CHANNEL_HANDLE}&key=${API_KEY}`,
    );
    const uploads = ch.items?.[0]?.contentDetails?.relatedPlaylists?.uploads;
    if (!uploads) return [];

    // 2. Últimos videos de esa playlist.
    const pl = await ytFetch<PlaylistResp>(
      `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${uploads}&maxResults=${max}&key=${API_KEY}`,
    );

    return (pl.items ?? []).map((it) => {
      const t = it.snippet.thumbnails;
      return {
        id: it.snippet.resourceId.videoId,
        title: it.snippet.title,
        thumbnail: t?.medium?.url || t?.high?.url || t?.default?.url || "",
        publishedAt: it.snippet.publishedAt,
      };
    });
  } catch {
    return [];
  }
}
