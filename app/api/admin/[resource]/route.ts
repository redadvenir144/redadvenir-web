import { NextResponse } from "next/server";

import { list, create } from "@/lib/db";
import { getResource, coercePayload } from "@/lib/resources";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ resource: string }> },
) {
  const { resource } = await params;
  const def = getResource(resource);
  if (!def) return NextResponse.json({ error: "Recurso inválido" }, { status: 404 });
  return NextResponse.json(await list(def.key));
}

export async function POST(
  req: Request,
  { params }: { params: Promise<{ resource: string }> },
) {
  const { resource } = await params;
  const def = getResource(resource);
  if (!def) return NextResponse.json({ error: "Recurso inválido" }, { status: 404 });

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
  }

  const data = coercePayload(def, body);
  const created = await create(def.key, data);
  return NextResponse.json(created, { status: 201 });
}
