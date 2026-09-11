"use client";

import { useMemo, useState, type ReactNode } from "react";
import { matchesMunicipality, normalizeQuery } from "@/lib/municipality-search";

/** 検索で出す1行。自治体1つにつき記事1本（お金）か、自治体のコラム一覧（コラム） */
export type MunicipalityArticleRow = {
  slug: string;
  name: string;
  prefecture: string;
  href: string;
  title: string;
  /** 「12本」のような補足。無ければ出さない */
  note?: string;
};

/**
 * 自治体名で記事を探す検索ボックス。
 * 入力が空のあいだは children（サーバーで描いた元の一覧）をそのまま出し、
 * 入力があるときだけ一覧を隠して該当する自治体の記事を出す。
 * 見た目は空き状況の一覧（src/app/vacancy/vacancy-list.tsx）に合わせている
 */
export function MunicipalityArticleSearch({
  rows,
  placeholder,
  emptyMessage,
  children,
}: {
  rows: MunicipalityArticleRow[];
  placeholder: string;
  emptyMessage: string;
  children: ReactNode;
}) {
  const [query, setQuery] = useState("");
  const q = normalizeQuery(query);

  const filtered = useMemo(() => {
    if (!q) return [];
    return rows.filter((row) => matchesMunicipality(q, row));
  }, [rows, q]);

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
          placeholder={placeholder}
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

      {!q ? (
        children
      ) : filtered.length === 0 ? (
        <div className="rounded-xl border border-border/60 bg-card px-4 py-8 text-center mb-8">
          <p className="text-sm text-muted-foreground">{emptyMessage}</p>
        </div>
      ) : (
        <div className="space-y-3 mb-8">
          {filtered.map((row) => (
            <a key={row.href} href={row.href} className="block group">
              <div className="p-4 rounded-xl border border-border/60 hover:border-primary/30 hover:shadow-md transition-all bg-card">
                <div className="flex items-baseline justify-between gap-2 mb-1.5">
                  <span className="text-xs text-muted-foreground">
                    {row.prefecture}
                    <span className="mx-1">/</span>
                    <span className="font-medium text-foreground">{row.name}</span>
                  </span>
                  {row.note && (
                    <span className="text-[10px] text-muted-foreground shrink-0">{row.note}</span>
                  )}
                </div>
                <p className="font-medium text-sm leading-relaxed group-hover:text-primary transition-colors m-0">
                  {row.title}
                </p>
              </div>
            </a>
          ))}
        </div>
      )}
    </>
  );
}
