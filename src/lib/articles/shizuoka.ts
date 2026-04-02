import type { Article } from "./types";
import { registerArticles } from "./index";

const articles: Article[] = [
  {
    slug: "hokatsu-schedule",
    citySlug: "shizuoka",
    title: "静岡市の保活スケジュール　申込から内定までの流れ",
    description:
      "静岡市の認可保育園の申込時期・選考の流れをまとめました。令和8年度4月入園の動き方を解説します。",
    image: "https://images.unsplash.com/photo-1484820540004-14229fe36ca4?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>静岡市の4月入園スケジュール</h2>
<p>静岡市の認可保育園は毎年秋に翌年度4月入園の申込を受付けます。「保育利用調整基準」を理解して準備を始めましょう。</p>

<h3>保活の全体スケジュール</h3>
<div class="step">
<div class="step-num">1</div>
<div class="step-content">
<strong>4月〜6月：情報収集</strong>
<p>市のホームページで保育園の一覧を確認します。</p>
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
<p>各区役所の窓口で申込みます。</p>
</div>
</div>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>静岡市は基本指数が父母各最大10点（合計20点満点）です。月の合計就労時間で判定される制度です。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳しくは<a href="https://www.city.shizuoka.lg.jp/s2421/s2421.html" target="_blank" rel="noopener">静岡市公式サイト</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 55,
  },
  {
    slug: "scoring-system-guide",
    citySlug: "shizuoka",
    title: "静岡市の入園点数のしくみ　基本指数と調整指数を解説",
    description:
      "静岡市の保育園入園選考で使われる基本指数と調整指数のしくみを解説します。",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>静岡市の選考指数とは</h2>
<p>静岡市の認可保育園は「基本指数＋調整指数」の合計で選考されます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>選考指数 ＝ 基本指数（父＋母）＋ 調整指数</p>
</div>

<h2>基本指数（父母各最大10点、合計20点）</h2>
<p>就労の場合、月160時間以上で満点の<span class="highlight">10点</span>です。</p>

<table>
<tr><th>月の就労時間</th><th>指数</th></tr>
<tr><td>月160時間以上</td><td>10</td></tr>
<tr><td>月120時間以上160時間未満</td><td>9</td></tr>
<tr><td>月80時間以上120時間未満</td><td>8</td></tr>
<tr><td>月64時間以上80時間未満</td><td>7</td></tr>
<tr><td>月48時間以上64時間未満</td><td>6</td></tr>
</table>

<h2>調整指数の代表例</h2>
<ul>
<li>ひとり親世帯：<span class="highlight">+3点</span></li>
<li>小規模保育卒園に伴う転所：<span class="highlight">+3点</span></li>
<li>きょうだいが在園中の園を希望：<span class="highlight">+2点</span></li>
<li>認可外利用（週3回以上）：<span class="highlight">+2点</span></li>
<li>育休復帰予定：<span class="highlight">+2点</span></li>
<li>生活保護世帯：<span class="highlight">+2点</span></li>
<li>認可外利用（週1回以上3回未満）：<span class="highlight">+1点</span></li>
<li>きょうだい同時申込：<span class="highlight">+1点</span></li>
<li>多胎児（双子以上）：<span class="highlight">+1点</span></li>
</ul>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>全項目は<a href="https://www.city.shizuoka.lg.jp/s2421/s2421.html" target="_blank" rel="noopener">静岡市公式サイト</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 65,
  },
  {
    slug: "score-up-tips",
    citySlug: "shizuoka",
    title: "静岡市で入園点数を上げるコツ　加点チェックリスト",
    description:
      "静岡市の保育園入園選考で調整指数の加点を最大限に活用する方法を解説します。",
    image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>基本指数20点は出発点</h2>
<p>静岡市ではフルタイム共働き世帯は基本指数<span class="highlight">20点</span>で横並びです。差がつくのは調整指数の加点です。</p>

<h2>加点チェックリスト</h2>
<table>
<tr><th>項目</th><th>点数</th><th>条件</th></tr>
<tr><td>ひとり親世帯</td><td>+3点</td><td>母子・父子家庭の場合</td></tr>
<tr><td>小規模保育卒園</td><td>+3点</td><td>小規模保育等の卒園に伴う転所</td></tr>
<tr><td>きょうだい在園</td><td>+2点</td><td>在園中の園を希望</td></tr>
<tr><td>認可外利用（週3回以上）</td><td>+2点</td><td>週3回以上の利用</td></tr>
<tr><td>育休復帰予定</td><td>+2点</td><td>入園月に職場復帰する場合</td></tr>
<tr><td>生活保護</td><td>+2点</td><td>生活保護を受けている場合</td></tr>
<tr><td>認可外利用（週1〜3回未満）</td><td>+1点</td><td>週1回以上3回未満の利用</td></tr>
<tr><td>きょうだい同時申込</td><td>+1点</td><td>双子など同時申込</td></tr>
<tr><td>多胎児</td><td>+1点</td><td>双子以上の場合</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>静岡市では認可外の利用頻度で加点が異なります。週3回以上なら<span class="highlight">+2点</span>、週1〜3回未満なら+1点です。利用頻度を調整して加点を最大化しましょう。</p>
</div>

<h2>多胎児加点にも注目</h2>
<p>双子以上の場合は<span class="highlight">+1点</span>の加点があります。さらにきょうだい同時申込（+1点）と合わせて+2点になります。</p>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>就労証明書の月間就労時間は正確に記載してください。実態と異なる記載は入園取消しの対象です。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 100,
  },
  {
    slug: "tiebreaker-rules",
    citySlug: "shizuoka",
    title: "静岡市で同点になったらどうなる？優先順位を解説",
    description:
      "静岡市の保育園入園選考で同点だった場合の優先順位の判定方法を解説します。",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>同点時の判定方法</h2>
<p>静岡市の入園選考で合計指数が同点になった場合、さらに優先順位で判定されます。</p>

<h2>同点時に考慮される要素</h2>
<ul>
<li>ひとり親世帯は優先</li>
<li>所得が低い世帯が優先</li>
<li>きょうだいが在園している園への申込は優先</li>
<li>保育の必要性がより高い世帯が優先</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>静岡市の20点制では調整指数の加点幅が小さい（最大+3点）ため、同点が発生しやすいです。1点の差が大きいため、使える加点は漏れなく申請しましょう。</p>
</div>

<h2>同点回避の戦略</h2>
<p>認可外利用（+1〜2点）、育休復帰（+2点）、きょうだい在園（+2点）を積み上げることで同点リスクを減らせます。</p>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>同点時の優先順位の詳細は毎年の案内で確認してください。年度によって判定基準が変更されることがあります。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 85,
  },
  {
    slug: "part-time-work-score",
    citySlug: "shizuoka",
    title: "静岡市で時短勤務だと点数はどう変わる？",
    description:
      "静岡市の保育園入園選考で時短勤務の場合の基本指数への影響を解説します。",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>静岡市は月の合計就労時間で判定</h2>
<p>静岡市の基本指数は月の合計就労時間で決まります。時短勤務の影響を確認しましょう。</p>

<table>
<tr><th>月の就労時間</th><th>基本指数</th></tr>
<tr><td>月160時間以上</td><td>10点</td></tr>
<tr><td>月120時間以上160時間未満</td><td>9点</td></tr>
<tr><td>月80時間以上120時間未満</td><td>8点</td></tr>
<tr><td>月64時間以上80時間未満</td><td>7点</td></tr>
<tr><td>月48時間以上64時間未満</td><td>6点</td></tr>
</table>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>月20日勤務で1日6時間の時短勤務の場合、月120時間で基本指数は<span class="highlight">9点</span>です。フルタイムの10点と比べて1点下がります。</p>
</div>

<h2>月160時間の壁</h2>
<p>満点の10点を得るには月160時間以上が必要です。1日8時間×20日＝160時間がちょうど満点ラインです。</p>

<h2>月80時間以上120時間未満は8点</h2>
<p>週4日×5時間（月80時間）のパート勤務の場合は8点です。フルタイムとの差は2点ですが、夫婦で合計すると4点の差になります。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>静岡市は就労時間の区分が細かく、20時間刻みで基本指数が変わります。月の就労時間がギリギリの場合は、わずかな調整で1点上がる可能性があります。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 90,
  },
  {
    slug: "rejection-options",
    citySlug: "shizuoka",
    title: "静岡市で保育園に落ちたときの選択肢",
    description:
      "静岡市の認可保育園に不承諾となった場合の対応策をまとめました。",
    image: "https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>不承諾になったら</h2>
<p>静岡市で認可保育園に不承諾になった場合でも、複数の選択肢があります。</p>

<h3>1. 二次選考への申込</h3>
<p>一次選考後の辞退者枠で二次選考が行われます。</p>

<h3>2. 認可外保育施設の利用</h3>
<p>認可外保育施設を利用することで、翌年度の申込で加点が見込めます。週3回以上の利用で<span class="highlight">+2点</span>、週1回以上で<span class="highlight">+1点</span>です。</p>

<h3>3. 小規模保育の利用</h3>
<p>小規模保育事業を利用し、卒園時に認可保育園へ転所する方法があります。卒園に伴う転所で<span class="highlight">+3点</span>の加点が得られます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>認可外利用（+2点）と育休復帰（+2点）を翌年度に積むと、合計+4点の加算が見込めます。20点制では4点の差は非常に大きいです。</p>
</div>

<h3>4. 途中入園</h3>
<p>空きが出た場合に途中入園が可能です。</p>

<h3>5. 育休延長</h3>
<p>不承諾通知があれば育休を最長2歳まで延長できます。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>空き状況は<a href="https://www.city.shizuoka.lg.jp/s2421/s2421.html" target="_blank" rel="noopener">静岡市公式サイト</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 80,
  },
  {
    slug: "unlicensed-nursery-bonus",
    citySlug: "shizuoka",
    title: "静岡市で認可外保育施設の利用で加点を得る方法",
    description:
      "静岡市では認可外保育施設の利用頻度に応じて+1〜2点の加点が得られます。その条件を解説します。",
    image: "https://images.unsplash.com/photo-1587654780291-39c9404d7dd0?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>認可外利用の加点は利用頻度で変わる</h2>
<p>静岡市では認可外保育施設や一時預かりの利用頻度に応じて調整指数で加点が得られます。</p>

<table>
<tr><th>利用頻度</th><th>加点</th></tr>
<tr><td>週3回以上</td><td>+2点</td></tr>
<tr><td>週1回以上3回未満</td><td>+1点</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>静岡市の特徴は利用頻度で加点が変わる点です。週3回以上にすれば+2点、週1回でも+1点の加点があります。一時預かりも対象になります。</p>
</div>

<h2>対象となる施設</h2>
<ul>
<li>認可外保育施設</li>
<li>一時預かり事業</li>
<li>企業主導型保育施設</li>
</ul>

<h2>小規模保育の卒園加点</h2>
<p>小規模保育等の卒園に伴う転所で<span class="highlight">+3点</span>の加点があります。これは静岡市の調整指数で最大の加点（ひとり親と同点）です。</p>

<h2>一時預かりの活用</h2>
<p>静岡市では一時預かりの利用でも加点の対象になります。認可外の月ぎめ契約が難しい場合は、一時預かりを週1回以上利用することで+1点を得る方法も検討しましょう。</p>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>利用証明書が必要になりますので、利用している施設に発行を依頼してください。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 75,
  },
  {
    slug: "next-year-changes",
    citySlug: "shizuoka",
    title: "静岡市の令和8年度入園　変更点と注意事項",
    description:
      "静岡市の令和8年度保育園入園選考の注意点をまとめました。",
    image: "https://images.unsplash.com/photo-1506784365847-bbad939e9335?w=800&h=400&fit=crop",
    category: "最新情報",
    categoryColor: "purple",
    content: `<h2>令和8年度の注意点</h2>
<p>静岡市の保育園入園制度は毎年見直しが行われます。最新の「保育利用調整基準」を確認しましょう。</p>

<h2>確認すべきポイント</h2>
<ul>
<li>基本指数・調整指数の変更有無</li>
<li>新設園の情報</li>
<li>定員の増減</li>
<li>認可外利用の加点条件の変更</li>
<li>申込方法の変更</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>静岡市は認可外利用の加点が利用頻度で2段階（週3回以上で+2点、週1回以上で+1点）に分かれている珍しい制度です。この条件に変更がないか毎年確認しましょう。</p>
</div>

<h2>多胎児加点の確認</h2>
<p>静岡市には多胎児（双子以上）に対する+1点の加点があります。この制度の継続を確認してください。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>最新情報は<a href="https://www.city.shizuoka.lg.jp/s2421/s2421.html" target="_blank" rel="noopener">静岡市公式サイト</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 70,
  },
  {
    slug: "popular-areas",
    citySlug: "shizuoka",
    title: "静岡市の人気エリアと入りやすい地域の傾向",
    description:
      "静岡市内で保育園の競争率が高いエリアと比較的入りやすい地域を解説します。",
    image: "https://images.unsplash.com/photo-1524813686514-a57563d77965?w=800&h=400&fit=crop",
    category: "エリア情報",
    categoryColor: "teal",
    content: `<h2>静岡市の保育園事情</h2>
<p>静岡市は葵区・駿河区・清水区の3つの行政区に分かれています。中心部と郊外で保育園の競争率に差があります。</p>

<h2>競争率が高い傾向のエリア</h2>
<ul>
<li>葵区中心部（静岡駅周辺）：商業地に近く子育て世帯に人気</li>
<li>駿河区（南部）：住宅地として人気のエリア</li>
</ul>

<h2>比較的入りやすい傾向のエリア</h2>
<ul>
<li>清水区：保育園の選択肢が比較的多い</li>
<li>葵区北部：山間部に近く保育需要が低め</li>
<li>駿河区郊外：中心部から離れると競争率が下がる傾向</li>
</ul>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>エリアの難易度は年度や年齢クラスによって変わります。最新の空き状況を市に確認してください。</p>
</div>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>静岡市は車での送迎が一般的です。通勤経路上の園も含めて幅広く希望園を検討しましょう。3区にまたがって申込むことも可能です。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 60,
  },
  {
    slug: "competition-reality",
    citySlug: "shizuoka",
    title: "静岡市の保育園入園競争の実態",
    description:
      "静岡市の保育園入園はどのくらい厳しいのか。20点制の選考の実態を解説します。",
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>静岡市の入園競争の現状</h2>
<p>静岡市は政令指定都市の中では比較的保育環境が整っていますが、中心部の人気園では競争があります。</p>

<h2>ボリュームゾーン</h2>
<p>フルタイム共働き世帯は基本指数<span class="highlight">20点</span>で横並びです。調整指数の加点で差がつきます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>認可外利用（+2点）と育休復帰（+2点）を積むと、20点＋4点＝<span class="highlight">24点</span>がひとつの目安です。中心部の人気園ではこの水準が必要になることがあります。</p>
</div>

<h2>年齢別の傾向</h2>
<ul>
<li>0歳児クラス：地域によっては入りやすい場合がある</li>
<li>1歳児クラス：最も競争が激しい年齢</li>
<li>2歳児クラス：空きが少ない</li>
<li>3歳児以上：枠が増えるため比較的入りやすい</li>
</ul>

<h2>清水区と葵区・駿河区の差</h2>
<p>清水区は比較的保育園に入りやすい傾向がありますが、葵区・駿河区の中心部は競争率が高めです。</p>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>求職活動中の基本指数は4点で、就労中（最大10点）の半分以下です。求職中での入園は中心部では困難です。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 95,
  },
];

registerArticles(articles);
