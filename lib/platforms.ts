// Plataformas donde está disponible Red ADvenir (Smart TV, móvil, web).
// Cuando una app real esté publicada, basta con cambiar `available: true`
// y completar `href` (e `image` si hay badge oficial).

export type Platform = {
  name: string;
  description: string;
  href: string;
  icon: "roku" | "firetv" | "androidtv" | "mobile" | "web";
  image?: string;
  available: boolean;
};

export const platforms: Platform[] = [
  {
    name: "Roku",
    description: "Disponible en la Roku Channel Store",
    href: "https://channelstore.roku.com/details/237107/red-advenir",
    icon: "roku",
    image: "/images/roku.png",
    available: true,
  },
  {
    name: "Amazon Fire TV",
    description: "Instala desde el Amazon Appstore",
    href: "https://www.amazon.com/Gospel-Ministries-International-Red-Advenir/dp/B07GVQJPL5",
    icon: "firetv",
    image: "/images/amazonappstore.png",
    available: true,
  },
  {
    name: "Android TV",
    description: "Próximamente en Google Play",
    href: "#",
    icon: "androidtv",
    available: false,
  },
  {
    name: "Móvil iOS y Android",
    description: "App oficial para tu teléfono",
    href: "https://play.google.com/store/apps/details?id=org.gospelministryinternational.redadvenirtv",
    icon: "mobile",
    available: true,
  },
  {
    name: "Web",
    description: "Mira aquí mismo, sin instalar",
    href: "#en-vivo",
    icon: "web",
    available: true,
  },
];
