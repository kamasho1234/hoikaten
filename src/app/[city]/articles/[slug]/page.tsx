import { notFound } from "next/navigation";
import { getMunicipalityData, getAllMunicipalities } from "@/lib/data";
import { getArticle, getArticlesByCity } from "@/lib/articles";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

export function generateStaticParams() {
  const municipalities = getAllMunicipalities();
  const params: { city: string; slug: string }[] = [];
  for (const m of municipalities) {
    const articles = getArticlesByCity(m.slug);
    for (const a of articles) {
      params.push({ city: m.slug, slug: a.slug });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string; slug: string }>;
}) {
  const { city, slug } = await params;
  const article = getArticle(city, slug);
  if (!article) return {};
  const data = getMunicipalityData(city);
  return {
    title: `${article.title}｜${data?.municipality.name ?? city}｜hoikaten`,
    description: article.description,
  };
}

const categoryColorMap = {
  green: "bg-green-50 text-green-700 border-green-200",
  blue: "bg-blue-50 text-blue-700 border-blue-200",
  amber: "bg-amber-50 text-amber-700 border-amber-200",
  rose: "bg-rose-50 text-rose-700 border-rose-200",
  purple: "bg-purple-50 text-purple-700 border-purple-200",
  teal: "bg-teal-50 text-teal-700 border-teal-200",
} as const;

