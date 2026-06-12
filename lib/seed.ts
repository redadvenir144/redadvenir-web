// Contenido de ejemplo. Se usa como fallback cuando Sanity aún no está
// configurado (sin NEXT_PUBLIC_SANITY_PROJECT_ID), para que el sitio sea
// totalmente navegable en desarrollo y en demos.

import type {
  Belief,
  Faq,
  Post,
  Program,
  ScheduleSlot,
  StudyPdf,
} from "./types";

export const SEED_POSTS: Post[] = [
  {
    _id: "p1",
    title: "Las señales de los tiempos y la esperanza del advenimiento",
    slug: "senales-de-los-tiempos",
    category: "profetica",
    excerpt:
      "Un repaso bíblico a las profecías de Daniel y Apocalipsis y su vigencia para la iglesia de hoy.",
    coverImage: "/images/news/profecia.jpg",
    publishedAt: "2026-06-05",
    author: "Equipo Red ADvenir",
  },
  {
    _id: "p2",
    title: "El santuario: el corazón del mensaje adventista",
    slug: "el-santuario",
    category: "teologica",
    excerpt:
      "Cómo el servicio del santuario revela el plan de salvación y la obra de Cristo como sumo sacerdote.",
    coverImage: "/images/news/santuario.jpg",
    publishedAt: "2026-05-28",
    author: "Pr. Juan Pérez",
  },
  {
    _id: "p3",
    title: "Red ADvenir amplía su cobertura satelital en Sudamérica",
    slug: "ampliacion-cobertura",
    category: "noticia",
    excerpt:
      "Nuevas frecuencias permiten llegar a más hogares con programación cristiana las 24 horas.",
    coverImage: "/images/news/satelite.jpg",
    publishedAt: "2026-05-20",
    author: "Comunicaciones",
  },
  {
    _id: "p4",
    title: "La esperanza del advenimiento en tiempos de incertidumbre",
    slug: "esperanza-del-advenimiento",
    category: "teologica",
    excerpt:
      "Por qué la segunda venida de Cristo sigue siendo la mayor esperanza del cristiano hoy.",
    coverImage: "/images/news/santuario.jpg",
    publishedAt: "2026-05-12",
    author: "Pr. Juan Pérez",
  },
  {
    _id: "p5",
    title: "Israel y las profecías: ¿qué dice realmente la Biblia?",
    slug: "israel-y-las-profecias",
    category: "profetica",
    excerpt:
      "Un análisis equilibrado de los acontecimientos del Medio Oriente a la luz de la profecía bíblica.",
    coverImage: "/images/news/profecia.jpg",
    publishedAt: "2026-05-04",
    author: "Equipo Red ADvenir",
  },
  {
    _id: "p6",
    title: "Campaña de evangelismo alcanza a miles en Santa Cruz",
    slug: "campana-evangelismo-santa-cruz",
    category: "noticia",
    excerpt:
      "Una semana de conferencias transmitidas en vivo reunió a familias de toda la ciudad.",
    coverImage: "/images/news/satelite.jpg",
    publishedAt: "2026-04-25",
    author: "Comunicaciones",
  },
];

export const SEED_PROGRAMS: Program[] = [
  {
    _id: "pr1",
    title: "Batallas de Fe",
    description: "Predicaciones y testimonios que fortalecen la fe.",
    youtubePlaylistId: "PLxxxxxxxxxxxxxxxx1",
  },
  {
    _id: "pr2",
    title: "Estudios de la Biblia",
    description: "Serie de estudios versículo por versículo.",
    youtubePlaylistId: "PLxxxxxxxxxxxxxxxx2",
  },
  {
    _id: "pr3",
    title: "Salud y Hogar",
    description: "Principios de vida sana desde una perspectiva cristiana.",
    youtubePlaylistId: "PLxxxxxxxxxxxxxxxx3",
  },
];

