// Datos técnicos de la señal (sección "Señal").
// IMPORTANTE: verificar y actualizar con el equipo del canal antes de publicar.

import { TV_STREAMS, SMART_TV_APPS } from "./streams";

export const SATELLITES = [
  {
    name: "Túpac Katari (TKSAT-1)",
    detail: "Satélite boliviano. Cobertura nacional.",
  },
  { name: "IntelSat 21", detail: "Cobertura internacional." },
];

export const OPEN_TV_CHANNELS = [
  { channel: "23.1", cities: "Santa Cruz (digital)" },
  { channel: "23", cities: "Santa Cruz" },
  { channel: "23", cities: "Cochabamba" },
  { channel: "23", cities: "Tarija" },
  { channel: "23", cities: "Sucre, Chuquisaca" },
  { channel: "02", cities: "San Joaquín, Beni" },
  { channel: "03", cities: "Magdalena, Beni" },
  { channel: "24", cities: "Oruro, Beni" },
  { channel: "24", cities: "Rurrenabaque, Beni" },
  { channel: "26", cities: "Reyes, Beni" },
  { channel: "27", cities: "Riberalta, Beni" },
  { channel: "27", cities: "San Borja, Beni" },
  { channel: "28", cities: "San Ramón, Beni" },
  { channel: "30", cities: "San Ignacio de Moxos, Beni" },
  { channel: "30", cities: "Santa Rosa, Beni" },
  { channel: "30", cities: "Ixiamas, La Paz" },
  { channel: "35", cities: "Guayara, Beni" },
  { channel: "43", cities: "La Paz" },
  { channel: "45", cities: "Trinidad" },
  { channel: "48", cities: "Cobija, Pando" },
  { channel: "36", cities: "Montero" },
];

export const CABLE_PROVIDERS = [{ name: "TigoStar", channel: "Canal 23" }];

export const STREAMING_URLS = TV_STREAMS;

export const APPS = SMART_TV_APPS;

// Señales de GMI en el resto del mundo (referencial: completar con el equipo).
export const GMI_SIGNALS = [
  { region: "Norteamérica", detail: "Roku y Amazon Fire TV — Red Advenir / GMI" },
  { region: "Sudamérica", detail: "Cobertura satelital y cable" },
];
