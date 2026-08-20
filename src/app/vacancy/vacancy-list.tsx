"use client";

import { useMemo, useState } from "react";
import { kanaMap } from "@/lib/kana-map";

export type VacancyListRow = {
  slug: string;
  name: string;
  prefecture: string;
  /** 都道府県の一覧ページへのslug。ない都道府県では null */
  prefectureSlug: string | null;
  /** 公式データの基準日（YYYY-MM-DD）。並べ替えに使う */
  asOf: string;
  asOfLabel: string;
  facilityCount: number;
  vacancy: number;
  hasWaiting: boolean;
  hasEnrolled: boolean;
};

const num = (n: number) => n.toLocaleString("ja-JP");

/** ひらがな・カタカナの違いで探せなくならないようにそろえる */
function normalize(s: string): string {
  return s
    .trim()
    .toLowerCase()
    .replace(/[ァ-ン]/g, (c) => String.fromCharCode(c.charCodeAt(0) - 0x60))
    .replace(/[\s　]/g, "");
}

export function VacancyList({ rows }: { rows: VacancyListRow[] }) {
  const [query, setQuery] = useState("");
  const q = normalize(query);

  const filtered = useMemo(() => {
    if (!q) return rows;
    return rows.filter((row) => {
      const reading = normalize(kanaMap[row.name] ?? "");
      return (
        normalize(row.name).includes(q) ||
        normalize(row.prefecture).includes(q) ||
        row.slug.includes(q) ||
        reading.includes(q)
      );
    });
  }, [rows, q]);

  // 都道府県ごとにまとめ直す。並び順は自治体の多い順、同数なら名前順
  const groups = useMemo(() => {
    const byPrefecture = new Map<string, VacancyListRow[]>();
    for (const row of filtered) {
      const list = byPrefecture.get(row.prefecture);
      if (list) list.push(row);
      else byPrefecture.set(row.prefecture, [row]);
    }
    return [...byPrefecture.entries()].sort(
      (a, b) => b[1].length - a[1].length || a[0].localeCompare(b[0], "ja")
    );
  }, [filtered]);

  return (
    <>
      <div className="relative w-full max-w-md mx-auto mb-8">
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
          placeholder="市区町村名で検索（例: むさしの、東京都）"
          aria-label="自治体を検索"
          className="w-full pl-11 pr-10 py-3 rounded-xl border border-border/60 bg-card text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery("")}
            aria-label="検索をやめる"
            className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center rounded-full text-muted-foreground hover:bg-muted transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        )}
        {q && (
          <p className="text-xs text-muted-foreground text-center mt-2">
            {filtered.length > 0
              ? `${filtered.length}件が見つかりました`
              : "該当する自治体はありません"}
          </p>
        )}
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-xl border border-border/60 bg-card px-4 py-8 text-center mb-8">
          <p className="text-sm text-muted-foreground">
            その自治体の空き状況はまだ取り込めていません。
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            公式が人数を出していない（○や△の記号だけ）自治体は、意味を取り違えないよう見送っています。
          </p>
        </div>
      ) : (
        groups.map(([prefecture, list]) => (
          <section key={prefecture} className="mb-8">
            <div className="flex items-baseline justify-between mb-3">
              <h2 className="text-sm font-bold" style={{ fontFamily: "var(--font-heading)" }}>
                {prefecture}
                <span className="text-xs text-muted-foreground font-normal ml-2">
                  {list.length}自治体
                </span>
              </h2>
              {list[0].prefectureSlug && (
                <a
                  href={`https://hoikaten.com/prefecture/${list[0].prefectureSlug}`}
                  className="text-[11px] text-muted-foreground hover:text-primary transition-colors"
                >
                  {prefecture}の点数を調べる
                </a>
              )}
            </div>

            <div className="grid gap-2 sm:grid-cols-2">
              {list.map((row) => (
                <a
                  key={row.slug}
                  href={`https://${row.slug}.hoikaten.com/vacancy`}
                  className="block rounded-xl border border-border/60 bg-card px-4 py-3 hover:border-primary/40 hover:shadow-sm transition-all"
                >
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="font-bold text-sm">{row.name}</span>
                    <span className="text-[10px] text-muted-foreground shrink-0">
                      {row.asOfLabel}時点
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {num(row.facilityCount)}施設 ／ 空き{num(row.vacancy)}
                  </p>
                  {(row.hasWaiting || row.hasEnrolled) && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {row.hasWaiting && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                          申込・入所待ちも
                        </span>
                      )}
                      {row.hasEnrolled && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                          在籍数も
                        </span>
                      )}
                    </div>
                  )}
                </a>
              ))}
            </div>
          </section>
        ))
      )}
    </>
  );
}
