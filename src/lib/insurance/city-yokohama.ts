import type { InsuranceArticle } from "./types";
import { registerInsuranceArticles } from "./index";
import { BABYPLANET_URL } from "@/components/babyplanet-cta";

// 横浜市の子育てのお金の記事。
//
// ## 書くときの決まり
// **横浜市の公式サイトで確かめた内容だけを書く。**
// 金額や条件が確かめられなかったものは、金額を書かずに
// 「市の窓口で確認」と案内する（[[feedback_factcheck_absolute]]）。
//
// 2026年8月27日に city.yokohama.lg.jp で確認した内容:
// - 小児医療費助成は令和8年6月1日の診療分から0歳〜18歳（18歳に達する日以後の
//   最初の3月31日）まで。所得制限なし、一部負担金なし（保険診療の自己負担額を全額助成）
// - 令和5年8月から中学3年生までの所得制限と通院1回500円の窓口負担を廃止していた
// - 助成の対象外は入院の差額ベッド代・文書料・健康診断・選定療養費等
// - 妊婦健診の補助券は14枚。多胎はさらに5枚（4,700円×4枚、12,000円×1枚）
// - 妊婦健康診査費用助成金は妊婦1人あたり5万円。令和6年4月1日以降に妊婦健診を
//   受診していることなどが要件。申請は妊娠中
// - 産婦健康診査は産後2週間と1か月の2回まで、1回5,000円
// - 産後母子ケア事業は訪問型（産後1年未満）・デイケア（産後6か月未満）・
//   ショートステイ（産後4か月未満）の3類型。**利用料は確認できなかったので書かない**

const link = (text: string) =>
  `<a href="${BABYPLANET_URL}" rel="sponsored nofollow noopener" target="_blank">${text}</a>`;

