import type { Metadata } from "next";
import Link from "next/link";

import RadioPlayer from "@/components/RadioPlayer";

export const metadata: Metadata = {
  title: "Radio",
  description:
    "Escucha en vivo Radio ADvenir FM 88.9 y Radio Altiplano AM, y conoce los proyectos de radio de Red ADvenir.",
};

const PROJECTS = [
  {
    icon: "broadcast",
    title: "Nuevas frecuencias",
    text: "Ampliar la cobertura de la señal radial a más ciudades y comunidades.",
  },
  {
    icon: "mic",
    title: "Producción de programas",
    text: "Contenido cristiano original: predicaciones, música, salud y familia.",
  },
  {
    icon: "phone",
    title: "Apps móviles",
    text: "Escuchar las emisoras desde el celular, donde estés.",
  },
];

export default function RadioPage() {
  return (
    <>
      {/* Emisoras en vivo (tema oscuro de marca) */}
      <section className="bg-brand text-white">
        <div className="section py-14">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-sky-300">
            Radio
          </p>
          <h1 className="mt-2 text-3xl font-bold sm:text-4xl">
            Las emisoras de Red ADvenir
          </h1>
          <p className="mt-2 max-w-2xl text-white/70">
            La radio es uno de los brazos fuertes de Red ADvenir. Escucha en vivo
            nuestras emisoras, donde estés.
          </p>

          <div className="mt-8">
            <RadioPlayer />
          </div>
        </div>
      </section>

      {/* Proyectos de radio */}
      <section id="proyectos" className="border-t border-slate-200 bg-slate-50">
        <div className="section py-14">
          <p className="text-sm font-semibold uppercase tracking-wide text-accent-600">
            Proyectos de Radio
          </p>
          <h2 className="mt-1 text-2xl font-bold text-brand sm:text-3xl">
            Llevamos la esperanza más lejos
          </h2>
          <p className="mt-2 max-w-2xl text-slate-600">
            Estamos creciendo para que el mensaje del evangelio llegue a más
            personas a través de la radio. Estos son algunos de nuestros frentes.
          </p>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {PROJECTS.map((p) => (
              <div
                key={p.title}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10 text-accent-600">
                  <i className={`bi bi-${p.icon} text-xl`} />
                </span>
                <h3 className="mt-4 font-semibold text-slate-800">{p.title}</h3>
                <p className="mt-1 text-sm text-slate-600">{p.text}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/donar"
              className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-brand transition-colors hover:bg-accent-600"
            >
              <i className="bi bi-heart-fill" /> Apoyar la radio
            </Link>
            <Link
              href="/contacto"
              className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-5 py-2.5 text-sm font-medium text-brand transition-colors hover:border-brand hover:bg-white"
            >
              <i className="bi bi-envelope" /> Contáctanos
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
