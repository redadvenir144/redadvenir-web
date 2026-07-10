"use client";

// Error boundary con la marca. Debe ser Client Component y ofrecer reintentar.
export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-brand px-6 text-center text-white">
      <p className="text-sm font-bold uppercase tracking-[0.3em] text-accent">
        Algo salió mal
      </p>
      <h1 className="mt-4 text-3xl font-extrabold sm:text-4xl">
        Ocurrió un error inesperado
      </h1>
      <p className="mt-3 max-w-md text-white/75">
        Lo sentimos, no pudimos cargar esta sección. Intenta de nuevo; si el
        problema continúa, vuelve más tarde.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={reset}
          className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-brand transition-colors hover:bg-accent-600"
        >
          Reintentar
        </button>
        <a
          href="/"
          className="rounded-full px-6 py-3 text-sm font-semibold text-white ring-1 ring-white/30 transition-colors hover:bg-white/10"
        >
          Ir al inicio
        </a>
      </div>
    </main>
  );
}
