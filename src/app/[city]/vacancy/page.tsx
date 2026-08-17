import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getMunicipalityData } from "@/lib/data";
import { breadcrumbList, faqPage, type FaqItem } from "@/lib/jsonld";
import { prefectureNameToSlug } from "@/lib/prefecture";
import {
  AGE_LABELS,
  formatJapaneseDate,
  formatRatio,
  getVacancyData,
  getVacancySlugs,
  hasMetric,
  summarizeByAge,
  summarizeByCategory,
  summarizeByWard,
  totalSummary,
  type GroupSummary,
} from "@/lib/vacancy";
import { VacancyBrowser } from "./vacancy-browser";

export function generateStaticParams() {
  return getVacancySlugs().map((city) => ({ city }));
}

/** 空き状況データを持たない自治体では生成しない */
export const dynamicParams = false;

const num = (n: number) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>;
}): Promise<Metadata> {
  const { city } = await params;
  const vacancy = getVacancyData(city);
  if (!vacancy) return {};

  const name = vacancy.municipalityName;
  const asOf = formatJapaneseDate(vacancy.asOf);
  const total = totalSummary(vacancy);
  const hasWaiting = hasMetric(vacancy, "waiting");
  const axis = vacancy.wards.length > 0 ? "区と年齢" : "年齢と施設の種類";

  return {
    title: `${name}の保育園 空き状況【${asOf}時点】｜${axis}でさがす【hoikaten】`,
    description: hasWaiting
      ? `${name}が公開する保育所等の入所状況（${asOf}時点）をもとに、${num(total.facilityCount)}施設の受入可能数・入所待ち人数を${axis}で絞り込んで探せます。空きがある施設だけの表示にも対応。`
      : `${name}が公開する保育施設の空き状況（${asOf}時点）をもとに、${num(total.facilityCount)}施設の空き枠を${axis}で絞り込んで探せます。空きがある施設だけの表示にも対応。`,
    alternates: {
      canonical: `https://hoikaten.com/${city}/vacancy`,
    },
  };
}

