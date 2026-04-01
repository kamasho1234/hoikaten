import { getAllMunicipalities } from "@/lib/data";

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

        <div className="max-w-sm mx-auto mb-10">
          <div className="space-y-3">
            {/* 合計点数カード */}
            <div className="bg-card border-2 border-primary/30 rounded-xl shadow-md p-5 text-center">
              <p className="text-xs text-muted-foreground mb-1">
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
              <p className="text-[11px] text-muted-foreground mt-1">
                （世田谷区の基準での目安）
              </p>
            </div>

            {/* 評価＋アドバイスカード */}
            <div className="bg-card border border-border/60 rounded-xl p-4">
              <p className="text-blue-600 font-bold text-sm mb-1.5">
                最激戦ゾーン
              </p>
              <p className="text-sm text-foreground/80 leading-relaxed mb-3">
                世田谷区で最も多い点数帯です。入園児童の約40%がこの層にいるため、同点の中での競争になります。
              </p>
              <div className="bg-muted/40 rounded-lg p-3 mb-3">
                <p className="text-sm">
                  <span className="font-medium">ワンポイント：</span>
                  加点をもう1つ積めないか確認しましょう（認可外利用+6点、きょうだい加点+5点など）。園の選び方も重要です。
                </p>
              </div>
              <div className="space-y-0.5 text-[11px] text-muted-foreground">
                <p>※ 入園児童の約40%がフルタイム共働き＋育休明け加点の105点</p>
                <p>※ 同点の場合は、小規模保育卒園児 → 基本指数 → 所得の低い世帯の順で優先</p>
              </div>
            </div>

            {/* うちわけカード */}
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
                  <span className="text-muted-foreground">家庭の状況による加点</span>
                  <span className="bg-secondary px-2 py-0.5 rounded text-xs font-medium text-primary">+5点</span>
                </div>
                <div className="border-t border-border/40 pt-2">
                  <p className="text-xs text-muted-foreground font-medium mb-1">くわしい内訳</p>
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">保護者1：週5日以上かつ週40時間以上</span>
                    <span>50点</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">保護者2：週5日以上かつ週40時間以上</span>
                    <span>50点</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">育休・産休から復帰する予定</span>
                    <span className="text-primary">+5点</span>
                  </div>
                </div>
              </div>
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
        <p className="text-center text-[11px] text-muted-foreground mb-10">
          続々追加中
        </p>

        {/* 最終CTA */}
        <div className="text-center pb-2">
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
      </div>
    </div>
  );
}
