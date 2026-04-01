"use client";

import { useState, useRef, useEffect } from "react";

interface Municipality {
  name: string;
  slug: string;
  prefecture: string;
}

// 五十音順にソート
function sortByJapanese(a: Municipality, b: Municipality): number {
  return a.name.localeCompare(b.name, "ja");
}

// 都道府県別にグループ化
function groupByPrefecture(
  municipalities: Municipality[]
): Record<string, Municipality[]> {
  const groups: Record<string, Municipality[]> = {};
  for (const m of municipalities) {
    if (!groups[m.prefecture]) groups[m.prefecture] = [];
    groups[m.prefecture].push(m);
  }
  return groups;
}

export function HeaderNav({
  municipalities,
}: {
  municipalities: Municipality[];
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const sorted = [...municipalities].sort(sortByJapanese);
  const grouped = groupByPrefecture(sorted);
  const prefectures = Object.keys(grouped).sort((a, b) =>
    a.localeCompare(b, "ja")
  );

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="text-sm text-muted-foreground hover:text-primary px-3 py-1.5 rounded-lg hover:bg-primary/5 transition-colors flex items-center gap-1"
      >
        地域をえらぶ
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className={`transition-transform ${open ? "rotate-180" : ""}`}
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-72 bg-card border border-border/60 rounded-xl shadow-lg z-50 max-h-[70vh] overflow-y-auto">
          <div className="p-3">
            <p className="text-xs text-muted-foreground mb-3 font-medium">
              対応している地域
            </p>
            {prefectures.map((pref) => (
              <div key={pref} className="mb-3">
                <p className="text-[10px] text-muted-foreground font-medium mb-1 px-1">
                  {pref}
                </p>
                {grouped[pref].map((m) => (
                  <a
                    key={m.slug}
                    href={`https://${m.slug}.hoikaten.com`}
                    className="block px-3 py-2 text-sm rounded-lg hover:bg-primary/5 hover:text-primary transition-colors"
                    onClick={() => setOpen(false)}
                  >
                    {m.name}
                  </a>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
