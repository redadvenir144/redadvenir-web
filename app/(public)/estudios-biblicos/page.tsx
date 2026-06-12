import type { Metadata } from "next";

import SectionHeader from "@/components/SectionHeader";
import PdfCard from "@/components/PdfCard";
import YouTubePlaylist from "@/components/YouTubePlaylist";
import { getStudies, getPrograms } from "@/lib/content";

export const metadata: Metadata = {
  title: "Estudios Bíblicos",
  description:
    "Guías de estudio de la Biblia descargables en PDF y guías en video.",
};

export const dynamic = "force-dynamic";

export default async function EstudiosPage() {
  const [studies, programs] = await Promise.all([getStudies(), getPrograms()]);
  // Reutilizamos los programas como guías en video (playlists de YouTube).
  const videoGuides = programs.slice(0, 3);

  return (
    <div className="section py-12">
      <SectionHeader
        eyebrow="Estudios Bíblicos"
        title="Crece en el conocimiento de la Palabra"
        subtitle="Descarga nuestras guías en PDF y acompáñalas con las guías en video."
      />

      <h2 className="mb-6 flex items-center gap-2 text-xl font-bold text-brand">
        <i className="bi bi-file-earmark-pdf text-live" /> Guías descargables (PDF)
      </h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {studies.map((s) => (
          <PdfCard key={s._id} study={s} />
        ))}
      </div>

      <h2 className="mb-6 mt-16 flex items-center gap-2 text-xl font-bold text-brand">
        <i className="bi bi-youtube text-live" /> Guías en video
      </h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {videoGuides.map((p) => (
          <YouTubePlaylist key={p._id} program={p} />
        ))}
      </div>
    </div>
  );
}
