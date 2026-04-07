import type { Article } from "./types";
import { registerArticles } from "./index";

const articles: Article[] = [
  {
    slug: "hokatsu-schedule",
    citySlug: "kamakura",
    title: "鎌倉市の保活スケジュール　申込から内定までの流れ",
    description:
      "鎌倉市の認可保育園の申込時期・選考の流れをまとめました。令和8年度4月入園の動き方を解説します。",
    image: "https://images.unsplash.com/photo-1484820540004-14229fe36ca4?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>鎌倉市の4月入園スケジュール</h2>
<p>鎌倉市の認可保育園は毎年秋に翌年度4月入園の申込を受付けます。鎌倉市こどもみらい部保育課の案内を参考に準備しましょう。</p>

<h3>保活の全体スケジュール</h3>
<div class="step">
<div class="step-num">1</div>
<div class="step-content">
<strong>4月〜6月：情報収集</strong>
<p>鎌倉市のホームページで認可保育園約25か所の一覧を確認します。鎌倉・大船・深沢など地域ごとに園の特徴を把握しましょう。</p>
</div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content">
<strong>6月〜9月：保育園見学</strong>
<p>気になる園に連絡して見学を予約しましょう。鎌倉市は地域によって園の雰囲気がかなり異なります。</p>
</div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content">
<strong>9月〜10月：申込案内の入手・書類準備</strong>
<p>就労証明書などの必要書類を準備します。鎌倉市こどもみらい部保育課の窓口やホームページで入手できます。</p>
</div>
</div>
<div class="step">
<div class="step-num">4</div>
<div class="step-content">
<strong>10月〜11月：申込書類の提出</strong>
<p>保育課窓口または郵送で提出します。締切日は厳守です。</p>
</div>
</div>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>鎌倉市は基本指数が父母各最大20点（合計40点満点）です。月あたりの就労時間で判定されます。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳しくは<a href="https://www.city.kamakura.kanagawa.jp/hoiku/" target="_blank" rel="noopener">鎌倉市こどもみらい部保育課</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 55,
  },
  {
    slug: "scoring-system-guide",
    citySlug: "kamakura",
    title: "鎌倉市の入園点数のしくみ　基本指数と調整指数を解説",
    description:
      "鎌倉市の保育園入園選考で使われる基本指数と調整指数のしくみを解説します。",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>鎌倉市の選考点数とは</h2>
<p>鎌倉市の認可保育園の入園選考は「基本指数＋調整指数」の合計で行われます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>選考点数 = 基本指数（保護者1 + 保護者2）+ 調整指数</p>
</div>

<h2>基本指数（父母各最大20点、合計40点）</h2>
<p>就労の場合、月160時間以上で満点の<span class="highlight">20点</span>になります。</p>

<table>
<tr><th>月の就労時間</th><th>点数</th></tr>
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
<li>認可外保育施設に預けている：<span class="highlight">+3点</span></li>
<li>生活保護世帯：<span class="highlight">+3点</span></li>
<li>育休明けの復職：<span class="highlight">+2点</span></li>
<li>きょうだい同時申込：<span class="highlight">+2点</span></li>
<li>同居親族（保育可能）：<span class="highlight">-3点</span></li>
<li>転園希望：<span class="highlight">-5点</span></li>
<li>市外からの申込：<span class="highlight">-10点</span></li>
</ul>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>全項目は<a href="https://www.city.kamakura.kanagawa.jp/hoiku/" target="_blank" rel="noopener">鎌倉市こどもみらい部保育課</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 65,
  },
  {
    slug: "score-up-tips",
    citySlug: "kamakura",
    title: "鎌倉市で入園点数を上げるコツ　加点を最大化する方法",
    description:
      "鎌倉市の保育園入園選考で調整指数の加点を最大限に活用する方法を解説します。",
    image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>基本指数40点は出発点</h2>
<p>鎌倉市ではフルタイム共働き世帯は基本指数<span class="highlight">40点</span>で横並びです。差がつくのは調整指数です。</p>

<h2>加点チェックリスト</h2>
<table>
<tr><th>項目</th><th>点数</th><th>条件</th></tr>
<tr><td>ひとり親</td><td>+5</td><td>ひとり親世帯であること</td></tr>
<tr><td>きょうだい在園</td><td>+3</td><td>きょうだいが在園中の施設を希望</td></tr>
<tr><td>認可外利用</td><td>+3</td><td>月ぎめで認可外保育施設に預けている</td></tr>
<tr><td>生活保護</td><td>+3</td><td>生活保護を受給中</td></tr>
<tr><td>育休復帰</td><td>+2</td><td>育休明けで復職予定</td></tr>
<tr><td>同時申込</td><td>+2</td><td>きょうだいと同時に申し込む</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>鎌倉市はひとり親加点が+5点と大きいのが特徴です。また転園希望は-5点、市外からの申込は-10点と減点が厳しいため注意が必要です。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 60,
  },
  {
    slug: "tiebreaker-rules",
    citySlug: "kamakura",
    title: "鎌倉市の同点時の優先順位　点数が同じ場合どうなる？",
    description:
      "鎌倉市の保育園入園選考で点数が同点になった場合の優先順位のルールを解説します。",
    image: "https://images.unsplash.com/photo-1590650153855-d9e808231d41?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>同点時の優先順位</h2>
<p>鎌倉市では選考点数が同じ場合、以下の優先順位に基づいて入園が決まります。</p>

<h3>主な優先要素</h3>
<ul>
<li>鎌倉市に住民登録がある方が優先</li>
<li>保育の必要度が高い世帯</li>
<li>きょうだいの在園状況</li>
<li>世帯の所得が低い方</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>鎌倉市は人口約17.2万人の古都で、特に大船駅周辺の人気園は同点勝負になりやすいです。市外からの申込は-10点と大幅減点があるため、市内在住が前提になります。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 45,
  },
  {
    slug: "part-time-work-score",
    citySlug: "kamakura",
    title: "鎌倉市のパート・時短勤務の点数　何時間で何点？",
    description:
      "鎌倉市の保育園入園で、パートや時短勤務の場合にもらえる基本指数を解説します。",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>パート・時短勤務の基本指数</h2>
<p>鎌倉市では月あたりの就労時間で基本指数が決まります。フルタイムでなくても点数が付きます。</p>

<table>
<tr><th>月の就労時間</th><th>点数</th><th>勤務パターン例</th></tr>
<tr><td>月160時間以上</td><td>20</td><td>週5日・1日8時間以上</td></tr>
<tr><td>月140〜160時間</td><td>18</td><td>週5日・1日7時間程度</td></tr>
<tr><td>月120〜140時間</td><td>16</td><td>週5日・1日6時間程度</td></tr>
<tr><td>月100〜120時間</td><td>14</td><td>週5日・1日5時間程度</td></tr>
<tr><td>月80〜100時間</td><td>12</td><td>週4日・1日5時間程度</td></tr>
<tr><td>月64〜80時間</td><td>10</td><td>週4日・1日4時間程度</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>入園要件は月64時間以上の就労です。週3日・1日6時間程度で月72時間なら10点で申込み可能です。鎌倉市は父母各20点満点のため、パート勤務でも比較的高い点数が得られます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 50,
  },
  {
    slug: "rejection-options",
    citySlug: "kamakura",
    title: "鎌倉市で不承諾になったら　次にやるべきこと",
    description:
      "鎌倉市の保育園入園で不承諾通知が届いた場合の対処法をまとめました。",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=400&fit=crop",
    category: "不承諾対策",
    categoryColor: "rose",
    content: `<h2>不承諾通知が届いたら</h2>
<p>鎌倉市では4月一次選考の結果は2月上旬に届きます。不承諾の場合の選択肢を整理します。</p>

<h3>選択肢</h3>
<ul>
<li>二次募集に申し込む</li>
<li>5月以降の途中入園を申し込む</li>
<li>認可外保育施設を利用しながら翌年度に再申込する（認可外加点+3が付く）</li>
<li>近隣の藤沢市・逗子市の認可外施設も視野に入れる</li>
</ul>

<h2>認可外保育施設の活用</h2>
<p>鎌倉市では認可外保育施設に預けると調整指数+3点の加点が得られます。不承諾になった場合、翌年度に向けて認可外に預けながら再申込する方法が有効です。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>認可外保育施設の情報は<a href="https://www.city.kamakura.kanagawa.jp/hoiku/" target="_blank" rel="noopener">鎌倉市こどもみらい部保育課</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 40,
  },
  {
    slug: "unlicensed-nursery-bonus",
    citySlug: "kamakura",
    title: "鎌倉市で認可外保育施設の加点を取る方法",
    description:
      "鎌倉市で認可外保育施設の利用による加点を得る方法を解説します。",
    image: "https://images.unsplash.com/photo-1587654780291-39c9404d7dd0?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>認可外保育施設の加点とは</h2>
<p>鎌倉市では認可外保育施設に預けている場合、調整指数が<span class="highlight">+3点</span>加算されます。</p>

<h2>対象となる条件</h2>
<ul>
<li>認可外保育施設に月ぎめ契約で預けていること</li>
<li>一時保育のみの利用は対象外</li>
<li>申込時点で継続的に利用していること</li>
</ul>

<h2>認可外加点の活用戦略</h2>
<p>フルタイム共働き世帯の基本指数は40点です。ここに認可外加点+3点を加えて43点にすることで、人気園の内定に近づけます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>鎌倉市の認可外加点+3は、きょうだい在園加点+3と同じ重みです。一次選考で不承諾になった場合は、認可外に預けながら翌年度に再挑戦するのが定番の戦略です。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 55,
  },
  {
    slug: "next-year-changes",
    citySlug: "kamakura",
    title: "鎌倉市の保育園事情　最新動向と今後の見通し",
    description:
      "鎌倉市の保育園整備計画や待機児童の動向など、最新の保育園事情をまとめました。",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=400&fit=crop",
    category: "最新情報",
    categoryColor: "purple",
    content: `<h2>鎌倉市の保育園事情</h2>
<p>鎌倉市は人口約17.2万人、鎌倉大仏や鶴岡八幡宮で有名な古都です。観光地としてのイメージが強いですが、大船駅周辺を中心に子育て世代も多く住んでいます。</p>

<h2>最近の傾向</h2>
<ul>
<li>大船駅周辺の再開発に伴う保育需要の増加</li>
<li>小規模保育事業の拡充</li>
<li>市内の認可保育園は約25か所</li>
<li>鎌倉市こどもみらい部保育課が窓口</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>大船駅周辺は特に競争が激しい地域です。鎌倉駅・北鎌倉方面は園の数が限られるため、地域選びが重要になります。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>最新の情報は<a href="https://www.city.kamakura.kanagawa.jp/hoiku/" target="_blank" rel="noopener">鎌倉市こどもみらい部保育課</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 35,
  },
  {
    slug: "popular-areas",
    citySlug: "kamakura",
    title: "鎌倉市の地域別・保育園の入りやすさ",
    description:
      "鎌倉市内の地域別に保育園の入りやすさを比較し、保活の参考情報をまとめました。",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=400&fit=crop",
    category: "地域情報",
    categoryColor: "teal",
    content: `<h2>鎌倉市の地域特性</h2>
<p>鎌倉市は大船・深沢エリアから鎌倉・腰越エリアまで、地域によって保育園の競争率が大きく異なります。</p>

<h3>競争が激しいエリア</h3>
<ul>
<li>大船駅周辺：JR・湘南モノレールが交差する交通の要衝で共働き世帯に人気</li>
<li>鎌倉駅周辺：園の数が限られており倍率が高い</li>
</ul>

<h3>比較的入りやすいエリア</h3>
<ul>
<li>深沢エリア：湘南モノレール沿線で比較的園に余裕がある</li>
<li>腰越・七里ヶ浜エリア：海側のエリアで競争率が低い傾向</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>鎌倉市は地形の関係でエリア間の移動に時間がかかることがあります。通勤経路と合わせて希望園を選びましょう。各園の入所内定最低指数は市のホームページで公開されています。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 50,
  },
  {
    slug: "competition-reality",
    citySlug: "kamakura",
    title: "鎌倉市で保育園に入れる点数の目安　何点あれば安心？",
    description:
      "鎌倉市の保育園入園に必要な点数の目安を解説します。",
    image: "https://images.unsplash.com/photo-1460518451285-97b6aa326961?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>内定に必要な点数の目安</h2>
<p>鎌倉市は各園の入所内定最低指数を公開しています。これを参考に自分の点数と比較できます。</p>

<h3>人気エリアの目安（1歳児クラス）</h3>
<table>
<tr><th>エリア</th><th>目安の点数</th></tr>
<tr><td>大船駅周辺</td><td>42〜45点</td></tr>
<tr><td>鎌倉駅周辺</td><td>40〜43点</td></tr>
<tr><td>深沢エリア</td><td>40〜42点</td></tr>
</table>

<p>人気園ではフルタイム共働き（40点）だけでは足りず、認可外利用の+3点やきょうだい加点+3点などの調整指数が必要です。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>上記は過去の傾向をもとにした参考値です。最新の内定最低指数は鎌倉市のホームページで確認できます。0歳児クラスは比較的入りやすく、1歳児クラスが最も競争が激しい傾向にあります。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 60,
  },
];

registerArticles(articles);
