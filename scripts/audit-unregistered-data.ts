// src/lib/data/*.ts のうち index.ts に未登録のファイルを検出し、テンプレ（推定値）の疑いを判定する。
//
// 背景: 2026-06-02 の監査でテンプレ381件を削除、2026-08-14 に残骸8件を整理したあとも、
//       index.ts に未登録のまま残るテンプレファイルが繰り返し見つかっている。
//       未登録でも本番には出ないが、後から誤って登録されると捏造データが公開されてしまう。
//
// 判定材料
//   1) 出典ヘッダーの有無（正データは必ず「出典」と原典URLをヘッダーに持つ）
//   2) テンプレ特有の文言（「〜に準じた」「標準方式」「参考値」「標準基準」）
//   3) 同じ基本指数の点数配列を持つ他自治体の存在（同県内で完全一致＝テンプレの決定的証拠）
//
// 検出時 exit 1。自治体データを追加・削除したら verify-question-integrity.ts と併せて実行すること。

import fs from 'node:fs';
import path from 'node:path';
import { getAllMunicipalities, getMunicipalityData } from '../src/lib/data/index';

const DATA_DIR = path.join(__dirname, '..', 'src', 'lib', 'data');
const ARTICLES_DIR = path.join(__dirname, '..', 'src', 'lib', 'articles');

const TEMPLATE_PATTERNS = [/参考[:：].*準じ/, /標準方式/, /参考値/, /標準基準/];

const registeredSlugs = new Set(getAllMunicipalities().map((m) => m.slug));

const files = fs
  .readdirSync(DATA_DIR)
  .filter((f) => f.endsWith('.ts') && f !== 'index.ts')
  .map((f) => f.replace(/\.ts$/, ''));

const unregistered = files.filter((f) => !registeredSlugs.has(f));

// 登録済み自治体の「基本指数の点数配列」を集めておく（テンプレ判定用）
function basePointsKey(slug: string): string | null {
  const data = getMunicipalityData(slug);
  if (!data) return null;
  const pts = data.questions
    .filter((q) => q.category === 'parent1_base')
    .flatMap((q) => q.options.map((o) => o.points))
    .filter((p) => p !== 0);
  return pts.length ? pts.join(',') : null;
}

const registeredByKey = new Map<string, string[]>();
for (const m of getAllMunicipalities()) {
  const key = basePointsKey(m.slug);
  if (!key) continue;
  const list = registeredByKey.get(key) ?? [];
  list.push(`${m.prefecture}${m.name}`);
  registeredByKey.set(key, list);
}

let ng = 0;

if (unregistered.length === 0) {
  console.log(`未登録のデータファイル: 0件（全${files.length}ファイルが index.ts に登録済み）`);
} else {
  console.log(`未登録のデータファイル: ${unregistered.length}件 / 全${files.length}ファイル\n`);
  for (const slug of unregistered) {
    const src = fs.readFileSync(path.join(DATA_DIR, `${slug}.ts`), 'utf8');
    const header = src.slice(0, src.indexOf('const municipality'));
    const hasSource = /出典/.test(header) && /https?:\/\//.test(header);
    const templateHits = TEMPLATE_PATTERNS.filter((re) => re.test(header)).map((re) => re.source);
    const hasArticle = fs.existsSync(path.join(ARTICLES_DIR, `${slug}.ts`));
    const articleRegistered =
      hasArticle &&
      fs.readFileSync(path.join(ARTICLES_DIR, 'register-all.ts'), 'utf8').includes(`"./${slug}"`);

    const flags: string[] = [];
    if (!hasSource) flags.push('出典ヘッダーなし');
    if (templateHits.length) flags.push(`テンプレ文言(${templateHits.join(' / ')})`);
    if (articleRegistered) flags.push('記事は register-all.ts に登録済み（データ登録と同時に公開される）');

    console.log(`- ${slug}: ${flags.length ? flags.join(' / ') : '出典ヘッダーあり（要個別確認）'}`);
    ng++;
  }
  console.log(
    '\n未登録ファイルは本番には出ないが、後から登録されると出所不明のデータが公開される。' +
      '\n原典と照合できたものは登録し、照合できないものは削除すること。'
  );
}

// 登録済みのなかに点数配列が完全一致する自治体がないかも報告する
const dupes = [...registeredByKey.entries()].filter(([, list]) => list.length >= 3);
if (dupes.length) {
  console.log(`\n--- 参考: 基本指数の点数配列が3自治体以上で完全一致する組 ---`);
  for (const [key, list] of dupes) {
    console.log(`  [${key}] ${list.length}件: ${list.join('、')}`);
  }
  console.log('  ※同県内で完全一致している場合はテンプレ（推定値）の疑いが強い。');
}

process.exit(ng === 0 ? 0 : 1);
