import type { Article } from "./types";
import { registerArticles } from "./index";

const katagamiArticles: Article[] = [
  {
    slug: "katagami-guide",
    citySlug: "katagami",
    title: "潟上市の保育所入所点数（選考基準）完全ガイド｜就労時間・調整点数を詳しく解説",
    description:
      "秋田県潟上市の保育所入所選考は父母合算方式。就労は週間就労時間と勤務日数で最大10点。ひとり親+10点、幼稚園教諭・保育士+10点など調整点数も詳しく解説します。",
    image:
      "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>潟上市の保育所入所選考制度</h2>
<p>秋田県潟上市の保育所等入所選考は<span class="highlight">父母合算方式（sum方式）</span>を採用しています。父・母それぞれの基本点数（最大10点）を合算し、調整点数を加えた合計点で優先順位を決定します。</p>

<h3>潟上市の入所選考の特徴</h3>
<p>潟上市では就労を<strong>勤務形態（外勤・居宅内）と週間就労時間の組み合わせ</strong>で評価します。週5日以上・週35時間以上（月140時間以上）の就労で最高10点が取得できます。</p>

<h3>入所選考の基本的な流れ</h3>
<ul>
<li>父・母それぞれの保育を必要とする事由を確認し、基本点数を算定（各最大10点）</li>
<li>父・母の基本点数を合算（父+母=最大20点）</li>
<li>調整点数（加点・減点）を加算</li>
<li>合計点が高い世帯から順に入所内定</li>
</ul>

<h3>基本点数の主な区分</h3>
<table>
<thead><tr><th>事由</th><th>条件</th><th>点数</th></tr></thead>
<tbody>
<tr><td>就労（週5日以上）</td><td>週35時間以上（月140時間以上）</td><td>10</td></tr>
<tr><td>就労（週5日以上）</td><td>週30時間以上（月120〜139時間）</td><td>9</td></tr>
<tr><td>就労（週5日以上）</td><td>週25時間以上（月100〜119時間）</td><td>8</td></tr>
<tr><td>就労（週5日以上）</td><td>週20時間以上（月80〜99時間）</td><td>7</td></tr>
<tr><td>就労（居宅内・週4日以上）</td><td>週28時間以上（月112時間以上）</td><td>8</td></tr>
<tr><td>就労（居宅内・週4日以上）</td><td>週24時間以上（月96〜111時間）</td><td>7</td></tr>
<tr><td>妊娠・出産（母のみ）</td><td>産前産後8週以内</td><td>9</td></tr>
<tr><td>精神疾患・重度（ひとり親）</td><td>－</td><td>12</td></tr>
<tr><td>長期入院・常時病臥</td><td>概ね1ヶ月以上</td><td>10</td></tr>
<tr><td>求職活動</td><td>求職中</td><td>2</td></tr>
</tbody>
</table>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳細は<a href="https://www.city.katagami.lg.jp/section/reiki_int/reiki_honbun/r123RG00000507.html" target="_blank" rel="noopener">潟上市保育所等の利用調整に関する施行細則</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-06-29",
  },
  {
    slug: "katagami-employment",
    citySlug: "katagami",
    title: "潟上市の保育所入所点数｜就労時間・勤務日数ごとの基本点数と求職・育児休業の扱い",
    description:
      "潟上市の保育入所選考で最も重要な就労基本点数を解説。週5日以上勤務と居宅内労働で基準が異なります。週35時間以上10点〜月64時間以上3点まで、求職2点・育休継続6点も説明します。",
    image:
      "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&h=400&fit=crop",
    category: "就労・仕事",
    categoryColor: "blue",
    content: `<h2>潟上市の就労基本点数</h2>
<p>潟上市では就労を<strong>勤務形態（外勤・自営・農業か居宅内労働か）と週間就労時間・勤務日数の組み合わせ</strong>で評価します。</p>

<h3>週5日以上・月20日以上勤務（外勤・自営・農業）</h3>
<table>
<thead><tr><th>週間就労時間</th><th>月換算目安</th><th>点数</th></tr></thead>
<tbody>
<tr><td>週35時間以上（7時間以上）</td><td>月140時間以上</td><td>10</td></tr>
<tr><td>週30時間以上（6時間以上）</td><td>月120〜139時間</td><td>9</td></tr>
<tr><td>週25時間以上（5時間以上）</td><td>月100〜119時間</td><td>8</td></tr>
<tr><td>週20時間以上（4時間以上）</td><td>月80〜99時間</td><td>7</td></tr>
</tbody>
</table>

<h3>居宅内労働・週4日以上・月16〜19日勤務</h3>
<table>
<thead><tr><th>週間就労時間</th><th>月換算目安</th><th>点数</th></tr></thead>
<tbody>
<tr><td>週28時間以上（7時間以上）</td><td>月112時間以上</td><td>8</td></tr>
<tr><td>週24時間以上（6時間以上）</td><td>月96〜111時間</td><td>7</td></tr>
<tr><td>週20時間以上（5時間以上）</td><td>月80〜95時間</td><td>6</td></tr>
<tr><td>週16時間以上（4時間以上）</td><td>月64〜79時間</td><td>5</td></tr>
</tbody>
</table>

<h3>その他の就労区分</h3>
<table>
<thead><tr><th>状況</th><th>点数</th></tr></thead>
<tbody>
<tr><td>上記以外で月64時間以上就労している</td><td>3</td></tr>
<tr><td>求職活動中</td><td>2</td></tr>
<tr><td>育児休業中（既に保育を利用している児童の継続）</td><td>6</td></tr>
</tbody>
</table>

<div class="point-box">
<p><strong>ポイント</strong>：就職に必要な技能習得のための就学（職業訓練校・専門学校・大学等）は、月100時間以上で8点、月64時間以上で6点が適用されます。</p>
</div>`,
    publishedAt: "2026-06-29",
  },
  {
    slug: "katagami-other-reasons",
    citySlug: "katagami",
    title: "潟上市の保育所入所点数｜就労以外の事由（出産・疾病・障害・介護）の基本点数",
    description:
      "潟上市の保育入所選考で就労以外の事由の点数を解説。精神疾患重度（ひとり親）12点、長期入院10点、障害手帳1〜2級10点、出産（母のみ）9点。各事由の基本点数を詳しく説明します。",
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>就労以外の保育必要事由と基本点数</h2>
<p>潟上市では就労以外にも様々な理由が保育必要事由として認められています。各事由の基本点数は以下の通りです。</p>

<h3>疾病・障がい</h3>
<table>
<thead><tr><th>状況</th><th>点数</th></tr></thead>
<tbody>
<tr><td>概ね1ヶ月以上の入院</td><td>10</td></tr>
<tr><td>入院に相当する治療・常時病臥</td><td>10</td></tr>
<tr><td>精神疾患 重度の症状（ひとり親）</td><td>12</td></tr>
<tr><td>精神疾患 重度の症状（ひとり親以外）</td><td>10</td></tr>
<tr><td>精神疾患 上記以外の程度</td><td>8</td></tr>
<tr><td>一般療養 保育が常時困難な場合</td><td>8</td></tr>
<tr><td>一般療養 比較的軽症（定期通院等）</td><td>5</td></tr>
<tr><td>障害 手帳1〜2級・療育手帳A・精神1〜2級</td><td>10</td></tr>
<tr><td>障害 手帳3級・療育手帳B・精神3級</td><td>8</td></tr>
<tr><td>障害 手帳4〜6級等 保育が困難な場合</td><td>5</td></tr>
</tbody>
</table>

<h3>介護・看護</h3>
<table>
<thead><tr><th>状況</th><th>点数</th></tr></thead>
<tbody>
<tr><td>施設等への付添い（居宅外労働に準ずる）</td><td>居宅外労働に準ずる</td></tr>
<tr><td>重度障害者等の全介護（要介護5・4）</td><td>10</td></tr>
<tr><td>認知症による徘徊等・常時の見守りと介護</td><td>8</td></tr>
<tr><td>常時の見守りと介助（食事・排泄・入浴等）</td><td>8</td></tr>
</tbody>
</table>

<h3>その他の事由</h3>
<table>
<thead><tr><th>事由</th><th>条件</th><th>点数</th></tr></thead>
<tbody>
<tr><td>妊娠・出産</td><td>母親のみ対象・産前産後8週以内</td><td>9</td></tr>
<tr><td>家庭の災害</td><td>火災・風水害等で家屋が失われ復旧に当たる場合</td><td>※市が判断</td></tr>
<tr><td>虐待・DV</td><td>児童虐待・配偶者からの暴力</td><td>※市が判断</td></tr>
</tbody>
</table>`,
    publishedAt: "2026-06-29",
  },
  {
    slug: "katagami-adjustment",
    citySlug: "katagami",
    title: "潟上市の保育所入所調整点数（加点・減点）完全リスト｜ひとり親・卒園児・保育士加点等",
    description:
      "潟上市の保育入所選考の調整点数を全項目解説。ひとり親+10点、幼稚園教諭・保育士+10点、地域型保育卒園児+5点、兄弟在園+1.5点。祖父母同居で-2〜-5点など加点・減点の全内容。",
    image:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=400&fit=crop",
    category: "調整点数",
    categoryColor: "amber",
    content: `<h2>潟上市の調整点数</h2>
<p>潟上市では基本点数に調整点数を加えた合計で優先順位を決定します。以下に加点・減点の全項目を示します。</p>

<h3>加点項目</h3>
<table>
<thead><tr><th>項目</th><th>条件</th><th>調整点数</th></tr></thead>
<tbody>
<tr><td>ひとり親世帯</td><td>ひとり親家庭</td><td>+10</td></tr>
<tr><td>幼稚園教諭・保育士等</td><td>保護者が幼稚園教諭・保育士等の有資格者</td><td>+10</td></tr>
<tr><td>障害児保育</td><td>入所希望児童が障害児保育を必要とする</td><td>+3</td></tr>
<tr><td>地域型保育給付施設卒園児</td><td>地域型保育事業施設からの卒園児</td><td>+5</td></tr>
<tr><td>生活保護世帯</td><td>就労による自立につながることが認められる場合</td><td>+2</td></tr>
<tr><td>育休満了後入所希望</td><td>1歳の誕生日前日まで育休取得後に入所希望</td><td>+2</td></tr>
<tr><td>育休退園後同じ保育園への再入所</td><td>育休取得により退園し、育休明けに同じ保育園へ</td><td>+3</td></tr>
<tr><td>兄弟が入所している保育所への希望</td><td>兄弟が入所している保育所への入所希望</td><td>+1.5</td></tr>
<tr><td>転居による転園申請</td><td>転居のための転園申請</td><td>+1</td></tr>
</tbody>
</table>

<h3>減点項目</h3>
<table>
<thead><tr><th>項目</th><th>条件</th><th>調整点数</th></tr></thead>
<tbody>
<tr><td>居宅内自営業の専従者（協力者）</td><td>居宅内自営業を手伝っている場合</td><td>-1</td></tr>
<tr><td>同居の祖父母（60〜64歳）</td><td>保育の実施基準を満たさない60〜64歳の同居祖父母</td><td>-2</td></tr>
<tr><td>同居の祖父母（59歳以下）</td><td>保育の実施基準を満たさない59歳以下の同居祖父母</td><td>-5</td></tr>
<tr><td>保育料等の未納</td><td>未納期間3ヶ月以上</td><td>-5</td></tr>
</tbody>
</table>

<h3>同点の場合の優先順位</h3>
<ol>
<li>潟上市民である（転入予定者を除く）</li>
<li>当該保育所の希望順位が高いもの</li>
<li>社会的・経済的状況</li>
<li>保留期間の長いもの</li>
<li>3ヶ月以上の保育料の未納がないこと</li>
</ol>`,
    publishedAt: "2026-06-29",
  },
  {
    slug: "katagami-hokatsu-tips",
    citySlug: "katagami",
    title: "潟上市の保活対策｜入所点数を上げる方法と申込のポイント",
    description:
      "潟上市で保育所に入るためのポイントを解説。就労時間を増やして基本点数を最大化する方法、ひとり親+10点・保育士+10点など調整点数の活用方法を実践的に説明します。",
    image:
      "https://images.unsplash.com/photo-1540479859555-17af45c78602?w=800&h=400&fit=crop",
    category: "保活のコツ",
    categoryColor: "purple",
    content: `<h2>潟上市の保活で点数を上げるポイント</h2>

<h3>就労基本点数を最大化する</h3>
<p>潟上市の入所選考で最も重要なのが就労基本点数（最大10点）です。</p>
<ul>
<li>週5日以上・週35時間以上（月140時間以上）の就労で最高10点。フルタイム勤務が最も有利</li>
<li>週5日・週30時間以上（時短勤務）でも9点と高点数を維持できる</li>
<li>居宅内労働でも週4日以上・週28時間以上で8点確保可能</li>
<li>月64時間未満の就労は3点以下となるため注意が必要</li>
</ul>

<h3>調整点数の大きな加点を活用する</h3>
<ul>
<li><strong>ひとり親世帯（+10点）</strong>：該当する場合は必ず申告</li>
<li><strong>幼稚園教諭・保育士等（+10点）</strong>：資格を持つ保護者は加点対象</li>
<li><strong>地域型保育卒園（+5点）</strong>：小規模保育施設等を卒園した場合に加算</li>
<li><strong>育休退園後・同じ保育園への再入所（+3点）</strong>：育児休業取得のため退園した場合</li>
</ul>

<h3>減点を避けるために注意すること</h3>
<ul>
<li><strong>保育料の未納</strong>：3ヶ月以上の未納で-5点。必ず期限内に支払うこと</li>
<li><strong>59歳以下の同居祖父母</strong>：保育の実施基準を満たさない場合は-5点の大幅減点</li>
<li><strong>居宅内自営業の手伝い</strong>：専従者・協力者として従事している場合は-1点</li>
</ul>

<div class="info-box">
<p><strong>相談窓口</strong></p>
<p>潟上市役所 子育て支援課にお問い合わせください。申込前に窓口で点数の確認を行うことをお勧めします。</p>
</div>`,
    publishedAt: "2026-06-29",
  },
];

registerArticles(katagamiArticles);
