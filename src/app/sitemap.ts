import type { MetadataRoute } from "next";
import { getAllMunicipalities } from "@/lib/data";
import { getAllArticles } from "@/lib/articles";

// 記事データの登録（sitemapはlayout.tsxとは別に実行されるため直接import）
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

const prefectureSlugs = [
  "hokkaido", "aomori", "iwate", "miyagi", "akita", "yamagata", "fukushima",
  "ibaraki", "tochigi", "gunma", "saitama", "chiba", "tokyo", "kanagawa",
  "niigata", "toyama", "ishikawa", "fukui", "yamanashi", "nagano",
  "gifu", "shizuoka", "aichi", "mie", "shiga", "kyoto", "osaka", "hyogo",
  "nara", "wakayama", "tottori", "shimane", "okayama", "hiroshima", "yamaguchi",
  "tokushima", "kagawa", "ehime", "kochi", "fukuoka", "saga", "nagasaki",
  "kumamoto", "oita", "miyazaki", "kagoshima", "okinawa",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const municipalities = getAllMunicipalities();
  const articles = getAllArticles();
  const baseUrl = "https://hoikaten.com";

  const prefecturePages = prefectureSlugs.map((slug) => ({
    url: `${baseUrl}/prefecture/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const cityPages = municipalities.map((m) => ({
    url: `${baseUrl}/${m.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  const articleListPages = municipalities.map((m) => ({
    url: `${baseUrl}/${m.slug}/articles`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const articlePages = articles
    .filter((a) => a.citySlug !== "general")
    .map((a) => ({
      url: `${baseUrl}/${a.citySlug}/articles/${a.slug}`,
      lastModified: new Date(a.publishedAt),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));

  const generalArticles = articles.filter((a) => a.citySlug === "general");
  const generalArticlePages = generalArticles.map((a) => ({
    url: `${baseUrl}/articles/${a.slug}`,
    lastModified: new Date(a.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/select`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/articles`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    ...prefecturePages,
    ...cityPages,
    ...articleListPages,
    ...articlePages,
    ...generalArticlePages,
  ];
}
