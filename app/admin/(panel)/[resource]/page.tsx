import { notFound, redirect } from "next/navigation";

import { getResource } from "@/lib/resources";
import { list } from "@/lib/db";
import { getSessionUser } from "@/lib/session";
import { canAccessSection } from "@/lib/users";
import ResourceManager from "@/components/admin/ResourceManager";

export const dynamic = "force-dynamic";

export default async function ResourcePage({
  params,
}: {
  params: Promise<{ resource: string }>;
}) {
  const { resource } = await params;
  const def = getResource(resource);
  if (!def) notFound();

  // Bloquea el acceso directo por URL a una sección sin permiso.
  const user = await getSessionUser();
  if (!user) redirect("/admin/login");
  if (!canAccessSection(user, def.key)) redirect("/admin");

  const items = (await list(def.key)) as (Record<string, unknown> & {
    _id: string;
  })[];

  return <ResourceManager resource={def} initialItems={items} />;
}
