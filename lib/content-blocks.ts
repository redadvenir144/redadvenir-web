// Registro declarativo de los textos editables del sitio (Fase 2).
//
// Cada bloque tiene una CLAVE estable, un valor POR DEFECTO (= el texto actual
// hardcodeado) y metadatos para la UI del admin. Las páginas leen su texto con
// getSiteText() (ver lib/site-text.ts): si el admin no ha guardado nada para una
// clave, se usa el `default` → el sitio se ve igual que hoy (riesgo cero).
//
// Para hacer editable un texto nuevo: agrega un bloque aquí y reemplaza el texto
// fijo de la página por el valor resuelto. Nada más.

export type ContentBlockType = "text" | "textarea" | "richtext" | "image";

export type ContentBlock = {
  key: string;
  label: string;
  type: ContentBlockType;
  default: string;
  help?: string;
  group: string; // clave de grupo (ver CONTENT_GROUPS)
};

export type ContentGroup = {
  key: string;
  label: string;
  icon: string; // bootstrap-icons
};

// Grupos = páginas/zonas del sitio. Se muestran como secciones en el editor.
export const CONTENT_GROUPS: ContentGroup[] = [
  { key: "footer", label: "Pie de página", icon: "layout-text-window-reverse" },
  { key: "quienes", label: "Quiénes Somos", icon: "people" },
  { key: "contacto", label: "Contacto", icon: "envelope" },
  { key: "donar", label: "Donaciones", icon: "cash-coin" },
];

