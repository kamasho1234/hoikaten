import type { Article } from "./types";
import { registerArticles } from "./index";

const shiroiArticles: Article[] = [
  {
    slug: "shiroi-guide",
    citySlug: "shiroi",
    title: "白井市の保活ガイド｜sum方式の基準指数と入園の基本",
    description:
      "白井市の保育園入園選考で使われるsum方式と基準指数を解説。保護者の点数を合計する仕組みをまとめました。",
    image:
      "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>白井市の保育園入園制度</h2>
<p>白井市の保育園入園選考は<span class="highlight">sum方式（合計方式）</span>を採用しています。保護者の基準指数を合計し、調整指数を加えて世帯の選考点を決定します。最大基準指数は20点（各保護者最大10点）です。</p>

<h3>sum方式とは</h3>
<p>白井市では父母2人の基準指数を合計する方式です。例えば一方が8点、もう一方が10点の場合は18点が世帯の基準指数となります。このため、どちらかが高い点数を取ることで世帯全体の点数を上げられます。</p>

<h3>基準指数の主な区分</h3>
<ul>
<li>就労（月140時間以上）：10点</li>
<li>出産前後（産休育休）：9点</li>
<li>疾病・障害：6～10点</li>
<li>介護・看護：5～10点</li>
<li>災害復旧：10点</li>
<li>虐待・DV：10点</li>
<li>求職活動：3点</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>白井市のsum方式では、どちらか一方の就労で高い基準指数が取得できます。両親がバランスよく就労していなくても、一方の就労で世帯の基本点を確保できる利点があります。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳細は<a href="https://www.city.shiroi.chiba.jp/" target="_blank" rel="noopener">白井市公式サイト</a>の利用調整基準をご確認ください。</p>
</div>`,
    publishedAt: "2026-06-09",
  },
  {
    slug: "shiroi-employment",
    citySlug: "shiroi",
    title: "白井市の就労点数を徹底解説｜月140時間以上で最高10点",
    description:
      "白井市の保育園入園選考における就労の基準指数を詳しく解説。月間就労時間別の段階評価と点数を紹介します。",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=400&fit=crop",
    category: "就労",
    categoryColor: "blue",
    content: `<h2>白井市の就労点数</h2>
<p>白井市では就労状況を<span class="highlight">月間就労時間</span>で評価し、複数段階で基準指数が決まります。</p>

<h3>就労の基準指数一覧</h3>
<table>
<thead><tr><th>就労時間</th><th>基準指数</th></tr></thead>
<tbody>
<tr><td>月140時間以上</td><td>10点</td></tr>
<tr><td>月120時間以上140時間未満</td><td>9点</td></tr>
<tr><td>月100時間以上120時間未満</td><td>8点</td></tr>
<tr><td>月80時間以上100時間未満</td><td>7点</td></tr>
<tr><td>月64時間以上80時間未満</td><td>6点</td></tr>
</tbody>
</table>

<h3>両親の就労点数の組み合わせ例</h3>
<p>sum方式では両親の点数を合計します：</p>
<ul>
<li>両親ともフルタイム（月140時間以上）：10+10=20点が採用</li>
<li>一方がフルタイム、一方がパート（月80～100h）：10+7=17点が採用</li>
<li>両親ともパート（月120～140h）：9+9=18点が採用</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>白井市では月64時間以上の就労が対象です。sum方式なため、どちらか一方がフルタイムであれば世帯の基本点を確保しやすい仕組みになっています。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>就労証明書の書式や提出方法は<a href="https://www.city.shiroi.chiba.jp/" target="_blank" rel="noopener">白井市公式サイト</a>でご確認ください。</p>
</div>`,
    publishedAt: "2026-06-09",
  },
  {
    slug: "shiroi-adjustment",
    citySlug: "shiroi",
    title: "白井市の調整指数一覧｜ひとり親+10・きょうだい加点を解説",
    description:
      "白井市の保育園入園選考における調整指数を完全解説。ひとり親世帯・多子世帯・育休明けの加点詳細をまとめました。",
    image:
      "https://images.unsplash.com/photo-1591035897819-f4bdf739f446?w=800&h=400&fit=crop",
    category: "加点・調整",
    categoryColor: "purple",
    content: `<h2>白井市の調整指数</h2>
<p>白井市は基準指数に加えて<span class="highlight">調整指数</span>を加算します。ひとり親世帯・きょうだい・多子世帯など様々な加点が設定されています。</p>

<h3>加点となる調整指数</h3>
<table>
<thead><tr><th>項目</th><th>調整指数</th></tr></thead>
<tbody>
<tr><td>ひとり親世帯</td><td>+10点</td></tr>
<tr><td>認可保育所勤務</td><td>+3点</td></tr>
<tr><td>弟妹入所予定</td><td>+2点</td></tr>
<tr><td>育休退園後の復帰</td><td>+2点</td></tr>
<tr><td>生活保護世帯</td><td>+1点</td></tr>
<tr><td>失業状態</td><td>+1点</td></tr>
<tr><td>育休からの復帰</td><td>+1点</td></tr>
<tr><td>双子等（多胎児）</td><td>+1点</td></tr>
<tr><td>第3子以上</td><td>+1点</td></tr>
<tr><td>きょうだい同時入所</td><td>+1点</td></tr>
<tr><td>同一保育所志望</td><td>+1点</td></tr>
<tr><td>単身赴任</td><td>+1点</td></tr>
<tr><td>特別支援が必要</td><td>+1点</td></tr>
</tbody>
</table>

<h3>減点となる調整指数</h3>
<table>
<thead><tr><th>項目</th><th>調整指数</th></tr></thead>
<tbody>
<tr><td>祖父母同居</td><td>-2点</td></tr>
<tr><td>未就学児がいる場合</td><td>-1点</td></tr>
<tr><td>内定辞退（1回）</td><td>-2点</td></tr>
<tr><td>保育料滞納（3月以上）</td><td>-10点</td></tr>
<tr><td>育休延長の申請</td><td>-20点</td></tr>
</tbody>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>白井市の調整指数はひとり親が+10点と高く優遇されています。また、複数の小さい加点が重複できるため、組み合わせが重要です。特に保育料滞納と育休延長の減点は大きいので注意が必要です。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳細は<a href="https://www.city.shiroi.chiba.jp/" target="_blank" rel="noopener">白井市公式サイト</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-06-09",
  },
  {
    slug: "shiroi-single-parent",
    citySlug: "shiroi",
    title: "白井市のひとり親世帯優遇｜基本指数+10点の優先制度",
    description:
      "白井市のひとり親世帯向け調整指数を解説。基本指数に+10点加算されどのように選考に影響するかまとめました。",
    image:
      "https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=800&h=400&fit=crop",
    category: "ひとり親",
    categoryColor: "rose",
    content: `<h2>白井市のひとり親世帯向け加点</h2>
<p>白井市ではひとり親世帯に<span class="highlight">基本指数+10点の調整指数</span>が加算されます。他の自治体と比較しても手厚い優遇制度です。</p>

<h3>ひとり親世帯の点数計算</h3>
<p>ひとり親でフルタイム就労（月140時間以上）の場合：</p>
<ul>
<li>基準指数（保護者1）：10点</li>
<li>ひとり親加点：+10点</li>
<li>合計：<strong>20点（最大値）</strong></li>
</ul>

<p>ひとり親でパート就労（月100～120h）の場合：</p>
<ul>
<li>基準指数（保護者1）：8点</li>
<li>ひとり親加点：+10点</li>
<li>合計：<strong>18点</strong></li>
</ul>

<h3>他の加点との組み合わせ</h3>
<p>ひとり親+第3子以上の場合：10＋10＋1＝<strong>21点</strong>（ただし最大点は確認してください）</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>白井市のひとり親加点+10点は、経済的・精神的負担が大きいひとり親世帯を強く支援する制度です。ひとり親世帯の保活では白井市の優先度は高いと言えます。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳細は<a href="https://www.city.shiroi.chiba.jp/" target="_blank" rel="noopener">白井市公式サイト</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-06-09",
  },
  {
    slug: "shiroi-multiple-children",
    citySlug: "shiroi",
    title: "白井市の多子世帯加点｜第3子以上・双子・きょうだい同時入所",
    description:
      "白井市の多子世帯向け調整指数を解説。第3子以上・双子・きょうだい同時入所の加点制度をまとめました。",
    image:
      "https://images.unsplash.com/photo-1471286174890-9c112ffca5b4?w=800&h=400&fit=crop",
    category: "きょうだい",
    categoryColor: "amber",
    content: `<h2>白井市の多子世帯加点制度</h2>
<p>白井市では、複数の子どもがいる世帯に対して<span class="highlight">調整指数の加点</span>があります。複数の加点が重複できるため、子どもが多いほど優遇されます。</p>

<h3>多子世帯関連の調整指数</h3>
<table>
<thead><tr><th>状況</th><th>調整指数</th></tr></thead>
<tbody>
<tr><td>第3子以上</td><td>+1点</td></tr>
<tr><td>双子・三つ子等（多胎児）</td><td>+1点</td></tr>
<tr><td>きょうだい同時入所</td><td>+1点</td></tr>
<tr><td>弟妹が入所予定</td><td>+2点</td></tr>
</tbody>
</table>

<h3>具体的なシミュレーション</h3>
<p>例1：フルタイム勤務で第3子が同時申込みの場合</p>
<ul>
<li>基準指数：10点</li>
<li>第3子加点：+1点</li>
<li>きょうだい同時入所加点：+1点</li>
<li>合計：<strong>12点</strong></li>
</ul>

<p>例2：双子でフルタイム勤務、かつ弟妹が入所予定の場合</p>
<ul>
<li>基準指数：10点</li>
<li>双子加点：+1点</li>
<li>弟妹入所予定加点：+2点</li>
<li>合計：<strong>13点</strong></li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>白井市では多子世帯の加点が複数重複できます。複数の要件に該当する場合は、全ての加点が適用されるか窓口で確認することをお勧めします。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳細は<a href="https://www.city.shiroi.chiba.jp/" target="_blank" rel="noopener">白井市公式サイト</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-06-09",
  },
  {
    slug: "shiroi-disease-disability",
    citySlug: "shiroi",
    title: "白井市の疾病・障害加点｜基準指数6～10点の判定基準",
    description:
      "白井市の保育園入園での疾病・障害に関する基準指数を解説。入院・臥床・精神疾患・身体障害など段階的な加点をまとめました。",
    image:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&h=400&fit=crop",
    category: "疾病・障害",
    categoryColor: "blue",
    content: `<h2>白井市の疾病・障害の基準指数</h2>
<p>白井市では、保護者の疾病や障害に応じて<span class="highlight">基準指数が6～10点</span>加算されます。常時保育を必要とする状況を評価する制度です。</p>

<h3>疾病・障害の基準指数</h3>
<table>
<thead><tr><th>状況</th><th>基準指数</th></tr></thead>
<tbody>
<tr><td>入院または臥床が必要</td><td>10点</td></tr>
<tr><td>精神疾患（常時監護が必要）</td><td>8点</td></tr>
<tr><td>一般的な療養中</td><td>7点</td></tr>
<tr><td>その他の疾病・障害</td><td>6点</td></tr>
<tr><td>身体障害者手帳1～2級</td><td>10点</td></tr>
<tr><td>身体障害者手帳3～6級</td><td>7点</td></tr>
</tbody>
</table>

<h3>具体的な例</h3>
<p>入院中の保護者がいる場合：</p>
<ul>
<li>入院・臥床加点：10点</li>
<li>他方の保護者が就労していない場合：0点</li>
<li>合計：<strong>10点</strong></li>
</ul>

<p>身体障害1級の保護者＋もう一方がパート就労（月100～120h）：</p>
<ul>
<li>身体障害加点：10点</li>
<li>もう一方の就労：8点</li>
<li>合計：<strong>18点</strong></li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>白井市では疾病・障害がある場合、その状況に応じた基準指数が認められます。就労できない状況でも保育園入園の優先度が上げられます。診断書や手帳のコピーの提出が必要です。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳細は<a href="https://www.city.shiroi.chiba.jp/" target="_blank" rel="noopener">白井市公式サイト</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-06-09",
  },
  {
    slug: "shiroi-caregiving",
    citySlug: "shiroi",
    title: "白井市の介護加点｜親族の介護で基準指数5～10点",
    description:
      "白井市の保育園入園での介護に関する基準指数を解説。同居親族の介護が必要な場合の段階的な加点をまとめました。",
    image:
      "https://images.unsplash.com/photo-1502224311512-52582ee1b72d?w=800&h=400&fit=crop",
    category: "介護",
    categoryColor: "teal",
    content: `<h2>白井市の介護に関する基準指数</h2>
<p>白井市では、同居家族の介護が必要な場合に<span class="highlight">基準指数が5～10点</span>加算されます。家族介護と保育園利用を両立する状況を支援する制度です。</p>

<h3>介護に関する基準指数</h3>
<table>
<thead><tr><th>状況</th><th>基準指数</th></tr></thead>
<tbody>
<tr><td>要介護者の入院付添・寝たきり</td><td>10点</td></tr>
<tr><td>その他の介護が必要</td><td>5点</td></tr>
</tbody>
</table>

<h3>具体的な計算例</h3>
<p>親の寝たきり介護が必要な場合：</p>
<ul>
<li>介護加点：10点</li>
<li>保護者が就労していない：0点</li>
<li>合計：<strong>10点</strong></li>
</ul>

<p>祖父母の介護（その他の介護）＋保護者パート就労（月80～100h）：</p>
<ul>
<li>介護加点：5点</li>
<li>パート就労加点：7点</li>
<li>合計：<strong>12点</strong></li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>白井市では要介護者への付添や寝たきりケアが10点と評価され、就労と同等の価値があるとされています。介護と仕事の両立を支援する仕組みです。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳細は<a href="https://www.city.shiroi.chiba.jp/" target="_blank" rel="noopener">白井市公式サイト</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-06-09",
  },
  {
    slug: "shiroi-special-situations",
    citySlug: "shiroi",
    title: "白井市の特殊状況加点｜出産・災害・虐待・DV・求職活動",
    description:
      "白井市の保育園入園での特殊状況による基準指数を解説。出産予定・災害復旧・虐待・DV・求職活動の加点をまとめました。",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=400&fit=crop",
    category: "その他の加点",
    categoryColor: "purple",
    content: `<h2>白井市の特殊状況に関する基準指数</h2>
<p>白井市では、出産予定や災害・虐待など特殊な状況に対して<span class="highlight">基準指数が3～10点</span>加算されます。</p>

<h3>特殊状況の基準指数</h3>
<table>
<thead><tr><th>状況</th><th>基準指数</th></tr></thead>
<tbody>
<tr><td>出産予定（産前産後）</td><td>9点</td></tr>
<tr><td>災害（家屋損壊等）復旧中</td><td>10点</td></tr>
<tr><td>虐待・DV被害からの回避</td><td>10点</td></tr>
<tr><td>求職活動中</td><td>3点</td></tr>
</tbody>
</table>

<h3>具体的な計算例</h3>
<p>出産予定で、もう一方が就労中（月140h以上）の場合：</p>
<ul>
<li>出産予定加点：9点</li>
<li>もう一方の就労：10点</li>
<li>合計：<strong>19点</strong></li>
</ul>

<p>災害で家屋が損壊し復旧中の場合（就労状況がない場合）：</p>
<ul>
<li>災害復旧加点：10点</li>
<li>合計：<strong>10点</strong></li>
</ul>

<p>虐待・DV被害から逃げている場合＋求職活動中：</p>
<ul>
<li>虐待・DV加点：10点</li>
<li>求職活動加点：3点</li>
<li>合計：<strong>13点</strong></li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>白井市では災害・虐待・DVからの回避を10点と最高評価し、保護者と子どもを保護する制度です。出産予定の場合も9点で手厚い支援があります。困った状況では窓口に相談しましょう。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳細は<a href="https://www.city.shiroi.chiba.jp/" target="_blank" rel="noopener">白井市公式サイト</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-06-09",
  },
  {
    slug: "shiroi-schedule",
    citySlug: "shiroi",
    title: "白井市の保育園申込スケジュール｜申請時期と入園までの流れ",
    description:
      "白井市の保育園入園申込みの時期や手順を解説。4月一斉入所と途中入所それぞれのスケジュールをまとめました。",
    image:
      "https://images.unsplash.com/photo-1506784365847-bbad939e9335?w=800&h=400&fit=crop",
    category: "スケジュール",
    categoryColor: "green",
    content: `<h2>白井市の保育園申込スケジュール</h2>
<p>白井市の保育園入園には<span class="highlight">4月一斉入所</span>と<span class="highlight">途中入所</span>の2つの申込時期があります。</p>

<h3>4月一斉入所の目安</h3>
<ul>
<li>申込受付：前年9月～10月頃</li>
<li>利用調整（選考）：10月～2月</li>
<li>結果通知：2月末～3月初旬</li>
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
<li>出産予定日証明（出産予定の場合）</li>
<li>その他該当する証明書類</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>白井市の4月入所は競争率が高いため、前年度の秋に早めの申込みが重要です。sum方式なため、どちらか一方の就労で基本点を確保できるのが利点です。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>最新のスケジュールは<a href="https://www.city.shiroi.chiba.jp/" target="_blank" rel="noopener">白井市公式サイト</a>でご確認ください。</p>
</div>`,
    publishedAt: "2026-06-09",
  },
  {
    slug: "shiroi-sum-method",
    citySlug: "shiroi",
    title: "白井市のsum方式を解説｜点数を合計する仕組みと対策",
    description:
      "白井市特有のsum方式の詳細解説。父母の基準点数を合計する仕組みと、点数を最大化する対策をまとめました。",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=400&fit=crop",
    category: "制度の理解",
    categoryColor: "teal",
    content: `<h2>白井市のsum方式を完全解説</h2>
<p>白井市は<span class="highlight">sum方式（合計方式）</span>を採用しており、保護者の点数を合計して世帯の基準指数を決定します。最大基準指数は20点（各保護者最大10点）です。</p>

<h3>sum方式とは何か</h3>
<p>sum方式では、父母2人の基準指数を<strong>合計</strong>します。例えば：</p>
<ul>
<li>父：月140h以上（10点）、母：月80～100h（7点）→ 世帯の基準指数は17点</li>
<li>父：月140h以上（10点）、母：月140h以上（10点）→ 世帯の基準指数は20点</li>
<li>父：月140h以上（10点）、母：無職（0点）→ 世帯の基準指数は10点</li>
</ul>

<h3>他の方式との比較</h3>
<table>
<thead><tr><th>方式</th><th>特徴</th><th>白井市例</th></tr></thead>
<tbody>
<tr><td>合計方式（sum）</td><td>両親の点数を足す</td><td>10+10=20点</td></tr>
<tr><td>min方式</td><td>低い方の点数を採用</td><td>min(10,10)=10点</td></tr>
<tr><td>max方式</td><td>高い方の点数を採用</td><td>max(10,7)=10点</td></tr>
</tbody>
</table>

<h3>sum方式での戦略</h3>
<p>sum方式では両親の合計が重要です：</p>
<ul>
<li>フルタイム+フルタイム（20点）：最高点</li>
<li>フルタイム+パート中程度（18点）：高得点</li>
<li>フルタイム+無職（10点）：基本点は確保</li>
<li>パート+パート（14～16点）：中程度</li>
</ul>

<h3>重要な特徴</h3>
<p>sum方式の利点は、どちらか一方が高い点数を取得すれば、もう一方が無職でも基本点10点が確保できることです。これはmin方式と大きく異なります。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>白井市のsum方式は、どちらか一方がフルタイム就労していれば、世帯の基本点を確保しやすい有利な仕組みです。両親がバランスよく就労していなくても、一方の就労で対応可能です。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳細は<a href="https://www.city.shiroi.chiba.jp/" target="_blank" rel="noopener">白井市公式サイト</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-06-09",
  },
];

registerArticles(shiroiArticles);
