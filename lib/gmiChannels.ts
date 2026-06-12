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
    name: "Terceiro Anjo",
    region: "Brasil",
    language: "Português",
    lat: -23.5505,
    lng: -46.6333,
  },
  {
    name: "CFN — Caribbean Family Network",
    region: "El Caribe",
    language: "Inglés / Francés",
    lat: 13.1939,
    lng: -59.5432,
  },
  {
    name: "Martinique de la Famille",
    region: "Martinica",
    language: "Francés",
    lat: 14.6036,
    lng: -61.0667,
  },
  {
    name: "Firstlight Broadcasting Network",
    region: "Nueva Zelanda",
    language: "Inglés",
    lat: -36.8485,
    lng: 174.7633,
  },
  {
    name: "Global Family Network",
    region: "Granada (Caribe)",
    language: "Inglés",
    lat: 12.0564,
    lng: -61.7485,
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
