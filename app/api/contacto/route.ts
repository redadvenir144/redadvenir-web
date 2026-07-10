import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

import { CONTACT } from "@/lib/site";

type Payload = {
  name?: string;
  email?: string;
  phone?: string;
  subject?: string;
  message?: string;
};

// Rate-limiting anti-spam en memoria por IP (endpoint público que envía correo).
const WINDOW_MS = 10 * 60 * 1000; // 10 min
const MAX_SENDS = 5;
const hits = new Map<string, { count: number; first: number }>();

function clientIp(req: Request): string {
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();
  return req.headers.get("x-real-ip") ?? "unknown";
}

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const rec = hits.get(ip);
  if (!rec || now - rec.first > WINDOW_MS) {
    hits.set(ip, { count: 1, first: now });
    return false;
  }
  rec.count += 1;
  return rec.count > MAX_SENDS;
}

export async function POST(req: Request) {
  if (rateLimited(clientIp(req))) {
    return NextResponse.json(
      { error: "Demasiados envíos. Intenta de nuevo en unos minutos." },
      { status: 429 },
    );
  }

  let body: Payload;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
  }

  const { name, email, phone, subject, message } = body;
  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Faltan campos obligatorios" },
      { status: 400 },
    );
  }

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_TO } = process.env;
  const destino = CONTACT_TO || CONTACT.email;

  // Sin SMTP configurado no hay forma de entregar el mensaje. En producción NO
  // fingimos éxito: devolvemos error para que el formulario ofrezca el correo
  // directo. En desarrollo se registra (sin volcar el mensaje completo) para
  // poder probar el flujo.
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    if (process.env.NODE_ENV === "production") {
      console.error("[contacto] SMTP no configurado: mensaje NO entregado");
      return NextResponse.json(
        { error: `El correo no está disponible ahora. Escríbenos directamente a ${destino}.` },
        { status: 503 },
      );
    }
    console.log("[contacto] (dev, SMTP no configurado) mensaje recibido de:", name, email);
    return NextResponse.json({ ok: true, delivered: false });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT) || 587,
      secure: Number(SMTP_PORT) === 465,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    });

    await transporter.sendMail({
      from: `"Web Red ADvenir" <${SMTP_USER}>`,
      to: destino,
      replyTo: email,
      subject: `[Contacto web] ${subject || "Nuevo mensaje"}`,
      text:
        `Nombre: ${name}\nCorreo: ${email}` +
        (phone ? `\nTeléfono: ${phone}` : "") +
        `\n\n${message}`,
    });

    return NextResponse.json({ ok: true, delivered: true });
  } catch (err) {
    console.error("[contacto] error al enviar:", err);
    return NextResponse.json({ error: "No se pudo enviar" }, { status: 500 });
  }
}
