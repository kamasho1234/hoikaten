// 保険の無料相談（ベビープラネット）の案内
//
// ## 広告であることを必ず出す
// アフィリエイトリンクを含む記事は、景品表示法の「ステルスマーケティング告示」
// （令和5年10月1日施行）で**広告であることを消費者が分かるように示す義務**がある。
// そのため、この枠には必ず「PR」を出し、リンクには rel="sponsored nofollow" を付ける。
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
    <aside className="my-10 rounded-2xl border border-primary/20 bg-primary/5 p-6">
      <p className="text-[10px] text-muted-foreground mb-2">PR</p>
      <h2 className="text-base font-bold text-foreground mb-2">{heading}</h2>
      <p className="text-sm text-foreground/85 leading-[1.8] mb-4">{body}</p>
      <a
        href={BABYPLANET_URL}
        rel="sponsored nofollow noopener"
        target="_blank"
        className="inline-flex items-center justify-center rounded-xl bg-primary px-5 py-3 text-sm font-bold text-primary-foreground hover:opacity-90 transition-opacity"
      >
        「ママ」のための保険無料相談サービス【ベビープラネット】
      </a>
      <p className="mt-3 text-xs text-muted-foreground leading-relaxed">
        相談は無料です。加入の義務はありません。この案内は広告で、リンク先で相談の申し込みがあると
        当サイトに紹介料が入ります。掲載している制度の内容は公的機関の情報をもとにしており、
        広告主の意向で変えているものではありません。
      </p>
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
