// Resolución de textos editables del sitio. Las páginas (Server Components)
// llaman getSiteText() y obtienen una función t(key) que devuelve el valor
// guardado por el admin o, si no existe, el valor por defecto del registro.

import { list } from "./db";
import { CONTENT_DEFAULTS } from "./content-blocks";

type ContentRow = { _id: string; key: string; value: string };

// Devuelve un mapa clave → valor guardado (solo lo que el admin modificó).
export async function getSavedText(): Promise<Record<string, string>> {
  const rows = await list<ContentRow>("content");
  const map: Record<string, string> = {};
  for (const r of rows) {
    if (r && typeof r.key === "string") map[r.key] = r.value ?? "";
  }
  return map;
}

export type TextResolver = (key: string) => string;

// Resuelve todos los textos de una vez. Uso típico en una página:
//   const t = await getSiteText();
//   <p>{t("donar.intro")}</p>
export async function getSiteText(): Promise<TextResolver> {
  const saved = await getSavedText();
  return (key: string) => {
    if (Object.prototype.hasOwnProperty.call(saved, key)) return saved[key];
    return CONTENT_DEFAULTS[key] ?? "";
  };
}
