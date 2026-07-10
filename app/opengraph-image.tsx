import { ImageResponse } from "next/og";

// Imagen de vista previa al compartir en redes (Open Graph / Twitter).
// Generada con la marca; no depende de assets externos.
export const alt = "Red ADvenir Internacional — TV y radio cristiana en vivo";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          backgroundColor: "#0b2545",
          padding: "80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", marginBottom: 30 }}>
          <div
            style={{
              width: 18,
              height: 18,
              borderRadius: 9,
              backgroundColor: "#dc2626",
              display: "flex",
              marginRight: 16,
            }}
          />
          <div style={{ color: "#f59e0b", fontSize: 30, fontWeight: 700, letterSpacing: 6 }}>
            EN VIVO
          </div>
        </div>
        <div style={{ display: "flex", color: "white", fontSize: 96, fontWeight: 800, lineHeight: 1 }}>
          Red ADvenir
        </div>
        <div style={{ display: "flex", color: "#f59e0b", fontSize: 66, fontWeight: 800, marginTop: 6 }}>
          Internacional
        </div>
        <div
          style={{
            display: "flex",
            color: "rgba(255,255,255,0.85)",
            fontSize: 34,
            marginTop: 30,
            maxWidth: 900,
          }}
        >
          TV y radio cristiana en vivo · alcance internacional
        </div>
      </div>
    ),
    { ...size },
  );
}
