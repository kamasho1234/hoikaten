import type { Article } from "./types";
import { registerArticles } from "./index";

const mobaraArticles: Article[] = [
  {
    slug: "mobara-guide",
    citySlug: "mobara",
    title: "茂原市の保活ガイド｜10点制の基準指数と入園の基本",
    description:
      "茂原市の保育園入園選考で使われる利用調整基準を解説。父母各最大10点の合計方式と居宅外・居宅内就労の違いをまとめました。",
    image:
      "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>茂原市の保育園入園制度</h2>
<p>茂原市の保育園入園選考は<span class="highlight">基準指数の合計方式</span>を採用しています。父母それぞれの基準指数（各最大10点）を合計し、調整指数を加えて世帯の選考点を決定します。</p>

<h3>点数の構成</h3>
<p>茂原市では父母各最大<strong>10点</strong>、合計で最大20点の基準指数に調整指数を加えて選考が行われます。ひとり親世帯には基本指数として+10点の加算があります。</p>

<h3>基準指数の主な区分</h3>
<ul>
<li>居宅外就労：最高9点（1日8時間以上・月20日以上）</li>
<li>居宅内就労（自営等）：最高8点（1日8時間以上・月20日以上）</li>
<li>疾病（入院）：10点</li>
<li>障害（1・2級）：9点</li>
<li>災害復旧：10点</li>
<li>出産前後：9点</li>
<li>求職活動：1点</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>茂原市は居宅外就労と居宅内就労で最高点が1点異なります（9点 vs 8点）。自営業やテレワークの場合は居宅内就労として1点低い評価になる点に注意が必要です。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳細は<a href="https://www.city.mobara.chiba.jp/" target="_blank" rel="noopener">茂原市公式サイト</a>の保育施設入園手続きページをご確認ください。</p>
</div>`,
    publishedAt: "2026-06-09",
  },
  {
    slug: "mobara-employment",
    citySlug: "mobara",
    title: "茂原市の就労点数を徹底解説｜居宅外9点・居宅内8点の区分",
    description:
      "茂原市の保育園入園選考における就労の基準指数を詳しく解説。居宅外就労と居宅内就労の違い、日数・時間別の点数を紹介します。",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=400&fit=crop",
    category: "就労",
    categoryColor: "blue",
    content: `<h2>茂原市の就労点数</h2>
<p>茂原市では就労状況を<span class="highlight">居宅外就労</span>と<span class="highlight">居宅内就労</span>に分け、それぞれ日数と時間で評価します。</p>

<h3>居宅外就労の基準指数</h3>
<table>
<thead><tr><th>勤務条件</th><th>基準指数</th></tr></thead>
<tbody>
<tr><td>1日8時間以上・月20日以上</td><td>9点</td></tr>
<tr><td>1日6時間以上・月20日以上 or 1日8時間以上・月15日以上</td><td>8点</td></tr>
<tr><td>1日4時間以上・月20日以上 or 1日6時間以上・月15日以上</td><td>7点</td></tr>
<tr><td>1日4時間以上・月15日以上 or 1日8時間以上・月12日以上</td><td>6点</td></tr>
<tr><td>1日6時間以上・月12日以上 or 月64時間以上</td><td>5点</td></tr>
</tbody>
</table>

<h3>居宅内就労の基準指数</h3>
<p>居宅内就労（自営業・テレワーク等）は、同じ勤務条件で居宅外就労より<strong>1点低い</strong>評価になります。</p>
<table>
<thead><tr><th>勤務条件</th><th>基準指数</th></tr></thead>
<tbody>
<tr><td>1日8時間以上・月20日以上</td><td>8点</td></tr>
<tr><td>1日6時間以上・月20日以上 or 1日8時間以上・月15日以上</td><td>7点</td></tr>
<tr><td>1日4時間以上・月20日以上 or 1日6時間以上・月15日以上</td><td>6点</td></tr>
<tr><td>1日4時間以上・月15日以上 or 1日8時間以上・月12日以上</td><td>5点</td></tr>
<tr><td>1日6時間以上・月12日以上 or 月64時間以上</td><td>4点</td></tr>
</tbody>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>茂原市は日数と時間の組み合わせで細かく点数が分かれています。パートタイムの場合は日数と1日の勤務時間の両方が重要です。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳細は<a href="https://www.city.mobara.chiba.jp/" target="_blank" rel="noopener">茂原市公式サイト</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-06-09",
  },
  {
    slug: "mobara-adjustment",
    citySlug: "mobara",
    title: "茂原市の調整指数一覧｜ひとり親+10・保育士+5の加点を解説",
    description:
      "茂原市の保育園入園選考における調整指数を完全解説。ひとり親世帯+10点、保育士+5点、きょうだい加点や減点項目もまとめました。",
    image:
      "https://images.unsplash.com/photo-1591035897819-f4bdf739f446?w=800&h=400&fit=crop",
    category: "加点・調整",
    categoryColor: "purple",
    content: `<h2>茂原市の調整指数</h2>
<p>茂原市は基準指数に加えて<span class="highlight">調整指数</span>を加減算します。ひとり親世帯への+10点加算が最も大きな加点項目です。</p>

<h3>加点となる調整指数</h3>
<table>
<thead><tr><th>項目</th><th>調整指数</th></tr></thead>
<tbody>
<tr><td>ひとり親世帯</td><td>+10点</td></tr>
<tr><td>保育士資格（市内保育施設勤務）</td><td>+5点</td></tr>
<tr><td>母子・父子世帯（同居親族なし）</td><td>+3点</td></tr>
<tr><td>生活保護世帯</td><td>+2点</td></tr>
<tr><td>産後休暇・育休明け復帰</td><td>+2点</td></tr>
<tr><td>きょうだいが認可保育施設に在園中</td><td>+2点</td></tr>
<tr><td>母子・父子世帯（65歳未満同居あり）</td><td>+1点</td></tr>
<tr><td>きょうだいと同時申込</td><td>+1点</td></tr>
</tbody>
</table>

<h3>減点となる調整指数</h3>
<table>
<thead><tr><th>項目</th><th>調整指数</th></tr></thead>
<tbody>
<tr><td>65歳未満の同居親族が保育可能</td><td>-2点</td></tr>
<tr><td>市外からの申込</td><td>-6点</td></tr>
</tbody>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>茂原市のひとり親加点+10点は、基準指数の最高点（居宅外就労9点）を上回ります。ひとり親世帯はフルタイム就労で9+10=19点となり、二人親フルタイム世帯（9+9=18点）を超える点数になります。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳細は<a href="https://www.city.mobara.chiba.jp/" target="_blank" rel="noopener">茂原市公式サイト</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-06-09",
  },
  {
    slug: "mobara-single-parent",
    citySlug: "mobara",
    title: "茂原市のひとり親世帯優遇｜基本+10点と母子父子+3点の二重加点",
    description:
      "茂原市のひとり親世帯向け加点を解説。基本加算+10点に加え、母子・父子世帯+3点の調整指数で最大+13点の加点があります。",
    image:
      "https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=800&h=400&fit=crop",
    category: "ひとり親",
    categoryColor: "rose",
    content: `<h2>茂原市のひとり親世帯向け加点</h2>
<p>茂原市ではひとり親世帯に対して<span class="highlight">最大+13点の加点</span>があります。基本加算+10点と母子・父子世帯加点+3点の二重加点制度です。</p>

<h3>ひとり親世帯の加点内訳</h3>
<table>
<thead><tr><th>項目</th><th>点数</th></tr></thead>
<tbody>
<tr><td>ひとり親世帯（基本加算）</td><td>+10点</td></tr>
<tr><td>母子・父子世帯（同居親族なし）</td><td>+3点</td></tr>
<tr><td>母子・父子世帯（65歳未満同居あり）</td><td>+1点</td></tr>
</tbody>
</table>

<h3>ひとり親世帯の計算例</h3>
<p>ひとり親でフルタイム就労（同居親族なし）の場合：</p>
<ul>
<li>基準指数：9点（居宅外就労最高）</li>
<li>ひとり親加算：+10点</li>
<li>母子・父子世帯（同居親族なし）：+3点</li>
<li>合計：<strong>22点</strong></li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>ひとり親加算+10点は「基本指数」に含まれるため、調整指数の母子・父子加点と重複して適用されます。同居親族がいない場合は合計+13点の大きな加点となります。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳細は<a href="https://www.city.mobara.chiba.jp/" target="_blank" rel="noopener">茂原市公式サイト</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-06-09",
  },
  {
    slug: "mobara-sibling",
    citySlug: "mobara",
    title: "茂原市のきょうだい加点｜在園中+2・同時申込+1の活用法",
    description:
      "茂原市の保育園入園でのきょうだい加点を解説。きょうだいが既に在園中なら+2点、同時申込で+1点の調整指数が加算されます。",
    image:
      "https://images.unsplash.com/photo-1471286174890-9c112ffca5b4?w=800&h=400&fit=crop",
    category: "きょうだい",
    categoryColor: "amber",
    content: `<h2>茂原市のきょうだい加点制度</h2>
<p>茂原市では、きょうだいが保育施設を利用している場合に<span class="highlight">調整指数の加点</span>があります。</p>

<h3>きょうだい関連の調整指数</h3>
<table>
<thead><tr><th>状況</th><th>調整指数</th></tr></thead>
<tbody>
<tr><td>きょうだいが認可保育施設に在園中</td><td>+2点</td></tr>
<tr><td>きょうだいと同時入所申込</td><td>+1点</td></tr>
</tbody>
</table>

<h3>具体的なシミュレーション</h3>
<p>両親ともフルタイム居宅外就労＋きょうだい在園中の場合：</p>
<ul>
<li>基準指数：9＋9＝18点</li>
<li>きょうだい加点：+2点</li>
<li>合計：<strong>20点</strong></li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>茂原市の10点制では+2点のきょうだい加点も大きな影響を持ちます。上の子が認可施設に通っている場合は必ず申告しましょう。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳細は<a href="https://www.city.mobara.chiba.jp/" target="_blank" rel="noopener">茂原市公式サイト</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-06-09",
  },
  {
    slug: "mobara-nursery-worker",
    citySlug: "mobara",
    title: "茂原市の保育士加点｜市内施設勤務で+5点の優遇制度",
    description:
      "茂原市で保育士資格を持ち市内の保育施設で勤務する世帯への+5点の調整指数加点を解説します。",
    image:
      "https://images.unsplash.com/photo-1587654780291-39c9404d7dd0?w=800&h=400&fit=crop",
    category: "保育士優遇",
    categoryColor: "green",
    content: `<h2>茂原市の保育士加点制度</h2>
<p>茂原市では、保育士資格を持ち市内の保育施設で就労する世帯に<span class="highlight">+5点の調整指数</span>が加算されます。</p>

<h3>保育士加点の条件</h3>
<ul>
<li>保育士資格を保有していること</li>
<li>茂原市内の保育施設で就労していること</li>
</ul>

<h3>保育士世帯の計算例</h3>
<p>片方が市内保育施設でフルタイム勤務、もう片方も別職種フルタイムの場合：</p>
<ul>
<li>基準指数：9＋9＝18点</li>
<li>保育士加点：+5点</li>
<li>合計：<strong>23点</strong></li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>茂原市の10点制度では+5点の保育士加点は非常に大きな優遇です。基準指数の最高点9点の半分以上の加点が得られるため、保育士世帯は入園選考で大きく有利になります。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳細は<a href="https://www.city.mobara.chiba.jp/" target="_blank" rel="noopener">茂原市公式サイト</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-06-09",
  },
  {
    slug: "mobara-deduction",
    citySlug: "mobara",
    title: "茂原市の減点項目｜同居親族-2・市外申込-6の影響",
    description:
      "茂原市の保育園入園選考で減点となる項目を解説。65歳未満の同居親族がいると-2点、市外からの申込は-6点と大きな影響があります。",
    image:
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=400&fit=crop",
    category: "減点・注意",
    categoryColor: "rose",
    content: `<h2>茂原市の減点項目</h2>
<p>茂原市には2つの<span class="highlight">減点項目</span>があります。特に市外からの申込は-6点と影響が非常に大きいです。</p>

<h3>減点の詳細</h3>
<table>
<thead><tr><th>項目</th><th>調整指数</th></tr></thead>
<tbody>
<tr><td>65歳未満の同居親族が児童を保育できる</td><td>-2点</td></tr>
<tr><td>市外からの申込</td><td>-6点</td></tr>
</tbody>
</table>

<h3>同居親族の減点</h3>
<p>祖父母など65歳未満の親族が同居し、児童の保育が可能と判断される場合に-2点の減点があります。</p>

<h3>市外申込の減点</h3>
<p>市外在住で茂原市の保育施設に申込む場合、-6点の大きな減点があります。両親フルタイム（18点）でも12点まで下がります。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>市外からの-6点減点は非常に大きいです。茂原市への転入を予定している場合は、転入届を先に提出してから申込むことで減点を回避できる可能性があります。窓口にご相談ください。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳細は<a href="https://www.city.mobara.chiba.jp/" target="_blank" rel="noopener">茂原市公式サイト</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-06-09",
  },
  {
    slug: "mobara-schedule",
    citySlug: "mobara",
    title: "茂原市の保育園申込スケジュール｜申請時期と入園までの流れ",
    description:
      "茂原市の保育園入園申込みの時期や手順を解説。4月一斉入所と途中入所のスケジュールをまとめました。",
    image:
      "https://images.unsplash.com/photo-1506784365847-bbad939e9335?w=800&h=400&fit=crop",
    category: "スケジュール",
    categoryColor: "blue",
    content: `<h2>茂原市の保育園申込スケジュール</h2>
<p>茂原市の保育園入園には<span class="highlight">4月一斉入所</span>と<span class="highlight">途中入所</span>の2つの申込時期があります。</p>

<h3>4月一斉入所の目安</h3>
<ul>
<li>申込受付：前年11月頃</li>
<li>利用調整（選考）：12月〜1月</li>
<li>結果通知：2月頃</li>
<li>入園：4月1日</li>
</ul>

<h3>途中入所</h3>
<ul>
<li>申込：入所希望月の前月15日頃まで</li>
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
<p>茂原市は千葉県南部の中心都市で、保育施設の数は限られています。希望する園に入るためには早めの申込みと複数園の希望が重要です。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>最新のスケジュールは<a href="https://www.city.mobara.chiba.jp/" target="_blank" rel="noopener">茂原市公式サイト</a>でご確認ください。</p>
</div>`,
    publishedAt: "2026-06-09",
  },
  {
    slug: "mobara-parental-leave",
    citySlug: "mobara",
    title: "茂原市の育休明け加点と育児休業中の点数｜復帰計画のポイント",
    description:
      "茂原市の育児休業関連の点数を解説。育休中は基準指数2点ですが、育休明け復帰で+2点の調整指数が加算されます。",
    image:
      "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=800&h=400&fit=crop",
    category: "育休復帰",
    categoryColor: "rose",
    content: `<h2>茂原市の育児休業と保活</h2>
<p>茂原市では育児休業中の基準指数と、育休明け復帰時の調整指数が別々に設定されています。</p>

<h3>育児休業中の基準指数</h3>
<p>育児休業中（復帰予定あり）：<strong>2点</strong></p>
<p>フルタイム就労の9点と比べると低い点数ですが、復帰後は就労の基準指数が適用されます。</p>

<h3>育休明け復帰の調整指数</h3>
<p>産後休暇・育児休業明けで復帰する場合：<strong>+2点</strong></p>

<h3>計算例</h3>
<p>育休明け復帰（居宅外フルタイム）＋配偶者フルタイムの場合：</p>
<ul>
<li>基準指数：9＋9＝18点</li>
<li>育休明け加点：+2点</li>
<li>合計：<strong>20点</strong></li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>育休中に申込む場合は基準指数が2点と低くなります。入所希望月に合わせた復帰計画を立て、育休明け加点+2点を活用するのがポイントです。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳細は<a href="https://www.city.mobara.chiba.jp/" target="_blank" rel="noopener">茂原市公式サイト</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-06-09",
  },
  {
    slug: "mobara-comparison",
    citySlug: "mobara",
    title: "茂原市と千葉県内の他市を比較｜点数制度の違いと特徴",
    description:
      "茂原市の保育園点数制度を千葉市・市原市・木更津市など千葉県内の他の自治体と比較。10点制と居宅外・内の区分が特徴です。",
    image:
      "https://images.unsplash.com/photo-1543286386-713bdd548da4?w=800&h=400&fit=crop",
    category: "比較",
    categoryColor: "teal",
    content: `<h2>茂原市と千葉県内他市の比較</h2>
<p>茂原市の点数制度を<span class="highlight">千葉県内の他の自治体</span>と比較してみましょう。</p>

<h3>基準指数の比較</h3>
<table>
<thead><tr><th>自治体</th><th>方式</th><th>最大点（1人分）</th><th>フルタイム点数</th></tr></thead>
<tbody>
<tr><td>茂原市</td><td>合計</td><td>10点</td><td>9点（居宅外8h+/20日+）</td></tr>
<tr><td>千葉市</td><td>合計</td><td>20点</td><td>20点（週5日×8h+）</td></tr>
<tr><td>市原市</td><td>合計</td><td>16点</td><td>16点（週5日+×8h+）</td></tr>
<tr><td>木更津市</td><td>合計</td><td>10点</td><td>10点</td></tr>
</tbody>
</table>

<h3>特徴的な違い</h3>
<ul>
<li>茂原市は居宅外と居宅内で最高点が1点異なる</li>
<li>ひとり親加算+10点が基本指数に含まれる</li>
<li>市外申込の-6点減点が大きい</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>千葉県内でも自治体ごとに点数制度は大きく異なります。茂原市は10点制でシンプルですが、居宅外・内の区分やひとり親加算の仕組みに特徴があります。転居を検討する場合は制度全体を比較しましょう。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>各自治体の最新情報は公式サイトでご確認ください。</p>
</div>`,
    publishedAt: "2026-06-09",
  },
];

registerArticles(mobaraArticles);
