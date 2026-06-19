"use client";

import { useState } from "react";

type Belief = {
  _id: string;
  number: number;
  title: string;
  summary: string;
  verses?: string[];
};

export default function BeliefsAccordion({ beliefs }: { beliefs: Belief[] }) {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div className="divide-y divide-slate-200 rounded-xl border border-slate-200 bg-white shadow-sm">
      {beliefs.map((b) => {
        const isOpen = openId === b._id;
        return (
          <div key={b._id}>
            <button
              onClick={() => setOpenId(isOpen ? null : b._id)}
              className="flex w-full items-center gap-4 px-5 py-4 text-left hover:bg-slate-50 transition-colors"
              aria-expanded={isOpen}
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand text-sm font-bold text-white">
                {b.number}
              </span>
              <span className="flex-1 font-semibold text-slate-800">
                {b.title}
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className={`h-5 w-5 shrink-0 text-slate-400 transition-transform duration-200 ${
                  isOpen ? "rotate-180" : ""
                }`}
              >
                <path
                  fillRule="evenodd"
                  d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            {isOpen && (
              <div className="px-5 pb-5 pt-1 pl-[4.25rem] space-y-3">
                <p className="text-sm text-slate-600 leading-relaxed">{b.summary}</p>
                {b.verses && b.verses.length > 0 && (
                  <div>
                    <p className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-brand">
                      Textos bíblicos
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {b.verses.map((v) => (
                        <span
                          key={v}
                          className="rounded-full border border-accent/40 bg-accent/10 px-3 py-0.5 text-xs font-medium text-brand"
                        >
                          {v}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
