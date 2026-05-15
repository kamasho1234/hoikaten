import type { Article } from "./types";
import { registerArticles } from "./index";

const articles: Article[] = [
  {
    slug: "hokatsu-schedule",
    citySlug: "kasuga",
    title: "春日市の保活スケジュール　申込から内定までの流れ",
    description:
      "春日市の認可保育園の申込時期・選考の流れをまとめました。令和8年度4月入園の動き方を解説します。",
    image: "https://images.unsplash.com/photo-1484820540004-14229fe36ca4?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>春日市の4月入園スケジュール</h2>
<p>春日市の認可保育園は毎年秋に翌年度4月入園の一斉申込を受付けます。こども未来部保育課が窓口です。</p>

<h3>保活の全体スケジュール</h3>
<div class="step">
<div class="step-num">1</div>
<div class="step-content">
<strong>4月〜6月：情報収集</strong>
<p>市のホームページで保育園の一覧や空き状況を確認します。春日市には認可保育園が約20か所あります。</p>
</div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content">
<strong>6月〜9月：保育園見学</strong>
<p>気になる園に連絡して見学を予約しましょう。JR春日駅・西鉄春日原駅周辺の園は人気があります。</p>
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
<p>こども未来部保育課の窓口で提出します。</p>
</div>
</div>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>春日市は基準指数が父母各最大20点（合計40点満点）です。フルタイム共働きで40点が出発点になります。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳しくは<a href="https://www.city.kasuga.fukuoka.jp/kosodate/kosodate/hoikusho/index.html" target="_blank" rel="noopener">春日市公式サイト</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 55,
  },
  {
    slug: "scoring-system-guide",
    citySlug: "kasuga",
    title: "春日市の入園点数のしくみ　基準指数と調整指数を解説",
    description:
      "春日市の保育園入園選考で使われる基準指数と調整指数のしくみを解説します。",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>春日市の選考指数とは</h2>
<p>春日市の認可保育園の入園選考は「基準指数＋調整指数」の合計で行われます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>選考指数 = 基準指数（保護者1 + 保護者2）+ 調整指数</p>
</div>

<h2>基準指数（父母各最大20点、合計40点）</h2>
<p>就労の場合、月20日以上かつ週40時間以上で満点の<span class="highlight">20点</span>です。</p>

<table>
<tr><th>勤務の状況</th><th>指数</th></tr>
<tr><td>月20日以上・週40時間以上</td><td>20</td></tr>
<tr><td>月20日以上・週30時間以上</td><td>18</td></tr>
<tr><td>月16日以上・週24時間以上</td><td>16</td></tr>
<tr><td>月12日以上・週16時間以上</td><td>14</td></tr>
<tr><td>月48時間以上（上記以外）</td><td>10</td></tr>
</table>

<h2>調整指数の代表例</h2>
<ul>
<li>ひとり親世帯：<span class="highlight">+5点</span></li>
<li>きょうだいが在園中の施設を希望：<span class="highlight">+3点</span></li>
<li>認可外保育施設を利用中：<span class="highlight">+3点</span></li>
<li>育児休業から復帰予定：<span class="highlight">+2点</span></li>
<li>生活保護世帯：<span class="highlight">+3点</span></li>
<li>市外からの申込み：<span class="highlight">-10点</span></li>
</ul>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>全項目は<a href="https://www.city.kasuga.fukuoka.jp/kosodate/kosodate/hoikusho/index.html" target="_blank" rel="noopener">春日市公式サイト</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 65,
  },
  {
    slug: "score-up-tips",
    citySlug: "kasuga",
    title: "春日市で入園点数を上げるコツ　加点を最大化する方法",
    description:
      "春日市の保育園入園選考で調整指数の加点を最大限に活用する方法を解説します。",
    image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>基準指数40点は出発点</h2>
<p>春日市ではフルタイム共働き世帯は基準指数<span class="highlight">40点</span>で横並びです。差がつくのは調整指数です。</p>

<h2>加点チェックリスト</h2>
<table>
<tr><th>項目</th><th>点数</th><th>条件</th></tr>
<tr><td>ひとり親</td><td>+5</td><td>ひとり親世帯であること</td></tr>
<tr><td>きょうだい在園</td><td>+3</td><td>きょうだいが在園中の施設を希望</td></tr>
<tr><td>同時申込</td><td>+2</td><td>きょうだいと同時に申し込む</td></tr>
<tr><td>認可外利用</td><td>+3</td><td>認可外保育施設に月ぎめで預けている</td></tr>
<tr><td>育休復帰</td><td>+2</td><td>育児休業を取得し入園月に復帰する</td></tr>
<tr><td>生活保護</td><td>+3</td><td>生活保護を受けている</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>春日市は人口約11万人、福岡市のベッドタウンとして子育て世帯に人気があります。天神・博多へのアクセスがよく、人気園では40点に加えて加点が必要になります。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 60,
  },
  {
    slug: "tiebreaker-rules",
    citySlug: "kasuga",
    title: "春日市の同点時の優先順位　点数が同じ場合どうなる？",
    description:
      "春日市の保育園入園選考で指数が同点になった場合の優先順位のルールを解説します。",
    image: "https://images.unsplash.com/photo-1590650153855-d9e808231d41?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>同点時の優先順位</h2>
<p>春日市では選考指数が同点の場合、以下の優先順位で入園が決まります。</p>

<h3>主な優先要素</h3>
<ul>
<li>春日市在住者が優先</li>
<li>保育の必要性が高い世帯</li>
<li>きょうだいの在園状況</li>
<li>世帯の所得が低い方</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>同点勝負では所得の低い世帯が優先されます。世帯年収が高い家庭ほど、確実に加点を取ることが重要です。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 45,
  },
  {
    slug: "part-time-work-score",
    citySlug: "kasuga",
    title: "春日市のパート・時短勤務の点数　何時間で何点？",
    description:
      "春日市の保育園入園で、パートや時短勤務の場合にもらえる基準指数を解説します。",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>パート・時短勤務の基準指数</h2>
<p>春日市では勤務日数と週あたりの勤務時間の組み合わせで基準指数が決まります。</p>

<table>
<tr><th>勤務パターン</th><th>指数</th></tr>
<tr><td>月20日以上・週40時間以上</td><td>20</td></tr>
<tr><td>月20日以上・週30時間以上</td><td>18</td></tr>
<tr><td>月16日以上・週24時間以上</td><td>16</td></tr>
<tr><td>月12日以上・週16時間以上</td><td>14</td></tr>
<tr><td>月48時間以上（上記以外）</td><td>10</td></tr>
</table>

<h2>パートで入園するには</h2>
<p>週4日・1日6時間のパートなら月16日以上かつ週24時間以上で<span class="highlight">16点</span>です。フルタイム20点との差は4点。調整指数で一部埋めることは可能ですが、両親ともパートだと厳しい場合があります。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>入園要件は月48時間以上の就労です。休憩時間を含み、通勤時間は含みません。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 50,
  },
  {
    slug: "rejection-options",
    citySlug: "kasuga",
    title: "春日市で不承諾になったら　次にやるべきこと",
    description:
      "春日市の保育園入園で不承諾通知が届いた場合の対処法をまとめました。",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=400&fit=crop",
    category: "不承諾対策",
    categoryColor: "rose",
    content: `<h2>不承諾通知が届いたら</h2>
<p>春日市では4月一斉入所の結果が2月上旬に届きます。不承諾だった場合の選択肢を整理します。</p>

<h3>選択肢</h3>
<ul>
<li>二次募集に申し込む</li>
<li>5月以降の途中入所を申し込む</li>
<li>認可外保育施設を利用しながら翌年度に再申込する</li>
<li>小規模保育事業を検討する</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>春日市では認可外保育施設に預けてから翌年度に再申込すると+3点の加点が得られます。費用はかかりますが、翌年の入園確率を上げる有効な手段です。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 40,
  },
  {
    slug: "unlicensed-nursery-bonus",
    citySlug: "kasuga",
    title: "春日市で認可外加点を取る方法　対象施設と条件",
    description:
      "春日市で認可外保育施設の利用による加点を得る方法と注意点を解説します。",
    image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>認可外加点とは</h2>
<p>春日市では認可外保育施設に月ぎめで預けている場合、調整指数が<span class="highlight">+3点</span>加算されます。</p>

<h2>対象となる条件</h2>
<ul>
<li>認可外保育施設に月ぎめで預けていること</li>
<li>一時保育のみの利用は対象外</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>40点同士の勝負で+3点の加点は大きな差になります。認可外保育施設の費用負担と天秤にかけて判断しましょう。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 45,
  },
  {
    slug: "next-year-changes",
    citySlug: "kasuga",
    title: "春日市の保育園事情　最新動向と今後の見通し",
    description:
      "春日市の保育園整備計画や待機児童の動向など、最新の保育園事情をまとめました。",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=400&fit=crop",
    category: "最新情報",
    categoryColor: "purple",
    content: `<h2>春日市の保育園事情</h2>
<p>春日市は人口約11万人の福岡県中西部の市です。福岡市の南側に隣接するベッドタウンとして発展し、天神・博多へのアクセスのよさから子育て世帯にも人気があります。</p>

<h2>最近の傾向</h2>
<ul>
<li>認可保育園は約20か所で、JR春日駅・西鉄春日原駅周辺に多く集まっている</li>
<li>小規模保育事業の整備が進んでいる</li>
<li>待機児童数は減少傾向にあるが1歳児クラスは依然として競争あり</li>
</ul>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>最新の情報は<a href="https://www.city.kasuga.fukuoka.jp/kosodate/kosodate/hoikusho/index.html" target="_blank" rel="noopener">春日市公式サイト</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 35,
  },
  {
    slug: "popular-areas",
    citySlug: "kasuga",
    title: "春日市の地域別・保育園の入りやすさ",
    description:
      "春日市内の地域別に保育園の入りやすさを比較し、保活の参考情報をまとめました。",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=400&fit=crop",
    category: "地域情報",
    categoryColor: "teal",
    content: `<h2>春日市の地域特性</h2>
<p>春日市はJR鹿児島本線と西鉄天神大牟田線の2路線が通り、地域によって保育園の競争率が異なります。</p>

<h3>競争が激しいエリア</h3>
<ul>
<li>JR春日駅周辺：市の中心部でファミリー層が多い</li>
<li>西鉄春日原駅周辺：商業施設が充実し、共働き世帯に人気</li>
</ul>

<h3>比較的入りやすいエリア</h3>
<ul>
<li>春日公園周辺：大きな公園があり、保育環境が整っている</li>
<li>白水・昇町エリア：新興住宅地で園の整備が進んでいる</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>春日市の保育施設の空き状況はこども未来部保育課で確認できます。希望園選びの参考にしましょう。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 50,
  },
  {
    slug: "competition-reality",
    citySlug: "kasuga",
    title: "春日市で保育園に入れる点数の目安　何点あれば安心？",
    description:
      "春日市の保育園入園に必要な点数の目安を、過去の傾向をもとに解説します。",
    image: "https://images.unsplash.com/photo-1460518451285-97b6aa326961?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>内定に必要な点数の目安</h2>
<p>春日市の人気園では基準指数40点（フルタイム共働き）に加え、調整指数の加点が必要です。</p>

<h3>目安（1歳児クラス）</h3>
<table>
<tr><th>エリア</th><th>目安の点数</th></tr>
<tr><td>JR春日駅・西鉄春日原駅周辺</td><td>43〜45点</td></tr>
<tr><td>その他の地域</td><td>40〜43点</td></tr>
</table>

<p>0歳児クラスや3歳児以上のクラスは1歳児に比べて入りやすい傾向にあります。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>上記は保護者の口コミ等をもとにした参考値です。公式情報ではありませんのでご了承ください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 55,
  },
];

registerArticles(articles);
