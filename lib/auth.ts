// Autenticación del admin: cuentas de usuario con contraseña (hash bcrypt, ver
// lib/users.ts) y sesión en cookie httpOnly firmada con HMAC (jose).
//
// El token de sesión lleva SOLO el id del usuario (`sub`) más `username` e
// `isSuperAdmin` como datos de conveniencia. La AUTORIZACIÓN real (qué secciones
// puede tocar) se decide consultando la base de datos en cada request, para que
// revocar o cambiar permisos aplique de inmediato, no en el próximo login.

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

// Contraseña del super-admin inicial (bootstrap). Solo se usa para sembrar la
// primera cuenta si la base de usuarios está vacía (ver lib/users.ts).
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

export type SessionPayload = {
  sub: string; // id del usuario
  username: string;
  super: boolean; // isSuperAdmin (dato de conveniencia; la autz se revalida en BD)
};

export async function createSessionToken(user: {
  _id: string;
  username: string;
  isSuperAdmin: boolean;
}): Promise<string> {
  return new SignJWT({ username: user.username, super: user.isSuperAdmin })
    .setProtectedHeader({ alg: ALG })
    .setSubject(user._id)
    .setIssuedAt()
    .setExpirationTime(`${MAX_AGE}s`)
    .sign(getSecret());
}

// Verifica la firma/expiración y devuelve el payload, o null si es inválido.
export async function verifySession(
  token: string | undefined,
): Promise<SessionPayload | null> {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, getSecret());
    if (typeof payload.sub !== "string") return null;
    return {
      sub: payload.sub,
      username: typeof payload.username === "string" ? payload.username : "",
      super: payload.super === true,
    };
  } catch {
    return null;
  }
}

export const SESSION_MAX_AGE = MAX_AGE;
