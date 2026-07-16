import { NextResponse } from "next/server";

import {
  SESSION_COOKIE,
  SESSION_MAX_AGE,
  createSessionToken,
} from "@/lib/auth";
import {
  dummyCompare,
  ensureBootstrapSuperAdmin,
  getUserByUsername,
  isLocked,
  recordLoginFailure,
  recordLoginSuccess,
  verifyPassword,
} from "@/lib/users";

// Rate-limiting en memoria por IP (además del rate-limit por usuario que vive en
// la BD). El de IP frena barridos de usuarios inexistentes y ataques de fuerza
// bruta distribuidos sobre varios usernames; el de usuario protege cada cuenta.
// Suficiente para un despliegue de instancia única (PM2).
const WINDOW_MS = 15 * 60 * 1000; // 15 min
const MAX_FAILS = 20; // por IP (más alto: cubre varios usuarios legítimos tras un NAT)
const ipFails = new Map<string, { count: number; first: number }>();

function clientIp(req: Request): string {
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();
  return req.headers.get("x-real-ip") ?? "unknown";
}

function isIpLocked(ip: string): boolean {
  const rec = ipFails.get(ip);
  if (!rec) return false;
  if (Date.now() - rec.first > WINDOW_MS) {
    ipFails.delete(ip);
    return false;
  }
  return rec.count >= MAX_FAILS;
}

function recordIpFail(ip: string): void {
  const now = Date.now();
  const rec = ipFails.get(ip);
  if (!rec || now - rec.first > WINDOW_MS) {
    ipFails.set(ip, { count: 1, first: now });
  } else {
    rec.count += 1;
  }
}

const GENERIC_BAD = "Usuario o contraseña incorrectos.";
const GENERIC_LOCKED = "Demasiados intentos. Intenta más tarde.";

export async function POST(req: Request) {
  const ip = clientIp(req);
  if (isIpLocked(ip)) {
    return NextResponse.json({ error: GENERIC_LOCKED }, { status: 429 });
  }

  let username = "";
  let password = "";
  try {
    const body = await req.json();
    username = typeof body?.username === "string" ? body.username : "";
    password = typeof body?.password === "string" ? body.password : "";
  } catch {
    return NextResponse.json({ error: "Solicitud inválida" }, { status: 400 });
  }

  // Crea el super-admin inicial si la base de usuarios está vacía.
  await ensureBootstrapSuperAdmin();

  const user = username ? await getUserByUsername(username) : null;
  const now = Date.now();

  // Usuario existente pero bloqueado por demasiados intentos.
  if (user && isLocked(user, now)) {
    return NextResponse.json({ error: GENERIC_LOCKED }, { status: 429 });
  }

  // Verifica la contraseña. Si el usuario no existe, se gasta el mismo tiempo con
  // un hash ficticio para no filtrar por timing qué usuarios existen.
  const ok = user
    ? await verifyPassword(password, user.passwordHash)
    : (await dummyCompare(password), false);

  if (!user || !ok) {
    if (user) await recordLoginFailure(user, now);
    recordIpFail(ip);
    return NextResponse.json({ error: GENERIC_BAD }, { status: 401 });
  }

  await recordLoginSuccess(user);
  ipFails.delete(ip);

  const token = await createSessionToken(user);
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
