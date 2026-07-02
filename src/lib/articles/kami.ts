import type { Article } from "./types";
import { registerArticles } from "./index";

const kamiArticles: Article[] = [
  {
    slug: "kami-guide",
    citySlug: "kami",
    title: "加美町の保育所入所点数（選考基準）完全ガイド｜就労日数・時間と調整点数を詳しく解説",
    description:
      "宮城県加美町の保育所入所選考は父母合算方式。就労は月間日数と1日の就労時間の組み合わせで最大10点。ひとり親+5点・生活保護+10点など調整点数も詳しく解説します。",
    image:
      "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>加美町の保育所入所選考制度</h2>
<p>宮城県加美町の保育所等入所選考は<span class="highlight">父母合算方式（sum方式）</span>を採用しています。父・母それぞれの基本点数（最大10点）を合算し、祖父母の状況や調整点数を加えた合計点で優先順位を決定します。</p>

<h3>加美町の入所選考の特徴</h3>
<p>加美町では就労を<strong>月間就労日数（月20日以上/月16〜19日/月12〜15日）と1日の就労時間の組み合わせ</strong>で評価します。月20日以上・7.5時間以上の就労で最高10点が取得できます。</p>
<p>また、同居の祖父母の状況（就労・高齢等）も選考点数に影響します。</p>

<h3>入所選考の基本的な流れ</h3>
<ul>
<li>父・母それぞれの保育を必要とする事由を確認し、基本点数を算定（各最大10点）</li>
<li>父・母の基本点数を合算（父+母=最大20点）</li>
<li>同居祖父母の状況に応じた点数を加算</li>
<li>優先利用①②③（調整点数）を加算</li>
<li>合計点が高い世帯から順に入所内定</li>
</ul>

<h3>基本点数の主な区分（就労）</h3>
<table>
<thead><tr><th>就労日数</th><th>1日の就労時間</th><th>月間時間目安</th><th>点数</th></tr></thead>
<tbody>
<tr><td>月20日以上</td><td>7.5時間以上</td><td>150時間以上</td><td>10</td></tr>
<tr><td>月20日以上</td><td>6時間以上</td><td>120時間以上</td><td>9</td></tr>
<tr><td>月20日以上</td><td>5時間以上</td><td>100時間以上</td><td>8</td></tr>
<tr><td>月20日以上</td><td>4時間以上</td><td>80時間以上</td><td>7</td></tr>
<tr><td>月20日以上</td><td>2.4時間以上</td><td>48時間以上</td><td>6</td></tr>
<tr><td>月16〜19日</td><td>7.5時間以上</td><td>120時間以上</td><td>9</td></tr>
<tr><td>月16〜19日</td><td>6時間以上</td><td>96時間以上</td><td>8</td></tr>
<tr><td>月12〜15日</td><td>7.5時間以上</td><td>90時間以上</td><td>8</td></tr>
</tbody>
</table>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳細は<a href="https://www.town.kami.miyagi.jp/section/reiki_int/reiki_honbun/r004RG00000706.html" target="_blank" rel="noopener">加美町教育・保育施設等入園選考に関する要綱</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-06-29",
  },
  {
    slug: "kami-employment",
    citySlug: "kami",
    title: "加美町の保育所入所点数｜月間就労日数・1日就労時間ごとの基本点数を詳しく解説",
    description:
      "加美町の保育入所選考で最も重要な就労基本点数を解説。月20日以上・7.5時間以上で10点、月16〜19日・3時間以上で5点まで。就学8点・求職2点・育休継続3点も説明します。",
    image:
      "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&h=400&fit=crop",
    category: "就労・仕事",
    categoryColor: "blue",
    content: `<h2>加美町の就労基本点数</h2>
<p>加美町では就労を<strong>月間就労日数と1日の就労時間の組み合わせ</strong>で評価します。自営業等の協力者（家業の手伝い等）は選択した点数から2点減となります。</p>

<h3>月20日以上勤務の場合</h3>
<table>
<thead><tr><th>1日の就労時間</th><th>月間合計目安</th><th>点数</th></tr></thead>
<tbody>
<tr><td>7.5時間以上</td><td>150時間以上</td><td>10</td></tr>
<tr><td>6時間以上7.5時間未満</td><td>120時間以上</td><td>9</td></tr>
<tr><td>5時間以上6時間未満</td><td>100時間以上</td><td>8</td></tr>
<tr><td>4時間以上5時間未満</td><td>80時間以上</td><td>7</td></tr>
<tr><td>2.4時間以上4時間未満</td><td>48時間以上</td><td>6</td></tr>
</tbody>
</table>

<h3>月16日以上20日未満勤務の場合</h3>
<table>
<thead><tr><th>1日の就労時間</th><th>月間合計目安</th><th>点数</th></tr></thead>
<tbody>
<tr><td>7.5時間以上</td><td>120時間以上</td><td>9</td></tr>
<tr><td>6時間以上7.5時間未満</td><td>96時間以上</td><td>8</td></tr>
<tr><td>5時間以上6時間未満</td><td>80時間以上</td><td>7</td></tr>
<tr><td>4時間以上5時間未満</td><td>64時間以上</td><td>6</td></tr>
<tr><td>3時間以上4時間未満</td><td>48時間以上</td><td>5</td></tr>
</tbody>
</table>

<h3>月12日以上16日未満勤務の場合</h3>
<table>
<thead><tr><th>1日の就労時間</th><th>月間合計目安</th><th>点数</th></tr></thead>
<tbody>
<tr><td>7.5時間以上</td><td>90時間以上</td><td>8</td></tr>
<tr><td>6時間以上7.5時間未満</td><td>72時間以上</td><td>7</td></tr>
<tr><td>5時間以上6時間未満</td><td>60時間以上</td><td>6</td></tr>
<tr><td>4時間以上5時間未満</td><td>48時間以上</td><td>5</td></tr>
</tbody>
</table>

<h3>就労以外の主な事由の点数</h3>
<table>
<thead><tr><th>事由</th><th>点数</th></tr></thead>
<tbody>
<tr><td>就学・職業訓練校への通学</td><td>8</td></tr>
<tr><td>育児休業中（既入所児の継続利用）</td><td>3</td></tr>
<tr><td>求職活動中</td><td>2</td></tr>
</tbody>
</table>`,
    publishedAt: "2026-06-29",
  },
  {
    slug: "kami-other-reasons",
    citySlug: "kami",
    title: "加美町の保育所入所点数｜就労以外の事由（出産・疾病・障害・介護・虐待DV）の基本点数",
    description:
      "加美町の保育入所選考で就労以外の事由の点数を解説。妊娠・出産10点、入院中10点、身体障害1〜2級10点、常時介護9点、虐待・DV10点。就労以外の全事由の基本点数を詳しく説明します。",
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>就労以外の保育必要事由と基本点数</h2>
<p>加美町では就労以外にも様々な理由が保育必要事由として認められています。各事由の基本点数は以下の通りです。</p>

<h3>妊娠・出産</h3>
<table>
<thead><tr><th>状況</th><th>点数</th></tr></thead>
<tbody>
<tr><td>出産予定月の産前産後2か月以内にある（母のみ対象）</td><td>10</td></tr>
</tbody>
</table>

<h3>保護者の疾病・障害</h3>
<table>
<thead><tr><th>状況</th><th>点数</th></tr></thead>
<tbody>
<tr><td>入院中</td><td>10</td></tr>
<tr><td>身体障害者手帳1〜2級または要介護4〜5程度</td><td>10</td></tr>
<tr><td>自宅療養を要する等保育が日常的に困難</td><td>9</td></tr>
<tr><td>身体障害者手帳3級または要介護1〜3程度</td><td>8</td></tr>
<tr><td>身体障害者手帳4級以下または要支援1〜2程度</td><td>6</td></tr>
<tr><td>月10日以上の通院を要する</td><td>7</td></tr>
<tr><td>医師の診断書による（上記以外）</td><td>5</td></tr>
</tbody>
</table>

<h3>親族の介護・看護</h3>
<p>同居または長期入院等している親族の介護・看護が理由の場合です。</p>
<table>
<thead><tr><th>状況</th><th>点数</th></tr></thead>
<tbody>
<tr><td>常時介護の必要が認められる場合</td><td>9</td></tr>
<tr><td>一部介護の必要が認められる場合</td><td>7</td></tr>
<tr><td>上記以外の介護</td><td>5</td></tr>
</tbody>
</table>

<h3>その他の事由</h3>
<table>
<thead><tr><th>事由</th><th>点数</th></tr></thead>
<tbody>
<tr><td>災害復旧活動中</td><td>10</td></tr>
<tr><td>虐待・DVのおそれがある</td><td>10</td></tr>
<tr><td>育児休業中（既に入所している子どもの継続利用が必要）</td><td>3</td></tr>
</tbody>
</table>`,
    publishedAt: "2026-06-29",
  },
  {
    slug: "kami-grandparent",
    citySlug: "kami",
    title: "加美町の保育所入所点数｜同居祖父母の状況が選考点数に影響する仕組みを解説",
    description:
      "加美町では同居祖父母の状況が入所点数に影響します。祖父母なし+10点、祖父母が就労等で保育不可+最大10点、80歳以上+7点、70〜79歳+5点、65〜69歳+4点の仕組みを詳しく解説。",
    image:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=400&fit=crop",
    category: "調整点数",
    categoryColor: "amber",
    content: `<h2>加美町の同居祖父母による点数</h2>
<p>加美町では、父または母に同居している祖父母がいない場合や、祖父母が就労・高齢等で保育できない場合に点数が加算されます。</p>

<h3>同居祖父母がいない場合</h3>
<table>
<thead><tr><th>状況</th><th>点数</th></tr></thead>
<tbody>
<tr><td>父または母は同居している祖父母がいない</td><td>+10</td></tr>
</tbody>
</table>

<h3>同居祖父母がいるが保育できない場合</h3>
<p>祖父・祖母それぞれについて、以下の状況に応じた点数が加算されます。</p>
<table>
<thead><tr><th>状況</th><th>点数（祖父・祖母各）</th></tr></thead>
<tbody>
<tr><td>就労・疾病等（月20日以上・7.5時間以上）</td><td>+10</td></tr>
<tr><td>就労・疾病等（月20日以上・6時間以上）</td><td>+9</td></tr>
<tr><td>就労・疾病等（月20日以上・5時間以上）</td><td>+8</td></tr>
<tr><td>就労・疾病等（月20日以上・4時間以上）</td><td>+7</td></tr>
<tr><td>80歳以上</td><td>+7</td></tr>
<tr><td>70歳以上80歳未満</td><td>+5</td></tr>
<tr><td>65歳以上70歳未満</td><td>+4</td></tr>
</tbody>
</table>

<div class="point-box">
<p><strong>ポイント</strong>：祖父・祖母それぞれの点数が加算されます。例えば、祖父が80歳以上（+7点）かつ祖母が就労中（+10点）であれば、合計+17点となります。</p>
</div>

<h3>優先利用（調整点数）一覧</h3>
<table>
<thead><tr><th>項目</th><th>調整点数</th></tr></thead>
<tbody>
<tr><td>ひとり親家庭</td><td>+5</td></tr>
<tr><td>生活保護世帯</td><td>+10</td></tr>
<tr><td>生計中心者の失業による就労の必要性</td><td>+8</td></tr>
<tr><td>虐待・DVのおそれがある（社会的養護が必要）</td><td>+10</td></tr>
<tr><td>入所希望の子どもが障害を有する</td><td>+1</td></tr>
<tr><td>育児休業明けの入所申込</td><td>+2</td></tr>
<tr><td>兄弟姉妹が同一保育所等を希望</td><td>+3</td></tr>
<tr><td>前年度から待機児童</td><td>+1</td></tr>
<tr><td>小規模保育事業等の卒園措置</td><td>+3</td></tr>
<tr><td>継続での利用申込</td><td>+3</td></tr>
<tr><td>利用者負担額等の滞納（正当な理由なし）</td><td>-5</td></tr>
<tr><td>自営業等の協力者として就労</td><td>-2</td></tr>
</tbody>
</table>`,
    publishedAt: "2026-06-29",
  },
];

registerArticles(kamiArticles);
