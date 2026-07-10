"use client";

import { useEffect, useState } from "react";

// 楽天アフィリエイト テキストリンク（保活・入園準備グッズ）
// link_type=text のためインプレッション計測ビーコンは無し（アンカーのみ）
const textAds = [
  {
    link: "https://hb.afl.rakuten.co.jp/ichiba/55ab0cc7.3fb8c2fc.55ab0cc8.9bba8048/?pc=https%3A%2F%2Fitem.rakuten.co.jp%2Fhankoya-shop%2Foname-seal%2F&link_type=text&ut=eyJwYWdlIjoiaXRlbSIsInR5cGUiOiJ0ZXh0Iiwic2l6ZSI6IjMwMHgzMDAiLCJuYW0iOjEsIm5hbXAiOiJyaWdodCIsImNvbSI6MSwiY29tcCI6ImRvd24iLCJwcmljZSI6MCwiYm9yIjoxLCJjb2wiOjEsImJidG4iOjEsInByb2QiOjAsImFtcCI6ZmFsc2V9",
    text: "【50円OFFクーポン配布中】名前シール 防水 お名前シール 入園準備 入学準備 おなまえシール 最大833枚 防水 耐水 算数セット タグ 北欧風 保育園 幼稚園 小学校 防水お名前シール 食洗機 レンジ 漢字 ネームシール 入学 入園 入学祝",
  },
  {
    link: "https://hb.afl.rakuten.co.jp/ichiba/55ab0d9e.5bd542be.55ab0d9f.ad181928/?pc=https%3A%2F%2Fitem.rakuten.co.jp%2Fhankos%2F1505879%2F&link_type=text&ut=eyJwYWdlIjoiaXRlbSIsInR5cGUiOiJ0ZXh0Iiwic2l6ZSI6IjMwMHgzMDAiLCJuYW0iOjEsIm5hbXAiOiJyaWdodCIsImNvbSI6MSwiY29tcCI6ImRvd24iLCJwcmljZSI6MCwiYm9yIjoxLCJjb2wiOjEsImJidG4iOjEsInByb2QiOjAsImFtcCI6ZmFsc2V9",
    text: "【500円OFFクーポン発行中】見やすいすっきりフォント【選べるおまけ付 3〜4営業日発送 お名前スタンプ『おなまえ〜る』入園セット ひらがな 漢字 ローマ字 アイロン不要 布 油性スタンプ 保育園 幼稚園 入園準備 小学校 入学準備 お名前はんこ 子供 出産祝い 送料無料",
  },
  {
    link: "https://hb.afl.rakuten.co.jp/ichiba/55ab0ddd.863a7644.55ab0dde.d4038315/?pc=https%3A%2F%2Fitem.rakuten.co.jp%2Fstellashop%2Fzz356%2F&link_type=text&ut=eyJwYWdlIjoiaXRlbSIsInR5cGUiOiJ0ZXh0Iiwic2l6ZSI6IjMwMHgzMDAiLCJuYW0iOjEsIm5hbXAiOiJyaWdodCIsImNvbSI6MSwiY29tcCI6ImRvd24iLCJwcmljZSI6MCwiYm9yIjoxLCJjb2wiOjEsImJidG4iOjEsInByb2QiOjAsImFtcCI6ZmFsc2V9",
    text: "入園入学 5点セット おまけ付き 入園入学セット キッズ 子供 男の子 女の子 入園準備 入学準備 グッズ キャラクター ディズニー ミッフィー すみっコぐらし 小学生 幼稚園 レッスンバッグ 2026 推し活 推し活グッズ",
  },
  {
    link: "https://hb.afl.rakuten.co.jp/ichiba/55ab0f6e.3dac1cb8.55ab0f6f.f2ff4e46/?pc=https%3A%2F%2Fitem.rakuten.co.jp%2Fponopono%2F220520202%2F&link_type=text&ut=eyJwYWdlIjoiaXRlbSIsInR5cGUiOiJ0ZXh0Iiwic2l6ZSI6IjMwMHgzMDAiLCJuYW0iOjEsIm5hbXAiOiJyaWdodCIsImNvbSI6MSwiY29tcCI6ImRvd24iLCJwcmljZSI6MCwiYm9yIjoxLCJjb2wiOjEsImJidG4iOjEsInByb2QiOjAsImFtcCI6ZmFsc2V9",
    text: "【洗える】 お昼寝ふとん 【天竺ニット】 綿100% お昼寝ふとんセット 撥水 バック 保育園 幼稚園 子供 キッズ ふとん 洗濯OK 入園 通園",
  },
  {
    link: "https://hb.afl.rakuten.co.jp/ichiba/55ab1025.bf02bf73.55ab1026.a99c8ea7/?pc=https%3A%2F%2Fitem.rakuten.co.jp%2Fsweet-mommy%2Fsg21002-%2F&link_type=text&ut=eyJwYWdlIjoiaXRlbSIsInR5cGUiOiJ0ZXh0Iiwic2l6ZSI6IjMwMHgzMDAiLCJuYW0iOjEsIm5hbXAiOiJyaWdodCIsImNvbSI6MSwiY29tcCI6ImRvd24iLCJwcmljZSI6MCwiYm9yIjoxLCJjb2wiOjEsImJidG4iOjEsInByb2QiOjAsImFtcCI6ZmFsc2V9",
    text: "お昼寝布団セット 保育園 日本製 リバーシブル 洗える 天使のお昼寝ふとん7点セット 幼稚園 超軽量 強撥水バッグ付き 超軽量組布団 ふとん 中綿布団 アレルギー対策布団 通園 リバーシブルシーツ お昼寝 入園準備 お昼寝ふとんセット",
  },
  {
    link: "https://hb.afl.rakuten.co.jp/ichiba/55aaf834.c49b190c.55aaf835.1349ac92/?pc=https%3A%2F%2Fitem.rakuten.co.jp%2Ffuton-outlet%2F10000738%2F&link_type=text&ut=eyJwYWdlIjoiaXRlbSIsInR5cGUiOiJ0ZXh0Iiwic2l6ZSI6IjMwMHgzMDAiLCJuYW0iOjEsIm5hbXAiOiJyaWdodCIsImNvbSI6MSwiY29tcCI6ImRvd24iLCJwcmljZSI6MCwiYm9yIjoxLCJjb2wiOjEsImJidG4iOjEsInByb2QiOjAsImFtcCI6ZmFsc2V9",
    text: "★在庫限り★ お昼寝布団セット 7点 洗える 保育園 幼稚園 ディズニー スヌーピー ミニオン 布団セット お昼寝ふとん セット おひるね 布団 子供 ベビー キッズ 入園準備 キャラクター 女の子 男の子 敷き布団 洗濯機OK 送料無料 スヌーピー／BE／T",
  },
  {
    link: "https://hb.afl.rakuten.co.jp/ichiba/55aafae8.25adb043.55aafae9.ccac7590/?pc=https%3A%2F%2Fitem.rakuten.co.jp%2Fwagaku0204%2Fonesyopants%2F&link_type=text&ut=eyJwYWdlIjoiaXRlbSIsInR5cGUiOiJ0ZXh0Iiwic2l6ZSI6IjMwMHgzMDAiLCJuYW0iOjEsIm5hbXAiOiJyaWdodCIsImNvbSI6MSwiY29tcCI6ImRvd24iLCJwcmljZSI6MCwiYm9yIjoxLCJjb2wiOjEsImJidG4iOjEsInByb2QiOjAsImFtcCI6ZmFsc2V9",
    text: "【マラソンラスト26時間限定！10％クーポン&P2％バック】 おねぽん おねしょ ズボン 防水 おねしょ パンツ トレーニングパンツ トイレトレーニング おねしょズボン 夏用 冬用 トイトレ 女の子 男の子 腹巻 ベビー 子供 キッズ 2歳 3歳 4歳 5歳 綿100% パジャマ オムツカバー",
  },
  {
    link: "https://hb.afl.rakuten.co.jp/ichiba/55aaf9fa.36d4ca4b.55aaf9fb.a48bd15d/?pc=https%3A%2F%2Fitem.rakuten.co.jp%2Fsoronso%2Fsoronso-onesyohalf%2F&link_type=text&ut=eyJwYWdlIjoiaXRlbSIsInR5cGUiOiJ0ZXh0Iiwic2l6ZSI6IjMwMHgzMDAiLCJuYW0iOjEsIm5hbXAiOiJyaWdodCIsImNvbSI6MSwiY29tcCI6ImRvd24iLCJwcmljZSI6MCwiYm9yIjoxLCJjb2wiOjEsImJidG4iOjEsInByb2QiOjAsImFtcCI6ZmFsc2V9",
    text: "【最終日限定☆MAX388円クーポン】サラリーノ ＼小学生OK／おねしょズボン 小学校 新改良 さらさら快適 防水 おねしょパンツ トレーニングパンツ トイレトレーニング トイトレ 女の子 男の子 小学生 ベビー 子供 キッズ 3歳 4歳 5歳 綿【送料無料】【90日間保証】",
  },
];

export function RandomTextAd() {
  const [ad, setAd] = useState<(typeof textAds)[number] | null>(null);

  useEffect(() => {
    setAd(textAds[Math.floor(Math.random() * textAds.length)]);
  }, []);

  if (!ad) return null;

  return (
    <div className="my-8 rounded-xl border border-border bg-muted/30 p-4">
      <p className="text-[10px] text-muted-foreground mb-1">PR</p>
      <a
        href={ad.link}
        target="_blank"
        rel="nofollow sponsored noopener"
        className="text-sm text-primary underline underline-offset-2 hover:opacity-80 break-words"
      >
        {ad.text}
      </a>
    </div>
  );
}
