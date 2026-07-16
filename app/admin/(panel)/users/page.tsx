import { redirect } from "next/navigation";

import { ALL_SECTIONS } from "@/lib/resources";
import { getSessionUser } from "@/lib/session";
import { listUsers, publicUser } from "@/lib/users";
import UsersManager from "@/components/admin/UsersManager";

export const dynamic = "force-dynamic";

export default async function UsersPage() {
  // Solo super-admin: se revalida contra la BD (no basta con el token).
  const me = await getSessionUser();
  if (!me) redirect("/admin/login");
  if (!me.isSuperAdmin) redirect("/admin");

  const users = (await listUsers()).map(publicUser);
  const sections = ALL_SECTIONS;

  return <UsersManager initialUsers={users} sections={sections} meId={me._id} />;
}
