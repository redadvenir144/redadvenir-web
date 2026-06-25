"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import { GMI_CHANNELS } from "@/lib/gmiChannels";

// Pin con pulso animado. Variante destacada (--hq) para la sede de Red ADvenir.
function makeIcon(hq: boolean) {
  const size = hq ? 20 : 14;
  return L.divIcon({
    className: "",
    html: `<div class="map-pin${hq ? " map-pin--hq" : ""}">
      <span class="map-pin__pulse"></span>
      <span class="map-pin__dot"></span>
    </div>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    popupAnchor: [0, -size / 2],
  });
}

const pinIcon = makeIcon(false);
const hqIcon = makeIcon(true);

export default function ChannelsMapInner() {
  return (
    <MapContainer
      center={[6, -55]}
      zoom={3}
      minZoom={2}
      maxZoom={10}
      scrollWheelZoom={false}
      worldCopyJump
      className="h-[60vh] min-h-[420px] w-full"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
      />
      {GMI_CHANNELS.map((c) => {
        const isHq = c.url === "https://redadvenir.org";
        return (
          <Marker
            key={c.name}
            position={[c.lat, c.lng]}
            icon={isHq ? hqIcon : pinIcon}
            zIndexOffset={isHq ? 1000 : 0}
          >
            <Popup>
              <div className="space-y-1">
                <p className="font-semibold text-white">{c.name}</p>
                <p className="text-xs text-white/70">
                  <i className="bi bi-geo-alt" /> {c.region} · {c.language}
                </p>
                {c.url && (
                  <a
                    href={c.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-medium text-sky-300 hover:underline"
                  >
                    Visitar sitio →
                  </a>
                )}
              </div>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}
