import { notFound } from "next/navigation";
import "@/lib/documents/register-all";
import { getAllDocuments, getDocument, GROUP_COLOR } from "@/lib/documents";
import { breadcrumbList, faqPage } from "@/lib/jsonld";
import { ArticleBody } from "@/components/article-body";

export function generateStaticParams() {
  return getAllDocuments().map((g) => ({ slug: g.slug }));
}

/** 書類ガイドのないslugは生成しない */
export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guide = getDocument(slug);
  if (!guide) return {};
  return {
    title: `${guide.title}｜子育て書類ガイド【hoikaten】`,
    description: guide.description,
    alternates: {
      canonical: `https://hoikaten.com/documents/${slug}`,
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

export default async function DocumentPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guide = getDocument(slug);
  if (!guide) notFound();

  const color = GROUP_COLOR[guide.group];
  const labelColor = labelColorMap[color];

  // 同じグループの他の書類を先に、足りなければ他のグループから補う
  const others = getAllDocuments().filter((g) => g.slug !== slug);
  const related = [
    ...others.filter((g) => g.group === guide.group),
    ...others.filter((g) => g.group !== guide.group),
  ].slice(0, 4);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.title,
    description: guide.description,
    dateModified: guide.updatedAt,
    datePublished: guide.updatedAt,
    author: { "@type": "Organization", name: "hoikaten" },
    publisher: { "@type": "Organization", name: "hoikaten" },
    image: `https://hoikaten.com/documents/${slug}/hero`,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://hoikaten.com/documents/${slug}`,
    },
    // 参照した公式情報を citation として示す
    citation: guide.sources.map((s) => ({
      "@type": "CreativeWork",
      name: s.label,
      url: s.url,
    })),
  };

  const breadcrumbJsonLd = breadcrumbList([
    { name: "ホーム", path: "/" },
    { name: "子育て書類ガイド", path: "/documents" },
    { name: guide.title, path: `/documents/${slug}` },
  ]);

  const faqJsonLd = guide.faq?.length
    ? faqPage(guide.faq.map((f) => ({ question: f.q, answer: f.a })))
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
        <a href="/documents" className="hover:underline hover:text-primary">
          子育て書類ガイド
        </a>
      </nav>

      {/* ヒーロー画像 */}
      <div className="relative rounded-2xl overflow-hidden mb-8">
        <img
          src={`/documents/${slug}/hero`}
          alt={guide.title}
          className="w-full h-48 sm:h-64 object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <span
            className={`inline-block text-xs font-medium px-3 py-1 rounded-full border mb-3 ${labelColor}`}
          >
            {guide.group}
          </span>
          <h1
            className="text-xl sm:text-2xl font-bold text-white leading-relaxed drop-shadow-sm"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {guide.title}
          </h1>
        </div>
      </div>

      <div className="flex items-center gap-3 text-xs text-muted-foreground mb-8">
        <span>子育て書類ガイド</span>
        <span>|</span>
        <span>更新日: {guide.updatedAt}</span>
      </div>

      <p className="text-base text-foreground/80 leading-relaxed mb-8 border-l-4 border-primary/20 pl-4">
        {guide.description}
      </p>

      {/* この書類を使う手続き。保育園以外でも使うことを最初に見せる */}
      <div className="rounded-xl border border-border/60 bg-muted/30 p-5 mb-10">
        <h2 className="text-sm font-bold mb-3">この書類を使う手続き</h2>
        <ul className="space-y-1.5 m-0 list-none p-0">
          {guide.usedFor.map((use) => (
            <li key={use} className="text-sm text-foreground/80 flex gap-2">
              <span className="text-primary flex-shrink-0">・</span>
              <span>{use}</span>
            </li>
          ))}
        </ul>
      </div>

      <ArticleBody html={guide.content} />

      {/* よくある質問 */}
      {guide.faq && guide.faq.length > 0 && (
        <section className="mt-12">
          <h2
            className="text-lg font-bold mb-5 pb-2 border-b border-border"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            よくある質問
          </h2>
          <div className="space-y-4">
            {guide.faq.map((item) => (
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
          {guide.sources.map((source) => (
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
          手数料・窓口・必要書類の細かいところは自治体によって違います。
          最後は必ずお住まいの自治体の案内をご確認ください。
        </p>
      </section>

      <div className="mt-10">
      </div>

      {/* 関連する書類 */}
      {related.length > 0 && (
        <section className="mt-12">
          <h2
            className="text-lg font-bold mb-5 pb-2 border-b border-border"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            ほかの書類も見る
          </h2>
          <div className="space-y-3">
            {related.map((item) => (
              <a
                key={item.slug}
                href={`/documents/${item.slug}`}
                className="block group"
              >
                <div className="p-4 rounded-xl border border-border/60 hover:border-primary/30 hover:shadow-md transition-all bg-card">
                  <span
                    className={`inline-block text-[11px] font-medium px-2.5 py-0.5 rounded-full border mb-2 ${
                      labelColorMap[GROUP_COLOR[item.group]]
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
          href="/documents"
          className="inline-block text-sm text-primary hover:underline"
        >
          子育て書類ガイドの一覧に戻る
        </a>
      </div>
    </div>
  );
}
