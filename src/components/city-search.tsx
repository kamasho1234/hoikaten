"use client";

import { useState, useRef, useEffect } from "react";

interface Municipality {
  name: string;
  slug: string;
  prefecture: string;
}

export function CitySearch({
  municipalities,
}: {
  municipalities: Municipality[];
}) {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setFocused(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const filtered = query.trim()
    ? municipalities.filter(
        (m) =>
          m.name.includes(query) ||
          m.prefecture.includes(query) ||
          m.slug.includes(query.toLowerCase())
      )
    : [];

  const showResults = focused && query.trim().length > 0;

  return (
    <div className="relative w-full max-w-md mx-auto" ref={ref}>
      <div className="relative">
        <svg
          className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
        </svg>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          placeholder="市区町村名で検索（例: 世田谷区）"
          className="w-full pl-11 pr-4 py-3 rounded-xl border border-border/60 bg-card text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
        />
      </div>

      {showResults && (
        <div className="absolute top-full mt-2 w-full bg-card border border-border/60 rounded-xl shadow-lg z-50 overflow-hidden">
          {filtered.length === 0 ? (
            <div className="p-4 text-sm text-muted-foreground text-center">
              該当する自治体が見つかりません
            </div>
          ) : (
            <div className="py-1">
              {filtered.map((m) => (
                <a
                  key={m.slug}
                  href={`https://${m.slug}.hoikaten.com`}
                  className="flex items-center gap-3 px-4 py-3 hover:bg-primary/5 transition-colors"
                >
                  <div className="flex-1">
                    <p className="text-sm font-medium">{m.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {m.prefecture}
                    </p>
                  </div>
                  <svg
                    className="w-4 h-4 text-muted-foreground"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </a>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
