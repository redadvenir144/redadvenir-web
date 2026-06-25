"use client";

import { useEffect } from "react";

// Tras un deploy, los hashes de los chunks cambian. Si el navegador tenía
// la página abierta y pide un chunk viejo (ya borrado), lanza ChunkLoadError.
// Aquí lo detectamos y recargamos una sola vez (guardado en sessionStorage
// para evitar bucles si el problema fuera real).
const KEY = "ra-chunk-reloaded";

function isChunkError(message: string): boolean {
  return /ChunkLoadError|Loading chunk [\d]+ failed|Failed to load chunk|error loading dynamically imported module/i.test(
    message,
  );
}

export default function ChunkErrorReloader() {
  useEffect(() => {
    const reloadOnce = () => {
      if (sessionStorage.getItem(KEY)) return;
      sessionStorage.setItem(KEY, "1");
      window.location.reload();
    };

    const onError = (e: ErrorEvent) => {
      if (isChunkError(e.message || "")) reloadOnce();
    };
    const onRejection = (e: PromiseRejectionEvent) => {
      const reason = e.reason;
      const msg =
        typeof reason === "string" ? reason : (reason?.message ?? "");
      if (isChunkError(msg)) reloadOnce();
    };

    // Si la carga fue exitosa, limpiamos la marca para futuros deploys.
    const clearFlag = () => sessionStorage.removeItem(KEY);

    window.addEventListener("error", onError);
    window.addEventListener("unhandledrejection", onRejection);
    window.addEventListener("load", clearFlag);
    return () => {
      window.removeEventListener("error", onError);
      window.removeEventListener("unhandledrejection", onRejection);
      window.removeEventListener("load", clearFlag);
    };
  }, []);

  return null;
}
