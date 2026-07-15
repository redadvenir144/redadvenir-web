import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getPostBySlug, getPosts } from "@/lib/content";
import { getCategoryStyle } from "@/lib/category-styles";
import { CATEGORY_LABEL } from "@/lib/types";
import { sanitizeRichText } from "@/lib/sanitize";
import ShareMenu from "@/components/ShareMenu";

// ¿El cuerpo es HTML del editor visual, o texto plano de una publicación
// antigua? Si contiene etiquetas lo tratamos como HTML; si no, se conserva el
// render por párrafos de siempre (compatibilidad hacia atrás).
function looksLikeHtml(s: string): boolean {
  return /<\/?[a-z][\s\S]*>/i.test(s);
}

export const revalidate = 60;

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleDateString("es-BO", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } catch {
    return iso;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Artículo no encontrado" };

  // Si el post no tiene portada, se omite `images` para heredar la imagen OG
  // por defecto (app/opengraph-image.tsx). Las rutas relativas (/uploads/...)
  // se vuelven absolutas gracias a metadataBase (ver lib/site.ts).
  const images = post.coverImage ? [post.coverImage] : undefined;

  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      url: `/blog/${post.slug}`,
      publishedTime: post.publishedAt || undefined,
      authors: post.author ? [post.author] : undefined,
      ...(images ? { images } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      ...(images ? { images } : {}),
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  // Lista ordenada por fecha (más reciente primero) para el post actual y sus
  // vecinos (anterior/siguiente), como en el portal institucional.
  const posts = await getPosts();
  const index = posts.findIndex((p) => p.slug === slug);
  const post = index >= 0 ? posts[index] : null;
  if (!post) notFound();

  const newer = index > 0 ? posts[index - 1] : null; // publicado después
  const older = index < posts.length - 1 ? posts[index + 1] : null; // antes

  const style = getCategoryStyle(post.category);
  const bodyText = post.body?.trim() ? post.body : post.excerpt;
  const isHtml = looksLikeHtml(bodyText);
  const cleanHtml = isHtml ? sanitizeRichText(bodyText) : "";
  const paragraphs = isHtml
    ? []
    : bodyText
        .split(/\n{2,}|\n/)
        .map((p) => p.trim())
        .filter(Boolean);

  return (
    <article className="section py-12">
      <div className="mx-auto max-w-3xl">
        {/* Cabecera sobria sobre fondo blanco */}
        <div className="border-b border-slate-200 pb-8">
          <span
            className={`inline-flex w-fit items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${style.bg} ${style.text} ${style.border}`}
          >
            {CATEGORY_LABEL[post.category]}
          </span>

          <h1 className="mt-4 text-2xl font-bold leading-tight text-slate-900 md:text-3xl lg:text-3xl">
            {post.title}
          </h1>

          <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate-600">
            {post.author && (
              <span className="inline-flex items-center gap-1.5">
                <i className="bi bi-person-circle" /> {post.author}
              </span>
            )}
            <time dateTime={post.publishedAt} className="inline-flex items-center gap-1.5">
              <i className="bi bi-calendar3" /> {formatDate(post.publishedAt)}
            </time>
          </div>
        </div>

        {post.coverImage && (
          <div className="relative mt-8 aspect-[16/9] w-full overflow-hidden rounded-2xl bg-slate-100 shadow-lg ring-1 ring-black/5">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 768px"
              className="object-cover"
            />
          </div>
        )}

        {isHtml ? (
          <div
            className="prose prose-slate article-body mt-10 max-w-none"
            dangerouslySetInnerHTML={{ __html: cleanHtml }}
          />
        ) : (
          <div className="prose prose-slate mt-10 max-w-none">
            {paragraphs.map((p, i) => (
              <p key={i} className="mb-4 leading-relaxed text-slate-700">
                {p}
              </p>
            ))}
          </div>
        )}

        {/* Compartir al final del artículo */}
        <div className="mt-14 flex flex-col items-center gap-3 border-t border-slate-200 pt-10">
          <span className="text-sm font-medium text-slate-500">
            ¿Te gustó este artículo? Compártelo
          </span>
          <ShareMenu title={post.title} />
        </div>

        {/* Navegación anterior / siguiente (estilo institucional) */}
        {(older || newer) && (
          <nav className="mt-10 grid gap-4 border-t border-slate-200 pt-8 sm:grid-cols-2">
            {older ? (
              <Link
                href={`/blog/${older.slug}`}
                className="group flex flex-col gap-1.5 rounded-xl border border-slate-200 p-5 transition-colors hover:border-brand/40 hover:bg-slate-50"
              >
                <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
                  <i className="bi bi-arrow-left transition-transform group-hover:-translate-x-0.5" />
                  Anterior
                </span>
                <span className="line-clamp-2 font-bold text-brand transition-colors group-hover:text-brand-500">
                  {older.title}
                </span>
              </Link>
            ) : (
              <span className="hidden sm:block" />
            )}

            {newer ? (
              <Link
                href={`/blog/${newer.slug}`}
                className="group flex flex-col items-end gap-1.5 rounded-xl border border-slate-200 p-5 text-right transition-colors hover:border-brand/40 hover:bg-slate-50"
              >
                <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Siguiente
                  <i className="bi bi-arrow-right transition-transform group-hover:translate-x-0.5" />
                </span>
                <span className="line-clamp-2 font-bold text-brand transition-colors group-hover:text-brand-500">
                  {newer.title}
                </span>
              </Link>
            ) : (
              <span className="hidden sm:block" />
            )}
          </nav>
        )}
      </div>
    </article>
  );
}
