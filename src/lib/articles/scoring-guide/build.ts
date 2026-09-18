import type { Article } from "../types";
import type { MunicipalityData, Question, QuestionOption, ScoringMethod } from "../../types";
import { getCityInfo } from "../../city-info";
import { getMunicipalityData } from "../../data";
import { calculateScore } from "../../scoring/engine";
import sources from "./sources.json";
import legacy from "./legacy.json";

// 「◯◯市の入園点数のしくみ」記事を、シミュレーターの点数データ（src/lib/data/<slug>.ts）から組み立てる。
// 数字と選択肢の文言はすべてデータから取る。データに無いことは書かない。

type Source = { url: string; urls: string[]; label: string; applies: string | null };
type Legacy = { slug: string; title: string | null; publishedAt: string | null; popularity: number | null };

const SOURCES = sources as Record<string, Source>;
const LEGACY = legacy as Record<string, Legacy>;

export const CHECKED_AT = "2026-09-18";

function esc(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function fmt(n: number): string {
  return Number.isInteger(n) ? String(n) : String(Math.round(n * 10) / 10);
}

function signed(n: number): string {
  return n > 0 ? `+${fmt(n)}` : fmt(n);
}

/** 質問の文言から「保護者1」「（調整指数）」などの画面向けの飾りを外す */
function cleanLabel(label: string): string {
  return label
    .replace(/^保護者[12１２]\s*[:：]?\s*/, "")
    .replace(/^(父|母|保護者)[:：]\s*/, "")
    .replace(/保護者[12１２]/g, "保護者")
    .replace(/[（(]調整(指数|点数)[)）]/g, "")
    .replace(/[（(]必須[)）]/g, "")
    .trim();
}

/** 質問文（「生活保護を受けていますか？」）を項目名（「生活保護」）にする */
function noun(label: string): string {
  let t = cleanLabel(label).replace(/[（(][^）)]*[）)]\s*$/, "").replace(/[？?]+$/, "").replace(/[（(][^）)]*[）)]\s*$/, "").trim();
  const rules: [RegExp, string][] = [
    [/^(.+?)から(の)?復帰(する)?予定ですか$/, "$1からの復帰"],
    [/^(.+?)(を受給|を受け)ていますか$/, "$1"],
    [/^(.+?)(に月ぎめで|に月極で|に)預けていますか$/, "$1の利用"],
    [/^(.+?)を利用していますか$/, "$1の利用"],
    [/^(.+?)(を同時に申し込みますか|と同時に入所を希望しますか|と同時に申し込みますか)$/, "$1の同時申込"],
    [/^(.+?)を希望していますか$/, "$1の希望"],
    [/^(.+?)(を滞納していますか|の滞納がありますか)$/, "$1の滞納"],
    [/^(.+?)(が保育できる状態ですか|に子どもの面倒を見られる方がいますか|に子どもを預けられますか|に預けられますか)$/, "$1"],
    [/^(.+?)の状況は$/, "$1"],
    [/^(.+?)がありますか$/, "$1あり"],
    [/^(.+?)がいますか$/, "$1あり"],
    [/^(.+?)に該当しますか$/, "$1"],
    [/^(.+?)できますか$/, "$1できるか"],
    [/^(.+?)ありませんか$/, "$1ないか"],
    [/^(.+?)いますか$/, "$1いる"],
    [/^(.+?)(していますか|しましたか|していましたか)$/, "$1"],
    [/^(.+?)ですか$/, "$1"],
    [/^(.+?)ますか$/, "$1"],
    [/^(.+?)は$/, "$1"],
  ];
  for (const [re, rep] of rules) {
    if (re.test(t)) {
      t = t.replace(re, rep);
      break;
    }
  }
  return t;
}

/** 選択肢の文言から末尾の「（+6点）」のような点数表記を外す（点数は別の列に出す） */
function optLabel(o: QuestionOption): string {
  return o.label.replace(/[\s　]*[（(][+＋−\-]?\d+(\.\d+)?[\s　]*点?[)）][\s　]*$/, "");
}

/** FAQ の答えに使う条件の言い方（「はい」だけの選択肢は「該当する場合」にする） */
function cond(o: QuestionOption): string {
  const l = optLabel(o);
  return /^(はい|該当|あり|あてはまる)$/.test(l) ? "該当する場合" : `「${l}」の場合`;
}

