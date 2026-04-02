import type { Article } from "./types";
import { registerArticles } from "./index";

const articles: Article[] = [
  {
    slug: "hokatsu-schedule",
    citySlug: "kumamoto",
    title: "熊本市の保活スケジュール　申込から内定までの流れ",
    description:
      "熊本市の認可保育園の申込時期・選考の流れをまとめました。令和8年度4月入園の動き方を解説します。",
    image: "https://images.unsplash.com/photo-1484820540004-14229fe36ca4?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>熊本市の4月入園スケジュール</h2>
<p>熊本市の認可保育園は毎年秋に翌年度4月入園の申込を受付けます。「保育所等申込案内」を入手して準備を始めましょう。</p>

<h3>保活の全体スケジュール</h3>
<div class="step">
<div class="step-num">1</div>
<div class="step-content">
<strong>4月〜6月：情報収集</strong>
<p>市のホームページで保育園の一覧や前年度の申込案内を確認します。</p>
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
<strong>9月〜10月：申込案内の入手・書類準備</strong>
<p>最新の申込案内を入手し、就労証明書などを準備します。</p>
</div>
</div>
<div class="step">
<div class="step-num">4</div>
<div class="step-content">
<strong>10月〜11月：申込書類の提出</strong>
<p>各区役所の窓口で申込みます。</p>
</div>
</div>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>熊本市は基準点数が父母各最大100点（合計200点満点）の制度です。就労時間は月単位の合計時間で判定されます。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳しくは<a href="https://www.city.kumamoto.jp/hpkiji/pub/List.aspx?c_id=5&class_set_id=3&class_id=857" target="_blank" rel="noopener">熊本市公式サイト</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 55,
  },
  {
    slug: "scoring-system-guide",
    citySlug: "kumamoto",
    title: "熊本市の入園点数のしくみ　基準点数と調整点数を解説",
    description:
      "熊本市の保育園入園選考で使われる基準点数と調整点数のしくみを解説します。",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>熊本市の選考点数とは</h2>
<p>熊本市の認可保育園は「基準点数＋調整点数」の合計で選考されます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>選考点数 ＝ 基準点数（父＋母）＋ 調整点数</p>
</div>

<h2>基準点数（父母各最大100点、合計200点）</h2>
<p>就労の場合、月160時間以上（月20日以上・1日8時間以上）で満点の<span class="highlight">100点</span>です。</p>

<table>
<tr><th>就労の状況</th><th>点数</th></tr>
<tr><td>月160時間以上（月20日以上・1日8時間以上）</td><td>100</td></tr>
<tr><td>月120時間以上（月20日以上・1日6時間以上）</td><td>90</td></tr>
<tr><td>月96時間以上（月16日以上・1日6時間以上）</td><td>80</td></tr>
<tr><td>月64時間以上（月12日以上・1日4時間以上）</td><td>70</td></tr>
<tr><td>月48時間以上（上記以外）</td><td>60</td></tr>
</table>

<h2>調整点数の代表例</h2>
<ul>
<li>ひとり親世帯：<span class="highlight">+10点</span></li>
<li>小規模保育卒園に伴う転所：<span class="highlight">+10点</span></li>
<li>きょうだいが在園中の園を希望：<span class="highlight">+5点</span></li>
<li>認可外施設に預けている：<span class="highlight">+5点</span></li>
<li>育休復帰予定：<span class="highlight">+5点</span></li>
<li>生活保護世帯：<span class="highlight">+5点</span></li>
<li>きょうだい同時申込：<span class="highlight">+3点</span></li>
</ul>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>全項目は<a href="https://www.city.kumamoto.jp/hpkiji/pub/List.aspx?c_id=5&class_set_id=3&class_id=857" target="_blank" rel="noopener">熊本市公式サイト</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 65,
  },
  {
    slug: "score-up-tips",
    citySlug: "kumamoto",
    title: "熊本市で入園点数を上げるコツ　加点を最大化する方法",
    description:
      "熊本市の保育園入園選考で調整点数の加点を最大限に活用する方法を解説します。",
    image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>基準点数200点は出発点</h2>
<p>熊本市ではフルタイム共働き世帯は基準点数<span class="highlight">200点</span>で横並びです。差がつくのは調整点数です。</p>

<h2>加点チェックリスト</h2>
<table>
<tr><th>項目</th><th>点数</th><th>条件</th></tr>
<tr><td>ひとり親世帯</td><td>+10点</td><td>母子・父子家庭の場合</td></tr>
<tr><td>小規模保育卒園</td><td>+10点</td><td>小規模保育等の卒園に伴う転所</td></tr>
<tr><td>きょうだい在園</td><td>+5点</td><td>在園中の園を希望</td></tr>
<tr><td>認可外施設利用</td><td>+5点</td><td>月ぎめで認可外に預けている</td></tr>
<tr><td>育休復帰予定</td><td>+5点</td><td>入園月に職場復帰する場合</td></tr>
<tr><td>生活保護</td><td>+5点</td><td>生活保護を受けている場合</td></tr>
<tr><td>きょうだい同時申込</td><td>+3点</td><td>双子など同時に申し込む場合</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>熊本市では小規模保育の卒園加点が<span class="highlight">+10点</span>と大きいです。0歳から小規模保育に入り、3歳で認可に転所する戦略は非常に有効です。</p>
</div>

<h2>就労内定の場合</h2>
<p>熊本市には「就労内定」の区分があります。月160時間以上相当の内定で80点、月48時間以上で60点です。就労中と比べて最大20点の差があります。</p>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>就労証明書の内容は実態に合わせてください。虚偽記載は入園取消しの対象です。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 100,
  },
  {
    slug: "tiebreaker-rules",
    citySlug: "kumamoto",
    title: "熊本市で同点になったらどうなる？優先順位を解説",
    description:
      "熊本市の保育園入園選考で同点だった場合の優先順位の判定方法を解説します。",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>同点時の判定方法</h2>
<p>熊本市の入園選考で合計点数が同点になった場合、さらに細かい優先順位で判定が行われます。</p>

<h2>同点時に考慮される要素</h2>
<ul>
<li>ひとり親世帯は優先</li>
<li>所得が低い世帯が優先</li>
<li>きょうだいが在園している園への申込は優先</li>
<li>保育の必要性がより高い世帯が優先</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>熊本市の200点制では、フルタイム共働きの200点に調整点数が加算されます。5点刻みの加点が多いため、同点の世帯が発生しやすい構造です。</p>
</div>

<h2>同点回避のために</h2>
<p>認可外利用（+5点）、育休復帰（+5点）、きょうだい在園（+5点）を組み合わせることで同点リスクを下げられます。複数の加点を積めるかどうかがカギです。</p>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>熊本市の中心部は競争率が高い傾向にあります。加点なしの200点だけでは人気園の1歳児クラスは厳しい場合があります。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 85,
  },
  {
    slug: "part-time-work-score",
    citySlug: "kumamoto",
    title: "熊本市で時短勤務だと点数はどう変わる？",
    description:
      "熊本市の保育園入園選考で時短勤務の場合の基準点数への影響を解説します。",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>熊本市の時短勤務と基準点数</h2>
<p>熊本市は月の合計就労時間で基準点数が決まります。</p>

<table>
<tr><th>月の就労時間</th><th>基準点数</th></tr>
<tr><td>月160時間以上</td><td>100点</td></tr>
<tr><td>月120時間以上160時間未満</td><td>90点</td></tr>
<tr><td>月96時間以上120時間未満</td><td>80点</td></tr>
<tr><td>月64時間以上96時間未満</td><td>70点</td></tr>
<tr><td>月48時間以上64時間未満</td><td>60点</td></tr>
</table>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>月20日勤務で1日6時間の時短勤務の場合、月120時間で基準点数は<span class="highlight">90点</span>です。フルタイムの100点と比べて10点下がり、夫婦で合計20点の差が生まれます。</p>
</div>

<h2>月160時間の壁</h2>
<p>満点の100点を得るには月160時間以上が必要です。1日8時間×20日＝160時間がちょうど満点ラインです。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>1日7時間勤務（月140時間）でも月160時間に届かないため90点になります。満点を取るには1日8時間以上が必要です。調整点数で補うことも検討しましょう。</p>
</div>

<h2>対策</h2>
<p>フルタイムで復帰し、入園確定後に時短に切り替えるのも選択肢のひとつです。就労証明書は復帰時の勤務条件で記載します。</p>`,
    publishedAt: "2026-03-28",
    popularity: 90,
  },
  {
    slug: "rejection-options",
    citySlug: "kumamoto",
    title: "熊本市で保育園に落ちたときの選択肢",
    description:
      "熊本市の認可保育園に不承諾となった場合の対応策をまとめました。",
    image: "https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>不承諾になったら</h2>
<p>熊本市で認可保育園に不承諾になった場合でも、複数の対応策があります。</p>

<h3>1. 二次選考への申込</h3>
<p>一次選考後に辞退者が出た枠で二次選考が行われます。</p>

<h3>2. 認可外保育施設の利用</h3>
<p>認可外保育施設を利用することで、翌年度の申込で<span class="highlight">+5点</span>の加点が見込めます。</p>

<h3>3. 小規模保育の利用</h3>
<p>小規模保育事業を利用し、卒園時に認可保育園へ転所する方法があります。卒園に伴う転所で<span class="highlight">+10点</span>の加点が得られます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>熊本市の小規模保育卒園加点（+10点）は非常に大きいです。0歳から小規模保育に入れて3歳で認可保育園に転所する計画は有力な選択肢です。</p>
</div>

<h3>4. 途中入園</h3>
<p>転居や退園で空きが出た場合に途中入園が可能です。</p>

<h3>5. 育休延長</h3>
<p>不承諾通知があれば育休を最長2歳まで延長できます。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>空き状況は<a href="https://www.city.kumamoto.jp/hpkiji/pub/List.aspx?c_id=5&class_set_id=3&class_id=857" target="_blank" rel="noopener">熊本市公式サイト</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 80,
  },
  {
    slug: "unlicensed-nursery-bonus",
    citySlug: "kumamoto",
    title: "熊本市で認可外保育施設の利用で加点を得る方法",
    description:
      "熊本市では認可外保育施設に月ぎめで預けると+5点の加点が得られます。その条件と活用法を解説します。",
    image: "https://images.unsplash.com/photo-1587654780291-39c9404d7dd0?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>認可外利用で+5点の加点</h2>
<p>熊本市では認可外保育施設に月ぎめで預けている場合、調整点数で<span class="highlight">+5点</span>の加点が得られます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>認可外利用（+5点）と育休復帰（+5点）を合わせると+10点の加算です。基準点数200点＋10点＝210点で入園の可能性が大幅に高まります。</p>
</div>

<h2>対象となる施設</h2>
<ul>
<li>認可外保育施設</li>
<li>企業主導型保育施設</li>
</ul>

<h2>小規模保育の卒園加点も注目</h2>
<p>熊本市では小規模保育等の卒園に伴う転所で<span class="highlight">+10点</span>の加点があります。</p>

<table>
<tr><th>方法</th><th>加点</th></tr>
<tr><td>認可外保育施設に月ぎめで預ける</td><td>+5点</td></tr>
<tr><td>小規模保育の卒園に伴う転所</td><td>+10点</td></tr>
</table>

<h2>認可外保育施設の探し方</h2>
<p>熊本市内の認可外保育施設は市のホームページで一覧を確認できます。見学をして保育環境や安全面を確認してから利用を決めましょう。</p>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>認可外保育施設の保育料は施設ごとに異なります。認可保育園に比べて高額になることが一般的ですので、費用面も含めて検討してください。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 75,
  },
  {
    slug: "next-year-changes",
    citySlug: "kumamoto",
    title: "熊本市の令和8年度入園　変更点と注意事項",
    description:
      "熊本市の令和8年度保育園入園選考の注意点をまとめました。",
    image: "https://images.unsplash.com/photo-1506784365847-bbad939e9335?w=800&h=400&fit=crop",
    category: "最新情報",
    categoryColor: "purple",
    content: `<h2>令和8年度の注意点</h2>
<p>熊本市の保育園入園制度は毎年見直しが行われます。最新の「保育所等申込案内」で変更点を確認しましょう。</p>

<h2>確認すべきポイント</h2>
<ul>
<li>基準点数・調整点数の変更有無</li>
<li>新設園の情報</li>
<li>定員の増減</li>
<li>「就労内定」の取り扱い</li>
<li>申込方法や提出書類の変更</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>熊本市には「就労内定」（最大80点）の区分があります。転職予定の方は就労中と内定で基準点数が異なることに注意しましょう。</p>
</div>

<h2>熊本市の保育事情</h2>
<p>熊本市は政令指定都市として保育園の整備を進めています。中心部と郊外で保育園の充足状況が異なります。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>最新情報は<a href="https://www.city.kumamoto.jp/hpkiji/pub/List.aspx?c_id=5&class_set_id=3&class_id=857" target="_blank" rel="noopener">熊本市公式サイト</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 70,
  },
  {
    slug: "popular-areas",
    citySlug: "kumamoto",
    title: "熊本市の人気エリアと入りやすい地域の傾向",
    description:
      "熊本市内で保育園の競争率が高いエリアと比較的入りやすい地域を解説します。",
    image: "https://images.unsplash.com/photo-1524813686514-a57563d77965?w=800&h=400&fit=crop",
    category: "エリア情報",
    categoryColor: "teal",
    content: `<h2>熊本市の保育園事情</h2>
<p>熊本市は中央区・東区・西区・南区・北区の5つの行政区に分かれています。中心部ほど保育需要が高い傾向です。</p>

<h2>競争率が高い傾向のエリア</h2>
<ul>
<li>中央区：市の中心部で交通利便性が高く子育て世帯に人気</li>
<li>東区（健軍・長嶺周辺）：住宅地として人気のエリア</li>
</ul>

<h2>比較的入りやすい傾向のエリア</h2>
<ul>
<li>西区：郊外で保育園の選択肢が比較的多い</li>
<li>南区：住宅地として安定したエリア</li>
<li>北区：中心部から離れると競争率が下がる傾向</li>
</ul>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>エリアの難易度は年度や年齢クラスによって変わります。最新の空き状況を市に確認してください。</p>
</div>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>熊本市は車での送迎が一般的です。通勤経路上の園も含めて幅広く希望園を検討しましょう。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 60,
  },
  {
    slug: "competition-reality",
    citySlug: "kumamoto",
    title: "熊本市の保育園入園競争の実態",
    description:
      "熊本市の保育園入園はどのくらい厳しいのか。200点制の選考の実態を解説します。",
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>熊本市の入園競争の現状</h2>
<p>熊本市は政令指定都市の中では保育園の整備が比較的進んでいますが、中心部や人気エリアでは競争があります。</p>

<h2>ボリュームゾーン</h2>
<p>フルタイム共働き世帯は基準点数<span class="highlight">200点</span>で横並びです。調整点数の加点で差がつきます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>認可外利用や育休復帰の+5点を組み合わせると、200点＋10〜15点＝<span class="highlight">210〜215点</span>が入園ボーダーの目安になります。中心部ではこの水準が求められることがあります。</p>
</div>

<h2>年齢別の傾向</h2>
<ul>
<li>0歳児クラス：地域によっては入りやすい場合がある</li>
<li>1歳児クラス：最も競争が激しい年齢</li>
<li>2歳児クラス：空きが少ない</li>
<li>3歳児以上：小規模保育卒園組が入ってくるが枠も増える</li>
</ul>

<h2>求職中の入園</h2>
<p>求職活動中の基準点数は<span class="highlight">50点</span>で、就労中（最大100点）の半分です。求職中での入園は中心部では厳しい状況です。</p>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>就労内定の場合は最大80点で、就労中の100点より20点低くなります。入園選考においては不利になることを理解しておきましょう。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 95,
  },
];

registerArticles(articles);
