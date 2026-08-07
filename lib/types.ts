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
  verses?: string[];
};

// Usuario del panel de administración. Las contraseñas se guardan solo como
// hash bcrypt. Un super-admin accede a todo (incluida la gestión de usuarios);
// un usuario normal solo a las secciones listadas en `sections` (claves de
// recurso). Los campos de rate-limiting protegen el login por usuario.
export type User = {
  _id: string;
  username: string;
  name: string;
  passwordHash: string;
  isSuperAdmin: boolean;
  sections: string[];
  createdAt: string;
  failedAttempts?: number;
  lastFailedAt?: number; // epoch ms
  lockedUntil?: number | null; // epoch ms
};

// Usuario sin el hash de contraseña, seguro para enviar al cliente.
export type PublicUser = Omit<User, "passwordHash">;

export type GalleryImage = {
  _id: string;
  image: string;
  caption?: string;
  order?: number;
};

export type AboutConfig = {
  _id: string;
  founderPhoto?: string;
  hqPhoto?: string;
  foundedPhoto?: string;
};

export type Faq = {
  _id: string;
  question: string;
  answer: string;
  keywords: string[];
};

export type Folleto = {
  _id: string;
  title: string;
  description?: string;
  pdfUrl: string;
  cover?: string;
};

export type Libro = {
  _id: string;
  title: string;
  author?: string;
  description?: string;
  pdfUrl: string;
  cover?: string;
};

export type Devocional = {
  _id: string;
  title: string;
  date: string; // ISO date
  body: string;
  author?: string;
};

export type Sermon = {
  _id: string;
  title: string;
  speaker?: string;
  description?: string;
  youtubeUrl?: string;
  audioUrl?: string;
  date?: string;
  cover?: string;
};

export const CATEGORY_LABEL: Record<PostCategory, string> = {
  noticia: "Noticia cristiana",
  profetica: "Noticia profética",
  teologica: "Nota teológica",
};
