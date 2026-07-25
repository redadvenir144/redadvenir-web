import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";

import { SITE } from "@/lib/site";
import ChunkErrorReloader from "@/components/ChunkErrorReloader";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" });

// ID del contenedor de Google Tag Manager (formato GTM-XXXXXXX). Desde GTM se
// gestionan GA4 y demás etiquetas. Se inyecta en el build; vacío = desactivado.
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.longName} — TV y radio cristiana en vivo`,
    template: `%s · ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  manifest: "/manifest.webmanifest",
  openGraph: {
    title: SITE.longName,
    description: SITE.description,
    url: SITE.url,
    siteName: SITE.name,
    type: "website",
    locale: "es_BO",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.longName,
    description: SITE.description,
  },
  // Verificación de Google Search Console (método "etiqueta HTML"). Se toma del
  // entorno; si está vacío, no se renderiza la etiqueta. Ver .env.production.
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
  // Iconos por convención de archivos: app/favicon.ico, app/icon.png, app/apple-icon.png
  // Imagen OG/Twitter por convención: app/opengraph-image.tsx
};

export const viewport: Viewport = {
  themeColor: "#0b2545",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" data-scroll-behavior="smooth">
      <head>
        <link
          rel="preconnect"
          href="https://cdn.jsdelivr.net"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css"
        />
      </head>
      <body className={`${inter.variable} antialiased`}>
        {/* Google Tag Manager (noscript) — respaldo sin JavaScript */}
        {GTM_ID && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
              title="gtm"
            />
          </noscript>
        )}

        <ChunkErrorReloader />
        {children}

        {/* Google Tag Manager (solo si NEXT_PUBLIC_GTM_ID está configurado) */}
        {GTM_ID && (
          <Script id="gtm-init" strategy="afterInteractive">
            {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`}
          </Script>
        )}
      </body>
    </html>
  );
}
