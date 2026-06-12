// Configuración global del sitio: navegación, redes, contacto, oficinas.

export const SITE = {
  name: "Red ADvenir",
  longName: "Red ADvenir Internacional",
  description:
    "Red de televisión adventista del séptimo día, sin fines de lucro. Transmitimos TV y radio en vivo con alcance internacional.",
  url: "https://redadvenir.org",
  founded: 2002,
  founder: "Pastor David Gates",
  hqCity: "Santa Cruz de la Sierra, Bolivia",
  ministry: "Gospel Ministries International (GMI)",
  ministryUrl: "https://gospelministry.org/",
  verse: '"Porque aún un poco y El que ha de venir vendrá, y no tardará" — Hebreos 10:37 RV95',
};

export type NavItem = { label: string; href: string };

export const NAV: NavItem[] = [
  { label: "Programación", href: "/programacion" },
  { label: "Señal", href: "/senal" },
  { label: "Estudios Bíblicos", href: "/estudios-biblicos" },
  { label: "Quiénes Somos", href: "/quienes-somos" },
  { label: "Contacto", href: "/contacto" },
  { label: "Donar", href: "/donar" },
];

export type Social = { name: string; href: string; icon: string };

// icon = nombre de ícono de la librería bootstrap-icons (usado vía clase "bi bi-...")
export const SOCIALS: Social[] = [
  { name: "Facebook", href: "https://www.facebook.com/redadvenirtv", icon: "facebook" },
  { name: "YouTube", href: "https://www.youtube.com/@redadvenir", icon: "youtube" },
  { name: "Instagram", href: "https://www.instagram.com/redadvenir", icon: "instagram" },
  { name: "WhatsApp", href: "https://wa.me/59100000000", icon: "whatsapp" },
  { name: "Telegram", href: "https://t.me/redadvenir", icon: "telegram" },
];

export const CONTACT = {
  email: "contacto@redadvenir.org",
  whatsapp: "https://wa.me/59100000000",
  telegram: "https://t.me/redadvenir",
  facebook: "https://www.facebook.com/redadvenirtv",
  // Página pública de Facebook a embeber en Inicio.
  facebookPageUrl: "https://www.facebook.com/redadvenirtv",
};

export type Office = {
  city: string;
  address: string;
  phone?: string;
  isHQ?: boolean;
};

export const OFFICES: Office[] = [
  {
    city: "Santa Cruz de la Sierra",
    address: "Sede principal — Santa Cruz de la Sierra, Bolivia",
    isHQ: true,
  },
  { city: "Cochabamba", address: "Cochabamba, Bolivia" },
  { city: "La Paz", address: "La Paz, Bolivia" },
];
