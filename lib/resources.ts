// Definición declarativa de cada recurso del admin. Tanto la UI (formularios y
// tablas) como la API genérica de CRUD se construyen a partir de esto.

import type { Collection } from "./db";

export type FieldType =
  | "text"
  | "textarea"
  | "richtext"
  | "select"
  | "number"
  | "date"
  | "image"
  | "pdf"
  | "tags";

export type Field = {
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
  options?: { value: string; label: string }[];
  help?: string;
  placeholder?: string;
};

export type Resource = {
  key: Collection;
  label: string; // plural
  singular: string;
  icon: string; // bootstrap-icons
  // Campos a mostrar como columnas en la tabla (subconjunto de fields).
  listColumns: string[];
  fields: Field[];
};

export const RESOURCES: Resource[] = [
  {
    key: "posts",
    label: "Publicaciones",
    singular: "Publicación",
    icon: "newspaper",
    listColumns: ["title", "category", "publishedAt"],
    fields: [
      { name: "title", label: "Título", type: "text", required: true },
      {
        name: "slug",
        label: "Slug (URL)",
        type: "text",
        placeholder: "se-genera-del-titulo",
        help: "Identificador en la URL. Déjalo vacío para autogenerarlo.",
      },
      {
        name: "category",
        label: "Categoría",
        type: "select",
        required: true,
        options: [
          { value: "noticia", label: "Noticia cristiana" },
          { value: "profetica", label: "Noticia profética" },
          { value: "teologica", label: "Nota teológica" },
        ],
      },
      { name: "excerpt", label: "Resumen", type: "textarea" },
      { name: "coverImage", label: "Imagen de portada", type: "image" },
      { name: "body", label: "Contenido", type: "richtext" },
      { name: "author", label: "Autor", type: "text" },
      { name: "publishedAt", label: "Fecha de publicación", type: "date", required: true },
    ],
  },
  {
    key: "programs",
    label: "Programas",
    singular: "Programa",
    icon: "collection-play",
    listColumns: ["title", "youtubePlaylistId"],
    fields: [
      { name: "title", label: "Título", type: "text", required: true },
      { name: "description", label: "Descripción", type: "textarea" },
      {
        name: "youtubePlaylistId",
        label: "ID de lista de YouTube",
        type: "text",
        required: true,
        placeholder: "PLxxxxxxxx",
        help: "Solo el ID de la playlist, no la URL completa.",
      },
      { name: "thumbnail", label: "Miniatura", type: "image" },
    ],
  },
  {
    key: "schedule",
    label: "Grilla",
    singular: "Horario",
    icon: "calendar-week",
    listColumns: ["day", "time", "title"],
    fields: [
      {
        name: "day",
        label: "Día",
        type: "select",
        required: true,
        options: [
          "Lunes",
          "Martes",
          "Miércoles",
          "Jueves",
          "Viernes",
          "Sábado",
          "Domingo",
        ].map((d) => ({ value: d, label: d })),
      },
      { name: "time", label: "Hora (HH:MM)", type: "text", required: true, placeholder: "08:00" },
      { name: "title", label: "Programa", type: "text", required: true },
    ],
  },
  {
    key: "studies",
    label: "Estudios bíblicos",
    singular: "Estudio",
    icon: "file-earmark-pdf",
    listColumns: ["title"],
    fields: [
      { name: "title", label: "Título", type: "text", required: true },
      { name: "description", label: "Descripción", type: "textarea" },
      { name: "pdfUrl", label: "Archivo PDF", type: "pdf", required: true },
      { name: "cover", label: "Portada", type: "image" },
    ],
  },
  {
    key: "beliefs",
    label: "Creencias",
    singular: "Creencia",
    icon: "book",
    listColumns: ["number", "title"],
    fields: [
      { name: "number", label: "Número", type: "number", required: true },
      { name: "title", label: "Título", type: "text", required: true },
      { name: "summary", label: "Resumen", type: "textarea" },
    ],
  },
  {
    key: "faqs",
    label: "Preguntas frecuentes",
    singular: "Pregunta",
    icon: "chat-dots",
    listColumns: ["question"],
    fields: [
      { name: "question", label: "Pregunta", type: "text", required: true },
      { name: "answer", label: "Respuesta", type: "textarea", required: true },
      {
        name: "keywords",
        label: "Palabras clave",
        type: "tags",
        help: "Términos que disparan esta respuesta en el chatbot.",
      },
    ],
  },
];

export function getResource(key: string): Resource | undefined {
  return RESOURCES.find((r) => r.key === key);
}

// Normaliza/valida un payload del admin contra la definición del recurso.
export function coercePayload(
  resource: Resource,
  input: Record<string, unknown>,
): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const f of resource.fields) {
    let v = input[f.name];
    if (f.type === "number") v = v === "" || v == null ? undefined : Number(v);
    if (f.type === "tags" && typeof v === "string") {
      v = v
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
    }
    out[f.name] = v;
  }
  // Autogenerar slug para publicaciones.
  if (resource.key === "posts") {
    if (!out.slug && typeof out.title === "string") {
      out.slug = slugify(out.title);
    }
  }
  return out;
}

export function slugify(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
