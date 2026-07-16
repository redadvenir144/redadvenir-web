import type { Metadata } from "next";

import BlogList from "@/components/BlogList";
import { getPosts } from "@/lib/content";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Blog y noticias",
  description:
    "Noticias cristianas, notas proféticas y teológicas de Red ADvenir TV.",
};

export default async function BlogIndexPage() {
  const posts = await getPosts();

  // La cabecera (título + buscador) y la grilla viven en BlogList para que el
  // buscador y el filtrado compartan estado.
  return <BlogList posts={posts} />;
}