export default async function VacancyPage({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  const { city } = await params;
  const vacancy = getVacancyData(city);
  if (!vacancy) notFound();

  const data = getMunicipalityData(city);
  const name = vacancy.municipalityName;
  const asOfLabel = formatJapaneseDate(vacancy.asOf);
  const prefName = data?.municipality.prefecture;
  const prefSlug = prefName ? prefectureNameToSlug(prefName) : undefined;

  const hasWaiting = hasMetric(vacancy, "waiting");
  const hasWards = vacancy.wards.length > 0;
  const hasCategories = (vacancy.categories?.length ?? 0) > 0;

  const byAge = summarizeByAge(vacancy);
  const total = totalSummary(vacancy);
  const siteCount = vacancy.facilities.filter((f) => f.site).length;

  // 区がある自治体は区別、無い自治体は施設類型別に集計して同じ表で見せる
  const groups: GroupSummary[] = hasWards
    ? summarizeByWard(vacancy)
    : hasCategories
      ? summarizeByCategory(vacancy)
      : [];
  const groupLabel = hasWards ? "区" : "施設の種類";
  const groupHeading = hasWards
    ? "区別の空き状況（全年齢）"
    : "施設の種類別の空き状況（全年齢）";
  // 分類なしの施設があると表の合計と市全体が合わないので、その旨を書く
  const ungrouped = hasWards
    ? 0
    : vacancy.facilities.filter((f) => f.c === null || f.c === undefined).length;

  // 空きが申込を上回っている年齢（3歳以上で起きる）
  const surplusAges = hasWaiting
    ? byAge.filter((a) => a.waiting !== null && a.vacancy > a.waiting)
    : [];
  const tightestAge = [...byAge]
    .filter((a) => a.ratio !== null)
    .sort((a, b) => (b.ratio ?? 0) - (a.ratio ?? 0))[0];
  // 入所待ちが無い自治体では「空きが少ない年齢」を代わりに示す
  const scarcestAge = [...byAge].sort((a, b) => a.vacancy - b.vacancy)[0];

  const faqItems: FaqItem[] = [
    ...(hasWaiting
      ? [
          {
            question: `${name}の「受入可能数」「入所待ち人数」とは何ですか？`,
            answer:
              `${name}の定義では、受入可能数は「保育所等が受け入れられる余裕のある定員枠」、入所児童数は「実際に保育所等に入所している児童の数」です。` +
              `入所待ち人数は「園ごとの申請数」で、1人が複数園を希望した場合は希望した各園の待ち人数にそれぞれ反映されます。` +
              `そのため入所待ち人数の合計は、入園を待っている実際の人数とは一致しません。`,
          },
        ]
      : []),
    {
      question: `${name}で空きがある保育園なら必ず入園できますか？`,
      answer:
        `いいえ。認可保育所等は空き枠に対して申込が複数あった場合、利用調整（点数）の高い世帯から入園が決まります。` +
        (hasWaiting && total.waiting !== null
          ? `${asOfLabel}時点では、${name}全体で空き枠${num(total.vacancy)}に対して申込が${num(total.waiting)}件あり、` +
            (tightestAge
              ? `もっとも申込が集中している${AGE_LABELS[tightestAge.age]}では空き1枠あたり${formatRatio(tightestAge.ratio)}の申込があります。`
              : "")
          : `${asOfLabel}時点では、${name}全体の空き枠は${num(total.vacancy)}で、${num(total.facilitiesWithVacancy)}施設に空きがあります。` +
            (scarcestAge
              ? `もっとも空きが少ないのは${AGE_LABELS[scarcestAge.age]}で${num(scarcestAge.vacancy)}枠です。`
              : "")) +
        `点数の目安は${name}の入園点数シミュレーターで確認できます。`,
    },
    {
      question: `このページの空き状況はいつのデータですか？`,
      answer:
        `${vacancy.sourceName}の${asOfLabel}時点のデータです。` +
        `当サイトは公開を検知して自動で更新しています。申込状況により空き枠は日々変動するため、最新の状況は${name}の公式ページでご確認ください。`,
    },
    {
      question: `${name}で0歳児・1歳児の空きが少ないのはなぜですか？`,
      answer: hasWaiting
        ? `${asOfLabel}時点のデータでは、${AGE_LABELS[0]}は空き枠${num(byAge[0].vacancy)}に対して申込${num(byAge[0].waiting ?? 0)}件、` +
          `${AGE_LABELS[1]}は空き枠${num(byAge[1].vacancy)}に対して申込${num(byAge[1].waiting ?? 0)}件と、低年齢ほど申込が空き枠を大きく上回っています。` +
          (surplusAges.length > 0
            ? `一方で${surplusAges.map((a) => AGE_LABELS[a.age]).join("・")}は空き枠が申込を上回っており、年齢によって状況が大きく異なります。`
            : "")
        : `${asOfLabel}時点のデータでは、${AGE_LABELS[0]}の空きが${num(byAge[0].vacancy)}枠、${AGE_LABELS[1]}が${num(byAge[1].vacancy)}枠なのに対し、` +
          `${AGE_LABELS[4]}は${num(byAge[4].vacancy)}枠、${AGE_LABELS[5]}は${num(byAge[5].vacancy)}枠です。` +
          `低年齢のクラスは定員そのものが小さく、いったん入園した子がそのまま在籍し続けるため、年度途中の空きが出にくくなります。`,
    },
    {
      question: `一覧で「—」と表示されている施設は何ですか？`,
      answer:
        `その年齢のクラス自体を設けていない施設です。空きが0であることを示す「0」とは区別して表示しています。` +
        `小規模保育事業など、受け入れる年齢が限られる施設で表示されます。`,
    },
  ];

  const breadcrumbJsonLd = breadcrumbList([
    { name: "ホーム", path: "/" },
    ...(prefSlug && prefName
      ? [{ name: prefName, path: `/prefecture/${prefSlug}` }]
      : []),
    { name, path: `/${city}` },
    { name: "保育園の空き状況", path: `/${city}/vacancy` },
  ]);
  const faqJsonLd = faqPage(faqItems);

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* パンくず */}
      <nav className="text-sm text-muted-foreground mb-6 flex items-center gap-2 flex-wrap">
        <a href="/" className="hover:underline hover:text-primary">
          ホーム
        </a>
        <span>/</span>
        {prefSlug && prefName && (
          <>
            <a
              href={`/prefecture/${prefSlug}`}
              className="hover:underline hover:text-primary"
            >
              {prefName}
            </a>
            <span>/</span>
          </>
        )}
        <a href={`/${city}`} className="hover:underline hover:text-primary">
          {name}
        </a>
        <span>/</span>
        <span>空き状況</span>
      </nav>

      <div className="hero-pattern rounded-2xl py-8 px-4 text-center mb-6 -mx-4 sm:mx-0">
        <h1
          className="text-2xl font-bold mb-2"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          {name}の保育園 空き状況
        </h1>
        <p className="text-muted-foreground">
          {name}内{num(total.facilityCount)}施設の空き枠を、
          {hasWards ? "区と年齢" : "年齢と施設の種類"}でさがせます
        </p>
        <p className="text-xs text-muted-foreground mt-1.5">
          {name}公式データ（{asOfLabel}時点）
        </p>
      </div>

      {/* 全体のサマリー */}
      <section className="mb-8">
        <h2
          className="text-lg font-bold mb-1"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          年齢別の空き状況（{name}全体）
        </h2>
        <p className="text-xs text-muted-foreground mb-4">
          {hasWaiting
            ? "空き1枠あたりの申込数 ＝ 入所待ち人数 ÷ 受入可能数"
            : `${asOfLabel}時点で受け入れられる枠の数です`}
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
          {byAge.map((a) => {
            const tight = a.ratio !== null && a.ratio >= 1;
            return (
              <div
                key={a.age}
                className="rounded-xl border border-border/60 bg-card p-3.5"
              >
                <p className="text-sm font-bold mb-2">{AGE_LABELS[a.age]}</p>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-2xl font-bold text-primary tabular-nums leading-none">
                    {num(a.vacancy)}
                  </span>
                  <span className="text-xs text-muted-foreground">枠の空き</span>
                </div>
                {a.waiting !== null && (
                  <p className="text-xs text-muted-foreground mt-1.5 tabular-nums">
                    申込 {num(a.waiting)}件
                  </p>
                )}
                {a.ratio !== null ? (
                  <p
                    className={`text-xs mt-2 pt-2 border-t border-border/50 tabular-nums ${
                      tight ? "text-primary font-medium" : "text-muted-foreground"
                    }`}
                  >
                    1枠あたり {formatRatio(a.ratio)}
                  </p>
                ) : (
                  <p className="text-xs mt-2 pt-2 border-t border-border/50 tabular-nums text-muted-foreground">
                    {num(a.facilitiesWithVacancy)}施設に空きあり
                  </p>
                )}
              </div>
            );
          })}
        </div>

        {vacancy.waitingCaveat && (
          <div className="mt-3 rounded-xl bg-muted/50 p-3.5">
            <p className="text-xs text-muted-foreground leading-relaxed">
              {vacancy.waitingCaveat}
            </p>
          </div>
        )}
      </section>

      {/* 施設一覧 */}
      <section className="mb-10">
        <h2
          className="text-lg font-bold mb-4"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          施設ごとの空き状況
        </h2>
        <VacancyBrowser
          facilities={vacancy.facilities}
          wards={vacancy.wards}
          categories={vacancy.categories ?? []}
          hasWaiting={hasWaiting}
          hasEnrolled={hasMetric(vacancy, "enrolled")}
        />
      </section>

      {/* 区別／施設の種類別サマリー */}
      {groups.length > 0 && (
        <section className="mb-10">
          <h2
            className="text-lg font-bold mb-4"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {groupHeading}
          </h2>
          <div className="overflow-x-auto -mx-4 sm:mx-0">
            <table className="w-full text-sm min-w-[520px] px-4 sm:px-0">
              <thead>
                <tr className="border-b border-border text-left">
                  <th className="py-2.5 px-3 font-medium">{groupLabel}</th>
                  <th className="py-2.5 px-3 font-medium text-right">施設数</th>
                  <th className="py-2.5 px-3 font-medium text-right">
                    空きあり
                  </th>
                  <th className="py-2.5 px-3 font-medium text-right">空き枠</th>
                  {hasWaiting && (
                    <>
                      <th className="py-2.5 px-3 font-medium text-right">申込</th>
                      <th className="py-2.5 px-3 font-medium text-right">
                        1枠あたり
                      </th>
                    </>
                  )}
                </tr>
              </thead>
              <tbody>
                {groups.map((g) => (
                  <tr
                    key={g.name}
                    className="border-b border-border/50 hover:bg-muted/30 transition-colors"
                  >
                    <td className="py-2.5 px-3 font-medium whitespace-nowrap">
                      {g.name}
                    </td>
                    <td className="py-2.5 px-3 text-right tabular-nums text-muted-foreground">
                      {g.facilityCount}
                    </td>
                    <td className="py-2.5 px-3 text-right tabular-nums text-muted-foreground">
                      {g.facilitiesWithVacancy}
                    </td>
                    <td className="py-2.5 px-3 text-right tabular-nums font-bold text-primary">
                      {num(g.vacancy)}
                    </td>
                    {hasWaiting && (
                      <>
                        <td className="py-2.5 px-3 text-right tabular-nums text-muted-foreground">
                          {num(g.waiting ?? 0)}
                        </td>
                        <td className="py-2.5 px-3 text-right tabular-nums">
                          {formatRatio(g.ratio)}
                        </td>
                      </>
                    )}
                  </tr>
                ))}
                <tr className="border-b-2 border-border font-bold">
                  <td className="py-2.5 px-3 whitespace-nowrap">{name}全体</td>
                  <td className="py-2.5 px-3 text-right tabular-nums">
                    {num(total.facilityCount)}
                  </td>
                  <td className="py-2.5 px-3 text-right tabular-nums">
                    {num(total.facilitiesWithVacancy)}
                  </td>
                  <td className="py-2.5 px-3 text-right tabular-nums text-primary">
                    {num(total.vacancy)}
                  </td>
                  {hasWaiting && (
                    <>
                      <td className="py-2.5 px-3 text-right tabular-nums">
                        {num(total.waiting ?? 0)}
                      </td>
                      <td className="py-2.5 px-3 text-right tabular-nums">
                        {formatRatio(total.ratio)}
                      </td>
                    </>
                  )}
                </tr>
              </tbody>
            </table>
          </div>
          {ungrouped > 0 && (
            <p className="text-xs text-muted-foreground mt-2">
              {name}が施設の種類を公表していない{ungrouped}
              施設は、この表には含めていません（一覧には表示されます）。
            </p>
          )}
        </section>
      )}

      {/* シミュレーターへの導線 */}
      {data && (
        <section className="mb-10">
          <a
            href={`/${city}`}
            className="block rounded-2xl border border-border/60 bg-card p-5 hover:border-primary/40 hover:shadow-sm transition-all group"
          >
            <p className="text-sm font-bold group-hover:text-primary transition-colors mb-1">
              {name}の保育園 入園点数シミュレーター
            </p>
            <p className="text-xs text-muted-foreground leading-relaxed">
              空きがあっても、申込が重なれば点数の高い世帯から入園が決まります。
              かんたんな質問に答えるだけで、{name}の基準での点数の目安がわかります。
            </p>
          </a>
        </section>
      )}

      {/* よくある質問 */}
      <section className="mb-10">
        <h2
          className="text-lg font-bold mb-4"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          {name}の保育園の空き状況に関するよくある質問
        </h2>
        <div className="space-y-3">
          {faqItems.map((faq, i) => (
            <details
              key={i}
              className="group rounded-xl border border-border/60 bg-card p-4"
            >
              <summary className="cursor-pointer list-none font-medium text-sm flex items-start gap-2">
                <span className="text-primary flex-shrink-0">Q.</span>
                <span className="flex-1">{faq.question}</span>
                <span className="text-muted-foreground text-xs mt-0.5 group-open:rotate-180 transition-transform flex-shrink-0">
                  ▼
                </span>
              </summary>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed pl-6">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </section>

      {/* 出典 */}
      <section className="rounded-xl border border-border/60 bg-muted/30 p-4">
        <h2 className="text-sm font-bold mb-2">このページのデータについて</h2>
        <ul className="text-xs text-muted-foreground space-y-1.5 leading-relaxed">
          <li>
            出典:{" "}
            <a
              href={vacancy.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              {vacancy.sourceName}
            </a>
            （{asOfLabel}時点。当サイトの取得日 {formatJapaneseDate(vacancy.fetchedAt)}）
          </li>
          <li>
            {hasWaiting
              ? "公開されている受入可能数・入所待ち人数・入所児童数のデータを施設ごとに結合し、そのままの数値を掲載しています。「空き1枠あたりの申込数」のみ当サイトで算出したものです（入所待ち人数 ÷ 受入可能数）。"
              : "公開されている空き状況のデータを、そのままの数値で掲載しています。年齢別・施設の種類別の集計のみ当サイトで行っています。"}
          </li>
          {(vacancy.notes ?? []).map((note, i) => (
            <li key={i}>{note}</li>
          ))}
          {siteCount > 0 && (
            <li>
              施設名のリンク先は、当サイトが各施設のサイトを調べて掲載したものです（{siteCount}
              施設）。リンク先が園そのもののサイトか、運営法人のサイトか、{name}
              のページかを施設名の横に表示しています。公式サイトを確認できなかった施設はリンクを付けていません。
            </li>
          )}
          <li>
            空き枠は申込状況により日々変動します。申込にあたっては必ず{name}の公式ページ・窓口で最新の情報をご確認ください。
          </li>
        </ul>
      </section>
    </div>
  );
}
