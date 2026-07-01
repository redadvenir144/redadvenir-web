import type { Metadata } from "next";
import Image from "next/image";

import SectionHeader from "@/components/SectionHeader";
import ChannelsMap from "@/components/map/ChannelsMap";
import {
  SATELLITES,
  OPEN_TV_CHANNELS,
  CABLE_PROVIDERS,
  STREAMING_URLS,
  APPS,
} from "@/lib/signal";
import { GMI_CHANNELS, GMI_LINKS } from "@/lib/gmiChannels";

export const metadata: Metadata = {
  title: "Señal",
  description:
    "Dónde ver Red ADvenir: señal abierta, satélite, cable, streaming, apps y la red GMI.",
};

function Card({
  icon,
  title,
  delay = 0,
  className = "",
  children,
}: {
  icon: string;
  title: string;
  delay?: number;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`reveal-up rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md ${className}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <h2 className="mb-4 flex items-center gap-3 text-lg font-semibold text-brand">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent-600">
          <i className={`bi bi-${icon} text-xl`} />
        </span>
        {title}
      </h2>
      {children}
    </div>
  );
}

export default function SenalPage() {
  return (
    <div className="section py-12">
      <SectionHeader
        eyebrow="Señal"
        title="Dónde encontrarnos"
        subtitle="Red ADvenir transmite por señal abierta, satélite, cable, streaming y apps."
      />

      {/* TV abierta — destacado (Bolivia) */}
      <div
        className="reveal-up mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
        style={{ animationDelay: "0ms" }}
      >
        <div className="flex items-center gap-3 border-b border-slate-100 bg-gradient-to-r from-brand to-brand-700 px-6 py-4 text-white">
          <i className="bi bi-tv text-2xl text-accent" />
          <div>
            <h2 className="text-lg font-bold">Señal abierta en Bolivia</h2>
            <p className="text-sm text-white/70">
              {OPEN_TV_CHANNELS.length} canales en todo el país
            </p>
          </div>
        </div>
        <ul className="grid gap-x-6 gap-y-1 p-6 sm:grid-cols-2 lg:grid-cols-3">
          {OPEN_TV_CHANNELS.map((c) => (
            <li
              key={`${c.channel}-${c.cities}`}
              className="flex items-center gap-3 rounded-lg px-2 py-2 text-sm transition-colors hover:bg-slate-50"
            >
              <span className="flex h-9 min-w-9 items-center justify-center rounded-lg bg-brand px-2 text-xs font-bold text-white">
                {c.channel}
              </span>
              <span className="text-slate-700">{c.cities}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Otras formas de ver */}
      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <Card icon="broadcast-pin" title="Satélite" delay={60}>
          <ul className="space-y-3">
            {SATELLITES.map((s) => (
              <li key={s.name}>
                <p className="font-medium text-slate-800">{s.name}</p>
                <p className="text-sm text-slate-600">{s.detail}</p>
              </li>
            ))}
          </ul>
        </Card>

        <Card icon="ethernet" title="Cableras" delay={120}>
          <ul className="space-y-2">
            {CABLE_PROVIDERS.map((c) => (
              <li key={c.name} className="flex gap-3 text-sm">
                <span className="w-24 shrink-0 font-semibold text-brand">{c.name}</span>
                <span className="text-slate-600">{c.channel}</span>
              </li>
            ))}
          </ul>
        </Card>

        <Card icon="play-btn-fill" title="Streaming en vivo" delay={180}>
          <p className="text-sm text-slate-600">
            Míralo en vivo desde el sitio, en calidad{" "}
            {STREAMING_URLS.map((u) => u.label).join(", ")}.
          </p>
          <a
            href="/#en-vivo"
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
          >
            <i className="bi bi-play-circle" /> Ver en vivo ahora
          </a>
        </Card>

        <Card icon="phone" title="Apps disponibles" delay={240}>
          <div className="flex flex-wrap gap-3">
            {APPS.map((a) => (
              <a
                key={a.platform}
                href={a.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-brand transition-colors hover:border-brand hover:bg-slate-50"
              >
                <i className="bi bi-box-arrow-up-right" /> {a.platform}
              </a>
            ))}
          </div>
        </Card>
      </div>

      {/* Red GMI: mapa + canales */}
      <div id="mapa" className="mt-16">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-accent-600">
          Red mundial
        </p>
        <h2 className="mt-2 text-2xl font-bold text-brand sm:text-3xl">
          GMI — Canales en el mundo
        </h2>
        <p className="mb-6 mt-2 max-w-2xl text-slate-600">
          Red ADvenir forma parte de Gospel Ministries International (GMI), una red de
          canales cristianos que alcanza distintos países e idiomas.
        </p>

        <div className="overflow-hidden rounded-2xl border border-slate-200 shadow-sm">
          <ChannelsMap />
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {GMI_CHANNELS.map((c, i) => (
            <div
              key={c.name}
              className="reveal-up group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand hover:shadow-md"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              {c.logo && (
                <div className="relative mb-3 h-20 w-full">
                  <Image
                    src={c.logo}
                    alt={c.name}
                    fill
                    sizes="300px"
                    className="object-contain object-left"
                  />
                </div>
              )}
              <h4 className="font-semibold text-slate-800 group-hover:text-brand">
                {c.name}
              </h4>
              <p className="mt-1 flex items-center gap-1.5 text-sm text-slate-600">
                <i className="bi bi-geo-alt text-accent-600" /> {c.region}
              </p>
              <p className="text-sm text-slate-500">{c.language}</p>
              {c.url && (
                <a
                  href={c.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-brand-500 hover:underline"
                >
                  Visitar sitio <i className="bi bi-box-arrow-up-right text-xs" />
                </a>
              )}
            </div>
          ))}
        </div>

        <h3 className="mb-4 mt-12 text-xl font-bold text-brand">Más de la red GMI</h3>
        <div className="flex flex-wrap gap-3">
          {GMI_LINKS.map((l) => (
            <a
              key={l.url}
              href={l.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-brand transition-colors hover:border-brand hover:bg-slate-50"
            >
              <i className="bi bi-broadcast" /> {l.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
