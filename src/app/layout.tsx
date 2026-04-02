import type { Metadata } from "next";
import { Noto_Sans_JP, Zen_Maru_Gothic } from "next/font/google";
import "./globals.css";

// 記事データの登録（副作用import）
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
  title: "保育園の点数、何点とれる？｜hoikaten",
  description:
    "かんたんな質問に答えるだけで、保育園に入るための点数がわかります。まずはお住まいの地域を選んでください。",
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
