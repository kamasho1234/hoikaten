/**
 * シミュレーターのフォーム挙動を全自治体で監査する。
 * simulator-form.tsx の buildSteps / visibleQuestions / ひとり親判定を再現し、
 * 「質問が1問も出ないまま先に進む」「回答しても必ず0点になる」等の不具合を検出する。
 *
 * 使い方: npx tsx scripts/audit-simulator-form.ts
 * 自治体データを追加・修正したら必ず実行すること（検出があれば exit 1）。
 */
import { getAllMunicipalities, getMunicipalityData } from '../src/lib/data/index';
import type { Question } from '../src/lib/types';

/** simulator-form.tsx の buildSteps と同じ */
function buildSteps(questions: Question[]) {
  const all: { key: string; category?: Question['category'] }[] = [
    { key: 'parent1', category: 'parent1_base' },
    { key: 'parent2', category: 'parent2_base' },
    { key: 'adjustment', category: 'adjustment' },
    { key: 'result' },
  ];
  return all.filter((s) => !s.category || questions.some((q) => q.category === s.category));
}

/** simulator-form.tsx の getReasonFromAnswers と同じ */
function reasonFromValue(prefix: string, value: string): string | null {
  const p = `${prefix}_reason_`;
  return value.startsWith(p) ? value.slice(p.length) : null;
}

/** simulator-form.tsx の parentN ステップの visibleQuestions を再現 */
function visibleParentQuestions(
  all: Question[],
  parent: 'parent1' | 'parent2',
  reason: string | null
): Question[] {
  const qs = all.filter((q) => q.category === `${parent}_base`);
  if (!qs.some((q) => q.id === `${parent}_reason`)) return qs;
  if (!reason) return qs.filter((q) => q.id === `${parent}_reason`);
  return qs.filter(
    (q) => q.id === `${parent}_reason` || q.id === `${parent}_${reason}` || q.showFor?.includes(reason)
  );
}

/** simulator-form.tsx の parent2 ステップの visibleQuestions を丸ごと再現（ひとり親質問を含む） */
function visibleParent2Step(all: Question[], answers: Record<string, string>): Question[] {
  const sp = all.find((q) => q.id === 'adj_single_parent');
  const spAnswer = answers['adj_single_parent'];
  const answered = spAnswer !== undefined;
  const isSingle = (() => {
    if (!sp || spAnswer === undefined) return false;
    const opt = sp.options.find((o) => o.value === spAnswer);
    return !!opt && opt.points > 0;
  })();
  if (sp && (!answered || isSingle)) return [sp];
  const withSp = (qs: Question[]) => (sp ? [sp, ...qs] : qs);
  const reason = answers['parent2_reason']
    ? answers['parent2_reason'].replace('parent2_reason_', '')
    : null;
  return withSp(visibleParentQuestions(all, 'parent2', reason));
}

/**
 * 保護者2ステップのフォーム遷移をシミュレートする。
 * 「ひとり親ではない」と答えたのに保護者2の設問が1問も聞かれないまま
 * 次のステップへ進んでしまうケース（＝保護者2が0点で確定する）を検出するためのもの。
 */
function simulateParent2Step(all: Question[]): { askedParent2: number; ended: string } {
  const answers: Record<string, string> = {};
  let index = 0;
  let askedParent2 = 0;
  for (let guard = 0; guard < 100; guard++) {
    const list = visibleParent2Step(all, answers);
    if (list.length === 0) return { askedParent2, ended: 'empty' };
    const safeIndex = Math.min(index, Math.max(0, list.length - 1));
    const q = list[safeIndex];
    if (!q) return { askedParent2, ended: 'no-question' };
    if (q.category === 'parent2_base') askedParent2++;
    // ひとり親質問には「いいえ」（0点）を、それ以外は点数のある選択肢を選ぶ
    const opt =
      q.id === 'adj_single_parent'
        ? q.options.find((o) => o.points === 0)
        : q.options.find((o) => o.points !== 0) ?? q.options[0];
    if (!opt) return { askedParent2, ended: 'no-option' };
    answers[q.id] = opt.value;
    // simulator-form.tsx の自動進行判定を再現
    const after = visibleParent2Step(all, answers);
    const idxAfter = Math.min(index, Math.max(0, after.length - 1));
    if (idxAfter < after.length - 1) index = idxAfter + 1;
    else return { askedParent2, ended: 'next-step' };
  }
  return { askedParent2, ended: 'loop' };
}

