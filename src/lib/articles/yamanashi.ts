import type { Article } from "./types";
import { registerArticles } from "./index";

const yamanashiArticles: Article[] = [
  {
    slug: "yamanashi-guide",
    citySlug: "yamanashi",
    title: "山梨市の保活ガイド｜sum方式の基準指数と入園の基本",
    description:
      "山梨市の保育園入園選考で使われるsum方式と基準指数を解説。両親の点数を合計し、最大20点までの仕組みをまとめました。",
    image:
      "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>山梨市の保育園入園制度</h2>
<p>山梨市の保育園入園選考は<span class="highlight">sum方式</span>を採用しています。両親の基準指数を合計し、最大20点（各保護者最大10点）で世帯の選考点を決定します。</p>

<h3>sum方式とは</h3>
<p>山梨市では父母2人の基準指数を<strong>合計する</strong>方式です。ただし各保護者の上限が10点に設定されているため、一方が過度に高い点数でも世帯全体は20点が上限になります。例えば両親とも就労している場合、両者の就労点を足し合わせた点数が世帯の基準指数となります。</p>

<h3>基準指数の主な区分</h3>
<ul>
<li>就労（月140時間以上）：10点</li>
<li>就労（月120～140時間未満）：8点</li>
<li>就労（月48～120時間未満）：7点</li>
<li>疾病・障害：6～10点（程度による）</li>
<li>介護・看護：7～10点（程度による）</li>
<li>出産：8点</li>
<li>就学：8点</li>
<li>災害復旧：10点</li>
<li>虐待・DV対応：10点</li>
<li>求職活動：5～7点（状況による）</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>山梨市のsum方式では、両親の点数を足し合わせるため、両親ともある程度の就労が必要です。各保護者10点が上限なので、一方の親が無職でも上限20点に達することができます。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳細は山梨市公式サイトの利用調整基準をご確認ください。</p>
</div>`,
    publishedAt: "2026-06-09",
  },
  {
    slug: "yamanashi-employment",
    citySlug: "yamanashi",
    title: "山梨市の就労点数を徹底解説｜月140時間以上で最高10点",
    description:
      "山梨市の保育園入園選考における就労の基準指数を詳しく解説。月間就労時間別の段階評価と点数を紹介します。",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=400&fit=crop",
    category: "就労",
    categoryColor: "blue",
    content: `<h2>山梨市の就労点数</h2>
<p>山梨市では就労状況を<span class="highlight">月間就労時間</span>で評価し、複数段階で基準指数が決まります。</p>

<h3>就労の基準指数一覧</h3>
<table>
<thead><tr><th>就労時間</th><th>基準指数</th></tr></thead>
<tbody>
<tr><td>月140時間以上</td><td>10点</td></tr>
<tr><td>月120～140時間未満</td><td>8点</td></tr>
<tr><td>月48～120時間未満</td><td>7点</td></tr>
</tbody>
</table>

<h3>両親の就労点数の組み合わせ例</h3>
<p>sum方式では両親の点数を足し合わせます（各保護者上限10点）：</p>
<ul>
<li>両親ともフルタイム（月140時間以上）：10+10=20点（上限）</li>
<li>一方がフルタイム（10点）、一方がパート（月48～120h、7点）：10+7=17点</li>
<li>両親ともパート（月120～140h、8点）：8+8=16点</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>山梨市では月48時間以上の就労が対象です。sum方式なため、両親ともある程度の就労があれば高い点数を獲得できます。一方だけが高時間勤務でも、もう一方が月48時間以上あれば世帯の点数が上がる利点があります。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>就労証明書の書式や提出方法は山梨市公式サイトでご確認ください。</p>
</div>`,
    publishedAt: "2026-06-09",
  },
  {
    slug: "yamanashi-adjustment",
    citySlug: "yamanashi",
    title: "山梨市の調整指数一覧｜ひとり親+2・きょうだい加点を解説",
    description:
      "山梨市の保育園入園選考における調整指数を完全解説。ひとり親世帯・多子世帯・育休明けの加点詳細をまとめました。",
    image:
      "https://images.unsplash.com/photo-1591035897819-f4bdf739f446?w=800&h=400&fit=crop",
    category: "加点・調整",
    categoryColor: "purple",
    content: `<h2>山梨市の調整指数</h2>
<p>山梨市は基準指数に加えて<span class="highlight">調整指数</span>を加算します。ひとり親世帯・きょうだい・障害児など様々な加点が設定されています。</p>

<h3>加点となる調整指数</h3>
<table>
<thead><tr><th>項目</th><th>調整指数</th></tr></thead>
<tbody>
<tr><td>ひとり親世帯</td><td>+2点</td></tr>
<tr><td>子どもが障害児（身体障害者手帳等）</td><td>+2点</td></tr>
<tr><td>双子以上</td><td>+2点</td></tr>
<tr><td>生活保護世帯</td><td>+1点</td></tr>
<tr><td>失業給付受給中</td><td>+1点</td></tr>
<tr><td>きょうだいが同時申込</td><td>+1点</td></tr>
<tr><td>小規模保育施設卒園児</td><td>+1点</td></tr>
<tr><td>育休明け</td><td>+1点</td></tr>
</tbody>
</table>

<h3>減点となる調整指数</h3>
<table>
<thead><tr><th>項目</th><th>調整指数</th></tr></thead>
<tbody>
<tr><td>親族保育の常態化</td><td>-1点</td></tr>
</tbody>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>山梨市の調整指数は基準指数に比べると小さめですが、複数の加点が重複できるため組み合わせが重要です。特にひとり親・双子・子ども障害といった複数の要件を満たす場合、複数加点を活用しましょう。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳細は山梨市公式サイトをご確認ください。</p>
</div>`,
    publishedAt: "2026-06-09",
  },
  {
    slug: "yamanashi-single-parent",
    citySlug: "yamanashi",
    title: "山梨市のひとり親世帯優遇｜+2点の加点詳細と戦略",
    description:
      "山梨市のひとり親世帯向け調整指数を解説。+2点の加点が選考にどのように影響するかと具体的な計算方法をまとめました。",
    image:
      "https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=800&h=400&fit=crop",
    category: "ひとり親",
    categoryColor: "rose",
    content: `<h2>山梨市のひとり親世帯向け加点</h2>
<p>山梨市ではひとり親世帯に<span class="highlight">+2点の調整指数</span>が加算されます。基準指数との組み合わせで世帯の総合点が決まります。</p>

<h3>ひとり親世帯の点数計算</h3>
<p>ひとり親でフルタイム就労（月140時間以上）の場合：</p>
<ul>
<li>基準指数：10点</li>
<li>ひとり親加点：+2点</li>
<li>合計：<strong>12点</strong></li>
</ul>

<p>ひとり親でパート勤務（月120～140時間）の場合：</p>
<ul>
<li>基準指数：8点</li>
<li>ひとり親加点：+2点</li>
<li>合計：<strong>10点</strong></li>
</ul>

<h3>他の加点との組み合わせ</h3>
<p>ひとり親+子ども障害の場合：10＋2＋2＝<strong>14点</strong></p>
<p>ひとり親+育休明けの場合：10＋2＋1＝<strong>13点</strong></p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>山梨市のひとり親加点は+2点です。sum方式のため、基準指数が一方の親の就労状況で決まるひとり親世帯にとって、この調整加点は重要な優遇措置になります。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳細は山梨市公式サイトをご確認ください。</p>
</div>`,
    publishedAt: "2026-06-09",
  },
  {
    slug: "yamanashi-children-disability",
    citySlug: "yamanashi",
    title: "山梨市の子ども障害加点｜身体障害者手帳で+2点",
    description:
      "山梨市の障害児優遇制度を解説。身体障害者手帳などの要件で+2点の加点がどのように選考に影響するかをまとめました。",
    image:
      "https://images.unsplash.com/photo-1633332715463-efb5a76c5e8b?w=800&h=400&fit=crop",
    category: "障害児",
    categoryColor: "teal",
    content: `<h2>山梨市の子ども障害加点制度</h2>
<p>山梨市では子どもが障害を持つ場合に<span class="highlight">+2点の調整指数</span>が加算されます。</p>

<h3>子ども障害加点の対象</h3>
<p>以下の要件を満たす場合が対象となります：</p>
<ul>
<li>身体障害者手帳（視覚・聴覚・肢体等）</li>
<li>療育手帳（知的障害）</li>
<li>精神障害者保健福祉手帳</li>
<li>その他の障害証明書類</li>
</ul>

<h3>具体的な計算例</h3>
<p>両親フルタイム+子ども障害の場合：</p>
<ul>
<li>基準指数：10+10=20点</li>
<li>子ども障害加点：+2点</li>
<li>合計：<strong>22点</strong>（上限20点に達すでに最高点）</li>
</ul>

<p>基準指数が低い場合の効果：</p>
<ul>
<li>基準指数：8+7=15点</li>
<li>子ども障害加点：+2点</li>
<li>合計：<strong>17点</strong></li>
</ul>

<h3>必要な書類</h3>
<ul>
<li>身体障害者手帳、療育手帳等の写し</li>
<li>保育園申込み時に提出</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>山梨市では子どもの障害による加点が+2点と設定されています。子どもが障害を持つ場合、必ずこの加点を申告し、証明書類を添付することが重要です。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳細は山梨市公式サイトをご確認ください。</p>
</div>`,
    publishedAt: "2026-06-09",
  },
  {
    slug: "yamanashi-twins-multichild",
    citySlug: "yamanashi",
    title: "山梨市の双子・多子世帯加点｜+2点で優遇",
    description:
      "山梨市の双子以上および多子世帯向けの調整指数を解説。+2点の加点と他の加点との組み合わせ方をまとめました。",
    image:
      "https://images.unsplash.com/photo-1471286174890-9c112ffca5b4?w=800&h=400&fit=crop",
    category: "多子世帯",
    categoryColor: "amber",
    content: `<h2>山梨市の双子・多子世帯加点制度</h2>
<p>山梨市では双子以上の多胎児がいる場合に<span class="highlight">+2点の調整指数</span>が加算されます。</p>

<h3>双子加点の対象</h3>
<p>同時申込みで以下の場合が対象となります：</p>
<ul>
<li>双子</li>
<li>三つ子以上</li>
</ul>

<h3>点数計算例</h3>
<p>両親フルタイム+双子の場合：</p>
<ul>
<li>基準指数：10+10=20点</li>
<li>双子加点：+2点</li>
<li>合計：<strong>22点</strong>（ただし基準指数が既に上限のため実質的な加点効果は限定的）</li>
</ul>

<p>基準指数が中程度の場合：</p>
<ul>
<li>基準指数：8+8=16点</li>
<li>双子加点：+2点</li>
<li>合計：<strong>18点</strong></li>
</ul>

<h3>他の加点との組み合わせ</h3>
<p>双子+育休明けの場合：10＋2＋1＝<strong>13点</strong></p>
<p>双子+生活保護の場合：10＋2＋1＝<strong>13点</strong></p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>山梨市の双子加点+2点は、複数の子どもを同時保育する必要のある多胎児世帯の保活を支援する重要な加点です。同時申込みすることで確実にこの加点を受けられます。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳細は山梨市公式サイトをご確認ください。</p>
</div>`,
    publishedAt: "2026-06-09",
  },
  {
    slug: "yamanashi-parental-leave",
    citySlug: "yamanashi",
    title: "山梨市の育休明け加点｜+1点で復帰を支援",
    description:
      "山梨市の産休・育児休業明けの調整指数を解説。+1点の加点により育休後の復帰を支援する制度をまとめました。",
    image:
      "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=800&h=400&fit=crop",
    category: "育休復帰",
    categoryColor: "rose",
    content: `<h2>山梨市の産休・育休明け加点</h2>
<p>山梨市では産休・育児休業からの復帰時に<span class="highlight">+1点の調整指数</span>が加算されます。</p>

<h3>育休明け加点の対象</h3>
<p>産休・育休から復帰し、新たに保育園を利用する必要が生じた場合が対象となります。</p>

<h3>育休復帰の計算例</h3>
<p>例：両親フルタイムで育休明けの場合</p>
<ul>
<li>基準指数：10+10=20点</li>
<li>育休明け加点：+1点</li>
<li>合計：<strong>21点</strong>（上限20点）</li>
</ul>

<p>基準指数が中程度の場合：</p>
<ul>
<li>基準指数：8+7=15点</li>
<li>育休明け加点：+1点</li>
<li>合計：<strong>16点</strong></li>
</ul>

<h3>他の加点との組み合わせ</h3>
<p>育休明け+小規模卒園の場合：10＋1＋1＝<strong>12点</strong></p>
<p>育休明け+きょうだい同時申込の場合：10＋1＋1＝<strong>12点</strong></p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>山梨市の育休明け加点+1点は、出産や育児のため一時的に休業した親が仕事復帰する際の支援制度です。育休終了予定時期に合わせた申込みが重要です。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳細は山梨市公式サイトをご確認ください。</p>
</div>`,
    publishedAt: "2026-06-09",
  },
  {
    slug: "yamanashi-health-care",
    citySlug: "yamanashi",
    title: "山梨市の疾病・介護加点｜常時臥床で最高10点",
    description:
      "山梨市の疾病・障害・介護の基準指数を詳しく解説。親の健康状態や介護負担による点数の段階評価をまとめました。",
    image:
      "https://images.unsplash.com/photo-1576091160499-112ba8d25d1d?w=800&h=400&fit=crop",
    category: "疾病・介護",
    categoryColor: "blue",
    content: `<h2>山梨市の疾病・介護・障害基準指数</h2>
<p>山梨市では親の健康問題や介護負担を<span class="highlight">基準指数に反映</span>させています。</p>

<h3>疾病・障害の基準指数</h3>
<table>
<thead><tr><th>状況</th><th>基準指数</th></tr></thead>
<tbody>
<tr><td>常時臥床・入院・重度障害</td><td>10点</td></tr>
<tr><td>自宅療養中</td><td>8点</td></tr>
<tr><td>その他の疾病・軽度障害</td><td>6点</td></tr>
</tbody>
</table>

<h3>介護・看護の基準指数</h3>
<table>
<thead><tr><th>状況</th><th>基準指数</th></tr></thead>
<tbody>
<tr><td>常時介護が必要（寝たきり等）</td><td>10点</td></tr>
<tr><td>介護により生活支障あり</td><td>7点</td></tr>
</tbody>
</table>

<h3>具体的な計算例</h3>
<p>親が常時臥床で相手方がパート勤務の場合：</p>
<ul>
<li>親（疾病）：10点</li>
<li>親（パート月48～120h）：7点</li>
<li>合計：<strong>17点</strong></li>
</ul>

<p>親が介護必要で相手方が月140h以上就労の場合：</p>
<ul>
<li>親（介護）：10点</li>
<li>親（フルタイム）：10点</li>
<li>合計：<strong>20点</strong>（上限）</li>
</ul>

<h3>必要な書類</h3>
<ul>
<li>医師の診断書</li>
<li>身体障害者手帳（該当時）</li>
<li>介護保険認定書</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>山梨市では健康問題や介護負担を重視し、基準指数に直結させています。親の健康問題がある場合は、医学的な証明を用意して申告することが重要です。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳細は山梨市公式サイトをご確認ください。</p>
</div>`,
    publishedAt: "2026-06-09",
  },
  {
    slug: "yamanashi-schedule",
    citySlug: "yamanashi",
    title: "山梨市の保育園申込スケジュール｜申請時期と入園までの流れ",
    description:
      "山梨市の保育園入園申込みの時期や手順を解説。4月一斉入所と途中入所それぞれのスケジュールをまとめました。",
    image:
      "https://images.unsplash.com/photo-1506784365847-bbad939e9335?w=800&h=400&fit=crop",
    category: "スケジュール",
    categoryColor: "blue",
    content: `<h2>山梨市の保育園申込スケジュール</h2>
<p>山梨市の保育園入園には<span class="highlight">4月一斉入所</span>と<span class="highlight">途中入所</span>の2つの申込時期があります。</p>

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
<li>選考は4月入所と同じsum方式を適用</li>
</ul>

<h3>必要書類</h3>
<ul>
<li>保育園利用申込書</li>
<li>就労証明書（就労の場合）</li>
<li>診断書等（疾病・障害の場合）</li>
<li>介護保険認定書（介護の場合）</li>
<li>その他該当する証明書類</li>
</ul>

<h3>提出先</h3>
<ul>
<li>山梨市福祉事務所 子育て支援課</li>
<li>または各支所</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>山梨市の4月入所は競争率が高いため、前年度の秋に早めの申込みが重要です。sum方式なため、両親の就労状況が明確に反映されるので、就労証明書は正確に記入しましょう。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>最新のスケジュールは山梨市公式サイトでご確認ください。</p>
</div>`,
    publishedAt: "2026-06-09",
  },
  {
    slug: "yamanashi-sum-method",
    citySlug: "yamanashi",
    title: "山梨市のsum方式を完全解説｜両親の点数を合計する仕組み",
    description:
      "山梨市特有のsum方式の詳細解説。父母の点数を合計し、各保護者10点が上限という仕組みと対策をまとめました。",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=400&fit=crop",
    category: "制度の理解",
    categoryColor: "teal",
    content: `<h2>山梨市のsum方式を完全解説</h2>
<p>山梨市は<span class="highlight">sum方式（合計方式）</span>を採用しており、両親の点数を合計して世帯の基準指数を決定します。各保護者の上限が10点で、世帯の上限が20点という特徴があります。</p>

<h3>sum方式とは何か</h3>
<p>sum方式では、父母2人の基準指数を<strong>合計する</strong>方式です。例えば：</p>
<ul>
<li>父：月140h以上（10点）、母：月120～140h（8点）→ 世帯の基準指数は10+8=18点</li>
<li>父：月48～120h（7点）、母：月48～120h（7点）→ 世帯の基準指数は7+7=14点</li>
</ul>

<h3>他の方式との比較</h3>
<table>
<thead><tr><th>方式</th><th>特徴</th><th>山梨市例</th></tr></thead>
<tbody>
<tr><td>合計方式（sum）</td><td>両親の点数を足す</td><td>10+10=20点（上限）</td></tr>
<tr><td>最小値方式（min）</td><td>低い方の点数を採用</td><td>10と8なら8点</td></tr>
<tr><td>最大値方式（max）</td><td>高い方の点数を採用</td><td>10と8なら10点</td></tr>
</tbody>
</table>

<h3>sum方式での戦略</h3>
<p>sum方式では両親が協力して就労することが重要です：</p>
<ul>
<li>フルタイム+無職（10点）：世帯10点</li>
<li>フルタイム+パート少なめ（10+7=17点）：世帯17点</li>
<li>フルタイム+フルタイム（10+10=20点）：世帯20点（上限）</li>
</ul>

<h3>重要な注意点</h3>
<p>sum方式では「両親の合計点」が重要です。一方が無職でも、もう一方が就労していれば基本的な点数が得られます。しかし上限が各保護者10点なため、過度に高時間勤務でも加算されません。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>山梨市のsum方式は両親の協力が必要です。どちらか一方だけが就労するのではなく、両親ともある程度の就労があれば、より高い点数を獲得できます。調整指数との組み合わせも活用しましょう。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳細は山梨市公式サイトをご確認ください。</p>
</div>`,
    publishedAt: "2026-06-09",
  },
  {
    slug: "yamanashi-special-reasons",
    citySlug: "yamanashi",
    title: "山梨市の特別加点制度｜出産・災害・虐待DV対応",
    description:
      "山梨市の出産、災害復旧、虐待・DV対応の高加点制度を解説。8～10点の基準指数がどのように活用されるかをまとめました。",
    image:
      "https://images.unsplash.com/photo-1632307474827-cc894dc3ee8c?w=800&h=400&fit=crop",
    category: "特別事情",
    categoryColor: "amber",
    content: `<h2>山梨市の特別理由加点制度</h2>
<p>山梨市では出産、災害復旧、虐待・DV対応など<span class="highlight">特別な事情</span>に対して高い基準指数が設定されています。</p>

<h3>特別加点の基準指数</h3>
<table>
<thead><tr><th>事由</th><th>基準指数</th></tr></thead>
<tbody>
<tr><td>出産（出産予定月の前月～翌々月）</td><td>8点</td></tr>
<tr><td>就学（小学校入学に伴う就職）</td><td>8点</td></tr>
<tr><td>災害復旧（自然災害による被害）</td><td>10点</td></tr>
<tr><td>虐待・DV対応（保護が必要）</td><td>10点</td></tr>
</tbody>
</table>

<h3>具体的な計算例</h3>
<p>出産により相手方が無職の場合：</p>
<ul>
<li>出産：8点</li>
<li>相手方：0点</li>
<li>合計：<strong>8点</strong></li>
</ul>

<p>災害復旧で相手方がパート勤務の場合：</p>
<ul>
<li>災害復旧：10点</li>
<li>相手方（月48～120h）：7点</li>
<li>合計：<strong>17点</strong></li>
</ul>

<h3>虐待・DV対応の優遇</h3>
<p>虐待やDVによる一時保護が必要な場合、最高10点の基準指数が設定され、被害者保護を優先した選考が行われます。</p>

<h3>申請時の注意点</h3>
<ul>
<li>出産の場合：出産予定日の証明（母子手帳等）</li>
<li>災害の場合：被災証明書</li>
<li>虐待・DVの場合：市福祉事務所に相談・申告</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>山梨市は出産や災害、虐待・DVといった特別な事情を優遇する高い基準指数を設定しています。これらの事由に該当する場合は、必ず申し出て適切な書類を添付することが大切です。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳細は山梨市公式サイトをご確認ください。</p>
</div>`,
    publishedAt: "2026-06-09",
  },
];

registerArticles(yamanashiArticles);
