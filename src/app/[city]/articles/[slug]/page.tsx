import { notFound, permanentRedirect } from "next/navigation";
import { getArticleCitySlugs } from "@/lib/articles";
import { getCityInfo } from "@/lib/city-info";
import { getArticle, getArticlesByCity } from "@/lib/articles";
import { RandomTextAd } from "@/components/random-text-ad";
import { ArticleBody } from "@/components/article-body";
import { breadcrumbList } from "@/lib/jsonld";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

export function generateStaticParams() {
  const params: { city: string; slug: string }[] = [];
  for (const city of getArticleCitySlugs()) {
    if (!getCityInfo(city)) continue;
    for (const a of getArticlesByCity(city)) {
      params.push({ city, slug: a.slug });
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
  const cityName = getCityInfo(city)?.name ?? city;
  const titleSuffix = article.title.includes(cityName) ? "｜hoikaten" : `｜${cityName}｜hoikaten`;
  return {
    title: `${article.title}${titleSuffix}`,
    description: article.description,
    alternates: {
      canonical: `https://hoikaten.com/${city}/articles/${slug}`,
    },
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
  const info = getCityInfo(city);
  const article = getArticle(city, slug);
  if (!info) notFound();
  if (!article) {
    // 記事のスラッグは昔「point-system」のような自治体名なしの形だった。
    // いまは「komaki-scoring-system」のように自治体名を頭に付けている。
    // 昔のURLがそのまま404になっていて（Search Console で記事468本）、
    // 検索からの流入とリンクを捨てていたので、新しいスラッグへ送る。
    const renamed = getArticle(city, `${city}-${slug}`);
    if (renamed) permanentRedirect(`/${city}/articles/${renamed.slug}`);
    // 引っ越し先が分からないものは、同じ自治体の記事一覧へ送る
    permanentRedirect(`/${city}/articles`);
  }

  const allArticles = getArticlesByCity(city);
  const otherArticles = allArticles.filter((a) => a.slug !== slug).slice(0, 3);
  const labelColor = categoryColorMap[article.categoryColor];

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    datePublished: article.publishedAt,
    author: { "@type": "Organization", name: "hoikaten" },
    publisher: { "@type": "Organization", name: "hoikaten" },
    image: `https://hoikaten.com/${city}/articles/${slug}/hero`,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://hoikaten.com/${city}/articles/${slug}`,
    },
  };

  const breadcrumbJsonLd = breadcrumbList([
    { name: "ホーム", path: "/" },
    ...(info.hasSimulator ? [{ name: info.name, path: `/${city}` }] : []),
    { name: `${info.name}の記事一覧`, path: `/${city}/articles` },
    { name: article.title, path: `/${city}/articles/${slug}` },
  ]);

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {/* パンくず */}
      <nav className="text-sm text-muted-foreground mb-6 flex items-center gap-2 flex-wrap">
        <a href="/" className="hover:underline hover:text-primary">ホーム</a>
        <span>/</span>
        {info.hasSimulator ? (
          <a href={`/${city}`} className="hover:underline hover:text-primary">{info.name}</a>
        ) : (
          <span>{info.name}</span>
        )}
        <span>/</span>
        <a href={`/${city}/articles`} className="hover:underline hover:text-primary">記事一覧</a>
      </nav>

      {/* ヒーロー画像 */}
      <div className="relative rounded-2xl overflow-hidden mb-8">
        <img
          src={`/${city}/articles/${slug}/hero`}
          alt={article.title}
          className="w-full h-48 sm:h-64 object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <span className={`inline-block text-xs font-medium px-3 py-1 rounded-full border mb-3 ${labelColor}`}>
            {article.category}
          </span>
          <h1 className="text-xl sm:text-2xl font-bold text-white leading-relaxed drop-shadow-sm" style={{ fontFamily: "var(--font-heading)" }}>
            {article.title}
          </h1>
        </div>
      </div>

      {/* メタ情報 */}
      <div className="flex items-center gap-3 text-xs text-muted-foreground mb-8">
        <span>{info.name}の保活情報</span>
        <span>|</span>
        <span>更新日: {article.publishedAt}</span>
      </div>

      {/* リード文 */}
      <p className="text-base text-foreground/80 leading-relaxed mb-8 border-l-4 border-primary/20 pl-4">
        {article.description}
      </p>

      {/* 記事本文（中盤にテキスト広告を挿入） */}
      <ArticleBody html={article.content} />

      {/* CTA。点数の基準が無い自治体ではシミュレーターが無いので出さない */}
      {info.hasSimulator && (
      <div className="mt-10 hero-pattern rounded-2xl p-8 text-center border border-primary/10">
        <p className="font-bold text-lg mb-2" style={{ fontFamily: "var(--font-heading)" }}>
          {info.name}の入園点数をチェック
        </p>
        <p className="text-sm text-muted-foreground mb-5">
          かんたんな質問に答えるだけで点数の目安がわかります
        </p>
        <a
          href={`/${city}`}
          className="inline-flex items-center gap-2 px-8 py-3 rounded-full btn-primary-warm text-primary-foreground text-sm font-medium"
        >
          点数シミュレーターを試す
        </a>
      </div>
      )}

      {/* シェア直上のテキスト広告 */}
      <RandomTextAd />

      {/* SNS共有 */}
      <div className="mt-8 space-y-3">
        <p className="text-sm font-medium text-center text-muted-foreground">
          この記事をシェアする
        </p>
        <div className="flex justify-center gap-3">
          <a
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=${encodeURIComponent(`https://hoikaten.com/${city}/articles/${slug}`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-black text-white text-sm font-medium hover:bg-gray-800 transition-colors"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
            X
          </a>
          <a
            href={`https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(`https://hoikaten.com/${city}/articles/${slug}`)}&text=${encodeURIComponent(article.title)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#06C755] text-white text-sm font-medium hover:bg-[#05b04c] transition-colors"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
              <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
            </svg>
            LINE
          </a>
        </div>
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
                      src={`/${city}/articles/${a.slug}/hero`}
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
          {info.name}の公式サイトをご確認ください。
          当サイトの情報により生じた損害について一切の責任を負いかねます。
        </p>
      </div>
    </div>
  );
}
