import type { Article } from "./types";
import { registerArticles } from "./index";

const iwamizawaArticles: Article[] = [
  {
    slug: "iwamizawa-guide",
    citySlug: "iwamizawa",
    title: "岩見沢市の保活ガイド｜100点制基準指数と入園の基本",
    description:
      "岩見沢市の保育園入園選考で使われる利用調整基準を解説。父母各最大100点の合計方式と調整指数の仕組みをまとめました。",
    image:
      "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>岩見沢市の保育園入園制度</h2>
<p>岩見沢市の保育園入園選考は<span class="highlight">基準指数の合計方式</span>を採用しています。父母それぞれの基準指数（各最大100点）を合計し、調整指数を加えて世帯の選考点を決定します。</p>

<h3>点数の構成</h3>
<p>岩見沢市では父母各最大<strong>100点</strong>、合計で最大200点の基準指数に調整指数を加えて選考が行われます。北海道内の他の自治体と比較して基準指数の幅が大きく、調整指数も大きな値が設定されている点が特徴です。</p>

<h3>基準指数の主な区分</h3>
<ul>
<li>就労（月150時間以上）：100点</li>
<li>出産前後：100点</li>
<li>疾病・障害：100点</li>
<li>災害復旧：100点</li>
<li>就学（月120時間以上）：95点</li>
<li>介護・看護：80点</li>
<li>求職活動：50点</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>岩見沢市は就労時間を月64時間から月150時間以上まで4段階に分けています。月150時間以上のフルタイム勤務で最高の100点となります。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳細は<a href="https://www.city.iwamizawa.hokkaido.jp/" target="_blank" rel="noopener">岩見沢市公式サイト</a>の保育施設入園手続きページをご確認ください。</p>
</div>`,
    publishedAt: "2026-06-09",
  },
  {
    slug: "iwamizawa-employment",
    citySlug: "iwamizawa",
    title: "岩見沢市の就労点数を徹底解説｜月150時間以上で100点",
    description:
      "岩見沢市の保育園入園選考における就労の基準指数を詳しく解説。月間就労時間別の4段階評価と点数を紹介します。",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=400&fit=crop",
    category: "就労",
    categoryColor: "blue",
    content: `<h2>岩見沢市の就労点数</h2>
<p>岩見沢市では就労状況を<span class="highlight">月間就労時間</span>で評価し、4段階で基準指数が決まります。</p>

<h3>就労の基準指数一覧</h3>
<table>
<thead><tr><th>就労時間</th><th>基準指数</th></tr></thead>
<tbody>
<tr><td>月150時間以上</td><td>100点</td></tr>
<tr><td>月120時間以上150時間未満</td><td>95点</td></tr>
<tr><td>月90時間以上120時間未満</td><td>90点</td></tr>
<tr><td>月64時間以上90時間未満</td><td>85点</td></tr>
</tbody>
</table>

<h3>両親の就労点数の合計例</h3>
<p>両親ともフルタイム（月150時間以上）の場合：100点＋100点＝<strong>200点</strong></p>
<p>片方がパート（月90時間）の場合：100点＋90点＝<strong>190点</strong></p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>岩見沢市の就労は月64時間以上が対象です。北海道の他の自治体（例：江別市は月48時間以上から）と比べるとやや高い基準ですが、フルタイムであれば最高点の100点が付与されます。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>就労証明書の書式や提出方法は<a href="https://www.city.iwamizawa.hokkaido.jp/" target="_blank" rel="noopener">岩見沢市公式サイト</a>でご確認ください。</p>
</div>`,
    publishedAt: "2026-06-09",
  },
  {
    slug: "iwamizawa-adjustment",
    citySlug: "iwamizawa",
    title: "岩見沢市の調整指数一覧｜ひとり親+120・きょうだい加点を解説",
    description:
      "岩見沢市の保育園入園選考における調整指数を完全解説。ひとり親世帯+120点をはじめ、産休育休明け・きょうだい加点・保育士加点の詳細をまとめました。",
    image:
      "https://images.unsplash.com/photo-1591035897819-f4bdf739f446?w=800&h=400&fit=crop",
    category: "加点・調整",
    categoryColor: "purple",
    content: `<h2>岩見沢市の調整指数</h2>
<p>岩見沢市は基準指数に加えて<span class="highlight">調整指数</span>を加算します。特にひとり親世帯への加点が+120点と大きいのが特徴です。</p>

<h3>加点となる調整指数</h3>
<table>
<thead><tr><th>項目</th><th>調整指数</th></tr></thead>
<tbody>
<tr><td>ひとり親世帯</td><td>+120点</td></tr>
<tr><td>産休育休明け（きょうだい既入所）</td><td>+100点</td></tr>
<tr><td>きょうだいが既に入所中</td><td>+80点</td></tr>
<tr><td>保育士世帯（月150時間以上）</td><td>+70点</td></tr>
<tr><td>保育士世帯（月120時間以上）</td><td>+50点</td></tr>
<tr><td>産休・育休明け</td><td>+40点</td></tr>
<tr><td>きょうだいと同時入所</td><td>+30点</td></tr>
<tr><td>生活保護世帯（就労支援対象）</td><td>+30点</td></tr>
<tr><td>保育士世帯（月64時間以上）</td><td>+30点</td></tr>
<tr><td>障がい者のいる世帯</td><td>+10点</td></tr>
</tbody>
</table>

<h3>減点となる調整指数</h3>
<table>
<thead><tr><th>項目</th><th>調整指数</th></tr></thead>
<tbody>
<tr><td>保育料滞納（3〜6か月未満）</td><td>-20点</td></tr>
<tr><td>保育料滞納（6〜12か月未満）</td><td>-30点</td></tr>
<tr><td>保育料滞納（12か月以上）</td><td>-50点</td></tr>
</tbody>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>ひとり親世帯の+120点は非常に大きな加点です。基準指数のフルタイム就労100点を上回るため、ひとり親世帯はかなり優先されます。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳細は<a href="https://www.city.iwamizawa.hokkaido.jp/" target="_blank" rel="noopener">岩見沢市公式サイト</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-06-09",
  },
  {
    slug: "iwamizawa-sibling",
    citySlug: "iwamizawa",
    title: "岩見沢市のきょうだい加点｜既入所+80・同時申込+30の活用法",
    description:
      "岩見沢市の保育園入園でのきょうだい加点を解説。既入所きょうだいがいれば+80点、同時申込で+30点の調整指数が加算されます。",
    image:
      "https://images.unsplash.com/photo-1471286174890-9c112ffca5b4?w=800&h=400&fit=crop",
    category: "きょうだい",
    categoryColor: "amber",
    content: `<h2>岩見沢市のきょうだい加点制度</h2>
<p>岩見沢市では、きょうだいが保育施設を利用している場合に大きな<span class="highlight">調整指数の加点</span>があります。</p>

<h3>きょうだい関連の調整指数</h3>
<table>
<thead><tr><th>状況</th><th>調整指数</th></tr></thead>
<tbody>
<tr><td>きょうだいが認可保育施設に入所中</td><td>+80点</td></tr>
<tr><td>きょうだいと同時入所申込</td><td>+30点</td></tr>
<tr><td>産休育休明けでかつきょうだい既入所</td><td>+100点</td></tr>
</tbody>
</table>

<h3>具体的なシミュレーション</h3>
<p>両親フルタイム＋第2子がすでに入所中の場合：</p>
<ul>
<li>基準指数：100＋100＝200点</li>
<li>きょうだい加点：+80点</li>
<li>合計：<strong>280点</strong></li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>産休育休明けにきょうだいが既に入所中なら+100点が加算されます。通常のきょうだい加点+80点と重複せず、産休育休明け加点+40点とも別枠ですが、どちらが適用されるか窓口でご確認ください。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳細は<a href="https://www.city.iwamizawa.hokkaido.jp/" target="_blank" rel="noopener">岩見沢市公式サイト</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-06-09",
  },
  {
    slug: "iwamizawa-single-parent",
    citySlug: "iwamizawa",
    title: "岩見沢市のひとり親世帯優遇｜+120点の大幅加点の詳細",
    description:
      "岩見沢市のひとり親世帯向け調整指数+120点を解説。基準指数のフルタイム100点を超える加点がどのように選考に影響するかまとめました。",
    image:
      "https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=800&h=400&fit=crop",
    category: "ひとり親",
    categoryColor: "rose",
    content: `<h2>岩見沢市のひとり親世帯向け加点</h2>
<p>岩見沢市ではひとり親世帯に<span class="highlight">+120点の調整指数</span>が加算されます。この加点は他の自治体と比較しても非常に大きい値です。</p>

<h3>ひとり親世帯の点数計算</h3>
<p>ひとり親でフルタイム就労の場合：</p>
<ul>
<li>基準指数（保護者1）：100点（月150時間以上）</li>
<li>基準指数（保護者2）：なし</li>
<li>ひとり親加点：+120点</li>
<li>合計：<strong>220点</strong></li>
</ul>

<p>両親ともフルタイムの二人親世帯（200点）を上回る計算になります。</p>

<h3>他の加点との組み合わせ</h3>
<p>ひとり親+きょうだい既入所の場合：100＋120＋80＝<strong>300点</strong></p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>ひとり親世帯の+120点は、基準指数のフルタイム就労100点よりも大きい加点です。岩見沢市はひとり親世帯の保育ニーズを強く考慮した制度設計になっています。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳細は<a href="https://www.city.iwamizawa.hokkaido.jp/" target="_blank" rel="noopener">岩見沢市公式サイト</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-06-09",
  },
  {
    slug: "iwamizawa-nursery-worker",
    citySlug: "iwamizawa",
    title: "岩見沢市の保育士加点｜最大+70点の優遇制度を解説",
    description:
      "岩見沢市で保育士等として勤務する世帯に与えられる調整指数を解説。月150時間以上の勤務で+70点の大きな加点があります。",
    image:
      "https://images.unsplash.com/photo-1587654780291-39c9404d7dd0?w=800&h=400&fit=crop",
    category: "保育士優遇",
    categoryColor: "green",
    content: `<h2>岩見沢市の保育士加点制度</h2>
<p>岩見沢市では、保育士等として保育施設で就労している世帯に対して<span class="highlight">調整指数の加点</span>があります。</p>

<h3>保育士加点の詳細</h3>
<table>
<thead><tr><th>勤務時間</th><th>調整指数</th></tr></thead>
<tbody>
<tr><td>月150時間以上</td><td>+70点</td></tr>
<tr><td>月120時間以上150時間未満</td><td>+50点</td></tr>
<tr><td>月64時間以上120時間未満</td><td>+30点</td></tr>
</tbody>
</table>

<h3>保育士世帯の計算例</h3>
<p>片方が保育士フルタイム、もう片方も別職種フルタイムの場合：</p>
<ul>
<li>基準指数：100＋100＝200点</li>
<li>保育士加点：+70点</li>
<li>合計：<strong>270点</strong></li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>保育士不足が社会問題となる中、岩見沢市は保育士世帯を最大+70点で優遇しています。保育士として月150時間以上勤務していれば大きな加点が得られます。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳細は<a href="https://www.city.iwamizawa.hokkaido.jp/" target="_blank" rel="noopener">岩見沢市公式サイト</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-06-09",
  },
  {
    slug: "iwamizawa-parental-leave",
    citySlug: "iwamizawa",
    title: "岩見沢市の育休明け加点｜復帰時の+40〜+100点を活用",
    description:
      "岩見沢市の産休・育児休業明けの調整指数を解説。きょうだいが既に入所している場合は+100点の大きな加点があります。",
    image:
      "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=800&h=400&fit=crop",
    category: "育休復帰",
    categoryColor: "rose",
    content: `<h2>岩見沢市の産休・育休明け加点</h2>
<p>岩見沢市では産休・育児休業からの復帰時に<span class="highlight">調整指数の加点</span>があります。</p>

<h3>産休・育休明けの調整指数</h3>
<table>
<thead><tr><th>状況</th><th>調整指数</th></tr></thead>
<tbody>
<tr><td>産休・育休明け（きょうだい既入所あり）</td><td>+100点</td></tr>
<tr><td>産休・育休明け（きょうだいなし）</td><td>+40点</td></tr>
</tbody>
</table>

<h3>育休復帰の計算例</h3>
<p>両親フルタイム＋育休明け＋きょうだい既入所：</p>
<ul>
<li>基準指数：100＋100＝200点</li>
<li>育休明け（きょうだい既入所）：+100点</li>
<li>合計：<strong>300点</strong></li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>きょうだいが既に入所している場合の育休明け加点は+100点と非常に大きいです。第2子以降の保育園入園がスムーズになるよう配慮された制度です。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳細は<a href="https://www.city.iwamizawa.hokkaido.jp/" target="_blank" rel="noopener">岩見沢市公式サイト</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-06-09",
  },
  {
    slug: "iwamizawa-deduction",
    citySlug: "iwamizawa",
    title: "岩見沢市の減点項目｜保育料滞納で最大-50点の影響",
    description:
      "岩見沢市の保育園入園選考で減点となる項目を解説。保育料の滞納期間に応じて-20〜-50点の減点があります。",
    image:
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=400&fit=crop",
    category: "減点・注意",
    categoryColor: "rose",
    content: `<h2>岩見沢市の減点項目</h2>
<p>岩見沢市では<span class="highlight">保育料の滞納</span>がある場合に調整指数が減点されます。</p>

<h3>保育料滞納による減点</h3>
<table>
<thead><tr><th>滞納期間</th><th>調整指数</th></tr></thead>
<tbody>
<tr><td>3か月以上6か月未満</td><td>-20点</td></tr>
<tr><td>6か月以上12か月未満</td><td>-30点</td></tr>
<tr><td>12か月以上</td><td>-50点</td></tr>
</tbody>
</table>

<h3>減点の影響</h3>
<p>両親フルタイム（200点）で12か月以上滞納の場合：200-50＝<strong>150点</strong></p>
<p>パート勤務（85点＋85点＝170点）と同程度まで下がります。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>岩見沢市の減点項目は保育料滞納のみですが、最大-50点と影響が大きいです。上の子の保育料は必ず期限内に納付しましょう。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳細は<a href="https://www.city.iwamizawa.hokkaido.jp/" target="_blank" rel="noopener">岩見沢市公式サイト</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-06-09",
  },
  {
    slug: "iwamizawa-schedule",
    citySlug: "iwamizawa",
    title: "岩見沢市の保育園申込スケジュール｜申請時期と入園までの流れ",
    description:
      "岩見沢市の保育園入園申込みの時期や手順を解説。4月一斉入所と途中入所それぞれのスケジュールをまとめました。",
    image:
      "https://images.unsplash.com/photo-1506784365847-bbad939e9335?w=800&h=400&fit=crop",
    category: "スケジュール",
    categoryColor: "blue",
    content: `<h2>岩見沢市の保育園申込スケジュール</h2>
<p>岩見沢市の保育園入園には<span class="highlight">4月一斉入所</span>と<span class="highlight">途中入所</span>の2つの申込時期があります。</p>

<h3>4月一斉入所の目安</h3>
<ul>
<li>申込受付：前年10月〜11月頃</li>
<li>利用調整（選考）：12月〜1月</li>
<li>結果通知：2月頃</li>
<li>入園：4月1日</li>
</ul>

<h3>途中入所</h3>
<ul>
<li>申込：入所希望月の前月10日頃まで</li>
<li>空き状況により利用調整</li>
</ul>

<h3>必要書類</h3>
<ul>
<li>保育施設利用申込書</li>
<li>就労証明書（就労の場合）</li>
<li>診断書等（疾病・障害の場合）</li>
<li>その他該当する証明書類</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>4月入所は競争率が高いため、前年度の秋に申込む必要があります。早めの準備と情報収集が重要です。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>最新のスケジュールは<a href="https://www.city.iwamizawa.hokkaido.jp/" target="_blank" rel="noopener">岩見沢市公式サイト</a>でご確認ください。</p>
</div>`,
    publishedAt: "2026-06-09",
  },
  {
    slug: "iwamizawa-comparison",
    citySlug: "iwamizawa",
    title: "岩見沢市と北海道内の他市を比較｜点数制度の違いと特徴",
    description:
      "岩見沢市の保育園点数制度を札幌市・江別市・千歳市など北海道内の他の自治体と比較。100点制と調整指数の大きさが特徴です。",
    image:
      "https://images.unsplash.com/photo-1543286386-713bdd548da4?w=800&h=400&fit=crop",
    category: "比較",
    categoryColor: "teal",
    content: `<h2>岩見沢市と北海道内他市の比較</h2>
<p>岩見沢市の点数制度を<span class="highlight">北海道内の他の自治体</span>と比較してみましょう。</p>

<h3>基準指数の比較</h3>
<table>
<thead><tr><th>自治体</th><th>方式</th><th>最大点（1人分）</th><th>フルタイム点数</th></tr></thead>
<tbody>
<tr><td>岩見沢市</td><td>合計</td><td>100点</td><td>100点（月150h+）</td></tr>
<tr><td>札幌市</td><td>合計</td><td>10点</td><td>10点（週30h+）</td></tr>
<tr><td>江別市</td><td>合計</td><td>10点</td><td>10点（月140h+）</td></tr>
<tr><td>千歳市</td><td>合計</td><td>15点</td><td>15点（月140h+）</td></tr>
</tbody>
</table>

<h3>調整指数の比較</h3>
<table>
<thead><tr><th>自治体</th><th>ひとり親加点</th><th>きょうだい加点</th></tr></thead>
<tbody>
<tr><td>岩見沢市</td><td>+120点</td><td>+80点</td></tr>
<tr><td>札幌市</td><td>+6点</td><td>+2点</td></tr>
<tr><td>江別市</td><td>+5点</td><td>+3点</td></tr>
</tbody>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>岩見沢市は北海道内の他の自治体と比べて基準指数・調整指数ともに大きな数値を使用しています。制度の細かさや加点幅が異なるため、転居時は点数の単純比較ではなく制度全体を理解することが重要です。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>各自治体の最新情報は公式サイトでご確認ください。</p>
</div>`,
    publishedAt: "2026-06-09",
  },
];

registerArticles(iwamizawaArticles);
