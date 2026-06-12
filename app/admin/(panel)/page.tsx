import Link from "next/link";

import { RESOURCES } from "@/lib/resources";
import { list } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const counts = await Promise.all(
    RESOURCES.map(async (r) => ({ ...r, count: (await list(r.key)).length })),
  );

  return (
    <div className="mx-auto max-w-6xl p-6 lg:p-10">
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-brand">Panel de administración</h1>
        <p className="text-slate-500">
          Gestiona el contenido que se publica en el sitio de Red ADvenir.
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {counts.map((r) => (
          <Link
            key={r.key}
            href={`/admin/${r.key}`}
            className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand/10 text-brand">
                <i className={`bi bi-${r.icon} text-xl`} />
              </span>
              <span className="text-3xl font-bold text-slate-800">{r.count}</span>
            </div>
            <h2 className="mt-4 font-semibold text-slate-800 group-hover:text-brand">
              {r.label}
            </h2>
            <p className="mt-1 inline-flex items-center gap-1 text-sm text-brand-500">
              Gestionar <i className="bi bi-arrow-right transition-transform group-hover:translate-x-0.5" />
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
