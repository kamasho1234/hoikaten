import type { InsuranceArticle } from "./types";
import { registerInsuranceArticles } from "./index";
import { BABYPLANET_URL } from "@/components/babyplanet-cta";

// 札幌市の子育てのお金の記事。
//
// ## 書くときの決まり
// **札幌市の公式サイトで確かめた内容だけを書く。**
// 所得制限の限度額そのものは扶養親族の数で変わり、確かめ切れないので
// 金額を書かず「限度額の表を見てほしい」と案内する（[[feedback_factcheck_absolute]]）。
//
// 2026年8月27日に city.sapporo.jp で確認した内容:
// - 子ども医療費助成は高校生世代まで（18歳に達する日以後の最初の3月31日まで）
// - **所得制限がある**。主たる生計維持者の前年（助成対象月が1〜7月の場合は前々年）の
//   所得額が限度額未満であること
// - 初診時一部負担金は医科580円、歯科510円
// - 再診、調剤薬局、柔道整復、はり・きゅう・保険適用のマッサージは0円
// - 入院・通院で基準の違いはない
// - 対象外は薬の容器代・文書料・入院時の差額ベッド代や食事療養にかかる費用・
//   ジェネリックがある薬で希望により先発医薬品を利用する場合に別途かかる料金など
// - 妊婦一般健康診査受診票は14回分。母子健康手帳の交付時に各区保健センターで渡される

const link = (text: string) =>
  `<a href="${BABYPLANET_URL}" rel="sponsored nofollow noopener" target="_blank">${text}</a>`;

