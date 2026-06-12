import type { Metadata } from "next";

import SectionHeader from "@/components/SectionHeader";
import YouTubePlaylist from "@/components/YouTubePlaylist";
import ProgramGrid from "@/components/ProgramGrid";
import { getPrograms, getSchedule } from "@/lib/content";

export const metadata: Metadata = {
  title: "Programación",
  description: "Programas principales y grilla de programación de Red ADvenir.",
};

export const dynamic = "force-dynamic";

export default async function ProgramacionPage() {
  const [programs, schedule] = await Promise.all([getPrograms(), getSchedule()]);

  return (
    <div className="section py-12">
      <SectionHeader
        eyebrow="Programación"
        title="Nuestros programas"
        subtitle="Mira los principales programas de Red ADvenir y consulta la grilla semanal."
      />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {programs.map((p) => (
          <YouTubePlaylist key={p._id} program={p} />
        ))}
      </div>

      <h2 className="mb-6 mt-16 text-2xl font-bold text-brand">
        Grilla de programación
      </h2>
      <ProgramGrid slots={schedule} />
    </div>
  );
}
