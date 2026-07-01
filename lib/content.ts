// Capa de contenido: lee de la base de datos local (data/db.json), que se
// gestiona desde el admin (/admin). Las páginas solo llaman a estas funciones.

import { list } from "./db";
import type {
  Belief,
  Faq,
  Post,
  Program,
  ScheduleSlot,
  StudyPdf,
  GalleryImage,
  AboutConfig,
} from "./types";

export async function getPosts(): Promise<Post[]> {
  const posts = await list<Post>("posts");
  return [...posts].sort((a, b) =>
    (b.publishedAt || "").localeCompare(a.publishedAt || ""),
  );
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const posts = await list<Post>("posts");
  return posts.find((p) => p.slug === slug) ?? null;
}

export async function getPrograms(): Promise<Program[]> {
  return list<Program>("programs");
}

export async function getSchedule(): Promise<ScheduleSlot[]> {
  const slots = await list<ScheduleSlot>("schedule");
  return [...slots].sort((a, b) => (a.time || "").localeCompare(b.time || ""));
}

export async function getStudies(): Promise<StudyPdf[]> {
  return list<StudyPdf>("studies");
}

export async function getBeliefs(): Promise<Belief[]> {
  const beliefs = await list<Belief>("beliefs");
  return [...beliefs].sort((a, b) => (a.number || 0) - (b.number || 0));
}

export async function getFaqs(): Promise<Faq[]> {
  return list<Faq>("faqs");
}

export async function getGallery(): Promise<GalleryImage[]> {
  const images = await list<GalleryImage>("gallery");
  return [...images].sort((a, b) => (a.order ?? 999) - (b.order ?? 999));
}

export async function getAboutConfig(): Promise<AboutConfig | null> {
  const items = await list<AboutConfig>("about");
  return items[0] ?? null;
}
