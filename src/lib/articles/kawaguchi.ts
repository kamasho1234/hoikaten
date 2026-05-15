import type { Article } from "./types";
import { registerArticles } from "./index";

const articles: Article[] = [
  {
    slug: "hokatsu-schedule",
    citySlug: "kawaguchi",
    title: "川口市の保活スケジュール　申込から内定までの流れ",
    description:
      "川口市の認可保育園の申込時期・選考の流れをまとめました。令和8年度4月入園の動き方を解説します。",
    image: "https://images.unsplash.com/photo-1484820540004-14229fe36ca4?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>川口市の4月入園スケジュール</h2>
<p>川口市の認可保育園は毎年秋に翌年度4月入園の申込を受付けます。選考基準指数表を理解して準備を進めましょう。</p>

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
<p>気になる園に連絡して見学を予約しましょう。</p>
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
<p>保育幼稚園課窓口で申込みます。</p>
</div>
</div>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>川口市は基本指数が父母各最大20点（合計40点満点）です。月の就労時間で判定される制度です。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳しくは<a href="https://www.city.kawaguchi.lg.jp/soshiki/01080/050/4/49308.html" target="_blank" rel="noopener">川口市公式サイト</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 55,
  },
  {
    slug: "scoring-system-guide",
    citySlug: "kawaguchi",
    title: "川口市の入園点数のしくみ　基本指数と調整指数を解説",
    description:
      "川口市の保育園入園選考で使われる基本指数と調整指数のしくみを解説します。",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>川口市の選考指数とは</h2>
<p>川口市の認可保育園は「基本指数＋調整指数」の合計で選考されます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>選考指数 ＝ 基本指数（父＋母）＋ 調整指数</p>
</div>

<h2>基本指数（父母各最大20点、合計40点）</h2>
<p>自宅外就労の場合、月160時間以上で満点の<span class="highlight">20点</span>です。</p>

<table>
<tr><th>月の就労時間</th><th>指数</th></tr>
<tr><td>月160時間以上</td><td>20</td></tr>
<tr><td>月140時間以上160時間未満</td><td>19</td></tr>
<tr><td>月128時間以上140時間未満</td><td>18</td></tr>
<tr><td>月120時間以上128時間未満</td><td>17</td></tr>
<tr><td>月112時間以上120時間未満</td><td>16</td></tr>
<tr><td>月96時間以上112時間未満</td><td>15</td></tr>
<tr><td>月80時間以上96時間未満</td><td>14</td></tr>
<tr><td>月64時間以上80時間未満</td><td>12</td></tr>
</table>

<h2>調整指数の代表例</h2>
<ul>
<li>ひとり親世帯：<span class="highlight">+1点</span></li>
<li>きょうだいが認可保育施設に在園中：<span class="highlight">+1点</span></li>
<li>同居の小学生以下の子ども1人につき：<span class="highlight">+0.5点</span></li>
<li>育休復帰予定：<span class="highlight">+1点</span></li>
<li>生活保護世帯：<span class="highlight">+1点</span></li>
</ul>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>自宅内労働の場合は、収入を最低賃金で割り返した就労時間で判定されます。自宅外と計算方法が異なります。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>全項目は<a href="https://www.city.kawaguchi.lg.jp/soshiki/01080/050/4/49308.html" target="_blank" rel="noopener">川口市公式サイト</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 65,
  },
  {
    slug: "score-up-tips",
    citySlug: "kawaguchi",
    title: "川口市で入園点数を上げるコツ　加点チェックリスト",
    description:
      "川口市の保育園入園選考で調整指数の加点を最大限に活用する方法を解説します。",
    image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>基本指数40点は出発点</h2>
<p>川口市ではフルタイム共働き世帯は基本指数<span class="highlight">40点</span>で横並びです。差がつくのは調整指数の加点です。</p>

<h2>加点チェックリスト</h2>
<table>
<tr><th>項目</th><th>点数</th><th>条件</th></tr>
<tr><td>ひとり親世帯</td><td>+1点</td><td>母子・父子家庭の場合</td></tr>
<tr><td>きょうだい在園</td><td>+1点</td><td>認可保育施設にきょうだいが在園中（転園を除く）</td></tr>
<tr><td>同居の子ども</td><td>+0.5点/人</td><td>申込児童以外の小学生以下の同居児童1人につき</td></tr>
<tr><td>育休復帰予定</td><td>+1点</td><td>入園月に職場復帰する場合</td></tr>
<tr><td>生活保護</td><td>+1点</td><td>生活保護を受けている場合</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>川口市の特徴は就労時間の区分が細かいことです。月160時間で20点ですが、月140時間だと19点。1時間の差で点数が変わることがあります。</p>
</div>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>育児休業延長申出書を提出すると-200点の大きな減点があります。育休延長は慎重に検討してください。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 100,
  },
  {
    slug: "tiebreaker-rules",
    citySlug: "kawaguchi",
    title: "川口市で同点になったらどうなる？優先順位を解説",
    description:
      "川口市の保育園入園選考で同点だった場合の優先順位の判定方法を解説します。",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>同点時の判定方法</h2>
<p>川口市の入園選考で合計指数が同点になった場合、優先順位で判定されます。</p>

<h2>同点時に考慮される要素</h2>
<ul>
<li>ひとり親世帯は優先</li>
<li>きょうだいが在園している園への申込は優先</li>
<li>子どもの数が多い世帯が優先</li>
<li>所得が低い世帯が優先</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>川口市は40点制ですが、調整指数の加点幅が小さい（0.5〜1点単位）ため、同点が発生しやすいです。使える加点は漏れなく申請しましょう。</p>
</div>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>保育料の滞納がある場合は-20点の減点があります。保育料は必ず期限内に納付してください。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 85,
  },
  {
    slug: "part-time-work-score",
    citySlug: "kawaguchi",
    title: "川口市で時短勤務だと点数はどう変わる？",
    description:
      "川口市の保育園入園選考で時短勤務の場合の基本指数への影響を解説します。",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>川口市は月の合計就労時間で判定</h2>
<p>川口市の基本指数は月の合計就労時間で決まります。時短勤務の影響を確認しましょう。</p>

<table>
<tr><th>月の就労時間</th><th>基本指数</th></tr>
<tr><td>月160時間以上</td><td>20点</td></tr>
<tr><td>月140時間以上160時間未満</td><td>19点</td></tr>
<tr><td>月128時間以上140時間未満</td><td>18点</td></tr>
<tr><td>月120時間以上128時間未満</td><td>17点</td></tr>
<tr><td>月112時間以上120時間未満</td><td>16点</td></tr>
<tr><td>月96時間以上112時間未満</td><td>15点</td></tr>
<tr><td>月80時間以上96時間未満</td><td>14点</td></tr>
<tr><td>月64時間以上80時間未満</td><td>12点</td></tr>
</table>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>月20日勤務で1日6時間の時短勤務の場合、月120時間で基本指数は<span class="highlight">17点</span>です。フルタイムの20点と比べて3点下がります。夫婦合計では6点の差になります。</p>
</div>

<h2>川口市は区分が細かい</h2>
<p>川口市の特徴は就労時間の区分が8段階と細かいことです。月の就労時間がギリギリの場合は、わずかな時間の調整で1点上がる可能性があります。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>月128時間と月127時間では1点の差が生まれます。残業時間も含めた実労働時間を就労証明書に正確に記載してもらいましょう。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 90,
  },
  {
    slug: "rejection-options",
    citySlug: "kawaguchi",
    title: "川口市で保育園に落ちたときの選択肢",
    description:
      "川口市の認可保育園に不承諾となった場合の対応策をまとめました。",
    image: "https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>不承諾になったら</h2>
<p>川口市で認可保育園に不承諾になった場合でも、複数の選択肢があります。</p>

<h3>1. 二次選考への申込</h3>
<p>一次選考後の空き枠で二次選考が行われます。</p>

<h3>2. 認可外保育施設の利用</h3>
<p>認可外保育施設を利用して就労実績を積むことで、翌年度の申込で基本指数の維持・向上が期待できます。</p>

<h3>3. 小規模保育の利用</h3>
<p>小規模保育事業を利用し、卒園時に認可保育園へ転所する方法があります。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>川口市は埼玉県内でも保育需要が高い自治体です。第1希望だけでなく、多くの園を希望園に入れることが重要です。</p>
</div>

<h3>4. 途中入園</h3>
<p>空きが出た場合に途中入園が可能です。</p>

<h3>5. 育休延長</h3>
<p>不承諾通知があれば育休を最長2歳まで延長できます。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>空き状況は<a href="https://www.city.kawaguchi.lg.jp/soshiki/01080/050/4/32356.html" target="_blank" rel="noopener">川口市公式サイト</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 80,
  },
  {
    slug: "unlicensed-nursery-bonus",
    citySlug: "kawaguchi",
    title: "川口市で認可外保育施設を活用する方法",
    description:
      "川口市で認可外保育施設を利用して保活を有利に進める方法を解説します。",
    image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>認可外利用と就労実績</h2>
<p>川口市では認可外保育施設に預けて就労を継続することで、翌年度の申込で就労実績を示すことができます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>川口市の基本指数は就労時間で決まります。認可外に預けてフルタイム勤務を続ければ、基本指数20点を維持できます。</p>
</div>

<h2>きょうだい在園の活用</h2>
<p>きょうだいが市内の認可保育施設に在園中の場合、<span class="highlight">+1点</span>の加点があります。第1子を先に入園させて、第2子の申込時にこの加点を活用する方法も有効です。</p>

<h2>同居の子どもの加点</h2>
<p>申込児童以外に同居の小学生以下の子どもがいる場合、1人につき<span class="highlight">+0.5点</span>の加点があります。この加点は自動的に適用されます。</p>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>育児休業延長申出書を提出すると-200点の大きな減点があります。育休延長と保育園申込を同時に行う場合は注意が必要です。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 75,
  },
  {
    slug: "next-year-changes",
    citySlug: "kawaguchi",
    title: "川口市の令和8年度入園　変更点と注意事項",
    description:
      "川口市の令和8年度保育園入園選考の注意点をまとめました。",
    image: "https://images.unsplash.com/photo-1506784365847-bbad939e9335?w=800&h=400&fit=crop",
    category: "最新情報",
    categoryColor: "purple",
    content: `<h2>令和8年度の注意点</h2>
<p>川口市の保育園入園制度は毎年見直しが行われます。最新の選考基準指数表を確認しましょう。</p>

<h2>確認すべきポイント</h2>
<ul>
<li>基本指数・調整指数の変更有無</li>
<li>新設園の情報</li>
<li>定員の増減</li>
<li>就労時間の区分の変更</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>川口市は就労時間の区分が8段階と細かいのが特徴です。区分の境目が変更されていないか毎年確認しましょう。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>最新情報は<a href="https://www.city.kawaguchi.lg.jp/soshiki/01080/050/4/49308.html" target="_blank" rel="noopener">川口市公式サイト</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 70,
  },
  {
    slug: "popular-areas",
    citySlug: "kawaguchi",
    title: "川口市の人気エリアと入りやすい地域の傾向",
    description:
      "川口市内で保育園の競争率が高いエリアと比較的入りやすい地域を解説します。",
    image: "https://images.unsplash.com/photo-1524813686514-a57563d77965?w=800&h=400&fit=crop",
    category: "エリア情報",
    categoryColor: "teal",
    content: `<h2>川口市の保育園事情</h2>
<p>川口市は埼玉県南部に位置し、東京都心へのアクセスが良いため子育て世帯に人気の自治体です。保育需要も高い傾向にあります。</p>

<h2>競争率が高い傾向のエリア</h2>
<ul>
<li>川口駅周辺：市の中心地で子育て世帯が多い</li>
<li>西川口駅周辺：東京方面への通勤に便利</li>
<li>川口元郷・南鳩ヶ谷エリア：住宅地として人気</li>
</ul>

<h2>比較的入りやすい傾向のエリア</h2>
<ul>
<li>新郷・安行エリア：郊外のため保育需要が低め</li>
<li>鳩ヶ谷エリア：駅から離れた園は空きがある場合も</li>
<li>戸塚エリア：新設園が増えている地域</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>川口市は都心に近いため、さいたま市や東京都北区との境界付近は特に競争率が高い傾向があります。郊外の園も視野に入れましょう。</p>
</div>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>エリアの難易度は年度や年齢クラスによって変わります。最新の空き状況を市に確認してください。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 60,
  },
  {
    slug: "competition-reality",
    citySlug: "kawaguchi",
    title: "川口市の保育園入園競争の実態",
    description:
      "川口市の保育園入園はどのくらい厳しいのか。40点制の選考の実態を解説します。",
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>川口市の入園競争の現状</h2>
<p>川口市は埼玉県内でも保育需要が高い自治体の一つです。特に1歳児クラスの競争が激しい傾向にあります。</p>

<h2>ボリュームゾーン</h2>
<p>フルタイム共働き世帯は基本指数<span class="highlight">40点</span>で横並びです。調整指数の加点で差がつきます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>川口市では41〜42点がボリュームゾーンです。きょうだい在園（+1）や同居の子ども（+0.5/人）の加点が重要です。</p>
</div>

<h2>年齢別の傾向</h2>
<ul>
<li>0歳児クラス：園によっては入りやすい場合もある</li>
<li>1歳児クラス：最も競争が激しい年齢</li>
<li>2歳児クラス：空きが少ない</li>
<li>3歳児以上：枠が増えるため比較的入りやすい</li>
</ul>

<h2>就労時間の区分が細かい</h2>
<p>川口市は月160時間以上で20点、月140時間以上で19点と、就労時間の区分が8段階に分かれています。わずかな時間差で点数が変わるため、就労証明書の記載内容が重要です。</p>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>求職活動中の基本指数は6点で、就労中（最大20点）の3分の1以下です。求職中での入園は人気エリアでは困難です。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 95,
  },
];

registerArticles(articles);
