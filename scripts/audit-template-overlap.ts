/**
 * 「推定値テンプレ」の実態を測る
 *
 * 実行: npx tsx scripts/audit-template-overlap.ts
 *
 * 1. データファイルに「参考: ○○に準じた」「標準方式」というテンプレ表記があるものを数える
 * 2. 基本指数の点数配列が一致する組を作り、テンプレ表記の有無と突き合わせる
 *
 * **表記が無いのに点数配列だけ一致している自治体**が、見落としている推定値の候補になる。
 */
import fs from 'node:fs';
import path from 'node:path';
import { getAllMunicipalities, getMunicipalityData } from '../src/lib/data/index';

const DATA_DIR = path.join(process.cwd(), 'src', 'lib', 'data');
// テンプレ由来を示すコメントの言い回しは自治体ごとにぶれる。
// 「参考: ○○に準じた」だけでなく「○○に準拠」「県標準基準」なども拾う。
// （2026-08-19: 鴻巣市が「参考: 埼玉県標準基準（上尾市、さいたま市に準拠）」と書いており
//   従来の正規表現から漏れていたため追加した）
const TEMPLATE = /参考:[^"'\n]*(準じ|準拠|標準)|標準方式|標準基準/;

const templated = new Set<string>();
for (const f of fs.readdirSync(DATA_DIR)) {
  if (!f.endsWith('.ts') || f === 'index.ts') continue;
  const s = fs.readFileSync(path.join(DATA_DIR, f), 'utf-8');
  if (TEMPLATE.test(s)) templated.add(f.replace(/\.ts$/, ''));
}

function basePointsKey(slug: string): string | null {
  const data = getMunicipalityData(slug);
  if (!data) return null;
  const pts = data.questions
    .filter((q) => q.category === 'parent1_base')
    .flatMap((q) => q.options.map((o) => o.points))
    .filter((p) => p !== 0);
  return pts.length ? pts.join(',') : null;
}

const all = getAllMunicipalities();
const groups = new Map<string, { slug: string; label: string }[]>();
for (const m of all) {
  const key = basePointsKey(m.slug);
  if (!key) continue;
  const list = groups.get(key) ?? [];
  list.push({ slug: m.slug, label: `${m.prefecture}${m.name}` });
  groups.set(key, list);
}

const big = [...groups.entries()].filter(([, v]) => v.length >= 3).sort((a, b) => b[1].length - a[1].length);
console.log(`全${all.length}自治体 / テンプレ表記あり ${templated.size}件\n`);
console.log('--- 基本指数の点数配列が3自治体以上で一致する組 ---');
const suspects = new Set<string>();
for (const [key, list] of big) {
  const withTpl = list.filter((x) => templated.has(x.slug));
  const without = list.filter((x) => !templated.has(x.slug));
  console.log(
    `${String(list.length).padStart(3)}件（表記あり ${String(withTpl.length).padStart(2)} / なし ${String(without.length).padStart(2)}）  ${key.slice(0, 40)}…`
  );
  // 表記ありが1件でも混ざっている組は、表記の無いものも同じテンプレの可能性がある
  if (withTpl.length > 0) without.forEach((x) => suspects.add(x.slug));
}

console.log(`\n--- テンプレ表記は無いが、表記ありと同じ点数配列の自治体: ${suspects.size}件 ---`);
const byPref = new Map<string, string[]>();
for (const s of suspects) {
  const m = all.find((x) => x.slug === s)!;
  const list = byPref.get(m.prefecture) ?? [];
  list.push(m.name);
  byPref.set(m.prefecture, list);
}
[...byPref.entries()]
  .sort((a, b) => b[1].length - a[1].length)
  .forEach(([pref, names]) => console.log(`  ${pref}: ${names.length}件  ${names.join('、')}`));

const total = templated.size + suspects.size;
console.log(`\n要確認の合計: ${total}件（表記あり ${templated.size} + 表記なしで配列一致 ${suspects.size}）= 全体の ${((total / all.length) * 100).toFixed(1)}%`);
