// Estilos de los badges de categoría del blog, en paleta de marca.
// Indexados por la clave del enum PostCategory para mantener tipado estricto.

import type { PostCategory } from "./types";

export type CategoryStyle = {
  bg: string;
  text: string;
  border: string;
};

export const categoryStyles: Record<PostCategory, CategoryStyle> = {
  profetica: {
    bg: "bg-brand/10",
    text: "text-brand",
    border: "border-brand/20",
  },
  teologica: {
    bg: "bg-slate-100",
    text: "text-slate-700",
    border: "border-slate-300",
  },
  noticia: {
    bg: "bg-brand-500/10",
    text: "text-brand-500",
    border: "border-brand-500/20",
  },
};

// Fallback defensivo: si en el futuro se agrega una categoría al enum y no
// se actualiza el mapa, la UI no rompe.
export const defaultCategoryStyle: CategoryStyle = {
  bg: "bg-slate-100",
  text: "text-slate-700",
  border: "border-slate-300",
};

export function getCategoryStyle(category: string): CategoryStyle {
  return categoryStyles[category as PostCategory] ?? defaultCategoryStyle;
}
