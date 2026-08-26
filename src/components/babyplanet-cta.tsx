// 保険の無料相談（ベビープラネット）の案内
//
// ## 広告であることを必ず出す
// アフィリエイトリンクを含むページは、景品表示法の「ステルスマーケティング告示」
// （令和5年10月1日施行）で**広告であることを消費者が分かるように示す義務**がある。
// 枠の外（すぐ上）に「※PRを含みます」を出し、リンクには rel="sponsored nofollow" を付けている。
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
// A8.net の 1×1 画像はインプレッションの計測用。
// **バナーとテキストリンクは別のマテリアル**（a8mat の末尾が違う）なので、
// それぞれに計測用の画像が要る。ただし同じマテリアルのものを
// 1ページに何度も置くと二重に数えられるため、
// このコンポーネントは1ページに1回だけ使う。

/** A8.net の広告リンク（テキスト） */
export const BABYPLANET_URL = "https://px.a8.net/svt/ejp?a8mat=4B1ILN+8KZZQQ+503M+60H7M";
/** A8.net の広告リンク（バナー 234×60） */
const BABYPLANET_BANNER_URL = "https://px.a8.net/svt/ejp?a8mat=4B1ILN+8KZZQQ+503M+601S1";
/** バナーの画像 */
const BABYPLANET_BANNER_IMG =
  "https://www26.a8.net/svt/bgt?aid=260411243519&wid=001&eno=01&mid=s00000023341001008000&mc=1";
/** インプレッション計測用（テキストリンクのぶん） */
const BABYPLANET_PIXEL = "https://www12.a8.net/0.gif?a8mat=4B1ILN+8KZZQQ+503M+60H7M";
/** インプレッション計測用（バナーのぶん） */
const BABYPLANET_BANNER_PIXEL = "https://www12.a8.net/0.gif?a8mat=4B1ILN+8KZZQQ+503M+601S1";

export function BabyPlanetCta({
  heading,
  body,
}: {
  heading: string;
  body: string;
}) {
  return (
    <div className="my-10">
      {/* 広告であることの表示。枠の外に置く */}
      <p className="text-[10px] text-muted-foreground mb-1.5">※PRを含みます</p>

      <aside className="rounded-2xl border border-border/60 p-6">
        <h2 className="text-base font-bold text-foreground mb-2">{heading}</h2>
        <p className="text-sm text-foreground/85 leading-[1.8] mb-4">{body}</p>

        <p className="text-sm text-foreground/85 leading-[1.8] mb-5">
          ベビープラネットは、
          <strong>妊娠・出産・育児の時期の家庭に向けて作られた保険の相談サービス</strong>
          です。20社以上の保険会社を扱うプランナーを紹介してもらえます。相談は何度でも無料で、
          オンラインでも自宅でも受けられるので、小さな子どもがいても出向かずに済みます。
        </p>

        <div className="mb-4">
          <a
            href={BABYPLANET_URL}
            rel="sponsored nofollow noopener"
            target="_blank"
            className="inline-flex items-center justify-center rounded-xl bg-primary px-5 py-3 text-sm font-bold text-primary-foreground hover:opacity-90 transition-opacity"
          >
            「ママ」のための保険無料相談サービス【ベビープラネット】
          </a>
        </div>

        {/* バナー */}
        <a
          href={BABYPLANET_BANNER_URL}
          rel="sponsored nofollow noopener"
          target="_blank"
          className="inline-block"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={BABYPLANET_BANNER_IMG}
            alt="「ママ」のための保険無料相談サービス【ベビープラネット】"
            width={234}
            height={60}
            className="max-w-full h-auto rounded"
          />
        </a>

        {/* インプレッション計測用（表示されない） */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={BABYPLANET_PIXEL} alt="" width={1} height={1} className="hidden" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={BABYPLANET_BANNER_PIXEL} alt="" width={1} height={1} className="hidden" />
      </aside>
    </div>
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
