// 保険の無料相談（ベビープラネット）の案内
//
// ## 広告であることを必ず出す
// アフィリエイトリンクを含むページは、景品表示法の「ステルスマーケティング告示」
// （令和5年10月1日施行）で**広告であることを消費者が分かるように示す義務**がある。
// この枠の下に「PR」を出し、リンクには rel="sponsored nofollow" を付けている。
//
// ## 書いてよいこと
// サービスの特徴は**公式サイトに書かれていることだけ**を書く。
// 公式サイト（baby-planet.net）で確かめた内容:
// - 妊娠・出産・育児のステージにある家族向け
// - 20社以上の保険会社を取り扱う（担当者により取り扱いは異なる）
// - 相談は何度でも無料
// - オンライン・自宅・職場・店舗で相談できる
// - 相談した人に選べるグッズのプレゼントがある
// **相談実績の件数や利用者数は公式サイトに記載がない**ので、
// 「◯万人が利用」のような書き方はしない。
//
// ## 計測用の画像について
// A8.net の 1×1 画像はインプレッションの計測用。同じページに何度も置くと
// 二重に数えられるので、**1ページに1つだけ**（＝このコンポーネントを1回だけ）使う。

/** A8.net の広告リンク */
export const BABYPLANET_URL = "https://px.a8.net/svt/ejp?a8mat=4B1ILN+8KZZQQ+503M+60H7M";
/** A8.net のインプレッション計測用画像 */
const BABYPLANET_PIXEL = "https://www12.a8.net/0.gif?a8mat=4B1ILN+8KZZQQ+503M+60H7M";

export function BabyPlanetCta({
  heading,
  body,
}: {
  heading: string;
  body: string;
}) {
  return (
    <aside className="my-10 rounded-2xl border border-border/60 p-6">
      <h2 className="text-base font-bold text-foreground mb-2">{heading}</h2>
      <p className="text-sm text-foreground/85 leading-[1.8] mb-4">{body}</p>

      <p className="text-sm text-foreground/85 leading-[1.8] mb-4">
        ベビープラネットは、<strong>妊娠・出産・育児の時期の家庭に向けて作られた保険の相談サービス</strong>です。
        20社以上の保険会社を扱うプランナーを紹介してもらえます。相談は何度でも無料で、
        オンラインでも自宅でも受けられるので、小さな子どもがいても出向かずに済みます。
      </p>

      <a
        href={BABYPLANET_URL}
        rel="sponsored nofollow noopener"
        target="_blank"
        className="inline-flex items-center justify-center rounded-xl bg-primary px-5 py-3 text-sm font-bold text-primary-foreground hover:opacity-90 transition-opacity"
      >
        「ママ」のための保険無料相談サービス【ベビープラネット】
      </a>

      <p className="mt-4 text-[10px] text-muted-foreground">PR</p>

      {/* インプレッション計測用（表示されない） */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={BABYPLANET_PIXEL} alt="" width={1} height={1} className="hidden" />
    </aside>
  );
}

/**
 * 本文の途中に置くテキストリンク。
 * 記事の流れを切らずに置けるよう、囲みではなく1行の文にしている
 */
export function BabyPlanetInlineLink({ children }: { children: React.ReactNode }) {
  return (
    <a href={BABYPLANET_URL} rel="sponsored nofollow noopener" target="_blank">
      {children}
    </a>
  );
}
