"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { RESOURCES, EXTRA_SECTIONS } from "@/lib/resources";

type Perms = {
  name: string;
  username: string;
  isSuperAdmin: boolean;
  sections: string[];
};

export default function AdminSidebar({ perms }: { perms: Perms }) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  const canAccess = (key: string) =>
    perms.isSuperAdmin || perms.sections.includes(key);

  const links = [
    { href: "/admin", label: "Inicio", icon: "speedometer2", exact: true },
    // Solo las secciones que el usuario tiene permitidas.
    ...RESOURCES.filter((r) => canAccess(r.key)).map((r) => ({
      href: `/admin/${r.key}`,
      label: r.label,
      icon: r.icon,
      exact: false,
    })),
    // Secciones especiales (no-CRUD), p. ej. "Textos del sitio".
    ...EXTRA_SECTIONS.filter((s) => canAccess(s.key)).map((s) => ({
      href: `/admin/${s.key}`,
      label: s.label,
      icon: s.icon,
      exact: false,
    })),
    // Gestión de usuarios: solo para super-admin.
    ...(perms.isSuperAdmin
      ? [{ href: "/admin/users", label: "Usuarios", icon: "people", exact: false }]
      : []),
  ];

  const isActive = (href: string, exact: boolean) =>
    exact ? pathname === href : pathname === href || pathname.startsWith(href + "/");

  const nav = (
    <nav className="flex flex-1 flex-col gap-1 p-3">
      {links.map((l) => (
        <Link
          key={l.href}
          href={l.href}
          onClick={() => setOpen(false)}
          className={[
            "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
            isActive(l.href, l.exact)
              ? "bg-brand text-white"
              : "text-slate-600 hover:bg-slate-100",
          ].join(" ")}
        >
          <i className={`bi bi-${l.icon} text-lg`} />
          {l.label}
        </Link>
      ))}
    </nav>
  );

  const header = (
    <div className="flex items-center justify-between border-b border-slate-200 p-4">
      <Link href="/admin" className="flex items-center gap-2">
        <Image src="/images/logoazul.png" alt="Red ADvenir" width={1000} height={525} className="h-14 w-auto" />
      </Link>
    </div>
  );

  const footer = (
    <div className="border-t border-slate-200 p-3">
      <div className="mb-2 flex items-center gap-2 px-3 py-1">
        <i className="bi bi-person-circle text-xl text-brand" />
        <div className="min-w-0">
          <div className="truncate text-sm font-medium text-slate-700">{perms.name}</div>
          <div className="truncate text-xs text-slate-400">
            {perms.isSuperAdmin ? "Super-administrador" : "Editor"}
          </div>
        </div>
      </div>
      <Link
        href="/"
        target="_blank"
        className="mb-1 flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-slate-600 hover:bg-slate-100"
      >
        <i className="bi bi-box-arrow-up-right" /> Ver sitio
      </Link>
      <button
        onClick={logout}
        className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-red-600 hover:bg-red-50"
      >
        <i className="bi bi-box-arrow-left" /> Cerrar sesión
      </button>
    </div>
  );

  return (
    <>
      {/* Topbar móvil */}
      <div className="flex items-center justify-between border-b border-slate-200 bg-white p-3 lg:hidden">
        <Image src="/images/logoazul.png" alt="Red ADvenir" width={1000} height={525} className="h-12 w-auto" />
        <button onClick={() => setOpen(true)} aria-label="Abrir menú" className="text-2xl text-brand">
          <i className="bi bi-list" />
        </button>
      </div>

      {/* Sidebar escritorio */}
      <aside className="hidden w-64 shrink-0 flex-col border-r border-slate-200 bg-white lg:flex">
        {header}
        {nav}
        {footer}
      </aside>

      {/* Drawer móvil */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-40 bg-black/40 lg:hidden"
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.25 }}
              className="fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-white lg:hidden"
            >
              {header}
              {nav}
              {footer}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
