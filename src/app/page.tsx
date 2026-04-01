import { getAllMunicipalities } from "@/lib/data";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { CitySearch } from "@/components/city-search";

export default function Home() {
  const municipalities = getAllMunicipalities();

  return (
    <div>
      {/* ヒーローセクション */}
      <div className="hero-pattern py-14 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <p className="text-primary text-sm font-medium mb-3 tracking-wide">
            無料・登録不要
          </p>
          <h2
            className="text-2xl sm:text-3xl font-bold mb-4 leading-relaxed"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            うちは何点とれる？
          </h2>
          <p className="text-muted-foreground leading-relaxed max-w-md mx-auto mb-6">
            お住まいの地域を選んで、かんたんな質問に答えるだけ。
            <br />
            保育園に入るための<span className="text-primary font-medium">点数の目安</span>がすぐわかります。
          </p>
          <CitySearch
            municipalities={municipalities.map((m) => ({
              name: m.name,
              slug: m.slug,
              prefecture: m.prefecture,
            }))}
          />
        </div>
      </div>

      {/* 自治体カード一覧 */}
      <div className="mx-auto max-w-3xl px-4 -mt-4 pb-12">
        <div className="grid gap-3 sm:grid-cols-2">
          {municipalities.map((m) => (
            <a key={m.slug} href={`https://${m.slug}.hoikaten.com`}>
              <Card className="card-warm hover:shadow-md transition-all cursor-pointer bg-card border-border/60 group">
                <CardHeader className="pb-4">
                  <CardDescription className="text-xs">{m.prefecture}</CardDescription>
                  <CardTitle className="text-lg group-hover:text-primary transition-colors" style={{ fontFamily: "var(--font-heading)" }}>
                    {m.name}
                  </CardTitle>
                  <CardDescription className="text-xs">
                    {m.scoringMethod === "min"
                      ? `ランクA〜I + 調整指数`
                      : `最大${m.maxBasePoints}点`}
                  </CardDescription>
                </CardHeader>
              </Card>
            </a>
          ))}

          <Card className="border-dashed border-border/40 opacity-60">
            <CardHeader className="pb-4">
              <CardDescription className="text-xs">準備中</CardDescription>
              <CardTitle className="text-lg text-muted-foreground" style={{ fontFamily: "var(--font-heading)" }}>
                ほかの地域
              </CardTitle>
              <CardDescription className="text-xs">どんどん追加していきます</CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    </div>
  );
}