function isNoneOption(o: QuestionOption): boolean {
  return o.points === 0 && /あてはまらない|該当なし|該当しない|いいえ|なし$|^なし|利用していない|受けていない|していない|ない$/.test(o.label);
}

/** 理由を選ぶだけの質問（全選択肢0点で、選択肢が他の質問を指す） */
function isReasonSelector(q: Question): boolean {
  return /_reason$/.test(q.id) && q.options.every((o) => o.points === 0);
}

type Sub = { q: Question; heading: string };

/** 保護者1の基本点数の質問を、見出し付きで並べる */
function parentSections(data: MunicipalityData): Sub[] {
  const qs = data.questions.filter((q) => q.category === "parent1_base");
  const selector = qs.find(isReasonSelector);
  const prefix = selector ? selector.id.replace(/_reason$/, "") : undefined;
  const out: Sub[] = [];
  for (const q of qs) {
    if (isReasonSelector(q)) continue;
    let heading = cleanLabel(q.label).replace(/[？?]$/, "");
    if (selector && prefix) {
      const suffix = q.id.startsWith(prefix + "_") ? q.id.slice(prefix.length + 1) : undefined;
      const opt = suffix ? selector.options.find((o) => o.value === `${prefix}_reason_${suffix}`) : undefined;
      if (opt) heading = opt.label;
    }
    out.push({ q, heading });
  }
  return out;
}

function adjustmentQuestions(data: MunicipalityData): Question[] {
  return data.questions.filter((q) => q.category === "adjustment");
}

/** 選択肢の点数表（0点の「あてはまらない」は出さない） */
function optionsTable(q: Question, head = "区分"): string {
  const rows = q.options.filter((o) => !isNoneOption(o));
  if (rows.length === 0) return "";
  return `<table>
<thead><tr><th>${esc(head)}</th><th>点数</th></tr></thead>
<tbody>
${rows.map((o) => `<tr><td>${esc(optLabel(o))}</td><td>${esc(fmt(o.points))}</td></tr>`).join("\n")}
</tbody>
</table>`;
}

/** 就労の質問（例の計算に使う）。id に employment、無ければ選択肢の文言で探す */
function findEmployment(data: MunicipalityData, prefixNum: 1 | 2): Question | undefined {
  const cat = `parent${prefixNum}_base` as const;
  const qs = data.questions.filter((q) => q.category === cat && !isReasonSelector(q));
  return (
    qs.find((q) => /employment|_work|shuro|_job$/.test(q.id) && !/offer|seeking/.test(q.id)) ??
    qs.find((q) => q.options.some((o) => /就労|仕事|勤務|働/.test(o.label) && o.points > 0)) ??
    qs.sort((a, b) => Math.max(...b.options.map((o) => o.points)) - Math.max(...a.options.map((o) => o.points)))[0]
  );
}

function maxOption(q: Question): QuestionOption {
  return q.options.reduce((a, b) => (b.points > a.points ? b : a));
}

/** 就労の中でいちばん低い点（0点は除く）の選択肢 */
function minWorkOption(q: Question): QuestionOption | undefined {
  const top = maxOption(q);
  const positives = q.options.filter((o) => o.points > 0 && o.value !== top.value);
  // 「居宅外労働（被雇用者）：月160時間以上」のように区分名が頭に付くときは、同じ区分の中で選ぶ
  const m = top.label.match(/^(.+?[：:）)])/);
  let cands = m ? positives.filter((o) => o.label.startsWith(m[1])) : [];
  if (cands.length === 0) {
    cands = positives.filter(
      (o) => !/求職|採用見込|内定|不存在|妊娠|出産|疾病|病気|障が?い|看護|介護|災害|就学|通学|育児休業|育休|内職/.test(o.label),
    );
  }
  if (cands.length === 0) return undefined;
  return cands.reduce((a, b) => (b.points < a.points ? b : a));
}

/** 求職中の選択肢（別質問か、就労と同じ質問の中の選択肢） */
function findJobseeking(data: MunicipalityData, prefixNum: 1 | 2): { q: Question; o: QuestionOption } | undefined {
  const cat = `parent${prefixNum}_base` as const;
  const qs = data.questions.filter((q) => q.category === cat && !isReasonSelector(q));
  for (const q of qs) {
    const cands = q.options.filter((x) => /求職|仕事を探/.test(x.label) && x.points >= 0 && !isNoneOption(x));
    if (cands.length && (/jobseek|seek/.test(q.id) || q.options.length > 3)) {
      // 「失業して求職中」のような特例より、いちばん一般的な（点の低い）求職中を例にする
      const o = cands.reduce((a, b) => (b.points < a.points ? b : a));
      return { q, o };
    }
  }
  return undefined;
}

