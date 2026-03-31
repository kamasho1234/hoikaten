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
  const otherArticles = allArticles
    .filter((a) => a.slug !== slug)
    .slice(0, 3);

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <nav className="text-sm text-muted-foreground mb-6 flex items-center gap-2">
        <a href={`/${city}`} className="hover:underline hover:text-primary">
          {data.municipality.name}
        </a>
        <span>/</span>
        <a
          href={`/${city}/articles`}
          className="hover:underline hover:text-primary"
        >
          記事一覧
        </a>
      </nav>

      <article>
        <div className="mb-8">
          <div className="inline-block bg-primary/10 text-primary text-xs font-medium px-3 py-1 rounded-full mb-3">
            {data.municipality.name}の保活情報
          </div>
          <h1 className="text-2xl font-bold leading-relaxed mb-3">
            {article.title}
          </h1>
          <p className="text-muted-foreground">{article.description}</p>
          <p className="text-xs text-muted-foreground mt-2">
            更新日: {article.publishedAt}
          </p>
        </div>

        <div
          className="prose prose-sm sm:prose-base max-w-none
            prose-headings:font-bold prose-headings:text-foreground
            prose-h2:text-lg prose-h2:mt-8 prose-h2:mb-4 prose-h2:pb-2 prose-h2:border-b prose-h2:border-border
            prose-h3:text-base prose-h3:mt-6 prose-h3:mb-3
            prose-p:text-foreground/90 prose-p:leading-relaxed
            prose-li:text-foreground/90
            prose-strong:text-foreground prose-strong:font-semibold
            prose-a:text-primary prose-a:no-underline hover:prose-a:underline
            prose-blockquote:border-l-primary prose-blockquote:bg-muted/30 prose-blockquote:py-1 prose-blockquote:px-4 prose-blockquote:rounded-r-lg prose-blockquote:not-italic
            prose-table:text-sm
            prose-th:bg-muted/50 prose-th:px-3 prose-th:py-2
            prose-td:px-3 prose-td:py-2 prose-td:border-b prose-td:border-border"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />
      </article>

      <div className="mt-10 bg-primary/5 rounded-xl p-6 text-center">
        <p className="font-bold mb-2">
          {data.municipality.name}の入園点数をチェック
        </p>
        <p className="text-sm text-muted-foreground mb-4">
          かんたんな質問に答えるだけで点数の目安がわかります
        </p>
        <a
          href={`/${city}`}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
        >
          点数シミュレーターを試す
        </a>
      </div>

      {otherArticles.length > 0 && (
        <div className="mt-10">
          <h3 className="text-lg font-bold mb-4">あわせて読みたい</h3>
          <div className="space-y-3">
            {otherArticles.map((a) => (
              <a key={a.slug} href={`/${city}/articles/${a.slug}`}>
                <Card className="hover:border-primary/50 hover:shadow-sm transition-all cursor-pointer">
                  <CardHeader className="py-3">
                    <CardTitle className="text-sm">{a.title}</CardTitle>
                    <CardDescription className="text-xs">
                      {a.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </a>
            ))}
          </div>
        </div>
      )}

      <div className="mt-8 border-t pt-6">
        <p className="text-xs text-muted-foreground">
          ※ この記事の情報は執筆時点のものです。最新情報は
          {data.municipality.name}
          の公式サイトをご確認ください。
        </p>
      </div>
    </div>
  );
}
