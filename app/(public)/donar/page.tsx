import type { Metadata } from "next";
import Image from "next/image";

import SectionHeader from "@/components/SectionHeader";
import { getSiteText } from "@/lib/site-text";

export const metadata: Metadata = {
  title: "Donar",
  description:
    "Apoya la misión de Red ADvenir: dona en línea por PayPal/tarjeta o por transferencia bancaria desde Bolivia o el resto del mundo.",
};

// Refresca el contenido editable (textos, teléfonos, WhatsApp) cada 60 s sin
// necesidad de reconstruir el sitio.
export const revalidate = 60;

function Card({
  icon,
  title,
  children,
}: {
  icon: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand text-white">
          <i className={`bi bi-${icon}`} />
        </span>
        <h2 className="text-xl font-bold text-brand">{title}</h2>
      </div>
      {children}
    </div>
  );
}

// Muestra el teléfono como enlace si hay número; si no, el aviso de pendiente.
function Phone({ value }: { value: string }) {
  const num = value.trim();
  if (!num) return <span className="text-slate-500">(número a confirmar)</span>;
  const tel = num.replace(/[^\d+]/g, "");
  return (
    <a href={`tel:${tel}`} className="font-medium text-brand-500 hover:underline">
      {num}
    </a>
  );
}

// Línea de contacto telefónico (con nombre opcional).
function ContactLine({
  icon,
  label,
  name,
  phone,
}: {
  icon: string;
  label: string;
  name: string;
  phone: string;
}) {
  return (
    <li className="flex items-center gap-2">
      <i className={`bi ${icon} text-accent-600`} /> {label}:{" "}
      {name.trim() && (
        <>
          <strong>{name.trim()}</strong> —{" "}
        </>
      )}
      <Phone value={phone} />
    </li>
  );
}

