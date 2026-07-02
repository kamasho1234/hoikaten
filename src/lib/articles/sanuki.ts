import type { Article } from "./types";
import { registerArticles } from "./index";

const sanukiArticles: Article[] = [
  {
    slug: "sanuki-guide",
    citySlug: "sanuki",
    title: "さぬき市の保育施設入所点数（利用調整基準）完全ガイド｜就労区分・調整指数を解説",
    description:
      "香川県さぬき市の保育施設利用調整は、父または母のうち保育が必要な度合いが高い方の基準点数を採用する方式。居宅外就労（代表者）最大10点、調整指数ひとり親+10点など詳細を解説します。",
    image:
      "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>さぬき市の保育施設利用調整制度</h2>
<p>香川県さぬき市の保育施設利用調整は、保護者の保育が必要な事由と就労状況に応じた<span class="highlight">基準点数（最大10点）</span>と、世帯状況による<span class="highlight">調整点数</span>の合計で優先順位を決定します。</p>

<h3>さぬき市の利用調整の特徴</h3>
<p>さぬき市では父または母について<strong>複数の事由に該当する場合、最も点数が高い事由のみ</strong>を採用します。また、父・母のうち<strong>保育が必要な度合いが高い方の点数</strong>を基準点数として採用します。</p>

<h3>利用調整の基本的な流れ</h3>
<ul>
<li>父または母（保育が必要な度合いが高い方）の事由・就労状況で基準点数を算定</li>
<li>複数事由に該当する場合は最も高い点数を採用（上限10点）</li>
<li>調整点数（加点・減点）を加算</li>
<li>合計点数が高い世帯から順に内定</li>
</ul>

<h3>基準点数の区分一覧</h3>
<table>
<thead><tr><th>事由の区分</th><th>最高点</th></tr></thead>
<tbody>
<tr><td>区分1：居宅外就労・自営業（居宅外）代表者</td><td>10点</td></tr>
<tr><td>区分2：居宅外就労・自営業（居宅外）代表者以外</td><td>9点</td></tr>
<tr><td>区分3：居宅内自営業</td><td>8点</td></tr>
<tr><td>区分3：内職</td><td>5点</td></tr>
<tr><td>虐待・DV</td><td>10点</td></tr>
<tr><td>傷病（入院）</td><td>10点</td></tr>
<tr><td>障害（最重度）</td><td>10点</td></tr>
<tr><td>就学・技能習得</td><td>8点</td></tr>
<tr><td>介護・看護（区分2と同基準）</td><td>9点</td></tr>
<tr><td>妊娠・出産</td><td>5点</td></tr>
<tr><td>求職活動</td><td>2点</td></tr>
</tbody>
</table>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳細は<a href="https://www.city.sanuki.lg.jp/section/reiki_int/reiki_honbun/o111RG00001187.html" target="_blank" rel="noopener">さぬき市保育施設等の利用調整に関する要綱</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-06-29",
  },
  {
    slug: "sanuki-employment",
    citySlug: "sanuki",
    title: "さぬき市の保育所点数｜就労（区分1〜3・内職）の基準点数一覧",
    description:
      "さぬき市の就労による基準点数を解説します。区分1（居宅外就労・代表者）は月20日以上・8時間以上で最大10点。区分2（代表者以外）最大9点、区分3（居宅内自営）最大8点、内職最大5点。",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=400&fit=crop",
    category: "就労",
    categoryColor: "blue",
    content: `<h2>さぬき市の就労基準点数</h2>
<p>さぬき市の就労による基準点数は<strong>就労の区分</strong>と<strong>月の勤務日数・1日の労働時間</strong>の組み合わせで決まります。最低月48時間（週3日換算）の就労が必要です。</p>

<h3>区分1：居宅外就労・自営業（居宅外）代表者</h3>
<table>
<thead><tr><th>勤務条件</th><th>基準点数</th></tr></thead>
<tbody>
<tr><td>月20日以上・1日8時間以上</td><td>10点</td></tr>
<tr><td>月20日以上・1日6時間以上 または 月16日以上・1日8時間以上</td><td>9点</td></tr>
<tr><td>月20日以上・1日4時間以上 または 月16日以上・1日6時間以上 または 月12日以上・1日8時間以上</td><td>8点</td></tr>
<tr><td>月16日以上・1日4時間以上 または 月12日以上・1日6時間以上</td><td>7点</td></tr>
<tr><td>月12日以上・1日4時間以上 または 月64時間以上</td><td>6点</td></tr>
</tbody>
</table>

<h3>区分2：自営業（居宅外）代表者以外</h3>
<table>
<thead><tr><th>勤務条件</th><th>基準点数</th></tr></thead>
<tbody>
<tr><td>月20日以上・1日8時間以上</td><td>9点</td></tr>
<tr><td>月20日以上・1日6時間以上 または 月16日以上・1日8時間以上</td><td>8点</td></tr>
<tr><td>月20日以上・1日4時間以上 または 月16日以上・1日6時間以上 または 月12日以上・1日8時間以上</td><td>7点</td></tr>
<tr><td>月16日以上・1日4時間以上 または 月12日以上・1日6時間以上</td><td>6点</td></tr>
<tr><td>月12日以上・1日4時間以上 または 月64時間以上</td><td>5点</td></tr>
</tbody>
</table>

<h3>区分3：居宅内自営業</h3>
<table>
<thead><tr><th>勤務条件</th><th>基準点数</th></tr></thead>
<tbody>
<tr><td>月20日以上・1日8時間以上</td><td>8点</td></tr>
<tr><td>月20日以上・1日6時間以上 または 月16日以上・1日8時間以上</td><td>7点</td></tr>
<tr><td>月20日以上・1日4時間以上 または 月16日以上・1日6時間以上 または 月12日以上・1日8時間以上</td><td>6点</td></tr>
<tr><td>月16日以上・1日4時間以上 または 月12日以上・1日6時間以上</td><td>5点</td></tr>
<tr><td>月12日以上・1日4時間以上 または 月64時間以上</td><td>4点</td></tr>
</tbody>
</table>

<h3>内職（区分3）</h3>
<table>
<thead><tr><th>勤務条件</th><th>基準点数</th></tr></thead>
<tbody>
<tr><td>週4日以上・1日4時間以上</td><td>5点</td></tr>
<tr><td>週4日未満・1日4時間以上</td><td>4点</td></tr>
<tr><td>月64時間以上</td><td>3点</td></tr>
</tbody>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>区分1（居宅外就労・代表者）がフルタイムの場合、最高10点が取得できます。同じ勤務時間でも区分により1〜2点の差があります。なお自営業の場合、代表者（経営者）かどうかで区分が異なります。</p>
</div>`,
    publishedAt: "2026-06-29",
  },
  {
    slug: "sanuki-other-reasons",
    citySlug: "sanuki",
    title: "さぬき市の保育所点数｜疾病・障害・出産・介護・就学等の基準点数一覧",
    description:
      "さぬき市の就労以外の保育必要理由（傷病・障害・出産・介護・就学・虐待DV等）の基準点数を解説します。入院・最重度障害・虐待DVは10点、就学8点、妊娠出産5点、求職2点。",
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=400&fit=crop",
    category: "疾病・障害・その他",
    categoryColor: "rose",
    content: `<h2>さぬき市の就労以外の基準点数</h2>

<h3>傷病による基準点数</h3>
<table>
<thead><tr><th>状況</th><th>基準点数</th></tr></thead>
<tbody>
<tr><td>1ヶ月以上入院または入院見込み</td><td>10点</td></tr>
<tr><td>自宅療養（1ヶ月以上安静が必要な状態）</td><td>8点</td></tr>
<tr><td>週3日程度の通院加療</td><td>4点</td></tr>
</tbody>
</table>

<h3>障害による基準点数</h3>
<table>
<thead><tr><th>状況</th><th>基準点数</th></tr></thead>
<tbody>
<tr><td>最重度（身体障害1〜2級・精神障害1級・療育手帳A等）</td><td>10点</td></tr>
<tr><td>中度（身体障害3級・精神障害2〜3級・療育手帳B等）</td><td>6点</td></tr>
<tr><td>軽度（身体障害4〜6級等）</td><td>3点</td></tr>
</tbody>
</table>

<h3>介護・看護による基準点数（区分2と同基準）</h3>
<table>
<thead><tr><th>状況</th><th>基準点数</th></tr></thead>
<tbody>
<tr><td>月20日以上・1日8時間以上</td><td>9点</td></tr>
<tr><td>月20日以上・1日6時間以上 または 月16日以上・1日8時間以上</td><td>8点</td></tr>
<tr><td>月20日以上・1日4時間以上 または 月16日以上・1日6時間以上 または 月12日以上・1日8時間以上</td><td>7点</td></tr>
<tr><td>月16日以上・1日4時間以上 または 月12日以上・1日6時間以上</td><td>6点</td></tr>
<tr><td>月12日以上・1日4時間以上 または 月64時間以上</td><td>5点</td></tr>
</tbody>
</table>

<h3>その他の基準点数</h3>
<table>
<thead><tr><th>事由</th><th>基準点数</th></tr></thead>
<tbody>
<tr><td>虐待・DV（危険性がある場合）</td><td>10点</td></tr>
<tr><td>就学・技能習得</td><td>8点</td></tr>
<tr><td>妊娠・出産</td><td>5点</td></tr>
<tr><td>求職活動</td><td>2点</td></tr>
</tbody>
</table>

<div class="point-box">
<p><strong>複数事由の取り扱い</strong></p>
<p>さぬき市では複数の事由に同時に該当する場合、<strong>最も高い点数になる事由のみ</strong>を採用します（合算はされません）。事由の組み合わせによって点数が変わる場合があるため、該当するすべての事由を窓口でご確認ください。</p>
</div>`,
    publishedAt: "2026-06-29",
  },
  {
    slug: "sanuki-adjustment",
    citySlug: "sanuki",
    title: "さぬき市の保育所点数｜調整点数（加点・減点）一覧",
    description:
      "さぬき市の保育利用調整における調整点数を解説します。ひとり親+10点・1号→2号転籍+10点・家庭的保育卒園+8点・保育士就労+8点・兄弟同一施設+6点、保育料未納-5点など。",
    image:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop",
    category: "調整指数",
    categoryColor: "amber",
    content: `<h2>さぬき市の調整点数（加点・減点）一覧</h2>

<h3>加点項目</h3>
<table>
<thead><tr><th>状況</th><th>加点</th></tr></thead>
<tbody>
<tr><td>ひとり親家庭</td><td>+10点</td></tr>
<tr><td>同一認定こども園内で1号認定から2号認定へ転籍希望</td><td>+10点</td></tr>
<tr><td>家庭的保育事業等を修了（卒園）後の入所希望</td><td>+8点</td></tr>
<tr><td>保育士資格を有し、市内保育施設に就労</td><td>+8点</td></tr>
<tr><td>兄弟姉妹が在籍している施設への同一施設入所希望</td><td>+6点</td></tr>
<tr><td>産休・育休終了後に就労復帰予定</td><td>+2点</td></tr>
<tr><td>生活保護世帯</td><td>+2点</td></tr>
<tr><td>入所希望児童が障害児保育の対象</td><td>+2点</td></tr>
<tr><td>多胎児（双子・三つ子等）を同時に申込</td><td>+1点</td></tr>
</tbody>
</table>

<h3>減点項目</h3>
<table>
<thead><tr><th>状況</th><th>減点</th></tr></thead>
<tbody>
<tr><td>保育料等の未納があり、市と相談・約束をしていない</td><td>-5点</td></tr>
<tr><td>65歳未満の同居祖父母等が保育の必要な事由に非該当（または求職活動のみ）</td><td>-4点</td></tr>
</tbody>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>さぬき市のひとり親加算は+10点と非常に大きく、基準点数に関わらず利用調整において大きく有利になります。また保育士として市内施設に就労している場合も+8点の大きな加算があります。</p>
</div>

<div class="info-box">
<p><strong>祖父母減点に注意</strong></p>
<p>65歳未満の同居祖父母等が就労・傷病・障害等の事由に該当しない場合、-4点が減算されます。祖父母が就労中であれば対象外ですが、専業主婦（夫）の場合は減点の対象となります。</p>
</div>`,
    publishedAt: "2026-06-29",
  },
  {
    slug: "sanuki-hokatsu-tips",
    citySlug: "sanuki",
    title: "さぬき市の保活で点数を上げるコツ｜就労区分の選び方と調整点数の活用",
    description:
      "さぬき市の保育所入所を有利にするポイントを解説します。居宅外就労（代表者）で最大10点、ひとり親加算+10点、兄弟同一施設+6点など主要な加算の活用法を紹介します。",
    image:
      "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?w=800&h=400&fit=crop",
    category: "保活のコツ",
    categoryColor: "green",
    content: `<h2>さぬき市の保活で点数を上げるコツ</h2>

<h3>1. 就労区分を正しく把握する</h3>
<p>さぬき市の就労は<strong>区分1（居宅外・代表者）・区分2（居宅外・代表者以外）・区分3（居宅内自営）・内職</strong>の4種類に分かれます。同じ勤務時間でも区分によって最大2点の差が生じます。自営業の場合は代表者（経営者）に該当するかどうかを確認しましょう。</p>

<h3>2. フルタイム就労で最高10点を目指す</h3>
<p>区分1（居宅外・代表者）で月20日以上・1日8時間以上の就労であれば10点が取得できます。月の勤務日数と1日の労働時間の組み合わせで点数が細かく設定されているため、実際の勤務状況を正確に申告することが重要です。</p>

<h3>3. ひとり親加算+10点を確認する</h3>
<p>ひとり親家庭の場合、調整点数で+10点という大きな加算があります。基準点数と合わせると最大20点になるため、利用調整において非常に有利な立場になります。</p>

<h3>4. 兄弟姉妹が在籍している施設を優先する</h3>
<p>すでに兄弟姉妹が入所している施設への同一施設申込は+6点の加算になります。きょうだいがいる場合は同一施設への入所を第一希望にすることを検討しましょう。</p>

<h3>5. 保育料の未納に注意する</h3>
<p>保育料等の未納がある場合は-5点という大きな減点になります。未納がある場合は市と相談して支払い計画を立てることで減点を回避できる場合があります。</p>

<h3>6. 同居祖父母の就労状況を確認する</h3>
<p>65歳未満の同居祖父母が就労していない場合、-4点の減点対象となります。祖父母が就労中であれば問題ありませんが、専業主婦（夫）の場合は減点を考慮した上で点数を計算しましょう。</p>

<div class="info-box">
<p><strong>申込・相談窓口</strong></p>
<p>詳細はさぬき市の子育て・保育担当窓口にお問い合わせください。詳細は<a href="https://www.city.sanuki.lg.jp/section/reiki_int/reiki_honbun/o111RG00001187.html" target="_blank" rel="noopener">さぬき市保育施設等の利用調整に関する要綱</a>をご参照ください。</p>
</div>`,
    publishedAt: "2026-06-29",
  },
];

registerArticles(sanukiArticles);