const categoryBorderMap = {
  green: "border-l-green-400",
  blue: "border-l-blue-400",
  amber: "border-l-amber-400",
  rose: "border-l-rose-400",
  purple: "border-l-purple-400",
  teal: "border-l-teal-400",
} as const;

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ city: string; slug: string }>;
}) {
  const { city, slug } = await params;
  const data = getMunicipalityData(city);
  const article = getArticle(city, slug);
  if (!data || !article) notFound();

  const allArticles = getArticlesByCity(city);
  const otherArticles = allArticles.filter((a) => a.slug !== slug).slice(0, 3);
  const labelColor = categoryColorMap[article.categoryColor];

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      {/* パンくず */}
      <nav className="text-sm text-muted-foreground mb-6 flex items-center gap-2 flex-wrap">
        <a href="/" className="hover:underline hover:text-primary">ホーム</a>
        <span>/</span>
        <a href={`/${city}`} className="hover:underline hover:text-primary">{data.municipality.name}</a>
        <span>/</span>
        <a href={`/${city}/articles`} className="hover:underline hover:text-primary">記事一覧</a>
      </nav>

      {/* ヒーロー画像 */}
      <div className="relative rounded-2xl overflow-hidden mb-8">
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-48 sm:h-64 object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <span className={`inline-block text-xs font-medium px-3 py-1 rounded-full border mb-3 ${labelColor}`}>
            {article.category}
          </span>
          <h1 className="text-xl sm:text-2xl font-bold text-white leading-relaxed">
            {article.title}
          </h1>
        </div>
      </div>

      {/* メタ情報 */}
      <div className="flex items-center gap-3 text-xs text-muted-foreground mb-8">
        <span>{data.municipality.name}の保活情報</span>
        <span>|</span>
        <span>更新日: {article.publishedAt}</span>
      </div>

      {/* リード文 */}
      <p className="text-base text-foreground/80 leading-relaxed mb-8 border-l-4 border-primary/20 pl-4">
        {article.description}
      </p>

      {/* 記事本文 */}
      <article>
        <div
          className="
            prose prose-sm sm:prose-base max-w-none
            prose-headings:font-bold prose-headings:text-foreground
            prose-h2:text-lg prose-h2:mt-12 prose-h2:mb-5 prose-h2:pb-2 prose-h2:border-b prose-h2:border-border
            prose-h3:text-base prose-h3:mt-6 prose-h3:mb-3
            prose-p:text-foreground/85 prose-p:leading-[1.8]
            prose-li:text-foreground/85 prose-li:leading-[1.8]
            prose-strong:text-foreground prose-strong:font-semibold
            prose-a:text-primary prose-a:no-underline hover:prose-a:underline
            prose-blockquote:border-l-4 prose-blockquote:border-primary/30 prose-blockquote:bg-primary/5 prose-blockquote:py-3 prose-blockquote:px-5 prose-blockquote:rounded-r-xl prose-blockquote:not-italic prose-blockquote:my-6
            prose-table:text-sm prose-table:my-6 [&_table]:block [&_table]:overflow-x-auto
            prose-th:bg-muted/60 prose-th:px-4 prose-th:py-2.5 prose-th:text-left prose-th:font-medium
            prose-td:px-4 prose-td:py-2.5 prose-td:border-b prose-td:border-border
            prose-ul:my-4 prose-ol:my-4
            [&_.point-box]:bg-amber-50 [&_.point-box]:border [&_.point-box]:border-amber-200 [&_.point-box]:rounded-xl [&_.point-box]:p-5 [&_.point-box]:my-6
            [&_.point-box_p]:text-amber-900 [&_.point-box_p]:text-sm [&_.point-box_p]:m-0
            [&_.info-box]:bg-blue-50 [&_.info-box]:border [&_.info-box]:border-blue-200 [&_.info-box]:rounded-xl [&_.info-box]:p-5 [&_.info-box]:my-6
            [&_.info-box_p]:text-blue-900 [&_.info-box_p]:text-sm [&_.info-box_p]:m-0
            [&_.warn-box]:bg-red-50 [&_.warn-box]:border [&_.warn-box]:border-red-200 [&_.warn-box]:rounded-xl [&_.warn-box]:p-5 [&_.warn-box]:my-6
            [&_.warn-box_p]:text-red-900 [&_.warn-box_p]:text-sm [&_.warn-box_p]:m-0
            [&_.step]:flex [&_.step]:gap-4 [&_.step]:my-4
            [&_.step-num]:flex-shrink-0 [&_.step-num]:w-8 [&_.step-num]:h-8 [&_.step-num]:rounded-full [&_.step-num]:bg-primary [&_.step-num]:text-primary-foreground [&_.step-num]:flex [&_.step-num]:items-center [&_.step-num]:justify-center [&_.step-num]:text-sm [&_.step-num]:font-bold
            [&_.step-content]:flex-1 [&_.step-content]:pt-1
            [&_.highlight]:bg-yellow-100 [&_.highlight]:px-1 [&_.highlight]:rounded
          "
          dangerouslySetInnerHTML={{ __html: article.content }}
        />
      </article>

      {/* CTA */}
      <div className="mt-10 bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl p-8 text-center">
        <p className="font-bold text-lg mb-2">
          {data.municipality.name}の入園点数をチェック
        </p>
        <p className="text-sm text-muted-foreground mb-5">
          かんたんな質問に答えるだけで点数の目安がわかります
        </p>
        <a
          href={`/${city}`}
          className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors shadow-sm"
        >
          点数シミュレーターを試す
        </a>
      </div>

      {/* あわせて読みたい */}
      {otherArticles.length > 0 && (
        <div className="mt-10">
          <h3 className="text-lg font-bold mb-4">あわせて読みたい</h3>
          <div className="space-y-3">
            {otherArticles.map((a) => (
              <a key={a.slug} href={`/${city}/articles/${a.slug}`}>
                <Card className={`hover:shadow-sm hover:-translate-y-0.5 transition-all cursor-pointer border-l-4 ${categoryBorderMap[a.categoryColor]}`}>
                  <CardHeader className="py-4 flex flex-row items-start gap-4">
                    <img
                      src={a.image}
                      alt={a.title}
                      className="w-20 h-14 rounded-lg object-cover flex-shrink-0 hidden sm:block"
                    />
                    <div className="flex-1 min-w-0">
                      <CardTitle className="text-sm leading-snug">{a.title}</CardTitle>
                      <CardDescription className="text-xs mt-1 line-clamp-1">
                        {a.description}
                      </CardDescription>
                    </div>
                  </CardHeader>
                </Card>
              </a>
            ))}
          </div>
        </div>
      )}

      {/* 免責 */}
      <div className="mt-8 bg-muted/30 rounded-xl p-4 border">
        <p className="text-xs text-muted-foreground leading-relaxed">
          <span className="font-medium">免責事項：</span>この記事の情報は
          {article.publishedAt}時点のものです。最新情報は
          {data.municipality.name}の公式サイトをご確認ください。
          当サイトの情報により生じた損害について一切の責任を負いかねます。
        </p>
      </div>
    </div>
  );
}
