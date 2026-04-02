import type { Article } from "./types";
import { registerArticles } from "./index";

const articles: Article[] = [
  // ========== 保活の基本 (5) ==========
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
  {
    slug: "hokatsu-first-steps",
    citySlug: "kobe",
    title: "神戸市で初めての保活　何から始める？基本ステップ解説",
    description:
      "保活とは何か、神戸市ではどのような手順で進めればよいのかを、初心者向けにわかりやすく解説します。",
    image:
      "https://images.unsplash.com/photo-1587654780291-39c9404d7dd0?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>保活とは？</h2>
<p>「保活」とは、子どもを保育園に入れるための活動全般を指します。神戸市では認可保育所、認定こども園（2・3号認定）、小規模保育事業所などが対象になります。</p>

<h2>まずやるべき3つのこと</h2>

<h3>1. 自分の「保育の必要性」を確認する</h3>
<p>神戸市で認可保育施設を利用するには「教育・保育給付認定（2号または3号認定）」が必要です。就労・妊娠出産・疾病・介護などの事由があれば申請できます。</p>

<h3>2. 利用調整のしくみを理解する</h3>
<p>神戸市の認可保育施設は先着順ではなく、<strong>基本点数＋調整点数</strong>の合計が高い順に利用調整（選考）されます。自分の世帯が何点になるのかを把握することが大切です。</p>

<h3>3. 希望する園をリストアップする</h3>
<p>通勤経路やお迎え時間を考慮し、候補を絞りましょう。神戸市の公式サイトには<a href="https://www.city.kobe.lg.jp/z/kodomokatekyoku/shienbu/shisetsuichiran.html" target="_blank" rel="noopener">教育・保育施設一覧</a>が掲載されています。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>神戸市では申込時に複数園を希望順に記載できます。希望園数に制限はないので、通える範囲の園はできるだけ多く書くのがおすすめです。</p>
</div>

<h2>申込に必要な主な書類</h2>
<ul>
<li>教育・保育給付認定申請書兼利用申込書</li>
<li>保育の必要性を確認するための書類（就労証明書など）</li>
<li>マイナンバーの確認書類</li>
</ul>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>必要書類の詳細は<a href="https://www.city.kobe.lg.jp/a65174/kosodate/shien/shinseido/shorui/shinse.html" target="_blank" rel="noopener">神戸市公式サイト「申請書類」</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-03-28",
  },
  {
    slug: "hokatsu-mistakes",
    citySlug: "kobe",
    title: "神戸市の保活でよくある失敗5選とその対策",
    description:
      "初めての保活でやりがちな失敗パターンと、神戸市ならではの注意点をまとめました。",
    image:
      "https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>失敗1：点数を正しく把握していない</h2>
<p>神戸市の利用調整は「基本点数＋調整点数」の合計で行われます。フルタイム共働きなら父100点＋母100点＝基本200点が出発点ですが、調整点数のプラス・マイナスで順位が大きく変わります。</p>
<div class="warn-box">
<p><strong>注意</strong></p>
<p>特に「育休延長許容」の<span class="highlight">-90点</span>は見落としがちです。申込書の記入内容を必ず確認しましょう。</p>
</div>

<h2>失敗2：希望園を少なく書く</h2>
<p>「この園だけがいい」と1〜2園しか書かないと、保留になるリスクが高まります。通える範囲の園はできるだけ多く記入しましょう。</p>

<h2>失敗3：書類不備で受理されない</h2>
<p>就労証明書の記入漏れや、勤務先の押印忘れなどで書類が不備扱いになるケースがあります。提出前に必ずチェックリストで確認を。</p>

<h2>失敗4：申込締切を過ぎてしまう</h2>
<p>郵送受付は<strong>必着</strong>です。消印有効ではありませんので、余裕をもって投函してください。電子申請も締切時刻を過ぎると受付できません。</p>

<h2>失敗5：見学をしないまま申込む</h2>
<p>見学をせずに園を選ぶと、入園後に「思っていたのと違う」と後悔することがあります。神戸市は公式サイトで<a href="https://www.city.kobe.lg.jp/a65174/kosodate/shien/shinseido/riyomoshikomi/kengaku.html" target="_blank" rel="noopener">園見学のポイント</a>を公開しています。入園前に必ず見学しましょう。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>保活は情報戦です。神戸市の公式「教育・保育施設利用ガイド」に目を通すだけでも失敗を大幅に減らせます。</p>
</div>`,
    publishedAt: "2026-03-28",
  },
  {
    slug: "documents-guide",
    citySlug: "kobe",
    title: "神戸市の保育園申込に必要な書類一覧と注意点",
    description:
      "神戸市の認可保育施設の申込に必要な書類を一覧で紹介。就労証明書の書き方のポイントも解説します。",
    image:
      "https://images.unsplash.com/photo-1568667256549-094345857637?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>全員が必要な書類</h2>
<table>
<tr><th>書類名</th><th>備考</th></tr>
<tr><td>教育・保育給付認定申請書兼利用申込書</td><td>区役所で配布またはダウンロード</td></tr>
<tr><td>マイナンバー確認書類</td><td>通知カードまたはマイナンバーカードの写し</td></tr>
</table>

<h2>保育を必要とする事由ごとの書類</h2>
<table>
<tr><th>事由</th><th>必要書類</th></tr>
<tr><td>就労</td><td>就労証明書（勤務先が記入・押印）</td></tr>
<tr><td>妊娠・出産</td><td>母子健康手帳の写し</td></tr>
<tr><td>疾病・障害</td><td>診断書または障害者手帳の写し</td></tr>
<tr><td>介護・看護</td><td>介護・看護状況申告書、対象者の診断書等</td></tr>
<tr><td>求職活動</td><td>求職活動状況申告書</td></tr>
</table>

<h3>就労証明書のポイント</h3>
<ul>
<li>勤務日数・勤務時間は実態を正確に記入してもらう</li>
<li>記入者は人事・総務部門の担当者で、勤務先の印が必要</li>
<li>自営業の場合は開業届の写しや確定申告書の写しを添付</li>
</ul>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>書類に不備があると受理されず、選考の対象外になる場合があります。提出前に区役所の窓口に持参し、事前に確認してもらうと安心です。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>書類の様式は<a href="https://www.city.kobe.lg.jp/a65174/kosodate/shien/shinseido/shorui/youshiki.html" target="_blank" rel="noopener">神戸市公式サイト「保育の必要な状況を確認するための書類」</a>からダウンロードできます。</p>
</div>`,
    publishedAt: "2026-03-28",
  },
  {
    slug: "tochuu-nyuen",
    citySlug: "kobe",
    title: "神戸市の途中入園（5月〜3月）の申込方法と注意点",
    description:
      "4月以外の途中入園の申込方法・締切・選考の流れを解説。年度途中での保育園入園を目指す方向けのガイドです。",
    image:
      "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>途中入園とは</h2>
<p>4月以外の月（5月〜翌年3月）に保育園に入園することを「途中入園」と言います。育休復帰の時期が4月以外の場合などに利用します。</p>

<h2>申込方法</h2>
<p>神戸市では途中入園の申込も、各区役所・支所の保健福祉課こども福祉担当、または電子申請（e-KOBE）で受け付けています。</p>

<h3>申込の流れ</h3>
<div class="step">
<div class="step-num">1</div>
<div class="step-content"><strong>希望月の前月上旬までに申込</strong><p>具体的な締切日は市の公式サイトや区役所で確認してください。</p></div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content"><strong>利用調整（選考）</strong><p>4月入園と同じく基本点数＋調整点数で選考されます。</p></div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content"><strong>結果通知</strong><p>入園希望月の前月中旬頃に結果が発送されます。</p></div>
</div>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>途中入園は空きがある園のみが対象です。4月入園と比べて受入枠が少ないため、競争率が高くなる傾向があります。</p>
</div>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>年度途中の入園申込と4月入園の申込は別々の手続きです。両方を希望する場合は2回申請する必要があります。</p>
</div>

<p>空き状況は神戸市公式サイトの<a href="https://www.city.kobe.lg.jp/a65174/kosodate/yochien/moshikomijokyo.html" target="_blank" rel="noopener">「教育・保育施設の申込状況」</a>で確認できます。</p>`,
    publishedAt: "2026-03-28",
  },

  // ========== 点数・選考 (5) ==========
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
    slug: "hitorioya-scoring",
    citySlug: "kobe",
    title: "ひとり親世帯の入園選考　神戸市での加点と手続き",
    description:
      "神戸市でのひとり親世帯の保育園入園選考における加点のしくみ、必要書類、申込時の注意点をまとめました。",
    image:
      "https://images.unsplash.com/photo-1531983412531-1f49a365ffed?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>ひとり親世帯の点数はどうなる？</h2>
<p>神戸市の利用調整では、ひとり親世帯は以下のように点数が計算されます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>片方の親の基本点数（最大100点）＋ もう片方の不在分100点 ＋ 調整点数（ひとり親加点+30）</p>
<p>フルタイム就労の場合：100 + 100 + 30 = <span class="highlight">230点</span></p>
</div>

<p>両親がそろっているフルタイム共働き世帯の基本200点と比べると、30点の上乗せがあります。これは神戸市がひとり親世帯の保育ニーズを優先的に考慮しているためです。</p>

<h2>必要書類</h2>
<p>ひとり親であることを証明するため、以下のいずれかの書類が必要です。</p>
<ul>
<li>児童扶養手当証書の写し</li>
<li>戸籍謄本（離婚の記載があるもの）</li>
<li>ひとり親家庭等医療費受給者証の写し</li>
</ul>

<h2>申込時の注意点</h2>
<p>調整点数の加点は自動的に適用されるわけではなく、<strong>証明書類を提出して初めて反映</strong>されます。書類の提出を忘れると加点が付かないまま選考される可能性があるため注意してください。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>ひとり親家庭向けの支援制度は<a href="https://www.city.kobe.lg.jp/a65174/kosodate/shien/shinseido/riyomoshikomi/shinsehoho.html" target="_blank" rel="noopener">神戸市公式サイト</a>でご確認ください。</p>
</div>`,
    publishedAt: "2026-03-28",
  },
  {
    slug: "kyoudai-katen",
    citySlug: "kobe",
    title: "きょうだい加点を最大限に活かす　神戸市の申込戦略",
    description:
      "神戸市のきょうだい加点（+15/+8/+5）のしくみと、加点を最大限に活かすための希望園の書き方を解説します。",
    image:
      "https://images.unsplash.com/photo-1491013516836-7db643ee125a?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>神戸市のきょうだい加点は3種類</h2>
<table>
<tr><th>条件</th><th>加点</th></tr>
<tr><td>きょうだいが在園中の園を第一希望に記入</td><td>+15</td></tr>
<tr><td>きょうだいが認可施設に在園中</td><td>+8</td></tr>
<tr><td>きょうだい同時申込</td><td>+5</td></tr>
</table>

<h2>加点の組み合わせ</h2>
<p>上の子が認可保育園Aに在園していて、下の子の第一希望を園Aにした場合：</p>
<div class="point-box">
<p><strong>ポイント</strong></p>
<p>きょうだい在園 +8 ＋ 第一希望一致 +15 ＝ <span class="highlight">合計+23</span></p>
</div>
<p>フルタイム共働きの基本200点に+23で<span class="highlight">223点</span>。これはかなり有利な点数です。</p>

<h2>第一希望の書き方がカギ</h2>
<p>きょうだいが在園中の園を第一希望に書くと+15の大きな加点がつきます。仮に別の園を第一希望にすると、この+15は得られません。</p>

<h3>どちらが有利？</h3>
<ul>
<li><strong>パターンA</strong>：きょうだい在園園を第一希望 → +23加点</li>
<li><strong>パターンB</strong>：別の園を第一希望 → +8加点のみ</li>
</ul>
<p>15点の差は非常に大きいため、特別な理由がなければ上の子と同じ園を第一希望にするのが基本戦略です。</p>

<h2>同時申込の場合</h2>
<p>双子やきょうだいを同時に申し込む場合は+5点が加算されます。ただし、きょうだい在園の+8とは条件が異なりますので、混同しないように注意しましょう。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>最新の調整点数は<a href="https://www.city.kobe.lg.jp/documents/57502/2024_riyoutyouseikijun.pdf" target="_blank" rel="noopener">神戸市の利用調整基準（PDF）</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-03-28",
  },

  // ========== お金 (4) ==========
  {
    slug: "hoikuryo-guide",
    citySlug: "kobe",
    title: "神戸市の保育料はいくら？世帯年収別の目安と計算方法",
    description:
      "神戸市の認可保育園の保育料（利用者負担額）の決まり方を解説。世帯年収別の目安や、きょうだい減額についてもまとめました。",
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop",
    category: "お金",
    categoryColor: "amber",
    content: `<h2>保育料の決まり方</h2>
<p>神戸市の認可保育施設の保育料は、世帯の<strong>市町村民税額</strong>をもとに決定されます。父母（及び家計の主宰者）の市町村民税額を合算し、市が定める階層区分表に照らして保育料が決まります。</p>

<h2>3歳〜5歳児は無償化</h2>
<p>幼児教育・保育の無償化により、<span class="highlight">3歳〜5歳児クラス</span>の保育料は無料です。ただし、給食の副食費（おかず・おやつ代）として月額4,500円程度が別途かかります。主食費は園により異なります。</p>

<h2>0歳〜2歳児の保育料</h2>
<p>0歳〜2歳児クラスは所得に応じた保育料がかかります（住民税非課税世帯は無料）。給食費は保育料に含まれています。</p>

<h3>保育料の目安</h3>
<table>
<tr><th>世帯年収の目安</th><th>月額保育料の目安（0〜2歳）</th></tr>
<tr><td>〜300万円</td><td>0〜15,000円程度</td></tr>
<tr><td>300〜500万円</td><td>15,000〜30,000円程度</td></tr>
<tr><td>500〜700万円</td><td>30,000〜45,000円程度</td></tr>
<tr><td>700万円〜</td><td>45,000〜60,000円程度</td></tr>
</table>
<p>※上記はあくまで目安です。正確な金額は市町村民税額に基づきます。</p>

<h2>きょうだい減額</h2>
<p>神戸市では、同一世帯のきょうだいのうち、最年長の子どもから順に<span class="highlight">2人目は半額</span>、<span class="highlight">3人目以降は無料</span>です。年齢や保育施設の利用の有無を問いません。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>保育料の詳細は<a href="https://www.city.kobe.lg.jp/a65174/kosodate/shien/shinseido/riyomoshikomi/riyoshafutangaku.html" target="_blank" rel="noopener">神戸市公式サイト「利用者負担額（保育料）」</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-03-28",
  },
  {
    slug: "mushouka-guide",
    citySlug: "kobe",
    title: "幼児教育・保育の無償化　神戸市で対象になる範囲と注意点",
    description:
      "神戸市で保育の無償化の対象となる施設・年齢・条件と、無償化でも自己負担が発生するケースを解説します。",
    image:
      "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800&h=400&fit=crop",
    category: "お金",
    categoryColor: "amber",
    content: `<h2>無償化の対象</h2>
<table>
<tr><th>年齢</th><th>対象施設</th><th>無償化の内容</th></tr>
<tr><td>3〜5歳児</td><td>認可保育所・認定こども園・幼稚園等</td><td>保育料が無料</td></tr>
<tr><td>0〜2歳児</td><td>認可保育所・認定こども園等</td><td>住民税非課税世帯のみ無料</td></tr>
</table>

<h2>無償化でもかかる費用</h2>
<p>保育料が無料になっても、以下の費用は自己負担です。</p>
<ul>
<li><strong>副食費（おかず・おやつ代）</strong>：3〜5歳児クラスで月額4,500円程度</li>
<li><strong>主食費（ごはん・パン代）</strong>：園により異なる</li>
<li><strong>延長保育料</strong>：利用した場合</li>
<li><strong>行事費・教材費</strong>：園により異なる</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>年収360万円未満相当の世帯と、第3子以降の児童は副食費も免除されます。</p>
</div>

<h2>認可外保育施設の場合</h2>
<p>認可外保育施設を利用している場合も、保育の必要性の認定（施設等利用給付認定）を受ければ、月額<span class="highlight">37,000円</span>（3〜5歳児）または<span class="highlight">42,000円</span>（0〜2歳児・住民税非課税世帯）を上限に無償化の対象になります。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>無償化の詳細は<a href="https://www.city.kobe.lg.jp/z/kodomokatekyoku/kosodateshien/mushouka.html" target="_blank" rel="noopener">神戸市公式サイト「認定区分・利用者負担額」</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-03-28",
  },
  {
    slug: "kyoudai-discount",
    citySlug: "kobe",
    title: "神戸市のきょうだい減額制度　2人目半額・3人目無料の条件",
    description:
      "神戸市の保育料きょうだい減額制度の詳しい条件と、他の自治体との違いをわかりやすく解説します。",
    image:
      "https://images.unsplash.com/photo-1471286174890-9c112ffca5b4?w=800&h=400&fit=crop",
    category: "お金",
    categoryColor: "amber",
    content: `<h2>神戸市のきょうだい減額とは</h2>
<p>神戸市では、同一世帯に属し生計を一にするきょうだいがいる場合、保育料が軽減されます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>最年長の子から数えて、<span class="highlight">2人目は保育料半額</span>、<span class="highlight">3人目以降は保育料無料</span>です。</p>
</div>

<h2>神戸市の制度の特徴</h2>
<p>国の制度では、きょうだいのカウントに年齢制限（小学校就学前まで）がありますが、神戸市では<strong>年齢制限なし</strong>で、同一世帯の子どもを全員カウントします。</p>

<h3>具体例</h3>
<table>
<tr><th>家族構成</th><th>保育料</th></tr>
<tr><td>第1子（小学生）＋第2子（3歳児クラス）</td><td>第2子は無償化で保育料0円</td></tr>
<tr><td>第1子（小学生）＋第2子（1歳児クラス）</td><td>第2子は所定保育料の半額</td></tr>
<tr><td>第1子（小学生）＋第2子（小学生）＋第3子（0歳児クラス）</td><td>第3子は保育料無料</td></tr>
</table>

<h2>手続きは必要？</h2>
<p>きょうだい減額は基本的に自動適用されますが、別居のきょうだいなど特殊なケースでは申告が必要な場合があります。保育料の決定通知が届いたら、金額が正しいか確認しましょう。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>保育料の詳細は<a href="https://www.city.kobe.lg.jp/a65174/kosodate/shien/shinseido/riyomoshikomi/riyoshafutangaku.html" target="_blank" rel="noopener">神戸市公式サイト「利用者負担額（保育料）」</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-03-28",
  },
  {
    slug: "hoikuryo-saving",
    citySlug: "kobe",
    title: "神戸市の保育料を抑えるために知っておきたい4つのポイント",
    description:
      "合法的に保育料の負担を軽減できる制度や工夫を、神戸市の制度に沿って解説します。",
    image:
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=400&fit=crop",
    category: "お金",
    categoryColor: "amber",
    content: `<h2>1. きょうだい減額を活用する</h2>
<p>神戸市では年齢に関係なく、同一世帯のきょうだいのうち2人目は半額、3人目以降は無料になります。上の子が小学生以上でもカウントされるのがポイントです。</p>

<h2>2. iDeCoやふるさと納税で住民税を下げる</h2>
<p>保育料は市町村民税額で決まります。iDeCo（個人型確定拠出年金）の掛金は全額所得控除の対象になるため、結果として住民税が下がり、保育料の階層区分が変わる可能性があります。</p>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>ふるさと納税の税額控除は住民税の「調整控除後の所得割額」に影響しないため、保育料には影響しない場合があります。自治体によって取り扱いが異なるため、区役所に確認してください。</p>
</div>

<h2>3. 入園時期を検討する</h2>
<p>保育料は4〜8月分は前年度の市町村民税額、9〜3月分は当年度の市町村民税額で決定されます。育休中で収入が低かった年の税額が適用される時期に入園すると、保育料が低くなることがあります。</p>

<h2>4. 副食費の免除を確認する</h2>
<p>3〜5歳児クラスの副食費は通常自己負担ですが、年収360万円未満相当の世帯や第3子以降の児童は免除されます。該当しないか確認しましょう。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>保育料の軽減は合法的な範囲で可能です。不明点は各区役所の保健福祉課に相談してください。</p>
</div>`,
    publishedAt: "2026-03-28",
  },

  // ========== 保育園選び (4) ==========
  {
    slug: "hoikuen-types",
    citySlug: "kobe",
    title: "認可保育所・認定こども園・小規模保育　神戸市の施設の違い",
    description:
      "神戸市で利用できる保育施設の種類と特徴を比較。認可保育所、認定こども園、小規模保育事業所の違いを解説します。",
    image:
      "https://images.unsplash.com/photo-1567057419565-4349c49d8a04?w=800&h=400&fit=crop",
    category: "保育園選び",
    categoryColor: "teal",
    content: `<h2>神戸市の主な保育施設</h2>

<h3>認可保育所</h3>
<p>0歳〜5歳児を対象とした、児童福祉法に基づく認可施設です。保育を必要とする子どもが対象で、保育時間は原則11時間（標準時間認定）または8時間（短時間認定）です。</p>

<h3>認定こども園</h3>
<p>幼稚園と保育所の機能を併せ持つ施設です。1号認定（教育利用）と2号・3号認定（保育利用）の両方を受け入れます。保育利用の場合は認可保育所と同様の利用調整が行われます。</p>

<h3>小規模保育事業所</h3>
<p>定員6〜19人の少人数制の保育施設で、<span class="highlight">0〜2歳児</span>が対象です。家庭的な雰囲気が特徴ですが、3歳以降は連携施設や他の園への転園が必要になります。</p>

<h2>比較表</h2>
<table>
<tr><th>種類</th><th>対象年齢</th><th>定員規模</th><th>選考方法</th></tr>
<tr><td>認可保育所</td><td>0〜5歳</td><td>60〜150名程度</td><td>利用調整（点数制）</td></tr>
<tr><td>認定こども園</td><td>0〜5歳</td><td>園による</td><td>利用調整（点数制）</td></tr>
<tr><td>小規模保育</td><td>0〜2歳</td><td>6〜19名</td><td>利用調整（点数制）</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>小規模保育は定員が少ないため競争率が低い場合があります。0〜2歳児の入園先として検討する価値があります。3歳以降の転園先も見据えて選びましょう。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>施設一覧は<a href="https://www.city.kobe.lg.jp/z/kodomokatekyoku/shienbu/shisetsuichiran.html" target="_blank" rel="noopener">神戸市公式サイト「教育・保育施設一覧」</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-03-28",
  },
  {
    slug: "kengaku-guide",
    citySlug: "kobe",
    title: "神戸市の保育園見学ガイド　予約方法・チェックポイント",
    description:
      "神戸市で保育園見学をする際の予約の流れ、見学時に確認すべきポイント、質問リストをまとめました。",
    image:
      "https://images.unsplash.com/photo-1540479859555-17af45c78602?w=800&h=400&fit=crop",
    category: "保育園選び",
    categoryColor: "teal",
    content: `<h2>見学の予約方法</h2>
<p>保育園の見学は、保護者が直接園に電話して予約するのが基本です。見学は6月〜9月頃が予約を取りやすい時期です。10月以降は申込直前で混み合うことがあります。</p>

<h2>見学時のチェックポイント</h2>
<p>神戸市は公式サイトで「園見学のポイント」を公開しています。以下の点をチェックしましょう。</p>

<h3>環境面</h3>
<ul>
<li>園庭の広さ、遊具の安全性</li>
<li>室内の清潔さ、採光・換気</li>
<li>セキュリティ（門の施錠、防犯カメラ）</li>
</ul>

<h3>保育内容</h3>
<ul>
<li>保育士の子どもへの接し方</li>
<li>年齢ごとのクラス編成と保育士の人数</li>
<li>給食の内容（アレルギー対応）</li>
</ul>

<h3>生活面</h3>
<ul>
<li>登降園時間と延長保育の対応</li>
<li>持ち物の量（おむつ、着替え、布団など）</li>
<li>慣らし保育の期間</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>見学は1園30分〜1時間程度です。質問事項はメモにまとめて持参すると効率的に回れます。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>神戸市の園見学ガイドは<a href="https://www.city.kobe.lg.jp/a65174/kosodate/shien/shinseido/riyomoshikomi/kengaku.html" target="_blank" rel="noopener">神戸市公式サイト「園見学のポイント」</a>をご覧ください。</p>
</div>`,
    publishedAt: "2026-03-28",
  },
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
  {
    slug: "kibouran-kakikata",
    citySlug: "kobe",
    title: "神戸市の希望園リストの書き方　戦略的な順番の決め方",
    description:
      "申込書の希望園の順番をどう書くべきか？きょうだい加点や倍率を考慮した戦略的な書き方を解説します。",
    image:
      "https://images.unsplash.com/photo-1517842645767-c639042777db?w=800&h=400&fit=crop",
    category: "保育園選び",
    categoryColor: "teal",
    content: `<h2>希望園は多く書くのが基本</h2>
<p>神戸市の申込では、希望園を順番に記入します。希望園数に上限はないため、通える範囲の園はできるだけ多く書きましょう。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>第一希望から順に選考され、希望順位が高い園から優先して利用調整されます。本当に行きたい園を上位に書いてください。</p>
</div>

<h2>きょうだい在園園を第一希望にする</h2>
<p>上の子が認可施設に在園中の場合、その園を第一希望に書くと<span class="highlight">+15点</span>の加点があります。これは非常に大きいため、特別な理由がなければ在園園を第一にするのが定石です。</p>

<h2>倍率を考慮した順番の決め方</h2>
<div class="step">
<div class="step-num">1</div>
<div class="step-content"><strong>きょうだい在園園を第一希望に</strong><p>+15の加点で大幅に有利になります。</p></div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content"><strong>本命の園を上位に</strong><p>通園の利便性や園の方針を考慮して順番を決めます。</p></div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content"><strong>小規模保育も候補に</strong><p>0〜2歳児の場合、小規模保育事業所は比較的競争率が低い傾向があります。</p></div>
</div>
<div class="step">
<div class="step-num">4</div>
<div class="step-content"><strong>少し遠い園も下位に書く</strong><p>保留になるよりは、やや遠い園でも入園できた方がよい場合が多いです。</p></div>
</div>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>入りたくない園は書かないでください。内定した場合、正当な理由なく辞退すると次回選考で不利になる場合があります。</p>
</div>`,
    publishedAt: "2026-03-28",
  },

  // ========== 認可外 (3) ==========
  {
    slug: "ninkagai-guide",
    citySlug: "kobe",
    title: "神戸市の認可外保育施設ガイド　選び方と利用のメリット",
    description:
      "神戸市の認可外保育施設の種類、選び方のポイント、認可園との違い、保活における活用方法を解説します。",
    image:
      "https://images.unsplash.com/photo-1559734840-f9509ee5677f?w=800&h=400&fit=crop",
    category: "認可外",
    categoryColor: "rose",
    content: `<h2>認可外保育施設とは</h2>
<p>認可外保育施設は、都道府県（神戸市の場合は市）に届出を行い運営される保育施設です。認可保育所のような定員・面積基準とは異なる基準で運営されていますが、神戸市の指導監査を受けています。</p>

<h2>神戸市の認可外保育施設の種類</h2>
<ul>
<li><strong>認可外保育施設</strong>：一般的な認可外の保育所</li>
<li><strong>企業主導型保育事業</strong>：企業が従業員向けに設置（地域枠あり）</li>
<li><strong>事業所内保育施設</strong>：企業の事業所内に設置</li>
</ul>

<h2>選び方のポイント</h2>
<ul>
<li>神戸市への届出がされているか確認する</li>
<li>指導監査基準を満たす旨の証明書が交付されているか</li>
<li>見学して保育の様子を自分の目で確認する</li>
<li>料金体系（入園料・月額・延長料金）を事前に把握する</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>認可外施設の利用実績があると、認可園の利用調整で<span class="highlight">+5点</span>の調整加点がつきます。認可園の保留対策として認可外に預けながら次年度の申込をする方法は、保活の有効な戦略です。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>認可外施設の概要は<a href="https://www.city.kobe.lg.jp/a65174/kosodate/yochien/hoikujo/nursery/ninkagai/sisetu.html" target="_blank" rel="noopener">神戸市公式サイト「認可外保育施設の概要」</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-03-28",
  },
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
  {
    slug: "ninkagai-mushouka",
    citySlug: "kobe",
    title: "認可外保育施設でも無償化が使える？神戸市の条件と手続き",
    description:
      "神戸市で認可外保育施設を利用する場合の無償化（施設等利用給付）の対象条件・上限額・申請方法を解説します。",
    image:
      "https://images.unsplash.com/photo-1579621970795-87facc2f976d?w=800&h=400&fit=crop",
    category: "認可外",
    categoryColor: "rose",
    content: `<h2>認可外保育施設でも無償化の対象に</h2>
<p>認可外保育施設であっても、「施設等利用給付認定」を受ければ、保育料の一部が無償化の対象になります。ただし全額無償ではなく、上限額までの補助です。</p>

<h2>対象になる条件</h2>
<ul>
<li>保育の必要性の認定（施設等利用給付認定2号または3号）を受けていること</li>
<li>認可保育施設を利用していないこと</li>
<li>利用する施設が神戸市に届出をしている認可外保育施設であること</li>
</ul>

<h2>無償化の上限額</h2>
<table>
<tr><th>年齢</th><th>月額上限</th></tr>
<tr><td>3〜5歳児</td><td><span class="highlight">37,000円</span></td></tr>
<tr><td>0〜2歳児（住民税非課税世帯）</td><td><span class="highlight">42,000円</span></td></tr>
</table>
<p>上限額を超える分は自己負担となります。</p>

<h2>申請方法</h2>
<p>施設等利用給付認定の申請は、お住まいの区役所・支所の保健福祉課で行います。認定を受けた後、利用料の請求（償還払い）の手続きが別途必要です。</p>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>0〜2歳児で住民税課税世帯の場合、認可外保育施設の利用料は無償化の対象外です。認可園に入園できない場合の費用負担は大きくなるため、家計への影響をあらかじめ試算しておきましょう。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>施設等利用給付費の請求方法は<a href="https://www.city.kobe.lg.jp/a36812/kosodate/shien/shinseido/musyoka.html" target="_blank" rel="noopener">神戸市公式サイト「施設等利用給付費の請求」</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-03-28",
  },

  // ========== 育休・復職 (4) ==========
  {
    slug: "ikukyu-fukushoku-schedule",
    citySlug: "kobe",
    title: "育休からの復職スケジュール　神戸市で4月入園する場合",
    description:
      "神戸市で育休から4月に復職する場合のスケジュールと、復職期限、慣らし保育期間の考え方を解説します。",
    image:
      "https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=800&h=400&fit=crop",
    category: "育休・復職",
    categoryColor: "purple",
    content: `<h2>4月入園→復職のスケジュール</h2>
<p>神戸市で4月入園が内定した場合、入園後に慣らし保育を経て復職するのが一般的な流れです。</p>

<div class="step">
<div class="step-num">1</div>
<div class="step-content"><strong>1月下旬〜2月：結果通知</strong><p>1次選考の結果は2026年1月27日頃に発送されます。</p></div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content"><strong>2月〜3月：入園説明会・面談</strong><p>内定した園で説明会や面談が行われます。持ち物リストもこの時期に確認。</p></div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content"><strong>4月上旬：入園・慣らし保育開始</strong><p>慣らし保育は園により1〜2週間程度。短時間の預かりから始まります。</p></div>
</div>
<div class="step">
<div class="step-num">4</div>
<div class="step-content"><strong>4月中旬〜下旬：復職</strong><p>慣らし保育が終わったタイミングで職場復帰します。</p></div>
</div>

<h2>復職期限に注意</h2>
<p>神戸市では、保育施設の利用開始後、原則として<strong>1か月以内に復職</strong>する必要があります。勤務先との調整は早めに行いましょう。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>慣らし保育の期間は園によって異なります。入園説明会の際に確認し、復職日を勤務先と相談してください。</p>
</div>`,
    publishedAt: "2026-03-28",
  },
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
  {
    slug: "ikukyu-timing",
    citySlug: "kobe",
    title: "育休はいつまで延長する？神戸市の保活と育休のベストタイミング",
    description:
      "育休の終了時期と保育園入園のタイミングをどう合わせるか。神戸市の選考スケジュールに合わせた考え方を解説します。",
    image:
      "https://images.unsplash.com/photo-1492725764893-90b379c2b6e7?w=800&h=400&fit=crop",
    category: "育休・復職",
    categoryColor: "purple",
    content: `<h2>育休と保活のタイミング</h2>
<p>育児休業は原則として子どもが1歳になるまでですが、保育園に入れない場合は最長2歳まで延長できます。入園しやすい4月を狙うか、途中入園を目指すかで育休の終了時期が変わります。</p>

<h2>パターン別の考え方</h2>

<h3>パターン1：0歳児4月入園</h3>
<p>4月時点で0歳児クラスの年齢であれば、受入枠が最も多い4月入園を狙えます。育休は約6か月〜11か月で切り上げることになります。</p>
<div class="point-box">
<p><strong>ポイント</strong></p>
<p>0歳児は1歳児と比べて競争率が低い傾向があります。早めの復帰が可能な場合は有利な選択です。</p>
</div>

<h3>パターン2：1歳児4月入園</h3>
<p>子どもが1歳になるまで育休を取り、次の4月に1歳児クラスで入園するパターンです。1歳児は希望者が最も多く、最も競争が激しいクラスです。</p>

<h3>パターン3：途中入園</h3>
<p>4月以外の月に入園を目指すパターンです。空きが少ないため入園は難しい傾向がありますが、育休を子どもの誕生日に合わせて終了できる利点があります。</p>

<h2>神戸市のスケジュールに合わせる</h2>
<p>4月入園の申込は前年の10月〜11月です。申込時点で就労証明書が必要になるため、復職予定日を勤務先と事前に調整しておきましょう。</p>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>育休延長許容の-90点に該当しないよう、本当に入園を希望している場合は申込書の記入内容に注意してください。</p>
</div>`,
    publishedAt: "2026-03-28",
  },
  {
    slug: "papa-ikukyu",
    citySlug: "kobe",
    title: "パパの育休と保活　神戸市の点数にどう影響する？",
    description:
      "父親が育休を取得した場合の神戸市の利用調整への影響と、復職タイミングの考え方を解説します。",
    image:
      "https://images.unsplash.com/photo-1536104968055-4d61aa56f46a?w=800&h=400&fit=crop",
    category: "育休・復職",
    categoryColor: "purple",
    content: `<h2>パパが育休中の場合の点数は？</h2>
<p>神戸市の基本点数は父母それぞれの「保育を必要とする事由」で決まります。育児休業中であっても、復職予定がある場合は就労の基本点数が適用されます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>ママが就労中（100点）＋パパが育休中で復職予定あり（100点）＝基本200点。パパの育休取得自体で減点されることはありません。</p>
</div>

<h2>パパの育休と入園のタイミング</h2>
<p>パパが育休を取得している場合も、入園後は原則1か月以内に復職する必要があります。パパ・ママ交代で育休を取る「パパ・ママ育休プラス」を利用している場合は、入園日と復職日の調整に注意が必要です。</p>

<h2>パパとママどちらが育休を取るか</h2>
<p>利用調整の点数上は、どちらが育休を取っても影響はありません。ただし、申込時に復職予定であることを証明するため、勤務先からの就労証明書は必要です。</p>

<h2>パパ育休のメリット</h2>
<ul>
<li>慣らし保育期間中にパパが自宅でサポートできる</li>
<li>入園直後の体調不良時にパパが対応できる</li>
<li>ママが先に復職し、収入面の安定を図れる</li>
</ul>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>育児休業制度の詳細は<a href="https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/0000160564_00040.html" target="_blank" rel="noopener">厚生労働省「育児休業給付金の支給対象期間延長手続き」</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-03-28",
  },

  // ========== 入園後 (3) ==========
  {
    slug: "narashi-hoiku",
    citySlug: "kobe",
    title: "慣らし保育の進め方　神戸市の保育園で何日かかる？",
    description:
      "入園直後に行われる慣らし保育の一般的なスケジュール、準備するもの、親が気をつけるべきポイントを解説します。",
    image:
      "https://images.unsplash.com/photo-1544776193-352d25ca82cd?w=800&h=400&fit=crop",
    category: "入園後",
    categoryColor: "green",
    content: `<h2>慣らし保育とは</h2>
<p>慣らし保育は、子どもが新しい環境に少しずつ慣れるために、最初の数日〜2週間ほど短時間の保育から始める取り組みです。ほとんどの保育園で実施されています。</p>

<h2>一般的なスケジュール例</h2>
<table>
<tr><th>期間</th><th>保育時間</th></tr>
<tr><td>1〜2日目</td><td>9:00〜11:00（2時間程度）</td></tr>
<tr><td>3〜4日目</td><td>9:00〜12:00（給食まで）</td></tr>
<tr><td>5〜7日目</td><td>9:00〜15:00（お昼寝後まで）</td></tr>
<tr><td>2週目〜</td><td>通常保育</td></tr>
</table>
<p>※園や子どもの様子によって期間は異なります。</p>

<h2>準備しておくこと</h2>
<ul>
<li>慣らし保育中のお迎え担当を決めておく</li>
<li>復職日は慣らし保育終了後に設定する</li>
<li>勤務先に慣らし保育の期間を事前に伝えておく</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>子どもの適応には個人差があります。慣らし保育が予定より長引くケースもあるため、復職日には1週間程度の余裕を持たせておくと安心です。</p>
</div>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>慣らし保育中も保育料は通常どおり発生します。日割り計算にはなりません。</p>
</div>`,
    publishedAt: "2026-03-28",
  },
  {
    slug: "nyuuen-go-seikatsu",
    citySlug: "kobe",
    title: "入園後の生活リズム　朝の準備から夕方のお迎えまで",
    description:
      "保育園に入園した後の1日の流れと、朝の準備・お迎え・持ち物管理のコツをまとめました。",
    image:
      "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&h=400&fit=crop",
    category: "入園後",
    categoryColor: "green",
    content: `<h2>入園後の1日の流れ（例）</h2>
<table>
<tr><th>時間</th><th>内容</th></tr>
<tr><td>6:30</td><td>起床・朝食・着替え</td></tr>
<tr><td>7:30</td><td>登園</td></tr>
<tr><td>日中</td><td>保育園での活動・給食・お昼寝</td></tr>
<tr><td>17:00〜18:00</td><td>お迎え</td></tr>
<tr><td>18:30</td><td>夕食・入浴</td></tr>
<tr><td>20:00</td><td>就寝</td></tr>
</table>

<h2>朝の準備を楽にするコツ</h2>
<ul>
<li>前日の夜に翌日の着替え・持ち物をセットしておく</li>
<li>連絡帳は夜のうちに記入する</li>
<li>朝食はシンプルなメニューをルーティン化する</li>
</ul>

<h2>お迎え時間と延長保育</h2>
<p>神戸市の認可保育園の保育時間は、保育標準時間認定で最大11時間、保育短時間認定で最大8時間です。それを超える場合は<strong>延長保育</strong>を利用でき、別途料金がかかります。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>急な残業時の対応方法（延長保育の申込方法、祖父母やファミリーサポートの利用）をあらかじめ確認しておくと安心です。</p>
</div>

<h2>持ち物管理のコツ</h2>
<p>園によって必要な持ち物は異なりますが、すべてに記名が必要です。名前シールやスタンプを活用すると効率的です。洗い替え用に同じ服を複数枚用意しておくと毎日の洗濯が楽になります。</p>`,
    publishedAt: "2026-03-28",
  },
  {
    slug: "taichou-furyou-taiou",
    citySlug: "kobe",
    title: "入園後の体調不良・感染症対応　呼び出し時の備え",
    description:
      "保育園に通い始めると避けられない子どもの体調不良。呼び出し時の対応策と、知っておきたい感染症のルールを解説します。",
    image:
      "https://images.unsplash.com/photo-1584515933487-779824d29309?w=800&h=400&fit=crop",
    category: "入園後",
    categoryColor: "green",
    content: `<h2>入園後の体調不良は「あるある」</h2>
<p>保育園に通い始めると、集団生活で風邪や感染症をもらいやすくなります。特に入園後の半年間は体調を崩すことが多いです。これは免疫をつけている過程なので、ある程度は避けられません。</p>

<h2>呼び出し時の対応策</h2>
<ul>
<li><strong>職場の制度を確認</strong>：看護休暇（子1人で年5日）を使えるか確認</li>
<li><strong>パートナーと分担</strong>：呼び出し当番を交代で決めておく</li>
<li><strong>祖父母の協力</strong>：近くに住んでいれば緊急時の協力を依頼</li>
<li><strong>病児保育</strong>：神戸市内の病児・病後児保育施設を事前に調べておく</li>
</ul>

<h2>登園停止になる主な感染症</h2>
<table>
<tr><th>感染症</th><th>登園停止の目安</th></tr>
<tr><td>インフルエンザ</td><td>発症後5日かつ解熱後3日（幼児）</td></tr>
<tr><td>新型コロナウイルス</td><td>発症後5日かつ症状軽快後1日</td></tr>
<tr><td>水ぼうそう</td><td>すべての発疹がかさぶたになるまで</td></tr>
<tr><td>手足口病</td><td>発熱がなく普段の食事ができる状態</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>登園再開には医師の意見書（登園許可証）が必要な感染症があります。園から指示される書式を事前に把握しておきましょう。</p>
</div>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>37.5度以上の発熱がある場合は登園できません。朝の検温は毎日欠かさず行いましょう。</p>
</div>`,
    publishedAt: "2026-03-28",
  },

  // ========== 最新情報 (2) ==========
  {
    slug: "taikijidou-zero",
    citySlug: "kobe",
    title: "神戸市の待機児童ゼロの実態　隠れ待機児童に注意",
    description:
      "神戸市は待機児童数3年連続ゼロを達成。しかし「隠れ待機児童」は存在します。その実態と対策を解説します。",
    image:
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&h=400&fit=crop",
    category: "最新情報",
    categoryColor: "blue",
    content: `<h2>神戸市は待機児童数ゼロ</h2>
<p>神戸市は国の「保育所等利用待機児童数調査」において、2024年4月1日時点で<span class="highlight">3年連続待機児童ゼロ</span>を達成しています。保育施設の整備が進んだ成果です。</p>

<h2>「隠れ待機児童」とは</h2>
<p>待機児童数ゼロでも、保育園に入れなかった方がいないわけではありません。以下のケースは待機児童数にカウントされません。</p>
<ul>
<li>特定の園のみを希望し、他の園を辞退した方</li>
<li>認可外保育施設を利用している方</li>
<li>育児休業を延長した方</li>
<li>求職活動を休止した方</li>
</ul>
<p>これらは「隠れ待機児童」と呼ばれ、実際には希望する園に入れなかった方が一定数存在します。</p>

<h2>油断は禁物</h2>
<p>待機児童ゼロ＝希望する園に必ず入れるということではありません。特に以下のケースでは注意が必要です。</p>
<ul>
<li>東灘区・灘区などの人気エリアの0〜1歳児クラス</li>
<li>駅近の大規模園</li>
<li>基本200点で調整加点がない世帯</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>待機児童ゼロの数字に安心せず、自分の点数を把握し、希望園の申込状況を確認して戦略的に保活を進めましょう。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>待機児童数のデータは<a href="https://www.city.kobe.lg.jp/a36812/kosodate/shien/oen/taiki0.html" target="_blank" rel="noopener">神戸市公式サイト「保育所等利用待機児童数」</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-03-28",
  },
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
];

registerArticles(articles);
