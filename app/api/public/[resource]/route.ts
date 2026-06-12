import { NextResponse } from "next/server";

import { list, type Collection } from "@/lib/db";

// Recursos de solo lectura expuestos públicamente para la app móvil / clientes.
const PUBLIC: Collection[] = [
  "posts",
  "programs",
  "schedule",
  "studies",
  "beliefs",
  "faqs",
];

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export const dynamic = "force-dynamic";

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS });
}

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ resource: string }> },
) {
  const { resource } = await params;
  if (!PUBLIC.includes(resource as Collection)) {
    return NextResponse.json(
      { error: "Recurso no disponible" },
      { status: 404, headers: CORS },
    );
  }

  let data = await list(resource as Collection);

  // Ordenar igual que en el sitio web.
  if (resource === "posts") {
    data = [...data].sort((a, b) =>
      String((b as { publishedAt?: string }).publishedAt || "").localeCompare(
        String((a as { publishedAt?: string }).publishedAt || ""),
      ),
    );
  } else if (resource === "beliefs") {
    data = [...data].sort(
      (a, b) =>
        Number((a as { number?: number }).number || 0) -
        Number((b as { number?: number }).number || 0),
    );
  } else if (resource === "schedule") {
    data = [...data].sort((a, b) =>
      String((a as { time?: string }).time || "").localeCompare(
        String((b as { time?: string }).time || ""),
      ),
    );
  }

  return NextResponse.json(data, { headers: CORS });
}
