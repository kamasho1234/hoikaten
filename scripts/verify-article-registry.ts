/**
 * 記事ファイルが register-all.ts に import されているか確かめる。
 *
 * 記事ファイルを作っても register-all.ts に import を足し忘れると、
 * 型チェックもビルドも通るのに**ページだけ出ない**。
 * 実際に6自治体・63本の記事が、この抜けで長く公開されていなかった。
 * 気付けるところが無かったので、ここで落とす。
 *
 *   npx tsx scripts/verify-article-registry.ts
 */
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const DIR = join(process.cwd(), "src/lib/articles");

// 自治体ごとの記事ではないもの。registerArticles を呼ばず、
// 使う側が名前で import しているため、ここでは見ない
const NOT_A_CITY = new Set(["types", "index", "register-all"]);

const registry = readFileSync(join(DIR, "register-all.ts"), "utf-8");
const imported = new Set(
  [...registry.matchAll(/import\s+"\.\/([^"]+)"/g)].map((m) => m[1])
);

const missing: string[] = [];
for (const file of readdirSync(DIR)) {
  if (!file.endsWith(".ts")) continue;
  const name = file.slice(0, -3);
  if (NOT_A_CITY.has(name)) continue;
  const body = readFileSync(join(DIR, file), "utf-8");
  // registerArticles を呼ぶファイルだけが、import されて初めて効く
  if (!body.includes("registerArticles(")) continue;
  if (!imported.has(name)) missing.push(name);
}

if (missing.length > 0) {
  console.error(
    `register-all.ts に import が無い記事ファイルが ${missing.length}件あります。\n` +
      `このままだと記事のページが出ません。\n` +
      missing.map((m) => `  import "./${m}";`).join("\n")
  );
  process.exit(1);
}

console.log("記事ファイルはすべて register-all.ts に入っています");