function findAdjustment(data: MunicipalityData, idRe: RegExp, labelRe: RegExp): Question | undefined {
  return adjustmentQuestions(data).find((q) => idRe.test(q.id) || labelRe.test(q.label));
}

/** 回答の組み立て。理由の質問があれば、対応する理由も選ぶ */
function answersFor(data: MunicipalityData, prefixNum: 1 | 2, q: Question, o: QuestionOption): Record<string, string> {
  const ans: Record<string, string> = { [q.id]: o.value };
  const selector = data.questions.find((x) => x.category === `parent${prefixNum}_base` && isReasonSelector(x));
  if (selector) {
    const prefix = selector.id.replace(/_reason$/, "");
    const suffix = q.id.startsWith(prefix + "_") ? q.id.slice(prefix.length + 1) : undefined;
    const reasonOpt = suffix ? selector.options.find((x) => x.value === `${prefix}_reason_${suffix}`) : undefined;
    if (reasonOpt) ans[selector.id] = reasonOpt.value;
  }
  return ans;
}

type Example = { name: string; lines: string[]; base: number; adj: number; total: number };

function buildExamples(data: MunicipalityData): Example[] {
  const method: ScoringMethod = data.municipality.scoringMethod ?? "sum";
  const cap = data.municipality.baseCap;
  const e1 = findEmployment(data, 1);
  const e2 = findEmployment(data, 2);
  if (!e1) return [];
  const out: Example[] = [];
  const run = (name: string, lines: string[], answers: Record<string, string>) => {
    const r = calculateScore(data.questions, answers, method, cap);
    out.push({ name, lines, base: r.householdBase, adj: r.adjustment, total: r.total });
  };
  const top1 = maxOption(e1);
  // 1. 共働きフルタイム
  if (e2) {
    const top2 = maxOption(e2);
    run("共働き（2人ともフルタイム）", [`保護者1: ${optLabel(top1)}（${fmt(top1.points)}点）`, `保護者2: ${optLabel(top2)}（${fmt(top2.points)}点）`], {
      ...answersFor(data, 1, e1, top1),
      ...answersFor(data, 2, e2, top2),
    });
    // 2. フルタイム＋短時間
    const low2 = minWorkOption(e2);
    if (low2 && low2.value !== top2.value) {
      run("フルタイム＋短時間勤務", [`保護者1: ${optLabel(top1)}（${fmt(top1.points)}点）`, `保護者2: ${optLabel(low2)}（${fmt(low2.points)}点）`], {
        ...answersFor(data, 1, e1, top1),
        ...answersFor(data, 2, e2, low2),
      });
    }
    // 4. フルタイム＋求職中
    const js = findJobseeking(data, 2);
    if (js) {
      run("フルタイム＋求職中", [`保護者1: ${optLabel(top1)}（${fmt(top1.points)}点）`, `保護者2: ${optLabel(js.o)}（${fmt(js.o.points)}点）`], {
        ...answersFor(data, 1, e1, top1),
        ...answersFor(data, 2, js.q, js.o),
      });
    }
  }
  // 3. ひとり親フルタイム
  const single = findAdjustment(data, /single_parent|hitorioya|single/, /ひとり親|一人親|母子|父子/);
  if (single) {
    const yes =
      single.options.find((o) => o.points > 0 && /ひとり親/.test(o.label)) ??
      single.options.find((o) => o.points > 0 && /一人|いずれか|一方/.test(o.label)) ??
      maxOption(single);
    if (yes.points > 0) {
      run("ひとり親（フルタイム）", [`保護者1: ${optLabel(top1)}（${fmt(top1.points)}点）`, `${noun(single.label)}: ${optLabel(yes)}（${signed(yes.points)}点）`], {
        ...answersFor(data, 1, e1, top1),
        [single.id]: yes.value,
      });
    }
  }
  return out;
}

