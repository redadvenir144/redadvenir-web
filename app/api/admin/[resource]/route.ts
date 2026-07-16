import { NextResponse } from "next/server";

import { list, create } from "@/lib/db";
import { getResource, coercePayload } from "@/lib/resources";
import { revalidateContent } from "@/lib/revalidate";
import { authorizeSection } from "@/lib/session";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ resource: string }> },
) {
  const { resource } = await params;
  const def = getResource(resource);
  if (!def) return NextResponse.json({ error: "Recurso inválido" }, { status: 404 });

  const denied = await authorizeSection(def.key);
  if (denied) return denied;

  return NextResponse.json(await list(def.key));
}

export async function POST(
  req: Request,
  { params }: { params: Promise<{ resource: string }> },
) {
  const { resource } = await params;
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
  const created = await create(def.key, data);
  revalidateContent();
  return NextResponse.json(created, { status: 201 });
}
