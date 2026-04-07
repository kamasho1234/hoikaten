import type { Article } from "./types";
import { registerArticles } from "./index";

const articles: Article[] = [
  {
    slug: "hokatsu-schedule",
    citySlug: "urayasu",
    title: "浦安市の保活スケジュール　申込から内定までの流れ",
    description:
      "浦安市の認可保育園の申込時期・選考の流れをまとめました。令和8年度4月入園の動き方を解説します。",
    image: "https://images.unsplash.com/photo-1484820540004-14229fe36ca4?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>浦安市の4月入園スケジュール</h2>
<p>浦安市の認可保育園は毎年秋に翌年度4月入園の申込を受付けます。浦安市こども部保育幼稚園課が窓口です。</p>

<h3>保活の全体スケジュール</h3>
<div class="step">
<div class="step-num">1</div>
<div class="step-content">
<strong>4月〜6月：情報収集</strong>
<p>市のホームページで保育園の一覧と空き状況を確認します。浦安市は認可保育園が約30か所あります。</p>
</div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content">
<strong>6月〜9月：保育園見学</strong>
<p>気になる園に連絡して見学を予約しましょう。新浦安エリアはタワーマンションが多く子育て世帯に人気のため、早めの見学がおすすめです。</p>
</div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content">
<strong>9月〜10月：書類準備</strong>
<p>就労証明書などの必要書類を準備します。浦安市こども部保育幼稚園課で申込書類を入手できます。</p>
</div>
</div>
<div class="step">
<div class="step-num">4</div>
<div class="step-content">
<strong>10月〜11月：申込書類の提出</strong>
<p>浦安市役所窓口で申込みます。郵送での受付も可能です。</p>
</div>
</div>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>浦安市は基本指数が父母各最大20点（合計40点満点）で、調整指数を加算して選考されます。フルタイム共働きで40点が基本ラインです。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳しくは<a href="https://www.city.urayasu.lg.jp/kodomo/hoiku/" target="_blank" rel="noopener">浦安市公式サイト</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 55,
  },
  {
    slug: "scoring-system-guide",
    citySlug: "urayasu",
    title: "浦安市の入園点数のしくみ　基本指数と調整指数を解説",
    description:
      "浦安市の保育園入園選考で使われる基本指数と調整指数のしくみを解説します。",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>浦安市の選考点数とは</h2>
<p>浦安市の認可保育園は「基本指数＋調整指数」の合計で選考されます。浦安市こども部保育幼稚園課が利用調整を行います。</p>

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
<li>きょうだいと同時申込：<span class="highlight">+2点</span></li>
<li>育休から復帰予定：<span class="highlight">+2点</span></li>
<li>生活保護世帯：<span class="highlight">+3点</span></li>
</ul>

<div class="info-box">
<p><strong>減点項目</strong></p>
<ul>
<li>市外からの申込：<span class="highlight">-10点</span></li>
<li>65歳未満の同居親族あり：<span class="highlight">-3点</span></li>
<li>認可保育園からの転園希望：<span class="highlight">-5点</span></li>
</ul>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>全項目は<a href="https://www.city.urayasu.lg.jp/kodomo/hoiku/" target="_blank" rel="noopener">浦安市公式サイト</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 65,
  },
  {
    slug: "score-up-tips",
    citySlug: "urayasu",
    title: "浦安市で入園点数を上げるコツ　加点チェックリスト",
    description:
      "浦安市の保育園入園選考で調整指数の加点を最大限に活用する方法を解説します。",
    image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>基本指数40点は出発点</h2>
<p>浦安市ではフルタイム共働き世帯は基本指数<span class="highlight">40点</span>で横並びです。差がつくのは調整指数の加点です。</p>

<h2>加点チェックリスト</h2>
<table>
<tr><th>項目</th><th>点数</th><th>条件</th></tr>
<tr><td>ひとり親世帯</td><td>+5点</td><td>母子・父子家庭の場合</td></tr>
<tr><td>きょうだい在園</td><td>+3点</td><td>認可保育園にきょうだいが在園中</td></tr>
<tr><td>認可外利用</td><td>+3点</td><td>認可外保育施設に月ぎめで利用中</td></tr>
<tr><td>きょうだい同時申込</td><td>+2点</td><td>きょうだいと同時に申し込む場合</td></tr>
<tr><td>育休復帰予定</td><td>+2点</td><td>入園月に職場復帰する場合</td></tr>
<tr><td>生活保護</td><td>+3点</td><td>生活保護を受けている場合</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>浦安市では43点以上あれば多くの園で入園できる可能性が高いです。40点＋認可外利用（+3）＝<span class="highlight">43点</span>が一つの目安です。</p>
</div>

<h2>減点に注意</h2>
<ul>
<li>市外からの申込：<span class="highlight">-10点</span>（浦安市在住が前提）</li>
<li>65歳未満の同居親族あり：<span class="highlight">-3点</span></li>
<li>転園希望：<span class="highlight">-5点</span></li>
</ul>

<div class="info-box">
<p><strong>注意</strong></p>
<p>就労証明書の内容は正確に記載してください。実態と異なる記載は入園取消しの対象です。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 100,
  },
  {
    slug: "tiebreaker-rules",
    citySlug: "urayasu",
    title: "浦安市で同点になったらどうなる？優先順位を解説",
    description:
      "浦安市の保育園入園選考で同点だった場合の優先順位の判定方法を解説します。",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>同点時の判定方法</h2>
<p>浦安市の入園選考では、基本指数＋調整指数の合計が同点になった場合、優先順位で判定されます。</p>

<h2>優先される条件</h2>
<ul>
<li>基本指数が高い世帯が優先</li>
<li>ひとり親世帯は優先</li>
<li>きょうだいが在園中の園への申込は優先</li>
<li>所得が低い世帯が優先</li>
<li>浦安市在住期間が長い世帯が優先</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>浦安市の40点制では調整指数の加点幅が大きいため、フルタイム共働き＋認可外利用で43点を目指すのが現実的です。同点の場合は上記の条件で差がつきます。</p>
</div>

<h2>新浦安エリアは特に同点が多い</h2>
<p>新浦安エリアはタワーマンションが集中し、共働き世帯が多いため40点の同点が発生しやすい地域です。調整指数の加点が重要になります。</p>

<div class="info-box">
<p><strong>注意</strong></p>
<p>同点時の優先順位の詳細は毎年の案内で確認してください。年度によって判定基準が変更されることがあります。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 85,
  },
  {
    slug: "part-time-work-score",
    citySlug: "urayasu",
    title: "浦安市で時短勤務だと点数はどう変わる？",
    description:
      "浦安市の保育園入園選考で時短勤務の場合の基本指数への影響を解説します。",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>浦安市は月の合計就労時間で判定</h2>
<p>浦安市の基本指数は月の合計就労時間で決まります。時短勤務の影響を確認しましょう。</p>

<table>
<tr><th>月の就労時間</th><th>基本指数</th></tr>
<tr><td>月160時間以上</td><td>20点</td></tr>
<tr><td>月140時間以上160時間未満</td><td>18点</td></tr>
<tr><td>月120時間以上140時間未満</td><td>16点</td></tr>
<tr><td>月100時間以上120時間未満</td><td>14点</td></tr>
<tr><td>月80時間以上100時間未満</td><td>12点</td></tr>
<tr><td>月64時間以上80時間未満</td><td>10点</td></tr>
</table>

<div class="point-box">
<p><strong>注意</strong></p>
<p>月20日勤務で1日6時間の時短勤務の場合、月120時間で基本指数は<span class="highlight">16点</span>です。フルタイムの20点と比べて4点下がります。</p>
</div>

<h2>月160時間の壁</h2>
<p>満点の20点を得るには月160時間以上が必要です。1日8時間×20日＝160時間がちょうど満点ラインです。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>時短勤務でも月140時間以上なら18点です。月の就労時間がギリギリの場合は、残業なども含めた実労働時間を就労証明書に正確に記載してもらいましょう。</p>
</div>

<div class="info-box">
<p><strong>補足</strong></p>
<p>浦安市は40点満点のため、片方の保護者が時短で4点下がると合計36点になり、フルタイム世帯との差が大きくなります。認可外利用（+3点）などの調整指数でカバーすることを検討しましょう。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 90,
  },
  {
    slug: "rejection-options",
    citySlug: "urayasu",
    title: "浦安市で保育園に落ちたときの選択肢",
    description:
      "浦安市の認可保育園に不承諾となった場合の対応策をまとめました。",
    image: "https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>不承諾になったら</h2>
<p>浦安市で認可保育園に不承諾になった場合でも、複数の選択肢があります。</p>

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
<p>空きが出た場合に途中入園が可能です。浦安市では毎月空き状況を公表しています。</p>

<h3>5. 育休延長</h3>
<p>不承諾通知があれば育休を最長2歳まで延長できます。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>空き状況は<a href="https://www.city.urayasu.lg.jp/kodomo/hoiku/" target="_blank" rel="noopener">浦安市公式サイト</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 80,
  },
  {
    slug: "unlicensed-nursery-bonus",
    citySlug: "urayasu",
    title: "浦安市で認可外保育施設の利用で加点を得る方法",
    description:
      "浦安市では認可外保育施設の月ぎめ利用で+3点の加点が得られます。その条件を解説します。",
    image: "https://images.unsplash.com/photo-1587654780291-39c9404d7dd0?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>認可外利用の加点</h2>
<p>浦安市では認可外保育施設に月ぎめで預けている場合、調整指数で<span class="highlight">+3点</span>の加点が得られます。</p>

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
<p>浦安市内の認可外保育施設の月額料金は施設によって異なりますが、月6万〜10万円程度が一般的です。東京ディズニーリゾート周辺は家賃相場が高いため、認可外の費用もやや高めの傾向です。</p>

<h2>翌年度への布石</h2>
<p>不承諾だった場合に認可外を利用すると、翌年度の申込で+3点の加点がつきます。40点制で3点の差は非常に大きいです。</p>

<div class="info-box">
<p><strong>注意</strong></p>
<p>利用証明書が必要になりますので、利用している施設に発行を依頼してください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 75,
  },
  {
    slug: "next-year-changes",
    citySlug: "urayasu",
    title: "浦安市の令和8年度入園　変更点と注意事項",
    description:
      "浦安市の令和8年度保育園入園選考の注意点をまとめました。",
    image: "https://images.unsplash.com/photo-1506784365847-bbad939e9335?w=800&h=400&fit=crop",
    category: "最新情報",
    categoryColor: "purple",
    content: `<h2>令和8年度の注意点</h2>
<p>浦安市の保育園入園制度は毎年見直しが行われます。浦安市こども部保育幼稚園課が公表する最新の利用調整基準を確認しましょう。</p>

<h2>確認すべきポイント</h2>
<ul>
<li>基本指数・調整指数の変更有無</li>
<li>新設園の情報</li>
<li>定員の増減</li>
<li>認可外利用の加点条件の変更</li>
<li>同居親族の減点条件の変更</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>浦安市は人口約17万人の街で、東京ディズニーリゾートがある街としても知られています。子育て世帯の流入が続いており、毎年秋の申込前に必ず最新の基準を確認しましょう。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>最新情報は<a href="https://www.city.urayasu.lg.jp/kodomo/hoiku/" target="_blank" rel="noopener">浦安市公式サイト</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 70,
  },
  {
    slug: "popular-areas",
    citySlug: "urayasu",
    title: "浦安市の人気エリアと入りやすい地域の傾向",
    description:
      "浦安市内で保育園の競争率が高いエリアと比較的入りやすい地域を解説します。",
    image: "https://images.unsplash.com/photo-1524813686514-a57563d77965?w=800&h=400&fit=crop",
    category: "エリア情報",
    categoryColor: "teal",
    content: `<h2>浦安市の保育園事情</h2>
<p>浦安市は人口約17万人、認可保育園が約30か所ある千葉県の自治体です。エリアによって競争率に大きな差があります。</p>

<h2>競争率が高い傾向のエリア</h2>
<ul>
<li>新浦安駅周辺：タワーマンションが集中し、子育て世帯が非常に多いエリア。最も競争が激しい</li>
<li>浦安駅周辺：東西線で東京方面への通勤に便利。駅近の園は人気が高い</li>
<li>舞浜駅周辺：東京ディズニーリゾートに近く、マンション開発が進むエリア</li>
</ul>

<h2>比較的入りやすい傾向のエリア</h2>
<ul>
<li>元町エリア（猫実・堀江・当代島）：昔からの住宅街で比較的落ち着いた地域</li>
<li>中町エリア（入船・美浜）：新浦安駅から少し離れた住宅街</li>
<li>新設園の周辺：開園初年度は定員に余裕がある場合がある</li>
</ul>

<div class="info-box">
<p><strong>注意</strong></p>
<p>エリアの難易度は年度や年齢クラスによって変わります。最新の空き状況を市に確認してください。</p>
</div>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>新浦安エリアのタワマン世帯はフルタイム共働きが多く、40点で横並びになりやすいです。通勤経路上の園も含めて幅広く希望園を検討しましょう。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 60,
  },
  {
    slug: "competition-reality",
    citySlug: "urayasu",
    title: "浦安市の保育園入園競争の実態",
    description:
      "浦安市の保育園入園はどのくらい厳しいのか。40点制の選考の実態を解説します。",
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>浦安市の入園競争の現状</h2>
<p>浦安市は千葉県内でも保育需要が高い自治体です。新浦安エリアのタワーマンション群には子育て世帯が集中しており、特に1歳児クラスの競争が激しい傾向にあります。</p>

<h2>ボリュームゾーン</h2>
<p>フルタイム共働き世帯は基本指数<span class="highlight">40点</span>で横並びです。調整指数の加点で差がつきます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>43点以上あれば多くの園で入園できる可能性が高いです。40点＋認可外利用（+3）＝<span class="highlight">43点</span>が一つの目安です。きょうだい在園があれば+3点でさらに有利になります。</p>
</div>

<h2>年齢別の傾向</h2>
<ul>
<li>0歳児クラス：受入枠が少なく競争率が高い園もある</li>
<li>1歳児クラス：最も競争が激しい年齢</li>
<li>2歳児クラス：空きが少ない</li>
<li>3歳児以上：枠が増えるため比較的入りやすい</li>
</ul>

<h2>浦安市ならではの特徴</h2>
<p>浦安市は東京ディズニーリゾートがある街として知られ、人口約17万人のうち子育て世帯の比率が高い街です。新浦安エリアへの転入が続いており、保育需要は依然として高い水準にあります。</p>

<div class="info-box">
<p><strong>注意</strong></p>
<p>求職活動中の基本指数は6点で、就労中（最大20点）の3分の1以下です。求職中での入園は人気エリアでは困難です。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 95,
  },
];

registerArticles(articles);
