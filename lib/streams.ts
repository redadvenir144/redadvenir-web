// URLs de transmisión en vivo de Red ADvenir.
// Preservadas del sitio actual (redadvenir.org). Verificar periódicamente.

export type TvQuality = {
  label: string;
  src: string;
};

export const TV_STREAMS: TvQuality[] = [
  { label: "Media", src: "https://streamer1.streamhost.org/salive/GMIredadvenirm/playlist.m3u8" },
  { label: "Alta", src: "https://streamer1.streamhost.org/salive/GMIredadvenirh/playlist.m3u8" },
  // HD (GMIredadvenirHD, 1280x720, ~2.3 Mbps). El servidor solo publica ~3
  // segmentos en vivo (~30s de ventana), así que en HD (segmentos más pesados)
  // una red floja puede drenar el buffer y frenarse. Por eso NO es el default:
  // queda como opción manual, igual que en el sitio anterior (redadvenir.org),
  // y el player afloja su config de buffer para tolerarlo mejor.
  { label: "HD", src: "https://streamer1.streamhost.org/salive/GMIredadvenirHD/playlist.m3u8" },
];

// Calidad por defecto al cargar el reproductor: Alta.
// El usuario puede subir a HD o bajar a Media con los botones del reproductor.
export const DEFAULT_TV_STREAM = TV_STREAMS[1];

export type RadioStation = {
  name: string;
  src: string;
  image?: string;
  appUrl?: string;
  anchor?: string; // id para enlaces del menú (ej: /radio#advenir)
  website?: string; // sitio web propio de la emisora
};

export const RADIO_STATIONS: RadioStation[] = [
  {
    name: "Radio ADvenir FM 88.9",
    src: "https://ec1.yesstreaming.net:2195/stream",
    image: "/images/radio-advenir.jpg",
    appUrl:
      "https://play.google.com/store/apps/details?id=com.xoxdnlxox.reladven",
    anchor: "advenir",
    website: "https://radioadvenir.org/",
  },
  {
    name: "Radio Altiplano Advenir 820 AM",
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
