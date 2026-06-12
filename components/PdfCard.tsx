import type { StudyPdf } from "@/lib/types";

export default function PdfCard({ study }: { study: StudyPdf }) {
  return (
    <article className="flex flex-col rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-live/10 text-live">
        <i className="bi bi-file-earmark-pdf text-2xl" />
      </div>
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
    </article>
  );
}
