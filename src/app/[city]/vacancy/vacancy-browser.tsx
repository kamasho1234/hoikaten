"use client";

import { useMemo, useState } from "react";
import type { SymbolLegend, VacancyFacility } from "@/lib/vacancy";
import { AGE_COUNT, AGE_LABELS, facilityVacancy, valueAt } from "@/lib/vacancy";

const ALL = -1;
const INITIAL_LIMIT = 50;
const LIMIT_STEP = 50;
/** categories に載らない施設（自治体が種類を公表していないもの）を選ぶための値 */
const UNCLASSIFIED = -2;

type SortKey = "vacancy" | "waiting" | "name";

const SORT_LABELS: Record<SortKey, string> = {
  vacancy: "空きが多い順",
  waiting: "入所待ちが少ない順",
  name: "施設名順",
};

/** 記号の自治体は人数がないので、並び替えの言い方を変える */
const SYMBOL_SORT_LABELS: Record<SortKey, string> = {
  ...SORT_LABELS,
  vacancy: "空きがある順",
};

const selectClass =
  "w-full appearance-none rounded-xl border border-border bg-card px-3 py-2.5 text-sm font-medium " +
  "focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/15 transition-colors";

const labelClass = "block text-xs font-medium text-muted-foreground mb-1.5";

const num = (n: number) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

/**
 * その施設・その年齢の記号。年齢に null を渡したときは、
 * 凡例の並び（空きの多い順）でいちばん上に来る記号を返す
 */
function symbolOf(
  facility: VacancyFacility,
  age: number | null,
  legend: SymbolLegend[] | undefined
): string | null {
  const symbols = facility.symbols;
  if (!symbols) return null;
  if (age !== null) return symbols[age] ?? null;
  const order = (legend ?? []).map((l) => l.mark);
  let best: string | null = null;
  for (const mark of symbols) {
    if (!mark) continue;
    if (best === null) {
      best = mark;
      continue;
    }
    const a = order.indexOf(mark);
    const b = order.indexOf(best);
    if (a >= 0 && (b < 0 || a < b)) best = mark;
  }
  return best;
}

/** リンク先が園そのものか、運営法人か、自治体のページかを利用者に伝える */
const SITE_LABELS: Record<NonNullable<VacancyFacility["site"]>["type"], string> = {
  facility: "公式サイト",
  corp: "運営法人のサイト",
  city: "自治体のページ",
};

function ExternalLinkIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="w-3 h-3 mt-0.5 flex-shrink-0"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 3h6v6" />
      <path d="M10 14 21 3" />
      <path d="M21 14v7H3V3h7" />
    </svg>
  );
}

