"use client";

import { useMemo, useState } from "react";

import BlogCard from "@/components/BlogCard";
import { CATEGORY_LABEL, type Post } from "@/lib/types";

// Normaliza para búsqueda: minúsculas y sin acentos.
function norm(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");
}

export default function BlogList({ posts }: { posts: Post[] }) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);

  // Enfoca el campo al montarse (al abrir la lupa), sin usar autoFocus.
  const focusOnMount = (el: HTMLInputElement | null) => el?.focus();

  function closeSearch() {
    setQuery("");
    setOpen(false);
  }

  const filtered = useMemo(() => {
    const q = norm(query.trim());
    if (!q) return posts;
    return posts.filter((p) => {
      const haystack = norm(
        [p.title, p.excerpt, p.author, CATEGORY_LABEL[p.category]]
          .filter(Boolean)
          .join(" "),
      );
      return haystack.includes(q);
    });
  }, [posts, query]);

  const q = query.trim();

  return (
    <div>
      {/* Cabecera sobria: título con línea de acento + buscador integrado */}
      <header className="border-b border-slate-200 bg-white">
        <div className="section py-12 sm:py-14">
          <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4">
            <div className="border-l-4 border-accent pl-4">
              <h1 className="text-3xl font-extrabold leading-tight text-slate-900 sm:text-4xl lg:text-5xl">
                Noticias y notas teológicas
              </h1>
              <p className="mt-3 max-w-2xl text-slate-600">
                Noticias cristianas, notas proféticas y estudios teológicos.
              </p>
            </div>

            {/* Buscador: lupa que despliega el campo al hacer clic */}
            <div className="relative h-10 w-full sm:w-64">
              {open ? (
                <div className="relative">
                  <i className="bi bi-search pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    ref={focusOnMount}
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={(e) => e.key === "Escape" && closeSearch()}
                    placeholder="Buscar noticias…"
                    aria-label="Buscar noticias"
                    className="h-10 w-full rounded-full border border-slate-300 bg-white pl-10 pr-9 text-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/10"
                  />
                  <button
                    type="button"
                    onClick={closeSearch}
                    aria-label="Cerrar búsqueda"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition-colors hover:text-slate-700"
                  >
                    <i className="bi bi-x-lg text-sm" />
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setOpen(true)}
                  aria-label="Buscar noticias"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 text-slate-500 transition-colors hover:border-brand hover:text-brand sm:ml-auto"
                >
                  <i className="bi bi-search text-lg" />
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Grilla de entradas */}
      <section className="section py-12">
        <div className="mx-auto max-w-6xl">
          {filtered.length > 0 ? (
            <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((post) => (
                <BlogCard key={post._id} post={post} />
              ))}
            </div>
          ) : (
            <p className="py-16 text-center text-slate-400">
              {q
                ? `No se encontraron noticias para “${q}”.`
                : "Aún no hay publicaciones."}
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
