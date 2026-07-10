"use client";

import { useEffect, useState } from "react";

// 楽天アフィリエイト商品（保活・入園準備グッズ）300×300 pict
// 画像URL（hbb.afl.rakuten.co.jp）自体がインプレッション計測ビーコンを兼ねる
const ads = [
  {
    // お名前スタンプ（おむつ用）お名前シール製作所
    link: "https://hb.afl.rakuten.co.jp/ichiba/55aaed9e.d5a2cfeb.55aaed9f.7b2a76c5/?pc=https%3A%2F%2Fitem.rakuten.co.jp%2Fnaireseisakusho%2Fstampset-omutsu%2F&link_type=pict&ut=eyJwYWdlIjoiaXRlbSIsInR5cGUiOiJwaWN0Iiwic2l6ZSI6IjMwMHgzMDAiLCJuYW0iOjEsIm5hbXAiOiJyaWdodCIsImNvbSI6MSwiY29tcCI6ImRvd24iLCJwcmljZSI6MSwiYm9yIjoxLCJjb2wiOjEsImJidG4iOjEsInByb2QiOjAsImFtcCI6ZmFsc2V9",
    img: "https://hbb.afl.rakuten.co.jp/hgb/55aaed9e.d5a2cfeb.55aaed9f.7b2a76c5/?me_id=1321509&item_id=10000638&pc=https%3A%2F%2Fthumbnail.image.rakuten.co.jp%2F%400_mall%2Fnaireseisakusho%2Fcabinet%2Fstamp%2Fstampset-omutsupon%2Fthumbnail202601%2F1-2e.jpg%3F_ex%3D300x300&s=300x300&t=pict",
    alt: "お名前スタンプ（おむつ用）入園準備セット",
  },
  {
    // 体操着・お名前セット desuite
    link: "https://hb.afl.rakuten.co.jp/ichiba/55aaf16d.ea16541c.55aaf16e.9c8a0b45/?pc=https%3A%2F%2Fitem.rakuten.co.jp%2Fdesuite%2Fdcm01set5%2F&link_type=pict&ut=eyJwYWdlIjoiaXRlbSIsInR5cGUiOiJwaWN0Iiwic2l6ZSI6IjMwMHgzMDAiLCJuYW0iOjEsIm5hbXAiOiJyaWdodCIsImNvbSI6MSwiY29tcCI6ImRvd24iLCJwcmljZSI6MCwiYm9yIjoxLCJjb2wiOjEsImJidG4iOjEsInByb2QiOjAsImFtcCI6ZmFsc2V9",
    img: "https://hbb.afl.rakuten.co.jp/hgb/55aaf16d.ea16541c.55aaf16e.9c8a0b45/?me_id=1363351&item_id=10000812&pc=https%3A%2F%2Fthumbnail.image.rakuten.co.jp%2F%400_mall%2Fdesuite%2Fcabinet%2F01item%2Fschool%2Fdcm01set%2Fdcm01set4-th0309.jpg%3F_ex%3D300x300&s=300x300&t=pict",
    alt: "入園・入学準備 お名前グッズセット",
  },
  {
    // お名前スタンプ + 布用お名前シールセット naireseisakusho
    link: "https://hb.afl.rakuten.co.jp/ichiba/55aaed9e.d5a2cfeb.55aaed9f.7b2a76c5/?pc=https%3A%2F%2Fitem.rakuten.co.jp%2Fnaireseisakusho%2Fstampset3%2F&link_type=pict&ut=eyJwYWdlIjoiaXRlbSIsInR5cGUiOiJwaWN0Iiwic2l6ZSI6IjMwMHgzMDAiLCJuYW0iOjEsIm5hbXAiOiJyaWdodCIsImNvbSI6MSwiY29tcCI6ImRvd24iLCJwcmljZSI6MCwiYm9yIjoxLCJjb2wiOjEsImJidG4iOjEsInByb2QiOjAsImFtcCI6ZmFsc2V9",
    img: "https://hbb.afl.rakuten.co.jp/hgb/55aaed9e.d5a2cfeb.55aaed9f.7b2a76c5/?me_id=1321509&item_id=10002318&pc=https%3A%2F%2Fthumbnail.image.rakuten.co.jp%2F%400_mall%2Fnaireseisakusho%2Fcabinet%2Fstamp%2Fstampset3%2Fthumbnail2_stampset3%2Fplus7_1-2.jpg%3F_ex%3D300x300&s=300x300&t=pict",
    alt: "お名前スタンプ＋布用お名前シールセット",
  },
  {
    // レッスンバッグ hoppe
    link: "https://hb.afl.rakuten.co.jp/ichiba/55aaf39b.54fad4ad.55aaf39c.983b58d7/?pc=https%3A%2F%2Fitem.rakuten.co.jp%2Fhoppe%2Flesson_02%2F&link_type=pict&ut=eyJwYWdlIjoiaXRlbSIsInR5cGUiOiJwaWN0Iiwic2l6ZSI6IjMwMHgzMDAiLCJuYW0iOjEsIm5hbXAiOiJyaWdodCIsImNvbSI6MSwiY29tcCI6ImRvd24iLCJwcmljZSI6MCwiYm9yIjoxLCJjb2wiOjEsImJidG4iOjEsInByb2QiOjAsImFtcCI6ZmFsc2V9",
    img: "https://hbb.afl.rakuten.co.jp/hgb/55aaf39b.54fad4ad.55aaf39c.983b58d7/?me_id=1316273&item_id=10000489&pc=https%3A%2F%2Fthumbnail.image.rakuten.co.jp%2F%400_mall%2Fhoppe%2Fcabinet%2Flessonbag%2Fimgrc0108245327.jpg%3F_ex%3D300x300&s=300x300&t=pict",
    alt: "入園・入学 レッスンバッグ",
  },
  {
    // お昼寝布団セット futonmura
    link: "https://hb.afl.rakuten.co.jp/ichiba/55aaf77b.9fc7710b.55aaf77c.57b695a1/?pc=https%3A%2F%2Fitem.rakuten.co.jp%2Ffutonmura%2Ffi-ohirunefutonset4%2F&link_type=pict&ut=eyJwYWdlIjoiaXRlbSIsInR5cGUiOiJwaWN0Iiwic2l6ZSI6IjMwMHgzMDAiLCJuYW0iOjEsIm5hbXAiOiJyaWdodCIsImNvbSI6MSwiY29tcCI6ImRvd24iLCJwcmljZSI6MCwiYm9yIjoxLCJjb2wiOjEsImJidG4iOjEsInByb2QiOjAsImFtcCI6ZmFsc2V9",
    img: "https://hbb.afl.rakuten.co.jp/hgb/55aaf77b.9fc7710b.55aaf77c.57b695a1/?me_id=1219979&item_id=10005692&pc=https%3A%2F%2Fthumbnail.image.rakuten.co.jp%2F%400_mall%2Ffutonmura%2Fcabinet%2Ffi%2Ffi-ofs3313-1.jpg%3F_ex%3D300x300&s=300x300&t=pict",
    alt: "保育園 お昼寝布団セット",
  },
  {
    // お昼寝布団 futon-outlet
    link: "https://hb.afl.rakuten.co.jp/ichiba/55aaf834.c49b190c.55aaf835.1349ac92/?pc=https%3A%2F%2Fitem.rakuten.co.jp%2Ffuton-outlet%2F10001208%2F&link_type=pict&ut=eyJwYWdlIjoiaXRlbSIsInR5cGUiOiJwaWN0Iiwic2l6ZSI6IjMwMHgzMDAiLCJuYW0iOjEsIm5hbXAiOiJyaWdodCIsImNvbSI6MSwiY29tcCI6ImRvd24iLCJwcmljZSI6MCwiYm9yIjoxLCJjb2wiOjEsImJidG4iOjEsInByb2QiOjAsImFtcCI6ZmFsc2V9",
    img: "https://hbb.afl.rakuten.co.jp/hgb/55aaf834.c49b190c.55aaf835.1349ac92/?me_id=1212640&item_id=10001208&pc=https%3A%2F%2Fthumbnail.image.rakuten.co.jp%2F%400_mall%2Ffuton-outlet%2Fcabinet%2Fbaby_junior%2F6634620000047-01s.jpg%3F_ex%3D300x300&s=300x300&t=pict",
    alt: "ベビー・ジュニア お昼寝布団",
  },
  {
    // おねしょケット（ロング）soronso
    link: "https://hb.afl.rakuten.co.jp/ichiba/55aaf9fa.36d4ca4b.55aaf9fb.a48bd15d/?pc=https%3A%2F%2Fitem.rakuten.co.jp%2Fsoronso%2Fsoronso-onesyo-long%2F&link_type=pict&ut=eyJwYWdlIjoiaXRlbSIsInR5cGUiOiJwaWN0Iiwic2l6ZSI6IjMwMHgzMDAiLCJuYW0iOjEsIm5hbXAiOiJyaWdodCIsImNvbSI6MSwiY29tcCI6ImRvd24iLCJwcmljZSI6MCwiYm9yIjoxLCJjb2wiOjEsImJidG4iOjEsInByb2QiOjAsImFtcCI6ZmFsc2V9",
    img: "https://hbb.afl.rakuten.co.jp/hgb/55aaf9fa.36d4ca4b.55aaf9fb.a48bd15d/?me_id=1432351&item_id=10000001&pc=https%3A%2F%2Fthumbnail.image.rakuten.co.jp%2F%400_mall%2Fsoronso%2Fcabinet%2F12424256%2Ffdg32.jpg%3F_ex%3D300x300&s=300x300&t=pict",
    alt: "おねしょ対策 ロングケット",
  },
  {
    // おねしょパンツ wagaku0204
    link: "https://hb.afl.rakuten.co.jp/ichiba/55aafae8.25adb043.55aafae9.ccac7590/?pc=https%3A%2F%2Fitem.rakuten.co.jp%2Fwagaku0204%2Fonesyopants%2F&link_type=pict&ut=eyJwYWdlIjoiaXRlbSIsInR5cGUiOiJwaWN0Iiwic2l6ZSI6IjMwMHgzMDAiLCJuYW0iOjEsIm5hbXAiOiJyaWdodCIsImNvbSI6MSwiY29tcCI6ImRvd24iLCJwcmljZSI6MCwiYm9yIjoxLCJjb2wiOjEsImJidG4iOjEsInByb2QiOjAsImFtcCI6ZmFsc2V9",
    img: "https://hbb.afl.rakuten.co.jp/hgb/55aafae8.25adb043.55aafae9.ccac7590/?me_id=1394902&item_id=10000086&pc=https%3A%2F%2Fthumbnail.image.rakuten.co.jp%2F%400_mall%2Fwagaku0204%2Fcabinet%2F08870368%2F10398488%2F10490691%2Fimgrc0116094498.jpg%3F_ex%3D300x300&s=300x300&t=pict",
    alt: "おねしょ対策 防水パンツ",
  },
  {
    // お昼寝布団・入園グッズ aooka
    link: "https://hb.afl.rakuten.co.jp/ichiba/55aafbb7.0ab1682d.55aafbb8.2202be56/?pc=https%3A%2F%2Fitem.rakuten.co.jp%2Faooka%2F018-90701-01%2F&link_type=pict&ut=eyJwYWdlIjoiaXRlbSIsInR5cGUiOiJwaWN0Iiwic2l6ZSI6IjMwMHgzMDAiLCJuYW0iOjEsIm5hbXAiOiJyaWdodCIsImNvbSI6MSwiY29tcCI6ImRvd24iLCJwcmljZSI6MCwiYm9yIjoxLCJjb2wiOjEsImJidG4iOjEsInByb2QiOjAsImFtcCI6ZmFsc2V9",
    img: "https://hbb.afl.rakuten.co.jp/hgb/55aafbb7.0ab1682d.55aafbb8.2202be56/?me_id=1388816&item_id=10000030&pc=https%3A%2F%2Fthumbnail.image.rakuten.co.jp%2F%400_mall%2Faooka%2Fcabinet%2F11606098%2F11720242%2F90701-01.jpg%3F_ex%3D300x300&s=300x300&t=pict",
    alt: "入園準備グッズ",
  },
  {
    // 布用お名前シール ario-ario-ario
    link: "https://hb.afl.rakuten.co.jp/ichiba/55aaff87.6e678e21.55aaff88.2e243cb2/?pc=https%3A%2F%2Fitem.rakuten.co.jp%2Fario-ario-ario%2Fnuno_nameseal%2F&link_type=pict&ut=eyJwYWdlIjoiaXRlbSIsInR5cGUiOiJwaWN0Iiwic2l6ZSI6IjMwMHgzMDAiLCJuYW0iOjEsIm5hbXAiOiJyaWdodCIsImNvbSI6MSwiY29tcCI6ImRvd24iLCJwcmljZSI6MCwiYm9yIjoxLCJjb2wiOjEsImJidG4iOjEsInByb2QiOjAsImFtcCI6ZmFsc2V9",
    img: "https://hbb.afl.rakuten.co.jp/hgb/55aaff87.6e678e21.55aaff88.2e243cb2/?me_id=1311303&item_id=10000605&pc=https%3A%2F%2Fthumbnail.image.rakuten.co.jp%2F%400_mall%2Fario-ario-ario%2Fcabinet%2Fitem_img%2Fnuno_seal_mainimg.jpg%3F_ex%3D300x300&s=300x300&t=pict",
    alt: "布用お名前シール アイロン",
  },
  {
    // ベビーグッズ marine-blue
    link: "https://hb.afl.rakuten.co.jp/ichiba/55ab007b.fb09593b.55ab007c.13ba758d/?pc=https%3A%2F%2Fitem.rakuten.co.jp%2Fmarine-blue%2Fbabys099%2F&link_type=pict&ut=eyJwYWdlIjoiaXRlbSIsInR5cGUiOiJwaWN0Iiwic2l6ZSI6IjMwMHgzMDAiLCJuYW0iOjEsIm5hbXAiOiJyaWdodCIsImNvbSI6MSwiY29tcCI6ImRvd24iLCJwcmljZSI6MCwiYm9yIjoxLCJjb2wiOjEsImJidG4iOjEsInByb2QiOjAsImFtcCI6ZmFsc2V9",
    img: "https://hbb.afl.rakuten.co.jp/hgb/55ab007b.fb09593b.55ab007c.13ba758d/?me_id=1350960&item_id=10000579&pc=https%3A%2F%2Fthumbnail.image.rakuten.co.jp%2F%400_mall%2Fmarine-blue%2Fcabinet%2F07513343%2Fbabys099.jpg%3F_ex%3D300x300&s=300x300&t=pict",
    alt: "入園準備 ベビーグッズ",
  },
  {
    // 通園・お名前グッズ zeetop
    link: "https://hb.afl.rakuten.co.jp/ichiba/55ab0143.066fb345.55ab0144.aed86ccf/?pc=https%3A%2F%2Fitem.rakuten.co.jp%2Fzeetop%2Fg13001%2F&link_type=pict&ut=eyJwYWdlIjoiaXRlbSIsInR5cGUiOiJwaWN0Iiwic2l6ZSI6IjMwMHgzMDAiLCJuYW0iOjEsIm5hbXAiOiJyaWdodCIsImNvbSI6MSwiY29tcCI6ImRvd24iLCJwcmljZSI6MCwiYm9yIjoxLCJjb2wiOjEsImJidG4iOjEsInByb2QiOjAsImFtcCI6ZmFsc2V9",
    img: "https://hbb.afl.rakuten.co.jp/hgb/55ab0143.066fb345.55ab0144.aed86ccf/?me_id=1257130&item_id=10000320&pc=https%3A%2F%2Fthumbnail.image.rakuten.co.jp%2F%400_mall%2Fzeetop%2Fcabinet%2Fk-mini%2F03156594%2Fnormal8.jpg%3F_ex%3D300x300&s=300x300&t=pict",
    alt: "通園・お名前グッズ",
  },
];

export function RandomAd() {
  const [ad, setAd] = useState<(typeof ads)[number] | null>(null);

  useEffect(() => {
    setAd(ads[Math.floor(Math.random() * ads.length)]);
  }, []);

  if (!ad) return null;

  return (
    <div className="flex justify-center my-8">
      <div className="text-center">
        <p className="text-[10px] text-muted-foreground mb-1">広告</p>
        <a href={ad.link} rel="nofollow sponsored noopener" target="_blank">
          <img
            src={ad.img}
            width={300}
            height={300}
            alt={ad.alt}
            className="rounded-lg"
            loading="lazy"
          />
        </a>
      </div>
    </div>
  );
}
