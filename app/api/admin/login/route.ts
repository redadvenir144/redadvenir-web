import { NextResponse } from "next/server";

import {
  SESSION_COOKIE,
  SESSION_MAX_AGE,
  createSessionToken,
  getAdminPassword,
} from "@/lib/auth";

// Rate-limiting en memoria por IP: tras MAX_FAILS intentos fallidos dentro de la
// ventana, se bloquea. Suficiente para un despliegue de instancia única (PM2);
// para varias instancias haría falta un store compartido (Redis).
const WINDOW_MS = 15 * 60 * 1000; // 15 min
const MAX_FAILS = 8;
const fails = new Map<string, { count: number; first: number }>();

function clientIp(req: Request): string {
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();
  return req.headers.get("x-real-ip") ?? "unknown";
}

function isLocked(ip: string): boolean {
  const rec = fails.get(ip);
  if (!rec) return false;
  if (Date.now() - rec.first > WINDOW_MS) {
    fails.delete(ip);
    return false;
  }
  return rec.count >= MAX_FAILS;
}

function recordFail(ip: string): void {
  const now = Date.now();
  const rec = fails.get(ip);
  if (!rec || now - rec.first > WINDOW_MS) {
    fails.set(ip, { count: 1, first: now });
  } else {
    rec.count += 1;
  }
}

export async function POST(req: Request) {
  const ip = clientIp(req);
  if (isLocked(ip)) {
    return NextResponse.json(
      { error: "Demasiados intentos. Espera unos minutos e inténtalo de nuevo." },
      { status: 429 },
    );
  }

  let password = "";
  try {
    const body = await req.json();
    password = body?.password ?? "";
  } catch {
    return NextResponse.json({ error: "Solicitud inválida" }, { status: 400 });
  }

  if (password !== getAdminPassword()) {
    recordFail(ip);
    return NextResponse.json({ error: "Contraseña incorrecta" }, { status: 401 });
  }

  fails.delete(ip); // login correcto: limpiar contador

  const token = await createSessionToken();
  const res = NextResponse.json({ ok: true });
  res.cookies.set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });
  return res;
}
