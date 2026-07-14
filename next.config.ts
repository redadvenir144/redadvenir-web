import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compress: true,
  poweredByHeader: false,
  productionBrowserSourceMaps: false,

  images: {
    remotePatterns: [
      { protocol: "https", hostname: "*.public.blob.vercel-storage.com" },
      { protocol: "https", hostname: "i.ytimg.com" },
    ],
    formats: ["image/avif", "image/webp"],
  },

  // Los archivos subidos por el admin se guardan en disco (public/uploads) pero
  // se sirven por un route handler, porque en `next start` la carpeta public es
  // una instantánea del build y no incluye lo subido en caliente. Este rewrite
  // mantiene el path público `/uploads/<archivo>` apuntando a ese handler, así
  // que las URLs ya guardadas en la base de datos siguen siendo válidas.
  async rewrites() {
    return [
      {
        source: "/uploads/:file",
        destination: "/api/uploads/:file",
      },
    ];
  },

  async headers() {
    return [
      {
        // Cabeceras de seguridad para todo el sitio.
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
      {
        source: "/_next/static/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        source: "/:path(images|fonts|uploads)/:file*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=604800, stale-while-revalidate=86400" },
        ],
      },
      {
        source: "/api/public/:path*",
        headers: [
          { key: "Cache-Control", value: "public, s-maxage=60, stale-while-revalidate=300" },
        ],
      },
    ];
  },
};

export default nextConfig;
