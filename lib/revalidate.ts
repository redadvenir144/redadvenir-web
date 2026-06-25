import { revalidatePath } from "next/cache";

// Tras un cambio en el admin (crear/editar/borrar), revalida las páginas
// públicas para que el contenido aparezca de inmediato, sin esperar el
// cache de 60s (ISR). Se revalida el layout raíz: cubre todas las páginas.
export function revalidateContent() {
  revalidatePath("/", "layout");
}
