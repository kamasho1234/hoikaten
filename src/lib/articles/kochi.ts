import type { Article } from "./types";
import { registerArticles } from "./index";

const articles: Article[] = [
  {
    slug: "hokatsu-schedule",
    citySlug: "kochi",
    title: "高知市の保活スケジュール　申込から内定までの流れ",
    description:
      "高知市の認可保育園の申込時期・選考の流れをまとめました。令和8年度4月入園の動き方を解説します。",
    image: "https://images.unsplash.com/photo-1484820540004-14229fe36ca4?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>高知市の4月入園スケジュール</h2>
<p>高知市の認可保育園は毎年秋に翌年度4月入園の申込を受付けます。利用承諾基準を理解して準備を進めましょう。</p>

<h3>保活の全体スケジュール</h3>
<div class="step">
<div class="step-num">1</div>
<div class="step-content">
<strong>4月〜6月：情報収集</strong>
<p>高知市のホームページで保育施設の一覧と空き状況を確認します。</p>
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
<p>高知市は基本指数が父母各最大100点（合計200点満点）の制度です。令和6年度から利用承諾基準が改定されています。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳しくは<a href="https://www.city.kochi.kochi.jp/soshiki/34/hoikusisetsu-moshikomi.html" target="_blank" rel="noopener">高知市公式サイト</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 55,
  },
  {
    slug: "scoring-system-guide",
    citySlug: "kochi",
    title: "高知市の入園点数のしくみ　利用承諾基準を解説",
    description:
      "高知市の保育園入園選考で使われる利用承諾基準のしくみを解説します。",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>高知市の利用承諾基準とは</h2>
<p>高知市の認可保育園は各家庭の保育の必要性を指数化し、指数の高い児童から順次利用承諾を行います。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>選考指数 ＝ 基本指数（父＋母）＋ 調整指数</p>
</div>

<h2>基本指数（父母各最大100点、合計200点）</h2>
<p>就労の場合、月170時間以上で満点の<span class="highlight">100点</span>です。</p>

<table>
<tr><th>月の就労時間</th><th>指数</th></tr>
<tr><td>月170時間以上</td><td>100</td></tr>
<tr><td>月140時間以上170時間未満</td><td>90</td></tr>
<tr><td>月120時間以上140時間未満</td><td>85</td></tr>
<tr><td>月100時間以上120時間未満</td><td>75</td></tr>
<tr><td>月80時間以上100時間未満</td><td>65</td></tr>
<tr><td>月64時間以上80時間未満</td><td>55</td></tr>
</table>

<h2>調整指数の代表例</h2>
<ul>
<li>ひとり親世帯：<span class="highlight">+31点</span></li>
<li>きょうだいが利用中の施設を希望：<span class="highlight">+20点</span></li>
<li>小規模保育等の卒園に伴う転所：<span class="highlight">+15点</span></li>
<li>生活保護世帯：<span class="highlight">+10点</span></li>
<li>認可外保育施設利用中：<span class="highlight">+8点</span></li>
<li>育休復帰予定：<span class="highlight">+5点</span></li>
<li>多子世帯（3人目以上）：<span class="highlight">+3点</span></li>
</ul>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>全項目は<a href="https://www.city.kochi.kochi.jp/soshiki/34/nyushoshodakukijun.html" target="_blank" rel="noopener">高知市公式サイト</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 60,
  },
  {
    slug: "score-up-tips",
    citySlug: "kochi",
    title: "高知市で入園点数を上げるコツ　加点チェックリスト",
    description:
      "高知市の保育園入園選考で調整指数の加点を最大限に活用する方法を解説します。",
    image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>基本指数200点は出発点</h2>
<p>高知市ではフルタイム共働き世帯は基本指数<span class="highlight">200点</span>で横並びです。差がつくのは調整指数の加点です。</p>

<h2>加点チェックリスト</h2>
<table>
<tr><th>項目</th><th>点数</th><th>条件</th></tr>
<tr><td>ひとり親世帯</td><td>+31点</td><td>母子・父子家庭の場合</td></tr>
<tr><td>きょうだい在園施設を希望</td><td>+20点</td><td>きょうだいが利用中の施設を希望</td></tr>
<tr><td>小規模保育卒園</td><td>+15点</td><td>小規模保育等の卒園に伴う転所</td></tr>
<tr><td>生活保護世帯</td><td>+10点</td><td>生活保護を受けている場合</td></tr>
<tr><td>認可外利用</td><td>+8点</td><td>認可外保育施設に月ぎめで利用中</td></tr>
<tr><td>育休復帰予定</td><td>+5点</td><td>入園月に職場復帰する場合</td></tr>
<tr><td>多子世帯（3人目以上）</td><td>+3点</td><td>3人目以降の子ども</td></tr>
<tr><td>多子世帯（2人目）</td><td>+2点</td><td>2人目の子ども</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>高知市では認可外利用（+8点）が大きな加点です。不承諾だった場合は認可外に預けて翌年度の申込に備えましょう。</p>
</div>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>就労証明書の月間就労時間は正確に記載してください。実態と異なる記載は入園取消しの対象です。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 55,
  },
  {
    slug: "tiebreaker-rules",
    citySlug: "kochi",
    title: "高知市で同点になったらどうなる？優先順位を解説",
    description:
      "高知市の保育園入園選考で同点だった場合の優先順位の判定方法を解説します。",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>同点時の判定方法</h2>
<p>高知市の入園選考で合計指数が同点になった場合、さらに優先順位で判定されます。</p>

<h2>同点時に考慮される要素</h2>
<ul>
<li>保育の必要性がより高い世帯が優先</li>
<li>ひとり親世帯は優先</li>
<li>きょうだいが在園している施設への申込は優先</li>
<li>所得が低い世帯が優先</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>高知市の200点制では大都市に比べると点数の幅が広いですが、フルタイム共働きの200点が多数派です。調整指数の加点を漏れなく申請しましょう。</p>
</div>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>同点時の優先順位の詳細は毎年の案内で確認してください。年度によって判定基準が変更されることがあります。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 45,
  },
  {
    slug: "part-time-work-score",
    citySlug: "kochi",
    title: "高知市で時短勤務だと点数はどう変わる？",
    description:
      "高知市の保育園入園選考で時短勤務の場合の基本指数への影響を解説します。",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>高知市は月の合計就労時間で判定</h2>
<p>高知市の基本指数は月の合計就労時間で決まります。時短勤務の影響を確認しましょう。</p>

<table>
<tr><th>月の就労時間</th><th>基本指数</th></tr>
<tr><td>月170時間以上</td><td>100点</td></tr>
<tr><td>月140時間以上170時間未満</td><td>90点</td></tr>
<tr><td>月120時間以上140時間未満</td><td>85点</td></tr>
<tr><td>月100時間以上120時間未満</td><td>75点</td></tr>
<tr><td>月80時間以上100時間未満</td><td>65点</td></tr>
<tr><td>月64時間以上80時間未満</td><td>55点</td></tr>
</table>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>月20日勤務で1日6時間の時短勤務の場合、月120時間で基本指数は<span class="highlight">85点</span>です。フルタイムの100点と比べて15点下がります。</p>
</div>

<h2>月170時間の壁</h2>
<p>満点の100点を得るには月170時間以上が必要です。1日8.5時間×20日＝170時間がちょうど満点ラインです。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>高知市は100点制で点差が大きいため、時短勤務の影響が顕著です。復職時にフルタイムに戻す予定であれば、復職後の勤務条件を就労証明書に記載してもらいましょう。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 50,
  },
  {
    slug: "rejection-options",
    citySlug: "kochi",
    title: "高知市で保育園に落ちたときの選択肢",
    description:
      "高知市の認可保育園に不承諾となった場合の対応策をまとめました。",
    image: "https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>不承諾になったら</h2>
<p>高知市で認可保育園に不承諾になった場合でも、複数の選択肢があります。</p>

<h3>1. 欠員補充への申込</h3>
<p>高知市では毎月の欠員補充を行っています。空きが出た園について随時申込が可能です。</p>

<h3>2. 認可外保育施設の利用</h3>
<p>認可外保育施設を利用することで、翌年度の申込で<span class="highlight">+8点</span>の加点が見込めます。</p>

<h3>3. 小規模保育の利用</h3>
<p>小規模保育事業を利用し、卒園時に認可保育園へ転所する方法があります。卒園に伴う転所で<span class="highlight">+15点</span>の加点が得られます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>認可外利用（+8点）と育休復帰（+5点）を翌年度に積むと、200点＋13点＝<span class="highlight">213点</span>が見込めます。</p>
</div>

<h3>4. 途中入園</h3>
<p>空きが出た場合に途中入園が可能です。高知市では欠員補充状況を公表しています。</p>

<h3>5. 育休延長</h3>
<p>不承諾通知があれば育休を最長2歳まで延長できます。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>欠員補充状況は<a href="https://www.city.kochi.kochi.jp/soshiki/34/ketsuinhojuu.html" target="_blank" rel="noopener">高知市公式サイト</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 45,
  },
  {
    slug: "unlicensed-nursery-bonus",
    citySlug: "kochi",
    title: "高知市で認可外保育施設の利用で加点を得る方法",
    description:
      "高知市では認可外保育施設の利用で+8点の加点が得られます。その条件を解説します。",
    image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>認可外利用の加点</h2>
<p>高知市では認可外保育施設に月ぎめで預けている場合、調整指数で<span class="highlight">+8点</span>の加点が得られます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>高知市の認可外利用の加点は+8点です。不承諾だった場合のステップアップ戦略として有効です。</p>
</div>

<h2>対象となる施設</h2>
<ul>
<li>認可外保育施設</li>
<li>企業主導型保育施設</li>
</ul>

<h2>小規模保育の卒園加点</h2>
<p>小規模保育等の卒園に伴う転所で<span class="highlight">+15点</span>の加点があります。認可外利用（+8点）よりもさらに大きな加点です。</p>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>利用証明書が必要になりますので、利用している施設に発行を依頼してください。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 40,
  },
  {
    slug: "next-year-changes",
    citySlug: "kochi",
    title: "高知市の令和8年度入園　変更点と注意事項",
    description:
      "高知市の令和8年度保育園入園選考の注意点をまとめました。",
    image: "https://images.unsplash.com/photo-1506784365847-bbad939e9335?w=800&h=400&fit=crop",
    category: "最新情報",
    categoryColor: "purple",
    content: `<h2>令和8年度の注意点</h2>
<p>高知市の保育園入園制度は令和6年度から利用承諾基準が改定されています。最新の基準を確認しましょう。</p>

<h2>確認すべきポイント</h2>
<ul>
<li>基本指数・調整指数の変更有無</li>
<li>新設園の情報</li>
<li>定員の増減</li>
<li>申込方法の変更</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>高知市の利用承諾基準表は市の公式サイトで公開されています。毎年秋の申込前に必ず最新版を確認しましょう。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>最新情報は<a href="https://www.city.kochi.kochi.jp/soshiki/34/nyushoshodakukijun.html" target="_blank" rel="noopener">高知市公式サイト</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 35,
  },
  {
    slug: "popular-areas",
    citySlug: "kochi",
    title: "高知市の人気エリアと入りやすい地域の傾向",
    description:
      "高知市内で保育園の競争率が高いエリアと比較的入りやすい地域を解説します。",
    image: "https://images.unsplash.com/photo-1524813686514-a57563d77965?w=800&h=400&fit=crop",
    category: "エリア情報",
    categoryColor: "teal",
    content: `<h2>高知市の保育園事情</h2>
<p>高知市は高知県の県庁所在地で人口約32万人です。市中心部と郊外で保育園の競争率に差があります。</p>

<h2>競争率が高い傾向のエリア</h2>
<ul>
<li>はりまや橋・帯屋町周辺：市の中心地で子育て世帯に人気</li>
<li>高須・葛島エリア：住宅地として人気のエリア</li>
<li>朝倉エリア：高知大学周辺で若い世帯が多い</li>
</ul>

<h2>比較的入りやすい傾向のエリア</h2>
<ul>
<li>北部エリア（鏡・土佐山方面）：園の選択肢がある</li>
<li>東部エリア（五台山以東）：市街地から離れると競争率が下がる</li>
<li>西部エリア（鴨田・長浜方面）：新設園もある地域</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>高知市は車での送迎が一般的です。通勤経路上の園も含めて幅広く希望園を検討しましょう。</p>
</div>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>エリアの難易度は年度や年齢クラスによって変わります。最新の欠員補充状況を市に確認してください。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 30,
  },
  {
    slug: "competition-reality",
    citySlug: "kochi",
    title: "高知市の保育園入園競争の実態",
    description:
      "高知市の保育園入園はどのくらい厳しいのか。選考の実態を解説します。",
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>高知市の入園競争の現状</h2>
<p>高知市は高知県の県庁所在地ですが、全国的に見ると保育環境は比較的整っています。ただし中心部の人気園では競争があります。</p>

<h2>ボリュームゾーン</h2>
<p>フルタイム共働き世帯は基本指数<span class="highlight">200点</span>で横並びです。調整指数の加点で差がつきます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>認可外利用（+8点）と育休復帰（+5点）を積むと、200点＋13点＝<span class="highlight">213点</span>がひとつの目安です。中心部の人気園ではこの水準が必要になることがあります。</p>
</div>

<h2>年齢別の傾向</h2>
<ul>
<li>0歳児クラス：地域によっては入りやすい場合がある</li>
<li>1歳児クラス：最も競争が激しい年齢</li>
<li>2歳児クラス：空きが少ない</li>
<li>3歳児以上：枠が増えるため比較的入りやすい</li>
</ul>

<h2>高知県の県庁所在地としての特徴</h2>
<p>高知市は東京や大阪の大都市と比較すると全体的に入りやすい傾向がありますが、中心部の人気園は競争率が高くなることがあります。郊外の園も視野に入れることが重要です。</p>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>求職活動中の基本指数は40点で、就労中（最大100点）の半分以下です。求職中での入園は中心部では困難です。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 50,
  },
];

registerArticles(articles);
