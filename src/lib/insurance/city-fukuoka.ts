import type { InsuranceArticle } from "./types";
import { registerInsuranceArticles } from "./index";
import { BABYPLANET_URL } from "@/components/babyplanet-cta";

// 福岡市の子育てのお金の記事。
//
// ## 書くときの決まり
// **福岡市の公式サイトで確かめた内容だけを書く。**
// 確かめられなかったものは金額を書かず「市の窓口で確認」と案内する
// （[[feedback_factcheck_absolute]]）。
//
// 2026年8月27日に city.fukuoka.lg.jp で確認した内容:
// - 子ども医療費助成の対象は高校生世代まで
//   （18歳の誕生日前日以後最初の3月31日まで。学生でない人も対象）
// - 保護者の所得制限はない
// - 通院は3歳未満が自己負担なし、3歳以上高校生世代までは1か月500円まで
//   （1医療機関あたり）
// - 入院は高校生世代まで自己負担なし
// - 薬局は高校生世代まで自己負担なし
// - 対象外は入院中の食事代や個室代、健康診断、歯科の特殊な材料、選定療養費など
//   健康保険がきかない費用。令和6年10月から後発医薬品がある先発医薬品選択時の
//   特別料金も対象外
// - 妊婦健診の助成券は14枚。多胎はさらに5枚
// - 里帰り先などでの妊婦健診・産婦健診・新生児聴覚検査の費用を助成する制度がある
// - 妊婦歯科健診・産婦歯科健診が無料である

const link = (text: string) =>
  `<a href="${BABYPLANET_URL}" rel="sponsored nofollow noopener" target="_blank">${text}</a>`;

