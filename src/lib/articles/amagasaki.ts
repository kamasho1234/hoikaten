import type { Article } from "./types";
import { registerArticles } from "./index";

const articles: Article[] = [
  {
    slug: "hokatsu-schedule",
    citySlug: "amagasaki",
    title: "尼崎市の保活スケジュール　令和8年度4月入園の流れ",
    description:
      "尼崎市の令和8年度（2026年度）4月入園の申込時期・必要書類・結果通知の時期をまとめました。",
    image:
      "https://images.unsplash.com/photo-1484820540004-14229fe36ca4?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>令和8年度（2026年度）4月入園のスケジュール</h2>
<p>尼崎市の4月入園申込は例年10月〜11月頃に受け付けられます。</p>

<h3>申込の流れ</h3>
<table>
<tr><th>項目</th><th>日程（目安）</th></tr>
<tr><td>申請書類配布</td><td>2025年10月頃〜</td></tr>
<tr><td>1次申込受付</td><td>2025年10月〜11月頃</td></tr>
<tr><td>1次結果通知</td><td>2026年1月下旬〜2月頃</td></tr>
<tr><td>2次申込受付</td><td>2026年2月頃</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>尼崎市では「保育施設・事業利用のしおり」が公式サイトからダウンロードできます。利用調整基準表も掲載されているので必ず確認しましょう。</p>
</div>

<h2>いつから動き始めるべき？</h2>
<div class="step">
<div class="step-num">1</div>
<div class="step-content"><strong>4月〜6月：情報収集</strong><p>尼崎市の公式サイトで前年度のしおりを参考にします。</p></div>
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
<p>最新情報は<a href="https://www.city.amagasaki.hyogo.jp/kosodate-kyoiku/service/hoikusyo/1042814.html" target="_blank" rel="noopener">尼崎市公式サイト「令和8年度保育施設等の利用申込み」</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 55,
  },
  {
    slug: "scoring-system-guide",
    citySlug: "amagasaki",
    title: "尼崎市の入園点数のしくみ　基本点数と調整点数をやさしく解説",
    description:
      "尼崎市の保育園入園選考で使われる点数制度の仕組みを、初めての方にもわかるように解説します。",
    image:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>点数制度の全体像</h2>
<p>尼崎市の認可保育施設は<strong>父母の合計点数の高い世帯から優先</strong>して利用調整されます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>合計点数 ＝ 基本点数（父）＋ 基本点数（母）＋ 調整点数</p>
</div>

<h2>基本点数とは</h2>
<p>保護者それぞれの「保育を必要とする事由」を点数化したものです。1人あたり<span class="highlight">最大100点</span>、保護者2人の合計で<span class="highlight">最大200点</span>です。</p>
<table>
<tr><th>就労状況</th><th>基本点数</th></tr>
<tr><td>月20日以上かつ週40時間以上</td><td>100</td></tr>
<tr><td>月20日以上かつ週30時間以上</td><td>90</td></tr>
<tr><td>月16日以上かつ週24時間以上</td><td>80</td></tr>
<tr><td>月16日以上かつ週16時間以上</td><td>70</td></tr>
<tr><td>月64時間以上（上記以外）</td><td>60</td></tr>
</table>

<h2>調整点数とは</h2>
<p>世帯の状況に応じて加点・減点される点数です。</p>
<table>
<tr><th>項目</th><th>点数</th></tr>
<tr><td>ひとり親世帯</td><td>+120</td></tr>
<tr><td>きょうだい在園中（同じ園を第一希望）</td><td>+10</td></tr>
<tr><td>きょうだい在園中</td><td>+5</td></tr>
<tr><td>生活保護受給世帯</td><td>+8</td></tr>
<tr><td>認可外保育施設を利用中</td><td>+5</td></tr>
<tr><td>きょうだい同時申込</td><td>+3</td></tr>
<tr><td>育児休業からの復帰予定</td><td>+3</td></tr>
<tr><td>同居の祖父母（65歳未満）</td><td>-3</td></tr>
</table>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳細な利用調整基準表は<a href="https://www.city.amagasaki.hyogo.jp/kosodate-kyoiku/service/hoikusyo/1042814.html" target="_blank" rel="noopener">尼崎市公式サイト</a>からダウンロードできます。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 65,
  },
  {
    slug: "fulltime-200-line",
    citySlug: "amagasaki",
    title: "フルタイム共働き200点は安心？尼崎市のボーダーライン事情",
    description:
      "尼崎市でフルタイム共働き（基本200点）なら入園できるのか？競争状況と加点の重要性を解説します。",
    image:
      "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>基本200点がスタートライン</h2>
<p>尼崎市では父母とも月20日以上・週40時間以上のフルタイム勤務であれば<span class="highlight">基本200点</span>になります。</p>

<h2>尼崎市の競争状況</h2>
<p>尼崎市は大阪・神戸のベッドタウンとして子育て世帯が多い市です。JR尼崎駅周辺を中心に人気エリアでは競争が発生し、200点だけでは安心できない園もあります。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>きょうだい在園（+5〜+10）、認可外利用（+5）、育休復帰（+3）など調整加点が差を分けます。該当する項目がないか確認しましょう。</p>
</div>

<h2>同点の場合はどうなる？</h2>
<p>合計点数が同じ場合、尼崎市が定める優先順位（所得の低い世帯が優先など）で決定されます。</p>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>0歳児クラスは枠が少ないため、年齢によって入りやすさが大きく異なります。受入れ状況は公式サイトで確認できます。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 100,
  },
  {
    slug: "jitan-kinmu-scoring",
    citySlug: "amagasaki",
    title: "時短勤務だと点数は下がる？尼崎市の基本点数と勤務時間の関係",
    description:
      "尼崎市で時短勤務の場合、基本点数がどう変わるかを解説。フルタイムとの差や点数を最大化するポイントも紹介します。",
    image:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>時短勤務の基本点数</h2>
<p>尼崎市では月あたりの勤務日数・週あたりの勤務時間に応じて基本点数が決まります。</p>

<table>
<tr><th>勤務時間</th><th>基本点数</th></tr>
<tr><td>月20日以上かつ週40時間以上</td><td><span class="highlight">100点</span></td></tr>
<tr><td>月20日以上かつ週30時間以上</td><td><span class="highlight">90点</span></td></tr>
<tr><td>月16日以上かつ週24時間以上</td><td><span class="highlight">80点</span></td></tr>
<tr><td>月16日以上かつ週16時間以上</td><td><span class="highlight">70点</span></td></tr>
</table>

<h2>時短勤務で両親合計はどうなる？</h2>
<div class="point-box">
<p><strong>ポイント</strong></p>
<p>例：母が週30時間の時短勤務、父がフルタイムの場合は、父100点＋母90点＝<span class="highlight">基本190点</span>。調整加点での挽回が重要です。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 95,
  },
  {
    slug: "ochita-toki-sentakushi",
    citySlug: "amagasaki",
    title: "尼崎市で保育園に落ちたときの選択肢　次にやるべきこと",
    description:
      "尼崎市の1次選考で保留になった場合の対処法を解説。取れる選択肢をまとめました。",
    image:
      "https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>保留通知が届いたら</h2>
<p>1次選考で保留になっても、まだ選択肢はあります。</p>

<h2>選択肢1：2次選考に申し込む</h2>
<p>1次で辞退が出た枠で再度選考されます。希望園の変更・追加も可能です。</p>

<h2>選択肢2：途中入園を申し込む</h2>
<p>毎月の空き状況に応じて途中入園の受付があります。</p>

<h2>選択肢3：認可外保育施設を利用する</h2>
<p>認可外に預けて復職し、次年度は+5点の加点を得て再挑戦する戦略があります。</p>

<h2>選択肢4：育児休業を延長する</h2>
<p>保留通知書があれば育児休業を延長できます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>尼崎市では受入れ状況（空き状況）が公式サイトで公開されています。途中入園のチャンスを逃さないよう定期的にチェックしましょう。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>受入れ状況は<a href="https://www.city.amagasaki.hyogo.jp/kosodate-kyoiku/service/hoikusyo/1040683.html" target="_blank" rel="noopener">尼崎市公式サイト「受入状況(空き状況)」</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 80,
  },
  {
    slug: "ninkagai-katen",
    citySlug: "amagasaki",
    title: "認可外保育施設の利用で+5点　尼崎市の加点を得る条件",
    description:
      "尼崎市で認可外保育施設の利用実績により調整点数+5を得るための条件を解説します。",
    image:
      "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=800&h=400&fit=crop",
    category: "認可外",
    categoryColor: "rose",
    content: `<h2>認可外利用で+5点の加点</h2>
<p>尼崎市では認可外保育施設に月極で預けている実績があると<span class="highlight">+5点</span>の調整加点が得られます。</p>

<h2>加点を得るための条件</h2>
<ul>
<li>認可外保育施設に月極契約で利用していること</li>
<li>就労のために利用していること</li>
<li>申込時点で利用実績があること</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>200点＋認可外+5点＝205点に。JR尼崎駅周辺の人気園ではこの5点が当落を分けることがあります。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 75,
  },
  {
    slug: "area-guide",
    citySlug: "amagasaki",
    title: "尼崎市のエリア別保育園事情　入りやすい地域は？",
    description:
      "尼崎市の地域ごとの保育園の特徴と入りやすさの傾向を解説します。",
    image:
      "https://images.unsplash.com/photo-1524813686514-a57563d77965?w=800&h=400&fit=crop",
    category: "保育園選び",
    categoryColor: "teal",
    content: `<h2>エリアによって事情が異なる</h2>
<p>尼崎市は南北に広がる市で、エリアによって保育園の競争状況が異なります。</p>

<table>
<tr><th>エリア</th><th>特徴</th></tr>
<tr><td>JR尼崎駅周辺</td><td>再開発でファミリー層が急増。保育園の競争は最も激しい</td></tr>
<tr><td>阪急塚口駅周辺</td><td>住宅地として人気。園数は多いが競争あり</td></tr>
<tr><td>阪急武庫之荘駅周辺</td><td>閑静な住宅地。子育て世帯に人気</td></tr>
<tr><td>阪神尼崎駅周辺</td><td>商業地区。園数は多く比較的入りやすい傾向</td></tr>
<tr><td>園田周辺</td><td>阪急沿線の住宅地。比較的入りやすい</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>JR尼崎駅周辺は特に人気が高いため、阪神沿線や阪急沿線の園も含めて広く検討しましょう。尼崎市はコンパクトな市なので、自転車圏内に多くの園があります。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 60,
  },
  {
    slug: "ikukyu-kyuufukin-genkakuka",
    citySlug: "amagasaki",
    title: "2025年4月から育休給付金延長の審査が厳格化　尼崎市での影響",
    description:
      "2025年4月からの育児休業給付金の延長手続き厳格化について、尼崎市の保活にどう影響するかを解説します。",
    image:
      "https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?w=800&h=400&fit=crop",
    category: "最新情報",
    categoryColor: "blue",
    content: `<h2>制度改正の概要</h2>
<p>2025年4月から、育児休業給付金の支給対象期間延長の審査が厳格化されました。「速やかな職場復帰のために保育所の利用申込をした」と認められることが必要です。</p>

<h2>尼崎市の保活への影響</h2>
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
    citySlug: "amagasaki",
    title: "尼崎市のひとり親加点　+120点の大きな加算を解説",
    description:
      "尼崎市でひとり親世帯に適用される+120点の調整加点について解説します。",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>ひとり親世帯の加点</h2>
<p>尼崎市ではひとり親世帯の場合、片方の保護者の基本点数100点と調整加点を合わせて<span class="highlight">+120点</span>が加算されます。</p>

<h2>ひとり親世帯の合計点数イメージ</h2>
<div class="point-box">
<p><strong>ポイント</strong></p>
<p>基本点数100点 ＋ ひとり親加点120点 ＝ <span class="highlight">合計220点</span>。両親フルタイム共働き世帯（200点）を上回る水準になります。</p>
</div>

<h2>必要書類</h2>
<p>ひとり親であることを証明する書類（戸籍謄本、児童扶養手当証書の写しなど）が必要です。</p>`,
    publishedAt: "2026-03-28",
    popularity: 90,
  },
  {
    slug: "kyoudai-katen",
    citySlug: "amagasaki",
    title: "きょうだい加点を最大化　尼崎市のきょうだい在園の+10点を解説",
    description:
      "尼崎市できょうだいが在園中の場合の加点（+5〜+10点）について、条件と活用法を解説します。",
    image:
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>きょうだい在園の加点</h2>
<p>尼崎市ではきょうだいが認可保育施設に在園している場合、調整点数が加算されます。</p>

<table>
<tr><th>条件</th><th>加点</th></tr>
<tr><td>きょうだいが在園中で、同じ園を第一希望にする</td><td><span class="highlight">+10</span></td></tr>
<tr><td>きょうだいが在園中（上記以外）</td><td><span class="highlight">+5</span></td></tr>
<tr><td>きょうだいと同時に申し込む（双子など）</td><td><span class="highlight">+3</span></td></tr>
</table>

<h2>+10点を得るためのポイント</h2>
<p>きょうだいが在園している園を第一希望にすることで、最大の+10点が得られます。第二希望以降に書いた場合は+5点にとどまります。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>フルタイム共働き200点＋きょうだい加点10点＝210点。さらに認可外利用+5点があれば215点と非常に有利です。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 50,
  },
];

registerArticles(articles);
