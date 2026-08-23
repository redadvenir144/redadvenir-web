import type { Metadata } from "next";

import SectionHeader from "@/components/SectionHeader";
import { SITE, CONTACT } from "@/lib/site";

export const metadata: Metadata = {
  title: "Política de Privacidad",
  description:
    "Política de privacidad de Gospel Ministries International para Red ADvenir y aplicaciones móviles.",
};

// Apps cubiertas por esta política
const APPS = [
  "Red ADvenir",
  "Himnario Adventista Advenir",
];

export default function PrivacidadPage() {
  const lastUpdated = "22 de agosto de 2026";

  return (
    <div className="section py-12">
      <SectionHeader
        eyebrow="Legal"
        title="Política de Privacidad"
        subtitle="Tu privacidad es importante para nosotros."
      />

      <div className="prose prose-slate max-w-none">
        <p className="text-sm text-slate-500">
          Última actualización: {lastUpdated}
        </p>

        <h2>1. Información General</h2>
        <p>
          Esta Política de Privacidad describe cómo <strong>Gospel Ministries
          International, Inc.</strong> (&quot;GMI&quot;, &quot;nosotros&quot;, &quot;nuestro&quot;),
          a través de su ministerio <strong>{SITE.longName}</strong>, recopila, usa
          y protege la información cuando utilizas nuestro sitio web ({SITE.url})
          y nuestras aplicaciones móviles.
        </p>

        <p><strong>Organización responsable:</strong></p>
        <address className="not-italic text-slate-600">
          Gospel Ministries International, Inc.<br />
          874 S McDonald Rd SW<br />
          McDonald, TN 37353-5406<br />
          Estados Unidos
        </address>

        <p className="mt-4"><strong>Aplicaciones cubiertas por esta política:</strong></p>
        <ul>
          {APPS.map((app) => (
            <li key={app}>{app}</li>
          ))}
        </ul>

        <p>
          GMI es una organización sin fines de lucro 501(c)(3) dedicada a la
          difusión del evangelio a través de medios de comunicación.
        </p>

        <h2>2. Información que Recopilamos</h2>

        <h3>2.1 Información proporcionada voluntariamente</h3>
        <ul>
          <li>
            <strong>Formulario de contacto:</strong> Nombre, correo electrónico y
            mensaje cuando nos contactas a través del sitio web.
          </li>
          <li>
            <strong>Donaciones:</strong> Si decides donar, los datos de pago son
            procesados por plataformas de terceros (PayPal, bancos) y no almacenamos
            información financiera en nuestros servidores.
          </li>
        </ul>

        <h3>2.2 Información recopilada automáticamente</h3>
        <ul>
          <li>
            <strong>Datos de uso:</strong> Podemos usar Google Analytics para entender
            cómo los usuarios interactúan con nuestro sitio web. Esto incluye páginas
            visitadas, tiempo de permanencia y tipo de dispositivo.
          </li>
          <li>
            <strong>Aplicación móvil:</strong> La app no recopila datos personales.
            Solo accede a internet para transmitir contenido de TV y radio en vivo,
            y cargar noticias desde nuestro servidor.
          </li>
        </ul>

        <h2>3. Uso de la Información</h2>
        <p>Utilizamos la información recopilada para:</p>
        <ul>
          <li>Responder a tus consultas y mensajes.</li>
          <li>Mejorar nuestros servicios y contenido.</li>
          <li>Enviar actualizaciones si has dado tu consentimiento.</li>
          <li>Cumplir con obligaciones legales.</li>
        </ul>

        <h2>4. Compartir Información</h2>
        <p>
          <strong>No vendemos ni compartimos</strong> tu información personal con
          terceros para fines comerciales. Solo compartimos datos cuando:
        </p>
        <ul>
          <li>Es necesario para procesar donaciones (plataformas de pago).</li>
          <li>Lo requiere la ley.</li>
          <li>Es necesario para proteger nuestros derechos legales.</li>
        </ul>

        <h2>5. Permisos de la Aplicación Móvil</h2>
        <p>La aplicación Red ADvenir solicita los siguientes permisos:</p>
        <ul>
          <li>
            <strong>Internet:</strong> Necesario para transmitir TV y radio en vivo,
            y cargar contenido.
          </li>
          <li>
            <strong>Reproducción en segundo plano:</strong> Permite que la radio
            siga sonando mientras usas otras aplicaciones.
          </li>
        </ul>
        <p>
          La aplicación <strong>no accede</strong> a tu cámara, micrófono, contactos,
          ubicación ni almacenamiento.
        </p>

        <h2>6. Seguridad</h2>
        <p>
          Implementamos medidas de seguridad razonables para proteger la información.
          Sin embargo, ningún sistema es 100% seguro y no podemos garantizar la
          seguridad absoluta de los datos transmitidos por internet.
        </p>

        <h2>7. Derechos del Usuario</h2>
        <p>Tienes derecho a:</p>
        <ul>
          <li>Solicitar acceso a tus datos personales.</li>
          <li>Solicitar la corrección o eliminación de tus datos.</li>
          <li>Retirar tu consentimiento en cualquier momento.</li>
        </ul>
        <p>
          Para ejercer estos derechos, contáctanos a{" "}
          <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>.
        </p>

        <h2>8. Menores de Edad</h2>
        <p>
          Nuestros servicios están dirigidos a un público general. No recopilamos
          intencionalmente información de menores de 13 años sin el consentimiento
          de sus padres o tutores.
        </p>

        <h2>9. Cambios a esta Política</h2>
        <p>
          Podemos actualizar esta política ocasionalmente. Publicaremos cualquier
          cambio en esta página con una nueva fecha de actualización.
        </p>

        <h2>10. Contacto</h2>
        <p>
          Si tienes preguntas sobre esta Política de Privacidad, contáctanos:
        </p>
        <ul>
          <li>
            <strong>Correo:</strong>{" "}
            <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
          </li>
          <li>
            <strong>Sitio web:</strong>{" "}
            <a href={SITE.url}>{SITE.url}</a>
          </li>
        </ul>

        <hr className="my-8" />

        <p className="text-sm text-slate-500">
          {SITE.longName} — {SITE.ministry}
        </p>
      </div>
    </div>
  );
}
