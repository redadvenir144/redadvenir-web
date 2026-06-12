import { CONTACT } from "@/lib/site";

// Usa el plugin oficial de página de Facebook (iframe), sin SDK ni cookies.
const FB_WIDTH = 360;
const FB_HEIGHT = 720;

export default function FacebookFeed() {
  const src =
    "https://www.facebook.com/plugins/page.php?" +
    new URLSearchParams({
      href: CONTACT.facebookPageUrl,
      tabs: "timeline",
      width: String(FB_WIDTH),
      height: String(FB_HEIGHT),
      smallheader: "false",
      adapt_container_width: "true",
      hide_cover: "false",
      show_facepile: "true",
    }).toString();

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold text-brand">
        <i className="bi bi-facebook" /> Últimas publicaciones
      </h3>
      <div className="flex justify-center overflow-hidden rounded-lg">
        <iframe
          title="Publicaciones de Facebook de Red ADvenir"
          src={src}
          width={FB_WIDTH}
          height={FB_HEIGHT}
          className="block max-w-full"
          style={{ border: "none" }}
          scrolling="no"
          allow="encrypted-media"
        />
      </div>
    </div>
  );
}
