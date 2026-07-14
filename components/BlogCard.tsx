import Image from "next/image";
import Link from "next/link";

import { CATEGORY_LABEL, type Post } from "@/lib/types";
import { getCategoryStyle } from "@/lib/category-styles";

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

export default function BlogCard({ post }: { post: Post }) {
  const style = getCategoryStyle(post.category);

  return (
    <Link href={`/blog/${post.slug}`} className="group flex flex-col">
      {/* Imagen con zoom al pasar el mouse (estilo editorial) */}
      <div className="relative aspect-[16/9] overflow-hidden rounded-xl bg-slate-100">
        {post.coverImage ? (
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-slate-300">
            <i className="bi bi-journal-text text-4xl" />
          </div>
        )}
      </div>

      <div className="mt-4 flex flex-1 flex-col">
        <span
          className={`text-xs font-semibold uppercase tracking-widest ${style.text}`}
        >
          {CATEGORY_LABEL[post.category]}
        </span>
        <h3 className="mt-2 line-clamp-3 text-lg font-bold leading-snug text-brand transition-colors group-hover:text-brand-500">
          {post.title}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-slate-600">
          {post.excerpt}
        </p>

        {/* Meta: barrita de acento + fecha + autor (patrón institucional) */}
        <div className="mt-3 flex items-center gap-3 text-xs text-slate-400">
          <span className="h-1.5 w-6 shrink-0 rounded-full bg-accent" />
          <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
          {post.author && <span className="truncate">· {post.author}</span>}
        </div>
      </div>
    </Link>
  );
}
