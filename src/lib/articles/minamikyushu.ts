import type { Article } from "./types";
import { registerArticles } from "./index";

const minamikayushuArticles: Article[] = [
  {
    slug: "minamikyushu-guide",
    citySlug: "minamikyushu",
    title: "南九州市の保活ガイド｜20点制sum方式と入園の基本",
    description:
      "南九州市の保育園入園選考で使われるsum方式を解説。父母各最大20点の合計方式と調整指数の仕組みをまとめました。",
    image:
      "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>南九州市の保育園入園制度</h2>
<p>南九州市の保育園入園選考は<span class="highlight">sum方式</span>を採用しています。父母それぞれの基準指数（各最大20点）を合計し、調整指数を加えて世帯の選考点を決定します。</p>

<h3>点数の構成</h3>
<p>南九州市では父母各最大<strong>20点</strong>、合計で最大40点の基準指数に調整指数を加えて選考が行われます。鹿児島県内の他の自治体と比較して比較的シンプルな基準指数設計が特徴です。</p>

<h3>基準指数の主な区分</h3>
<ul>
<li>就労（週40時間以上）：20点</li>
<li>出産前後：20点</li>
<li>疾病・障害（A/1〜2級）：20点</li>
<li>災害復旧：20点</li>
<li>介護・看護：20点（要介護4〜5で付添160時間以上の場合）</li>
<li>教育（週40時間以上）：18点</li>
<li>求職活動（ハローワーク登録）：7点</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>南九州市のsum方式は父母各20点の比較的わかりやすい基準が特徴です。就労の区分が4段階（週40h・30h・24h・16h）に細かく分かれており、勤務時間に応じた柔軟な評価が可能です。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳細は<a href="https://www1.g-reiki.net/city.minamikyushu/reiki_honbun/r378RG00000958.html" target="_blank" rel="noopener">南九州市の保育施設入園選考基準</a>でご確認ください。</p>
</div>`,
    publishedAt: "2026-06-09",
  },
  {
    slug: "minamikyushu-employment",
    citySlug: "minamikyushu",
    title: "南九州市の就労点数を徹底解説｜居宅外・自営・内職の違い",
    description:
      "南九州市の保育園入園選考における就労の基準指数を詳しく解説。居宅外勤務・自営業・内職の3つの区分と点数を紹介します。",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=400&fit=crop",
    category: "就労",
    categoryColor: "blue",
    content: `<h2>南九州市の就労点数</h2>
<p>南九州市では就労状況を<span class="highlight">週間就労時間</span>で評価し、3つの区分（居宅外勤務・自営業・内職）で基準指数が決まります。</p>

<h3>就労の基準指数一覧</h3>
<table>
<thead><tr><th>就労形態</th><th>週40h+</th><th>週30h+</th><th>週24h+</th><th>週16h+</th></tr></thead>
<tbody>
<tr><td>居宅外勤務・自営業</td><td>20点</td><td>16点</td><td>14点</td><td>12点</td></tr>
<tr><td>内職</td><td>16点</td><td>14点</td><td>12点</td><td>10点</td></tr>
</tbody>
</table>

<h3>就労形態別の詳細</h3>
<p><strong>居宅外勤務・自営業：</strong>週40時間以上で20点（最高点）、週30時間以上で16点</p>
<p><strong>内職：</strong>同じ時間でも居宅外より低い評価。週40時間以上でも16点で、最高点に到達しません。</p>

<h3>両親の就労点数の合計例</h3>
<p>両親ともフルタイム勤務（週40h+）の場合：20点＋20点＝<strong>40点</strong></p>
<p>片方がパート（週24h）の場合：20点＋14点＝<strong>34点</strong></p>
<p>一方が内職（週40h+）の場合：16点＋20点＝<strong>36点</strong></p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>南九州市は内職と居宅外勤務で異なる点数設定をしています。自宅で行う内職は同じ時間でも評価が低くなるため、居宅外勤務への転換で点数を上げられる場合があります。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>就労証明書の書式や提出方法は<a href="https://www1.g-reiki.net/city.minamikyushu/reiki_honbun/r378RG00000958.html" target="_blank" rel="noopener">南九州市公式サイト</a>でご確認ください。</p>
</div>`,
    publishedAt: "2026-06-09",
  },
  {
    slug: "minamikyushu-adjustment",
    citySlug: "minamikyushu",
    title: "南九州市の調整指数一覧｜ひとり親+23・きょうだい加点を解説",
    description:
      "南九州市の保育園入園選考における調整指数を完全解説。ひとり親世帯+23点をはじめ、きょうだい加点・保育士加点・生活保護世帯の詳細をまとめました。",
    image:
      "https://images.unsplash.com/photo-1591035897819-f4bdf739f446?w=800&h=400&fit=crop",
    category: "加点・調整",
    categoryColor: "purple",
    content: `<h2>南九州市の調整指数</h2>
<p>南九州市は基準指数に加えて<span class="highlight">調整指数</span>を加算します。ひとり親世帯への加点が二重加点（基準指数+20 + 調整指数+3 = 合計+23）で大きいのが特徴です。</p>

<h3>加点となる調整指数</h3>
<table>
<thead><tr><th>項目</th><th>調整指数</th></tr></thead>
<tbody>
<tr><td>ひとり親世帯</td><td>+23点</td></tr>
<tr><td>きょうだいが同園に入所中</td><td>+10点</td></tr>
<tr><td>保育士世帯</td><td>+10点</td></tr>
<tr><td>同時申込（きょうだい）</td><td>+3点</td></tr>
<tr><td>生活保護世帯</td><td>+2点</td></tr>
<tr><td>障害保護者世帯</td><td>+1点</td></tr>
<tr><td>多子世帯</td><td>+1点</td></tr>
</tbody>
</table>

<h3>減点となる調整指数</h3>
<table>
<thead><tr><th>項目</th><th>調整指数</th></tr></thead>
<tbody>
<tr><td>利用料滞納</td><td>-10点</td></tr>
<tr><td>市外居住</td><td>-5点</td></tr>
</tbody>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>ひとり親世帯の+23点は基準指数の最大20点と同等級の大きな加点です。基準指数と調整指数を合わせるとひとり親フルタイム就労で40点＋23点＝63点となり、非常に優先されます。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳細は<a href="https://www1.g-reiki.net/city.minamikyushu/reiki_honbun/r378RG00000958.html" target="_blank" rel="noopener">南九州市公式サイト</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-06-09",
  },
  {
    slug: "minamikyushu-sibling",
    citySlug: "minamikyushu",
    title: "南九州市のきょうだい加点｜同園+10は大きなメリット",
    description:
      "南九州市の保育園入園でのきょうだい加点を解説。同園に既に兄弟姉妹がいれば+10点の調整指数が加算されます。",
    image:
      "https://images.unsplash.com/photo-1471286174890-9c112ffca5b4?w=800&h=400&fit=crop",
    category: "きょうだい",
    categoryColor: "amber",
    content: `<h2>南九州市のきょうだい加点制度</h2>
<p>南九州市では、きょうだいが同じ保育施設に入園している場合に<span class="highlight">調整指数の加点</span>があります。</p>

<h3>きょうだい関連の調整指数</h3>
<table>
<thead><tr><th>状況</th><th>調整指数</th></tr></thead>
<tbody>
<tr><td>きょうだいが同園に入所中</td><td>+10点</td></tr>
<tr><td>きょうだいと同時申込</td><td>+3点</td></tr>
</tbody>
</table>

<h3>具体的なシミュレーション</h3>
<p>両親フルタイム＋第2子がすでに同園に入園中の場合：</p>
<ul>
<li>基準指数：20＋20＝40点</li>
<li>きょうだい加点：+10点</li>
<li>合計：<strong>50点</strong></li>
</ul>

<p>同園加点+10点は、内職から居宅外勤務への昇進と同じ効果があります。園の運営効率や家族の利便性を考慮した制度です。</p>

<h3>同時申込との違い</h3>
<p>既に兄が入園中 → 弟妹申込：+10点</p>
<p>兄と弟が同時申込：+3点（一律の同時申込加点）</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>南九州市は同園加点を大きく評価しています。上の子が通園中なら、下の子の申込時に+10点の大きなメリットが得られます。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳細は<a href="https://www1.g-reiki.net/city.minamikyushu/reiki_honbun/r378RG00000958.html" target="_blank" rel="noopener">南九州市公式サイト</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-06-09",
  },
  {
    slug: "minamikyushu-single-parent",
    citySlug: "minamikyushu",
    title: "南九州市のひとり親世帯優遇｜+23点の二重加点の詳細",
    description:
      "南九州市のひとり親世帯向けの二重加点（基準指数+20 + 調整指数+3 = 合計+23）を解説。どのように選考に影響するかまとめました。",
    image:
      "https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=800&h=400&fit=crop",
    category: "ひとり親",
    categoryColor: "rose",
    content: `<h2>南九州市のひとり親世帯向け加点</h2>
<p>南九州市ではひとり親世帯に<span class="highlight">二重加点</span>が適用されます。基準指数で配偶者なしの+20点と、調整指数の+3点を合わせて合計+23点が加算されます。</p>

<h3>ひとり親世帯の点数構成</h3>
<ul>
<li>基準指数の配偶者なし加点：+20点</li>
<li>調整指数のひとり親加点：+3点</li>
<li>合計特別加点：<strong>+23点</strong></li>
</ul>

<h3>ひとり親フルタイム就労の計算</h3>
<p>ひとり親でフルタイム就労（週40h+）の場合：</p>
<ul>
<li>基準指数（保護者1）：20点（就労）</li>
<li>基準指数の配偶者なし加点：+20点</li>
<li>調整指数のひとり親加点：+3点</li>
<li>合計：<strong>43点</strong></li>
</ul>

<h3>他の加点との組み合わせ</h3>
<p>ひとり親フルタイム＋きょうだい同園：20＋20＋3＋10＝<strong>53点</strong></p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>南九州市のひとり親+23点は非常に大きな特別措置です。基準指数の満点20点と同等の加点があり、家計を支える多くのひとり親世帯の入園を強力にサポートしています。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳細は<a href="https://www1.g-reiki.net/city.minamikyushu/reiki_honbun/r378RG00000958.html" target="_blank" rel="noopener">南九州市公式サイト</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-06-09",
  },
  {
    slug: "minamikyushu-nursery-worker",
    citySlug: "minamikyushu",
    title: "南九州市の保育士加点｜+10点の優遇制度を解説",
    description:
      "南九州市で保育士等として勤務する世帯に与えられる調整指数+10点を解説。保育士不足対策としての大きな優遇です。",
    image:
      "https://images.unsplash.com/photo-1587654780291-39c9404d7dd0?w=800&h=400&fit=crop",
    category: "保育士優遇",
    categoryColor: "green",
    content: `<h2>南九州市の保育士加点制度</h2>
<p>南九州市では、保育士等として保育施設で就労している世帯に対して<span class="highlight">調整指数の加点</span>があります。</p>

<h3>保育士加点の詳細</h3>
<ul>
<li>保育士世帯（就労対象）：+10点</li>
</ul>

<h3>保育士世帯の計算例</h3>
<p>片方が保育士フルタイム、もう片方も別職種フルタイムの場合：</p>
<ul>
<li>基準指数：20＋20＝40点</li>
<li>保育士加点：+10点</li>
<li>合計：<strong>50点</strong></li>
</ul>

<h3>保育士とひとり親の組み合わせ</h3>
<p>ひとり親で保育士フルタイム就労の場合：</p>
<ul>
<li>基準指数：20点（就労）＋20点（配偶者なし）</li>
<li>調整指数：+3点（ひとり親）＋10点（保育士）</li>
<li>合計：<strong>53点</strong></li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>南九州市の保育士加点+10点は、基準指数の20点制を考えると半分の大きさ。保育士不足が全国的な課題となる中、南九州市も保育士世帯を+10点で優遇しています。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳細は<a href="https://www1.g-reiki.net/city.minamikyushu/reiki_honbun/r378RG00000958.html" target="_blank" rel="noopener">南九州市公式サイト</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-06-09",
  },
  {
    slug: "minamikyushu-deduction",
    citySlug: "minamikyushu",
    title: "南九州市の減点項目｜利用料滞納-10・市外-5を注意",
    description:
      "南九州市の保育園入園選考で減点となる項目を解説。利用料滞納で-10点、市外居住で-5点の減点があります。",
    image:
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=400&fit=crop",
    category: "減点・注意",
    categoryColor: "rose",
    content: `<h2>南九州市の減点項目</h2>
<p>南九州市では<span class="highlight">利用料の滞納</span>と<span class="highlight">市外居住</span>がある場合に調整指数が減点されます。</p>

<h3>減点項目一覧</h3>
<table>
<thead><tr><th>項目</th><th>調整指数</th></tr></thead>
<tbody>
<tr><td>利用料滞納</td><td>-10点</td></tr>
<tr><td>市外居住</td><td>-5点</td></tr>
</tbody>
</table>

<h3>減点の影響</h3>
<p>両親フルタイム（40点）で利用料滞納の場合：40-10＝<strong>30点</strong></p>
<p>週30h勤務の基準指数（16点＋16点＝32点）に近づく影響があります。</p>

<h3>市外居住の場合</h3>
<p>市外から南九州市の保育園入園を希望する場合は-5点となります。</p>
<p>ただし利用枠に余裕がある場合など、状況によっては柔軟に対応される可能性もあります。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>南九州市の減点は利用料滞納-10点と市外-5点の2項目です。既入園児がいる家庭は特に利用料の期限内納付が重要です。滞納があると下の子の入園に大きく影響します。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳細は<a href="https://www1.g-reiki.net/city.minamikyushu/reiki_honbun/r378RG00000958.html" target="_blank" rel="noopener">南九州市公式サイト</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-06-09",
  },
  {
    slug: "minamikyushu-schedule",
    citySlug: "minamikyushu",
    title: "南九州市の保育園申込スケジュール｜申請時期と入園までの流れ",
    description:
      "南九州市の保育園入園申込みの時期や手順を解説。4月一斉入所と途中入所それぞれのスケジュールをまとめました。",
    image:
      "https://images.unsplash.com/photo-1506784365847-bbad939e9335?w=800&h=400&fit=crop",
    category: "スケジュール",
    categoryColor: "blue",
    content: `<h2>南九州市の保育園申込スケジュール</h2>
<p>南九州市の保育園入園には<span class="highlight">4月一斉入所</span>と<span class="highlight">途中入所</span>の2つの申込時期があります。</p>

<h3>4月一斉入所の目安</h3>
<ul>
<li>申込受付：前年9月〜10月頃</li>
<li>利用調整（選考）：10月〜11月</li>
<li>結果通知：12月〜1月頃</li>
<li>入園：4月1日</li>
</ul>

<h3>途中入所</h3>
<ul>
<li>申込：入所希望月の前月中旬頃まで</li>
<li>空き状況により利用調整</li>
<li>結果通知は申込の2週間程度後</li>
</ul>

<h3>必要書類</h3>
<ul>
<li>保育施設利用申込書</li>
<li>就労証明書（就労の場合）</li>
<li>診断書等（疾病・障害の場合）</li>
<li>介護・看護に関する証明書（該当の場合）</li>
<li>その他該当する証明書類</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>南九州市の4月入所申込は9月から始まります。早めの準備と書類の整備が重要です。育休からの復帰を予定している場合は、職場に復帰予定日を確認して就労証明書を準備しましょう。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>最新のスケジュールと詳細な要件は<a href="https://www1.g-reiki.net/city.minamikyushu/reiki_honbun/r378RG00000958.html" target="_blank" rel="noopener">南九州市公式サイト</a>でご確認ください。</p>
</div>`,
    publishedAt: "2026-06-09",
  },
  {
    slug: "minamikyushu-parental-leave",
    citySlug: "minamikyushu",
    title: "南九州市の育休復帰のポイント｜出産前後20点で最優先",
    description:
      "南九州市の産休・育児休業明けの基準指数を解説。出産前後で20点の最高評価が得られることが大きなメリットです。",
    image:
      "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=800&h=400&fit=crop",
    category: "育休復帰",
    categoryColor: "rose",
    content: `<h2>南九州市の育休復帰について</h2>
<p>南九州市では産休・育児休業からの復帰時に<span class="highlight">特別な加点制度</span>があります。</p>

<h3>出産前後の基準指数</h3>
<ul>
<li>出産前後（出産予定日前8週間から出産後8週間）：20点</li>
</ul>

<h3>育休明けから就労開始までの扱い</h3>
<p>育休から復帰して職場に復帰する場合、就労証明書で復帰予定日を記入します。</p>
<ul>
<li>育休中（出産後8週間以内）：基準指数20点（出産前後）</li>
<li>復帰予定日以降：基準指数20点（就労・週40h以上として評価）</li>
</ul>

<h3>育休復帰の計算例</h3>
<p>第2子出産予定で第1子が既に入園中の場合：</p>
<ul>
<li>基準指数（出産予定）：20点</li>
<li>配偶者の就労：20点</li>
<li>きょうだい同園加点：+10点</li>
<li>合計：<strong>50点</strong></li>
</ul>

<h3>育休から就労へのスムーズな移行</h3>
<p>出産前後の20点と復帰後の就労20点は同じ評価のため、育休明けと同時に入園できるよう早めに申込を進めましょう。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>南九州市は出産前後を就労と同じ20点で評価します。つまり育休中でも最高の基準指数を得られるため、育休明け直後の入園が比較的容易です。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳細は<a href="https://www1.g-reiki.net/city.minamikyushu/reiki_honbun/r378RG00000958.html" target="_blank" rel="noopener">南九州市公式サイト</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-06-09",
  },
  {
    slug: "minamikyushu-comparison",
    citySlug: "minamikyushu",
    title: "南九州市と鹿児島県内の他市を比較｜sum方式の特徴",
    description:
      "南九州市の保育園点数制度を鹿児島県内の他の自治体と比較。20点制sum方式とひとり親+23点の特徴を解説します。",
    image:
      "https://images.unsplash.com/photo-1543286386-713bdd548da4?w=800&h=400&fit=crop",
    category: "比較",
    categoryColor: "teal",
    content: `<h2>南九州市と鹿児島県内他市の比較</h2>
<p>南九州市の点数制度を<span class="highlight">鹿児島県内の他の自治体</span>と比較してみましょう。</p>

<h3>基準指数の方式比較</h3>
<table>
<thead><tr><th>自治体</th><th>方式</th><th>最大点（1人分）</th><th>就労フルタイム点</th></tr></thead>
<tbody>
<tr><td>南九州市</td><td>sum</td><td>20点</td><td>20点（週40h+）</td></tr>
<tr><td>鹿児島市</td><td>sum</td><td>30点</td><td>30点</td></tr>
<tr><td>出水市</td><td>sum</td><td>30点</td><td>30点</td></tr>
</tbody>
</table>

<h3>調整指数の比較</h3>
<table>
<thead><tr><th>自治体</th><th>ひとり親加点</th><th>きょうだい加点</th><th>保育士加点</th></tr></thead>
<tbody>
<tr><td>南九州市</td><td>+23点</td><td>+10点</td><td>+10点</td></tr>
<tr><td>鹿児島市</td><td>+15点</td><td>+5点</td><td>+5点</td></tr>
<tr><td>出水市</td><td>+20点</td><td>+8点</td><td>+8点</td></tr>
</tbody>
</table>

<h3>南九州市の特徴</h3>
<ul>
<li><strong>ひとり親+23点：</strong>基準指数の最大20点に近い大幅加点で、県内で最も手厚い優遇</li>
<li><strong>シンプルな基準：</strong>就労は週40h・30h・24h・16hの4段階で理解しやすい</li>
<li><strong>同園加点+10点：</strong>きょうだい関連の加点が充実</li>
<li><strong>内職と居宅外の区分：</strong>同じ時間でも就労形態で点数が異なる</li>
</ul>

<h3>選択のポイント</h3>
<p>南九州市はひとり親世帯への+23点加点が最大の特徴です。ひとり親で働く世帯が多い地域への配慮が色濃く反映されており、基準指数と調整指数を合計すると県内で最も優遇される可能性が高いです。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>南九州市と他の県内自治体の最大の違いは、ひとり親への二重加点（基準指数+20 + 調整指数+3）です。ひとり親で就労している世帯にとって、南九州市は非常に有利な制度設計になっています。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>各自治体の最新情報は公式サイトでご確認ください。</p>
</div>`,
    publishedAt: "2026-06-09",
  },
];

registerArticles(minamikayushuArticles);
