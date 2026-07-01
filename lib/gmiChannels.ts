// Canales / redes de TV de Gospel Ministries International (GMI) en el mundo.
//
// IMPORTANTE: datos de referencia recopilados de gospelministry.org y búsquedas
// públicas. VERIFICAR y completar (ubicaciones exactas, idiomas y enlaces) con
// el equipo de GMI/Red ADvenir antes de publicar definitivamente.

export type GmiChannel = {
  name: string;
  region: string; // país o región de cobertura
  language: string;
  lat: number;
  lng: number;
  url?: string;
  logo?: string; // ruta del logo (ej: /images/channels/redeadvir.png)
};

export const GMI_CHANNELS: GmiChannel[] = [
  {
    name: "Red ADvenir Internacional",
    region: "Santa Cruz, Bolivia",
    language: "Español",
    lat: -17.7833,
    lng: -63.1821,
    url: "https://redadvenir.org",
  },
  {
    name: "ASTN — Advenir Spanish Television Network",
    region: "Mundo hispano",
    language: "Español",
    lat: -0.1807,
    lng: -78.4678,
  },
  {
    name: "APTN — Advenir Portuguese Television Network",
    region: "Mundo lusófono",
    language: "Português",
    lat: -15.7939,
    lng: -47.8828,
  },
  {
    name: "Rede Advir Televisão",
    region: "Brasil",
    language: "Português",
    lat: -23.5505,
    lng: -46.6333,
    url: "https://www.redeadvir.net.br/",
    logo: "/images/channels/redeadvir.jpg",
  },
  {
    name: "CFN — Caribbean Family Network",
    region: "El Caribe",
    language: "Inglés / Francés",
    lat: 13.1939,
    lng: -59.5432,
  },
  {
    name: "TV Famille",
    region: "Martinica / mundo francófono",
    language: "Francés",
    lat: 14.6036,
    lng: -61.0667,
    url: "https://tvfamille.org/",
    logo: "/images/channels/tvfamille.jpg",
  },
  {
    name: "Firstlight",
    region: "Nueva Zelanda",
    language: "Inglés",
    lat: -36.8485,
    lng: 174.7633,
    url: "https://www.firstlight.org.nz/",
    logo: "/images/channels/firstlight.jpg",
  },
  {
    name: "Global Family Network",
    region: "Granada (Caribe)",
    language: "Inglés",
    lat: 12.0564,
    lng: -61.7485,
    url: "https://gospelministry.org/global-family-network/",
  },
  {
    name: "Momentos de Paz",
    region: "Internacional (Pr. David Gates)",
    language: "Español",
    lat: 35.0526,
    lng: -85.0491,
    url: "https://www.youtube.com/channel/UCoMrFhwhnc8K5ES6PNaEQtA",
    logo: "/images/channels/moments-peace.jpg",
  },
  {
    name: "Light Channel Alemania",
    region: "Alemania",
    language: "Alemán",
    lat: 52.52,
    lng: 13.405,
    url: "https://www.lightchanneltv.de/tv/index",
    logo: "/images/channels/light-de.jpg",
  },
  {
    name: "Light Channel Bulgaria",
    region: "Bulgaria",
    language: "Búlgaro",
    lat: 42.6977,
    lng: 23.3219,
    url: "http://www.ltv.bg/",
    logo: "/images/channels/light-bg.jpg",
  },
  {
    name: "Light Channel República Checa",
    region: "República Checa",
    language: "Checo",
    lat: 50.0755,
    lng: 14.4378,
    url: "http://www.lctv.cz/",
    logo: "/images/channels/light-cz.jpg",
  },
  {
    name: "Light Channel Hungría",
    region: "Hungría",
    language: "Húngaro",
    lat: 47.4979,
    lng: 19.0402,
    url: "https://ltvhu.org/",
    logo: "/images/channels/light-hu.jpg",
  },
  {
    name: "Light Channel Italia",
    region: "Italia",
    language: "Italiano",
    lat: 41.9028,
    lng: 12.4964,
    url: "https://www.lightchannel.it/",
    logo: "/images/channels/light-it.jpg",
  },
];

// Enlaces a las páginas/recursos de la red GMI (para el footer y la sección).
export const GMI_LINKS = [
  { name: "Gospel Ministries International", url: "https://gospelministry.org" },
  { name: "GMI TV", url: "https://www.gmitv.org" },
  { name: "Red ADvenir", url: "https://redadvenir.org" },
  { name: "GMI Volunteers", url: "https://www.gmivolunteers.org" },
  { name: "Ver TV en vivo (GMI)", url: "https://gospelministry.org/watch-tv/" },
];
