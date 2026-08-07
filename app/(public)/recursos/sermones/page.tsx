import type { Metadata } from "next";
import Image from "next/image";

import SectionHeader from "@/components/SectionHeader";
import { getSermones } from "@/lib/content";
import { getThumbnailId } from "@/lib/youtubeEmbed";

export const metadata: Metadata = {
  title: "Sermones",
  description: "Mensajes inspiradores de nuestros pastores y evangelistas.",
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

export default async function SermonesPage() {
  const sermones = await getSermones();

  return (
    <div className="section py-12">
      <SectionHeader
        eyebrow="Recursos"
        title="Sermones"
        subtitle="Mensajes inspiradores de nuestros pastores y evangelistas."
      />

      {sermones.length === 0 ? (
        <div className="rounded-xl border border-slate-200 bg-white p-8 text-center">
          <i className="bi bi-mic text-5xl text-slate-300" />
          <p className="mt-4 text-slate-600">
            Pronto tendremos sermones disponibles.
          </p>
          <p className="mt-2 text-sm text-slate-500">
            Estamos preparando material de calidad para ti.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {sermones.map((sermon) => {
            const videoId = sermon.youtubeUrl
              ? getThumbnailId(sermon.youtubeUrl)
              : null;
            const thumbnail =
              sermon.cover ||
              (videoId ? `https://img.youtube.com/vi/${videoId}/mqdefault.jpg` : null);

            return (
              <article
                key={sermon._id}
                className="flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="relative aspect-video bg-slate-100">
                  {thumbnail ? (
                    <Image
                      src={thumbnail}
                      alt={sermon.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-slate-300">
                      <i className="bi bi-mic text-5xl" />
                    </div>
                  )}
                  {videoId && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="rounded-full bg-brand/90 p-3 text-white">
                        <i className="bi bi-play-fill text-2xl" />
                      </div>
                    </div>
                  )}
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="line-clamp-2 font-semibold text-slate-800">
                    {sermon.title}
                  </h3>
                  {sermon.speaker && (
                    <p className="mt-1 text-sm text-accent-600">
                      {sermon.speaker}
                    </p>
                  )}
                  {sermon.date && (
                    <p className="mt-1 text-xs text-slate-500">
                      {formatDate(sermon.date)}
                    </p>
                  )}
                  {sermon.description && (
                    <p className="mt-2 line-clamp-2 text-sm text-slate-600">
                      {sermon.description}
                    </p>
                  )}
                  <div className="mt-4 flex flex-wrap gap-2">
                    {sermon.youtubeUrl && (
                      <a
                        href={sermon.youtubeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-md bg-brand px-4 py-2 text-sm font-medium text-white hover:bg-brand-700"
                      >
                        <i className="bi bi-youtube" /> Ver video
                      </a>
                    )}
                    {sermon.audioUrl && (
                      <a
                        href={sermon.audioUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-md border border-brand px-4 py-2 text-sm font-medium text-brand hover:bg-brand hover:text-white"
                      >
                        <i className="bi bi-headphones" /> Escuchar
                      </a>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
