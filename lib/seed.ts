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
  GalleryImage,
  AboutConfig,
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
    _id: "b1", number: 1, title: "Las Sagradas Escrituras",
    summary: "La Biblia es la Palabra de Dios escrita, dada por inspiración divina mediante santos hombres que hablaron y escribieron movidos por el Espíritu Santo. En ella, Dios ha dado al ser humano el conocimiento necesario para la salvación. Las Sagradas Escrituras son la revelación infalible de la voluntad divina, el criterio del carácter, el verificador de la experiencia, el expositor autorizado de las doctrinas y el registro fidedigno de los actos de Dios en la historia.",
    verses: ["2 Timoteo 3:16-17", "2 Pedro 1:20-21", "Proverbios 30:5-6", "Juan 17:17", "1 Tesalonicenses 2:13", "Hebreos 4:12"],
  },
  {
    _id: "b2", number: 2, title: "La Trinidad",
    summary: "Hay un solo Dios: Padre, Hijo y Espíritu Santo, unidad de tres personas coeternas. Dios es inmortal, todopoderoso, omnisciente, superior a todos y omnipresente. Es infinito y está más allá de la comprensión humana, pero es conocido a través de su autorrevelación. Es para siempre digno de adoración, reverencia y servicio por parte de toda la creación.",
    verses: ["Deuteronomio 6:4", "Mateo 28:19", "2 Corintios 13:14", "Efesios 4:4-6", "1 Pedro 1:2"],
  },
  {
    _id: "b3", number: 3, title: "El Padre",
    summary: "Dios el Padre eterno es el Creador, la Fuente, el Sustentador y el Soberano de toda la creación. Es justo y santo, misericordioso y lleno de gracia, tardo para la ira, y abundante en amor constante y fidelidad. Las cualidades y los poderes manifestados en el Hijo y el Espíritu Santo también son revelaciones del Padre.",
    verses: ["Génesis 1:1", "Apocalipsis 4:11", "1 Corintios 15:28", "Juan 3:16", "1 Juan 4:8", "1 Timoteo 1:17", "Éxodo 34:6-7"],
  },
  {
    _id: "b4", number: 4, title: "El Hijo",
    summary: "Dios el Hijo eterno se encarnó en Jesucristo. Por medio de él fueron creadas todas las cosas, se reveló el carácter de Dios, se efectuó la salvación de la humanidad y se juzga el mundo. Eterno de verdad, se hizo hombre también de verdad, Jesucristo fue concebido del Espíritu Santo y nació de la virgen María. Vivió y experimentó tentaciones como ser humano, pero manifestó el ejemplo perfecto de justicia y amor de Dios.",
    verses: ["Juan 1:1-3", "Juan 1:14", "Colosenses 1:15-19", "Juan 10:30", "Juan 14:9", "Romanos 6:23", "2 Corintios 5:17-19", "Lucas 1:35", "Filipenses 2:5-11", "Hebreos 2:17-18", "Hebreos 4:15"],
  },
  {
    _id: "b5", number: 5, title: "El Espíritu Santo",
    summary: "Dios el Espíritu Santo eterno obró con el Padre y el Hijo en la creación, la encarnación y la redención. Él inspiró a los escritores de las Escrituras. Llenó la vida de Cristo de poder. Atrae a los seres humanos hacia sí, y quienes responden, los renueva y transforma a la imagen de Dios. Enviado por el Padre y el Hijo para estar siempre con sus hijos, extiende los dones espirituales a la iglesia.",
    verses: ["Génesis 1:1-2", "Lucas 1:35", "Hechos 10:38", "2 Pedro 1:21", "2 Corintios 3:18", "Efesios 4:11-12", "1 Tesalonicenses 5:19", "1 Juan 3:24"],
  },
  {
    _id: "b6", number: 6, title: "La Creación",
    summary: "Dios es el Creador de todas las cosas, y en las Escrituras se ha revelado el verdadero relato de su actividad creadora. En seis días el Señor hizo el cielo y la tierra y todo ser viviente sobre la tierra, y reposó el séptimo día. Dios lo hizo todo muy bueno, y la tierra salida de sus manos presentaba una perfecta representación de su poder, amor y bondad.",
    verses: ["Génesis 1-2", "Éxodo 20:8-11", "Salmos 19:1-6", "Salmos 33:6,9", "Salmos 104", "Hebreos 11:3", "Juan 1:1-3", "Colosenses 1:16-17"],
  },
  {
    _id: "b7", number: 7, title: "La Naturaleza del Ser Humano",
    summary: "El hombre y la mujer fueron hechos a imagen de Dios con individualidad, así como el poder y la libertad para pensar y hacer. Aunque fueron creados como seres libres, cada uno es una unidad indivisible de cuerpo, mente y espíritu, dependiente de Dios para la vida, el aliento y todo lo demás. Cuando nuestros primeros padres desobedecieron a Dios, negaron su dependencia de él y cayeron de su elevada posición.",
    verses: ["Génesis 1:26-28", "Génesis 2:7", "Salmos 8:4-8", "Hechos 17:24-28", "Génesis 3", "Salmos 51:5", "Romanos 5:12-17", "Mateo 10:28"],
  },
  {
    _id: "b8", number: 8, title: "El Gran Conflicto",
    summary: "Toda la humanidad está ahora involucrada en un gran conflicto entre Cristo y Satanás, relativo al carácter de Dios, su ley y su soberanía sobre el universo. Este conflicto se originó en el cielo cuando un ser creado, dotado de libre albedrío, se ensalzó en el orgullo y se convirtió en Satanás, el adversario de Dios, y llevó a la rebelión a una porción de los ángeles.",
    verses: ["Apocalipsis 12:4-9", "Isaías 14:12-14", "Ezequiel 28:12-18", "Génesis 3", "Romanos 1:19-32", "Romanos 5:12-21", "Génesis 6-8", "1 Corintios 4:9", "Hebreos 1:14"],
  },
  {
    _id: "b9", number: 9, title: "La Vida, Muerte y Resurrección de Cristo",
    summary: "En la vida de perfecta obediencia a la voluntad de Dios, en su sufrimiento, su muerte y su resurrección, Dios proveyó el único medio para la expiación del pecado humano, a fin de que quienes por fe acepten esta expiación puedan tener vida eterna y toda la creación pueda comprender mejor el amor infinito y santo del Creador.",
    verses: ["Juan 3:16", "Isaías 53", "1 Pedro 2:21-22", "1 Corintios 15:3-4", "2 Corintios 5:14-21", "Romanos 1:4", "Romanos 3:25", "Romanos 4:25", "1 Juan 2:2", "Colosenses 2:15", "Filipenses 2:6-11"],
  },
  {
    _id: "b10", number: 10, title: "La Experiencia de la Salvación",
    summary: "En infinito amor y misericordia, Dios hizo que Cristo, que no conoció pecado, fuera hecho pecado por nosotros, para que en él fuéramos hechos justicia de Dios. Guiados por el Espíritu Santo, reconocemos nuestra condición de pecadores, nos arrepentimos de nuestras transgresiones, ejercemos fe en Jesús como Señor y Cristo, como Sustituto y Ejemplo.",
    verses: ["2 Corintios 5:17-21", "Juan 3:16", "Gálatas 1:4", "Tito 3:3-7", "Juan 16:8", "Gálatas 3:13-14", "Romanos 3:21-26", "Colosenses 1:13-14", "Hechos 3:19", "Jeremías 31:33", "Ezequiel 36:25-27"],
  },
  {
    _id: "b11", number: 11, title: "Crecer en Cristo",
    summary: "Por su muerte en la cruz Jesús triunfó sobre las fuerzas del mal. La victoria de Jesús nos da la victoria sobre las fuerzas del mal que todavía procuran controlarnos, mientras avanzamos con él en paz, gozo y en la seguridad de su amor. El Espíritu Santo mora en nosotros y nos empodera para vivir en victoria.",
    verses: ["Salmos 1:1-2", "Colosenses 1:13-14", "Colosenses 2:6,14-15", "Lucas 10:17-20", "Efesios 5:19-20", "Efesios 6:12-18", "1 Tesalonicenses 5:23", "2 Corintios 3:17-18", "Filipenses 3:7-14", "Gálatas 5:22-25", "Romanos 8:38-39"],
  },
  {
    _id: "b12", number: 12, title: "La Iglesia",
    summary: "La iglesia es la comunidad de creyentes que confiesan a Jesucristo como Señor y Salvador. La iglesia es el cuerpo de Cristo, una comunidad de fe de la cual Cristo mismo es la Cabeza. Cristo la dotó con dones, ministerios e instrumentos para que cumpla su misión de ir a todo el mundo.",
    verses: ["Génesis 12:3", "Hechos 7:38", "Efesios 4:11-15", "Efesios 3:8-11", "Mateo 28:19-20", "Marcos 16:15", "Isaías 49:6", "1 Pedro 2:9", "Apocalipsis 12:17", "Apocalipsis 14:6-12"],
  },
  {
    _id: "b13", number: 13, title: "El Remanente y su Misión",
    summary: "La iglesia universal está compuesta de todos los que verdaderamente creen en Cristo; pero en los últimos días, un remanente ha sido llamado para guardar los mandamientos de Dios y la fe de Jesús. Este remanente anuncia la llegada del juicio, proclama la salvación por medio de Cristo y proclama la inminencia de su segundo advenimiento.",
    verses: ["Apocalipsis 12:17", "Apocalipsis 14:6-12", "Apocalipsis 18:1-4", "2 Corintios 5:10", "Judas 3,14", "1 Pedro 1:16-19", "2 Pedro 3:10-14", "Apocalipsis 21:1-14"],
  },
  {
    _id: "b14", number: 14, title: "La Unidad en el Cuerpo de Cristo",
    summary: "La iglesia es un cuerpo con muchos miembros, llamados de entre toda nación, tribu, lengua y pueblo. En Cristo somos una nueva creación; las distinciones de raza, cultura, educación y nacionalidad no deben ser causa de división entre nosotros. Todos somos iguales en Cristo.",
    verses: ["Romanos 12:4-5", "1 Corintios 12:12-14", "Mateo 28:19-20", "Salmos 133:1", "2 Corintios 5:16-17", "Hechos 17:26-27", "Gálatas 3:27-29", "Colosenses 3:10-15", "Efesios 2:13-16", "Efesios 4:14-16"],
  },
  {
    _id: "b15", number: 15, title: "El Bautismo",
    summary: "Por medio del bautismo confesamos nuestra fe en la muerte y resurrección de Jesucristo, y damos testimonio de nuestra muerte al pecado y de nuestro propósito de andar en novedad de vida. El bautismo es un símbolo de nuestra unión con Cristo, el perdón de nuestros pecados y nuestra recepción del Espíritu Santo. Se realiza por inmersión.",
    verses: ["Romanos 6:1-6", "Colosenses 2:12-13", "Hechos 16:30-33", "Hechos 22:16", "Hechos 2:38", "Mateo 28:19-20"],
  },
  {
    _id: "b16", number: 16, title: "La Cena del Señor",
    summary: "La Cena del Señor es una participación en los emblemas del cuerpo y la sangre de Jesús como expresión de fe en él, nuestro Señor y Salvador. Al participar, proclamamos gozosamente la muerte del Señor hasta que él venga. La preparación incluye la ordenanza del lavamiento de pies, el examen de conciencia, el arrepentimiento y la confesión.",
    verses: ["1 Corintios 10:16-17", "1 Corintios 11:23-30", "Mateo 26:17-30", "Apocalipsis 3:20", "Juan 6:48-63", "Juan 13:1-17"],
  },
  {
    _id: "b17", number: 17, title: "Los Dones y Ministerios Espirituales",
    summary: "Dios concede a todos los miembros de su iglesia en cada época dones espirituales que cada miembro debe emplear en el ministerio amoroso para el bien general de la iglesia y de la humanidad. Concedidos por el Espíritu Santo, los dones proveen todas las aptitudes y ministerios que la iglesia necesita para cumplir sus funciones divinamente ordenadas.",
    verses: ["Romanos 12:4-8", "1 Corintios 12:9-11", "1 Corintios 12:27-28", "Efesios 4:8", "Efesios 4:11-16", "Hechos 6:1-7", "1 Timoteo 3:1-13", "1 Pedro 4:10-11"],
  },
  {
    _id: "b18", number: 18, title: "El Don de Profecía",
    summary: "Las Escrituras testimonian que uno de los dones del Espíritu Santo es el de profecía. Este don es un sello identificador del remanente y se manifestó en el ministerio de Ellen G. White. Sus escritos hablan con autoridad profética y proveen consuelo, guía, instrucción y corrección a la iglesia.",
    verses: ["Joel 2:28-29", "Hechos 2:14-21", "Hebreos 1:1-3", "Apocalipsis 12:17", "Apocalipsis 19:10"],
  },
  {
    _id: "b19", number: 19, title: "La Ley de Dios",
    summary: "Los grandes principios de la ley de Dios están incorporados en los Diez Mandamientos y ejemplificados en la vida de Cristo. Expresan el amor, la voluntad y los propósitos de Dios con respecto a la conducta y las relaciones humanas, y son obligatorios para todas las personas en todas las épocas. La gracia salvadora de Dios no anula sino que afirma la ley.",
    verses: ["Éxodo 20:1-17", "Salmos 40:7-8", "Mateo 22:36-40", "Deuteronomio 28:1-14", "Mateo 5:17-20", "Hebreos 8:8-10", "Juan 15:7-10", "Efesios 2:8-10", "1 Juan 5:3", "Romanos 8:3-4", "Salmos 19:7-14"],
  },
  {
    _id: "b20", number: 20, title: "El Sábado",
    summary: "El Creador benevolente, después de los seis días de la Creación, reposó el séptimo día e instituyó el sábado para todos los seres humanos como un memorial de la creación. El cuarto mandamiento de la ley inmutable de Dios requiere la observancia del sábado del séptimo día. El sábado es un día de deliciosa comunión con Dios y entre sí.",
    verses: ["Génesis 2:1-3", "Éxodo 20:8-11", "Lucas 4:16", "Isaías 56:5-6", "Isaías 58:13-14", "Mateo 12:1-12", "Éxodo 31:13-17", "Ezequiel 20:12,20", "Deuteronomio 5:12-15", "Hebreos 4:1-11", "Marcos 1:32"],
  },
  {
    _id: "b21", number: 21, title: "La Mayordomía",
    summary: "Somos los mayordomos de Dios, a quienes él ha confiado el tiempo y las oportunidades, las capacidades y las posesiones. Somos responsables ante él por el uso apropiado de los mismos. Reconocemos la propiedad de Dios devolviendo los diezmos y dando ofrendas para la proclamación de su evangelio.",
    verses: ["Génesis 1:26-28", "Génesis 2:15", "1 Crónicas 29:14", "Hageo 1:3-11", "Malaquías 3:8-12", "1 Corintios 9:9-14", "Mateo 23:23", "2 Corintios 8:1-15", "Romanos 15:26-27"],
  },
  {
    _id: "b22", number: 22, title: "Conducta Cristiana",
    summary: "Somos llamados a ser un pueblo piadoso que piense, sienta y actúe en armonía con los principios del cielo. Para que el Espíritu pueda recrear en nosotros el carácter de nuestro Señor, participamos solo en las cosas que producirán en nuestra vida pureza, salud y gozo cristiano. Reconocemos que el cuerpo es templo del Espíritu Santo.",
    verses: ["Romanos 12:1-2", "1 Juan 2:6", "Efesios 5:1-21", "Filipenses 4:8", "2 Corintios 10:5", "2 Corintios 6:14-7:1", "1 Pedro 3:1-4", "1 Corintios 6:19-20", "1 Corintios 10:31", "3 Juan 2"],
  },
  {
    _id: "b23", number: 23, title: "El Matrimonio y la Familia",
    summary: "El matrimonio fue divinamente establecido en el Edén y afirmado por Jesús como una unión de por vida entre un hombre y una mujer en un compañerismo amoroso. El amor mutuo, el honor, el respeto y la responsabilidad son el tejido de esta relación que debe reflejar el amor de Cristo por su iglesia.",
    verses: ["Génesis 2:18-25", "Mateo 19:3-9", "Juan 2:1-11", "2 Corintios 6:14", "Efesios 5:21-33", "Mateo 5:31-32", "1 Corintios 7:10-11", "Éxodo 20:12", "Efesios 6:1-4", "Deuteronomio 6:5-9", "Proverbios 22:6"],
  },
  {
    _id: "b24", number: 24, title: "El Ministerio de Cristo en el Santuario Celestial",
    summary: "Hay un santuario en el cielo, el verdadero tabernáculo que el Señor estableció y no el hombre. En él Cristo ministra a nuestro favor, poniendo a disposición de los creyentes los beneficios de su expiación ofrecida una sola vez en la cruz. En 1844, al término del período profético de los 2300 días, él entró a la segunda y última fase de su ministerio expiatorio.",
    verses: ["Hebreos 8:1-5", "Hebreos 4:14-16", "Hebreos 9:11-28", "Hebreos 10:19-22", "Apocalipsis 8:3-5", "Daniel 7:9-27", "Daniel 8:13-14", "Daniel 9:24-27", "Números 14:34", "Ezequiel 4:6", "Levítico 16", "Apocalipsis 14:6-7", "Apocalipsis 20:12"],
  },
  {
    _id: "b25", number: 25, title: "El Segundo Advenimiento de Cristo",
    summary: "La segunda venida de Cristo es la esperanza bendita de la iglesia, el gran clímax del evangelio. La venida del Salvador será literal, personal, visible y de alcance mundial. Cuando él regrese, los justos muertos resucitarán y junto con los justos vivos serán glorificados y llevados al cielo.",
    verses: ["Tito 2:13", "Hebreos 9:28", "Juan 14:1-3", "Hechos 1:9-11", "Mateo 24:14", "Apocalipsis 1:7", "Mateo 24:43-44", "1 Tesalonicenses 4:13-18", "1 Corintios 15:51-54", "2 Tesalonicenses 1:7-10", "Apocalipsis 14:14-20", "Mateo 24", "Lucas 21"],
  },
  {
    _id: "b26", number: 26, title: "La Muerte y la Resurrección",
    summary: "La paga del pecado es muerte. Pero Dios, el único que tiene inmortalidad, concederá vida eterna a sus redimidos. Hasta ese día, la muerte es un estado de inconsciencia para todas las personas. Cuando Cristo aparezca, los justos resucitados y los justos vivos serán glorificados y arrebatados para encontrarse con su Señor.",
    verses: ["Romanos 6:23", "1 Timoteo 6:15-16", "Eclesiastés 9:5-6", "Salmos 146:3-4", "Juan 11:11-14", "Colosenses 3:4", "1 Corintios 15:51-54", "1 Tesalonicenses 4:13-17", "Juan 5:28-29", "Apocalipsis 20:1-10"],
  },
  {
    _id: "b27", number: 27, title: "El Milenio y el Fin del Pecado",
    summary: "El milenio es el reinado de mil años de Cristo con sus santos en el cielo entre la primera y la segunda resurrección. Durante este tiempo serán juzgados los muertos impíos; la tierra estará completamente desolada. Al término de estos mil años, Cristo con sus santos y la Ciudad Santa descenderán a la tierra y el pecado será destruido para siempre.",
    verses: ["Apocalipsis 20", "1 Corintios 6:2-3", "Jeremías 4:23-26", "Apocalipsis 21:1-5", "Zacarías 14:1-4", "Malaquías 4:1"],
  },
  {
    _id: "b28", number: 28, title: "La Tierra Nueva",
    summary: "En la tierra nueva, en la que mora la justicia, Dios proveerá un hogar eterno para los redimidos y un ambiente perfecto para la vida, el amor, el gozo y el aprendizaje en su presencia. El gran conflicto habrá terminado y el pecado no existirá más. Todas las cosas declararán que Dios es amor; y él reinará para siempre. Amén.",
    verses: ["2 Pedro 3:13", "Isaías 35", "Isaías 65:17-25", "Mateo 5:5", "Apocalipsis 21:1-7", "Apocalipsis 22:1-5", "Apocalipsis 11:15"],
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

export const SEED_GALLERY: GalleryImage[] = [];

export const SEED_ABOUT: AboutConfig[] = [];
