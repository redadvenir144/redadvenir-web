"use client";

import dynamic from "next/dynamic";

// Leaflet usa `window`, por eso se carga solo en el cliente (ssr: false).
const ChannelsMapInner = dynamic(() => import("./ChannelsMapInner"), {
  ssr: false,
  loading: () => (
    <div className="flex h-[60vh] min-h-[420px] w-full items-center justify-center rounded-xl bg-slate-100 text-slate-400">
      <i className="bi bi-globe-americas mr-2 animate-pulse text-2xl" /> Cargando mapa…
    </div>
  ),
});

export default function ChannelsMap() {
  return <ChannelsMapInner />;
}
