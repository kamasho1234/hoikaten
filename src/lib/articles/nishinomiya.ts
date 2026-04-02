import type { Article } from "./types";
import { registerArticles } from "./index";

const articles: Article[] = [
  {
    slug: "hokatsu-schedule",
    citySlug: "nishinomiya",
    title: "西宮市の保活スケジュール　令和8年度4月入園の流れ",
    description:
      "西宮市の令和8年度（2026年度）4月入園の申込時期・必要書類・結果通知の時期をまとめました。",
    image:
      "https://images.unsplash.com/photo-1484820540004-14229fe36ca4?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>令和8年度（2026年度）4月入園のスケジュール</h2>
<p>西宮市の4月入園申込は例年10月〜11月頃に受け付けられます。電子申請にも対応しています。</p>

<h3>申込の流れ</h3>
<table>
<tr><th>項目</th><th>日程（目安）</th></tr>
<tr><td>申請書類配布</td><td>2025年9月頃〜</td></tr>
<tr><td>1次申込受付</td><td>2025年10月〜11月頃</td></tr>
<tr><td>1次結果通知</td><td>2026年1月下旬〜2月頃</td></tr>
<tr><td>2次申込受付</td><td>2026年2月頃</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>西宮市では電子申請と窓口申請の両方に対応しています。混雑を避けたい場合は電子申請が便利です。</p>
</div>

<h2>いつから動き始めるべき？</h2>
<div class="step">
<div class="step-num">1</div>
<div class="step-content"><strong>4月〜6月：情報収集</strong><p>西宮市の保育入所課のページで利用申込案内を確認します。</p></div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content"><strong>6月〜9月：保育園見学</strong><p>気になる園に電話して見学予約。複数園の比較がおすすめです。</p></div>
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
<p>最新情報は<a href="https://www.nishi.or.jp/kosodate/hoikujo/hoikujo/riyotetsuzuki/moshikomi.html" target="_blank" rel="noopener">西宮市公式サイト「認可保育施設の利用申込について」</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 55,
  },
  {
    slug: "scoring-system-guide",
    citySlug: "nishinomiya",
    title: "西宮市の入園点数のしくみ　基本点数と調整点数をやさしく解説",
    description:
      "西宮市の保育園入園選考で使われる点数制度の仕組みを、初めての方にもわかるように解説します。",
    image:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>点数制度の全体像</h2>
<p>西宮市の認可保育施設は<strong>点数の高い世帯から優先</strong>して利用調整されます。</p>

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
<tr><td>きょうだい在園中（同じ園を第一希望）</td><td>+12</td></tr>
<tr><td>きょうだい在園中</td><td>+6</td></tr>
<tr><td>生活保護受給世帯</td><td>+8</td></tr>
<tr><td>認可外保育施設を利用中</td><td>+5</td></tr>
<tr><td>きょうだい同時申込</td><td>+4</td></tr>
<tr><td>育児休業からの復帰予定</td><td>+3</td></tr>
<tr><td>同居の祖父母（65歳未満）</td><td>-3</td></tr>
<tr><td>未就学のきょうだい（保育所利用なし）</td><td>-3</td></tr>
</table>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳細な点数表は<a href="https://www.nishi.or.jp/kosodate/hoikujo/hoikujo/riyotetsuzuki/moshikomi.html" target="_blank" rel="noopener">西宮市公式サイト</a>でダウンロードできる利用調整基準表（PDF）をご確認ください。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 65,
  },
  {
    slug: "fulltime-200-line",
    citySlug: "nishinomiya",
    title: "フルタイム共働き200点は安心？西宮市のボーダーライン事情",
    description:
      "西宮市でフルタイム共働き（基本200点）なら入園できるのか？待機児童の多い西宮市の実情を解説します。",
    image:
      "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>基本200点がスタートライン</h2>
<p>西宮市では父母とも月20日以上・週40時間以上のフルタイム勤務であれば、父100点＋母100点＝<span class="highlight">基本200点</span>になります。</p>

<h2>西宮市は全国的にも待機児童が多い</h2>
<p>西宮市は兵庫県内でも待機児童が多い自治体として知られています。特に0〜2歳児クラスでは多くの申込者が200点ラインに並ぶため、200点だけでは安心できません。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>西宮市では調整加点が勝負を分けます。きょうだい在園（+6〜+12）、認可外利用（+5）、育休復帰（+3）など、該当する加点項目がないか確認しましょう。</p>
</div>

<h2>同点の場合はどうなる？</h2>
<p>基本点数と調整点数の合計が同じ場合、西宮市が定める優先順位（所得の低い世帯が優先など）で決定されます。</p>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>西宮市は人気エリアと郊外で状況が大きく異なります。希望園の競争率を事前に確認し、複数の園を希望に入れておくことが重要です。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 100,
  },
  {
    slug: "jitan-kinmu-scoring",
    citySlug: "nishinomiya",
    title: "時短勤務だと点数は下がる？西宮市の基本点数と勤務時間の関係",
    description:
      "西宮市で時短勤務の場合、基本点数がどう変わるかを解説。フルタイムとの差や点数を最大化するポイントも紹介します。",
    image:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>時短勤務の基本点数</h2>
<p>西宮市では月あたりの勤務日数・週あたりの勤務時間に応じて基本点数が決まります。</p>

<table>
<tr><th>勤務時間</th><th>基本点数</th></tr>
<tr><td>月20日以上かつ週40時間以上</td><td><span class="highlight">100点</span></td></tr>
<tr><td>月20日以上かつ週30時間以上（例：1日6時間×週5日）</td><td><span class="highlight">90点</span></td></tr>
<tr><td>月16日以上かつ週24時間以上（例：1日6時間×週4日）</td><td><span class="highlight">80点</span></td></tr>
<tr><td>月16日以上かつ週16時間以上</td><td><span class="highlight">70点</span></td></tr>
</table>

<h2>時短勤務で両親合計はどうなる？</h2>
<div class="point-box">
<p><strong>ポイント</strong></p>
<p>例：母が週30時間の時短勤務、父がフルタイムの場合は、父100点＋母90点＝<span class="highlight">基本190点</span>。200点との10点差は西宮市では大きいです。</p>
</div>

<h2>10点の差は西宮市では致命的？</h2>
<p>待機児童が多い西宮市では、人気園に200点の世帯が殺到します。190点では調整加点で挽回しない限り不利になる可能性が高いです。</p>`,
    publishedAt: "2026-03-28",
    popularity: 95,
  },
  {
    slug: "ochita-toki-sentakushi",
    citySlug: "nishinomiya",
    title: "西宮市で保育園に落ちたときの選択肢　次にやるべきこと",
    description:
      "西宮市の1次選考で保留になった場合の対処法を解説。2次申込・途中入園・認可外など取れる選択肢をまとめました。",
    image:
      "https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>保留通知が届いたら</h2>
<p>西宮市は待機児童が多い自治体のため、保留になるケースは少なくありません。慌てずに次の手を打ちましょう。</p>

<h2>選択肢1：2次選考に申し込む</h2>
<p>1次で辞退が出た枠で再度選考されます。希望園の変更・追加も検討してください。</p>

<h2>選択肢2：途中入園を申し込む</h2>
<p>毎月の空き状況に応じて受け付けています。年度途中で空きが出ることもあります。</p>

<h2>選択肢3：認可外保育施設を利用する</h2>
<p>認可外に預けて復職し、次年度は+5点の加点を得て再挑戦する戦略が有効です。</p>

<h2>選択肢4：育児休業を延長する</h2>
<p>保留通知書があれば育児休業を延長できます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>西宮市では希望園の変更・追加が可能です。人気園だけでなく、少し離れた園も候補に入れることで入園の可能性が上がります。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>希望園の変更手続きは<a href="https://www.nishi.or.jp/kosodate/hoikujo/hoikujo/riyotetsuzuki/kiboshisetsu-henko.html" target="_blank" rel="noopener">西宮市公式サイト「利用希望施設の変更について」</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 80,
  },
  {
    slug: "ninkagai-katen",
    citySlug: "nishinomiya",
    title: "認可外保育施設の利用で+5点　西宮市の加点を得る条件",
    description:
      "西宮市で認可外保育施設の利用実績により調整点数+5を得るための条件と手続きを解説します。",
    image:
      "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=800&h=400&fit=crop",
    category: "認可外",
    categoryColor: "rose",
    content: `<h2>認可外利用で+5点の加点</h2>
<p>西宮市では認可外保育施設に月極で預けて就労している実績があると、<span class="highlight">+5点</span>の調整加点が得られます。</p>

<h2>待機児童が多い西宮市では特に有効</h2>
<p>西宮市は兵庫県内でも待機児童が多い自治体です。認可外利用の+5点は人気園の当落を分ける重要な加点になります。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>200点＋認可外+5点＝205点に。さらにきょうだい在園（+6〜+12）があれば大幅に有利になります。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 75,
  },
  {
    slug: "area-guide",
    citySlug: "nishinomiya",
    title: "西宮市のエリア別保育園事情　入りやすい地域は？",
    description:
      "西宮市の地域ごとの保育園の特徴と入りやすさの傾向を解説します。",
    image:
      "https://images.unsplash.com/photo-1524813686514-a57563d77965?w=800&h=400&fit=crop",
    category: "保育園選び",
    categoryColor: "teal",
    content: `<h2>エリアによって事情が異なる</h2>
<p>西宮市は阪神間に位置し、南部の都市部と北部の山手エリアで保育園の状況が大きく異なります。</p>

<table>
<tr><th>エリア</th><th>特徴</th></tr>
<tr><td>西宮北口周辺</td><td>関西屈指の人気住宅地。子育て世帯が非常に多く、保育園の競争は最も激しい</td></tr>
<tr><td>夙川・苦楽園</td><td>高級住宅地。園数は少なく競争率は高い</td></tr>
<tr><td>甲子園・鳴尾</td><td>阪神沿線の住宅地。園数は多いが人気園は競争あり</td></tr>
<tr><td>JR西宮駅周辺</td><td>再開発で子育て世帯が増加。新設園も出ている</td></tr>
<tr><td>山口・塩瀬</td><td>北部の郊外エリア。定員に余裕がある園もあるが園数自体は少ない</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>西宮北口周辺は特に競争が激しいため、周辺エリアも含めて広く候補を検討することをおすすめします。通勤経路上の園も選択肢に入れましょう。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 60,
  },
  {
    slug: "ikukyu-kyuufukin-genkakuka",
    citySlug: "nishinomiya",
    title: "2025年4月から育休給付金延長の審査が厳格化　西宮市での影響",
    description:
      "2025年4月からの育児休業給付金の延長手続き厳格化について、西宮市の保活にどう影響するかを解説します。",
    image:
      "https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?w=800&h=400&fit=crop",
    category: "最新情報",
    categoryColor: "blue",
    content: `<h2>制度改正の概要</h2>
<p>2025年4月から、育児休業給付金の支給対象期間延長の審査が厳格化されました。「速やかな職場復帰のために保育所の利用申込をした」と認められることが必要です。</p>

<h2>西宮市の保活への影響</h2>
<p>西宮市では待機児童が多いため、真剣に入園を希望して申し込んでも保留になるケースが多くあります。通勤可能な範囲の園を複数希望し、真剣に入園を目指している方は、従来どおり育児休業給付金の延長が可能です。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>制度改正の詳細は<a href="https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/0000160564_00040.html" target="_blank" rel="noopener">厚生労働省「育児休業給付金の支給対象期間延長手続き」</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 50,
  },
  {
    slug: "hitorioya-katen",
    citySlug: "nishinomiya",
    title: "西宮市のひとり親加点　+120点の大きな加算を解説",
    description:
      "西宮市でひとり親世帯に適用される+120点の調整加点について解説します。",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>ひとり親世帯の加点</h2>
<p>西宮市ではひとり親世帯の場合、片方の保護者の基本点数100点と調整加点を合わせて<span class="highlight">+120点</span>が加算されます。</p>

<h2>ひとり親世帯の合計点数イメージ</h2>
<p>ひとり親でフルタイム就労の場合：</p>
<div class="point-box">
<p><strong>ポイント</strong></p>
<p>基本点数100点 ＋ ひとり親加点120点 ＝ <span class="highlight">合計220点</span>。両親フルタイム共働き世帯（200点）を上回る水準になり、入園にかなり有利です。</p>
</div>

<h2>必要書類</h2>
<p>ひとり親であることを証明する書類（戸籍謄本、児童扶養手当証書の写しなど）が必要です。</p>`,
    publishedAt: "2026-03-28",
    popularity: 90,
  },
  {
    slug: "mikeniyu-kyoudai-genten",
    citySlug: "nishinomiya",
    title: "未就学きょうだいで-3点？西宮市の減点項目を正しく理解する",
    description:
      "西宮市で未就学のきょうだいがいる場合に適用される-3点の減点について解説します。",
    image:
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>未就学きょうだいの-3点とは</h2>
<p>西宮市では保育所を利用していない未就学のきょうだいがいる場合、調整点数として<span class="highlight">-3点</span>が適用されます。</p>

<h2>なぜ減点されるの？</h2>
<p>未就学のきょうだいが家にいる場合、保育の代替手段があるとみなされるためです。ただし、そのきょうだいが保育所に在園している場合は、この減点は適用されません。</p>

<h2>減点を避けるには</h2>
<p>きょうだいを同時に申し込む場合は「きょうだい同時申込」の加点（+4点）が適用されるため、減点を相殺できる場合があります。</p>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>減点項目は見落としやすいため、申込前に利用調整基準表を確認し、該当する項目がないかチェックしておきましょう。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 50,
  },
];

registerArticles(articles);
