import type { Metadata } from "next";

import BlogCard from "@/components/BlogCard";
import { getPosts } from "@/lib/content";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Blog y noticias",
  description:
    "Noticias cristianas, notas proféticas y teológicas de Red ADvenir TV.",
};

export default async function BlogIndexPage() {
  const posts = await getPosts();

  return (
    <div>
      {/* Encabezado con banda de marca */}
      <header className="bg-brand text-white">
        <div className="section py-14 sm:py-16">
          <div className="mx-auto max-w-6xl">
            <h1 className="border-l-4 border-accent pl-4 text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">
              Noticias y notas teológicas
            </h1>
            <p className="mt-4 max-w-2xl text-white/70">
              Todas nuestras publicaciones: noticias cristianas, notas proféticas
              y estudios teológicos.
            </p>
          </div>
        </div>
      </header>

      {/* Grilla de todas las entradas */}
      <section className="section py-12">
        <div className="mx-auto max-w-6xl">
          {posts.length > 0 ? (
            <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <BlogCard key={post._id} post={post} />
              ))}
            </div>
          ) : (
            <p className="py-16 text-center text-slate-400">
              Aún no hay publicaciones.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
