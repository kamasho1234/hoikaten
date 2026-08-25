import type { Metadata } from "next";
import { Noto_Sans_JP, Zen_Maru_Gothic } from "next/font/google";
import Script from "next/script";
import "./globals.css";

import "@/lib/articles/register-all";

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
  weight: ["700"],
  display: "swap",
});

/** Microsoft Clarity のプロジェクトID */
const CLARITY_PROJECT_ID = "y57kgjghls";

/** Google AdSense のパブリッシャーID */
const ADSENSE_CLIENT_ID = "ca-pub-3132765100531855";

/** 対応している自治体の数。増えても書き換えなくていいよう実データから数える */
const MUNICIPALITY_COUNT = getAllMunicipalities().length;

export const metadata: Metadata = {
  title: "保育園 点数シミュレーター｜入園点数を無料で自動計算【hoikaten】",
  description: `保育園の入園点数を無料でシミュレーション（シュミレーション）。お住まいの地域を選んで5つの質問に答えるだけで、点数の目安と「有利か厳しいか」の評価がわかります。東京23区・政令指定都市など${MUNICIPALITY_COUNT}自治体対応。`,
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
        {/*
          Google AdSense。審査でも配信でも、公式は head に script タグを置くことを求めている。
          next/script の beforeInteractive では初期HTMLに preload しか出ず、
          審査で見に来たときに script タグが無い。React の async script は
          書いた場所に関わらず head に上がるので、そのまま書いている。
        */}
        <script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT_ID}`}
          crossOrigin="anonymous"
        />
        {/*
          Microsoft Clarity（アクセス解析・ヒートマップ）。
          公式が配るスニペットは window.clarity のキューを先に作ってから
          タグ本体を読み込む形なので、そのとおりに入れている。
          next/script の afterInteractive で、画面の表示を待ってから読み込む。
        */}
        <Script id="ms-clarity" strategy="afterInteractive">
          {`(function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "${CLARITY_PROJECT_ID}");`}
        </Script>
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
              <a
                href="https://x.com/Hoikaten"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 hover:text-primary transition-colors"
              >
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className="h-3 w-3 fill-current"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
                公式X
              </a>
              <span className="text-border">|</span>
              <span>&copy; 2026 hoikaten.com</span>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
