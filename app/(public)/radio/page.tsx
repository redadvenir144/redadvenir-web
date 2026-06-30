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
    icon: "globe-americas",
    title: "Expansión internacional",
    text: "Llevar la señal de la radio a nuevos países y regiones, comenzando por Latinoamérica y alcanzando al mundo de habla hispana.",
  },
  {
    icon: "broadcast-pin",
    title: "Nuevas frecuencias y repetidoras",
    text: "Instalar emisoras y repetidoras en más ciudades para que la señal llegue a comunidades que hoy no tienen acceso.",
  },
  {
    icon: "wifi",
    title: "Radio por internet y satélite",
    text: "Transmisión global por streaming y satélite, para escuchar desde cualquier lugar del planeta, 24/7.",
  },
  {
    icon: "translate",
    title: "Programación en varios idiomas",
    text: "Producir contenido en distintos idiomas para alcanzar a más pueblos con el mensaje de esperanza.",
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
            Expansión de la radio a nivel global
          </h2>
          <p className="mt-2 max-w-2xl text-slate-600">
            Soñamos con que el mensaje de esperanza llegue a cada rincón del
            planeta. Estos son los proyectos con los que estamos expandiendo la
            radio a nivel global.
          </p>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
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
