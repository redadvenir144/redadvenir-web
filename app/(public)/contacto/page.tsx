import type { Metadata } from "next";

import SectionHeader from "@/components/SectionHeader";
import ContactForm from "@/components/ContactForm";
import { CONTACT, OFFICES } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Escríbenos por correo, WhatsApp, Telegram o Facebook. Oficinas en Bolivia.",
};

const CHANNELS = [
  { label: "Correo", icon: "envelope", href: `mailto:${CONTACT.email}`, value: CONTACT.email },
  { label: "WhatsApp", icon: "whatsapp", href: CONTACT.whatsapp, value: "Chatear" },
  { label: "Telegram", icon: "telegram", href: CONTACT.telegram, value: "Abrir Telegram" },
  { label: "Facebook", icon: "facebook", href: CONTACT.facebook, value: "Mensaje" },
];

export default function ContactoPage() {
  return (
    <div className="section py-12">
      <SectionHeader
        eyebrow="Contacto"
        title="Hablemos"
        subtitle="¿Tienes preguntas, peticiones de oración o quieres colaborar? Escríbenos."
      />

      <div className="grid gap-10 lg:grid-cols-2">
        <div>
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <ContactForm />
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h2 className="mb-3 text-lg font-semibold text-brand">Otros canales</h2>
            <div className="grid grid-cols-2 gap-3">
              {CHANNELS.map((c) => (
                <a
                  key={c.label}
                  href={c.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white p-4 shadow-sm hover:border-brand"
                >
                  <i className={`bi bi-${c.icon} text-2xl text-brand`} />
                  <span>
                    <span className="block text-sm font-medium text-slate-800">{c.label}</span>
                    <span className="block text-xs text-slate-500">{c.value}</span>
                  </span>
                </a>
              ))}
            </div>
          </div>

          <div>
            <h2 className="mb-3 text-lg font-semibold text-brand">Nuestras oficinas</h2>
            <ul className="space-y-3">
              {OFFICES.map((o) => (
                <li
                  key={o.city}
                  className={`rounded-lg border p-4 ${
                    o.isHQ
                      ? "border-accent bg-accent/5"
                      : "border-slate-200 bg-white"
                  }`}
                >
                  <p className="flex items-center gap-2 font-medium text-slate-800">
                    <i className="bi bi-geo-alt-fill text-accent-600" /> {o.city}
                    {o.isHQ && (
                      <span className="rounded-full bg-accent px-2 py-0.5 text-xs font-semibold text-brand">
                        Sede principal
                      </span>
                    )}
                  </p>
                  <p className="mt-1 text-sm text-slate-600">{o.address}</p>
                  {o.phone && <p className="text-sm text-slate-600">{o.phone}</p>}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
