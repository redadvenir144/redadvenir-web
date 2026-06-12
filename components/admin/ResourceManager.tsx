"use client";

import { Fragment, useMemo, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { motion, AnimatePresence } from "framer-motion";

import type { Resource } from "@/lib/resources";
import FieldInput from "./FieldInput";

type Item = Record<string, unknown> & { _id: string };

function displayValue(field: string, value: unknown): string {
  if (value == null || value === "") return "—";
  if (Array.isArray(value)) return value.join(", ");
  if (field === "category") {
    const map: Record<string, string> = {
      noticia: "Noticia",
      profetica: "Profética",
      teologica: "Teológica",
    };
    return map[value as string] ?? String(value);
  }
  if (field === "publishedAt") {
    try {
      return new Date(value as string).toLocaleDateString("es-BO");
    } catch {
      return String(value);
    }
  }
  return String(value);
}

export default function ResourceManager({
  resource,
  initialItems,
}: {
  resource: Resource;
  initialItems: Item[];
}) {
  const [items, setItems] = useState<Item[]>(initialItems);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Item | null>(null);
  const [form, setForm] = useState<Record<string, unknown>>({});
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [deleting, setDeleting] = useState<Item | null>(null);

  const columnLabels = useMemo(() => {
    const map: Record<string, string> = {};
    for (const f of resource.fields) map[f.name] = f.label;
    return map;
  }, [resource]);

  function openCreate() {
    setEditing(null);
    setForm({});
    setError("");
    setOpen(true);
  }

  function openEdit(item: Item) {
    setEditing(item);
    setForm({ ...item });
    setError("");
    setOpen(true);
  }

  async function save() {
    setSaving(true);
    setError("");
    try {
      const url = editing
        ? `/api/admin/${resource.key}/${editing._id}`
        : `/api/admin/${resource.key}`;
      const res = await fetch(url, {
        method: editing ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Error al guardar");

      setItems((prev) =>
        editing
          ? prev.map((x) => (x._id === editing._id ? (data as Item) : x))
          : [...prev, data as Item],
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
    await fetch(`/api/admin/${resource.key}/${id}`, { method: "DELETE" });
    setItems((prev) => prev.filter((x) => x._id !== id));
    setDeleting(null);
  }

  return (
    <div className="mx-auto max-w-6xl p-6 lg:p-10">
      <header className="mb-6 flex items-center justify-between gap-4">
        <div>
          <h1 className="flex items-center gap-2 text-2xl font-bold text-brand">
            <i className={`bi bi-${resource.icon}`} /> {resource.label}
          </h1>
          <p className="text-sm text-slate-500">{items.length} registro(s)</p>
        </div>
        <button
          onClick={openCreate}
          className="inline-flex items-center gap-2 rounded-lg bg-brand px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-brand-700"
        >
          <i className="bi bi-plus-lg" /> Nuevo
        </button>
      </header>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500">
            <tr>
              {resource.listColumns.map((c) => (
                <th key={c} className="px-4 py-3 font-medium">
                  {columnLabels[c] ?? c}
                </th>
              ))}
              <th className="px-4 py-3 text-right font-medium">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            <AnimatePresence initial={false}>
              {items.map((item) => (
                <motion.tr
                  key={item._id}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, height: 0 }}
                  className="hover:bg-slate-50/60"
                >
                  {resource.listColumns.map((c) => (
                    <td key={c} className="px-4 py-3 text-slate-700">
                      {displayValue(c, item[c])}
                    </td>
                  ))}
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-1">
                      <button
                        onClick={() => openEdit(item)}
                        className="rounded-md p-2 text-slate-500 hover:bg-slate-100 hover:text-brand"
                        title="Editar"
                      >
                        <i className="bi bi-pencil" />
                      </button>
                      <button
                        onClick={() => setDeleting(item)}
                        className="rounded-md p-2 text-slate-500 hover:bg-red-50 hover:text-red-600"
                        title="Eliminar"
                      >
                        <i className="bi bi-trash" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
            {items.length === 0 && (
              <tr>
                <td colSpan={resource.listColumns.length + 1} className="px-4 py-10 text-center text-slate-400">
                  No hay registros. Crea el primero con “Nuevo”.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal crear/editar */}
      <Transition show={open} as={Fragment}>
        <Dialog onClose={() => !saving && setOpen(false)} className="relative z-50">
          <Transition.Child
            as={Fragment}
            enter="duration-200 ease-out"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="duration-150 ease-in"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/40" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto p-4">
            <div className="flex min-h-full items-center justify-center">
              <Transition.Child
                as={Fragment}
                enter="duration-200 ease-out"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="duration-150 ease-in"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
                  <Dialog.Title className="mb-4 text-lg font-bold text-brand">
                    {editing ? "Editar" : "Nuevo"} {resource.singular.toLowerCase()}
                  </Dialog.Title>

                  <div className="max-h-[60vh] space-y-4 overflow-y-auto pr-1">
                    {resource.fields.map((f) => (
                      <FieldInput
                        key={f.name}
                        field={f}
                        value={form[f.name]}
                        onChange={(val) => setForm((prev) => ({ ...prev, [f.name]: val }))}
                      />
                    ))}
                  </div>

                  {error && (
                    <p className="mt-3 rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>
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
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      {/* Confirmar eliminación */}
      <Transition show={deleting !== null} as={Fragment}>
        <Dialog onClose={() => setDeleting(null)} className="relative z-50">
          <Transition.Child
            as={Fragment}
            enter="duration-200 ease-out"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="duration-150 ease-in"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/40" />
          </Transition.Child>
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="duration-200 ease-out"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="duration-150 ease-in"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-sm rounded-2xl bg-white p-6 text-center shadow-xl">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-600">
                  <i className="bi bi-exclamation-triangle text-xl" />
                </div>
                <Dialog.Title className="font-semibold text-slate-800">¿Eliminar registro?</Dialog.Title>
                <p className="mt-1 text-sm text-slate-500">Esta acción no se puede deshacer.</p>
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
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}
