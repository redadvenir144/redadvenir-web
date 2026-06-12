import Image from "next/image";

import { CATEGORY_LABEL, type Post } from "@/lib/types";

const CATEGORY_COLOR: Record<Post["category"], string> = {
  noticia: "bg-brand-500/10 text-brand-500",
  profetica: "bg-accent/15 text-accent-600",
  teologica: "bg-emerald-600/10 text-emerald-700",
};

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
  return (
    <article className="group flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-md">
      <div className="relative aspect-[16/9] overflow-hidden bg-slate-100">
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
      <div className="flex flex-1 flex-col p-5">
        <span
          className={`mb-2 inline-block w-fit rounded-full px-2.5 py-0.5 text-xs font-medium ${CATEGORY_COLOR[post.category]}`}
        >
          {CATEGORY_LABEL[post.category]}
        </span>
        <h3 className="text-lg font-semibold leading-snug text-slate-800 group-hover:text-brand">
          {post.title}
        </h3>
        <p className="mt-2 line-clamp-3 text-sm text-slate-600">{post.excerpt}</p>
        <div className="mt-4 flex items-center justify-between text-xs text-slate-400">
          <span>{post.author}</span>
          <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
        </div>
      </div>
    </article>
  );
}
