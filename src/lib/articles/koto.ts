import type { Article } from "./types";
import { registerArticles } from "./index";

const articles: Article[] = [
  {
    slug: "hokatsu-schedule",
    citySlug: "koto",
    title: "江東区の保活スケジュール　申込から内定までの流れ",
    description:
      "江東区の認可保育園の申込時期と選考の流れをまとめました。令和8年度4月入園の動き方を解説します。",
    image: "https://images.unsplash.com/photo-1484820540004-14229fe36ca4?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>江東区の4月入園スケジュール</h2>
<p>江東区は湾岸エリアのマンション開発で子育て世帯が急増しており、保活の準備は早めに始めることが重要です。</p>

<h3>保活の全体スケジュール</h3>
<div class="step">
<div class="step-num">1</div>
<div class="step-content">
<strong>4月〜6月：情報収集</strong>
<p>区のホームページで「入園のしおり」の前年度版を確認します。</p>
</div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content">
<strong>6月〜9月：保育園見学</strong>
<p>気になる園に電話予約して見学へ。湾岸エリアは見学予約が埋まりやすいので早めに動きましょう。</p>
</div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content">
<strong>9月〜10月：入園のしおりを入手・書類準備</strong>
<p>最新の「入園のしおり」を入手し、就労証明書などを準備します。</p>
</div>
</div>
<div class="step">
<div class="step-num">4</div>
<div class="step-content">
<strong>10月〜11月：申込書類の提出</strong>
<p>窓口または郵送で提出します。</p>
</div>
</div>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>江東区は基準指数が父母各最大12点（合計24点満点）です。就労時間は「週の合計時間」で判定される点が特徴です。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳しくは<a href="https://www.city.koto.lg.jp/kodomo/hoiku/index.html" target="_blank" rel="noopener">江東区公式サイト</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 55,
  },
  {
    slug: "scoring-system-guide",
    citySlug: "koto",
    title: "江東区の入園点数のしくみ　基準指数と調整指数を解説",
    description:
      "江東区の保育園入園選考で使われる基準指数と調整指数のしくみを解説します。",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>江東区の選考指数とは</h2>
<p>江東区の認可保育園は「基準指数＋調整指数」の合計で選考されます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>選考指数 ＝ 基準指数（父＋母）＋ 調整指数</p>
</div>

<h2>基準指数（父母各最大12点、合計24点）</h2>
<p>江東区は「月の勤務日数」と「週の勤務時間」の組み合わせで点数が決まります。月20日以上かつ週40時間以上で満点の<span class="highlight">12点</span>です。</p>

<table>
<tr><th>就労の状況</th><th>指数</th></tr>
<tr><td>月20日以上・週40時間以上</td><td>12</td></tr>
<tr><td>月20日以上・週35時間以上40時間未満</td><td>11</td></tr>
<tr><td>月16日以上・週40時間以上</td><td>11</td></tr>
<tr><td>月16日以上・週30時間以上40時間未満</td><td>10</td></tr>
<tr><td>月16日以上・週20時間以上30時間未満</td><td>9</td></tr>
<tr><td>月12日以上・週24時間以上</td><td>9</td></tr>
<tr><td>月12日以上・週16時間以上24時間未満</td><td>8</td></tr>
<tr><td>月48時間以上（上記以外）</td><td>7</td></tr>
</table>

<h2>調整指数の代表例</h2>
<ul>
<li>ひとり親世帯：<span class="highlight">+12点</span></li>
<li>小規模保育卒園に伴う転所：<span class="highlight">+3点</span></li>
<li>認証保育所・認可外に月16日以上預けている（2人以上）：<span class="highlight">+3点</span></li>
<li>認証保育所・認可外に月16日以上預けている（1人）：<span class="highlight">+2点</span></li>
<li>きょうだいが在園中の園を希望：<span class="highlight">+2点</span></li>
<li>育休復帰予定：<span class="highlight">+2点</span></li>
<li>保育士として保育施設で就労：<span class="highlight">+1点</span></li>
</ul>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>全項目は<a href="https://www.city.koto.lg.jp/kodomo/hoiku/index.html" target="_blank" rel="noopener">江東区公式サイト「入園のしおり」</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 65,
  },
  {
    slug: "score-up-tips",
    citySlug: "koto",
    title: "江東区で入園点数を上げるコツ　加点チェックリスト",
    description:
      "江東区の保育園入園選考で加点を最大限に活用する方法をまとめました。",
    image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>基準指数24点がスタートライン</h2>
<p>江東区ではフルタイム共働き世帯は基準指数<span class="highlight">24点</span>で横並びです。勝負は調整指数の加点にかかっています。</p>

<h2>加点チェックリスト</h2>
<table>
<tr><th>項目</th><th>点数</th><th>条件</th></tr>
<tr><td>ひとり親世帯</td><td>+12点</td><td>母子・父子家庭の場合</td></tr>
<tr><td>小規模保育卒園</td><td>+3点</td><td>小規模保育等の卒園に伴う転所</td></tr>
<tr><td>認可外利用（2人以上）</td><td>+3点</td><td>月16日以上の利用、2人以上</td></tr>
<tr><td>認可外利用（1人）</td><td>+2点</td><td>月16日以上の利用、1人</td></tr>
<tr><td>きょうだい在園</td><td>+2点</td><td>在園中の園を希望</td></tr>
<tr><td>育休復帰予定</td><td>+2点</td><td>入園月に職場復帰する場合</td></tr>
<tr><td>きょうだい同時申込</td><td>+1点</td><td>双子など同時申込</td></tr>
<tr><td>保育士として就労</td><td>+1点</td><td>保育施設で就労中または予定</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>江東区では認可外利用（+2〜3点）と育休復帰（+2点）を合わせると+4〜5点の加点になります。これらを確実に取ることが入園のカギです。</p>
</div>

<h2>保育士加点にも注目</h2>
<p>保育士として保育施設で就労している（または予定の）方には<span class="highlight">+1点</span>の加点があります。保育士資格を持つ方はぜひ活用しましょう。</p>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>認可外利用の加点は「月16日以上」の利用が条件です。利用日数が足りない場合は加点の対象外になるので注意してください。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 100,
  },
  {
    slug: "tiebreaker-rules",
    citySlug: "koto",
    title: "江東区で同点になったらどうなる？優先順位のルール",
    description:
      "江東区の保育園入園選考で同点だった場合の優先順位を解説します。",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>同点時の判定方法</h2>
<p>江東区の入園選考で合計指数が同点の場合、さらに細かい優先順位で判定されます。湾岸エリアを中心にフルタイム共働き世帯が多い江東区では、同点の発生率が高くなっています。</p>

<h2>同点時に考慮される要素</h2>
<ul>
<li>ひとり親世帯は優先</li>
<li>所得が低い世帯が優先</li>
<li>きょうだいが在園している園への申込は優先</li>
<li>保育の必要性がより高い世帯が優先</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>江東区のひとり親加点は<span class="highlight">+12点</span>と大きく、ひとり親世帯は大幅に有利です。ふたり親世帯は認可外利用や育休復帰の加点で差をつける必要があります。</p>
</div>

<h2>同点回避のために</h2>
<p>基準指数24点に加えて、認可外利用（+2〜3点）、育休復帰（+2点）、きょうだい在園（+2点）の加点を積むことで同点リスクを下げられます。</p>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>湾岸エリア（豊洲・有明・東雲など）は特に競争率が高く、加点なしの24点だけでは1歳児クラスの入園は厳しい状況です。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 85,
  },
  {
    slug: "part-time-work-score",
    citySlug: "koto",
    title: "江東区で時短勤務だと点数はどう変わる？",
    description:
      "江東区の保育園入園選考で時短勤務の場合の基準指数への影響を解説します。",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>江東区は「週の合計時間」で判定</h2>
<p>江東区の特徴は、勤務時間を「1日あたり」ではなく<span class="highlight">週の合計時間</span>で判定する点です。そのため時短勤務の影響が他区とは異なります。</p>

<table>
<tr><th>勤務パターン（月20日以上）</th><th>基準指数</th></tr>
<tr><td>週40時間以上</td><td>12点</td></tr>
<tr><td>週35時間以上40時間未満</td><td>11点</td></tr>
</table>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>週5日で1日7時間（週35時間）の時短勤務の場合、基準指数は12点ではなく<span class="highlight">11点</span>になります。</p>
</div>

<h2>週40時間の壁</h2>
<p>満点の12点を得るには週40時間以上が必要です。1日8時間×5日＝40時間がちょうど満点ラインです。7時間勤務だと週35時間で11点に下がります。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>江東区は「週の合計時間」で判定されるため、勤務日数を増やすことでもカバーできます。例えば1日6.5時間×週6日＝週39時間でも月20日以上なら11点ですが、残業を含め週40時間以上なら12点です。</p>
</div>

<h2>対策</h2>
<p>フルタイムで復帰する予定であれば就労証明書にフルタイムの時間を記載できます。復帰後に時短に変更する場合は、申込時点の状況で判定されます。</p>`,
    publishedAt: "2026-03-28",
    popularity: 90,
  },
  {
    slug: "rejection-options",
    citySlug: "koto",
    title: "江東区で保育園に落ちたときの選択肢",
    description:
      "江東区の認可保育園に不承諾となった場合の対応策をまとめました。",
    image: "https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>不承諾になったら</h2>
<p>江東区の一次選考で不承諾になっても、複数の選択肢があります。</p>

<h3>1. 二次選考への申込</h3>
<p>辞退者が出た枠や新設園の枠で二次選考が行われます。</p>

<h3>2. 認可外保育施設の利用</h3>
<p>認証保育所や企業主導型保育施設を探しましょう。江東区では月16日以上の認可外利用で<span class="highlight">+2〜3点</span>の加点が得られます。</p>

<h3>3. 小規模保育事業の利用</h3>
<p>小規模保育（2歳まで）を利用し、卒園時に認可保育園へ転所する方法もあります。卒園に伴う転所で<span class="highlight">+3点</span>の加点が得られます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>小規模保育→認可保育園への連携は江東区で有効な戦略です。卒園時の+3点は調整指数の中でも大きな加点です。</p>
</div>

<h3>4. 途中入園</h3>
<p>転居や退園で空きが出ることがあります。区のホームページで空き状況を毎月確認しましょう。</p>

<h3>5. 育休延長</h3>
<p>不承諾通知で育休を最長2歳まで延長できます。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>空き状況は<a href="https://www.city.koto.lg.jp/kodomo/hoiku/index.html" target="_blank" rel="noopener">江東区公式サイト</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 80,
  },
  {
    slug: "unlicensed-nursery-bonus",
    citySlug: "koto",
    title: "江東区で認可外保育施設の利用で加点を得る方法",
    description:
      "江東区では認証保育所等に月16日以上預けると加点が得られます。その条件と活用法を解説します。",
    image: "https://images.unsplash.com/photo-1587654780291-39c9404d7dd0?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>認可外利用で+2〜3点</h2>
<p>江東区では認証保育所・認可外保育施設に<span class="highlight">月16日以上</span>預けている場合、調整指数で加点が得られます。</p>

<table>
<tr><th>条件</th><th>加点</th></tr>
<tr><td>1人を月16日以上預けている</td><td>+2点</td></tr>
<tr><td>2人以上を月16日以上預けている</td><td>+3点</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>きょうだい2人を認可外に預けている場合は+3点になります。双子の場合なども該当します。</p>
</div>

<h2>加点を得るまでの流れ</h2>
<div class="step">
<div class="step-num">1</div>
<div class="step-content">
<strong>認可外保育施設を探す</strong>
<p>江東区内または通勤圏内の認証保育所・企業主導型施設を探します。</p>
</div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content">
<strong>月16日以上の利用契約</strong>
<p>加点条件の「月16日以上」を満たすプランで契約します。</p>
</div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content">
<strong>利用証明書を入手</strong>
<p>施設から利用証明書を発行してもらい、認可申込時に添付します。</p>
</div>
</div>

<h2>小規模保育の卒園加点も活用</h2>
<p>小規模保育等の卒園に伴う認可保育園への転所では<span class="highlight">+3点</span>の加点が得られます。0歳から小規模保育を利用し、3歳児クラスで認可に転所する戦略も有効です。</p>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>湾岸エリアでは認可外も人気が高く、空きが少ない場合があります。早めに情報収集を始めましょう。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 75,
  },
  {
    slug: "next-year-changes",
    citySlug: "koto",
    title: "江東区の令和8年度入園　変更点と注意事項",
    description:
      "江東区の令和8年度保育園入園選考の注意点をまとめました。",
    image: "https://images.unsplash.com/photo-1506784365847-bbad939e9335?w=800&h=400&fit=crop",
    category: "最新情報",
    categoryColor: "purple",
    content: `<h2>令和8年度の注意点</h2>
<p>江東区は湾岸エリアを中心に人口増加が続いており、保育需要も高まっています。最新の「入園のしおり」で制度の変更点を確認しましょう。</p>

<h2>確認すべきポイント</h2>
<ul>
<li>基準指数・調整指数の変更有無</li>
<li>新設園の情報（湾岸エリアでは新設が続いている）</li>
<li>定員の増減</li>
<li>申込方法の変更</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>江東区では湾岸エリア（豊洲・有明・東雲など）で新設園が増えています。新設園は実績がないぶん競争率が読みにくく、穴場になることもあります。</p>
</div>

<h2>保育士加点の確認</h2>
<p>江東区には保育士として保育施設で就労する方への加点（+1点）があります。この制度の継続を確認しましょう。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>最新情報は<a href="https://www.city.koto.lg.jp/kodomo/hoiku/index.html" target="_blank" rel="noopener">江東区公式サイト</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 70,
  },
  {
    slug: "popular-areas",
    citySlug: "koto",
    title: "江東区の人気エリアと入りやすい地域の傾向",
    description:
      "江東区内で保育園の競争率が高いエリアと比較的入りやすい地域を解説します。",
    image: "https://images.unsplash.com/photo-1524813686514-a57563d77965?w=800&h=400&fit=crop",
    category: "エリア情報",
    categoryColor: "teal",
    content: `<h2>江東区の保育園事情</h2>
<p>江東区は湾岸エリアと下町エリアで保育園事情が大きく異なります。タワーマンションの建設が相次ぐ湾岸エリアは特に競争が激しい傾向にあります。</p>

<h2>競争率が高い傾向のエリア</h2>
<ul>
<li>豊洲エリア：タワーマンションが集中し、子育て世帯が非常に多い</li>
<li>有明・東雲エリア：大規模開発が進み保育需要が急増</li>
<li>住吉・森下エリア：交通利便性が高く人気</li>
</ul>

<h2>比較的入りやすい傾向のエリア</h2>
<ul>
<li>大島・亀戸エリア：保育園の数が比較的多い下町エリア</li>
<li>南砂・東砂エリア：住宅地として安定した地域</li>
</ul>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>新設園の開園タイミングでエリアの状況は大きく変わります。湾岸エリアでも新設園の年は入りやすくなることがあります。</p>
</div>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>豊洲エリアは保育園の競争率が非常に高いですが、隣接する大島・南砂方面まで通園範囲を広げると選択肢が増えます。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 60,
  },
  {
    slug: "competition-reality",
    citySlug: "koto",
    title: "江東区の保育園入園競争の実態",
    description:
      "江東区の保育園入園競争はどのくらい厳しいのか。湾岸エリアの事情も含めて解説します。",
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>江東区の入園競争の現状</h2>
<p>江東区は湾岸エリアの大規模開発により子育て世帯が急増しています。特に豊洲・有明エリアでは1歳児クラスの競争率が非常に高い状況です。</p>

<h2>ボリュームゾーン</h2>
<p>フルタイム共働き世帯は基準指数<span class="highlight">24点</span>で横並びです。その上にどれだけ調整指数を積めるかで決まります。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>認可外利用（+2〜3点）＋育休復帰（+2点）で基準指数24点＋調整4〜5点＝<span class="highlight">28〜29点</span>が入園ボーダーの目安です。湾岸エリアではこれでも厳しい場合があります。</p>
</div>

<h2>年齢別の傾向</h2>
<ul>
<li>0歳児クラス：定員が少ないが申込者もやや少なめ</li>
<li>1歳児クラス：最激戦。湾岸エリアは特に厳しい</li>
<li>2歳児クラス：空きが少ない</li>
<li>3歳児以上：小規模保育卒園組が加点を持って参入するため油断できない</li>
</ul>

<h2>湾岸エリアと下町エリアの差</h2>
<p>同じ江東区でも、豊洲・有明などの湾岸エリアと大島・亀戸などの下町エリアでは競争率に差があります。通勤経路を考慮して下町エリアも視野に入れるのがおすすめです。</p>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>求職活動中の基準指数は5点で、就労中（最大12点）との差が大きいです。求職中での入園は現実的に困難です。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 95,
  },
  {
    slug: "hoikuryo-keisan",
    citySlug: "koto",
    title: "江東区の保育料計算【令和8年度版】年収別シミュレーション・早見表",
    description:
      "江東区の認可保育園の保育料を年収・子ども数別に詳しく解説。区民税所得割額に基づく階層区分早見表、無償化（3歳〜）の対象確認、副食費・第2子以降の減免制度まで。令和8年度対応。",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop",
    category: "お金・制度",
    categoryColor: "amber",
    content: `<h2>江東区の保育料はどうやって決まる？</h2>
<p>江東区の認可保育園の保育料（利用者負担額）は、<strong>世帯の区民税所得割額</strong>によって決まります。東京都の基準に基づき階層区分が設定されており、所得が高いほど保育料も高くなる応能負担方式です。</p>

<h2>年齢ごとの基本ルール</h2>
<table>
<tr><th>年齢</th><th>保育料</th><th>注意点</th></tr>
<tr><td>0〜2歳児</td><td>有料（階層区分による）</td><td>世帯の所得割額で決定</td></tr>
<tr><td>3〜5歳児</td><td>無償（月額上限あり）</td><td>幼児教育・保育の無償化対象</td></tr>
</table>
<div class="point-box">
<p><strong>ポイント</strong></p>
<p>3歳以上は保育料が無償化されますが、<span class="highlight">副食費（給食の食材費）は別途負担</span>が必要です。低所得世帯や第3子以降は免除される場合があります。</p>
</div>

<h2>保育料の階層区分（0〜2歳の目安）</h2>
<table>
<tr><th>区民税所得割額（世帯合計）</th><th>保育料目安（月額・0歳）</th></tr>
<tr><td>非課税世帯</td><td>無料</td></tr>
<tr><td>〜約5万円</td><td>6,000〜9,000円</td></tr>
<tr><td>〜約10万円</td><td>12,000〜19,000円</td></tr>
<tr><td>〜約20万円</td><td>25,000〜38,000円</td></tr>
<tr><td>〜約30万円</td><td>42,000〜52,000円</td></tr>
<tr><td>30万円超</td><td>58,000〜77,000円</td></tr>
</table>
<p class="text-xs text-muted-foreground">※上記は目安です。詳細は江東区の公式保育料表をご確認ください。</p>

<h2>多子世帯・ひとり親世帯の軽減</h2>
<ul>
<li><strong>第2子</strong>：同一世帯で保育所等を利用中の場合、半額</li>
<li><strong>第3子以降</strong>：無料</li>
<li><strong>ひとり親世帯・生活保護世帯</strong>：最低階層として算定（大幅減額）</li>
</ul>

<h2>副食費について（3歳以上）</h2>
<p>3歳以上は保育料が無償化されますが、副食費（おかず代）は月額4,500円程度の実費負担があります。以下の場合は免除されます。</p>
<ul>
<li>年収360万円未満相当の世帯</li>
<li>第3子以降の子ども</li>
</ul>

<h2>保育料の確認方法</h2>
<p>毎年6月ごろ、前年度の区民税額が確定した後に保育料が決定・通知されます。入園前に目安を知りたい場合は江東区担当課にお問い合わせください。</p>
<div class="info-box">
<p><strong>公式情報</strong></p>
<p>最新の保育料表は江東区公式サイトからご確認ください。</p>
</div>`,
    publishedAt: "2026-05-13",
    popularity: 42,
  },
  {
    slug: "shokuhi-jippi",
    citySlug: "koto",
    title: "江東区の保育園の給食費（副食費）はいくら？【令和8年度版】免除条件と金額",
    description:
      "江東区の保育園の給食費（副食費）は月いくら？所得・子ども数による副食費免除の条件と申請方法、保育料無償化の範囲と実費負担の全額をわかりやすく解説。令和8年度対応。",
    image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&h=400&fit=crop",
    category: "お金・制度",
    categoryColor: "amber",
    content: `<h2>江東区の副食費とは？</h2>
<p>2019年10月の幼児教育・保育無償化により、<strong>3歳以上の保育料は無料</strong>になりました。ただし、給食の<strong>副食費（おかず代）は実費負担</strong>が残ります。江東区では副食費として月額4,500円程度が別途かかります。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>3歳以上でも副食費は無償化の対象外です。ただし、低所得世帯・第3子以降は免除制度があります。</p>
</div>

<h2>副食費の月額目安</h2>
<table>
<tr><th>年齢</th><th>副食費（月額目安）</th></tr>
<tr><td>3〜5歳児</td><td>約4,500円</td></tr>
<tr><td>0〜2歳児</td><td>保育料に含む（副食費別途なし）</td></tr>
</table>
<p class="text-xs text-muted-foreground">※金額は目安です。詳細は江東区公式サイトでご確認ください。</p>

<h2>副食費が免除される条件</h2>
<table>
<tr><th>免除条件</th><th>内容</th></tr>
<tr><td>年収360万円未満相当の世帯</td><td>区民税所得割額が一定以下の世帯は副食費が免除</td></tr>
<tr><td>第3子以降の子ども</td><td>小学3年生以下のきょうだいが2人以上いる場合、3人目以降は免除</td></tr>
<tr><td>生活保護世帯</td><td>副食費の負担なし</td></tr>
</table>

<h2>保育料無償化の対象範囲</h2>
<ul>
<li>無償化対象：<strong>保育料（基本利用料）</strong>のみ — 3歳〜5歳</li>
<li>実費負担が残るもの：副食費（おかず代）・主食費（ご飯代）・行事費・通園バス代など</li>
</ul>

<h2>副食費の支払い方法</h2>
<p>副食費は園から直接請求されます。毎月口座引き落としまたは現金納付が一般的です。免除に該当する場合は入園時や毎年6月ごろに申請手続きが必要です。江東区担当課に確認してください。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>最新の副食費・実費負担の詳細は江東区公式サイトからご確認ください。</p>
</div>`,
    publishedAt: "2026-05-13",
    popularity: 40,
  },
];

registerArticles(articles);
