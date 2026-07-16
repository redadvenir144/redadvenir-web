// Sesión del lado servidor: obtiene el usuario autenticado cargándolo FRESCO
// desde la base de datos en cada request. Así, si un super-admin cambia los
// permisos o elimina a un usuario, el cambio aplica de inmediato (no en el
// próximo login). Se usa en route handlers de API y en páginas del panel.

import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { SESSION_COOKIE, verifySession } from "./auth";
import { getUserById, canAccessSection } from "./users";
import type { User } from "./types";

export async function getSessionUser(): Promise<User | null> {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  const session = await verifySession(token);
  if (!session) return null;
  // Carga fresca desde la BD: null si el usuario fue eliminado.
  return getUserById(session.sub);
}

// Para route handlers de API: exige sesión válida + permiso de la sección.
// Devuelve una NextResponse de error (401/403) si NO está autorizado, o `null`
// si sí lo está (el handler continúa).
export async function authorizeSection(
  section: string,
): Promise<NextResponse | null> {
  const user = await getSessionUser();
  if (!user) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }
  if (!canAccessSection(user, section)) {
    return NextResponse.json(
      { error: "No tienes permiso para esta sección." },
      { status: 403 },
    );
  }
  return null;
}

// Para rutas exclusivas del super-admin (p. ej. gestión de usuarios).
export async function authorizeSuperAdmin(): Promise<NextResponse | null> {
  const user = await getSessionUser();
  if (!user) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }
  if (!user.isSuperAdmin) {
    return NextResponse.json(
      { error: "Solo un super-admin puede hacer esto." },
      { status: 403 },
    );
  }
  return null;
}
