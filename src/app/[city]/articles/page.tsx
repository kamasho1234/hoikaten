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
    description: `${data.municipality.name}で保活中の方に役立つ記事まとめ。保育園選び、点数アップのコツ、入園準備など。`,
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
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-2">
          {data.municipality.name}の保育園・子育て情報
        </h2>
        <p className="text-muted-foreground">
          保活に役立つ記事をまとめました
        </p>
      </div>

      {articles.length === 0 ? (
        <p className="text-muted-foreground">記事は準備中です</p>
      ) : (
        <div className="space-y-4">
          {articles.map((article) => (
            <a key={article.slug} href={`/${city}/articles/${article.slug}`}>
              <Card className="hover:border-primary/50 hover:shadow-md transition-all cursor-pointer">
                <CardHeader>
                  <CardTitle className="text-lg">{article.title}</CardTitle>
                  <CardDescription>{article.description}</CardDescription>
                </CardHeader>
              </Card>
            </a>
          ))}
        </div>
      )}

      <div className="mt-8 text-center">
        <a
          href={`/${city}`}
          className="text-sm text-primary hover:underline"
        >
          点数シミュレーターに戻る
        </a>
      </div>
    </div>
  );
}
