import type { Article } from "./types";
import { registerArticles } from "./index";

const kikuyoArticles: Article[] = [
  {
    slug: "kikuyo-guide",
    citySlug: "kikuyo",
    title: "菊陽町の保育所入所点数（選考基準）完全ガイド｜就労時間・調整点数を詳しく解説",
    description:
      "熊本県菊陽町の保育所入所選考は父母合算方式。就労は1日×週あたりの時間基準で最大10点。ひとり親+14点、地域型保育卒園児+20点など調整点数も詳しく解説します。",
    image:
      "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>菊陽町の保育所入所選考制度</h2>
<p>熊本県菊陽町の保育所等入所選考は<span class="highlight">父母合算方式（sum方式）</span>を採用しています。父・母それぞれの基本指数（最大10点）を合算し、調整指数を加えた合計点で優先順位を決定します。</p>

<h3>菊陽町の入所選考の特徴</h3>
<p>菊陽町では就労を<strong>1日の就労時間と週の就労日数</strong>で評価します。1日7.5時間以上・週5日以上（月150時間相当）の就労で最高10点が取得できます。</p>

<h3>入所選考の基本的な流れ</h3>
<ul>
<li>父・母それぞれの保育を必要とする事由を確認し、基本指数を算定（各最大10点）</li>
<li>父・母の基本指数を合算（父+母=最大20点）</li>
<li>調整指数（加点・減点）を加算</li>
<li>合計点が高い世帯から順に入所内定</li>
</ul>

<h3>基本指数の主な区分</h3>
<table>
<thead><tr><th>事由</th><th>条件</th><th>指数</th></tr></thead>
<tbody>
<tr><td>就労</td><td>1日7.5時間以上・週5日以上（月150時間以上）</td><td>10</td></tr>
<tr><td>就労</td><td>1日6時間以上・週5日以上（月120時間以上）</td><td>9</td></tr>
<tr><td>就労</td><td>1日5時間以上・週4日以上（月96時間以上）</td><td>8</td></tr>
<tr><td>就労</td><td>1日5時間以上・週3日以上（月80時間以上）</td><td>7</td></tr>
<tr><td>就労</td><td>1日4時間以上・週3日以上（月60時間以上）</td><td>6</td></tr>
<tr><td>出産（母のみ）</td><td>産前産後</td><td>9</td></tr>
<tr><td>長期入院・常時病臥</td><td>1か月以上</td><td>8〜10</td></tr>
<tr><td>障害（手帳1・2級等）</td><td>－</td><td>10</td></tr>
<tr><td>求職活動</td><td>就労先未定</td><td>2</td></tr>
<tr><td>内職</td><td>月額2万円以上</td><td>5</td></tr>
</tbody>
</table>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳細は<a href="https://www1.g-reiki.net/kikuyo/reiki_honbun/q438RG00000924.html" target="_blank" rel="noopener">菊陽町保育所等入所選考実施要項</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-06-29",
  },
  {
    slug: "kikuyo-employment",
    citySlug: "kikuyo",
    title: "菊陽町の保育所入所点数｜就労時間・日数ごとの指数と内職・求職の扱い",
    description:
      "菊陽町の保育入所選考で最も重要な就労指数を解説。1日×週の時間基準（月60〜150時間相当）で6〜10点。内職5点、求職2点の評価方法も詳しく説明します。",
    image:
      "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&h=400&fit=crop",
    category: "就労・仕事",
    categoryColor: "blue",
    content: `<h2>菊陽町の就労指数</h2>
<p>菊陽町では就労を<strong>1日の就労時間と週の就労日数の組み合わせ</strong>で評価します。</p>

<h3>就労指数表</h3>
<table>
<thead><tr><th>就労状況</th><th>月換算目安</th><th>指数</th></tr></thead>
<tbody>
<tr><td>1日7.5時間以上・週5日以上</td><td>月150時間以上</td><td>10</td></tr>
<tr><td>1日6時間以上・週5日以上</td><td>月120時間以上</td><td>9</td></tr>
<tr><td>1日5時間以上・週4日以上</td><td>月96時間以上</td><td>8</td></tr>
<tr><td>1日5時間以上・週3日以上</td><td>月80時間以上</td><td>7</td></tr>
<tr><td>1日4時間以上・週3日以上</td><td>月60時間以上</td><td>6</td></tr>
<tr><td>上記以下（一時保育での対応が困難）</td><td>月60時間未満</td><td>4</td></tr>
<tr><td>上記以下（一時保育での対応が可能）</td><td>月60時間未満</td><td>0</td></tr>
</tbody>
</table>

<h3>内職・求職の指数</h3>
<table>
<thead><tr><th>状況</th><th>指数</th></tr></thead>
<tbody>
<tr><td>内職（月額20,000円以上の実績が1か月以上）</td><td>5</td></tr>
<tr><td>内職（その他保育に欠けると認められる場合）</td><td>4</td></tr>
<tr><td>就労先未定（求職活動中）</td><td>2</td></tr>
</tbody>
</table>

<div class="point-box">
<p><strong>ポイント</strong>：就労先内定・就学（職業訓練）の場合も、就労時間に準じた指数が適用されます。また、自営業の場合も就労証明書の就労時間に基づき同様の指数となります。</p>
</div>`,
    publishedAt: "2026-06-29",
  },
  {
    slug: "kikuyo-other-reasons",
    citySlug: "kikuyo",
    title: "菊陽町の保育所入所点数｜就労以外の事由（出産・疾病・障害・介護）の指数",
    description:
      "菊陽町の保育入所選考で就労以外の事由の指数を解説。疾病入院10点、障害手帳1・2級10点、出産（母のみ）9点、介護・看護は最高10点。各事由の指数を詳しく説明します。",
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>就労以外の保育必要事由と基本指数</h2>
<p>菊陽町では就労以外にも様々な理由が保育必要事由として認められています。各事由の基本指数は以下の通りです。</p>

<h3>疾病・障害</h3>
<table>
<thead><tr><th>状況</th><th>指数</th></tr></thead>
<tbody>
<tr><td>入院中</td><td>10</td></tr>
<tr><td>常時病臥・感染症（1か月以上）</td><td>8</td></tr>
<tr><td>一般疾患（1か月以上安静を要する者）</td><td>6</td></tr>
<tr><td>障害（手帳1・2級/療育A1・A2/精神1級等）</td><td>10</td></tr>
<tr><td>障害（手帳3級/療育B1/精神2級等）</td><td>7</td></tr>
<tr><td>障害（手帳4・5・6級/療育B2/精神3級等）</td><td>5</td></tr>
</tbody>
</table>

<h3>介護・看護</h3>
<p>介護・看護の指数は聴き取り内容及び提出書類により決定され、最高10点です。</p>
<table>
<thead><tr><th>状況</th><th>指数目安</th></tr></thead>
<tbody>
<tr><td>入院付き添い看護</td><td>最高10点（役所が決定）</td></tr>
<tr><td>居宅内看護・介護</td><td>最高10点（役所が決定）</td></tr>
<tr><td>心身障がい児の看護・介護</td><td>最高10点（役所が決定）</td></tr>
</tbody>
</table>

<h3>その他の事由</h3>
<table>
<thead><tr><th>事由</th><th>条件</th><th>指数</th></tr></thead>
<tbody>
<tr><td>出産</td><td>母親のみ対象（産前産後）</td><td>9</td></tr>
<tr><td>家庭の災害</td><td>天災等による災害復旧</td><td>10</td></tr>
</tbody>
</table>`,
    publishedAt: "2026-06-29",
  },
  {
    slug: "kikuyo-adjustment",
    citySlug: "kikuyo",
    title: "菊陽町の保育所入所調整指数（加点・減点）完全リスト｜ひとり親・卒園児・保育士加点等",
    description:
      "菊陽町の保育入所選考の調整指数を全項目解説。ひとり親+14点、地域型保育卒園児+20点、兄弟在園+8点、保育士月120h以上+12点、利用者負担滞納-8点など加点・減点の全内容。",
    image:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=400&fit=crop",
    category: "調整点数",
    categoryColor: "amber",
    content: `<h2>菊陽町の調整指数</h2>
<p>菊陽町では基本指数に調整指数を加えた合計で優先順位を決定します。以下に加点・減点の全項目を示します。</p>

<h3>加点項目</h3>
<table>
<thead><tr><th>項目</th><th>条件</th><th>調整指数</th></tr></thead>
<tbody>
<tr><td>ひとり親世帯</td><td>父または母の死亡・離別・行方不明・拘禁（基本+10・調整+4）</td><td>+14</td></tr>
<tr><td>地域型保育卒園児</td><td>町内の地域型保育事業からの卒園児</td><td>+20</td></tr>
<tr><td>社会的養護</td><td>児童相談所・里親委託等が関与する世帯</td><td>+10</td></tr>
<tr><td>兄弟姉妹在園（第1希望）</td><td>兄弟姉妹が在園している施設を第1希望に</td><td>+8</td></tr>
<tr><td>町内保育所等勤務（月120h以上）</td><td>保護者が町内保育所等に月120時間以上勤務</td><td>+12</td></tr>
<tr><td>町内保育所等勤務（月52〜120h未満）</td><td>保護者が町内保育所等に月52時間以上勤務</td><td>+8</td></tr>
<tr><td>産休・育休明け職場復帰</td><td>復職予定の産休・育休中の保護者</td><td>+4</td></tr>
<tr><td>経済的困難</td><td>生計中心者が失業・倒産等で就労が必要</td><td>+3</td></tr>
<tr><td>生活保護世帯</td><td>生活保護受給中</td><td>+3</td></tr>
<tr><td>単身赴任</td><td>保護者が単身赴任（同居家族なし）</td><td>+2</td></tr>
<tr><td>祖父母が隣接市区町村にいない</td><td>菊池市・西原村を含む隣接市区町村に祖父母不在</td><td>+1</td></tr>
<tr><td>障がい児</td><td>医師等の意見書で集団保育が必要と認められる</td><td>+1</td></tr>
<tr><td>兄弟姉妹転園</td><td>兄弟姉妹が在園中の施設への転園希望</td><td>+1</td></tr>
<tr><td>兄弟姉妹同時申込</td><td>兄弟姉妹を同時に申込</td><td>+1</td></tr>
<tr><td>多子世帯</td><td>18歳未満の児童を3人以上扶養</td><td>+1</td></tr>
<tr><td>多胎児</td><td>双子以上が申込</td><td>+1</td></tr>
<tr><td>育休明けで退所前施設に再申込</td><td>育休取得前の保育所に再入所申込</td><td>+1</td></tr>
</tbody>
</table>

<h3>減点項目</h3>
<table>
<thead><tr><th>項目</th><th>条件</th><th>調整指数</th></tr></thead>
<tbody>
<tr><td>利用者負担額の滞納</td><td>正当な理由なく滞納（在籍児・退園児含む）</td><td>-8</td></tr>
<tr><td>65歳未満の無職同居家族</td><td>保育できると認められる65歳未満同居家族</td><td>-2</td></tr>
</tbody>
</table>`,
    publishedAt: "2026-06-29",
  },
  {
    slug: "kikuyo-hokatsu-tips",
    citySlug: "kikuyo",
    title: "菊陽町の保活対策｜入所点数を上げる方法と申込のポイント",
    description:
      "菊陽町で保育所に入るためのポイントを解説。就労時間を増やして基本指数を最大化する方法、ひとり親+14点・地域型保育卒園+20点など調整指数の活用方法を実践的に説明します。",
    image:
      "https://images.unsplash.com/photo-1540479859555-17af45c78602?w=800&h=400&fit=crop",
    category: "保活のコツ",
    categoryColor: "purple",
    content: `<h2>菊陽町の保活で点数を上げるポイント</h2>

<h3>就労指数を最大化する</h3>
<p>菊陽町の入所選考で最も重要なのが就労指数（最大10点）です。</p>
<ul>
<li>1日7.5時間以上・週5日以上の就労で最高10点。フルタイム勤務が最も有利</li>
<li>週5日・1日6時間（時短勤務）でも9点と高指数を維持できる</li>
<li>週4日・1日5時間（月96時間相当）でも8点確保可能</li>
<li>月60時間未満（週3日・1日4時間未満）は最大4点まで下がるため注意</li>
</ul>

<h3>調整指数の大きな加点を活用する</h3>
<ul>
<li><strong>地域型保育卒園（+20点）</strong>：小規模保育施設等を卒園した場合、大きく加算</li>
<li><strong>ひとり親世帯（+14点）</strong>：基本指数+10・調整+4の合計。該当する場合は申告必須</li>
<li><strong>社会的養護（+10点）</strong>：児童相談所等が関与する世帯</li>
<li><strong>兄弟姉妹在園の施設を第1希望に（+8点）</strong>：既に在園中の施設への申込で加算</li>
</ul>

<h3>同点の場合の優先順位</h3>
<p>同点の場合は以下の順で優先されます：</p>
<ol>
<li>入所希望園に兄弟姉妹が既に入所している</li>
<li>地域型保育事業（小規模保育等）からの卒園</li>
<li>ひとり親世帯</li>
<li>入所希望施設の志望順位が高い</li>
<li>基本指数が高い</li>
<li>保護者と児童が同世帯</li>
<li>多子世帯（18歳未満3人以上）</li>
<li>所得割が低い</li>
</ol>

<div class="info-box">
<p><strong>相談窓口</strong></p>
<p>菊陽町役場 子育て支援課（Tel: 096-232-4912）に事前に相談することをお勧めします。</p>
</div>`,
    publishedAt: "2026-06-29",
  },
];

registerArticles(kikuyoArticles);
