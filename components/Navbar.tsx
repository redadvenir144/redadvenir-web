"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { NAV, SITE } from "@/lib/site";
import SocialBar from "./SocialBar";

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-40 border-b-2 border-accent/80 bg-brand text-white shadow-lg shadow-black/20">
      <div className="section flex items-center justify-between gap-4 py-3">
        <Link href="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <Image
            src="/images/logoredadvenir.svg" unoptimized
            alt={SITE.longName}
            width={210}
            height={70}
            className="h-14 w-auto sm:h-16"
            priority
          />
          <span className="sr-only">{SITE.longName}</span>
        </Link>

        {/* Navegación escritorio */}
        <nav className="hidden lg:flex items-center gap-1">
          {NAV.map((item) => {
            const donar = item.href === "/donar";
            return (
              <Link
                key={item.href}
                href={item.href}
                className={[
                  "rounded-md px-3 py-2 text-sm font-semibold uppercase tracking-wide transition-colors",
                  donar
                    ? "bg-accent text-brand hover:bg-accent-600"
                    : isActive(item.href)
                      ? "bg-white/15 text-white"
                      : "text-white/85 hover:bg-white/10 hover:text-white",
                ].join(" ")}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden lg:block">
          <SocialBar size="text-lg" />
        </div>

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
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={[
                  "rounded-md px-3 py-2.5 text-sm font-semibold uppercase tracking-wide",
                  isActive(item.href) ? "bg-white/15" : "hover:bg-white/10",
                  item.href === "/donar" ? "text-accent" : "",
                ].join(" ")}
              >
                {item.label}
              </Link>
            ))}
            <SocialBar className="px-3 py-3" size="text-xl" />
          </div>
        </nav>
      )}
    </header>
  );
}
