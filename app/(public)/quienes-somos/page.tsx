import type { Metadata } from "next";

import SectionHeader from "@/components/SectionHeader";
import { getBeliefs } from "@/lib/content";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Quiénes Somos",
  description:
    "Historia de Red ADvenir, sus fundadores y las creencias adventistas.",
};

export const dynamic = "force-dynamic";

export default async function QuienesSomosPage() {
  const beliefs = await getBeliefs();

  return (
    <div className="section py-12">
      <SectionHeader
        eyebrow="Quiénes Somos"
        title="Nuestra historia"
        subtitle={`${SITE.longName}: fe, esperanza y servicio a través de los medios.`}
      />

      <div className="prose prose-slate max-w-3xl">
        <p className="text-slate-700">
          {SITE.longName} es una red de televisión adventista del séptimo día, sin
          fines de lucro, fundada en {SITE.founded} por el {SITE.founder}. Con sede
          principal en {SITE.hqCity}, transmite televisión y radio en vivo con
          cobertura en señal abierta, cable, satélite y streaming, alcanzando a
          audiencias en todo el mundo.
        </p>
        <p className="mt-4 text-slate-700">
          Red ADvenir está vinculada al ministerio {SITE.ministry}, avanzando con el
          esfuerzo de voluntarios comprometidos con compartir el evangelio y la
          esperanza del pronto regreso de Cristo.
        </p>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-slate-200 bg-white p-5 text-center shadow-sm">
          <p className="text-3xl font-bold text-accent-600">{SITE.founded}</p>
          <p className="text-sm text-slate-600">Año de fundación</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-5 text-center shadow-sm">
          <p className="text-lg font-bold text-brand">{SITE.founder}</p>
          <p className="text-sm text-slate-600">Fundador</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-5 text-center shadow-sm">
          <p className="text-lg font-bold text-brand">Santa Cruz, Bolivia</p>
          <p className="text-sm text-slate-600">Sede principal</p>
        </div>
      </div>

      <h2 className="mb-2 mt-16 text-2xl font-bold text-brand">
        Creencias adventistas
      </h2>
      <p className="mb-6 max-w-2xl text-slate-600">
        Como iglesia adventista del séptimo día, sostenemos las creencias
        fundamentales basadas en la Biblia. Estas son algunas de ellas:
      </p>
      <div className="grid gap-4 md:grid-cols-2">
        {beliefs.map((b) => (
          <div
            key={b._id}
            className="flex gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand font-bold text-white">
              {b.number}
            </div>
            <div>
              <h3 className="font-semibold text-slate-800">{b.title}</h3>
              <p className="mt-1 text-sm text-slate-600">{b.summary}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
