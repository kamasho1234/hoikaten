import { notFound } from "next/navigation";
import { getMunicipalityData, getAllMunicipalities } from "@/lib/data";
import { getArticlesByCity } from "@/lib/articles";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

export function generateStaticParams() {
  return getAllMunicipalities().map((m) => ({ city: m.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  const { city } = await params;
  const data = getMunicipalityData(city);
  if (!data) return {};
  return {
    title: `${data.municipality.name}の保育園・子育て情報｜hoikaten`,
    description: `${data.municipality.name}で保活中の方に役立つ記事まとめ。`,
  };
}

export default async function ArticlesPage({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  const { city } = await params;
  const data = getMunicipalityData(city);
  if (!data) notFound();

  const articles = getArticlesByCity(city);

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <div className="text-center mb-10">
        <h2 className="text-2xl font-bold mb-2">
          {data.municipality.name}の保活お役立ち記事
        </h2>
        <p className="text-muted-foreground">
          保育園選び・点数アップ・入園準備に役立つ情報をまとめました
        </p>
      </div>

      {articles.length === 0 ? (
        <p className="text-muted-foreground text-center">記事は準備中です</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {articles.map((article) => (
            <a key={article.slug} href={`/${city}/articles/${article.slug}`}>
              <Card className="hover:border-primary/50 hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer h-full">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-3xl">{article.emoji}</span>
                    <span className="bg-primary/15 text-primary text-xs font-medium px-2.5 py-0.5 rounded-full">
                      {article.category}
                    </span>
                  </div>
                  <CardTitle className="text-base leading-snug">
                    {article.title}
                  </CardTitle>
                  <CardDescription className="text-xs mt-2 line-clamp-2">
                    {article.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            </a>
          ))}
        </div>
      )}

      <div className="mt-10 text-center">
        <a
          href={`/${city}`}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
        >
          点数シミュレーターに戻る
        </a>
      </div>
    </div>
  );
}
