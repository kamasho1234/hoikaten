import type { Article } from "./types";
import { registerArticles } from "./index";

const articles: Article[] = [
  {
    slug: "hokatsu-schedule",
    citySlug: "ichihara",
    title: "市原市の保活スケジュール　申込から内定までの流れ",
    description:
      "市原市の認可保育園の申込時期・選考の流れをまとめました。令和8年度4月入園の動き方を解説します。",
    image: "https://images.unsplash.com/photo-1484820540004-14229fe36ca4?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>市原市の4月入園スケジュール</h2>
<p>市原市の認可保育園は毎年秋に翌年度4月入園の申込を受付けます。市原市子ども未来部保育課が窓口です。</p>

<h3>保活の全体スケジュール</h3>
<div class="step">
<div class="step-num">1</div>
<div class="step-content">
<strong>4月〜6月：情報収集</strong>
<p>市原市のホームページで保育園の一覧を確認します。市内には認可保育園が約35か所あります。</p>
</div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content">
<strong>6月〜9月：保育園見学</strong>
<p>気になる園に連絡して見学を予約しましょう。五井駅・八幡宿駅周辺は園が集中しています。</p>
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
<p>子ども未来部保育課の窓口で提出します。</p>
</div>
</div>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>市原市は基準指数が父母各最大20点（合計40点満点）です。月の合計就労時間で判定されます。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳しくは<a href="https://www.city.ichihara.chiba.jp/article?articleId=602771e865909e2ebbc2b1e4" target="_blank" rel="noopener">市原市公式サイト</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 55,
  },
  {
    slug: "scoring-system-guide",
    citySlug: "ichihara",
    title: "市原市の入園点数のしくみ　基準指数と調整指数を解説",
    description:
      "市原市の保育園入園選考で使われる基準指数と調整指数のしくみを解説します。",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>市原市の選考指数とは</h2>
<p>市原市の認可保育園の入園選考は「基準指数＋調整指数」の合計で行われます。子ども未来部保育課が選考を担当します。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>選考指数 = 基準指数（保護者1 + 保護者2）+ 調整指数</p>
</div>

<h2>基準指数（父母各最大20点、合計40点）</h2>
<p>就労の場合、月160時間以上で満点の<span class="highlight">20点</span>になります。</p>

<table>
<tr><th>月の就労時間</th><th>指数</th></tr>
<tr><td>月160時間以上</td><td>20</td></tr>
<tr><td>月140〜160時間</td><td>18</td></tr>
<tr><td>月120〜140時間</td><td>16</td></tr>
<tr><td>月100〜120時間</td><td>14</td></tr>
<tr><td>月80〜100時間</td><td>12</td></tr>
<tr><td>月64〜80時間</td><td>10</td></tr>
</table>

<h2>調整指数の代表例</h2>
<ul>
<li>ひとり親世帯：<span class="highlight">+5点</span></li>
<li>きょうだいが在園中の施設を希望：<span class="highlight">+3点</span></li>
<li>認可外保育施設に月64時間以上利用：<span class="highlight">+3点</span></li>
<li>生活保護世帯：<span class="highlight">+3点</span></li>
<li>育児休業から復帰予定：<span class="highlight">+2点</span></li>
<li>市外からの申込：<span class="highlight">-10点</span></li>
<li>同居の保育可能な親族あり：<span class="highlight">-3点</span></li>
<li>転園希望：<span class="highlight">-5点</span></li>
</ul>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>全項目は<a href="https://www.city.ichihara.chiba.jp/article?articleId=602771e865909e2ebbc2b1e4" target="_blank" rel="noopener">市原市公式サイト</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 65,
  },
  {
    slug: "score-up-tips",
    citySlug: "ichihara",
    title: "市原市で入園点数を上げるコツ　加点を最大化する方法",
    description:
      "市原市の保育園入園選考で調整指数の加点を最大限に活用する方法を解説します。",
    image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>基準指数40点は出発点</h2>
<p>市原市ではフルタイム共働き世帯は基準指数<span class="highlight">40点</span>で横並びです。差がつくのは調整指数です。</p>

<h2>加点チェックリスト</h2>
<table>
<tr><th>項目</th><th>点数</th><th>条件</th></tr>
<tr><td>ひとり親</td><td>+5</td><td>ひとり親世帯であること</td></tr>
<tr><td>きょうだい在園</td><td>+3</td><td>きょうだいが在園中の施設を希望</td></tr>
<tr><td>認可外利用</td><td>+3</td><td>認可外保育施設に月64時間以上預けている</td></tr>
<tr><td>生活保護</td><td>+3</td><td>生活保護を受けている</td></tr>
<tr><td>育休復帰</td><td>+2</td><td>育児休業を取得し復帰予定</td></tr>
<tr><td>同時申込</td><td>+2</td><td>きょうだいと同時に申し込む</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>市原市は京葉工業地帯に位置し、共働き世帯が多い地域です。五井駅周辺の人気園では加点がないと厳しい場合があります。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 60,
  },
  {
    slug: "tiebreaker-rules",
    citySlug: "ichihara",
    title: "市原市の同点時の優先順位　点数が同じ場合どうなる？",
    description:
      "市原市の保育園入園選考で指数が同点になった場合の優先順位のルールを解説します。",
    image: "https://images.unsplash.com/photo-1590650153855-d9e808231d41?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>同点時の優先順位</h2>
<p>市原市では基準指数と調整指数の合計が同点の場合、以下の優先順位で入園が決まります。</p>

<h3>主な優先要素</h3>
<ul>
<li>市原市在住者が優先</li>
<li>保育の必要性が高い世帯</li>
<li>きょうだいの在園状況</li>
<li>世帯の課税額が低い方</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>同点勝負では世帯の課税額（所得）が重要な要素になります。所得が低い方が優先されます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 45,
  },
  {
    slug: "part-time-work-score",
    citySlug: "ichihara",
    title: "市原市のパート・時短勤務の点数　何時間で何点？",
    description:
      "市原市の保育園入園で、パートや時短勤務の場合にもらえる基準指数を解説します。",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>パート・時短勤務の基準指数</h2>
<p>市原市では月あたりの就労時間で基準指数が決まります。就労時間には休憩時間を含みますが、通勤時間は含みません。</p>

<table>
<tr><th>月の就労時間</th><th>指数</th><th>勤務パターン例</th></tr>
<tr><td>月160時間以上</td><td>20</td><td>週5日・1日8時間</td></tr>
<tr><td>月140〜160時間</td><td>18</td><td>週5日・1日7時間</td></tr>
<tr><td>月120〜140時間</td><td>16</td><td>週5日・1日6時間</td></tr>
<tr><td>月100〜120時間</td><td>14</td><td>週5日・1日5時間</td></tr>
<tr><td>月80〜100時間</td><td>12</td><td>週4日・1日5時間</td></tr>
<tr><td>月64〜80時間</td><td>10</td><td>週4日・1日4時間</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>入園要件は月64時間以上の就労です。複数の勤務先がある場合は就労時間を合算できます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 50,
  },
  {
    slug: "rejection-options",
    citySlug: "ichihara",
    title: "市原市で不承諾になったら　次にやるべきこと",
    description:
      "市原市の保育園入園で不承諾通知が届いた場合の対処法をまとめました。",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=400&fit=crop",
    category: "不承諾対策",
    categoryColor: "rose",
    content: `<h2>不承諾通知が届いたら</h2>
<p>市原市では4月一次選考の結果が2月上旬に届きます。不承諾だった場合の選択肢を整理します。</p>

<h3>選択肢</h3>
<ul>
<li>二次募集に申し込む</li>
<li>5月以降の途中入園を申し込む</li>
<li>認可外保育施設を利用しながら翌年度に再申込する</li>
<li>市原市の小規模保育事業所を検討する</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>認可外保育施設に預けてから翌年度に再申込すると+3点の加点がもらえます。長い目で見た戦略も大切です。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 40,
  },
  {
    slug: "unlicensed-nursery-bonus",
    citySlug: "ichihara",
    title: "市原市で認可外加点を取る方法　対象施設と条件",
    description:
      "市原市で認可外保育施設の利用による加点を得る方法と注意点を解説します。",
    image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>認可外加点とは</h2>
<p>市原市では認可外保育施設に月64時間以上預けている場合、調整指数が<span class="highlight">+3点</span>加算されます。</p>

<h2>対象となる条件</h2>
<ul>
<li>認可外保育施設に月ぎめで月64時間以上預けていること</li>
<li>一時保育のみの利用は対象外</li>
<li>認証保育所、企業主導型保育事業所なども対象になる場合がある</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>市原市の認可外保育施設の一覧は市のホームページで確認できます。施設によって対象になるかどうかが異なるので事前に確認しましょう。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 45,
  },
  {
    slug: "next-year-changes",
    citySlug: "ichihara",
    title: "市原市の保育園事情　最新動向と今後の見通し",
    description:
      "市原市の保育園整備計画や待機児童の動向など、最新の保育園事情をまとめました。",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=400&fit=crop",
    category: "最新情報",
    categoryColor: "purple",
    content: `<h2>市原市の保育園事情</h2>
<p>市原市は千葉県中央部に位置する人口約27万人の都市です。京葉工業地帯の中心地として栄え、共働き世帯が多い地域です。</p>

<h2>最近の傾向</h2>
<ul>
<li>市内には認可保育園が約35か所あり、近年も整備が進んでいる</li>
<li>五井駅・八幡宿駅周辺は利便性が高く、保育園の競争が激しい</li>
<li>南部の郊外エリアでは定員に余裕がある園もある</li>
<li>小規模保育事業の拡充が進んでいる</li>
</ul>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>最新の情報は<a href="https://www.city.ichihara.chiba.jp/article?articleId=602771e865909e2ebbc2b1e4" target="_blank" rel="noopener">市原市公式サイト</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 35,
  },
  {
    slug: "popular-areas",
    citySlug: "ichihara",
    title: "市原市の地域別・保育園の入りやすさ",
    description:
      "市原市内の地域別に保育園の入りやすさを比較し、保活の参考情報をまとめました。",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=400&fit=crop",
    category: "地域情報",
    categoryColor: "teal",
    content: `<h2>市原市の地域特性</h2>
<p>市原市は千葉県内で面積が最も広い市です。JR内房線沿線と小湊鉄道沿線で保育園の競争率が大きく異なります。</p>

<h3>競争が激しいエリア</h3>
<ul>
<li>五井駅周辺：市役所や商業施設が集中し、共働き世帯が多い</li>
<li>八幡宿駅周辺：京葉工業地帯への通勤に便利でファミリー層が多い</li>
</ul>

<h3>比較的入りやすいエリア</h3>
<ul>
<li>姉ケ崎エリア：園の数が一定数あり、競争は穏やか</li>
<li>南部・内陸エリア：郊外で園の数は少ないが競争も少ない</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>市原市の4月入園の受入予定人数は市のホームページで公開されます。希望園選びの参考にしましょう。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 50,
  },
  {
    slug: "competition-reality",
    citySlug: "ichihara",
    title: "市原市で保育園に入れる点数の目安　何点あれば安心？",
    description:
      "市原市の保育園入園に必要な点数の目安を、過去の傾向をもとに解説します。",
    image: "https://images.unsplash.com/photo-1460518451285-97b6aa326961?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>内定に必要な点数の目安</h2>
<p>市原市の人気園では基準指数40点（フルタイム共働き）に加え、調整指数の加点が必要になることがあります。</p>

<h3>目安（1歳児クラス）</h3>
<table>
<tr><th>エリア</th><th>目安の点数</th></tr>
<tr><td>五井駅周辺</td><td>43〜45点</td></tr>
<tr><td>八幡宿駅周辺</td><td>42〜44点</td></tr>
<tr><td>姉ケ崎・南部エリア</td><td>40〜42点</td></tr>
</table>

<p>0歳児クラスや3〜5歳児クラスは1歳児に比べて入りやすい傾向にあります。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>上記は保護者の口コミ等をもとにした参考値です。公式情報ではありませんのでご了承ください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 55,
  },
];

registerArticles(articles);
