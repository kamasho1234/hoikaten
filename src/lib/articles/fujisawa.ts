import type { Article } from "./types";
import { registerArticles } from "./index";

const articles: Article[] = [
  {
    slug: "hokatsu-schedule",
    citySlug: "fujisawa",
    title: "藤沢市の保活スケジュール　申込から内定までの流れ",
    description:
      "藤沢市の認可保育園の申込時期・選考の流れをまとめました。令和8年度4月入園の動き方を解説します。",
    image: "https://images.unsplash.com/photo-1484820540004-14229fe36ca4?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>藤沢市の4月入園スケジュール</h2>
<p>藤沢市の認可保育園は毎年秋に翌年度4月入園の申込を受付けます。「ふじさわ認可保育施設申込ナビ」を参考に準備しましょう。</p>

<h3>保活の全体スケジュール</h3>
<div class="step">
<div class="step-num">1</div>
<div class="step-content">
<strong>4月〜6月：情報収集</strong>
<p>藤沢市のホームページで保育園の一覧を確認します。</p>
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
<strong>9月〜10月：申込ナビの入手・書類準備</strong>
<p>就労証明書などの必要書類を準備します。</p>
</div>
</div>
<div class="step">
<div class="step-num">4</div>
<div class="step-content">
<strong>10月〜11月：申込書類の提出</strong>
<p>保育課窓口または郵送で提出します。</p>
</div>
</div>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>藤沢市は基礎点数が父母各最大10点（合計20点満点）です。月あたりの就労時間で判定されます。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳しくは<a href="https://www.city.fujisawa.kanagawa.jp/hoiku/" target="_blank" rel="noopener">藤沢市保育課</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 55,
  },
  {
    slug: "scoring-system-guide",
    citySlug: "fujisawa",
    title: "藤沢市の入園点数のしくみ　基礎点数と調整点数を解説",
    description:
      "藤沢市の保育園入園選考で使われる基礎点数と調整点数のしくみを解説します。",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>藤沢市の選考点数とは</h2>
<p>藤沢市の認可保育園の入園選考は「基礎点数＋調整点数」の合計で行われます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>選考点数 = 基礎点数（保護者1 + 保護者2）+ 調整点数</p>
</div>

<h2>基礎点数（父母各最大10点、合計20点）</h2>
<p>就労の場合、月140時間以上で満点の<span class="highlight">10点</span>になります。</p>

<table>
<tr><th>月の就労時間</th><th>点数</th></tr>
<tr><td>月140時間以上</td><td>10</td></tr>
<tr><td>月120〜140時間</td><td>9</td></tr>
<tr><td>月100〜120時間</td><td>8</td></tr>
<tr><td>月80〜100時間</td><td>7</td></tr>
<tr><td>月64〜80時間</td><td>6</td></tr>
</table>

<h2>調整点数の代表例</h2>
<ul>
<li>ベビーシッター・認可外保育施設に預けている：<span class="highlight">+4点</span></li>
<li>ひとり親世帯：<span class="highlight">+3点</span></li>
<li>きょうだいが在園中の施設を希望：<span class="highlight">+2点</span></li>
<li>産休・育休明けの復職：<span class="highlight">+1点</span></li>
<li>保育料の滞納あり：<span class="highlight">-20点</span></li>
</ul>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>全項目は<a href="https://www.city.fujisawa.kanagawa.jp/hoiku/" target="_blank" rel="noopener">藤沢市保育課</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 65,
  },
  {
    slug: "score-up-tips",
    citySlug: "fujisawa",
    title: "藤沢市で入園点数を上げるコツ　加点を最大化する方法",
    description:
      "藤沢市の保育園入園選考で調整点数の加点を最大限に活用する方法を解説します。",
    image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>基礎点数20点は出発点</h2>
<p>藤沢市ではフルタイム共働き世帯は基礎点数<span class="highlight">20点</span>で横並びです。差がつくのは調整点数です。</p>

<h2>加点チェックリスト</h2>
<table>
<tr><th>項目</th><th>点数</th><th>条件</th></tr>
<tr><td>認可外・ベビーシッター利用</td><td>+4</td><td>月ぎめで認可外保育施設やベビーシッターに預けている</td></tr>
<tr><td>ひとり親</td><td>+3</td><td>ひとり親世帯であること</td></tr>
<tr><td>きょうだい在園</td><td>+2</td><td>きょうだいが在園中の施設を希望</td></tr>
<tr><td>育休復帰</td><td>+1</td><td>産休・育休明けで復職予定</td></tr>
<tr><td>多子世帯</td><td>+1</td><td>生計を一にする子どもが3人以上</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>藤沢市は認可外・ベビーシッター加点が+4点と大きいのが特徴です。保育料の滞納は-20点の大幅減点になるので注意しましょう。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 60,
  },
  {
    slug: "tiebreaker-rules",
    citySlug: "fujisawa",
    title: "藤沢市の同点時の優先順位　点数が同じ場合どうなる？",
    description:
      "藤沢市の保育園入園選考で点数が同点になった場合の優先順位のルールを解説します。",
    image: "https://images.unsplash.com/photo-1590650153855-d9e808231d41?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>同点時の優先順位</h2>
<p>藤沢市では選考点数が同じ場合、以下の優先順位に基づいて入園が決まります。</p>

<h3>主な優先要素</h3>
<ul>
<li>藤沢市に住民登録がある方が優先</li>
<li>保育の必要度が高い世帯</li>
<li>きょうだいの在園状況</li>
<li>世帯の所得が低い方</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>藤沢市は湘南エリアの中心都市で、特に藤沢駅・辻堂駅周辺の人気園は同点勝負になりやすいです。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 45,
  },
  {
    slug: "part-time-work-score",
    citySlug: "fujisawa",
    title: "藤沢市のパート・時短勤務の点数　何時間で何点？",
    description:
      "藤沢市の保育園入園で、パートや時短勤務の場合にもらえる基礎点数を解説します。",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>パート・時短勤務の基礎点数</h2>
<p>藤沢市では月あたりの就労時間で基礎点数が決まります。フルタイムでなくても点数が付きます。</p>

<table>
<tr><th>月の就労時間</th><th>点数</th><th>勤務パターン例</th></tr>
<tr><td>月140時間以上</td><td>10</td><td>週5日・1日7時間以上</td></tr>
<tr><td>月120〜140時間</td><td>9</td><td>週5日・1日6時間程度</td></tr>
<tr><td>月100〜120時間</td><td>8</td><td>週5日・1日5時間程度</td></tr>
<tr><td>月80〜100時間</td><td>7</td><td>週4日・1日5時間程度</td></tr>
<tr><td>月64〜80時間</td><td>6</td><td>週4日・1日4時間程度</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>入園要件は月64時間以上の就労です。週3日・1日6時間程度で月72時間なら6点で申込み可能です。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 50,
  },
  {
    slug: "rejection-options",
    citySlug: "fujisawa",
    title: "藤沢市で不承諾になったら　次にやるべきこと",
    description:
      "藤沢市の保育園入園で不承諾通知が届いた場合の対処法をまとめました。",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=400&fit=crop",
    category: "不承諾対策",
    categoryColor: "rose",
    content: `<h2>不承諾通知が届いたら</h2>
<p>藤沢市では4月一次選考の結果は2月上旬に届きます。不承諾の場合の選択肢を整理します。</p>

<h3>選択肢</h3>
<ul>
<li>二次募集に申し込む</li>
<li>5月以降の途中入園を申し込む</li>
<li>認可外保育施設やベビーシッターを利用しながら翌年度に再申込する</li>
<li>藤沢型認定保育施設を検討する</li>
</ul>

<h2>藤沢型認定保育施設とは</h2>
<p>藤沢市独自の認定制度で、認可外だが市の基準を満たした施設です。保育料の補助制度もあります。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>藤沢型認定保育施設の一覧は<a href="https://www.city.fujisawa.kanagawa.jp/hoiku/" target="_blank" rel="noopener">藤沢市保育課</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 40,
  },
  {
    slug: "unlicensed-nursery-bonus",
    citySlug: "fujisawa",
    title: "藤沢市で認可外・ベビーシッター加点を取る方法",
    description:
      "藤沢市で認可外保育施設やベビーシッターの利用による加点を得る方法を解説します。",
    image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>認可外・ベビーシッター加点とは</h2>
<p>藤沢市では認可外保育施設やベビーシッターに預けている場合、調整点数が<span class="highlight">+4点</span>加算されます。これは他の自治体と比べても大きな加点です。</p>

<h2>対象となる条件</h2>
<ul>
<li>認可外保育施設に月ぎめ契約で預けていること</li>
<li>ベビーシッターを定期利用していること</li>
<li>一時保育のみの利用は対象外</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>藤沢市の認可外加点+4は非常に大きく、フルタイム同士の差が1点刻みの中でこの4点は決定的な差になります。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 55,
  },
  {
    slug: "next-year-changes",
    citySlug: "fujisawa",
    title: "藤沢市の保育園事情　最新動向と今後の見通し",
    description:
      "藤沢市の保育園整備計画や待機児童の動向など、最新の保育園事情をまとめました。",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=400&fit=crop",
    category: "最新情報",
    categoryColor: "purple",
    content: `<h2>藤沢市の保育園事情</h2>
<p>藤沢市は湘南エリアの中心都市で、子育て世代の流入が続いています。</p>

<h2>最近の傾向</h2>
<ul>
<li>辻堂駅周辺の再開発に伴う新規保育園の開設</li>
<li>小規模保育事業の拡充</li>
<li>藤沢型認定保育施設の保育料補助の充実</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>辻堂・藤沢駅周辺は特に競争が激しい地域です。新設園の情報は市のホームページでチェックしましょう。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>最新の情報は<a href="https://www.city.fujisawa.kanagawa.jp/hoiku/" target="_blank" rel="noopener">藤沢市保育課</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 35,
  },
  {
    slug: "popular-areas",
    citySlug: "fujisawa",
    title: "藤沢市の地域別・保育園の入りやすさ",
    description:
      "藤沢市内の地域別に保育園の入りやすさを比較し、保活の参考情報をまとめました。",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=400&fit=crop",
    category: "地域情報",
    categoryColor: "teal",
    content: `<h2>藤沢市の地域特性</h2>
<p>藤沢市は北部から南部の海沿いまで広いエリアがあり、地域によって保育園の競争率が異なります。</p>

<h3>競争が激しいエリア</h3>
<ul>
<li>藤沢駅周辺：交通の便がよく共働き世帯に人気</li>
<li>辻堂駅周辺：テラスモール湘南の開業以降、ファミリー層が増加</li>
</ul>

<h3>比較的入りやすいエリア</h3>
<ul>
<li>湘南台・長後エリア：相鉄線沿線で園の数も一定数ある</li>
<li>六会・善行エリア：穴場として知られる</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>藤沢市の各園の入所内定最低指数は市のホームページで公開されています。希望園選びの参考にしましょう。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 50,
  },
  {
    slug: "competition-reality",
    citySlug: "fujisawa",
    title: "藤沢市で保育園に入れる点数の目安　何点あれば安心？",
    description:
      "藤沢市の保育園入園に必要な点数の目安を、公開された内定最低指数をもとに解説します。",
    image: "https://images.unsplash.com/photo-1460518451285-97b6aa326961?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>内定に必要な点数の目安</h2>
<p>藤沢市は各園の入所内定最低指数を公開しています。これを参考に自分の点数と比較できます。</p>

<h3>人気エリアの目安（1歳児クラス）</h3>
<table>
<tr><th>エリア</th><th>目安の点数</th></tr>
<tr><td>辻堂駅周辺</td><td>22〜24点</td></tr>
<tr><td>藤沢駅周辺</td><td>21〜23点</td></tr>
<tr><td>湘南台エリア</td><td>20〜21点</td></tr>
</table>

<p>人気園ではフルタイム共働き（20点）だけでは足りず、認可外利用の+4点などの加点が必要です。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>上記は過去の傾向をもとにした参考値です。最新の内定最低指数は藤沢市のホームページで確認できます。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 60,
  },
];

registerArticles(articles);
