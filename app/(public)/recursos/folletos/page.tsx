import type { Metadata } from "next";
import Image from "next/image";

import SectionHeader from "@/components/SectionHeader";
import { getFolletos } from "@/lib/content";

export const metadata: Metadata = {
  title: "Folletos",
  description:
    "Material imprimible para evangelismo y estudio personal de la Biblia.",
};

export const revalidate = 60;

export default async function FolletosPage() {
  const folletos = await getFolletos();

  return (
    <div className="section py-12">
      <SectionHeader
        eyebrow="Recursos"
        title="Folletos"
        subtitle="Material imprimible para evangelismo y estudio personal."
      />

      {folletos.length === 0 ? (
        <div className="rounded-xl border border-slate-200 bg-white p-8 text-center">
          <i className="bi bi-file-earmark-text text-5xl text-slate-300" />
          <p className="mt-4 text-slate-600">
            Pronto tendremos folletos disponibles para descargar.
          </p>
          <p className="mt-2 text-sm text-slate-500">
            Estamos preparando material de calidad para ti.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {folletos.map((folleto) => (
            <article
              key={folleto._id}
              className="flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="relative aspect-[4/3] bg-slate-100">
                {folleto.cover ? (
                  <Image
                    src={folleto.cover}
                    alt={folleto.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-slate-300">
                    <i className="bi bi-file-earmark-text text-5xl" />
                  </div>
                )}
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h3 className="line-clamp-2 min-h-[3rem] font-semibold text-slate-800">
                  {folleto.title}
                </h3>
                {folleto.description && (
                  <p className="mt-1 line-clamp-2 text-sm text-slate-600">
                    {folleto.description}
                  </p>
                )}
                <a
                  href={folleto.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  download={`${folleto.title}.pdf`}
                  className="mt-4 inline-flex w-fit items-center gap-2 rounded-md bg-brand px-4 py-2 text-sm font-medium text-white hover:bg-brand-700"
                >
                  <i className="bi bi-download" /> Descargar PDF
                </a>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
