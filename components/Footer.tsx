import Link from "next/link";
import Image from "next/image";

import { NAV, SITE } from "@/lib/site";
import { GMI_LINKS } from "@/lib/gmiChannels";
import { getSiteText } from "@/lib/site-text";
import SocialBar from "./SocialBar";

export default async function Footer() {
  const t = await getSiteText();
  return (
    <footer className="mt-16 bg-brand text-white/80">
      <div className="section grid gap-8 py-12 text-center md:grid-cols-2 md:text-left lg:grid-cols-4">
        <div>
          <Image
            src="/images/logo-advenir.png"
            alt={SITE.longName}
            width={1000}
            height={525}
            className="h-14 w-auto mx-auto md:mx-0"
          />
          <p className="mt-4 text-sm leading-relaxed">{t("footer.tagline")}</p>
          <SocialBar className="mt-4 justify-center md:justify-start" />
        </div>

        <div>
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-white">
            Navegación
          </h3>
          <ul className="space-y-2 text-sm">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="inline-block py-1 hover:text-accent">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-white">
            Red GMI en el mundo
          </h3>
          <ul className="space-y-2 text-sm">
            {GMI_LINKS.map((l) => (
              <li key={l.url}>
                <a
                  href={l.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 py-1 hover:text-accent"
                >
                  <i className="bi bi-broadcast text-xs" /> {l.name}
                </a>
              </li>
            ))}
            <li>
              <Link href="/senal#mapa" className="inline-flex items-center gap-1.5 py-1 hover:text-accent">
                <i className="bi bi-geo-alt text-xs" /> Ver mapa de canales
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-white">
            Aliado
          </h3>
          <a href={SITE.ministryUrl} target="_blank" rel="noopener noreferrer">
            <Image
              src="/images/gmi-logo.png"
              alt="Gospel Ministries International"
              width={200}
              height={55}
              className="h-12 w-auto mx-auto md:mx-0"
            />
          </a>
          <p className="mt-4 text-sm italic">{SITE.verse}</p>
        </div>
      </div>

      <div className="border-t border-white/10 py-5 text-center text-xs text-white/60">
        <p>
          © 2011–{new Date().getFullYear()} {SITE.longName}. Avanzando con voluntarios
          junto a {SITE.ministry}.
        </p>
        <Link href="/privacidad" className="mt-2 inline-block hover:text-accent">
          Política de Privacidad
        </Link>
      </div>
    </footer>
  );
}
