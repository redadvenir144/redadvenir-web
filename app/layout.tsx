import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { SITE } from "@/lib/site";
import ChunkErrorReloader from "@/components/ChunkErrorReloader";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" });

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
      </body>
    </html>
  );
}
