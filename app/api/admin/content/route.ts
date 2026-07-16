import { NextResponse } from "next/server";

import { list, create, update } from "@/lib/db";
import {
  CONTENT_BLOCKS,
  CONTENT_GROUPS,
  isValidContentKey,
} from "@/lib/content-blocks";
import { getSavedText } from "@/lib/site-text";
import { authorizeSection } from "@/lib/session";

type ContentRow = { _id: string; key: string; value: string };

// GET: bloques agrupados con su valor actual (guardado o por defecto).
export async function GET() {
  const denied = await authorizeSection("content");
  if (denied) return denied;

  const saved = await getSavedText();
  const groups = CONTENT_GROUPS.map((g) => ({
    ...g,
    blocks: CONTENT_BLOCKS.filter((b) => b.group === g.key).map((b) => ({
      key: b.key,
      label: b.label,
      type: b.type,
      help: b.help ?? null,
      value: Object.prototype.hasOwnProperty.call(saved, b.key)
        ? saved[b.key]
        : b.default,
      default: b.default,
    })),
  }));
  return NextResponse.json({ groups });
}

// PUT: guarda los textos modificados. Cuerpo: { values: { clave: valor } }.
export async function PUT(req: Request) {
  const denied = await authorizeSection("content");
  if (denied) return denied;

  let body: { values?: Record<string, unknown> };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
  }

  const values = body.values;
  if (!values || typeof values !== "object") {
    return NextResponse.json({ error: "Faltan valores." }, { status: 400 });
  }

  const rows = await list<ContentRow>("content");
  const byKey = new Map(rows.map((r) => [r.key, r]));

  for (const [key, raw] of Object.entries(values)) {
    if (!isValidContentKey(key)) continue; // ignora claves desconocidas
    const value = typeof raw === "string" ? raw : String(raw ?? "");
    const existing = byKey.get(key);
    if (existing) {
      if (existing.value !== value) await update("content", existing._id, { value });
    } else {
      await create("content", { key, value });
    }
  }

  return NextResponse.json({ ok: true });
}
