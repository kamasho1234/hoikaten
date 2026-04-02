import type { Article } from "./types";
import { registerArticles } from "./index";

const articles: Article[] = [
  {
    slug: "hokatsu-schedule",
    citySlug: "higashiosaka",
    title: "東大阪市の保活スケジュール　令和8年度4月入園の流れ",
    description:
      "東大阪市の令和8年度（2026年度）4月入園の申込時期・必要書類・結果通知の時期をまとめました。",
    image:
      "https://images.unsplash.com/photo-1484820540004-14229fe36ca4?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>令和8年度（2026年度）4月入園のスケジュール</h2>
<p>東大阪市の4月入園の申込は例年10月〜11月頃に受け付けられます。</p>

<h3>申込の流れ</h3>
<table>
<tr><th>項目</th><th>日程（目安）</th></tr>
<tr><td>申請書類配布</td><td>2025年9月頃〜</td></tr>
<tr><td>1次申込受付</td><td>2025年10月〜11月頃</td></tr>
<tr><td>1次結果通知</td><td>2026年1月下旬頃</td></tr>
<tr><td>2次申込受付</td><td>2026年2月頃</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>東大阪市では施設利用相談課（06-4309-3202）に電話で事前相談ができます。不明点があれば申込前に確認しておきましょう。</p>
</div>

<h2>いつから動き始めるべき？</h2>
<div class="step">
<div class="step-num">1</div>
<div class="step-content"><strong>4月〜6月：情報収集</strong><p>東大阪市の公式サイトで入所案内を確認します。</p></div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content"><strong>6月〜9月：保育園見学</strong><p>気になる園に電話して見学予約。</p></div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content"><strong>9月〜10月：書類準備</strong><p>就労証明書を勤務先に依頼します。</p></div>
</div>
<div class="step">
<div class="step-num">4</div>
<div class="step-content"><strong>10月〜11月：申込</strong><p>期限内に必要書類を提出します。</p></div>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>最新情報は<a href="https://www.city.higashiosaka.lg.jp/kosodate/0000015515.html" target="_blank" rel="noopener">東大阪市公式サイト「保育施設入所申込の手続き」</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 55,
  },
  {
    slug: "scoring-system-guide",
    citySlug: "higashiosaka",
    title: "東大阪市の入園点数のしくみ　基礎指数と調整指数をやさしく解説",
    description:
      "東大阪市の保育園入所選考で使われる「基礎指数」と「調整指数」の仕組みを、初めての方にもわかるように解説します。",
    image:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>点数制度の全体像</h2>
<p>東大阪市の認可保育施設は<strong>基礎指数と調整指数の合計が高い世帯から優先</strong>して利用調整されます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>合計指数 ＝ 基礎指数（父）＋ 基礎指数（母）＋ 調整指数</p>
</div>

<h2>基礎指数とは</h2>
<p>保護者それぞれの「保育を必要とする事由」を指数化したものです。1人あたり<span class="highlight">最大45点</span>、保護者2人の合計で<span class="highlight">最大90点</span>です。</p>
<table>
<tr><th>就労状況</th><th>基礎指数</th></tr>
<tr><td>週5日以上かつ週40時間以上</td><td>45</td></tr>
<tr><td>週5日以上かつ週30時間以上</td><td>40</td></tr>
<tr><td>週4日以上かつ週24時間以上</td><td>35</td></tr>
<tr><td>週3日以上かつ週16時間以上</td><td>30</td></tr>
<tr><td>月48時間以上（上記以外）</td><td>25</td></tr>
</table>

<h2>調整指数とは</h2>
<p>世帯の状況に応じて加点・減点される指数です。</p>
<table>
<tr><th>項目</th><th>指数</th></tr>
<tr><td>ひとり親世帯</td><td>+5</td></tr>
<tr><td>きょうだい在園中（同じ園を希望）</td><td>+5</td></tr>
<tr><td>認可外保育施設等を利用中</td><td>+3</td></tr>
<tr><td>生活保護受給世帯</td><td>+3</td></tr>
<tr><td>育児休業からの復帰予定</td><td>+2</td></tr>
<tr><td>同居の祖父母（65歳未満）</td><td>-2</td></tr>
</table>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳細な選考基準は<a href="https://www.city.higashiosaka.lg.jp/kosodate/0000015515.html" target="_blank" rel="noopener">東大阪市公式サイト</a>でダウンロードできる選考基準PDFをご確認ください。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 65,
  },
  {
    slug: "fulltime-90-line",
    citySlug: "higashiosaka",
    title: "フルタイム共働き90点は安心？東大阪市のボーダーライン事情",
    description:
      "東大阪市でフルタイム共働き（基礎指数90点）なら入園できるのか？競争状況と加点の重要性を解説します。",
    image:
      "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>基礎指数90点がスタートライン</h2>
<p>東大阪市では保護者がともに週5日以上・週40時間以上のフルタイム勤務であれば、各45点ずつで<span class="highlight">基礎指数90点</span>になります。</p>

<h2>東大阪市の競争状況</h2>
<p>東大阪市は大阪府内でも子育て世帯が多い市です。特に近鉄沿線の布施・小阪・八戸ノ里周辺では人気園の競争が激しく、90点だけでは安心できない場合があります。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>認可外保育施設の利用で+3点、きょうだい在園で+5点など、調整指数での加点が差を分けます。該当する項目がないか確認しましょう。</p>
</div>

<h2>同点の場合の優先順位</h2>
<p>東大阪市では合計指数が同点の場合、市が定める優先順位により決定されます。世帯の状況や所得等が考慮されます。</p>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>0歳児クラスは特に枠が少ないため、年齢によって入りやすさが大きく異なります。希望園の空き状況は事前に確認しておきましょう。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 100,
  },
  {
    slug: "jitan-kinmu-scoring",
    citySlug: "higashiosaka",
    title: "時短勤務だと指数は下がる？東大阪市の基礎指数と勤務時間の関係",
    description:
      "東大阪市で時短勤務の場合、基礎指数がどう変わるかを解説。フルタイムとの差や指数を最大化するポイントも紹介します。",
    image:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>時短勤務の基礎指数</h2>
<p>東大阪市では週あたりの勤務日数・時間に応じて基礎指数が決まります。</p>

<table>
<tr><th>勤務状況</th><th>基礎指数</th></tr>
<tr><td>週5日以上かつ週40時間以上</td><td><span class="highlight">45点</span></td></tr>
<tr><td>週5日以上かつ週30時間以上（例：1日6時間×週5日）</td><td><span class="highlight">40点</span></td></tr>
<tr><td>週4日以上かつ週24時間以上（例：1日6時間×週4日）</td><td><span class="highlight">35点</span></td></tr>
<tr><td>週3日以上かつ週16時間以上</td><td><span class="highlight">30点</span></td></tr>
</table>

<h2>時短勤務で両親合計はどうなる？</h2>
<div class="point-box">
<p><strong>ポイント</strong></p>
<p>例：母が週30時間の時短勤務、父がフルタイムの場合は、父45点＋母40点＝<span class="highlight">基礎指数85点</span>。フルタイム共働きの90点と比べて5点低くなります。</p>
</div>

<h2>5点の差は大きい？</h2>
<p>人気園では基礎指数90点の世帯が多いため、85点では不利になる可能性があります。調整指数（認可外利用+3、きょうだい+5など）での挽回が重要です。</p>`,
    publishedAt: "2026-03-28",
    popularity: 95,
  },
  {
    slug: "ninkagai-katen",
    citySlug: "higashiosaka",
    title: "認可外保育施設等の利用で+3点　東大阪市の加点を得る条件",
    description:
      "東大阪市で認可外保育施設・企業主導型保育施設等の利用実績により調整指数+3を得るための条件を解説します。",
    image:
      "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=800&h=400&fit=crop",
    category: "認可外",
    categoryColor: "rose",
    content: `<h2>認可外等利用で+3点の加点</h2>
<p>東大阪市では、認可外保育施設・企業主導型保育施設・就労型一時預かり等を保護者の入所要件に見合う日数・時間利用している場合、調整指数として<span class="highlight">+3点</span>が加算されます。</p>

<h2>対象施設</h2>
<ul>
<li>認可外保育施設</li>
<li>企業主導型保育施設</li>
<li>就労型一時預かり</li>
</ul>

<h2>加点を得るための条件</h2>
<ul>
<li>保護者の入所要件に見合う日数・時間を利用していること</li>
<li>月極等の定期利用であること</li>
<li>申込時点で利用実績があること</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>基礎指数90点のフルタイム共働き世帯が認可外加点+3を得ると93点に。きょうだい加点（+5）も合わせれば98点と非常に有利になります。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 80,
  },
  {
    slug: "ochita-toki-sentakushi",
    citySlug: "higashiosaka",
    title: "東大阪市で保育園に落ちたときの選択肢　次にやるべきこと",
    description:
      "東大阪市の1次選考で保留になった場合の対処法を解説。2次申込・途中入園・認可外など取れる選択肢をまとめました。",
    image:
      "https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>保留通知が届いたら</h2>
<p>1次選考で保留になっても選択肢はあります。</p>

<h2>選択肢1：2次選考に申し込む</h2>
<p>1次で保留になった場合、2次選考に進めます。辞退が出た枠で再度選考されます。</p>

<h2>選択肢2：途中入園を申し込む</h2>
<p>毎月の空き状況に応じて途中入園の受付があります。</p>

<h2>選択肢3：認可外保育施設等を利用する</h2>
<p>認可外に預けて復職し、次年度は+3点の加点を得て再挑戦する戦略があります。</p>

<h2>選択肢4：育児休業を延長する</h2>
<p>保留通知書があれば育児休業を延長できます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>東大阪市は大阪市のベッドタウンとしても人気が高まっていますが、郊外エリアでは途中入園で入れるケースもあります。諦めずに情報収集を続けましょう。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 75,
  },
  {
    slug: "area-guide",
    citySlug: "higashiosaka",
    title: "東大阪市のエリア別保育園事情　入りやすい地域は？",
    description:
      "東大阪市の地域ごとの保育園の特徴と入りやすさの傾向を解説します。",
    image:
      "https://images.unsplash.com/photo-1524813686514-a57563d77965?w=800&h=400&fit=crop",
    category: "保育園選び",
    categoryColor: "teal",
    content: `<h2>エリアによって事情が異なる</h2>
<p>東大阪市は近鉄線を中心に東西に広がる市で、エリアによって保育園の競争状況が異なります。</p>

<table>
<tr><th>エリア</th><th>特徴</th></tr>
<tr><td>布施・小阪周辺</td><td>近鉄沿線の繁華街。共働き世帯が多く競争率高め</td></tr>
<tr><td>八戸ノ里・若江岩田</td><td>住宅地で子育て世帯に人気。園数は多い</td></tr>
<tr><td>花園・東花園</td><td>住宅地として発展中。比較的入りやすい傾向</td></tr>
<tr><td>瓢箪山・枚岡</td><td>生駒山麓の住宅地。園数は限られるが定員に余裕がある場合も</td></tr>
<tr><td>荒本・長田</td><td>市役所周辺。新設園もあり入りやすくなっている</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>東大阪市は大阪市に隣接しており、大阪市内に通勤する方も多いです。通勤経路上の園も選択肢に入れてみましょう。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 60,
  },
  {
    slug: "ikukyu-kyuufukin-genkakuka",
    citySlug: "higashiosaka",
    title: "2025年4月から育休給付金延長の審査が厳格化　東大阪市での影響",
    description:
      "2025年4月からの育児休業給付金の延長手続き厳格化について、東大阪市の保活にどう影響するかを解説します。",
    image:
      "https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?w=800&h=400&fit=crop",
    category: "最新情報",
    categoryColor: "blue",
    content: `<h2>制度改正の概要</h2>
<p>2025年4月から、育児休業給付金の支給対象期間延長の審査が厳格化されました。「速やかな職場復帰のために保育所の利用申込をした」と認められることが必要です。</p>

<h2>東大阪市の保活への影響</h2>
<p>通勤可能な範囲の園を複数希望し、真剣に入園を目指している方は影響を受けません。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>制度改正の詳細は<a href="https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/0000160564_00040.html" target="_blank" rel="noopener">厚生労働省「育児休業給付金の支給対象期間延長手続き」</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 50,
  },
  {
    slug: "hitorioya-katen",
    citySlug: "higashiosaka",
    title: "東大阪市のひとり親加点　+5点の加算を解説",
    description:
      "東大阪市でひとり親世帯に適用される+5点の調整指数について解説します。",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>ひとり親世帯の加点</h2>
<p>東大阪市では、ひとり親世帯の場合、調整指数として<span class="highlight">+5点</span>が加算されます。</p>

<h2>ひとり親世帯の合計指数イメージ</h2>
<p>ひとり親でフルタイム就労の場合：</p>
<div class="point-box">
<p><strong>ポイント</strong></p>
<p>基礎指数45点 ＋ ひとり親加点5点 ＝ <span class="highlight">合計50点</span>。両親フルタイム共働き世帯（90点）と比べると差がありますが、認可外利用+3やきょうだい+5などの加点を組み合わせることが重要です。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 90,
  },
  {
    slug: "ikukyu-fukki-katen",
    citySlug: "higashiosaka",
    title: "育休復帰で+2点　東大阪市の育児休業からの復帰加点",
    description:
      "東大阪市で育児休業から復帰する場合に適用される+2点の調整指数を解説します。",
    image:
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=400&fit=crop",
    category: "育休・復職",
    categoryColor: "purple",
    content: `<h2>育休復帰で+2点の加点</h2>
<p>東大阪市では育児休業を取得し、入園する月に職場復帰する場合、調整指数として<span class="highlight">+2点</span>が加算されます。</p>

<h2>適用条件</h2>
<ul>
<li>育児休業を取得していること</li>
<li>入園月に職場復帰すること</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>フルタイム共働き90点に育休復帰+2点が加わると92点に。認可外利用の+3点も合わせれば95点と有利な水準になります。</p>
</div>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>入園後に復帰しなかった場合は入園取り消しの可能性があります。慣らし保育期間を考慮して復帰日を設定しましょう。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 50,
  },
];

registerArticles(articles);
