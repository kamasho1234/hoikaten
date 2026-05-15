import type { Article } from "./types";
import { registerArticles } from "./index";

const articles: Article[] = [
  {
    slug: "hokatsu-schedule",
    citySlug: "yachiyo",
    title: "八千代市の保活スケジュール　申込から内定までの流れ",
    description:
      "八千代市の認可保育園の申込時期・選考の流れをまとめました。令和8年度4月入園の動き方を解説します。",
    image: "https://images.unsplash.com/photo-1484820540004-14229fe36ca4?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>八千代市の4月入園スケジュール</h2>
<p>八千代市の認可保育園は毎年秋に翌年度4月入園の申込を受付けます。八千代市子ども部保育課が窓口です。</p>

<h3>保活の全体スケジュール</h3>
<div class="step">
<div class="step-num">1</div>
<div class="step-content">
<strong>4月〜6月：情報収集</strong>
<p>市のホームページで保育園の一覧と空き状況を確認します。八千代市には認可保育園が約30か所あります。</p>
</div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content">
<strong>6月〜9月：保育園見学</strong>
<p>気になる園に連絡して見学を予約しましょう。東葉高速線沿線の園は通勤に便利です。</p>
</div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content">
<strong>9月〜10月：書類準備</strong>
<p>就労証明書などの必要書類を準備します。勤務先への依頼は早めに行いましょう。</p>
</div>
</div>
<div class="step">
<div class="step-num">4</div>
<div class="step-content">
<strong>10月〜11月：申込書類の提出</strong>
<p>八千代市子ども部保育課の窓口で申込みます。郵送での受付についても確認しましょう。</p>
</div>
</div>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>八千代市は基本指数が父母各最大20点（合計40点満点）で、調整指数を加算して選考されます。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳しくは八千代市子ども部保育課の公式サイトをご確認ください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 55,
  },
  {
    slug: "scoring-system-guide",
    citySlug: "yachiyo",
    title: "八千代市の入園点数のしくみ　基本指数と調整指数を解説",
    description:
      "八千代市の保育園入園選考で使われる基本指数と調整指数のしくみを解説します。",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>八千代市の選考点数とは</h2>
<p>八千代市の認可保育園は「基本指数＋調整指数」の合計で選考されます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>選考点数 ＝ 基本指数（父＋母）＋ 調整指数</p>
</div>

<h2>基本指数（父母各最大20点、合計40点）</h2>
<p>就労の場合、月160時間以上で満点の<span class="highlight">20点</span>です。</p>

<table>
<tr><th>月の就労時間</th><th>基本指数</th></tr>
<tr><td>月160時間以上</td><td>20</td></tr>
<tr><td>月140時間以上160時間未満</td><td>18</td></tr>
<tr><td>月120時間以上140時間未満</td><td>16</td></tr>
<tr><td>月100時間以上120時間未満</td><td>14</td></tr>
<tr><td>月80時間以上100時間未満</td><td>12</td></tr>
<tr><td>月64時間以上80時間未満</td><td>10</td></tr>
</table>

<h2>調整指数の代表例</h2>
<ul>
<li>ひとり親世帯：<span class="highlight">+5点</span></li>
<li>きょうだいが認可保育園に在園中：<span class="highlight">+3点</span></li>
<li>認可外保育施設に月ぎめで利用中：<span class="highlight">+3点</span></li>
<li>育休から復帰予定：<span class="highlight">+2点</span></li>
<li>生活保護世帯：<span class="highlight">+3点</span></li>
</ul>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>65歳未満の祖父母が同居している場合は<span class="highlight">-3点</span>の減点になります。市外からの申込は<span class="highlight">-10点</span>です。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>全項目は八千代市子ども部保育課の公式サイトで確認できます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 65,
  },
  {
    slug: "score-up-tips",
    citySlug: "yachiyo",
    title: "八千代市で入園点数を上げるコツ　加点チェックリスト",
    description:
      "八千代市の保育園入園選考で調整指数の加点を最大限に活用する方法を解説します。",
    image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>基本指数40点は出発点</h2>
<p>八千代市ではフルタイム共働き世帯は基本指数<span class="highlight">40点</span>で横並びです。差がつくのは調整指数の加点です。</p>

<h2>加点チェックリスト</h2>
<table>
<tr><th>項目</th><th>点数</th><th>条件</th></tr>
<tr><td>ひとり親世帯</td><td>+5点</td><td>母子・父子家庭の場合</td></tr>
<tr><td>きょうだい在園</td><td>+3点</td><td>認可保育園にきょうだいが在園中</td></tr>
<tr><td>同時申込</td><td>+2点</td><td>きょうだいと同時に申し込む場合</td></tr>
<tr><td>認可外利用</td><td>+3点</td><td>認可外保育施設に月ぎめで利用中</td></tr>
<tr><td>育休復帰予定</td><td>+2点</td><td>入園月に職場復帰する場合</td></tr>
<tr><td>生活保護</td><td>+3点</td><td>生活保護を受けている場合</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>八千代市では43点あれば多くの園で入園できる可能性が高いです。40点＋認可外利用（+3点）＝<span class="highlight">43点</span>が一つの目安です。</p>
</div>

<h2>減点に注意</h2>
<ul>
<li>65歳未満の祖父母が同居している場合：<span class="highlight">-3点</span></li>
<li>市外からの申込：<span class="highlight">-10点</span></li>
<li>転園の申込：<span class="highlight">-5点</span></li>
</ul>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>就労証明書の内容は正確に記載してください。実態と異なる記載は入園取消しの対象です。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 100,
  },
  {
    slug: "tiebreaker-rules",
    citySlug: "yachiyo",
    title: "八千代市で同点になったらどうなる？優先順位を解説",
    description:
      "八千代市の保育園入園選考で同点だった場合の優先順位の判定方法を解説します。",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>同点時の判定方法</h2>
<p>八千代市の入園選考では、基本指数＋調整指数の合計が同点になった場合、優先順位で判定されます。</p>

<h2>優先順位の基準</h2>
<ul>
<li>基本指数が高い世帯が優先</li>
<li>ひとり親世帯は優先</li>
<li>きょうだいが在園中の園への申込は優先</li>
<li>所得が低い世帯が優先</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>八千代市の40点制では調整指数の幅が大きいため、同点が発生しにくいですが、フルタイム共働き＋同じ調整項目の世帯では同点になります。その場合は上記の優先順位で判定されます。</p>
</div>

<h2>同点対策</h2>
<p>認可外保育施設の利用（+3点）や育休復帰（+2点）など、取得できる加点をすべて確認しておきましょう。</p>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>同点時の優先順位の詳細は毎年の案内で確認してください。年度によって判定基準が変更されることがあります。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 85,
  },
  {
    slug: "part-time-work-score",
    citySlug: "yachiyo",
    title: "八千代市で時短勤務だと点数はどう変わる？",
    description:
      "八千代市の保育園入園選考で時短勤務の場合の基本指数への影響を解説します。",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>八千代市は月の合計就労時間で判定</h2>
<p>八千代市の基本指数は月の合計就労時間で決まります。時短勤務の影響を確認しましょう。</p>

<table>
<tr><th>月の就労時間</th><th>基本指数</th></tr>
<tr><td>月160時間以上</td><td>20点</td></tr>
<tr><td>月140時間以上160時間未満</td><td>18点</td></tr>
<tr><td>月120時間以上140時間未満</td><td>16点</td></tr>
<tr><td>月100時間以上120時間未満</td><td>14点</td></tr>
<tr><td>月80時間以上100時間未満</td><td>12点</td></tr>
<tr><td>月64時間以上80時間未満</td><td>10点</td></tr>
</table>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>月20日勤務で1日6時間の時短勤務の場合、月120時間で基本指数は<span class="highlight">16点</span>です。フルタイムの20点と比べて4点下がります。</p>
</div>

<h2>月160時間の壁</h2>
<p>満点の20点を得るには月160時間以上が必要です。1日8時間×20日＝160時間がちょうど満点ラインです。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>時短勤務でも月140時間以上なら18点です。月の就労時間がギリギリの場合は、残業なども含めた実労働時間を就労証明書に正確に記載してもらいましょう。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 90,
  },
  {
    slug: "rejection-options",
    citySlug: "yachiyo",
    title: "八千代市で保育園に落ちたときの選択肢",
    description:
      "八千代市の認可保育園に不承諾となった場合の対応策をまとめました。",
    image: "https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>不承諾になったら</h2>
<p>八千代市で認可保育園に不承諾になった場合でも、複数の選択肢があります。</p>

<h3>1. 二次選考への申込</h3>
<p>一次選考後の辞退者枠で二次選考が行われます。</p>

<h3>2. 認可外保育施設の利用</h3>
<p>認可外保育施設を利用することで、翌年度の申込で<span class="highlight">+3点</span>の加点が見込めます。</p>

<h3>3. 小規模保育の利用</h3>
<p>小規模保育事業を利用し、卒園時に認可保育園へ転所する方法があります。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>認可外利用（+3点）と育休復帰（+2点）を翌年度に積むと、合計+5点の加算が見込めます。40点＋5点＝<span class="highlight">45点</span>で入園の可能性が大きく上がります。</p>
</div>

<h3>4. 途中入園</h3>
<p>空きが出た場合に途中入園が可能です。八千代市では毎月空き状況を公表しています。</p>

<h3>5. 育休延長</h3>
<p>不承諾通知があれば育休を最長2歳まで延長できます。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>空き状況は八千代市子ども部保育課の公式サイトで確認できます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 80,
  },
  {
    slug: "unlicensed-nursery-bonus",
    citySlug: "yachiyo",
    title: "八千代市で認可外保育施設の利用で加点を得る方法",
    description:
      "八千代市では認可外保育施設の月ぎめ利用で+3点の加点が得られます。その条件を解説します。",
    image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>認可外利用の加点</h2>
<p>八千代市では認可外保育施設に月ぎめで預けている場合、調整指数で<span class="highlight">+3点</span>の加点が得られます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>月ぎめの契約が必要です。一時預かりでは加点の対象になりません。</p>
</div>

<h2>対象となる施設</h2>
<ul>
<li>認可外保育施設</li>
<li>企業主導型保育施設</li>
</ul>

<h2>費用の目安</h2>
<p>八千代市内の認可外保育施設の月額料金は施設によって異なりますが、月5万〜8万円程度が一般的です。</p>

<h2>翌年度への布石</h2>
<p>不承諾だった場合に認可外を利用すると、翌年度の申込で+3点の加点がつきます。40点制では3点の差は大きいです。</p>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>利用証明書が必要になりますので、利用している施設に発行を依頼してください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 75,
  },
  {
    slug: "next-year-changes",
    citySlug: "yachiyo",
    title: "八千代市の令和8年度入園　変更点と注意事項",
    description:
      "八千代市の令和8年度保育園入園選考の注意点をまとめました。",
    image: "https://images.unsplash.com/photo-1506784365847-bbad939e9335?w=800&h=400&fit=crop",
    category: "最新情報",
    categoryColor: "purple",
    content: `<h2>令和8年度の注意点</h2>
<p>八千代市の保育園入園制度は毎年見直しが行われます。最新の利用調整基準を確認しましょう。</p>

<h2>確認すべきポイント</h2>
<ul>
<li>基本指数・調整指数の変更有無</li>
<li>新設園の情報</li>
<li>定員の増減</li>
<li>認可外利用の加点条件の変更</li>
<li>祖父母同居の減点条件の変更</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>八千代市は千葉県北西部に位置し、東葉高速線沿線の開発が進んでいます。新設園の情報は見逃さないようにしましょう。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>最新情報は八千代市子ども部保育課の公式サイトで確認できます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 70,
  },
  {
    slug: "popular-areas",
    citySlug: "yachiyo",
    title: "八千代市の人気エリアと入りやすい地域の傾向",
    description:
      "八千代市内で保育園の競争率が高いエリアと比較的入りやすい地域を解説します。",
    image: "https://images.unsplash.com/photo-1524813686514-a57563d77965?w=800&h=400&fit=crop",
    category: "エリア情報",
    categoryColor: "teal",
    content: `<h2>八千代市の保育園事情</h2>
<p>八千代市は人口約20万人の千葉県北西部の自治体です。東葉高速線沿線を中心に子育て世帯が多く、保育需要が高い地域です。認可保育園は約30か所あります。</p>

<h2>競争率が高い傾向のエリア</h2>
<ul>
<li>八千代緑が丘駅周辺：大型商業施設があり子育て世帯に人気</li>
<li>八千代中央駅周辺：市役所に近く利便性が高い</li>
<li>村上駅周辺：住宅地として発展し保育需要が多い</li>
</ul>

<h2>比較的入りやすい傾向のエリア</h2>
<ul>
<li>八千代台駅方面：京成線沿線で歴史のある住宅街</li>
<li>勝田台駅周辺：東葉高速線・京成線の乗換駅だが新設園もある</li>
<li>北部エリア：郊外で園の定員に余裕がある地域</li>
</ul>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>エリアの難易度は年度や年齢クラスによって変わります。最新の空き状況を市に確認してください。</p>
</div>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>八千代市は東葉高速線で東京方面への通勤も便利です。通勤経路上の園も含めて幅広く希望園を検討しましょう。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 60,
  },
  {
    slug: "competition-reality",
    citySlug: "yachiyo",
    title: "八千代市の保育園入園競争の実態",
    description:
      "八千代市の保育園入園はどのくらい厳しいのか。40点制の選考の実態を解説します。",
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>八千代市の入園競争の現状</h2>
<p>八千代市は東葉高速線沿線の開発に伴い子育て世帯が増加しており、特に1歳児クラスの競争が激しい傾向にあります。</p>

<h2>ボリュームゾーン</h2>
<p>フルタイム共働き世帯は基本指数<span class="highlight">40点</span>で横並びです。調整指数の加点で差がつきます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>43点あれば多くの園で入園できる可能性が高いです。40点＋認可外利用（+3）＝<span class="highlight">43点</span>が一つの目安です。育休復帰（+2）も加えた<span class="highlight">45点</span>ならさらに安心です。</p>
</div>

<h2>年齢別の傾向</h2>
<ul>
<li>0歳児クラス：受入枠が少なく競争率が高い園もある</li>
<li>1歳児クラス：最も競争が激しい年齢</li>
<li>2歳児クラス：空きが少ない</li>
<li>3歳児以上：枠が増えるため比較的入りやすい</li>
</ul>

<h2>過去のボーダーライン</h2>
<p>人気園では40点でも落選するケースがあり、43点以上が安全圏の目安です。東葉高速線沿線の新しい園は特に競争率が高い傾向にあります。</p>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>求職活動中の基本指数は6点で、就労中（最大20点）の3分の1以下です。求職中での入園は人気エリアでは困難です。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 95,
  },
];

registerArticles(articles);
