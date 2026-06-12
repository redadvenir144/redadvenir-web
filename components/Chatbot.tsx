"use client";

import { useEffect, useRef, useState } from "react";

import { CONTACT } from "@/lib/site";
import type { Faq } from "@/lib/types";

type Message = { from: "bot" | "user"; text: string; contact?: boolean };

// Normaliza para comparar sin acentos ni mayúsculas.
function normalize(s: string) {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function findAnswer(input: string, faqs: Faq[]): Faq | null {
  const text = normalize(input);
  let best: { faq: Faq; score: number } | null = null;
  for (const faq of faqs) {
    const score = (faq.keywords || []).reduce(
      (acc, kw) => (text.includes(normalize(kw)) ? acc + 1 : acc),
      0,
    );
    if (score > 0 && (!best || score > best.score)) best = { faq, score };
  }
  return best?.faq ?? null;
}

export default function Chatbot({ faqs }: { faqs: Faq[] }) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      from: "bot",
      text: "¡Hola! Soy el asistente de Red ADvenir. ¿En qué puedo ayudarte? Puedes preguntar por la TV en vivo, la radio, los estudios bíblicos, la señal o cómo donar.",
    },
  ]);
  const [value, setValue] = useState("");
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  const send = (raw?: string) => {
    const text = (raw ?? value).trim();
    if (!text) return;
    const userMsg: Message = { from: "user", text };
    const faq = findAnswer(text, faqs);
    const botMsg: Message = faq
      ? { from: "bot", text: faq.answer }
      : {
          from: "bot",
          text: "No encontré una respuesta para eso. Puedes escribirnos directamente por estos medios:",
          contact: true,
        };
    setMessages((m) => [...m, userMsg, botMsg]);
    setValue("");
  };

  const suggestions = faqs.slice(0, 4);

  return (
    <>
      {/* Botón flotante */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Cerrar chat" : "Abrir chat de ayuda"}
        className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-accent text-brand shadow-lg transition-transform hover:scale-105"
      >
        <i className={`bi bi-${open ? "x-lg" : "chat-dots-fill"} text-2xl`} />
      </button>

      {/* Panel */}
      {open && (
        <div className="fixed bottom-24 right-5 z-50 flex h-[32rem] w-[22rem] max-w-[calc(100vw-2.5rem)] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
          <div className="flex items-center gap-2 bg-brand px-4 py-3 text-white">
            <i className="bi bi-robot text-xl" />
            <div>
              <p className="text-sm font-semibold leading-none">Asistente Red ADvenir</p>
              <p className="text-xs text-white/70">Preguntas frecuentes</p>
            </div>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto bg-slate-50 p-3">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={[
                    "max-w-[85%] rounded-2xl px-3 py-2 text-sm",
                    m.from === "user"
                      ? "bg-brand text-white"
                      : "bg-white text-slate-700 shadow-sm",
                  ].join(" ")}
                >
                  <p>{m.text}</p>
                  {m.contact && (
                    <div className="mt-2 flex flex-col gap-1.5">
                      <a className="text-brand-500 hover:underline" href={`mailto:${CONTACT.email}`}>
                        <i className="bi bi-envelope" /> {CONTACT.email}
                      </a>
                      <a className="text-brand-500 hover:underline" href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer">
                        <i className="bi bi-whatsapp" /> WhatsApp
                      </a>
                      <a className="text-brand-500 hover:underline" href={CONTACT.telegram} target="_blank" rel="noopener noreferrer">
                        <i className="bi bi-telegram" /> Telegram
                      </a>
                      <a className="text-brand-500 hover:underline" href={CONTACT.facebook} target="_blank" rel="noopener noreferrer">
                        <i className="bi bi-facebook" /> Facebook
                      </a>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {messages.length <= 1 && (
              <div className="flex flex-wrap gap-2 pt-1">
                {suggestions.map((s) => (
                  <button
                    key={s._id}
                    onClick={() => send(s.question)}
                    className="rounded-full border border-brand/20 bg-white px-3 py-1 text-xs text-brand hover:bg-brand hover:text-white"
                  >
                    {s.question}
                  </button>
                ))}
              </div>
            )}
            <div ref={endRef} />
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              send();
            }}
            className="flex items-center gap-2 border-t border-slate-200 p-2"
          >
            <input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Escribe tu pregunta..."
              className="flex-1 rounded-full border border-slate-200 px-3 py-2 text-sm outline-none focus:border-brand"
            />
            <button
              type="submit"
              aria-label="Enviar"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-brand text-white hover:bg-brand-700"
            >
              <i className="bi bi-send-fill" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
