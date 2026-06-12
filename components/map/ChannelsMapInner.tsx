"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import { GMI_CHANNELS } from "@/lib/gmiChannels";

// Marcador personalizado (pin con color de marca) para evitar los íconos rotos
// por defecto de Leaflet en bundlers.
const pinIcon = L.divIcon({
  className: "",
  html: `<span style="
    display:block;width:18px;height:18px;border-radius:50% 50% 50% 0;
    background:#f59e0b;border:2px solid #fff;transform:rotate(-45deg);
    box-shadow:0 2px 6px rgba(0,0,0,.4);"></span>`,
  iconSize: [18, 18],
  iconAnchor: [9, 18],
  popupAnchor: [0, -16],
});

export default function ChannelsMapInner() {
  return (
    <MapContainer
      center={[0, -45]}
      zoom={3}
      scrollWheelZoom={false}
      className="h-[60vh] min-h-[420px] w-full rounded-xl"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {GMI_CHANNELS.map((c) => (
        <Marker key={c.name} position={[c.lat, c.lng]} icon={pinIcon}>
          <Popup>
            <div className="space-y-1">
              <p className="font-semibold text-brand">{c.name}</p>
              <p className="text-xs text-slate-600">
                <i className="bi bi-geo-alt" /> {c.region} · {c.language}
              </p>
              {c.url && (
                <a
                  href={c.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-medium text-brand-500 hover:underline"
                >
                  Visitar sitio →
                </a>
              )}
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
