import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "J Eleven Media — Web Design Studio in Lenoir City, TN";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#e7e4dd",
          gap: 24,
        }}
      >
        <div
          style={{
            fontFamily: "Georgia, serif",
            fontSize: 88,
            fontWeight: 700,
            color: "#1b1814",
            letterSpacing: "-0.02em",
            lineHeight: 1,
            textAlign: "center",
          }}
        >
          J Eleven Media
        </div>
        <div
          style={{
            width: 60,
            height: 1,
            backgroundColor: "rgba(27,24,20,0.3)",
          }}
        />
        <div
          style={{
            fontFamily: "Georgia, serif",
            fontSize: 26,
            fontStyle: "italic",
            color: "#9c6b4e",
            letterSpacing: "0.01em",
            textAlign: "center",
          }}
        >
          Web Design · SEO · Social Media · East Tennessee
        </div>
      </div>
    ),
    size,
  );
}
