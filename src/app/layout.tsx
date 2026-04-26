import type { Metadata } from "next";
import { Noto_Sans_JP, Zen_Maru_Gothic } from "next/font/google";
import "./globals.css";

// 記事データの登録（副作用import）
import "@/lib/articles/general";
import "@/lib/articles/setagaya";
import "@/lib/articles/yokohama";
import "@/lib/articles/osaka";
import "@/lib/articles/kawasaki";
import "@/lib/articles/nagoya";
import "@/lib/articles/saitama";
import "@/lib/articles/sapporo";
import "@/lib/articles/sendai";
import "@/lib/articles/fukuoka";
import "@/lib/articles/hiroshima";
import "@/lib/articles/kobe";
import "@/lib/articles/kyoto";
import "@/lib/articles/kitakyushu";
import "@/lib/articles/hamamatsu";
import "@/lib/articles/sakai";
import "@/lib/articles/niigata";
import "@/lib/articles/sagamihara";
import "@/lib/articles/nerima";
import "@/lib/articles/ota";
import "@/lib/articles/edogawa";
import "@/lib/articles/adachi";
import "@/lib/articles/suginami";
import "@/lib/articles/itabashi";
import "@/lib/articles/nakano";
import "@/lib/articles/toshima";
import "@/lib/articles/kita";
import "@/lib/articles/arakawa";
import "@/lib/articles/shinagawa";
import "@/lib/articles/bunkyo";
import "@/lib/articles/taito";
import "@/lib/articles/chuo";
import "@/lib/articles/chiyoda";
import "@/lib/articles/koto";
import "@/lib/articles/okayama";
import "@/lib/articles/kumamoto";
import "@/lib/articles/shizuoka";
import "@/lib/articles/machida";
import "@/lib/articles/fujisawa";
import "@/lib/articles/kashiwa";
import "@/lib/articles/toyonaka";
import "@/lib/articles/yokosuka";
import "@/lib/articles/funabashi";
import "@/lib/articles/hachioji";
import "@/lib/articles/kawaguchi";
import "@/lib/articles/himeji";
import "@/lib/articles/matsuyama";
import "@/lib/articles/kagoshima";
import "@/lib/articles/utsunomiya";
import "@/lib/articles/higashiosaka";
import "@/lib/articles/nishinomiya";
import "@/lib/articles/amagasaki";
import "@/lib/articles/toyota";
import "@/lib/articles/kawagoe";
import "@/lib/articles/kanazawa";
import "@/lib/articles/takatsuki";
import "@/lib/articles/kazo";
import "@/lib/articles/kuki";
import "@/lib/articles/koshigaya";
import "@/lib/articles/nara";
import "@/lib/articles/nagasaki";
import "@/lib/articles/oita";
import "@/lib/articles/naha";
import "@/lib/articles/akashi";
import "@/lib/articles/suita";
import "@/lib/articles/okazaki";
import "@/lib/articles/ichinomiya";
import "@/lib/articles/hirakata";
import "@/lib/articles/otsu";
import "@/lib/articles/asahikawa";
import "@/lib/articles/hakodate";
import "@/lib/articles/mito";
import "@/lib/articles/maebashi";
import "@/lib/articles/takasaki";
import "@/lib/articles/aomori";
import "@/lib/articles/morioka";
import "@/lib/articles/akita";
import "@/lib/articles/yamagata";
import "@/lib/articles/fukushima";
import "@/lib/articles/koriyama";
import "@/lib/articles/iwaki";
import "@/lib/articles/toyama";
import "@/lib/articles/fukui";
import "@/lib/articles/nagano";
import "@/lib/articles/gifu";
import "@/lib/articles/toyohashi";
import "@/lib/articles/wakayama";
import "@/lib/articles/kurashiki";
import "@/lib/articles/fukuyama";
import "@/lib/articles/kure";
import "@/lib/articles/shimonoseki";
import "@/lib/articles/matsue";
import "@/lib/articles/takamatsu";
import "@/lib/articles/kochi";
import "@/lib/articles/sasebo";
import "@/lib/articles/tottori";
import "@/lib/articles/kurume";
import "@/lib/articles/miyazaki";
import "@/lib/articles/ome";
import "@/lib/articles/koganei";
import "@/lib/articles/kokubunji";
import "@/lib/articles/tama";
import "@/lib/articles/kodaira";
import "@/lib/articles/higashimurayama";
import "@/lib/articles/nishitokyo";
import "@/lib/articles/mitaka";
import "@/lib/articles/hino";
import "@/lib/articles/musashino";
import "@/lib/articles/hiratsuka";
import "@/lib/articles/chigasaki";
import "@/lib/articles/yamato";
import "@/lib/articles/atsugi";
import "@/lib/articles/odawara";
import "@/lib/articles/kamakura";
import "@/lib/articles/hadano";
import "@/lib/articles/ebina";
import "@/lib/articles/tokorozawa";
import "@/lib/articles/soka";
import "@/lib/articles/kasukabe";
import "@/lib/articles/ageo";
import "@/lib/articles/kumagaya";
import "@/lib/articles/niiza";
import "@/lib/articles/sayama";
import "@/lib/articles/misato";
import "@/lib/articles/ibaraki";
import "@/lib/articles/yao";
import "@/lib/articles/neyagawa";
import "@/lib/articles/kishiwada";
import "@/lib/articles/moriguchi";
import "@/lib/articles/minoh";
import "@/lib/articles/kadoma";
import "@/lib/articles/ikeda";
import "@/lib/articles/tokushima";
import "@/lib/articles/yamaguchi";
import "@/lib/articles/saga";
import "@/lib/articles/tsu";
import "@/lib/articles/kofu";
import "@/lib/articles/matsumoto";
import "@/lib/articles/yokkaichi";
import "@/lib/articles/kusatsu";
import "@/lib/articles/ichikawa";
import "@/lib/articles/matsudo";
import "@/lib/articles/ichihara";
import "@/lib/articles/yachiyo";
import "@/lib/articles/nagareyama";
import "@/lib/articles/urayasu";
import "@/lib/articles/narashino";
import "@/lib/articles/noda";
import "@/lib/articles/kakogawa";
import "@/lib/articles/takarazuka";
import "@/lib/articles/itami";
import "@/lib/articles/kawanishi";
import "@/lib/articles/kasugai";
import "@/lib/articles/anjo";
import "@/lib/articles/kariya";
import "@/lib/articles/toyokawa";
import "@/lib/articles/omuta";
import "@/lib/articles/kasuga";
import "@/lib/articles/tomakomai";
import "@/lib/articles/obihiro";
import "@/lib/articles/kushiro";
import "@/lib/articles/ebetsu";
import "@/lib/articles/uji";
import "@/lib/articles/higashihiroshima";
import "@/lib/articles/chiba";
import "@/lib/articles/chofu";
import "@/lib/articles/fuchu";
import "@/lib/articles/tachikawa";
import "@/lib/articles/nagaoka";
import "@/lib/articles/fuji";
import "@/lib/articles/hachinohe";
import "@/lib/articles/izumi";
import "@/lib/articles/iruma";
import "@/lib/articles/toda";
import "@/lib/articles/asaka";
import "@/lib/articles/zama";
import "@/lib/articles/daito";
import "@/lib/articles/matsubara";
import "@/lib/articles/imabari";
import "@/lib/articles/suzuka";
import "@/lib/articles/joetsu";
import "@/lib/articles/hikone";
import "@/lib/articles/tsukuba";
import "@/lib/articles/numazu";
import "@/lib/articles/takaoka";
import "@/lib/articles/ogaki";
import "@/lib/articles/itoshima";
import "@/lib/articles/akishima";
import "@/lib/articles/higashikurume";
import "@/lib/articles/kunitachi";
import "@/lib/articles/komae";
import "@/lib/articles/inagi";
import "@/lib/articles/fujimi";
import "@/lib/articles/abiko";
import "@/lib/articles/isehara";
import "@/lib/articles/fukaya";
import "@/lib/articles/fujimino";
import "@/lib/articles/konosu";
import "@/lib/articles/narita";
import "@/lib/articles/kisarazu";
import "@/lib/articles/inzai";
import "@/lib/articles/kamagaya";
import "@/lib/articles/ayase";
import "@/lib/articles/kiyose";
import "@/lib/articles/higashiyamato";
import "@/lib/articles/musashimurayama";
import "@/lib/articles/sakado";
import "@/lib/articles/gyoda";
import "@/lib/articles/higashimatsuyama";
import "@/lib/articles/shiki";
import "@/lib/articles/yotsukaido";
import "@/lib/articles/obu";
import "@/lib/articles/tondabayashi";
import "@/lib/articles/habikino";
import "@/lib/articles/chikushino";
import "@/lib/articles/sakura";
import "@/lib/articles/nisshin";
import "@/lib/articles/onojo";
import "@/lib/articles/dazaifu";
import "@/lib/articles/nagaokakyo";
import "@/lib/articles/kashihara";
import "@/lib/articles/ikoma";
import "@/lib/articles/mobara";
import "@/lib/articles/okegawa";
import "@/lib/articles/katano";

