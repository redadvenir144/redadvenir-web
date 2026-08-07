import type { Metadata } from "next";
import Image from "next/image";

import SectionHeader from "@/components/SectionHeader";
import { getLibros } from "@/lib/content";

export const metadata: Metadata = {
  title: "Libros",
  description:
    "Libros digitales para profundizar en la fe adventista y el estudio de la Biblia.",
};

export const revalidate = 60;

export default async function LibrosPage() {
  const libros = await getLibros();

  return (
    <div className="section py-12">
      <SectionHeader
        eyebrow="Recursos"
        title="Libros"
        subtitle="Libros digitales para profundizar en la fe adventista."
      />

      {libros.length === 0 ? (
        <div className="rounded-xl border border-slate-200 bg-white p-8 text-center">
          <i className="bi bi-journal-bookmark text-5xl text-slate-300" />
          <p className="mt-4 text-slate-600">
            Pronto tendremos libros disponibles para descargar.
          </p>
          <p className="mt-2 text-sm text-slate-500">
            Estamos preparando material de calidad para ti.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {libros.map((libro) => (
            <article
              key={libro._id}
              className="flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="relative aspect-[3/4] bg-slate-100">
                {libro.cover ? (
                  <Image
                    src={libro.cover}
                    alt={libro.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-slate-300">
                    <i className="bi bi-journal-bookmark text-5xl" />
                  </div>
                )}
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h3 className="line-clamp-2 font-semibold text-slate-800">
                  {libro.title}
                </h3>
                {libro.author && (
                  <p className="mt-1 text-sm text-accent-600">{libro.author}</p>
                )}
                {libro.description && (
                  <p className="mt-2 line-clamp-3 text-sm text-slate-600">
                    {libro.description}
                  </p>
                )}
                <a
                  href={libro.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  download={`${libro.title}.pdf`}
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