const articles: InsuranceArticle[] = [
  {
    slug: "sapporo-kosodate-okane",
    title: "札幌市の子育てのお金｜医療費助成には所得制限がある。初診時の負担も確認を",
    description:
      "札幌市の子育て世帯が使えるお金の制度を、市の公式情報をもとにまとめました。高校生世代まで対象の子ども医療費助成と所得制限、初診時一部負担金（医科580円・歯科510円）、妊婦健診の受診票14回分などを整理しています。",
    group: "自治体ごとの支援",
    citySlug: "sapporo",
    readerFor: ["札幌市に住んでいる人", "所得制限が気になる人"],
    order: 230,
    updatedAt: "2026-08-27",
    content: `
<p>札幌市の子ども医療費助成は、対象年齢こそ高校生世代まで広がっていますが、<strong>所得制限があり、初診時には一部負担金もかかります</strong>。政令市の中でも条件が異なる部分なので、内容を正確に押さえておく価値があります。</p>

<h2>対象は高校生世代まで</h2>

<table>
<thead><tr><th></th><th>内容</th></tr></thead>
<tbody>
<tr><td><strong>対象年齢</strong></td><td>高校生世代まで（18歳に達する日以後の最初の3月31日まで）</td></tr>
<tr><td><strong>所得制限</strong></td><td><strong>あり</strong></td></tr>
<tr><td><strong>初診時一部負担金</strong></td><td>医科 580円 ／ 歯科 510円</td></tr>
<tr><td><strong>再診・調剤など</strong></td><td>0円</td></tr>
</tbody>
</table>

<p>入院・通院で基準の違いはなく、同じ考え方で助成されます。</p>

<h2>所得制限のしくみ</h2>

<p>助成を受けるには、<strong>主たる生計維持者の所得額が限度額未満</strong>である必要があります。見るのは次の年の所得です。</p>

<ul>
<li>助成対象月が<strong>8月〜12月</strong> … <strong>前年</strong>の所得</li>
<li>助成対象月が<strong>1月〜7月</strong> … <strong>前々年</strong>の所得</li>
</ul>

<div class="info-box"><p>限度額は扶養親族の数によって変わります。<strong>具体的な金額は札幌市の「各医療費助成の所得制限」のページに表で載っています</strong>ので、自分の扶養人数の行を確かめてください。</p></div>

<div class="point-box"><p>見落とされやすいのは<strong>「主たる生計維持者」で判定する</strong>点です。世帯の合算ではなく、生計を主に維持している人の所得で見ます。共働きでも、収入の多い側の所得が基準になります。</p></div>

<h2>初診時一部負担金がかかる</h2>

<p>札幌市では、<strong>初診のときだけ一部負担金</strong>がかかります。</p>

<table>
<thead><tr><th>場面</th><th>負担</th></tr></thead>
<tbody>
<tr><td>医科の初診</td><td><strong>580円</strong></td></tr>
<tr><td>歯科の初診</td><td><strong>510円</strong></td></tr>
<tr><td>再診</td><td>0円</td></tr>
<tr><td>調剤薬局</td><td>0円</td></tr>
<tr><td>柔道整復、はり・きゅう、保険適用のマッサージ</td><td>0円</td></tr>
</tbody>
</table>

<p>継続して通院する場合、負担がかかるのは最初の1回だけです。ただし<strong>別の病気で受診し直せば、また初診として扱われます</strong>。子どもは季節ごとに違う病気にかかるため、年間では何度か発生します。</p>

<h3>助成の対象にならないもの</h3>

<ul>
<li>薬の容器代</li>
<li>文書料（診断書など）</li>
<li>入院時の<strong>差額ベッド代</strong>や<strong>食事療養にかかる費用</strong></li>
<li><strong>ジェネリックがある薬で、希望により先発医薬品を使う場合に別途かかる料金</strong></li>
</ul>

<h2>妊婦健診の受診票は14回分</h2>

<p>札幌市に住民登録のある妊婦に、<strong>妊婦一般健康診査受診票が14回分</strong>渡されます。母子健康手帳の交付時に、各区の保健センターで受け取ります。</p>

<h2>全国共通の制度も忘れずに</h2>

<ul>
<li><a href="/insurance/ninpu-shien-kyufu"><strong>妊婦のための支援給付</strong></a>… 5万円＋こどもの人数×5万円</li>
<li><a href="/insurance/shussan-hiyou-hoken"><strong>出産育児一時金</strong></a>… 子ども1人につき原則50万円</li>
<li><a href="/insurance/shussan-teate-kin"><strong>出産手当金</strong></a>… 健康保険の被保険者が産休を取ったとき</li>
<li><a href="/insurance/ikukyu-chu-kakei"><strong>育児休業給付金</strong></a>… 2025年4月から手取り10割相当になる期間がある</li>
<li><strong>児童手当</strong>… 2024年10月から高校生年代まで。<strong>こちらは所得制限が撤廃されています</strong></li>
</ul>

<div class="warn-box"><p>児童手当は令和6年10月から所得制限がなくなりましたが、<strong>札幌市の子ども医療費助成の所得制限は別の制度</strong>です。「児童手当がもらえるから医療費助成も対象」とは限りません。</p></div>

<h2>保育園に入れるかどうかも見ておく</h2>

<p>札幌市の保育料は世帯の住民税所得割額と子どもの年齢クラスで決まります。3歳児クラスからは無償化で利用料が無償ですが、<a href="/insurance/hoikuryo-kimarikata">給食費などは別にかかります</a>。</p>

<p>入りやすさは区や園で差があります。<a href="/sapporo">札幌市の点数の基準</a>から、申し込む前に見通しを立てられます。</p>

<h2>所得制限がある自治体での考え方</h2>

<p>札幌市のように<strong>医療費助成に所得制限がある自治体</strong>では、収入によって受けられる支援が変わります。所得が限度額を超えると、子どもの医療費は通常どおり3割負担（未就学児は2割）になります。</p>

<p>この場合、次の点を確かめておく意味があります。</p>

<ul>
<li>自分の所得が限度額に対してどのあたりか（<strong>境目に近いなら年によって変わる</strong>）</li>
<li>限度額を超えた場合、年間の医療費がどのくらいになりそうか</li>
<li>それでも<a href="/insurance/kodomo-iryohi-josei">子ども本人の医療保険</a>が要るほどの額か</li>
</ul>

<p>ただし、子どもの医療費より<a href="/insurance/kodomo-umareta-minaoshi">親に何かあったときの保障</a>のほうが家計への影響は大きくなります。<strong>順番を押さえたうえで、助成の対象外になる部分を埋める</strong>のが無駄のない考え方です。</p>

<p>市外へ引っ越す可能性がある場合は、<a href="/insurance/hikkoshi-kosodate-okane">転居先で条件が変わる</a>点も頭に置いておいてください。判断に迷うときは${link("子育て世帯向けの無料相談")}のような窓口で、公的な保障の確認から整理してもらう手もあります。</p>
`,
    sources: [
      {
        label: "札幌市「子ども医療費助成」",
        url: "https://www.city.sapporo.jp/hoken-iryo/iryojosei/nyuyoji.html",
      },
      {
        label: "札幌市「各医療費助成の所得制限」",
        url: "https://www.city.sapporo.jp/hoken-iryo/iryojosei/gendo.html",
      },
      {
        label: "札幌市「子ども医療費助成制度の拡大について」",
        url: "https://www.city.sapporo.jp/hoken-iryo/iryojosei/kakudai.html",
      },
      {
        label: "札幌市子育てサイト「妊婦健診費用の一部公費負担」",
        url: "https://kosodate.city.sapporo.jp/mokuteki/money/ninshin/998.html",
      },
    ],
    faq: [
      {
        q: "札幌市の子ども医療費助成に所得制限はありますか。",
        a: "あります。主たる生計維持者の前年（助成対象月が1〜7月の場合は前々年）の所得額が限度額未満であることが条件です。限度額は扶養親族の数によって変わるため、市の「各医療費助成の所得制限」のページで確認してください。",
      },
      {
        q: "病院にかかるとお金はかかりますか。",
        a: "初診時に医科580円、歯科510円の一部負担金がかかります。再診、調剤薬局、柔道整復、はり・きゅう、保険適用のマッサージは0円です。",
      },
      {
        q: "児童手当がもらえれば医療費助成も対象になりますか。",
        a: "別の制度です。児童手当は令和6年10月から所得制限が撤廃されましたが、札幌市の子ども医療費助成には所得制限があります。",
      },
    ],
    cta: {
      heading: "所得制限で対象から外れる場合の考え方",
      body: "所得が限度額を超えると、子どもの医療費は通常どおりの自己負担になります。年間でどのくらいかかりそうかを見積もったうえで、本当に備えが要るのかを判断すると無駄がありません。子育て世帯の相談に慣れた窓口なら、この整理から一緒に進められます。",
    },
  },
];

registerInsuranceArticles(articles);

export default articles;
