import { ImageResponse } from "next/og";
import {
  formatJapaneseDate,
  getVacancyData,
  getVacancySlugs,
  totalSummary,
} from "@/lib/vacancy";

export const runtime = "nodejs";
export const alt = "保育園の空き状況";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return getVacancySlugs().map((city) => ({ city }));
}

const num = (n: number) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

export default async function Image({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  const { city } = await params;
  const vacancy = getVacancyData(city);
  const name = vacancy?.municipalityName ?? city;
  const total = vacancy ? totalSummary(vacancy) : null;

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
            gap: "20px",
          }}
        >
          <div style={{ display: "flex", fontSize: "28px", color: "#64748b" }}>
            保育園の空き状況
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
          {total && (
            <div
              style={{
                display: "flex",
                fontSize: "44px",
                fontWeight: "bold",
                color: "#0f172a",
              }}
            >
              {num(total.facilityCount)}施設の空き枠を
              {vacancy && vacancy.wards.length > 0 ? "区・年齢" : "年齢・種類"}
              でさがす
            </div>
          )}
          {vacancy && (
            <div
              style={{
                display: "flex",
                fontSize: "24px",
                color: "#64748b",
                marginTop: "8px",
              }}
            >
              {name}公式データ（{formatJapaneseDate(vacancy.asOf)}時点）
            </div>
          )}
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
