/**
 * 施設の公式サイトURLを src/lib/vacancy/{slug}-websites.json に書き出す
 *
 * 実行: npx tsx scripts/build-vacancy-websites.ts <自治体slug> <検証済みJSONのディレクトリ...>
 *
 * ## なぜ空き状況JSONと分けるか
 * 空き状況（yokohama.json）は fetch-yokohama-vacancy.ts が毎月まるごと上書きする。
 * 公式サイトURLは調査で得た別系統のデータなので、同じファイルに混ぜると
 * 次の自動更新で消える。施設番号をキーにした別ファイルとして持つ。
 *
 * ## 入力
 * verify-urls 相当の検証を通過したレコードの配列（verdict === "verified"）。
 * 検証を通っていないURLは載せない（feedback_agent_factcheck / feedback_factcheck_absolute）。
 */

import fs from "node:fs";
import path from "node:path";

interface VerifiedRecord {
  id: string;
  name: string;
  url: string | null;
  type: "facility" | "corp" | "city" | null;
  verdict: string;
  by?: string;
  finalUrl?: string;
}

function fail(message: string): never {
  console.error(`\n[中断] ${message}`);
  process.exit(1);
}

/** 施設名の表記ゆれ（全角空白・中黒・全角英数）を吸収する */
function normalizeName(s: string): string {
  return (s || "").normalize("NFKC").replace(/[\s・･]/g, "");
}

function main() {
  const [MUNICIPALITY_SLUG, ...dirs] = process.argv.slice(2);
  if (!MUNICIPALITY_SLUG) {
    fail("自治体slugと検証済みJSONのディレクトリを引数で指定してください（例: kawasaki ./research）。");
  }
  const OUT_PATH = path.join(
    process.cwd(),
    "src",
    "lib",
    "vacancy",
    `${MUNICIPALITY_SLUG}-websites.json`
  );
  // 複数のディレクトリを受け取る（初回調査分と追加調査分を合わせて取り込む）
  if (dirs.length === 0) fail("検証済みJSONのディレクトリを引数で指定してください。");
  for (const d of dirs) if (!fs.existsSync(d)) fail(`ディレクトリがありません: ${d}`);

  const files = dirs.flatMap((d) =>
    fs
      .readdirSync(d)
      .filter((f) => f.startsWith("verified_") && f.endsWith(".json"))
      .map((f) => path.join(d, f))
  );
  if (files.length === 0) fail(`verified_*.json が見つかりません: ${dirs.join(", ")}`);

  const vacancyPath = path.join(
    process.cwd(),
    "src",
    "lib",
    "vacancy",
    `${MUNICIPALITY_SLUG}.json`
  );
  const vacancy = JSON.parse(fs.readFileSync(vacancyPath, "utf-8")) as {
    facilities: { id: string; name: string }[];
  };
  const knownIds = new Set(vacancy.facilities.map((f) => f.id));

  // 調査側が施設番号を持たない仮ID（"unknown_03" 等）で返してくることがあるため、
  // 施設名が市内で一意に決まるものだけ名前から施設番号を復元する。
  const idByName = new Map<string, string[]>();
  for (const f of vacancy.facilities) {
    const key = normalizeName(f.name);
    if (!idByName.has(key)) idByName.set(key, []);
    idByName.get(key)!.push(f.id);
  }
  const resolveId = (record: VerifiedRecord): string | null => {
    if (knownIds.has(record.id)) return record.id;
    const candidates = idByName.get(normalizeName(record.name)) ?? [];
    return candidates.length === 1 ? candidates[0] : null;
  };

  const sites: Record<string, { url: string; type: string }> = {};
  let total = 0;
  let skipped = 0;
  const unknown: string[] = [];

  for (const file of files) {
    const records = JSON.parse(fs.readFileSync(file, "utf-8")) as VerifiedRecord[];
    for (const r of records) {
      total++;
      if (r.verdict !== "verified" || !r.url) {
        skipped++;
        continue;
      }
      const id = resolveId(r);
      if (!id) {
        unknown.push(`${r.id} ${r.name}`);
        continue;
      }
      if (sites[id]) continue;
      sites[id] = { url: r.url, type: r.type ?? "facility" };
    }
  }

  // 施設番号でも施設名でも空き状況データに結びつかないものは載せない（誤ったリンクを出さない）
  if (unknown.length) {
    console.log(`\n施設を特定できず見送り: ${unknown.length}件`);
    unknown.slice(0, 20).forEach((u) => console.log(`  ${u}`));
    if (unknown.length > 20) console.log(`  ...他${unknown.length - 20}件`);
  }

  const count = Object.keys(sites).length;
  if (count === 0) fail("採用できるURLが1件もありません。");

  // 施設番号順に並べて差分を読みやすくする
  const sorted = Object.fromEntries(
    Object.entries(sites).sort(([a], [b]) => a.localeCompare(b))
  );

  const payload = {
    municipalitySlug: MUNICIPALITY_SLUG,
    note: "各施設の公式サイト。Web検索で特定し、URLへ実アクセスして施設名または電話番号の一致を確認したものだけを載せている。",
    facilityCount: count,
    sites: sorted,
  };

  fs.writeFileSync(OUT_PATH, `${JSON.stringify(payload, null, 1)}\n`, "utf-8");

  const byType: Record<string, number> = {};
  Object.values(sites).forEach((s) => {
    byType[s.type] = (byType[s.type] ?? 0) + 1;
  });

  console.log(`書き出しました: ${path.relative(process.cwd(), OUT_PATH)}`);
  console.log(`  検証レコード: ${total}件（うち採用 ${count}件 / 見送り ${skipped}件）`);
  console.log(`  施設全体に対する割合: ${count}/${vacancy.facilities.length}`);
  Object.entries(byType).forEach(([t, n]) => console.log(`  ${t}: ${n}`));
}

main();
