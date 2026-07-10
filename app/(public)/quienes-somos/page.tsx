import type { Metadata } from "next";
import Image from "next/image";

import SectionHeader from "@/components/SectionHeader";
import BeliefsAccordion from "@/components/BeliefsAccordion";
import { getBeliefs, getGallery, getAboutConfig } from "@/lib/content";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Quiénes Somos",
  description:
    "Historia de Red ADvenir, sus fundadores y las creencias adventistas.",
};

export const revalidate = 60;

export default async function QuienesSomosPage() {
  const [beliefs, gallery, aboutConfig] = await Promise.all([
    getBeliefs(),
    getGallery(),
    getAboutConfig(),
  ]);

  const cards = [
    {
      key: "founded",
      value: String(SITE.founded),
      label: "Año de fundación",
      valueClass: "text-3xl font-bold text-accent-600",
      photo: aboutConfig?.foundedPhoto,
    },
    {
      key: "founder",
      value: SITE.founder,
      label: "Fundador",
      valueClass: "text-lg font-bold text-brand",
      photo: aboutConfig?.founderPhoto,
    },
    {
      key: "hq",
      value: "Santa Cruz, Bolivia",
      label: "Sede principal",
      valueClass: "text-lg font-bold text-brand",
      photo: aboutConfig?.hqPhoto,
    },
  ];

  return (
    <div className="section py-12">
      <SectionHeader
        eyebrow="Quiénes Somos"
        title="Nuestra historia"
        subtitle={`${SITE.longName}: fe, esperanza y servicio a través de los medios.`}
      />

      {/* Historia + galería */}
      <div className={`gap-10 ${gallery.length > 0 ? "lg:grid lg:grid-cols-2" : ""}`}>
        <div className="prose prose-slate max-w-none">
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

        {gallery.length > 0 && (
          <div className="grid grid-cols-1 gap-3 mt-6 sm:grid-cols-2 lg:mt-0">
            {gallery.map((img) => (
              <div
                key={img._id}
                className="relative overflow-hidden rounded-xl shadow-sm aspect-video"
              >
                <Image
                  src={img.image}
                  alt={img.caption ?? "Galería Red ADvenir"}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 50vw, 25vw"
                />
                {img.caption && (
                  <p className="absolute bottom-0 left-0 right-0 bg-black/50 px-2 py-1 text-xs text-white">
                    {img.caption}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Tarjetas de datos */}
      <div className="mt-10 grid gap-4 sm:grid-cols-3">
        {cards.map((c) => (
          <div
            key={c.key}
            className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm"
          >
            {c.photo && (
              <div className="relative h-40 w-full">
                <Image
                  src={c.photo}
                  alt={c.label}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, 33vw"
                />
              </div>
            )}
            <div className="p-5 text-center">
              <p className={c.valueClass}>{c.value}</p>
              <p className="text-sm text-slate-600">{c.label}</p>
            </div>
          </div>
        ))}
      </div>

      <h2 className="mb-2 mt-16 text-2xl font-bold text-brand">
        Nuestras creencias
      </h2>
      <p className="mb-6 max-w-2xl text-slate-600">
        Como iglesia adventista del séptimo día, sostenemos las creencias
        fundamentales basadas en la Biblia. Estas son algunas de ellas:
      </p>
      <BeliefsAccordion beliefs={beliefs} />
    </div>
  );
}
