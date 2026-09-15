"use client";

import { MapContainer, TileLayer, Marker, Popup, ZoomControl } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import { GMI_CHANNELS } from "@/lib/gmiChannels";

// Marcador personalizado moderno con animación
const createPinIcon = (isMain: boolean = false) =>
  L.divIcon({
    className: "",
    html: `<div style="
      position: relative;
      width: ${isMain ? "28px" : "22px"};
      height: ${isMain ? "28px" : "22px"};
    ">
      <span style="
        display: block;
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background: ${isMain ? "linear-gradient(135deg, #1e3a5f 0%, #0f2744 100%)" : "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)"};
        border: 3px solid #fff;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3), 0 0 0 2px rgba(245,158,11,0.2);
        animation: pulse 2s infinite;
      "></span>
      <span style="
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: white;
      "></span>
    </div>
    <style>
      @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
      }
    </style>`,
    iconSize: [isMain ? 28 : 22, isMain ? 28 : 22],
    iconAnchor: [isMain ? 14 : 11, isMain ? 14 : 11],
    popupAnchor: [0, -12],
  });

const mainIcon = createPinIcon(true);
const pinIcon = createPinIcon(false);

export default function ChannelsMapInner() {
  return (
    <MapContainer
      center={[20, 0]}
      zoom={2}
      minZoom={2}
      maxZoom={10}
      scrollWheelZoom={true}
      zoomControl={false}
      worldCopyJump={false}
      maxBounds={[[-85, -180], [85, 180]]}
      maxBoundsViscosity={1.0}
      className="h-[65vh] min-h-[500px] w-full"
      style={{ background: "#0c1a2e" }}
    >
      <ZoomControl position="bottomright" />
      <TileLayer
        attribution='Tiles &copy; Esri'
        url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
        noWrap={true}
        bounds={[[-85, -180], [85, 180]]}
      />
      {GMI_CHANNELS.map((c) => (
        <Marker
          key={c.name}
          position={[c.lat, c.lng]}
          icon={c.name.includes("Red ADvenir Internacional") ? mainIcon : pinIcon}
        >
          <Popup className="custom-popup">
            <div className="min-w-[200px] p-1">
              <p className="text-base font-bold text-slate-800 mb-1">{c.name}</p>
              <p className="flex items-center gap-1.5 text-sm text-slate-600 mb-0.5">
                <svg className="w-4 h-4 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                {c.region}
              </p>
              <p className="text-sm text-slate-500 mb-2">{c.language}</p>
              {c.url && (
                <a
                  href={c.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-800 hover:underline"
                >
                  Visitar sitio
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              )}
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
