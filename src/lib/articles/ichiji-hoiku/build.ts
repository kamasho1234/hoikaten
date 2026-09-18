import type { Article } from "../types";
import type { IchijiRecord } from "./types";
import { getCityInfo } from "../../city-info";

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

function list(items: string[] | undefined): string {
  return items && items.length > 0 ? `<ul>\n${items.map((i) => `<li>${esc(i)}</li>`).join("\n")}\n</ul>` : "";
}

export function buildIchijiArticle(r: IchijiRecord): Article {
  const info = getCityInfo(r.citySlug);
  if (!info) throw new Error(`${r.citySlug}: 自治体情報がありません`);
  const city = info.name;
  const hasDaredemo = Boolean(r.daredemoPage || r.daredemoHours || r.daredemoStatus);

  // 冒頭の結論。取れた事実だけを並べる
  const leadBits: string[] = [];
  // 長い値は表に任せ、冒頭には短い値だけ出す
  const short = (v?: string) => (v && v.length <= 50 ? v : undefined);
  if (short(r.azukariLimit)) leadBits.push(`一時預かりの上限は${esc(r.azukariLimit!)}`);
  if (short(r.azukariFees?.[0])) leadBits.push(`料金は${esc(r.azukariFees![0])}`);
  if (short(r.daredemoHours)) leadBits.push(`こども誰でも通園制度は${esc(r.daredemoHours!)}`);
  const lead =
    leadBits.length > 0
      ? `${city}の一時保育を、${formatDate(r.checkedAt)}に公式ページで確かめました。${leadBits.join("、")}。詳しい区分と条件は下の表のとおりです。`
      : `${city}の一時保育を、${formatDate(r.checkedAt)}に公式ページで確かめました。取れた事実だけを載せ、公式ページに書かれていない項目は「記載なし」としています。`;

  const fees =
    r.azukariFees && r.azukariFees.length > 0
      ? `<h3>料金</h3>\n${list(r.azukariFees)}${r.azukariReduction ? `<p>減免: ${esc(r.azukariReduction)}</p>` : ""}`
      : `<h3>料金</h3>\n<p>${NONE}</p>`;

  const daredemo = hasDaredemo
    ? `
<h2>${city}のこども誰でも通園制度</h2>
<p>2026年度から全国で始まった、就労要件を問わず月一定時間まで使える制度です（0歳6か月〜3歳未満の未就園児）。国の給付の上限は月10時間ですが、自治体が独自に時間を上乗せしていたり（東京23区に多い）、令和8・9年度は条例で3〜10時間の範囲に定めていたりするので、${city}の時間を確かめてください。</p>
${r.daredemoPage ? `<div class="info-box"><p><strong>案内ページ</strong>: ${link(r.daredemoPage)}</p></div>` : ""}
<table>
<tbody>
${rows([
  ["月の利用可能時間", r.daredemoHours],
  ["利用料", r.daredemoFee],
  ["対象", r.daredemoAges],
  ["認定の申請・予約", r.daredemoApply],
  ["実施施設", r.daredemoFacilities],
  ["実施状況", r.daredemoStatus],
])}
</tbody>
</table>
<p>制度そのものの説明は<a href="/documents/kodomo-daredemo-tsuen">こども誰でも通園制度｜月10時間・就労要件なし</a>にまとめています。</p>
`
    : `
<h2>${city}のこども誰でも通園制度</h2>
<p>2026年度から全国の自治体で実施されている制度ですが、${formatDate(r.checkedAt)}時点では${city}の案内ページを確認できませんでした。制度の中身は<a href="/documents/kodomo-daredemo-tsuen">こども誰でも通園制度｜月10時間・就労要件なし</a>を参照し、${city}での実施状況は窓口で確かめてください。</p>
`;

  const others =
    r.otherServices && r.otherServices.length > 0
      ? `
<h2>ほかの預け先</h2>
<p>${city}の公式ページに案内がある、一時預かり以外の預け先です。</p>
${list(r.otherServices)}
`
      : "";

  const notes =
    r.notes.length > 0
      ? `
<h2>${city}で気をつけること</h2>
<p>${city}の案内に書かれている注意点です。</p>
${list(r.notes)}
`
      : "";

  const content = `
<p>${lead}</p>

<h2>${city}の一時預かり</h2>
<p>保育園に通っていない子どもを、必要なときだけ預けられる事業です。${city}の案内ページは ${link(r.azukariPage)} です。</p>
<table>
<tbody>
${rows([
  ["使える理由", r.azukariReasons],
  ["リフレッシュ利用", r.azukariRefresh],
  ["利用の上限", r.azukariLimit],
  ["対象年齢", r.azukariAges],
  ["事前登録", r.azukariRegistration],
  ["予約", r.azukariBooking],
  ["実施施設", r.azukariFacilities],
])}
</tbody>
</table>
${fees}
${daredemo}${others}${notes}
<h2>使い分けの考え方</h2>
<ul>
<li>理由がはっきりしていて日数を使いたい（通院・冠婚葬祭・不定期の仕事）→ <strong>一時預かり</strong></li>
<li>理由を問わず、子どもを家庭以外の場に慣れさせたい・毎月少しずつ使いたい → <strong>こども誰でも通園制度</strong>（月の時間枠の中で）</li>
<li>送迎や短時間、施設の空きが無いとき → ファミリー・サポート・センター</li>
</ul>
<p>登録の流れと必要書類は<a href="/documents/ichiji-azukari-jigyou">一時預かりの登録</a>、理由の区分・上限・料金の決まり方は<a href="/documents/ichiji-azukari-tsukaikata">一時預かりの使い方</a>にまとめています。</p>

<h2>参照した公式情報</h2>
<ul>
${r.sources.map((s) => `<li>${link(s)}</li>`).join("\n")}
</ul>
<p class="text-sm text-muted-foreground">${formatDate(r.checkedAt)}時点の公式ページの内容です。料金や上限は年度で変わるので、利用前に案内ページで最新の情報を確かめてください。</p>
`;

  return {
    slug: "ichiji-hoiku",
    citySlug: r.citySlug,
    title: `${city}の一時保育｜一時預かりの上限・料金・予約と、こども誰でも通園制度の時間【${formatMonth(r.checkedAt)}確認】`,
    description: `${city}の一時預かり（使える理由・利用の上限・料金・登録と予約・実施施設）と、2026年度から始まったこども誰でも通園制度（月の利用可能時間・利用料・申込方法）を${formatDate(r.checkedAt)}に公式ページで確認してまとめました。`,
    category: "一時保育",
    categoryColor: "teal",
    content,
    publishedAt: r.checkedAt,
  };
}
