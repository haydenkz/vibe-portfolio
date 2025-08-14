import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function TwitterImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0b0b13 0%, #121225 60%, #0b0b13 100%)",
          position: "relative",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: -80,
            background:
              "radial-gradient(circle at 20% 20%, rgba(124,58,237,0.5), transparent 35%), radial-gradient(circle at 80% 60%, rgba(34,211,238,0.45), transparent 35%), radial-gradient(circle at 50% 20%, rgba(249,115,22,0.4), transparent 40%)",
            filter: "blur(40px)",
          }}
        />
        <div style={{ display: "flex", flexDirection: "column", gap: 18, alignItems: "center", textAlign: "center" }}>
          <div style={{ fontSize: 72, fontWeight: 700, letterSpacing: -1 }}>
            Hayden — hayden.ooo
          </div>
          <div style={{ display: "flex", fontSize: 34, opacity: 0.9 }}>
            <span>CS student — builder — </span>
            <span style={{ opacity: 1, marginLeft: 8 }}>@haydendevs</span>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}

