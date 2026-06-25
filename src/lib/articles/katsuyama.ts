import type { Article } from "./types";
import { registerArticles } from "./index";

const katsuyamaArticles: Article[] = [
  {
    slug: "katsuyama-guide",
    citySlug: "katsuyama",
    title: "勝山市の保活ガイド｜sum方式の基準指数と入園の基本",
    description:
      "勝山市の保育園入園選考で使われるsum方式（合計方式）と基準指数を解説。保護者の点数を合算する仕組みをまとめました。",
    image:
      "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>勝山市の保育園入園制度</h2>
<p>勝山市の保育園入園選考は<span class="highlight">sum方式（合計方式）</span>を採用しています。保護者2人の基準指数を合計し、その合計に調整指数を加えて世帯の選考点を決定します。maxBasePointsは20点（各保護者最大10点）に設定されています。</p>

<h3>sum方式とは</h3>
<p>勝山市ではsum方式により父母2人の基準指数を<strong>合計する</strong>方式です。例えば一方が10点、もう一方が8点の場合は18点が世帯の基準指数となります。このため、どちらか一方が高い就労状況であれば有利になる仕組みです。</p>

<h3>基準指数の主な区分</h3>
<ul>
<li>家庭外就労（月140時間以上）：10点</li>
<li>家庭外就労（月120時間以上）：9点</li>
<li>家庭外就労（月80時間以上）：8点</li>
<li>家庭外就労（月48時間以上）：7点</li>
<li>出産前後（産休育休）：8点</li>
<li>災害復旧：10点</li>
<li>虐待・DV：15点</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>勝山市のsum方式では、両親の点数を合計するため、一方がパートで低い点数でも、もう一方がフルタイムなら合計点が高くなります。合計点の最大値は20点（各親10点）です。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳細は勝山市公式サイトの利用調整基準をご確認ください。</p>
</div>`,
    publishedAt: "2026-06-09",
  },
  {
    slug: "katsuyama-employment",
    citySlug: "katsuyama",
    title: "勝山市の就労点数を徹底解説｜月140時間以上で最高10点",
    description:
      "勝山市の保育園入園選考における就労の基準指数を詳しく解説。月間就労時間別の段階評価と点数を紹介します。",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=400&fit=crop",
    category: "就労",
    categoryColor: "blue",
    content: `<h2>勝山市の就労点数</h2>
<p>勝山市では就労状況を<span class="highlight">月間就労時間</span>で評価し、複数段階で基準指数が決まります。各親の最大点数は10点です。</p>

<h3>家庭外就労の基準指数</h3>
<table>
<thead><tr><th>就労時間</th><th>基準指数</th></tr></thead>
<tbody>
<tr><td>月140時間以上</td><td>10点</td></tr>
<tr><td>月120時間以上140時間未満</td><td>9点</td></tr>
<tr><td>月80時間以上120時間未満</td><td>8点</td></tr>
<tr><td>月48時間以上80時間未満</td><td>7点</td></tr>
</tbody>
</table>

<h3>内職の基準指数</h3>
<table>
<thead><tr><th>就労時間</th><th>基準指数</th></tr></thead>
<tbody>
<tr><td>月120時間以上</td><td>6点</td></tr>
<tr><td>月80時間以上120時間未満</td><td>5点</td></tr>
<tr><td>月48時間以上80時間未満</td><td>4点</td></tr>
</tbody>
</table>

<h3>具体的なシミュレーション</h3>
<p>両親ともフルタイム（月140時間以上）：10点+10点＝<strong>20点</strong></p>
<p>フルタイム+パート（月80～120h）：10点+8点＝<strong>18点</strong></p>
<p>フルタイム+内職（月120h以上）：10点+6点＝<strong>16点</strong></p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>勝山市では月48時間以上の就労が対象です。sum方式のため、一方の親が高い点数であれば合計点が有利になります。内職は家庭外就労より低めの評価となります。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>就労証明書の書式や提出方法は勝山市公式サイトでご確認ください。</p>
</div>`,
    publishedAt: "2026-06-09",
  },
  {
    slug: "katsuyama-home-business",
    citySlug: "katsuyama",
    title: "勝山市の家庭内自営業｜中心者と協力者で異なる点数",
    description:
      "勝山市の保育園入園選考における家庭内自営業（自営業）の点数を解説。中心者と協力者の区分と加点をまとめました。",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=400&fit=crop",
    category: "自営業",
    categoryColor: "amber",
    content: `<h2>勝山市の家庭内自営業の点数</h2>
<p>勝山市では家庭内自営業（自営業）の場合、<span class="highlight">中心者と協力者で異なる点数</span>が適用されます。</p>

<h3>家庭内自営業の基準指数</h3>
<table>
<thead><tr><th>状況</th><th>就労時間</th><th>基準指数</th></tr></thead>
<tbody>
<tr><td>中心者</td><td>月140時間以上</td><td>10点</td></tr>
<tr><td>中心者</td><td>月120時間以上</td><td>9点</td></tr>
<tr><td>中心者</td><td>月80時間以上</td><td>8点</td></tr>
<tr><td>中心者</td><td>月48時間以上</td><td>7点</td></tr>
<tr><td>協力者</td><td>月140時間以上</td><td>8点</td></tr>
<tr><td>協力者</td><td>月120時間以上</td><td>7点</td></tr>
<tr><td>協力者</td><td>月80時間以上</td><td>6点</td></tr>
<tr><td>協力者</td><td>月48時間以上</td><td>5点</td></tr>
</tbody>
</table>

<h3>中心者と協力者の区分</h3>
<p>家庭内自営業では、その事業の主となる親が「中心者」、補助的に関わる親が「協力者」と判定されます。例えば夫がメイン事業者で妻が手伝う場合、夫が中心者、妻が協力者となります。</p>

<h3>具体的な計算例</h3>
<p>例：父が自営業中心者（月140h以上）、母が協力者（月80h以上）</p>
<ul>
<li>父の基準指数（中心者）：10点</li>
<li>母の基準指数（協力者）：6点</li>
<li>合計：<strong>16点</strong></li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>勝山市では家庭内自営業の協力者は、同じ就労時間でも中心者より低い点数が適用されます。申請時に自分たちの役割を明確にして申告することが重要です。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳細は勝山市公式サイトをご確認ください。</p>
</div>`,
    publishedAt: "2026-06-09",
  },
  {
    slug: "katsuyama-special-circumstances",
    citySlug: "katsuyama",
    title: "勝山市の特別事由｜出産・災害・虐待DV対応の基準指数",
    description:
      "勝山市の保育園入園選考における特別事由の基準指数を解説。出産・災害・虐待/DV などの場合の評価をまとめました。",
    image:
      "https://images.unsplash.com/photo-1470114716159-e389f8712fda?w=800&h=400&fit=crop",
    category: "特別事由",
    categoryColor: "rose",
    content: `<h2>勝山市の特別事由対応</h2>
<p>勝山市では通常の就労以外に、<span class="highlight">出産・災害・虐待・DV</span>などの特別事由に対応した基準指数があります。</p>

<h3>特別事由の基準指数</h3>
<table>
<thead><tr><th>事由</th><th>基準指数</th></tr></thead>
<tbody>
<tr><td>出産前後（産休育休）</td><td>8点</td></tr>
<tr><td>災害復旧</td><td>10点</td></tr>
<tr><td>虐待・DV対応</td><td>15点</td></tr>
</tbody>
</table>

<h3>各事由の説明</h3>
<p><strong>出産前後（産休育休）</strong></p>
<p>妊娠中や産後の回復期、育児休業中に保育園の利用を申し込む場合に8点が評価されます。</p>

<p><strong>災害復旧</strong></p>
<p>火災・地震などの災害による住宅損失や生計維持のための復旧作業が必要な場合に10点が評価されます。</p>

<p><strong>虐待・DV対応</strong></p>
<p>児童虐待またはドメスティック・バイオレンスの対応として保育園利用が必要な場合に15点と最高得点が評価されます。これは世帯が最優先される仕組みです。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>勝山市では虐待・DV対応に最高の15点を配置しており、子どもの安全確保と母親（被害者）の保護を最優先する仕組みになっています。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳細は勝山市公式サイトをご確認ください。</p>
</div>`,
    publishedAt: "2026-06-09",
  },
  {
    slug: "katsuyama-adjustment",
    citySlug: "katsuyama",
    title: "勝山市の調整指数一覧｜ひとり親+10・きょうだい+2を解説",
    description:
      "勝山市の保育園入園選考における調整指数を完全解説。ひとり親世帯・多子世帯・失業などの加点詳細をまとめました。",
    image:
      "https://images.unsplash.com/photo-1591035897819-f4bdf739f446?w=800&h=400&fit=crop",
    category: "加点・調整",
    categoryColor: "purple",
    content: `<h2>勝山市の調整指数</h2>
<p>勝山市は基準指数に加えて<span class="highlight">調整指数</span>を加算します。ひとり親世帯・失業・障害・きょうだい・保育士など様々な加点が設定されています。</p>

<h3>加点となる調整指数</h3>
<table>
<thead><tr><th>項目</th><th>調整指数</th></tr></thead>
<tbody>
<tr><td>ひとり親世帯</td><td>+10点</td></tr>
<tr><td>生活保護世帯就労</td><td>+5点</td></tr>
<tr><td>失業・求職中</td><td>+5点</td></tr>
<tr><td>子ども障害</td><td>+3点</td></tr>
<tr><td>継続児（兄弟姉妹が同施設入所中）</td><td>+3点</td></tr>
<tr><td>育休明け</td><td>+2点</td></tr>
<tr><td>きょうだい同施設</td><td>+2点</td></tr>
<tr><td>小規模卒園</td><td>+2点</td></tr>
<tr><td>保育士</td><td>+2点</td></tr>
<tr><td>第3子以降</td><td>+1点</td></tr>
</tbody>
</table>

<h3>減点となる調整指数</h3>
<table>
<thead><tr><th>項目</th><th>調整指数</th></tr></thead>
<tbody>
<tr><td>祖父母同居（60歳未満）/人</td><td>-3点</td></tr>
<tr><td>祖父母同居（60歳以上65歳未満）/人</td><td>-2点</td></tr>
<tr><td>保育料未納/月</td><td>-2点</td></tr>
</tbody>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>勝山市のひとり親加点は+10点と非常に大きく、ひとり親フルタイム就労なら基準指数10点+ひとり親10点＝20点と最高点を目指せます。複数の加点が重複できる仕組みです。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳細は勝山市公式サイトをご確認ください。</p>
</div>`,
    publishedAt: "2026-06-09",
  },
  {
    slug: "katsuyama-single-parent",
    citySlug: "katsuyama",
    title: "勝山市のひとり親世帯優遇｜+10点で大幅加点",
    description:
      "勝山市のひとり親世帯向け調整指数を解説。+10点の加点により、フルタイム就労で最高点を目指せる優遇制度をまとめました。",
    image:
      "https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=800&h=400&fit=crop",
    category: "ひとり親",
    categoryColor: "rose",
    content: `<h2>勝山市のひとり親世帯向け加点</h2>
<p>勝山市ではひとり親世帯に<span class="highlight">+10点の調整指数</span>が加算されます。これは非常に手厚い優遇制度です。</p>

<h3>ひとり親世帯の点数計算</h3>
<p>ひとり親でフルタイム就労（月140時間以上）の場合：</p>
<ul>
<li>基準指数（親1人）：10点</li>
<li>ひとり親加点：+10点</li>
<li>合計：<strong>20点</strong></li>
</ul>

<p>これは勝山市の最高点です。ひとり親でフルタイム就労であれば、保育園入園で大きく優先されます。</p>

<h3>ひとり親+他の加点の組み合わせ例</h3>
<p>例1：ひとり親フルタイム+第3子</p>
<ul>
<li>基準指数：10点</li>
<li>ひとり親加点：+10点</li>
<li>第3子加点：+1点</li>
<li>合計：<strong>21点</strong></li>
</ul>

<p>例2：ひとり親フルタイム+きょうだい同施設</p>
<ul>
<li>基準指数：10点</li>
<li>ひとり親加点：+10点</li>
<li>きょうだい同施設加点：+2点</li>
<li>合計：<strong>22点</strong></li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>勝山市のひとり親加点+10点は全国的に見ても手厚い支援です。ひとり親世帯ならば、フルタイム就労を目指すことで高い選考点を期待できます。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳細は勝山市公式サイトをご確認ください。</p>
</div>`,
    publishedAt: "2026-06-09",
  },
  {
    slug: "katsuyama-siblings",
    citySlug: "katsuyama",
    title: "勝山市のきょうだい加点｜同施設+2・継続児+3を活用",
    description:
      "勝山市の保育園入園でのきょうだい関連加点を解説。同施設なら+2点、継続児なら+3点の調整指数が加算されます。",
    image:
      "https://images.unsplash.com/photo-1471286174890-9c112ffca5b4?w=800&h=400&fit=crop",
    category: "きょうだい",
    categoryColor: "amber",
    content: `<h2>勝山市のきょうだい加点制度</h2>
<p>勝山市では、きょうだいが保育施設を利用している場合に<span class="highlight">調整指数の加点</span>があります。継続児と同施設で加点が異なります。</p>

<h3>きょうだい関連の調整指数</h3>
<table>
<thead><tr><th>状況</th><th>調整指数</th></tr></thead>
<tbody>
<tr><td>継続児（兄弟姉妹が同施設入所中）</td><td>+3点</td></tr>
<tr><td>きょうだい同施設</td><td>+2点</td></tr>
</tbody>
</table>

<h3>継続児と同施設の区分</h3>
<p><strong>継続児</strong>：兄弟姉妹がすでに同じ施設に入所中で、弟妹が新たに入園する場合</p>
<p><strong>きょうだい同施設</strong>：同じ施設への申込を希望している場合</p>

<h3>具体的なシミュレーション</h3>
<p>例1：第2子がすでに入所中で、第3子が同じ園に申込（継続児）</p>
<ul>
<li>基準指数（両親合計）：18点</li>
<li>継続児加点：+3点</li>
<li>合計：<strong>21点</strong></li>
</ul>

<p>例2：第2子と同時申込できょうだい同施設</p>
<ul>
<li>基準指数：18点</li>
<li>きょうだい同施設加点：+2点</li>
<li>合計：<strong>20点</strong></li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>勝山市では継続児（すでに兄弟が入所中）の方が、同時申込より+1点多く評価されます。きょうだいの入園タイミングを活用しましょう。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳細は勝山市公式サイトをご確認ください。</p>
</div>`,
    publishedAt: "2026-06-09",
  },
  {
    slug: "katsuyama-grandparents",
    citySlug: "katsuyama",
    title: "勝山市の祖父母同居による減点｜年齢で異なる-3/-2点",
    description:
      "勝山市の保育園入園選考で祖父母同居による減点を解説。年齢別の減点ルールと計算方法をまとめました。",
    image:
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=400&fit=crop",
    category: "減点・注意",
    categoryColor: "rose",
    content: `<h2>勝山市の祖父母同居減点</h2>
<p>勝山市では<span class="highlight">祖父母が同居している場合</span>に調整指数で減点されます。祖父母の年齢により減点額が異なります。</p>

<h3>祖父母同居の減点基準</h3>
<table>
<thead><tr><th>祖父母年齢</th><th>1人あたり減点</th></tr></thead>
<tbody>
<tr><td>60歳未満</td><td>-3点/人</td></tr>
<tr><td>60歳以上65歳未満</td><td>-2点/人</td></tr>
<tr><td>65歳以上</td><td>減点なし</td></tr>
</tbody>
</table>

<h3>減点の計算例</h3>
<p>例1：両親フルタイム+祖父母同居（祖父60歳未満、祖母62歳）</p>
<ul>
<li>基準指数：20点</li>
<li>祖父減点（60歳未満）：-3点</li>
<li>祖母減点（60～65歳）：-2点</li>
<li>合計：<strong>15点</strong></li>
</ul>

<p>例2：両親フルタイム+祖父母同居（両者65歳以上）</p>
<ul>
<li>基準指数：20点</li>
<li>祖父母減点：なし</li>
<li>合計：<strong>20点</strong></li>
</ul>

<h3>減点の理由</h3>
<p>勝山市では祖父母同居がある場合、保育サポート能力があると判断し減点する仕組みです。ただし65歳以上は減点されません。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>祖父母が60歳未満で同居していると-3点と大きな減点になります。祖父母の年齢を確認して、申請時に正確に報告することが重要です。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳細は勝山市公式サイトをご確認ください。</p>
</div>`,
    publishedAt: "2026-06-09",
  },
  {
    slug: "katsuyama-multi-child",
    citySlug: "katsuyama",
    title: "勝山市の多子世帯優遇｜第3子+1点で兄弟姉妹を支援",
    description:
      "勝山市の保育園入園選考における多子世帯の加点を解説。第3子以降の+1点加点制度をまとめました。",
    image:
      "https://images.unsplash.com/photo-1566276582328-cfd42eda529a?w=800&h=400&fit=crop",
    category: "多子世帯",
    categoryColor: "teal",
    content: `<h2>勝山市の多子世帯優遇</h2>
<p>勝山市では<span class="highlight">第3子以降</span>の申込みに調整指数で+1点の加点があります。</p>

<h3>多子世帯の加点</h3>
<table>
<thead><tr><th>子どもの順番</th><th>調整指数</th></tr></thead>
<tbody>
<tr><td>第1子・第2子</td><td>なし</td></tr>
<tr><td>第3子以降</td><td>+1点</td></tr>
</tbody>
</table>

<h3>計算例</h3>
<p>例1：両親フルタイムで第3子の入園申込</p>
<ul>
<li>基準指数：20点</li>
<li>第3子加点：+1点</li>
<li>合計：<strong>21点</strong></li>
</ul>

<p>例2：両親フルタイム+ひとり親ではなく+第3子</p>
<ul>
<li>基準指数：20点</li>
<li>第3子加点：+1点</li>
<li>合計：<strong>21点</strong></li>
</ul>

<h3>ひとり親+第3子の組み合わせ</h3>
<p>ひとり親フルタイム+第3子の場合：</p>
<ul>
<li>基準指数：10点</li>
<li>ひとり親加点：+10点</li>
<li>第3子加点：+1点</li>
<li>合計：<strong>21点</strong></li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>勝山市の第3子加点は+1点と小さめですが、複数の加点と組み合わせることで効果があります。兄弟姉妹の入園をまとめて進める際の戦略が重要です。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳細は勝山市公式サイトをご確認ください。</p>
</div>`,
    publishedAt: "2026-06-09",
  },
  {
    slug: "katsuyama-sum-method",
    citySlug: "katsuyama",
    title: "勝山市のsum方式を解説｜基準指数の合計で計算される仕組み",
    description:
      "勝山市特有のsum方式の詳細解説。父母の基準指数を合算する仕組みと最大値20点を目指す戦略をまとめました。",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=400&fit=crop",
    category: "制度の理解",
    categoryColor: "teal",
    content: `<h2>勝山市のsum方式を完全解説</h2>
<p>勝山市は<span class="highlight">sum方式（合計方式）</span>を採用しています。この仕組みを理解することが保活成功の鍵です。</p>

<h3>sum方式とは何か</h3>
<p>sum方式では、父母2人の基準指数を<strong>合計する</strong>方式です。例えば：</p>
<ul>
<li>父：月140h以上（10点）、母：月80～120h（8点）→ 世帯の基準指数は18点</li>
<li>父：月140h以上（10点）、母：月140h以上（10点）→ 世帯の基準指数は20点</li>
</ul>

<p>maxBasePointsは20点に設定されており、各親の最大値は10点です。</p>

<h3>他の方式との比較</h3>
<table>
<thead><tr><th>方式</th><th>特徴</th><th>勝山市例</th></tr></thead>
<tbody>
<tr><td>合計方式（sum）</td><td>両親の点数を足す</td><td>10+10=20点</td></tr>
<tr><td>最小値方式（min）</td><td>低い方の点数を採用</td><td>10と10なら10点</td></tr>
<tr><td>最大値方式（max）</td><td>高い方の点数を採用</td><td>10と8なら10点</td></tr>
</tbody>
</table>

<h3>sum方式での戦略</h3>
<p>sum方式では両親の合計点が重要です：</p>
<ul>
<li>フルタイム+フルタイム：20点（最高）</li>
<li>フルタイム+パート中程度：18点</li>
<li>フルタイム+パート少なめ：17点</li>
<li>パート+パート：14～16点</li>
</ul>

<h3>重要な特徴</h3>
<p>sum方式では「どちらか一方だけが頑張る」のではなく「両親の合計」が評価されます。一方がパートでも、もう一方がフルタイムなら合計は高くなります。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>勝山市のsum方式は一方の親の就労状況が低くても、もう一方がカバーできる柔軟な制度です。両親で協力して合計点を高めることが重要です。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳細は勝山市公式サイトをご確認ください。</p>
</div>`,
    publishedAt: "2026-06-09",
  },
];

registerArticles(katsuyamaArticles);
