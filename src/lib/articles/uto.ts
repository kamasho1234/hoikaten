import type { Article } from "./types";
import { registerArticles } from "./index";

const utoArticles: Article[] = [
  {
    slug: "uto-guide",
    citySlug: "uto",
    title: "宇土市の保活ガイド｜sum方式の基準指数と入園の基本",
    description:
      "宇土市の保育園入園選考で使われるsum方式と基準指数を解説。両保護者の点数を合算して世帯の選考点を決定する仕組みをまとめました。",
    image:
      "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>宇土市の保育園入園制度</h2>
<p>宇土市の保育園入園選考は<span class="highlight">sum方式</span>を採用しています。両保護者の基準指数を合算し、その合計に調整指数を加えて世帯の選考点を決定します。最大基準指数は各保護者20点までで、世帯では最大40点になります。</p>

<h3>sum方式とは</h3>
<p>宇土市では父母2人の基準指数を<strong>足し合わせる</strong>方式です。例えば一方が20点、もう一方が15点の場合は35点が世帯の基準指数となります。このため、両親の就労状況を合わせて評価する仕組みです。</p>

<h3>基準指数の主な区分</h3>
<ul>
<li>居宅外労働（フルタイム）：月20日×8時間で20点</li>
<li>居宅外労働（その他）：10点</li>
<li>居宅内労働：上記より1点低い（19点～9点）</li>
<li>出産前後（産休育休）：15点</li>
<li>疾病・障害：最大20点</li>
<li>介護・看護：最大20点</li>
<li>災害復旧：20点</li>
<li>通学：16点</li>
<li>求職活動：6点</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>宇土市のsum方式では、両親の点数を合算するため一方が高い点数なら世帯の総合点が高くなります。特に居宅外労働で20点を獲得できれば、世帯の競争力が大きく向上します。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳細は<a href="https://www.city.uto.kumamoto.jp/" target="_blank" rel="noopener">宇土市公式サイト</a>の利用調整基準をご確認ください。</p>
</div>`,
    publishedAt: "2026-06-09",
  },
  {
    slug: "uto-employment-grid",
    citySlug: "uto",
    title: "宇土市の就労点数を徹底解説｜月20日×8時間グリッド評価",
    description:
      "宇土市の保育園入園選考における就労の基準指数を詳しく解説。居宅外労働・居宅内労働の日数×時間グリッド評価と点数を紹介します。",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=400&fit=crop",
    category: "就労",
    categoryColor: "blue",
    content: `<h2>宇土市の就労点数｜グリッド評価システム</h2>
<p>宇土市では就労状況を<span class="highlight">日数×時間のグリッド評価</span>で判定します。月20日×8時間（フルタイム相当）で最高20点となります。</p>

<h3>居宅外労働の基準指数</h3>
<table>
<thead><tr><th>勤務形態</th><th>基準指数</th><th>要件</th></tr></thead>
<tbody>
<tr><td>フルタイム（最高）</td><td>20点</td><td>月20日×8時間相当</td></tr>
<tr><td>その他の就労</td><td>10点</td><td>上記以外</td></tr>
</tbody>
</table>

<h3>居宅内労働の基準指数</h3>
<p>自営業や家業の場合は、居宅外労働より1点低くなります：</p>
<table>
<thead><tr><th>勤務形態</th><th>基準指数</th><th>要件</th></tr></thead>
<tbody>
<tr><td>居宅内フルタイム</td><td>19点</td><td>月20日×8時間相当</td></tr>
<tr><td>その他の居宅内労働</td><td>9点</td><td>上記以外</td></tr>
</tbody>
</table>

<h3>両親の就労点数の組み合わせ例</h3>
<ul>
<li>両親ともフルタイム（居宅外）：20+20=40点（最高点）</li>
<li>一方フルタイム、一方パート：20+10=30点</li>
<li>一方フルタイム、一方居宅内労働：20+19=39点</li>
<li>両親ともパート：10+10=20点</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>宇土市では月20日×8時間のフルタイム基準が明確です。両親がこのボーダーを超えられるかどうかで20点と10点の大きな差が生じます。居宅内労働は1点低くなるため、可能なら居宅外での勤務が有利です。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>就労証明書の書式や提出方法は<a href="https://www.city.uto.kumamoto.jp/" target="_blank" rel="noopener">宇土市公式サイト</a>でご確認ください。</p>
</div>`,
    publishedAt: "2026-06-09",
  },
  {
    slug: "uto-adjustment",
    citySlug: "uto",
    title: "宇土市の調整指数一覧｜保育士加点+20は最強の優遇",
    description:
      "宇土市の保育園入園選考における調整指数を完全解説。保育士加点+20、小規模卒園+10、きょうだい在園+8、育休復職+4などの詳細をまとめました。",
    image:
      "https://images.unsplash.com/photo-1591035897819-f4bdf739f446?w=800&h=400&fit=crop",
    category: "加点・調整",
    categoryColor: "purple",
    content: `<h2>宇土市の調整指数｜保育士加点が最も優遇</h2>
<p>宇土市は基準指数に加えて<span class="highlight">調整指数</span>を加算します。保育士加点+20は特に強力な優遇です。</p>

<h3>加点となる調整指数一覧</h3>
<table>
<thead><tr><th>項目</th><th>調整指数</th><th>説明</th></tr></thead>
<tbody>
<tr><td>保育士（保育関連職）</td><td>+20点</td><td>最強の加点</td></tr>
<tr><td>小規模保育卒園児</td><td>+10点</td><td>地域型保育からの進学</td></tr>
<tr><td>こども園切替</td><td>+10点</td><td>幼稚園からの変更</td></tr>
<tr><td>きょうだい在園</td><td>+8点</td><td>同園または別園に兄弟がいる場合</td></tr>
<tr><td>育休復職</td><td>+4点</td><td>育休からの復帰</td></tr>
<tr><td>生活保護世帯</td><td>+2点</td><td>生保受給中</td></tr>
</tbody>
</table>

<h3>減点となる調整指数</h3>
<table>
<thead><tr><th>項目</th><th>調整指数</th><th>説明</th></tr></thead>
<tbody>
<tr><td>保育料滞納</td><td>-20点</td><td>非常に大きな減点</td></tr>
<tr><td>祖父母保育可能</td><td>-2点</td><td>同居親族による保育が可能な場合</td></tr>
</tbody>
</table>

<h3>加点の重要性</h3>
<p>基準指数20点+調整指数+20（保育士）=40点が世帯で実現可能な最高点です。保育関連職であれば大幅に有利になります。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>宇土市の調整指数は基準指数より大きく、複数の加点が重複できます。特に保育士加点+20は決定的です。きょうだい在園+8、小規模卒園+10など複数組み合わせることで20点以上の加点も可能です。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳細は<a href="https://www.city.uto.kumamoto.jp/" target="_blank" rel="noopener">宇土市公式サイト</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-06-09",
  },
  {
    slug: "uto-childcare-staff",
    citySlug: "uto",
    title: "宇土市の保育士加点｜+20は最強のアドバンテージ",
    description:
      "宇土市の保育園入園選考における保育士加点を解説。+20点という大幅な加点により、保育関連職は非常に有利になります。",
    image:
      "https://images.unsplash.com/photo-1488521787991-ed7fe863a618?w=800&h=400&fit=crop",
    category: "保育士",
    categoryColor: "rose",
    content: `<h2>宇土市の保育士加点+20の威力</h2>
<p>宇土市では保育士や保育関連職に<span class="highlight">+20点の調整指数</span>が加算されます。これは全調整指数の中で最大です。</p>

<h3>保育士加点の影響度</h3>
<p>基準指数10点（パート相当）の親が保育士の場合：</p>
<ul>
<li>基準指数（パート）：10点</li>
<li>保育士加点：+20点</li>
<li>合計：<strong>30点</strong></li>
</ul>

<p>これは基準指数20点（フルタイム）と同等の競争力を持ちます。</p>

<h3>最高点に到達するケース</h3>
<p>例：両親フルタイム＋保育士加点の場合</p>
<ul>
<li>基準指数：20+20=40点</li>
<li>保育士加点：+20点</li>
<li>合計：<strong>60点</strong>（最大点数を大幅に超過）</li>
</ul>

<h3>保育関連職の範囲</h3>
<p>加点の対象となる「保育関連職」の例：</p>
<ul>
<li>認可保育園・認定こども園の保育士</li>
<li>小規模保育事業者</li>
<li>事業所内保育施設スタッフ</li>
<li>その他市が認める保育関連職</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>宇土市の保育士加点+20は業界随一の優遇です。保育関連職の親がいれば、入園の可能性が大幅に上がります。勤務先の規模や形態により加点対象かどうかは市に確認が必須です。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳細は<a href="https://www.city.uto.kumamoto.jp/" target="_blank" rel="noopener">宇土市公式サイト</a>でご確認ください。</p>
</div>`,
    publishedAt: "2026-06-09",
  },
  {
    slug: "uto-sibling",
    citySlug: "uto",
    title: "宇土市のきょうだい加点｜+8点の活用法と同園・別園の扱い",
    description:
      "宇土市の保育園入園でのきょうだい加点を解説。同園でも別園でも+8点として扱われ、複数のきょうだい加点を活用できます。",
    image:
      "https://images.unsplash.com/photo-1471286174890-9c112ffca5b4?w=800&h=400&fit=crop",
    category: "きょうだい",
    categoryColor: "amber",
    content: `<h2>宇土市のきょうだい加点制度</h2>
<p>宇土市では、きょうだいが保育施設を利用している場合に<span class="highlight">調整指数+8点</span>が加算されます。同園か別園かで区別されません。</p>

<h3>きょうだい関連の調整指数</h3>
<table>
<thead><tr><th>状況</th><th>調整指数</th></tr></thead>
<tbody>
<tr><td>きょうだいが認可保育園に在園中</td><td>+8点</td></tr>
<tr><td>複数のきょうだいが在園中</td><td>+8点×人数</td></tr>
</tbody>
</table>

<h3>具体的なシミュレーション</h3>
<p>例1：第2子がすでに入園中で、第3子が申込</p>
<ul>
<li>基準指数（sum方式）：両親合計25点</li>
<li>きょうだい在園加点：+8点</li>
<li>合計：<strong>33点</strong></li>
</ul>

<p>例2：複数のきょうだいが在園中の場合</p>
<ul>
<li>基準指数：20点</li>
<li>きょうだい在園加点：+8点×2人=16点</li>
<li>合計：<strong>36点</strong></li>
</ul>

<h3>同園か別園かの選択</h3>
<p>宇土市では同園でも別園でも加点は変わらないため、保護者の利便性や園の希望で選択できます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>宇土市のきょうだい加点+8点は同園・別園で区別されません。複数のきょうだいがいれば加点が重複するため、多子世帯は大きなアドバンテージを得られます。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳細は<a href="https://www.city.uto.kumamoto.jp/" target="_blank" rel="noopener">宇土市公式サイト</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-06-09",
  },
  {
    slug: "uto-parental-leave",
    citySlug: "uto",
    title: "宇土市の育休復帰加点｜+4点で復職をサポート",
    description:
      "宇土市の産休・育児休業明けの調整指数を解説。+4点の加点により育休後の復帰を優遇する制度をまとめました。",
    image:
      "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=800&h=400&fit=crop",
    category: "育休復帰",
    categoryColor: "rose",
    content: `<h2>宇土市の育休復帰加点</h2>
<p>宇土市では産休・育児休業からの復帰時に<span class="highlight">+4点の調整指数</span>が加算されます。</p>

<h3>育休復帰の調整指数</h3>
<p>育休からの復帰により保育園への需要が生じた場合、一律で+4点が加算されます。</p>

<h3>育休復帰の計算例</h3>
<p>例：両親フルタイムで育休明けの場合</p>
<ul>
<li>基準指数（sum方式で合計）：20+20=40点</li>
<li>育休復帰加点：+4点</li>
<li>合計：<strong>44点</strong></li>
</ul>

<p>例：パート勤務での育休復帰</p>
<ul>
<li>基準指数：10+20=30点</li>
<li>育休復帰加点：+4点</li>
<li>合計：<strong>34点</strong></li>
</ul>

<h3>育休復帰と他の加点の組み合わせ</h3>
<p>育休復帰+きょうだい在園の場合：40+4+8=<strong>52点</strong></p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>宇土市の育休復帰加点+4点は小幅ですが、出産15点より低く設定されています。育休を申請する際の書類作成と市への事前相談が重要です。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳細は<a href="https://www.city.uto.kumamoto.jp/" target="_blank" rel="noopener">宇土市公式サイト</a>でご確認ください。</p>
</div>`,
    publishedAt: "2026-06-09",
  },
  {
    slug: "uto-small-daycare-graduate",
    citySlug: "uto",
    title: "宇土市の小規模保育卒園児加点｜+10点で進学を優遇",
    description:
      "宇土市の小規模保育事業からの卒園児を対象とした加点を解説。+10点により認可保育園への進学を支援する制度をまとめました。",
    image:
      "https://images.unsplash.com/photo-1513828583688-c52646db42da?w=800&h=400&fit=crop",
    category: "小規模卒園",
    categoryColor: "teal",
    content: `<h2>宇土市の小規模保育卒園児加点</h2>
<p>宇土市では小規模保育事業（0～2歳）から認可保育園への進学児に<span class="highlight">+10点の調整指数</span>が加算されます。</p>

<h3>小規模卒園加点の仕組み</h3>
<p>小規模保育は3歳到達前に卒園が必須です。そのため、認可保育園への円滑な進学を支援する加点が設定されています。</p>

<h3>進学の計算例</h3>
<p>例：小規模保育から認可保育園への3歳進学</p>
<ul>
<li>基準指数（両親パート）：10+10=20点</li>
<li>小規模卒園加点：+10点</li>
<li>合計：<strong>30点</strong></li>
</ul>

<p>例：小規模卒園+きょうだい在園の場合</p>
<ul>
<li>基準指数：20+20=40点</li>
<li>小規模卒園加点：+10点</li>
<li>きょうだい在園加点：+8点</li>
<li>合計：<strong>58点</strong></li>
</ul>

<h3>小規模保育の卒園時期</h3>
<p>小規模保育は認可保育施設のため、3歳になった年度の途中で卒園が発生する場合があります。その際の受け皿として認可保育園への進学が重要です。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>宇土市の小規模卒園加点+10点は、0～2歳の小規模保育から3歳以上の認可保育園への進学を大きく優遇しています。小規模保育から始める選択肢もメリットがあります。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳細は<a href="https://www.city.uto.kumamoto.jp/" target="_blank" rel="noopener">宇土市公式サイト</a>でご確認ください。</p>
</div>`,
    publishedAt: "2026-06-09",
  },
  {
    slug: "uto-score-tips",
    citySlug: "uto",
    title: "宇土市の点数を上げるコツ｜両親で40点を目指す戦略",
    description:
      "宇土市のsum方式で高い選考点を獲得するための具体的な戦略をまとめました。両親で基準指数40点、調整指数の活用で差をつけるコツを紹介します。",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=400&fit=crop",
    category: "点数アップ戦略",
    categoryColor: "blue",
    content: `<h2>宇土市で高い点数を獲得する戦略</h2>
<p>宇土市のsum方式では、基準指数と調整指数の合計で競います。<span class="highlight">40点の基準指数＋調整指数</span>で最大点を目指しましょう。</p>

<h3>基準指数40点を目指す</h3>
<p>両親ともフルタイム（月20日×8時間以上）で基準指数40点を達成します：</p>
<ul>
<li>20点+20点=40点</li>
<li>一方がパート（10点）の場合は30点に留まるため、できるだけ両親ともフルタイムを目指す</li>
</ul>

<h3>調整指数の最大化</h3>
<p>複数の調整指数を組み合わせて加点を増やします：</p>
<ul>
<li>保育士加点：+20点（最強）</li>
<li>小規模卒園：+10点</li>
<li>こども園切替：+10点</li>
<li>きょうだい在園：+8点（複数対象なら重複）</li>
<li>育休復帰：+4点</li>
</ul>

<h3>具体的なシナリオ</h3>
<p>両親フルタイム+保育士職の場合：</p>
<ul>
<li>基準指数：40点</li>
<li>保育士加点：+20点</li>
<li>合計：<strong>60点</strong></li>
</ul>

<p>両親フルタイム+きょうだい2人在園の場合：</p>
<ul>
<li>基準指数：40点</li>
<li>きょうだい在園：+8点×2=16点</li>
<li>合計：<strong>56点</strong></li>
</ul>

<h3>避けるべき減点</h3>
<ul>
<li>保育料滞納：-20点（非常に大きい）</li>
<li>祖父母同居：-2点</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>宇土市では基準指数の両親フルタイム40点が基本です。その上で調整指数を活用して加点を積み重ねます。保育士職があれば+20点で圧倒的有利、きょうだいがいれば+8点×人数で加算できます。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳細は<a href="https://www.city.uto.kumamoto.jp/" target="_blank" rel="noopener">宇土市公式サイト</a>でご確認ください。</p>
</div>`,
    publishedAt: "2026-06-09",
  },
  {
    slug: "uto-schedule",
    citySlug: "uto",
    title: "宇土市の保育園申込スケジュール｜申請時期と入園までの流れ",
    description:
      "宇土市の保育園入園申込みの時期や手順を解説。4月一斉入所と途中入所それぞれのスケジュール、必要書類をまとめました。",
    image:
      "https://images.unsplash.com/photo-1506784365847-bbad939e9335?w=800&h=400&fit=crop",
    category: "スケジュール",
    categoryColor: "amber",
    content: `<h2>宇土市の保育園申込スケジュール</h2>
<p>宇土市の保育園入園には<span class="highlight">4月一斉入所</span>と<span class="highlight">途中入所</span>の2つの申込時期があります。</p>

<h3>4月一斉入所の目安</h3>
<ul>
<li>申込受付：前年9月～10月頃</li>
<li>利用調整（選考）：10月～1月</li>
<li>結果通知：2月頃</li>
<li>入園：4月1日</li>
</ul>

<h3>途中入所</h3>
<ul>
<li>申込：入所希望月の前月までに窓口へ</li>
<li>空き状況により随時利用調整</li>
<li>選考はsum方式を適用</li>
</ul>

<h3>必要書類</h3>
<ul>
<li>保育園利用申込書</li>
<li>就労証明書（就労の場合）</li>
<li>自営業申告書（自営の場合）</li>
<li>診断書等（疾病・障害の場合）</li>
<li>その他該当する証明書類</li>
</ul>

<h3>提出時の注意点</h3>
<ul>
<li>基準指数の根拠は事前に確認し、証明書類の不足がないようにする</li>
<li>調整指数の対象（保育士加点など）は申告が必須</li>
<li>保育料滞納がないことを確認する</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>宇土市の4月入所は競争率が高いため、前年度の秋に早めの申込みが重要です。sum方式なため、両親の就労時間がしっかり証明できる書類を準備しましょう。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>最新のスケジュールは<a href="https://www.city.uto.kumamoto.jp/" target="_blank" rel="noopener">宇土市公式サイト</a>でご確認ください。</p>
</div>`,
    publishedAt: "2026-06-09",
  },
  {
    slug: "uto-faq",
    citySlug: "uto",
    title: "宇土市の保育園入園FAQ｜よくある質問と回答",
    description:
      "宇土市の保育園入園制度についてよくある質問をまとめました。基準指数・調整指数の計算、申込み時期、加点の詳細など、保護者からの疑問に答えます。",
    image:
      "https://images.unsplash.com/photo-1516534775068-bb6baaf2c75d?w=800&h=400&fit=crop",
    category: "よくある質問",
    categoryColor: "green",
    content: `<h2>宇土市の保育園入園FAQ</h2>
<p>宇土市の保育園入園制度について、<span class="highlight">よくある質問と回答</span>をまとめました。</p>

<h3>Q1：sum方式とmax方式の違いは？</h3>
<p><strong>A：</strong>sum方式は両親の点数を足し合わせます。max方式は高い方を採用するため異なります。宇土市はsum方式なので、両親の合計で競います。</p>

<h3>Q2：祖父母と同居していると減点される？</h3>
<p><strong>A：</strong>はい。祖父母による保育サポートが可能と判断され、-2点の減点があります。ただし、祖父母が要介護や疾病がある場合は別途相談が必要です。</p>

<h3>Q3：保育料滞納時の減点は大きい？</h3>
<p><strong>A：</strong>-20点と非常に大きな減点があります。前年度の保育園利用時の滞納が選考に大きく影響します。必ず期限内に納付してください。</p>

<h3>Q4：保育士職で加点されない場合がある？</h3>
<p><strong>A：</strong>加点対象は「保育関連職」に限定されます。市が認める職種か確認が必須です。勤務先の公式な身分証や雇用契約書で証明します。</p>

<h3>Q5：きょうだいが別園でも+8点？</h3>
<p><strong>A：</strong>はい。同園・別園を区別せず+8点です。複数のきょうだいがいれば+8点×人数で加算されます。</p>

<h3>Q6：出産予定者はいつ申込みする？</h3>
<p><strong>A：</strong>出産予定時期に合わせた申込みが効果的です。出産15点の加点が得られ、4月入園を目指すなら前年度に出産予定を早めに申告してください。</p>

<h3>Q7：虐待・DV被害の場合は？</h3>
<p><strong>A：</strong>20点の加点が対象です。公的な認定（児童相談所・警察など）が必要になります。市の福祉課に事前相談をお勧めします。</p>

<h3>Q8：点数が同じ場合は抽選？</h3>
<p><strong>A：</strong>市の詳細な選考基準に従います。点数が同じ場合の扱いは市に確認してください。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>宇土市の制度は細かいルールが多いため、不確実な点は市の窓口に早めに相談することをお勧めします。特に保育士加点や減点対象は事前確認が重要です。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳細は<a href="https://www.city.uto.kumamoto.jp/" target="_blank" rel="noopener">宇土市公式サイト</a>をご確認いただくか、市の子育て支援課にお問い合わせください。</p>
</div>`,
    publishedAt: "2026-06-09",
  },
];

registerArticles(utoArticles);
