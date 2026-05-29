import type { ReactElement } from "react";

const STYLES: Record<
  string,
  { bg: string; accent: string; light: string; icon: string }
> = {
  green: {
    bg: "linear-gradient(135deg, #f0fdf4 0%, #dcfce7 35%, #bbf7d0 65%, #86efac 100%)",
    accent: "rgba(22, 163, 74, 0.18)",
    light: "rgba(22, 163, 74, 0.08)",
    icon: "M3 21V9l9-7 9 7v12a1 1 0 01-1 1h-5v-7H9v7H4a1 1 0 01-1-1z",
  },
  blue: {
    bg: "linear-gradient(135deg, #eff6ff 0%, #dbeafe 35%, #bfdbfe 65%, #93c5fd 100%)",
    accent: "rgba(37, 99, 235, 0.18)",
    light: "rgba(37, 99, 235, 0.08)",
    icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4",
  },
  amber: {
    bg: "linear-gradient(135deg, #fffbeb 0%, #fef3c7 35%, #fde68a 65%, #fcd34d 100%)",
    accent: "rgba(217, 119, 6, 0.18)",
    light: "rgba(217, 119, 6, 0.08)",
    icon: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
  },
  rose: {
    bg: "linear-gradient(135deg, #fff1f2 0%, #ffe4e6 35%, #fecdd3 65%, #fda4af 100%)",
    accent: "rgba(225, 29, 72, 0.18)",
    light: "rgba(225, 29, 72, 0.08)",
    icon: "M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z",
  },
  purple: {
    bg: "linear-gradient(135deg, #faf5ff 0%, #f3e8ff 35%, #e9d5ff 65%, #d8b4fe 100%)",
    accent: "rgba(147, 51, 234, 0.18)",
    light: "rgba(147, 51, 234, 0.08)",
    icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253",
  },
  teal: {
    bg: "linear-gradient(135deg, #f0fdfa 0%, #ccfbf1 35%, #99f6e4 65%, #5eead4 100%)",
    accent: "rgba(13, 148, 136, 0.18)",
    light: "rgba(13, 148, 136, 0.08)",
    icon: "M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z",
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

export function createHeroElement(
  categoryColor: string,
  seed: string
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
        <svg
          width="140"
          height="140"
          viewBox="0 0 24 24"
          fill="none"
          stroke={style.accent.replace("0.18", "0.6")}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d={style.icon} />
        </svg>
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
    </div>
  );
}
