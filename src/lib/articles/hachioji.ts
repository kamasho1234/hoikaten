import type { Article } from "./types";
import { registerArticles } from "./index";

const articles: Article[] = [
  {
    slug: "hokatsu-schedule",
    citySlug: "hachioji",
    title: "八王子市の保活スケジュール　申込から内定までの流れ",
    description:
      "八王子市の認可保育園の申込時期・選考の流れをまとめました。令和8年度4月入園の動き方を解説します。",
    image: "https://images.unsplash.com/photo-1484820540004-14229fe36ca4?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>八王子市の4月入園スケジュール</h2>
<p>八王子市の認可保育園は毎年秋に翌年度4月入園の一次申込を受付けます。利用調整基準指数表を理解して準備を進めましょう。</p>

<h3>保活の全体スケジュール</h3>
<div class="step">
<div class="step-num">1</div>
<div class="step-content">
<strong>4月〜6月：情報収集</strong>
<p>八王子市子育て応援サイトで保育園の一覧を確認します。</p>
</div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content">
<strong>6月〜9月：保育園見学</strong>
<p>八王子市は広いので、通勤経路も考慮して複数の園を見学しましょう。</p>
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
<strong>11月：申込書類の提出</strong>
<p>4月一次の申込期限は11月中旬です。</p>
</div>
</div>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>八王子市は基準指数が父母各最大10点（合計20点満点）です。週の就労時間で判定される制度です。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳しくは<a href="https://kosodate.city.hachioji.tokyo.jp/soshiki/hoikuyochienka/hoikuyochienka_nyushotanto/2180.html" target="_blank" rel="noopener">八王子市子育て応援サイト</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 55,
  },
  {
    slug: "scoring-system-guide",
    citySlug: "hachioji",
    title: "八王子市の入園点数のしくみ　基準指数と調整指数を解説",
    description:
      "八王子市の保育園入園選考で使われる基準指数と調整指数のしくみを解説します。",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>八王子市の選考指数とは</h2>
<p>八王子市の認可保育園は「基準指数（別表1）＋調整指数（別表2）」の合計で選考されます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>利用調整指数 ＝ 基準指数（父＋母）＋ 調整指数</p>
</div>

<h2>基準指数（父母各最大10点、合計20点）</h2>
<p>就労の場合、週40時間以上で満点の<span class="highlight">10点</span>です。</p>

<table>
<tr><th>週の就労時間</th><th>指数</th></tr>
<tr><td>週40時間以上</td><td>10</td></tr>
<tr><td>週35時間以上40時間未満</td><td>9</td></tr>
<tr><td>週30時間以上35時間未満</td><td>8</td></tr>
<tr><td>週25時間以上30時間未満</td><td>7</td></tr>
<tr><td>週16時間以上25時間未満</td><td>6</td></tr>
</table>

<h2>調整指数の代表例</h2>
<ul>
<li>ひとり親世帯：<span class="highlight">+2点</span></li>
<li>小規模保育卒園に伴う転所：<span class="highlight">+2点</span></li>
<li>きょうだいが在園中：<span class="highlight">+1点</span></li>
<li>認可外利用中：<span class="highlight">+1点</span></li>
<li>育休復帰予定：<span class="highlight">+1点</span></li>
<li>生活保護世帯：<span class="highlight">+1点</span></li>
</ul>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>全項目は<a href="https://kosodate.city.hachioji.tokyo.jp/soshiki/hoikuyochienka/hoikuyochienka_nyushotanto/2180.html" target="_blank" rel="noopener">八王子市子育て応援サイト</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 65,
  },
  {
    slug: "score-up-tips",
    citySlug: "hachioji",
    title: "八王子市で入園点数を上げるコツ　加点チェックリスト",
    description:
      "八王子市の保育園入園選考で調整指数の加点を最大限に活用する方法を解説します。",
    image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>基準指数20点は出発点</h2>
<p>八王子市ではフルタイム共働き世帯は基準指数<span class="highlight">20点</span>で横並びです。差がつくのは調整指数の加点です。</p>

<h2>加点チェックリスト</h2>
<table>
<tr><th>項目</th><th>点数</th><th>条件</th></tr>
<tr><td>ひとり親世帯</td><td>+2点</td><td>母子・父子家庭の場合</td></tr>
<tr><td>小規模保育卒園</td><td>+2点</td><td>小規模保育等の卒園に伴う転所</td></tr>
<tr><td>きょうだい在園</td><td>+1点</td><td>認可保育園にきょうだいが在園中</td></tr>
<tr><td>認可外利用</td><td>+1点</td><td>認可外保育施設に月ぎめで利用中</td></tr>
<tr><td>育休復帰予定</td><td>+1点</td><td>入園月に職場復帰する場合</td></tr>
<tr><td>生活保護</td><td>+1点</td><td>生活保護を受けている場合</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>八王子市ではボーダー表を公開しています。園ごとのボーダーを確認して、自分の点数で入園できそうな園を探しましょう。</p>
</div>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>就労証明書の週あたり就労時間は正確に記載してください。実態と異なる記載は入園取消しの対象です。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 100,
  },
  {
    slug: "tiebreaker-rules",
    citySlug: "hachioji",
    title: "八王子市で同点になったらどうなる？優先順位を解説",
    description:
      "八王子市の保育園入園選考で同点だった場合の優先順位の判定方法を解説します。",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>同点時の判定方法</h2>
<p>八王子市の入園選考で利用調整指数が同点になった場合、さらに優先順位で判定されます。</p>

<h2>同点時に考慮される要素</h2>
<ul>
<li>保育の必要性がより高い世帯が優先</li>
<li>きょうだいが在園中の園への申込は優先</li>
<li>所得が低い世帯が優先</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>八王子市の20点制では調整指数の加点幅が小さいため、同点が発生しやすいです。1点の差が大きいため、使える加点は漏れなく申請しましょう。</p>
</div>

<h2>ボーダー表を活用</h2>
<p>八王子市では4月一次利用調整のボーダー表を公開しています。前年度のボーダーを確認して、希望園選びの参考にしましょう。</p>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>ボーダーは年度によって変動します。前年度と同じとは限りませんので、余裕を持った園選びをしましょう。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 85,
  },
  {
    slug: "part-time-work-score",
    citySlug: "hachioji",
    title: "八王子市で時短勤務だと点数はどう変わる？",
    description:
      "八王子市の保育園入園選考で時短勤務の場合の基準指数への影響を解説します。",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>八王子市は週の就労時間で判定</h2>
<p>八王子市の基準指数は週の就労時間で決まります。時短勤務の影響を確認しましょう。</p>

<table>
<tr><th>週の就労時間</th><th>基準指数</th></tr>
<tr><td>週40時間以上</td><td>10点</td></tr>
<tr><td>週35時間以上40時間未満</td><td>9点</td></tr>
<tr><td>週30時間以上35時間未満</td><td>8点</td></tr>
<tr><td>週25時間以上30時間未満</td><td>7点</td></tr>
<tr><td>週16時間以上25時間未満</td><td>6点</td></tr>
</table>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>週5日×6時間＝週30時間の時短勤務の場合、基準指数は<span class="highlight">8点</span>です。フルタイムの10点と比べて2点下がります。</p>
</div>

<h2>週40時間の壁</h2>
<p>満点の10点を得るには週40時間以上が必要です。1日8時間×5日＝40時間がちょうど満点ラインです。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>八王子市は週の就労時間で判定されるため、月単位で計算する自治体と比べて時短勤務の影響が出やすいです。復職後のフルタイム勤務条件を就労証明書に記載してもらえるか確認しましょう。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 90,
  },
  {
    slug: "rejection-options",
    citySlug: "hachioji",
    title: "八王子市で保育園に落ちたときの選択肢",
    description:
      "八王子市の認可保育園に不承諾となった場合の対応策をまとめました。",
    image: "https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>不承諾になったら</h2>
<p>八王子市で認可保育園に不承諾になった場合でも、複数の選択肢があります。</p>

<h3>1. 二次選考への申込</h3>
<p>一次選考後に空きが出た園について、二次選考が行われます。</p>

<h3>2. 認可外保育施設の利用</h3>
<p>認可外保育施設を利用することで、翌年度の申込で<span class="highlight">+1点</span>の加点が見込めます。</p>

<h3>3. 小規模保育の利用</h3>
<p>小規模保育事業を利用し、卒園時に認可保育園へ転所する方法があります。卒園に伴う転所で<span class="highlight">+2点</span>の加点が得られます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>八王子市は市域が広く、駅から離れた園には比較的空きがある場合があります。送迎の範囲を広げることも検討しましょう。</p>
</div>

<h3>4. 途中入園</h3>
<p>空きが出た場合に途中入園が可能です。</p>

<h3>5. 育休延長</h3>
<p>不承諾通知があれば育休を最長2歳まで延長できます。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>最新情報は<a href="https://kosodate.city.hachioji.tokyo.jp/soshiki/hoikuyochienka/hoikuyochienka_nyushotanto/2180.html" target="_blank" rel="noopener">八王子市子育て応援サイト</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 80,
  },
  {
    slug: "unlicensed-nursery-bonus",
    citySlug: "hachioji",
    title: "八王子市で認可外保育施設の利用で加点を得る方法",
    description:
      "八王子市では認可外保育施設の月ぎめ利用で+1点の加点が得られます。その条件を解説します。",
    image: "https://images.unsplash.com/photo-1587654780291-39c9404d7dd0?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>認可外利用の加点</h2>
<p>八王子市では認可外保育施設に月ぎめで預けている場合、調整指数で<span class="highlight">+1点</span>の加点が得られます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>月ぎめの契約が条件です。20点制の八王子市では1点の差が当落を分けることがあります。</p>
</div>

<h2>対象となる施設</h2>
<ul>
<li>認可外保育施設</li>
<li>企業主導型保育施設</li>
</ul>

<h2>小規模保育卒園なら+2点</h2>
<p>小規模保育等の卒園に伴う転所の場合は<span class="highlight">+2点</span>の加点があります。認可外利用（+1点）よりも大きな加点です。2歳まで小規模保育に入園し、3歳で認可保育園に転所する作戦も有効です。</p>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>利用証明書が必要になりますので、利用している施設に発行を依頼してください。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 75,
  },
  {
    slug: "next-year-changes",
    citySlug: "hachioji",
    title: "八王子市の令和8年度入園　変更点と注意事項",
    description:
      "八王子市の令和8年度保育園入園選考の注意点をまとめました。",
    image: "https://images.unsplash.com/photo-1506784365847-bbad939e9335?w=800&h=400&fit=crop",
    category: "最新情報",
    categoryColor: "purple",
    content: `<h2>令和8年度の注意点</h2>
<p>八王子市の保育園入園制度は毎年見直しが行われます。最新の利用調整基準指数表を確認しましょう。</p>

<h2>確認すべきポイント</h2>
<ul>
<li>基準指数・調整指数の変更有無</li>
<li>新設園の情報</li>
<li>定員の増減</li>
<li>ボーダー表の公開</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>八王子市は4月一次利用調整のボーダー表を公開しています。前年度のボーダーを確認して、園選びの参考にしましょう。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>最新情報は<a href="https://kosodate.city.hachioji.tokyo.jp/soshiki/hoikuyochienka/hoikuyochienka_nyushotanto/2180.html" target="_blank" rel="noopener">八王子市子育て応援サイト</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 70,
  },
  {
    slug: "popular-areas",
    citySlug: "hachioji",
    title: "八王子市の人気エリアと入りやすい地域の傾向",
    description:
      "八王子市内で保育園の競争率が高いエリアと比較的入りやすい地域を解説します。",
    image: "https://images.unsplash.com/photo-1524813686514-a57563d77965?w=800&h=400&fit=crop",
    category: "エリア情報",
    categoryColor: "teal",
    content: `<h2>八王子市の保育園事情</h2>
<p>八王子市は東京都内で最大の面積を持つ自治体です。エリアによって保育園の競争率に大きな差があります。</p>

<h2>競争率が高い傾向のエリア</h2>
<ul>
<li>八王子駅周辺：市の中心地で子育て世帯に人気</li>
<li>南大沢・堀之内エリア：多摩ニュータウンの子育て世帯が多い地域</li>
<li>めじろ台・西八王子エリア：住宅地として人気</li>
</ul>

<h2>比較的入りやすい傾向のエリア</h2>
<ul>
<li>北部山間エリア（高尾・恩方方面）：保育需要が低め</li>
<li>東部エリア（北野・長沼方面）：新設園が増えている地域</li>
<li>西部エリア（高尾山口方面）：駅から離れた園は空きがある場合も</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>八王子市は車での送迎が一般的なエリアも多いです。通勤経路上の園も含めて広い範囲で希望園を検討しましょう。</p>
</div>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>エリアの難易度は年度や年齢クラスによって変わります。ボーダー表を確認して最新の傾向を把握しましょう。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 60,
  },
  {
    slug: "competition-reality",
    citySlug: "hachioji",
    title: "八王子市の保育園入園競争の実態",
    description:
      "八王子市の保育園入園はどのくらい厳しいのか。20点制の選考の実態を解説します。",
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>八王子市の入園競争の現状</h2>
<p>八王子市は東京都内では比較的保育環境が整っていますが、人気エリアでは競争があります。</p>

<h2>ボリュームゾーン</h2>
<p>フルタイム共働き世帯は基準指数<span class="highlight">20点</span>で横並びです。調整指数の加点で差がつきます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>八王子市はボーダー表を公開しており、園ごとの内定ラインを確認できます。前年度のボーダーが20点の園では、調整指数の加点がなくても入園できる可能性があります。</p>
</div>

<h2>年齢別の傾向</h2>
<ul>
<li>0歳児クラス：受入枠が限られるため園によっては競争がある</li>
<li>1歳児クラス：最も競争が激しい年齢</li>
<li>2歳児クラス：空きが少ない園もある</li>
<li>3歳児以上：枠が増えるため比較的入りやすい</li>
</ul>

<h2>都心と比較した八王子の特徴</h2>
<p>八王子市は23区と比較すると全体的に入りやすい傾向があります。ただし南大沢や八王子駅周辺の人気園では競争率が高くなります。</p>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>求職活動中の基準指数は4点で、就労中（最大10点）の半分以下です。求職中での入園は人気園では困難です。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 95,
  },
];

registerArticles(articles);
