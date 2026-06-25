import Image from "next/image";

import type { StudyPdf } from "@/lib/types";

export default function PdfCard({ study }: { study: StudyPdf }) {
  return (
    <article className="flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-md">
      {/* Portada */}
      <div className="relative aspect-[4/3] bg-slate-100">
        {study.cover ? (
          <Image
            src={study.cover}
            alt={study.title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-slate-300">
            <i className="bi bi-file-earmark-pdf text-5xl" />
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-semibold text-slate-800">{study.title}</h3>
        {study.description && (
          <p className="mt-1 flex-1 text-sm text-slate-600">{study.description}</p>
        )}
        <a
          href={study.pdfUrl}
          target="_blank"
          rel="noopener noreferrer"
          download
          className="mt-4 inline-flex w-fit items-center gap-2 rounded-md bg-brand px-4 py-2 text-sm font-medium text-white hover:bg-brand-700"
        >
          <i className="bi bi-download" /> Descargar PDF
        </a>
      </div>
    </article>
  );
}
