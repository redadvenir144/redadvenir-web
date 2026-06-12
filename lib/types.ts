// Tipos del contenido editable (compartidos entre Sanity y los datos de ejemplo).

export type PostCategory = "noticia" | "profetica" | "teologica";

export type Post = {
  _id: string;
  title: string;
  slug: string;
  category: PostCategory;
  excerpt: string;
  body?: string;
  coverImage?: string;
  publishedAt: string; // ISO
  author?: string;
};

export type Program = {
  _id: string;
  title: string;
  description?: string;
  youtubePlaylistId: string;
  thumbnail?: string;
};

export type ScheduleSlot = {
  _id: string;
  day: string; // Lunes..Domingo
  time: string; // "08:00"
  title: string;
};

export type StudyPdf = {
  _id: string;
  title: string;
  description?: string;
  pdfUrl: string;
  cover?: string;
};

export type Belief = {
  _id: string;
  number: number;
  title: string;
  summary: string;
};

export type Faq = {
  _id: string;
  question: string;
  answer: string;
  keywords: string[];
};

export const CATEGORY_LABEL: Record<PostCategory, string> = {
  noticia: "Noticia cristiana",
  profetica: "Noticia profética",
  teologica: "Nota teológica",
};