function methodText(data: MunicipalityData): string {
  const m = data.municipality;
  const method: ScoringMethod = m.scoringMethod ?? "sum";
  const max = fmt(m.maxBasePoints);
  let s: string;
  if (method === "min") {
    s = `${m.name}は<strong>父母それぞれの基本点数を出し、低い方を世帯の基本点数にする</strong>方式です（保護者1人あたりの満点は${max}点）。片方がフルタイムでも、もう片方が短時間勤務なら世帯の点数は低い方に合わせて決まります。ひとり親の場合はその保護者の点数がそのまま世帯の基本点数です。`;
  } else if (method === "avg") {
    s = `${m.name}は<strong>父母それぞれの基本点数の平均</strong>を世帯の基本点数にする方式です（保護者1人あたりの満点は${max}点）。ひとり親の場合はその保護者の点数がそのまま世帯の基本点数です。`;
  } else {
    s = `${m.name}は<strong>父母それぞれの基本点数を足し合わせる</strong>方式です。2人ともフルタイムで働いている世帯の基本点数が満点の${max}点になります。`;
  }
  if (m.baseCap !== undefined) {
    s += ` 世帯の基本点数には<strong>上限${fmt(m.baseCap)}点</strong>があり、それを超えた分は切り捨ててから調整点数を足し引きします。`;
  }
  return s;
}

function faq(data: MunicipalityData, city: string): { q: string; a: string }[] {
  const out: { q: string; a: string }[] = [];
  const emp = findEmployment(data, 1);
  if (emp) {
    const rows = emp.options.filter((o) => !isNoneOption(o));
    const lo = minWorkOption(emp);
    const hi = maxOption(emp);
    if (lo && hi && lo.value !== hi.value) {
      out.push({
        q: "時短勤務やパートだと何点になりますか？",
        a: `${city}の就労の点数は勤務日数・時間の区分で決まります。いちばん高い区分は「${optLabel(hi)}」で${fmt(hi.points)}点、いちばん低い区分は「${optLabel(lo)}」で${fmt(lo.points)}点です。上の基本点数表で自分の勤務条件に近い区分を見てください（区分は${rows.length}段階）。`,
      });
    }
  }
  const leave = findAdjustment(data, /parental_leave|leave_return|ikukyu|childcare_leave/, /育児休業|育休/);
  if (leave) {
    const opts = leave.options.filter((o) => o.points !== 0);
    out.push({
      q: "育児休業から復帰する場合の加点はありますか？",
      a:
        opts.length > 0
          ? `あります。「${noun(leave.label)}」で${opts.map((o) => `${cond(o)}は${signed(o.points)}点`).join("、")}です。`
          : `「${noun(leave.label)}」の項目はありますが、点数の加減はありません。`,
    });
  }
  const unl = findAdjustment(data, /unlicensed|ninkagai|baby_sitter|babysitter/, /認可外|ベビーシッター|認証保育/);
  if (unl) {
    const opts = unl.options.filter((o) => o.points !== 0);
    if (opts.length > 0) {
      out.push({
        q: "認可外保育施設に預けていると点数は上がりますか？",
        a: `${city}では「${noun(unl.label)}」の項目があり、${opts.map((o) => `${cond(o)}は${signed(o.points)}点`).join("、")}です。条件（月極の利用か、有償か、利用期間など）は出典の基準表で確かめてください。`,
      });
    }
  }
  const gp = findAdjustment(data, /grandparent|sofubo/, /祖父母/);
  if (gp) {
    const opts = gp.options.filter((o) => o.points < 0);
    if (opts.length > 0) {
      out.push({
        q: "祖父母と同居していると減点されますか？",
        a: `「${noun(gp.label)}」の項目があり、${opts.map((o) => `${cond(o)}は${signed(o.points)}点`).join("、")}です。年齢や就労状況で扱いが変わる自治体が多いので、条件は出典の基準表で確かめてください。`,
      });
    }
  }
  const sib = findAdjustment(data, /sibling|kyoudai|brother/, /きょうだい|兄弟|兄姉/);
  if (sib) {
    const opts = sib.options.filter((o) => o.points !== 0);
    if (opts.length > 0) {
      out.push({
        q: "上の子が在園していると有利になりますか？",
        a: `「${noun(sib.label)}」の項目があり、${opts.map((o) => `${cond(o)}は${signed(o.points)}点`).join("、")}です。`,
      });
    }
  }
  out.push({
    q: "点数が同じ世帯が並んだらどう決まりますか？",
    a: `同点のときの優先順位（所得、在住期間、申込順など）は自治体ごとに基準表の後ろに決められています。この記事の点数データには含めていないので、${city}の利用調整基準表（下の出典）で確かめてください。`,
  });
  return out;
}

