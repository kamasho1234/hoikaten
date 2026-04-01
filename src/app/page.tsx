import { getAllMunicipalities } from "@/lib/data";
import { CitySearch } from "@/components/city-search";

export default function Home() {
  const municipalities = getAllMunicipalities();

  return (
    <div>
      {/* ファーストビュー */}
      <div className="hero-pattern py-10 sm:py-14">
        <div className="mx-auto max-w-2xl px-4 text-center">
          <h2
            className="text-2xl sm:text-3xl font-bold mb-2 leading-snug"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            うちの子、
            <br className="sm:hidden" />
            保育園に入れる？
          </h2>
          <p className="text-muted-foreground text-sm mb-5">
            地域をえらんで
            <span className="text-primary font-medium">5つの質問</span>
            に答えるだけ。
            <br className="hidden sm:block" />
            30秒で入園点数と「有利か厳しいか」の評価がわかります。
          </p>
          <CitySearch
            municipalities={municipalities.map((m) => ({
              name: m.name,
              slug: m.slug,
              prefecture: m.prefecture,
            }))}
          />
          <p className="text-[11px] text-muted-foreground mt-2.5">
            無料・登録不要・令和7〜8年度の公式基準で計算
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-2xl px-4 py-8">
        {/* 入園点数の1行解説 */}
        <div className="bg-card border border-border/60 rounded-xl px-4 py-3 mb-8 text-center">
          <p className="text-xs text-muted-foreground">
            <span className="font-medium text-foreground">入園点数とは？</span>
            &nbsp;認可保育園の選考で使われる、家庭の状況（働き方・介護・ひとり親など）を数値化したもの。点数が高いほど入園しやすくなります。
          </p>
        </div>

        {/* 結果プレビュー */}
        <p
          className="text-center text-sm font-bold text-muted-foreground mb-4"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          こんな結果がすぐ出ます
        </p>

        <div className="max-w-xs mx-auto mb-8">
          <div className="bg-card border border-border/60 rounded-xl shadow-md p-5 text-center">
            <p className="text-[11px] text-muted-foreground mb-1">
              あなたのご家庭の点数は...
            </p>
            <p
              className="text-5xl font-bold text-primary leading-none"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              105
              <span className="text-sm font-normal text-muted-foreground ml-1">
                点
              </span>
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg px-3 py-2 mt-4 text-left">
              <p className="text-blue-700 font-bold text-xs">最激戦ゾーン</p>
              <p className="text-blue-600 text-[11px] leading-relaxed mt-0.5">
                この点数帯の方が最も多いエリアです。加点の余地がないか確認してみましょう。
              </p>
            </div>
          </div>
          <p className="text-center text-[10px] text-muted-foreground mt-2">
            ※ 世田谷区・フルタイム共働き＋育休明けの場合の例
          </p>
        </div>

        {/* 対応地域 */}
        <div className="text-center mb-3">
          <p
            className="text-sm font-bold"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            対応地域
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-2 mb-2">
          {municipalities.map((m) => (
            <a
              key={m.slug}
              href={`https://${m.slug}.hoikaten.com`}
              className="px-3 py-1.5 text-sm rounded-full border border-border/60 bg-card hover:border-primary/40 hover:text-primary hover:shadow-sm transition-all"
            >
              {m.name}
            </a>
          ))}
        </div>
        <p className="text-center text-[11px] text-muted-foreground mb-8">
          続々追加中
        </p>

        {/* 最終CTA */}
        <div className="text-center pb-2">
          <p
            className="text-base font-bold mb-1.5"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            保活の第一歩は、点数を知ること
          </p>
          <p className="text-xs text-muted-foreground mb-4">
            地域をえらんで、30秒で今の点数をチェック
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
    </div>
  );
}
