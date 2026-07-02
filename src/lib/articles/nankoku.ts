import type { Article } from "./types";
import { registerArticles } from "./index";

const nankokuArticles: Article[] = [
  {
    slug: "nankoku-guide",
    citySlug: "nankoku",
    title: "南国市の保育所点数（利用調整指数）完全ガイド｜就労種別・時間・調整指数を詳しく解説",
    description:
      "高知県南国市の保育施設利用調整は父母合算方式。就労は居宅外・居宅内の種別と月間時間の組み合わせで最大100点。ひとり親+30点、虐待DV+50点など調整指数も詳しく解説。",
    image:
      "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>南国市の保育施設利用調整制度</h2>
<p>高知県南国市の保育施設利用調整は<span class="highlight">父母合算方式（sum方式）</span>を採用しています。父・母それぞれの基本指数を算定し、調整指数を加えた合計で優先順位を決定します。</p>

<h3>南国市の利用調整の特徴</h3>
<p>南国市では就労を<strong>居宅外・居宅内の種別</strong>と<strong>月間就労時間</strong>の組み合わせで評価します。居宅外就労の中心者（会社員・自営業の事業主等）が最高評価で、月150時間以上の場合100点となります。</p>

<h3>利用調整の基本的な流れ</h3>
<ul>
<li>父・母それぞれの保育を必要とする事由を確認し、基本指数を算定</li>
<li>各自の基本指数を合算（父+母）</li>
<li>調整指数（加点・減点）を加算</li>
<li>合計指数が高い世帯から順に内定</li>
</ul>

<h3>基本指数（各親の最大値）</h3>
<table>
<thead><tr><th>事由</th><th>種別・条件</th><th>指数</th></tr></thead>
<tbody>
<tr><td>居宅外就労（中心者）</td><td>月150時間以上</td><td>100</td></tr>
<tr><td>居宅外就労（中心者）</td><td>月120〜150時間未満</td><td>95</td></tr>
<tr><td>居宅外就労（中心者）</td><td>月90〜120時間未満</td><td>90</td></tr>
<tr><td>居宅外就労（中心者）</td><td>月64〜90時間未満</td><td>80</td></tr>
<tr><td>居宅外就労（中心者）</td><td>月48〜64時間未満</td><td>60</td></tr>
<tr><td>居宅外就労（協力者）</td><td>月150時間以上</td><td>80</td></tr>
<tr><td>居宅内就労（中心者）</td><td>月150時間以上</td><td>95</td></tr>
<tr><td>長期入院・常時病臥</td><td>－</td><td>100</td></tr>
<tr><td>心身障害（手帳1・2級等）</td><td>－</td><td>100</td></tr>
<tr><td>介護・看護（最重度）</td><td>要介護5等</td><td>90</td></tr>
<tr><td>就学・職業訓練</td><td>月150時間以上</td><td>80</td></tr>
<tr><td>出産</td><td>産前産後8週以内</td><td>60</td></tr>
<tr><td>求職活動</td><td>－</td><td>20</td></tr>
<tr><td>育児休業（転園希望）</td><td>－</td><td>5</td></tr>
</tbody>
</table>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳細は<a href="https://www.city.nankoku.lg.jp/reiki/reiki_honbun/i900RG00001015.html" target="_blank" rel="noopener">南国市保育施設等の利用調整に関する要綱</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-06-29",
  },
  {
    slug: "nankoku-employment",
    citySlug: "nankoku",
    title: "南国市の保育所点数｜就労種別・月間時間ごとの指数を完全解説",
    description:
      "南国市の保育利用調整で最重要な就労指数を解説。居宅外（中心者/協力者）・居宅内・内職の種別と月間時間（48〜150時間以上）の組み合わせで指数が決まります。",
    image:
      "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&h=400&fit=crop",
    category: "就労・仕事",
    categoryColor: "blue",
    content: `<h2>南国市の就労指数</h2>
<p>南国市では就労を<strong>居宅外・居宅内の種別</strong>と<strong>月間就労時間</strong>の2軸で評価します。同じ時間でも就労種別によって指数が異なる点が南国市の特徴です。</p>

<h3>居宅外就労（会社員・自営業中心者）</h3>
<table>
<thead><tr><th>月間就労時間</th><th>指数</th></tr></thead>
<tbody>
<tr><td>月150時間以上</td><td>100</td></tr>
<tr><td>月120〜150時間未満</td><td>95</td></tr>
<tr><td>月90〜120時間未満</td><td>90</td></tr>
<tr><td>月64〜90時間未満</td><td>80</td></tr>
<tr><td>月48〜64時間未満</td><td>60</td></tr>
</tbody>
</table>

<h3>居宅外就労（自営業協力者・専従者）</h3>
<table>
<thead><tr><th>月間就労時間</th><th>指数</th></tr></thead>
<tbody>
<tr><td>月150時間以上</td><td>80</td></tr>
<tr><td>月120〜150時間未満</td><td>75</td></tr>
<tr><td>月90〜120時間未満</td><td>70</td></tr>
<tr><td>月64〜90時間未満</td><td>60</td></tr>
<tr><td>月48〜64時間未満</td><td>50</td></tr>
</tbody>
</table>

<h3>居宅内就労（自営業中心者）</h3>
<table>
<thead><tr><th>月間就労時間</th><th>指数</th></tr></thead>
<tbody>
<tr><td>月150時間以上</td><td>95</td></tr>
<tr><td>月120〜150時間未満</td><td>90</td></tr>
<tr><td>月90〜120時間未満</td><td>85</td></tr>
<tr><td>月64〜90時間未満</td><td>75</td></tr>
<tr><td>月48〜64時間未満</td><td>55</td></tr>
</tbody>
</table>

<h3>居宅内就労（自営業協力者・専従者）・内職等</h3>
<table>
<thead><tr><th>種別・月間時間</th><th>指数</th></tr></thead>
<tbody>
<tr><td>居宅内（協力者）月150時間以上</td><td>75</td></tr>
<tr><td>居宅内（協力者）月120〜150時間未満</td><td>70</td></tr>
<tr><td>居宅内（協力者）月90〜120時間未満</td><td>65</td></tr>
<tr><td>居宅内（協力者）月64〜90時間未満</td><td>55</td></tr>
<tr><td>居宅内（協力者）月48〜64時間未満</td><td>45</td></tr>
<tr><td>内職等（月120時間以上）</td><td>45</td></tr>
<tr><td>内職等（月120時間未満）</td><td>40</td></tr>
</tbody>
</table>

<div class="point-box">
<p><strong>ポイント</strong>：月48時間（週3日×4週相当）が最低基準です。月48時間未満の就労は基本指数の対象外となります。</p>
</div>`,
    publishedAt: "2026-06-29",
  },
  {
    slug: "nankoku-other-reasons",
    citySlug: "nankoku",
    title: "南国市の保育所点数｜就労以外の事由（出産・疾病・介護・就学等）の指数",
    description:
      "南国市の保育利用調整で就労以外の事由の指数を解説。疾病・障害100点、介護看護90点、出産60点、就学80点、求職活動20点など各事由の詳細をわかりやすく説明します。",
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>就労以外の保育必要事由と基本指数</h2>
<p>南国市では就労以外にも様々な理由が保育必要事由として認められています。</p>

<h3>疾病・障害</h3>
<table>
<thead><tr><th>状況</th><th>指数</th></tr></thead>
<tbody>
<tr><td>長期入院（1ヶ月以上）または常時病臥</td><td>100</td></tr>
<tr><td>在宅療養（保育不能）</td><td>80</td></tr>
<tr><td>在宅療養（保育困難）</td><td>60</td></tr>
<tr><td>心身障害（手帳1・2級等）</td><td>100</td></tr>
<tr><td>心身障害（手帳3級等）</td><td>80</td></tr>
<tr><td>心身障害（手帳4〜6級等）</td><td>60</td></tr>
</tbody>
</table>

<h3>介護・看護</h3>
<table>
<thead><tr><th>状況</th><th>指数</th></tr></thead>
<tbody>
<tr><td>最重度対象者（要介護5等）の在宅介護</td><td>90</td></tr>
<tr><td>中度対象者（要介護3〜4等）の在宅介護</td><td>70</td></tr>
<tr><td>その他の介護・看護</td><td>50</td></tr>
</tbody>
</table>

<h3>その他の事由</h3>
<table>
<thead><tr><th>事由</th><th>条件</th><th>指数</th></tr></thead>
<tbody>
<tr><td>出産</td><td>産前産後8週以内</td><td>60</td></tr>
<tr><td>出産</td><td>産前産後6ヶ月以内（8週除く）</td><td>15</td></tr>
<tr><td>災害復旧</td><td>－</td><td>100</td></tr>
<tr><td>求職活動</td><td>－</td><td>20</td></tr>
<tr><td>就学・職業訓練</td><td>月150時間以上</td><td>80</td></tr>
<tr><td>就学・職業訓練</td><td>月120〜150時間未満</td><td>75</td></tr>
<tr><td>就学・職業訓練</td><td>月90〜120時間未満</td><td>70</td></tr>
<tr><td>就学・職業訓練</td><td>月64〜90時間未満</td><td>65</td></tr>
<tr><td>就学・職業訓練</td><td>月48〜64時間未満</td><td>60</td></tr>
<tr><td>育児休業（転園希望）</td><td>－</td><td>5</td></tr>
<tr><td>その他（親不在等）</td><td>－</td><td>100</td></tr>
</tbody>
</table>`,
    publishedAt: "2026-06-29",
  },
  {
    slug: "nankoku-adjustment",
    citySlug: "nankoku",
    title: "南国市の保育所調整指数（加点・減点）完全リスト｜ひとり親・虐待DV・保育士加点等",
    description:
      "南国市の保育利用調整の調整指数を全項目解説。ひとり親+30、虐待DV+50、新規保育士就労+35、兄弟同時入所+18、保育料未納-43など加点・減点の全内容を掲載。",
    image:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=400&fit=crop",
    category: "調整点数",
    categoryColor: "amber",
    content: `<h2>南国市の調整指数</h2>
<p>南国市では基本指数に調整指数を加えた合計で優先順位を決定します。以下に加点・減点の全項目を示します。</p>

<h3>加点項目</h3>
<table>
<thead><tr><th>項目</th><th>条件</th><th>調整指数</th></tr></thead>
<tbody>
<tr><td>ひとり親</td><td>死別・離婚等のひとり親世帯</td><td>+30</td></tr>
<tr><td>虐待・DV</td><td>児童虐待・DVのおそれがある世帯</td><td>+50</td></tr>
<tr><td>新規保育士就労</td><td>市内保育施設に新たに就労する保育士等</td><td>+35</td></tr>
<tr><td>産休・育休明け復職</td><td>復職予定の産休・育休中保護者</td><td>+15</td></tr>
<tr><td>多胎児（同施設）</td><td>双子等が同一施設を希望</td><td>+15</td></tr>
<tr><td>転園保育士</td><td>市内保育施設で転園希望の在籍保育士等</td><td>+13</td></tr>
<tr><td>他市区町村転入（4月）</td><td>転入後の4月入所希望</td><td>+12</td></tr>
<tr><td>申込児が障害児</td><td>入所希望児童が障害児</td><td>+10</td></tr>
<tr><td>生活保護世帯</td><td>生活保護受給中</td><td>+10</td></tr>
<tr><td>世帯員に障害者</td><td>同居世帯員に障害者がいる</td><td>+10</td></tr>
<tr><td>第3子以降</td><td>当該児童が第3子以降</td><td>+10</td></tr>
<tr><td>兄弟同時入所</td><td>兄弟姉妹を同時に同一施設へ申込</td><td>+18</td></tr>
<tr><td>兄弟継続転園</td><td>前々年度から継続して兄弟在籍施設への転園希望</td><td>+8</td></tr>
<tr><td>単身赴任（県外）</td><td>配偶者が県外に単身赴任中</td><td>+5</td></tr>
</tbody>
</table>

<h3>減点項目</h3>
<table>
<thead><tr><th>項目</th><th>条件</th><th>調整指数</th></tr></thead>
<tbody>
<tr><td>保育料未納</td><td>保育料を滞納している</td><td>-43</td></tr>
<tr><td>不正行為歴</td><td>過去の申込辞退等の不正行為</td><td>-18</td></tr>
<tr><td>65歳未満同居親族（保育可能）</td><td>保育可能な65歳未満親族が同居</td><td>-2</td></tr>
</tbody>
</table>

<div class="point-box">
<p><strong>注意</strong>：保育料の未納は-43点と大きな減点です。申込前に未納がないか必ず確認しましょう。</p>
</div>`,
    publishedAt: "2026-06-29",
  },
  {
    slug: "nankoku-hokatsu-tips",
    citySlug: "nankoku",
    title: "南国市の保活対策｜点数を上げる方法と入園しやすい時期・施設の選び方",
    description:
      "南国市で保育所に入るためのポイントを解説。就労指数を最大化する方法、調整指数の活用、申込時期・施設選びのコツまで保活成功のための実践的なアドバイスをまとめました。",
    image:
      "https://images.unsplash.com/photo-1540479859555-17af45c78602?w=800&h=400&fit=crop",
    category: "保活のコツ",
    categoryColor: "purple",
    content: `<h2>南国市の保活で点数を上げるポイント</h2>

<h3>就労指数を最大化する</h3>
<p>南国市の利用調整で最も重要なのが就労指数です。月間就労時間を増やすことが有効です。</p>
<ul>
<li>月150時間以上（週5日フルタイム）で最高の100点を目指す</li>
<li>雇用形態が「居宅外就労の中心者」（会社員・自営業の事業主）であれば同じ時間でも協力者より高指数</li>
<li>月48時間（週3日×週4時間程度）が最低基準。それ以下は指数対象外</li>
</ul>

<h3>調整指数を活用する</h3>
<p>基本指数に加え、以下の調整指数も大きく影響します。</p>
<ul>
<li><strong>産休・育休明け復職</strong>：+15点。復職を予定している場合は申告を忘れずに</li>
<li><strong>兄弟姉妹の同時入所</strong>：+18点。兄弟を同じ施設に同時申込する場合は加算</li>
<li><strong>ひとり親世帯</strong>：+30点。該当する場合は必ず申告する</li>
</ul>

<h3>保育料の未納は必ず解消する</h3>
<p>保育料の滞納がある場合、<strong>-43点</strong>の大幅な減点となります。申込前に必ず清算してください。</p>

<h3>入園しやすい時期と施設</h3>
<ul>
<li>4月入所の申込は前年の10〜11月頃。早めに準備を始めましょう</li>
<li>年度途中（5月〜3月）の入所は定員に余裕がある場合のみ可能</li>
<li>認可外保育施設やこども園など複数の施設を第一〜第三希望まで記入すると内定の可能性が上がる</li>
</ul>

<div class="info-box">
<p><strong>相談窓口</strong></p>
<p>南国市 子育て支援課（Tel: 088-880-6562）に事前に相談することをお勧めします。点数の見込みや施設の空き状況を確認できます。</p>
</div>`,
    publishedAt: "2026-06-29",
  },
];

registerArticles(nankokuArticles);
