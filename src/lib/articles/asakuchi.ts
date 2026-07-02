import type { Article } from "./types";
import { registerArticles } from "./index";

const asakuchiArticles: Article[] = [
  {
    slug: "asakuchi-guide",
    citySlug: "asakuchi",
    title: "浅口市の保育所入所点数（指数）完全ガイド｜週の就労時間合計で決まる合算方式",
    description:
      "岡山県浅口市の保育利用調整は合算方式（sum方式）を採用。父母の基本点数を合算し、週の就労日数と週の合計就労時間の組み合わせで点数が決まります。",
    image:
      "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>浅口市の保育所入所選考制度</h2>
<p>岡山県浅口市の保育所入所選考は<span class="highlight">合算方式（sum方式）</span>を採用しています。父母それぞれの基本点数を算出して合算し、調整点数を加えた合計点で優先順位を決定します。</p>

<h3>浅口市の就労評価の特徴</h3>
<p>浅口市では<span class="highlight">週の就労日数（週5日以上・週4日以上・週3日以上）</span>と<span class="highlight">週の合計就労時間（40時間以上〜12時間以上）</span>の組み合わせで基本点数が決まります。居宅外（外勤等）が最大10点、居宅内（在宅・農業等）が最大9点です。</p>

<h3>選考の基本的な流れ</h3>
<ul>
<li>保護者ごとに「保育が必要な理由」を確認し、基本点数を算定</li>
<li>複数の理由に該当する場合は最も高い基本点数を採用</li>
<li>父の基本点数＋母の基本点数を合算（最大20点）</li>
<li>調整点数（加点・減点）を加算</li>
<li>合計点数が高い世帯から順に内定</li>
</ul>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳細は<a href="https://www.city.asakuchi.lg.jp/" target="_blank" rel="noopener">浅口市公式サイト</a>の子育て・保育に関するページをご確認ください。</p>
</div>`,
    publishedAt: "2026-06-28",
  },
  {
    slug: "asakuchi-employment",
    citySlug: "asakuchi",
    title: "浅口市の保育所点数｜居宅外就労の基本点数（週日数×合計時間）一覧",
    description:
      "浅口市の居宅外就労（外勤・自営業等）の基本点数を解説します。週5日以上・40時間以上で最大10点。週の就労日数と合計就労時間の組み合わせで点数が決まります。",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=400&fit=crop",
    category: "就労",
    categoryColor: "blue",
    content: `<h2>浅口市の居宅外就労基本点数</h2>
<p>浅口市の居宅外就労（外勤・自営業等）は、<strong>週の就労日数</strong>と<strong>週の合計就労時間</strong>の組み合わせで基本点数が決まります。</p>

<h3>居宅外就労の基本点数一覧</h3>
<table>
<thead><tr><th>就労日数・合計時間</th><th>基本点数</th></tr></thead>
<tbody>
<tr><td>週5日以上・40時間以上</td><td>10点</td></tr>
<tr><td>週5日以上・35時間以上</td><td>9点</td></tr>
<tr><td>週4日以上・30時間以上</td><td>8点</td></tr>
<tr><td>週4日以上・25時間以上</td><td>7点</td></tr>
<tr><td>週3日以上・20時間以上</td><td>6点</td></tr>
<tr><td>週3日以上・12時間以上</td><td>4点</td></tr>
</tbody>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>最高点（10点）を得るには「週5日以上かつ週40時間以上」の就労が必要です。就労証明書に正確な就労日数と就労時間を記載してもらいましょう。</p>
</div>`,
    publishedAt: "2026-06-28",
  },
  {
    slug: "asakuchi-home-employment",
    citySlug: "asakuchi",
    title: "浅口市の保育所点数｜居宅内就労・内職の基本点数一覧",
    description:
      "浅口市の居宅内就労（在宅・農業等）は最大9点、内職は最大5点。居宅外就労より低い設定です。週の日数と合計時間で点数が決まります。",
    image:
      "https://images.unsplash.com/photo-1556745757-8d76bdb6984b?w=800&h=400&fit=crop",
    category: "自営業・在宅就労",
    categoryColor: "teal",
    content: `<h2>浅口市の居宅内就労・内職基本点数</h2>

<h3>居宅内就労（自宅・農業等）の基本点数</h3>
<table>
<thead><tr><th>就労日数・合計時間</th><th>基本点数</th></tr></thead>
<tbody>
<tr><td>週5日以上・40時間以上</td><td>9点</td></tr>
<tr><td>週5日以上・35時間以上</td><td>8点</td></tr>
<tr><td>週4日以上・30時間以上</td><td>7点</td></tr>
<tr><td>週4日以上・25時間以上</td><td>6点</td></tr>
<tr><td>週3日以上・20時間以上</td><td>5点</td></tr>
<tr><td>週3日以上・12時間以上</td><td>3点</td></tr>
</tbody>
</table>

<h3>内職の基本点数</h3>
<table>
<thead><tr><th>就労日数・合計時間</th><th>基本点数</th></tr></thead>
<tbody>
<tr><td>週5日以上・30時間以上</td><td>5点</td></tr>
<tr><td>週3日以上・20時間以上</td><td>4点</td></tr>
<tr><td>週3日以上・12時間以上</td><td>2点</td></tr>
</tbody>
</table>`,
    publishedAt: "2026-06-28",
  },
  {
    slug: "asakuchi-other-reasons",
    citySlug: "asakuchi",
    title: "浅口市の保育所点数｜疾病・障害・妊娠・就学等の基本点数一覧",
    description:
      "浅口市の就労以外の保育必要理由（疾病・障害・妊娠・就学・介護等）の基本点数を解説します。就学・介護は就労と同じ点数体系（区分1準用）が適用されます。",
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=400&fit=crop",
    category: "疾病・障害・その他",
    categoryColor: "rose",
    content: `<h2>浅口市の就労以外の基本点数</h2>

<h3>疾病・負傷による保育の必要性</h3>
<table>
<thead><tr><th>状況</th><th>基本点数</th></tr></thead>
<tbody>
<tr><td>1ヶ月以上の入院または常時臥床</td><td>10点</td></tr>
<tr><td>安静加療または日常生活に支障がある状態</td><td>8点</td></tr>
<tr><td>通院加療が必要な状態</td><td>3点</td></tr>
</tbody>
</table>

<h3>障害による保育の必要性</h3>
<table>
<thead><tr><th>状況</th><th>基本点数</th></tr></thead>
<tbody>
<tr><td>身体障害1〜2級・精神障害手帳・療育手帳A・要介護3以上等</td><td>10点</td></tr>
<tr><td>身体障害3級・療育手帳B・要介護1〜2等</td><td>6点</td></tr>
<tr><td>身体障害4〜6級・要支援等</td><td>3点</td></tr>
</tbody>
</table>

<h3>その他の保育必要理由</h3>
<table>
<thead><tr><th>理由</th><th>基本点数</th></tr></thead>
<tbody>
<tr><td>妊娠中または出産前後8週間</td><td>6点</td></tr>
<tr><td>就学・技能修得（大学・専門学校等）</td><td>就労外勤と同じ点数（最大10点）</td></tr>
<tr><td>介護・看護（区分1準用）</td><td>就労外勤と同じ点数（最大10点）</td></tr>
<tr><td>育児休業中（継続利用）</td><td>3点</td></tr>
<tr><td>求職活動中（就労未定）</td><td>1点</td></tr>
<tr><td>保護者の不在（死亡・行方不明等）</td><td>10点</td></tr>
<tr><td>災害復旧</td><td>10点</td></tr>
<tr><td>児童虐待・DV</td><td>10点（調整点数として加算）</td></tr>
</tbody>
</table>`,
    publishedAt: "2026-06-28",
  },
  {
    slug: "asakuchi-adjustment",
    citySlug: "asakuchi",
    title: "浅口市の保育所点数｜調整点数（加点・減点）一覧",
    description:
      "浅口市の保育利用調整における調整点数を解説します。保育士+15点・現在の保育所継続+7点・児童虐待+10点、祖父母保育可能-20点・転園希望-15点など。",
    image:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop",
    category: "調整指数",
    categoryColor: "amber",
    content: `<h2>浅口市の調整点数（加点・減点）一覧</h2>

<h3>加点項目</h3>
<table>
<thead><tr><th>状況</th><th>加点</th></tr></thead>
<tbody>
<tr><td>ひとり親世帯（事実婚除く）</td><td>+2点</td></tr>
<tr><td>生活保護世帯</td><td>+2点</td></tr>
<tr><td>生計中心者の失業（就労必要性高）</td><td>+2点</td></tr>
<tr><td>児童虐待またはそのおそれ</td><td>+10点</td></tr>
<tr><td>DV（配偶者等からの暴力）</td><td>+3点</td></tr>
<tr><td>現在利用中の保育所等の継続希望</td><td>+7点</td></tr>
<tr><td>きょうだいが既に同一施設を利用中</td><td>+4点</td></tr>
<tr><td>地域型保育卒園→連携施設を希望</td><td>+7点</td></tr>
<tr><td>産休・育休後の職場復帰</td><td>+2点</td></tr>
<tr><td>保育士・保育教諭（月120時間以上勤務）</td><td>+15点</td></tr>
<tr><td>保育士・保育教諭（月80〜120時間未満）</td><td>+10点</td></tr>
<tr><td>保育士・保育教諭（月48〜80時間未満）</td><td>+5点</td></tr>
</tbody>
</table>

<h3>減点項目</h3>
<table>
<thead><tr><th>状況</th><th>減点</th></tr></thead>
<tbody>
<tr><td>65歳未満の同居親族（無職・健康）が保育可能</td><td>-20点</td></tr>
<tr><td>特別な理由なく転園を希望</td><td>-15点</td></tr>
<tr><td>保育料の未納が3ヶ月以上</td><td>-10点</td></tr>
<tr><td>同一年度内に入所を辞退</td><td>-5点</td></tr>
</tbody>
</table>`,
    publishedAt: "2026-06-28",
  },
  {
    slug: "asakuchi-hokatsu-tips",
    citySlug: "asakuchi",
    title: "浅口市の保活で点数を上げるコツ｜就労時間の最大化と保育士加算の活用",
    description:
      "浅口市の保育所入所を有利にするポイントを解説します。週40時間就労で最高10点、保育士加算+15点、継続利用+7点など主要な加算の活用法を紹介します。",
    image:
      "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?w=800&h=400&fit=crop",
    category: "保活のコツ",
    categoryColor: "green",
    content: `<h2>浅口市の保活で点数を上げるコツ</h2>

<h3>1. 週40時間以上の就労で最高点（10点）を目指す</h3>
<p>居宅外就労で最高の10点を得るには「週5日以上・週合計40時間以上」が必要です。就労証明書に正確な週の就労日数と週の合計就労時間を記載してもらいましょう。</p>

<h3>2. 産休・育休後の復帰申込で+2点</h3>
<p>産休・育休から職場復帰する際の申込には+2点の調整点数が加算されます。</p>

<h3>3. 現在利用中の施設の継続申込で+7点</h3>
<p>現在すでに保育所等を利用している場合、同じ施設の継続希望で+7点が加算されます。これは大きな加点です。</p>

<h3>4. きょうだいが同施設に在園していると+4点</h3>
<p>上のきょうだいが同じ施設に通っている場合、+4点が加算されます。</p>

<h3>5. 地域型保育施設（小規模保育等）の卒園で+7点</h3>
<p>0〜2歳の間に小規模保育等の地域型保育施設を利用していれば、3歳以降の連携施設への転園時に+7点の加算があります。</p>

<h3>6. 保育士・保育教諭の場合は特別加算</h3>
<p>市内施設で保育士・保育教諭として勤務している場合、月の勤務時間に応じて最大+15点の大きな加算があります。</p>

<h3>注意事項</h3>
<p>65歳未満の同居親族（無職・健康）が保育可能な場合は-20点という大きな減点があります。また、転園希望（特別理由なし）は-15点となります。</p>

<div class="info-box">
<p><strong>申込・相談窓口</strong></p>
<p>詳細は浅口市の子育て支援・保育担当窓口にお問い合わせください。</p>
</div>`,
    publishedAt: "2026-06-28",
  },
];

registerArticles(asakuchiArticles);
