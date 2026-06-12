import { notFound } from "next/navigation";

import { getResource } from "@/lib/resources";
import { list } from "@/lib/db";
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

  const items = (await list(def.key)) as (Record<string, unknown> & {
    _id: string;
  })[];

  return <ResourceManager resource={def} initialItems={items} />;
}
