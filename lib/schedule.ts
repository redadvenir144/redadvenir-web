// TODO: validar programación real con el equipo del canal
// TODO: conectar a getSchedule() del admin en lib/content.ts.
// El admin actual entrega { day, time, title } — falta endTime y category.
// Plan: extender el schema del admin para incluir endTime y category,
// luego reemplazar el array estático por la respuesta de getSchedule().

export type Slot = {
  time: string; // formato "HH:MM" 24h, ej: "19:00"
  endTime: string; // formato "HH:MM", ej: "20:00"
  title: string;
  category: string;
};

export const schedule: Slot[] = [
  { time: "06:00", endTime: "07:00", title: "Devocional matutino", category: "Devocional" },
  { time: "07:00", endTime: "08:00", title: "Estudio Bíblico", category: "Estudio" },
  { time: "08:00", endTime: "09:00", title: "Cocina Saludable", category: "Estilo de vida" },
  { time: "09:00", endTime: "10:00", title: "Salud y Vida", category: "Salud" },
  { time: "10:00", endTime: "11:00", title: "Niños de Esperanza", category: "Infantil" },
  { time: "11:00", endTime: "12:00", title: "Música de Adoración", category: "Música" },
  { time: "12:00", endTime: "13:00", title: "El Santuario", category: "Estudio bíblico" },
  { time: "13:00", endTime: "14:00", title: "Testimonios", category: "Documental" },
  { time: "14:00", endTime: "15:00", title: "Hora de la familia", category: "Familia" },
  { time: "15:00", endTime: "16:00", title: "Cocina Saludable (rep.)", category: "Estilo de vida" },
  { time: "16:00", endTime: "17:00", title: "Salud y Vida (rep.)", category: "Salud" },
  { time: "17:00", endTime: "18:00", title: "Estudio Bíblico (rep.)", category: "Estudio" },
  { time: "18:00", endTime: "19:00", title: "Noticias ADvenir", category: "Noticias" },
  { time: "19:00", endTime: "20:00", title: "Batallas de Fe", category: "Predicación" },
  { time: "20:00", endTime: "21:00", title: "El Santuario", category: "Estudio bíblico" },
  { time: "21:00", endTime: "22:00", title: "Música de Adoración", category: "Música" },
  { time: "22:00", endTime: "23:00", title: "Reflexión Nocturna", category: "Devocional" },
  { time: "23:00", endTime: "00:00", title: "Repetición de la noche", category: "Repetición" },
];

// Dado un array de slots y un Date, retorna el slot actual y el siguiente.
// El array es parámetro opcional para poder pasar más adelante la grilla
// real del admin (getSchedule()) sin reescribir esta función.
export function getCurrentAndNext(
  slots: Slot[] = schedule,
  now: Date = new Date(),
): { current: Slot | null; next: Slot | null; progressPercent: number } {
  const minutes = now.getHours() * 60 + now.getMinutes();

  const slotMinutes = (s: string) => {
    const [h, m] = s.split(":").map(Number);
    return h * 60 + m;
  };

  for (let i = 0; i < slots.length; i++) {
    const slot = slots[i];
    const start = slotMinutes(slot.time);
    const end = slot.endTime === "00:00" ? 24 * 60 : slotMinutes(slot.endTime);

    if (minutes >= start && minutes < end) {
      const next = slots[i + 1] ?? slots[0] ?? null;
      const progress = ((minutes - start) / (end - start)) * 100;
      return { current: slot, next, progressPercent: progress };
    }
  }

  return { current: null, next: slots[0] ?? null, progressPercent: 0 };
}
