// Canales / redes de TV de Gospel Ministries International (GMI) en el mundo.
// Fuente oficial: https://gospelministry.org/all-projects/

export type GmiChannel = {
  name: string;
  region: string;
  language: string;
  lat: number;
  lng: number;
  url?: string;
  logo?: string;
};

export const GMI_CHANNELS: GmiChannel[] = [
  // === SEDE - BOLIVIA ===
  {
    name: "Red ADvenir Internacional",
    region: "Bolivia",
    language: "Español",
    lat: -17.7833,
    lng: -63.1821,
    url: "https://redadvenir.org",
  },

  // === AMÉRICAS ===
  {
    name: "GMI TV",
    region: "Estados Unidos",
    language: "Inglés / Español",
    lat: 35.2271,
    lng: -85.0491,
    url: "https://www.gmitv.org",
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
  {
    name: "Television de la Famille",
    region: "Martinica / Caribe francófono",
    language: "Francés",
    lat: 14.6036,
    lng: -61.0667,
    url: "https://tvfamille.org/",
    logo: "/images/channels/tvfamille.jpg",
  },
  {
    name: "Mexico Broadcasting Project",
    region: "México",
    language: "Español",
    lat: 19.4326,
    lng: -99.1332,
  },

  // === EUROPA - LIGHT CHANNEL NETWORK ===
  {
    name: "Light Channel Germany",
    region: "Alemania",
    language: "Alemán",
    lat: 52.52,
    lng: 13.405,
    url: "https://www.lightchanneltv.de/",
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
    name: "Light Channel Hungary",
    region: "Hungría",
    language: "Húngaro",
    lat: 47.4979,
    lng: 19.0402,
    url: "https://ltvhu.org/",
    logo: "/images/channels/light-hu.jpg",
  },
  {
    name: "Light Channel Italy",
    region: "Italia",
    language: "Italiano",
    lat: 41.9028,
    lng: 12.4964,
    url: "https://www.lightchannel.it/",
    logo: "/images/channels/light-it.jpg",
  },
  {
    name: "Light Channel Romania",
    region: "Rumania",
    language: "Rumano",
    lat: 44.4268,
    lng: 26.1025,
    url: "https://speranta.tv/",
  },
  {
    name: "Light Channel Holland",
    region: "Países Bajos",
    language: "Holandés",
    lat: 52.3676,
    lng: 4.9041,
  },

  // === OCEANÍA ===
  {
    name: "Firstlight Broadcasting",
    region: "Nueva Zelanda",
    language: "Inglés",
    lat: -36.8485,
    lng: 174.7633,
    url: "https://www.firstlight.org.nz/",
    logo: "/images/channels/firstlight.jpg",
  },

  // === ASIA ===
  {
    name: "He's Coming Broadcasting Network Malaysia",
    region: "Malasia",
    language: "Malayo / Inglés",
    lat: 3.139,
    lng: 101.6869,
  },
  {
    name: "He's Coming Broadcasting Network Indonesia",
    region: "Indonesia",
    language: "Indonesio",
    lat: -6.2088,
    lng: 106.8456,
  },

  // === ÁFRICA ===
  {
    name: "2nd Coming Broadcasting Network",
    region: "Kenia",
    language: "Suajili / Inglés",
    lat: -1.2921,
    lng: 36.8219,
  },
];

// Enlaces a las páginas/recursos de la red GMI.
export const GMI_LINKS = [
  { name: "Gospel Ministries International", url: "https://gospelministry.org" },
  { name: "GMI TV", url: "https://www.gmitv.org" },
  { name: "Todos los proyectos GMI", url: "https://gospelministry.org/all-projects/" },
  { name: "Ver TV en vivo", url: "https://gospelministry.org/watch-tv/" },
];
