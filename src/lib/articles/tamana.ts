import type { Article } from "./types";
import { registerArticles } from "./index";

const tamanaArticles: Article[] = [
  {
    slug: "tamana-guide",
    citySlug: "tamana",
    title: "玉名市の保育所入所点数（指数）ガイド｜月間総時間数と日数で評価される独自方式",
    description:
      "熊本県玉名市の保育所入所選考は月間総就労時間数と月間日数の組み合わせで評価する独自の方式です。月150時間以上かつ月12日以上で最高10点。ひとり親+10点のルールを解説します。",
    image:
      "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>玉名市の保育所入所選考制度</h2>
<p>熊本県玉名市の保育所入所選考は<span class="highlight">月間総就労時間数と月間就労日数の組み合わせ</span>で基準点数が決まる独自の評価方式を採用しています。</p>

<h3>基本的な計算の仕組み</h3>
<ul>
<li>父母それぞれの基準点数を算出して合算</li>
<li>調整指数（別表第2）を加減して合計点を算出</li>
<li>合計点が高い世帯から順に入所が優先される</li>
</ul>

<h3>就労評価の特徴</h3>
<p>玉名市では<span class="highlight">月間総就労時間数（例：月150時間以上）と月間就労日数（例：月12日以上）の両方を満たすこと</span>が最高指数の条件です。月150時間以上かつ月12日以上で最高10点が得られます。</p>

<h3>ひとり親の特別ルール</h3>
<p>ひとり親世帯は<strong>基準点数に+10点が加算</strong>されます。さらに調整指数として同居親族の有無に応じて+1または+2点が追加加算されます。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳細は<a href="https://www.city.tamana.lg.jp/" target="_blank" rel="noopener">玉名市公式サイト</a>の子育て・保育に関するページをご確認ください。</p>
</div>`,
    publishedAt: "2026-06-26",
  },
  {
    slug: "tamana-employment",
    citySlug: "tamana",
    title: "玉名市の保育所点数｜就労指数一覧（月間総時間数と就労日数で評価）",
    description:
      "玉名市の就労基準点数を解説します。月150時間以上かつ月12日以上で最高10点。外勤・自営業・在宅勤務が対象。就労予定の場合は就労中の点数から1点減となります。",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=400&fit=crop",
    category: "就労",
    categoryColor: "blue",
    content: `<h2>玉名市の就労基準点数</h2>
<p>玉名市の就労評価は<span class="highlight">月間総就労時間数と月間就労日数の組み合わせ</span>で評価します。外勤・自営業・在宅勤務（テレワーク）が対象です。</p>

<h3>就労中の基準点数一覧</h3>
<table>
<thead><tr><th>月間総就労時間数</th><th>月間就労日数</th><th>基準点数</th></tr></thead>
<tbody>
<tr><td>150時間以上</td><td>12日以上</td><td>10点</td></tr>
<tr><td>100〜150時間未満</td><td>12日以上</td><td>8点</td></tr>
<tr><td>48〜100時間未満</td><td>12日以上</td><td>6点</td></tr>
<tr><td>48時間以上</td><td>12日未満</td><td>4点</td></tr>
<tr><td colspan="2">その他の就労（月12日以上かつ1日4時間以上）</td><td>4点</td></tr>
<tr><td colspan="2">その他の就労（月48時間以上）</td><td>3点</td></tr>
</tbody>
</table>

<h3>就労予定（内定・採用確定）の場合</h3>
<p>就労が確定しているが就労開始前の場合、就労中の点数から<strong>1点減</strong>となります。</p>
<table>
<thead><tr><th>相当する月間就労時間</th><th>基準点数</th></tr></thead>
<tbody>
<tr><td>月150時間以上かつ12日以上相当</td><td>9点</td></tr>
<tr><td>月100〜150時間未満かつ12日以上相当</td><td>7点</td></tr>
<tr><td>月48〜100時間未満かつ12日以上相当</td><td>5点</td></tr>
<tr><td>月48時間以上かつ12日未満相当</td><td>3点</td></tr>
</tbody>
</table>

<h3>内職の場合</h3>
<p>月2万円以上の内職収入実績が1か月以上ある場合：<strong>5点</strong></p>

<h3>求職中の場合</h3>
<p>求職活動中（就職活動中）：<strong>1点</strong></p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>月150時間以上の就労は1日約6〜7時間×22日のイメージです。パートタイムでも月100時間以上かつ月12日以上就労していれば8点が得られます。</p>
</div>`,
    publishedAt: "2026-06-26",
  },
  {
    slug: "tamana-illness-disability",
    citySlug: "tamana",
    title: "玉名市の保育所点数｜疾病・障害・介護の基準点数",
    description:
      "玉名市の疾病・障害・介護を理由とする基準点数を解説します。入院中・入院予定・常時病臥の区分別、障害等級別の点数を確認できます。",
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=400&fit=crop",
    category: "疾病・障害・介護",
    categoryColor: "rose",
    content: `<h2>玉名市の疾病・障害・介護基準点数</h2>

<h3>疾病の基準点数</h3>
<table>
<thead><tr><th>状況</th><th>基準点数</th></tr></thead>
<tbody>
<tr><td>入院中</td><td>10点</td></tr>
<tr><td>入院予定</td><td>9点</td></tr>
<tr><td>1か月以上常時病臥</td><td>8点</td></tr>
<tr><td>その他の疾病</td><td>6点</td></tr>
</tbody>
</table>

<h3>障害の基準点数</h3>
<table>
<thead><tr><th>障害の程度</th><th>基準点数</th></tr></thead>
<tbody>
<tr><td>身体1・2級 / 療育手帳A1・A2 / 精神1級</td><td>10点</td></tr>
<tr><td>身体3級 / 療育手帳B1 / 精神2級</td><td>7点</td></tr>
<tr><td>身体4級 / 療育手帳B2 / 精神3級</td><td>5点</td></tr>
</tbody>
</table>

<h3>介護・看護の基準点数</h3>
<p>家族の居宅介護・看護が必要な場合、<span class="highlight">就労の区分に準じて算定</span>されます。月間の介護時間と日数で就労と同じグリッドを使って点数を算出します。</p>
<p>また、申請する子どもが入院し付き添いが必要な場合は<strong>10点</strong>が付与されます。</p>

<h3>その他の保育が必要な理由</h3>
<ul>
<li><strong>妊娠・出産</strong>：産前産後の指定期間 10点</li>
<li><strong>虐待・DV</strong>：10点</li>
<li><strong>災害</strong>：家屋損傷等 10点</li>
</ul>`,
    publishedAt: "2026-06-26",
  },
  {
    slug: "tamana-single-parent",
    citySlug: "tamana",
    title: "玉名市の保育所点数｜ひとり親世帯の基準点数+10点と調整加算",
    description:
      "玉名市ではひとり親世帯に基準点数+10点が加算され、さらに調整指数として同居親族なしなら+2点が加算されます。計算例と申請のポイントを解説します。",
    image:
      "https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=800&h=400&fit=crop",
    category: "ひとり親",
    categoryColor: "purple",
    content: `<h2>玉名市のひとり親世帯の特別ルール</h2>
<p>玉名市では、ひとり親世帯に対して<span class="highlight">基準点数に+10点</span>が加算されます。これは別表第1で規定される特別ルールです。</p>

<h3>計算例</h3>
<p>外勤で月150時間以上かつ月12日以上就労しているひとり親（同居親族なし）の場合：</p>
<table>
<thead><tr><th>項目</th><th>点数</th></tr></thead>
<tbody>
<tr><td>保護者1（就労）</td><td>10点</td></tr>
<tr><td>保護者2（不在）</td><td>0点</td></tr>
<tr><td>ひとり親基準点数加算</td><td>+10点</td></tr>
<tr><td>ひとり親調整（同居親族なし）</td><td>+2点</td></tr>
<tr><td><strong>合計</strong></td><td><strong>22点</strong></td></tr>
</tbody>
</table>

<h3>同居の親族がいる場合</h3>
<p>同居の親族（祖父母等）がいる場合は調整指数として<strong>+1点</strong>、同居の親族がいない場合は<strong>+2点</strong>が加算されます。</p>

<h3>同点者選考（別表第3）での優先</h3>
<p>合計点が同じ場合は別表第3による同点者選考が行われますが、ひとり親世帯・離婚調停中が最優先グループとなっています（3点）。</p>`,
    publishedAt: "2026-06-26",
  },
  {
    slug: "tamana-adjustment",
    citySlug: "tamana",
    title: "玉名市の保育所点数｜調整指数（加点・減点）一覧",
    description:
      "玉名市の保育所入所選考における調整指数を一覧で解説します。きょうだい在園+5点・小規模保育卒園+5点・滞納-5点など全項目を確認できます。",
    image:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop",
    category: "調整指数",
    categoryColor: "amber",
    content: `<h2>玉名市の調整指数（加点・減点）一覧</h2>

<h3>加点項目</h3>
<table>
<thead><tr><th>状況</th><th>加点</th></tr></thead>
<tbody>
<tr><td>ひとり親（基準点数加算）</td><td>+10点</td></tr>
<tr><td>ひとり親（同居親族なし）</td><td>+2点</td></tr>
<tr><td>ひとり親（同居親族あり）</td><td>+1点</td></tr>
<tr><td>きょうだいが保育施設を利用中</td><td><strong>+5点</strong></td></tr>
<tr><td>小規模保育施設から連携施設への卒園入所</td><td><strong>+5点</strong></td></tr>
<tr><td>産休・育休明けの職場復帰に伴う申込</td><td>+2点</td></tr>
<tr><td>生活保護世帯（就労による自立支援）</td><td>+2点</td></tr>
<tr><td>児童虐待として支援が必要と判断</td><td>+4点</td></tr>
<tr><td>保護者に重度障害</td><td>+2点</td></tr>
<tr><td>申請する子どもに重度障害</td><td>+2点</td></tr>
<tr><td>保護者に軽度障害</td><td>+1点</td></tr>
<tr><td>申請する子どもに軽度障害</td><td>+1点</td></tr>
<tr><td>失業により就労必要性が高い</td><td>+1点</td></tr>
<tr><td>保護者が保育・教育施設に従事</td><td>+1点</td></tr>
</tbody>
</table>

<h3>減点項目</h3>
<table>
<thead><tr><th>状況</th><th>減点</th></tr></thead>
<tbody>
<tr><td>求職中の65歳未満の同居祖父母がいる</td><td><strong>-5点</strong></td></tr>
<tr><td>6か月以上滞納かつ納付実績なし</td><td>-5点</td></tr>
<tr><td>6か月以上滞納または納付実績なし</td><td>-3点</td></tr>
<tr><td>3か月以上滞納かつ納付実績なし</td><td>-1点</td></tr>
</tbody>
</table>

<div class="point-box">
<p><strong>注意点</strong></p>
<p>求職中の65歳未満の同居祖父母がいる場合は<strong>-5点</strong>という大きな減算があります。祖父母が就労している場合は就労証明書を準備しましょう。</p>
</div>`,
    publishedAt: "2026-06-26",
  },
  {
    slug: "tamana-tips",
    citySlug: "tamana",
    title: "玉名市の保活で点数を上げるコツ｜月150時間以上就労と加点活用法",
    description:
      "玉名市の保育所入所を有利にするポイントを解説します。月150時間以上・12日以上の就労時間確保・きょうだい在園加算・産休育休復帰加算などの活用法を紹介します。",
    image:
      "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?w=800&h=400&fit=crop",
    category: "保活のコツ",
    categoryColor: "green",
    content: `<h2>玉名市の保活で点数を上げるコツ</h2>

<h3>1. 月間総就労時間を月150時間以上・月12日以上に</h3>
<p>最高の10点を得るには月間150時間以上かつ月12日以上の就労が必要です。月150時間は1日約6〜7時間×22日程度。就労証明書に正確な月間総就労時間と月間就労日数を記載してもらいましょう。</p>

<h3>2. きょうだいが保育施設を利用中なら+5点</h3>
<p>きょうだいが保育所等に在籍している場合は+5点の大きな加算があります。上の子が入所していれば有利です。</p>

<h3>3. 小規模保育を経由した入所で+5点</h3>
<p>小規模保育事業所から連携施設（認可保育所等）への卒園入所の場合は+5点が加算されます。</p>

<h3>4. 産休・育休明けの復帰申込で+2点</h3>
<p>育児休業から職場復帰するタイミングでの申込には+2点の加算があります。</p>

<h3>5. 同居の祖父母が非就労の場合は注意</h3>
<p>求職中の65歳未満の同居祖父母がいると<strong>-5点</strong>の大きな減算があります。祖父母が就労している場合は就労証明書を準備しましょう。</p>

<h3>6. 保育料の滞納は避ける</h3>
<p>保育料等の滞納は最大-5点の大きな減算があります。過去の保育料は期日通りに納付しましょう。</p>

<div class="info-box">
<p><strong>申込・相談窓口</strong></p>
<p>詳細は玉名市の子育て支援・保育担当窓口にお問い合わせください。</p>
</div>`,
    publishedAt: "2026-06-26",
  },
];

registerArticles(tamanaArticles);
