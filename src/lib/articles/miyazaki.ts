import type { Article } from "./types";
import { registerArticles } from "./index";

const articles: Article[] = [
  // ========== 保活の基本 ==========
  {
    slug: "hokatsu-schedule",
    citySlug: "miyazaki",
    title: "宮崎市の保活スケジュール　令和8年度4月入園の流れ",
    description:
      "宮崎市の令和8年度（2026年度）4月入園の申込時期・書類準備・結果通知の時期をまとめました。初めての保活でも迷わないスケジュールガイドです。",
    image:
      "https://images.unsplash.com/photo-1484820540004-14229fe36ca4?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>令和8年度（2026年度）4月入園のスケジュール</h2>
<p>宮崎市の4月入園申込は3回に分けて受付が行われます。第1回で入れなかった場合も、第2回・第3回で再度選考されます。</p>

<h3>申込スケジュール</h3>
<table>
<tr><th>回</th><th>受付期間（目安）</th></tr>
<tr><td>第1回</td><td>2025年12月1日〜12月19日</td></tr>
<tr><td>第2回</td><td>2026年2月2日〜2月10日</td></tr>
<tr><td>第3回</td><td>2026年3月2日〜3月9日</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>宮崎市では「電子申請（ぴったりサービス）」「窓口」「郵送」の3つの方法で申込みできます。保育幼稚園課（0985-21-1774）に事前に確認してから準備するとスムーズです。</p>
</div>

<h2>いつから動き始めるべき？</h2>
<div class="step">
<div class="step-num">1</div>
<div class="step-content"><strong>4月〜6月：情報収集</strong><p>宮崎市の「教育・保育施設利用ガイド」を市のホームページまたは窓口で入手します。</p></div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content"><strong>6月〜9月：保育園見学</strong><p>気になる園に直接電話して見学予約。申込書には見学状況の記入欄があるため、必ず見学を済ませましょう。</p></div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content"><strong>10月〜11月：書類準備</strong><p>就労証明書などの必要書類を勤務先に依頼し、期限に余裕を持って準備します。</p></div>
</div>
<div class="step">
<div class="step-num">4</div>
<div class="step-content"><strong>12月：第1回申込</strong><p>必要書類を揃え、電子申請・窓口・郵送のいずれかで提出します。</p></div>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>最新の申込方法は<a href="https://www.city.miyazaki.miyazaki.jp/education/nursery/" target="_blank" rel="noopener">宮崎市公式サイト「認可保育施設利用申込みのご案内」</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 55,
  },

  // ========== 点数・選考 ==========
  {
    slug: "scoring-system-guide",
    citySlug: "miyazaki",
    title: "宮崎市の入園点数のしくみ　基準点数と調整点数をやさしく解説",
    description:
      "宮崎市の保育園入園選考で使われる「基準点数」と「調整点数」の仕組みを、初めての方にもわかるように解説します。",
    image:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>点数制度の全体像</h2>
<p>宮崎市の認可保育所等は「先着順」ではなく、<strong>点数の高い世帯から優先</strong>して利用調整（選考）されます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>合計点数 ＝ 父の基準点数 ＋ 母の基準点数 ＋ 調整点数</p>
</div>

<h2>基準点数とは</h2>
<p>保護者それぞれの「保育を必要とする事由」を点数化したものです。就労の場合、1人あたり<span class="highlight">最大15点</span>、保護者2人の合計で<span class="highlight">最大30点</span>です。</p>
<table>
<tr><th>就労状況（被雇用者・自営中心者）</th><th>基準点数</th></tr>
<tr><td>月160時間以上</td><td>15</td></tr>
<tr><td>月140時間以上160時間未満</td><td>14</td></tr>
<tr><td>月120時間以上140時間未満</td><td>13</td></tr>
<tr><td>月100時間以上120時間未満</td><td>12</td></tr>
<tr><td>月80時間以上100時間未満</td><td>11</td></tr>
<tr><td>月60時間以上80時間未満</td><td>10</td></tr>
</table>
<p>就労以外にも、疾病・障害・介護・出産・就学・求職活動などの事由ごとに基準点数が定められています。</p>

<h2>調整点数とは</h2>
<p>世帯の状況に応じて加点・減点される点数です。</p>
<table>
<tr><th>項目</th><th>点数</th></tr>
<tr><td>認可外保育施設卒園（新規申込み）</td><td>+8</td></tr>
<tr><td>障害者世帯（1-2級等）</td><td>+6</td></tr>
<tr><td>ひとり親世帯</td><td>+5</td></tr>
<tr><td>きょうだいが申込み施設に在園中</td><td>+5</td></tr>
<tr><td>産休・育休明けで復職</td><td>+3</td></tr>
<tr><td>単身赴任</td><td>+3</td></tr>
<tr><td>新規申込み</td><td>+2</td></tr>
<tr><td>生活保護受給世帯</td><td>+2</td></tr>
<tr><td>60歳未満の同居祖父母</td><td>-2</td></tr>
</table>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳細な点数表は<a href="https://www.city.miyazaki.miyazaki.jp/education/nursery/" target="_blank" rel="noopener">宮崎市公式サイト「保育所等利用調整基準について」</a>で公開されている利用調整基準表PDFに掲載されています。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 60,
  },
  {
    slug: "fulltime-30-line",
    citySlug: "miyazaki",
    title: "フルタイム共働き30点は安心？宮崎市のボーダーライン事情",
    description:
      "宮崎市でフルタイム共働き（基準30点）なら入園できるのか？実際の競争状況と加点の重要性を解説します。",
    image:
      "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>基準30点がスタートライン</h2>
<p>宮崎市では保護者がともに月160時間以上のフルタイム勤務であれば、各15点ずつで<span class="highlight">基準30点</span>になります。多くの申込者がこのラインに近い点数で並ぶため、人気園では30点だけでは安心できません。</p>

<h2>同点の場合はどうなる？</h2>
<p>基準点数が同じ場合、調整点数で差がつきます。宮崎市では新規申込みで自動的に+2点が加算されるほか、認可外利用実績（+8点）やきょうだい在園（+5点）などの加点が大きな差を生みます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>宮崎市は15点満点制で、他の自治体より基準点数の刻みが細かいのが特徴です。月160時間以上（15点）と月140時間（14点）では1点の差があり、この差が選考結果を左右することもあります。</p>
</div>

<h2>宮崎市の特徴</h2>
<p>宮崎市は比較的保育施設の整備が進んでいますが、中心部（橘通・大塚周辺など）では0〜1歳児クラスの競争が発生します。郊外エリアでは定員に余裕がある園もあります。</p>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>入所が内定した後に辞退すると、当該年度中の利用調整で3点減点されます。希望園の選択は慎重に行いましょう。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 55,
  },
  {
    slug: "jitan-kinmu-scoring",
    citySlug: "miyazaki",
    title: "時短勤務だと点数は下がる？宮崎市の基準点数と勤務時間の関係",
    description:
      "宮崎市で時短勤務の場合、基準点数がどう変わるかを解説。フルタイムとの差や点数を最大化するポイントも紹介します。",
    image:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>時短勤務の基準点数</h2>
<p>宮崎市では月あたりの就労時間に応じて基準点数が6段階で決まります。フルタイム（月160時間以上）なら15点ですが、時短勤務で就労時間が短くなると点数が下がります。</p>

<table>
<tr><th>就労時間</th><th>基準点数</th></tr>
<tr><td>月160時間以上</td><td><span class="highlight">15点</span></td></tr>
<tr><td>月140時間以上160時間未満</td><td><span class="highlight">14点</span></td></tr>
<tr><td>月120時間以上140時間未満</td><td><span class="highlight">13点</span></td></tr>
<tr><td>月100時間以上120時間未満</td><td><span class="highlight">12点</span></td></tr>
<tr><td>月80時間以上100時間未満</td><td><span class="highlight">11点</span></td></tr>
<tr><td>月60時間以上80時間未満</td><td><span class="highlight">10点</span></td></tr>
</table>

<h2>時短勤務で両親合計はどうなる？</h2>
<p>たとえば母が月120時間の時短勤務、父がフルタイムの場合：</p>
<div class="point-box">
<p><strong>ポイント</strong></p>
<p>父15点 ＋ 母13点 ＝ <span class="highlight">基準28点</span>。フルタイム共働きの30点と比べて2点低くなります。</p>
</div>

<h2>自営の専従者・親族は要注意</h2>
<p>宮崎市では自営業の専従者・親族の場合、被雇用者よりも基準点数が2点低く設定されています。たとえば月160時間以上でも<span class="highlight">13点</span>（被雇用者は15点）です。</p>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>就労証明書に記載される勤務時間がそのまま点数に反映されます。育休復帰後に時短勤務を予定している場合は、復帰後の勤務条件で就労証明書を作成してもらいましょう。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 50,
  },
  {
    slug: "ochita-toki-sentakushi",
    citySlug: "miyazaki",
    title: "宮崎市で保育園に落ちたときの選択肢　次にやるべきこと",
    description:
      "宮崎市の選考で保留になった場合の対処法を解説。第2回・第3回申込・途中入園・認可外・育休延長など、取れる選択肢をまとめました。",
    image:
      "https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>保留になったら</h2>
<p>第1回選考で保留になっても、まだ選択肢はあります。落ち着いて次のステップを検討しましょう。</p>

<h2>選択肢1：第2回・第3回選考を待つ</h2>
<p>宮崎市の4月入園は3回に分けて選考されます。第1回で保留でも、辞退者が出た枠で第2回・第3回の選考が行われます。</p>

<h2>選択肢2：途中入園（5月以降）を申し込む</h2>
<p>年度途中の入園申込は随時受け付けています。毎月利用調整が行われるため、転勤や退園による空きが出ることがあります。</p>

<h2>選択肢3：認可外保育施設を利用する</h2>
<p>認可外保育施設に預けて復職し、次年度の認可園申込では認可外卒園の加点（+8点）を得る戦略があります。宮崎市では認可外卒園加点が8点と大きいため、有効な戦略です。</p>

<h2>選択肢4：育児休業を延長する</h2>
<p>保留通知書があれば、育児休業を子どもが2歳になるまで延長でき、育児休業給付金も継続して受給できます。</p>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>2025年4月から育児休業給付金の延長審査が厳格化されています。給付金延長のために「わざと落ちる」申込は認められなくなりました。</p>
</div>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>宮崎市では第1回で保留になった場合、申込初月のみ市から電話連絡があります。希望施設以外で空きがある施設の案内を希望するかどうか、申込時に選択しておきましょう。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 45,
  },

  // ========== 認可外 ==========
  {
    slug: "ninkagai-katen",
    citySlug: "miyazaki",
    title: "認可外保育施設の卒園で+8点　宮崎市の加点を得る条件",
    description:
      "宮崎市で認可外保育施設の卒園により調整点数+8を得るための条件と手続きを解説します。",
    image:
      "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=800&h=400&fit=crop",
    category: "認可外",
    categoryColor: "rose",
    content: `<h2>認可外卒園で+8点の加点</h2>
<p>宮崎市では、認可外保育施設を卒園して認可保育施設に新規申込みをする場合、調整点数として<span class="highlight">+8点</span>が加算されます。これは宮崎市の調整点数の中でもひとり親加点（+5）を上回る大きな加点です。</p>

<h2>加点を得るための条件</h2>
<ul>
<li>認可外保育施設を利用した実績があること</li>
<li><strong>新規申込み</strong>であること（転園の場合は対象外）</li>
<li>認可外保育施設の卒園を証明する書類が必要</li>
</ul>

<h2>転園の場合の注意</h2>
<p>既に認可保育施設を利用中で転園申込みをする場合は、この加点は適用されません。ただし、「転職・転勤」や「乳児園・小規模保育施設卒園」に伴う転園の場合は別途調整点数が加点されます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>基準30点のフルタイム共働き世帯が新規申込み（+2）と認可外卒園加点（+8）を得ると40点に。きょうだい加点（+5）と合わせれば45点となり、かなり有利になります。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳細は<a href="https://www.city.miyazaki.miyazaki.jp/education/nursery/" target="_blank" rel="noopener">宮崎市公式サイト「保育所等利用調整基準について」</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 45,
  },

  // ========== 最新情報 ==========
  {
    slug: "ikukyu-kyuufukin-genkakuka",
    citySlug: "miyazaki",
    title: "2025年4月から育休給付金延長の審査が厳格化　宮崎市での影響",
    description:
      "2025年4月からの育児休業給付金の延長手続き厳格化について、宮崎市の保活にどう影響するかを解説します。",
    image:
      "https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?w=800&h=400&fit=crop",
    category: "最新情報",
    categoryColor: "amber",
    content: `<h2>制度改正の概要</h2>
<p>2025年4月から、育児休業給付金の支給対象期間延長の審査が厳格化されました。従来は「保育所に入れなかった」という保留通知書があれば延長が認められていましたが、新制度では「速やかな職場復帰のために保育所の利用申込をした」と認められることが追加で必要になりました。</p>

<h2>具体的に何が変わった？</h2>
<ul>
<li>延長手続きの際に、保育利用申込書類一式の写しの提出が必要に</li>
<li>申込内容から「本当に入園を希望しているか」がハローワークで審査される</li>
<li>通勤可能な範囲の園を希望せず、わざと保留になるような申込は認められない</li>
</ul>

<h2>宮崎市の保活への影響</h2>
<p>宮崎市では最大第3希望まで記入でき、第1希望〜第3希望に決まらなかった場合の対応も申込時に選択します。通勤可能な範囲で複数の園を希望し、真剣に入園を目指している方はこの制度改正の影響を受けません。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>制度改正の詳細は<a href="https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/0000160564_00040.html" target="_blank" rel="noopener">厚生労働省「育児休業給付金の支給対象期間延長手続き」</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 40,
  },

  // ========== 保育園選び ==========
  {
    slug: "area-guide",
    citySlug: "miyazaki",
    title: "宮崎市のエリア別保育園事情　入りやすい地域は？",
    description:
      "宮崎市の地域ごとの保育園の特徴と入りやすさの傾向を解説。人気エリアと穴場エリアを紹介します。",
    image:
      "https://images.unsplash.com/photo-1524813686514-a57563d77965?w=800&h=400&fit=crop",
    category: "保育園選び",
    categoryColor: "teal",
    content: `<h2>エリアによって事情が異なる</h2>
<p>宮崎市は広い市域を持ち、中心部と郊外で保育園の競争状況が大きく異なります。</p>

<h2>エリアごとの傾向</h2>
<table>
<tr><th>エリア</th><th>特徴</th></tr>
<tr><td>橘通・中心市街地</td><td>交通利便性が高く共働き世帯に人気。0〜1歳児クラスは競争が激しい</td></tr>
<tr><td>大塚・花ヶ島</td><td>住宅地として人気が高く、園数は多いが需要も多い</td></tr>
<tr><td>大淀・南宮崎</td><td>駅周辺の利便性が高いエリア。通勤に便利なため希望者が集中しやすい</td></tr>
<tr><td>生目・赤江</td><td>比較的新しい住宅地で、定員に余裕がある園もある</td></tr>
<tr><td>佐土原・田野・高岡・清武</td><td>旧町部で園数は限られるが、定員割れの園もあり入りやすい傾向</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>宮崎市のホームページでは認可保育所・認定こども園等の空き状況が公開されています。自宅近くだけでなく、通勤経路上の園も候補に入れると選択肢が広がります。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>最新の空き状況は<a href="https://www.city.miyazaki.miyazaki.jp/education/nursery/" target="_blank" rel="noopener">宮崎市公式サイト「認可保育所・認定こども園等の空き状況について」</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 40,
  },

  // ========== 育休・復職 ==========
  {
    slug: "ikukyu-fukki-tips",
    citySlug: "miyazaki",
    title: "宮崎市での育休復帰と保育園入園　知っておきたいポイント",
    description:
      "宮崎市で育児休業から復帰しながら保育園に入園するための準備とスケジュールを解説します。",
    image:
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=400&fit=crop",
    category: "育休・復職",
    categoryColor: "purple",
    content: `<h2>育休復帰と保活の両立</h2>
<p>育児休業から復帰するタイミングで保育園に入園させたい場合、申込時期と復帰時期のすり合わせが重要です。</p>

<h2>育休復帰で+3点の加点</h2>
<p>宮崎市では産休明け・育休明けで復職する場合、新規入所で復帰から6ヶ月までの間は調整点数として<span class="highlight">+3点</span>が加算されます。</p>

<h2>育休中の上の子の継続利用</h2>
<p>育児休業を取得しながら上の子が保育施設を継続利用できるのは、原則として<strong>下の子の出生から1年を経過する月の月末まで</strong>です。育児休業・育児休暇取得証明書と利用継続申立書の提出が必要です。</p>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>入園が内定した後に復帰しなかった場合は、退所となる可能性があります。復帰予定の勤務条件で就労証明書を作成してもらいましょう。</p>
</div>

<h2>慣らし保育の期間を考慮する</h2>
<p>多くの園では入園後1〜2週間程度の慣らし保育期間があります。最初は短時間の預かりから始まるため、復帰日は入園から2週間後以降に設定するのがおすすめです。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>宮崎市では保育必要量（標準時間・短時間）の変更は月単位で、変更が必要な月の前月末までに手続きが必要です。育休復帰に合わせた保育時間の変更は早めに手続きしましょう。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 35,
  },

  // ========== 制度解説 ==========
  {
    slug: "hitorioya-katen",
    citySlug: "miyazaki",
    title: "宮崎市のひとり親加点　+5点の調整加算を解説",
    description:
      "宮崎市でひとり親世帯に適用される+5点の調整加点について、適用条件と手続きを詳しく解説します。",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>ひとり親世帯の加点とは</h2>
<p>宮崎市では、ひとり親世帯の場合、調整点数として<span class="highlight">+5点</span>が加算されます。離婚、離婚調停中、未婚、死別、行方不明、収監中の場合が対象です。</p>

<h2>適用条件</h2>
<ul>
<li>母子家庭または父子家庭であること</li>
<li>離婚、離婚調停中、未婚、死別、行方不明、収監中のいずれかに該当すること</li>
<li>確認できる書類（戸籍謄本、児童扶養手当証書の写し、ひとり親家庭等医療費受給証など）を提出すること</li>
</ul>

<h2>ひとり親世帯の合計点数イメージ</h2>
<p>ひとり親でフルタイム就労（月160時間以上）の場合：</p>
<div class="point-box">
<p><strong>ポイント</strong></p>
<p>基準点数15点 ＋ ひとり親加点5点 ＋ 新規申込み2点 ＝ <span class="highlight">合計22点</span>。さらに認可外卒園加点（+8点）を加えれば30点となり、両親フルタイム共働き世帯と同じ水準になります。</p>
</div>

<h2>虐待・DV世帯の加点</h2>
<p>虐待またはDVのおそれがある場合は、里親・ファミリーホームに委託されている児童を含め、<span class="highlight">+50点</span>の大きな加点があります。該当する方は窓口で相談してください。</p>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>離婚調停中の場合は、裁判所等が作成した協議・調停・裁判中であることが確認できる書類が必要です。事前に窓口で必要書類を確認してください。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 30,
  },
];

registerArticles(articles);
