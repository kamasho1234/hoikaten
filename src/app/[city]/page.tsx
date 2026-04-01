import { notFound } from "next/navigation";
import { getMunicipalityData } from "@/lib/data";
import { getArticlesByCity } from "@/lib/articles";
import { SimulatorForm } from "./simulator-form";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

export default async function CityPage({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  const { city } = await params;
  const data = getMunicipalityData(city);
  if (!data) notFound();

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">
          {data.municipality.name}の保育園、何点とれる？
        </h2>
        <p className="text-muted-foreground">
          かんたんな質問に答えるだけで、入園点数の目安がわかります
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          {data.municipality.scoringMethod === "min"
            ? "保護者の低い方のランク＋調整指数で判定されます"
            : `保護者1・保護者2の合計で最大${data.municipality.maxBasePoints}点`}
        </p>
      </div>
      <SimulatorForm data={data} />

      <div className="mt-10 space-y-3">
        <p className="text-sm font-medium text-center text-muted-foreground">
          このシミュレーターをシェアする
        </p>
        <div className="flex justify-center gap-3">
          <a
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`${data.municipality.name}の保育園入園点数シミュレーター、かんたんに点数がわかって便利！`)}&url=${encodeURIComponent(`https://${data.municipality.slug}.hoikaten.com`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-black text-white text-sm font-medium hover:bg-gray-800 transition-colors"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
            X
          </a>
          <a
            href={`https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(`https://${data.municipality.slug}.hoikaten.com`)}&text=${encodeURIComponent(`${data.municipality.name}の保育園入園点数シミュレーター`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#06C755] text-white text-sm font-medium hover:bg-[#05b04c] transition-colors"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
              <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
            </svg>
            LINE
          </a>
        </div>
      </div>

      {(() => {
        const articles = getArticlesByCity(city);
        if (articles.length === 0) return null;
        return (
          <div className="mt-10">
            <h3 className="text-lg font-bold mb-4">
              {data.municipality.name}の保活に役立つ記事
            </h3>
            <div className="space-y-3">
              {articles.slice(0, 5).map((article) => (
                <a key={article.slug} href={`/${city}/articles/${article.slug}`} className="block group">
                  <div className="flex gap-3 items-center p-3 rounded-lg border hover:border-primary/30 hover:shadow-sm transition-all">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-16 h-12 rounded-md object-cover flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium leading-snug group-hover:text-primary transition-colors line-clamp-2">
                        {article.title}
                      </p>
                    </div>
                  </div>
                </a>
              ))}
            </div>
            {articles.length > 5 && (
              <div className="mt-3 text-center">
                <a
                  href={`/${city}/articles`}
                  className="text-sm text-primary hover:underline"
                >
                  すべての記事を見る（{articles.length}件）
                </a>
              </div>
            )}
          </div>
        );
      })()}
    </div>
  );
}
