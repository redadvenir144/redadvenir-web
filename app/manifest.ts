import type { MetadataRoute } from "next";

import { SITE } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE.longName,
    short_name: SITE.name,
    description: SITE.description,
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#0b2545",
    icons: [
      { src: "/images/logoredadvenir.svg", sizes: "any", type: "image/svg+xml" },
    ],
  };
}
