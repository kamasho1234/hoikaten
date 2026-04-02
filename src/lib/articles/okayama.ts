import type { Article } from "./types";
import { registerArticles } from "./index";

const articles: Article[] = [
  {
    slug: "hokatsu-schedule",
    citySlug: "okayama",
    title: "岡山市の保活スケジュール　申込から内定までの流れ",
    description:
      "岡山市の認可保育園の申込時期・選考の流れをまとめました。令和8年度4月入園の動き方を解説します。",
    image: "https://images.unsplash.com/photo-1484820540004-14229fe36ca4?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>岡山市の4月入園スケジュール</h2>
<p>岡山市の認可保育園は毎年秋に翌年度4月入園の申込を受付けます。「保育利用ガイド」を入手して情報を整理しましょう。</p>

<h3>保活の全体スケジュール</h3>
<div class="step">
<div class="step-num">1</div>
<div class="step-content">
<strong>4月〜6月：情報収集</strong>
<p>市のホームページで保育園の一覧や前年度のガイドを確認します。</p>
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
<strong>9月〜10月：保育利用ガイドの入手・書類準備</strong>
<p>最新のガイドを入手し、就労証明書などを準備します。</p>
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
<p>岡山市は基礎点数が父母各最大100点（合計200点満点）の制度です。東京の10〜20点制とは点数の桁が異なります。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳しくは<a href="https://www.city.okayama.jp/kurashi/category/7-5-1-0-0-0-0-0-0-0.html" target="_blank" rel="noopener">岡山市公式サイト</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 55,
  },
  {
    slug: "scoring-system-guide",
    citySlug: "okayama",
    title: "岡山市の入園点数のしくみ　基礎点数と調整点数を解説",
    description:
      "岡山市の保育園入園選考で使われる基礎点数と調整点数のしくみを解説します。",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>岡山市の選考点数とは</h2>
<p>岡山市の認可保育園は「基礎点数＋調整点数」の合計で選考されます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>選考点数 ＝ 基礎点数（父＋母）＋ 調整点数</p>
</div>

<h2>基礎点数（父母各最大100点、合計200点）</h2>
<p>就労の場合、月20日以上かつ週40時間以上で満点の<span class="highlight">100点</span>です。</p>

<table>
<tr><th>就労の状況</th><th>点数</th></tr>
<tr><td>月20日以上・週40時間以上</td><td>100</td></tr>
<tr><td>月20日以上・週30時間以上40時間未満</td><td>90</td></tr>
<tr><td>月16日以上・週24時間以上</td><td>80</td></tr>
<tr><td>月12日以上・週16時間以上</td><td>70</td></tr>
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
<p>全項目は<a href="https://www.city.okayama.jp/kurashi/category/7-5-1-0-0-0-0-0-0-0.html" target="_blank" rel="noopener">岡山市公式サイト</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 65,
  },
  {
    slug: "score-up-tips",
    citySlug: "okayama",
    title: "岡山市で入園点数を上げるコツ　加点を最大化する方法",
    description:
      "岡山市の保育園入園選考で調整点数の加点を最大限に活用する方法を解説します。",
    image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>基礎点数200点は出発点</h2>
<p>岡山市ではフルタイム共働き世帯は基礎点数<span class="highlight">200点</span>で横並びです。差がつくのは調整点数の部分です。</p>

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
<p>岡山市では小規模保育の卒園加点が<span class="highlight">+10点</span>と大きいです。0歳から小規模保育に入り、3歳で認可に転所する戦略は非常に有効です。</p>
</div>

<h2>就労内定の場合</h2>
<p>岡山市には「就労内定」の区分もあります。週40時間以上相当の内定で80点、月48時間以上の内定で60点です。現在就労中の方は内定ではなく就労の区分で申し込めます。</p>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>就労証明書の内容は実態に合わせてください。虚偽記載は入園取消しの対象です。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 100,
  },
  {
    slug: "tiebreaker-rules",
    citySlug: "okayama",
    title: "岡山市で同点になったらどうなる？優先順位を解説",
    description:
      "岡山市の保育園入園選考で同点だった場合の優先順位の判定方法を解説します。",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>同点時の判定方法</h2>
<p>岡山市の入園選考で合計点数が同点になった場合、細かい優先順位で判定が行われます。200点満点制のため同点になりにくいように見えますが、フルタイム世帯は200点で並びます。</p>

<h2>同点時に考慮される要素</h2>
<ul>
<li>ひとり親世帯は優先</li>
<li>所得が低い世帯が優先</li>
<li>きょうだいが在園している園への申込は優先</li>
<li>保育の必要性がより高い世帯が優先</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>岡山市は調整点数の幅が大きい（最大+10点）ため、加点の有無で5〜10点の差がつきます。同点回避のためにも使える加点は漏れなく申請しましょう。</p>
</div>

<h2>同点回避のために</h2>
<p>基礎点数200点に加えて、認可外利用（+5点）、育休復帰（+5点）、きょうだい在園（+5点）などの加点を積むことが重要です。</p>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>岡山市の中心部は競争率が高くなります。加点なしの200点のみでは、人気園の1歳児クラスは厳しい状況です。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 85,
  },
  {
    slug: "part-time-work-score",
    citySlug: "okayama",
    title: "岡山市で時短勤務だと点数はどう変わる？",
    description:
      "岡山市の保育園入園選考で時短勤務の場合の基礎点数への影響を解説します。",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>岡山市の時短勤務と基礎点数</h2>
<p>岡山市は「月の勤務日数」と「週の勤務時間」の組み合わせで基礎点数が決まります。</p>

<table>
<tr><th>勤務パターン</th><th>基礎点数</th></tr>
<tr><td>月20日以上・週40時間以上</td><td>100点</td></tr>
<tr><td>月20日以上・週30時間以上40時間未満</td><td>90点</td></tr>
<tr><td>月16日以上・週24時間以上</td><td>80点</td></tr>
<tr><td>月12日以上・週16時間以上</td><td>70点</td></tr>
<tr><td>月48時間以上（上記以外）</td><td>60点</td></tr>
</table>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>週30時間の時短勤務の場合、基礎点数は100点ではなく<span class="highlight">90点</span>になります。夫婦で各10点下がると合計20点の差が生まれます。200点制とはいえ20点の差は大きいです。</p>
</div>

<h2>週40時間の壁</h2>
<p>満点の100点を得るには「月20日以上・週40時間以上」が必要です。1日8時間×5日＝40時間がちょうど満点ラインです。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>時短勤務で90点になる場合は、調整点数で差を埋める必要があります。育休復帰（+5点）や認可外利用（+5点）で補いましょう。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 90,
  },
  {
    slug: "rejection-options",
    citySlug: "okayama",
    title: "岡山市で保育園に落ちたときの選択肢",
    description:
      "岡山市の認可保育園に不承諾となった場合の対応策をまとめました。",
    image: "https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>不承諾になったら</h2>
<p>岡山市で認可保育園に不承諾になった場合でも、複数の選択肢があります。</p>

<h3>1. 二次選考への申込</h3>
<p>一次選考後の辞退者枠で二次選考が行われます。</p>

<h3>2. 認可外保育施設の利用</h3>
<p>認可外保育施設を利用することで、翌年度の申込で<span class="highlight">+5点</span>の加点が見込めます。</p>

<h3>3. 小規模保育の利用</h3>
<p>小規模保育事業を利用し、卒園時に認可保育園へ転所する方法があります。卒園に伴う転所で<span class="highlight">+10点</span>の加点が得られます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>岡山市では小規模保育の卒園加点が+10点と非常に大きいです。認可保育園への転所を視野に入れた小規模保育の利用は有効な戦略です。</p>
</div>

<h3>4. 途中入園</h3>
<p>空きが出た場合に途中入園が可能です。市のホームページで空き状況を確認しましょう。</p>

<h3>5. 育休延長</h3>
<p>不承諾通知があれば育休を最長2歳まで延長できます。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>空き状況は<a href="https://www.city.okayama.jp/kurashi/category/7-5-1-0-0-0-0-0-0-0.html" target="_blank" rel="noopener">岡山市公式サイト</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 80,
  },
  {
    slug: "unlicensed-nursery-bonus",
    citySlug: "okayama",
    title: "岡山市で認可外保育施設の利用で加点を得る方法",
    description:
      "岡山市では認可外保育施設に月ぎめで預けると+5点の加点が得られます。その条件を解説します。",
    image: "https://images.unsplash.com/photo-1587654780291-39c9404d7dd0?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>認可外利用で+5点の加点</h2>
<p>岡山市では認可外保育施設に月ぎめで預けている場合、調整点数で<span class="highlight">+5点</span>の加点が得られます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>認可外利用+5点と育休復帰+5点を合わせると+10点の加算になります。200点からの+10点は入園の可能性を大きく高めます。</p>
</div>

<h2>対象となる施設</h2>
<ul>
<li>認可外保育施設</li>
<li>企業主導型保育施設</li>
<li>その他の認可外施設</li>
</ul>

<h2>小規模保育の卒園加点も注目</h2>
<p>岡山市では小規模保育等の卒園に伴う転所で<span class="highlight">+10点</span>の加点があります。0歳から小規模保育を利用し、3歳児クラスで認可に転所する計画も検討しましょう。</p>

<table>
<tr><th>方法</th><th>加点</th></tr>
<tr><td>認可外保育施設に月ぎめで預ける</td><td>+5点</td></tr>
<tr><td>小規模保育の卒園に伴う転所</td><td>+10点</td></tr>
</table>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>認可外保育施設は施設によって保育料や環境が異なります。見学して安全面を確認してから契約しましょう。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 75,
  },
  {
    slug: "next-year-changes",
    citySlug: "okayama",
    title: "岡山市の令和8年度入園　変更点と注意事項",
    description:
      "岡山市の令和8年度保育園入園選考の注意点をまとめました。",
    image: "https://images.unsplash.com/photo-1506784365847-bbad939e9335?w=800&h=400&fit=crop",
    category: "最新情報",
    categoryColor: "purple",
    content: `<h2>令和8年度の注意点</h2>
<p>岡山市の保育園入園制度は毎年見直しが行われます。最新の「保育利用ガイド」で変更点を確認しましょう。</p>

<h2>確認すべきポイント</h2>
<ul>
<li>基礎点数・調整点数の変更有無</li>
<li>新設園の情報</li>
<li>定員の増減</li>
<li>「就労内定」の取り扱い変更</li>
<li>申込方法や提出書類の変更</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>岡山市には「就労内定」（最大80点）という独自の区分があります。この区分の取り扱いに変更がないか確認しましょう。</p>
</div>

<h2>岡山市の保育事情</h2>
<p>岡山市は政令指定都市として保育園の整備を進めています。中心部の北区・中区と郊外部では保育園の充足状況が異なります。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>最新情報は<a href="https://www.city.okayama.jp/kurashi/category/7-5-1-0-0-0-0-0-0-0.html" target="_blank" rel="noopener">岡山市公式サイト</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 70,
  },
  {
    slug: "popular-areas",
    citySlug: "okayama",
    title: "岡山市の人気エリアと入りやすい地域の傾向",
    description:
      "岡山市内で保育園の競争率が高いエリアと比較的入りやすい地域の傾向を解説します。",
    image: "https://images.unsplash.com/photo-1524813686514-a57563d77965?w=800&h=400&fit=crop",
    category: "エリア情報",
    categoryColor: "teal",
    content: `<h2>岡山市の保育園事情</h2>
<p>岡山市は北区・中区・東区・南区の4つの行政区に分かれています。中心部ほど保育園の競争率が高い傾向にあります。</p>

<h2>競争率が高い傾向のエリア</h2>
<ul>
<li>北区中心部（岡山駅周辺）：交通利便性が高く子育て世帯に人気</li>
<li>中区：住宅地として人気が高いエリア</li>
</ul>

<h2>比較的入りやすい傾向のエリア</h2>
<ul>
<li>南区：郊外で保育園の選択肢が比較的多い</li>
<li>東区：住宅地として落ち着いたエリア</li>
<li>北区郊外：中心部から離れると競争率が下がる傾向</li>
</ul>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>エリアの難易度は年度や年齢クラスによって変わります。前年度の実績が必ずしも当てはまるとは限りません。</p>
</div>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>岡山市は車社会のため、通勤経路上の園も視野に入れると選択肢が広がります。送迎の動線を考えて希望園を選びましょう。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 60,
  },
  {
    slug: "competition-reality",
    citySlug: "okayama",
    title: "岡山市の保育園入園競争の実態",
    description:
      "岡山市の保育園入園はどのくらい厳しいのか。200点制の選考の実態を解説します。",
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>岡山市の入園競争の現状</h2>
<p>岡山市は政令指定都市の中では比較的保育園の整備が進んでいますが、中心部や人気エリアでは依然として競争があります。</p>

<h2>ボリュームゾーン</h2>
<p>フルタイム共働き世帯は基礎点数<span class="highlight">200点</span>で横並びです。調整点数の加点で差がつきます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>岡山市の調整点数は最大+10点（ひとり親、小規模卒園）です。認可外利用や育休復帰の+5点を組み合わせると、200点＋10〜15点＝<span class="highlight">210〜215点</span>が入園ボーダーの目安です。</p>
</div>

<h2>年齢別の傾向</h2>
<ul>
<li>0歳児クラス：定員が少ない園もあるが、比較的入りやすい年齢</li>
<li>1歳児クラス：最も競争が激しい年齢</li>
<li>2歳児クラス：空きが少ない</li>
<li>3歳児以上：小規模保育卒園組が入ってくるが枠も増える</li>
</ul>

<h2>求職中の入園</h2>
<p>求職活動中の基礎点数は<span class="highlight">50点</span>で、就労中（最大100点）の半分です。求職中での入園は中心部では難しい状況です。</p>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>就労内定の場合は最大80点で、就労中の100点より20点低くなります。内定段階での申込は不利になることを理解しておきましょう。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 95,
  },
];

registerArticles(articles);
