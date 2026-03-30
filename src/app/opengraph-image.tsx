import { ImageResponse } from "next/og";

export const alt = "Awab Elkhalil — Designer & Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#f4efe4",
          fontFamily: "serif",
          position: "relative",
        }}
      >
        {/* Top rule */}
        <div
          style={{
            position: "absolute",
            top: 60,
            left: 80,
            right: 80,
            height: 3,
            backgroundColor: "#141414",
          }}
        />

        {/* Name */}
        <div
          style={{
            fontSize: 80,
            fontWeight: 800,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "#141414",
            lineHeight: 0.9,
            textAlign: "center",
          }}
        >
          AWAB
        </div>
        <div
          style={{
            fontSize: 80,
            fontWeight: 800,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "#141414",
            lineHeight: 0.9,
            textAlign: "center",
            marginTop: 8,
          }}
        >
          ELKHALIL
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: 18,
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "#7d7a6f",
            marginTop: 32,
          }}
        >
          Designer & Developer — Istanbul
        </div>

        {/* Bottom rule */}
        <div
          style={{
            position: "absolute",
            bottom: 60,
            left: 80,
            right: 80,
            height: 3,
            backgroundColor: "#141414",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
