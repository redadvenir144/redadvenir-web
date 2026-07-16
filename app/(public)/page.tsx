import Link from "next/link";

import LiveTVPlayer from "@/components/LiveTVPlayer";
import RadioPlayer from "@/components/RadioPlayer";
// import FacebookFeed from "@/components/FacebookFeed"; // Comentado: hero minimalista sin feed de Facebook
// import NowPlaying from "@/components/NowPlaying"; // TODO: evaluar uso futuro del panel "Ahora en pantalla".
import SmartTVSection from "@/components/SmartTVSection";
import BlogCard from "@/components/BlogCard";
import { getPosts } from "@/lib/content";
import { SMART_TV_APPS } from "@/lib/streams";
// import { SITE } from "@/lib/site"; // Descomentar para restaurar el subtítulo del hero

export const revalidate = 60;

export default async function HomePage() {
  const posts = await getPosts();

  return (
    <>
      {/* Hero: TV en vivo + Facebook */}
      <section id="en-vivo" className="hero-bg relative overflow-hidden bg-brand text-white">
        {/* fondo decorativo */}
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-br from-brand via-brand-700 to-brand opacity-95"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-accent/10 blur-3xl"
          aria-hidden="true"
        />

        <div className="section relative z-10 py-10">
          <div className="mx-auto max-w-5xl">
          <div className="mb-6">
            {/* Badge "Ahora en vivo" comentado: redundante con el "EN VIVO" del reproductor.
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-white/90">
              <span className="live-dot h-2 w-2 rounded-full bg-live" /> Ahora en vivo
            </span>
            */}
            <h1 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
              Televisión cristiana, las 24 horas
            </h1>
            {/* Subtítulo comentado (hero minimalista). Para restaurarlo, descomentar
                también el import de SITE arriba.
            <p className="mt-6 max-w-xl text-base font-normal text-white/70 sm:text-lg">
              {SITE.longName} — esperanza y fe a través de los medios.
            </p>
            */}
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

          {/* Columna de Facebook comentada por decisión de diseño (hero minimalista):
          <div className="lg:col-span-4">
            <FacebookFeed />
          </div>
          */}
          </div>
        </div>
      </section>

      {/* Radio en vivo (franja propia, tema oscuro de marca) */}
      <section className="border-t border-white/10 bg-brand text-white">
        <div className="section py-14">
          <RadioPlayer />
        </div>
      </section>

      {/* Smart TV y apps */}
      <SmartTVSection />

      {/* Blog / noticias */}
      <section id="blog" className="scroll-mt-24 section py-14">
        <div className="mb-8 flex flex-col items-start gap-2 sm:flex-row sm:items-end sm:justify-between sm:gap-4">
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
            className="shrink-0 text-sm font-medium text-brand-500 hover:underline"
          >
            Ver estudios bíblicos →
          </Link>
        </div>

        <div className="grid gap-x-6 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
          {posts.slice(0, 6).map((post) => (
            <BlogCard key={post._id} post={post} />
          ))}
        </div>

        {posts.length > 0 && (
          <div className="mt-10 flex justify-center">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
            >
              Ver más
              <i className="bi bi-arrow-right" />
            </Link>
          </div>
        )}
      </section>
    </>
  );
}
