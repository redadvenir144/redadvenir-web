import Link from "next/link";

// 404 con la marca. Vive en la raíz, así que es autocontenida (sin navbar).
export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-brand px-6 text-center text-white">
      <p className="text-sm font-bold uppercase tracking-[0.3em] text-accent">
        Error 404
      </p>
      <h1 className="mt-4 text-3xl font-extrabold sm:text-4xl">
        Página no encontrada
      </h1>
      <p className="mt-3 max-w-md text-white/75">
        La página que buscas no existe o fue movida. Puedes volver al inicio y
        seguir viendo Red ADvenir en vivo.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-brand transition-colors hover:bg-accent-600"
      >
        Volver al inicio
      </Link>
    </main>
  );
}
