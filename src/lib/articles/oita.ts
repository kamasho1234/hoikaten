import type { Article } from "./types";
import { registerArticles } from "./index";

const articles: Article[] = [
  // ========== 保活の基本 ==========
  {
    slug: "hokatsu-schedule",
    citySlug: "oita",
    title: "大分市の保活スケジュール　令和8年度4月入園の流れ",
    description:
      "大分市の令和8年度（2026年度）4月入園の申込時期・書類配布・結果通知の時期をまとめました。初めての保活でも迷わないスケジュールガイドです。",
    image:
      "https://images.unsplash.com/photo-1484820540004-14229fe36ca4?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>令和8年度（2026年度）4月入園のスケジュール</h2>
<p>大分市の4月入園申込は<strong>1次選考</strong>と<strong>2次選考</strong>の2回に分かれています。1次で入れなかった場合も2次で再度選考されます。</p>

<h3>1次選考</h3>
<table>
<tr><th>項目</th><th>日程（目安）</th></tr>
<tr><td>申請書類配布開始</td><td>2025年9月頃〜</td></tr>
<tr><td>申込受付</td><td>2025年10月〜11月頃</td></tr>
<tr><td>結果通知</td><td>2026年2月中旬頃</td></tr>
</table>

<h3>2次選考</h3>
<p>1次選考で保留となった場合、2次選考に進みます。2次の受付期間・結果通知日は1次の結果通知に同封されるお知らせで確認してください。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>大分市では子ども入園課（097-537-5794）が窓口です。申込前に電話で確認してから訪問するとスムーズです。</p>
</div>

<h2>いつから動き始めるべき？</h2>
<div class="step">
<div class="step-num">1</div>
<div class="step-content"><strong>4月〜6月：情報収集</strong><p>大分市の「教育・保育給付認定兼保育施設入所申込のてびき」を市のホームページまたは窓口で入手します。</p></div>
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
<p>最新の申込方法は<a href="https://www.city.oita.oita.jp/o253/kosodate/hoiku/2025itijisennkoumousikomi.html" target="_blank" rel="noopener">大分市公式サイト「保育施設入所申込」</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-04-04",
    popularity: 55,
  },

  // ========== 点数・選考 ==========
  {
    slug: "scoring-system-guide",
    citySlug: "oita",
    title: "大分市の入園点数のしくみ　基本指数と調整点をやさしく解説",
    description:
      "大分市の保育園入園選考で使われる「基本指数」と「調整点」の仕組みを、初めての方にもわかるように解説します。",
    image:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>点数制度の全体像</h2>
<p>大分市の認可保育所等は「先着順」ではなく、<strong>指数の高い世帯から優先</strong>して利用調整（選考）されます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>合計指数 ＝ 基本指数（保護者1）＋ 基本指数（保護者2）＋ 調整点</p>
</div>

<h2>基本指数とは</h2>
<p>保護者それぞれの「保育を必要とする事由」を指数化したものです。1人あたり<span class="highlight">最大20点</span>、保護者2人の合計で<span class="highlight">最大40点</span>です。</p>
<table>
<tr><th>就労状況</th><th>基本指数</th></tr>
<tr><td>月150時間以上</td><td>20</td></tr>
<tr><td>月135時間以上150時間未満</td><td>19</td></tr>
<tr><td>月120時間以上135時間未満</td><td>18</td></tr>
<tr><td>月100時間以上120時間未満</td><td>17</td></tr>
<tr><td>月64時間以上100時間未満</td><td>16</td></tr>
</table>
<p>就労以外にも、疾病・障害・看護介護・出産・就学・求職活動・災害復旧などの事由ごとに基本指数が定められています。</p>

<h2>調整点とは</h2>
<p>世帯の状況に応じて加点・減点される点数です。複数該当する場合は合算されます。</p>
<table>
<tr><th>項目</th><th>点数</th></tr>
<tr><td>ひとり親世帯</td><td>+4</td></tr>
<tr><td>育休明け</td><td>+3</td></tr>
<tr><td>在園児有（同一施設への入所）</td><td>+3</td></tr>
<tr><td>単身赴任</td><td>+2</td></tr>
<tr><td>認可外保育施設に通所中</td><td>+1</td></tr>
<tr><td>生活保護（受給・申請）</td><td>+1</td></tr>
<tr><td>就労予定・就学予定</td><td>-2</td></tr>
</table>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳細な選考基準表は<a href="https://www.city.oita.oita.jp/o253/kosodate/hoiku/2026sennkoukizyunn.html" target="_blank" rel="noopener">大分市公式サイト「保育所等入所選考基準」</a>からダウンロードできます。</p>
</div>`,
    publishedAt: "2026-04-04",
    popularity: 60,
  },
  {
    slug: "fulltime-40-line",
    citySlug: "oita",
    title: "フルタイム共働き40点は安心？大分市のボーダーライン事情",
    description:
      "大分市でフルタイム共働き（基本40点）なら入園できるのか？実際の競争状況と加点の重要性を解説します。",
    image:
      "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>基本40点がスタートライン</h2>
<p>大分市では保護者がともに月150時間以上のフルタイム勤務であれば、各20点ずつで<span class="highlight">基本40点</span>になります。多くの申込者がこの40点ラインに並ぶため、人気園では40点だけでは安心できません。</p>

<h2>同点の場合はどうなる？</h2>
<p>基本指数が同じ場合、調整点の加点で差がつきます。さらに同点の場合は「同点となった場合の優先調整事項」により、障がい者のいる世帯、祖父母が同一市内に居住していない、待機中で前年度から継続申込みをしている、などの事項で優先順位が決まります。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>大分市は20点満点制（両親合計40点）のため、1点の差が大きく影響します。育休明け加点（+3）やひとり親加点（+4）が差を分けることがあります。</p>
</div>

<h2>大分市の特徴</h2>
<p>大分市は比較的保育施設の整備が進んでいますが、中心部（大分駅周辺・府内エリア）では競争が発生します。0〜1歳児クラスは全国的に枠が少ないため、早めの準備が大切です。</p>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>年齢区分ごとに利用調整が行われるため、同じ園でも年齢によって入りやすさが大きく異なります。特に0歳児クラスは枠が限られます。</p>
</div>`,
    publishedAt: "2026-04-04",
    popularity: 55,
  },
  {
    slug: "jitan-kinmu-scoring",
    citySlug: "oita",
    title: "時短勤務だと点数は下がる？大分市の基本指数と勤務時間の関係",
    description:
      "大分市で時短勤務の場合、基本指数がどう変わるかを解説。フルタイムとの差や点数を最大化するポイントも紹介します。",
    image:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>時短勤務の基本指数</h2>
<p>大分市では月あたりの就労時間に応じて基本指数が決まります。フルタイム（月150時間以上）なら20点ですが、時短勤務で就労時間が短くなると点数が下がります。</p>

<table>
<tr><th>就労時間</th><th>基本指数</th></tr>
<tr><td>月150時間以上</td><td><span class="highlight">20点</span></td></tr>
<tr><td>月135時間以上150時間未満</td><td><span class="highlight">19点</span></td></tr>
<tr><td>月120時間以上135時間未満</td><td><span class="highlight">18点</span></td></tr>
<tr><td>月100時間以上120時間未満</td><td><span class="highlight">17点</span></td></tr>
<tr><td>月64時間以上100時間未満</td><td><span class="highlight">16点</span></td></tr>
</table>

<h2>時短勤務で両親合計はどうなる？</h2>
<p>たとえば母が月120時間の時短勤務、父がフルタイムの場合：</p>
<div class="point-box">
<p><strong>ポイント</strong></p>
<p>父20点 ＋ 母18点 ＝ <span class="highlight">基本38点</span>。フルタイム共働きの40点と比べて2点低くなります。</p>
</div>

<h2>2点の差は大きい？</h2>
<p>大分市は20点満点制のため、1点・2点の差が選考結果に影響します。人気園では基本40点の世帯が多いため、38点では不利になる可能性があります。調整加点で挽回できるかどうかがポイントです。</p>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>就労証明書に記載される勤務時間がそのまま指数に反映されます。育休復帰後に時短勤務を予定している場合は、復帰後の勤務条件で就労証明書を作成してもらいましょう。</p>
</div>`,
    publishedAt: "2026-04-04",
    popularity: 50,
  },
  {
    slug: "ochita-toki-sentakushi",
    citySlug: "oita",
    title: "大分市で保育園に落ちたときの選択肢　次にやるべきこと",
    description:
      "大分市の選考で保留になった場合の対処法を解説。2次選考・途中入園・認可外・育休延長など、取れる選択肢をまとめました。",
    image:
      "https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>保留通知が届いたら</h2>
<p>1次選考で保留になっても、まだ選択肢はあります。落ち着いて次のステップを検討しましょう。</p>

<h2>選択肢1：2次選考を待つ</h2>
<p>1次で保留になった場合、2次選考の対象になります。1次で辞退が出た枠や追加の空き枠で再度選考が行われます。</p>

<h2>選択肢2：途中入園（5月以降）を申し込む</h2>
<p>年度途中の入園申込は随時受け付けています。転勤や退園による空きが出ることがあるため、粘り強く申し込み続けることが大切です。</p>

<h2>選択肢3：認可外保育施設を利用する</h2>
<p>認可外保育施設に預けて復職し、次年度の認可園申込では認可外利用の加点（+1点）を得る戦略があります。</p>

<h2>選択肢4：育児休業を延長する</h2>
<p>保留通知書があれば、育児休業を子どもが2歳になるまで延長でき、育児休業給付金も継続して受給できます。</p>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>2025年4月から育児休業給付金の延長審査が厳格化されています。給付金延長のために「わざと落ちる」申込は認められなくなりました。</p>
</div>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>大分市では「育休待機→復職」で+2点の調整加点があります。一度保留になった後に復職した実績は次回の選考で有利に働きます。</p>
</div>`,
    publishedAt: "2026-04-04",
    popularity: 45,
  },

  // ========== 認可外 ==========
  {
    slug: "ninkagai-katen",
    citySlug: "oita",
    title: "認可外保育施設の利用で+1点　大分市の加点を得る条件",
    description:
      "大分市で認可外保育施設の利用実績により調整点+1を得るための条件と手続きを解説します。",
    image:
      "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=800&h=400&fit=crop",
    category: "認可外",
    categoryColor: "rose",
    content: `<h2>認可外利用で+1点の加点</h2>
<p>大分市では、申込児童が認可外保育施設に通所している場合、認可園の利用調整で<span class="highlight">+1点</span>の調整加点が得られます。</p>

<h2>加点を得るための条件</h2>
<ul>
<li>申込児童が認可外保育施設に<strong>通所中</strong>であること</li>
<li>就労のために利用していること</li>
<li>申込時点で利用実績があること</li>
</ul>

<h2>大分市の他の加点も活用しよう</h2>
<p>認可外利用の+1点だけでは差がつきにくい場合もあります。大分市では育休明け（+3点）、ひとり親（+4点）、在園児有・同一施設希望（+3点）など、他の調整加点も合わせて活用することが大切です。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>基本40点のフルタイム共働き世帯が認可外加点+1と育休明け加点+3を得ると44点に。在園きょうだい加点（+3）と合わせれば47点となり、かなり有利になります。</p>
</div>`,
    publishedAt: "2026-04-04",
    popularity: 40,
  },

  // ========== 最新情報 ==========
  {
    slug: "ikukyu-kyuufukin-genkakuka",
    citySlug: "oita",
    title: "2025年4月から育休給付金延長の審査が厳格化　大分市での影響",
    description:
      "2025年4月からの育児休業給付金の延長手続き厳格化について、大分市の保活にどう影響するかを解説します。",
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

<h2>大分市の保活への影響</h2>
<p>大分市では複数の希望園を記入して申し込むのが一般的です。通勤可能な範囲で複数の園を希望し、真剣に入園を目指している方はこの制度改正の影響を受けません。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>制度改正の詳細は<a href="https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/0000160564_00040.html" target="_blank" rel="noopener">厚生労働省「育児休業給付金の支給対象期間延長手続き」</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-04-04",
    popularity: 35,
  },

  // ========== 保育園選び ==========
  {
    slug: "area-guide",
    citySlug: "oita",
    title: "大分市のエリア別保育園事情　入りやすい地域は？",
    description:
      "大分市の地域ごとの保育園の特徴と入りやすさの傾向を解説。人気エリアと穴場エリアを紹介します。",
    image:
      "https://images.unsplash.com/photo-1524813686514-a57563d77965?w=800&h=400&fit=crop",
    category: "保育園選び",
    categoryColor: "teal",
    content: `<h2>エリアによって事情が異なる</h2>
<p>大分市は広い市域を持ち、中心部と郊外で保育園の競争状況が大きく異なります。</p>

<h2>エリアごとの傾向</h2>
<table>
<tr><th>エリア</th><th>特徴</th></tr>
<tr><td>大分駅周辺・府内</td><td>交通の利便性が高く人気。0〜1歳児クラスは競争が激しい</td></tr>
<tr><td>明野・高城</td><td>住宅地として人口が多い。園の数は比較的多いが申込も多い</td></tr>
<tr><td>わさだ・稙田</td><td>ベッドタウンとして発展中。新設園もあり比較的入りやすい</td></tr>
<tr><td>鶴崎・大在</td><td>工業地帯に近く共働き世帯が多いが、園数も多い</td></tr>
<tr><td>坂ノ市・佐賀関</td><td>郊外エリアで定員に余裕がある園が比較的多い</td></tr>
<tr><td>野津原・大南</td><td>旧町部で園数は少ないが、定員割れの園もある</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>自宅近くだけでなく、通勤経路上の園も候補に入れると選択肢が広がります。大分市は車通勤が多いため、駐車場のある園を優先して探す方も多いです。大分市公式サイトで各保育施設の申込状況を確認できます。</p>
</div>`,
    publishedAt: "2026-04-04",
    popularity: 45,
  },

  // ========== 育休・復職 ==========
  {
    slug: "ikukyu-fukki-tips",
    citySlug: "oita",
    title: "大分市での育休復帰と保育園入園　知っておきたいポイント",
    description:
      "大分市で育児休業から復帰しながら保育園に入園するための準備とスケジュールを解説します。",
    image:
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=400&fit=crop",
    category: "育休・復職",
    categoryColor: "purple",
    content: `<h2>育休復帰と保活の両立</h2>
<p>育児休業から復帰するタイミングで保育園に入園させたい場合、申込時期と復帰時期のすり合わせが重要です。</p>

<h2>育休明けで+3点の加点</h2>
<p>大分市では育児休業明けの場合は調整点として<span class="highlight">+3点</span>が加算されます。これは大分市の調整加点の中でも大きな加点です。</p>

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
<p>大分市では「育休待機→復職」でさらに+2点の加点もあります。一度保留になった後に復職した場合、次回の選考では育休明け+3と合わせて有利になります。</p>
</div>`,
    publishedAt: "2026-04-04",
    popularity: 50,
  },

  // ========== 制度解説 ==========
  {
    slug: "hitorioya-katen",
    citySlug: "oita",
    title: "大分市のひとり親加点　+4点の調整加点を解説",
    description:
      "大分市でひとり親世帯に適用される+4点の調整加点について、適用条件と手続きを詳しく解説します。",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>ひとり親世帯の加点とは</h2>
<p>大分市では、ひとり親世帯の場合、調整点として<span class="highlight">+4点</span>が加算されます。離婚調停中もしくは離婚裁判中またはこれらに準ずる場合も含まれます。</p>

<h2>適用条件</h2>
<ul>
<li>離婚・死別等によりひとり親であること</li>
<li>離婚調停中・離婚裁判中またはこれらに準ずる場合を含む</li>
<li>戸籍や住民票等で確認できること</li>
</ul>

<h2>ひとり親世帯の合計指数イメージ</h2>
<p>ひとり親でフルタイム就労（月150時間以上）の場合：</p>
<div class="point-box">
<p><strong>ポイント</strong></p>
<p>基本指数20点 ＋ ひとり親加点4点 ＝ <span class="highlight">合計24点</span>。両親フルタイム共働き世帯（40点）より低くなりますが、ひとり親は保護者1人分の基本指数のみで計算されるため、他のひとり親世帯との比較では有利に働きます。</p>
</div>

<h2>必要書類</h2>
<p>ひとり親であることを証明する書類（戸籍謄本、児童扶養手当証書の写しなど）が必要です。申込時に合わせて提出してください。</p>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>事実婚の場合はひとり親として認められない場合があります。不明な点は事前に子ども入園課（097-537-5794）に確認してください。</p>
</div>`,
    publishedAt: "2026-04-04",
    popularity: 30,
  },
];

registerArticles(articles);
