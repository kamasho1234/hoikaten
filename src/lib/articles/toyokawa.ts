import type { Article } from "./types";
import { registerArticles } from "./index";

const articles: Article[] = [
  // 1. 保活スケジュール完全ガイド
  {
    slug: "hokatsu-schedule",
    citySlug: "toyokawa",
    title: "豊川市の保活スケジュール完全ガイド｜申込時期と準備の流れ",
    description:
      "豊川市の保育園・認定こども園の入園申込スケジュールを時系列で解説。4月入園と途中入園の流れ、準備すべきことをまとめました。",
    category: "スケジュール",
    categoryColor: "green",
    image:
      "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=800&h=400&fit=crop",
    content: `<h2>豊川市の保活スケジュール</h2>
<p>豊川市の保育園・認定こども園への入園は「4月入園（年度当初入園）」と「途中入園」の2種類があります。4月入園は例年9〜10月頃に申込みが始まります。</p>

<h2>4月入園のスケジュール</h2>
<div class="step">
<p><strong>STEP1：8月〜9月</strong>　入園案内の配布・園見学</p>
<p><strong>STEP2：9月〜10月</strong>　1次申込受付（希望園または子ども健康部保育課へ提出）</p>
<p><strong>STEP3：12月頃</strong>　1次選考結果通知</p>
<p><strong>STEP4：1月〜2月</strong>　2次申込受付</p>
<p><strong>STEP5：2月〜3月</strong>　2次結果通知・面接</p>
<p><strong>STEP6：4月</strong>　入園</p>
</div>

<h2>途中入園について</h2>
<p>途中入園は毎月受け付けています。入園希望月の前月までに必要書類を子ども健康部保育課（豊川市役所）へ提出します。空き状況により入園できない場合もあるため、早めの申込みが大切です。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>豊川市には認可保育園が約30か所あり、園ごとに教育・保育方針や受入可能月齢が異なります。申込み前に希望する園を見学しておきましょう。</p>
</div>

<h2>準備すべき書類</h2>
<p>父母それぞれの保育事由証明書（就労証明書など）が必要です。雇用主に記入してもらうため、2〜3週間前には依頼しましょう。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>最新のスケジュールは<a href="https://www.city.toyokawa.lg.jp/kosodate/gakkohoikuichiran/hoikushoichiran.html" target="_blank" rel="noopener">豊川市 子ども健康部保育課のページ</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 55,
  },

  // 2. 点数の仕組みと計算方法
  {
    slug: "scoring-system",
    citySlug: "toyokawa",
    title: "豊川市の保育園点数の仕組みと計算方法｜基本指数・調整指数を解説",
    description:
      "豊川市の保育園入園選考で使われる点数（基本指数・調整指数）の仕組みを解説。父母合算方式の計算方法と各項目の点数をわかりやすくまとめました。",
    category: "点数・選考",
    categoryColor: "blue",
    image:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop",
    content: `<h2>豊川市の入園選考の仕組み</h2>
<p>豊川市では、保育施設の利用申込者数が受入可能数を超えた場合、「保育所入所基準指数表」に基づいて点数（指数）で入園調整を行います。豊川市は人口約18万人の東三河の中核都市で、豊川稲荷で有名なまちです。</p>

<h2>点数の構成</h2>
<p>世帯の合計指数は<strong>「基本指数（父母の状況）」＋「調整指数」</strong>で決まります。基本指数は父母それぞれに算出し、<strong>合算</strong>したものが世帯の基本指数になります。</p>

<h3>基本指数（父母各最大20点）</h3>
<table>
<tr><th>事由</th><th>内容</th><th>点数</th></tr>
<tr><td>就労</td><td>月20日以上・1日7.5時間以上</td><td>20</td></tr>
<tr><td>就労</td><td>月20日以上・1日6時間以上</td><td>18</td></tr>
<tr><td>就労</td><td>月20日以上・1日4時間以上</td><td>16</td></tr>
<tr><td>就労</td><td>月16日以上・1日7.5時間以上</td><td>17</td></tr>
<tr><td>就労</td><td>月16日以上・1日6時間以上</td><td>14</td></tr>
<tr><td>就労</td><td>月16日以上・1日4時間以上</td><td>13</td></tr>
<tr><td>就労</td><td>上記以外で月64時間以上</td><td>12</td></tr>
<tr><td>出産</td><td>出産予定（母のみ）</td><td>18</td></tr>
<tr><td>疾病</td><td>障がい者・特定疾患</td><td>20</td></tr>
<tr><td>災害</td><td>自宅の復旧</td><td>20</td></tr>
<tr><td>求職</td><td>求職活動中</td><td>9</td></tr>
</table>

<h3>調整指数の主な項目</h3>
<ul>
<li>ひとり親世帯：+22</li>
<li>小規模保育事業所等の卒園に伴う転園：+10</li>
<li>特別な支援を必要とする児童：+8</li>
<li>きょうだい同時に新規入園申込み：+7</li>
<li>1号→2号の認定変更：+6</li>
<li>保育料の滞納がある場合：-30</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>豊川市はフルタイム共働きの場合、父20点＋母20点＝基本指数40点が基準ラインです。調整指数の加点で差がつきやすいので、該当する項目がないか確認しましょう。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 60,
  },

  // 3. 就労証明書の書き方
  {
    slug: "employment-certificate",
    citySlug: "toyokawa",
    title: "豊川市の就労証明書の書き方と注意点｜保育園入園に必要な書類",
    description:
      "豊川市の保育園申込みに必要な就労証明書の書き方を解説。記入のポイントや提出時の注意事項、自営業の場合の対応もまとめました。",
    category: "書類準備",
    categoryColor: "amber",
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop",
    content: `<h2>就労証明書とは</h2>
<p>就労証明書は、保護者が仕事をしていることを証明する書類です。豊川市の保育園入園申込みでは、父母それぞれの保育事由証明書が必要で、就労が理由の場合は雇用主に記入してもらいます。</p>

<h2>記入のポイント</h2>
<h3>就労時間・日数の記載</h3>
<p>豊川市では、就労<strong>日数と1日の就労時間</strong>の組み合わせで点数が決まります。月20日以上か月16日以上か、そして1日7.5時間以上・6時間以上・4時間以上かで点数が異なります。</p>

<div class="point-box">
<p><strong>就労パターンと点数</strong></p>
<ul>
<li>月20日以上・1日7.5時間以上 → 20点（最高点）</li>
<li>月20日以上・1日6時間以上 → 18点</li>
<li>月16日以上・1日7.5時間以上 → 17点</li>
<li>月16日以上・1日6時間以上 → 14点</li>
<li>月64時間以上（上記以外） → 12点</li>
</ul>
</div>

<h2>自営業の場合</h2>
<p>自営業の場合は営業者本人と協力者で点数が異なります。営業者本人で月20日以上・1日7.5時間以上なら20点ですが、協力者の場合は同条件でも14点です。内職はさらに点数が下がります。</p>

<h2>提出先と提出方法</h2>
<p>必要書類は子ども健康部保育課（豊川市役所）へ提出します。4月入園の場合は申込期間中に提出が必要です。</p>

<div class="info-box">
<p><strong>提出のタイミング</strong></p>
<p>雇用主への依頼は2〜3週間前に行いましょう。書類の不備がある場合、保育の必要性の指数判断ができず、就業形態の最低点から減点で取り扱われることがあります。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 45,
  },

  // 4. 認可保育園と認定こども園の違い
  {
    slug: "ninka-vs-kodomoen",
    citySlug: "toyokawa",
    title: "豊川市の認可保育園と認定こども園の違い｜選び方のポイント",
    description:
      "豊川市の認可保育園と認定こども園（保育部分）の違いを比較。施設の特徴や選考方法の違いも解説します。",
    category: "園選び",
    categoryColor: "purple",
    image:
      "https://images.unsplash.com/photo-1587654780292-39c6702e5902?w=800&h=400&fit=crop",
    content: `<h2>豊川市の保育施設の種類</h2>
<p>豊川市には認可保育園、認定こども園、小規模保育事業所など、さまざまな保育施設があります。約30か所の認可保育園があり、利用調整（点数による選考）の対象となるのは2号・3号認定を受けた場合です。</p>

<h2>認可保育園の特徴</h2>
<ul>
<li>0歳児〜5歳児が対象（受入可能月齢は園による）</li>
<li>保育を必要とする家庭の子どもが利用</li>
<li>保育時間は保育標準時間と保育短時間の2区分</li>
</ul>

<h2>認定こども園の特徴</h2>
<ul>
<li>教育と保育を一体的に提供する施設</li>
<li>1号認定（教育）と2号・3号認定（保育）の両方が利用可能</li>
<li>豊川市内にも認定こども園があり、幼稚園的な機能と保育園的な機能を併せ持つ</li>
</ul>

<h2>小規模保育事業所の特徴</h2>
<ul>
<li>0〜2歳児を対象とした少人数の保育施設</li>
<li>3歳児クラスからは認可保育園や認定こども園への転園が必要</li>
<li>転園時に調整指数+10の加点がある</li>
</ul>

<div class="point-box">
<p><strong>園選びのポイント</strong></p>
<ul>
<li>受入可能月齢は園によって異なるため確認が必要</li>
<li>申し込む園は事前に見学することが推奨されている</li>
<li>教育・保育方針、開所時間、実費負担の費用も園によって異なる</li>
<li>豊川市は東三河エリアのため、通勤先が豊橋方面の場合は立地も重要</li>
</ul>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 40,
  },

  // 5. 育児休業からの復職と入園
  {
    slug: "ikukyuu-fukushoku",
    citySlug: "toyokawa",
    title: "豊川市で育休明けに保育園に入るには？復職タイミングと点数の関係",
    description:
      "豊川市の保育園入園における育児休業からの復職の扱いを解説。育休中の基本指数や復職後の点数の考え方を詳しくまとめました。",
    category: "点数・選考",
    categoryColor: "blue",
    image:
      "https://images.unsplash.com/photo-1531983412531-1f49a365ffed?w=800&h=400&fit=crop",
    content: `<h2>育児休業中の基本指数</h2>
<p>豊川市では、育児休業法に基づく育児休業の場合（最年少児が1歳に達するまで）、基本指数は<strong>4点</strong>です。これは求職中の9点よりも低い点数となっています。</p>

<h2>復職後の点数</h2>
<p>入園が決まり復職した後は、復帰後の就労時間・日数で基本指数が算出されます。フルタイム（月20日以上・1日7.5時間以上）で復帰すれば20点になります。</p>

<div class="point-box">
<p><strong>育休明け入園のポイント</strong></p>
<ul>
<li>育児休業中の基本指数は4点と低いため、調整指数の加点が重要</li>
<li>ひとり親世帯（+22）やきょうだい加点が大きな差を生む</li>
<li>4月入園の1次申込みを狙うことで入園しやすくなる</li>
</ul>
</div>

<h2>育児短時間勤務の場合</h2>
<p>復帰後に育児短時間勤務を取得する場合は、実際の勤務時間・日数で基本指数が算出されます。短時間勤務の内容によって点数が変わるため、雇用主に正確に就労証明書を記入してもらいましょう。</p>

<div class="info-box">
<p><strong>注意</strong></p>
<p>選考時と入園後で状況が変わった場合、入園の取り消しになることがあります。復職時期や勤務条件はしっかり確認しておきましょう。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 50,
  },

  // 6. ひとり親世帯の加点
  {
    slug: "single-parent",
    citySlug: "toyokawa",
    title: "豊川市のひとり親世帯の保育園入園｜調整指数+22の大きな加点",
    description:
      "豊川市の保育園入園でひとり親世帯に適用される調整指数+22の加点を解説。基本指数との合算や同点時の優先順位もまとめました。",
    category: "点数・選考",
    categoryColor: "blue",
    image:
      "https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=800&h=400&fit=crop",
    content: `<h2>ひとり親世帯の調整指数</h2>
<p>豊川市では、ひとり親世帯の場合、調整指数として<strong>+22</strong>が加算されます。これは調整指数の中で最も大きな加点です。</p>

<h2>ひとり親世帯の点数例</h2>
<div class="point-box">
<p><strong>フルタイム就労のひとり親世帯の場合</strong></p>
<ul>
<li>就労中の保護者の基本指数：20点（月20日以上・1日7.5時間以上）</li>
<li>もう一方の保護者の基本指数：0点（不在）</li>
<li>調整指数（ひとり親）：+22</li>
<li>合計：42点</li>
</ul>
<p>共働き世帯のフルタイム合計が40点のため、ひとり親世帯はそれを上回る点数になります。</p>
</div>

<h2>同点時の優先順位</h2>
<p>指数が同点の場合は、優先順位に従って判断されます。ひとり親世帯は優先的に扱われることが多く、入園の可能性が高まります。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳しくは<a href="https://www.city.toyokawa.lg.jp/kosodate/gakkohoikuichiran/hoikushoichiran.html" target="_blank" rel="noopener">豊川市 子ども健康部保育課のページ</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 40,
  },

  // 7. きょうだい加点
  {
    slug: "sibling-bonus",
    citySlug: "toyokawa",
    title: "豊川市の保育園きょうだい加点を徹底解説｜在園きょうだい・同時申込み",
    description:
      "豊川市の保育園入園できょうだいがいる場合の調整指数を解説。在園きょうだいの優先枠と同時申込み+7のポイントをまとめました。",
    category: "点数・選考",
    categoryColor: "blue",
    image:
      "https://images.unsplash.com/photo-1491013516836-7db643ee125a?w=800&h=400&fit=crop",
    content: `<h2>きょうだいに関する調整指数・優先枠</h2>
<p>豊川市では、きょうだいの状況に応じた調整指数や優先枠があります。</p>

<h3>在園きょうだいがいる場合（優先）</h3>
<p>すでにきょうだいが保育施設に在園している場合、調整指数の加点ではなく<strong>同点時の優先枠</strong>として扱われます。</p>

<h3>きょうだい同時に新規入園申込み（+7）</h3>
<p>きょうだいが同時に新規入園を申し込む場合は、調整指数として<strong>+7</strong>が加算されます。</p>

<h3>きょうだいが2組以上の同時申込み（+2）</h3>
<p>きょうだいが2組以上（3人以上）同時に申込みする場合は、さらに<strong>+2</strong>の調整指数が加算されます。</p>

<div class="point-box">
<p><strong>加点の組み合わせ例</strong></p>
<p>双子（2人）が同時に新規申込みする場合：</p>
<ul>
<li>きょうだい同時新規入園：+7</li>
<li>合計調整指数：+7</li>
</ul>
<p>3人きょうだい（3人）同時に新規申込みする場合：</p>
<ul>
<li>きょうだい同時新規入園：+7</li>
<li>2組以上同時申込み：+2</li>
<li>合計調整指数：+9</li>
</ul>
</div>

<div class="info-box">
<p><strong>注意</strong></p>
<p>在園きょうだいの「優先」は加点ではなく同点時の扱いのため、基本指数が低い場合は別の対策も検討しましょう。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 45,
  },

  // 8. 小規模保育からの転園
  {
    slug: "small-nursery-transfer",
    citySlug: "toyokawa",
    title: "豊川市の小規模保育卒園から認可園へ｜+10加点の仕組みと注意点",
    description:
      "豊川市の小規模保育事業所を卒園して認可保育園に転園する場合の調整指数+10の加点について詳しく解説します。",
    category: "園選び",
    categoryColor: "purple",
    image:
      "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&h=400&fit=crop",
    content: `<h2>小規模保育事業所とは</h2>
<p>小規模保育事業所は0〜2歳児を対象とした保育施設です。豊川市では「0〜2歳児のみ保育する園（小規模・新制度）」として位置づけられています。</p>

<h2>卒園時の調整指数+10</h2>
<p>0〜2歳児のみ保育する園の卒園に伴い転園する場合、調整指数として<strong>+10</strong>が加算されます。これは調整指数の中でもひとり親の+22、医療的ケア児の+20に次ぐ大きな加点です。</p>

<h3>加点の大きさを比較</h3>
<table>
<tr><th>調整項目</th><th>指数</th></tr>
<tr><td>ひとり親世帯</td><td>+22</td></tr>
<tr><td>医療的ケア児</td><td>+20</td></tr>
<tr><td><strong>小規模保育卒園に伴う転園</strong></td><td><strong>+10</strong></td></tr>
<tr><td>特別な支援を必要とする児童</td><td>+8</td></tr>
<tr><td>きょうだい同時新規入園</td><td>+7</td></tr>
</table>

<div class="point-box">
<p><strong>戦略的な活用</strong></p>
<p>0〜2歳児で入園競争が激しい認可園を避け、小規模保育事業所に入園し、3歳児クラスで+10の加点を活かして希望の認可園に転園する方法が有効です。ただし、2歳児クラスの児童が翌年度4月入園の途中で申し込む場合に限られます。</p>
</div>

<h2>注意点</h2>
<ul>
<li>卒園に伴う転園が対象で、途中退園の場合は適用されない可能性があります</li>
<li>内定後に自己都合で辞退すると翌年度以降-10の減点があります</li>
<li>希望園はすべて見学する必要があります</li>
</ul>`,
    publishedAt: "2026-04-07",
    popularity: 38,
  },

  // 9. 自営業・内職の点数
  {
    slug: "self-employed-scoring",
    citySlug: "toyokawa",
    title: "豊川市の保育園入園｜自営業・内職の点数は？会社勤めとの違いを解説",
    description:
      "豊川市の保育園入園で自営業や内職の場合の基本指数を解説。営業者本人・協力者・内職それぞれの点数の違いをまとめました。",
    category: "点数・選考",
    categoryColor: "blue",
    image:
      "https://images.unsplash.com/photo-1556740758-90de374c12ad?w=800&h=400&fit=crop",
    content: `<h2>自営業・内職の基本指数</h2>
<p>豊川市では、会社勤めだけでなく自営業や内職でも保育園に入園できます。ただし、同じ就労時間でも<strong>立場によって点数が異なる</strong>ため注意が必要です。</p>

<h2>営業者本人の場合</h2>
<table>
<tr><th>就労日数・時間</th><th>点数</th></tr>
<tr><td>月20日以上・1日7.5時間以上</td><td>20</td></tr>
<tr><td>月16日以上・1日4時間以上</td><td>15</td></tr>
<tr><td>上記以外で月64時間以上</td><td>11</td></tr>
</table>

<h2>協力者の場合</h2>
<table>
<tr><th>就労日数・時間</th><th>点数</th></tr>
<tr><td>月20日以上・1日7.5時間以上</td><td>14</td></tr>
<tr><td>月16日以上・1日4時間以上</td><td>12</td></tr>
<tr><td>上記以外で月64時間以上</td><td>11</td></tr>
</table>

<h2>内職の場合</h2>
<p>内職は自営業よりもさらに点数が低くなります。</p>
<table>
<tr><th>就労日数・時間</th><th>点数</th></tr>
<tr><td>営業者本人・月20日以上・1日7.5時間以上</td><td>19</td></tr>
<tr><td>営業者本人・月16日以上・1日4時間以上</td><td>15</td></tr>
<tr><td>協力者・月20日以上・1日7.5時間以上</td><td>13</td></tr>
<tr><td>協力者・月16日以上・1日4時間以上</td><td>11</td></tr>
<tr><td>上記以外で月64時間以上</td><td>10</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>会社勤め（月20日・7.5時間）は20点ですが、自営業の協力者だと同じ時間でも14点、内職の協力者だと13点と大きな差があります。自営業の方は営業者本人であることを証明書に正確に記載してもらいましょう。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 35,
  },

  // 10. 保育料の目安
  {
    slug: "hoikuryou-guide",
    citySlug: "toyokawa",
    title: "豊川市の保育料はいくら？世帯年収別の目安と無償化の対象",
    description:
      "豊川市の認可保育園の保育料を世帯年収別に紹介。3〜5歳児の無償化や第2子以降の減額、保育標準時間と短時間の違いも解説します。",
    category: "費用",
    categoryColor: "teal",
    image:
      "https://images.unsplash.com/photo-1554224155-8d04cb21cd6e?w=800&h=400&fit=crop",
    content: `<h2>保育料の仕組み</h2>
<p>豊川市の認可保育園の保育料は、世帯の市民税所得割額（父母の合算）に基づいて決まります。階層区分ごとに金額が設定されています。</p>

<h2>3〜5歳児は無償化</h2>
<p>2019年10月からの幼児教育・保育の無償化により、3〜5歳児クラスの保育料は無料です。ただし、給食費（副食費）は実費負担となります。</p>

<h2>0〜2歳児の保育料</h2>
<p>0〜2歳児クラスは世帯の所得に応じた保育料がかかります。保育標準時間と保育短時間で金額が異なります。</p>

<div class="point-box">
<p><strong>保育料の軽減</strong></p>
<ul>
<li>住民税非課税世帯の0〜2歳児は無償</li>
<li>きょうだいで同時に保育施設を利用する場合、第2子は半額、第3子以降は無料</li>
<li>ひとり親世帯・障がい者世帯等は軽減措置あり</li>
</ul>
</div>

<h2>保育料以外にかかる費用</h2>
<ul>
<li>給食費（3〜5歳児の副食費）</li>
<li>延長保育料</li>
<li>教材費・行事費等（園による）</li>
</ul>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>保育料の詳細は<a href="https://www.city.toyokawa.lg.jp/kosodate/gakkohoikuichiran/hoikushoichiran.html" target="_blank" rel="noopener">豊川市 子ども健康部保育課のページ</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 50,
  },
];

registerArticles(articles);
