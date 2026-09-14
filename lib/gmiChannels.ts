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
  // === SEDE CENTRAL ===
  {
    name: "Red ADvenir Internacional",
    region: "Santa Cruz, Bolivia",
    language: "Español",
    lat: -17.7833,
    lng: -63.1821,
    url: "https://redadvenir.org",
  },

  // === AMÉRICAS ===
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
    name: "ADvenir Perú",
    region: "Perú",
    language: "Español",
    lat: -12.0464,
    lng: -77.0428,
  },
  {
    name: "ADvenir Argentina",
    region: "Argentina",
    language: "Español",
    lat: -34.6037,
    lng: -58.3816,
  },
  {
    name: "ADvenir Paraguay",
    region: "Paraguay",
    language: "Español",
    lat: -25.2637,
    lng: -57.5759,
  },
  {
    name: "ADvenir Chile",
    region: "Chile",
    language: "Español",
    lat: -33.4489,
    lng: -70.6693,
  },
  {
    name: "ADvenir Ecuador",
    region: "Ecuador",
    language: "Español",
    lat: -0.1807,
    lng: -78.4678,
  },
  {
    name: "ADvenir Colombia",
    region: "Colombia",
    language: "Español",
    lat: 4.711,
    lng: -74.0721,
  },
  {
    name: "Momentos de Paz",
    region: "Estados Unidos",
    language: "Español",
    lat: 35.0526,
    lng: -85.0491,
    url: "https://www.youtube.com/channel/UCoMrFhwhnc8K5ES6PNaEQtA",
    logo: "/images/channels/moments-peace.jpg",
  },
  {
    name: "GMI TV",
    region: "Estados Unidos (sede GMI)",
    language: "Inglés / Español",
    lat: 35.2271,
    lng: -80.8431,
    url: "https://www.gmitv.org",
  },

  // === CARIBE ===
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
    name: "Global Family Network",
    region: "Granada (Caribe)",
    language: "Inglés",
    lat: 12.0564,
    lng: -61.7485,
    url: "https://gospelministry.org/global-family-network/",
    logo: "/images/channels/global-family.jpg",
  },

  // === EUROPA - LIGHT CHANNEL NETWORK ===
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
  {
    name: "Light Channel Rumania",
    region: "Rumania",
    language: "Rumano",
    lat: 44.4268,
    lng: 26.1025,
    url: "https://speranta.tv/",
  },
  {
    name: "Light Channel Polonia",
    region: "Polonia",
    language: "Polaco",
    lat: 52.2297,
    lng: 21.0122,
  },
  {
    name: "Light Channel Serbia",
    region: "Serbia",
    language: "Serbio",
    lat: 44.7866,
    lng: 20.4489,
  },
  {
    name: "Light Channel Croacia",
    region: "Croacia",
    language: "Croata",
    lat: 45.815,
    lng: 15.9819,
  },
  {
    name: "Light Channel Eslovaquia",
    region: "Eslovaquia",
    language: "Eslovaco",
    lat: 48.1486,
    lng: 17.1077,
  },
  {
    name: "Light Channel Ucrania",
    region: "Ucrania",
    language: "Ucraniano",
    lat: 50.4501,
    lng: 30.5234,
  },
  {
    name: "Light Channel Moldavia",
    region: "Moldavia",
    language: "Rumano",
    lat: 47.0105,
    lng: 28.8638,
  },
  {
    name: "Light Channel Rusia",
    region: "Rusia",
    language: "Ruso",
    lat: 55.7558,
    lng: 37.6173,
  },
  {
    name: "Light Channel Albania",
    region: "Albania",
    language: "Albanés",
    lat: 41.3275,
    lng: 19.8187,
  },

  // === OCEANÍA ===
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
    name: "Firstlight Australia",
    region: "Australia",
    language: "Inglés",
    lat: -33.8688,
    lng: 151.2093,
  },

  // === ASIA ===
  {
    name: "GMI India",
    region: "India",
    language: "Hindi / Inglés",
    lat: 28.6139,
    lng: 77.209,
  },
  {
    name: "GMI Filipinas",
    region: "Filipinas",
    language: "Tagalo / Inglés",
    lat: 14.5995,
    lng: 120.9842,
  },

  // === ÁFRICA ===
  {
    name: "GMI Sudáfrica",
    region: "Sudáfrica",
    language: "Inglés / Afrikáans",
    lat: -26.2041,
    lng: 28.0473,
  },
  {
    name: "GMI Kenia",
    region: "Kenia",
    language: "Suajili / Inglés",
    lat: -1.2921,
    lng: 36.8219,
  },
  {
    name: "GMI Nigeria",
    region: "Nigeria",
    language: "Inglés",
    lat: 9.082,
    lng: 8.6753,
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
