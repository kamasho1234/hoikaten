import type { Article } from "./types";
import { registerArticles } from "./index";

const articles: Article[] = [
  // ========== 保活の基本 ==========
  {
    slug: "hokatsu-schedule",
    citySlug: "kobe",
    title: "神戸市の保活スケジュール　令和8年度4月入園の流れ",
    description:
      "神戸市の令和8年度（2026年度）4月入園の申込時期・書類配布・選考結果通知の時期をまとめました。初めての保活でも迷わないスケジュールガイドです。",
    image:
      "https://images.unsplash.com/photo-1484820540004-14229fe36ca4?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>令和8年度（2026年度）4月入園のスケジュール</h2>
<p>神戸市の4月入園申込は<strong>1次</strong>と<strong>2次</strong>の2回に分かれています。早めに動くことが保活成功のカギです。</p>

<h3>1次申込</h3>
<table>
<tr><th>項目</th><th>日程</th></tr>
<tr><td>申請書類配布開始</td><td>2025年9月19日（金）〜</td></tr>
<tr><td>郵送受付</td><td>2025年10月20日（月）〜11月28日（金）必着</td></tr>
<tr><td>電子申請（e-KOBE）</td><td>2025年10月20日（月）〜11月30日（日）23:59</td></tr>
<tr><td>結果発送</td><td>2026年1月27日（火）頃</td></tr>
</table>

<h3>2次申込</h3>
<p>1次で保留（不承諾）となった場合、2次選考にも申し込めます。2次の受付期間・結果通知日は1次の結果通知に同封されるお知らせで確認してください。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>神戸市では郵送のほか電子申請（e-KOBE）にも対応しています。窓口の混雑を避けたい場合は電子申請が便利です。</p>
</div>

<h2>いつから動き始めるべき？</h2>
<div class="step">
<div class="step-num">1</div>
<div class="step-content"><strong>4月〜6月：情報収集</strong><p>神戸市の「教育・保育施設利用ガイド」を確認し、保育の種類やエリアを把握します。</p></div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content"><strong>6月〜9月：保育園見学</strong><p>気になる園に直接電話して予約。夏場が予約しやすい時期です。</p></div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content"><strong>9月下旬〜：書類入手・準備</strong><p>申請書類を区役所で入手、または市公式サイトからダウンロードします。</p></div>
</div>
<div class="step">
<div class="step-num">4</div>
<div class="step-content"><strong>10月〜11月：申込</strong><p>就労証明書等の必要書類を揃え、期限内に提出します。</p></div>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>申込方法の詳細は<a href="https://www.city.kobe.lg.jp/a65174/kosodate/shien/shinseido/riyomoshikomi/shinsehoho.html" target="_blank" rel="noopener">神戸市公式サイト「教育・保育給付認定の申請・利用申込」</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-03-28",
  },

  // ========== 点数・選考 ==========
  {
    slug: "scoring-system-guide",
    citySlug: "kobe",
    title: "神戸市の入園点数のしくみ　基本点数と調整点数をやさしく解説",
    description:
      "神戸市の保育園入園選考で使われる「基本点数」と「調整点数」の仕組みを、初めての方にもわかるように解説します。",
    image:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>点数制度の全体像</h2>
<p>神戸市の認可保育施設は「先着順」ではなく、<strong>点数の高い世帯から優先</strong>して利用調整（選考）されます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>合計点数 ＝ 基本点数（父）＋ 基本点数（母）＋ 調整点数</p>
</div>

<h2>基本点数とは</h2>
<p>父母それぞれの「保育を必要とする事由」を点数化したものです。1人あたり<span class="highlight">最大100点</span>、父母合計で<span class="highlight">最大200点</span>です。</p>
<table>
<tr><th>就労状況</th><th>基本点数</th></tr>
<tr><td>月20日以上かつ週40時間以上（または週5日以上かつ日8時間以上）</td><td>100</td></tr>
<tr><td>月20日以上かつ週30時間以上（または週5日以上かつ日6時間以上）</td><td>90</td></tr>
<tr><td>月16日以上かつ週24時間以上（または週4日以上かつ日6時間以上）</td><td>80</td></tr>
<tr><td>月12日以上かつ週16時間以上</td><td>60</td></tr>
</table>
<p>就労以外にも、妊娠出産・疾病・介護・就学などの事由ごとに基本点数が定められています。</p>

<h2>調整点数とは</h2>
<p>世帯の状況に応じて加点・減点される点数です。主な項目を紹介します。</p>
<table>
<tr><th>項目</th><th>点数</th></tr>
<tr><td>ひとり親世帯</td><td>+30</td></tr>
<tr><td>きょうだいが在園中の園を第一希望</td><td>+15</td></tr>
<tr><td>きょうだいが在園中</td><td>+8</td></tr>
<tr><td>きょうだい同時申込</td><td>+5</td></tr>
<tr><td>認可外保育施設を利用中</td><td>+5</td></tr>
<tr><td>単身赴任</td><td>+6</td></tr>
<tr><td>生活保護受給世帯</td><td>+10</td></tr>
<tr><td>同居の祖父母がいる（65歳未満）</td><td>-3</td></tr>
<tr><td>育休延長許容</td><td>-90</td></tr>
</table>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>調整点数には加点だけでなく減点もあります。特に「育休延長許容」の<span class="highlight">-90点</span>は非常に大きいため、申込書の記入には十分注意してください。</p>
</div>`,
    publishedAt: "2026-03-28",
  },
  {
    slug: "adjustment-points-detail",
    citySlug: "kobe",
    title: "神戸市の調整点数を徹底解説　加点と減点の全項目",
    description:
      "神戸市の保育利用調整で使われる調整点数の加点項目・減点項目を一覧で紹介。加点を漏れなく取るためのポイントも。",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>加点項目</h2>
<table>
<tr><th>項目</th><th>点数</th><th>備考</th></tr>
<tr><td>ひとり親世帯</td><td>+30</td><td>片親の基本点数100点と合わせて+130相当</td></tr>
<tr><td>きょうだいが在園中の園を第一希望</td><td>+15</td><td>在園園と第一希望園が一致する場合</td></tr>
<tr><td>きょうだいが在園中</td><td>+8</td><td>きょうだいが認可施設に在園</td></tr>
<tr><td>きょうだい同時申込</td><td>+5</td><td>同時に2人以上申込む場合</td></tr>
<tr><td>認可外保育施設を利用中</td><td>+5</td><td>月極契約で利用実績があること</td></tr>
<tr><td>単身赴任</td><td>+6</td><td>就労のためやむを得ず別居</td></tr>
<tr><td>生活保護受給世帯</td><td>+10</td><td>生活保護受給中であること</td></tr>
</table>

<h2>減点項目</h2>
<table>
<tr><th>項目</th><th>点数</th><th>備考</th></tr>
<tr><td>同居の祖父母（65歳未満）</td><td>-3</td><td>保育の代替手段があるとみなされる</td></tr>
<tr><td>育休延長許容</td><td>-90</td><td>育児休業の延長を希望する意思表示があった場合</td></tr>
</table>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>「育休延長許容」は、育児休業給付金の延長のために保育所の利用申込をしているが、実際には入園を希望していない場合に適用されます。2025年4月から国の制度改正で審査が厳格化されており、申込時に確認されます。</p>
</div>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>加点を漏れなく確認するために、申込前に神戸市の<a href="https://www.city.kobe.lg.jp/documents/57502/2024_riyoutyouseikijun.pdf" target="_blank" rel="noopener">利用調整基準表（PDF）</a>を一度通して読むことをおすすめします。</p>
</div>`,
    publishedAt: "2026-03-28",
  },
  {
    slug: "fulltime-200-line",
    citySlug: "kobe",
    title: "フルタイム共働き200点は安心？神戸市のボーダーライン事情",
    description:
      "神戸市でフルタイム共働き（基本200点）なら入園できるのか？実際のボーダーラインや加点の重要性を解説します。",
    image:
      "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>基本200点がスタートライン</h2>
<p>神戸市では父母とも月20日以上・週40時間以上のフルタイム勤務であれば、父100点＋母100点＝<span class="highlight">基本200点</span>になります。多くの申込者がこの200点ラインに並ぶため、200点だけでは安心できません。</p>

<h2>同点の場合はどうなる？</h2>
<p>基本点数が同じ場合、調整点数の加点で差がつきます。さらに同点の場合は、神戸市が定める優先順位（所得の低い世帯が優先など）で決定されます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>フルタイム共働きが多い人気園では、200点＋調整加点がないと厳しい場合があります。きょうだい加点（+8〜+15）や認可外利用実績（+5）が差を分けることが多いです。</p>
</div>

<h2>人気園の傾向</h2>
<p>神戸市では東灘区・中央区・灘区などの都市部で特に競争が激しい傾向があります。これらの地域を希望する場合は調整加点の有無が重要になります。</p>

<h2>申込状況を確認しよう</h2>
<p>神戸市は公式サイトで各園の<a href="https://www.city.kobe.lg.jp/a65174/kosodate/yochien/moshikomijokyo.html" target="_blank" rel="noopener">申込状況（第一希望の申込児童数と受入予定数）</a>を公開しています。希望園の倍率をチェックして、戦略的に園を選びましょう。</p>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>申込状況は第一希望の数のみを集計したものです。第二希望以降で入れるケースもあるため、あくまで目安として活用してください。</p>
</div>`,
    publishedAt: "2026-03-28",
  },
  {
    slug: "jitan-kinmu-scoring",
    citySlug: "kobe",
    title: "時短勤務だと点数は下がる？神戸市の基本点数と勤務時間の関係",
    description:
      "神戸市で時短勤務の場合、基本点数がどう変わるのかを解説。フルタイムとの差や、点数を最大化するためのポイントも紹介します。",
    image:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>時短勤務の基本点数</h2>
<p>神戸市の利用調整では、父母それぞれの就労状況に応じて基本点数が決まります。フルタイム（週40時間以上）なら100点ですが、時短勤務の場合は勤務時間に応じて点数が下がります。</p>

<table>
<tr><th>勤務時間</th><th>基本点数</th></tr>
<tr><td>月20日以上かつ週40時間以上</td><td><span class="highlight">100点</span></td></tr>
<tr><td>月20日以上かつ週30時間以上（例：1日6時間×週5日）</td><td><span class="highlight">90点</span></td></tr>
<tr><td>月16日以上かつ週24時間以上（例：1日6時間×週4日）</td><td><span class="highlight">80点</span></td></tr>
<tr><td>月12日以上かつ週16時間以上</td><td><span class="highlight">60点</span></td></tr>
</table>

<h2>時短勤務で両親合計はどうなる？</h2>
<p>たとえば母が週30時間の時短勤務、父がフルタイムの場合：</p>
<div class="point-box">
<p><strong>ポイント</strong></p>
<p>父100点 ＋ 母90点 ＝ <span class="highlight">基本190点</span>。フルタイム共働きの200点と比べて10点低くなります。</p>
</div>

<h2>10点の差は大きい？</h2>
<p>人気園では基本200点の世帯が多数を占めるため、190点では不利になる可能性があります。ただし、調整加点（きょうだい在園+8〜+15、認可外利用+5など）で挽回できるケースもあります。</p>

<h2>就労証明書の記載に注意</h2>
<p>時短勤務の場合、就労証明書に記載される勤務時間がそのまま点数に反映されます。育休復帰後に時短勤務を予定している場合は、復帰後の勤務条件で就労証明書を作成してもらいましょう。</p>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>申込時点の勤務予定で基本点数が決まります。「入園が決まったら時短をやめてフルタイムに戻す」としても、申込時の就労証明書がフルタイムでなければ100点にはなりません。勤務先との調整が重要です。</p>
</div>`,
    publishedAt: "2026-03-28",
  },
  {
    slug: "ochita-toki-sentakushi",
    citySlug: "kobe",
    title: "神戸市で保育園に落ちたときの選択肢　次にやるべきこと",
    description:
      "神戸市の1次選考で保留（不承諾）になった場合の対処法を解説。2次申込・途中入園・認可外・育休延長など、取れる選択肢をまとめました。",
    image:
      "https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>保留（不承諾）通知が届いたら</h2>
<p>1次選考で保留になっても、まだ選択肢はあります。落ち着いて次のステップを検討しましょう。</p>

<h2>選択肢1：2次選考に申し込む</h2>
<p>1次で保留になった場合、自動的に2次選考の対象になります。2次では1次で辞退が出た枠や追加の空き枠で選考が行われます。希望園の変更・追加も可能なので、通知に同封される案内を確認してください。</p>

<h2>選択肢2：途中入園（5月以降）を申し込む</h2>
<p>年度途中の入園申込は毎月受け付けています。転勤や退園による空きが出ることがあるため、粘り強く申し込み続けることが大切です。</p>

<h2>選択肢3：認可外保育施設を利用する</h2>
<p>認可外保育施設に預けて復職し、次年度の認可園申込では<span class="highlight">認可外利用の+5点加点</span>を得る戦略があります。費用は月5〜10万円程度が目安ですが、翌年度の入園可能性が上がります。</p>

<h2>選択肢4：育児休業を延長する</h2>
<p>保留通知書があれば、育児休業を子どもが2歳になるまで延長でき、育児休業給付金も継続して受給できます。</p>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>2025年4月から育児休業給付金の延長審査が厳格化されています。給付金延長のために「わざと落ちる」申込は認められなくなりました。</p>
</div>

<h2>選択肢5：その他のサービスを活用する</h2>
<ul>
<li><strong>企業主導型保育</strong>：勤務先が契約している場合、利用調整なしで入れる地域枠がある場合も</li>
<li><strong>ファミリーサポート</strong>：一時的な預かりに利用できる</li>
<li><strong>ベビーシッター</strong>：内閣府の割引券制度を活用すると費用を抑えられる</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>保留になっても諦めないことが大切です。2次選考・途中入園で入園できるケースは少なくありません。認可外を利用しながら次年度に備えるのも有効な戦略です。</p>
</div>`,
    publishedAt: "2026-03-28",
  },

  // ========== 認可外 ==========
  {
    slug: "ninkagai-katen",
    citySlug: "kobe",
    title: "認可外保育施設の利用で+5点　神戸市の加点を得る条件",
    description:
      "神戸市で認可外保育施設の利用実績により調整点数+5を得るための条件と手続きを解説します。",
    image:
      "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=800&h=400&fit=crop",
    category: "認可外",
    categoryColor: "rose",
    content: `<h2>認可外利用で+5点の加点</h2>
<p>神戸市では、認可外保育施設に月極で預けて就労している実績があると、認可園の利用調整で<span class="highlight">+5点</span>の調整加点が得られます。</p>

<h2>加点を得るための条件</h2>
<ul>
<li>認可外保育施設に<strong>月極契約</strong>で利用していること（一時保育では対象外）</li>
<li>就労のために利用していること</li>
<li>申込時点で利用実績があること</li>
</ul>

<h2>必要な手続き</h2>
<p>申込時に認可外保育施設の利用を証明する書類（在園証明書や契約書の写しなど）を提出します。就労証明書とあわせて提出が必要です。</p>

<h2>費用対効果を考える</h2>
<p>認可外保育施設の月額保育料は施設により大きく異なりますが、月5万〜10万円程度が目安です。加点を得るために認可外に預ける場合は、費用負担と入園可能性の向上を天秤にかけて判断してください。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>基本200点のフルタイム共働き世帯が認可外加点+5を得ると205点に。きょうだい加点がない世帯にとっては、この5点が当落を分ける場合があります。</p>
</div>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>認可外の利用開始時期や契約形態によっては加点対象にならない場合があります。不明な点は区役所に事前に確認してください。</p>
</div>`,
    publishedAt: "2026-03-28",
  },

  // ========== 最新情報 ==========
  {
    slug: "ikukyu-kyuufukin-genkakuka",
    citySlug: "kobe",
    title: "2025年4月から育休給付金延長の審査が厳格化　神戸市での影響",
    description:
      "2025年4月からの育児休業給付金の延長手続き厳格化について、神戸市の保活にどう影響するかを解説します。",
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

<h2>神戸市の保活への影響</h2>
<p>神戸市では以前から「育休延長許容」に<span class="highlight">-90点</span>の減点を設けており、給付金延長目的の申込を抑制する仕組みがありました。国の制度厳格化により、この傾向がさらに強まっています。</p>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>入園を希望しないにもかかわらず給付金延長のために申込むと、神戸市では-90点の減点が適用されるうえ、ハローワークでの審査でも延長が認められない可能性があります。</p>
</div>

<h2>本当に入園を希望する方は影響なし</h2>
<p>通勤可能な範囲の園を複数希望し、真剣に入園を目指している方はこの制度改正の影響を受けません。従来どおり、保留になった場合は育児休業給付金の延長が可能です。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>制度改正の詳細は<a href="https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/0000160564_00040.html" target="_blank" rel="noopener">厚生労働省「育児休業給付金の支給対象期間延長手続き」</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-03-28",
  },

  // ========== 保育園選び ==========
  {
    slug: "area-guide",
    citySlug: "kobe",
    title: "神戸市の区ごとの保育園事情　入りやすいエリアは？",
    description:
      "神戸市9区の保育園の特徴と入りやすさの傾向を解説。申込状況データの読み方もあわせて紹介します。",
    image:
      "https://images.unsplash.com/photo-1524813686514-a57563d77965?w=800&h=400&fit=crop",
    category: "保育園選び",
    categoryColor: "teal",
    content: `<h2>神戸市は9区で事情が異なる</h2>
<p>神戸市は東灘区・灘区・中央区・兵庫区・北区・長田区・須磨区・垂水区・西区の9区からなり、区によって保育園の数・競争率が大きく異なります。</p>

<h2>区ごとの傾向</h2>
<table>
<tr><th>エリア</th><th>特徴</th></tr>
<tr><td>東灘区・灘区</td><td>ファミリー層に人気が高く、競争率は高め。特に0〜1歳児は激戦</td></tr>
<tr><td>中央区</td><td>マンション増加に伴い児童数が増加傾向。園の新設も進んでいる</td></tr>
<tr><td>北区・西区</td><td>郊外エリアで比較的入りやすい傾向。ただし園の数自体が限られる地域もある</td></tr>
<tr><td>兵庫区・長田区・須磨区・垂水区</td><td>地域による差が大きい。駅近の園は人気が集中</td></tr>
</table>

<h2>申込状況データの見方</h2>
<p>神戸市は各園の<a href="https://www.city.kobe.lg.jp/a65174/kosodate/yochien/moshikomijokyo.html" target="_blank" rel="noopener">申込状況</a>を公式サイトで公開しています。</p>
<ul>
<li><strong>受入予定</strong>：公開日時点の空き人数</li>
<li><strong>申込児童数</strong>：第一希望の申込人数</li>
</ul>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>申込児童数は第一希望のみの集計です。第二希望以降で入園するケースもあるため、受入予定を上回っていても可能性はゼロではありません。</p>
</div>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>自宅近くだけでなく、通勤経路上や隣の区の園も候補に入れると選択肢が広がります。</p>
</div>`,
    publishedAt: "2026-03-28",
  },

  // ========== 育休・復職 ==========
  {
    slug: "ikukyu-enchou-minus90",
    citySlug: "kobe",
    title: "育休延長許容の-90点とは？神戸市の大きな減点を正しく理解する",
    description:
      "神戸市特有の「育休延長許容」-90点の意味と、この減点が適用されるケース・されないケースを詳しく解説します。",
    image:
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=400&fit=crop",
    category: "育休・復職",
    categoryColor: "purple",
    content: `<h2>育休延長許容の-90点とは</h2>
<p>神戸市の利用調整基準には「育休延長許容」という調整項目があり、該当すると<span class="highlight">-90点</span>という非常に大きな減点が適用されます。</p>

<h2>-90点が適用されるケース</h2>
<p>育児休業給付金の支給期間を延長するために保育所の利用申込をしているが、<strong>実際には入園を希望していない</strong>場合に適用されます。</p>
<p>具体的には、申込時に「入所保留となった場合に育児休業の延長を希望する」旨を申告した場合が該当します。</p>

<h2>-90点が適用されないケース</h2>
<p>本当に入園を希望していて、結果的に保留になった場合は、この-90点は適用されません。つまり、<strong>真剣に入園を目指している方は心配不要</strong>です。</p>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>2025年4月から、国の制度改正により育児休業給付金の延長手続きが厳格化されました。「速やかな職場復帰のために保育所の利用申込をした」と認められることが必要です。入園を本当に希望しない場合、虚偽の申込はできません。</p>
</div>

<h2>実質的な影響</h2>
<p>フルタイム共働き200点の世帯に-90点が適用されると110点に。これでは人気園はもちろん、ほぼすべての園で入園は極めて困難です。この制度は、本当に保育が必要な方を優先するための仕組みです。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>申込書の記入欄を慎重に確認し、不明点があれば区役所に相談してください。意図しない減点を避けることが大切です。</p>
</div>`,
    publishedAt: "2026-03-28",
  },
];

registerArticles(articles);
