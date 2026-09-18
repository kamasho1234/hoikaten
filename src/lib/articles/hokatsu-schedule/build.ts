import type { Article } from "../types";
import type { HokatsuRecord } from "./types";
import { getCityInfo } from "../../city-info";
import { getArticle } from "../index";
import { hasVacancyData } from "../../vacancy";

// 「◯◯市の保活スケジュール」記事を、レコード（公式ページの原文 quote 付き）から組み立てる。
// 日付や書類の値はレコード以外から書かない。値の無い項目は「公式ページに記載なし」と出す。

function esc(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function link(l: { label: string; url: string }): string {
  return `<a href="${esc(l.url)}" target="_blank" rel="noopener">${esc(l.label)}</a>`;
}

function formatDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  return `${y}年${m}月${d}日`;
}

function formatMonth(iso: string): string {
  const [y, m] = iso.split("-").map(Number);
  return `${y}年${m}月`;
}

const NONE = '<span class="text-muted-foreground">公式ページに記載なし。窓口で確認</span>';

function rows(pairs: [string, string | undefined][]): string {
  return pairs.map(([k, v]) => `<tr><th>${k}</th><td>${v ? esc(v) : NONE}</td></tr>`).join("\n");
}

/** 冒頭に出すときは最初の一文だけ */
function brief(v: string): string {
  return v.split("。")[0];
}

function list(items: string[] | undefined): string {
  return items && items.length > 0 ? `<ul>\n${items.map((i) => `<li>${esc(i)}</li>`).join("\n")}\n</ul>` : "";
}