import { getAllMunicipalities } from "@/lib/data";
import { HeaderNav } from "@/components/header-nav";

const notoSansJP = Noto_Sans_JP({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

const zenMaru = Zen_Maru_Gothic({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "保育園 点数シミュレーター｜入園点数を無料で自動計算【hoikaten】",
  description:
    "保育園の入園点数を無料でシミュレーション（シュミレーション）。お住まいの地域を選んで5つの質問に答えるだけで、点数の目安と「有利か厳しいか」の評価がわかります。東京23区・政令指定都市など186自治体対応。",
  metadataBase: new URL("https://hoikaten.com"),
  openGraph: {
    type: "website",
    locale: "ja_JP",
    siteName: "hoikaten - 保育園 点数シミュレーター",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ja"
      className={`${notoSansJP.variable} ${zenMaru.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "hoikaten - 保育園 点数シミュレーター",
              url: "https://hoikaten.com",
              description:
                "かんたんな質問に答えるだけで、保育園に入るための点数がわかります。",
              applicationCategory: "UtilityApplication",
              operatingSystem: "Any",
              offers: { "@type": "Offer", price: "0", priceCurrency: "JPY" },
              inLanguage: "ja",
            }),
          }}
        />
        <header className="border-b border-primary/10 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
          <div className="mx-auto max-w-3xl px-4 py-3 flex items-center justify-between">
            <a href="https://hoikaten.com" className="flex items-center gap-2.5 group">
              <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-primary/10 group-hover:bg-primary/15 transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-primary">
                  <path d="M3 21V9l9-7 9 7v12a1 1 0 01-1 1h-5v-7H9v7H4a1 1 0 01-1-1z" fill="currentColor" opacity="0.2"/>
                  <path d="M3 21V9l9-7 9 7v12a1 1 0 01-1 1h-5v-7H9v7H4a1 1 0 01-1-1z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
              <div className="flex flex-col">
                <span className="text-lg font-bold logo-text" style={{ fontFamily: "var(--font-heading)" }}>
                  hoikaten
                </span>
                <span className="text-[10px] text-muted-foreground -mt-0.5 tracking-wide">
                  保育園 点数シミュレーター
                </span>
              </div>
            </a>
            <nav className="flex items-center gap-1">
              <HeaderNav
                municipalities={getAllMunicipalities().map((m) => ({
                  name: m.name,
                  slug: m.slug,
                  prefecture: m.prefecture,
                }))}
              />
            </nav>
          </div>
        </header>
        <main className="flex-1">{children}</main>
        <footer className="border-t border-primary/10 bg-secondary/50 py-8">
          <div className="mx-auto max-w-3xl px-4 text-center space-y-3">
            <p className="font-bold logo-text text-base" style={{ fontFamily: "var(--font-heading)" }}>
              hoikaten
            </p>
            <p className="text-xs text-muted-foreground leading-relaxed max-w-md mx-auto">
              ここで出る点数はあくまで目安です。正確な点数はお住まいの自治体にご確認ください。
            </p>
            <div className="flex justify-center gap-4 text-xs text-muted-foreground">
              <a href="/" className="hover:text-primary transition-colors">地域一覧</a>
              <span className="text-border">|</span>
              <span>&copy; 2026 hoikaten.com</span>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