const articles: InsuranceArticle[] = [
  {
    slug: "yokohama-kosodate-okane",
    title: "横浜市の子育てのお金｜18歳まで医療費無償、妊婦健診に5万円上乗せ",
    description:
      "横浜市の子育て世帯が使えるお金の制度を、市の公式情報をもとにまとめました。令和8年6月から18歳まで拡大された小児医療費助成、妊婦1人あたり5万円の妊婦健康診査費用助成金、産婦健診の補助などを整理しています。",
    group: "自治体ごとの支援",
    citySlug: "yokohama",
    readerFor: ["横浜市に住んでいる人", "横浜市に引っ越す予定の人"],
    order: 200,
    updatedAt: "2026-08-27",
    content: `
<p>横浜市の子育て支援は、<strong>2026年（令和8年）6月に大きく変わりました</strong>。小児医療費助成の対象が18歳まで広がっています。ここでは市の公式情報をもとに、使えるお金を整理します。</p>

<h2>小児医療費助成が18歳まで無償になりました</h2>

<p>令和8年6月1日の診療分から、横浜市に住む<strong>0歳から18歳（18歳に達する日以後の最初の3月31日）まで</strong>の子どもが対象になりました。</p>

<table>
<thead><tr><th></th><th>内容</th></tr></thead>
<tbody>
<tr><td><strong>対象年齢</strong></td><td>0歳〜18歳（18歳に達する日以後の最初の3月31日まで）</td></tr>
<tr><td><strong>所得制限</strong></td><td>なし</td></tr>
<tr><td><strong>窓口負担</strong></td><td>なし（保険診療の自己負担額を全額助成）</td></tr>
</tbody>
</table>

<div class="point-box"><p>横浜市は令和5年8月の時点で、すでに<strong>中学3年生までの所得制限と、通院1回500円の窓口負担を廃止</strong>していました。令和8年6月の変更は、そこから対象年齢を高校生年代まで広げたものです。</p></div>

<h3>助成の対象にならないもの</h3>

<p>保険給付にならないものは対象外です。</p>

<ul>
<li>入院の<strong>差額ベッド代</strong></li>
<li>文書料（診断書など）</li>
<li>健康診断</li>
<li>選定療養費（紹介状なしの大病院受診など）</li>
</ul>

<p>他の医療費助成を受けている場合、生活保護を受けている場合、児童福祉法にもとづく措置医療等を受けている場合も対象外です。</p>

<h3>申請が要ります</h3>

<p>自動では始まりません。<strong>横浜市子育て応援サイト「パマトコ」からのオンライン申請</strong>（24時間受付、事前のアカウント登録が必要）のほか、郵送・窓口でも申請できます。</p>

<h2>妊婦健診に5万円が上乗せされます</h2>

<p>横浜市には<strong>妊婦健康診査費用助成金</strong>があります。妊婦1人あたり<strong>5万円</strong>です。</p>

<p>次の3つをすべて満たす妊婦が対象です。</p>

<ul>
<li>妊娠の届出をしている</li>
<li>妊婦健診の受診時から申請日までを通じて横浜市内に住民登録がある</li>
<li><strong>令和6年4月1日以降に妊婦健診（基本的な健診を伴うもの）を受診している</strong></li>
</ul>

<div class="warn-box"><p>申請できるのは<strong>妊娠中</strong>です。妊娠届出後に妊婦健診を受診した日から、妊娠を終了するまでの期間に申請する必要があります。<strong>出産後に気づいても間に合いません。</strong>振込は申請完了から2〜3か月後が目安とされています。</p></div>

<p>申請はパマトコからのオンライン申請（妊婦本人に限る）または郵送です。生活保護制度で妊婦健康診査の費用支給を受ける方は対象外です。</p>

<h2>妊婦健診の補助券は14枚</h2>

<p>母子健康手帳を受け取るときに、妊婦健康診査費用の補助券が<strong>14枚</strong>渡されます。基本的な妊婦健診と、健診に伴う自費の検査の費用が補助されます。</p>

<p><strong>多胎妊娠の場合は追加の補助券</strong>が交付されます。14枚に加えて5枚（4,700円×4枚、12,000円×1枚）です。多胎は健診の回数が増えるため、その分が上乗せされる形です。</p>

<h2>産婦健康診査は2回まで</h2>

<p>出産後の母体の回復を確認する健診にも補助があります。</p>

<ul>
<li>対象は<strong>産後2週間</strong>と<strong>産後1か月</strong>の2回まで</li>
<li>1回あたりの補助額は<strong>5,000円</strong></li>
</ul>

<h2>産後母子ケア事業</h2>

<p>横浜市の産後母子ケア事業には3つの形があります。</p>

<table>
<thead><tr><th>形</th><th>対象</th></tr></thead>
<tbody>
<tr><td>訪問型</td><td>産後1年未満の母子</td></tr>
<tr><td>デイケア</td><td>産後6か月未満の母子</td></tr>
<tr><td>ショートステイ</td><td>産後4か月未満で心身の不調や育児不安がある方</td></tr>
</tbody>
</table>

<div class="info-box"><p>利用料は市が定めており、区や利用の形によって扱いが変わります。<strong>金額はお住まいの区の窓口か市の公式ページで確認してください。</strong>このページでは確かめられた範囲だけを載せています。</p></div>

<p>産後ケアは<a href="/insurance/sango-care-hiyou">産前から申し込んでおける</a>ことが多い支援です。体調を崩してから探すと間に合わないことがあるため、妊娠中に確かめておくのが確実です。</p>

<h2>全国共通の制度も忘れずに</h2>

<p>横浜市独自の制度に加えて、全国どこでも使える制度があります。取りこぼしやすいものを挙げておきます。</p>

<ul>
<li><a href="/insurance/ninpu-shien-kyufu"><strong>妊婦のための支援給付</strong></a>… 5万円＋こどもの人数×5万円</li>
<li><a href="/insurance/shussan-hiyou-hoken"><strong>出産育児一時金</strong></a>… 子ども1人につき原則50万円</li>
<li><a href="/insurance/shussan-teate-kin"><strong>出産手当金</strong></a>… 健康保険の被保険者が産休を取ったとき</li>
<li><a href="/insurance/ikukyu-chu-kakei"><strong>育児休業給付金</strong></a>… 2025年4月から手取り10割相当になる期間がある</li>
<li><strong>児童手当</strong>… 2024年10月から高校生年代まで</li>
</ul>

<h2>保育園に入れるかどうかも見ておく</h2>

<p>横浜市の保育料は、世帯の住民税所得割額と子どもの年齢クラスで決まります。3歳児クラスからは幼児教育・保育の無償化で利用料が無償ですが、<a href="/insurance/hoikuryo-kimarikata">給食費などは別にかかります</a>。</p>

<p>入りやすさは区や園によって差があります。<a href="/yokohama">横浜市の点数の基準</a>と<a href="https://hoikaten.com/yokohama/vacancy">園ごとの空き状況</a>から、申し込む前に見通しを立てられます。</p>

<h2>公的な支援を確かめたうえで</h2>

<p>横浜市は医療費助成が18歳まで無償になり、妊婦健診にも5万円の上乗せがあります。<strong>公的な支援が手厚い分、民間の保険で埋めるべき部分は限られます</strong>。</p>

<p>特に子ども本人の医療保険は、18歳まで保険診療の自己負担がない環境では優先度が下がります。一方で、<a href="/insurance/kodomo-umareta-minaoshi">親に何かあったときの保障</a>は自治体の助成では埋まりません。<strong>順番を間違えないこと</strong>が、無駄のない備え方につながります。</p>

<p>市外へ引っ越す可能性がある場合は、<a href="/insurance/hikkoshi-kosodate-okane">転居先で条件が変わる</a>点も頭に置いておいてください。判断に迷うときは${link("子育て世帯向けの無料相談")}のような窓口で、公的な保障の確認から整理してもらう手もあります。</p>
`,
    sources: [
      {
        label: "横浜市「小児医療費助成」",
        url: "https://www.city.yokohama.lg.jp/kenko-iryo-fukushi/kenko-iryo/iryohijosei/shoni/child.html",
      },
      {
        label: "横浜市「【小児医療費助成制度】令和8年6月から対象年齢を18歳まで拡大します！」",
        url: "https://www.city.yokohama.lg.jp/kenko-iryo-fukushi/kenko-iryo/iryohijosei/shoni/shotokukanwa.html",
      },
      {
        label: "横浜市「妊婦健康診査費用助成金」",
        url: "https://www.city.yokohama.lg.jp/kosodate-kyoiku/oyakokenko/teate/ninpukenshinjosei.html",
      },
      {
        label: "横浜市「妊婦健康診査」",
        url: "https://www.city.yokohama.lg.jp/kosodate-kyoiku/oyakokenko/shido/kenshin/ninpukenshin.html",
      },
      {
        label: "横浜市「産婦健康診査」",
        url: "https://www.city.yokohama.lg.jp/kosodate-kyoiku/oyakokenko/shido/kenshin/sanpukenshin.html",
      },
      {
        label: "横浜市「横浜市産後母子ケア事業」",
        url: "https://www.city.yokohama.lg.jp/kosodate-kyoiku/oyakokenko/ninshin/sangoboshikea.html",
      },
    ],
    faq: [
      {
        q: "横浜市の子どもの医療費はいつから18歳まで無料になりましたか。",
        a: "令和8年6月1日の診療分からです。0歳から18歳に達する日以後の最初の3月31日までが対象で、所得制限も窓口負担もありません。ただし差額ベッド代や文書料、健康診断など保険給付にならないものは対象外です。",
      },
      {
        q: "妊婦健康診査費用助成金の5万円はいつ申請しますか。",
        a: "妊娠中です。妊娠届出後に妊婦健診を受診した日から、妊娠を終了するまでの期間に申請する必要があります。出産後には申請できません。",
      },
      {
        q: "多胎妊娠の場合、妊婦健診の補助券は増えますか。",
        a: "増えます。通常の14枚に加えて5枚（4,700円×4枚、12,000円×1枚）が交付されます。",
      },
      {
        q: "産後母子ケアの利用料はいくらですか。",
        a: "利用料は市が定めており、利用の形によって変わります。金額はお住まいの区の窓口か横浜市の公式ページで確認してください。",
      },
    ],
    cta: {
      heading: "公的な支援が手厚いぶん、何が足りないかを見極めたいとき",
      body: "横浜市は18歳まで医療費が無償で、妊婦健診にも上乗せがあります。公的な支援でカバーされる範囲を確かめると、民間の保険で埋めるべき部分は絞られます。子育て世帯の相談に慣れた窓口なら、この整理から一緒に進められます。",
    },
  },
];

registerInsuranceArticles(articles);

export default articles;
