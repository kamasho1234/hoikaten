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
            保育園に入るための
            <span className="text-primary font-medium">点数の目安</span>
            がすぐわかります。
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

      {/* LP: シミュレーター体験イメージ */}
      <div className="mx-auto max-w-3xl px-4 py-16">
        <p
          className="text-center text-lg sm:text-xl font-bold mb-10"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          たった3ステップで、あなたの点数がわかる
        </p>

        {/* 3ステップ */}
        <div className="grid sm:grid-cols-3 gap-6 mb-16">
          {[
            {
              step: "1",
              title: "地域をえらぶ",
              desc: "お住まいの市区町村を選択",
              color: "from-teal-400 to-teal-500",
            },
            {
              step: "2",
              title: "質問に答える",
              desc: "働き方や家庭の状況を入力",
              color: "from-amber-400 to-amber-500",
            },
            {
              step: "3",
              title: "結果を見る",
              desc: "点数と評価がすぐわかる",
              color: "from-rose-400 to-rose-500",
            },
          ].map((item) => (
            <div key={item.step} className="text-center">
              <div
                className={`w-14 h-14 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${item.color} text-white flex items-center justify-center text-xl font-bold shadow-md`}
              >
                {item.step}
              </div>
              <p
                className="font-bold mb-1"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {item.title}
              </p>
              <p className="text-sm text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* 結果イメージモックアップ */}
        <div className="relative max-w-sm mx-auto mb-16">
          <div className="absolute -inset-4 bg-gradient-to-br from-primary/10 via-transparent to-teal-500/10 rounded-3xl blur-xl" />
          <div className="relative bg-card border border-border/60 rounded-2xl shadow-xl overflow-hidden">
            {/* モックヘッダー */}
            <div className="bg-gradient-to-r from-primary/5 to-teal-500/5 px-5 py-3 border-b border-border/40">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-300" />
                <div className="w-3 h-3 rounded-full bg-yellow-300" />
                <div className="w-3 h-3 rounded-full bg-green-300" />
                <span className="text-[10px] text-muted-foreground ml-2">
                  hoikaten.com
                </span>
              </div>
            </div>

            {/* モック結果画面 */}
            <div className="p-6">
              <p className="text-xs text-muted-foreground text-center mb-2">
                あなたのご家庭の点数は...
              </p>
              <p
                className="text-center text-5xl font-bold text-primary mb-1"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                105
                <span className="text-base font-normal text-muted-foreground ml-1">
                  点
                </span>
              </p>
              <p className="text-center text-xs text-muted-foreground mb-5">
                （世田谷区の基準での目安）
              </p>

              {/* 評価バッジ */}
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-4">
                <p className="text-blue-700 font-bold text-sm mb-1">
                  最激戦ゾーン
                </p>
                <p className="text-blue-600 text-xs leading-relaxed">
                  入園児童の約40%がこの層。加点をもう1つ積めないか確認しましょう。
                </p>
              </div>

              {/* 内訳 */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">保護者1</span>
                  <span className="font-medium">50点</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">保護者2</span>
                  <span className="font-medium">50点</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">
                    育休明け加点
                  </span>
                  <span className="font-medium text-primary">+5点</span>
                </div>
                <div className="border-t border-border/40 pt-2 flex justify-between text-sm font-bold">
                  <span>合計</span>
                  <span className="text-primary">105点</span>
                </div>
              </div>
            </div>
          </div>

          {/* 吹き出し */}
          <div className="absolute -right-2 sm:-right-12 top-8 bg-card border border-border/60 rounded-xl shadow-md px-3 py-2 text-xs max-w-[140px]">
            <p className="font-medium text-foreground">自分の点数が</p>
            <p className="font-medium text-primary">すぐわかる！</p>
          </div>
          <div className="absolute -left-2 sm:-left-12 bottom-16 bg-card border border-border/60 rounded-xl shadow-md px-3 py-2 text-xs max-w-[140px]">
            <p className="font-medium text-foreground">どう対策すべきか</p>
            <p className="font-medium text-primary">アドバイスも！</p>
          </div>
        </div>

        {/* 特長カード */}
        <div className="grid sm:grid-cols-3 gap-4 mb-16">
          {[
            {
              icon: (
                <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 6v6l4 2" />
                </svg>
              ),
              title: "30秒で完了",
              desc: "質問は5〜8問だけ。忙しいママ・パパでもサッとチェックできます。",
            },
            {
              icon: (
                <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M9 12l2 2 4-4" />
                  <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              ),
              title: "公式データに基づく",
              desc: "各自治体の公式基準表をもとに点数を計算。ファクトチェック済み。",
            },
            {
              icon: (
                <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 20V10M18 20V4M6 20v-4" />
                </svg>
              ),
              title: "評価つきでわかりやすい",
              desc: "点数だけでなく「有利」「厳しい」などの評価とアドバイスも表示。",
            },
          ].map((feature) => (
            <div
              key={feature.title}
              className="bg-card border border-border/60 rounded-xl p-5 text-center"
            >
              <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                {feature.icon}
              </div>
              <p
                className="font-bold text-sm mb-2"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {feature.title}
              </p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>

        {/* 対応自治体 */}
        <div className="text-center mb-6">
          <p
            className="text-lg font-bold mb-2"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            対応している地域
          </p>
          <p className="text-sm text-muted-foreground mb-6">
            続々追加中！お住まいの地域を選んでください
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 mb-8">
          {municipalities.map((m) => (
            <a key={m.slug} href={`https://${m.slug}.hoikaten.com`}>
              <Card className="card-warm hover:shadow-md transition-all cursor-pointer bg-card border-border/60 group">
                <CardHeader className="pb-4">
                  <CardDescription className="text-xs">
                    {m.prefecture}
                  </CardDescription>
                  <CardTitle
                    className="text-lg group-hover:text-primary transition-colors"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {m.name}
                  </CardTitle>
                  <CardDescription className="text-xs">
                    {m.scoringMethod === "min"
                      ? `ランク制 + 調整指数`
                      : `最大${m.maxBasePoints}点`}
                  </CardDescription>
                </CardHeader>
              </Card>
            </a>
          ))}

          <Card className="border-dashed border-border/40 opacity-60">
            <CardHeader className="pb-4">
              <CardDescription className="text-xs">準備中</CardDescription>
              <CardTitle
                className="text-lg text-muted-foreground"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                ほかの地域
              </CardTitle>
              <CardDescription className="text-xs">
                どんどん追加していきます
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* 最終CTA */}
        <div className="text-center py-10">
          <p
            className="text-xl font-bold mb-3"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            保活の第一歩は、点数を知ること
          </p>
          <p className="text-sm text-muted-foreground mb-6 max-w-md mx-auto">
            まずはお住まいの地域を選んで、今の点数をチェックしてみませんか？
          </p>
          <a
            href="/"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full btn-primary-warm text-primary-foreground text-sm font-medium"
          >
            いますぐ点数をチェックする
          </a>
        </div>
      </div>
    </div>
  );
}
