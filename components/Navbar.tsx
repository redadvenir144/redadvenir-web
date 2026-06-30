"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { NAV, SITE } from "@/lib/site";

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-40 border-b-2 border-accent/80 bg-brand text-white shadow-lg shadow-black/20">
      <div className="section grid grid-cols-[auto_1fr_auto] items-center gap-4 py-3 lg:grid-cols-[auto_1fr]">
        <Link href="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <Image
            src="/images/logo-advenir.png"
            alt={SITE.longName}
            width={1000}
            height={525}
            className="h-14 w-auto sm:h-16"
            priority
          />
          <span className="sr-only">{SITE.longName}</span>
        </Link>

        {/* Navegación escritorio */}
        <nav className="hidden lg:flex items-center justify-center gap-1">
          {NAV.map((item) => {
            const donar = item.href === "/donar";
            const linkClass = [
              "rounded-md px-3 py-2 text-sm font-semibold uppercase tracking-wide transition-colors",
              donar
                ? "bg-accent text-brand hover:bg-accent-600"
                : isActive(item.href)
                  ? "text-accent"
                  : "text-white/85 hover:text-accent",
            ].join(" ");

            if (item.children) {
              return (
                <div key={item.href} className="group relative">
                  <Link href={item.href} className={`${linkClass} inline-flex items-center gap-1`}>
                    {item.label}
                    <i className="bi bi-chevron-down text-xs transition-transform group-hover:rotate-180" />
                  </Link>
                  <div className="invisible absolute left-0 top-full z-50 min-w-[15rem] translate-y-1 rounded-lg border border-white/10 bg-brand-700 p-1 opacity-0 shadow-xl transition-all group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                    {item.children.map((c) => (
                      <Link
                        key={c.href}
                        href={c.href}
                        className="block rounded-md px-3 py-2 text-sm font-medium text-white/85 hover:bg-white/10 hover:text-accent"
                      >
                        {c.label}
                      </Link>
                    ))}
                  </div>
                </div>
              );
            }

            return (
              <Link key={item.href} href={item.href} className={linkClass}>
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Botón móvil */}
        <button
          className="lg:hidden text-2xl"
          aria-label="Abrir menú"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <i className={`bi bi-${open ? "x-lg" : "list"}`} />
        </button>
      </div>

      {/* Menú móvil */}
      {open && (
        <nav className="lg:hidden border-t border-white/10 bg-brand-700">
          <div className="section flex flex-col py-2">
            {NAV.map((item) => (
              <div key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={[
                    "block rounded-md px-3 py-2.5 text-sm font-semibold uppercase tracking-wide",
                    isActive(item.href) ? "bg-white/15" : "hover:bg-white/10",
                    item.href === "/donar" ? "text-accent" : "",
                  ].join(" ")}
                >
                  {item.label}
                </Link>
                {item.children && (
                  <div className="ml-3 mb-1 flex flex-col border-l border-white/10 pl-3">
                    {item.children.map((c) => (
                      <Link
                        key={c.href}
                        href={c.href}
                        onClick={() => setOpen(false)}
                        className="rounded-md px-3 py-2 text-sm text-white/75 hover:text-accent"
                      >
                        {c.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
