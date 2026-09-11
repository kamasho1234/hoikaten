import { getArticlesByCity, getArticleCitySlugs } from "@/lib/articles";
import { getCityInfo } from "@/lib/city-info";
import {
  MunicipalityArticleSearch,
  type MunicipalityArticleRow,
} from "@/components/municipality-article-search";

export const metadata = {
  title: "保活コラム｜保育園 点数シミュレーター【hoikaten】",
  description: "保育園選び・点数アップ・入園準備に役立つコラム記事をまとめました。",
  alternates: {
    canonical: "https://hoikaten.com/articles",
  },
};

const categoryColorMap = {
  green: "bg-green-50 text-green-700 border-green-200",
  blue: "bg-blue-50 text-blue-700 border-blue-200",
  amber: "bg-amber-50 text-amber-700 border-amber-200",
  rose: "bg-rose-50 text-rose-700 border-rose-200",
  purple: "bg-purple-50 text-purple-700 border-purple-200",
  teal: "bg-teal-50 text-teal-700 border-teal-200",
} as const;

/** 自治体ごとのコラムがある自治体を検索ボックス用の行にする。行き先は自治体のコラム一覧 */
function collectCityRows(): MunicipalityArticleRow[] {
  const rows: MunicipalityArticleRow[] = [];
  for (const slug of getArticleCitySlugs()) {
    const info = getCityInfo(slug);
    if (!info) continue;
    rows.push({
      slug,
      name: info.name,
      prefecture: info.prefecture,
      href: `/${slug}/articles`,
      title: `${info.name}の保活コラム`,
      note: `${getArticlesByCity(slug).length}本`,
    });
  }
  return rows.sort((a, b) => a.name.localeCompare(b.name, "ja"));
}

export default function ArticlesPage() {
  const articles = getArticlesByCity("general");
  const cityRows = collectCityRows();

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <div className="hero-pattern rounded-2xl py-8 px-4 text-center mb-10 -mx-4 sm:mx-0">
        <h2
          className="text-2xl font-bold mb-2"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          保活コラム
        </h2>
        <p className="text-muted-foreground">
          保育園選び・点数アップ・入園準備に役立つ情報をまとめました
        </p>
      </div>

      <MunicipalityArticleSearch
        rows={cityRows}
        placeholder="自治体名で検索（例: せたがや、大阪府）"
        emptyMessage="その自治体のコラムはまだありません。"
      >
      {articles.length === 0 ? (
        <p className="text-muted-foreground text-center">記事は準備中です</p>
      ) : (
        <div className="space-y-4">
          {articles.map((article) => (
            <a key={article.slug} href={`/articles/${article.slug}`} className="block group">
              <div className="flex gap-4 items-start p-4 rounded-xl border border-border/60 hover:border-primary/30 hover:shadow-md hover:-translate-y-0.5 transition-all bg-card">
                <img
                  src={`/articles/${article.slug}/hero`}
                  alt={article.title}
                  className="w-24 h-24 sm:w-32 sm:h-20 rounded-xl object-cover flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <span className={`inline-block text-[10px] font-medium px-2 py-0.5 rounded-full border mb-2 ${categoryColorMap[article.categoryColor]}`}>
                    {article.category}
                  </span>
                  <h3 className="text-sm sm:text-base font-bold leading-snug group-hover:text-primary transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2 hidden sm:block">
                    {article.description}
                  </p>
                </div>
              </div>
            </a>
          ))}
        </div>
      )}
      </MunicipalityArticleSearch>

      <div className="mt-10 text-center">
        <a
          href="/"
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full btn-primary-warm text-primary-foreground text-sm font-medium"
        >
          ホームに戻る
        </a>
      </div>
    </div>
  );
}
