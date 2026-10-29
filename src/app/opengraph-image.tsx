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
          justifyContent: "space-between",
          padding: 80,
          backgroundColor: "#f7f7f7",
          color: "#0a0a0b",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 28, fontWeight: 600 }}>Awab Elkhalil</div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 76, fontWeight: 700, lineHeight: 1.02, letterSpacing: "-0.02em" }}>
            I design it, then I build it.
          </div>
          <div style={{ fontSize: 76, fontWeight: 700, lineHeight: 1.02, letterSpacing: "-0.02em", color: "#6b6b70" }}>
            Brand, interface, code.
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 24, color: "#6b6b70" }}>
          <div>Designer &amp; developer · Istanbul</div>
          <div>cv.awab.design</div>
        </div>
      </div>
    ),
    { ...size }
  );
}
