import type { Article } from "./types";
import { registerArticles } from "./index";

const articles: Article[] = [
  // ========== 保活の基本 ==========
  {
    slug: "hokatsu-schedule",
    citySlug: "kagoshima",
    title: "鹿児島市の保活スケジュール　令和8年度4月入園の流れ",
    description:
      "鹿児島市の令和8年度（2026年度）4月入園の申込時期・書類配布・結果通知の時期をまとめました。初めての保活でも迷わないスケジュールガイドです。",
    image:
      "https://images.unsplash.com/photo-1484820540004-14229fe36ca4?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>令和8年度（2026年度）4月入園のスケジュール</h2>
<p>鹿児島市の4月入園申込は<strong>第1期</strong>と<strong>第2期</strong>の2回に分かれています。第1期で入れなかった場合も第2期で再度選考されます。</p>

<h3>第1期</h3>
<table>
<tr><th>項目</th><th>日程（目安）</th></tr>
<tr><td>申請書類配布開始</td><td>2025年9月頃〜</td></tr>
<tr><td>申込受付</td><td>2025年10月〜11月頃</td></tr>
<tr><td>結果通知</td><td>2026年1月下旬〜2月頃</td></tr>
</table>

<h3>第2期</h3>
<p>第1期で保留となった場合、第2期の選考に進みます。第2期の受付期間・結果通知日は第1期の結果通知に同封されるお知らせで確認してください。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>鹿児島市では窓口での申込が基本です。こども未来局 保育幼稚園課（099-216-1258）に事前に電話確認してから訪問するとスムーズです。</p>
</div>

<h2>いつから動き始めるべき？</h2>
<div class="step">
<div class="step-num">1</div>
<div class="step-content"><strong>4月〜6月：情報収集</strong><p>鹿児島市の「認可保育所等利用案内」を市のホームページまたは窓口で入手します。</p></div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content"><strong>6月〜9月：保育園見学</strong><p>気になる園に直接電話して見学予約。夏場が比較的予約しやすい時期です。</p></div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content"><strong>9月〜10月：書類準備</strong><p>就労証明書などの必要書類を勤務先に依頼し、期限に余裕を持って準備します。</p></div>
</div>
<div class="step">
<div class="step-num">4</div>
<div class="step-content"><strong>10月〜11月：申込</strong><p>必要書類を揃え、期限内に窓口へ提出します。</p></div>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>最新の申込方法は<a href="https://www.city.kagoshima.lg.jp/kosodate/kosodate/hoikusho/index.html" target="_blank" rel="noopener">鹿児島市公式サイト「保育所・幼稚園・認定こども園など」</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 55,
  },

  // ========== 点数・選考 ==========
  {
    slug: "scoring-system-guide",
    citySlug: "kagoshima",
    title: "鹿児島市の入園点数のしくみ　基本点数と調整点数をやさしく解説",
    description:
      "鹿児島市の保育園入園選考で使われる「基本点数」と「調整点数」の仕組みを、初めての方にもわかるように解説します。",
    image:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>点数制度の全体像</h2>
<p>鹿児島市の認可保育所等は「先着順」ではなく、<strong>点数の高い世帯から優先</strong>して利用調整（選考）されます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>合計点数 ＝ 基本点数（保護者1）＋ 基本点数（保護者2）＋ 調整点数</p>
</div>

<h2>基本点数とは</h2>
<p>保護者それぞれの「保育を必要とする事由」を点数化したものです。1人あたり<span class="highlight">最大10点</span>、保護者2人の合計で<span class="highlight">最大20点</span>です。</p>
<table>
<tr><th>就労状況</th><th>基本点数</th></tr>
<tr><td>月180時間以上</td><td>10</td></tr>
<tr><td>月150時間以上180時間未満</td><td>9</td></tr>
<tr><td>月120時間以上150時間未満</td><td>8</td></tr>
<tr><td>月90時間以上120時間未満</td><td>7</td></tr>
<tr><td>月60時間以上90時間未満</td><td>6</td></tr>
</table>
<p>就労以外にも、疾病・障害・介護・出産・就学・求職活動などの事由ごとに基本点数が定められています。</p>

<h2>調整点数とは</h2>
<p>世帯の状況に応じて加点・減点される点数です。</p>
<table>
<tr><th>項目</th><th>点数</th></tr>
<tr><td>ひとり親世帯</td><td>+10</td></tr>
<tr><td>きょうだい在園中（同じ園を希望）</td><td>+3</td></tr>
<tr><td>生活保護受給世帯</td><td>+3</td></tr>
<tr><td>認可外保育施設を利用中</td><td>+2</td></tr>
<tr><td>育児休業からの復帰予定</td><td>+1</td></tr>
<tr><td>同居の祖父母（65歳未満）</td><td>-1</td></tr>
</table>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳細な点数表は<a href="https://www.city.kagoshima.lg.jp/kosodate/kosodate/hoikusho/index.html" target="_blank" rel="noopener">鹿児島市公式サイト</a>で配布される「認可保育所等利用案内」に掲載されています。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 65,
  },
  {
    slug: "fulltime-20-line",
    citySlug: "kagoshima",
    title: "フルタイム共働き20点は安心？鹿児島市のボーダーライン事情",
    description:
      "鹿児島市でフルタイム共働き（基本20点）なら入園できるのか？実際の競争状況と加点の重要性を解説します。",
    image:
      "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>基本20点がスタートライン</h2>
<p>鹿児島市では保護者がともに月180時間以上のフルタイム勤務であれば、各10点ずつで<span class="highlight">基本20点</span>になります。多くの申込者がこの20点ラインに並ぶため、人気園では20点だけでは安心できません。</p>

<h2>同点の場合はどうなる？</h2>
<p>基本点数が同じ場合、調整点数の加点で差がつきます。さらに同点の場合は、同点者調整項目表により、調整点数の合計や就労の有無、世帯状況（所得の低い世帯が優先など）で決定されます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>鹿児島市は他の政令指定都市と比べて待機児童が少ない傾向ですが、中央駅周辺や鹿児島中央地区など人気エリアでは競争が発生します。きょうだい加点（+3）や認可外利用（+2）が差を分けることがあります。</p>
</div>

<h2>鹿児島市の特徴</h2>
<p>鹿児島市は比較的保育施設の整備が進んでおり、郊外エリアでは定員に余裕がある園も多くあります。ただし0〜1歳児クラスは全国的に枠が少ないため、早めの準備が大切です。</p>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>年齢区分ごとに利用調整が行われるため、同じ園でも年齢によって入りやすさが大きく異なります。特に0歳児クラスは枠が限られます。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 100,
  },
  {
    slug: "jitan-kinmu-scoring",
    citySlug: "kagoshima",
    title: "時短勤務だと点数は下がる？鹿児島市の基本点数と勤務時間の関係",
    description:
      "鹿児島市で時短勤務の場合、基本点数がどう変わるかを解説。フルタイムとの差や点数を最大化するポイントも紹介します。",
    image:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>時短勤務の基本点数</h2>
<p>鹿児島市では月あたりの就労時間に応じて基本点数が決まります。フルタイム（月180時間以上）なら10点ですが、時短勤務で就労時間が短くなると点数が下がります。</p>

<table>
<tr><th>就労時間</th><th>基本点数</th></tr>
<tr><td>月180時間以上</td><td><span class="highlight">10点</span></td></tr>
<tr><td>月150時間以上180時間未満</td><td><span class="highlight">9点</span></td></tr>
<tr><td>月120時間以上150時間未満</td><td><span class="highlight">8点</span></td></tr>
<tr><td>月90時間以上120時間未満</td><td><span class="highlight">7点</span></td></tr>
<tr><td>月60時間以上90時間未満</td><td><span class="highlight">6点</span></td></tr>
</table>

<h2>時短勤務で両親合計はどうなる？</h2>
<p>たとえば母が月120時間の時短勤務、父がフルタイムの場合：</p>
<div class="point-box">
<p><strong>ポイント</strong></p>
<p>父10点 ＋ 母8点 ＝ <span class="highlight">基本18点</span>。フルタイム共働きの20点と比べて2点低くなります。</p>
</div>

<h2>2点の差は大きい？</h2>
<p>鹿児島市は10点満点制のため、1点・2点の差が大きく影響します。人気園では基本20点の世帯が多いため、18点では不利になる可能性があります。調整加点で挽回できるかどうかがポイントです。</p>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>就労証明書に記載される勤務時間がそのまま点数に反映されます。育休復帰後に時短勤務を予定している場合は、復帰後の勤務条件で就労証明書を作成してもらいましょう。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 95,
  },
  {
    slug: "ochita-toki-sentakushi",
    citySlug: "kagoshima",
    title: "鹿児島市で保育園に落ちたときの選択肢　次にやるべきこと",
    description:
      "鹿児島市の選考で保留になった場合の対処法を解説。第2期申込・途中入園・認可外・育休延長など、取れる選択肢をまとめました。",
    image:
      "https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>保留通知が届いたら</h2>
<p>第1期選考で保留になっても、まだ選択肢はあります。落ち着いて次のステップを検討しましょう。</p>

<h2>選択肢1：第2期選考を待つ</h2>
<p>第1期で保留になった場合、自動的に第2期選考の対象になります。第1期で辞退が出た枠や追加の空き枠で再度選考が行われます。</p>

<h2>選択肢2：途中入園（5月以降）を申し込む</h2>
<p>年度途中の入園申込は随時受け付けています。転勤や退園による空きが出ることがあるため、粘り強く申し込み続けることが大切です。</p>

<h2>選択肢3：認可外保育施設を利用する</h2>
<p>認可外保育施設に預けて復職し、次年度の認可園申込では認可外利用の加点（+2点）を得る戦略があります。</p>

<h2>選択肢4：育児休業を延長する</h2>
<p>保留通知書があれば、育児休業を子どもが2歳になるまで延長でき、育児休業給付金も継続して受給できます。</p>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>2025年4月から育児休業給付金の延長審査が厳格化されています。給付金延長のために「わざと落ちる」申込は認められなくなりました。</p>
</div>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>保留になっても諦めないことが大切です。鹿児島市は年度途中の空きが出やすい傾向があるため、途中入園で入園できるケースも少なくありません。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 80,
  },

  // ========== 認可外 ==========
  {
    slug: "ninkagai-katen",
    citySlug: "kagoshima",
    title: "認可外保育施設の利用で+2点　鹿児島市の加点を得る条件",
    description:
      "鹿児島市で認可外保育施設の利用実績により調整点数+2を得るための条件と手続きを解説します。",
    image:
      "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=800&h=400&fit=crop",
    category: "認可外",
    categoryColor: "rose",
    content: `<h2>認可外利用で+2点の加点</h2>
<p>鹿児島市では、認可外保育施設に月極で預けて就労している実績があると、認可園の利用調整で<span class="highlight">+2点</span>の調整加点が得られます。</p>

<h2>加点を得るための条件</h2>
<ul>
<li>認可外保育施設に<strong>月極契約</strong>で利用していること</li>
<li>就労のために利用していること</li>
<li>申込時点で利用実績があること</li>
</ul>

<h2>費用対効果を考える</h2>
<p>鹿児島市の認可外保育施設の月額保育料は施設により異なりますが、月3万〜7万円程度が目安です。10点満点制の鹿児島市では2点の加点は大きな差になり得ます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>基本20点のフルタイム共働き世帯が認可外加点+2を得ると22点に。きょうだい加点（+3）と合わせれば25点となり、かなり有利になります。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 75,
  },

  // ========== 最新情報 ==========
  {
    slug: "ikukyu-kyuufukin-genkakuka",
    citySlug: "kagoshima",
    title: "2025年4月から育休給付金延長の審査が厳格化　鹿児島市での影響",
    description:
      "2025年4月からの育児休業給付金の延長手続き厳格化について、鹿児島市の保活にどう影響するかを解説します。",
    image:
      "https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?w=800&h=400&fit=crop",
    category: "最新情報",
    categoryColor: "blue",
    content: `<h2>制度改正の概要</h2>
<p>2025年4月から、育児休業給付金の支給対象期間延長の審査が厳格化されました。従来は「保育所に入れなかった」という保留通知書があれば延長が認められていましたが、新制度では「速やかな職場復帰のために保育所の利用申込をした」と認められることが追加で必要になりました。</p>

<h2>具体的に何が変わった？</h2>
<ul>
<li>延長手続きの際に、保育利用申込書類一式の写しの提出が必要に</li>
<li>申込内容から「本当に入園を希望しているか」がハローワークで審査される</li>
<li>通勤可能な範囲の園を希望せず、わざと保留になるような申込は認められない</li>
</ul>

<h2>鹿児島市の保活への影響</h2>
<p>鹿児島市では複数の希望園を記入して申し込むのが一般的です。通勤可能な範囲で複数の園を希望し、真剣に入園を目指している方はこの制度改正の影響を受けません。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>制度改正の詳細は<a href="https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/0000160564_00040.html" target="_blank" rel="noopener">厚生労働省「育児休業給付金の支給対象期間延長手続き」</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 50,
  },

  // ========== 保育園選び ==========
  {
    slug: "area-guide",
    citySlug: "kagoshima",
    title: "鹿児島市のエリア別保育園事情　入りやすい地域は？",
    description:
      "鹿児島市の地域ごとの保育園の特徴と入りやすさの傾向を解説。人気エリアと穴場エリアを紹介します。",
    image:
      "https://images.unsplash.com/photo-1524813686514-a57563d77965?w=800&h=400&fit=crop",
    category: "保育園選び",
    categoryColor: "teal",
    content: `<h2>エリアによって事情が異なる</h2>
<p>鹿児島市は広い市域を持ち、中心部と郊外で保育園の競争状況が大きく異なります。</p>

<h2>エリアごとの傾向</h2>
<table>
<tr><th>エリア</th><th>特徴</th></tr>
<tr><td>鹿児島中央駅周辺</td><td>交通の利便性が高く人気。0〜1歳児クラスは競争が激しい</td></tr>
<tr><td>天文館・城山周辺</td><td>都市部で共働き世帯が多い。園の数は比較的多い</td></tr>
<tr><td>谷山・坂之上</td><td>住宅地として発展中。新設園もあり比較的入りやすい</td></tr>
<tr><td>吉野・伊敷</td><td>郊外エリアで定員に余裕がある園が比較的多い</td></tr>
<tr><td>喜入・松元・郡山</td><td>旧町部で園数は少ないが、定員割れの園もある</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>自宅近くだけでなく、通勤経路上の園も候補に入れると選択肢が広がります。鹿児島市は車通勤が多いため、駐車場のある園を優先して探す方も多いです。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 60,
  },

  // ========== 育休・復職 ==========
  {
    slug: "ikukyu-fukki-tips",
    citySlug: "kagoshima",
    title: "鹿児島市での育休復帰と保育園入園　知っておきたいポイント",
    description:
      "鹿児島市で育児休業から復帰しながら保育園に入園するための準備とスケジュールを解説します。",
    image:
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=400&fit=crop",
    category: "育休・復職",
    categoryColor: "purple",
    content: `<h2>育休復帰と保活の両立</h2>
<p>育児休業から復帰するタイミングで保育園に入園させたい場合、申込時期と復帰時期のすり合わせが重要です。</p>

<h2>育休復帰で+1点の加点</h2>
<p>鹿児島市では育児休業を取得し、入園月に職場復帰する場合は調整点数として<span class="highlight">+1点</span>が加算されます。</p>

<h2>復帰のタイミング</h2>
<p>4月入園の場合、入園月中（4月中）に復帰することが条件です。就労証明書には復帰予定日を記載してもらいましょう。</p>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>入園が内定した後、復帰しなかった場合は入園取り消しになる可能性があります。必ず入園月中に復帰してください。</p>
</div>

<h2>慣らし保育の期間を考慮する</h2>
<p>多くの園では入園後1〜2週間程度の慣らし保育期間があります。最初は短時間の預かりから始まるため、復帰日は入園から2週間後以降に設定するのがおすすめです。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>勤務先の育休制度と保育園の入園時期を早めに確認し、両方のスケジュールを合わせておくことが保活成功のカギです。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 50,
  },

  // ========== 制度解説 ==========
  {
    slug: "hitorioya-katen",
    citySlug: "kagoshima",
    title: "鹿児島市のひとり親加点　+10点の大きな加算を解説",
    description:
      "鹿児島市でひとり親世帯に適用される+10点の調整加点について、適用条件と手続きを詳しく解説します。",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>ひとり親世帯の加点とは</h2>
<p>鹿児島市では、ひとり親世帯の場合、調整点数として<span class="highlight">+10点</span>が加算されます。10点満点制の鹿児島市では、これは非常に大きな加点です。</p>

<h2>適用条件</h2>
<ul>
<li>離婚・死別等によりひとり親であること</li>
<li>戸籍や住民票等で確認できること</li>
</ul>

<h2>ひとり親世帯の合計点数イメージ</h2>
<p>ひとり親でフルタイム就労（月180時間以上）の場合：</p>
<div class="point-box">
<p><strong>ポイント</strong></p>
<p>基本点数10点 ＋ ひとり親加点10点 ＝ <span class="highlight">合計20点</span>。両親フルタイム共働き世帯と同じ水準になります。</p>
</div>

<h2>必要書類</h2>
<p>ひとり親であることを証明する書類（戸籍謄本、児童扶養手当証書の写しなど）が必要です。申込時に合わせて提出してください。</p>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>事実婚の場合はひとり親として認められない場合があります。不明な点は事前に窓口に確認してください。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 90,
  },
];

registerArticles(articles);
