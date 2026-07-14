"use client";

import { useEffect, useState } from "react";

// Botón "Compartir" que al pasar el mouse (o tocar/click en móvil) despliega los
// íconos de redes sociales para compartir el artículo. La URL se toma del
// navegador para que siempre sea la de la página actual.

type Target = {
  name: string;
  icon: string; // bootstrap-icons
  color: string;
  href: (url: string, title: string) => string;
};

const TARGETS: Target[] = [
  {
    name: "WhatsApp",
    icon: "whatsapp",
    color: "#25D366",
    href: (u, t) => `https://wa.me/?text=${t}%20${u}`,
  },
  {
    name: "Facebook",
    icon: "facebook",
    color: "#1877F2",
    href: (u) => `https://www.facebook.com/sharer/sharer.php?u=${u}`,
  },
  {
    name: "X",
    icon: "twitter-x",
    color: "#0f172a",
    href: (u, t) => `https://twitter.com/intent/tweet?url=${u}&text=${t}`,
  },
  {
    name: "Telegram",
    icon: "telegram",
    color: "#26A5E4",
    href: (u, t) => `https://t.me/share/url?url=${u}&text=${t}`,
  },
  {
    name: "Correo",
    icon: "envelope-fill",
    color: "#64748b",
    href: (u, t) => `mailto:?subject=${t}&body=${u}`,
  },
];

export default function ShareMenu({ title }: { title: string }) {
  const [url, setUrl] = useState("");
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setUrl(window.location.href);
  }, []);

  const u = encodeURIComponent(url);
  const t = encodeURIComponent(title);

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      // Navegadores sin permiso de portapapeles: ignorar en silencio.
    }
  }

  return (
    <div
      className="relative inline-flex"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-label="Compartir"
        className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:border-brand hover:text-brand"
      >
        <i className="bi bi-share-fill" /> Compartir
      </button>

      {/* Panel con los íconos. `top-full` + `pt-2` crea un puente sin hueco
          muerto, para que al mover el mouse del botón a los íconos no se cierre. */}
      <div
        className={`absolute left-1/2 top-full z-20 -translate-x-1/2 pt-2 transition-all duration-200 ${
          open
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-1 opacity-0"
        }`}
      >
        <div className="flex items-center gap-1 rounded-full border border-slate-200 bg-white p-1.5 shadow-lg">
          {TARGETS.map((tgt) => (
            <a
              key={tgt.name}
              href={tgt.href(u, t)}
              target="_blank"
              rel="noopener noreferrer"
              title={`Compartir en ${tgt.name}`}
              aria-label={`Compartir en ${tgt.name}`}
              className="flex h-9 w-9 items-center justify-center rounded-full transition-transform hover:scale-110 hover:bg-slate-50"
              style={{ color: tgt.color }}
            >
              <i className={`bi bi-${tgt.icon} text-lg`} />
            </a>
          ))}
          <span className="mx-0.5 h-5 w-px bg-slate-200" />
          <button
            type="button"
            onClick={copyLink}
            title="Copiar enlace"
            aria-label="Copiar enlace"
            className="flex h-9 w-9 items-center justify-center rounded-full text-slate-600 transition-transform hover:scale-110 hover:bg-slate-50"
          >
            <i className={`bi bi-${copied ? "check-lg" : "link-45deg"} text-lg`} />
          </button>
        </div>
      </div>
    </div>
  );
}