export function buildHokatsuArticle(r: HokatsuRecord): Article {
  const info = getCityInfo(r.citySlug);
  if (!info) throw new Error(`${r.citySlug}: 自治体情報がありません`);
  const city = info.name;
  const isR9 = r.fiscalYear === "R9";
  const target = isR9 ? "令和9年4月（2027年4月）入園" : "令和8年4月（2026年4月）入園";
  const shurou = getArticle(r.citySlug, "shurou-shoumeisho") ?? getArticle(r.citySlug, "employment-certificate");

  const lead = isR9
    ? `${city}の${target}のスケジュールを、${formatDate(r.checkedAt)}に公式ページで確かめました。${r.firstApply ? `一次申込は<strong>${esc(brief(r.firstApply))}</strong>` : "一次申込の期間は下の表のとおり"}${r.firstResult ? `、結果の通知は<strong>${esc(brief(r.firstResult))}</strong>` : ""}です。この記事は${city}の案内に書いてある日付と書類だけを載せ、載っていない項目は「記載なし」としています。`
    : `${city}の令和9年4月入園の案内は、${formatDate(r.checkedAt)}時点ではまだ公式ページに出ていません。この記事は<strong>令和8年4月入園（前回）の実績</strong>を公式ページから載せたものです。令和9年4月入園も同じ時期に受付が始まることが多いので、目安にしつつ、案内が出たら必ず公式ページで日付を確かめてください。`;

  const scheduleTable = `<table>
<tbody>
${rows([
  ["案内・申込書の配布", r.guideRelease],
  ["一次申込の受付期間", r.firstApply],
  ["申込方法", r.applyMethods],
  ["一次結果の通知", r.firstResult],
  ["二次申込の受付期間", r.secondApply],
  ["二次結果の通知", r.secondResult],
  ["年度途中入園の締切", r.midYearDeadline],
])}
</tbody>
</table>`;

  const docs =
    r.documents && r.documents.length > 0
      ? `<h2>必要書類</h2>
<p>${city}の案内に書かれている書類です。就労証明書は勤務先に書いてもらうので、申込の1か月前には依頼しておきます。</p>
${list(r.documents)}
<p>就労証明書の書き方は<a href="/documents/shurou-shoumeisho-kinyurei">就労証明書の書き方（19項目の記入例）</a>${shurou ? `、${city}の様式と締切は<a href="/${r.citySlug}/articles/${shurou.slug}">${city}の就労証明書</a>` : ""}にまとめています。</p>`
      : `<h2>必要書類</h2>
<p>必要書類の一覧は${city}の案内ページで確かめてください。就労証明書の書き方は<a href="/documents/shurou-shoumeisho-kinyurei">就労証明書の書き方（19項目の記入例）</a>${shurou ? `、${city}の様式は<a href="/${r.citySlug}/articles/${shurou.slug}">${city}の就労証明書</a>` : ""}にまとめています。</p>`;

  const interview = r.interview
    ? `<h2>面接・健康診断・見学</h2>
<p>${esc(r.interview)}</p>`
    : "";

  const ikukyu = r.ikukyu
    ? `<h2>育休を延長したいとき</h2>
<p>${esc(r.ikukyu)}</p>
<p>育休延長と入園申込の関係は<a href="/${r.citySlug}/articles">${city}の記事一覧</a>の育休関連の記事も参照してください。</p>`
    : "";

  const notes =
    r.notes.length > 0
      ? `<h2>${city}で気をつけること</h2>
<p>${city}の案内に書かれている注意点です。</p>
${list(r.notes)}`
      : "";

  const content = `
<p>${lead}</p>

<h2>${city}の${target}の日程</h2>
<p>${city}の案内ページは ${link(r.page)} です。${isR9 ? "" : "下の日程は令和8年4月入園（前回）のものです。"}</p>
${scheduleTable}

<h2>申込までの動き方</h2>
<div class="step">
<div class="step-num">1</div>
<div class="step-content"><strong>案内が出たらすぐ読む</strong><p>${r.guideRelease ? esc(r.guideRelease) + "。" : `${city}の案内ページで配布時期を確かめます。`}申込期間・必要書類・希望園の書き方は年度で変わるので、前の年の案内で準備しないようにします。</p></div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content"><strong>園を見学して希望順を決める</strong><p>希望園は通勤経路と送迎時間で絞ります。${hasVacancyData(r.citySlug) ? `空き状況と競争の目安は<a href="/${r.citySlug}/vacancy">${city}の空き状況</a>で見られます。` : "各園の空き状況は自治体の公表資料で確かめます。"}</p></div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content"><strong>就労証明書を勤務先に依頼する</strong><p>${r.documents && r.documents.some((d) => /就労証明/.test(d)) ? "証明日や有効期限の条件は上の必要書類のとおりです。" : "証明日の条件は案内で確かめます。"}点数は勤務日数・時間の区分で決まるので、契約どおりの時間で書いてもらいます（<a href="/${r.citySlug}">${city}の点数シミュレーター</a>）。</p></div>
</div>
<div class="step">
<div class="step-num">4</div>
<div class="step-content"><strong>期間内に申し込む</strong><p>${r.firstApply ? `一次申込は${esc(r.firstApply)}。` : ""}${r.applyMethods ? esc(r.applyMethods) + "。" : ""}締切間際は窓口が混むので、電子申請や郵送の締切も確かめて早めに出します。</p></div>
</div>
<div class="step">
<div class="step-num">5</div>
<div class="step-content"><strong>結果を受け取り、保留なら二次へ</strong><p>${r.firstResult ? `一次の結果は${esc(r.firstResult)}。` : ""}${r.secondApply ? `二次申込は${esc(r.secondApply)}。` : "二次募集の有無と期間は案内で確かめます。"}保留になったときの選択肢は<a href="/${r.citySlug}/articles">${city}の記事一覧</a>にまとめています。</p></div>
</div>

${docs}
${interview}
${ikukyu}
${notes}

<h2>参照した公式情報</h2>
<ul>
${r.sources.map((s) => `<li>${link(s)}</li>`).join("\n")}
</ul>
<p class="text-sm text-muted-foreground">${formatDate(r.checkedAt)}時点の公式ページの内容です。日程は年度で変わるので、申込前に案内ページで最新の情報を確かめてください。</p>
`;

  const title = isR9
    ? `${city}の保活スケジュール｜令和9年4月入園の申込期間・結果通知・必要書類【${formatMonth(r.checkedAt)}確認】`
    : `${city}の保活スケジュール｜4月入園の申込期間・結果通知・必要書類（令和8年4月入園の実績）【${formatMonth(r.checkedAt)}確認】`;
  const description = isR9
    ? `${city}の令和9年4月（2027年4月）入園の一次申込期間、申込方法、結果通知の時期、二次募集、年度途中入園の締切、必要書類を${formatDate(r.checkedAt)}に公式ページで確認してまとめました。`
    : `${city}の4月入園の申込期間、申込方法、結果通知の時期、二次募集、必要書類を、令和8年4月入園の公式案内から${formatDate(r.checkedAt)}に確認してまとめました。令和9年4月入園の案内が出たら差し替えます。`;

  return {
    slug: "hokatsu-schedule",
    citySlug: r.citySlug,
    title,
    description,
    category: "保活の基本",
    categoryColor: "green",
    content,
    publishedAt: r.checkedAt,
  };
}
