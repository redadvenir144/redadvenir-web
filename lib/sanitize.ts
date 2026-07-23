import sanitizeHtml from "sanitize-html";

// Limpia el HTML producido por el editor del admin antes de renderizarlo en la
// web pública. Aunque solo los administradores autenticados escriben, se limpia
// igual (defensa en profundidad): se permite únicamente un conjunto acotado de
// etiquetas/atributos y los iframes solo pueden apuntar a YouTube.

const YOUTUBE_HOSTS = [
  "www.youtube.com",
  "youtube.com",
  "www.youtube-nocookie.com",
  "youtube-nocookie.com",
];

export function sanitizeRichText(dirty: string): string {
  return sanitizeHtml(dirty, {
    allowedTags: [
      "p", "br", "hr",
      "strong", "b", "em", "i", "u", "s",
      "h1", "h2", "h3", "h4",
      "ul", "ol", "li",
      "blockquote",
      "a", "img",
      "code", "pre",
      "div", "iframe", "span",
    ],
    allowedAttributes: {
      a: ["href", "target", "rel"],
      img: ["src", "alt", "title", "width", "height", "class"],
      iframe: [
        "src", "width", "height", "allow", "allowfullscreen",
        "frameborder", "title", "referrerpolicy",
      ],
      div: ["data-youtube-video"],
      span: [],
    },
    allowedSchemes: ["http", "https", "mailto"],
    // Las imágenes pueden ser rutas relativas propias (/uploads/...).
    allowProtocolRelative: false,
    allowedSchemesByTag: {
      img: ["http", "https"],
    },
    // Solo se permiten iframes de YouTube.
    allowedIframeHostnames: YOUTUBE_HOSTS,
    // Fuerza rel seguro en enlaces que abren en pestaña nueva.
    transformTags: {
      a: sanitizeHtml.simpleTransform("a", {
        rel: "noopener noreferrer nofollow",
      }),
      // Normaliza los iframes de YouTube: usa el dominio youtube.com (no
      // nocookie, que puede dar "Error 153" en el reproductor) y manda el
      // origen como referrer para que YouTube valide el dominio.
      iframe: (tagName, attribs) => {
        const src = (attribs.src || "").replace(
          "youtube-nocookie.com",
          "youtube.com",
        );
        return {
          tagName: "iframe",
          attribs: {
            ...attribs,
            src,
            referrerpolicy: "strict-origin-when-cross-origin",
            allow:
              "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",
          },
        };
      },
    },
  });
}
