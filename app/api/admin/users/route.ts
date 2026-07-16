import { NextResponse } from "next/server";

import { create } from "@/lib/db";
import { cleanSections } from "@/lib/resources";
import { authorizeSuperAdmin } from "@/lib/session";
import {
  getUserByUsername,
  hashPassword,
  listUsers,
  publicUser,
  validatePassword,
} from "@/lib/users";
import type { User } from "@/lib/types";

export async function GET() {
  const denied = await authorizeSuperAdmin();
  if (denied) return denied;
  const users = await listUsers();
  return NextResponse.json(users.map(publicUser));
}

export async function POST(req: Request) {
  const denied = await authorizeSuperAdmin();
  if (denied) return denied;

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
  }

  const username = typeof body.username === "string" ? body.username.trim() : "";
  const name = typeof body.name === "string" ? body.name.trim() : "";
  const isSuperAdmin = body.isSuperAdmin === true;
  const sections = isSuperAdmin ? [] : cleanSections(body.sections);

  if (!username) {
    return NextResponse.json({ error: "El usuario es obligatorio." }, { status: 400 });
  }
  if (!name) {
    return NextResponse.json({ error: "El nombre es obligatorio." }, { status: 400 });
  }
  const pwError = validatePassword(body.password);
  if (pwError) {
    return NextResponse.json({ error: pwError }, { status: 400 });
  }
  if (await getUserByUsername(username)) {
    return NextResponse.json(
      { error: "Ya existe un usuario con ese nombre de usuario." },
      { status: 409 },
    );
  }

  const passwordHash = await hashPassword(body.password as string);
  const created = await create("users", {
    username,
    name,
    passwordHash,
    isSuperAdmin,
    sections,
    createdAt: new Date().toISOString(),
    failedAttempts: 0,
    lastFailedAt: 0,
    lockedUntil: null,
  });

  return NextResponse.json(publicUser(created as unknown as User), {
    status: 201,
  });
}
