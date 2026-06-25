import type { Article } from "./types";
import { registerArticles } from "./index";

const otakeArticles: Article[] = [
  {
    slug: "otake-guide",
    citySlug: "otake",
    title: "大竹市の保活ガイド｜min方式の基準指数と入園の基本",
    description:
      "大竹市の保育園入園選考で使われるmin方式と基準指数を解説。保護者のうち基準点数の低い方を適用する仕組みをまとめました。",
    image:
      "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>大竹市の保育園入園制度</h2>
<p>大竹市の保育園入園選考は<span class="highlight">min方式</span>を採用しています。保護者のうち基準点数の低い方を適用し、その点数をベースに調整指数を加えて世帯の選考点を決定します。</p>

<h3>min方式とは</h3>
<p>大竹市では父母2人の基準指数を比較し、<strong>点数の低い方を採用する</strong>方式です。例えば一方が100点、もう一方が80点の場合は80点が世帯の基準指数となります。このため、両親の就労状況のバランスが重要になります。</p>

<h3>基準指数の主な区分</h3>
<ul>
<li>就労（月160時間以上）：13点</li>
<li>出産前後（産休育休）：10点</li>
<li>疾病・障害：7～10点</li>
<li>介護・看護：7～9点</li>
<li>災害復旧：13点</li>
<li>就学：9点</li>
<li>求職活動：内定7点/未定2点</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>大竹市のmin方式では、両親の点数差が大きいほど世帯の総合点が低くなります。両親ともバランスよく就労していることが重要です。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳細は<a href="https://www1.g-reiki.net/city.otake.hiroshima/reiki_honbun/m312RG00001089.html" target="_blank" rel="noopener">大竹市公式サイト</a>の利用調整基準をご確認ください。</p>
</div>`,
    publishedAt: "2026-06-09",
  },
  {
    slug: "otake-employment",
    citySlug: "otake",
    title: "大竹市の就労点数を徹底解説｜月160時間以上で最高13点",
    description:
      "大竹市の保育園入園選考における就労の基準指数を詳しく解説。月間就労時間別の段階評価と点数を紹介します。",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=400&fit=crop",
    category: "就労",
    categoryColor: "blue",
    content: `<h2>大竹市の就労点数</h2>
<p>大竹市では就労状況を<span class="highlight">月間就労時間</span>で評価し、複数段階で基準指数が決まります。</p>

<h3>就労の基準指数一覧</h3>
<table>
<thead><tr><th>就労時間</th><th>基準指数</th></tr></thead>
<tbody>
<tr><td>月160時間以上</td><td>13点</td></tr>
<tr><td>月140～160時間未満</td><td>11点</td></tr>
<tr><td>月120～140時間未満</td><td>9点</td></tr>
<tr><td>月80～120時間未満</td><td>7点</td></tr>
<tr><td>月48～80時間未満</td><td>6点</td></tr>
<tr><td>内職</td><td>5点</td></tr>
</tbody>
</table>

<h3>両親の就労点数の組み合わせ例</h3>
<p>min方式では低い方の点数が採用されます：</p>
<ul>
<li>両親ともフルタイム（月160時間以上）：13点が採用</li>
<li>一方がフルタイム、一方がパート（月80～120h）：7点が採用</li>
<li>両親ともパート（月140～160h）：11点が採用</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>大竹市では月48時間以上の就労が対象です。ただしmin方式なため、パートナーの時間が少ないと世帯全体の点数が下がることに注意が必要です。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>就労証明書の書式や提出方法は<a href="https://www1.g-reiki.net/city.otake.hiroshima/reiki_honbun/m312RG00001089.html" target="_blank" rel="noopener">大竹市公式サイト</a>でご確認ください。</p>
</div>`,
    publishedAt: "2026-06-09",
  },
  {
    slug: "otake-adjustment",
    citySlug: "otake",
    title: "大竹市の調整指数一覧｜ひとり親+3～4・きょうだい加点を解説",
    description:
      "大竹市の保育園入園選考における調整指数を完全解説。ひとり親世帯・多子世帯・育休明けの加点詳細をまとめました。",
    image:
      "https://images.unsplash.com/photo-1591035897819-f4bdf739f446?w=800&h=400&fit=crop",
    category: "加点・調整",
    categoryColor: "purple",
    content: `<h2>大竹市の調整指数</h2>
<p>大竹市は基準指数に加えて<span class="highlight">調整指数</span>を加算します。ひとり親世帯・きょうだい・多子世帯など様々な加点が設定されています。</p>

<h3>加点となる調整指数</h3>
<table>
<thead><tr><th>項目</th><th>調整指数</th></tr></thead>
<tbody>
<tr><td>ひとり親世帯（※1）</td><td>+3～4点</td></tr>
<tr><td>生活保護世帯</td><td>+4点</td></tr>
<tr><td>きょうだい同園</td><td>+4点</td></tr>
<tr><td>きょうだい別園</td><td>+3点</td></tr>
<tr><td>きょうだい同時申込</td><td>+2点</td></tr>
<tr><td>育休明け</td><td>+3点</td></tr>
<tr><td>保育士等（保育関連職）</td><td>+3点</td></tr>
<tr><td>児童障害</td><td>+2点</td></tr>
<tr><td>認可外保育施設利用</td><td>+2点</td></tr>
<tr><td>多子世帯（3人以上）</td><td>+1点</td></tr>
</tbody>
</table>

<h3>減点となる調整指数</h3>
<table>
<thead><tr><th>項目</th><th>調整指数</th></tr></thead>
<tbody>
<tr><td>同居親族あり</td><td>-2点</td></tr>
<tr><td>保育料滞納</td><td>-3点</td></tr>
</tbody>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>大竹市の調整指数は基準指数に比べると小さめですが、複数の加点が重複できるため組み合わせが重要です。特にきょうだい関連の加点を活用しましょう。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳細は<a href="https://www1.g-reiki.net/city.otake.hiroshima/reiki_honbun/m312RG00001089.html" target="_blank" rel="noopener">大竹市公式サイト</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-06-09",
  },
  {
    slug: "otake-sibling",
    citySlug: "otake",
    title: "大竹市のきょうだい加点｜同園+4・別園+3の活用法",
    description:
      "大竹市の保育園入園でのきょうだい加点を解説。同園なら+4点、別園なら+3点、同時申込で+2点の調整指数が加算されます。",
    image:
      "https://images.unsplash.com/photo-1471286174890-9c112ffca5b4?w=800&h=400&fit=crop",
    category: "きょうだい",
    categoryColor: "amber",
    content: `<h2>大竹市のきょうだい加点制度</h2>
<p>大竹市では、きょうだいが保育施設を利用している場合に<span class="highlight">調整指数の加点</span>があります。同園か別園かで加点が異なります。</p>

<h3>きょうだい関連の調整指数</h3>
<table>
<thead><tr><th>状況</th><th>調整指数</th></tr></thead>
<tbody>
<tr><td>きょうだいと同じ園を申込</td><td>+4点</td></tr>
<tr><td>きょうだいが別の認可保育施設に入所中</td><td>+3点</td></tr>
<tr><td>きょうだいと同時申込</td><td>+2点</td></tr>
</tbody>
</table>

<h3>具体的なシミュレーション</h3>
<p>例1：第2子がすでに入所中で、第3子が同じ園に申込</p>
<ul>
<li>基準指数（min方式で低い方）：例えば9点</li>
<li>きょうだい同園加点：+4点</li>
<li>合計：<strong>13点</strong></li>
</ul>

<p>例2：第2子がすでに別園に入所中で、第3子が申込</p>
<ul>
<li>基準指数：9点</li>
<li>きょうだい別園加点：+3点</li>
<li>合計：<strong>12点</strong></li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>大竹市ではきょうだいと同じ園への申込で+4点と、別園より優遇されています。保護者の利便性も考慮すれば、できるだけ同園を目指すのが良いでしょう。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳細は<a href="https://www1.g-reiki.net/city.otake.hiroshima/reiki_honbun/m312RG00001089.html" target="_blank" rel="noopener">大竹市公式サイト</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-06-09",
  },
  {
    slug: "otake-single-parent",
    citySlug: "otake",
    title: "大竹市のひとり親世帯優遇｜+3～4点の加点詳細",
    description:
      "大竹市のひとり親世帯向け調整指数を解説。状況に応じて+3点または+4点の加点がどのように選考に影響するかまとめました。",
    image:
      "https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=800&h=400&fit=crop",
    category: "ひとり親",
    categoryColor: "rose",
    content: `<h2>大竹市のひとり親世帯向け加点</h2>
<p>大竹市ではひとり親世帯に<span class="highlight">+3～4点の調整指数</span>が加算されます。生活保護世帯と同じ加点水準で優遇されています。</p>

<h3>ひとり親世帯の点数計算</h3>
<p>ひとり親でフルタイム就労（月160時間以上）の場合：</p>
<ul>
<li>基準指数（保護者1）：13点</li>
<li>ひとり親加点：+3～4点</li>
<li>合計：<strong>16～17点</strong></li>
</ul>

<p>一般的な両親フルタイム世帯のmin方式（13点）と比較すると、ひとり親でフルタイムなら明確に優先される仕組みです。</p>

<h3>他の加点との組み合わせ</h3>
<p>ひとり親+きょうだい同園の場合：13＋4＋4＝<strong>21点</strong>（ただし加点ルールを窓口で確認してください）</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>大竹市のひとり親加点は+3～4点と各自治体で異なります。状況に応じた正確な加点値は窓口で確認することをお勧めします。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳細は<a href="https://www1.g-reiki.net/city.otake.hiroshima/reiki_honbun/m312RG00001089.html" target="_blank" rel="noopener">大竹市公式サイト</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-06-09",
  },
  {
    slug: "otake-parental-leave",
    citySlug: "otake",
    title: "大竹市の育休明け加点｜+3点で復帰を優遇",
    description:
      "大竹市の産休・育児休業明けの調整指数を解説。+3点の加点により育休後の復帰を優遇する制度をまとめました。",
    image:
      "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=800&h=400&fit=crop",
    category: "育休復帰",
    categoryColor: "rose",
    content: `<h2>大竹市の産休・育休明け加点</h2>
<p>大竹市では産休・育児休業からの復帰時に<span class="highlight">+3点の調整指数</span>が加算されます。</p>

<h3>産休・育休明けの調整指数</h3>
<p>育休からの復帰により保育園への需要が生じた場合、一律で+3点が加算されます。</p>

<h3>育休復帰の計算例</h3>
<p>例：両親フルタイムで育休明けの場合</p>
<ul>
<li>基準指数（min方式で低い方）：13点</li>
<li>育休明け加点：+3点</li>
<li>合計：<strong>16点</strong></li>
</ul>

<p>育休から復帰する際の保育園入園を支援する加点です。</p>

<h3>他の加点との組み合わせ</h3>
<p>育休明け+きょうだい同園の場合：13＋3＋4＝<strong>20点</strong></p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>大竹市の育休明け加点+3点は、出産や育児のため一時的に退職した親が仕事復帰する際の支援制度です。育休終了予定時期に合わせた申込みが重要です。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳細は<a href="https://www1.g-reiki.net/city.otake.hiroshima/reiki_honbun/m312RG00001089.html" target="_blank" rel="noopener">大竹市公式サイト</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-06-09",
  },
  {
    slug: "otake-deduction",
    citySlug: "otake",
    title: "大竹市の減点項目｜同居親族-2・保育料滞納-3の影響",
    description:
      "大竹市の保育園入園選考で減点となる項目を解説。同居親族と保育料滞納が減点対象になります。",
    image:
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=400&fit=crop",
    category: "減点・注意",
    categoryColor: "rose",
    content: `<h2>大竹市の減点項目</h2>
<p>大竹市では<span class="highlight">同居親族の有無</span>と<span class="highlight">保育料の滞納</span>が調整指数で減点されます。</p>

<h3>減点となる調整指数</h3>
<table>
<thead><tr><th>項目</th><th>調整指数</th></tr></thead>
<tbody>
<tr><td>同居親族あり（祖父母など）</td><td>-2点</td></tr>
<tr><td>保育料滞納</td><td>-3点</td></tr>
</tbody>
</table>

<h3>減点の影響</h3>
<p>例1：両親フルタイム+きょうだい同園+同居親族</p>
<ul>
<li>基準指数：13点</li>
<li>きょうだい加点：+4点</li>
<li>同居親族減点：-2点</li>
<li>合計：<strong>15点</strong></li>
</ul>

<p>例2：保育料滞納がある場合</p>
<ul>
<li>基準指数：13点</li>
<li>保育料滞納減点：-3点</li>
<li>合計：<strong>10点</strong></li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>大竹市では同居親族がいると-2点の減点があります。祖父母の同居による保育サポート能力があると判断されるためです。保育料の滞納は-3点と大きな減点なので、必ず期限内に納付しましょう。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳細は<a href="https://www1.g-reiki.net/city.otake.hiroshima/reiki_honbun/m312RG00001089.html" target="_blank" rel="noopener">大竹市公式サイト</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-06-09",
  },
  {
    slug: "otake-schedule",
    citySlug: "otake",
    title: "大竹市の保育園申込スケジュール｜申請時期と入園までの流れ",
    description:
      "大竹市の保育園入園申込みの時期や手順を解説。4月一斉入所と途中入所それぞれのスケジュールをまとめました。",
    image:
      "https://images.unsplash.com/photo-1506784365847-bbad939e9335?w=800&h=400&fit=crop",
    category: "スケジュール",
    categoryColor: "blue",
    content: `<h2>大竹市の保育園申込スケジュール</h2>
<p>大竹市の保育園入園には<span class="highlight">4月一斉入所</span>と<span class="highlight">途中入所</span>の2つの申込時期があります。</p>

<h3>4月一斉入所の目安</h3>
<ul>
<li>申込受付：前年10月～11月頃</li>
<li>利用調整（選考）：11月～1月</li>
<li>結果通知：2月頃</li>
<li>入園：4月1日</li>
</ul>

<h3>途中入所</h3>
<ul>
<li>申込：入所希望月の前月までに窓口へ</li>
<li>空き状況により随時利用調整</li>
<li>選考は4月入所と同じmin方式を適用</li>
</ul>

<h3>必要書類</h3>
<ul>
<li>保育園利用申込書</li>
<li>就労証明書（就労の場合）</li>
<li>診断書等（疾病・障害の場合）</li>
<li>その他該当する証明書類</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>大竹市の4月入所は競争率が高いため、前年度の秋に早めの申込みが重要です。ただしmin方式なため、両親ともバランスよく就労していることを示すことが大切です。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>最新のスケジュールは<a href="https://www1.g-reiki.net/city.otake.hiroshima/reiki_honbun/m312RG00001089.html" target="_blank" rel="noopener">大竹市公式サイト</a>でご確認ください。</p>
</div>`,
    publishedAt: "2026-06-09",
  },
  {
    slug: "otake-min-method",
    citySlug: "otake",
    title: "大竹市のmin方式を解説｜低い方の点数が適用される仕組み",
    description:
      "大竹市特有のmin方式の詳細解説。父母のうち基準点数の低い方が世帯の点数となる仕組みと対策をまとめました。",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=400&fit=crop",
    category: "制度の理解",
    categoryColor: "teal",
    content: `<h2>大竹市のmin方式を完全解説</h2>
<p>大竹市は<span class="highlight">min方式（最小値方式）</span>を採用した珍しい自治体です。この仕組みを理解することが保活成功の鍵です。</p>

<h3>min方式とは何か</h3>
<p>min方式では、父母2人の基準指数を比較し、<strong>点数の低い方</strong>を世帯の基準指数として採用します。例えば：</p>
<ul>
<li>父：月160h以上（13点）、母：月80～120h（7点）→ 世帯の基準指数は7点</li>
<li>父：月140～160h（11点）、母：月140～160h（11点）→ 世帯の基準指数は11点</li>
</ul>

<h3>他の方式との比較</h3>
<table>
<thead><tr><th>方式</th><th>特徴</th><th>大竹市例</th></tr></thead>
<tbody>
<tr><td>合計方式</td><td>両親の点数を足す</td><td>13+13=26点</td></tr>
<tr><td>min方式</td><td>低い方の点数を採用</td><td>13と13なら13点</td></tr>
<tr><td>max方式</td><td>高い方の点数を採用</td><td>13と7なら13点</td></tr>
</tbody>
</table>

<h3>min方式での戦略</h3>
<p>min方式では両親の就労時間をバランスよく整える必要があります：</p>
<ul>
<li>フルタイム+パート少なめ（7点）：世帯7点</li>
<li>フルタイム+パート中程度（11点）：世帯11点</li>
<li>フルタイム+フルタイム（13点）：世帯13点</li>
</ul>

<h3>重要な注意点</h3>
<p>min方式では「低い方の親の就労時間を増やす」ことが最優先です。高い方をいくら増やしても点数は上がりません。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>大竹市のmin方式は保活戦略を大きく変えます。どちらか一方だけが全力で仕事をするのではなく、両親ともある程度の就労が必要になります。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳細は<a href="https://www1.g-reiki.net/city.otake.hiroshima/reiki_honbun/m312RG00001089.html" target="_blank" rel="noopener">大竹市公式サイト</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-06-09",
  },
  {
    slug: "otake-comparison",
    citySlug: "otake",
    title: "大竹市と広島県内の他市を比較｜min方式の特殊性を理解",
    description:
      "大竹市のmin方式を広島県内の他の自治体と比較。点数制度の違いと特徴、大竹市特有の仕組みをまとめました。",
    image:
      "https://images.unsplash.com/photo-1543286386-713bdd548da4?w=800&h=400&fit=crop",
    category: "比較",
    categoryColor: "teal",
    content: `<h2>大竹市と広島県内他市の比較</h2>
<p>大竹市の点数制度を<span class="highlight">広島県内の他の自治体</span>と比較してみましょう。min方式は珍しい制度です。</p>

<h3>基準指数の最大値の比較</h3>
<table>
<thead><tr><th>自治体</th><th>方式</th><th>基準指数（1人分）</th><th>フルタイム時点数</th></tr></thead>
<tbody>
<tr><td>大竹市</td><td>min方式</td><td>最大13点</td><td>13点（月160h+）</td></tr>
<tr><td>広島市</td><td>加点・減点制</td><td>合計方式</td><td>10点</td></tr>
<tr><td>呉市</td><td>標準方式</td><td>10点</td><td>10点</td></tr>
<tr><td>三原市</td><td>標準方式</td><td>10点</td><td>10点</td></tr>
</tbody>
</table>

<h3>方式の特徴の比較</h3>
<table>
<thead><tr><th>自治体</th><th>方式の特徴</th><th>親の就労バランス</th></tr></thead>
<tbody>
<tr><td>大竹市</td><td>min方式（低い方を採用）</td><td>両親ともバランス必須</td></tr>
<tr><td>広島市</td><td>合計方式</td><td>一方の就労で対応可能</td></tr>
<tr><td>呉市</td><td>標準方式</td><td>一方の就労で対応可能</td></tr>
</tbody>
</table>

<h3>具体的な点数比較例</h3>
<p>両親フルタイムの場合：</p>
<ul>
<li>大竹市（min方式）：13点</li>
<li>広島市（合計方式）：20点</li>
</ul>

<p>フルタイム+パート（月80～120h）の場合：</p>
<ul>
<li>大竹市（min方式）：7点（低い方を採用）</li>
<li>広島市（合計方式）：17点</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>大竹市のmin方式は広島県内でも独特です。転居や他市への比較の際は、単純な点数では判断できず、方式の違いを理解することが重要です。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>各自治体の最新情報は公式サイトでご確認ください。大竹市の詳細は<a href="https://www1.g-reiki.net/city.otake.hiroshima/reiki_honbun/m312RG00001089.html" target="_blank" rel="noopener">こちら</a>です。</p>
</div>`,
    publishedAt: "2026-06-09",
  },
];

registerArticles(otakeArticles);
