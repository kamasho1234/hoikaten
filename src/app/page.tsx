import { getAllMunicipalities } from "@/lib/data";
import { getAllArticles } from "@/lib/articles";

export default function Home() {
  const municipalities = getAllMunicipalities();
  const articles = getAllArticles();

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
        {/* 吹き出し付き使い方解説 */}
        <div className="mb-12">
          <p
            className="text-center text-base font-bold mb-8"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            こうやって使います
          </p>

          {/* 会話形式の吹き出し */}
          <div className="space-y-4 max-w-md mx-auto">
            {/* ユーザーの吹き出し（右） */}
            <div className="flex justify-end">
              <div className="bg-primary/10 rounded-2xl rounded-br-md px-4 py-2.5 max-w-[80%]">
                <p className="text-sm">うちって保育園に入れるのかな...点数ってどうやって調べるの？</p>
              </div>
            </div>

            {/* hoikatenの吹き出し（左） */}
            <div className="flex justify-start">
              <div className="bg-card border border-border/60 rounded-2xl rounded-bl-md px-4 py-2.5 max-w-[80%] shadow-sm">
                <p className="text-sm leading-relaxed">
                  <span className="font-medium text-primary">hoikaten</span>なら、お住まいの地域を選んで
                  <span className="font-medium">かんたんな質問に5つ答えるだけ</span>
                  で点数がわかりますよ！
                </p>
              </div>
            </div>

            {/* ユーザー */}
            <div className="flex justify-end">
              <div className="bg-primary/10 rounded-2xl rounded-br-md px-4 py-2.5 max-w-[80%]">
                <p className="text-sm">点数がわかったら、それで入れるかどうかもわかるの？</p>
              </div>
            </div>

            {/* hoikaten */}
            <div className="flex justify-start">
              <div className="bg-card border border-border/60 rounded-2xl rounded-bl-md px-4 py-2.5 max-w-[80%] shadow-sm">
                <p className="text-sm leading-relaxed">
                  はい！点数だけじゃなく
                  <span className="font-medium">「有利」「厳しい」などの評価</span>
                  と、
                  <span className="font-medium">点数を上げるためのアドバイス</span>
                  も出ます。たとえばこんな感じです
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 結果プレビュー */}
        <div className="max-w-sm mx-auto mb-6">
          <div className="space-y-3">
            {/* 合計点数 */}
            <div className="bg-card border-2 border-primary/30 rounded-xl shadow-md p-5 text-center">
              <p className="text-xs text-muted-foreground mb-1">
                あなたのご家庭の点数は...
              </p>
              <p
                className="text-5xl font-bold text-primary leading-none"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                105
                <span className="text-sm font-normal text-muted-foreground ml-1">点</span>
              </p>
              <p className="text-[11px] text-muted-foreground mt-1">（世田谷区の基準での目安）</p>
            </div>

            {/* 評価＋アドバイス */}
            <div className="bg-card border border-border/60 rounded-xl p-4">
              <p className="text-blue-600 font-bold text-sm mb-1.5">最激戦ゾーン</p>
              <p className="text-sm text-foreground/80 leading-relaxed mb-3">
                世田谷区で最も多い点数帯です。入園児童の約40%がこの層にいるため、同点の中での競争になります。
              </p>
              <div className="bg-muted/40 rounded-lg p-3 mb-3">
                <p className="text-sm">
                  <span className="font-medium">ワンポイント：</span>
                  加点をもう1つ積めないか確認しましょう（認可外利用+6点、きょうだい加点+5点など）。
                </p>
              </div>
              <div className="space-y-0.5 text-[11px] text-muted-foreground">
                <p>※ 入園児童の約40%がフルタイム共働き＋育休明け加点の105点</p>
                <p>※ 同点の場合は、小規模保育卒園児 → 基本指数 → 所得の低い世帯の順で優先</p>
              </div>
            </div>

            {/* うちわけ */}
            <div className="bg-card border border-border/60 rounded-xl p-4">
              <p className="text-sm font-bold mb-3">点数のうちわけ</p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">保護者1の点数</span>
                  <span className="bg-secondary px-2 py-0.5 rounded text-xs font-medium">50点</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">保護者2の点数</span>
                  <span className="bg-secondary px-2 py-0.5 rounded text-xs font-medium">50点</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">育休明け加点</span>
                  <span className="bg-secondary px-2 py-0.5 rounded text-xs font-medium text-primary">+5点</span>
                </div>
              </div>
            </div>
          </div>
          <p className="text-center text-[10px] text-muted-foreground mt-2">
            ※ 世田谷区・フルタイム共働き＋育休明けの場合の例
          </p>
        </div>

        {/* 吹き出し続き */}
        <div className="max-w-md mx-auto mb-12">
          <div className="space-y-4">
            <div className="flex justify-end">
              <div className="bg-primary/10 rounded-2xl rounded-br-md px-4 py-2.5 max-w-[80%]">
                <p className="text-sm">すごい！点数だけじゃなくて対策まで教えてくれるんだ。やってみたい！</p>
              </div>
            </div>
            <div className="flex justify-start">
              <div className="bg-card border border-border/60 rounded-2xl rounded-bl-md px-4 py-2.5 max-w-[80%] shadow-sm">
                <p className="text-sm leading-relaxed">
                  各自治体の<span className="font-medium">公式の選考基準</span>をもとに計算しているので安心です。さっそくやってみましょう！
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
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
        <p className="text-center text-[11px] text-muted-foreground mb-12">
          続々追加中
        </p>

        {/* 記事一覧 */}
        {articles.length > 0 && (
          <div>
            <p
              className="text-center text-base font-bold mb-6"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              保活お役立ち記事
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
