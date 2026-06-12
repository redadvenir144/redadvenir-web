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
  { channel: "Canal 23", cities: "Santa Cruz, Cochabamba, Oruro, Tarija, Sucre" },
  { channel: "Canal 43", cities: "La Paz" },
  { channel: "Canal 45", cities: "Trinidad" },
  { channel: "Canal 48", cities: "Pando" },
];

export const CABLE_PROVIDERS = [{ name: "TigoStar", channel: "Canal 23" }];

export const STREAMING_URLS = TV_STREAMS;

export const APPS = SMART_TV_APPS;

// Señales de GMI en el resto del mundo (referencial: completar con el equipo).
export const GMI_SIGNALS = [
  { region: "Norteamérica", detail: "Roku y Amazon Fire TV — Red Advenir / GMI" },
  { region: "Sudamérica", detail: "Cobertura satelital y cable" },
];
