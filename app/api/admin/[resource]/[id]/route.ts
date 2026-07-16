import { NextResponse } from "next/server";

import { update, remove } from "@/lib/db";
import { getResource, coercePayload } from "@/lib/resources";
import { revalidateContent } from "@/lib/revalidate";
import { authorizeSection } from "@/lib/session";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ resource: string; id: string }> },
) {
  const { resource, id } = await params;
  const def = getResource(resource);
  if (!def) return NextResponse.json({ error: "Recurso inválido" }, { status: 404 });

  const denied = await authorizeSection(def.key);
  if (denied) return denied;

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
  }

  const data = coercePayload(def, body);
  const updated = await update(def.key, id, data);
  if (!updated) return NextResponse.json({ error: "No encontrado" }, { status: 404 });
  revalidateContent();
  return NextResponse.json(updated);
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ resource: string; id: string }> },
) {
  const { resource, id } = await params;
  const def = getResource(resource);
  if (!def) return NextResponse.json({ error: "Recurso inválido" }, { status: 404 });

  const denied = await authorizeSection(def.key);
  if (denied) return denied;

  const ok = await remove(def.key, id);
  if (!ok) return NextResponse.json({ error: "No encontrado" }, { status: 404 });
  revalidateContent();
  return NextResponse.json({ ok: true });
}
