import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  compress: true,
  // バレルファイルから使用分のみをツリーシェイクしてJSバンドルを削減
  experimental: {
    optimizePackageImports: ["lucide-react", "@base-ui/react"],
  },

  // 取りやめたページの引っ越し先。404のまま放っておくと検索の流入を捨てることになる。
  // /compare は「都道府県別の点数比較」で、内容は /prefecture に引き継いだ
  // （コミット c97e290 で削除）。Search Console では3か月で186クリック・3,100表示あった。
  async redirects() {
    return [
      { source: "/compare", destination: "/select", permanent: true },
      { source: "/compare/:pref", destination: "/prefecture/:pref", permanent: true },
    ];
  },
};

export default nextConfig;
