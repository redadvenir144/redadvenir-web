import { redirect } from "next/navigation";

import {
  CONTENT_BLOCKS,
  CONTENT_GROUPS,
} from "@/lib/content-blocks";
import { getSessionUser } from "@/lib/session";
import { canAccessSection } from "@/lib/users";
import { getSavedText } from "@/lib/site-text";
import ContentManager from "@/components/admin/ContentManager";

export const dynamic = "force-dynamic";

export default async function ContentPage() {
  const me = await getSessionUser();
  if (!me) redirect("/admin/login");
  if (!canAccessSection(me, "content")) redirect("/admin");

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

  return <ContentManager groups={groups} />;
}
