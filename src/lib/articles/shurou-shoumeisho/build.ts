import type { Article } from "../types";
import type { ShurouRecord } from "./types";
import { getCityInfo } from "../../city-info";
import { getMunicipalityData } from "../../data";

const FORM_LABEL: Record<ShurouRecord["formType"], string> = {
  standard: "国の標準的な様式",
  "standard-plus": "国の標準的な様式に自治体の欄を足したもの",
  original: "自治体独自の様式",
};

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

/** 就労時間で基本の点数を決める質問を、点数データから1つ選ぶ（保護者1の分） */
function employmentOptions(slug: string) {
  const data = getMunicipalityData(slug);
  if (!data) return undefined;
  const q =
    data.questions.find((q) => /employment/.test(q.id) && !/2|father|parent2/.test(q.id)) ??
    data.questions.find((q) => q.label.includes("就労") && q.options.length >= 3);
  if (!q || q.options.length < 3) return undefined;
  return q;
}

export function buildShurouArticle(r: ShurouRecord): Article {
  const info = getCityInfo(r.citySlug);
  if (!info) throw new Error(`${r.citySlug}: 自治体情報がありません`);
  const city = info.name;
  const isOriginal = r.formType !== "standard";

  const rows: [string, string | undefined][] = [
    ["様式", FORM_LABEL[r.formType]],
    [
      "押印",
      r.seal === "required"
        ? `必要${r.sealNote ? `（${r.sealNote}）` : ""}`
        : r.seal === "not-required"
          ? `不要${r.sealNote ? `（${r.sealNote}）` : ""}`
          : undefined,
    ],
    ["証明日の有効期限", r.validity],
    ["提出締切", r.deadline],
    ["提出先", r.submitTo],
    ["電子申請", r.online],
    ["きょうだいの兼用", r.siblings],
  ];
  const table = rows
    .map(
      ([k, v]) =>
        `<tr><th>${k}</th><td>${v ? esc(v) : '<span class="text-muted-foreground">公式ページに記載なし。窓口で確認</span>'}</td></tr>`,
    )
    .join("\n");

  const q = employmentOptions(r.citySlug);
  const pointsSection = q
    ? `
<h2>${city}の就労時間と点数</h2>
<p>証明書の「就労時間」の欄を、${city}は次の刻みで点数にします（保護者1人分）。${
      q.options.filter((o) => o.points > 0).every((o) => /月\s*\d+.*時間/.test(o.label) && !/1日/.test(o.label))
        ? "週の時間で契約している人は、国の記載要領どおり4倍した時間が証明書に書かれるので、その値がどの刻みに入るかを見てください。"
        : "証明書に書かれた就労日数と就労時間が、どの刻みに入るかを見てください。"
    }</p>
<table>
<thead><tr><th>就労時間</th><th>点数</th></tr></thead>
<tbody>
${q.options
  .filter((o) => o.points !== 0 || !/あてはまらない|該当しない|なし/.test(o.label))
  .map((o) => `<tr><td>${esc(o.label.replace(/[（(]\s*[-+]?\d+(?:\.\d+)?\s*点\s*[）)]\s*$/, ""))}</td><td>${o.points}点</td></tr>`)
  .join("\n")}
</tbody>
</table>
<p>ほかの加点・減点と合わせた世帯の点数は<a href="/${r.citySlug}">${city}の点数シミュレーター</a>で計算できます。</p>
`
    : "";

  const differences =
    isOriginal && r.differences && r.differences.length > 0
      ? `
<h2>国の標準様式との違い</h2>
<p>${city}の様式で、こども家庭庁の標準的な様式（19項目）と違うところです。</p>
<ul>
${r.differences.map((d) => `<li>${esc(d)}</li>`).join("\n")}
</ul>
`
      : "";

  const notes =
    r.notes.length > 0
      ? `
<h2>${city}で気をつけること</h2>
<p>${city}の記入例・案内に書かれている注意点です。</p>
<ul>
${r.notes.map((n) => `<li>${esc(n)}</li>`).join("\n")}
</ul>
`
      : "";

  const selfEmployed =
    r.selfEmployedDocs && r.selfEmployedDocs.length > 0
      ? `
<h2>自営業・フリーランスの添付書類</h2>
<p>自分で証明する人が就労証明書に添えるものとして、${city}が挙げている書類です。</p>
<ul>
${r.selfEmployedDocs.map((d) => `<li>${esc(d)}</li>`).join("\n")}
</ul>
<p>添付書類の考え方は<a href="/documents/shurou-shoumeisho-jieigyou">自営業・フリーランスの就労証明書</a>にまとめています。</p>
`
      : "";

  const files =
    r.formFiles && r.formFiles.length > 0
      ? `<ul>\n${r.formFiles.map((f) => `<li>${link(f)}</li>`).join("\n")}\n</ul>`
      : "";

  const lead = isOriginal
    ? `${city}の就労証明書は、${formatDate(r.checkedAt)}時点で<strong>${FORM_LABEL[r.formType]}</strong>です。こども家庭庁の標準的な様式とは欄が違うので、勤務先に頼むときは必ず${city}の様式を渡してください。`
    : `${city}の就労証明書は、${formatDate(r.checkedAt)}時点で<strong>こども家庭庁の標準的な様式</strong>です。勤務先が国のExcel版で作ったものも同じ様式ですが、配布ページの最新版を渡すのが確実です。`;

  const content = `
<p>${lead}</p>

<div class="info-box"><p><strong>様式の入手先</strong>: ${link(r.formPage)}</p>${files}</div>

<h2>${city}の提出ルール</h2>
<p>${formatDate(r.checkedAt)}に${city}の公式ページで確かめた内容です。空欄は公式ページに書かれていなかった項目で、申込のしおりや窓口で確認してください。</p>
<table>
<tbody>
${table}
</tbody>
</table>
${differences}${pointsSection}${notes}
<h2>書き方の共通ルール</h2>
<p>${isOriginal ? `${city}の様式にも注意書きが付いています。まずそれに従い、国の標準様式の記載要領は考え方の参考にしてください。国の記載要領で勤務先が迷いやすい点は次の3つです。` : "欄ごとの書き方は国の記載要領で決まっています。勤務先に伝えておきたい要点は次の3つです。"}</p>
<ul>
<li>就労時間は<strong>雇用契約上の時間</strong>で、休憩を含み残業を除く。週の時間で契約しているなら4倍して月の時間にする</li>
<li>時短勤務中は、制度を使う<strong>前</strong>の時間を就労時間の欄に、時短後の時間帯を短時間勤務制度の欄に書く</li>
<li>直近3か月の就労実績は、有給休暇の日を日数に含め、残業を時間数に含める</li>
</ul>
<p>証明者欄からNo.19までの書き方は<a href="/documents/shurou-shoumeisho-kinyurei">就労証明書の記入例（標準様式19項目）</a>で1つずつ説明しています。勤務先への頼み方は<a href="/documents/shurou-shoumeisho-kakikata">書き方と勤務先への頼み方</a>を参照してください。</p>
${selfEmployed}
<h2>参照した公式情報</h2>
<ul>
${r.sources.map((s) => `<li>${link(s)}</li>`).join("\n")}
</ul>
<p class="text-sm text-muted-foreground">${formatDate(r.checkedAt)}時点の公式ページの内容です。様式や締切は年度ごとに変わるので、提出前に配布ページで最新版を確かめてください。</p>
`;

  return {
    slug: r.slug ?? "shurou-shoumeisho",
    citySlug: r.citySlug,
    title: `${city}の就労証明書｜様式の入手先・押印・有効期限・締切【${formatMonth(r.checkedAt)}確認】`,
    description: `${city}の就労証明書は${FORM_LABEL[r.formType]}。様式の配布ページ、押印の要否、証明日の有効期限、提出締切、電子申請の可否を${formatDate(r.checkedAt)}に公式ページで確認してまとめました。就労時間の刻みと点数も掲載。`,
    category: "必要書類",
    categoryColor: "blue",
    content,
    publishedAt: r.checkedAt,
  };
}
