"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { NAV } from "@/lib/site";

// Etiquetas conocidas por segmento de ruta (primer nivel = secciones del menú).
const LABELS: Record<string, string> = Object.fromEntries(
  NAV.map((n) => [n.href.replace(/^\//, ""), n.label]),
);

function humanize(segment: string): string {
  const decoded = decodeURIComponent(segment).replace(/-/g, " ");
  return decoded.charAt(0).toUpperCase() + decoded.slice(1);
}

export default function Breadcrumbs() {
  const pathname = usePathname();

  // No mostrar en el inicio ni en el panel de administración.
  if (pathname === "/" || pathname.startsWith("/admin")) return null;

  const segments = pathname.split("/").filter(Boolean);

  // Construye el rastro acumulando rutas.
  const crumbs = segments.map((seg, i) => {
    const href = "/" + segments.slice(0, i + 1).join("/");
    const label = LABELS[seg] ?? humanize(seg);
    return { href, label };
  });

  return (
    <nav
      aria-label="Rastro de navegación"
      className="border-b border-slate-100 bg-slate-50"
    >
      <ol className="section flex flex-wrap items-center gap-1.5 py-3 text-sm text-slate-500">
        <li>
          <Link
            href="/"
            className="inline-flex items-center gap-1 font-medium text-brand hover:text-accent-600"
          >
            <i className="bi bi-house-door-fill" /> Inicio
          </Link>
        </li>
        {crumbs.map((c, i) => {
          const isLast = i === crumbs.length - 1;
          return (
            <li key={c.href} className="flex items-center gap-1.5">
              <i className="bi bi-chevron-right text-xs text-slate-300" />
              {isLast ? (
                <span className="font-medium text-slate-700">{c.label}</span>
              ) : (
                <Link href={c.href} className="hover:text-brand">
                  {c.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
