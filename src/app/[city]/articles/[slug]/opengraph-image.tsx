import { ImageResponse } from "next/og";
import { getMunicipalityData, getAllMunicipalities } from "@/lib/data";
import { getArticle, getArticlesByCity } from "@/lib/articles";

export const runtime = "nodejs";
export const alt = "hoikaten 記事";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  const municipalities = getAllMunicipalities();
  const params: { city: string; slug: string }[] = [];
  for (const m of municipalities) {
    const articles = getArticlesByCity(m.slug);
    for (const a of articles) {
      params.push({ city: m.slug, slug: a.slug });
    }
  }
  return params;
}

export default async function Image({
  params,
}: {
  params: Promise<{ city: string; slug: string }>;
}) {
  const { city, slug } = await params;
  const data = getMunicipalityData(city);
  const article = getArticle(city, slug);
  const cityName = data?.municipality.name ?? city;
  const title = article?.title ?? slug;
  const category = article?.category ?? "";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "60px",
          background: "linear-gradient(135deg, #fff5f3 0%, #fef3ee 50%, #f0fdf9 100%)",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div
              style={{
                display: "flex",
                background: "rgba(200, 80, 60, 0.1)",
                padding: "6px 16px",
                borderRadius: "20px",
                fontSize: "18px",
                color: "#c8503c",
              }}
            >
              {cityName}
            </div>
            {category && (
              <div
                style={{
                  display: "flex",
                  background: "rgba(100, 116, 139, 0.1)",
                  padding: "6px 16px",
                  borderRadius: "20px",
                  fontSize: "18px",
                  color: "#64748b",
                }}
              >
                {category}
              </div>
            )}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: title.length > 30 ? "38px" : "46px",
              fontWeight: "bold",
              color: "#1e293b",
              lineHeight: 1.4,
              maxWidth: "1000px",
            }}
          >
            {title}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <div
              style={{
                display: "flex",
                width: "36px",
                height: "36px",
                borderRadius: "10px",
                background: "rgba(200, 80, 60, 0.15)",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M3 21V9l9-7 9 7v12a1 1 0 01-1 1h-5v-7H9v7H4a1 1 0 01-1-1z"
                  fill="rgba(200, 80, 60, 0.4)"
                  stroke="rgba(200, 80, 60, 0.8)"
                  strokeWidth="1.5"
                />
              </svg>
            </div>
            <div
              style={{
                display: "flex",
                fontSize: "24px",
                fontWeight: "bold",
                color: "#c8503c",
              }}
            >
              hoikaten
            </div>
          </div>
          <div
            style={{
              display: "flex",
              fontSize: "16px",
              color: "#94a3b8",
            }}
          >
            保育園 点数シミュレーター
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
