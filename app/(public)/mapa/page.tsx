import type { Metadata } from "next";

import SectionHeader from "@/components/SectionHeader";
import ChannelsMap from "@/components/map/ChannelsMap";
import { GMI_CHANNELS, GMI_LINKS } from "@/lib/gmiChannels";

export const metadata: Metadata = {
  title: "Mapa de canales GMI",
  description:
    "Mapa de los canales de televisión de Gospel Ministries International (GMI) en el mundo.",
};

export default function MapaPage() {
  return (
    <div className="section py-12">
      <SectionHeader
        eyebrow="Red GMI en el mundo"
        title="Canales de televisión GMI"
        subtitle="Red ADvenir forma parte de Gospel Ministries International (GMI), una red de canales cristianos que alcanza distintos países e idiomas."
      />

      <div className="mb-4 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
        <i className="bi bi-info-circle" /> Ubicaciones de referencia — verificar y
        completar con el equipo de GMI antes de publicar.
      </div>

      <ChannelsMap />

      {/* Lista de canales */}
      <h2 className="mb-6 mt-12 text-2xl font-bold text-brand">Canales de la red</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {GMI_CHANNELS.map((c) => (
          <div
            key={c.name}
            className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <h3 className="font-semibold text-slate-800">{c.name}</h3>
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

      {/* Enlaces de la red GMI */}
      <h2 className="mb-4 mt-12 text-2xl font-bold text-brand">Más de la red GMI</h2>
      <div className="flex flex-wrap gap-3">
        {GMI_LINKS.map((l) => (
          <a
            key={l.url}
            href={l.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-brand hover:border-brand hover:bg-slate-50"
          >
            <i className="bi bi-broadcast" /> {l.name}
          </a>
        ))}
      </div>
    </div>
  );
}
