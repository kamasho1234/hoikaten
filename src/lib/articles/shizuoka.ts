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
<p>詳しくは<a href="https://www.city.shizuoka.lg.jp/p000040.html" target="_blank" rel="noopener">静岡市公式サイト</a>をご確認ください。</p>
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
<p>全項目は<a href="https://www.city.shizuoka.lg.jp/p000040.html" target="_blank" rel="noopener">静岡市公式サイト</a>で確認できます。</p>
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
<p>空き状況は<a href="https://www.city.shizuoka.lg.jp/p000040.html" target="_blank" rel="noopener">静岡市公式サイト</a>で確認できます。</p>
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
<p>最新情報は<a href="https://www.city.shizuoka.lg.jp/p000040.html" target="_blank" rel="noopener">静岡市公式サイト</a>で確認できます。</p>
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
  {
    slug: "nursery-visit-guide",
    citySlug: "shizuoka",
    title: "静岡市の保育園見学ガイド　チェックポイントと質問例",
    description:
      "静岡市で保育園見学をする際に確認すべきポイントと園に聞くべき質問をまとめました。",
    image: "https://images.unsplash.com/photo-1576495199011-eb94736d05d6?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>見学前の準備</h2>
<p>静岡市には認可保育園・認定こども園・小規模保育施設があります。見学前に市のホームページで園の一覧と定員を確認しておきましょう。</p>

<h3>見学で確認すべきポイント</h3>
<ul>
<li>園庭の広さと遊具の状態</li>
<li>保育室の広さと清潔さ</li>
<li>給食の内容（自園調理か外部搬入か）</li>
<li>送迎時の駐車場の有無と台数</li>
<li>延長保育の時間と料金</li>
<li>病児・病後児保育の対応</li>
</ul>

<h3>園に聞くべき質問</h3>
<ul>
<li>昨年度の入園ボーダー点数の目安</li>
<li>持ち物の準備（手作り指定の有無）</li>
<li>慣らし保育の期間</li>
<li>保護者参加行事の頻度</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>静岡市は車社会です。駐車場の台数や送迎時の混雑状況は必ず確認しましょう。朝の送迎時間帯に見学できると実態がわかります。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>園の一覧は<a href="https://www.city.shizuoka.lg.jp/p000040.html" target="_blank" rel="noopener">静岡市公式サイト</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 50,
  },
  {
    slug: "zero-vs-one-year",
    citySlug: "shizuoka",
    title: "静岡市で0歳入園と1歳入園どちらが有利？",
    description:
      "静岡市の保育園入園で0歳児クラスと1歳児クラスの競争率の違いを解説します。",
    image: "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>0歳と1歳の入園事情</h2>
<p>静岡市でも1歳児クラスは最も競争が激しい年齢です。育休を1年取得してから申し込む家庭が集中するためです。</p>

<h2>0歳児クラスのメリット</h2>
<ul>
<li>申込者が比較的少なく入りやすい傾向</li>
<li>1歳以降の持ち上がりで枠が確保される</li>
</ul>

<h2>0歳児クラスのデメリット</h2>
<ul>
<li>育休を早めに切り上げる必要がある</li>
<li>0歳児クラスがない園もある</li>
<li>保育料が比較的高い月齢の場合がある</li>
</ul>

<h2>1歳児クラスの現状</h2>
<p>静岡市の中心部（葵区・駿河区）の人気園では、1歳児クラスの倍率が高くなります。基本指数20点に加点がないと厳しい園もあります。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>0歳4月入園は生後57日以降から受入れ可能な園が多いです。4月1日時点の月齢を確認して申込可能かどうか確かめましょう。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 48,
  },
  {
    slug: "single-parent-guide",
    citySlug: "shizuoka",
    title: "静岡市のひとり親家庭の保活ガイド　加点と支援制度",
    description:
      "静岡市でひとり親家庭が保育園入園選考で受けられる加点と利用できる支援制度を解説します。",
    image: "https://images.unsplash.com/photo-1531983412531-1f49a365ffed?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>ひとり親世帯の加点</h2>
<p>静岡市ではひとり親世帯に対して調整指数で<span class="highlight">+3点</span>の加点があります。これは調整指数の中で最大の加点（小規模卒園と同点）です。</p>

<h2>ひとり親の基本指数</h2>
<p>ひとり親世帯の場合、保護者1名分の基本指数（最大10点）＋調整指数で選考されます。</p>

<table>
<tr><th>項目</th><th>点数</th></tr>
<tr><td>基本指数（フルタイム就労）</td><td>10点</td></tr>
<tr><td>ひとり親加点</td><td>+3点</td></tr>
<tr><td>合計</td><td>13点</td></tr>
</table>

<h2>利用できる支援制度</h2>
<ul>
<li>児童扶養手当</li>
<li>ひとり親家庭医療費助成</li>
<li>母子父子寡婦福祉資金貸付</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>ひとり親世帯は同点時の優先順位でも考慮されます。加点の申請には戸籍謄本など証明書類が必要ですので、早めに準備しましょう。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>支援制度の詳細は<a href="https://www.city.shizuoka.lg.jp/p000040.html" target="_blank" rel="noopener">静岡市公式サイト</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 47,
  },
  {
    slug: "ikukyu-timing",
    citySlug: "shizuoka",
    title: "静岡市で育休明けのベストな入園タイミングは？",
    description:
      "静岡市で育休から復帰する際の保育園入園のタイミングと戦略を解説します。",
    image: "https://images.unsplash.com/photo-1492725764893-90b379c2b6e7?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>育休復帰と入園のタイミング</h2>
<p>静岡市では育休復帰予定で<span class="highlight">+2点</span>の調整指数が得られます。入園月に職場復帰する計画で申し込みましょう。</p>

<h2>4月入園がベスト</h2>
<p>静岡市でも4月入園が最も枠が多く、入園しやすい時期です。年度途中の入園は空きがあれば可能ですが、人気園では難しい状況です。</p>

<h2>育休延長も選択肢</h2>
<p>4月入園で不承諾になった場合、不承諾通知をもって育休を延長できます。延長期間中に翌年度4月入園の準備を進められます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>育休復帰の加点（+2点）を得るには、入園月に復帰する旨を就労証明書に記載してもらう必要があります。勤務先と復帰時期を調整しておきましょう。</p>
</div>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>入園後は原則として復帰が必要です。復帰しない場合は退園になる可能性があります。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 46,
  },
  {
    slug: "ninkagai-selection",
    citySlug: "shizuoka",
    title: "静岡市の認可外保育施設の選び方と注意点",
    description:
      "静岡市で認可外保育施設を選ぶ際のポイントと安全面の確認事項をまとめました。",
    image: "https://images.unsplash.com/photo-1567057419565-4349c49d8a04?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>認可外保育施設とは</h2>
<p>静岡市にも複数の認可外保育施設があります。認可保育園に入れなかった場合や、翌年度の加点を得るために利用するケースがあります。</p>

<h2>選ぶときのチェックポイント</h2>
<ul>
<li>静岡市への届出がされているか</li>
<li>立入調査の結果（市のホームページで公開）</li>
<li>保育士の配置人数</li>
<li>施設の安全対策（避難経路・防犯設備）</li>
<li>保育料と追加費用</li>
<li>給食の有無と内容</li>
</ul>

<h2>認可外利用で加点を得る</h2>
<p>静岡市では認可外保育施設の利用頻度で加点が変わります。週3回以上で<span class="highlight">+2点</span>、週1回以上で<span class="highlight">+1点</span>です。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>企業主導型保育施設も認可外の一種です。従業員枠と地域枠があり、地域枠であれば誰でも申し込めます。</p>
</div>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>認可外保育施設は施設ごとに保育環境が大きく異なります。必ず見学をして納得してから契約しましょう。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 45,
  },
  {
    slug: "futago-hokatsu",
    citySlug: "shizuoka",
    title: "静岡市で双子の保活　同時申込と多胎児加点",
    description:
      "静岡市で双子や三つ子の保活をする際のきょうだい同時申込加点と多胎児加点を解説します。",
    image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>双子の加点</h2>
<p>静岡市では双子（多胎児）に関連する加点が2つあります。</p>

<table>
<tr><th>項目</th><th>加点</th></tr>
<tr><td>きょうだい同時申込</td><td>+1点</td></tr>
<tr><td>多胎児（双子以上）</td><td>+1点</td></tr>
<tr><td>合計</td><td>+2点</td></tr>
</table>

<h2>双子の入園パターン</h2>
<ul>
<li>同じ園に2人とも入園：送迎の負担が少ない</li>
<li>別々の園に入園：どちらかが入れないリスクを軽減</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>静岡市は多胎児加点（+1点）がある珍しい自治体です。きょうだい同時申込（+1点）と合わせて+2点、さらに育休復帰（+2点）を加えると基本指数20点＋4点＝<span class="highlight">24点</span>になります。</p>
</div>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>双子が同じ園に入れるかどうかは空き枠次第です。同じ園にこだわりすぎると2人とも入れないリスクがあります。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 44,
  },
  {
    slug: "hoiku-mama-interview",
    citySlug: "shizuoka",
    title: "静岡市の保活体験談　先輩ママの入園までの流れ",
    description:
      "静岡市で保活を経験した先輩ママの体験談をもとに、入園までの流れとコツを紹介します。",
    image: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>保活の流れ（一般的なケース）</h2>
<p>静岡市で保活を成功させた家庭の一般的な流れを紹介します。</p>

<h3>よくあるスケジュール</h3>
<div class="step">
<div class="step-num">1</div>
<div class="step-content">
<strong>妊娠中：情報収集開始</strong>
<p>市のホームページで保育園の一覧を確認し、自宅から通える園をリストアップ。</p>
</div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content">
<strong>産後3〜6か月：見学</strong>
<p>候補の園に電話して見学を予約。3〜5園は見学するのが一般的。</p>
</div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content">
<strong>秋：書類準備・提出</strong>
<p>就労証明書を勤務先に依頼し、申込書類を提出。</p>
</div>
</div>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>静岡市では認可外の利用で+1〜2点の加点が得られるため、4月入園に間に合わない場合は先に認可外に預けて翌年度に再チャレンジする家庭も多いです。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 43,
  },
  {
    slug: "waiting-child-data",
    citySlug: "shizuoka",
    title: "静岡市の待機児童数の推移と最新データ",
    description:
      "静岡市の待機児童数の推移と保育園整備の状況をまとめました。",
    image: "https://images.unsplash.com/photo-1460518451285-97b6aa326961?w=800&h=400&fit=crop",
    category: "最新情報",
    categoryColor: "purple",
    content: `<h2>静岡市の待機児童の状況</h2>
<p>静岡市は政令指定都市として保育園の整備を進めてきました。待機児童数は全国的な傾向と同様に減少傾向にあります。</p>

<h2>待機児童と隠れ待機児童</h2>
<p>国の定義による「待機児童」以外にも、特定の園のみを希望して入れなかった「隠れ待機児童」が存在します。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>待機児童数が減少していても、1歳児クラスや人気エリアでは依然として入りにくい状況があります。全体の数字だけで判断しないようにしましょう。</p>
</div>

<h2>地域別の傾向</h2>
<ul>
<li>葵区中心部：市の中心で保育需要が高い</li>
<li>駿河区：住宅地として人気で需要が多い</li>
<li>清水区：比較的余裕がある傾向</li>
</ul>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>最新の待機児童数は<a href="https://www.city.shizuoka.lg.jp/p000040.html" target="_blank" rel="noopener">静岡市公式サイト</a>や厚生労働省の公表資料で確認できます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 42,
  },
  {
    slug: "small-nursery-guide",
    citySlug: "shizuoka",
    title: "静岡市の小規模保育事業とは？卒園後の加点が魅力",
    description:
      "静岡市の小規模保育事業の特徴と、卒園後に認可保育園へ転所する際の+3点加点について解説します。",
    image: "https://images.unsplash.com/photo-1544776193-352d25ca82cd?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>小規模保育事業とは</h2>
<p>小規模保育事業は定員6〜19人の小さな保育施設です。0〜2歳児が対象で、家庭的な雰囲気の中で保育が行われます。</p>

<h2>静岡市の小規模保育の特徴</h2>
<ul>
<li>定員が少なく、きめ細かい保育が受けられる</li>
<li>0〜2歳児専用のため、3歳児以降は別の施設に移る必要がある</li>
<li>卒園に伴う認可保育園への転所で<span class="highlight">+3点</span>の加点</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>静岡市では小規模保育の卒園加点が+3点で、ひとり親加点と並んで最大の加点です。20点制では3点の差は非常に大きく、0歳から小規模保育に入り、3歳で認可に移る戦略は有効です。</p>
</div>

<h2>連携施設の確認</h2>
<p>小規模保育事業には「連携施設」が設定されている場合があります。連携先の認可保育園への転所が優先されることがあるため、入園前に確認しましょう。</p>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>小規模保育は3歳児クラスがないため、必ず転所が必要です。転所先の候補を事前に調べておきましょう。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 41,
  },
  {
    slug: "secondchild-hokatsu",
    citySlug: "shizuoka",
    title: "静岡市の第2子保活　きょうだい加点の活用法",
    description:
      "静岡市で第2子の保活をする際のきょうだい在園加点と同じ園に入るための戦略を解説します。",
    image: "https://images.unsplash.com/photo-1471286174890-9c112ffca5b4?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>きょうだい在園の加点</h2>
<p>静岡市では上の子が在園している園を希望する場合、<span class="highlight">+2点</span>の加点が得られます。</p>

<h2>第2子の入園戦略</h2>
<ul>
<li>上の子と同じ園を第1希望にしてきょうだい加点を獲得</li>
<li>さらに育休復帰加点（+2点）を上乗せ</li>
<li>基本指数20点＋きょうだい2点＋育休復帰2点＝<span class="highlight">24点</span></li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>きょうだい加点は「在園中の園を希望した場合」に限られます。上の子と違う園を希望すると加点がつかないので注意してください。</p>
</div>

<h2>上の子の転園も検討</h2>
<p>第2子の入園が難しい場合、2人とも別の園に同時に転園申込をする方法もあります。きょうだい同時申込（+1点）の加点が使えます。</p>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>きょうだいが別々の園になると送迎の負担が大きくなります。同じ園に入れるよう早めに保活を始めましょう。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 40,
  },
  {
    slug: "self-employed-score",
    citySlug: "shizuoka",
    title: "静岡市で自営業・フリーランスの保活と点数",
    description:
      "静岡市で自営業やフリーランスの方が保育園入園選考で得られる点数と必要書類を解説します。",
    image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>自営業・フリーランスの基本指数</h2>
<p>静岡市では自営業・フリーランスも会社員と同じ基準で基本指数が算定されます。月の合計就労時間で決まります。</p>

<table>
<tr><th>月の就労時間</th><th>基本指数</th></tr>
<tr><td>月160時間以上</td><td>10点</td></tr>
<tr><td>月120時間以上</td><td>9点</td></tr>
<tr><td>月80時間以上</td><td>8点</td></tr>
</table>

<h2>必要書類</h2>
<ul>
<li>就労状況申告書（自営業用）</li>
<li>開業届の写し、または確定申告書の写し</li>
<li>業務内容がわかる資料</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>自営業の場合、就労時間を客観的に証明することが重要です。確定申告書や開業届など公的書類を準備しておきましょう。</p>
</div>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>実態のない開業届では加点は認められません。実際に就労していることが確認できる書類が求められます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 39,
  },
  {
    slug: "naishoku-score",
    citySlug: "shizuoka",
    title: "静岡市で内職・在宅ワークの場合の保育園点数",
    description:
      "静岡市で内職や在宅ワークをしている場合の基本指数と申込時の注意点を解説します。",
    image: "https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>在宅ワークの基本指数</h2>
<p>静岡市では在宅ワーク（内職・テレワーク含む）も「就労」として基本指数の対象になります。月の合計就労時間で点数が決まります。</p>

<h2>在宅ワークの証明方法</h2>
<ul>
<li>雇用されている場合：勤務先に就労証明書を発行してもらう</li>
<li>フリーランスの場合：就労状況申告書＋開業届・確定申告書の写し</li>
<li>内職の場合：委託元からの証明書</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>在宅ワークでも月160時間以上の勤務であれば基本指数は<span class="highlight">10点</span>（満点）です。勤務場所は自宅でも問題ありません。</p>
</div>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>在宅ワークは勤務実態の確認が厳しくなる傾向があります。勤務時間を記録した業務日誌など、客観的な証拠を準備しておくとスムーズです。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 38,
  },
  {
    slug: "kyushoku-hokatsu",
    citySlug: "shizuoka",
    title: "静岡市で求職中に保育園に入れる？求職活動の点数",
    description:
      "静岡市で求職活動中の場合の基本指数と入園の可能性を解説します。",
    image: "https://images.unsplash.com/photo-1586281380117-5a60ae2050cc?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>求職中の基本指数</h2>
<p>静岡市では求職活動中の基本指数は<span class="highlight">4点</span>です。就労中（最大10点）の半分以下になります。</p>

<h2>求職中の入園は厳しい</h2>
<p>フルタイム共働き世帯が20点であるのに対し、片方が求職中だと14点（10点＋4点）です。中心部の人気園への入園は非常に厳しい状況です。</p>

<h2>求職中から入園するための戦略</h2>
<ul>
<li>清水区など比較的空きのある地域を希望する</li>
<li>0歳児クラスなど競争の少ない年齢で申し込む</li>
<li>先に就職を決めて就労中の点数で申し込む</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>静岡市の20点制では、求職中の4点と就労中の10点の差は6点です。この差は非常に大きいため、入園申込前に就職を決めることが重要です。</p>
</div>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>求職中での入園後は、一定期間内（通常90日以内）に就労を開始する必要があります。就労開始しない場合は退園になる可能性があります。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 37,
  },
  {
    slug: "tenshoku-timing",
    citySlug: "shizuoka",
    title: "静岡市で転職予定がある場合の保活の注意点",
    description:
      "静岡市で転職を考えている場合の保育園申込への影響と就労証明書の扱いを解説します。",
    image: "https://images.unsplash.com/photo-1507679799987-c73b1567a95d?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>転職と保育園申込</h2>
<p>静岡市の保育園申込では、申込時点の就労状況で基本指数が決まります。転職のタイミングによっては点数が変わるため注意が必要です。</p>

<h2>転職タイミング別の影響</h2>
<table>
<tr><th>状況</th><th>基本指数</th></tr>
<tr><td>現職で就労中（月160時間以上）</td><td>10点</td></tr>
<tr><td>退職済み・求職中</td><td>4点</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>静岡市の20点制では就労中と求職中の差が6点もあります。申込書類の提出後に転職する場合は「変更届」の提出が必要です。</p>
</div>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>入園選考前に退職してしまうと「求職中」の扱いになり、基本指数が大きく下がります。転職は入園確定後に行うのが安全です。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 36,
  },
  {
    slug: "age2-nyuen",
    citySlug: "shizuoka",
    title: "静岡市の2歳児クラス入園　空きが少ない理由と対策",
    description:
      "静岡市の2歳児クラスは空きが少なく入りにくい傾向があります。その理由と対策を解説します。",
    image: "https://images.unsplash.com/photo-1587616211892-f743fcca64f9?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>2歳児クラスが難しい理由</h2>
<p>2歳児クラスは0歳・1歳からの持ち上がりで定員が埋まっていることが多く、新規の空き枠が少ない傾向にあります。</p>

<h2>2歳児クラスの対策</h2>
<ul>
<li>希望園の数を増やす</li>
<li>清水区など郊外の園も候補に入れる</li>
<li>小規模保育施設の2歳児枠を検討する</li>
<li>認可外保育施設を利用して加点を積む</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>静岡市の小規模保育事業は0〜2歳が対象です。認可保育園の2歳児クラスが厳しい場合、小規模保育に入園し、3歳で認可に転所すると+3点の加点が得られます。</p>
</div>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>2歳児クラスの途中入園はさらに難しくなります。4月入園を逃さないよう、秋の申込時期に確実に書類を提出しましょう。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 35,
  },
  {
    slug: "age3-ikou",
    citySlug: "shizuoka",
    title: "静岡市の3歳児クラスへの移行　幼稚園と保育園の選択",
    description:
      "静岡市で3歳児クラスから保育園や幼稚園に入れる方法と、それぞれのメリットを解説します。",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>3歳からの選択肢</h2>
<p>静岡市では3歳児クラスから保育園に入る場合、小規模保育や幼稚園からの移行組が増えます。</p>

<h2>3歳児の枠が増える理由</h2>
<ul>
<li>保育園の3歳児クラスは定員が増える園が多い</li>
<li>幼稚園に移る子どもがいるため空きが出る</li>
<li>認定こども園の3歳児枠もある</li>
</ul>

<h2>幼稚園の預かり保育も選択肢</h2>
<p>静岡市の私立幼稚園では預かり保育（延長保育）を実施している園があります。保育の必要性が認定されれば、幼稚園＋預かり保育で保育園と同等の時間預けられます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>幼児教育・保育の無償化により、3〜5歳児の保育料は無料です。幼稚園の預かり保育も月額上限1.13万円まで無償化の対象です。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>認定こども園の情報は<a href="https://www.city.shizuoka.lg.jp/p000040.html" target="_blank" rel="noopener">静岡市公式サイト</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 34,
  },
  {
    slug: "nyuyoji-age0",
    citySlug: "shizuoka",
    title: "静岡市の0歳児保育　生後何日から預けられる？",
    description:
      "静岡市の保育園で0歳児を預けられる月齢と、0歳入園のメリット・デメリットを解説します。",
    image: "https://images.unsplash.com/photo-1519689680058-324335c77eba?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>0歳児の受入開始月齢</h2>
<p>静岡市の認可保育園では、生後57日（生後2か月）から受入れ可能な園があります。ただし園によって受入開始月齢が異なるため、事前に確認が必要です。</p>

<h2>0歳児クラスの定員</h2>
<p>0歳児クラスは定員が少ない園が多く、6〜12名程度が一般的です。定員が少ない分、申込者も少ないため、1歳児クラスより入りやすい傾向があります。</p>

<h2>0歳入園のメリット・デメリット</h2>
<table>
<tr><th>メリット</th><th>デメリット</th></tr>
<tr><td>1歳児より競争率が低い</td><td>育休を早めに切り上げる必要がある</td></tr>
<tr><td>1歳以降の枠が確保される</td><td>保育料が比較的高い</td></tr>
<tr><td>早期から集団生活に慣れる</td><td>体調不良での呼び出しが多い</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>4月入園の場合、4月1日時点で生後57日を超えている必要があります。2月生まれ以降のお子さんは4月の0歳入園ができない場合があります。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 33,
  },
  {
    slug: "nintei-kodomoen",
    citySlug: "shizuoka",
    title: "静岡市の認定こども園とは？保育園との違い",
    description:
      "静岡市の認定こども園の特徴と保育園との違い、入園方法を解説します。",
    image: "https://images.unsplash.com/photo-1564429238961-bf8a17cadf8f?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>認定こども園とは</h2>
<p>認定こども園は幼稚園と保育園の機能を併せ持つ施設です。静岡市にも複数の認定こども園があります。</p>

<h2>保育園との主な違い</h2>
<table>
<tr><th>項目</th><th>保育園</th><th>認定こども園</th></tr>
<tr><td>対象</td><td>保育が必要な子</td><td>すべての子ども</td></tr>
<tr><td>年齢</td><td>0〜5歳</td><td>0〜5歳</td></tr>
<tr><td>利用時間</td><td>保育標準時間・短時間</td><td>教育時間＋保育時間</td></tr>
<tr><td>入園選考</td><td>利用調整（点数制）</td><td>2号・3号は利用調整</td></tr>
</table>

<h2>認定区分</h2>
<ul>
<li>1号認定：教育のみ（幼稚園部分）…園に直接申込</li>
<li>2号認定：3〜5歳で保育が必要…市の利用調整</li>
<li>3号認定：0〜2歳で保育が必要…市の利用調整</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>2号・3号認定は保育園と同じ点数制で利用調整されます。認定こども園も希望園に含めることで選択肢が広がります。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 32,
  },
  {
    slug: "kigyou-shudogata",
    citySlug: "shizuoka",
    title: "静岡市の企業主導型保育施設の活用法",
    description:
      "静岡市にある企業主導型保育施設の特徴と地域枠の利用方法を解説します。",
    image: "https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>企業主導型保育施設とは</h2>
<p>企業主導型保育施設は企業が従業員のために設置する保育施設です。「従業員枠」と「地域枠」があり、地域枠であれば企業の従業員以外でも利用できます。</p>

<h2>認可保育園との違い</h2>
<ul>
<li>市の利用調整（点数制）を経ずに直接申込</li>
<li>保育料は施設が設定（認可より高い場合も安い場合もある）</li>
<li>認可外保育施設に分類される</li>
</ul>

<h2>メリット</h2>
<ul>
<li>点数に関係なく入園できる</li>
<li>年度途中でも空きがあれば入園可能</li>
<li>利用実績が認可保育園申込時の加点になる</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>企業主導型保育施設を週3回以上利用すると、認可保育園申込時に+2点の加点が得られます。週1回以上でも+1点です。入園の「つなぎ」として有効です。</p>
</div>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>企業主導型保育施設は園ごとに保育内容や料金が大きく異なります。見学をして確認してから申し込みましょう。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 31,
  },
  {
    slug: "yakan-hoiku",
    citySlug: "shizuoka",
    title: "静岡市の夜間保育・延長保育の選択肢",
    description:
      "静岡市で夜間勤務やシフト勤務の方が利用できる夜間保育と延長保育の情報をまとめました。",
    image: "https://images.unsplash.com/photo-1489710437720-ebb67ec84dd2?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>延長保育</h2>
<p>静岡市の認可保育園では多くの園で延長保育を実施しています。標準的な保育時間（7:00〜18:00）を超えて最大19:00〜20:00頃まで預けられる園があります。</p>

<h2>夜間保育</h2>
<p>夜間勤務の方向けの夜間保育を実施している施設は限られています。認可外保育施設の中に夜間対応の施設がある場合があります。</p>

<h2>延長保育の利用方法</h2>
<ul>
<li>月ぎめ利用：毎月定額で延長保育を利用</li>
<li>スポット利用：必要な日だけ延長保育を利用</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>延長保育の実施時間は園ごとに異なります。勤務時間に合わせて延長保育の時間を確認してから希望園を決めましょう。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>延長保育の実施園は<a href="https://www.city.shizuoka.lg.jp/p000040.html" target="_blank" rel="noopener">静岡市公式サイト</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 30,
  },
  {
    slug: "mushoka-seido",
    citySlug: "shizuoka",
    title: "静岡市の幼児教育・保育無償化の対象と手続き",
    description:
      "静岡市での幼児教育・保育無償化制度の対象範囲と手続き方法を解説します。",
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6e?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>無償化の対象</h2>
<p>2019年10月から始まった幼児教育・保育の無償化は静岡市でも適用されています。</p>

<h2>対象と無償化の範囲</h2>
<table>
<tr><th>対象</th><th>無償化の内容</th></tr>
<tr><td>3〜5歳児（認可保育園）</td><td>保育料が無料</td></tr>
<tr><td>0〜2歳児（住民税非課税世帯）</td><td>保育料が無料</td></tr>
<tr><td>認可外保育施設（3〜5歳）</td><td>月額3.7万円まで無償</td></tr>
<tr><td>認可外保育施設（0〜2歳・非課税）</td><td>月額4.2万円まで無償</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>給食費（副食費）は無償化の対象外です。年収360万円未満相当の世帯と第3子以降は副食費が免除される場合があります。</p>
</div>

<h2>手続き</h2>
<p>認可保育園の場合、入園手続きと同時に無償化が適用されます。認可外保育施設を利用する場合は「施設等利用給付認定」の申請が別途必要です。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>無償化の詳細は<a href="https://www.city.shizuoka.lg.jp/p000040.html" target="_blank" rel="noopener">静岡市公式サイト</a>でご確認ください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 29,
  },
  {
    slug: "shokuhi-jippi",
    citySlug: "shizuoka",
    title: "静岡市の保育園の給食費・食材費の実費徴収",
    description:
      "静岡市の保育園で実費徴収される給食費（副食費・主食費）の目安と免除条件を解説します。",
    image: "https://images.unsplash.com/photo-1606787366850-de6330128bfc?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>保育園の給食費</h2>
<p>静岡市の認可保育園では、3〜5歳児の給食費は保護者が実費負担します。0〜2歳児の給食費は保育料に含まれています。</p>

<h2>給食費の内訳</h2>
<table>
<tr><th>項目</th><th>月額目安</th></tr>
<tr><td>主食費（ごはん・パン）</td><td>約1,000〜2,000円</td></tr>
<tr><td>副食費（おかず・おやつ）</td><td>約4,500円</td></tr>
</table>

<h2>副食費が免除される場合</h2>
<ul>
<li>年収360万円未満相当の世帯</li>
<li>第3子以降の子ども</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>副食費の金額は園ごとに異なります。見学時に給食費の金額を確認しておきましょう。</p>
</div>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>給食費のほかに、教材費や行事費などの実費徴収がある園もあります。入園前に園に確認してください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 28,
  },
  {
    slug: "hoikuryo-keisan",
    citySlug: "shizuoka",
    title: "静岡市の保育料の計算方法　所得と保育料の関係",
    description:
      "静岡市の認可保育園の保育料がどのように決まるかを解説します。",
    image: "https://images.unsplash.com/photo-1554224154-26032ffc0d07?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>保育料の決まり方</h2>
<p>静岡市の認可保育園の保育料は、保護者の市民税所得割額をもとに決定されます。世帯の所得が高いほど保育料が高くなる仕組みです。</p>

<h2>保育料に影響する要素</h2>
<ul>
<li>保護者の市民税所得割額（前年度分）</li>
<li>子どもの年齢（0〜2歳は高め、3〜5歳は無償化）</li>
<li>保育の認定区分（標準時間・短時間）</li>
<li>きょうだいの利用状況（第2子は半額、第3子以降は無料の場合あり）</li>
</ul>

<h2>3〜5歳は無償</h2>
<p>幼児教育・保育の無償化により、3〜5歳児の保育料は<span class="highlight">無料</span>です。ただし給食費は別途かかります。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>保育料は前年度の所得で決まるため、育休中で所得が低い年の翌年度は保育料が下がる場合があります。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>保育料の一覧表は<a href="https://www.city.shizuoka.lg.jp/p000040.html" target="_blank" rel="noopener">静岡市公式サイト</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 27,
  },
  {
    slug: "zeikin-koujo",
    citySlug: "shizuoka",
    title: "静岡市の保育料に影響する税金控除の知識",
    description:
      "静岡市の保育料を左右する市民税所得割額と、控除を活用して保育料を下げる方法を解説します。",
    image: "https://images.unsplash.com/photo-1554224155-1696413565d3?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>保育料と市民税所得割額</h2>
<p>静岡市の保育料は市民税所得割額で決まります。所得割額を下げる控除を活用すれば、保育料が下がる可能性があります。</p>

<h2>保育料に影響する主な控除</h2>
<ul>
<li>医療費控除：年間の医療費が一定額を超える場合</li>
<li>生命保険料控除：生命保険・個人年金保険に加入している場合</li>
<li>iDeCo（個人型確定拠出年金）：掛金が全額所得控除</li>
<li>ふるさと納税：保育料の算定には影響しない（注意）</li>
</ul>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>ふるさと納税は住民税の税額控除であり、所得割額の算定前の控除ではないため、保育料には影響しません。</p>
</div>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>iDeCoは掛金が全額所得控除になるため、保育料の引き下げに効果的です。ただし0〜2歳児の保育料にのみ影響します（3〜5歳は無償化済み）。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 26,
  },
  {
    slug: "shurou-shoumeisho",
    citySlug: "shizuoka",
    title: "静岡市の就労証明書の書き方と注意点",
    description:
      "静岡市の保育園申込で必要な就労証明書の記入方法と勤務先への依頼のコツを解説します。",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>就労証明書とは</h2>
<p>就労証明書は保育園申込の際に「保育の必要性」を証明する最も重要な書類です。勤務先（事業主）が記入・押印します。</p>

<h2>記入で重要なポイント</h2>
<ul>
<li>月の合計就労時間：基本指数に直結</li>
<li>勤務開始時刻・終了時刻：保育時間の認定に影響</li>
<li>雇用形態：正社員・パート・契約社員など</li>
<li>育休の取得状況と復帰予定日</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>静岡市は「月160時間以上」で基本指数10点（満点）です。就労証明書の数字がこの基準を満たしているか確認しましょう。</p>
</div>

<h2>勤務先への依頼のコツ</h2>
<ul>
<li>申込期限の1か月前には依頼する</li>
<li>記入例を添えて依頼すると間違いが減る</li>
<li>復帰後の勤務条件で記載してもらう</li>
</ul>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>就労証明書の内容と実態が異なる場合は入園取消しになることがあります。正確に記載してもらいましょう。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 25,
  },
  {
    slug: "shinsei-shorui-list",
    citySlug: "shizuoka",
    title: "静岡市の保育園申込に必要な書類一覧",
    description:
      "静岡市の認可保育園に申し込む際に必要な書類をリストアップしました。",
    image: "https://images.unsplash.com/photo-1568667256549-094345857637?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>必要書類一覧</h2>
<p>静岡市の認可保育園に申し込む際の主な必要書類です。</p>

<h3>全員必要な書類</h3>
<ul>
<li>保育所等入所申込書</li>
<li>保育の必要性を証明する書類（就労証明書など）</li>
<li>マイナンバーがわかる書類</li>
</ul>

<h3>該当者のみ必要な書類</h3>
<ul>
<li>ひとり親の場合：戸籍謄本</li>
<li>障がいのある方がいる場合：障害者手帳の写し</li>
<li>生活保護世帯：受給証明書</li>
<li>求職中の場合：求職活動状況申告書</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>就労証明書は勤務先に作成を依頼するため時間がかかります。申込期限の1か月以上前には依頼しましょう。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>書類のダウンロードは<a href="https://www.city.shizuoka.lg.jp/p000040.html" target="_blank" rel="noopener">静岡市公式サイト</a>からできます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 24,
  },
  {
    slug: "niji-shinsei-flow",
    citySlug: "shizuoka",
    title: "静岡市の二次選考の流れと申込方法",
    description:
      "静岡市の保育園一次選考で不承諾になった場合の二次選考の申込方法を解説します。",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>二次選考とは</h2>
<p>静岡市では一次選考後に辞退者が出た枠や新設園の枠で二次選考が行われます。一次で不承諾だった方は二次選考に申し込めます。</p>

<h2>二次選考のスケジュール</h2>
<ul>
<li>一次結果通知：1月〜2月頃</li>
<li>二次申込期限：2月頃</li>
<li>二次結果通知：3月頃</li>
</ul>

<h2>二次選考のポイント</h2>
<ul>
<li>一次で不承諾だった方が対象</li>
<li>希望園を変更できる場合がある</li>
<li>辞退が出た園に空きが発生する</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>二次選考では一次よりも空き枠が少ないですが、辞退が出る園は人気園でも枠が空くことがあります。希望園は幅広く記入しましょう。</p>
</div>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>二次選考の申込期限は短いです。一次の結果が届いたらすぐに対応できるよう準備しておきましょう。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 23,
  },
  {
    slug: "tenkyo-hokatsu",
    citySlug: "shizuoka",
    title: "静岡市に転入予定の場合の保活と申込方法",
    description:
      "静岡市に引っ越し予定の方が保育園に申し込む方法と必要書類を解説します。",
    image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>転入予定者の申込</h2>
<p>静岡市に転入予定の方も認可保育園に申し込むことができます。転入先の区役所で手続きを行います。</p>

<h2>申込に必要なもの</h2>
<ul>
<li>通常の申込書類一式</li>
<li>転入を証明する書類（売買契約書・賃貸契約書など）</li>
<li>転入予定日がわかる書類</li>
</ul>

<h2>申込のタイミング</h2>
<p>4月入園の場合、転入前でも申込が可能です。ただし入園月までに転入が完了している必要があります。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>他の自治体から転入する場合、前住所地での保育園利用実績は静岡市の選考でも考慮されます。認可外利用の証明書は前住所地で取得しておきましょう。</p>
</div>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>転入予定での申込は、実際に転入しなかった場合は入園が取り消しになります。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 22,
  },
  {
    slug: "kyoiku-hoiku-chigai",
    citySlug: "shizuoka",
    title: "静岡市の教育認定と保育認定の違い",
    description:
      "静岡市の保育園・幼稚園利用に必要な認定区分（1号・2号・3号）の違いを解説します。",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>認定区分の種類</h2>
<p>静岡市で保育園や幼稚園を利用するには、子どもの年齢と保育の必要性に応じた認定を受ける必要があります。</p>

<table>
<tr><th>認定区分</th><th>年齢</th><th>保育の必要性</th><th>利用先</th></tr>
<tr><td>1号認定</td><td>3〜5歳</td><td>不要</td><td>幼稚園・認定こども園</td></tr>
<tr><td>2号認定</td><td>3〜5歳</td><td>必要</td><td>保育園・認定こども園</td></tr>
<tr><td>3号認定</td><td>0〜2歳</td><td>必要</td><td>保育園・小規模保育等</td></tr>
</table>

<h2>保育の必要性の事由</h2>
<ul>
<li>就労（月48時間以上）</li>
<li>妊娠・出産</li>
<li>疾病・障がい</li>
<li>介護・看護</li>
<li>求職活動</li>
<li>就学</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>保育園の利用には2号または3号認定が必要です。認定申請は保育園の申込と同時に行えます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 21,
  },
  {
    slug: "hokatsu-calendar",
    citySlug: "shizuoka",
    title: "静岡市の保活カレンダー　月別やることリスト",
    description:
      "静岡市で保活をする際の月別スケジュールとやるべきことを一覧にまとめました。",
    image: "https://images.unsplash.com/photo-1506784365847-bbad939e9335?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>月別保活カレンダー</h2>

<table>
<tr><th>時期</th><th>やること</th></tr>
<tr><td>4〜5月</td><td>市のホームページで保育園情報を収集</td></tr>
<tr><td>6〜7月</td><td>保育園の見学予約・見学開始</td></tr>
<tr><td>8〜9月</td><td>見学を継続、希望園を絞り込み</td></tr>
<tr><td>9〜10月</td><td>書類準備、就労証明書を依頼</td></tr>
<tr><td>10〜11月</td><td>申込書類の提出</td></tr>
<tr><td>12月</td><td>選考期間（結果を待つ）</td></tr>
<tr><td>1〜2月</td><td>結果通知、不承諾なら二次選考へ</td></tr>
<tr><td>3月</td><td>入園準備（持ち物・慣らし保育の確認）</td></tr>
<tr><td>4月</td><td>入園・職場復帰</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>見学は早めに始めましょう。秋になると見学の予約が取りにくくなる園もあります。夏のうちに主な候補園は見学を終えておくと安心です。</p>
</div>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>申込の締切日は厳守です。遅れると一次選考に間に合いません。締切日を確認して余裕を持って提出しましょう。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 20,
  },
  {
    slug: "souba-tensuu",
    citySlug: "shizuoka",
    title: "静岡市の入園ボーダー点数の目安",
    description:
      "静岡市の認可保育園に入園するために必要な点数の目安を解説します。",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>入園ボーダーの目安</h2>
<p>静岡市の認可保育園は基本指数＋調整指数で選考されます。人気園の1歳児クラスでは20点以上（加点あり）が必要になることがあります。</p>

<h2>エリア別の目安</h2>
<table>
<tr><th>エリア</th><th>1歳児クラスのボーダー目安</th></tr>
<tr><td>葵区中心部</td><td>20〜25点</td></tr>
<tr><td>駿河区</td><td>20〜23点</td></tr>
<tr><td>清水区</td><td>20点前後</td></tr>
</table>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>上記は一般的な傾向であり、年度・園によって大きく異なります。正確なボーダーは公表されていません。</p>
</div>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>基本指数20点のみ（加点なし）でも入れる園は多くあります。清水区や郊外の園であれば20点でも十分入園の可能性があります。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 19,
  },
  {
    slug: "ku-betsu-bairitsu",
    citySlug: "shizuoka",
    title: "静岡市の区別保育園入園倍率の傾向",
    description:
      "静岡市の葵区・駿河区・清水区それぞれの保育園入園の難易度の傾向を解説します。",
    image: "https://images.unsplash.com/photo-1524813686514-a57563d77965?w=800&h=400&fit=crop",
    category: "エリア情報",
    categoryColor: "teal",
    content: `<h2>静岡市3区の保育園事情</h2>
<p>静岡市は葵区・駿河区・清水区の3区に分かれています。区によって保育園の競争率に差があります。</p>

<h2>各区の傾向</h2>

<h3>葵区</h3>
<p>静岡駅周辺の中心部は最も競争率が高いエリアです。ただし葵区は市内最大の面積を持ち、山間部では保育需要が低めです。</p>

<h3>駿河区</h3>
<p>住宅地として人気が高く、子育て世帯が多いエリアです。南部を中心に保育需要が高い傾向にあります。</p>

<h3>清水区</h3>
<p>葵区・駿河区に比べると保育園に入りやすい傾向があります。保育園の選択肢も比較的多いエリアです。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>静岡市では区をまたいで保育園に申し込めます。通勤経路を考慮して複数の区の園を希望園に入れると入園の可能性が高まります。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 18,
  },
  {
    slug: "ikukyu-enchou-risk",
    citySlug: "shizuoka",
    title: "静岡市で育休延長する際のリスクと注意点",
    description:
      "静岡市で保育園に入れず育休を延長する場合のリスクと手続きの注意点を解説します。",
    image: "https://images.unsplash.com/photo-1492725764893-90b379c2b6e7?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>育休延長の条件</h2>
<p>保育園に入れなかった場合、不承諾通知をもとに育休を1歳6か月まで、さらに2歳まで延長できます。</p>

<h2>育休延長のリスク</h2>
<ul>
<li>翌年度の1歳児クラスはさらに競争が激しい</li>
<li>育児休業給付金は延長後も支給されるが、金額は減る場合がある</li>
<li>職場でのキャリアへの影響</li>
</ul>

<h2>意図的な育休延長の注意点</h2>
<p>2025年4月以降、育休延長時にはハローワークが「保育園の申込が適切に行われたか」を確認する運用が厳格化されています。入れる園を辞退して延長する方法は通用しにくくなっています。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>育休延長を見据える場合でも、まずは真剣に保育園に申し込むことが重要です。不承諾通知は育休延長の手続きに必要な書類です。</p>
</div>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>不承諾通知を得るためだけに1園のみ申し込む行為は、育児休業給付金の審査で問題になることがあります。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 17,
  },
  {
    slug: "fukushoku-junbi",
    citySlug: "shizuoka",
    title: "静岡市で保育園入園後の復職準備チェックリスト",
    description:
      "静岡市で保育園の入園が決まった後に職場復帰に向けて準備すべきことをまとめました。",
    image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>入園決定後の準備</h2>
<p>静岡市で保育園の内定が出たら、入園準備と復職準備を並行して進めましょう。</p>

<h2>復職準備チェックリスト</h2>
<ul>
<li>勤務先への復帰日の連絡</li>
<li>時短勤務の申請（利用する場合）</li>
<li>通勤経路の確認（保育園経由）</li>
<li>病児保育・病後児保育の登録</li>
<li>ファミリーサポートセンターの登録</li>
<li>慣らし保育の期間の確認と勤務先への相談</li>
</ul>

<h2>慣らし保育</h2>
<p>多くの園で1〜2週間の慣らし保育があります。初日は1〜2時間、徐々に時間を延ばしていきます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>慣らし保育中は短時間しか預けられないため、復帰日を4月中旬以降に設定すると余裕があります。勤務先と相談しましょう。</p>
</div>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>入園後は復帰が前提です。復帰しない場合は退園になる可能性があります。育休復帰加点を利用した場合は特に注意してください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 16,
  },
  {
    slug: "sannin-me-hokatsu",
    citySlug: "shizuoka",
    title: "静岡市の第3子以降の保活　保育料無料と加点",
    description:
      "静岡市で第3子以降の子どもの保活で適用される保育料無料制度と入園選考の加点を解説します。",
    image: "https://images.unsplash.com/photo-1471286174890-9c112ffca5b4?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>第3子以降の保育料</h2>
<p>静岡市では第3子以降の子どもの保育料は無料になる制度があります。0〜2歳児の保育料が免除されるため、経済的な負担が大きく軽減されます。</p>

<h2>きょうだい加点の活用</h2>
<p>上の子が保育園に在園している場合、同じ園を希望すれば<span class="highlight">+2点</span>のきょうだい在園加点が得られます。きょうだい同時申込の場合は<span class="highlight">+1点</span>です。</p>

<h2>多子世帯の副食費免除</h2>
<p>第3子以降は給食の副食費も免除の対象になる場合があります。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>第3子以降は保育料無料に加えて、きょうだい在園の加点や同時申込の加点が使えるため、入園選考では有利になりやすいです。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>多子世帯の減免制度は<a href="https://www.city.shizuoka.lg.jp/p000040.html" target="_blank" rel="noopener">静岡市公式サイト</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 15,
  },
  {
    slug: "tanshin-funin",
    citySlug: "shizuoka",
    title: "静岡市で単身赴任世帯の保育園申込と点数",
    description:
      "静岡市で配偶者が単身赴任中の場合の保育園申込方法と点数への影響を解説します。",
    image: "https://images.unsplash.com/photo-1507679799987-c73b1567a95d?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>単身赴任世帯の扱い</h2>
<p>静岡市では配偶者が単身赴任中でも両親の就労状況で基本指数が算定されます。単身赴任先の就労証明書が必要です。</p>

<h2>基本指数の計算</h2>
<p>父母それぞれの就労状況に基づいて基本指数が算定されます。単身赴任中の配偶者もフルタイム勤務であれば10点になります。</p>

<h2>必要書類</h2>
<ul>
<li>単身赴任先の勤務先が発行する就労証明書</li>
<li>単身赴任を証明する書類（辞令や赴任先の住民票など）</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>単身赴任世帯はひとり親世帯とは異なるため、ひとり親加点（+3点）は適用されません。両親とも就労中として通常の基本指数で計算されます。</p>
</div>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>単身赴任の場合、実質的に一人で育児を行うことになりますが、ひとり親とは扱いが異なります。調整指数の加点対象にならない場合が多いです。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 14,
  },
  {
    slug: "sofu-sobo-doukyo",
    citySlug: "shizuoka",
    title: "静岡市で祖父母と同居している場合の点数への影響",
    description:
      "静岡市で祖父母と同居・近居している場合の保育園入園選考への影響を解説します。",
    image: "https://images.unsplash.com/photo-1531983412531-1f49a365ffed?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>祖父母同居の影響</h2>
<p>静岡市では同居の祖父母がいる場合、選考に影響する可能性があります。祖父母が65歳未満で就労していない場合は「保育できる人がいる」とみなされることがあります。</p>

<h2>確認すべきポイント</h2>
<ul>
<li>同居の祖父母の年齢と就労状況</li>
<li>祖父母の健康状態</li>
<li>同点時の優先順位への影響</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>祖父母が就労中や65歳以上の場合は「保育できない」と判断されるため、マイナスの影響は受けにくいです。祖父母の就労証明書も提出できる場合があります。</p>
</div>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>自治体によって祖父母同居の扱いは異なります。静岡市の最新の基準を区役所に確認してください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 13,
  },
  {
    slug: "fushoninchi-taiou",
    citySlug: "shizuoka",
    title: "静岡市で不承諾通知が届いたときの対応手順",
    description:
      "静岡市の保育園入園選考で不承諾（保留）通知が届いた場合にすべきことを時系列で解説します。",
    image: "https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>不承諾通知が届いたら</h2>
<p>静岡市で不承諾通知が届いても慌てずに対応しましょう。以下の手順で進めてください。</p>

<h3>すぐにやること</h3>
<div class="step">
<div class="step-num">1</div>
<div class="step-content">
<strong>不承諾通知を保管</strong>
<p>育休延長の手続きに必要です。原本を大切に保管してください。</p>
</div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content">
<strong>二次選考への申込を検討</strong>
<p>二次選考の申込期限を確認し、希望園を見直して申し込みます。</p>
</div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content">
<strong>認可外保育施設を探す</strong>
<p>認可外保育施設や企業主導型保育施設の空き状況を確認します。</p>
</div>
</div>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>勤務先には早めに状況を報告しましょう。育休延長の手続きには不承諾通知が必要です。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 12,
  },
  {
    slug: "taiki-jidou-taisaku",
    citySlug: "shizuoka",
    title: "静岡市の待機児童対策と保育園の整備状況",
    description:
      "静岡市が行っている待機児童対策と保育園の新設・定員増の取り組みを紹介します。",
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&h=400&fit=crop",
    category: "最新情報",
    categoryColor: "purple",
    content: `<h2>静岡市の待機児童対策</h2>
<p>静岡市は待機児童の解消に向けて保育園の新設や定員増の取り組みを進めています。</p>

<h2>主な取り組み</h2>
<ul>
<li>認可保育園の新設</li>
<li>既存園の定員増</li>
<li>小規模保育事業の整備</li>
<li>企業主導型保育施設への支援</li>
<li>保育士の確保・処遇改善</li>
</ul>

<h2>保育士の確保</h2>
<p>保育園の定員を増やすには保育士の確保が不可欠です。静岡市では保育士の処遇改善や就職支援を行っています。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>新設園や定員増の情報は毎年更新されます。最新の保育利用調整基準で新しい園の情報を確認しましょう。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>静岡市の保育施策は<a href="https://www.city.shizuoka.lg.jp/p000040.html" target="_blank" rel="noopener">静岡市公式サイト</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 11,
  },
  {
    slug: "tennen-moshikomi",
    citySlug: "shizuoka",
    title: "静岡市の途中入園（年度途中申込）の方法",
    description:
      "静岡市で年度途中に保育園に入園する方法と空き状況の確認方法を解説します。",
    image: "https://images.unsplash.com/photo-1484820540004-14229fe36ca4?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>途中入園とは</h2>
<p>静岡市では4月以外にも、空きがあれば毎月途中入園が可能です。転勤や急な就労開始などで年度途中に保育園が必要になった場合に利用します。</p>

<h2>申込方法</h2>
<ul>
<li>入園希望月の前月の締切日までに申込</li>
<li>各区役所の窓口で手続き</li>
<li>必要書類は4月入園と同じ</li>
</ul>

<h2>途中入園の注意点</h2>
<ul>
<li>空きがある園でないと入れない</li>
<li>人気園は年度途中の空きがほぼない</li>
<li>0歳児は産休明けの月齢を過ぎていれば申込可能</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>静岡市のホームページで毎月の空き状況が公開されています。空きのある園を狙って申し込むと入園の可能性が高まります。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>空き状況は<a href="https://www.city.shizuoka.lg.jp/p000040.html" target="_blank" rel="noopener">静岡市公式サイト</a>で毎月更新されています。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 10,
  },
];

registerArticles(articles);
