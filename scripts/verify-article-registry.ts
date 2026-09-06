/**
 * 記事がちゃんと公開される形になっているか確かめる。
 *
 * 見るのは2つ。どちらも**型チェックもビルドも通るのにページだけ出ない**という
 * 気付きにくい壊れ方をするので、ここで落とす。
 *
 *   1. register-all.ts に import があるか
 *      記事ファイルを作っても import を足し忘れると registerArticles() が走らない。
 *      実際に7自治体・72本の記事が、この抜けで長く公開されていなかった。
 *
 *   2. slug が半角英数とハイフンだけか
 *      見た目が同じでも別の文字が混ざるとURLが合わなくなる。
 *      実際に「lotterу」の у がキリル文字（U+0443）になっていた記事があった。
 *      日本語の slug も同じく出ない。
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

const OK_SLUG = /^[a-z0-9-]+$/;

const missing: string[] = [];
const badSlugs: string[] = [];
let checked = 0;

for (const file of readdirSync(DIR)) {
  if (!file.endsWith(".ts")) continue;
  const name = file.slice(0, -3);
  if (NOT_A_CITY.has(name)) continue;
  const body = readFileSync(join(DIR, file), "utf-8");

  for (const m of body.matchAll(
    /slug:\s*"([^"]+)",\s*\n\s*citySlug:\s*"([^"]+)"/g
  )) {
    checked++;
    const [, slug, citySlug] = m;
    if (!OK_SLUG.test(slug) || !OK_SLUG.test(citySlug)) {
      badSlugs.push(`${file}  ${citySlug}/articles/${slug}`);
    }
  }

  // registerArticles を呼ぶファイルだけが、import されて初めて効く
  if (!body.includes("registerArticles(")) continue;
  if (!imported.has(name)) missing.push(name);
}

let ng = false;

if (missing.length > 0) {
  ng = true;
  console.error(
    `register-all.ts に import が無い記事ファイルが ${missing.length}件あります。\n` +
      `このままだと記事のページが出ません。\n` +
      missing.map((m) => `  import "./${m}";`).join("\n")
  );
}

if (badSlugs.length > 0) {
  ng = true;
  console.error(
    `slug に半角英数・ハイフン以外が入っている記事が ${badSlugs.length}件あります。\n` +
      `このままだと記事のページが出ません。\n` +
      badSlugs.map((s) => `  ${s}`).join("\n")
  );
}

if (ng) process.exit(1);

console.log(`記事 ${checked}本を確かめました。import も slug も問題ありません`);
