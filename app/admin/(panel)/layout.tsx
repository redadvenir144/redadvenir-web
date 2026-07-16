import type { Metadata } from "next";
import { redirect } from "next/navigation";

import AdminSidebar from "@/components/admin/AdminSidebar";
import { getSessionUser } from "@/lib/session";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export default async function PanelLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // Además del middleware, revalida contra la BD: si el usuario fue eliminado
  // (aunque su cookie siga firmada), se le manda al login.
  const user = await getSessionUser();
  if (!user) redirect("/admin/login");

  const perms = {
    name: user.name,
    username: user.username,
    isSuperAdmin: user.isSuperAdmin,
    sections: user.sections,
  };

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 lg:flex-row">
      <AdminSidebar perms={perms} />
      <div className="flex-1 overflow-x-hidden">{children}</div>
    </div>
  );
}
