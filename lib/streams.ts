// URLs de transmisión en vivo de Red ADvenir.
// Preservadas del sitio actual (redadvenir.org). Verificar periódicamente.

export type TvQuality = {
  label: string;
  src: string;
};

export const TV_STREAMS: TvQuality[] = [
  { label: "Media", src: "https://streamer1.streamhost.org/salive/GMIredadvenirm/playlist.m3u8" },
  { label: "Alta", src: "https://streamer1.streamhost.org/salive/GMIredadvenirh/playlist.m3u8" },
  { label: "HD", src: "https://streamer1.streamhost.org/salive/GMIredadvenirHD/playlist.m3u8" },
];

// Calidad por defecto al cargar el reproductor: Alta.
// El usuario puede cambiar a Media/HD con los botones del reproductor.
export const DEFAULT_TV_STREAM = TV_STREAMS[1];

export type RadioStation = {
  name: string;
  src: string;
  image?: string;
  appUrl?: string;
  anchor?: string; // id para enlaces del menú (ej: /radio#advenir)
};

export const RADIO_STATIONS: RadioStation[] = [
  {
    name: "Radio ADvenir FM 88.9",
    src: "https://ec1.yesstreaming.net:2195/stream",
    image: "/images/radio-advenir.jpg",
    appUrl:
      "https://play.google.com/store/apps/details?id=com.xoxdnlxox.reladven",
    anchor: "advenir",
  },
  {
    name: "Radio Altiplano AM",
    src: "https://stream.eleden.com:8660/altiplano.aac",
    image: "/images/radio-altiplano.jpg",
    appUrl:
      "https://play.google.com/store/apps/details?id=radioadvenir2.appvgv",
    anchor: "altiplano",
  },
];

// Apps de TV en pantallas conectadas.
export const SMART_TV_APPS = [
  {
    platform: "Roku",
    url: "https://channelstore.roku.com/details/237107/red-advenir",
  },
  {
    platform: "Amazon Fire TV",
    url: "https://www.amazon.com/Gospel-Ministries-International-Red-Advenir/dp/B07GVQJPL5",
  },
];
