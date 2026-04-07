import type { Article } from "./types";
import { registerArticles } from "./index";

const articles: Article[] = [
  {
    slug: "hokatsu-schedule",
    citySlug: "maebashi",
    title: "前橋市の保活スケジュール　令和8年度4月入園の流れ",
    description:
      "前橋市の令和8年度（2026年度）4月入園の申込時期・必要書類・結果通知の時期をまとめました。",
    image:
      "https://images.unsplash.com/photo-1484820540004-14229fe36ca4?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>令和8年度（2026年度）4月入園のスケジュール</h2>
<p>前橋市の4月入園の申込は例年10月〜11月頃に受け付けられます。</p>

<h3>申込の流れ</h3>
<table>
<tr><th>項目</th><th>日程（目安）</th></tr>
<tr><td>申請書類配布</td><td>2025年9月頃〜</td></tr>
<tr><td>申込受付（1次）</td><td>2025年10月〜11月頃</td></tr>
<tr><td>1次結果通知</td><td>2026年1月下旬〜2月頃</td></tr>
<tr><td>2次申込受付</td><td>2026年2月頃</td></tr>
<tr><td>2次結果通知</td><td>2026年3月頃</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>前橋市では「保育関係施設入所の手引き」が公式サイトからダウンロードできます。申込前に必ず目を通しましょう。</p>
</div>

<h2>いつから動き始めるべき？</h2>
<div class="step">
<div class="step-num">1</div>
<div class="step-content"><strong>4月〜6月：情報収集</strong><p>前橋市こども施設課の窓口または公式サイトで入所の手引きを入手。</p></div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content"><strong>6月〜9月：保育園見学</strong><p>気になる園に電話して見学予約。複数園の見学がおすすめです。</p></div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content"><strong>9月〜10月：書類準備</strong><p>就労証明書を勤務先に依頼。余裕を持って準備しましょう。</p></div>
</div>
<div class="step">
<div class="step-num">4</div>
<div class="step-content"><strong>10月〜11月：申込</strong><p>期限内に必要書類を提出します。</p></div>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>最新情報は<a href="https://www.city.maebashi.gunma.jp/soshiki/kodomomiraibu/kodomoshisetsu/gyomu/8/2/20836.html" target="_blank" rel="noopener">前橋市公式サイト「保育関係施設入所申し込みのご案内」</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 55,
  },
  {
    slug: "scoring-system-guide",
    citySlug: "maebashi",
    title: "前橋市の入園点数のしくみ　選考基準点数と調整指数をやさしく解説",
    description:
      "前橋市の保育園入所選考で使われる「選考基準点数」と「調整指数」の仕組みを、初めての方にもわかるように解説します。",
    image:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>点数制度の全体像</h2>
<p>前橋市の認可保育施設は「先着順」ではなく、<strong>指数の高いお子さまから優先</strong>して入所者が決定されます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>合計指数 ＝ 選考基準点数（父）＋ 選考基準点数（母）＋ 調整指数</p>
</div>

<h2>選考基準点数とは</h2>
<p>保護者それぞれの「保育を必要とする事由」を指数化したものです。1人あたり<span class="highlight">最大10点</span>、保護者2人の合計で<span class="highlight">最大20点</span>です。</p>
<table>
<tr><th>就労状況（外勤・自営中心者）</th><th>点数</th></tr>
<tr><td>月150時間以上の就労</td><td>10</td></tr>
<tr><td>月130時間以上150時間未満</td><td>9</td></tr>
<tr><td>月110時間以上130時間未満</td><td>8</td></tr>
<tr><td>月90時間以上110時間未満</td><td>7</td></tr>
<tr><td>月60時間以上90時間未満</td><td>6</td></tr>
<tr><td>月48時間以上60時間未満</td><td>5</td></tr>
</table>

<h2>調整指数とは</h2>
<p>世帯の状況に応じて加点・減点される指数です。</p>
<table>
<tr><th>項目</th><th>指数</th></tr>
<tr><td>母子・父子家庭</td><td>+13</td></tr>
<tr><td>生活保護受給世帯</td><td>+13</td></tr>
<tr><td>きょうだい在園中の園を希望</td><td>+5</td></tr>
<tr><td>4月1日入所希望者</td><td>+2</td></tr>
<tr><td>きょうだい同時申込</td><td>+2</td></tr>
<tr><td>認可外保育施設利用中</td><td>+1</td></tr>
<tr><td>第三子以降</td><td>+1</td></tr>
<tr><td>親族経営の勤務先</td><td>-1</td></tr>
</table>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳細は<a href="https://www.city.maebashi.gunma.jp/soshiki/kodomomiraibu/kodomoshisetsu/gyomu/8/2/20836.html" target="_blank" rel="noopener">前橋市公式サイト「保育関係施設入所申し込みのご案内」</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 60,
  },
  {
    slug: "fulltime-20-line",
    citySlug: "maebashi",
    title: "フルタイム共働き20点は安心？前橋市のボーダーライン事情",
    description:
      "前橋市でフルタイム共働き（基準点数20点）なら入園できるのか？競争状況と加点の重要性を解説します。",
    image:
      "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>選考基準点数20点がスタートライン</h2>
<p>前橋市では保護者がともに月150時間以上のフルタイム勤務であれば、各10点ずつで<span class="highlight">基準点数20点</span>になります。</p>

<h2>前橋市の競争状況</h2>
<p>前橋市は群馬県の県庁所在地で、近年子育て支援に力を入れています。郊外エリアでは比較的入りやすい傾向がありますが、中心部や人気園では20点だけでは安心できないケースもあります。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>前橋市の調整指数は他の自治体と比べて独特です。ひとり親+13点、生活保護+13点と大きな加点がある一方、きょうだい在園+5点、4月入所優先+2点など一般的な加点もあります。</p>
</div>

<h2>同点の場合はどうなる？</h2>
<p>合計指数が同点の場合は、保育を必要とする程度の高い順に決定されます。希望順位も考慮されるため、第一希望の園の選択は重要です。</p>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>希望園は第一・第二・第三の順に選考されます。第一希望に入れなくても第二・第三希望で入れるケースがありますので、複数の園を記入しましょう。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 55,
  },
  {
    slug: "jitan-kinmu-scoring",
    citySlug: "maebashi",
    title: "時短勤務だと点数は下がる？前橋市の選考基準と勤務時間の関係",
    description:
      "前橋市で時短勤務の場合、選考基準点数がどう変わるかを解説。外勤と自営協力者の違いも紹介します。",
    image:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>時短勤務の選考基準点数</h2>
<p>前橋市では月あたりの就労時間に応じて選考基準点数が決まります。フルタイム（月150時間以上）なら10点ですが、時短勤務で就労時間が短くなると点数が下がります。</p>

<h3>外勤・自営中心者の場合</h3>
<table>
<tr><th>就労時間</th><th>点数</th></tr>
<tr><td>月150時間以上</td><td><span class="highlight">10点</span></td></tr>
<tr><td>月130時間以上150時間未満</td><td><span class="highlight">9点</span></td></tr>
<tr><td>月110時間以上130時間未満</td><td><span class="highlight">8点</span></td></tr>
<tr><td>月90時間以上110時間未満</td><td><span class="highlight">7点</span></td></tr>
<tr><td>月60時間以上90時間未満</td><td><span class="highlight">6点</span></td></tr>
<tr><td>月48時間以上60時間未満</td><td><span class="highlight">5点</span></td></tr>
</table>

<h3>自営協力者・農業の場合</h3>
<p>前橋市では自営協力者・農業の場合、外勤と比べて<span class="highlight">1点ずつ低い</span>点数になります。月150時間以上でも最大9点です。</p>

<h2>就労証明書の記載に注意</h2>
<div class="point-box">
<p><strong>ポイント</strong></p>
<p>就労証明書に記載される勤務時間がそのまま点数に反映されます。育休復帰後に時短勤務を予定している場合は、復帰後の勤務条件で作成してもらいましょう。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 50,
  },
  {
    slug: "gakin-vs-jieikyoryokusha",
    citySlug: "maebashi",
    title: "外勤と自営協力者で点数が違う？前橋市独自の就労区分を解説",
    description:
      "前橋市では外勤・自営中心者と自営協力者・農業で基準点数が異なります。その違いと注意点を詳しく解説します。",
    image:
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>前橋市の就労区分</h2>
<p>前橋市では就労形態によって選考基準点数が異なります。大きく3つの区分があります。</p>

<table>
<tr><th>区分</th><th>月150時間以上の場合</th></tr>
<tr><td>外勤・自営中心者</td><td><span class="highlight">10点</span></td></tr>
<tr><td>自営協力者・農業</td><td><span class="highlight">9点</span></td></tr>
<tr><td>内職</td><td><span class="highlight">5点（一律）</span></td></tr>
</table>

<h2>自営中心者と自営協力者の違い</h2>
<p>自営中心者は事業の経営者本人、自営協力者はその家族として手伝っている方を指します。自営協力者・農業は各時間帯で外勤より1点低い設定です。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>自営中心者は外勤と同じ点数です。個人事業主や会社の代表として働いている場合は「自営中心者」に該当し、月150時間以上で10点になります。</p>
</div>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>勤務先が親族経営の法人格のない会社や個人営業の場合は、調整指数で-1点となる場合があります。自営と重複しない場合に適用されます。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 45,
  },
  {
    slug: "hitorioya-katen",
    citySlug: "maebashi",
    title: "前橋市のひとり親加点　+13点の大きな加算を解説",
    description:
      "前橋市でひとり親世帯に適用される+13点の調整指数について、適用条件と他の加点との違いを解説します。",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>ひとり親世帯の加点</h2>
<p>前橋市では、母子・父子家庭の場合、調整指数として<span class="highlight">+13点</span>が加算されます。これは全国的に見ても非常に大きな加点です。</p>

<h2>世帯の特殊事情による加点一覧</h2>
<p>前橋市では「世帯の特殊事情」として以下の加点がありますが、重複適用はされません。</p>
<table>
<tr><th>項目</th><th>加点</th></tr>
<tr><td>両親がいない</td><td>+15</td></tr>
<tr><td>虐待またはその恐れ</td><td>+14</td></tr>
<tr><td>DVの被害またはその恐れ</td><td>+14</td></tr>
<tr><td>母子・父子家庭</td><td>+13</td></tr>
<tr><td>生活保護受給世帯</td><td>+13</td></tr>
<tr><td>離婚前提で別居中</td><td>+12</td></tr>
<tr><td>父母が抑留・拘禁中</td><td>+12</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>ひとり親でフルタイム就労（月150時間以上）の場合：基準点数10点 ＋ ひとり親+13点 ＝ <span class="highlight">合計23点</span>。両親フルタイム共働き世帯（20点）を上回ります。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 50,
  },
  {
    slug: "kyoudai-katen",
    citySlug: "maebashi",
    title: "きょうだい在園で+5点　前橋市のきょうだい加点を解説",
    description:
      "前橋市できょうだいが在園中の場合に適用される+5点の調整指数について解説します。",
    image:
      "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>きょうだい在園中の加点</h2>
<p>前橋市では、きょうだいが在園中の保育園・認定こども園に入所を希望する場合、調整指数として<span class="highlight">+5点</span>が加算されます。ただし、保護者が求職中の場合は+2点になります。</p>

<h2>きょうだい関連の調整指数</h2>
<table>
<tr><th>状況</th><th>加点</th></tr>
<tr><td>きょうだいが在園中の園を希望（求職中でない）</td><td>+5</td></tr>
<tr><td>きょうだいが在園中の園を希望（求職中）</td><td>+2</td></tr>
<tr><td>きょうだいと同時申込</td><td>+2</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>フルタイム共働き20点にきょうだい在園+5点で25点に。4月入所優先の+2点も合わせれば27点と非常に有利になります。</p>
</div>

<h2>乳児保育所の卒園児について</h2>
<p>前橋市には乳児保育所（長昌寺保育園・めぐみ保育園）があり、その卒園児が転所する場合は<span class="highlight">+5点</span>が加算されます。兄姉が乳児保育所を卒園して別の園に在園中でも、同じ乳児保育所への申込であればきょうだい加点と同様に扱われます。</p>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>きょうだい加点は、きょうだいが在園している園と同じ園を希望する場合に適用されます。別の園を希望する場合は加点対象外です。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 45,
  },
  {
    slug: "ochita-toki-sentakushi",
    citySlug: "maebashi",
    title: "前橋市で保育園に落ちたときの選択肢　次にやるべきこと",
    description:
      "前橋市の1次選考で保留になった場合の対処法を解説。2次申込・途中入園・認可外など取れる選択肢をまとめました。",
    image:
      "https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>保留通知が届いたら</h2>
<p>1次選考で保留になっても、まだ選択肢はあります。</p>

<h2>選択肢1：2次選考に申し込む</h2>
<p>1次で保留になった場合、2次選考に申し込めます。前橋市では2次募集で再申込した場合、調整指数として<span class="highlight">+1点</span>が加算されます。</p>

<h2>選択肢2：途中入園を申し込む</h2>
<p>年度途中の入園申込は毎月受け付けています。退園や転居による空きが出れば入園できます。</p>

<h2>選択肢3：認可外保育施設を利用する</h2>
<p>認可外に預けて復職し、次年度は認可外利用の+1点加点を得て再挑戦する戦略があります。</p>

<h2>選択肢4：育児休業を延長する</h2>
<p>保留通知書があれば育児休業を延長できます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>前橋市では4月1日入所希望者に+2点の加点があります。年度途中よりも4月入所を目指す方が有利になる場合があります。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 40,
  },
  {
    slug: "area-guide",
    citySlug: "maebashi",
    title: "前橋市のエリア別保育園事情　入りやすい地域は？",
    description:
      "前橋市の地域ごとの保育園の特徴と入りやすさの傾向を解説します。",
    image:
      "https://images.unsplash.com/photo-1524813686514-a57563d77965?w=800&h=400&fit=crop",
    category: "保育園選び",
    categoryColor: "teal",
    content: `<h2>エリアによって事情が異なる</h2>
<p>前橋市は群馬県の県庁所在地であり、中心部と郊外で保育園の競争状況が異なります。</p>

<table>
<tr><th>エリア</th><th>特徴</th></tr>
<tr><td>前橋駅周辺</td><td>市の中心部で保育施設が集中。共働き世帯が多く0〜1歳児は競争あり</td></tr>
<tr><td>新前橋駅周辺</td><td>県庁が近く通勤に便利。人気園は競争率が高め</td></tr>
<tr><td>南部（駒形・前橋南）</td><td>住宅地として発展中。新しい保育施設も増加傾向</td></tr>
<tr><td>北部（富士見・芳賀）</td><td>郊外エリアで比較的入りやすい傾向</td></tr>
<tr><td>東部（大胡・宮城・粕川）</td><td>合併地域で園数は少ないが定員に余裕がある場合も</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>前橋市は車社会のため、通勤経路上の園も選択肢に入れると可能性が広がります。希望園は複数記入しましょう。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>各園の情報は<a href="https://www.city.maebashi.gunma.jp/soshiki/kodomomiraibu/kodomoshisetsu/gyomu/8/2/20836.html" target="_blank" rel="noopener">前橋市公式サイト「保育関係施設入所申し込みのご案内」</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 35,
  },
  {
    slug: "ikukyu-kyuufukin-genkakuka",
    citySlug: "maebashi",
    title: "2025年4月から育休給付金延長の審査が厳格化　前橋市での影響",
    description:
      "2025年4月からの育児休業給付金の延長手続き厳格化について、前橋市の保活にどう影響するかを解説します。",
    image:
      "https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?w=800&h=400&fit=crop",
    category: "最新情報",
    categoryColor: "blue",
    content: `<h2>制度改正の概要</h2>
<p>2025年4月から、育児休業給付金の支給対象期間延長の審査が厳格化されました。「速やかな職場復帰のために保育所の利用申込をした」と認められることが必要になりました。</p>

<h2>前橋市の保活への影響</h2>
<p>通勤可能な範囲の園を複数希望し、真剣に入園を目指している方は影響を受けません。従来どおり、保留になった場合は育児休業給付金の延長が可能です。</p>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>前橋市では認可外保育施設利用中や一時預かり利用中は調整指数+1点ですが、求職活動中・産前産後・育児休業中の場合はこの加点は除外されます。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>制度改正の詳細は<a href="https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/0000160564_00040.html" target="_blank" rel="noopener">厚生労働省「育児休業給付金の支給対象期間延長手続き」</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 30,
  },
];

registerArticles(articles);
