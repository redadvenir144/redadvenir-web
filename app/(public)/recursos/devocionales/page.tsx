import type { Metadata } from "next";

import SectionHeader from "@/components/SectionHeader";
import { getDevocionales } from "@/lib/content";
import { sanitizeRichText } from "@/lib/sanitize";

export const metadata: Metadata = {
  title: "Devocionales",
  description: "Lecturas diarias para tu momento de comunión con Dios.",
};

export const revalidate = 60;

function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  return date.toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function DevocionalesPage() {
  const devocionales = await getDevocionales();

  return (
    <div className="section py-12">
      <SectionHeader
        eyebrow="Recursos"
        title="Devocionales"
        subtitle="Lecturas diarias para tu momento de comunión con Dios."
      />

      {devocionales.length === 0 ? (
        <div className="rounded-xl border border-slate-200 bg-white p-8 text-center">
          <i className="bi bi-sunrise text-5xl text-slate-300" />
          <p className="mt-4 text-slate-600">
            Pronto tendremos devocionales disponibles.
          </p>
          <p className="mt-2 text-sm text-slate-500">
            Estamos preparando material de calidad para ti.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {devocionales.map((devocional) => (
            <article
              key={devocional._id}
              className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="mb-4 flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-1 rounded-full bg-accent/10 px-3 py-1 text-sm font-medium text-accent-700">
                  <i className="bi bi-calendar3" />
                  {formatDate(devocional.date)}
                </span>
                {devocional.author && (
                  <span className="text-sm text-slate-500">
                    por {devocional.author}
                  </span>
                )}
              </div>
              <h2 className="mb-3 text-xl font-bold text-brand">
                {devocional.title}
              </h2>
              <div
                className="prose prose-slate max-w-none"
                dangerouslySetInnerHTML={{ __html: sanitizeRichText(devocional.body || "") }}
              />
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
