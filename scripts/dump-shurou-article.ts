// レコード方式の就労証明書記事を、タグを外したテキストで出力して目で確かめる
//   npx tsx scripts/dump-shurou-article.ts <citySlug> [slug]
import "../src/lib/articles/register-all";
import { getArticle } from "../src/lib/articles";

const a = getArticle(process.argv[2], process.argv[3] ?? "shurou-shoumeisho");
if (!a) {
  console.log("NOT FOUND");
  process.exit(1);
}
console.log(a.title);
console.log(a.description);
console.log(a.content.replace(/<[^>]+>/g, "").replace(/\n{2,}/g, "\n"));
