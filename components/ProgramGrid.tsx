import type { ScheduleSlot } from "@/lib/types";

const DAY_ORDER = [
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado",
  "Domingo",
];

export default function ProgramGrid({ slots }: { slots: ScheduleSlot[] }) {
  // Agrupar por día respetando el orden de la semana.
  const byDay = DAY_ORDER.map((day) => ({
    day,
    items: slots
      .filter((s) => s.day === day)
      .sort((a, b) => a.time.localeCompare(b.time)),
  })).filter((g) => g.items.length > 0);

  if (byDay.length === 0) {
    return (
      <p className="rounded-lg border border-dashed border-slate-300 p-6 text-center text-slate-500">
        La grilla de programación se publicará próximamente.
      </p>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {byDay.map((g) => (
        <div key={g.day} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <h3 className="mb-3 border-b border-slate-100 pb-2 font-semibold text-brand">
            {g.day}
          </h3>
          <ul className="space-y-2">
            {g.items.map((s) => (
              <li key={s._id} className="flex gap-3 text-sm">
                <span className="w-14 shrink-0 font-mono font-medium text-accent-600">
                  {s.time}
                </span>
                <span className="text-slate-700">{s.title}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
