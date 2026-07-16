// Lógica de cuentas de usuario del admin: hashing de contraseñas (bcrypt),
// búsqueda, bootstrap del super-admin inicial, rate-limiting de login por
// usuario y helpers de permisos por sección.

import bcrypt from "bcryptjs";

import { list, get, create, update } from "./db";
import type { User, PublicUser } from "./types";
import { getAdminPassword } from "./auth";

const BCRYPT_ROUNDS = 10;
export const MIN_PASSWORD_LENGTH = 10;

// Rate-limit de login por usuario.
const MAX_FAILS = 5;
const WINDOW_MS = 15 * 60 * 1000; // 15 min para contar intentos
const LOCK_MS = 30 * 60 * 1000; // 30 min de bloqueo tras superar el máximo

// Hash fijo para comparar cuando el usuario no existe: iguala el tiempo de
// respuesta con el caso "usuario existe pero contraseña incorrecta", evitando
// que el atacante deduzca qué usuarios existen midiendo la latencia.
const DUMMY_HASH = "$2b$10$CwTycUXWue0Thq9StjUM0uJ8kkP5Uc0m5m5j8p4qXk2pQd8Zx6Ky";

export async function hashPassword(pw: string): Promise<string> {
  return bcrypt.hash(pw, BCRYPT_ROUNDS);
}

export async function verifyPassword(pw: string, hash: string): Promise<boolean> {
  try {
    return await bcrypt.compare(pw, hash);
  } catch {
    return false;
  }
}

// Compara contra un hash ficticio para gastar el mismo tiempo que una
// verificación real (defensa contra enumeración de usuarios por timing).
export async function dummyCompare(pw: string): Promise<void> {
  try {
    await bcrypt.compare(pw, DUMMY_HASH);
  } catch {
    /* ignore */
  }
}

export function publicUser(u: User): PublicUser {
  // Nunca exponer el hash de contraseña al cliente.
  const rest = { ...u } as Partial<User>;
  delete rest.passwordHash;
  return rest as PublicUser;
}

export function validatePassword(pw: unknown): string | null {
  if (typeof pw !== "string" || pw.length < MIN_PASSWORD_LENGTH) {
    return `La contraseña debe tener al menos ${MIN_PASSWORD_LENGTH} caracteres.`;
  }
  return null;
}

export async function listUsers(): Promise<User[]> {
  return list<User>("users");
}

export async function getUserById(id: string): Promise<User | null> {
  return get<User>("users", id);
}

export async function getUserByUsername(username: string): Promise<User | null> {
  const users = await list<User>("users");
  const u = username.trim().toLowerCase();
  return users.find((x) => x.username.toLowerCase() === u) ?? null;
}

// Crea el super-admin inicial desde el entorno (ADMIN_USERNAME + ADMIN_PASSWORD)
// si aún no existe ningún usuario. Así el login funciona desde el primer arranque
// y nadie queda bloqueado fuera del panel.
export async function ensureBootstrapSuperAdmin(): Promise<void> {
  const users = await list<User>("users");
  if (users.length > 0) return;
  const username = (process.env.ADMIN_USERNAME || "admin").trim();
  const passwordHash = await hashPassword(getAdminPassword());
  await create("users", {
    username,
    name: "Administrador",
    passwordHash,
    isSuperAdmin: true,
    sections: [],
    createdAt: new Date().toISOString(),
    failedAttempts: 0,
    lastFailedAt: 0,
    lockedUntil: null,
  });
}

// --- Rate limiting de login (por usuario) -----------------------------------

export function isLocked(u: User, now: number): boolean {
  return typeof u.lockedUntil === "number" && u.lockedUntil !== null && now < u.lockedUntil;
}

export async function recordLoginFailure(u: User, now: number): Promise<void> {
  const withinWindow =
    typeof u.lastFailedAt === "number" && now - u.lastFailedAt < WINDOW_MS;
  const attempts = (withinWindow ? u.failedAttempts ?? 0 : 0) + 1;
  const patch: Record<string, unknown> = {
    failedAttempts: attempts,
    lastFailedAt: now,
  };
  if (attempts >= MAX_FAILS) {
    patch.lockedUntil = now + LOCK_MS;
    patch.failedAttempts = 0; // reinicia el contador tras bloquear
  }
  await update("users", u._id, patch);
}

export async function recordLoginSuccess(u: User): Promise<void> {
  await update("users", u._id, {
    failedAttempts: 0,
    lastFailedAt: 0,
    lockedUntil: null,
  });
}

// --- Permisos ----------------------------------------------------------------

export function canAccessSection(
  u: Pick<User, "isSuperAdmin" | "sections">,
  section: string,
): boolean {
  return u.isSuperAdmin || u.sections.includes(section);
}
