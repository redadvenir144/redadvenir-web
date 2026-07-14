import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getPostBySlug } from "@/lib/content";
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
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: post.coverImage ? { images: [post.coverImage] } : undefined,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

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
        <Link
          href="/#blog"
          className="mb-10 inline-flex items-center gap-1.5 text-sm font-medium text-brand-500 hover:underline"
        >
          <i className="bi bi-arrow-left" /> Volver al blog
        </Link>

        {/* Cabecera centrada */}
        <header className="flex flex-col items-center text-center">
          <span
            className={`inline-flex w-fit items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${style.bg} ${style.text} ${style.border}`}
          >
            {CATEGORY_LABEL[post.category]}
          </span>

          <h1 className="mt-4 text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
            {post.title}
          </h1>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-sm text-slate-500">
            {post.author && (
              <span className="inline-flex items-center gap-1.5">
                <i className="bi bi-person-circle" /> {post.author}
              </span>
            )}
            <time dateTime={post.publishedAt} className="inline-flex items-center gap-1.5">
              <i className="bi bi-calendar3" /> {formatDate(post.publishedAt)}
            </time>
          </div>

          <div className="mt-6">
            <ShareMenu title={post.title} />
          </div>
        </header>

        {post.coverImage && (
          <div className="relative mt-10 aspect-[16/9] w-full overflow-hidden rounded-2xl bg-slate-100">
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
            className="prose prose-slate article-body mx-auto mt-10 max-w-none"
            dangerouslySetInnerHTML={{ __html: cleanHtml }}
          />
        ) : (
          <div className="prose prose-slate mx-auto mt-10 max-w-none">
            {paragraphs.map((p, i) => (
              <p key={i} className="mb-4 leading-relaxed text-slate-700">
                {p}
              </p>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