/**
 * 「選んでも必ず0点になる選択肢」の既知例外。
 * いずれも原典を確認したうえで 0 点が正しい、または点数が公開されていないもの。
 * 新しく増えた場合は原典を確認してから追加すること（安易に追加しない）。
 */
const KNOWN_ZERO_OPTIONS: Record<string, string[]> = {
  // 「該当なし」を意味する選択肢（0点で正しい）
  yamaguchi: ['あてはまらない'],
  // 原典で「不在」の基準指数が 0（ひとり親は調整指数側で加点される）
  murakami: ['不在（ひとり親のため、父/母が不在）'],
  tamana: ['不在（ひとり親のため父/母が不在）'],
  // 原典の別表が画像形式で固定点数を確認できていない（選択肢ラベルで「市が判断」と明示）
  katagami: ['家庭の災害（火災・風水害等）（※市が判断）'],
};

type Issue = { slug: string; name: string; pref: string; kind: string; detail: string };
const issues: Issue[] = [];
const notes: Issue[] = [];
const all = getAllMunicipalities();

for (const m of all) {
  const d = getMunicipalityData(m.slug);
  const add = (kind: string, detail: string) =>
    issues.push({ slug: m.slug, name: m.name, pref: m.prefecture, kind, detail });
  const note = (kind: string, detail: string) =>
    notes.push({ slug: m.slug, name: m.name, pref: m.prefecture, kind, detail });

  if (!d) {
    add('データ未取得', 'getMunicipalityData が undefined');
    continue;
  }
  const qs = d.questions;
  const steps = buildSteps(qs);
  const p1 = qs.filter((q) => q.category === 'parent1_base');
  const p2 = qs.filter((q) => q.category === 'parent2_base');
  const adj = qs.filter((q) => q.category === 'adjustment');

  // 1) 保護者1の質問がないのは致命的（点数が付けられない）
  if (p1.length === 0) add('保護者1の質問が0件', '点数を入力できない');

  // 2) 保護者2・調整がないのはステップから除外されるので不具合ではないが、把握しておく
  if (p2.length === 0) note('保護者2ステップなし', `原典が1人分のみを採る方式か要確認（parent1=${p1.length}件）`);
  if (adj.length === 0) note('調整ステップなし', '原典に調整指数がない自治体');

  // 3) ひとり親質問がある場合、加点のある選択肢が1つ以上必要
  //    （フォームは「加点のある選択肢が選ばれたか」でひとり親を判定するため）
  const sp = qs.find((q) => q.id === 'adj_single_parent');
  if (sp) {
    if (!sp.options.some((o) => o.points > 0)) {
      add('ひとり親質問に加点の選択肢がない', `values=[${sp.options.map((o) => o.value).join(', ')}]`);
    }
    if (!sp.options.some((o) => o.points === 0)) {
      add('ひとり親質問に「該当なし」（0点）がない', `values=[${sp.options.map((o) => o.value).join(', ')}]`);
    }
    // 保護者2ステップがない自治体では、ひとり親質問は調整ステップで出す必要がある
    if (p2.length === 0) {
      note('ひとり親質問を調整ステップで表示', '保護者2ステップがないため');
    }
  }

  // 4) reason ルーティング: 選んでも詳細質問が出ず、かつ reason 自体も0点＝必ず0点になる
  for (const parent of ['parent1', 'parent2'] as const) {
    const list = parent === 'parent1' ? p1 : p2;
    const rq = list.find((q) => q.id === `${parent}_reason`);
    if (!rq) continue;
    for (const opt of rq.options) {
      const reason = reasonFromValue(parent, opt.value);
      if (!reason) {
        add('reason選択肢の命名不正', `${parent}_reason の value=${opt.value}（${parent}_reason_* 形式でない）`);
        continue;
      }
      const detail = visibleParentQuestions(qs, parent, reason).filter((q) => q.id !== `${parent}_reason`);
      if (detail.length === 0 && opt.points === 0) {
        if (KNOWN_ZERO_OPTIONS[m.slug]?.includes(opt.label)) {
          note('既知の0点選択肢', `${parent}:「${opt.label}」`);
        } else {
          add('選んでも必ず0点になる選択肢', `${parent}:「${opt.label}」→ 詳細質問0件かつreasonも0点`);
        }
      }
    }
  }

  // 5) 各ステップの開始時に質問が1問も出ないケース（画面が空になる）
  for (const s of steps) {
    if (s.key === 'result') continue;
    let vis: Question[];
    if (s.key === 'parent1') vis = visibleParentQuestions(qs, 'parent1', null);
    else if (s.key === 'parent2') vis = sp ? [sp] : visibleParentQuestions(qs, 'parent2', null);
    else vis = adj.filter((q) => (steps.some((x) => x.key === 'parent2') ? q.id !== 'adj_single_parent' : true));
    if (vis.length === 0) add('ステップ開始時に質問が0件', `${s.key} ステップで画面が空になる`);
  }

  // 6) 保護者2ステップの遷移シミュレーション
  //    「ひとり親ではない」と答えたのに保護者2の設問が1問も聞かれずに次へ進んでしまう不具合の検出
  if (p2.length > 0) {
    const sim = simulateParent2Step(qs);
    if (sim.askedParent2 === 0) {
      add(
        '保護者2の設問が1問も聞かれない',
        `ひとり親「いいえ」と回答しても保護者2の質問に到達しない（終了理由: ${sim.ended}）`
      );
    }
  }

  // 7) 同一質問内での value 重複（同じ値が2つあると選択が壊れる）
  for (const q of qs) {
    const vals = q.options.map((o) => o.value);
    const dup = vals.filter((v, i) => vals.indexOf(v) !== i);
    if (dup.length) add('選択肢のvalue重複', `${q.id}: [${[...new Set(dup)].join(', ')}]`);
  }

  // 8) 質問IDの重複（回答が混線する）
  const ids = qs.map((q) => q.id);
  const dupId = ids.filter((v, i) => ids.indexOf(v) !== i);
  if (dupId.length) add('質問IDの重複', `[${[...new Set(dupId)].join(', ')}]`);
}

const group = (arr: Issue[]) => {
  const by: Record<string, Issue[]> = {};
  for (const i of arr) (by[i.kind] ??= []).push(i);
  return by;
};

console.log(`検査対象: ${all.length}自治体\n`);
const byKind = group(issues);
if (issues.length === 0) {
  console.log('不具合の検出: 0件');
} else {
  console.log(`不具合の検出: ${issues.length}件 / ${new Set(issues.map((i) => i.slug)).size}自治体\n`);
  for (const k of Object.keys(byKind).sort()) {
    console.log(`【${k}】 ${byKind[k].length}件`);
    for (const i of byKind[k].slice(0, 20)) console.log(`  ${i.pref}${i.name}(${i.slug}): ${i.detail}`);
    if (byKind[k].length > 20) console.log(`  ... 他${byKind[k].length - 20}件`);
    console.log('');
  }
}

const byNote = group(notes);
if (notes.length) {
  console.log('--- 参考情報（不具合ではないが把握しておく構成） ---');
  for (const k of Object.keys(byNote).sort()) {
    console.log(`【${k}】 ${byNote[k].length}件: ` + byNote[k].map((i) => `${i.pref}${i.name}`).join('、'));
  }
}

process.exit(issues.length > 0 ? 1 : 0);
