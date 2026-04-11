import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const size = { width: 48, height: 48 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #E8614D 0%, #D4483A 100%)",
          borderRadius: "8px",
        }}
      >
        <svg
          width="30"
          height="30"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M3 21V9l9-7 9 7v12a1 1 0 01-1 1h-5v-7H9v7H4a1 1 0 01-1-1z"
            fill="white"
          />
        </svg>
      </div>
    ),
    { ...size }
  );
}
