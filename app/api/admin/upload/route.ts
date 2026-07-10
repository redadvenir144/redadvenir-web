import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { randomUUID } from "crypto";

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");
const MAX_SIZE = 15 * 1024 * 1024; // 15 MB

// Tipos permitidos: solo imágenes de mapa de bits y PDF. NO se permite SVG
// (puede contener scripts/XSS) ni ningún otro formato.
const ALLOWED: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
  "application/pdf": "pdf",
};

// Detección del tipo REAL por firma de bytes (magic numbers). No se confía en
// el Content-Type que envía el navegador (es falsificable): así no se puede
// colar un ejecutable/HTML/SVG renombrado o con un MIME mentido.
function sniffType(buf: Buffer): string | null {
  if (buf.length >= 3 && buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff) {
    return "image/jpeg";
  }
  if (
    buf.length >= 8 &&
    buf[0] === 0x89 &&
    buf[1] === 0x50 &&
    buf[2] === 0x4e &&
    buf[3] === 0x47 &&
    buf[4] === 0x0d &&
    buf[5] === 0x0a &&
    buf[6] === 0x1a &&
    buf[7] === 0x0a
  ) {
    return "image/png";
  }
  if (buf.length >= 6 && buf.toString("ascii", 0, 3) === "GIF") {
    return "image/gif";
  }
  if (
    buf.length >= 12 &&
    buf.toString("ascii", 0, 4) === "RIFF" &&
    buf.toString("ascii", 8, 12) === "WEBP"
  ) {
    return "image/webp";
  }
  if (buf.length >= 5 && buf.toString("ascii", 0, 5) === "%PDF-") {
    return "application/pdf";
  }
  return null;
}

export async function POST(req: Request) {
  const form = await req.formData();
  const file = form.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No se recibió archivo" }, { status: 400 });
  }

  // Tamaño: se valida ANTES de leer el archivo en memoria (evita cargar
  // archivos enormes solo para rechazarlos).
  if (file.size === 0) {
    return NextResponse.json({ error: "El archivo está vacío" }, { status: 400 });
  }
  if (file.size > MAX_SIZE) {
    return NextResponse.json(
      { error: "Archivo demasiado grande (máx 15 MB)" },
      { status: 413 },
    );
  }

  const buffer = Buffer.from(await file.arrayBuffer());

  // El tipo se determina por el CONTENIDO real, no por lo que declare el
  // cliente. Si la firma no corresponde a un tipo permitido, se rechaza.
  const detected = sniffType(buffer);
  if (!detected || !(detected in ALLOWED)) {
    return NextResponse.json(
      { error: "Tipo de archivo no permitido. Solo imágenes (JPG, PNG, WEBP, GIF) o PDF." },
      { status: 415 },
    );
  }

  const ext = ALLOWED[detected];
  // Nombre aleatorio con extensión derivada del tipo detectado (nunca del
  // nombre que envía el usuario): evita path traversal y dobles extensiones.
  const name = `${randomUUID()}.${ext}`;

  // Producción (Vercel): subir a Vercel Blob.
  if (process.env.BLOB_READ_WRITE_TOKEN) {
    const { put } = await import("@vercel/blob");
    const blob = await put(`uploads/${name}`, buffer, {
      access: "public",
      contentType: detected,
    });
    return NextResponse.json({ url: blob.url });
  }

  // Local: guardar en public/uploads.
  await fs.mkdir(UPLOAD_DIR, { recursive: true });
  await fs.writeFile(path.join(UPLOAD_DIR, name), buffer);
  return NextResponse.json({ url: `/uploads/${name}` });
}
