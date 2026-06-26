import type { Metadata } from "next";

import SectionHeader from "@/components/SectionHeader";
import YouTubePlaylist from "@/components/YouTubePlaylist";
import ProgramGrid from "@/components/ProgramGrid";
import ChannelVideos from "@/components/ChannelVideos";
import { getPrograms, getSchedule } from "@/lib/content";
import { getChannelVideos } from "@/lib/youtube";
import { hasPlayableVideo } from "@/lib/youtubeEmbed";

export const metadata: Metadata = {
  title: "Programación",
  description: "Programas principales y grilla de programación de Red ADvenir.",
};

export const revalidate = 60;

export default async function ProgramacionPage() {
  const [programs, schedule, channelVideos] = await Promise.all([
    getPrograms(),
    getSchedule(),
    getChannelVideos(6),
  ]);

  // Solo programas con video configurado (se saltean los placeholders).
  const playablePrograms = programs.filter((p) =>
    hasPlayableVideo(p.youtubePlaylistId),
  );

  return (
    <div className="section py-12">
      <SectionHeader
        eyebrow="Programación"
        title="Nuestros programas"
        subtitle="Mira los principales programas de Red ADvenir y consulta la grilla semanal."
      />

      {playablePrograms.length > 0 && (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {playablePrograms.map((p) => (
            <YouTubePlaylist key={p._id} program={p} />
          ))}
        </div>
      )}

      {channelVideos.length > 0 && (
        <>
          <h2 className="mb-6 mt-16 flex items-center gap-2 text-2xl font-bold text-brand">
            <i className="bi bi-youtube text-live" /> Últimos videos del canal
          </h2>
          <ChannelVideos videos={channelVideos} />
        </>
      )}

      <h2 className="mb-6 mt-16 text-2xl font-bold text-brand">
        Grilla de programación
      </h2>
      <ProgramGrid slots={schedule} />
    </div>
  );
}
