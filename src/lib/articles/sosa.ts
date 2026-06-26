import type { Article } from "./types";
import { registerArticles } from "./index";

const sosaArticles: Article[] = [
  {
    slug: "sosa-guide",
    citySlug: "sosa",
    title: "匝瑳市の保活ガイド｜sum方式と日数×時間グリッド評価の基本",
    description:
      "千葉県匝瑳市の保育所入所選考はsum方式を採用。父母の基準指数を合算し、調整指数を加えた合計点で優先順位を決定します。",
    image:
      "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>匝瑳市の保育所入所選考制度</h2>
<p>千葉県匝瑳市の保育所入所選考は<span class="highlight">sum方式（合計方式）</span>を採用しています。父母それぞれの基準指数を合算し、調整指数を加えた合計点で優先順位を決定します。居宅外就労の最高点は各保護者10点で、世帯の合計基準指数の通常最大は20点です。</p>

<h3>選考の基本的な流れ</h3>
<ul>
<li>保護者ごとに「保育が必要な理由」を確認し、基準指数を算定</li>
<li>父の基準指数＋母の基準指数を合算</li>
<li>ひとり親・生活保護・障害児等の状況により調整指数を加減</li>
<li>合計指数が高い世帯から順に内定</li>
</ul>

<h3>就労評価の特徴</h3>
<p>匝瑳市の就労評価は<span class="highlight">月間就労日数×1日の就労時間</span>の組み合わせで点数が決まります。居宅外就労の最高点は月20日以上・1日8時間以上で10点です。居宅内就労（自営・農業等）は同じ条件で8点と2点低くなります。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>匝瑳市では虐待・DVに該当する場合、基準指数として20点が付与されます。これは通常の就労10点の2倍であり、緊急性の高い保護を優先する制度設計です。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳細は<a href="https://www.city.sosa.lg.jp/" target="_blank" rel="noopener">匝瑳市公式サイト</a>の子育て・保育に関するページをご確認ください。</p>
</div>`,
    publishedAt: "2026-06-26",
  },
  {
    slug: "sosa-employment",
    citySlug: "sosa",
    title: "匝瑳市の就労点数｜月20日以上×8時間以上で最高10点",
    description:
      "匝瑳市の保育所入所選考における居宅外就労の基準指数を解説。月間就労日数と1日の就労時間の組み合わせで点数が決まります。",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=400&fit=crop",
    category: "就労",
    categoryColor: "blue",
    content: `<h2>匝瑳市の居宅外就労基準指数</h2>
<p>匝瑳市の居宅外就労（外勤・テレワーク等）は<span class="highlight">月間就労日数×1日の就労時間</span>のグリッドで評価します。月20日以上・月16日以上の2段階の日数区分と、8時間以上・6〜8時間未満・4〜6時間未満の時間区分が設定されています。</p>

<h3>居宅外就労基準指数一覧</h3>
<table>
<thead><tr><th>月間就労日数</th><th>1日の就労時間</th><th>基準指数</th></tr></thead>
<tbody>
<tr><td>月20日以上</td><td>8時間以上</td><td>10点</td></tr>
<tr><td>月20日以上</td><td>6〜8時間未満</td><td>9点</td></tr>
<tr><td>月20日以上</td><td>4〜6時間未満</td><td>8点</td></tr>
<tr><td>月16日以上</td><td>8時間以上</td><td>9点</td></tr>
<tr><td>月16日以上</td><td>6〜8時間未満</td><td>8点</td></tr>
<tr><td>月16日以上</td><td>4〜6時間未満</td><td>7点</td></tr>
<tr><td>その他月48時間以上</td><td>—</td><td>6点</td></tr>
</tbody>
</table>

<h3>注目点：月16日でも最高9点</h3>
<p>匝瑳市では月16日以上かつ1日8時間以上の就労でも9点が付与されます。フルタイムでない就労でも高い点数が得られる仕組みです。</p>

<div class="info-box">
<p><strong>テレワークについて</strong></p>
<p>自宅でのテレワーク（勤務先の事業所以外での就労）は、雇用関係があれば居宅外就労と同様に扱われます。詳細は匝瑳市子育て支援課にご確認ください。</p>
</div>`,
    publishedAt: "2026-06-26",
  },
  {
    slug: "sosa-home-employment",
    citySlug: "sosa",
    title: "匝瑳市の居宅内就労・内職点数｜自営業・農業の評価基準",
    description:
      "匝瑳市で自営業・農業・内職をしている場合の基準指数を解説。居宅外就労より2点低い評価体系です。",
    image:
      "https://images.unsplash.com/photo-1551135049-8a33b5883817?w=800&h=400&fit=crop",
    category: "就労",
    categoryColor: "blue",
    content: `<h2>匝瑳市の居宅内就労・内職基準指数</h2>
<p>匝瑳市では、自宅で行う就労（自営業・農業・在宅業務等）は<span class="highlight">居宅内就労</span>として評価されます。居宅外就労と同じ日数×時間のグリッドですが、各区分で2点低くなります。</p>

<h3>居宅内就労（自営業・農業等）基準指数一覧</h3>
<table>
<thead><tr><th>月間就労日数</th><th>1日の就労時間</th><th>基準指数</th></tr></thead>
<tbody>
<tr><td>月20日以上</td><td>8時間以上</td><td>8点</td></tr>
<tr><td>月20日以上</td><td>6〜8時間未満</td><td>7点</td></tr>
<tr><td>月20日以上</td><td>4〜6時間未満</td><td>6点</td></tr>
<tr><td>月16日以上</td><td>8時間以上</td><td>7点</td></tr>
<tr><td>月16日以上</td><td>6〜8時間未満</td><td>6点</td></tr>
<tr><td>月16日以上</td><td>4〜6時間未満</td><td>5点</td></tr>
<tr><td>その他月48時間以上</td><td>—</td><td>4点</td></tr>
</tbody>
</table>

<h3>内職の基準指数</h3>
<table>
<thead><tr><th>条件</th><th>基準指数</th></tr></thead>
<tbody>
<tr><td>月48時間以上・1日8時間以上</td><td>6点</td></tr>
<tr><td>月48時間以上・1日4時間以上</td><td>4点</td></tr>
</tbody>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>居宅内就労は居宅外就労より2点低いですが、sum方式のため、もう一方の保護者が居宅外就労のフルタイムであれば世帯合計で十分な点数を確保できます。</p>
</div>`,
    publishedAt: "2026-06-26",
  },
  {
    slug: "sosa-adjustment",
    citySlug: "sosa",
    title: "匝瑳市の調整指数｜ひとり親+15点・障害児+5点",
    description:
      "匝瑳市の保育所入所選考における調整指数（加点・減点）の全項目を解説。ひとり親世帯は+15点の加点があります。",
    image:
      "https://images.unsplash.com/photo-1434626881859-194d67b2b86f?w=800&h=400&fit=crop",
    category: "調整指数",
    categoryColor: "amber",
    content: `<h2>匝瑳市の調整指数一覧</h2>
<p>匝瑳市の利用調整では、基準指数（父母の就労状況等）に加えて、家庭の状況に応じた<span class="highlight">調整指数（加点・減点）</span>が適用されます。</p>

<h3>加点項目</h3>
<table>
<thead><tr><th>状況</th><th>調整指数</th></tr></thead>
<tbody>
<tr><td>父母ともに不在（死亡・行方不明等）</td><td>+20点</td></tr>
<tr><td>ひとり親世帯（母子・父子家庭）</td><td>+15点</td></tr>
<tr><td>生活保護世帯（就労自立見込み）</td><td>+5点</td></tr>
<tr><td>申請する子どもが障害を有する</td><td>+5点</td></tr>
<tr><td>きょうだいが保育所に入所中</td><td>+1点</td></tr>
<tr><td>市民税非課税世帯</td><td>+1点</td></tr>
<tr><td>危険業種に従事</td><td>+1点</td></tr>
</tbody>
</table>

<h3>減点項目</h3>
<table>
<thead><tr><th>状況</th><th>調整指数</th></tr></thead>
<tbody>
<tr><td>65歳未満の同居親族が保育可能</td><td>-1点</td></tr>
<tr><td>きょうだいが幼稚園在園（保育所等への申込なし）</td><td>-1点</td></tr>
<tr><td>保育所等への申込なしの未就学児がいる</td><td>-1点</td></tr>
<tr><td>親族経営で就労時間の融通が利く</td><td>-1点</td></tr>
<tr><td>保育料等の滞納</td><td>滞納月数×-1点</td></tr>
</tbody>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>保育料等の滞納がある場合、滞納月数に応じて-1点ずつ減算されます。保育料は必ず期限内に支払いましょう。</p>
</div>`,
    publishedAt: "2026-06-26",
  },
  {
    slug: "sosa-single-parent",
    citySlug: "sosa",
    title: "匝瑳市のひとり親世帯の保活｜調整指数+15点の活用法",
    description:
      "匝瑳市でひとり親として保育所申込をする場合の調整指数+15点の適用条件と保活戦略を解説します。",
    image:
      "https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?w=800&h=400&fit=crop",
    category: "ひとり親",
    categoryColor: "rose",
    content: `<h2>匝瑳市のひとり親世帯の保活</h2>
<p>匝瑳市では、母子・父子家庭などのひとり親世帯に対して<span class="highlight">調整指数+15点</span>が加算されます。これは全国的にも高い水準の優遇であり、保育の必要性が高い家庭を優先する制度設計です。</p>

<h3>ひとり親世帯の指数計算例</h3>
<p>居宅外就労フルタイム（月20日以上・1日8時間以上）のひとり親の場合：</p>
<ul>
<li>基準指数（就労）：10点</li>
<li>もう一方の親（不在）：0点（不在のため計算なし）</li>
<li>調整指数（ひとり親）：+15点</li>
<li><strong>合計：25点</strong></li>
</ul>

<h3>対象となるひとり親の状況</h3>
<ul>
<li>離婚により一方の親が不在</li>
<li>死別により一方の親が不在</li>
<li>未婚の場合</li>
<li>配偶者が行方不明または長期入院中</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>父母がともに不在（死亡・行方不明等）の場合は+20点の調整指数が適用されます。ひとり親の+15点より高い優遇措置です。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>ひとり親の認定や必要書類については<a href="https://www.city.sosa.lg.jp/" target="_blank" rel="noopener">匝瑳市公式サイト</a>でご確認ください。</p>
</div>`,
    publishedAt: "2026-06-26",
  },
  {
    slug: "sosa-illness-disability",
    citySlug: "sosa",
    title: "匝瑳市の疾病・障害・介護の基準指数",
    description:
      "匝瑳市の保育所入所において、疾病・障害・介護を理由とする場合の基準指数を解説。入院・常時臥床は最高10点です。",
    image:
      "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?w=800&h=400&fit=crop",
    category: "疾病・障害",
    categoryColor: "purple",
    content: `<h2>匝瑳市の疾病・障害・介護の基準指数</h2>
<p>匝瑳市では就労以外の理由でも保育の必要性が認められ、疾病・障害・介護については段階的な基準指数が設定されています。</p>

<h3>疾病の基準指数</h3>
<table>
<thead><tr><th>状況</th><th>基準指数</th></tr></thead>
<tbody>
<tr><td>1か月以上の入院 / 常時臥床</td><td>10点</td></tr>
<tr><td>精神性等疾患</td><td>9点</td></tr>
<tr><td>一般療養</td><td>7点</td></tr>
<tr><td>軽症定期通院</td><td>5点</td></tr>
</tbody>
</table>

<h3>障害の基準指数</h3>
<table>
<thead><tr><th>障害の程度</th><th>基準指数</th></tr></thead>
<tbody>
<tr><td>身体障害者手帳1・2級 / 療育手帳A等</td><td>10点</td></tr>
<tr><td>身体障害者手帳3級 / 療育手帳B等</td><td>7点</td></tr>
<tr><td>身体障害者手帳4級以下等</td><td>5点</td></tr>
</tbody>
</table>

<h3>介護・看護の基準指数</h3>
<table>
<thead><tr><th>介護・看護の状況</th><th>基準指数</th></tr></thead>
<tbody>
<tr><td>週40時間以上</td><td>9点</td></tr>
<tr><td>週32時間以上</td><td>8点</td></tr>
<tr><td>週24時間以上</td><td>7点</td></tr>
<tr><td>その他</td><td>5点</td></tr>
</tbody>
</table>

<div class="info-box">
<p><strong>申請に必要な書類</strong></p>
<p>疾病・障害・介護を理由とする場合は、医師の診断書や障害者手帳など、状況を証明する書類が必要です。詳細は匝瑳市子育て支援課にご確認ください。</p>
</div>`,
    publishedAt: "2026-06-26",
  },
  {
    slug: "sosa-dv-abuse",
    citySlug: "sosa",
    title: "匝瑳市の虐待・DV世帯の保育所入所｜基準指数20点",
    description:
      "匝瑳市では虐待・DVに該当する場合、基準指数として20点が付与されます。緊急性の高い保護を最優先とする制度設計です。",
    image:
      "https://images.unsplash.com/photo-1590012314607-cda9d9b699ae?w=800&h=400&fit=crop",
    category: "調整指数",
    categoryColor: "amber",
    content: `<h2>匝瑳市の虐待・DV世帯の保育所入所</h2>
<p>匝瑳市では、児童虐待防止法または配偶者からの暴力の防止及び被害者の保護等に関する法律（DV防止法）の対象者と認められる場合、<span class="highlight">基準指数として20点</span>が付与されます。通常の居宅外就労フルタイム（10点）の2倍であり、緊急性の高い保護を最優先する制度設計です。</p>

<h3>対象となる状況</h3>
<ul>
<li>児童虐待防止等に関する法律第2条の対象（身体的虐待・心理的虐待・性的虐待・ネグレクト）</li>
<li>配偶者からの暴力（DV）の防止及び被害者の保護等に関する法律第1条の対象</li>
</ul>

<h3>指数計算例</h3>
<p>DV被害を理由に保育を申請する場合：</p>
<ul>
<li>基準指数（DV）：20点</li>
<li>もう一方の保護者の指数が加算される場合もあります</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>虐待・DVの場合は行政の支援機関（配偶者暴力相談支援センター・児童相談所等）と連携して優先的な保護が行われます。申請前に担当窓口にご相談ください。</p>
</div>

<div class="info-box">
<p><strong>相談窓口</strong></p>
<p>DV・虐待の相談は匝瑳市役所の担当窓口または千葉県の配偶者暴力相談支援センターへお問い合わせください。</p>
</div>`,
    publishedAt: "2026-06-26",
  },
  {
    slug: "sosa-grandparent",
    citySlug: "sosa",
    title: "匝瑳市の同居祖父母と保育所申込｜減点の条件と対策",
    description:
      "匝瑳市では65歳未満の同居親族が保育可能な場合に-1点の減点があります。対象条件と対策を解説します。",
    image:
      "https://images.unsplash.com/photo-1516589091380-5d8e87df6999?w=800&h=400&fit=crop",
    category: "調整指数",
    categoryColor: "amber",
    content: `<h2>匝瑳市の同居祖父母と保育所申込</h2>
<p>匝瑳市では、<span class="highlight">65歳未満の同居親族が保育可能な場合</span>に調整指数-1点の減点が適用されます。ただし減点幅は小さく、就労状況が良好であれば保育所入所に大きく影響しないことがほとんどです。</p>

<h3>減点が適用されない場合</h3>
<ul>
<li>同居祖父母等が就労している場合</li>
<li>同居祖父母等が疾病・障害等により保育が困難な場合</li>
<li>同居祖父母等が65歳以上の場合</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>匝瑳市の祖父母減点は-1点と比較的軽微です。父母ともに十分な就労実績がある世帯では影響が限定的です。</p>
</div>

<div class="info-box">
<p><strong>確認が必要な場合</strong></p>
<p>同居親族の状況（就労・疾病等）については、申請時に詳細を申告する必要があります。匝瑳市子育て支援課にご相談ください。</p>
</div>`,
    publishedAt: "2026-06-26",
  },
  {
    slug: "sosa-welfare",
    citySlug: "sosa",
    title: "匝瑳市の生活保護・非課税世帯と保育所申込",
    description:
      "匝瑳市では生活保護世帯（就労自立見込み）に+5点、市民税非課税世帯に+1点の加点があります。",
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop",
    category: "調整指数",
    categoryColor: "amber",
    content: `<h2>匝瑳市の生活保護・非課税世帯の加点</h2>
<p>匝瑳市では経済的困難を抱える世帯に対して調整指数の加点が設けられています。</p>

<h3>加点の内容</h3>
<table>
<thead><tr><th>状況</th><th>調整指数</th></tr></thead>
<tbody>
<tr><td>生活保護世帯（就労自立見込み）</td><td>+5点</td></tr>
<tr><td>市民税非課税世帯</td><td>+1点</td></tr>
</tbody>
</table>

<h3>生活保護の加点について</h3>
<p>「就労自立見込み」の条件が付いています。保護者が就労に向けた活動をしていることが条件となる場合があります。詳細は匝瑳市の担当窓口でご確認ください。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>生活保護世帯は就労意欲のある方を優先するため、+5点の加点が設定されています。就労活動の実績を示す書類が必要になる場合があります。</p>
</div>`,
    publishedAt: "2026-06-26",
  },
  {
    slug: "sosa-hokatsu-tips",
    citySlug: "sosa",
    title: "匝瑳市の保活のコツ｜sum方式で点数を最大化する方法",
    description:
      "匝瑳市のsum方式の選考を理解して保活を有利に進めるコツを解説。父母ともに就労状況を整えることが重要です。",
    image:
      "https://images.unsplash.com/photo-1568952433726-3896e3881c65?w=800&h=400&fit=crop",
    category: "保活のコツ",
    categoryColor: "teal",
    content: `<h2>匝瑳市の保活を有利に進めるコツ</h2>
<p>匝瑳市はsum方式のため、<span class="highlight">父母ともに就労状況を整えること</span>が最も確実な方法です。一方のみのフルタイムより、両方がパートタイムでも合計点が高くなる場合があります。</p>

<h3>点数を上げる主なポイント</h3>
<ul>
<li><strong>就労日数・時間を増やす</strong>：月16日以上・1日6時間以上を目標に</li>
<li><strong>ひとり親の場合</strong>：+15点の調整指数が自動加算されます</li>
<li><strong>障害のある子どもの場合</strong>：+5点の調整指数が加算されます</li>
<li><strong>保育料の滞納をなくす</strong>：滞納月数×-1点の減点を避けましょう</li>
</ul>

<h3>注意点</h3>
<ul>
<li>65歳未満の同居親族が保育可能な場合は-1点の減点があります</li>
<li>きょうだいが幼稚園在園（保育所申込なし）の場合も-1点の減点</li>
<li>親族経営で就労時間の融通が利く場合も-1点</li>
</ul>

<h3>入所申込のタイムライン</h3>
<ul>
<li>4月入所の場合：通常前年の10〜11月頃に申込受付</li>
<li>年度途中入所：毎月または定期的に受付</li>
</ul>

<div class="info-box">
<p><strong>最新情報の確認</strong></p>
<p>申込時期や必要書類は年度により変更される場合があります。必ず<a href="https://www.city.sosa.lg.jp/" target="_blank" rel="noopener">匝瑳市公式サイト</a>でご確認ください。</p>
</div>`,
    publishedAt: "2026-06-26",
  },
];

registerArticles(sosaArticles);
