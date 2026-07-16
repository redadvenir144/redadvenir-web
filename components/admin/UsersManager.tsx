"use client";

import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";

import type { PublicUser } from "@/lib/types";

type Section = { key: string; label: string };

type Form = {
  name: string;
  username: string;
  password: string;
  isSuperAdmin: boolean;
  sections: string[];
};

const emptyForm: Form = {
  name: "",
  username: "",
  password: "",
  isSuperAdmin: false,
  sections: [],
};

const inputClass =
  "w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none transition-colors focus:border-brand focus:ring-2 focus:ring-brand/20";

export default function UsersManager({
  initialUsers,
  sections,
  meId,
}: {
  initialUsers: PublicUser[];
  sections: Section[];
  meId: string;
}) {
  const [users, setUsers] = useState<PublicUser[]>(initialUsers);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<PublicUser | null>(null);
  const [form, setForm] = useState<Form>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [deleting, setDeleting] = useState<PublicUser | null>(null);

  function openCreate() {
    setEditing(null);
    setForm(emptyForm);
    setError("");
    setOpen(true);
  }

  function openEdit(u: PublicUser) {
    setEditing(u);
    setForm({
      name: u.name,
      username: u.username,
      password: "",
      isSuperAdmin: u.isSuperAdmin,
      sections: [...u.sections],
    });
    setError("");
    setOpen(true);
  }

  function toggleSection(key: string) {
    setForm((f) => ({
      ...f,
      sections: f.sections.includes(key)
        ? f.sections.filter((s) => s !== key)
        : [...f.sections, key],
    }));
  }

  async function save() {
    setSaving(true);
    setError("");
    try {
      const url = editing
        ? `/api/admin/users/${editing._id}`
        : "/api/admin/users";
      const payload: Record<string, unknown> = {
        name: form.name,
        username: form.username,
        isSuperAdmin: form.isSuperAdmin,
        sections: form.sections,
      };
      // En edición, contraseña vacía = no cambiar. En creación es obligatoria.
      if (form.password || !editing) payload.password = form.password;

      const res = await fetch(url, {
        method: editing ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Error al guardar");

      setUsers((prev) =>
        editing
          ? prev.map((x) => (x._id === editing._id ? (data as PublicUser) : x))
          : [...prev, data as PublicUser],
      );
      setOpen(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error");
    } finally {
      setSaving(false);
    }
  }

  async function doDelete() {
    if (!deleting) return;
    const id = deleting._id;
    const res = await fetch(`/api/admin/users/${id}`, { method: "DELETE" });
    if (res.ok) {
      setUsers((prev) => prev.filter((x) => x._id !== id));
    } else {
      const data = await res.json().catch(() => ({}));
      setError(data.error || "No se pudo eliminar");
    }
    setDeleting(null);
  }

  const sectionLabel = (key: string) =>
    sections.find((s) => s.key === key)?.label ?? key;

  return (
    <div className="mx-auto max-w-6xl p-6 lg:p-10">
      <header className="mb-6 flex items-center justify-between gap-4">
        <div>
          <h1 className="flex items-center gap-2 text-2xl font-bold text-brand">
            <i className="bi bi-people" /> Usuarios
          </h1>
          <p className="text-sm text-slate-500">{users.length} usuario(s)</p>
        </div>
        <button
          onClick={openCreate}
          className="inline-flex items-center gap-2 rounded-lg bg-brand px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-brand-700"
        >
          <i className="bi bi-plus-lg" /> Nuevo usuario
        </button>
      </header>

      {error && !open && (
        <p className="mb-4 rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </p>
      )}

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-4 py-3 font-medium">Nombre</th>
              <th className="px-4 py-3 font-medium">Usuario</th>
              <th className="px-4 py-3 font-medium">Rol / acceso</th>
              <th className="px-4 py-3 text-right font-medium">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {users.map((u) => (
              <tr key={u._id} className="hover:bg-slate-50/60">
                <td className="px-4 py-3 font-medium text-slate-800">
                  {u.name}
                  {u._id === meId && (
                    <span className="ml-2 rounded bg-slate-100 px-1.5 py-0.5 text-xs text-slate-500">
                      tú
                    </span>
                  )}
                </td>
                <td className="px-4 py-3 text-slate-600">{u.username}</td>
                <td className="px-4 py-3 text-slate-600">
                  {u.isSuperAdmin ? (
                    <span className="inline-flex items-center gap-1 rounded-full bg-brand/10 px-2.5 py-0.5 text-xs font-medium text-brand">
                      <i className="bi bi-shield-lock" /> Super-admin
                    </span>
                  ) : u.sections.length > 0 ? (
                    <span className="text-xs">
                      {u.sections.map(sectionLabel).join(", ")}
                    </span>
                  ) : (
                    <span className="text-xs text-slate-400">Sin secciones</span>
                  )}
                </td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-1">
                    <button
                      onClick={() => openEdit(u)}
                      className="rounded-md p-2 text-slate-500 hover:bg-slate-100 hover:text-brand"
                      title="Editar"
                    >
                      <i className="bi bi-pencil" />
                    </button>
                    <button
                      onClick={() => setDeleting(u)}
                      disabled={u._id === meId}
                      className="rounded-md p-2 text-slate-500 hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-30"
                      title={u._id === meId ? "No puedes eliminarte" : "Eliminar"}
                    >
                      <i className="bi bi-trash" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-10 text-center text-slate-400">
                  No hay usuarios.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal crear/editar */}
      <Transition show={open} as={Fragment}>
        <Dialog onClose={() => !saving && setOpen(false)} className="relative z-50">
          <div className="fixed inset-0 bg-black/40" />
          <div className="fixed inset-0 overflow-y-auto p-4">
            <div className="flex min-h-full items-center justify-center">
              <Dialog.Panel className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
                <Dialog.Title className="mb-4 text-lg font-bold text-brand">
                  {editing ? "Editar usuario" : "Nuevo usuario"}
                </Dialog.Title>

                <div className="max-h-[65vh] space-y-4 overflow-y-auto pr-1">
                  <div>
                    <label className="mb-1 block text-sm font-medium text-slate-700">
                      Nombre <span className="text-red-500">*</span>
                    </label>
                    <input
                      className={inputClass}
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-sm font-medium text-slate-700">
                      Usuario <span className="text-red-500">*</span>
                    </label>
                    <input
                      className={inputClass}
                      autoComplete="off"
                      value={form.username}
                      onChange={(e) =>
                        setForm({ ...form, username: e.target.value })
                      }
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-sm font-medium text-slate-700">
                      Contraseña{" "}
                      {editing ? (
                        <span className="text-xs font-normal text-slate-400">
                          (dejar vacío para no cambiar)
                        </span>
                      ) : (
                        <span className="text-red-500">*</span>
                      )}
                    </label>
                    <input
                      type="password"
                      autoComplete="new-password"
                      className={inputClass}
                      placeholder="Mínimo 10 caracteres"
                      value={form.password}
                      onChange={(e) =>
                        setForm({ ...form, password: e.target.value })
                      }
                    />
                  </div>

                  <label className="flex items-center gap-2 rounded-lg border border-slate-200 p-3 text-sm">
                    <input
                      type="checkbox"
                      checked={form.isSuperAdmin}
                      onChange={(e) =>
                        setForm({ ...form, isSuperAdmin: e.target.checked })
                      }
                      className="h-4 w-4 rounded border-slate-300 text-brand focus:ring-brand"
                    />
                    <span>
                      <span className="font-medium text-slate-700">
                        Super-administrador
                      </span>
                      <span className="block text-xs text-slate-400">
                        Acceso total, incluida la gestión de usuarios.
                      </span>
                    </span>
                  </label>

                  {!form.isSuperAdmin && (
                    <div>
                      <label className="mb-2 block text-sm font-medium text-slate-700">
                        Secciones que puede gestionar
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {sections.map((s) => (
                          <label
                            key={s.key}
                            className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm"
                          >
                            <input
                              type="checkbox"
                              checked={form.sections.includes(s.key)}
                              onChange={() => toggleSection(s.key)}
                              className="h-4 w-4 rounded border-slate-300 text-brand focus:ring-brand"
                            />
                            {s.label}
                          </label>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {error && (
                  <p className="mt-3 rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
                    {error}
                  </p>
                )}

                <div className="mt-6 flex justify-end gap-2">
                  <button
                    onClick={() => setOpen(false)}
                    disabled={saving}
                    className="rounded-lg px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={save}
                    disabled={saving}
                    className="inline-flex items-center gap-2 rounded-lg bg-brand px-4 py-2 text-sm font-medium text-white hover:bg-brand-700 disabled:opacity-60"
                  >
                    {saving && <i className="bi bi-arrow-repeat animate-spin" />}
                    Guardar
                  </button>
                </div>
              </Dialog.Panel>
            </div>
          </div>
        </Dialog>
      </Transition>

      {/* Confirmar eliminación */}
      <Transition show={deleting !== null} as={Fragment}>
        <Dialog onClose={() => setDeleting(null)} className="relative z-50">
          <div className="fixed inset-0 bg-black/40" />
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Dialog.Panel className="w-full max-w-sm rounded-2xl bg-white p-6 text-center shadow-xl">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-600">
                <i className="bi bi-exclamation-triangle text-xl" />
              </div>
              <Dialog.Title className="font-semibold text-slate-800">
                ¿Eliminar a {deleting?.name}?
              </Dialog.Title>
              <p className="mt-1 text-sm text-slate-500">
                Perderá el acceso al panel. Esta acción no se puede deshacer.
              </p>
              <div className="mt-5 flex justify-center gap-2">
                <button
                  onClick={() => setDeleting(null)}
                  className="rounded-lg px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100"
                >
                  Cancelar
                </button>
                <button
                  onClick={doDelete}
                  className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
                >
                  Eliminar
                </button>
              </div>
            </Dialog.Panel>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}
