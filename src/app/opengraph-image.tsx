import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const alt = "保育園の点数、何点とれる？｜hoikaten";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "24px",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: "32px",
              color: "#64748b",
              letterSpacing: "0.05em",
            }}
          >
            保育園 点数シミュレーター
          </div>
          <div
            style={{
              display: "flex",
              fontSize: "64px",
              fontWeight: "bold",
              color: "#0f172a",
              textAlign: "center",
              lineHeight: 1.3,
            }}
          >
            うちは何点とれる？
          </div>
          <div
            style={{
              display: "flex",
              fontSize: "28px",
              color: "#64748b",
              marginTop: "8px",
            }}
          >
            かんたんな質問に答えるだけで点数がわかる
          </div>
          <div
            style={{
              display: "flex",
              gap: "16px",
              marginTop: "24px",
            }}
          >
            {["世田谷区", "横浜市", "大阪市"].map((name) => (
              <div
                key={name}
                style={{
                  background: "white",
                  padding: "12px 24px",
                  borderRadius: "8px",
                  fontSize: "24px",
                  color: "#334155",
                  border: "1px solid #e2e8f0",
                }}
              >
                {name}
              </div>
            ))}
            <div
              style={{
                background: "white",
                padding: "12px 24px",
                borderRadius: "8px",
                fontSize: "24px",
                color: "#94a3b8",
                border: "1px dashed #cbd5e1",
              }}
            >
              順次追加中...
            </div>
          </div>
        </div>
        <div
          style={{
            position: "absolute",
            bottom: "32px",
            fontSize: "24px",
            color: "#94a3b8",
          }}
        >
          hoikaten.com
        </div>
      </div>
    ),
    { ...size }
  );
}
