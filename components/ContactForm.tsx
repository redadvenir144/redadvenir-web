"use client";

import { useState } from "react";

type Status = "idle" | "sending" | "ok" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/contacto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("error");
      setStatus("ok");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1 block text-sm font-medium text-slate-700">
            Nombre
          </label>
          <input
            id="name"
            name="name"
            required
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-brand"
          />
        </div>
        <div>
          <label htmlFor="email" className="mb-1 block text-sm font-medium text-slate-700">
            Correo electrónico
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-brand"
          />
        </div>
      </div>
      <div>
        <label htmlFor="subject" className="mb-1 block text-sm font-medium text-slate-700">
          Asunto
        </label>
        <input
          id="subject"
          name="subject"
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-brand"
        />
      </div>
      <div>
        <label htmlFor="message" className="mb-1 block text-sm font-medium text-slate-700">
          Mensaje
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-brand"
        />
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="inline-flex items-center gap-2 rounded-md bg-brand px-6 py-2.5 font-medium text-white hover:bg-brand-700 disabled:opacity-60"
      >
        <i className="bi bi-send" />
        {status === "sending" ? "Enviando..." : "Enviar mensaje"}
      </button>

      {status === "ok" && (
        <p className="rounded-md bg-emerald-50 px-4 py-2 text-sm text-emerald-700">
          ¡Gracias! Tu mensaje fue enviado. Te responderemos pronto.
        </p>
      )}
      {status === "error" && (
        <p className="rounded-md bg-red-50 px-4 py-2 text-sm text-red-700">
          No se pudo enviar el mensaje. Por favor intenta por WhatsApp o correo.
        </p>
      )}
    </form>
  );
}
