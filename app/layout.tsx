import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";

import { SITE } from "@/lib/site";
import ChunkErrorReloader from "@/components/ChunkErrorReloader";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" });

// ID de medición de Google Analytics 4 (formato G-XXXXXXXXXX). Se inyecta en el
// build; dejar vacío desactiva el seguimiento. Ver .env.production.
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

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
        <ChunkErrorReloader />
        {children}

        {/* Google Analytics 4 (solo si NEXT_PUBLIC_GA_ID está configurado) */}
        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_ID}');`}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
