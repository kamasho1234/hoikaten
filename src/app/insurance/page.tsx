import "@/lib/insurance/register-all";
import {
  getAllInsuranceArticles,
  getInsuranceByGroup,
  INSURANCE_GROUP_COLOR,
} from "@/lib/insurance";
import { breadcrumbList } from "@/lib/jsonld";

const COUNT = getAllInsuranceArticles().length;

export const metadata = {
  title: "妊娠・出産・育児のお金｜公的な保障でどこまで足りるか【hoikaten】",
  description: `出産育児一時金50万円、令和8年8月に変わった高額療養費制度、育児休業給付、遺族基礎年金など、公的な保障の中身を${COUNT}本の記事にまとめました。足りない部分をどう考えるかまで整理しています。`,
  alternates: {
    canonical: "https://hoikaten.com/insurance",
  },
};

const labelColorMap = {
  green: "bg-green-50 text-green-700 border-green-200",
  blue: "bg-blue-50 text-blue-700 border-blue-200",
  amber: "bg-amber-50 text-amber-700 border-amber-200",
  rose: "bg-rose-50 text-rose-700 border-rose-200",
  purple: "bg-purple-50 text-purple-700 border-purple-200",
  teal: "bg-teal-50 text-teal-700 border-teal-200",
} as const;

export default function InsuranceHubPage() {
  const sections = getInsuranceByGroup();

  const breadcrumbJsonLd = breadcrumbList([
    { name: "ホーム", path: "/" },
    { name: "妊娠・出産・育児のお金", path: "/insurance" },
  ]);

  const collectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "妊娠・出産・育児のお金",
    description: metadata.description,
    url: "https://hoikaten.com/insurance",
    hasPart: getAllInsuranceArticles().map((a) => ({
      "@type": "Article",
      headline: a.title,
      url: `https://hoikaten.com/insurance/${a.slug}`,
    })),
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }}
      />

      <nav className="text-sm text-muted-foreground mb-6 flex items-center gap-2 flex-wrap">
        <a href="/" className="hover:underline hover:text-primary">
          ホーム
        </a>
        <span>/</span>
        <span>妊娠・出産・育児のお金</span>
      </nav>

      <h1
        className="text-2xl sm:text-3xl font-bold mb-4"
        style={{ fontFamily: "var(--font-heading)" }}
      >
        妊娠・出産・育児のお金
      </h1>

      <p className="text-base text-foreground/80 leading-relaxed mb-6">
        出産や育児にかかるお金は、<strong>公的な保障でどこまで賄われるか</strong>を
        先に知ると整理しやすくなります。ここでは出産育児一時金や高額療養費、育児休業給付、
        遺族年金といった制度の中身を、公的機関の資料をもとに{COUNT}本の記事にまとめました。
        そのうえで、足りない部分をどう考えるかまで扱っています。
      </p>

      <div className="rounded-xl border border-border/60 bg-muted/30 p-5 mb-10">
        <h2 className="text-sm font-bold mb-2">この記事群の書き方について</h2>
        <ul className="space-y-1.5 m-0 list-none p-0 text-sm text-foreground/80">
          <li className="flex gap-2">
            <span className="text-primary flex-shrink-0">・</span>
            <span>公的な保障の事実を先に書き、民間の保険はそのあとに扱います</span>
          </li>
          <li className="flex gap-2">
            <span className="text-primary flex-shrink-0">・</span>
            <span>数字には必ず出典（公的機関の資料）を示します</span>
          </li>
          <li className="flex gap-2">
            <span className="text-primary flex-shrink-0">・</span>
            <span>
              保険商品そのものの良し悪しは書きません。条件が人によって変わり、
              こちらで確かめられないためです
            </span>
          </li>
          <li className="flex gap-2">
            <span className="text-primary flex-shrink-0">・</span>
            <span>各記事には広告（PR）が含まれます。記事の頭で必ずお知らせします</span>
          </li>
        </ul>
      </div>

      {sections.map((section) => (
        <section key={section.group} className="mb-10">
          <h2
            className="text-lg font-bold mb-4 pb-2 border-b border-border"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {section.group}
          </h2>
          <div className="space-y-3">
            {section.articles.map((article) => (
              <a
                key={article.slug}
                href={`/insurance/${article.slug}`}
                className="block group"
              >
                <div className="p-4 rounded-xl border border-border/60 hover:border-primary/30 hover:shadow-md transition-all bg-card">
                  <span
                    className={`inline-block text-[11px] font-medium px-2.5 py-0.5 rounded-full border mb-2 ${
                      labelColorMap[INSURANCE_GROUP_COLOR[article.group]]
                    }`}
                  >
                    {article.group}
                  </span>
                  <p className="font-medium text-sm leading-relaxed group-hover:text-primary transition-colors m-0 mb-1.5">
                    {article.title}
                  </p>
                  <p className="text-xs text-muted-foreground leading-relaxed m-0">
                    {article.description}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </section>
      ))}

      <div className="mt-12 rounded-xl border border-border/60 bg-muted/30 p-5">
        <h2 className="text-sm font-bold mb-2">保活のほうを調べたいとき</h2>
        <p className="text-sm text-foreground/80 leading-relaxed m-0">
          保育園の入りやすさや点数の基準は
          <a href="/select" className="text-primary hover:underline">
            自治体を選ぶページ
          </a>
          から、手続きに必要な書類は
          <a href="/documents" className="text-primary hover:underline">
            子育て書類ガイド
          </a>
          から見られます。
        </p>
      </div>
    </div>
  );
}
