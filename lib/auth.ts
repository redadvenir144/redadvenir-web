// Autenticación simple del admin: una contraseña (env ADMIN_PASSWORD) y una
// sesión en cookie httpOnly firmada con HMAC (jose). Sin base de usuarios.

import { SignJWT, jwtVerify } from "jose";

export const SESSION_COOKIE = "ra_admin";
const ALG = "HS256";
const MAX_AGE = 60 * 60 * 24 * 7; // 7 días

function getSecret(): Uint8Array {
  const s =
    process.env.ADMIN_SECRET ||
    "dev-insecure-secret-cambia-esto-en-produccion";
  return new TextEncoder().encode(s);
}

export function getAdminPassword(): string {
  return process.env.ADMIN_PASSWORD || "redadvenir";
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
