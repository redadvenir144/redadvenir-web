import Image from "next/image";

import { platforms, type Platform } from "@/lib/platforms";

const ICON_CLASS: Record<Platform["icon"], string> = {
  roku: "bi-tv-fill",
  firetv: "bi-tv-fill",
  androidtv: "bi-tv-fill",
  mobile: "bi-phone-fill",
  web: "bi-globe",
};

function ctaLabel(p: Platform): string {
  return p.icon === "web" ? "Ver ahora →" : "Abrir tienda →";
}

function PlatformMedia({ p }: { p: Platform }) {
  if (p.image) {
    return (
      <div className="relative h-20 w-full">
        <Image
          src={p.image}
          alt={p.name}
          fill
          sizes="280px"
          className="object-contain object-left"
        />
      </div>
    );
  }
  return (
    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10">
      <i className={`bi ${ICON_CLASS[p.icon]} text-2xl text-white/80`} aria-hidden="true" />
    </div>
  );
}

function PlatformCard({ p }: { p: Platform }) {
  const base =
    "flex flex-col gap-4 rounded-xl border border-white/10 bg-white/5 p-6";

  if (!p.available) {
    return (
      <div className={`${base} opacity-60`}>
        <PlatformMedia p={p} />
        <div className="flex-1">
          <h3 className="font-semibold text-white">{p.name}</h3>
          <p className="mt-1 text-sm text-white/70">{p.description}</p>
        </div>
        <span className="inline-flex w-fit items-center rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/50">
          Próximamente
        </span>
      </div>
    );
  }

  const isAnchor = p.href.startsWith("#");
  return (
    <a
      href={p.href}
      {...(isAnchor ? {} : { target: "_blank", rel: "noopener noreferrer" })}
      className={`${base} group transition duration-[250ms] hover:-translate-y-0.5 hover:border-white/30`}
    >
      <PlatformMedia p={p} />
      <div className="flex-1">
        <h3 className="font-semibold text-white">{p.name}</h3>
        <p className="mt-1 text-sm text-white/70">{p.description}</p>
      </div>
      <span className="text-sm font-medium text-sky-300 group-hover:text-white">
        {ctaLabel(p)}
      </span>
    </a>
  );
}

export default function SmartTVSection() {
  return (
    <section className="border-t border-white/10 bg-brand text-white">
      <div className="section py-16">
        <div className="mb-8 max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-sky-300">
            Disponible en tu pantalla grande
          </p>
          <h2 className="mt-2 text-2xl font-bold text-white sm:text-3xl">
            Lleva Red ADvenir a tu Smart TV
          </h2>
          <p className="mt-2 text-white/70">
            Instala nuestra app gratuita y disfruta de la transmisión en HD en tu
            pantalla favorita.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {platforms.map((p) => (
            <PlatformCard key={p.name} p={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
