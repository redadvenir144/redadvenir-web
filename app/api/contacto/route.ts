import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

import { CONTACT } from "@/lib/site";

type Payload = {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
};

export async function POST(req: Request) {
  let body: Payload;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
  }

  const { name, email, subject, message } = body;
  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Faltan campos obligatorios" },
      { status: 400 },
    );
  }

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_TO } = process.env;

  // Sin SMTP configurado: registramos el mensaje (fallback de desarrollo).
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    console.log("[contacto] (SMTP no configurado) nuevo mensaje:", {
      name,
      email,
      subject,
      message,
    });
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
      to: CONTACT_TO || CONTACT.email,
      replyTo: email,
      subject: `[Contacto web] ${subject || "Nuevo mensaje"}`,
      text: `Nombre: ${name}\nCorreo: ${email}\n\n${message}`,
    });

    return NextResponse.json({ ok: true, delivered: true });
  } catch (err) {
    console.error("[contacto] error al enviar:", err);
    return NextResponse.json({ error: "No se pudo enviar" }, { status: 500 });
  }
}
