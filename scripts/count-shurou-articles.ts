// レコード方式の就労証明書記事が何本登録されたかを数える
import "../src/lib/articles/register-all";
import { getAllArticles } from "../src/lib/articles";

const a = getAllArticles().filter(
  (x) => x.slug === "shurou-shoumeisho" || (x.citySlug === "toyohashi" && x.slug === "employment-certificate"),
);
console.log("レコード記事", a.length, "／ 全記事", getAllArticles().length);
const dup = new Map<string, number>();
for (const x of getAllArticles()) {
  const k = `${x.citySlug}/${x.slug}`;
  dup.set(k, (dup.get(k) ?? 0) + 1);
}
console.log("slug 重複", [...dup].filter(([, n]) => n > 1));