const articles: InsuranceArticle[] = [
  {
    slug: "fukuoka-kosodate-okane",
    title: "福岡市の子育てのお金｜入院は無料、通院は月500円まで。歯科健診も無料",
    description:
      "福岡市の子育て世帯が使えるお金の制度を、市の公式情報をもとにまとめました。所得制限なしで高校生世代まで対象の子ども医療費助成、年齢で変わる通院の自己負担、妊婦・産婦の歯科健診が無料な点などを整理しています。",
    group: "自治体ごとの支援",
    citySlug: "fukuoka",
    readerFor: ["福岡市に住んでいる人", "里帰り出産を考えている人"],
    order: 240,
    updatedAt: "2026-08-27",
    content: `
<p>福岡市の子ども医療費助成は、<strong>所得制限がなく、入院は高校生世代まで無料</strong>です。一方で通院には年齢によって自己負担があります。ここでは市の公式情報をもとに整理します。</p>

<h2>年齢と場面で自己負担が変わる</h2>

<table>
<thead><tr><th>場面</th><th>年齢</th><th>自己負担</th></tr></thead>
<tbody>
<tr><td rowspan="2"><strong>通院</strong></td><td>3歳未満</td><td>なし</td></tr>
<tr><td>3歳以上〜高校生世代</td><td><strong>1か月500円まで</strong>（1医療機関あたり）</td></tr>
<tr><td><strong>入院</strong></td><td>高校生世代まで</td><td>なし</td></tr>
<tr><td><strong>薬局</strong></td><td>高校生世代まで</td><td>なし</td></tr>
</tbody>
</table>

<p>対象年齢は<strong>高校生世代まで（18歳の誕生日前日以後最初の3月31日まで）</strong>です。学生でない人も対象になります。</p>

<div class="point-box"><p>福岡市の通院の負担は<strong>「1医療機関あたり1か月500円まで」</strong>という数え方です。同じ病院に月に何度通っても、その病院での負担は500円で止まります。ただし小児科と耳鼻科など<strong>複数の医療機関にかかれば、それぞれで500円</strong>かかります。</p></div>

<h3>所得制限はありません</h3>

<p>保護者の所得による制限はありません。収入にかかわらず、対象年齢であれば助成を受けられます。</p>

<h3>助成の対象にならないもの</h3>

<ul>
<li>入院中の<strong>食事代</strong>や<strong>個室代</strong></li>
<li>健康診断</li>
<li>歯科の特殊な材料</li>
<li>選定療養費</li>
<li><strong>令和6年10月から</strong>、後発医薬品がある先発医薬品を選んだときの特別料金</li>
</ul>

<h2>妊婦健診の助成券は14枚（多胎は追加あり）</h2>

<p>母子健康手帳と一緒に、<strong>妊婦健康診査の助成券14枚</strong>と産婦健康診査の受診券が渡されます。<strong>多胎妊娠の場合は妊婦健診の券がさらに5枚追加</strong>されます。</p>

<h2>里帰り先の健診費用も助成される</h2>

<p>福岡市には、<strong>里帰り先などで助成券が使えなかった場合に費用を助成する制度</strong>があります。対象は次のものです。</p>

<ul>
<li>妊婦健康診査</li>
<li>産婦健康診査</li>
<li><strong>新生児聴覚検査</strong></li>
</ul>

<div class="info-box"><p>助成には上限があり、<strong>福岡市に住んでいる間にかかった費用が対象</strong>です。里帰り前に、必要な書類と申請期限を市の窓口で確認しておいてください。領収書の原本は必ず保管しておきます。</p></div>

<h2>妊婦・産婦の歯科健診が無料</h2>

<p>福岡市では<strong>妊婦歯科健診と産婦歯科健診が無料</strong>で受けられます。</p>

<p>妊娠中はホルモンの変化で歯ぐきのトラブルが起きやすく、つわりで歯みがきが難しい時期もあります。<strong>無料で受けられる健診は使わないと損</strong>な種類の支援です。産後も同様に受けられます。</p>

<h2>全国共通の制度も忘れずに</h2>

<ul>
<li><a href="/insurance/ninpu-shien-kyufu"><strong>妊婦のための支援給付</strong></a>… 5万円＋こどもの人数×5万円</li>
<li><a href="/insurance/shussan-hiyou-hoken"><strong>出産育児一時金</strong></a>… 子ども1人につき原則50万円</li>
<li><a href="/insurance/shussan-teate-kin"><strong>出産手当金</strong></a>… 健康保険の被保険者が産休を取ったとき</li>
<li><a href="/insurance/ikukyu-chu-kakei"><strong>育児休業給付金</strong></a>… 2025年4月から手取り10割相当になる期間がある</li>
<li><strong>児童手当</strong>… 2024年10月から高校生年代まで</li>
</ul>

<h2>保育園に入れるかどうかも見ておく</h2>

<p>福岡市の保育料は世帯の住民税所得割額と子どもの年齢クラスで決まります。3歳児クラスからは無償化で利用料が無償ですが、<a href="/insurance/hoikuryo-kimarikata">給食費などは別にかかります</a>。</p>

<p>入りやすさは区や園で差があります。<a href="/fukuoka">福岡市の点数の基準</a>から、申し込む前に見通しを立てられます。</p>

<h2>入院が無料であることの意味</h2>

<p>福岡市は<strong>入院の自己負担がありません</strong>。子どもが入院したときに家計を直撃するのは、実は医療費そのものではなく別のところです。</p>

<ul>
<li>個室を希望したときの<strong>個室代</strong>（助成の対象外）</li>
<li>入院中の<strong>食事代</strong>（助成の対象外）</li>
<li>付き添いのために<strong>親が働けない期間</strong>の収入</li>
</ul>

<p>医療費が無料でも、この3つは残ります。特に3つめは金額が読みにくく、きょうだいがいる家庭ほど影響が大きくなります。</p>

<p>とはいえ、<a href="/insurance/kodomo-iryohi-josei">子ども本人の医療保険</a>より<a href="/insurance/kodomo-umareta-minaoshi">親に何かあったときの保障</a>のほうが、家計への影響は大きくなります。<strong>順番を押さえたうえで、助成の対象外になる部分を埋める</strong>のが無駄のない考え方です。</p>

<p>市外へ引っ越す可能性がある場合は、<a href="/insurance/hikkoshi-kosodate-okane">転居先で条件が変わる</a>点も頭に置いておいてください。判断に迷うときは${link("子育て世帯向けの無料相談")}のような窓口で、公的な保障の確認から整理してもらう手もあります。</p>
`,
    sources: [
      {
        label: "福岡市「子ども医療費助成制度」",
        url: "https://www.city.fukuoka.lg.jp/hofuku/hokennenkin/hp/01.html",
      },
      {
        label: "福岡市「健康診査（お母さんと子どもの健康診査）」",
        url: "https://www.city.fukuoka.lg.jp/kodomo-mirai/k-sukoyaka/child/kenkoushinsa.html",
      },
      {
        label: "福岡市「里帰り先などでの妊婦健診・産婦健診・新生児聴覚検査の費用を助成」",
        url: "https://www.city.fukuoka.lg.jp/kodomo-mirai/k-sukoyaka/child/ninpukenshin-syoukanbarai.html",
      },
      {
        label: "福岡市「妊婦歯科健診（無料）のご案内」",
        url: "https://www.city.fukuoka.lg.jp/hofuku/oral_support/health/001.html",
      },
    ],
    faq: [
      {
        q: "福岡市の子ども医療費助成に所得制限はありますか。",
        a: "保護者の所得制限はありません。高校生世代まで（18歳の誕生日前日以後最初の3月31日まで）が対象で、学生でない人も含まれます。",
      },
      {
        q: "通院するといくらかかりますか。",
        a: "3歳未満は自己負担なし、3歳以上高校生世代までは1医療機関あたり1か月500円までです。複数の医療機関にかかる場合は、それぞれで500円かかります。入院と薬局は高校生世代まで自己負担なしです。",
      },
      {
        q: "里帰り先で受けた健診の費用はどうなりますか。",
        a: "助成券が使えなかった場合に費用を助成する制度があります。妊婦健診、産婦健診、新生児聴覚検査が対象です。上限があり、福岡市に住んでいる間にかかった費用が対象になります。",
      },
      {
        q: "妊婦の歯科健診は有料ですか。",
        a: "福岡市では妊婦歯科健診・産婦歯科健診が無料で受けられます。",
      },
    ],
    cta: {
      heading: "医療費が助成されても残る部分を確かめたいとき",
      body: "福岡市は入院の自己負担がありませんが、個室代や食事代、付き添いで親が働けない期間の収入は助成の対象外です。公的な支援でカバーされる範囲を確かめると、優先すべき備えが見えてきます。子育て世帯の相談に慣れた窓口なら、この整理から一緒に進められます。",
    },
  },
];

registerInsuranceArticles(articles);

export default articles;