export default async function DonarPage() {
  const t = await getSiteText();

  // Número de WhatsApp editable (solo dígitos) → enlace wa.me.
  const waNumber = t("donar.whatsapp").replace(/[^\d]/g, "");
  const waLink = `https://wa.me/${waNumber}`;

  // Código QR de donación (opcional): la sección solo se muestra si hay imagen.
  const qrImage = t("donar.qr.image").trim();

  return (
    <div className="section py-12">
      <SectionHeader
        eyebrow="Donar"
        title="Tu apoyo lleva esperanza"
        subtitle={t("donar.intro")}
      />

      {/* 1) Donación en línea por PayPal — va directo a PayPal al enviar. */}
      <Card icon="credit-card-2-front" title="Donación en línea (tarjeta o PayPal)">
        <div className="gap-8 md:flex md:items-start">
          <div className="min-w-0 md:flex-1">
            <p className="text-sm text-slate-600">{t("donar.online.text")}</p>

            {/* Formulario oficial de GMI (cuenta accounting@gospelministry.org). */}
            <form
              action="https://www.paypal.com/cgi-bin/webscr"
              method="post"
              target="_top"
              className="mt-5 max-w-md space-y-4"
            >
          <input type="hidden" name="cmd" value="_xclick" />
          <input type="hidden" name="business" value="accounting@gospelministry.org" />
          <input type="hidden" name="page_style" value="GMI" />
          <input type="hidden" name="no_shipping" value="1" />
          <input type="hidden" name="return" value="http://gospelministry.org/blog/?page_id=6" />
          <input
            type="hidden"
            name="cancel_return"
            value="http://gospelministry.org/blog/?page_id=6"
          />
          <input type="hidden" name="currency_code" value="USD" />
          <input type="hidden" name="tax" value="0" />
          <input type="hidden" name="lc" value="US" />
          <input type="hidden" name="bn" value="PP-DonationsBF" />

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Donación para
            </label>
            <input
              name="item_name"
              defaultValue="Red ADvenir Internacional"
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-brand"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Cantidad (US$)
            </label>
            <input
              name="amount"
              type="number"
              min="1"
              step="any"
              required
              placeholder="Ej: 100"
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-brand"
            />
          </div>
          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-md bg-accent px-5 py-2.5 font-medium text-brand transition-colors hover:bg-accent-600"
          >
            <i className="bi bi-paypal" /> Hacer donación
          </button>

          <p className="flex items-center gap-1.5 text-xs text-slate-500">
            <i className="bi bi-credit-card-2-front" /> También podés pagar con
            tarjeta de crédito o débito, sin necesidad de tener cuenta de PayPal.
          </p>
            </form>
          </div>

          {/* Código QR (aparece solo si hay imagen configurada en el admin) */}
          {qrImage && (
            <div className="mt-6 shrink-0 text-center md:mt-0 md:w-52">
              <div className="inline-block rounded-xl border border-slate-200 bg-white p-3">
                <Image
                  src={qrImage}
                  alt="Código QR para donar por PayPal"
                  width={180}
                  height={180}
                  className="h-40 w-40 object-contain"
                />
              </div>
              <p className="mx-auto mt-2 max-w-[13rem] text-xs text-slate-500">
                {t("donar.qr.caption")}
              </p>
            </div>
          )}
        </div>

        <p className="mt-4 rounded-lg bg-slate-50 px-4 py-3 text-xs text-slate-500">
          Las compañías de tarjetas y PayPal cobran hasta un 3% del monto. Si
          querés que se done el monto completo, podés hacer una transferencia
          bancaria (ver abajo). También podés donar por teléfono o escribirnos
          por WhatsApp.
        </p>
      </Card>

      {/* 2) Transferencias bancarias */}
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        {/* EE.UU. */}
        <Card icon="bank" title="Transferencia — Banco de EE.UU.">
          <p className="text-sm text-slate-600">
            Poné en las observaciones <strong>“Red ADvenir Internacional”</strong>.
          </p>
          <dl className="mt-4 space-y-3 text-sm">
            <div>
              <dt className="font-semibold text-slate-800">Beneficiario</dt>
              <dd className="text-slate-600">
                Gospel Ministries International
                <br />
                P.O. Box 506, Collegedale, TN 37315, USA
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-slate-800">Datos del banco</dt>
              <dd className="text-slate-600">
                A solicitar al equipo de donaciones (por teléfono o correo).
              </dd>
            </div>
          </dl>
        </Card>

        {/* Bolivia */}
        <Card icon="bank2" title="Transferencia — Banco de Bolivia">
          <p className="text-sm text-slate-600">
            Por regularizaciones bancarias en Bolivia, las donaciones por banco
            deben hacerse en <strong>bolivianos</strong> a la cuenta corriente que
            se detalla.
          </p>
          <dl className="mt-4 space-y-3 text-sm">
            <div>
              <dt className="font-semibold text-slate-800">Beneficiario</dt>
              <dd className="text-slate-600">
                As.De.I.H. (Asociación para el Desarrollo Integral Humanitario)
                <br />
                Casilla 2400, Santa Cruz de la Sierra, Bolivia
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-slate-800">Banco Económico S.A.</dt>
              <dd className="text-slate-600">
                Santa Cruz, Bolivia · SWIFT: <strong>BOEOBO22</strong>
                <br />
                Cta. Cte. en bolivianos: <strong>1041-247635</strong>
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-slate-800">Banco Prodem</dt>
              <dd className="text-slate-600">
                En bolivianos: <strong>611-2-1-04391-1</strong>
              </dd>
            </div>
          </dl>
        </Card>
      </div>

      {/* 3) Donación por teléfono + WhatsApp (español primero) */}
      <div className="mt-6">
        <Card icon="telephone" title="Donación por teléfono o WhatsApp">
          <p className="text-sm text-slate-600">
            Podés hacer un pago mensual o particular llamando por teléfono:
          </p>
          <ul className="mt-3 space-y-2 text-sm text-slate-700">
            <ContactLine
              icon="bi-translate"
              label="En español"
              name={t("donar.phone.spanishName")}
              phone={t("donar.phone.spanish")}
            />
            <ContactLine
              icon="bi-translate"
              label="En inglés"
              name={t("donar.phone.englishName")}
              phone={t("donar.phone.english")}
            />
            <ContactLine
              icon="bi-flag"
              label="En Bolivia"
              name={t("donar.phone.boliviaName")}
              phone={t("donar.phone.bolivia")}
            />
          </ul>

          {waNumber && (
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 rounded-md bg-[#25D366] px-5 py-2.5 font-semibold text-white transition-colors hover:bg-[#1EBE5A]"
            >
              <i className="bi bi-whatsapp" /> Escribir por WhatsApp
            </a>
          )}
        </Card>
      </div>

      <p className="mt-8 max-w-2xl text-sm text-slate-500">
        ¿Dudas con tu donación? Escribinos a{" "}
        <a
          className="font-medium text-brand-500 hover:underline"
          href={`mailto:${t("donar.help.email")}`}
        >
          {t("donar.help.email")}
        </a>
        .
      </p>
    </div>
  );
}
