import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Imágenes subidas desde el admin a Vercel Blob (en producción).
    remotePatterns: [
      { protocol: "https", hostname: "*.public.blob.vercel-storage.com" },
    ],
  },
};

export default nextConfig;
