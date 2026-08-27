import { readFile } from "node:fs/promises";
import path from "node:path";

// ヒーロー画像に日本語を描くためのフォント。
//
// ## なぜサブセットなのか
// Noto Sans JP Bold の実物は 4.6MB ある。ヒーロー画像は記事ごとに静的生成していて
// 数千ページ分作るため、毎回フルサイズを読むとビルドが重くなる。
// **画像に出す文字（記事のカテゴリ名・自治体名・数字と英字）だけに絞って 140KB にした**
// （fontTools の subset。668文字）。
//
// カテゴリ名や自治体名を増やしたときに画像の字が □ になったら、
// サブセットにその文字が入っていない。**`npm run hero-font` で作り直す**
// （scripts/build-hero-font.py）。同スクリプトは文字の照合もするので、
// 漏れがあればその場で分かる。
//
// ## woff2 は使えない
// ImageResponse（satori）は **woff2 を読めない**。TTF/OTF/WOFF のいずれかにすること。

const FONT_PATH = path.join(process.cwd(), "public/fonts/NotoSansJP-Bold-subset.otf");

let cached: Buffer | null = null;

/** ヒーロー画像用のフォント。何千ページ分も生成するのでプロセス内で使い回す */
export async function loadHeroFont(): Promise<Buffer> {
  if (!cached) {
    cached = await readFile(FONT_PATH);
  }
  return cached;
}

/** ImageResponse に渡す fonts オプション */
export async function heroFontOptions() {
  const data = await loadHeroFont();
  return [
    {
      name: "NotoSansJP",
      data,
      weight: 700 as const,
      style: "normal" as const,
    },
  ];
}
