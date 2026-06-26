import type { Article } from "./types";
import { registerArticles } from "./index";

const mannoArticles: Article[] = [
  {
    slug: "manno-guide",
    citySlug: "manno",
    title: "まんのう町の保育所入所点数（指数）ガイド｜合算方式と調整指数の仕組み",
    description:
      "香川県まんのう町の認定こども園等入所選考は合算方式を採用。父母の基準指数を合算し調整指数を加減します。家庭外労働最大10点・ひとり親+14点のルールを解説します。",
    image:
      "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>まんのう町の入所選考制度</h2>
<p>香川県まんのう町の認定こども園等への入所選考は<span class="highlight">合算方式</span>を採用しています。父母それぞれの基準指数を算出して合算し、調整指数を加減した合計点で優先順位を決定します。</p>

<h3>基本的な計算の仕組み</h3>
<ul>
<li>父・母それぞれの基準指数を算出（各最大10点）</li>
<li>父の基準指数＋母の基準指数を合算（通常最大20点）</li>
<li>調整指数（加算・減算）を加減</li>
<li>合計点が高い世帯から入所が優先される</li>
</ul>

<h3>複数要件への該当</h3>
<p>保護者が複数の要件（就労と疾病など）に該当する場合は、<span class="highlight">各要件のうち最も高い点数の要件のみを採用</span>します。</p>

<h3>特徴的な調整指数</h3>
<p>まんのう町では<strong>ひとり親世帯に+14点</strong>という高い調整指数が設けられています。また、<strong>倒産・失業による求職中の場合は+8点</strong>が加算されます。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳細は<a href="https://www.town.manno.lg.jp/" target="_blank" rel="noopener">まんのう町公式サイト</a>の子育て・保育に関するページをご確認ください。</p>
</div>`,
    publishedAt: "2026-06-26",
  },
  {
    slug: "manno-employment",
    citySlug: "manno",
    title: "まんのう町の保育所点数｜家庭外就労（外勤・自営業）の指数一覧",
    description:
      "まんのう町の家庭外就労（外勤・テレワーク等）の基準指数を解説します。月20日以上×8時間以上で最高10点。月間就労日数と1日の就労時間の組み合わせで決まります。",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=400&fit=crop",
    category: "就労",
    categoryColor: "blue",
    content: `<h2>まんのう町の家庭外就労基準指数</h2>
<p>まんのう町の家庭外労働（外勤・テレワーク等）は、月間就労日数と1日の就労時間の組み合わせで指数が決まります。</p>

<h3>家庭外就労基準指数一覧</h3>
<table>
<thead><tr><th>月間就労日数</th><th>1日の就労時間</th><th>基準指数</th></tr></thead>
<tbody>
<tr><td>月20日以上</td><td>8時間以上</td><td>10点</td></tr>
<tr><td>月20日以上</td><td>6〜8時間未満</td><td>9点</td></tr>
<tr><td>月20日以上</td><td>4〜6時間未満</td><td>8点</td></tr>
<tr><td>月16日以上</td><td>8時間以上</td><td>8点</td></tr>
<tr><td>月16日以上</td><td>6〜8時間未満</td><td>7点</td></tr>
<tr><td>月16日以上</td><td>4〜6時間未満</td><td>6点</td></tr>
<tr><td colspan="2">その他（月16日未満等）</td><td>3点</td></tr>
</tbody>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>月20日以上・1日8時間以上の就労で最高10点が得られます。就労証明書に正確な月間就労日数と1日の就労時間を記載してもらうことが重要です。</p>
</div>`,
    publishedAt: "2026-06-26",
  },
  {
    slug: "manno-home-employment",
    citySlug: "manno",
    title: "まんのう町の保育所点数｜家庭内就労（農業・自営業・内職）の指数",
    description:
      "まんのう町の家庭内就労（農業・自営業等）と内職の基準指数を解説します。農業・自営業は最大9点、内職は最大7点。就労日数と時間の組み合わせで点数が決まります。",
    image:
      "https://images.unsplash.com/photo-1556745757-8d76bdb6984b?w=800&h=400&fit=crop",
    category: "自営業・在宅就労",
    categoryColor: "teal",
    content: `<h2>まんのう町の家庭内就労・内職基準指数</h2>

<h3>家庭内就労（農業・自営業等）</h3>
<table>
<thead><tr><th>月間就労日数</th><th>1日の就労時間</th><th>基準指数</th></tr></thead>
<tbody>
<tr><td>月20日以上</td><td>8時間以上</td><td>9点</td></tr>
<tr><td>月20日以上</td><td>6〜8時間未満</td><td>8点</td></tr>
<tr><td>月20日以上</td><td>4〜6時間未満</td><td>7点</td></tr>
<tr><td>月16日以上</td><td>8時間以上</td><td>7点</td></tr>
<tr><td>月16日以上</td><td>6〜8時間未満</td><td>6点</td></tr>
<tr><td>月16日以上</td><td>4〜6時間未満</td><td>5点</td></tr>
<tr><td colspan="2">その他</td><td>3点</td></tr>
</tbody>
</table>

<h3>内職等</h3>
<table>
<thead><tr><th>月間就労日数</th><th>1日の就労時間</th><th>基準指数</th></tr></thead>
<tbody>
<tr><td>月20日以上</td><td>8時間以上</td><td>7点</td></tr>
<tr><td>月20日以上</td><td>6〜8時間未満</td><td>6点</td></tr>
<tr><td>月20日以上</td><td>4〜6時間未満</td><td>5点</td></tr>
<tr><td>月16日以上</td><td>8時間以上</td><td>5点</td></tr>
<tr><td>月16日以上</td><td>6〜8時間未満</td><td>4点</td></tr>
<tr><td>月16日以上</td><td>4〜6時間未満</td><td>3点</td></tr>
<tr><td colspan="2">その他</td><td>2点</td></tr>
</tbody>
</table>`,
    publishedAt: "2026-06-26",
  },
  {
    slug: "manno-illness-disability",
    citySlug: "manno",
    title: "まんのう町の保育所点数｜疾病・障害・介護の基準指数",
    description:
      "まんのう町の疾病・障害・介護を理由とする基準指数を解説します。入院・精神疾患は10点、障害等級・通院頻度・介護状況別の点数を確認できます。",
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=400&fit=crop",
    category: "疾病・障害・介護",
    categoryColor: "rose",
    content: `<h2>まんのう町の疾病・障害・介護基準指数</h2>

<h3>疾病の基準指数</h3>
<table>
<thead><tr><th>状況</th><th>基準指数</th></tr></thead>
<tbody>
<tr><td>入院</td><td>10点</td></tr>
<tr><td>常時病臥（医師が1か月以上と診断）</td><td>10点</td></tr>
<tr><td>精神性疾患・感染症・特殊疾病</td><td>10点</td></tr>
<tr><td>常時安静（医師が1か月以上と診断）</td><td>7点</td></tr>
<tr><td>週5日以上通院</td><td>7点</td></tr>
<tr><td>週4日以上通院</td><td>5点</td></tr>
<tr><td>週3日以上通院</td><td>3点</td></tr>
<tr><td>その他保育が必要な状態</td><td>2点</td></tr>
</tbody>
</table>

<h3>障害の基準指数</h3>
<table>
<thead><tr><th>障害の程度</th><th>基準指数</th></tr></thead>
<tbody>
<tr><td>身体障害者手帳1・2級または療育手帳A以上</td><td>10点</td></tr>
<tr><td>身体障害者手帳3・4級または療育手帳B以上</td><td>7点</td></tr>
<tr><td>身体障害者手帳5・6級または療育手帳C以上</td><td>4点</td></tr>
</tbody>
</table>

<h3>介護・看護の基準指数</h3>
<p><strong>居宅外（施設等への付き添い）</strong></p>
<table>
<thead><tr><th>状況</th><th>基準指数</th></tr></thead>
<tbody>
<tr><td>週5日以上付き添い</td><td>9点</td></tr>
<tr><td>週4日以上付き添い</td><td>7点</td></tr>
<tr><td>週3日以上付き添い</td><td>5点</td></tr>
<tr><td>その他特に保育が必要な場合</td><td>2点</td></tr>
</tbody>
</table>

<p><strong>居宅内（自宅での常時介護）</strong></p>
<table>
<thead><tr><th>状況</th><th>基準指数</th></tr></thead>
<tbody>
<tr><td>身体1・2級/療育A/要介護4以上の常時介護</td><td>9点</td></tr>
<tr><td>身体3・4級/療育B/要介護2・3の常時介護</td><td>7点</td></tr>
<tr><td>その他特に保育が必要な場合</td><td>2点</td></tr>
</tbody>
</table>`,
    publishedAt: "2026-06-26",
  },
  {
    slug: "manno-single-parent",
    citySlug: "manno",
    title: "まんのう町の保育所点数｜ひとり親世帯の調整指数（+14点）",
    description:
      "まんのう町ではひとり親世帯に調整指数+14点が加算されます。不在（死亡等）の10点と合わせた計算例や、離婚調停中の加算についても解説します。",
    image:
      "https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=800&h=400&fit=crop",
    category: "ひとり親",
    categoryColor: "purple",
    content: `<h2>まんのう町のひとり親世帯の調整指数</h2>
<p>まんのう町ではひとり親世帯に<span class="highlight">+14点</span>という高い調整指数が設けられています。</p>

<h3>計算例</h3>
<p>外勤月20日以上・8時間以上（10点）のひとり親の場合：</p>
<table>
<thead><tr><th>項目</th><th>点数</th></tr></thead>
<tbody>
<tr><td>保護者1（就労）</td><td>10点</td></tr>
<tr><td>保護者2（不在：死亡・行方不明等）</td><td>10点</td></tr>
<tr><td>ひとり親調整指数</td><td>+14点</td></tr>
<tr><td><strong>合計</strong></td><td><strong>34点</strong></td></tr>
</tbody>
</table>

<h3>不在（死亡・行方不明・拘禁等）の指数</h3>
<p>父または母が死亡・行方不明・拘禁等により不在の場合、その親の基準指数として<strong>10点</strong>が付与されます。</p>

<h3>離婚調停中の場合</h3>
<p>離婚調停中の場合は調整指数として<strong>+4点</strong>が加算されます（ひとり親確定前の暫定措置）。</p>`,
    publishedAt: "2026-06-26",
  },
  {
    slug: "manno-adjustment",
    citySlug: "manno",
    title: "まんのう町の保育所点数｜調整指数（加点・減点）一覧",
    description:
      "まんのう町の保育利用調整における調整指数を一覧で解説。ひとり親+14点・倒産失業+8点・一斉入所申込+1点・同居祖父母非就労-2点などのルールを確認できます。",
    image:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop",
    category: "調整指数",
    categoryColor: "amber",
    content: `<h2>まんのう町の調整指数（加点・減点）一覧</h2>

<h3>加点項目</h3>
<table>
<thead><tr><th>状況</th><th>加点</th></tr></thead>
<tbody>
<tr><td>ひとり親世帯</td><td><strong>+14点</strong></td></tr>
<tr><td>倒産・失業による求職中（生計中心者）</td><td>+8点</td></tr>
<tr><td>離婚調停中</td><td>+4点</td></tr>
<tr><td>疾病により就労不可（生計中心者）</td><td>+4点</td></tr>
<tr><td>求職中に内定が決まっている</td><td>+3点</td></tr>
<tr><td>海外単身赴任中</td><td>+3点</td></tr>
<tr><td>生活保護世帯（就労による自立見込み）</td><td>+3点</td></tr>
<tr><td>国内単身赴任中</td><td>+2点</td></tr>
<tr><td>申請する子どもが障害（療育手帳A以上等）を有する</td><td>+2点</td></tr>
<tr><td>一斉入所申込受付日までに申込</td><td>+1点</td></tr>
<tr><td>育児休業取得後の職場復帰に伴う申込</td><td>+1点</td></tr>
<tr><td>きょうだいが同園に同時入所希望</td><td>+1点</td></tr>
</tbody>
</table>

<h3>減点項目</h3>
<table>
<thead><tr><th>状況</th><th>減点</th></tr></thead>
<tbody>
<tr><td>同居の祖父母（障害・疾病なし）が非就労</td><td>-2点</td></tr>
<tr><td>別居の祖父母（障害・疾病なし）が非就労</td><td>-1点</td></tr>
<tr><td>配偶者等が経営する事業所に勤務</td><td>-1点</td></tr>
</tbody>
</table>

<div class="point-box">
<p><strong>注意点</strong></p>
<p>一斉入所の申込受付日までに申込をすると+1点の加算があります。早期申込が有利です。</p>
</div>`,
    publishedAt: "2026-06-26",
  },
  {
    slug: "manno-tips",
    citySlug: "manno",
    title: "まんのう町の保活で点数を上げるコツ｜入所しやすいタイミングと加点活用法",
    description:
      "まんのう町の認定こども園等への入所を有利にするポイントを解説します。就労日数・時間の確保・一斉入所期日前申込など実践的なアドバイスです。",
    image:
      "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?w=800&h=400&fit=crop",
    category: "保活のコツ",
    categoryColor: "green",
    content: `<h2>まんのう町の保活で点数を上げるコツ</h2>

<h3>1. 就労日数・時間を月20日以上・8時間以上に</h3>
<p>家庭外就労で最高10点を得るには、月20日以上かつ1日8時間以上の就労が必要です。就労証明書に正確な月間就労日数と1日の就労時間を記載してもらいましょう。</p>

<h3>2. 一斉入所の申込期日内に申込む（+1点）</h3>
<p>一斉入所の申込受付日までに申込をすると+1点の加算があります。期日を確認して早めに手続きしましょう。</p>

<h3>3. 育児休業復帰のタイミングで申込む（+1点）</h3>
<p>育児休業から職場復帰するタイミングでの申込には+1点の加算があります。</p>

<h3>4. 複数要件が重なる場合は最高点の要件を申告</h3>
<p>就労と疾病など複数の要件に該当する場合、最も高い点数の要件が採用されます。自分の状況で最高点になる要件を正確に申告しましょう。</p>

<h3>5. 減点に注意</h3>
<p>同居の祖父母（非就労）がいる場合は-2点の減算があります。祖父母が就労している場合はその旨を証明する書類を準備しましょう。</p>

<div class="info-box">
<p><strong>申込・相談窓口</strong></p>
<p>詳細はまんのう町の子育て支援・保育担当窓口にお問い合わせください。</p>
</div>`,
    publishedAt: "2026-06-26",
  },
];

registerArticles(mannoArticles);
