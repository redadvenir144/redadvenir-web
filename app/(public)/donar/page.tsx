import type { Metadata } from "next";

import SectionHeader from "@/components/SectionHeader";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Donar",
  description:
    "Apoya la misión de Red ADvenir con tu donación desde Bolivia o el resto del mundo.",
};

export default function DonarPage() {
  return (
    <div className="section py-12">
      <SectionHeader
        eyebrow="Donar"
        title="Tu apoyo lleva esperanza"
        subtitle={`${SITE.longName} es una obra sin fines de lucro que avanza gracias a donantes y voluntarios. Cada aporte ayuda a seguir transmitiendo el evangelio.`}
      />

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Desde Bolivia */}
        <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
          <div className="mb-4 flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand text-white">
              <i className="bi bi-flag-fill" />
            </span>
            <h2 className="text-xl font-bold text-brand">Desde Bolivia</h2>
          </div>
          <ul className="space-y-3 text-sm text-slate-700">
            <li className="flex gap-2">
              <i className="bi bi-bank text-accent-600" />
              <span>
                <strong>Transferencia bancaria:</strong> solicita los datos de la
                cuenta a nombre de Red ADvenir Internacional.
              </span>
            </li>
            <li className="flex gap-2">
              <i className="bi bi-qr-code text-accent-600" />
              <span>
                <strong>Pago QR:</strong> escanea el código que publicamos en
                nuestras redes y transmisiones.
              </span>
            </li>
            <li className="flex gap-2">
              <i className="bi bi-geo-alt text-accent-600" />
              <span>
                <strong>En persona:</strong> en nuestra sede de {SITE.hqCity}.
              </span>
            </li>
          </ul>
          <a
            href={`mailto:${"donaciones@redadvenir.org"}`}
            className="mt-6 inline-flex items-center gap-2 rounded-md bg-accent px-5 py-2.5 font-medium text-brand hover:bg-accent-600"
          >
            <i className="bi bi-envelope" /> Solicitar datos de donación
          </a>
        </div>

        {/* Resto del mundo */}
        <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
          <div className="mb-4 flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand text-white">
              <i className="bi bi-globe-americas" />
            </span>
            <h2 className="text-xl font-bold text-brand">Desde el resto del mundo</h2>
          </div>
          <ul className="space-y-3 text-sm text-slate-700">
            <li className="flex gap-2">
              <i className="bi bi-credit-card text-accent-600" />
              <span>
                <strong>Donación internacional:</strong> a través de Gospel
                Ministries International ({SITE.ministry}).
              </span>
            </li>
            <li className="flex gap-2">
              <i className="bi bi-globe text-accent-600" />
              <span>
                <strong>En línea:</strong> usa el portal de donaciones de GMI.
              </span>
            </li>
          </ul>
          <a
            href={SITE.ministryUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-md bg-brand px-5 py-2.5 font-medium text-white hover:bg-brand-700"
          >
            <i className="bi bi-box-arrow-up-right" /> Donar vía GMI
          </a>
        </div>
      </div>

      <p className="mt-8 max-w-2xl text-sm text-slate-500">
        Nota: las modalidades y datos exactos de donación deben confirmarse con la
        administración del canal antes de publicar.
      </p>
    </div>
  );
}
