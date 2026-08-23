import type { MetadataRoute } from "next";

import { getPosts } from "@/lib/content";
import { SITE } from "@/lib/site";

// Se regenera cada hora para recoger nuevos artículos del admin.
export const revalidate = 3600;

// Rutas públicas estáticas del sitio (deben coincidir con app/(public)).
const STATIC_ROUTES = [
  "",
  "/blog",
  "/programacion",
  "/senal",
  "/radio",
  "/recursos",
  "/recursos/estudios-biblicos",
  "/recursos/folletos",
  "/recursos/libros",
  "/recursos/devocionales",
  "/recursos/sermones",
  "/quienes-somos",
  "/contacto",
  "/donar",
  "/privacidad",
] as const;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = SITE.url;

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
    url: `${base}${route}`,
    changeFrequency: "weekly",
    priority: route === "" ? 1 : 0.7,
  }));

  // Artículos del blog (además del índice /blog incluido arriba).
  let postEntries: MetadataRoute.Sitemap = [];
  try {
    const posts = await getPosts();
    postEntries = posts.map((p) => ({
      url: `${base}/blog/${p.slug}`,
      lastModified: p.publishedAt || undefined,
      changeFrequency: "monthly",
      priority: 0.5,
    }));
  } catch {
    // Si la fuente de datos no está disponible al generar, se emite igual el
    // sitemap con las rutas estáticas.
  }

  return [...staticEntries, ...postEntries];
}
