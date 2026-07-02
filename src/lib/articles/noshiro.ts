import type { Article } from "./types";
import { registerArticles } from "./index";

const noshiroArticles: Article[] = [
  {
    slug: "noshiro-guide",
    citySlug: "noshiro",
    title: "能代市の保育所入所点数（選考指数）完全ガイド｜月の就労時間で決まる合算方式",
    description:
      "秋田県能代市の保育利用調整は合算方式（sum方式）を採用。父母それぞれの選考指数を合算します。就労は月の時間数（150・120・90・48時間以上）で指数が決まります。",
    image:
      "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>能代市の保育所入所選考制度</h2>
<p>秋田県能代市の保育所入所選考は<span class="highlight">合算方式（sum方式）</span>を採用しています。父母それぞれの選考指数を算出して合算し、調整基準を加えた合計で優先順位を決定します。</p>

<h3>能代市の就労評価の特徴</h3>
<p>能代市では<span class="highlight">月の就労時間数</span>（150時間以上・120時間以上・90時間以上・48時間以上の4区分）で選考指数が決まります。常勤・パート・自営業等が最大10点、家族営業協力者が最大8点、居宅内委託業務（内職等）が最大7点です。</p>

<h3>選考の基本的な流れ</h3>
<ul>
<li>保護者ごとに「保育が必要な理由」を確認し、選考指数を算定</li>
<li>父の選考指数＋母の選考指数を合算（最大20点）</li>
<li>調整基準（加点・減点）を加算</li>
<li>利用調整指数が高い世帯から順に内定</li>
</ul>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳細は<a href="https://www.city.noshiro.lg.jp/section/somu/somu/youkou/10047" target="_blank" rel="noopener">能代市保育の利用調整実施基準運用要綱</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-06-28",
  },
  {
    slug: "noshiro-employment",
    citySlug: "noshiro",
    title: "能代市の保育所点数｜就労の選考指数一覧（月の就労時間ベース）",
    description:
      "能代市の就労による選考指数を解説します。常勤・自営業等は月150時間以上で最大10点。家族営業協力者は最大8点、居宅内委託業務（内職等）は最大7点です。",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=400&fit=crop",
    category: "就労",
    categoryColor: "blue",
    content: `<h2>能代市の就労選考指数</h2>
<p>能代市の就労による選考指数は<strong>月の就労時間数</strong>と<strong>就労形態</strong>の組み合わせで決まります。</p>

<h3>常勤・パート・自営業等の選考指数</h3>
<table>
<thead><tr><th>月の就労時間</th><th>選考指数</th></tr></thead>
<tbody>
<tr><td>150時間以上</td><td>10点</td></tr>
<tr><td>120時間以上</td><td>9点</td></tr>
<tr><td>90時間以上</td><td>8点</td></tr>
<tr><td>48時間以上</td><td>7点</td></tr>
</tbody>
</table>

<h3>家族営業協力者の選考指数</h3>
<table>
<thead><tr><th>月の就労時間</th><th>選考指数</th></tr></thead>
<tbody>
<tr><td>150時間以上</td><td>8点</td></tr>
<tr><td>120時間以上</td><td>7点</td></tr>
<tr><td>90時間以上</td><td>6点</td></tr>
<tr><td>48時間以上</td><td>5点</td></tr>
</tbody>
</table>

<h3>居宅内委託業務（内職等）の選考指数</h3>
<table>
<thead><tr><th>月の就労時間</th><th>選考指数</th></tr></thead>
<tbody>
<tr><td>150時間以上</td><td>7点</td></tr>
<tr><td>120時間以上</td><td>6点</td></tr>
<tr><td>90時間以上</td><td>5点</td></tr>
<tr><td>48時間以上</td><td>4点</td></tr>
</tbody>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>月150時間以上の就労（常勤等）で最高10点が取得できます。週5日・1日6時間勤務で月約130時間となるため、フルタイムに近い勤務形態が求められます。</p>
</div>`,
    publishedAt: "2026-06-28",
  },
  {
    slug: "noshiro-other-reasons",
    citySlug: "noshiro",
    title: "能代市の保育所点数｜疾病・障害・妊娠・就学等の選考指数一覧",
    description:
      "能代市の就労以外の保育必要理由（疾病・障害・妊娠・就学・介護・求職等）の選考指数を解説します。入院・重度障害で10点、妊娠・就学月120時間以上で9点です。",
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=400&fit=crop",
    category: "疾病・障害・その他",
    categoryColor: "rose",
    content: `<h2>能代市の就労以外の選考指数</h2>

<h3>疾病による選考指数</h3>
<table>
<thead><tr><th>状況</th><th>選考指数</th></tr></thead>
<tbody>
<tr><td>1月以上の入院または常時臥床</td><td>10点</td></tr>
<tr><td>医師診断で1月以上加療が必要</td><td>7点</td></tr>
<tr><td>定期通院等が必要な状態</td><td>5点</td></tr>
</tbody>
</table>

<h3>障害による選考指数</h3>
<table>
<thead><tr><th>状況</th><th>選考指数</th></tr></thead>
<tbody>
<tr><td>身体障害1〜2級・療育手帳A・精神障害1級程度</td><td>10点</td></tr>
<tr><td>身体障害3級・療育手帳B・精神障害2級程度</td><td>7点</td></tr>
<tr><td>身体障害4〜6級・精神障害3級程度</td><td>5点</td></tr>
</tbody>
</table>

<h3>その他の保育必要理由</h3>
<table>
<thead><tr><th>理由</th><th>選考指数</th></tr></thead>
<tbody>
<tr><td>妊娠中または出産前後8週間以内</td><td>9点</td></tr>
<tr><td>就学・通学 月120時間以上</td><td>9点</td></tr>
<tr><td>就学・通学 月120時間未満</td><td>7点</td></tr>
<tr><td>入院付添い・直接介護 月120時間以上</td><td>9点</td></tr>
<tr><td>入院付添い・直接介護 月120時間未満</td><td>7点</td></tr>
<tr><td>長期居宅療養者の世話 月120時間以上</td><td>7点</td></tr>
<tr><td>長期居宅療養者の世話 月120時間未満</td><td>6点</td></tr>
<tr><td>育児休業中（継続利用のみ）</td><td>8点</td></tr>
<tr><td>起業準備中</td><td>7点</td></tr>
<tr><td>求職活動中</td><td>3点</td></tr>
<tr><td>その他特別の事情で保育困難</td><td>2点</td></tr>
</tbody>
</table>`,
    publishedAt: "2026-06-28",
  },
  {
    slug: "noshiro-adjustment",
    citySlug: "noshiro",
    title: "能代市の保育所点数｜調整基準（加点・減点）一覧",
    description:
      "能代市の保育利用調整における調整基準を解説します。保育士優先+6点・ひとり親+2点・継続利用+2点・兄弟在園+2点・失業+2点、保育料滞納-2点など。",
    image:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop",
    category: "調整指数",
    categoryColor: "amber",
    content: `<h2>能代市の調整基準（加点・減点）一覧</h2>

<h3>加点項目</h3>
<table>
<thead><tr><th>状況</th><th>加点</th></tr></thead>
<tbody>
<tr><td>ひとり親世帯</td><td>+2点</td></tr>
<tr><td>現在保育所等を利用中（継続希望）</td><td>+2点</td></tr>
<tr><td>きょうだいが同一施設に在園中</td><td>+2点</td></tr>
<tr><td>保育士・保育教諭として保育施設に勤務</td><td>+6点</td></tr>
<tr><td>障害のある子どもの保育希望</td><td>+1点</td></tr>
<tr><td>主たる生計者が失業中</td><td>+2点</td></tr>
</tbody>
</table>

<h3>減点項目</h3>
<table>
<thead><tr><th>状況</th><th>減点</th></tr></thead>
<tbody>
<tr><td>保育料の滞納あり</td><td>-2点</td></tr>
<tr><td>就労日数が月16〜19日</td><td>-1点</td></tr>
<tr><td>就労日数が月16日未満</td><td>-2点</td></tr>
</tbody>
</table>

<div class="point-box">
<p><strong>保育士加算に注目</strong></p>
<p>保育士・保育教諭として保育施設に勤務している場合、＋6点の大きな加算があります。</p>
</div>`,
    publishedAt: "2026-06-28",
  },
  {
    slug: "noshiro-hokatsu-tips",
    citySlug: "noshiro",
    title: "能代市の保活で点数を上げるコツ｜月150時間就労と保育士加算の活用",
    description:
      "能代市の保育所入所を有利にするポイントを解説します。月150時間就労で最高10点、保育士加算+6点、継続利用+2点など主要な加算の活用法を紹介します。",
    image:
      "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?w=800&h=400&fit=crop",
    category: "保活のコツ",
    categoryColor: "green",
    content: `<h2>能代市の保活で点数を上げるコツ</h2>

<h3>1. 月150時間以上の就労で最高点（10点）を目指す</h3>
<p>常勤・パート・自営業等で月150時間以上就労すれば最高10点が取得できます。週5日勤務でも1日6時間以上を確保することで150時間に届きます。就労証明書に正確な月の就労時間を記載してもらいましょう。</p>

<h3>2. 継続利用申込で+2点</h3>
<p>現在すでに保育所等を利用している場合、継続希望で+2点が加算されます。</p>

<h3>3. きょうだいが同施設に在園で+2点</h3>
<p>きょうだいが同じ施設に通っている場合、+2点が加算されます。</p>

<h3>4. 保育士・保育教諭として勤務で+6点</h3>
<p>保育施設で保育士・保育教諭として勤務している場合、+6点の大きな加算があります。</p>

<h3>5. ひとり親世帯は+2点</h3>
<p>ひとり親世帯の場合、+2点の調整基準加算があります。</p>

<h3>注意事項</h3>
<p>就労日数が月16日未満の場合は-2点、16〜19日の場合は-1点の減算があります。また、保育料の滞納がある場合も-2点となります。</p>

<div class="info-box">
<p><strong>申込・相談窓口</strong></p>
<p>詳細は能代市の子育て支援・保育担当窓口にお問い合わせください。</p>
</div>`,
    publishedAt: "2026-06-28",
  },
];

registerArticles(noshiroArticles);
