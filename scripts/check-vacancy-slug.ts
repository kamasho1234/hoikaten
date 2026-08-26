/**
 * 空き状況を追加する前に、その自治体が既に入っていないかを確かめる
 *
 * 実行: npm run vacancy:check -- <slug> [<slug> ...]
 *
 * ## なぜ要るのか
 * 「新しく追加する自治体」と思い込んで実装を書き、既にあった
 * `scripts/fetch-<slug>-vacancy.ts` を上書きしてしまう事故を2回起こした
 * （新居浜市・大田区）。`src/lib/data/<slug>.ts`（点数の基準）の有無を見ても
 * 空き状況が入っているかは分からないので、空き状況の側を直接見る。
 *
 * 候補を見つけたら、実装に手を付ける前にまずこれを走らせること。
 */

import fs from "node:fs";
import path from "node:path";

const VACANCY_DIR = path.join(process.cwd(), "src", "lib", "vacancy");
const SCRIPTS_DIR = path.join(process.cwd(), "scripts");

function main() {
  const slugs = process.argv.slice(2).filter((a) => !a.startsWith("-"));
  if (slugs.length === 0) {
    console.error("使い方: npm run vacancy:check -- <slug> [<slug> ...]");
    process.exit(1);
  }

  let anyExisting = false;
  for (const slug of slugs) {
    const json = path.join(VACANCY_DIR, `${slug}.json`);
    const fetcher = path.join(SCRIPTS_DIR, `fetch-${slug}-vacancy.ts`);
    const hasJson = fs.existsSync(json);
    const hasFetcher = fs.existsSync(fetcher);

    if (!hasJson && !hasFetcher) {
      console.log(`${slug}: まだ入っていません。新しく追加できます。`);
      continue;
    }

    anyExisting = true;
    const data = hasJson
      ? (JSON.parse(fs.readFileSync(json, "utf-8")) as {
          municipalityName?: string;
          asOf?: string;
          facilities?: unknown[];
        })
      : null;
    console.log(
      `${slug}: すでに入っています（${data?.municipalityName ?? "?"} / ${data?.asOf ?? "?"}時点 / ${
        data?.facilities?.length ?? "?"
      }施設）`,
    );
    console.log(`  取り込み: npm run vacancy:fetch:${slug}`);
    if (hasFetcher) console.log(`  スクリプト: scripts/fetch-${slug}-vacancy.ts（上書きしないこと）`);
  }

  if (anyExisting) {
    console.log("\n既にある自治体は、新しく書かずに既存のスクリプトを実行して更新してください。");
  }
}

main();
