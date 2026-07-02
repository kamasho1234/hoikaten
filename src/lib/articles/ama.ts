import type { Article } from "./types";
import { registerArticles } from "./index";

const amaArticles: Article[] = [
  {
    slug: "ama-guide",
    citySlug: "ama",
    title: "あま市の保育所入所点数（選考指数）完全ガイド｜min方式・就労形態別の指数一覧",
    description:
      "愛知県あま市の保育利用調整はmin方式（両親の低い方）を採用。外勤・内勤・内職・疾病・障害など事由別の選考指数と、ひとり親加算・就労予定減算などの調整指数を解説します。",
    image:
      "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>あま市の保育所入所選考制度</h2>
<p>愛知県あま市の保育所入所選考は<span class="highlight">min方式（最小値方式）</span>を採用しています。父母それぞれの選考指数を算出し、低い方を選考指数として採用します。調整指数を加算した合計点で優先順位を決定します。</p>

<h3>あま市の選考指数の特徴</h3>
<p>あま市では<span class="highlight">就労形態（外勤・内勤・内職）</span>と<span class="highlight">月の勤務日数・1日の労働時間</span>の組み合わせで選考指数が決まります。外勤（フルタイム相当）で最大9点、内勤・農業で最大7点です。</p>

<h3>選考の基本的な流れ</h3>
<ul>
<li>保護者ごとに「保育が必要な理由」を確認し、選考指数を算定</li>
<li>父・母の選考指数のうち<strong>低い方</strong>を採用（min方式）</li>
<li>調整指数（加点・減点）を加算</li>
<li>利用調整指数が高い世帯から順に内定</li>
</ul>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳細は<a href="https://www.city.ama.aichi.jp/kurashi/1002024/hoikuenn/1009663.html" target="_blank" rel="noopener">あま市保育施設入園選考基準</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-06-25",
  },
  {
    slug: "ama-employment",
    citySlug: "ama",
    title: "あま市の保育所点数｜就労（外勤・内勤・内職）の選考指数一覧",
    description:
      "あま市の就労による選考指数を解説します。外勤・自営（外勤）は月20日以上・8時間以上で最大9点。内勤・自営（内勤）・農業は最大7点。内職は月15日以上で3点です。",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=400&fit=crop",
    category: "就労",
    categoryColor: "blue",
    content: `<h2>あま市の就労選考指数</h2>
<p>あま市の就労による選考指数は<strong>就労形態</strong>と<strong>月の勤務日数・1日の労働時間</strong>の組み合わせで決まります。</p>

<h3>外勤・自営（外勤）の選考指数</h3>
<table>
<thead><tr><th>勤務条件</th><th>選考指数</th></tr></thead>
<tbody>
<tr><td>月20日以上・8時間以上</td><td>9点</td></tr>
<tr><td>月20日以上・6〜8時間 または 月15日以上・8時間以上</td><td>8点</td></tr>
<tr><td>月20日以上・4〜6時間 または 月15日以上・6〜8時間</td><td>7点</td></tr>
<tr><td>月15日以上・4〜6時間 または 月15日未満・8時間以上</td><td>6点</td></tr>
<tr><td>月20日以上・3〜4時間 または 月15日未満・8時間未満</td><td>3点</td></tr>
</tbody>
</table>

<h3>内勤・自営（内勤）・農業の選考指数</h3>
<table>
<thead><tr><th>勤務条件</th><th>選考指数</th></tr></thead>
<tbody>
<tr><td>月20日以上・8時間以上</td><td>7点</td></tr>
<tr><td>月20日以上・6〜8時間 または 月15日以上・8時間以上</td><td>6点</td></tr>
<tr><td>月20日以上・4〜6時間 または 月15日以上・6〜8時間</td><td>5点</td></tr>
<tr><td>月15日以上・4〜6時間 または 月15日未満・8時間以上</td><td>4点</td></tr>
<tr><td>月15日未満・8時間未満</td><td>1点</td></tr>
</tbody>
</table>

<h3>内職の選考指数</h3>
<table>
<thead><tr><th>勤務条件</th><th>選考指数</th></tr></thead>
<tbody>
<tr><td>月15日以上</td><td>3点</td></tr>
<tr><td>月15日未満</td><td>1点</td></tr>
</tbody>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>外勤フルタイム（月20日以上・8時間以上）で最高9点が取得できます。テレワーク等の内勤の場合は同じ勤務時間でも2点低くなる点に注意してください。</p>
</div>`,
    publishedAt: "2026-06-25",
  },
  {
    slug: "ama-other-reasons",
    citySlug: "ama",
    title: "あま市の保育所点数｜疾病・障害・出産・介護・就学等の選考指数一覧",
    description:
      "あま市の就労以外の保育必要理由（疾病・障害・出産・介護・就学・家庭災害等）の選考指数を解説します。入院・家庭災害は最高10点、虐待・DVは最高20点です。",
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=400&fit=crop",
    category: "疾病・障害・その他",
    categoryColor: "rose",
    content: `<h2>あま市の就労以外の選考指数</h2>

<h3>疾病・出産による選考指数</h3>
<table>
<thead><tr><th>状況</th><th>選考指数</th></tr></thead>
<tbody>
<tr><td>入院（1ヶ月以上）</td><td>10点</td></tr>
<tr><td>出産（出産予定月2ヶ月前〜出産月2ヶ月後）</td><td>8点</td></tr>
<tr><td>自宅療養（常時臥床 1ヶ月以上）</td><td>8点</td></tr>
<tr><td>定期通院が必要（比較的軽症）</td><td>3点</td></tr>
</tbody>
</table>

<h3>障害による選考指数</h3>
<table>
<thead><tr><th>状況</th><th>選考指数</th></tr></thead>
<tbody>
<tr><td>身体障害1〜2級・療育手帳A・精神障害1級</td><td>9点</td></tr>
<tr><td>身体障害3〜4級・療育手帳B・精神障害2級</td><td>7点</td></tr>
<tr><td>身体障害5〜6級・療育手帳C・精神障害3級</td><td>5点</td></tr>
</tbody>
</table>

<h3>介護による選考指数</h3>
<table>
<thead><tr><th>状況</th><th>選考指数</th></tr></thead>
<tbody>
<tr><td>入院者看護（月120時間以上）または自宅介護（重度）</td><td>8点</td></tr>
<tr><td>自宅介護（中度：要介護4以上等）</td><td>6点</td></tr>
<tr><td>入院者看護（月60時間以上）または要支援認定</td><td>5点</td></tr>
<tr><td>自宅介護（軽度：要介護1以上等）または通院付添（月120時間以上）</td><td>4点</td></tr>
<tr><td>通院付添（月60時間以上）</td><td>3点</td></tr>
</tbody>
</table>

<h3>就学・その他の選考指数</h3>
<table>
<thead><tr><th>状況</th><th>選考指数</th></tr></thead>
<tbody>
<tr><td>就学・通学（月120時間以上）</td><td>7点</td></tr>
<tr><td>就学・通学（月60〜120時間）</td><td>5点</td></tr>
<tr><td>就学・通学（その他）</td><td>3点</td></tr>
<tr><td>家庭災害による居宅復旧</td><td>10点</td></tr>
<tr><td>虐待・DVの危険性がある</td><td>最高20点（上限）</td></tr>
<tr><td>求職活動中・起業準備中</td><td>0点</td></tr>
</tbody>
</table>`,
    publishedAt: "2026-06-25",
  },
  {
    slug: "ama-adjustment",
    citySlug: "ama",
    title: "あま市の保育所点数｜調整指数（加点・減点）一覧",
    description:
      "あま市の保育利用調整における調整指数を解説します。ひとり親+4点・生活保護世帯+1点・兄弟姉妹在園+1点、就労予定（内定あり）-2点など。",
    image:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop",
    category: "調整指数",
    categoryColor: "amber",
    content: `<h2>あま市の調整指数（加点・減点）一覧</h2>

<h3>加点項目</h3>
<table>
<thead><tr><th>状況</th><th>加点</th></tr></thead>
<tbody>
<tr><td>ひとり親世帯</td><td>+4点</td></tr>
<tr><td>生活保護世帯（就労支援対象）</td><td>+1点</td></tr>
<tr><td>生計中心者が失業して求職中</td><td>+1点</td></tr>
<tr><td>きょうだいが希望する施設に在園中</td><td>+1点</td></tr>
</tbody>
</table>

<h3>減点項目</h3>
<table>
<thead><tr><th>状況</th><th>減点</th></tr></thead>
<tbody>
<tr><td>就労予定（内定あり）</td><td>-2点</td></tr>
</tbody>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>ひとり親世帯の+4点は他自治体と比べて大きな加算です。就労予定（内定あり）は-2点となるため、入園申込時点で就労中であることが有利です。</p>
</div>`,
    publishedAt: "2026-06-25",
  },
  {
    slug: "ama-hokatsu-tips",
    citySlug: "ama",
    title: "あま市の保活で点数を上げるコツ｜外勤フルタイムとひとり親加算の活用",
    description:
      "あま市の保育所入所を有利にするポイントを解説します。min方式なので両親とも点数を高めることが重要。外勤月20日・8時間以上で9点、ひとり親加算+4点など主要な加算の活用法を紹介します。",
    image:
      "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?w=800&h=400&fit=crop",
    category: "保活のコツ",
    categoryColor: "green",
    content: `<h2>あま市の保活で点数を上げるコツ</h2>

<h3>1. min方式を意識する — 両親とも高い点数が必要</h3>
<p>あま市はmin方式（両親の低い方を採用）のため、一方の親だけが高い点数を持っていても点数は上がりません。<strong>両親それぞれが高い選考指数を持つこと</strong>が重要です。</p>

<h3>2. 外勤・フルタイムで最高9点を目指す</h3>
<p>外勤・自営（外勤）で月20日以上・8時間以上の就労であれば9点が取得できます。内勤（テレワーク等）の場合は同じ勤務量でも7点となるため、出勤形態の確認が必要です。</p>

<h3>3. 就労中であることを証明する</h3>
<p>就労予定（内定あり）の場合は-2点の減算があります。入園申込時点で就労中であれば減算なしです。復職・転職のタイミングを検討しましょう。</p>

<h3>4. ひとり親世帯は+4点</h3>
<p>ひとり親世帯の場合、+4点の大きな加算があります。</p>

<h3>5. きょうだいが在園している施設を第一志望にする</h3>
<p>きょうだいが希望する施設に在園している場合+1点が加算されます。第一志望施設をきょうだいと同じ施設にすることで加算が得られます。</p>

<div class="info-box">
<p><strong>申込・相談窓口</strong></p>
<p>詳細はあま市の子育て支援・保育担当窓口にお問い合わせください。詳細は<a href="https://www.city.ama.aichi.jp/kurashi/1002024/hoikuenn/1009663.html" target="_blank" rel="noopener">あま市保育施設入園選考基準</a>をご参照ください。</p>
</div>`,
    publishedAt: "2026-06-25",
  },
];

registerArticles(amaArticles);
