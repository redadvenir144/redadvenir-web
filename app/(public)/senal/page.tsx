import type { Metadata } from "next";

import SectionHeader from "@/components/SectionHeader";
import {
  SATELLITES,
  OPEN_TV_CHANNELS,
  CABLE_PROVIDERS,
  STREAMING_URLS,
  APPS,
  GMI_SIGNALS,
} from "@/lib/signal";

export const metadata: Metadata = {
  title: "Señal",
  description:
    "Dónde ver Red ADvenir: satélite, TV abierta, cable, streaming y apps.",
};

function Card({
  icon,
  title,
  children,
}: {
  icon: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-brand">
        <i className={`bi bi-${icon} text-accent-600`} /> {title}
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

      <div className="mb-6 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
        <i className="bi bi-info-circle" /> Datos técnicos de referencia — verificar
        y actualizar antes de publicar.
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card icon="broadcast-pin" title="Satélite">
          <ul className="space-y-3">
            {SATELLITES.map((s) => (
              <li key={s.name}>
                <p className="font-medium text-slate-800">{s.name}</p>
                <p className="text-sm text-slate-600">{s.detail}</p>
              </li>
            ))}
          </ul>
        </Card>

        <Card icon="tv" title="TV abierta">
          <ul className="space-y-2">
            {OPEN_TV_CHANNELS.map((c) => (
              <li key={c.channel} className="flex gap-3 text-sm">
                <span className="w-20 shrink-0 font-semibold text-brand">{c.channel}</span>
                <span className="text-slate-600">{c.cities}</span>
              </li>
            ))}
          </ul>
        </Card>

        <Card icon="ethernet" title="Cableras">
          <ul className="space-y-2">
            {CABLE_PROVIDERS.map((c) => (
              <li key={c.name} className="flex gap-3 text-sm">
                <span className="w-24 shrink-0 font-semibold text-brand">{c.name}</span>
                <span className="text-slate-600">{c.channel}</span>
              </li>
            ))}
          </ul>
        </Card>

        <Card icon="play-btn" title="Streaming">
          <ul className="space-y-2">
            {STREAMING_URLS.map((u) => (
              <li key={u.src} className="flex flex-col text-sm">
                <span className="font-medium text-slate-800">Calidad {u.label}</span>
                <code className="break-all text-xs text-slate-500">{u.src}</code>
              </li>
            ))}
          </ul>
        </Card>

        <Card icon="phone" title="Apps disponibles">
          <div className="flex flex-wrap gap-3">
            {APPS.map((a) => (
              <a
                key={a.platform}
                href={a.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-md border border-slate-200 px-4 py-2 text-sm font-medium text-brand hover:bg-slate-50"
              >
                <i className="bi bi-box-arrow-up-right" /> {a.platform}
              </a>
            ))}
          </div>
        </Card>

        <Card icon="globe-americas" title="GMI en el mundo">
          <ul className="space-y-3">
            {GMI_SIGNALS.map((g) => (
              <li key={g.region}>
                <p className="font-medium text-slate-800">{g.region}</p>
                <p className="text-sm text-slate-600">{g.detail}</p>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
}
