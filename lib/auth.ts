// Autenticación simple del admin: una contraseña (env ADMIN_PASSWORD) y una
// sesión en cookie httpOnly firmada con HMAC (jose). Sin base de usuarios.

import { SignJWT, jwtVerify } from "jose";

export const SESSION_COOKIE = "ra_admin";
const ALG = "HS256";
const MAX_AGE = 60 * 60 * 24 * 7; // 7 días

// En producción NO se permiten valores por defecto: si falta ADMIN_SECRET o
// ADMIN_PASSWORD, la app falla en vez de arrancar con credenciales conocidas
// (fail-closed). En desarrollo se usa un fallback solo para poder trabajar local.
function getSecret(): Uint8Array {
  const s = process.env.ADMIN_SECRET;
  if (!s) {
    if (process.env.NODE_ENV === "production") {
      throw new Error(
        "ADMIN_SECRET no está definido. Configúralo en el servidor antes de desplegar.",
      );
    }
    return new TextEncoder().encode("dev-insecure-secret-solo-desarrollo");
  }
  return new TextEncoder().encode(s);
}

export function getAdminPassword(): string {
  const p = process.env.ADMIN_PASSWORD;
  if (!p) {
    if (process.env.NODE_ENV === "production") {
      throw new Error(
        "ADMIN_PASSWORD no está definido. Configúralo en el servidor antes de desplegar.",
      );
    }
    return "redadvenir"; // solo desarrollo local
  }
  return p;
}

export async function createSessionToken(): Promise<string> {
  return new SignJWT({ role: "admin" })
    .setProtectedHeader({ alg: ALG })
    .setIssuedAt()
    .setExpirationTime(`${MAX_AGE}s`)
    .sign(getSecret());
}

export async function verifySessionToken(
  token: string | undefined,
): Promise<boolean> {
  if (!token) return false;
  try {
    const { payload } = await jwtVerify(token, getSecret());
    return payload.role === "admin";
  } catch {
    return false;
  }
}

export const SESSION_MAX_AGE = MAX_AGE;
