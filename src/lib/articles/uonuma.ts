import type { Article } from "./types";
import { registerArticles } from "./index";

const uonamaArticles: Article[] = [
  {
    slug: "uonuma-guide",
    citySlug: "uonuma",
    title: "魚沼市の保育所入所点数（指数）完全ガイド｜就労頻度と就労時間で決まる合算方式",
    description:
      "新潟県魚沼市の保育利用調整は合算方式（sum方式）を採用。父母の基準指数を合算し、週の就労日数と1日の就労時間の組み合わせで点数が決まります。",
    image:
      "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>魚沼市の保育所入所選考制度</h2>
<p>新潟県魚沼市の保育所入所選考は<span class="highlight">合算方式（sum方式）</span>を採用しています。父母それぞれの基準指数を算出して合算し、調整指数を加えた合計点で優先順位を決定します。</p>

<h3>魚沼市の就労評価の特徴</h3>
<p>魚沼市では<span class="highlight">就労頻度（週5日以上・週4日・週3日・月48時間以上）</span>と<span class="highlight">1日の就労時間（7時間以上〜3時間以上）</span>の組み合わせで基準指数が決まります。居宅外（外勤等）が最大10点、居宅内（在宅・自営等）が最大9点です。</p>

<h3>選考の基本的な流れ</h3>
<ul>
<li>保護者ごとに「保育が必要な理由」を確認し、基準指数を算定</li>
<li>父の基準指数＋母の基準指数を合算（最大20点）</li>
<li>調整指数（加点・減点）を加算</li>
<li>合計指数が高い世帯から順に内定</li>
</ul>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳細は<a href="https://www.city.uonuma.lg.jp/" target="_blank" rel="noopener">魚沼市公式サイト</a>の子育て・保育に関するページをご確認ください。</p>
</div>`,
    publishedAt: "2026-06-28",
  },
  {
    slug: "uonuma-employment",
    citySlug: "uonuma",
    title: "魚沼市の保育所点数｜居宅外就労の基準指数（週日数×就労時間）一覧",
    description:
      "魚沼市の居宅外就労（外勤・自営業等）の基準指数を解説します。週5日以上・7時間以上で最大10点。就労頻度と就労時間の組み合わせで点数が決まります。",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=400&fit=crop",
    category: "就労",
    categoryColor: "blue",
    content: `<h2>魚沼市の居宅外就労基準指数</h2>
<p>魚沼市の居宅外就労（外勤・自営業の主体的従事者等）は、<strong>就労頻度</strong>と<strong>1日の就労時間</strong>の組み合わせで基準指数が決まります。</p>

<h3>居宅外就労の基準指数一覧</h3>
<table>
<thead><tr><th>就労頻度</th><th>7時間以上</th><th>6時間以上</th><th>5時間以上</th><th>4時間以上</th><th>3時間以上</th></tr></thead>
<tbody>
<tr><td>週5日以上（月20日以上）</td><td>10点</td><td>9点</td><td>8点</td><td>7点</td><td>6点</td></tr>
<tr><td>週4日（月16日以上）</td><td>9点</td><td>8点</td><td>7点</td><td>6点</td><td>5点</td></tr>
<tr><td>週3日（月12日以上）</td><td>8点</td><td>7点</td><td>6点</td><td>5点</td><td>—</td></tr>
<tr><td>月48時間以上（上記未満）</td><td colspan="5" style="text-align:center">4点</td></tr>
</tbody>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>最高点（10点）を得るには「週5日以上かつ1日7時間以上」の就労が必要です。就労証明書に正確な就労日数と就労時間を記載してもらいましょう。</p>
</div>`,
    publishedAt: "2026-06-28",
  },
  {
    slug: "uonuma-home-employment",
    citySlug: "uonuma",
    title: "魚沼市の保育所点数｜居宅内就労（在宅・自営業）の基準指数一覧",
    description:
      "魚沼市の居宅内就労（在宅勤務・自営業等）の基準指数を解説します。週5日以上・7時間以上で最大9点。居宅外就労より1点低い設定です。",
    image:
      "https://images.unsplash.com/photo-1556745757-8d76bdb6984b?w=800&h=400&fit=crop",
    category: "自営業・在宅就労",
    categoryColor: "teal",
    content: `<h2>魚沼市の居宅内就労基準指数</h2>
<p>自宅を拠点に就労している場合の指数です。居宅内就労は居宅外就労より1点低い設定になっています。</p>

<h3>居宅内就労の基準指数一覧</h3>
<table>
<thead><tr><th>就労頻度</th><th>7時間以上</th><th>6時間以上</th><th>5時間以上</th><th>4時間以上</th><th>3時間以上</th></tr></thead>
<tbody>
<tr><td>週5日以上（月20日以上）</td><td>9点</td><td>8点</td><td>7点</td><td>6点</td><td>5点</td></tr>
<tr><td>週4日（月16日以上）</td><td>8点</td><td>7点</td><td>6点</td><td>5点</td><td>4点</td></tr>
<tr><td>週3日（月12日以上）</td><td>7点</td><td>6点</td><td>5点</td><td>4点</td><td>—</td></tr>
<tr><td>月48時間以上（上記未満）</td><td colspan="5" style="text-align:center">3点</td></tr>
</tbody>
</table>`,
    publishedAt: "2026-06-28",
  },
  {
    slug: "uonuma-illness-care",
    citySlug: "uonuma",
    title: "魚沼市の保育所点数｜疾病・障害・介護の基準指数一覧",
    description:
      "魚沼市の疾病・障害・介護を理由とする基準指数を解説します。入院・障害等級・要介護度別の点数を確認できます。",
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=400&fit=crop",
    category: "疾病・障害・介護",
    categoryColor: "rose",
    content: `<h2>魚沼市の疾病・障害・介護基準指数</h2>

<h3>疾病・負傷による保育の必要性</h3>
<table>
<thead><tr><th>状況</th><th>基準指数</th></tr></thead>
<tbody>
<tr><td>1か月以上の入院または常時寝たきり</td><td>10点</td></tr>
<tr><td>自宅での安静加療</td><td>8点</td></tr>
<tr><td>その他の常時保育困難な状態</td><td>6点</td></tr>
</tbody>
</table>

<h3>障害による保育の必要性</h3>
<table>
<thead><tr><th>障害等級</th><th>基準指数</th></tr></thead>
<tbody>
<tr><td>身体障害1・2級等相当</td><td>10点</td></tr>
<tr><td>身体障害3級等相当</td><td>8点</td></tr>
<tr><td>身体障害4級以下</td><td>4点</td></tr>
</tbody>
</table>

<h3>介護・看護による保育の必要性</h3>
<table>
<thead><tr><th>状況</th><th>基準指数</th></tr></thead>
<tbody>
<tr><td>要介護4以上・常時付添いが必要</td><td>10点</td></tr>
<tr><td>要介護3・常時ではないが保育困難</td><td>8点</td></tr>
<tr><td>その他の保育困難な状態</td><td>5点</td></tr>
</tbody>
</table>

<h3>その他の保育が必要な理由</h3>
<ul>
<li><strong>妊娠中または出産間近</strong>：10点</li>
<li><strong>育児休業中</strong>：3点</li>
<li><strong>就学（大学・専門学校等）</strong>：8点</li>
<li><strong>求職活動中</strong>：3点</li>
<li><strong>不在（死亡・離婚・行方不明・拘禁等）</strong>：10点</li>
<li><strong>災害復旧</strong>：10点</li>
</ul>`,
    publishedAt: "2026-06-28",
  },
  {
    slug: "uonuma-adjustment",
    citySlug: "uonuma",
    title: "魚沼市の保育所点数｜調整指数（加点・減点）一覧",
    description:
      "魚沼市の保育利用調整における調整指数を解説します。ひとり親+5点・産休育休明け+5点・地域型保育卒園+5点など主な加減算を確認できます。",
    image:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop",
    category: "調整指数",
    categoryColor: "amber",
    content: `<h2>魚沼市の調整指数（加点・減点）一覧</h2>

<h3>加点項目</h3>
<table>
<thead><tr><th>状況</th><th>加点</th></tr></thead>
<tbody>
<tr><td>ひとり親世帯</td><td>+5点</td></tr>
<tr><td>生活保護世帯</td><td>+5点</td></tr>
<tr><td>申込む子どもが障害を有する</td><td>+5点</td></tr>
<tr><td>申込む子ども以外の世帯員が障害を有する</td><td>+3点</td></tr>
<tr><td>保護者の失業で就労の必要性が高い</td><td>+5点</td></tr>
<tr><td>産休明け・育休明けの職場復帰（居宅外就労者）</td><td>+5点</td></tr>
<tr><td>きょうだいが同一施設に在園</td><td>+5点</td></tr>
<tr><td>きょうだいと同時申請・同一施設希望</td><td>+2点</td></tr>
<tr><td>地域型保育施設（小規模保育等）の卒園予定</td><td>+5点</td></tr>
<tr><td>新年度募集で他施設からの転園希望</td><td>+5点</td></tr>
<tr><td>集団保育が必要と判定されている</td><td>+3点</td></tr>
</tbody>
</table>

<h3>減点項目</h3>
<table>
<thead><tr><th>状況</th><th>減点</th></tr></thead>
<tbody>
<tr><td>65歳未満の同居親族（健康・未就労）が保育可能</td><td>-3点</td></tr>
<tr><td>65歳以上の同居親族（健康・未就労）が保育可能</td><td>-1点</td></tr>
<tr><td>他の就学前児童を保育所等に預けていない</td><td>-1点</td></tr>
</tbody>
</table>`,
    publishedAt: "2026-06-28",
  },
  {
    slug: "uonuma-hokatsu-tips",
    citySlug: "uonuma",
    title: "魚沼市の保活で点数を上げるコツ｜就労時間・頻度の最大化と加点活用",
    description:
      "魚沼市の保育所入所を有利にするポイントを解説します。就労時間・頻度の延長、産休育休明け加算、地域型保育卒園加算など実践的なアドバイスです。",
    image:
      "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?w=800&h=400&fit=crop",
    category: "保活のコツ",
    categoryColor: "green",
    content: `<h2>魚沼市の保活で点数を上げるコツ</h2>

<h3>1. 週5日以上・7時間以上の就労で最高点を目指す</h3>
<p>居宅外就労で最高の10点を得るには「週5日以上・7時間以上」が必要です。就労証明書に正確な週の就労日数と1日の就労時間を記載してもらいましょう。</p>

<h3>2. 産休明け・育休明けの復帰申込で+5点</h3>
<p>育児休業や産前産後休業から職場に復帰する際の申込には+5点の調整指数が加算されます。</p>

<h3>3. 地域型保育施設を活用して+5点を獲得</h3>
<p>0〜2歳の間に小規模保育等の地域型保育施設を利用していれば、3歳以降の認可保育所への転園時に+5点の加算があります。</p>

<h3>4. きょうだいを同施設に在園させると+5点</h3>
<p>上の子が同じ施設に通っている場合、+5点が加算されます。</p>

<h3>5. 居宅外・居宅内就労の区別を正確に申告</h3>
<p>居宅外就労（外勤・外での自営）は居宅内（在宅）より1点高く設定されています。実態に合わせた正確な申告が重要です。</p>

<div class="info-box">
<p><strong>申込・相談窓口</strong></p>
<p>詳細は魚沼市の子育て支援・保育担当窓口にお問い合わせください。</p>
</div>`,
    publishedAt: "2026-06-28",
  },
];

registerArticles(uonamaArticles);
