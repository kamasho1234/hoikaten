import type { Article } from "./types";
import { registerArticles } from "./index";

const murakamiArticles: Article[] = [
  {
    slug: "murakami-guide",
    citySlug: "murakami",
    title: "村上市の保育所入所点数（指数）完全ガイド｜合算方式とひとり親2倍ルール",
    description:
      "新潟県村上市の保育利用調整は合算方式（sum方式）を採用。父母の基準指数を合算し、ひとり親世帯は就労指数が2倍になる特別ルールがあります。",
    image:
      "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>村上市の保育所入所選考制度</h2>
<p>新潟県村上市の保育所入所選考は<span class="highlight">合算方式（sum方式）</span>を採用しています。父母それぞれの基準指数を算出して合算し、調整指数を加えた合計点で優先順位を決定します。</p>

<h3>村上市の就労評価の特徴</h3>
<p>他の多くの自治体が「月間就労日数×就労時間」のグリッドで評価するのに対し、村上市は<span class="highlight">1日の就労時間のみ</span>で指数が決まります（月間日数の区分はありません）。</p>

<h3>ひとり親世帯は就労指数が2倍</h3>
<p>村上市の大きな特徴として、<span class="highlight">ひとり親世帯では就労基準指数が2倍</span>になるルールがあります。例えば外勤で1日7時間以上就労しているひとり親は、就労指数が10点ではなく20点になります。</p>

<h3>選考の基本的な流れ</h3>
<ul>
<li>保護者ごとに「保育が必要な理由」を確認し、基準指数を算定</li>
<li>父の基準指数＋母の基準指数を合算（最大20点）</li>
<li>ひとり親の場合は就労基準指数を2倍に算定</li>
<li>調整指数（加点・減点）を加算</li>
<li>合計指数が高い世帯から順に内定</li>
</ul>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳細は<a href="https://www.city.murakami.lg.jp/" target="_blank" rel="noopener">村上市公式サイト</a>の子育て・保育に関するページをご確認ください。</p>
</div>`,
    publishedAt: "2026-06-26",
  },
  {
    slug: "murakami-employment",
    citySlug: "murakami",
    title: "村上市の保育所点数｜居宅外就労（外勤・自営業）の指数一覧",
    description:
      "村上市の居宅外就労の基準指数を解説します。外勤・自営業中心者は最大10点、自営業協力者は最大8点。1日の就労時間のみで評価されます。",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=400&fit=crop",
    category: "就労",
    categoryColor: "blue",
    content: `<h2>村上市の居宅外就労基準指数</h2>
<p>村上市の居宅外就労は「外勤・自営業中心者」と「自営業協力者」で点数が異なります。1日の就労時間のみで評価され、月間就労日数の区分はありません。</p>

<h3>外勤・自営業中心者の基準指数</h3>
<p>一般的な外勤（会社員等）や自営業・農業等で主体的に従事している方が対象です。</p>
<table>
<thead><tr><th>1日の就労時間</th><th>基準指数</th></tr></thead>
<tbody>
<tr><td>7時間以上</td><td>10点</td></tr>
<tr><td>6時間以上7時間未満</td><td>9点</td></tr>
<tr><td>5時間以上6時間未満</td><td>8点</td></tr>
<tr><td>5時間未満</td><td>7点</td></tr>
</tbody>
</table>

<h3>居宅外・自営業協力者の基準指数</h3>
<p>配偶者等の農業・自営業を補助的に手伝っている場合が対象です。</p>
<table>
<thead><tr><th>1日の就労時間</th><th>基準指数</th></tr></thead>
<tbody>
<tr><td>7時間以上</td><td>8点</td></tr>
<tr><td>6時間以上7時間未満</td><td>7点</td></tr>
<tr><td>5時間以上6時間未満</td><td>6点</td></tr>
<tr><td>5時間未満</td><td>5点</td></tr>
</tbody>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>村上市では月間就労日数の区分がなく、1日の就労時間のみで指数が決まります。1日の勤務時間が7時間以上であれば最高の10点が得られます。</p>
</div>`,
    publishedAt: "2026-06-26",
  },
  {
    slug: "murakami-home-employment",
    citySlug: "murakami",
    title: "村上市の保育所点数｜居宅内就労・内職の基準指数",
    description:
      "村上市の居宅内就労（自営業中心者・協力者）と内職の基準指数を解説します。自宅で仕事をしている方の点数計算方法を確認できます。",
    image:
      "https://images.unsplash.com/photo-1556745757-8d76bdb6984b?w=800&h=400&fit=crop",
    category: "自営業・在宅就労",
    categoryColor: "teal",
    content: `<h2>村上市の居宅内就労・内職基準指数</h2>
<p>自宅を拠点に就労している場合の指数です。居宅内就労も「中心者」と「協力者」で点数が異なります。</p>

<h3>居宅内・自営業中心者の基準指数</h3>
<p>自宅で主体的に事業を営んでいる方（在宅で事業主として活動している方等）が対象です。</p>
<table>
<thead><tr><th>1日の就労時間</th><th>基準指数</th></tr></thead>
<tbody>
<tr><td>7時間以上</td><td>9点</td></tr>
<tr><td>6時間以上7時間未満</td><td>8点</td></tr>
<tr><td>5時間以上6時間未満</td><td>7点</td></tr>
<tr><td>5時間未満</td><td>6点</td></tr>
</tbody>
</table>

<h3>居宅内・自営業協力者の基準指数</h3>
<p>自宅での配偶者の事業を補助している場合が対象です。</p>
<table>
<thead><tr><th>1日の就労時間</th><th>基準指数</th></tr></thead>
<tbody>
<tr><td>7時間以上</td><td>7点</td></tr>
<tr><td>6時間以上7時間未満</td><td>6点</td></tr>
<tr><td>5時間以上6時間未満</td><td>5点</td></tr>
<tr><td>5時間未満</td><td>4点</td></tr>
</tbody>
</table>

<h3>内職の基準指数</h3>
<table>
<thead><tr><th>1日の就労時間</th><th>基準指数</th></tr></thead>
<tbody>
<tr><td>7時間以上</td><td>6点</td></tr>
<tr><td>5時間以上7時間未満</td><td>5点</td></tr>
<tr><td>5時間未満</td><td>4点</td></tr>
</tbody>
</table>`,
    publishedAt: "2026-06-26",
  },
  {
    slug: "murakami-illness-care",
    citySlug: "murakami",
    title: "村上市の保育所点数｜疾病・障害・介護の基準指数",
    description:
      "村上市の疾病・障害・介護を理由とする基準指数を解説します。入院・障害等級・要介護度別の点数を確認できます。",
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=400&fit=crop",
    category: "疾病・障害・介護",
    categoryColor: "rose",
    content: `<h2>村上市の疾病・障害・介護基準指数</h2>

<h3>疾病・障害による保育の必要性</h3>
<table>
<thead><tr><th>状況</th><th>基準指数</th></tr></thead>
<tbody>
<tr><td>1か月以上の入院</td><td>10点</td></tr>
<tr><td>重度障害（身体1・2級、療育A等）</td><td>10点</td></tr>
<tr><td>中度障害（身体3級、療育B等）</td><td>6点</td></tr>
<tr><td>その他の保育困難な状態</td><td>4点</td></tr>
</tbody>
</table>

<h3>介護・看護による保育の必要性</h3>
<p>同居または近居の家族の介護・看護が必要な場合の指数です。</p>
<table>
<thead><tr><th>要介護度</th><th>基準指数</th></tr></thead>
<tbody>
<tr><td>要介護4・5程度以上</td><td>10点</td></tr>
<tr><td>要介護2・3程度</td><td>7点</td></tr>
<tr><td>その他の保育困難な状態</td><td>4点</td></tr>
</tbody>
</table>

<h3>その他の保育が必要な理由</h3>
<ul>
<li><strong>就学・職業訓練</strong>：8点（学校・職業訓練校に通学中）</li>
<li><strong>妊娠・出産</strong>：10点（産前・産後各2か月）</li>
<li><strong>求職活動</strong>：2点（継続的な求職活動中）</li>
</ul>`,
    publishedAt: "2026-06-26",
  },
  {
    slug: "murakami-single-parent",
    citySlug: "murakami",
    title: "村上市の保育所点数｜ひとり親世帯の就労指数2倍ルール",
    description:
      "村上市のひとり親世帯では就労基準指数が2倍になります。外勤7時間以上なら就労指数20点。調整指数+8点との組み合わせを解説します。",
    image:
      "https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=800&h=400&fit=crop",
    category: "ひとり親",
    categoryColor: "purple",
    content: `<h2>村上市のひとり親世帯の特別ルール</h2>
<p>村上市では、ひとり親世帯に対して<span class="highlight">就労基準指数が2倍</span>になる特別ルールが設けられています。</p>

<h3>就労指数の2倍ルールとは</h3>
<p>通常は父と母の基準指数を合算しますが、ひとり親世帯では保護者ひとりの就労指数が2倍に算定されます。</p>

<h3>計算例</h3>
<table>
<thead><tr><th>項目</th><th>通常世帯</th><th>ひとり親世帯</th></tr></thead>
<tbody>
<tr><td>外勤7時間以上（保護者1）</td><td>10点</td><td>10点</td></tr>
<tr><td>保護者2の就労指数</td><td>10点（相手方）</td><td>10点（2倍分）</td></tr>
<tr><td>基準指数合計</td><td>20点</td><td>20点</td></tr>
<tr><td>ひとり親調整指数</td><td>0点</td><td>+8点</td></tr>
<tr><td><strong>合計</strong></td><td><strong>20点</strong></td><td><strong>28点</strong></td></tr>
</tbody>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>就労指数の2倍ルールにより、ひとり親世帯は基準指数の段階で通常の共働き世帯と同等の20点が確保されます。さらに調整指数+8点が加算されるため、実質的に大幅優遇されます。</p>
</div>

<h3>シミュレーターでの入力方法</h3>
<p>当サイトのシミュレーターでは、ひとり親の就労追加指数を「調整指数」欄にある「ひとり親世帯の就労追加指数」で入力できます。保護者1と同じ就労状況を選択してください。</p>`,
    publishedAt: "2026-06-26",
  },
  {
    slug: "murakami-adjustment",
    citySlug: "murakami",
    title: "村上市の保育所点数｜調整指数（加点・減点）一覧",
    description:
      "村上市の保育利用調整における調整指数を一覧で解説。保育士+10点・地域型保育卒園+10点・待機期間加点など特徴的な加算を確認できます。",
    image:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop",
    category: "調整指数",
    categoryColor: "amber",
    content: `<h2>村上市の調整指数（加点・減点）一覧</h2>

<h3>加点項目</h3>
<table>
<thead><tr><th>状況</th><th>加点</th></tr></thead>
<tbody>
<tr><td>ひとり親世帯（定額）</td><td>+8点</td></tr>
<tr><td>申請する子どもが障害を有する</td><td>+5点</td></tr>
<tr><td>生活保護世帯</td><td>+4点</td></tr>
<tr><td>保護者が保育所等に従事する保育士・保育教諭</td><td><strong>+10点</strong></td></tr>
<tr><td>きょうだいが保育所等に在園</td><td>+3点</td></tr>
<tr><td>育児休業からの職場復帰に伴う申込</td><td>+2点</td></tr>
<tr><td>片親が単身赴任・施設入所等で別居</td><td>+2点</td></tr>
<tr><td>地域型保育施設（小規模保育等）の卒園予定</td><td><strong>+10点</strong></td></tr>
<tr><td>認可外保育施設から移行継続利用中</td><td>+5点</td></tr>
<tr><td>集団保育が必要と判定されている</td><td>+2点</td></tr>
<tr><td>保留期間6か月以上</td><td>+3点</td></tr>
<tr><td>保留期間3〜6か月未満</td><td>+2点</td></tr>
<tr><td>保留期間3か月未満</td><td>+1点</td></tr>
</tbody>
</table>

<h3>減点項目</h3>
<table>
<thead><tr><th>状況</th><th>減点</th></tr></thead>
<tbody>
<tr><td>健康で未就労の65歳未満の同居親族がいる（保育可能）</td><td>-3点</td></tr>
</tbody>
</table>

<div class="point-box">
<p><strong>村上市の特徴的な調整指数</strong></p>
<p>保育士・保育教諭として働く保護者への<strong>+10点</strong>と、地域型保育施設卒園予定児への<strong>+10点</strong>は、他自治体と比べても高い加点です。保育人材確保と地域型保育の連携を重視している姿勢が現れています。</p>
</div>`,
    publishedAt: "2026-06-26",
  },
  {
    slug: "murakami-nursery-worker",
    citySlug: "murakami",
    title: "村上市の保育所点数｜保育士・保育教諭の特別加算（+10点）",
    description:
      "村上市では保護者が保育士・保育教諭として働いている場合、調整指数に+10点が加算されます。この特別ルールの詳細と計算例を解説します。",
    image:
      "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&h=400&fit=crop",
    category: "保育士加算",
    categoryColor: "teal",
    content: `<h2>村上市の保育士・保育教諭加算</h2>
<p>村上市では、保護者が<span class="highlight">保育所等に従事する保育士・保育教諭</span>である場合、調整指数として<span class="highlight">+10点</span>が加算されます。</p>

<h3>対象となる方</h3>
<ul>
<li>認可保育所・認定こども園等に勤務する保育士</li>
<li>幼稚園・認定こども園等に勤務する保育教諭</li>
</ul>

<h3>計算例</h3>
<p>外勤7時間以上（10点）で共働きの場合の基準指数20点に、保育士加算+10点が加算されると合計30点以上（他の調整指数次第）になります。</p>

<div class="info-box">
<p><strong>注意点</strong></p>
<p>勤務先が保育施設であることを証明する書類（在籍証明書等）の提出が必要となる場合があります。詳細は村上市の保育担当窓口にご確認ください。</p>
</div>`,
    publishedAt: "2026-06-26",
  },
  {
    slug: "murakami-waiting",
    citySlug: "murakami",
    title: "村上市の保育所点数｜保留期間（待機期間）加算のルール",
    description:
      "村上市では保留（待機）期間に応じて調整指数が加算されます。3か月未満+1点・3〜6か月+2点・6か月以上+3点のルールを解説します。",
    image:
      "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&h=400&fit=crop",
    category: "待機期間",
    categoryColor: "amber",
    content: `<h2>村上市の保留期間加算</h2>
<p>村上市では、保育所等への申込をしているにもかかわらず入所できない（保留・待機）期間に応じて、調整指数が加算されます。</p>

<h3>保留期間別の加点</h3>
<table>
<thead><tr><th>保留期間</th><th>加点</th></tr></thead>
<tbody>
<tr><td>3か月未満</td><td>+1点</td></tr>
<tr><td>3か月以上6か月未満</td><td>+2点</td></tr>
<tr><td>6か月以上</td><td>+3点</td></tr>
</tbody>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>長く待機しているほど加点が高くなるため、長期待機者が優先されやすい仕組みになっています。継続して申請を維持し、定期的に市の担当窓口と状況を確認することが重要です。</p>
</div>`,
    publishedAt: "2026-06-26",
  },
  {
    slug: "murakami-small-grad",
    citySlug: "murakami",
    title: "村上市の保育所点数｜地域型保育卒園・認可外移行加算",
    description:
      "村上市では小規模保育等の地域型保育施設を卒園予定の場合+10点、認可外から移行継続利用の場合+5点が加算されます。詳細を解説します。",
    image:
      "https://images.unsplash.com/photo-1555771113-c59a4db3aed2?w=800&h=400&fit=crop",
    category: "地域型保育・認可外",
    categoryColor: "green",
    content: `<h2>村上市の地域型保育卒園加算・認可外移行加算</h2>

<h3>地域型保育施設卒園予定加算（+10点）</h3>
<p>小規模保育事業・家庭的保育事業等の地域型保育施設（主に0〜2歳対象）を<span class="highlight">卒園予定の場合</span>、調整指数として<strong>+10点</strong>が加算されます。</p>

<h4>対象施設</h4>
<ul>
<li>小規模保育事業所</li>
<li>家庭的保育事業所（保育ママ）</li>
<li>事業所内保育所（地域型）</li>
</ul>

<p>地域型保育施設は原則として0〜2歳を対象としており、3歳以降は認可保育所等への転園が必要です。この連携保育を円滑にするための高い加点です。</p>

<h3>認可外保育施設からの移行継続加算（+5点）</h3>
<p>認可外保育施設から認可保育所等へ<span class="highlight">移行して継続利用する場合</span>、<strong>+5点</strong>の加算があります。</p>

<div class="point-box">
<p><strong>まとめ</strong></p>
<p>地域型保育施設や認可外保育施設を利用しながら保活をしている場合、これらの加算を活用することで有利に入所選考に臨めます。</p>
</div>`,
    publishedAt: "2026-06-26",
  },
  {
    slug: "murakami-hokatsu-tips",
    citySlug: "murakami",
    title: "村上市の保活で点数を上げるコツ｜入所しやすいタイミングと加点活用法",
    description:
      "村上市の保育所入所を有利にするポイントを解説します。就労時間の延長・保育士加算・地域型保育卒園加算・待機期間の積み上げなど実践的なアドバイスです。",
    image:
      "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?w=800&h=400&fit=crop",
    category: "保活のコツ",
    categoryColor: "green",
    content: `<h2>村上市の保活で点数を上げるコツ</h2>

<h3>1. 1日の就労時間を7時間以上に</h3>
<p>村上市は月間就労日数の区分がなく、1日の就労時間のみで基準指数が決まります。1日7時間以上の外勤で最高10点が得られます。就労証明書に正確な1日の就労時間を記載してもらいましょう。</p>

<h3>2. ひとり親世帯は就労指数が2倍</h3>
<p>ひとり親世帯では就労基準指数が2倍になります。外勤7時間以上なら就労指数20点になるため、大幅に有利です。</p>

<h3>3. 地域型保育施設を利用して+10点を獲得</h3>
<p>0〜2歳の間に小規模保育等の地域型保育施設を利用していれば、3歳以降の認可保育所への転園時に+10点の大きな加点があります。</p>

<h3>4. 早めに申込をして待機期間加点を積む</h3>
<p>保留期間が長いほど加点されます（6か月以上で+3点）。早期申込で待機期間を積み上げることも有効な戦略です。</p>

<h3>5. 育児休業復帰のタイミングで申込</h3>
<p>育児休業から職場復帰するタイミングでの申込には+2点の加算があります。</p>

<h3>6. 自営業は「中心者」として証明できると有利</h3>
<p>農業・自営業の場合、協力者より中心者として従事していることを証明できると高い指数が得られます。就労証明書に正確な役割を記載してもらいましょう。</p>

<div class="info-box">
<p><strong>申込・相談窓口</strong></p>
<p>詳細は村上市の子育て支援・保育担当窓口にお問い合わせください。</p>
</div>`,
    publishedAt: "2026-06-26",
  },
];

registerArticles(murakamiArticles);
