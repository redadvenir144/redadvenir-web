import Link from "next/link";

import LiveTVPlayer from "@/components/LiveTVPlayer";
import RadioPlayer from "@/components/RadioPlayer";
import FacebookFeed from "@/components/FacebookFeed";
import BlogCard from "@/components/BlogCard";
import { getPosts } from "@/lib/content";
import { SITE } from "@/lib/site";
import { SMART_TV_APPS } from "@/lib/streams";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const posts = await getPosts();

  return (
    <>
      {/* Hero: TV en vivo + Facebook */}
      <section className="relative overflow-hidden bg-brand text-white">
        {/* fondo decorativo */}
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-br from-brand via-brand-700 to-brand opacity-95"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-accent/10 blur-3xl"
          aria-hidden="true"
        />

        <div className="section relative grid gap-8 py-10 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <div className="mb-4">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-white/90">
                <span className="live-dot h-2 w-2 rounded-full bg-live" /> Ahora en vivo
              </span>
              <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                Televisión cristiana, las 24 horas
              </h1>
              <p className="mt-2 max-w-xl text-white/70">
                {SITE.longName} — esperanza y fe a través de los medios.
              </p>
            </div>
            <LiveTVPlayer />

            {/* Disponible también en */}
            <div className="mt-4 flex flex-wrap items-center gap-2 text-sm text-white/70">
              <span>También en:</span>
              {SMART_TV_APPS.map((a) => (
                <a
                  key={a.platform}
                  href={a.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/20 px-3 py-1 text-xs font-medium text-white transition-colors hover:bg-white/10"
                >
                  <i className="bi bi-tv" /> {a.platform}
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-4">
            <FacebookFeed />
          </div>
        </div>
      </section>

      {/* Radio en vivo (franja propia) */}
      <section className="border-b border-slate-200 bg-slate-50">
        <div className="section py-10">
          <RadioPlayer />
        </div>
      </section>

      {/* Blog / noticias */}
      <section className="section py-14">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-accent-600">
              Blog
            </p>
            <h2 className="text-2xl font-bold text-brand sm:text-3xl">
              Noticias y notas teológicas
            </h2>
          </div>
          <Link
            href="/estudios-biblicos"
            className="hidden shrink-0 text-sm font-medium text-brand-500 hover:underline sm:block"
          >
            Ver estudios bíblicos →
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <BlogCard key={post._id} post={post} />
          ))}
        </div>
      </section>
    </>
  );
}
