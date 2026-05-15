import type { Article } from "./types";
import { registerArticles } from "./index";

const articles: Article[] = [
  {
    slug: "hokatsu-schedule",
    citySlug: "toyonaka",
    title: "豊中市の保活スケジュール　申込から内定までの流れ",
    description:
      "豊中市の認可保育園の申込時期・選考の流れをまとめました。令和8年度4月入園の動き方を解説します。",
    image: "https://images.unsplash.com/photo-1484820540004-14229fe36ca4?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>豊中市の4月入園スケジュール</h2>
<p>豊中市の認可保育園は毎年秋に翌年度4月入園の一斉申込を受付けます。「教育・保育施設等利用のご案内」を入手して準備しましょう。</p>

<h3>保活の全体スケジュール</h3>
<div class="step">
<div class="step-num">1</div>
<div class="step-content">
<strong>4月〜6月：情報収集</strong>
<p>市のホームページで保育園の一覧や空き状況を確認します。</p>
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
<strong>9月〜10月：利用案内の入手・書類準備</strong>
<p>就労証明書などの必要書類を準備します。</p>
</div>
</div>
<div class="step">
<div class="step-num">4</div>
<div class="step-content">
<strong>10月〜11月：申込書類の提出</strong>
<p>子育て給付課の窓口で提出します。</p>
</div>
</div>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>豊中市は基準指数が父母各最大100点（合計200点満点）です。大阪府の自治体は点数の桁が大きい制度が特徴です。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳しくは<a href="https://www.city.toyonaka.osaka.jp/kosodate/hoikusho/tetsuduki/index.html" target="_blank" rel="noopener">豊中市公式サイト</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 55,
  },
  {
    slug: "scoring-system-guide",
    citySlug: "toyonaka",
    title: "豊中市の入園点数のしくみ　基準指数と調整指数を解説",
    description:
      "豊中市の保育園入園選考で使われる基準指数と調整指数のしくみを解説します。",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>豊中市の選考指数とは</h2>
<p>豊中市の認可保育園の入園選考は「基準指数＋調整指数」の合計で行われます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>選考指数 = 基準指数（保護者1 + 保護者2）+ 調整指数</p>
</div>

<h2>基準指数（父母各最大100点、合計200点）</h2>
<p>就労の場合、月20日以上かつ週40時間以上で満点の<span class="highlight">100点</span>です。</p>

<table>
<tr><th>勤務の状況</th><th>指数</th></tr>
<tr><td>月20日以上・週40時間以上</td><td>100</td></tr>
<tr><td>月20日以上・週30時間以上</td><td>90</td></tr>
<tr><td>月16日以上・週24時間以上</td><td>80</td></tr>
<tr><td>月12日以上・週16時間以上</td><td>70</td></tr>
<tr><td>月64時間以上（上記以外）</td><td>60</td></tr>
</table>

<h2>調整指数の代表例</h2>
<ul>
<li>ひとり親世帯：<span class="highlight">+10点</span></li>
<li>きょうだいが在園中の施設を希望：<span class="highlight">+5点</span></li>
<li>認可外保育施設に月64時間以上利用：<span class="highlight">+5点</span></li>
<li>育児休業から復帰予定：<span class="highlight">+5点</span></li>
<li>生活保護世帯：<span class="highlight">+5点</span></li>
</ul>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>全項目は<a href="https://www.city.toyonaka.osaka.jp/kosodate/hoikusho/tetsuduki/nyuushonokijun.html" target="_blank" rel="noopener">豊中市公式サイト</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 65,
  },
  {
    slug: "score-up-tips",
    citySlug: "toyonaka",
    title: "豊中市で入園点数を上げるコツ　加点を最大化する方法",
    description:
      "豊中市の保育園入園選考で調整指数の加点を最大限に活用する方法を解説します。",
    image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>基準指数200点は出発点</h2>
<p>豊中市ではフルタイム共働き世帯は基準指数<span class="highlight">200点</span>で横並びです。差がつくのは調整指数です。</p>

<h2>加点チェックリスト</h2>
<table>
<tr><th>項目</th><th>点数</th><th>条件</th></tr>
<tr><td>ひとり親</td><td>+10</td><td>ひとり親世帯であること</td></tr>
<tr><td>きょうだい在園</td><td>+5</td><td>きょうだいが在園中の施設を希望</td></tr>
<tr><td>認可外利用</td><td>+5</td><td>認可外保育施設に月64時間以上預けている</td></tr>
<tr><td>育休復帰</td><td>+5</td><td>育児休業を取得し入園月に復帰する</td></tr>
<tr><td>生活保護</td><td>+5</td><td>生活保護を受けている</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>豊中市は大阪市に隣接し、交通の便がよいため子育て世代に人気です。特に千里中央・緑地公園周辺は競争が激しくなります。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 60,
  },
  {
    slug: "tiebreaker-rules",
    citySlug: "toyonaka",
    title: "豊中市の同点時の優先順位　点数が同じ場合どうなる？",
    description:
      "豊中市の保育園入園選考で指数が同点になった場合の優先順位のルールを解説します。",
    image: "https://images.unsplash.com/photo-1590650153855-d9e808231d41?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>同点時の優先順位</h2>
<p>豊中市では選考指数が同点の場合、以下の優先順位で入園が決まります。</p>

<h3>主な優先要素</h3>
<ul>
<li>豊中市在住者が優先</li>
<li>保育の必要性が高い世帯</li>
<li>きょうだいの在園状況</li>
<li>世帯の所得が低い方</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>同点勝負では所得の低い世帯が優先されます。世帯年収が高い家庭ほど、確実に加点を取ることが重要です。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 45,
  },
  {
    slug: "part-time-work-score",
    citySlug: "toyonaka",
    title: "豊中市のパート・時短勤務の点数　何時間で何点？",
    description:
      "豊中市の保育園入園で、パートや時短勤務の場合にもらえる基準指数を解説します。",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>パート・時短勤務の基準指数</h2>
<p>豊中市では勤務日数と週あたりの勤務時間の組み合わせで基準指数が決まります。</p>

<table>
<tr><th>勤務パターン</th><th>指数</th></tr>
<tr><td>月20日以上・週40時間以上</td><td>100</td></tr>
<tr><td>月20日以上・週30時間以上</td><td>90</td></tr>
<tr><td>月16日以上・週24時間以上</td><td>80</td></tr>
<tr><td>月12日以上・週16時間以上</td><td>70</td></tr>
<tr><td>月64時間以上（上記以外）</td><td>60</td></tr>
</table>

<h2>パートで入園するには</h2>
<p>週4日・1日6時間のパートなら月16日以上かつ週24時間以上で<span class="highlight">80点</span>です。フルタイム100点との差は20点。調整指数で一部埋めることは可能ですが、両親ともパートだと厳しい場合があります。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>入園要件は月64時間以上の就労です。休憩時間を含み、通勤時間は含みません。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 50,
  },
  {
    slug: "rejection-options",
    citySlug: "toyonaka",
    title: "豊中市で不承諾になったら　次にやるべきこと",
    description:
      "豊中市の保育園入園で不承諾通知が届いた場合の対処法をまとめました。",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=400&fit=crop",
    category: "不承諾対策",
    categoryColor: "rose",
    content: `<h2>不承諾通知が届いたら</h2>
<p>豊中市では4月一斉入所の結果が2月上旬に届きます。不承諾だった場合の選択肢を整理します。</p>

<h3>選択肢</h3>
<ul>
<li>二次募集に申し込む</li>
<li>5月以降の途中入所を申し込む</li>
<li>認可外保育施設を利用しながら翌年度に再申込する</li>
<li>家庭保育所（豊中市の小規模保育）を検討する</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>豊中市では認可外保育施設に預けてから翌年度に再申込すると+5点の加点が得られます。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 40,
  },
  {
    slug: "unlicensed-nursery-bonus",
    citySlug: "toyonaka",
    title: "豊中市で認可外加点を取る方法　対象施設と条件",
    description:
      "豊中市で認可外保育施設の利用による加点を得る方法と注意点を解説します。",
    image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>認可外加点とは</h2>
<p>豊中市では認可外保育施設に月64時間以上預けている場合、調整指数が<span class="highlight">+5点</span>加算されます。</p>

<h2>対象となる条件</h2>
<ul>
<li>認可外保育施設に月ぎめで月64時間以上預けていること</li>
<li>一時保育のみの利用は対象外</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>200点同士の勝負で+5点の加点は大きな差になります。認可外保育施設の費用負担と天秤にかけて判断しましょう。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 45,
  },
  {
    slug: "next-year-changes",
    citySlug: "toyonaka",
    title: "豊中市の保育園事情　最新動向と今後の見通し",
    description:
      "豊中市の保育園整備計画や待機児童の動向など、最新の保育園事情をまとめました。",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=400&fit=crop",
    category: "最新情報",
    categoryColor: "purple",
    content: `<h2>豊中市の保育園事情</h2>
<p>豊中市は大阪府北部の中核市で、大阪市への通勤の便がよく子育て世代に人気があります。</p>

<h2>最近の傾向</h2>
<ul>
<li>千里中央エリアでの新規保育園の開設</li>
<li>小規模保育事業・家庭保育所の拡充</li>
<li>待機児童数は減少傾向にあるが1歳児は依然として競争あり</li>
</ul>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>最新の情報は<a href="https://www.city.toyonaka.osaka.jp/kosodate/hoikusho/index.html" target="_blank" rel="noopener">豊中市公式サイト</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 35,
  },
  {
    slug: "popular-areas",
    citySlug: "toyonaka",
    title: "豊中市の地域別・保育園の入りやすさ",
    description:
      "豊中市内の地域別に保育園の入りやすさを比較し、保活の参考情報をまとめました。",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=400&fit=crop",
    category: "地域情報",
    categoryColor: "teal",
    content: `<h2>豊中市の地域特性</h2>
<p>豊中市は北大阪急行・阪急宝塚線沿線を中心に、地域によって保育園の競争率が異なります。</p>

<h3>競争が激しいエリア</h3>
<ul>
<li>千里中央・桃山台エリア：ファミリー層が多く人気</li>
<li>緑地公園・曽根エリア：交通の便がよく共働き世帯に人気</li>
</ul>

<h3>比較的入りやすいエリア</h3>
<ul>
<li>庄内・三国エリア：大阪市に近く園の数も多い</li>
<li>蛍池エリア：空港近くで競争は比較的穏やか</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>豊中市の保育施設の空き状況は市のホームページで公開されています。希望園選びの参考にしましょう。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 50,
  },
  {
    slug: "competition-reality",
    citySlug: "toyonaka",
    title: "豊中市で保育園に入れる点数の目安　何点あれば安心？",
    description:
      "豊中市の保育園入園に必要な点数の目安を、過去の傾向をもとに解説します。",
    image: "https://images.unsplash.com/photo-1460518451285-97b6aa326961?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>内定に必要な点数の目安</h2>
<p>豊中市の人気園では基準指数200点（フルタイム共働き）に加え、調整指数の加点が必要です。</p>

<h3>目安（1歳児クラス）</h3>
<table>
<tr><th>エリア</th><th>目安の点数</th></tr>
<tr><td>千里中央・桃山台</td><td>205〜210点</td></tr>
<tr><td>緑地公園・曽根</td><td>200〜205点</td></tr>
<tr><td>庄内・蛍池</td><td>200点前後</td></tr>
</table>

<p>0歳児クラスや3歳児以上のクラスは1歳児に比べて入りやすい傾向にあります。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>上記は保護者の口コミ等をもとにした参考値です。公式情報ではありませんのでご了承ください。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 55,
  },
];

registerArticles(articles);