export const SEED_SCHEDULE: ScheduleSlot[] = [
  { _id: "s1", day: "Lunes", time: "06:00", title: "Devoción matutina" },
  { _id: "s2", day: "Lunes", time: "08:00", title: "Estudios de la Biblia" },
  { _id: "s3", day: "Lunes", time: "20:00", title: "Batallas de Fe" },
  { _id: "s4", day: "Martes", time: "06:00", title: "Devoción matutina" },
  { _id: "s5", day: "Martes", time: "20:00", title: "Salud y Hogar" },
  { _id: "s6", day: "Sábado", time: "09:00", title: "Escuela Sabática" },
  { _id: "s7", day: "Sábado", time: "11:00", title: "Culto Divino" },
];

export const SEED_STUDIES: StudyPdf[] = [
  {
    _id: "st1",
    title: "Guía de estudio: El gran conflicto",
    description: "10 lecciones descargables sobre la lucha entre el bien y el mal.",
    pdfUrl: "#",
  },
  {
    _id: "st2",
    title: "Guía de estudio: Daniel y Apocalipsis",
    description: "Estudio profético de las profecías de los últimos días.",
    pdfUrl: "#",
  },
  {
    _id: "st3",
    title: "Guía de estudio: Las 28 creencias",
    description: "Fundamento bíblico de las creencias adventistas.",
    pdfUrl: "#",
  },
];

export const SEED_BELIEFS: Belief[] = [
  {
    _id: "b1",
    number: 1,
    title: "Las Sagradas Escrituras",
    summary:
      "La Biblia es la Palabra de Dios escrita, infalible revelación de su voluntad.",
  },
  {
    _id: "b2",
    number: 2,
    title: "La Trinidad",
    summary: "Hay un solo Dios: Padre, Hijo y Espíritu Santo, unidad de tres personas.",
  },
  {
    _id: "b3",
    number: 4,
    title: "El Hijo",
    summary:
      "Dios el Hijo eterno se encarnó en Jesucristo para la salvación de la humanidad.",
  },
  {
    _id: "b4",
    number: 20,
    title: "El sábado",
    summary:
      "El séptimo día es el sábado de reposo, memorial de la creación y señal de comunión con Dios.",
  },
];

export const SEED_FAQS: Faq[] = [
  {
    _id: "f1",
    question: "¿Cómo veo Red ADvenir en vivo?",
    answer:
      "Puedes ver la TV en vivo en la página de Inicio, o a través de nuestras apps de Roku y Amazon Fire TV. También transmitimos por señal abierta y satélite (ver la sección Señal).",
    keywords: ["vivo", "ver", "tv", "television", "transmision", "online", "stream"],
  },
  {
    _id: "f2",
    question: "¿Cómo escucho la radio?",
    answer:
      "En la página de Inicio encontrarás los reproductores de Radio ADvenir y Radio Altiplano. También están disponibles como apps en Google Play.",
    keywords: ["radio", "escuchar", "audio", "altiplano", "advenir"],
  },
  {
    _id: "f3",
    question: "¿Cómo puedo donar o apoyar el canal?",
    answer:
      "Visita la sección Donar. Tenemos opciones para donaciones desde Bolivia y desde el resto del mundo.",
    keywords: ["donar", "donacion", "apoyar", "ofrenda", "contribuir", "ayudar"],
  },
  {
    _id: "f4",
    question: "¿Dónde descargo los estudios bíblicos?",
    answer:
      "En la sección Estudios Bíblicos puedes descargar las guías en PDF y ver las guías en video.",
    keywords: ["estudio", "biblia", "pdf", "descargar", "guia", "leccion"],
  },
  {
    _id: "f5",
    question: "¿En qué canales y satélite transmiten?",
    answer:
      "Consulta la sección Señal: incluye canales de TV abierta, datos satelitales (Túpac Katari TKSAT-1 e IntelSat 21), cableras y URLs de streaming.",
    keywords: ["canal", "satelite", "senal", "frecuencia", "cable", "tupac", "katari"],
  },
];