export function buildScoringGuideArticle(citySlug: string): Article | undefined {
  const data = getMunicipalityData(citySlug);
  const info = getCityInfo(citySlug);
  const src = SOURCES[citySlug];
  if (!data || !info || !src) return undefined;
  const city = info.name;
  const lg = LEGACY[citySlug];
  const slug = lg?.slug ?? "scoring-system-guide";

  // 資料名に自治体名が無ければ頭に付ける（「基本指数票」→「清水町「基本指数票」」）
  const cityStem = city.replace(/[市区町村]$/, "");
  const srcLabel = src.label.includes(cityStem) ? src.label : `${city}${src.label.includes("「") ? src.label : `「${src.label}」`}`;
  const sections = parentSections(data);
  const adjs = adjustmentQuestions(data);
  const plus: { label: string; opts: QuestionOption[] }[] = [];
  const minus: { label: string; opts: QuestionOption[] }[] = [];
  for (const q of adjs) {
    const label = noun(q.label);
    const p = q.options.filter((o) => o.points > 0);
    const m = q.options.filter((o) => o.points < 0);
    if (p.length) plus.push({ label, opts: p });
    if (m.length) minus.push({ label, opts: m });
  }
  const topPlus = plus
    .flatMap((x) => x.opts.map((o) => ({ label: x.label, o })))
    .sort((a, b) => b.o.points - a.o.points)
    .slice(0, 3);
  const examples = buildExamples(data);
  const faqs = faq(data, city);
  const method: ScoringMethod = data.municipality.scoringMethod ?? "sum";
  const maxLabel = method === "sum" ? "世帯の満点" : "保護者1人の満点";

  const lead = `${city}の認可保育園・認定こども園の入園は、<strong>保護者の状況を点数にして高い世帯から順に決める</strong>「利用調整」で選考されます。この記事は${city}の公式資料${srcLabel.includes("「") ? esc(srcLabel) : `「${esc(srcLabel)}」`}${src.applies && !/令和|20\d\d|年度/.test(src.label) ? `（${esc(src.applies)}）` : ""}をもとに、基本点数の全区分、調整点数の全項目、世帯タイプ別の計算例をまとめたものです。${maxLabel}は${fmt(data.municipality.maxBasePoints)}点${topPlus.length ? `、加点で大きいのは${topPlus.map((t) => `${esc(t.label)}（${signed(t.o.points)}点）`).join("・")}` : ""}${minus.length ? `、減点の項目は${minus.length}つ` : "、減点の項目はありません"}。自分の点数は<a href="/${citySlug}">${city}の点数シミュレーター</a>で1分で出せます。`;

  const baseHtml = sections
    .map(
      (s) => `<h3>${esc(s.heading)}</h3>
${optionsTable(s.q)}`,
    )
    .join("\n");

  const adjHtml = `
${plus.length ? `<h3>加点される項目</h3>
<table>
<thead><tr><th>項目</th><th>条件</th><th>点数</th></tr></thead>
<tbody>
${plus.map((x) => x.opts.map((o, i) => `<tr>${i === 0 ? `<td rowspan="${x.opts.length}">${esc(x.label)}</td>` : ""}<td>${esc(optLabel(o))}</td><td>${signed(o.points)}</td></tr>`).join("\n")).join("\n")}
</tbody>
</table>` : ""}
${minus.length ? `<h3>減点される項目</h3>
<table>
<thead><tr><th>項目</th><th>条件</th><th>点数</th></tr></thead>
<tbody>
${minus.map((x) => x.opts.map((o, i) => `<tr>${i === 0 ? `<td rowspan="${x.opts.length}">${esc(x.label)}</td>` : ""}<td>${esc(optLabel(o))}</td><td>${signed(o.points)}</td></tr>`).join("\n")).join("\n")}
</tbody>
</table>` : plus.length ? `<p>${city}の点数データには減点の項目はありません。</p>` : `<p>${city}の点数データには加点・減点の調整項目がありません（基準表に調整点数が無いか、点数ではなく優先順位として扱われています。出典の基準表で確かめてください）。</p>`}`;

  const exHtml = examples.length
    ? `
<h2>世帯タイプ別の計算例</h2>
<p>上の表の点数をそのまま当てはめた例です（調整点数は書いてあるもの以外は無しとしています）。</p>
<table>
<thead><tr><th>世帯</th><th>あてはめた区分</th><th>基本点数</th><th>調整</th><th>合計</th></tr></thead>
<tbody>
${examples.map((e) => `<tr><td>${esc(e.name)}</td><td>${e.lines.map(esc).join("<br>")}</td><td>${fmt(e.base)}</td><td>${signed(e.adj)}</td><td><strong>${fmt(e.total)}</strong></td></tr>`).join("\n")}
</tbody>
</table>
<p>きょうだいの在園、育休からの復帰、認可外の利用などがあれば、ここに調整点数が足し引きされます。全部まとめて計算するなら<a href="/${citySlug}">${city}の点数シミュレーター</a>を使ってください。</p>`
    : "";

  const faqHtml = faqs.map((f) => `<h3>${esc(f.q)}</h3>\n<p>${f.a}</p>`).join("\n");

  const content = `
<p>${lead}</p>

<h2>${city}の点数のしくみ</h2>
<p>${methodText(data)}</p>
<div class="point-box">
<p><strong>合計点数 ＝ 世帯の基本点数（保護者それぞれの「保育が必要な理由」の点数）＋ 調整点数（世帯の状況による加点・減点）</strong></p>
</div>
<p>基本点数は保護者ごとに、就労・病気・障害・介護・出産・就学・求職などの理由のうち<strong>あてはまるもの1つ</strong>で決まります。調整点数は世帯としての状況（ひとり親、きょうだい、生活保護、認可外の利用など）で加減されます。</p>

<h2>基本点数の表（保護者1人分）</h2>
<p>保護者それぞれについて、次の区分の点数が付きます。表は${city}の基準表の区分をそのまま並べたものです。</p>
${baseHtml}

<h2>調整点数の表</h2>
<p>世帯の状況で足し引きされる点数です。複数にあてはまれば重なって加減されます（重複の制限は基準表の注記で確かめてください）。</p>
${adjHtml}
${exHtml}

<h2>点数を上げる前に確かめること</h2>
<ul>
<li>就労の点数は勤務日数と時間の<strong>区分の境目</strong>で変わります。就労証明書に書く勤務時間が区分の境目に近いなら、勤務先に契約どおりの時間で書いてもらう（<a href="/documents/shurou-shoumeisho-kinyurei">就労証明書の書き方</a>）</li>
<li>調整点数は申請時に証明書類を出して初めて付きます。加点の条件と提出書類は基準表の注記に書かれています</li>
<li>点数が同じ世帯が並んだときの優先順位は、この記事の点数データには含めていません。出典の基準表で確かめてください</li>
<li>点数が足りずに落ちたときの選択肢（二次募集・認可外・育休延長）は<a href="/${citySlug}/articles">${city}の記事一覧</a>にまとめています</li>
</ul>

<h2>よくある質問</h2>
${faqHtml}

<h2>出典と確認日</h2>
<ul>
${src.urls.map((u, i) => `<li><a href="${esc(u)}" target="_blank" rel="noopener">${esc(i === 0 ? srcLabel : u)}</a></li>`).join("\n")}
</ul>
<p class="text-sm text-muted-foreground">${esc(CHECKED_AT.replace(/-0?(\d+)-0?(\d+)$/, "年$1月$2日"))}時点で、${city}の公式資料を読んで作った点数データにもとづいています。基準表は年度ごとに改定されることがあるので、申込前に必ず最新の基準表を確かめてください。</p>
<div class="info-box">
<p><strong>自分の点数を出す</strong>: <a href="/${citySlug}">${city}の保育園入園点数シミュレーター</a>で、上の表の区分を選ぶだけで合計点数が分かります。</p>
</div>
`;

  const title = `${city}の入園点数のしくみ｜基本点数表・調整点数・世帯別の計算例【${CHECKED_AT.slice(0, 4)}年${Number(CHECKED_AT.slice(5, 7))}月確認】`;
  return {
    slug,
    citySlug,
    title,
    description: `${city}の保育園入園の点数（利用調整基準）を公式の基準表から整理。基本点数の全区分、ひとり親・きょうだい・育休復帰などの調整点数、共働き・時短・ひとり親の計算例、点数が同じときの決まり方まで。${city}のシミュレーターで自分の点数も出せます。`,
    category: "点数・選考",
    categoryColor: "blue",
    content,
    publishedAt: lg?.publishedAt ?? CHECKED_AT,
    popularity: lg?.popularity ?? undefined,
  };
}
