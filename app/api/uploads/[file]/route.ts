import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

// Sirve los archivos subidos desde el admin.
//
// ¿Por qué un route handler y no `public/uploads` a secas? En producción
// (`next start`) la carpeta `public/` se sirve a partir de una instantánea
// tomada en el momento del BUILD. Los archivos que el admin sube EN CALIENTE
// (después del build) no están en esa instantánea, así que `public/uploads/x.jpg`
// devolvía 404 y el optimizador de imágenes respondía 400. Leyendo el archivo
// del disco en cada petición, los uploads funcionan aunque se hayan creado
// después del build.
//
// El path público sigue siendo `/uploads/<archivo>`: un rewrite en
// next.config.ts redirige `/uploads/:file` a este handler, así que las URLs ya
// guardadas en la base de datos siguen siendo válidas.

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");

const CONTENT_TYPE: Record<string, string> = {
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  png: "image/png",
  webp: "image/webp",
  gif: "image/gif",
  pdf: "application/pdf",
};

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ file: string }> },
) {
  const { file } = await params;

  // Solo se aceptan nombres generados por el uploader (uuid + extensión). Esto
  // evita path traversal (`../`), rutas absolutas o nombres arbitrarios.
  if (!/^[a-zA-Z0-9-]+\.[a-zA-Z0-9]+$/.test(file)) {
    return new NextResponse("No encontrado", { status: 404 });
  }

  const ext = file.slice(file.lastIndexOf(".") + 1).toLowerCase();
  const type = CONTENT_TYPE[ext];
  if (!type) {
    return new NextResponse("No encontrado", { status: 404 });
  }

  try {
    const buffer = await fs.readFile(path.join(UPLOAD_DIR, file));
    return new NextResponse(new Uint8Array(buffer), {
      headers: {
        "Content-Type": type,
        "Cache-Control": "public, max-age=604800, stale-while-revalidate=86400",
      },
    });
  } catch {
    return new NextResponse("No encontrado", { status: 404 });
  }
}
