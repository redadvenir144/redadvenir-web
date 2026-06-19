import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Vercel Blob (si se usa en producción cloud)
      { protocol: "https", hostname: "*.public.blob.vercel-storage.com" },
    ],
    // En Ubuntu, las imágenes se guardan en public/uploads/ (ruta local)
    // y Next.js las optimiza automáticamente sin configuración adicional.
  },
};

export default nextConfig;
