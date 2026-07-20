import type { Metadata } from "next";

import SectionHeader from "@/components/SectionHeader";
import ContactForm from "@/components/ContactForm";
import { OFFICES } from "@/lib/site";
import { getSiteText } from "@/lib/site-text";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Escríbenos por correo, WhatsApp, Telegram o Facebook. Oficinas en Bolivia.",
};

export const revalidate = 60;

// Deriva un @handle a partir de un enlace de Telegram (t.me/xxxx → @xxxx).
function telegramHandle(url: string): string {
  const seg = url.replace(/\/+$/, "").split("/").pop() || "";
  return seg ? `@${seg}` : "Telegram";
}

export default async function ContactoPage() {
  const t = await getSiteText();

  const email = t("contacto.email").trim();
  const waNumber = t("contacto.whatsapp").replace(/[^\d]/g, "");
  const telegram = t("contacto.telegram").trim();
  const facebook = t("contacto.facebook").trim();

  // Canales de contacto: se omite el que quede vacío en el admin.
  const channels = [
    email && {
      label: "Correo",
      icon: "envelope",
      href: `mailto:${email}`,
      value: email,
    },
    waNumber && {
      label: "WhatsApp",
      icon: "whatsapp",
      href: `https://wa.me/${waNumber}`,
      value: `+${waNumber}`,
    },
    telegram && {
      label: "Telegram",
      icon: "telegram",
      href: telegram,
      value: telegramHandle(telegram),
    },
    facebook && {
      label: "Facebook",
      icon: "facebook",
      href: facebook,
      value: "Mensaje directo",
    },
  ].filter(Boolean) as {
    label: string;
    icon: string;
    href: string;
    value: string;
  }[];

  return (
    <div className="section py-12">
      <SectionHeader
        eyebrow="Contacto"
        title={t("contacto.title")}
        subtitle={t("contacto.subtitle")}
      />

      <div className="grid gap-10 lg:grid-cols-2">
        {/* Columna izquierda: formulario + otros canales */}
        <div className="space-y-6">
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <ContactForm />
          </div>

          {channels.length > 0 && (
            <div>
              <h2 className="mb-3 text-lg font-semibold text-brand">Otros canales</h2>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {channels.map((c) => (
                  <a
                    key={c.label}
                    href={c.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white p-4 shadow-sm hover:border-brand"
                  >
                    <i className={`bi bi-${c.icon} shrink-0 text-2xl text-brand`} />
                    <span className="min-w-0">
                      <span className="block text-sm font-medium text-slate-800">{c.label}</span>
                      <span className="block break-words text-xs text-slate-500">{c.value}</span>
                    </span>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Columna derecha: oficinas */}
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
  );
}
