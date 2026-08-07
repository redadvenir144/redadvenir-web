import type { Metadata } from "next";
import Link from "next/link";

import SectionHeader from "@/components/SectionHeader";

export const metadata: Metadata = {
  title: "Recursos",
  description:
    "Recursos espirituales: estudios bíblicos, folletos, libros, devocionales y sermones para fortalecer tu fe.",
};

const recursos = [
  {
    title: "Estudios Bíblicos",
    description: "Guías de estudio de la Biblia descargables en PDF y en video.",
    href: "/recursos/estudios-biblicos",
    icon: "bi-book",
  },
  {
    title: "Folletos",
    description: "Material imprimible para evangelismo y estudio personal.",
    href: "/recursos/folletos",
    icon: "bi-file-earmark-text",
  },
  {
    title: "Libros",
    description: "Libros digitales para profundizar en la fe adventista.",
    href: "/recursos/libros",
    icon: "bi-journal-bookmark",
  },
  {
    title: "Devocionales",
    description: "Lecturas diarias para tu momento de comunión con Dios.",
    href: "/recursos/devocionales",
    icon: "bi-sunrise",
  },
  {
    title: "Sermones",
    description: "Mensajes inspiradores de nuestros pastores y evangelistas.",
    href: "/recursos/sermones",
    icon: "bi-mic",
  },
];

export default function RecursosPage() {
  return (
    <div className="section py-12">
      <SectionHeader
        eyebrow="Recursos"
        title="Material para tu crecimiento espiritual"
        subtitle="Explora nuestra colección de recursos para fortalecer tu fe y conocimiento de la Palabra de Dios."
      />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {recursos.map((recurso) => (
          <Link
            key={recurso.href}
            href={recurso.href}
            className="group rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:border-accent hover:shadow-md"
          >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-brand/10 text-brand transition-colors group-hover:bg-accent group-hover:text-white">
              <i className={`bi ${recurso.icon} text-2xl`} />
            </div>
            <h2 className="mb-2 text-xl font-bold text-brand group-hover:text-accent">
              {recurso.title}
            </h2>
            <p className="text-sm text-slate-600">{recurso.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
