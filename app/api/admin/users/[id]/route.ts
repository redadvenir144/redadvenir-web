import { NextResponse } from "next/server";

import { update, remove } from "@/lib/db";
import { cleanSections } from "@/lib/resources";
import { authorizeSuperAdmin, getSessionUser } from "@/lib/session";
import {
  getUserById,
  getUserByUsername,
  hashPassword,
  listUsers,
  publicUser,
  validatePassword,
} from "@/lib/users";
import type { User } from "@/lib/types";

async function countSuperAdmins(): Promise<number> {
  return (await listUsers()).filter((u) => u.isSuperAdmin).length;
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const denied = await authorizeSuperAdmin();
  if (denied) return denied;

  const { id } = await params;
  const target = await getUserById(id);
  if (!target) {
    return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 });
  }
  const me = await getSessionUser();

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
  }

  const patch: Record<string, unknown> = {};

  if (typeof body.name === "string" && body.name.trim()) {
    patch.name = body.name.trim();
  }

  if (typeof body.username === "string" && body.username.trim()) {
    const username = body.username.trim();
    const existing = await getUserByUsername(username);
    if (existing && existing._id !== id) {
      return NextResponse.json(
        { error: "Ya existe un usuario con ese nombre de usuario." },
        { status: 409 },
      );
    }
    patch.username = username;
  }

  // Cambio de contraseña opcional: si viene vacío/ausente, no se toca.
  if (typeof body.password === "string" && body.password !== "") {
    const pwError = validatePassword(body.password);
    if (pwError) return NextResponse.json({ error: pwError }, { status: 400 });
    patch.passwordHash = await hashPassword(body.password);
    // Un reset de contraseña también levanta cualquier bloqueo por intentos.
    patch.failedAttempts = 0;
    patch.lockedUntil = null;
  }

  // Rol y secciones.
  let isSuperAdmin = target.isSuperAdmin;
  if (typeof body.isSuperAdmin === "boolean") isSuperAdmin = body.isSuperAdmin;

  // Salvaguardas: no dejar el sistema sin super-admin, ni auto-degradarse.
  if (target.isSuperAdmin && !isSuperAdmin) {
    if ((await countSuperAdmins()) <= 1) {
      return NextResponse.json(
        { error: "No puedes quitar el rol al último super-administrador." },
        { status: 400 },
      );
    }
    if (me && me._id === id) {
      return NextResponse.json(
        { error: "No puedes quitarte a ti mismo el rol de super-administrador." },
        { status: 400 },
      );
    }
  }

  patch.isSuperAdmin = isSuperAdmin;
  patch.sections = isSuperAdmin
    ? []
    : cleanSections(body.sections ?? target.sections);

  const updated = await update("users", id, patch);
  if (!updated) {
    return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 });
  }
  return NextResponse.json(publicUser(updated as unknown as User));
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const denied = await authorizeSuperAdmin();
  if (denied) return denied;

  const { id } = await params;
  const target = await getUserById(id);
  if (!target) {
    return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 });
  }
  const me = await getSessionUser();

  if (me && me._id === id) {
    return NextResponse.json(
      { error: "No puedes eliminar tu propia cuenta." },
      { status: 400 },
    );
  }
  if (target.isSuperAdmin && (await countSuperAdmins()) <= 1) {
    return NextResponse.json(
      { error: "No puedes eliminar el último super-administrador." },
      { status: 400 },
    );
  }

  await remove("users", id);
  return NextResponse.json({ ok: true });
}