export function VacancyBrowser({
  facilities,
  wards,
  categories,
  hasWaiting,
  hasEnrolled,
  symbolBased = false,
  symbolLegend,
}: {
  facilities: VacancyFacility[];
  wards: string[];
  categories: string[];
  hasWaiting: boolean;
  hasEnrolled: boolean;
  /** 空きを人数ではなく記号で公表している自治体か */
  symbolBased?: boolean;
  /** 記号の意味。記号の自治体だけ渡す */
  symbolLegend?: SymbolLegend[];
}) {
  const [ward, setWard] = useState<number>(ALL);
  const [category, setCategory] = useState<number>(ALL);
  const [age, setAge] = useState<number | null>(null);
  const [onlyVacant, setOnlyVacant] = useState(false);
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortKey>("vacancy");
  const [limit, setLimit] = useState(INITIAL_LIMIT);

  const hasWards = wards.length > 0;
  const hasCategories = categories.length > 0;
  // 自治体が種類を公表していない施設があるときだけ「種類の記載なし」を選べるようにする
  const hasUnclassified = useMemo(
    () => hasCategories && facilities.some((f) => f.c === null || f.c === undefined),
    [hasCategories, facilities]
  );

  const sortKeys = useMemo(
    () =>
      (Object.keys(SORT_LABELS) as SortKey[]).filter(
        (k) => k !== "waiting" || hasWaiting
      ),
    [hasWaiting]
  );

  // 条件を変えたら表示件数を先頭に戻す
  const resetLimit = () => setLimit(INITIAL_LIMIT);

  const filtered = useMemo(() => {
    const q = query.trim();
    // 記号の自治体は人数がないので、「空きの多さ」を凡例の並び順で決める。
    // 凡例は空きの多い順に並んでいるので、先頭に近いほど大きい点にする
    const rank = (f: VacancyFacility): number => {
      if (!symbolBased) return facilityVacancy(f, age) ?? 0;
      const mark = symbolOf(f, age, symbolLegend);
      if (mark === null) return -1;
      const index = (symbolLegend ?? []).findIndex((l) => l.mark === mark);
      return index < 0 ? -1 : (symbolLegend ?? []).length - index;
    };
    const isOpen = (f: VacancyFacility): boolean => {
      if (!symbolBased) return (facilityVacancy(f, age) ?? 0) > 0;
      const mark = symbolOf(f, age, symbolLegend);
      return mark !== null && (symbolLegend ?? []).some((l) => l.mark === mark && l.open);
    };

    const list = facilities.filter((f) => {
      if (ward !== ALL && f.w !== ward) return false;
      if (category !== ALL) {
        const c = f.c ?? null;
        if (category === UNCLASSIFIED ? c !== null : c !== category) return false;
      }
      if (q && !f.name.includes(q)) return false;
      if (onlyVacant && !isOpen(f)) return false;
      return true;
    });

    const sorted = [...list];
    if (sort === "name") {
      sorted.sort((a, b) => a.name.localeCompare(b.name, "ja"));
    } else if (sort === "waiting") {
      sorted.sort(
        (a, b) =>
          (valueAt(a.waiting, age) ?? 0) - (valueAt(b.waiting, age) ?? 0) ||
          rank(b) - rank(a)
      );
    } else {
      sorted.sort(
        (a, b) =>
          rank(b) - rank(a) ||
          (valueAt(a.waiting, age) ?? 0) - (valueAt(b.waiting, age) ?? 0)
      );
    }
    return sorted;
  }, [facilities, ward, category, age, onlyVacant, query, sort, symbolBased, symbolLegend]);

  const vacantCount = useMemo(
    () =>
      filtered.filter((f) => {
        if (!symbolBased) return (facilityVacancy(f, age) ?? 0) > 0;
        const mark = symbolOf(f, age, symbolLegend);
        return mark !== null && (symbolLegend ?? []).some((l) => l.mark === mark && l.open);
      }).length,
    [filtered, age, symbolBased, symbolLegend]
  );

  const visible = filtered.slice(0, limit);

  return (
    <div>
      {/* 絞り込み */}
      <div className="rounded-2xl border border-border/60 bg-card p-4 space-y-4">
        <div className="grid grid-cols-2 gap-3">
          {hasWards && (
            <div>
              <label htmlFor="vacancy-ward" className={labelClass}>
                区
              </label>
              <select
                id="vacancy-ward"
                className={selectClass}
                value={ward}
                onChange={(e) => {
                  setWard(Number(e.target.value));
                  resetLimit();
                }}
              >
                <option value={ALL}>すべての区</option>
                {wards.map((w, i) => (
                  <option key={w} value={i}>
                    {w}
                  </option>
                ))}
              </select>
            </div>
          )}

          {hasCategories && (
            <div>
              <label htmlFor="vacancy-category" className={labelClass}>
                施設の種類
              </label>
              <select
                id="vacancy-category"
                className={selectClass}
                value={category}
                onChange={(e) => {
                  setCategory(Number(e.target.value));
                  resetLimit();
                }}
              >
                <option value={ALL}>すべての種類</option>
                {categories.map((c, i) => (
                  <option key={c} value={i}>
                    {c}
                  </option>
                ))}
                {hasUnclassified && (
                  <option value={UNCLASSIFIED}>種類の記載なし</option>
                )}
              </select>
            </div>
          )}

          <div>
            <label htmlFor="vacancy-age" className={labelClass}>
              入園を希望する年齢
            </label>
            <select
              id="vacancy-age"
              className={selectClass}
              value={age === null ? "all" : age}
              onChange={(e) => {
                setAge(e.target.value === "all" ? null : Number(e.target.value));
                resetLimit();
              }}
            >
              <option value="all">すべての年齢</option>
              {AGE_LABELS.map((label, i) => (
                <option key={label} value={i}>
                  {label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="vacancy-query" className={labelClass}>
            施設名でさがす
          </label>
          <input
            id="vacancy-query"
            type="search"
            className={selectClass}
            placeholder="例: あおば"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              resetLimit();
            }}
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => {
              setOnlyVacant((v) => !v);
              resetLimit();
            }}
            className={`px-3 py-2 rounded-xl text-sm font-medium border-2 transition-all active:scale-[0.98] ${
              onlyVacant
                ? "border-primary bg-primary/10 text-primary"
                : "border-border text-muted-foreground hover:border-primary/30"
            }`}
          >
            空きがある施設のみ
          </button>

          <select
            aria-label="並び替え"
            className="ml-auto rounded-xl border border-border bg-card px-3 py-2 text-sm font-medium focus:outline-none focus:border-primary/50"
            value={sort}
            onChange={(e) => {
              setSort(e.target.value as SortKey);
              resetLimit();
            }}
          >
            {sortKeys.map((key) => (
              <option key={key} value={key}>
                {(symbolBased ? SYMBOL_SORT_LABELS : SORT_LABELS)[key]}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 件数 */}
      <p className="text-sm text-muted-foreground mt-4 mb-3">
        {num(filtered.length)}施設が該当（うち
        <span className="font-bold text-primary">{num(vacantCount)}施設</span>
        に空きあり）
        {age !== null && `　${AGE_LABELS[age]}で表示中`}
      </p>

      {/* 施設一覧 */}
      {visible.length === 0 ? (
        <div className="rounded-2xl border border-border/60 bg-card p-8 text-center">
          <p className="text-sm text-muted-foreground">
            条件に合う施設がありませんでした。
            {hasWards ? "区や年齢" : "年齢や施設の種類"}の条件をゆるめてみてください。
          </p>
        </div>
      ) : (
        <div className="space-y-2.5">
          {visible.map((f) => (
            <FacilityCard
              key={f.id}
              facility={f}
              ward={f.w !== null && f.w !== undefined ? wards[f.w] : undefined}
              category={
                f.c !== null && f.c !== undefined ? categories[f.c] : undefined
              }
              age={age}
              hasWaiting={hasWaiting}
              hasEnrolled={hasEnrolled}
              symbolBased={symbolBased}
              legend={symbolLegend}
            />
          ))}
        </div>
      )}

      {filtered.length > visible.length && (
        <div className="mt-5 text-center">
          <button
            type="button"
            onClick={() => setLimit((n) => n + LIMIT_STEP)}
            className="px-5 py-2.5 rounded-xl border-2 border-border text-sm font-medium hover:border-primary/40 transition-colors"
          >
            もっと見る（残り{num(filtered.length - visible.length)}施設）
          </button>
        </div>
      )}
    </div>
  );
}

function FacilityCard({
  facility,
  ward,
  category,
  age,
  hasWaiting,
  hasEnrolled,
  symbolBased = false,
  legend,
}: {
  facility: VacancyFacility;
  ward?: string;
  category?: string;
  age: number | null;
  hasWaiting: boolean;
  hasEnrolled: boolean;
  /** 空きを記号で公表している自治体か */
  symbolBased?: boolean;
  /** 記号の意味。記号の自治体だけ渡す */
  legend?: SymbolLegend[];
}) {
  const vacancy = facilityVacancy(facility, age);
  const waiting = valueAt(facility.waiting, age);
  const enrolled = valueAt(facility.enrolled, age);
  // 記号の自治体は「○△」を空きあり、それ以外を空きなしとして扱う
  const mark = symbolBased ? symbolOf(facility, age, legend) : null;
  const markIsOpen = mark !== null && (legend ?? []).some((l) => l.mark === mark && l.open);
  const hasVacancy = symbolBased ? markIsOpen : (vacancy ?? 0) > 0;
  // 年齢別に分かれていない施設（家庭福祉員など）は年齢別の内訳を出せない
  const ageBreakdown = symbolBased
    ? (facility.symbols ?? []).some((v) => v !== null)
    : facility.vacancy.some((v) => v !== null);

  return (
    <div
      className={`rounded-xl border bg-card p-4 transition-colors ${
        hasVacancy ? "border-primary/30" : "border-border/60"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          {facility.site ? (
            <a
              href={facility.site.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-sm leading-snug text-primary hover:underline inline-flex items-start gap-1"
            >
              <span>{facility.name}</span>
              <ExternalLinkIcon />
            </a>
          ) : (
            <p className="font-bold text-sm leading-snug">{facility.name}</p>
          )}
          <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
            {ward && (
              <span className="inline-block text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                {ward}
              </span>
            )}
            {category && (
              <span className="inline-block text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                {category}
              </span>
            )}
            {facility.site && (
              <span className="inline-block text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                {SITE_LABELS[facility.site.type]}
                {/* 足立区のようにリンク先がPDFの自治体がある。開く前に分かるようにする */}
                {facility.site.url.toLowerCase().endsWith(".pdf") && "（PDF）"}
              </span>
            )}
          </div>
        </div>

        <div className="text-right flex-shrink-0">
          <p className="text-xs text-muted-foreground">
            {age === null ? "空き（全年齢）" : `${AGE_LABELS[age]}の空き`}
          </p>
          <p
            className={`text-2xl font-bold tabular-nums leading-tight ${
              hasVacancy ? "text-primary" : "text-muted-foreground"
            }`}
          >
            {symbolBased ? (mark ?? "—") : (vacancy ?? "—")}
          </p>
          {hasWaiting && (
            <p className="text-xs text-muted-foreground tabular-nums">
              入所待ち {waiting === null ? "—" : `${waiting}人`}
            </p>
          )}
        </div>
      </div>

      {/* 年齢別の内訳（すべての年齢を選んでいるときだけ出す） */}
      {age === null && ageBreakdown ? (
        <div className="mt-3 grid grid-cols-6 gap-1.5">
          {Array.from({ length: AGE_COUNT }, (_, i) => {
            const v = facility.vacancy[i];
            // 記号の自治体は年齢ごとの記号を出す
            const cellMark = symbolBased ? (facility.symbols?.[i] ?? null) : null;
            const cellOpen = symbolBased
              ? cellMark !== null && (legend ?? []).some((l) => l.mark === cellMark && l.open)
              : v !== null && v > 0;
            const empty = symbolBased ? cellMark === null : v === null;
            const meaning = symbolBased
              ? (legend ?? []).find((l) => l.mark === cellMark)?.label
              : undefined;
            return (
              <div
                key={i}
                className={`rounded-lg px-1 py-1.5 text-center ${
                  empty ? "bg-muted/40" : cellOpen ? "bg-primary/10" : "bg-muted/60"
                }`}
                title={
                  empty
                    ? `${AGE_LABELS[i]}: クラスなし`
                    : symbolBased
                      ? `${AGE_LABELS[i]}: ${cellMark}${meaning ? `（${meaning}）` : ""}`
                      : hasWaiting
                        ? `${AGE_LABELS[i]}: 空き${v} / 入所待ち${facility.waiting?.[i] ?? 0}人`
                        : `${AGE_LABELS[i]}: 空き${v}`
                }
              >
                <p className="text-[10px] text-muted-foreground leading-none">
                  {i}歳
                </p>
                <p
                  className={`font-bold tabular-nums leading-tight mt-0.5 ${
                    // 日高市のように「受け入れ停止」と言葉で公表する自治体があるので、
                    // 長い表記のときは字を小さくして折り返す
                    cellMark !== null && cellMark.length > 2 ? "text-[10px]" : "text-sm"
                  } ${cellOpen ? "text-primary" : "text-muted-foreground"}`}
                >
                  {symbolBased ? (cellMark ?? "—") : (v ?? "—")}
                </p>
              </div>
            );
          })}
        </div>
      ) : age === null && facility.vacancyTotal !== undefined ? (
        <p className="mt-2.5 text-xs text-muted-foreground">
          この施設は0〜2歳をまとめて{facility.vacancyTotal}枠として公表されているため、年齢別の内訳はありません。
        </p>
      ) : hasEnrolled ? (
        <p className="mt-2.5 text-xs text-muted-foreground tabular-nums">
          在籍 {enrolled === null ? "クラスなし" : `${enrolled}人`}
        </p>
      ) : null}
      {/* 年齢別の数の読み方が変わることがあるので、備考は数と一緒に必ず見せる */}
      {facility.note ? (
        <p className="mt-2 text-xs text-muted-foreground">{facility.note}</p>
      ) : null}
    </div>
  );
}
