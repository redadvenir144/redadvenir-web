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

// Calidad por defecto al cargar el reproductor (Alta: buen balance).
export const DEFAULT_TV_STREAM = TV_STREAMS[1];

export type RadioStation = {
  name: string;
  src: string;
  image?: string;
  appUrl?: string;
};

export const RADIO_STATIONS: RadioStation[] = [
  {
    name: "Radio ADvenir",
    src: "https://ec1.yesstreaming.net:2195/stream",
    image: "/images/radio-advenir.jpg",
    appUrl:
      "https://play.google.com/store/apps/details?id=com.xoxdnlxox.reladven",
  },
  {
    name: "Radio Altiplano",
    src: "http://stream.eleden.com:8660/altiplano.aac",
    image: "/images/radio-altiplano.jpg",
    appUrl:
      "https://play.google.com/store/apps/details?id=radioadvenir2.appvgv",
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
