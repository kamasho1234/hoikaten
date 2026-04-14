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
    popularity: 55,
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
    popularity: 65,
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
    popularity: 100,
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
    popularity: 95,
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
    popularity: 90,
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
    popularity: 80,
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
    popularity: 75,
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
    popularity: 50,
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
    popularity: 60,
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
    popularity: 50,
  },

  // ========== 園えらび ==========
  {
    slug: "nursery-visit-guide",
    citySlug: "kobe",
    title: "神戸市の保育園見学ガイド　チェックすべきポイントと質問リスト",
    description:
      "神戸市で保育園見学をする際に確認すべきポイントや、先生に聞いておきたい質問リストをまとめました。見学の予約方法や時期の目安も紹介します。",
    image:
      "https://images.unsplash.com/photo-1544776193-352d25ca82cd?w=800&h=400&fit=crop",
    category: "園えらび",
    categoryColor: "purple",
    content: `<h2>保育園見学はなぜ大切？</h2>
<p>保育園選びは書類やホームページの情報だけではわかりません。実際に足を運んで雰囲気を肌で感じることが、入園後の満足度を大きく左右します。神戸市には認可保育所・認定こども園・小規模保育など多様な施設があるため、複数園を比較することが重要です。</p>

<h2>見学の予約方法と時期</h2>
<p>見学は各園に直接電話して予約するのが基本です。<strong>6月〜9月</strong>が見学の適期で、10月以降は申込準備で慌ただしくなります。</p>
<ul>
<li>電話は平日の10時〜16時頃が繋がりやすい</li>
<li>1日に2〜3園まわるスケジュールを組むと効率的</li>
<li>神戸市内では合同説明会を開催する区もあるため、区役所の情報もチェック</li>
</ul>

<h2>見学時のチェックポイント</h2>
<table>
<tr><th>項目</th><th>確認すること</th></tr>
<tr><td>保育室の環境</td><td>清潔さ、広さ、採光、おもちゃの種類と量</td></tr>
<tr><td>園庭・外遊び</td><td>園庭の有無、近隣公園への散歩頻度</td></tr>
<tr><td>給食</td><td>自園調理か外部委託か、アレルギー対応</td></tr>
<tr><td>先生の様子</td><td>子どもへの声かけ、笑顔があるか</td></tr>
<tr><td>安全対策</td><td>門の施錠、防犯カメラ、避難訓練の頻度</td></tr>
<tr><td>持ち物</td><td>布団持参の有無、おむつの処理方法</td></tr>
</table>

<h2>先生に聞いておきたい質問リスト</h2>
<ul>
<li>慣らし保育の期間はどのくらいですか？</li>
<li>延長保育は何時まで対応していますか？</li>
<li>急な発熱時のお迎え基準は？</li>
<li>保護者参加の行事は年に何回ありますか？</li>
<li>連絡帳はアプリですか、手書きですか？</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>見学後はメモを残しておきましょう。複数園を比較するときに記憶だけでは混同しがちです。写真撮影が可能か事前に確認しておくと、あとから振り返りやすくなります。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 45,
  },

  // ========== データ分析 ==========
  {
    slug: "zero-vs-one-year",
    citySlug: "kobe",
    title: "神戸市で0歳入園と1歳入園はどちらが有利？データで比較",
    description:
      "神戸市の0歳児クラスと1歳児クラスの定員・申込倍率を比較し、どちらが入りやすいかをデータから分析します。",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop",
    category: "データ分析",
    categoryColor: "teal",
    content: `<h2>0歳入園 vs 1歳入園の基本</h2>
<p>神戸市の認可保育施設では、0歳児クラス（生後57日〜）と1歳児クラスで受入枠が異なります。一般的に<strong>1歳児クラスの方が競争が激しい</strong>と言われますが、実際のデータで確認してみましょう。</p>

<h2>なぜ1歳児クラスは激戦なのか</h2>
<p>1歳児クラスの新規受入枠は、定員から0歳児クラスの持ち上がり人数を引いた残りです。たとえば1歳児定員15名の園で0歳児クラスから9名が持ち上がると、新規受入枠は<span class="highlight">わずか6名</span>になります。</p>

<table>
<tr><th>クラス</th><th>特徴</th></tr>
<tr><td>0歳児クラス</td><td>定員は少ないが全枠が新規。受入6〜9名程度の園が多い</td></tr>
<tr><td>1歳児クラス</td><td>定員は多いが持ち上がりを除いた新規枠は少ない</td></tr>
</table>

<h2>神戸市の傾向</h2>
<p>神戸市が公開する申込状況データを見ると、東灘区・灘区・中央区の人気園では1歳児クラスの申込倍率が2倍を超えるケースがあります。一方、0歳児クラスは定員割れの園も散見されます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>育休を早めに切り上げて0歳4月入園を狙うか、1歳まで育休を取って1歳4月で勝負するかは、家庭の状況と希望園の競争率によって判断が分かれます。希望園の過去の申込状況を確認したうえで決めましょう。</p>
</div>

<h2>0歳入園のメリット・デメリット</h2>
<ul>
<li><strong>メリット</strong>：競争率が比較的低い、早期に保育枠を確保できる</li>
<li><strong>デメリット</strong>：育休を短縮する必要がある、育児休業給付金の受給期間が短くなる</li>
</ul>

<h2>1歳入園のメリット・デメリット</h2>
<ul>
<li><strong>メリット</strong>：育休を十分に取得できる、子どもとの時間を長く確保できる</li>
<li><strong>デメリット</strong>：競争率が高い、加点がないと厳しい場合がある</li>
</ul>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>各園の年齢別申込状況は<a href="https://www.city.kobe.lg.jp/a65174/kosodate/yochien/moshikomijokyo.html" target="_blank" rel="noopener">神戸市公式サイト「申込状況」</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 65,
  },

  // ========== 制度を知る ==========
  {
    slug: "single-parent-guide",
    citySlug: "kobe",
    title: "ひとり親世帯の保活ガイド　神戸市の加点と利用できる支援制度",
    description:
      "神戸市でひとり親世帯が保育園入園選考で受けられる+30点の加点と、活用できる支援制度をまとめました。",
    image:
      "https://images.unsplash.com/photo-1531983412531-1f49a365ffed?w=800&h=400&fit=crop",
    category: "制度を知る",
    categoryColor: "rose",
    content: `<h2>ひとり親世帯の入園選考</h2>
<p>神戸市ではひとり親世帯に調整点数<span class="highlight">+30点</span>の加点があります。片方の親の基本点数（最大100点）に+30点が加わるため、入園選考では有利に働きます。</p>

<h2>点数のシミュレーション</h2>
<table>
<tr><th>就労状況</th><th>基本点数</th><th>ひとり親加点</th><th>合計</th></tr>
<tr><td>フルタイム（週40時間以上）</td><td>100</td><td>+30</td><td><span class="highlight">130</span></td></tr>
<tr><td>週30時間以上</td><td>90</td><td>+30</td><td>120</td></tr>
<tr><td>週24時間以上</td><td>80</td><td>+30</td><td>110</td></tr>
</table>
<p>フルタイム共働き世帯の200点には届きませんが、同点時の優先順位でひとり親世帯が優先されるケースもあります。</p>

<h2>神戸市で利用できる支援制度</h2>
<ul>
<li><strong>児童扶養手当</strong>：所得に応じて月額最大45,500円（令和7年度）を受給可能</li>
<li><strong>ひとり親家庭医療費助成</strong>：医療費の自己負担が軽減される</li>
<li><strong>母子父子寡婦福祉資金</strong>：就職・就学等のための貸付制度</li>
<li><strong>JR通勤定期の割引</strong>：児童扶養手当受給世帯は3割引</li>
</ul>

<h2>保育料の軽減</h2>
<p>ひとり親世帯は保育料の算定でも優遇されます。市民税非課税世帯であれば保育料は無料、課税世帯でも所得に応じた軽減措置があります。また3〜5歳児クラスは幼児教育・保育の無償化により全世帯無料です。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>ひとり親世帯の保活は「加点を最大限活かす」ことが重要です。フルタイム勤務で基本100点を確保し、さらに認可外利用（+5点）やきょうだい加点を組み合わせることで入園可能性が高まります。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>ひとり親支援の詳細は<a href="https://www.city.kobe.lg.jp/a65174/kosodate/shien/shinseido/riyomoshikomi/shinsehoho.html" target="_blank" rel="noopener">神戸市「ひとり親家庭への支援」</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 50,
  },
  {
    slug: "futago-hokatsu",
    citySlug: "kobe",
    title: "双子・多胎児の保活ガイド　神戸市できょうだい同時申込の加点を活かす",
    description:
      "神戸市で双子や三つ子の保活をする際のきょうだい同時申込加点（+5点）の仕組みと、多胎児ならではの保活戦略を解説します。",
    image:
      "https://images.unsplash.com/photo-1609220136736-443140cffec6?w=800&h=400&fit=crop",
    category: "制度を知る",
    categoryColor: "rose",
    content: `<h2>双子・多胎児の保活は特別な準備が必要</h2>
<p>双子や三つ子の保活は、1人の場合とは異なる悩みがあります。「同じ園に入れるか」「2人分の保育料はいくらか」「見学も2人連れで大変」など、多胎児ならではの課題を整理しましょう。</p>

<h2>きょうだい同時申込の加点</h2>
<p>神戸市では、きょうだい（双子含む）を同時に申し込む場合、調整点数<span class="highlight">+5点</span>が加算されます。</p>

<table>
<tr><th>状況</th><th>調整加点</th></tr>
<tr><td>きょうだい同時申込</td><td>+5</td></tr>
<tr><td>きょうだいが在園中の園を第一希望</td><td>+15</td></tr>
<tr><td>きょうだいが在園中</td><td>+8</td></tr>
</table>

<p>双子の場合、初回申込では「きょうだい同時申込+5」が該当します。上のお子さんがすでに在園中であれば、さらに+8〜+15が加算されます。</p>

<h2>同じ園に入れる？</h2>
<p>神戸市の利用調整では、きょうだい同時申込の場合、できるだけ同じ園に調整される配慮がなされます。ただし、<strong>必ず同じ園に入れる保証はありません</strong>。希望園の定員に空きが2名分あることが前提です。</p>

<h2>保育料の負担軽減</h2>
<p>同時に2人以上が保育施設を利用する場合、神戸市では2人目は<span class="highlight">半額</span>、3人目以降は<span class="highlight">無料</span>です。さらに3〜5歳児クラスは幼児教育・保育の無償化により全員無料です。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>双子の保活では「2名分の空きがある園」を中心に希望園リストを組むのが現実的です。定員の多い園や新設園は空き枠が多い傾向にあります。</p>
</div>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>多胎児の育児は身体的負担が大きいため、保育の必要性が高いと判断される場合があります。区役所のこども家庭支援課に相談すると、個別の状況に応じたアドバイスを受けられます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 35,
  },

  // ========== 保活の基本 ==========
  {
    slug: "hoiku-mama-interview",
    citySlug: "kobe",
    title: "神戸市で保活成功したママの体験談　やってよかったこと・後悔したこと",
    description:
      "神戸市で実際に保活を経験し、第一希望の園に入園できたママたちの体験談から、やってよかったことと後悔したことをまとめました。",
    image:
      "https://images.unsplash.com/photo-1491013516836-7db643ee125a?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>保活成功者に共通するポイント</h2>
<p>神戸市で第一希望の園に入園できた家庭の体験談を分析すると、いくつかの共通点が見えてきます。</p>

<h2>やってよかったこと</h2>
<h3>1. 早期の情報収集</h3>
<p>妊娠中から神戸市の「教育・保育施設利用ガイド」を読み込み、点数制度を理解しておいたという声が多くあります。産後は育児で忙しく調べる時間が取れないため、<strong>妊娠中の情報収集が鍵</strong>です。</p>

<h3>2. 5園以上の見学</h3>
<p>希望園を幅広くリストアップするために、5園以上を見学した家庭が多数。第一希望だけでなく、滑り止めの園もしっかり見学しておくことで、どこに決まっても安心できたとのことです。</p>

<h3>3. 認可外保育施設の活用</h3>
<p>1歳4月入園を見据えて0歳のうちから認可外に預け、+5点の加点と復職実績を積んだケースも。費用はかかりますが、結果的に第一希望の園に入園できた事例があります。</p>

<h3>4. 区役所への相談</h3>
<p>区役所のこども家庭支援課に事前に相談し、自分の点数を確認した家庭もあります。点数の計算が合っているか、書類に不備がないかを確認できるため、安心感が違います。</p>

<h2>後悔したこと</h2>
<h3>1. 希望園を絞りすぎた</h3>
<p>「近所の1園だけに絞ったら落ちた」という声が複数。神戸市では希望園を複数記載できるため、<strong>通勤経路も含めて幅広く記載</strong>することが推奨されます。</p>

<h3>2. 就労証明書の依頼が遅れた</h3>
<p>勤務先への就労証明書の依頼を申込直前にしたため、間に合うかヒヤヒヤしたという体験談も。大企業ほど手続きに時間がかかるため、<strong>2か月前には依頼</strong>しましょう。</p>

<h3>3. 見学せずに希望園に入れた</h3>
<p>見学なしで入園した結果、園の方針と合わず転園を検討したケースも。入園後のミスマッチを防ぐためにも、見学は必須です。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>保活は「情報戦」です。早く動いた人ほど余裕を持って準備でき、結果的に満足度の高い入園につながっています。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 60,
  },

  // ========== データ分析 ==========
  {
    slug: "waiting-child-data",
    citySlug: "kobe",
    title: "神戸市の待機児童数の推移と最新データ　区別の傾向を分析",
    description:
      "神戸市の待機児童数の推移を年度ごとに整理し、区別の傾向や今後の見通しをデータに基づいて分析します。",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop",
    category: "データ分析",
    categoryColor: "teal",
    content: `<h2>神戸市の待機児童数の推移</h2>
<p>神戸市は保育施設の整備を進めており、待機児童数は減少傾向にあります。</p>

<table>
<tr><th>年度</th><th>待機児童数</th><th>備考</th></tr>
<tr><td>2020年（令和2年）</td><td>52人</td><td></td></tr>
<tr><td>2021年（令和3年）</td><td>25人</td><td>大幅減</td></tr>
<tr><td>2022年（令和4年）</td><td>18人</td><td></td></tr>
<tr><td>2023年（令和5年）</td><td>8人</td><td></td></tr>
<tr><td>2024年（令和6年）</td><td>4人</td><td>過去最少水準</td></tr>
</table>

<p>数字上は待機児童がほぼ解消されていますが、これは国の定義による「待機児童」の数です。特定の園のみを希望して入れなかった「隠れ待機児童」を含めると、実際にはまだ多くの家庭が希望どおりの園に入れていません。</p>

<h2>区別の傾向</h2>
<table>
<tr><th>区</th><th>傾向</th></tr>
<tr><td>東灘区</td><td>ファミリー層の流入が続き、0〜1歳児の競争率が高い</td></tr>
<tr><td>灘区</td><td>東灘区と同様に人気エリア。駅近の園に申込が集中</td></tr>
<tr><td>中央区</td><td>タワーマンション増加で児童数が急増。新設園で受入枠を増やしている</td></tr>
<tr><td>北区</td><td>郊外で比較的入りやすいが、地域によって差がある</td></tr>
<tr><td>西区</td><td>ニュータウンエリアでは需要が一巡し、空きのある園も</td></tr>
</table>

<h2>「隠れ待機児童」とは</h2>
<p>国の定義では、以下のケースは待機児童に含まれません。</p>
<ul>
<li>特定の園のみを希望して入れなかった場合</li>
<li>認可外施設を利用しながら認可園の空きを待っている場合</li>
<li>育児休業を延長した場合</li>
</ul>
<p>神戸市ではこの「隠れ待機児童」が数百人規模で存在すると推計されます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>待機児童数が減っていても、人気エリア・人気園の競争は依然として厳しいのが実態です。データを過信せず、希望園の個別の申込状況を確認することが大切です。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>最新の待機児童数は<a href="https://www.city.kobe.lg.jp/a36812/kosodate/shien/oen/taiki0.html" target="_blank" rel="noopener">神戸市「待機児童の状況」</a>で公開されています。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 55,
  },

  // ========== 園えらび ==========
  {
    slug: "small-nursery-guide",
    citySlug: "kobe",
    title: "神戸市の小規模保育事業所ガイド　メリットと3歳の壁の対策",
    description:
      "神戸市の小規模保育事業所の特徴、メリット・デメリット、そして2歳で卒園後の「3歳の壁」への対策を解説します。",
    image:
      "https://images.unsplash.com/photo-1587654780291-39c9404d7dd0?w=800&h=400&fit=crop",
    category: "園えらび",
    categoryColor: "purple",
    content: `<h2>小規模保育事業所とは</h2>
<p>小規模保育事業所は定員6〜19名の認可保育施設で、<strong>0〜2歳児</strong>を対象としています。神戸市内には多数の小規模保育事業所があり、特に都市部で大規模園に入れなかった場合の受け皿として重要な役割を果たしています。</p>

<h2>小規模保育のメリット</h2>
<ul>
<li><strong>少人数で手厚い保育</strong>：定員が少ないため、保育士の目が行き届きやすい</li>
<li><strong>競争率が比較的低い</strong>：大規模園に比べて申込が集中しにくい傾向</li>
<li><strong>アットホームな雰囲気</strong>：家庭的な環境で過ごせる</li>
<li><strong>駅近に多い</strong>：ビルの一室を活用した施設が多く、アクセスが良い場合も</li>
</ul>

<h2>小規模保育のデメリット</h2>
<ul>
<li><strong>2歳で卒園</strong>：3歳児クラスからは別の園に移る必要がある</li>
<li><strong>園庭がない場合が多い</strong>：外遊びは近隣の公園へ散歩</li>
<li><strong>行事が少ない</strong>：運動会や発表会がない、または簡素な場合も</li>
</ul>

<h2>「3歳の壁」とその対策</h2>
<p>小規模保育の最大の課題は2歳で卒園する「3歳の壁」です。しかし神戸市では以下の配慮があります。</p>

<table>
<tr><th>対策</th><th>内容</th></tr>
<tr><td>連携施設</td><td>多くの小規模保育事業所は連携施設（認定こども園等）を設定しており、卒園後の受入先が確保されている</td></tr>
<tr><td>3歳児クラスの定員増</td><td>幼児教育・保育の無償化に伴い3歳児クラスの定員を増やしている園もある</td></tr>
<tr><td>利用調整での配慮</td><td>小規模保育卒園児は3歳児クラスの利用調整で一定の配慮を受けられる場合がある</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>小規模保育を選ぶ際は、連携施設がどこに設定されているかを必ず確認しましょう。連携施設があれば3歳の壁を心配する必要はほとんどありません。</p>
</div>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>連携施設の設定は園によって異なり、連携先がない場合もあります。入園前に必ず確認してください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 50,
  },

  // ========== 点数アップ ==========
  {
    slug: "secondchild-hokatsu",
    citySlug: "kobe",
    title: "第二子の保活は有利？神戸市のきょうだい加点を最大限に活用する方法",
    description:
      "神戸市で第二子の保活をする際のきょうだい加点（+8〜+15点）の仕組みと、加点を最大化する戦略を解説します。",
    image:
      "https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>第二子の保活で使える「きょうだい加点」</h2>
<p>神戸市では、すでにきょうだいが認可保育施設に在園している場合、第二子の入園選考で調整加点を受けられます。</p>

<table>
<tr><th>条件</th><th>加点</th></tr>
<tr><td>きょうだいが在園中の園を第一希望にする</td><td><span class="highlight">+15点</span></td></tr>
<tr><td>きょうだいが在園中（第一希望が別の園）</td><td><span class="highlight">+8点</span></td></tr>
<tr><td>きょうだい同時申込</td><td>+5点</td></tr>
</table>

<h2>+15点と+8点の違い</h2>
<p>第一子が通っている園を第二子の第一希望にすると<span class="highlight">+15点</span>、別の園を第一希望にすると<span class="highlight">+8点</span>です。この7点の差は非常に大きく、人気園では当落を分ける可能性があります。</p>

<h2>加点を最大化する戦略</h2>
<h3>戦略1：同じ園を第一希望にする</h3>
<p>送迎の負担を考えても、同じ園にきょうだいを通わせるのが理想的です。+15点の加点があれば、フルタイム共働きの場合<span class="highlight">合計215点</span>となり、多くの園で入園できる水準です。</p>

<h3>戦略2：第一子の在園中に第二子を申し込む</h3>
<p>きょうだい加点は第一子が在園中でなければ得られません。第一子が卒園してしまうと加点は消えるため、<strong>第一子の在園期間中に第二子を申し込む</strong>ことが重要です。</p>

<h3>戦略3：認可外利用と組み合わせる</h3>
<p>きょうだい在園+15点と認可外利用+5点を組み合わせれば合計<span class="highlight">+20点</span>。フルタイム共働きなら220点に達し、ほぼ確実に入園できるレベルです。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>第二子の保活は第一子より有利です。きょうだい加点を最大限に活かすために、第一希望を第一子と同じ園にするのが最も効果的な戦略です。</p>
</div>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>きょうだい加点は「認可保育施設に在園中」であることが条件です。第一子が認可外施設にのみ通っている場合は加点の対象外となるため注意してください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 55,
  },

  // ========== 制度を知る ==========
  {
    slug: "hoikuryo-guide",
    citySlug: "kobe",
    title: "神戸市の保育料はいくら？年齢・所得別の目安と軽減制度",
    description:
      "神戸市の認可保育施設の保育料を年齢・所得階層別に整理し、多子軽減やひとり親世帯向けの減額制度も解説します。",
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop",
    category: "制度を知る",
    categoryColor: "rose",
    content: `<h2>神戸市の保育料の仕組み</h2>
<p>認可保育施設の保育料は、<strong>世帯の市民税所得割額</strong>と<strong>子どもの年齢</strong>によって決まります。毎年9月に切り替わり、4〜8月は前年度の市民税、9〜3月は当年度の市民税が基準です。</p>

<h2>3〜5歳児は無料</h2>
<p>2019年10月からの幼児教育・保育の無償化により、<span class="highlight">3〜5歳児クラスの保育料は全世帯無料</span>です。ただし、給食の副食費（おかず・おやつ代）として月4,500円程度が別途かかる場合があります。</p>

<h2>0〜2歳児の保育料の目安</h2>
<p>0〜2歳児クラスの保育料は所得に応じて段階的に設定されています。</p>
<table>
<tr><th>市民税所得割額</th><th>月額保育料（目安）</th></tr>
<tr><td>非課税世帯</td><td>0円</td></tr>
<tr><td>〜48,600円未満</td><td>〜約12,000円</td></tr>
<tr><td>48,600円〜97,000円未満</td><td>約12,000〜25,000円</td></tr>
<tr><td>97,000円〜169,000円未満</td><td>約25,000〜40,000円</td></tr>
<tr><td>169,000円〜301,000円未満</td><td>約40,000〜55,000円</td></tr>
<tr><td>301,000円〜397,000円未満</td><td>約55,000〜65,000円</td></tr>
<tr><td>397,000円以上</td><td>約65,000〜80,000円</td></tr>
</table>
<p>※上記は標準的な認可保育所の場合の概算です。正確な金額は神戸市の保育料表をご確認ください。</p>

<h2>多子軽減制度</h2>
<p>きょうだいが同時に保育施設等を利用している場合：</p>
<ul>
<li><strong>2人目</strong>：保育料<span class="highlight">半額</span></li>
<li><strong>3人目以降</strong>：保育料<span class="highlight">無料</span></li>
</ul>

<h2>その他の軽減制度</h2>
<ul>
<li><strong>ひとり親世帯</strong>：所得に応じた軽減措置あり</li>
<li><strong>生活保護世帯</strong>：保育料無料</li>
<li><strong>在宅障害児（者）がいる世帯</strong>：軽減措置あり</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>保育料は「世帯合算」の市民税所得割額で決まります。共働きの場合は父母の合算額が基準となるため、片方だけの所得では判断できません。源泉徴収票や市民税の通知書で確認しましょう。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>保育料の詳細は<a href="https://www.city.kobe.lg.jp/a65174/kosodate/shien/shinseido/riyomoshikomi/riyoshafutangaku.html" target="_blank" rel="noopener">神戸市「保育料について」</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 45,
  },

  // ========== 保活の基本 ==========
  {
    slug: "required-documents",
    citySlug: "kobe",
    title: "神戸市の保育園申込に必要な書類一覧　準備のコツと注意点",
    description:
      "神戸市の認可保育施設の入園申込に必要な書類を一覧で整理。就労証明書の取得のコツや、よくある不備も紹介します。",
    image:
      "https://images.unsplash.com/photo-1568667256549-094345857637?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>申込に必要な書類一覧</h2>
<p>神戸市の認可保育施設への入園申込には、以下の書類が必要です。</p>

<table>
<tr><th>書類名</th><th>入手先</th><th>備考</th></tr>
<tr><td>教育・保育給付認定申請書兼利用申込書</td><td>区役所・市公式サイト</td><td>子ども1人につき1枚</td></tr>
<tr><td>就労証明書</td><td>勤務先に依頼</td><td>父母それぞれ必要</td></tr>
<tr><td>マイナンバー確認書類</td><td>―</td><td>マイナンバーカードまたは通知カード+本人確認書類</td></tr>
<tr><td>保育を必要とする事由の証明書</td><td>事由による</td><td>就労以外の事由（疾病・介護等）の場合</td></tr>
</table>

<h2>状況に応じて追加で必要な書類</h2>
<table>
<tr><th>対象</th><th>追加書類</th></tr>
<tr><td>ひとり親世帯</td><td>児童扶養手当証書の写し、戸籍謄本など</td></tr>
<tr><td>自営業・フリーランス</td><td>開業届の写し、確定申告書の写し、就労状況申告書</td></tr>
<tr><td>求職中</td><td>求職活動申立書</td></tr>
<tr><td>育休中</td><td>育児休業期間がわかる書類（就労証明書に記載）</td></tr>
<tr><td>認可外利用中</td><td>在園証明書または契約書の写し</td></tr>
<tr><td>転入予定</td><td>転入先の賃貸契約書の写し、売買契約書の写しなど</td></tr>
</table>

<h2>就労証明書の準備のコツ</h2>
<ul>
<li><strong>早めに依頼</strong>：勤務先の人事部門に申込開始の2か月前には依頼する</li>
<li><strong>神戸市指定の様式を使う</strong>：市公式サイトからダウンロードできる様式を使用</li>
<li><strong>勤務予定を正確に記入</strong>：復職後の勤務時間・日数が点数に直結するため、正確な記載を依頼する</li>
<li><strong>押印・署名の確認</strong>：会社の代表者印または人事担当者印が必要</li>
</ul>

<h2>よくある不備と対策</h2>
<ul>
<li><strong>就労証明書の日付が古い</strong>：申込日の3か月以内に作成されたものが必要</li>
<li><strong>マイナンバーの記載漏れ</strong>：家族全員分のマイナンバーが必要</li>
<li><strong>希望園の記入ミス</strong>：正式名称で記入（略称はNG）</li>
<li><strong>署名・押印の不足</strong>：申込者本人と配偶者双方の署名が必要な書類がある</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>書類の不備があると受付が遅れ、選考に不利になる可能性があります。提出前に区役所の窓口で事前チェックを受けると安心です。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>申込書類の詳細は<a href="https://www.city.kobe.lg.jp/a65174/kosodate/shien/shinseido/riyomoshikomi/shinsehoho.html" target="_blank" rel="noopener">神戸市「教育・保育給付認定の申請・利用申込」</a>からダウンロードできます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 50,
  },

  // ========== 追加記事 2026-04-07 ==========
  {
    slug: "self-employed-score",
    citySlug: "kobe",
    title: "神戸市で自営業・フリーランスが保育園に入るための点数戦略",
    description: "神戸市で自営業やフリーランスの方が保育園入園の選考で不利にならないための点数の仕組みと対策を解説します。",
    image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>自営業・フリーランスの基本点数</h2>
<p>神戸市では自営業・フリーランスも会社員と同じ基本点数表が適用されます。就労時間と日数が基準を満たせば、<span class="highlight">最大100点</span>を取得できます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>自営業の場合、「就労状況申告書」と「開業届の写し」または「確定申告書の写し」の提出が必要です。会社員の就労証明書に相当する書類を自分で準備する必要があります。</p>
</div>

<h2>点数を最大化するコツ</h2>
<div class="step">
<div class="step-num">1</div>
<div class="step-content"><strong>就労時間の記録を残す</strong><p>業務日報やタイムカードアプリなどで、月20日以上・週40時間以上の就労実態を証明できるようにしましょう。</p></div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content"><strong>開業届を出しておく</strong><p>税務署に開業届を提出していることが就労証明の基本です。未届の場合は早めに提出しましょう。</p></div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content"><strong>確定申告書を用意する</strong><p>直近の確定申告書（控え）は事業実態の証明になります。開業初年度で確定申告前の場合は、開業届と受注実績がわかる書類を準備してください。</p></div>
</div>

<h2>注意点</h2>
<ul>
<li>居宅内労働（在宅ワーク）の場合も居宅外労働と同じ点数表が適用されます</li>
<li>収入が極端に少ない場合、就労の実態について確認を求められることがあります</li>
<li>配偶者が自営業の手伝いをしている場合も就労証明が必要です</li>
</ul>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>必要書類の詳細は<a href="https://www.city.kobe.lg.jp/a65174/kosodate/shien/shinseido/riyomoshikomi/shinsehoho.html" target="_blank" rel="noopener">神戸市公式サイト</a>でご確認ください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 40,
  },
  {
    slug: "naishoku-score",
    citySlug: "kobe",
    title: "神戸市で内職・在宅ワークの場合の保育園入園点数",
    description: "神戸市で内職や在宅ワークをしている場合の保育園入園点数の扱いと、申請時の注意点を解説します。",
    image: "https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>在宅ワーク・内職の点数</h2>
<p>神戸市では在宅ワーク（居宅内労働）も居宅外労働と<strong>同じ基本点数表</strong>が適用されます。月の就労日数と週の就労時間で点数が決まります。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>在宅ワークだからといって点数が下がることはありません。ただし、就労実態の証明が重要になります。</p>
</div>

<h2>必要な証明書類</h2>
<table>
<tr><th>働き方</th><th>必要書類</th></tr>
<tr><td>業務委託・フリーランス</td><td>就労状況申告書＋開業届＋業務委託契約書など</td></tr>
<tr><td>内職</td><td>就労状況申告書＋内職証明書（発注元が発行）</td></tr>
<tr><td>在宅勤務（会社員）</td><td>就労証明書（勤務先が発行、在宅勤務の旨を記載）</td></tr>
</table>

<h2>申請時の注意点</h2>
<ul>
<li>就労時間は「実働時間」で申告してください。休憩時間や家事の時間は含められません</li>
<li>内職の場合、月の報酬額が極端に低いと実態確認を求められることがあります</li>
<li>在宅勤務の会社員は、勤務先が発行する就労証明書に在宅勤務である旨の記載があれば問題ありません</li>
</ul>

<div class="info-box">
<p><strong>注意</strong></p>
<p>就労実態と申告内容に相違がある場合、入園後に利用取消になる可能性があります。正確な申告を心がけましょう。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 35,
  },
  {
    slug: "kyushoku-hokatsu",
    citySlug: "kobe",
    title: "神戸市で求職中に保育園に申し込む方法と点数の目安",
    description: "神戸市で求職活動中でも保育園に申し込めます。求職中の点数や入園後の就労開始期限について解説します。",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>求職中でも申し込める</h2>
<p>神戸市では「求職活動中」も保育を必要とする事由として認められ、認可保育園に申し込むことができます。</p>

<h2>求職中の基本点数</h2>
<p>求職活動中の基本点数は<span class="highlight">40点</span>です。フルタイム就労（100点）と比べると大きく差があるため、激戦区での入園は厳しい場合があります。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>求職中の場合、入園後<strong>90日以内</strong>に就労を開始する必要があります。期限内に就労が開始されない場合、退園になる可能性があります。</p>
</div>

<h2>求職中から点数を上げる方法</h2>
<div class="step">
<div class="step-num">1</div>
<div class="step-content"><strong>先に就職先を決める</strong><p>内定をもらった状態で申し込めば「就労内定」として就労と同等の点数が適用されます。</p></div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content"><strong>認可外保育施設を利用する</strong><p>認可外に預けて就労を開始すれば、就労の基本点数＋認可外利用の加点が得られます。</p></div>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>求職活動中の取扱いの詳細は<a href="https://www.city.kobe.lg.jp/a65174/kosodate/shien/shinseido/riyomoshikomi/shinsehoho.html" target="_blank" rel="noopener">神戸市公式サイト</a>でご確認ください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 40,
  },
  {
    slug: "tenshoku-timing",
    citySlug: "kobe",
    title: "神戸市で転職するタイミングと保育園入園への影響",
    description: "転職が保育園の入園選考や在園継続に与える影響、神戸市でのベストな転職タイミングを解説します。",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>転職が入園選考に与える影響</h2>
<p>保育園の入園申込時に提出する就労証明書は、現在の勤務先のものが必要です。転職のタイミングによっては点数に影響する場合があります。</p>

<h2>申込前に転職する場合</h2>
<ul>
<li>新しい勤務先の就労証明書を提出すれば問題ありません</li>
<li>試用期間中でも就労証明書を発行してもらえるのが一般的です</li>
<li>転職直後で就労証明書が間に合わない場合は、内定通知書＋雇用契約書で代替できる場合があります（要事前相談）</li>
</ul>

<h2>入園後に転職する場合</h2>
<div class="point-box">
<p><strong>ポイント</strong></p>
<p>入園後の転職は可能ですが、転職後の就労証明書を速やかに区役所に提出する必要があります。退職から再就職まで<strong>90日以内</strong>に就労を開始してください。</p>
</div>

<h2>注意点</h2>
<ul>
<li>就労時間が大幅に減ると保育の必要性が認められなくなる可能性があります</li>
<li>申込後〜入園前に転職した場合、新しい就労証明書を速やかに提出してください</li>
</ul>

<div class="info-box">
<p><strong>注意</strong></p>
<p>転職に伴う手続きの詳細は、お住まいの区役所こども家庭係にご相談ください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 35,
  },
  {
    slug: "age2-nyuen",
    citySlug: "kobe",
    title: "神戸市で2歳児クラスから入園するメリットと注意点",
    description: "神戸市で2歳児クラス（4月1日時点で2歳）から保育園に入るメリット・デメリットと、競争率の傾向を解説します。",
    image: "https://images.unsplash.com/photo-1587654780291-39c9404d7dd0?w=800&h=400&fit=crop",
    category: "年齢別対策",
    categoryColor: "amber",
    content: `<h2>2歳児クラスの特徴</h2>
<p>2歳児クラスは4月1日時点で2歳の子どもが対象です。神戸市では2歳児クラスの募集枠は園によって大きく異なります。</p>

<h2>メリット</h2>
<ul>
<li>0歳・1歳児クラスに比べて競争率が低い園がある</li>
<li>小規模保育（0〜2歳）からの転園組がいるため、枠が増える園もある</li>
<li>子どもの体力がつき、集団生活に馴染みやすい年齢</li>
</ul>

<h2>注意点</h2>
<div class="point-box">
<p><strong>ポイント</strong></p>
<p>2歳児クラスは「持ち上がり」が多いため、新規募集枠が少ない園もあります。希望園の過去の募集人数を確認しましょう。</p>
</div>

<h2>小規模保育からの連携枠</h2>
<p>小規模保育事業（0〜2歳）を卒園した子どもには、連携先の保育園への優先枠が設けられている場合があります。小規模保育を利用中の方は、連携先の園を確認しておきましょう。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>各園の募集状況は<a href="https://www.city.kobe.lg.jp/a65174/kosodate/shien/shinseido/riyomoshikomi/shinsehoho.html" target="_blank" rel="noopener">神戸市公式サイト</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 35,
  },
  {
    slug: "age3-ikou",
    citySlug: "kobe",
    title: "神戸市で3歳児クラスへの移行・転園ガイド",
    description: "小規模保育からの3歳児クラスへの移行や転園の流れ、神戸市の連携施設制度について解説します。",
    image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&h=400&fit=crop",
    category: "年齢別対策",
    categoryColor: "amber",
    content: `<h2>3歳児クラスへの移行とは</h2>
<p>小規模保育事業や家庭的保育事業は原則0〜2歳が対象です。3歳になると卒園するため、認可保育園や認定こども園への移行が必要になります。</p>

<h2>連携施設の優先枠</h2>
<p>神戸市では、小規模保育事業所ごとに「連携施設」が設定されている場合があります。連携施設への入園では優先的に取り扱われます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>連携施設が設定されていない小規模保育もあります。入園前に連携先の有無を確認しておくことが重要です。</p>
</div>

<h2>3歳児クラスの競争率</h2>
<p>3歳児クラスは幼稚園に進む子どもがいるため、認可保育園でも若干の空きが出ることがあります。ただし人気園では持ち上がりでほぼ埋まる場合もあります。</p>

<h2>幼稚園の預かり保育という選択肢</h2>
<p>3歳からは幼稚園の預かり保育（新2号認定）も利用できます。保育料無償化の対象となるため、経済的な負担も軽減されます。</p>

<div class="info-box">
<p><strong>注意</strong></p>
<p>連携施設の情報は年度ごとに変わる可能性があります。最新情報は区役所またはこども家庭局にお問い合わせください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 30,
  },
  {
    slug: "nyuyoji-age0",
    citySlug: "kobe",
    title: "神戸市の0歳児クラス入園ガイド　生後何か月から預けられる？",
    description: "神戸市で0歳児クラスに入園する場合の月齢要件、申込時期、注意点をまとめました。",
    image: "https://images.unsplash.com/photo-1544126592-807ade215a0b?w=800&h=400&fit=crop",
    category: "年齢別対策",
    categoryColor: "amber",
    content: `<h2>0歳児クラスの受入月齢</h2>
<p>神戸市の認可保育園では、多くの園が<span class="highlight">生後57日（産休明け）</span>から受入可能です。ただし園によって受入開始月齢が異なります。</p>

<table>
<tr><th>受入月齢</th><th>対応する園</th></tr>
<tr><td>生後57日〜</td><td>多くの認可保育園</td></tr>
<tr><td>生後6か月〜</td><td>一部の園</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>4月入園の場合、4月1日時点の月齢が受入条件を満たしている必要があります。例えば「生後57日〜」の園に4月入園するには、2月上旬までに生まれた赤ちゃんが対象です。</p>
</div>

<h2>0歳児クラスのメリット</h2>
<ul>
<li>募集定員が比較的多い</li>
<li>1歳児クラスより競争率が低い傾向</li>
<li>早くから集団生活に慣れることができる</li>
</ul>

<h2>0歳児クラスのデメリット</h2>
<ul>
<li>育休を短縮する必要がある</li>
<li>体調を崩しやすく、呼び出しが多い傾向</li>
<li>母乳育児との両立が大変な場合がある</li>
</ul>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>各園の受入月齢は<a href="https://www.city.kobe.lg.jp/a65174/kosodate/shien/shinseido/riyomoshikomi/shinsehoho.html" target="_blank" rel="noopener">神戸市の保育施設一覧</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 40,
  },
  {
    slug: "nintei-kodomoen",
    citySlug: "kobe",
    title: "神戸市の認定こども園ガイド　保育園との違いと選び方",
    description: "神戸市の認定こども園の特徴、保育園との違い、入園申込の方法を解説します。",
    image: "https://images.unsplash.com/photo-1576495199011-eb94736d05d6?w=800&h=400&fit=crop",
    category: "施設の種類",
    categoryColor: "purple",
    content: `<h2>認定こども園とは</h2>
<p>認定こども園は、保育園と幼稚園の機能を併せ持つ施設です。神戸市内にも多くの認定こども園があり、保育を必要とする子どもも利用できます。</p>

<h2>保育園との主な違い</h2>
<table>
<tr><th>項目</th><th>認可保育園</th><th>認定こども園</th></tr>
<tr><td>対象年齢</td><td>0〜5歳</td><td>0〜5歳</td></tr>
<tr><td>利用時間</td><td>保育標準時間・短時間</td><td>保育利用・教育利用を選択</td></tr>
<tr><td>保護者の就労要件</td><td>必要</td><td>保育利用は必要、教育利用は不要</td></tr>
<tr><td>3歳以上の教育内容</td><td>園による</td><td>幼稚園教育要領に基づく教育あり</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>保育を必要とする場合（2号・3号認定）の入園申込は、認可保育園と同じく区役所を通じて行います。選考基準も同じ点数制です。</p>
</div>

<h2>認定こども園を選ぶメリット</h2>
<ul>
<li>教育と保育の両方を受けられる</li>
<li>保護者の就労状況が変わっても通い続けられる</li>
<li>希望園の選択肢が広がる</li>
</ul>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>神戸市内の認定こども園の一覧は<a href="https://www.city.kobe.lg.jp/a65174/kosodate/shien/shinseido/riyomoshikomi/shinsehoho.html" target="_blank" rel="noopener">神戸市公式サイト</a>でご確認ください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 35,
  },
  {
    slug: "kigyou-shudogata",
    citySlug: "kobe",
    title: "神戸市の企業主導型保育園とは？認可保育園との違いと活用法",
    description: "神戸市にある企業主導型保育園の仕組み、認可保育園との違い、入園方法を解説します。",
    image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&h=400&fit=crop",
    category: "施設の種類",
    categoryColor: "purple",
    content: `<h2>企業主導型保育園とは</h2>
<p>企業主導型保育事業は、企業が従業員のために設置する保育施設です。認可外保育施設ですが、国から運営費の助成を受けており、保育料は認可保育園と同程度に設定されていることが多いです。</p>

<h2>認可保育園との違い</h2>
<table>
<tr><th>項目</th><th>認可保育園</th><th>企業主導型</th></tr>
<tr><td>申込先</td><td>区役所</td><td>施設に直接</td></tr>
<tr><td>選考方法</td><td>点数制</td><td>施設が独自に決定</td></tr>
<tr><td>保育料</td><td>所得に応じた階層制</td><td>施設が設定（年齢別定額が多い）</td></tr>
<tr><td>入園時期</td><td>主に4月</td><td>随時可能な場合が多い</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>企業主導型には「従業員枠」と「地域枠」があり、地域枠なら企業の従業員でなくても利用できます。認可保育園の入園が難しい場合の選択肢として検討しましょう。</p>
</div>

<h2>活用のメリット</h2>
<ul>
<li>点数を気にせず入園できる</li>
<li>途中入園もしやすい</li>
<li>認可保育園の入園選考で「認可外利用中」の加点（+5点）が得られる</li>
</ul>

<div class="info-box">
<p><strong>注意</strong></p>
<p>企業主導型保育園は認可外保育施設です。見学時に保育士の配置基準や設備を確認しましょう。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 30,
  },
  {
    slug: "yakan-hoiku",
    citySlug: "kobe",
    title: "神戸市の夜間保育・延長保育ガイド",
    description: "神戸市で夜間保育や延長保育を利用する方法、対象施設、利用料金について解説します。",
    image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&h=400&fit=crop",
    category: "施設の種類",
    categoryColor: "purple",
    content: `<h2>延長保育とは</h2>
<p>神戸市の認可保育園では、通常の保育時間（保育標準時間：最大11時間）を超えて保育を利用できる「延長保育」があります。</p>

<h2>延長保育の利用時間と料金の目安</h2>
<table>
<tr><th>区分</th><th>時間帯の目安</th><th>料金の目安</th></tr>
<tr><td>延長保育（1時間）</td><td>18:00〜19:00</td><td>月額2,000〜4,000円程度</td></tr>
<tr><td>延長保育（2時間）</td><td>18:00〜20:00</td><td>月額4,000〜6,000円程度</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>延長保育の料金や実施時間は園ごとに異なります。入園前に必ず希望園に確認しましょう。</p>
</div>

<h2>夜間保育について</h2>
<p>夜間保育（おおむね20時以降の保育）に対応している施設は限られています。夜勤のある方は、ベビーシッターやファミリーサポートとの併用も検討しましょう。</p>

<h2>保育短時間認定の場合</h2>
<p>保育短時間認定（最大8時間）の場合、園が設定する短時間の枠を超えると延長保育扱いになります。パートタイム勤務の方は勤務時間と保育時間の関係を確認しておきましょう。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>延長保育の実施園は<a href="https://www.city.kobe.lg.jp/a65174/kosodate/shien/shinseido/riyomoshikomi/shinsehoho.html" target="_blank" rel="noopener">神戸市公式サイト</a>の保育施設一覧で確認できます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 30,
  },
  {
    slug: "mushoka-seido",
    citySlug: "kobe",
    title: "神戸市の幼児教育・保育無償化制度まとめ",
    description: "神戸市における幼児教育・保育の無償化制度の対象範囲、条件、手続きについてわかりやすく解説します。",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop",
    category: "お金・制度",
    categoryColor: "rose",
    content: `<h2>無償化の対象</h2>
<p>2019年10月から開始された幼児教育・保育の無償化制度により、以下の利用料が無償化されています。</p>

<table>
<tr><th>対象</th><th>無償化の内容</th></tr>
<tr><td>3〜5歳児クラス（認可保育園・認定こども園）</td><td>保育料が無料</td></tr>
<tr><td>0〜2歳児クラス（住民税非課税世帯）</td><td>保育料が無料</td></tr>
<tr><td>認可外保育施設（3〜5歳、保育の必要性あり）</td><td>月額37,000円まで無償</td></tr>
<tr><td>認可外保育施設（0〜2歳、非課税世帯）</td><td>月額42,000円まで無償</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>無償化されるのは「保育料」のみです。給食費（副食費）・教材費・行事費などの実費は別途負担が必要です。</p>
</div>

<h2>給食費（副食費）の免除</h2>
<p>年収360万円未満相当の世帯や第3子以降の子どもは、副食費（おかず・おやつ代）が免除される場合があります。</p>

<h2>手続き</h2>
<ul>
<li>認可保育園・認定こども園：入園手続きに含まれるため追加手続きは基本不要</li>
<li>認可外保育施設：「保育の必要性」の認定（施設等利用給付認定）を別途申請する必要があります</li>
</ul>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>無償化制度の詳細は<a href="https://www.city.kobe.lg.jp/z/kodomokatekyoku/kosodateshien/mushouka.html" target="_blank" rel="noopener">神戸市「幼児教育・保育の無償化」</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 45,
  },
  {
    slug: "shokuhi-jippi",
    citySlug: "kobe",
    title: "神戸市の保育園の給食費・実費負担はいくら？",
    description: "神戸市の認可保育園で必要な給食費やその他の実費負担について、目安金額とともに解説します。",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=400&fit=crop",
    category: "お金・制度",
    categoryColor: "rose",
    content: `<h2>保育園の実費負担とは</h2>
<p>保育料とは別に、保育園では給食費やその他の実費が発生します。3〜5歳児クラスは保育料が無償化されていますが、給食費は自己負担です。</p>

<h2>給食費の目安</h2>
<table>
<tr><th>年齢</th><th>主食費</th><th>副食費</th></tr>
<tr><td>0〜2歳児</td><td colspan="2">保育料に含まれる</td></tr>
<tr><td>3〜5歳児</td><td>月額約1,000〜3,000円</td><td>月額約4,500円</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>副食費（おかず・おやつ代）は園によって金額が異なります。年収360万円未満相当の世帯や第3子以降は副食費が免除されます。</p>
</div>

<h2>その他の実費</h2>
<ul>
<li>教材費：月額数百円〜数千円</li>
<li>行事費（遠足など）：実費</li>
<li>布団リース代：園による</li>
<li>制服・帽子代：園による</li>
</ul>

<div class="info-box">
<p><strong>注意</strong></p>
<p>上記は一般的な目安です。正確な金額は各園にお問い合わせください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 35,
  },
  {
    slug: "hoikuryo-keisan",
    citySlug: "kobe",
    title: "神戸市の保育料の計算方法　所得別の目安表つき",
    description: "神戸市の保育料がどのように計算されるか、市民税所得割額に基づく階層区分と目安金額を解説します。",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop",
    category: "お金・制度",
    categoryColor: "rose",
    content: `<h2>保育料の計算の仕組み</h2>
<p>神戸市の保育料は、世帯の<strong>市民税所得割額</strong>（父母合算）に基づいて決定されます。所得が高いほど保育料も高くなる「応能負担」の仕組みです。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>3〜5歳児クラスは無償化により保育料は0円です。以下の保育料表は0〜2歳児クラスに適用されます。</p>
</div>

<h2>保育料の目安（0〜2歳児・保育標準時間）</h2>
<table>
<tr><th>市民税所得割額（世帯合算）</th><th>月額保育料の目安</th></tr>
<tr><td>非課税世帯</td><td>0円</td></tr>
<tr><td>〜約48,600円未満</td><td>約6,000〜12,000円</td></tr>
<tr><td>〜約97,000円未満</td><td>約15,000〜20,000円</td></tr>
<tr><td>〜約169,000円未満</td><td>約25,000〜35,000円</td></tr>
<tr><td>〜約301,000円未満</td><td>約40,000〜50,000円</td></tr>
<tr><td>301,000円以上</td><td>約55,000〜63,500円</td></tr>
</table>

<h2>多子世帯の軽減</h2>
<ul>
<li>同時在園の2人目：半額</li>
<li>同時在園の3人目以降：無料</li>
</ul>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>正確な保育料表は<a href="https://www.city.kobe.lg.jp/a65174/kosodate/shien/shinseido/riyomoshikomi/riyoshafutangaku.html" target="_blank" rel="noopener">神戸市「保育料について」</a>をご確認ください。上記はあくまで目安であり、正確な金額は年度により変動します。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 40,
  },
  {
    slug: "zeikin-koujo",
    citySlug: "kobe",
    title: "保育料と税金の関係　控除を活用して神戸市の保育料を下げる方法",
    description: "神戸市の保育料は市民税額で決まります。税控除を活用して保育料の階層を下げる方法を解説します。",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop",
    category: "お金・制度",
    categoryColor: "rose",
    content: `<h2>保育料と市民税の関係</h2>
<p>神戸市の保育料は「市民税所得割額」で決まります。税額が低くなれば保育料も下がる可能性があります。</p>

<h2>活用できる主な控除</h2>
<table>
<tr><th>控除の種類</th><th>効果</th></tr>
<tr><td>医療費控除</td><td>年間10万円超の医療費がある場合に申告可能</td></tr>
<tr><td>iDeCo（個人型確定拠出年金）</td><td>掛金が全額所得控除の対象</td></tr>
<tr><td>生命保険料控除</td><td>年末調整で控除されていない分があれば確定申告で追加</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>ふるさと納税は住民税を減らしますが、保育料の計算に使う「所得割額」はふるさと納税の控除前の金額が適用されることが一般的です。保育料を下げる目的ではiDeCoや医療費控除の方が効果的です。</p>
</div>

<h2>確定申告のタイミング</h2>
<p>保育料は毎年9月に切り替わります。4〜8月分は前年度の市民税額、9〜3月分は当年度の市民税額が基準です。</p>

<div class="info-box">
<p><strong>注意</strong></p>
<p>控除の適用可否や保育料への影響は個別の状況により異なります。詳しくは税務署やお住まいの区役所にご相談ください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 30,
  },
  {
    slug: "shurou-shoumeisho",
    citySlug: "kobe",
    title: "神戸市の就労証明書の書き方と注意点",
    description: "神戸市の保育園申込に必要な就労証明書の記入ポイント、よくある間違い、提出期限を解説します。",
    image: "https://images.unsplash.com/photo-1568667256549-094345857637?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>就労証明書とは</h2>
<p>就労証明書は、保護者の就労状況を証明する書類です。勤務先に作成を依頼し、保育園の入園申込書類として提出します。</p>

<h2>記入のポイント</h2>
<div class="step">
<div class="step-num">1</div>
<div class="step-content"><strong>神戸市指定の様式を使う</strong><p>神戸市公式サイトからダウンロードできる指定様式を使用してください。</p></div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content"><strong>復職後の勤務予定を正確に記入</strong><p>育休中の方は復職後の勤務日数・時間を記入してもらいます。この情報が基本点数に直結します。</p></div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content"><strong>代表者印または人事担当者印を押印</strong><p>証明者の押印が必要です。</p></div>
</div>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>就労証明書は申込日から遡って<strong>3か月以内</strong>に作成されたものが有効です。早めに依頼して期限切れにならないよう注意しましょう。</p>
</div>

<h2>よくある間違い</h2>
<ul>
<li>勤務時間が「所定労働時間」ではなく「残業込み」で記入されている</li>
<li>育休中の記載がない（育休開始日・復職予定日の記入漏れ）</li>
<li>証明日が古すぎる</li>
</ul>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>就労証明書の様式は<a href="https://www.city.kobe.lg.jp/a65174/kosodate/shien/shinseido/riyomoshikomi/shinsehoho.html" target="_blank" rel="noopener">神戸市公式サイト</a>からダウンロードできます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 45,
  },
  {
    slug: "shinsei-shorui-list",
    citySlug: "kobe",
    title: "神戸市の保育園申込に必要な書類チェックリスト",
    description: "神戸市の保育園入園申込に必要な書類をチェックリスト形式でまとめました。漏れなく準備しましょう。",
    image: "https://images.unsplash.com/photo-1568667256549-094345857637?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>全員必須の書類</h2>
<ul>
<li>教育・保育給付認定申請書兼利用申込書</li>
<li>保育を必要とする事由の証明書（就労証明書など）※父母それぞれ</li>
<li>マイナンバー確認書類</li>
<li>本人確認書類</li>
</ul>

<h2>該当者のみ必要な書類</h2>
<table>
<tr><th>該当する状況</th><th>追加書類</th></tr>
<tr><td>ひとり親世帯</td><td>児童扶養手当証書の写し等</td></tr>
<tr><td>自営業</td><td>開業届・確定申告書の写し</td></tr>
<tr><td>育休中</td><td>育休期間のわかる書類</td></tr>
<tr><td>障害のある方が同居</td><td>障害者手帳の写し</td></tr>
<tr><td>認可外利用中</td><td>在園証明書</td></tr>
<tr><td>転入予定</td><td>転入先の契約書の写し</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>書類に不備があると受付が遅れる場合があります。提出前に区役所窓口で確認してもらうのが安心です。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>書類の詳細は<a href="https://www.city.kobe.lg.jp/a65174/kosodate/shien/shinseido/riyomoshikomi/shinsehoho.html" target="_blank" rel="noopener">神戸市公式サイト</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 40,
  },
  {
    slug: "niji-shinsei-flow",
    citySlug: "kobe",
    title: "神戸市の保育園2次申込（2次選考）の流れと対策",
    description: "神戸市の保育園1次選考で不承諾になった場合の2次申込の流れ、追加でできる対策を解説します。",
    image: "https://images.unsplash.com/photo-1484820540004-14229fe36ca4?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>2次選考とは</h2>
<p>神戸市では1次選考で定員に達しなかった園について、2次選考が行われます。1次で不承諾となった方は自動的に2次の対象になります。</p>

<h2>2次選考の流れ</h2>
<div class="step">
<div class="step-num">1</div>
<div class="step-content"><strong>1次結果通知を受け取る</strong><p>1月下旬頃に結果が届きます。不承諾の場合、2次選考の案内が同封されます。</p></div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content"><strong>希望園の変更・追加</strong><p>2次で空きのある園を追加するなど、希望変更届を提出できます。</p></div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content"><strong>2次結果通知</strong><p>3月上旬頃に結果が届きます。</p></div>
</div>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>2次選考で追加できる園は、1次で空きが出た園のみです。通える範囲で幅広く希望を出すことが重要です。</p>
</div>

<h2>2次で入れなかった場合</h2>
<ul>
<li>途中入園（5月以降）の申込を継続する</li>
<li>認可外保育施設を検討する</li>
<li>育休延長を検討する</li>
</ul>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>2次選考の詳細は1次結果通知に同封される案内をご確認ください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 40,
  },
  {
    slug: "tenkyo-hokatsu",
    citySlug: "kobe",
    title: "神戸市への転居を伴う保活ガイド　市外からの申込方法",
    description: "他の自治体から神戸市へ転居予定の場合の保育園申込方法、必要書類を解説します。",
    image: "https://images.unsplash.com/photo-1516156008625-3a9d6067fab5?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>市外から神戸市への転入と保活</h2>
<p>神戸市への転入予定がある場合、転入前でも保育園の申込が可能です。</p>

<h2>申込の流れ</h2>
<div class="step">
<div class="step-num">1</div>
<div class="step-content"><strong>転入先の区役所に相談</strong><p>転入予定の区の区役所こども家庭係に電話で事前相談しましょう。</p></div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content"><strong>必要書類の準備</strong><p>通常の書類に加え、転入を証明する書類（賃貸契約書の写し等）が必要です。</p></div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content"><strong>申込書の提出</strong><p>郵送での提出が可能です。</p></div>
</div>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>入園月の前月末までに神戸市に住民票を移す必要があります。転入の時期が確定していることを証明する書類を準備しましょう。</p>
</div>

<h2>注意点</h2>
<ul>
<li>転入予定を証明できない場合、申込が受理されないことがあります</li>
<li>園見学は転入前でも可能です</li>
</ul>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>転入に伴う申込の詳細は転入予定の区役所にお問い合わせください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 30,
  },
  {
    slug: "kyoiku-hoiku-chigai",
    citySlug: "kobe",
    title: "神戸市の保育園と幼稚園の違い　どちらを選ぶべき？",
    description: "神戸市の保育園と幼稚園の違いを、利用時間・対象年齢・費用・教育内容の観点から比較します。",
    image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&h=400&fit=crop",
    category: "施設の種類",
    categoryColor: "purple",
    content: `<h2>保育園と幼稚園の基本的な違い</h2>
<table>
<tr><th>項目</th><th>保育園（認可）</th><th>幼稚園</th></tr>
<tr><td>管轄</td><td>こども家庭庁</td><td>文部科学省</td></tr>
<tr><td>対象年齢</td><td>0〜5歳</td><td>3〜5歳</td></tr>
<tr><td>利用時間</td><td>最大11時間</td><td>4〜5時間（預かり保育で延長可）</td></tr>
<tr><td>保護者の要件</td><td>就労等の保育の必要性が必要</td><td>不要</td></tr>
<tr><td>保育料（3〜5歳）</td><td>無料（無償化）</td><td>無料（無償化、上限あり）</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>共働きで長時間の預かりが必要な場合は保育園、教育内容を重視したい場合は幼稚園が一般的です。認定こども園なら両方の機能を備えています。</p>
</div>

<h2>幼稚園の預かり保育（新2号認定）</h2>
<p>保育の必要性がある家庭は、幼稚園の預かり保育を利用して実質的に保育園と同じ時間帯の預かりが可能です。月額11,300円まで無償化の対象です。</p>

<div class="info-box">
<p><strong>注意</strong></p>
<p>幼稚園の預かり保育の実施時間や料金は園によって異なります。事前に確認してください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 35,
  },
  {
    slug: "hokatsu-calendar",
    citySlug: "kobe",
    title: "神戸市の保活カレンダー　月別やることリスト",
    description: "神戸市で4月入園を目指す方のための月別保活カレンダー。いつ何をすべきかを一覧でまとめました。",
    image: "https://images.unsplash.com/photo-1506784365847-bbad939e9335?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>保活カレンダー（4月入園の場合）</h2>
<table>
<tr><th>時期</th><th>やること</th></tr>
<tr><td>4月</td><td>情報収集開始。前年度の「利用ガイド」を参考に保育園の種類やエリアを把握</td></tr>
<tr><td>5月</td><td>気になる園のリストアップ</td></tr>
<tr><td>6月</td><td>保育園見学の予約開始</td></tr>
<tr><td>7〜8月</td><td>保育園見学。複数園を比較検討</td></tr>
<tr><td>9月</td><td>申請書類の配布開始。就労証明書を勤務先に依頼</td></tr>
<tr><td>10月</td><td>書類の記入・確認</td></tr>
<tr><td>11月</td><td>申込提出（郵送・電子申請は11月末まで）</td></tr>
<tr><td>12〜1月</td><td>選考期間</td></tr>
<tr><td>1月下旬</td><td>1次結果通知</td></tr>
<tr><td>2〜3月</td><td>2次選考・入園準備</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>保育園見学は夏場（6〜8月）がベストシーズンです。秋以降は見学希望者が増えるため、予約が取りにくくなります。</p>
</div>

<div class="info-box">
<p><strong>注意</strong></p>
<p>上記は令和8年度4月入園を想定した目安です。年度によって日程が変わる場合がありますので、神戸市公式サイトで最新情報を確認してください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 45,
  },
  {
    slug: "souba-tensuu",
    citySlug: "kobe",
    title: "神戸市の保育園入園に必要な点数の相場と目安",
    description: "神戸市の保育園入園に実際に必要な点数の目安を、エリア・年齢別に解説します。",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>入園に必要な点数の目安</h2>
<p>神戸市の認可保育園に入園するために必要な点数は、エリアや年齢クラスによって異なります。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>共働きフルタイム（父母とも100点＝基本点200点）が入園の「最低ライン」になっている園が多い地域もあります。調整点数での加点がカギになります。</p>
</div>

<h2>エリア別の傾向</h2>
<table>
<tr><th>エリア</th><th>競争率の傾向</th></tr>
<tr><td>東灘区・灘区</td><td>高い。1歳児クラスは特に激戦</td></tr>
<tr><td>中央区</td><td>高い。マンション増加で需要増</td></tr>
<tr><td>兵庫区・長田区</td><td>比較的入りやすい園もある</td></tr>
<tr><td>須磨区・垂水区</td><td>エリアにより差が大きい</td></tr>
<tr><td>北区・西区</td><td>比較的入りやすい傾向</td></tr>
</table>

<div class="info-box">
<p><strong>注意</strong></p>
<p>上記はあくまで一般的な傾向です。年度や園によって大きく異なるため、最新の空き状況は区役所でご確認ください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 45,
  },
  {
    slug: "ku-betsu-bairitsu",
    citySlug: "kobe",
    title: "神戸市の区別・保育園入園倍率の傾向",
    description: "神戸市9区の保育園入園の競争率・待機児童の傾向をエリアごとに紹介します。",
    image: "https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=800&h=400&fit=crop",
    category: "エリア情報",
    categoryColor: "teal",
    content: `<h2>神戸市9区の入園傾向</h2>
<p>神戸市は9つの区から成り、エリアによって保育園の競争率に大きな差があります。</p>

<table>
<tr><th>区</th><th>傾向</th></tr>
<tr><td>東灘区</td><td>子育て世帯に人気。1歳児クラスは特に激戦</td></tr>
<tr><td>灘区</td><td>東灘区に次ぐ人気エリア</td></tr>
<tr><td>中央区</td><td>マンション開発で子育て世帯が増加中</td></tr>
<tr><td>兵庫区</td><td>比較的入りやすい園がある</td></tr>
<tr><td>北区</td><td>広いエリアで園の選択肢も多い</td></tr>
<tr><td>長田区</td><td>比較的入りやすい傾向</td></tr>
<tr><td>須磨区</td><td>ニュータウンエリアは競争率が高め</td></tr>
<tr><td>垂水区</td><td>駅周辺は競争率が高い</td></tr>
<tr><td>西区</td><td>新興住宅地は需要増だが園の数も多い</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>区をまたいだ申込も可能です。自宅から通える範囲で隣の区の園も検討すると、選択肢が広がります。</p>
</div>

<div class="info-box">
<p><strong>注意</strong></p>
<p>上記は一般的な傾向であり、年度や園によって状況は変わります。最新の情報は各区役所にお問い合わせください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 40,
  },
  {
    slug: "ikukyu-enchou-risk-detail",
    citySlug: "kobe",
    title: "神戸市で育休延長する場合のリスクと保活への影響",
    description: "神戸市で育児休業を延長する場合の保活への影響、不承諾通知の扱い、注意すべきポイントを解説します。",
    image: "https://images.unsplash.com/photo-1531983412531-1f49a365ffed?w=800&h=400&fit=crop",
    category: "育休・復職",
    categoryColor: "purple",
    content: `<h2>育休延長と不承諾通知</h2>
<p>育児休業給付金を受給しながら育休を延長するには、保育園に申し込んで「不承諾通知（保留通知）」を受け取る必要があります。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>2025年4月以降、育休延長目的での保育園申込について、ハローワークによる確認が厳格化されています。「入園意思がない申込」と判断された場合、給付金が支給されない可能性があります。</p>
</div>

<h2>育休延長のリスク</h2>
<ul>
<li>1歳児クラスは最も競争率が高く、延長後の入園がさらに難しくなる</li>
<li>2歳まで延長すると、2歳児クラスの枠は少ないため入園が厳しい場合がある</li>
<li>育休給付金の支給要件が満たされなくなるリスク</li>
</ul>

<h2>育休延長する場合の対策</h2>
<ul>
<li>1歳の4月入園で入園可能な園に入園する方が安全</li>
<li>認可外保育施設の利用も並行して検討する</li>
<li>復職時期と保育園の空き状況を定期的に確認する</li>
</ul>

<div class="info-box">
<p><strong>注意</strong></p>
<p>育休延長と保育園申込の関係は制度変更が多い分野です。最新の情報はハローワークおよび勤務先の人事部門にご確認ください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 40,
  },
  {
    slug: "fukushoku-junbi",
    citySlug: "kobe",
    title: "神戸市で保育園入園後の復職準備チェックリスト",
    description: "神戸市で保育園の内定が出てから復職までにやるべきことをチェックリスト形式で解説します。",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=400&fit=crop",
    category: "育休・復職",
    categoryColor: "purple",
    content: `<h2>入園内定〜復職までのチェックリスト</h2>
<div class="step">
<div class="step-num">1</div>
<div class="step-content"><strong>勤務先に復職日を連絡</strong><p>慣らし保育期間（1〜2週間）を考慮して復職日を調整します。</p></div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content"><strong>入園説明会に出席</strong><p>2〜3月に園で開催される説明会で持ち物や生活の流れを確認します。</p></div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content"><strong>入園準備品の購入</strong><p>布団カバー、お昼寝用品、着替え、おむつ、名前書きグッズなどを準備します。</p></div>
</div>
<div class="step">
<div class="step-num">4</div>
<div class="step-content"><strong>病児保育・ファミサポの登録</strong><p>子どもが体調を崩した時のバックアッププランを用意しておきましょう。</p></div>
</div>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>慣らし保育期間中は仕事を休む必要があります。有給休暇の残日数や勤務先との調整を早めに行いましょう。</p>
</div>

<div class="info-box">
<p><strong>注意</strong></p>
<p>入園準備品は園によって異なります。説明会で配られるリストに従って準備してください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 35,
  },
  {
    slug: "sannin-me-hokatsu",
    citySlug: "kobe",
    title: "神戸市で3人目の保活　多子世帯の優遇制度と戦略",
    description: "神戸市で3人目以降の子どもの保活をする際の加点制度、保育料軽減、申込のコツを解説します。",
    image: "https://images.unsplash.com/photo-1475503572774-15a45e5d60b9?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>3人目以降の優遇制度</h2>
<p>神戸市では多子世帯に対してさまざまな優遇制度があります。</p>

<h2>保育料の軽減</h2>
<table>
<tr><th>子ども</th><th>保育料</th></tr>
<tr><td>1人目</td><td>通常額</td></tr>
<tr><td>同時在園の2人目</td><td>半額</td></tr>
<tr><td>同時在園の3人目以降</td><td>無料</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>3〜5歳児は保育料が無償化されていますが、0〜2歳児の3人目以降は保育料が無料になります。副食費も第3子以降は免除される場合があります。</p>
</div>

<h2>3人目保活のコツ</h2>
<ul>
<li>上の子と同じ園を第一希望にしてきょうだい加点を最大化する</li>
<li>3人の送迎を考えて同じ園またはルート上の園を選ぶ</li>
</ul>

<div class="info-box">
<p><strong>注意</strong></p>
<p>多子世帯の軽減制度は年度によって変更される場合があります。最新情報は区役所でご確認ください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 30,
  },
  {
    slug: "tanshin-funin",
    citySlug: "kobe",
    title: "神戸市で単身赴任中の場合の保育園申込と点数への影響",
    description: "配偶者が単身赴任中の場合の神戸市での保育園申込方法、点数への影響を解説します。",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>単身赴任中の保育園申込</h2>
<p>配偶者が単身赴任で別居している場合でも、保育園の申込は可能です。</p>

<h2>点数への影響</h2>
<p>単身赴任の場合でも、別居している配偶者の就労証明書を提出する必要があります。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>単身赴任で配偶者が不在であっても、「ひとり親世帯」の加点（+30点）は適用されません。ひとり親の加点は離婚・死別等の場合に限られます。</p>
</div>

<h2>必要な追加書類</h2>
<ul>
<li>配偶者の就労証明書（赴任先の勤務先が発行）</li>
<li>単身赴任であることがわかる書類（辞令の写し等）</li>
</ul>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳しくはお住まいの区役所こども家庭係にお問い合わせください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 25,
  },
  {
    slug: "sofu-sobo-doukyo",
    citySlug: "kobe",
    title: "神戸市で祖父母と同居している場合の保育園入園への影響",
    description: "祖父母と同居・近居している場合の神戸市の保育園入園選考への影響と対策を解説します。",
    image: "https://images.unsplash.com/photo-1475503572774-15a45e5d60b9?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>祖父母同居と保育の必要性</h2>
<p>神戸市では、祖父母と同居していることだけを理由に保育の必要性が否定されることはありません。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>ただし、同居の祖父母が65歳未満で無職の場合、調整点数で<strong>減点</strong>される可能性があります。事前に区役所に確認しましょう。</p>
</div>

<h2>同居祖父母がいる場合の対策</h2>
<ul>
<li>祖父母が就労している場合は就労証明書を提出して減点を回避できる場合があります</li>
<li>祖父母が病気・障害等で保育ができない場合はその証明書類を提出しましょう</li>
<li>65歳以上の祖父母の場合は減点対象外となることが一般的です</li>
</ul>

<h2>近居（別世帯）の場合</h2>
<p>祖父母が近所に住んでいても別世帯であれば入園選考に影響はありません。</p>

<div class="info-box">
<p><strong>注意</strong></p>
<p>同居祖父母に関する減点の有無や条件は年度によって変更される場合があります。最新の基準は区役所にお問い合わせください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 30,
  },
  {
    slug: "fushoninchi-taiou",
    citySlug: "kobe",
    title: "神戸市で保育園に落ちた（不承諾）場合の対応策まとめ",
    description: "神戸市の保育園1次選考で不承諾になった場合の次の一手を解説します。",
    image: "https://images.unsplash.com/photo-1494883759339-0b042055a4ee?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>不承諾（保留）になったら</h2>
<p>1次選考で不承諾となっても、まだ選択肢はあります。落ち着いて次のステップを確認しましょう。</p>

<h2>取れる対応策</h2>
<div class="step">
<div class="step-num">1</div>
<div class="step-content"><strong>2次選考に申し込む</strong><p>1次で不承諾の方は自動的に2次選考の対象になります。</p></div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content"><strong>認可外保育施設を探す</strong><p>企業主導型保育園など認可外の選択肢を検討しましょう。</p></div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content"><strong>育休延長を検討する</strong><p>不承諾通知があれば育休を延長できます。</p></div>
</div>
<div class="step">
<div class="step-num">4</div>
<div class="step-content"><strong>途中入園を待つ</strong><p>4月以降も毎月空きが出る可能性があります。</p></div>
</div>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>不承諾通知は大切に保管してください。育休延長の手続きや次年度以降の申込で必要になる場合があります。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>2次選考の詳細は不承諾通知に同封される案内をご確認ください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 45,
  },
  {
    slug: "taiki-jidou-taisaku",
    citySlug: "kobe",
    title: "神戸市の待機児童の現状と対策（2026年版）",
    description: "神戸市の待機児童数の推移、エリアごとの傾向、市が進めている対策について解説します。",
    image: "https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=800&h=400&fit=crop",
    category: "エリア情報",
    categoryColor: "teal",
    content: `<h2>神戸市の待機児童の推移</h2>
<p>神戸市は待機児童対策に力を入れており、待機児童数は年々減少傾向にあります。ただし「隠れ待機児童」（特定の園のみを希望して入れなかったケース等）を含めると、実質的に保育園に入れていない子どもはまだ一定数存在します。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>国の定義による「待機児童」は減っていますが、希望する園に入れない「保留児童」は依然として存在します。特に1歳児クラスと東灘区・灘区では入園が厳しい傾向が続いています。</p>
</div>

<h2>市の対策</h2>
<ul>
<li>保育施設の新設・定員増</li>
<li>保育士確保のための処遇改善・家賃補助</li>
<li>小規模保育事業の拡充</li>
<li>認定こども園への移行促進</li>
</ul>

<h2>保護者側の対策</h2>
<ul>
<li>希望園を10園以上記入する</li>
<li>隣接区の園も検討する</li>
<li>0歳4月入園を検討する</li>
<li>認可外保育施設も並行して検討する</li>
</ul>

<div class="info-box">
<p><strong>注意</strong></p>
<p>待機児童数は毎年4月1日時点で集計されます。最新のデータは神戸市こども家庭局の公式サイトでご確認ください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 40,
  },
  {
    slug: "tennen-moshikomi",
    citySlug: "kobe",
    title: "神戸市の保育園への転園申込の方法と注意点",
    description: "すでに認可保育園に通っていて別の園への転園を希望する場合の手続きと注意点を解説します。",
    image: "https://images.unsplash.com/photo-1516156008625-3a9d6067fab5?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>転園申込とは</h2>
<p>引っ越しや家庭の事情で、現在通っている保育園から別の園に移りたい場合に行う手続きです。</p>

<h2>転園申込の流れ</h2>
<div class="step">
<div class="step-num">1</div>
<div class="step-content"><strong>区役所に相談</strong><p>転園希望の旨をお住まいの区役所こども家庭係に伝えます。</p></div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content"><strong>利用申込書の提出</strong><p>新規入園と同じ申込書類を提出します。</p></div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content"><strong>利用調整（選考）</strong><p>新規申込者と同じ基準で選考されます。</p></div>
</div>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>転園が決まらなかった場合でも、現在の園にそのまま通い続けることができます。転園申込をしたからといって今の園を退園させられることはありません。</p>
</div>

<h2>注意点</h2>
<ul>
<li>転園は新規入園と同じ選考基準で行われるため、確実に移れる保証はありません</li>
<li>4月の入園申込に合わせて転園申込するのが枠が出やすいタイミングです</li>
<li>転園に伴い慣らし保育が再度必要になる場合があります</li>
</ul>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>転園の手続きについてはお住まいの区役所こども家庭係にお問い合わせください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 30,
  },
];

registerArticles(articles);
