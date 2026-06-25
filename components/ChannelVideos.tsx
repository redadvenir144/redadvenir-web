import Image from "next/image";

import type { YouTubeVideo } from "@/lib/youtube";

export default function ChannelVideos({ videos }: { videos: YouTubeVideo[] }) {
  if (videos.length === 0) return null;

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {videos.map((v) => (
        <a
          key={v.id}
          href={`https://www.youtube.com/watch?v=${v.id}`}
          target="_blank"
          rel="noopener noreferrer"
          className="group overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-md"
        >
          <div className="relative aspect-video overflow-hidden bg-slate-100">
            {v.thumbnail && (
              <Image
                src={v.thumbnail}
                alt={v.title}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            )}
            <span className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition-opacity group-hover:opacity-100">
              <i className="bi bi-play-circle-fill text-5xl text-white" />
            </span>
          </div>
          <div className="p-4">
            <h3 className="line-clamp-2 font-semibold text-slate-800 group-hover:text-brand">
              {v.title}
            </h3>
          </div>
        </a>
      ))}
    </div>
  );
}
