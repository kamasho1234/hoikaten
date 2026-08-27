import type { ReactElement } from "react";

const STYLES: Record<
  string,
  { bg: string; accent: string; light: string }
> = {
  green: {
    bg: "linear-gradient(135deg, #f0fdf4 0%, #dcfce7 35%, #bbf7d0 65%, #86efac 100%)",
    accent: "rgba(22, 163, 74, 0.18)",
    light: "rgba(22, 163, 74, 0.08)",
  },
  blue: {
    bg: "linear-gradient(135deg, #eff6ff 0%, #dbeafe 35%, #bfdbfe 65%, #93c5fd 100%)",
    accent: "rgba(37, 99, 235, 0.18)",
    light: "rgba(37, 99, 235, 0.08)",
  },
  amber: {
    bg: "linear-gradient(135deg, #fffbeb 0%, #fef3c7 35%, #fde68a 65%, #fcd34d 100%)",
    accent: "rgba(217, 119, 6, 0.18)",
    light: "rgba(217, 119, 6, 0.08)",
  },
  rose: {
    bg: "linear-gradient(135deg, #fff1f2 0%, #ffe4e6 35%, #fecdd3 65%, #fda4af 100%)",
    accent: "rgba(225, 29, 72, 0.18)",
    light: "rgba(225, 29, 72, 0.08)",
  },
  purple: {
    bg: "linear-gradient(135deg, #faf5ff 0%, #f3e8ff 35%, #e9d5ff 65%, #d8b4fe 100%)",
    accent: "rgba(147, 51, 234, 0.18)",
    light: "rgba(147, 51, 234, 0.08)",
  },
  teal: {
    bg: "linear-gradient(135deg, #f0fdfa 0%, #ccfbf1 35%, #99f6e4 65%, #5eead4 100%)",
    accent: "rgba(13, 148, 136, 0.18)",
    light: "rgba(13, 148, 136, 0.08)",
  },
};

export const HERO_SIZE = { width: 1200, height: 600 };

function seededRandom(seed: string) {
  let h = 0;
  for (let i = 0; i < seed.length; i++) {
    h = (Math.imul(31, h) + seed.charCodeAt(i)) | 0;
  }
  return () => {
    h = (Math.imul(h ^ (h >>> 16), 0x45d9f3b) + 0x1) | 0;
    return ((h >>> 0) / 4294967296 + 0.5) % 1;
  };
}

/**
 * 画像に出す文字の大きさ。
 * **一覧のサムネイルは 1200x600 をかなり小さく縮めて出す**ので、
 * 文字数が多くても潰れないところまで落とす。
 */
function labelFontSize(text: string): number {
  const n = [...text].length;
  if (n <= 4) return 136;
  if (n <= 6) return 112;
  if (n <= 8) return 92;
  return 76;
}

export function createHeroElement(
  categoryColor: string,
  seed: string,
  /** 大きく出す文字。記事のカテゴリ（タグ）名を想定 */
  label?: string,
  /** 小さく上に出す文字。自治体名を想定 */
  sublabel?: string
): ReactElement {
  const style = STYLES[categoryColor] ?? STYLES.green;
  const rand = seededRandom(seed);
  const circles = Array.from({ length: 5 }, () => ({
    x: Math.floor(rand() * 1100),
    y: Math.floor(rand() * 500),
    r: Math.floor(rand() * 180) + 60,
    opacity: rand() * 0.4 + 0.1,
  }));

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        background: style.bg,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {circles.map((c, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: c.x,
            top: c.y,
            width: c.r * 2,
            height: c.r * 2,
            borderRadius: "50%",
            background: i % 2 === 0 ? style.accent : style.light,
            opacity: c.opacity,
          }}
        />
      ))}

      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          display: "flex",
          opacity: 0.04,
          backgroundImage:
            "repeating-linear-gradient(45deg, transparent, transparent 20px, currentColor 20px, currentColor 21px)",
        }}
      />

      <div
        style={{
          position: "absolute",
          right: 80,
          top: "50%",
          transform: "translateY(-50%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: 280,
          height: 280,
          borderRadius: "50%",
          background: style.accent,
        }}
      >
        {/*
          ここには以前カテゴリのアイコン（SVG）を描いていたが、
          **ImageResponse（satori）が path の円弧コマンド `a` を描けず**、
          直線部分だけが残って「− − −」のような線に化けていた。
          文字を入れたことで役目もなくなったため、円だけの装飾にしている。
        */}
      </div>

      <div
        style={{
          position: "absolute",
          left: 60,
          top: 40,
          width: 12,
          height: 12,
          borderRadius: "50%",
          background: style.accent,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 100,
          top: 60,
          width: 8,
          height: 8,
          borderRadius: "50%",
          background: style.accent,
          opacity: 0.6,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 80,
          bottom: 80,
          width: 16,
          height: 16,
          borderRadius: "50%",
          background: style.light,
        }}
      />

      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          height: 120,
          display: "flex",
        }}
      >
        <svg
          width="1200"
          height="120"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          style={{ display: "block" }}
        >
          <path
            d="M0 120V60C200 20 400 80 600 50C800 20 1000 70 1200 40V120H0Z"
            fill={style.accent}
          />
        </svg>
      </div>

      {/*
        タグ名。**画像の中央に置く。**
        一覧のサムネイルは 1200x600 を w-16 h-12 や w-24 h-24 の枠に object-cover で入れるため
        左右が大きく切り落とされる。いちばん狭い 1:1 の枠では中央 600px しか残らないので、
        文字はその幅に収める。
      */}
      {label ? (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {sublabel ? (
            <div
              style={{
                display: "flex",
                fontSize: 54,
                color: style.accent.replace("0.18", "0.75"),
                marginBottom: 18,
                maxWidth: 560,
                textAlign: "center",
              }}
            >
              {sublabel}
            </div>
          ) : null}
          <div
            style={{
              display: "flex",
              fontSize: labelFontSize(label),
              lineHeight: 1.2,
              color: style.accent.replace("0.18", "0.95"),
              maxWidth: 560,
              textAlign: "center",
            }}
          >
            {label}
          </div>
        </div>
      ) : null}
    </div>
  );
}
