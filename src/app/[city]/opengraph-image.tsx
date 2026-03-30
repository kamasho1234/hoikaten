import { ImageResponse } from "next/og";
import { getMunicipalityData, getAllMunicipalities } from "@/lib/data";

export const runtime = "nodejs";
export const alt = "保育園 点数シミュレーター";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return getAllMunicipalities().map((m) => ({ city: m.slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  const { city } = await params;
  const data = getMunicipalityData(city);
  const name = data?.municipality.name ?? city;
  const isMin = data?.municipality.scoringMethod === "min";

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
              fontSize: "28px",
              color: "#64748b",
            }}
          >
            保育園 点数シミュレーター
          </div>
          <div
            style={{
              display: "flex",
              fontSize: "72px",
              fontWeight: "bold",
              color: "#0f172a",
              textAlign: "center",
            }}
          >
            {name}の保育園
          </div>
          <div
            style={{
              display: "flex",
              fontSize: "48px",
              fontWeight: "bold",
              color: "#0f172a",
            }}
          >
            何点とれる？
          </div>
          <div
            style={{
              display: "flex",
              fontSize: "24px",
              color: "#64748b",
              marginTop: "8px",
            }}
          >
            {isMin
              ? "ランクA〜I + 調整指数で判定"
              : `最大${data?.municipality.maxBasePoints ?? "?"}点`}
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
