import type { Article } from "./types";
import { registerArticles } from "./index";

const articles: Article[] = [
  {
    slug: "hokatsu-schedule",
    citySlug: "fuchu",
    title: "府中市の保活スケジュール　申込から内定までの流れ",
    description:
      "府中市の認可保育園の申込時期・選考の流れをまとめました。令和8年度4月入園の動き方を解説します。",
    image: "https://images.unsplash.com/photo-1484820540004-14229fe36ca4?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>府中市の4月入園スケジュール</h2>
<p>府中市の認可保育園は毎年秋に翌年度4月入園の申込を受付けます。「保育所等入所のしおり」で最新の制度を確認しましょう。</p>

<h3>保活の全体スケジュール</h3>
<div class="step">
<div class="step-num">1</div>
<div class="step-content">
<strong>4月〜6月：情報収集</strong>
<p>府中市公式サイトで保育園一覧や前年度のしおりを確認します。</p>
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
<strong>10月〜11月：入所のしおり入手・書類準備</strong>
<p>最新のしおりを入手し、就労証明書などを準備します。</p>
</div>
</div>
<div class="step">
<div class="step-num">4</div>
<div class="step-content">
<strong>11月〜12月：申込書類の提出</strong>
<p>保育支援課窓口または郵送で提出します。</p>
</div>
</div>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>府中市は基本指数が父母各最大100点（合計200点満点）です。週あたりの労働時間で判定されます。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳しくは<a href="https://www.city.fuchu.tokyo.jp/kosodate/shussan/hoikujo/index.html" target="_blank" rel="noopener">府中市公式サイト 保育所・保育園</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 60,
  },
  {
    slug: "scoring-system-guide",
    citySlug: "fuchu",
    title: "府中市の入園点数のしくみ　基本指数と調整指数を解説",
    description:
      "府中市の保育園入園選考で使われる基本指数と調整指数のしくみを解説します。",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>府中市の選考指数とは</h2>
<p>府中市の認可保育園の入園選考は「基本指数＋調整指数」の合計で行われます。保護者それぞれの基本指数に調整指数を加えた「総合点」が高い世帯が優先されます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>総合点 = 基本指数（保護者1 + 保護者2）+ 調整指数（世帯に係る調整点）</p>
</div>

<h2>基本指数（父母各最大100点、合計200点）</h2>
<p>就労の場合、週40時間以上で満点の<span class="highlight">100点</span>になります。</p>

<table>
<tr><th>週あたりの労働時間</th><th>基本指数</th></tr>
<tr><td>週40時間以上</td><td>100</td></tr>
<tr><td>週32〜40時間未満</td><td>90</td></tr>
<tr><td>週24〜32時間未満</td><td>80</td></tr>
<tr><td>1日4時間以上・週3日以上（週24時間未満）</td><td>70</td></tr>
<tr><td>月48時間以上（上記に該当しない）</td><td>60</td></tr>
</table>

<h2>世帯に係る調整点の代表例</h2>
<ul>
<li>ひとり親世帯：<span class="highlight">最大+10点</span></li>
<li>育児休業後の再利用：<span class="highlight">+10点</span></li>
<li>認可外保育施設に6か月以上預けている：<span class="highlight">+3点</span></li>
<li>きょうだいが在園中の施設に申込：<span class="highlight">+2点</span></li>
<li>生活保護受給世帯：<span class="highlight">+1点</span></li>
</ul>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>全項目は<a href="https://www.city.fuchu.tokyo.jp/kosodate/shussan/hoikujo/index.html" target="_blank" rel="noopener">府中市公式サイト</a>の「保育所等入所のしおり」で確認できます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 55,
  },
  {
    slug: "score-up-tips",
    citySlug: "fuchu",
    title: "府中市で入園点数を上げるコツ　加点を最大化する方法",
    description:
      "府中市の保育園入園選考で調整指数の加点を最大限に活用する方法を解説します。",
    image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>基本指数200点は出発点</h2>
<p>府中市ではフルタイム共働き世帯は基本指数<span class="highlight">200点</span>で横並びです。差がつくのは調整指数の部分です。</p>

<h2>加点チェックリスト</h2>
<table>
<tr><th>項目</th><th>点数</th><th>条件</th></tr>
<tr><td>ひとり親世帯</td><td>最大+10</td><td>ひとり親が保育をしている世帯</td></tr>
<tr><td>育休後の再利用</td><td>+10</td><td>育児休業取得後1年以上経過からの再申込</td></tr>
<tr><td>認可外利用（6か月以上）</td><td>+3</td><td>認可外保育施設に月ぎめで6か月以上預けている</td></tr>
<tr><td>認可外利用（3〜6か月）</td><td>+2</td><td>認可外保育施設に月ぎめで3か月以上預けている</td></tr>
<tr><td>きょうだい在園施設への申込</td><td>+2</td><td>きょうだいが在園中の施設への申込</td></tr>
<tr><td>保育士資格で就労中</td><td>+1</td><td>保育士等の資格を持ち保育施設で就労中・予定</td></tr>
</table>

<h2>認可外保育施設の活用</h2>
<p>認可外保育施設に6か月以上預けると+3点になります。3か月以上6か月未満でも+2点です。月ぎめ契約が条件で、一時保育は対象外です。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>府中市は利用料の滞納があると-50点の大幅減点になります。必ず期限内に支払いましょう。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 50,
  },
  {
    slug: "tiebreaker-rules",
    citySlug: "fuchu",
    title: "府中市の同点時の優先順位　点数が同じ場合どうなる？",
    description:
      "府中市の保育園入園選考で指数が同点になった場合の優先順位のルールを解説します。",
    image: "https://images.unsplash.com/photo-1590650153855-d9e808231d41?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>同点時の優先順位</h2>
<p>府中市では総合点が同点になった場合、以下の優先順位で入園が決まります。</p>

<h3>優先順位（上から順に適用）</h3>
<ol>
<li>保護者指数の合算が高い世帯</li>
<li>主たる保護者の指数が高い世帯</li>
<li>主たる保護者の項目優先度が高い世帯</li>
<li>従たる保護者の指数が高い世帯</li>
<li>従たる保護者の項目優先度が高い世帯</li>
<li>生活保護受給世帯</li>
<li>市町村民税所得割が低い世帯</li>
</ol>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>同点勝負では「所得」が大きく影響します。市町村民税の所得割が低い世帯が優先されるため、世帯年収が高い場合は加点を確実に取ることが重要です。</p>
</div>

<h2>希望園数は多めに</h2>
<p>府中市では希望園を多く書いても不利にはなりません。通える範囲の園はすべて記入しましょう。</p>`,
    publishedAt: "2026-04-07",
    popularity: 45,
  },
  {
    slug: "part-time-work-score",
    citySlug: "fuchu",
    title: "府中市のパート・時短勤務の点数　週何時間で何点？",
    description:
      "府中市の保育園入園で、パートや時短勤務の場合にもらえる基本指数を解説します。",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>パート・時短勤務の基本指数</h2>
<p>府中市では週あたりの労働時間で基本指数が決まります。フルタイムでなくても点数が付きます。</p>

<table>
<tr><th>勤務パターン</th><th>基本指数</th></tr>
<tr><td>週40時間以上（フルタイム）</td><td>100</td></tr>
<tr><td>週32〜40時間未満</td><td>90</td></tr>
<tr><td>週24〜32時間未満</td><td>80</td></tr>
<tr><td>1日4時間以上・週3日以上（週24時間未満）</td><td>70</td></tr>
<tr><td>月48時間以上（上記に該当しない）</td><td>60</td></tr>
</table>

<h2>パートで入園するには</h2>
<p>週3日・1日6時間のパート（週18時間）なら月48時間以上で<span class="highlight">60点</span>です。週4日・1日6時間（週24時間）なら<span class="highlight">80点</span>に上がります。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>申込要件は月48時間以上の就労です。これを下回ると認可保育園の申込ができません。週あたりの時間を増やせないか勤務先に確認しましょう。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 45,
  },
  {
    slug: "rejection-options",
    citySlug: "fuchu",
    title: "府中市で不承諾になったら　次にやるべきこと",
    description:
      "府中市の保育園入園で不承諾通知が届いた場合の対処法をまとめました。",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=400&fit=crop",
    category: "不承諾対策",
    categoryColor: "rose",
    content: `<h2>不承諾通知が届いたら</h2>
<p>府中市では4月一次選考の結果が1月下旬〜2月上旬に届きます。不承諾だった場合の選択肢を整理しましょう。</p>

<h3>選択肢</h3>
<ul>
<li>二次募集に申し込む（2月〜3月）</li>
<li>5月以降の途中入園を申し込む</li>
<li>認可外保育施設を利用しながら翌年度に再申込する</li>
<li>幼稚園の預かり保育を検討する</li>
</ul>

<h2>二次募集のポイント</h2>
<p>二次募集は辞退などで空きが出た園に申し込めます。定員に空きがある園は府中市公式サイトで公開されます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>認可外保育施設に6か月以上預けてから翌年度に再申込すると、+3点の加点がもらえます。長期的な戦略が大切です。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>空き状況は<a href="https://www.city.fuchu.tokyo.jp/kosodate/shussan/hoikujo/ukeireyotei.html" target="_blank" rel="noopener">府中市 保育所等の受入予定人数</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 40,
  },
  {
    slug: "unlicensed-nursery-bonus",
    citySlug: "fuchu",
    title: "府中市で認可外加点を取る方法　対象施設と条件",
    description:
      "府中市で認可外保育施設の利用による加点を得る方法と注意点を解説します。",
    image: "https://images.unsplash.com/photo-1587654780291-39c9404d7dd0?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>認可外加点とは</h2>
<p>府中市では認可外保育施設等に有償で月ぎめの保育を利用している場合、世帯に係る調整点が加算されます。</p>

<h2>利用期間による点数の違い</h2>
<table>
<tr><th>利用期間</th><th>調整点</th></tr>
<tr><td>3か月以上6か月未満</td><td><span class="highlight">+2点</span></td></tr>
<tr><td>6か月以上</td><td><span class="highlight">+3点</span></td></tr>
</table>

<h2>対象となる条件</h2>
<ul>
<li>認可外保育施設に月ぎめ契約で預けていること</li>
<li>一時保育は対象外</li>
<li>認証保育所も認可外に含まれる</li>
<li>利用期間が長いほど加点が大きい</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>6か月以上の利用で+3点になるため、できるだけ早い時期から認可外保育施設の利用を始めると有利です。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 35,
  },
  {
    slug: "next-year-changes",
    citySlug: "fuchu",
    title: "府中市の保育園事情　最新動向と今後の見通し",
    description:
      "府中市の保育園整備計画や待機児童の動向など、最新の保育園事情をまとめました。",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=400&fit=crop",
    category: "最新情報",
    categoryColor: "purple",
    content: `<h2>府中市の保育園整備</h2>
<p>府中市は待機児童対策として認可保育所の新設や既存園の定員拡大を進めています。</p>

<h2>最近の傾向</h2>
<ul>
<li>府中駅・分倍河原駅周辺での保育需要が高い</li>
<li>小規模保育事業所の整備が進行中</li>
<li>企業主導型保育施設の増加</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>新設園は初年度に空きが出やすいため、保活では要チェックです。府中市公式サイトで最新の受入予定人数を確認しましょう。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>最新の保育園情報は<a href="https://www.city.fuchu.tokyo.jp/kosodate/shussan/hoikujo/index.html" target="_blank" rel="noopener">府中市公式サイト 保育所・保育園</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 30,
  },
  {
    slug: "popular-areas",
    citySlug: "fuchu",
    title: "府中市の地域別・保育園の入りやすさ",
    description:
      "府中市内の地域別に保育園の入りやすさを比較し、保活の参考情報をまとめました。",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=400&fit=crop",
    category: "地域情報",
    categoryColor: "teal",
    content: `<h2>府中市の地域特性</h2>
<p>府中市は京王線・南武線沿線を中心に住宅地が広がり、地域によって保育園の入りやすさに差があります。</p>

<h3>競争が激しいエリア</h3>
<ul>
<li>府中駅周辺：商業施設が充実し共働き世帯が多い</li>
<li>分倍河原駅周辺：京王線・南武線の乗り換え駅で利便性が高い</li>
</ul>

<h3>比較的入りやすいエリア</h3>
<ul>
<li>多磨霊園・白糸台エリア：駅から離れるが競争は緩やか</li>
<li>武蔵台・西府エリア：新設園の増加で定員が拡大傾向</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>府中市は利用可能者最低指数・指数分布を公開しています。希望園選びの参考にしましょう。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>指数分布は<a href="https://www.city.fuchu.tokyo.jp/kosodate/shussan/hoikujo/hoiku_shisu.html" target="_blank" rel="noopener">府中市 利用可能者最低指数・指数分布</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 45,
  },
  {
    slug: "competition-reality",
    citySlug: "fuchu",
    title: "府中市で保育園に入れる点数の目安　何点あれば安心？",
    description:
      "府中市の保育園入園に必要な点数の目安を、公開されている指数分布をもとに解説します。",
    image: "https://images.unsplash.com/photo-1460518451285-97b6aa326961?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>内定に必要な点数の目安</h2>
<p>府中市は人気の園ではフルタイム共働き（基本指数200点）に加え、調整指数の加点が必要になることがあります。</p>

<h3>目安</h3>
<table>
<tr><th>エリア・クラス</th><th>目安の点数</th></tr>
<tr><td>府中駅周辺（1歳児）</td><td>202〜205点</td></tr>
<tr><td>分倍河原周辺（1歳児）</td><td>200〜203点</td></tr>
<tr><td>郊外エリア（1歳児）</td><td>200点前後</td></tr>
<tr><td>0歳児クラス</td><td>200点前後</td></tr>
</table>

<p>1歳児クラスは最も競争が激しいクラスです。0歳児や3歳児クラスは比較的入りやすい傾向にあります。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>府中市は公式に利用可能者最低指数・指数分布を公開しています。希望園ごとの入りやすさを事前に確認しましょう。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>最新の指数分布は<a href="https://www.city.fuchu.tokyo.jp/kosodate/shussan/hoikujo/hoiku_shisu.html" target="_blank" rel="noopener">府中市公式サイト</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 50,
  },
];

registerArticles(articles);
