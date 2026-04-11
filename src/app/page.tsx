import { getAllMunicipalities } from "@/lib/data";
import { getTopArticles } from "@/lib/articles";
import { RandomAd } from "@/components/random-ad";

export default function Home() {
  const municipalities = getAllMunicipalities();
  const articles = getTopArticles(10);

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
          <p className="text-muted-foreground text-sm mb-6">
            <span className="text-primary font-medium">5つの質問</span>
            に答えるだけで、30秒で入園点数と評価がわかります。
          </p>
          <a
            href="/select"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full btn-primary-warm text-primary-foreground font-medium text-base shadow-lg"
          >
            今すぐ調べる
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
          <p className="text-[11px] text-muted-foreground mt-3">
            無料・登録不要・令和7〜8年度の公式基準で計算
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-2xl px-4 py-10">
        {/* 入園点数の1行解説 */}
        <div className="bg-card border border-border/60 rounded-xl px-4 py-3 mb-10 text-center">
          <p className="text-xs text-muted-foreground">
            <span className="font-medium text-foreground">入園点数とは？</span>
            &nbsp;認可保育園の選考で使われる、家庭の状況（働き方・介護・ひとり親など）を数値化したもの。点数が高いほど入園しやすくなります。
          </p>
        </div>

        {/* 結果プレビュー */}
        <p
          className="text-center text-base font-bold mb-6"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          こんな情報がすぐわかります
        </p>

        {/* スマホモック */}
        <div className="max-w-[280px] mx-auto mb-10">
          <div className="relative">
            {/* スマホフレーム */}
            <div className="border-[6px] border-gray-800 rounded-[2.5rem] bg-gray-800 shadow-2xl">
              {/* ノッチ */}
              <div className="flex justify-center pt-2 pb-1">
                <div className="w-20 h-5 bg-gray-900 rounded-full" />
              </div>
              {/* 画面 */}
              <div className="bg-background rounded-b-[2rem] overflow-hidden">
                {/* ステータスバー風 */}
                <div className="flex justify-between items-center px-5 py-1.5 text-[9px] text-muted-foreground">
                  <span>9:41</span>
                  <span>hoikaten.com</span>
                  <span>100%</span>
                </div>

                {/* 結果画面コンテンツ */}
                <div className="px-3.5 pb-5 space-y-2">
                  {/* 合計点数 */}
                  <div className="bg-card border-2 border-primary/30 rounded-lg p-3 text-center">
                    <p className="text-[9px] text-muted-foreground mb-0.5">あなたのご家庭の点数は...</p>
                    <p
                      className="text-3xl font-bold text-primary leading-none"
                      style={{ fontFamily: "var(--font-heading)" }}
                    >
                      105
                      <span className="text-[10px] font-normal text-muted-foreground ml-0.5">点</span>
                    </p>
                    <p className="text-[8px] text-muted-foreground mt-0.5">（世田谷区の基準での目安）</p>
                  </div>

                  {/* 評価 */}
                  <div className="bg-card border border-border/60 rounded-lg p-2.5">
                    <p className="text-blue-600 font-bold text-[10px] mb-1">最激戦ゾーン</p>
                    <p className="text-[9px] text-foreground/80 leading-relaxed mb-1.5">
                      世田谷区で最も多い点数帯です。入園児童の約40%がこの層にいるため、同点の中での競争になります。
                    </p>
                    <div className="bg-muted/40 rounded p-1.5 mb-1.5">
                      <p className="text-[9px]">
                        <span className="font-medium">ワンポイント：</span>
                        認可外利用+6点、きょうだい加点+5点など、加点の余地がないか確認を。
                      </p>
                    </div>
                    <div className="space-y-0.5 text-[8px] text-muted-foreground">
                      <p>※ 入園児童の約40%が105点</p>
                      <p>※ 同点時: 小規模卒園児 → 基本指数 → 所得低い順</p>
                    </div>
                  </div>

                  {/* うちわけ */}
                  <div className="bg-card border border-border/60 rounded-lg p-2.5">
                    <p className="text-[10px] font-bold mb-1.5">点数のうちわけ</p>
                    <div className="space-y-1 text-[9px]">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">保護者1の点数</span>
                        <span className="bg-secondary px-1.5 py-0.5 rounded text-[8px] font-medium">50点</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">保護者2の点数</span>
                        <span className="bg-secondary px-1.5 py-0.5 rounded text-[8px] font-medium">50点</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">家庭の状況による加点</span>
                        <span className="bg-secondary px-1.5 py-0.5 rounded text-[8px] font-medium text-primary">+5点</span>
                      </div>
                      <div className="border-t border-border/40 pt-1.5 mt-1">
                        <p className="text-[8px] text-muted-foreground font-medium mb-1">くわしい内訳</p>
                        <div className="flex justify-between text-[8px]">
                          <span className="text-muted-foreground">保護者1：週5日・週40時間以上</span>
                          <span>50点</span>
                        </div>
                        <div className="flex justify-between text-[8px]">
                          <span className="text-muted-foreground">保護者2：週5日・週40時間以上</span>
                          <span>50点</span>
                        </div>
                        <div className="flex justify-between text-[8px]">
                          <span className="text-muted-foreground">育休明けで復帰予定</span>
                          <span className="text-primary">+5点</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 注意ボックス */}
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-2">
                    <p className="text-[8px] font-medium text-amber-800 mb-0.5">ここだけ注意！</p>
                    <p className="text-[8px] text-amber-700 leading-relaxed">
                      この点数はあくまで目安です。くわしくは世田谷区の窓口で確認してくださいね。
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/* ホームインジケーター */}
            <div className="flex justify-center mt-1">
              <div className="w-24 h-1 bg-gray-600 rounded-full" />
            </div>
          </div>
          <p className="text-center text-[10px] text-muted-foreground mt-3">
            ※ 世田谷区・フルタイム共働き＋育休明けの場合の例
          </p>
        </div>

        {/* 最終CTA */}
        <div className="text-center mb-12">
          <a
            href="/select"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full btn-primary-warm text-primary-foreground font-medium text-base"
          >
            今すぐ調べる
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </div>

        <RandomAd />

        {/* 記事一覧 */}
        {articles.length > 0 && (
          <div className="border-t border-border/40 pt-10">
            <p
              className="text-base font-bold mb-6"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              よく読まれている記事
            </p>
            <div className="space-y-3">
              {articles.map((article) => {
                const muni = municipalities.find((m) => m.slug === article.citySlug);
                return (
                  <a
                    key={`${article.citySlug}-${article.slug}`}
                    href={`/${article.citySlug}/articles/${article.slug}`}
                    className="block group"
                  >
                    <div className="flex gap-3 items-center p-3 rounded-xl border border-border/60 hover:border-primary/30 hover:shadow-sm transition-all bg-card">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-16 h-12 rounded-lg object-cover flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          {muni && (
                            <span className="text-[10px] text-muted-foreground">{muni.name}</span>
                          )}
                          <span className="text-[10px] text-primary">{article.category}</span>
                        </div>
                        <p className="text-sm font-medium leading-snug group-hover:text-primary transition-colors line-clamp-1">
                          {article.title}
                        </p>
                      </div>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
