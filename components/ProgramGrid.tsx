import type { ScheduleSlot } from "@/lib/types";

// Orden bíblico adventista: la semana empieza en Domingo y culmina en Sábado
// (el día de reposo), según Génesis 1-2 y Éxodo 20:8-11.
const DAY_ORDER = [
  "Domingo",
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado",
];

// Normaliza para comparar sin importar mayúsculas/acentos ni espacios.
const norm = (d: string) => d.trim().toLowerCase();
const ORDER_INDEX = new Map(DAY_ORDER.map((d, i) => [norm(d), i]));

export default function ProgramGrid({ slots }: { slots: ScheduleSlot[] }) {
  // Agrupar por el día REAL de cada programa. Así se tolera cualquier variante
  // de capitalización/acento que un editor pueda introducir en el admin, y
  // ningún programa se descarta en silencio.
  const groups = new Map<string, ScheduleSlot[]>();
  for (const s of slots) {
    const list = groups.get(s.day);
    if (list) list.push(s);
    else groups.set(s.day, [s]);
  }

  // Ordenar los días por el orden bíblico. Los días no reconocidos (no listados
  // en DAY_ORDER) van al final en vez de perderse (defensa preventiva). Los días
  // sin programas simplemente no aparecen, porque no están en `groups`.
  const byDay = [...groups.entries()]
    .map(([day, items]) => ({
      day,
      items: [...items].sort((a, b) => a.time.localeCompare(b.time)),
    }))
    .sort((a, b) => {
      const ia = ORDER_INDEX.get(norm(a.day)) ?? Number.MAX_SAFE_INTEGER;
      const ib = ORDER_INDEX.get(norm(b.day)) ?? Number.MAX_SAFE_INTEGER;
      return ia - ib;
    });

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
