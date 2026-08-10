/**
 * 全自治体データを横断集計して、全国横断記事（general-data-*.ts）に載せる数値を算出する。
 * 使い方: npx tsx scripts/analyze-adjustments.ts
 *
 * 記事の数値を更新するときは必ずこのスクリプトを再実行し、出力をそのまま反映すること。
 * （記事本文には「本サイト収録のN自治体のうち」と母数を明記する。全国1,741市区町村の調査ではない）
 */
import { getAllMunicipalities, getMunicipalityData } from '../src/lib/data/index';
import type { Question } from '../src/lib/types';

type Hit = { name: string; pref: string; slug: string; points: number; label: string };

const all = getAllMunicipalities();

/** 質問（ラベル＋全選択肢ラベル）を1つの検索対象テキストにする */
const qText = (q: Question) => q.label + ' ' + q.options.map((o) => o.label).join(' ');

/**
 * 条件に合う質問を全自治体から抽出する。
 * @param match      質問テキストが対象かどうか
 * @param pick       その質問から代表点数を取り出す（最小=減点／最大=加点）
 * @param keep       代表点数が集計対象かどうか
 * @param categories 探索するカテゴリ
 */
function collect(
  match: (t: string) => boolean,
  pick: 'min' | 'max',
  keep: (p: number) => boolean,
  categories: Question['category'][] = ['adjustment']
): Hit[] {
  const hits: Hit[] = [];
  for (const m of all) {
    const d = getMunicipalityData(m.slug);
    if (!d) continue;
    let best: Hit | null = null;
    for (const q of d.questions) {
      if (!categories.includes(q.category)) continue;
      const t = qText(q);
      if (!match(t)) continue;
      const pts = q.options.map((o) => o.points);
      const p = pick === 'min' ? Math.min(...pts) : Math.max(...pts);
      if (!keep(p)) continue;
      // 自治体ごとに最も極端な1件を代表とする
      if (!best || (pick === 'min' ? p < best.points : p > best.points)) {
        best = { name: m.name, pref: m.prefecture, slug: m.slug, points: p, label: q.label };
      }
    }
    if (best) hits.push(best);
  }
  return hits;
}

function report(title: string, hits: Hit[], pick: 'min' | 'max', topN = 12) {
  const sorted = [...hits].sort((a, b) => (pick === 'min' ? a.points - b.points : b.points - a.points));
  console.log(`\n=== ${title} ===`);
  console.log(`該当自治体数: ${hits.length} / ${all.length}（${((hits.length / all.length) * 100).toFixed(1)}%）`);
  console.log(`上位${topN}件:`);
  for (const h of sorted.slice(0, topN)) {
    console.log(`  ${h.pref}${h.name}(${h.slug}): ${h.points > 0 ? '+' : ''}${h.points}点  ／ ${h.label}`);
  }
}

// 1) 市外在住による減点（広域入所・管外委託を含む）
const shigai = collect(
  (t) => /(市外|町外|村外|区外|管外|広域入所|広域利用)/.test(t) && /(在住|居住|住所|入所|利用|受託|委託)/.test(t),
  'min',
  (p) => p < 0
);
report('市外在住（広域入所）による減点', shigai, 'min');

// 2) 祖父母など同居親族がいることによる減点
const sofubo = collect(
  (t) => /(祖父母|同居|近居)/.test(t),
  'min',
  (p) => p < 0
);
report('祖父母・同居親族がいることによる減点', sofubo, 'min');
const sofuboOnly = collect((t) => /祖父母/.test(t), 'min', (p) => p < 0);
console.log(`  （うち質問文に「祖父母」を明示: ${sofuboOnly.length}自治体）`);

// 3) 育児休業の延長を許容した場合の減点
const ikukyu = collect(
  (t) => /育(児休業|休).{0,12}(延長)/.test(t),
  'min',
  (p) => p < 0
);
report('育児休業の延長を許容した場合の減点', ikukyu, 'min');

// 4) 保育士等の加点（基本指数側に置いている自治体も含める）
const hoikushi = collect(
  (t) => /(保育士|保育教諭)/.test(t),
  'max',
  (p) => p > 0,
  ['adjustment', 'parent1_base', 'parent2_base']
);
report('保育士等として働いている場合の加点', hoikushi, 'max');

// 5) 採点方式の分布
const method: Record<string, number> = {};
for (const m of all) {
  const k = m.scoringMethod ?? 'sum';
  method[k] = (method[k] ?? 0) + 1;
}
console.log('\n=== 採点方式の分布 ===');
const label: Record<string, string> = { sum: '父母の点数を合算', min: '父母のうち低い方を採用', avg: '父母の平均' };
for (const [k, v] of Object.entries(method).sort((a, b) => b[1] - a[1])) {
  console.log(`  ${label[k] ?? k}: ${v}自治体（${((v / all.length) * 100).toFixed(1)}%）`);
}
// min方式の自治体一覧（記事に載せる）
const minList = all.filter((m) => m.scoringMethod === 'min');
console.log(`  「低い方を採用」の自治体（${minList.length}件）:`);
console.log('   ' + minList.map((m) => `${m.prefecture}${m.name}`).join('、'));
const avgList = all.filter((m) => m.scoringMethod === 'avg');
console.log(`  「平均」の自治体（${avgList.length}件）: ` + avgList.map((m) => `${m.prefecture}${m.name}`).join('、'));

// 6) 単身赴任の加点（引越し記事の補足）
const tanshin = collect((t) => /単身赴任/.test(t), 'max', (p) => p > 0);
report('単身赴任による加点', tanshin, 'max', 8);

// 7) 転園の減点／加点（引越し記事）
const tenenGen = collect((t) => /転園/.test(t), 'min', (p) => p < 0);
report('転園希望による減点', tenenGen, 'min', 10);
const tenenKa = collect((t) => /転園|移行/.test(t), 'max', (p) => p > 0);
report('転園・移行による加点', tenenKa, 'max', 8);

// 8) 広域入所・管外委託
const koiki = collect((t) => /広域(入所|利用)|管外/.test(t), 'min', () => true);
report('広域入所・管外委託の項目', koiki, 'min', 8);

// 9) きょうだい加点（同一施設の在園・同時申込）
const kyodai = collect(
  (t) => /(きょうだい|兄弟姉妹|兄弟|兄・姉)/.test(t),
  'max',
  (p) => p > 0
);
report('きょうだいに関する加点', kyodai, 'max', 6);

// 10) 小規模保育・地域型保育の卒園加点
const shokibo = collect(
  (t) => /(小規模|地域型|家庭的保育|事業所内).{0,16}(卒園|卒)/.test(t),
  'max',
  (p) => p > 0
);
report('小規模保育・地域型保育の卒園加点', shokibo, 'max', 6);

console.log(`\n※ 母数はいずれも本サイト収録の${all.length}自治体。全国1,741市区町村の悉皆調査ではない。`);