export const CONTENT_BLOCKS: ContentBlock[] = [
  // --- Pie de página --------------------------------------------------------
  {
    key: "footer.tagline",
    label: "Descripción del pie de página",
    type: "textarea",
    group: "footer",
    default:
      "Red de comunicación cristiana sin fines de lucro que trabaja para comunicar el evangelio al mundo entero en su generación.",
    help: "Texto breve junto al logo, en el pie de todas las páginas.",
  },

  // --- Quiénes Somos --------------------------------------------------------
  {
    key: "quienes.history.p1",
    label: "Historia — primer párrafo",
    type: "textarea",
    group: "quienes",
    default:
      "Red ADvenir Internacional es una red de televisión cristiana, sin fines de lucro, fundada en 2002 por el Pr. David Gates. Su sede principal se encuentra en Santa Cruz de la Sierra, Bolivia. Actualmente transmite televisión y radio por medio de señal abierta, cable, satélite, streaming y redes sociales, alcanzando una audiencia global.",
  },
  {
    key: "quienes.history.p2",
    label: "Historia — segundo párrafo",
    type: "textarea",
    group: "quienes",
    default:
      "Red ADvenir forma parte de Gospel Ministries International (GMI), avanzando con el esfuerzo de voluntarios comprometidos con compartir el evangelio y la esperanza del pronto regreso de Cristo.",
  },
  {
    key: "quienes.beliefs.intro",
    label: "Introducción a “Nuestras creencias”",
    type: "textarea",
    group: "quienes",
    default:
      "Como creyentes adventistas del séptimo día, nuestras creencias fundamentales, basadas en la Biblia, son:",
    help: "Aparece encima del acordeón de creencias en la página Quiénes Somos.",
  },

  // --- Contacto -------------------------------------------------------------
  {
    key: "contacto.title",
    label: "Título",
    type: "text",
    group: "contacto",
    default: "Hablemos",
  },
  {
    key: "contacto.subtitle",
    label: "Subtítulo",
    type: "textarea",
    group: "contacto",
    default:
      "¿Tienes preguntas, peticiones de oración o quieres colaborar? Escríbenos.",
  },
  {
    key: "contacto.email",
    label: "Correo de contacto",
    type: "text",
    group: "contacto",
    default: "info@redadvenir.org",
  },
  {
    key: "contacto.whatsapp",
    label: "WhatsApp (solo números)",
    type: "text",
    group: "contacto",
    default: "59164088800",
    help: "Con código de país, sin “+” ni espacios. Ej: 59164088800.",
  },
  {
    key: "contacto.telegram",
    label: "Enlace de Telegram",
    type: "text",
    group: "contacto",
    default: "https://t.me/redadvenir",
    help: "Déjalo vacío para ocultar el canal de Telegram.",
  },
  {
    key: "contacto.facebook",
    label: "Enlace de Facebook",
    type: "text",
    group: "contacto",
    default: "https://www.facebook.com/redadvenirtv/",
    help: "Déjalo vacío para ocultar el canal de Facebook.",
  },

  // --- Donaciones -----------------------------------------------------------
  {
    key: "donar.intro",
    label: "Introducción",
    type: "textarea",
    group: "donar",
    default:
      "Red ADvenir Internacional es una obra sin fines de lucro que avanza gracias a donantes y voluntarios. Cada aporte ayuda a seguir transmitiendo el evangelio.",
    help: "Texto bajo el título principal de la página de donaciones.",
  },
  {
    key: "donar.online.text",
    label: "Texto de donación en línea",
    type: "textarea",
    group: "donar",
    default:
      "Hacé tu contribución por internet con tarjeta de crédito, débito, banco o PayPal. Si querés que tu donación vaya a un proyecto específico, indicalo en el campo “Donación para”. El formulario te lleva a una página segura de PayPal.",
  },
  {
    key: "donar.whatsapp",
    label: "WhatsApp de donaciones (solo números)",
    type: "text",
    group: "donar",
    default: "59164088800",
    help: "Con código de país, sin “+” ni espacios. Ej: 59164088800. Se usa para el botón de WhatsApp.",
  },
  // Contactos telefónicos: español primero (somos un ministerio en español).
  {
    key: "donar.phone.spanishName",
    label: "Contacto en español — nombre",
    type: "text",
    group: "donar",
    default: "Margarita",
  },
  {
    key: "donar.phone.spanish",
    label: "Contacto en español — teléfono",
    type: "text",
    group: "donar",
    default: "",
    help: "Déjalo vacío para mostrar “(número a confirmar)”.",
  },
  {
    key: "donar.phone.englishName",
    label: "Contacto en inglés — nombre",
    type: "text",
    group: "donar",
    default: "Brandtley",
  },
  {
    key: "donar.phone.english",
    label: "Contacto en inglés — teléfono",
    type: "text",
    group: "donar",
    default: "",
    help: "Déjalo vacío para mostrar “(número a confirmar)”.",
  },
  {
    key: "donar.phone.boliviaName",
    label: "Contacto en Bolivia — nombre",
    type: "text",
    group: "donar",
    default: "",
  },
  {
    key: "donar.phone.bolivia",
    label: "Contacto en Bolivia — teléfono",
    type: "text",
    group: "donar",
    default: "",
    help: "Déjalo vacío para mostrar “(número a confirmar)”.",
  },
  {
    key: "donar.help.email",
    label: "Correo para dudas de donación",
    type: "text",
    group: "donar",
    default: "info@redadvenir.org",
  },
  // Código QR de donación (opcional). La sección aparece en la página solo
  // cuando se sube una imagen.
  {
    key: "donar.qr.image",
    label: "Código QR de donación (imagen)",
    type: "image",
    group: "donar",
    default: "/images/qr-donar-paypal.png",
    help: "QR que abre la donación por PayPal. Puedes reemplazarlo por otro. Si lo dejas vacío, la sección no aparece en la página.",
  },
  {
    key: "donar.qr.caption",
    label: "Código QR — texto/pie",
    type: "text",
    group: "donar",
    default:
      "Escaneá el código con tu teléfono para donar por PayPal (también con tarjeta de crédito o débito, sin cuenta).",
  },
];

const BLOCK_BY_KEY = new Map(CONTENT_BLOCKS.map((b) => [b.key, b]));

export function getContentBlock(key: string): ContentBlock | undefined {
  return BLOCK_BY_KEY.get(key);
}

export function isValidContentKey(key: unknown): key is string {
  return typeof key === "string" && BLOCK_BY_KEY.has(key);
}

// Mapa clave → valor por defecto, para resolver textos sin acceso a la BD.
export const CONTENT_DEFAULTS: Record<string, string> = Object.fromEntries(
  CONTENT_BLOCKS.map((b) => [b.key, b.default]),
);
