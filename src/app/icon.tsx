import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 22,
          background: "#f4efe4",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#141414",
          fontFamily: "serif",
          fontWeight: 800,
          letterSpacing: "0.05em",
          border: "1.5px solid #141414",
        }}
      >
        A
      </div>
    ),
    { ...size }
  );
}
