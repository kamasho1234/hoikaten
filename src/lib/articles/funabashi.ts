import type { Article } from "./types";
import { registerArticles } from "./index";

const articles: Article[] = [
  {
    slug: "hokatsu-schedule",
    citySlug: "funabashi",
    title: "船橋市の保活スケジュール　申込から内定までの流れ",
    description:
      "船橋市の認可保育園の申込時期・選考の流れをまとめました。令和8年度4月入園の動き方を解説します。",
    image: "https://images.unsplash.com/photo-1484820540004-14229fe36ca4?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>船橋市の4月入園スケジュール</h2>
<p>船橋市の認可保育園は毎年秋に翌年度4月入園の申込を受付けます。利用調整基準を理解して準備を進めましょう。</p>

<h3>保活の全体スケジュール</h3>
<div class="step">
<div class="step-num">1</div>
<div class="step-content">
<strong>4月〜6月：情報収集</strong>
<p>市のホームページで保育園の一覧と空き状況を確認します。</p>
</div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content">
<strong>6月〜9月：保育園見学</strong>
<p>気になる園に連絡して見学を予約しましょう。船橋市は園数が多いため、通勤経路沿いの園もチェックしましょう。</p>
</div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content">
<strong>9月〜10月：書類準備</strong>
<p>就労証明書などの必要書類を準備します。</p>
</div>
</div>
<div class="step">
<div class="step-num">4</div>
<div class="step-content">
<strong>10月〜11月：申込書類の提出</strong>
<p>市役所窓口で申込みます。</p>
</div>
</div>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>船橋市は基本点が父母各最大10点（合計20点満点）で、調整点1と調整点2を加算して選考されます。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳しくは<a href="https://www.city.funabashi.lg.jp/kodomo/hoiku/002/p054970.html" target="_blank" rel="noopener">船橋市公式サイト</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 55,
  },
  {
    slug: "scoring-system-guide",
    citySlug: "funabashi",
    title: "船橋市の入園点数のしくみ　基本点と調整点を解説",
    description:
      "船橋市の保育園入園選考で使われる基本点と調整点のしくみを解説します。",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>船橋市の選考点数とは</h2>
<p>船橋市の認可保育園は「基本点＋調整点1＋調整点2」の合計で選考されます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>選考点数 ＝ 基本点（父＋母）＋ 調整点1 ＋ 調整点2</p>
</div>

<h2>基本点（父母各最大10点、合計20点）</h2>
<p>就労の場合、月160時間以上で満点の<span class="highlight">10点</span>です。</p>

<table>
<tr><th>月の就労時間</th><th>基本点</th></tr>
<tr><td>月160時間以上</td><td>10</td></tr>
<tr><td>月140時間以上160時間未満</td><td>9</td></tr>
<tr><td>月120時間以上140時間未満</td><td>8</td></tr>
<tr><td>月100時間以上120時間未満</td><td>7</td></tr>
<tr><td>月80時間以上100時間未満</td><td>6</td></tr>
<tr><td>月64時間以上80時間未満</td><td>5</td></tr>
</table>

<h2>調整点1の代表例</h2>
<ul>
<li>ひとり親世帯：<span class="highlight">+2点</span></li>
<li>きょうだいが認可保育園に在園中：<span class="highlight">+1点</span></li>
<li>認可外保育施設に月ぎめで利用中：<span class="highlight">+1点</span></li>
<li>育休から復帰予定：<span class="highlight">+1点</span></li>
<li>生活保護世帯：<span class="highlight">+1点</span></li>
</ul>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>65歳未満の祖父母が同居している場合は<span class="highlight">-1点</span>の減点になります。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>全項目は<a href="https://www.city.funabashi.lg.jp/kodomo/hoiku/002/p054970.html" target="_blank" rel="noopener">船橋市公式サイト</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 65,
  },
  {
    slug: "score-up-tips",
    citySlug: "funabashi",
    title: "船橋市で入園点数を上げるコツ　加点チェックリスト",
    description:
      "船橋市の保育園入園選考で調整点の加点を最大限に活用する方法を解説します。",
    image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>基本点20点は出発点</h2>
<p>船橋市ではフルタイム共働き世帯は基本点<span class="highlight">20点</span>で横並びです。差がつくのは調整点の加点です。</p>

<h2>加点チェックリスト</h2>
<table>
<tr><th>項目</th><th>点数</th><th>条件</th></tr>
<tr><td>ひとり親世帯</td><td>+2点</td><td>母子・父子家庭の場合</td></tr>
<tr><td>きょうだい在園</td><td>+1点</td><td>認可保育園にきょうだいが在園中</td></tr>
<tr><td>認可外利用</td><td>+1点</td><td>認可外保育施設に月ぎめで利用中</td></tr>
<tr><td>育休復帰予定</td><td>+1点</td><td>入園月に職場復帰する場合</td></tr>
<tr><td>生活保護</td><td>+1点</td><td>生活保護を受けている場合</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>船橋市では22点あれば多くの園で入園できる可能性が高いです。20点＋調整点2点を目指しましょう。</p>
</div>

<h2>減点に注意</h2>
<p>65歳未満の祖父母が同居している場合は<span class="highlight">-1点</span>の減点があります。同居の有無は住民票で判断されます。</p>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>就労証明書の内容は正確に記載してください。実態と異なる記載は入園取消しの対象です。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 100,
  },
  {
    slug: "tiebreaker-rules",
    citySlug: "funabashi",
    title: "船橋市で同点になったらどうなる？優先順位を解説",
    description:
      "船橋市の保育園入園選考で同点だった場合の優先順位の判定方法を解説します。",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>同点時の判定方法</h2>
<p>船橋市の入園選考では、基本点＋調整点1の合計が同点になった場合、調整点2の合計で判定されます。</p>

<h2>調整点2とは</h2>
<p>調整点2は同点時のタイブレーカーとして機能します。基本点＋調整点1が同じ場合に、調整点2の高い世帯が優先されます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>船橋市の20点制では調整点の加点幅が小さいため、同点が発生しやすいです。調整点2の項目も忘れずに確認しましょう。</p>
</div>

<h2>さらに同点の場合</h2>
<ul>
<li>基本点が高い世帯が優先</li>
<li>ひとり親世帯は優先</li>
<li>きょうだいが在園中の園への申込は優先</li>
<li>所得が低い世帯が優先</li>
</ul>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>同点時の優先順位の詳細は毎年の案内で確認してください。年度によって判定基準が変更されることがあります。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 85,
  },
  {
    slug: "part-time-work-score",
    citySlug: "funabashi",
    title: "船橋市で時短勤務だと点数はどう変わる？",
    description:
      "船橋市の保育園入園選考で時短勤務の場合の基本点への影響を解説します。",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>船橋市は月の合計就労時間で判定</h2>
<p>船橋市の基本点は月の合計就労時間で決まります。時短勤務の影響を確認しましょう。</p>

<table>
<tr><th>月の就労時間</th><th>基本点</th></tr>
<tr><td>月160時間以上</td><td>10点</td></tr>
<tr><td>月140時間以上160時間未満</td><td>9点</td></tr>
<tr><td>月120時間以上140時間未満</td><td>8点</td></tr>
<tr><td>月100時間以上120時間未満</td><td>7点</td></tr>
<tr><td>月80時間以上100時間未満</td><td>6点</td></tr>
<tr><td>月64時間以上80時間未満</td><td>5点</td></tr>
</table>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>月20日勤務で1日6時間の時短勤務の場合、月120時間で基本点は<span class="highlight">8点</span>です。フルタイムの10点と比べて2点下がります。</p>
</div>

<h2>月160時間の壁</h2>
<p>満点の10点を得るには月160時間以上が必要です。1日8時間×20日＝160時間がちょうど満点ラインです。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>時短勤務でも月140時間以上なら9点です。月の就労時間がギリギリの場合は、残業なども含めた実労働時間を就労証明書に正確に記載してもらいましょう。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 90,
  },
  {
    slug: "rejection-options",
    citySlug: "funabashi",
    title: "船橋市で保育園に落ちたときの選択肢",
    description:
      "船橋市の認可保育園に不承諾となった場合の対応策をまとめました。",
    image: "https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>不承諾になったら</h2>
<p>船橋市で認可保育園に不承諾になった場合でも、複数の選択肢があります。</p>

<h3>1. 二次選考への申込</h3>
<p>一次選考後の辞退者枠で二次選考が行われます。</p>

<h3>2. 認可外保育施設の利用</h3>
<p>認可外保育施設を利用することで、翌年度の申込で<span class="highlight">+1点</span>の加点が見込めます。</p>

<h3>3. 小規模保育の利用</h3>
<p>小規模保育事業を利用し、卒園時に認可保育園へ転所する方法があります。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>認可外利用（+1点）と育休復帰（+1点）を翌年度に積むと、合計+2点の加算が見込めます。20点制では2点の差は大きいです。</p>
</div>

<h3>4. 途中入園</h3>
<p>空きが出た場合に途中入園が可能です。船橋市では毎月空き状況を公表しています。</p>

<h3>5. 育休延長</h3>
<p>不承諾通知があれば育休を最長2歳まで延長できます。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>空き状況は<a href="https://www.city.funabashi.lg.jp/kodomo/hoiku/002/p060892.html" target="_blank" rel="noopener">船橋市公式サイト</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 80,
  },
  {
    slug: "unlicensed-nursery-bonus",
    citySlug: "funabashi",
    title: "船橋市で認可外保育施設の利用で加点を得る方法",
    description:
      "船橋市では認可外保育施設の月ぎめ利用で+1点の加点が得られます。その条件を解説します。",
    image: "https://images.unsplash.com/photo-1587654780291-39c9404d7dd0?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>認可外利用の加点</h2>
<p>船橋市では認可外保育施設に月ぎめで預けている場合、調整点で<span class="highlight">+1点</span>の加点が得られます。</p>

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
<p>船橋市内の認可外保育施設の月額料金は施設によって異なりますが、月5万〜8万円程度が一般的です。</p>

<h2>翌年度への布石</h2>
<p>不承諾だった場合に認可外を利用すると、翌年度の申込で+1点の加点がつきます。20点制では1点でも大きな差になります。</p>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>利用証明書が必要になりますので、利用している施設に発行を依頼してください。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 75,
  },
  {
    slug: "next-year-changes",
    citySlug: "funabashi",
    title: "船橋市の令和8年度入園　変更点と注意事項",
    description:
      "船橋市の令和8年度保育園入園選考の注意点をまとめました。",
    image: "https://images.unsplash.com/photo-1506784365847-bbad939e9335?w=800&h=400&fit=crop",
    category: "最新情報",
    categoryColor: "purple",
    content: `<h2>令和8年度の注意点</h2>
<p>船橋市の保育園入園制度は毎年見直しが行われます。最新の利用調整基準早見表を確認しましょう。</p>

<h2>確認すべきポイント</h2>
<ul>
<li>基本点・調整点の変更有無</li>
<li>新設園の情報</li>
<li>定員の増減</li>
<li>認可外利用の加点条件の変更</li>
<li>祖父母同居の減点条件の変更</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>船橋市では利用調整基準早見表が令和8年度版として公開されています。毎年秋の申込前に必ず最新版を確認しましょう。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>最新情報は<a href="https://www.city.funabashi.lg.jp/kodomo/hoiku/002/p054970.html" target="_blank" rel="noopener">船橋市公式サイト</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 70,
  },
  {
    slug: "popular-areas",
    citySlug: "funabashi",
    title: "船橋市の人気エリアと入りやすい地域の傾向",
    description:
      "船橋市内で保育園の競争率が高いエリアと比較的入りやすい地域を解説します。",
    image: "https://images.unsplash.com/photo-1524813686514-a57563d77965?w=800&h=400&fit=crop",
    category: "エリア情報",
    categoryColor: "teal",
    content: `<h2>船橋市の保育園事情</h2>
<p>船橋市は千葉県内で2番目に人口が多く、保育需要も高い自治体です。エリアによって競争率に差があります。</p>

<h2>競争率が高い傾向のエリア</h2>
<ul>
<li>船橋駅周辺：商業地に近く子育て世帯に人気</li>
<li>津田沼駅周辺：JR・新京成線の乗換駅で利便性が高い</li>
<li>西船橋駅周辺：東京方面への通勤に便利</li>
</ul>

<h2>比較的入りやすい傾向のエリア</h2>
<ul>
<li>北部エリア（船橋日大前・北習志野方面）：住宅開発が進み保育園が増加</li>
<li>南部臨海エリア：再開発で新設園が増えている地域</li>
<li>二和向台・三咲方面：駅から離れた郊外エリア</li>
</ul>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>エリアの難易度は年度や年齢クラスによって変わります。最新の空き状況を市に確認してください。</p>
</div>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>船橋市は公式サイトで園ごとの空き状況を公開しています。通勤経路上の園も含めて幅広く希望園を検討しましょう。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 60,
  },
  {
    slug: "competition-reality",
    citySlug: "funabashi",
    title: "船橋市の保育園入園競争の実態",
    description:
      "船橋市の保育園入園はどのくらい厳しいのか。20点制の選考の実態を解説します。",
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>船橋市の入園競争の現状</h2>
<p>船橋市は千葉県内有数の保育激戦区です。特に1歳児クラスの競争が激しい傾向にあります。</p>

<h2>ボリュームゾーン</h2>
<p>フルタイム共働き世帯は基本点<span class="highlight">20点</span>で横並びです。調整点の加点で差がつきます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>22点あれば多くの園で入園できる可能性が高いです。20点＋認可外利用（+1）＋育休復帰（+1）＝<span class="highlight">22点</span>が一つの目安です。</p>
</div>

<h2>年齢別の傾向</h2>
<ul>
<li>0歳児クラス：受入枠が少なく競争率が高い園もある</li>
<li>1歳児クラス：最も競争が激しい年齢</li>
<li>2歳児クラス：空きが少ない</li>
<li>3歳児以上：枠が増えるため比較的入りやすい</li>
</ul>

<h2>過去のボーダーライン</h2>
<p>船橋市では利用承諾者の最低点数を公表しています。人気園では20点でも落選するケースがあり、22点以上が安全圏の目安です。</p>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>求職活動中の基本点は3点で、就労中（最大10点）の半分以下です。求職中での入園は人気エリアでは困難です。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 95,
  },
];

registerArticles(articles);
