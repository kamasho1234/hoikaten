import { notFound } from "next/navigation";
import { getMunicipalityData, getAllMunicipalities } from "@/lib/data";
import { getArticlesByCity } from "@/lib/articles";

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

const categoryColorMap = {
  green: "bg-green-50 text-green-700 border-green-200",
  blue: "bg-blue-50 text-blue-700 border-blue-200",
  amber: "bg-amber-50 text-amber-700 border-amber-200",
  rose: "bg-rose-50 text-rose-700 border-rose-200",
  purple: "bg-purple-50 text-purple-700 border-purple-200",
  teal: "bg-teal-50 text-teal-700 border-teal-200",
} as const;

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
        <div className="space-y-4">
          {articles.map((article) => (
            <a key={article.slug} href={`/${city}/articles/${article.slug}`} className="block group">
              <div className="flex gap-4 items-start p-4 rounded-xl border hover:border-primary/30 hover:shadow-md hover:-translate-y-0.5 transition-all bg-white">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-24 h-24 sm:w-32 sm:h-20 rounded-lg object-cover flex-shrink-0"
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
