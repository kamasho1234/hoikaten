import type { Article } from "./types";
import { registerArticles } from "./index";

const articles: Article[] = [
  {
    slug: "hokatsu-schedule",
    citySlug: "chiyoda",
    title: "千代田区の保活スケジュール　申込から内定までの流れ",
    description:
      "千代田区の認可保育園・こども園の申込時期と流れをまとめました。令和8年度4月入園の動き方を解説します。",
    image: "https://images.unsplash.com/photo-1484820540004-14229fe36ca4?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>千代田区の4月入園スケジュール</h2>
<p>千代田区は人口が少ない分、認可保育園の数も限られています。早めの情報収集がカギです。</p>

<h3>保活の全体スケジュール</h3>
<div class="step">
<div class="step-num">1</div>
<div class="step-content">
<strong>4月〜6月：情報収集</strong>
<p>区のホームページで「保育園・こども園等の入園案内」を確認します。</p>
</div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content">
<strong>6月〜9月：保育園見学</strong>
<p>園の数が限られるため、早めに見学予約を入れましょう。</p>
</div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content">
<strong>9月〜10月：案内を入手・書類準備</strong>
<p>最新の入園案内を入手し、就労証明書などを揃えます。</p>
</div>
</div>
<div class="step">
<div class="step-num">4</div>
<div class="step-content">
<strong>10月〜11月：申込書類の提出</strong>
<p>窓口または郵送で提出。締切を厳守しましょう。</p>
</div>
</div>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>千代田区は基本指数が父母各最大10点（合計20点満点）です。園の数が少ないため、通園可能な園はすべて希望に入れるのが鉄則です。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳しくは<a href="https://www.city.chiyoda.lg.jp/koho/kosodate/hoiku/ninka/index.html" target="_blank" rel="noopener">千代田区公式サイト</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 55,
  },
  {
    slug: "scoring-system-guide",
    citySlug: "chiyoda",
    title: "千代田区の入園点数のしくみ　基準指数と調整指数を解説",
    description:
      "千代田区の保育園入園選考で使われる「基準指数」と「調整指数」のしくみを解説します。",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>千代田区の選考指数とは</h2>
<p>千代田区の認可保育園・こども園の入園選考は「基準指数＋調整指数」の合計で行われます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>選考指数 ＝ 基準指数（父＋母）＋ 調整指数</p>
</div>

<h2>基準指数（父母各最大10点、合計20点）</h2>
<p>就労の場合、週5日以上かつ1日8時間以上で満点の<span class="highlight">10点</span>になります。</p>

<table>
<tr><th>就労の状況</th><th>指数</th></tr>
<tr><td>週5日以上・1日8時間以上</td><td>10</td></tr>
<tr><td>週5日以上・1日6時間以上8時間未満</td><td>9</td></tr>
<tr><td>週4日以上・1日8時間以上</td><td>9</td></tr>
<tr><td>週4日以上・1日6時間以上8時間未満</td><td>8</td></tr>
<tr><td>週3日以上・1日8時間以上</td><td>8</td></tr>
<tr><td>週3日以上・1日4時間以上8時間未満</td><td>7</td></tr>
<tr><td>月48時間以上（上記以外）</td><td>6</td></tr>
</table>

<h2>調整指数の代表例</h2>
<ul>
<li>ひとり親世帯：<span class="highlight">+3点</span></li>
<li>きょうだいが在園中の園への転園希望：<span class="highlight">+3点</span></li>
<li>きょうだいが在園中の園を希望：<span class="highlight">+2点</span></li>
<li>育休1年半以上で復帰予定：<span class="highlight">+2点</span></li>
<li>6ヶ月以上待機：<span class="highlight">+2点</span></li>
<li>きょうだい同時申込：<span class="highlight">+1点</span></li>
<li>育休1年以上1年半未満で復帰：<span class="highlight">+1点</span></li>
</ul>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>千代田区では、同居の65歳未満で保育可能な方がいる場合は<span class="highlight">-1点</span>の減点になります。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>全項目は<a href="https://www.city.chiyoda.lg.jp/koho/kosodate/hoiku/ninka/index.html" target="_blank" rel="noopener">千代田区公式サイト</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 65,
  },
  {
    slug: "score-up-tips",
    citySlug: "chiyoda",
    title: "千代田区で入園点数を上げるコツ　加点と減点のチェック",
    description:
      "千代田区の保育園入園選考で加点を最大化し、減点を回避する方法を解説します。",
    image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>基本指数20点は必須ライン</h2>
<p>千代田区の基本指数は父母各10点の合計20点満点です。フルタイム共働きで20点が基本ラインとなります。</p>

<h2>加点チェックリスト</h2>
<table>
<tr><th>項目</th><th>点数</th><th>条件</th></tr>
<tr><td>ひとり親世帯</td><td>+3点</td><td>母子・父子家庭の場合</td></tr>
<tr><td>きょうだい在園（転園）</td><td>+3点</td><td>在園中の園への転園希望</td></tr>
<tr><td>きょうだい在園（同園希望）</td><td>+2点</td><td>在園中の園を希望</td></tr>
<tr><td>育休復帰（1年半以上）</td><td>+2点</td><td>育休を1年半以上取得して復帰</td></tr>
<tr><td>6ヶ月以上待機</td><td>+2点</td><td>不承諾から6ヶ月以上経過</td></tr>
<tr><td>育休復帰（1年以上1年半未満）</td><td>+1点</td><td>育休を1年以上取得して復帰</td></tr>
<tr><td>きょうだい同時申込</td><td>+1点</td><td>双子など同時申込</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>千代田区では育休の長さによって加点が異なります。1年半以上の育休で+2点、1年以上1年半未満で+1点です。</p>
</div>

<h2>減点に注意</h2>
<p>千代田区には減点項目があります。</p>
<ul>
<li>同居の65歳未満で保育可能な方がいる場合：<span class="highlight">-1点</span></li>
</ul>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>祖父母と同居している場合、保育可能な状態であれば-1点の減点対象になります。祖父母が就労中であれば減点されない場合もありますので、区に確認しましょう。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 100,
  },
  {
    slug: "tiebreaker-rules",
    citySlug: "chiyoda",
    title: "千代田区で同点になったらどうなる？優先順位を解説",
    description:
      "千代田区の保育園入園選考で同点だった場合の優先順位の判定方法を解説します。",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>同点時の判定</h2>
<p>千代田区の入園選考で合計指数が同点になった場合、優先順位で判定されます。千代田区は人口が少ないとはいえ、人気園では同点の世帯が並ぶことがあります。</p>

<h2>同点時に考慮される要素</h2>
<ul>
<li>ひとり親世帯は優先</li>
<li>所得が低い世帯が優先</li>
<li>きょうだいが在園している園への申込は優先</li>
<li>待機期間が長い方が優先</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>千代田区では待機期間に応じた加点があるため（6ヶ月以上で+2点、3ヶ月以上で+1点）、長く待機するほど次回選考で有利になります。</p>
</div>

<h2>同点回避の戦略</h2>
<p>千代田区は調整指数の加点幅が比較的小さい（最大+3点）ため、基本指数で満点を取ることが前提です。その上で待機実績やきょうだい加点を積むことが重要です。</p>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>減点項目（同居の保育可能者がいる場合-1点）を見落とさないようにしましょう。申告漏れがあると後から減点される可能性があります。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 85,
  },
  {
    slug: "part-time-work-score",
    citySlug: "chiyoda",
    title: "千代田区で時短勤務だと点数はどう変わる？",
    description:
      "千代田区の保育園入園選考で時短勤務の場合の基準指数への影響を解説します。",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>時短勤務と基準指数の関係</h2>
<p>千代田区の基準指数は「勤務日数」と「1日の勤務時間」の組み合わせで決まります。</p>

<table>
<tr><th>勤務パターン</th><th>基準指数</th></tr>
<tr><td>週5日以上・1日8時間以上</td><td>10点</td></tr>
<tr><td>週5日以上・1日6時間以上8時間未満</td><td>9点</td></tr>
<tr><td>週4日以上・1日8時間以上</td><td>9点</td></tr>
<tr><td>週4日以上・1日6時間以上8時間未満</td><td>8点</td></tr>
<tr><td>週3日以上・1日8時間以上</td><td>8点</td></tr>
<tr><td>週3日以上・1日4時間以上8時間未満</td><td>7点</td></tr>
</table>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>週5日で6時間の時短勤務の場合、基準指数は10点ではなく<span class="highlight">9点</span>になります。夫婦とも時短の場合は合計で2点下がります。</p>
</div>

<h2>週4日勤務でも8時間なら9点</h2>
<p>千代田区の特徴として、週4日以上・1日8時間以上の場合も<span class="highlight">9点</span>が付与されます。週5日・6時間と同点です。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>フルタイムで復帰する予定であれば、就労証明書にフルタイムの時間を記載できます。復帰後の勤務形態をよく検討しましょう。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 90,
  },
  {
    slug: "rejection-options",
    citySlug: "chiyoda",
    title: "千代田区で保育園に落ちたときの選択肢",
    description:
      "千代田区の認可保育園に不承諾となった場合の対応策をまとめました。",
    image: "https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>不承諾になったら</h2>
<p>千代田区は園の数が限られるため、不承諾になった場合の選択肢を事前に考えておくことが重要です。</p>

<h3>1. 二次選考への申込</h3>
<p>一次選考後の辞退者枠を対象に二次選考が行われます。</p>

<h3>2. 認可外保育施設の利用</h3>
<p>千代田区内や近隣区の認証保育所、企業主導型保育施設を探しましょう。</p>

<h3>3. 待機実績を積む</h3>
<p>千代田区では待機期間に応じた加点があります。</p>
<ul>
<li>6ヶ月以上待機：<span class="highlight">+2点</span></li>
<li>3ヶ月以上6ヶ月未満待機：<span class="highlight">+1点</span></li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>不承諾後に待機を続ければ加点が蓄積されます。認可外に預けながら翌年度に再挑戦するのが一般的な戦略です。</p>
</div>

<h3>4. 近隣区も視野に入れる</h3>
<p>千代田区は園の数が少ないため、通勤経路上の他区の認可外保育施設も検討する価値があります。</p>

<h3>5. 育休延長</h3>
<p>不承諾通知があれば育休を最長2歳まで延長可能です。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>最新情報は<a href="https://www.city.chiyoda.lg.jp/koho/kosodate/hoiku/ninka/index.html" target="_blank" rel="noopener">千代田区公式サイト</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 80,
  },
  {
    slug: "unlicensed-nursery-bonus",
    citySlug: "chiyoda",
    title: "千代田区で認可外保育施設を活用する方法",
    description:
      "千代田区の入園選考における認可外保育施設の活用法と、待機加点の仕組みを解説します。",
    image: "https://images.unsplash.com/photo-1587654780291-39c9404d7dd0?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>認可外利用と加点の関係</h2>
<p>千代田区の調整指数には認可外保育施設の利用に対する直接的な加点は大きくありません。しかし、認可外を利用しながら待機実績を積むことで間接的に加点につながります。</p>

<h2>待機実績による加点</h2>
<table>
<tr><th>待機期間</th><th>加点</th></tr>
<tr><td>6ヶ月以上</td><td>+2点</td></tr>
<tr><td>3ヶ月以上6ヶ月未満</td><td>+1点</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>認可外に預けて仕事を続けながら、認可保育園の待機として登録を続けることで加点が貯まります。翌年度の再申込で有利になります。</p>
</div>

<h2>千代田区周辺の認可外保育施設</h2>
<p>千代田区内の認可外は数が限られますが、以下のような選択肢があります。</p>
<ul>
<li>認証保育所</li>
<li>企業主導型保育施設</li>
<li>近隣区（中央区、港区、文京区など）の施設</li>
</ul>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>認可外保育施設は施設によって質や保育料が大きく異なります。必ず見学してから契約しましょう。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 75,
  },
  {
    slug: "next-year-changes",
    citySlug: "chiyoda",
    title: "千代田区の令和8年度入園　変更点と注意事項",
    description:
      "千代田区の令和8年度保育園入園選考の注意点をまとめました。",
    image: "https://images.unsplash.com/photo-1506784365847-bbad939e9335?w=800&h=400&fit=crop",
    category: "最新情報",
    categoryColor: "purple",
    content: `<h2>令和8年度の注意点</h2>
<p>千代田区は人口が少ない一方で保育園の数も限られており、入園の難易度は決して低くありません。最新の入園案内を確認しましょう。</p>

<h2>確認すべきポイント</h2>
<ul>
<li>基準指数・調整指数の変更点</li>
<li>新設園や定員変更の情報</li>
<li>申込方法（電子申請の導入状況）</li>
<li>減点項目の変更有無</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>千代田区は減点項目（同居の保育可能者-1点）がある珍しい自治体です。この項目の扱いに変更がないか毎年確認しましょう。</p>
</div>

<h2>千代田区の特徴的な制度</h2>
<p>千代田区では育休の取得期間によって加点が異なります（1年半以上で+2点、1年以上で+1点）。この制度に変更がないか確認してください。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>最新の入園案内は<a href="https://www.city.chiyoda.lg.jp/koho/kosodate/hoiku/ninka/index.html" target="_blank" rel="noopener">千代田区公式サイト</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 70,
  },
  {
    slug: "popular-areas",
    citySlug: "chiyoda",
    title: "千代田区の人気エリアと保育園事情",
    description:
      "千代田区内の保育園事情とエリアごとの傾向を解説します。",
    image: "https://images.unsplash.com/photo-1524813686514-a57563d77965?w=800&h=400&fit=crop",
    category: "エリア情報",
    categoryColor: "teal",
    content: `<h2>千代田区の保育園事情</h2>
<p>千代田区は東京23区で最も人口が少ない区ですが、オフィス街に住む子育て世帯のニーズは高く、園の数も限られています。</p>

<h2>主な居住エリア</h2>
<ul>
<li>番町・麹町エリア：住宅地として人気。保育園の競争も激しい傾向</li>
<li>飯田橋・富士見エリア：ファミリー向けマンションが増加</li>
<li>神田・岩本町エリア：住宅が増えつつある地域</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>千代田区は面積が小さく園の数も限られるため、エリアの選び分けよりも通える園すべてを希望に入れることが重要です。</p>
</div>

<h2>こども園という選択肢</h2>
<p>千代田区にはこども園もあります。保育園だけでなくこども園も選択肢に入れることで、入園の可能性が広がります。</p>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>千代田区は園の数が少ないため、年度や年齢クラスによって状況が大きく変わります。最新の空き状況を区に確認してください。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 60,
  },
  {
    slug: "competition-reality",
    citySlug: "chiyoda",
    title: "千代田区の保育園入園競争の実態",
    description:
      "千代田区の保育園入園はどのくらい厳しいのか。少人口ゆえの特徴を解説します。",
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>千代田区の入園競争の特徴</h2>
<p>千代田区は人口が少ない分、保育園の定員も少なく、少数の枠を巡る競争になります。「人口が少ない＝入りやすい」とは限りません。</p>

<h2>ボリュームゾーン</h2>
<p>フルタイム共働き世帯は基本指数<span class="highlight">20点</span>で横並びです。調整指数の加点幅が小さい（最大+3点）ため、小さな差が合否を左右します。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>千代田区は調整指数の加点が最大+3点と他区より小さめです。そのぶん同点になりやすく、同点時の優先順位（所得の低さなど）が重要になります。</p>
</div>

<h2>年齢別の傾向</h2>
<ul>
<li>0歳児クラス：定員が少なく競争率が高い</li>
<li>1歳児クラス：最も激戦</li>
<li>2歳児クラス：空きが少ない</li>
<li>3歳児以上：持ち上がりが多く空き枠は限定的</li>
</ul>

<h2>減点項目に注意</h2>
<p>千代田区では同居の65歳未満の保育可能者がいる場合に<span class="highlight">-1点</span>の減点があります。祖父母と同居している場合は注意が必要です。</p>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>求職活動中の基準指数は4点です。就労中（最大10点）との差が大きく、求職中での入園はかなり厳しい状況です。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 95,
  },
];

registerArticles(articles);
