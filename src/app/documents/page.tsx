import "@/lib/documents/register-all";
import { getAllDocuments, getDocumentsByGroup, GROUP_COLOR } from "@/lib/documents";
import { breadcrumbList } from "@/lib/jsonld";
import { RandomAd } from "@/components/random-ad";

const COUNT = getAllDocuments().length;

export const metadata = {
  title: "子育て書類ガイド｜就労証明書・課税証明書・住民票の取り方【hoikaten】",
  description: `保育園だけでなく学童保育・幼稚園の預かり保育・児童手当・就学支援金でも使う書類を、国の公式情報をもとに${COUNT}項目にまとめました。就労証明書の書き方、課税証明書の取り方、住民票の記載事項の選び方など。`,
  alternates: {
    canonical: "https://hoikaten.com/documents",
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

export default function DocumentsPage() {
  const sections = getDocumentsByGroup();

  const breadcrumbJsonLd = breadcrumbList([
    { name: "ホーム", path: "/" },
    { name: "子育て書類ガイド", path: "/documents" },
  ]);

  const collectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "子育て書類ガイド",
    description: metadata.description,
    url: "https://hoikaten.com/documents",
    hasPart: getAllDocuments().map((g) => ({
      "@type": "Article",
      headline: g.title,
      url: `https://hoikaten.com/documents/${g.slug}`,
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
        <span className="text-foreground">子育て書類ガイド</span>
      </nav>

      <div className="hero-pattern rounded-2xl py-8 px-4 text-center mb-8 -mx-4 sm:mx-0">
        <h1
          className="text-2xl font-bold mb-3"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          子育て書類ガイド
        </h1>
        <p className="text-muted-foreground text-sm leading-relaxed max-w-xl mx-auto">
          就労証明書や課税証明書は、保育園だけの書類ではありません。
          学童保育・幼稚園の預かり保育・児童手当・就学支援金でも同じ書類を使います。
          国が定めているしくみを、書類ごとにまとめました。
        </p>
      </div>

      <div className="rounded-xl border border-blue-200 bg-blue-50 p-5 mb-10">
        <p className="text-sm text-blue-900 leading-relaxed m-0">
          <strong>就労証明書は全国共通の様式です。</strong>
          子ども・子育て支援法施行規則の様式第一号として国が定めており、
          保育所・認定こども園・幼稚園の預かり保育・放課後児童クラブで兼用している自治体が多くあります。
          きょうだいで別々の施設に申し込む場合、1枚で足りることもあります。
        </p>
      </div>

      {sections.map((section) => {
        const color = labelColorMap[GROUP_COLOR[section.group]];
        return (
          <section key={section.group} className="mb-12">
            <h2
              className="text-lg font-bold mb-4 pb-2 border-b border-border"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {section.group}
            </h2>
            <div className="space-y-4">
              {section.guides.map((guide) => (
                <a
                  key={guide.slug}
                  href={`/documents/${guide.slug}`}
                  className="block group"
                >
                  <div className="p-5 rounded-xl border border-border/60 hover:border-primary/30 hover:shadow-md hover:-translate-y-0.5 transition-all bg-card">
                    <span
                      className={`inline-block text-xs font-medium px-3 py-1 rounded-full border mb-3 ${color}`}
                    >
                      {section.group}
                    </span>
                    <h3 className="font-bold leading-relaxed mb-2 group-hover:text-primary transition-colors">
                      {guide.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                      {guide.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {guide.usedFor.slice(0, 3).map((use) => (
                        <span
                          key={use}
                          className="text-[11px] text-muted-foreground bg-muted/60 rounded-full px-2.5 py-1"
                        >
                          {use}
                        </span>
                      ))}
                      {guide.usedFor.length > 3 && (
                        <span className="text-[11px] text-muted-foreground px-1 py-1">
                          ほか{guide.usedFor.length - 3}件
                        </span>
                      )}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </section>
        );
      })}

      <RandomAd />

      <div className="mt-10 rounded-xl border border-border/60 bg-muted/30 p-5">
        <p className="text-sm text-muted-foreground leading-relaxed m-0">
          このガイドは、こども家庭庁・総務省・デジタル庁など国の公式情報をもとに書いています。
          手数料・窓口・必要書類の細かいところは自治体によって違うため、
          最後は必ずお住まいの自治体の案内をご確認ください。
          各ページの最後に参照した出典を載せています。
        </p>
      </div>

      <div className="mt-6 text-center">
        <a
          href="/articles"
          className="inline-block text-sm text-primary hover:underline"
        >
          保活コラムもあわせてどうぞ
        </a>
      </div>
    </div>
  );
}
