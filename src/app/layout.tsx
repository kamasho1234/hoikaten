import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
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
        <header className="border-b bg-white">
          <div className="mx-auto max-w-3xl px-4 py-4">
            <h1 className="text-lg font-bold">
              <a href="/">保育園 点数シミュレーター</a>
            </h1>
          </div>
        </header>
        <main className="flex-1">{children}</main>
        <footer className="border-t bg-muted/50 py-6">
          <div className="mx-auto max-w-3xl px-4 text-center text-xs text-muted-foreground space-y-1">
            <p>
              ※ ここで出る点数はあくまで目安です。正確な点数はお住まいの自治体にご確認ください。
            </p>
            <p>&copy; 2026 hoikaten.com</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
