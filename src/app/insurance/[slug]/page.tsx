import { notFound } from "next/navigation";
import "@/lib/insurance/register-all";
import {
  getAllInsuranceArticles,
  getInsuranceArticle,
  INSURANCE_GROUP_COLOR,
} from "@/lib/insurance";
import { breadcrumbList, faqPage } from "@/lib/jsonld";
import { ArticleBody } from "@/components/article-body";
import { BabyPlanetCta } from "@/components/babyplanet-cta";

export function generateStaticParams() {
  return getAllInsuranceArticles().map((a) => ({ slug: a.slug }));
}

/** 記事のないslugは生成しない */
export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getInsuranceArticle(slug);
  if (!article) return {};
  return {
    title: `${article.title}｜妊娠・出産・育児のお金【hoikaten】`,
    description: article.description,
    alternates: {
      canonical: `https://hoikaten.com/insurance/${slug}`,
    },
  };
}

const labelColorMap = {
  green: "bg-green-50 text-green-700 border-green-200",
  blue: "bg-blue-50 text-blue-700 border-blue-200",
  amber: "bg-amber-50 text-amber-700 border-amber-200",
  rose: "bg-rose-50 text-rose-700 border-rose-200",
  purple: "bg-purple-50 text-purple-700 border-purple-200",
  teal: "bg-teal-50 text-teal-700 border-teal-200",
} as const;

export default async function InsuranceArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getInsuranceArticle(slug);
  if (!article) notFound();

  const color = INSURANCE_GROUP_COLOR[article.group];
  const labelColor = labelColorMap[color];

  // 同じグループの他の記事を先に、足りなければ他のグループから補う
  const others = getAllInsuranceArticles().filter((a) => a.slug !== slug);
  const related = [
    ...others.filter((a) => a.group === article.group),
    ...others.filter((a) => a.group !== article.group),
  ].slice(0, 4);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    dateModified: article.updatedAt,
    datePublished: article.updatedAt,
    author: { "@type": "Organization", name: "hoikaten" },
    publisher: { "@type": "Organization", name: "hoikaten" },
    image: `https://hoikaten.com/insurance/${slug}/hero`,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://hoikaten.com/insurance/${slug}`,
    },
    citation: article.sources.map((s) => ({
      "@type": "CreativeWork",
      name: s.label,
      url: s.url,
    })),
  };

  const breadcrumbJsonLd = breadcrumbList([
    { name: "ホーム", path: "/" },
    { name: "妊娠・出産・育児のお金", path: "/insurance" },
    { name: article.title, path: `/insurance/${slug}` },
  ]);

  const faqJsonLd = article.faq?.length
    ? faqPage(article.faq.map((f) => ({ question: f.q, answer: f.a })))
    : null;

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
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}

      <nav className="text-sm text-muted-foreground mb-6 flex items-center gap-2 flex-wrap">
        <a href="/" className="hover:underline hover:text-primary">
          ホーム
        </a>
        <span>/</span>
        <a href="/insurance" className="hover:underline hover:text-primary">
          妊娠・出産・育児のお金
        </a>
      </nav>

      {/* ヒーロー画像 */}
      <div className="relative rounded-2xl overflow-hidden mb-8">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`/insurance/${slug}/hero`}
          alt={article.title}
          className="w-full h-48 sm:h-64 object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <span
            className={`inline-block text-xs font-medium px-3 py-1 rounded-full border mb-3 ${labelColor}`}
          >
            {article.group}
          </span>
          <h1
            className="text-xl sm:text-2xl font-bold text-white leading-relaxed drop-shadow-sm"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {article.title}
          </h1>
        </div>
      </div>

      <div className="flex items-center gap-3 text-xs text-muted-foreground mb-4">
        <span>妊娠・出産・育児のお金</span>
        <span>|</span>
        <span>更新日: {article.updatedAt}</span>
      </div>

      {/*
        景品表示法（ステルスマーケティング告示）にもとづく表示。
        本文中にも広告のリンクがあるため、記事の頭で必ず知らせる
      */}
      <p className="text-xs text-muted-foreground bg-muted/40 border border-border/60 rounded-lg px-4 py-2.5 mb-6">
        この記事には広告（PR）が含まれます。制度の内容は公的機関の資料をもとにしており、
        広告主の意向で変えているものではありません。
      </p>

      <p className="text-base text-foreground/80 leading-relaxed mb-8 border-l-4 border-primary/20 pl-4">
        {article.description}
      </p>

      {/* だれ向けの記事か */}
      <div className="rounded-xl border border-border/60 bg-muted/30 p-5 mb-10">
        <h2 className="text-sm font-bold mb-3">こんなときに読む記事です</h2>
        <ul className="space-y-1.5 m-0 list-none p-0">
          {article.readerFor.map((reader) => (
            <li key={reader} className="text-sm text-foreground/80 flex gap-2">
              <span className="text-primary flex-shrink-0">・</span>
              <span>{reader}</span>
            </li>
          ))}
        </ul>
      </div>

      <ArticleBody html={article.content} />

      {/* 相談の案内。計測用の画像を含むので1ページに1つだけ置く */}
      <BabyPlanetCta heading={article.cta.heading} body={article.cta.body} />

      {/* よくある質問 */}
      {article.faq && article.faq.length > 0 && (
        <section className="mt-12">
          <h2
            className="text-lg font-bold mb-5 pb-2 border-b border-border"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            よくある質問
          </h2>
          <div className="space-y-4">
            {article.faq.map((item) => (
              <div
                key={item.q}
                className="rounded-xl border border-border/60 bg-card p-5"
              >
                <p className="font-semibold text-sm mb-2">{item.q}</p>
                <p className="text-sm text-foreground/80 leading-relaxed m-0">
                  {item.a}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 出典 */}
      <section className="mt-12">
        <h2
          className="text-lg font-bold mb-4 pb-2 border-b border-border"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          参照した公式情報
        </h2>
        <ul className="space-y-2 text-sm">
          {article.sources.map((source) => (
            <li key={source.url}>
              <a
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline break-all"
              >
                {source.label}
              </a>
            </li>
          ))}
        </ul>
        <p className="text-xs text-muted-foreground mt-4 leading-relaxed">
          制度は改正されることがあり、自治体や加入している健康保険によって扱いが違う部分もあります。
          最後は必ず公式の案内をご確認ください。この記事は保険商品の勧誘を目的としたものではありません。
        </p>
      </section>

      {/* 関連する記事 */}
      {related.length > 0 && (
        <section className="mt-12">
          <h2
            className="text-lg font-bold mb-5 pb-2 border-b border-border"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            ほかの記事も見る
          </h2>
          <div className="space-y-3">
            {related.map((item) => (
              <a
                key={item.slug}
                href={`/insurance/${item.slug}`}
                className="block group"
              >
                <div className="p-4 rounded-xl border border-border/60 hover:border-primary/30 hover:shadow-md transition-all bg-card">
                  <span
                    className={`inline-block text-[11px] font-medium px-2.5 py-0.5 rounded-full border mb-2 ${
                      labelColorMap[INSURANCE_GROUP_COLOR[item.group]]
                    }`}
                  >
                    {item.group}
                  </span>
                  <p className="font-medium text-sm leading-relaxed group-hover:text-primary transition-colors m-0">
                    {item.title}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </section>
      )}

      <div className="mt-10 text-center">
        <a
          href="/insurance"
          className="inline-block text-sm text-primary hover:underline"
        >
          妊娠・出産・育児のお金の記事一覧に戻る
        </a>
      </div>
    </div>
  );
}
