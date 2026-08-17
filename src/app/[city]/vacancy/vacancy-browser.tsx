"use client";

import { useMemo, useState } from "react";
import type { VacancyFacility } from "@/lib/vacancy";
import { AGE_COUNT, AGE_LABELS, valueAt } from "@/lib/vacancy";

const ALL_WARDS = -1;
const INITIAL_LIMIT = 50;
const LIMIT_STEP = 50;

type SortKey = "vacancy" | "waiting" | "name";

const SORT_LABELS: Record<SortKey, string> = {
  vacancy: "空きが多い順",
  waiting: "入所待ちが少ない順",
  name: "施設名順",
};

const selectClass =
  "w-full appearance-none rounded-xl border border-border bg-card px-3 py-2.5 text-sm font-medium " +
  "focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/15 transition-colors";

const labelClass = "block text-xs font-medium text-muted-foreground mb-1.5";

const num = (n: number) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

/** リンク先が園そのものか、運営法人か、市のページかを利用者に伝える */
const SITE_LABELS: Record<NonNullable<VacancyFacility["site"]>["type"], string> = {
  facility: "公式サイト",
  corp: "運営法人のサイト",
  city: "横浜市のページ",
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
}: {
  facilities: VacancyFacility[];
  wards: string[];
}) {
  const [ward, setWard] = useState<number>(ALL_WARDS);
  const [age, setAge] = useState<number | null>(null);
  const [onlyVacant, setOnlyVacant] = useState(false);
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortKey>("vacancy");
  const [limit, setLimit] = useState(INITIAL_LIMIT);

  // 条件を変えたら表示件数を先頭に戻す
  const resetLimit = () => setLimit(INITIAL_LIMIT);

  const filtered = useMemo(() => {
    const q = query.trim();
    const list = facilities.filter((f) => {
      if (ward !== ALL_WARDS && f.w !== ward) return false;
      if (q && !f.name.includes(q)) return false;
      if (onlyVacant && (valueAt(f.vacancy, age) ?? 0) <= 0) return false;
      return true;
    });

    const sorted = [...list];
    if (sort === "name") {
      sorted.sort((a, b) => a.name.localeCompare(b.name, "ja"));
    } else if (sort === "waiting") {
      sorted.sort(
        (a, b) =>
          (valueAt(a.waiting, age) ?? 0) - (valueAt(b.waiting, age) ?? 0) ||
          (valueAt(b.vacancy, age) ?? 0) - (valueAt(a.vacancy, age) ?? 0)
      );
    } else {
      sorted.sort(
        (a, b) =>
          (valueAt(b.vacancy, age) ?? 0) - (valueAt(a.vacancy, age) ?? 0) ||
          (valueAt(a.waiting, age) ?? 0) - (valueAt(b.waiting, age) ?? 0)
      );
    }
    return sorted;
  }, [facilities, ward, age, onlyVacant, query, sort]);

  const vacantCount = useMemo(
    () => filtered.filter((f) => (valueAt(f.vacancy, age) ?? 0) > 0).length,
    [filtered, age]
  );

  const visible = filtered.slice(0, limit);

  return (
    <div>
      {/* 絞り込み */}
      <div className="rounded-2xl border border-border/60 bg-card p-4 space-y-4">
        <div className="grid grid-cols-2 gap-3">
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
              <option value={ALL_WARDS}>すべての区</option>
              {wards.map((w, i) => (
                <option key={w} value={i}>
                  {w}
                </option>
              ))}
            </select>
          </div>

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
            {(Object.keys(SORT_LABELS) as SortKey[]).map((key) => (
              <option key={key} value={key}>
                {SORT_LABELS[key]}
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
            条件に合う施設がありませんでした。区や年齢の条件をゆるめてみてください。
          </p>
        </div>
      ) : (
        <div className="space-y-2.5">
          {visible.map((f) => (
            <FacilityCard key={f.id} facility={f} ward={wards[f.w]} age={age} />
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
  age,
}: {
  facility: VacancyFacility;
  ward: string;
  age: number | null;
}) {
  const vacancy = valueAt(facility.vacancy, age);
  const waiting = valueAt(facility.waiting, age);
  const enrolled = valueAt(facility.enrolled, age);
  const hasVacancy = (vacancy ?? 0) > 0;

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
            <span className="inline-block text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
              {ward}
            </span>
            {facility.site && (
              <span className="inline-block text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                {SITE_LABELS[facility.site.type]}
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
            {vacancy === null ? "—" : vacancy}
          </p>
          <p className="text-xs text-muted-foreground tabular-nums">
            入所待ち {waiting === null ? "—" : `${waiting}人`}
          </p>
        </div>
      </div>

      {/* 年齢別の内訳（すべての年齢を選んでいるときだけ出す） */}
      {age === null ? (
        <div className="mt-3 grid grid-cols-6 gap-1.5">
          {Array.from({ length: AGE_COUNT }, (_, i) => {
            const v = facility.vacancy[i];
            return (
              <div
                key={i}
                className={`rounded-lg px-1 py-1.5 text-center ${
                  v === null
                    ? "bg-muted/40"
                    : v > 0
                      ? "bg-primary/10"
                      : "bg-muted/60"
                }`}
                title={
                  v === null
                    ? `${AGE_LABELS[i]}: クラスなし`
                    : `${AGE_LABELS[i]}: 空き${v} / 入所待ち${facility.waiting[i] ?? 0}人`
                }
              >
                <p className="text-[10px] text-muted-foreground leading-none">
                  {i}歳
                </p>
                <p
                  className={`text-sm font-bold tabular-nums leading-tight mt-0.5 ${
                    v !== null && v > 0 ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  {v === null ? "—" : v}
                </p>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="mt-2.5 text-xs text-muted-foreground tabular-nums">
          在籍 {enrolled === null ? "クラスなし" : `${enrolled}人`}
        </p>
      )}
    </div>
  );
}
