import type { Article } from "./types";
import { registerArticles } from "./index";

const articles: Article[] = [
  {
    slug: "hokatsu-schedule",
    citySlug: "kurashiki",
    title: "倉敷市の保活スケジュール　申込から内定までの流れ",
    description:
      "倉敷市の認可保育園の申込時期・選考の流れをまとめました。令和8年度4月入園の動き方を解説します。",
    image: "https://images.unsplash.com/photo-1484820540004-14229fe36ca4?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>倉敷市の4月入園スケジュール</h2>
<p>倉敷市の認可保育園は毎年秋に翌年度4月入園の申込を受付けます。「入園・入所申込み案内」を入手して情報を整理しましょう。</p>

<h3>保活の全体スケジュール</h3>
<div class="step">
<div class="step-num">1</div>
<div class="step-content">
<strong>4月〜6月：情報収集</strong>
<p>市のホームページで保育園の一覧や前年度の申込み案内を確認します。</p>
</div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content">
<strong>6月〜9月：保育園見学</strong>
<p>気になる園に連絡して見学を予約しましょう。倉敷・水島・児島・玉島・真備の各地区で園の特色が異なります。</p>
</div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content">
<strong>10月〜11月：申込書類の準備・提出</strong>
<p>就労証明書などを準備し、保育・幼稚園課または各支所の福祉課に提出します。</p>
</div>
</div>
<div class="step">
<div class="step-num">4</div>
<div class="step-content">
<strong>2月：結果通知</strong>
<p>内定または不承諾の結果が届きます。</p>
</div>
</div>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>倉敷市は基礎点数が父母各最大10点（合計20点満点）の制度です。東京23区の10〜20点制と点数の桁は似ていますが、配点基準が異なります。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳しくは<a href="https://www.city.kurashiki.okayama.jp/kosodate/hoikuen/1012645/1021369.html" target="_blank" rel="noopener">倉敷市公式サイト</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 55,
  },
  {
    slug: "scoring-system-guide",
    citySlug: "kurashiki",
    title: "倉敷市の入園点数のしくみ　基本指数と調整指数を解説",
    description:
      "倉敷市の保育園入園選考で使われる基本指数と調整指数のしくみを解説します。",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>倉敷市の選考点数とは</h2>
<p>倉敷市の認可保育園は「基本指数＋調整指数」の合計で選考されます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>選考点数 ＝ 基本指数（父＋母）＋ 調整指数</p>
</div>

<h2>基本指数（父母各最大10点、合計20点）</h2>
<p>就労（外勤・自営）の場合、月160時間以上で満点の<span class="highlight">10点</span>です。</p>

<table>
<tr><th>就労の状況</th><th>点数</th></tr>
<tr><td>月160時間以上</td><td>10</td></tr>
<tr><td>月120時間以上</td><td>8</td></tr>
<tr><td>月80時間以上</td><td>6</td></tr>
<tr><td>月48時間以上</td><td>4</td></tr>
</table>

<h2>調整指数の代表例</h2>
<ul>
<li>ひとり親世帯：<span class="highlight">+1点</span></li>
<li>転居に伴う利用希望：<span class="highlight">+3点</span></li>
<li>転園希望：<span class="highlight">+3点</span></li>
<li>保育士として勤務（月160時間以上）：<span class="highlight">+3点</span></li>
<li>生活保護世帯：<span class="highlight">+1点</span></li>
<li>障害のある子ども：<span class="highlight">+1点</span></li>
<li>多子世帯（就学前3人以上）：<span class="highlight">+1点</span></li>
</ul>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>全項目は<a href="https://www.city.kurashiki.okayama.jp/kosodate/hoikuen/1012645/1021369.html" target="_blank" rel="noopener">倉敷市公式サイト</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 60,
  },
  {
    slug: "score-up-tips",
    citySlug: "kurashiki",
    title: "倉敷市で入園点数を上げるコツ　加点を最大化する方法",
    description:
      "倉敷市の保育園入園選考で調整指数の加点を最大限に活用する方法を解説します。",
    image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>基本指数20点は出発点</h2>
<p>倉敷市ではフルタイム共働き世帯は基本指数<span class="highlight">20点</span>で横並びです。差がつくのは調整指数の部分です。</p>

<h2>加点チェックリスト</h2>
<table>
<tr><th>項目</th><th>点数</th><th>条件</th></tr>
<tr><td>ひとり親世帯</td><td>+1点</td><td>母子・父子家庭の場合</td></tr>
<tr><td>転居に伴う利用</td><td>+3点</td><td>転入先の住所で申し込む場合</td></tr>
<tr><td>転園希望</td><td>+3点</td><td>現在利用中の園から別の園へ</td></tr>
<tr><td>保育士加点</td><td>+3点</td><td>月160時間以上の保育士勤務</td></tr>
<tr><td>多子世帯</td><td>+1点</td><td>就学前の子ども3人以上</td></tr>
<tr><td>障害のある子ども</td><td>+1点</td><td>障害者手帳・療育手帳保持</td></tr>
<tr><td>生活保護</td><td>+1点</td><td>生活保護受給中</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>倉敷市は20点満点の制度のため、+1点の加点でも大きな差になります。使える加点は漏れなく申請しましょう。</p>
</div>

<h2>農業・内職の場合</h2>
<p>倉敷市には「農業の家族従業者」（最大8点）と「内職」（最大5点）の区分があります。外勤・自営（最大10点）と比べて点数が低くなるため注意が必要です。</p>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>就労証明書の内容は実態に合わせてください。虚偽記載は入園取消しの対象です。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 55,
  },
  {
    slug: "tiebreaker-rules",
    citySlug: "kurashiki",
    title: "倉敷市で同点になったらどうなる？優先順位を解説",
    description:
      "倉敷市の保育園入園選考で同点だった場合の優先順位の判定方法を解説します。",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>同点時の判定方法</h2>
<p>倉敷市の入園選考で合計点数が同点になった場合、細かい優先順位で判定が行われます。20点満点制のため、フルタイム共働き世帯の多くが20点で並びます。</p>

<h2>同点時に考慮される要素</h2>
<ul>
<li>ひとり親世帯は優先</li>
<li>所得が低い世帯が優先</li>
<li>保育の必要性がより高い世帯が優先</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>倉敷市の調整指数は+1〜3点の刻みです。ひとり親（+1点）や転園（+3点）の有無で差がつきます。同点回避のためにも使える加点は漏れなく申請しましょう。</p>
</div>

<h2>同点回避のために</h2>
<p>基本指数20点に加えて、転園希望（+3点）や保育士加点（+3点）などの調整指数を積むことが重要です。</p>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>倉敷市の中心部や人気エリアは競争率が高くなります。加点なしの20点のみでは、人気園の1歳児クラスは厳しい状況です。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 45,
  },
  {
    slug: "part-time-work-score",
    citySlug: "kurashiki",
    title: "倉敷市で時短勤務だと点数はどう変わる？",
    description:
      "倉敷市の保育園入園選考で時短勤務の場合の基本指数への影響を解説します。",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>倉敷市の時短勤務と基本指数</h2>
<p>倉敷市は「月あたりの就労時間」で基本指数が決まります。</p>

<table>
<tr><th>月の就労時間</th><th>基本指数</th></tr>
<tr><td>月160時間以上</td><td>10点</td></tr>
<tr><td>月120時間以上</td><td>8点</td></tr>
<tr><td>月80時間以上</td><td>6点</td></tr>
<tr><td>月48時間以上</td><td>4点</td></tr>
</table>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>月120時間の時短勤務の場合、基本指数は10点ではなく<span class="highlight">8点</span>になります。夫婦で各2点下がると合計4点の差が生まれます。20点満点制で4点の差は非常に大きいです。</p>
</div>

<h2>月160時間の壁</h2>
<p>満点の10点を得るには「月160時間以上」が必要です。1日8時間×月20日＝160時間がちょうど満点ラインです。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>育児休業法に基づく育児短時間勤務の場合、倉敷市では短時間勤務の時間ではなく、雇用契約上の正規の時間で判定されます。就労証明書には正規の勤務時間を記入できます。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 50,
  },
  {
    slug: "rejection-options",
    citySlug: "kurashiki",
    title: "倉敷市で保育園に落ちたときの選択肢",
    description:
      "倉敷市の認可保育園に不承諾となった場合の対応策をまとめました。",
    image: "https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>不承諾になったら</h2>
<p>倉敷市で認可保育園に不承諾になった場合でも、複数の選択肢があります。</p>

<h3>1. 二次選考への申込</h3>
<p>一次選考後の辞退者枠で二次選考が行われます。第2希望以下の施設で調整されます。</p>

<h3>2. 途中入園</h3>
<p>空きが出た場合に途中入園が可能です。毎月の利用調整で補欠者として待機し、順次案内されます。</p>

<h3>3. 認可外保育施設の利用</h3>
<p>認可外保育施設や企業主導型保育施設を利用する方法があります。</p>

<h3>4. 小規模保育の利用</h3>
<p>小規模保育事業を利用し、卒園時に認可保育園への転園を目指す方法もあります。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>倉敷市では転園希望で<span class="highlight">+3点</span>の調整指数が得られます。いったん小規模保育に入り、3歳で認可園に転園する戦略は有効です。</p>
</div>

<h3>5. 育休延長</h3>
<p>不承諾通知があれば育休を最長2���まで延長できます。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>空き状況は<a href="https://www.city.kurashiki.okayama.jp/hoikuinfo/" target="_blank" rel="noopener">倉敷市施設情報ページ</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 45,
  },
  {
    slug: "nursery-teacher-bonus",
    citySlug: "kurashiki",
    title: "倉敷市の保育士加点で+3点を得る方法",
    description:
      "倉敷市では保育士が市内の保育園で勤務する場合、最大+3点の調整指数が得られます。その条件を解説します。",
    image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>保育士加点で最大+3点</h2>
<p>倉敷市では保育士資格を持ち、倉敷市内の保育園で保育に従事する保護者に対して、調整指数で加点が得られます。</p>

<table>
<tr><th>就労時間</th><th>加点</th></tr>
<tr><td>月160時間以上の勤務</td><td><span class="highlight">+3点</span></td></tr>
<tr><td>月160時間未満の勤務</td><td>+1点</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>保育士加点+3点は倉敷市の調整指数の中で最大級です。20点満点制で+3点の加点は入園の可能性を大きく高めます。</p>
</div>

<h2>加点の条件</h2>
<ul>
<li>保育士資格を保有していること</li>
<li>倉敷市内の保育園で保育に従事していること</li>
<li>就労時間に応じて+3点または+1点</li>
</ul>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>保育士加点は倉敷市内の保育園で勤務する場合に限られます。市外の園で勤務する場合は対象外です。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 35,
  },
  {
    slug: "next-year-changes",
    citySlug: "kurashiki",
    title: "倉敷市の令和8年度入園　変更点と注意事項",
    description:
      "倉敷市の令和8年度保育園入園選考の注意点をまとめました。",
    image: "https://images.unsplash.com/photo-1506784365847-bbad939e9335?w=800&h=400&fit=crop",
    category: "最新情報",
    categoryColor: "purple",
    content: `<h2>令和8年度の注意点</h2>
<p>倉敷市の保育園入園制度は毎年見直しが行われます。最新の「入園・入所申込み案内」で変更点を確認しましょう。</p>

<h2>確認すべきポイント</h2>
<ul>
<li>基本指数・調整指数の変更有無</li>
<li>新設園の情報</li>
<li>定員の増減</li>
<li>申込方法や提出書類の変更</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>倉敷市には「農業の家族従業者」（最大8点）や「内職」（最大5点）など、他の自治体にはない独自の就労区分があります。自分に該当する区分を正しく選びましょう。</p>
</div>

<h2>倉敷市の保育事情</h2>
<p>倉敷市は岡山県内で岡山市に次ぐ規模の中核市です。倉敷地区・水島地区・児島地区・玉島地区・真備地区で保育園の充足状況が異なります。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>最新情報は<a href="https://www.city.kurashiki.okayama.jp/kosodate/hoikuen/1012645/1021369.html" target="_blank" rel="noopener">倉敷市公式サイト</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 40,
  },
  {
    slug: "popular-areas",
    citySlug: "kurashiki",
    title: "倉敷市の人気エリアと入りやすい地域の傾向",
    description:
      "倉敷市内で保育園の競争率が高いエリアと比較的入りやすい地域の傾向を解説します。",
    image: "https://images.unsplash.com/photo-1524813686514-a57563d77965?w=800&h=400&fit=crop",
    category: "エリア情報",
    categoryColor: "teal",
    content: `<h2>倉敷市の保育園事情</h2>
<p>倉敷市は倉敷・水島・児島・玉島・真備の5つの地区に分かれています。地区によって保育園の数や競争率が異なります。</p>

<h2>競争率が高い傾向のエリア</h2>
<ul>
<li>倉敷駅周辺：交通利便性が高く子育て世帯に人気</li>
<li>水島地区中心部：工業地帯に近く共働き世帯が多い</li>
</ul>

<h2>比較的入りやすい傾向のエリア</h2>
<ul>
<li>真備地区：郊外で保育園の選択肢が比較的ある</li>
<li>児島地区：倉敷中心部から離れているため競争率が下がる傾向</li>
<li>玉島地区郊外：中心部から離れると入りやすくなる傾向</li>
</ul>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>エリアの難易度は年度や年齢クラスによって変わります。前年度の実績が必ずしも当てはまるとは限りません。</p>
</div>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>倉敷市は車社会のため、通勤経路上の園も視野に入れると選択肢が広がります。送迎の動線を考えて希望園を選びましょう。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 35,
  },
  {
    slug: "competition-reality",
    citySlug: "kurashiki",
    title: "倉敷市の保育園入園競争の実態",
    description:
      "倉敷市の保育園入園はどのくらい厳しいのか。20点制の選考の実態を解説します。",
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>倉敷市の入園競争の現状</h2>
<p>倉敷市は中核市として保育園の整備を進めていますが、中心部や人気エリアでは依然として競争があります。</p>

<h2>ボリュームゾーン</h2>
<p>フルタイム共働き世帯は基本指数<span class="highlight">20点</span>で横並びです。調整指数の加点で差がつきます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>倉敷市の調整指数は最大+3点（転園・転居・保育士加点）です。���とり親（+1点）や多子世帯（+1点）を組み合わせると、20点＋3〜4点＝<span class="highlight">23〜24点</span>が入園ボーダーの目安です。</p>
</div>

<h2>年齢別の傾向</h2>
<ul>
<li>0歳児クラス：定員が少ない園もあるが、比較的入りやすい年齢</li>
<li>1歳児クラス：最も競争が激しい年齢</li>
<li>2歳児クラス：空きが少ない</li>
<li>3歳児以上：小規模保育からの転園組もあるが枠も増える</li>
</ul>

<h2>求職中の入園</h2>
<p>求職活動中の基本指数は<span class="highlight">1点</span>で、就労中（最大10点）と大きな差があります。求職中での入園は中心部では非常に難しい状況です。</p>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>保育料の滞納があると<span class="highlight">-10点</span>の大きな減点が適用されます。保育料は必ず期限内に納付しましょう。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 50,
  },
];

registerArticles(articles);
