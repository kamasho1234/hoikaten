import type { Article } from "./types";
import { registerArticles } from "./index";

const articles: Article[] = [
  {
    slug: "hokatsu-schedule",
    citySlug: "koganei",
    title: "小金井市の保活スケジュール　申込から内定までの流れ",
    description:
      "小金井市の認可保育園の申込時期・選考の流れをまとめました。令和8年度4月入園の動き方を解説します。",
    image: "https://images.unsplash.com/photo-1484820540004-14229fe36ca4?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>小金井市の4月入園スケジュール</h2>
<p>小金井市の認可保育園は毎年11月ごろに翌年度4月入園の一次募集を受付けます。小金井市子ども家庭部保育課が窓口です。</p>

<h3>保活の全体スケジュール</h3>
<div class="step">
<div class="step-num">1</div>
<div class="step-content">
<strong>4月〜6月：情報収集</strong>
<p>小金井市公式サイトで保育園の一覧や前年度の入園案内を確認します。小金井市には認可保育園が約20か所あります。</p>
</div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content">
<strong>6月〜9月：保育園見学</strong>
<p>気になる園に連絡して見学を予約しましょう。小金井公園や武蔵小金井駅周辺に園が集中しています。</p>
</div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content">
<strong>10月〜11月：入園案内入手・書類準備</strong>
<p>最新の入園案内を入手し、就労証明書などの必要書類を準備します。</p>
</div>
</div>
<div class="step">
<div class="step-num">4</div>
<div class="step-content">
<strong>11月：申込書類の提出</strong>
<p>小金井市子ども家庭部保育課へ提出します。郵送・窓口のいずれかで受付けます。</p>
</div>
</div>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>小金井市は基本指数が父母各最大20点（合計40点満点）です。月あたりの就労日数と1日の就労時間で判定されます。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳しくは<a href="https://www.city.koganei.lg.jp/kosodatekyoiku/hoikuen/" target="_blank" rel="noopener">小金井市公式サイト 保育園入園案内</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 60,
  },
  {
    slug: "scoring-system-guide",
    citySlug: "koganei",
    title: "小金井市の入園点数のしくみ　基本指数と調整指数を解説",
    description:
      "小金井市の保育園入園選考で使われる基本指数と調整指数のしくみを解説します。",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>小金井市の選考指数とは</h2>
<p>小金井市の認可保育園の入園選考は「基本指数＋調整指数」の合計で行われます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>選考指数 = 基本指数（保護者1 + 保護者2）+ 調整指数</p>
</div>

<h2>基本指数（父母各最大20点、合計40点）</h2>
<p>就労の場合、月20日以上かつ1日8時間以上の就労で満点の<span class="highlight">20点</span>になります。月あたりの就労日数と1日の就労時間の組み合わせで判定するのが小金井市の特徴です。</p>

<table>
<tr><th>就労状況</th><th>指数</th></tr>
<tr><td>月20日以上かつ1日8時間以上</td><td>20</td></tr>
<tr><td>月20日以上かつ1日6時間以上</td><td>18</td></tr>
<tr><td>月16日以上かつ1日6時間以上</td><td>16</td></tr>
<tr><td>月16日以上かつ1日4時間以上</td><td>14</td></tr>
<tr><td>月12日以上かつ1日4時間以上</td><td>12</td></tr>
<tr><td>月64時間以上</td><td>10</td></tr>
</table>

<h2>調整指数の代表例</h2>
<ul>
<li>ひとり親世帯：<span class="highlight">+5点</span></li>
<li>きょうだい在園中：<span class="highlight">+3点</span></li>
<li>認可外保育施設利用：<span class="highlight">+3点</span></li>
<li>生活保護世帯：<span class="highlight">+3点</span></li>
<li>同時申込（双子など）：<span class="highlight">+2点</span></li>
<li>育児休業から復帰予定：<span class="highlight">+2点</span></li>
</ul>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>全項目は<a href="https://www.city.koganei.lg.jp/kosodatekyoiku/hoikuen/" target="_blank" rel="noopener">小金井市公式サイト 保育園入園案内</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 55,
  },
  {
    slug: "score-up-tips",
    citySlug: "koganei",
    title: "小金井市で入園点数を上げるコツ　加点を最大化する方法",
    description:
      "小金井市の保育園入園選考で調整指数の加点を最大限に活用する方法を解説します。",
    image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>基本指数40点は出発点</h2>
<p>小金井市ではフルタイム共働き世帯は基本指数<span class="highlight">40点</span>で横並びです。差がつくのは調整指数の部分です。</p>

<h2>加点チェックリスト</h2>
<table>
<tr><th>項目</th><th>点数</th><th>条件</th></tr>
<tr><td>ひとり親</td><td>+5</td><td>ひとり親世帯であること</td></tr>
<tr><td>きょうだい在園</td><td>+3</td><td>きょうだいが認可保育園に在園中</td></tr>
<tr><td>認可外利用</td><td>+3</td><td>認可外保育施設に月ぎめで預けている</td></tr>
<tr><td>生活保護</td><td>+3</td><td>生活保護を受給している</td></tr>
<tr><td>同時申込</td><td>+2</td><td>きょうだいと同時に申し込む（双子など）</td></tr>
<tr><td>育休復帰</td><td>+2</td><td>育児休業を取得し入園月に復帰する</td></tr>
</table>

<h2>認可外保育施設の活用</h2>
<p>認可外保育施設に月ぎめで預けていると+3点の加点が得られます。認証保育所やベビーシッターの月ぎめ利用も対象になる場合があります。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>小金井市は就労日数と就労時間の組み合わせで点数が決まります。月20日以上勤務でも1日6時間未満だと18点にとどまります。可能であれば1日8時間以上にすることで2点アップできます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 50,
  },
  {
    slug: "tiebreaker-rules",
    citySlug: "koganei",
    title: "小金井市の同点時の優先順位　点数が同じ場合どうなる？",
    description:
      "小金井市の保育園入園選考で指数が同点になった場合の優先順位のルールを解説します。",
    image: "https://images.unsplash.com/photo-1590650153855-d9e808231d41?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>同点時の優先順位</h2>
<p>小金井市では選考指数が同点になった場合、以下の優先順位で入園が決まります。</p>

<h3>主な優先要素</h3>
<ul>
<li>小金井市在住者が優先</li>
<li>保育の必要性が高い世帯（ひとり親など）</li>
<li>きょうだいの在園状況</li>
<li>所得が低い世帯</li>
<li>希望園の順位が高い方</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>小金井市では同点の場合に所得階層が考慮されます。世帯年収が高い場合は特に加点を確実に取ることが重要です。</p>
</div>

<h2>希望園数は多めに</h2>
<p>小金井市では希望園を多く書いても不利にはなりません。通える範囲の園はすべて記入しましょう。</p>`,
    publishedAt: "2026-04-07",
    popularity: 40,
  },
  {
    slug: "part-time-work-score",
    citySlug: "koganei",
    title: "小金井市のパート・時短勤務の点数　何時間で何点？",
    description:
      "小金井市の保育園入園で、パートや時短勤務の場合にもらえる基本指数を解説します。",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>パート・時短勤務の基本指数</h2>
<p>小金井市では月あたりの就労日数と1日の就労時間の組み合わせで基本指数が決まります。フルタイムでなくても点数が付きます。</p>

<table>
<tr><th>勤務パターン例</th><th>条件</th><th>指数</th></tr>
<tr><td>週5日×8時間</td><td>月20日以上・1日8時間以上</td><td>20</td></tr>
<tr><td>週5日×6時間</td><td>月20日以上・1日6時間以上</td><td>18</td></tr>
<tr><td>週4日×6時間</td><td>月16日以上・1日6時間以上</td><td>16</td></tr>
<tr><td>週4日×5時間</td><td>月16日以上・1日4時間以上</td><td>14</td></tr>
<tr><td>週3日×5時間</td><td>月12日以上・1日4時間以上</td><td>12</td></tr>
<tr><td>月64時間以上</td><td>上記に該当しない場合</td><td>10</td></tr>
</table>

<h2>パートで入園するには</h2>
<p>週3日・1日5時間のパートなら月12日以上・1日4時間以上で<span class="highlight">12点</span>です。フルタイム20点との差は8点。調整指数だけでは埋めにくい差ですが、0歳児クラスや新設園なら可能性があります。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>小金井市の入所要件は月64時間以上の就労です。これを下回ると申込みそのものができません。時短勤務でも月64時間を超えていれば申込可能です。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 45,
  },
  {
    slug: "rejection-options",
    citySlug: "koganei",
    title: "小金井市で不承諾になったら　次にやるべきこと",
    description:
      "小金井市の保育園入園で不承諾通知が届いた場合の対処法をまとめました。",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=400&fit=crop",
    category: "不承諾対策",
    categoryColor: "rose",
    content: `<h2>不承諾通知が届いたら</h2>
<p>小金井市では4月一次選考の結果が1月下旬〜2月上旬に届きます。不承諾だった場合の選択肢を整理しましょう。</p>

<h3>選択肢</h3>
<ul>
<li>二次募集に申し込む（2月〜3月）</li>
<li>5月以降の途中入園を申し込む</li>
<li>認可外保育施設を利用しながら翌年度に再申込する</li>
<li>幼稚園の預かり保育を検討する</li>
</ul>

<h2>二次募集のポイント</h2>
<p>二次募集は辞退などで空きが出た園に申し込めます。一次募集で定員に達しなかった園や、内定辞退があった園が対象です。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>認可外保育施設に月ぎめで預けてから翌年度に再申込すると、+3点の加点がもらえます。長い目で見た戦略が大切です。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 35,
  },
  {
    slug: "unlicensed-nursery-bonus",
    citySlug: "koganei",
    title: "小金井市で認可外加点を取る方法　対象施設と条件",
    description:
      "小金井市で認可外保育施設の利用による加点を得る方法と注意点を解説します。",
    image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>認可外加点とは</h2>
<p>小金井市では認可外保育施設に月ぎめで預けている場合、調整指数として<span class="highlight">+3点</span>が加算されます。</p>

<h2>対象となる施設</h2>
<ul>
<li>認証保育所</li>
<li>認可外保育施設（東京都に届出済みのもの）</li>
<li>ベビーシッター（月ぎめ契約の場合）</li>
</ul>

<h2>注意点</h2>
<p>一時保育やスポット利用は対象外です。月ぎめ契約であることが条件です。また、費用は全額自己負担となるため、加点のためだけに利用するかどうかは費用対効果を考えて判断しましょう。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>認可外加点の+3点はフルタイム共働き世帯が横並びの40点から抜け出すための有効な手段です。きょうだい在園（+3点）と合わせれば46点が狙えます。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>認可外保育施設の一覧は<a href="https://www.city.koganei.lg.jp/kosodatekyoiku/hoikuen/" target="_blank" rel="noopener">小金井市公式サイト</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 40,
  },
  {
    slug: "popular-areas",
    citySlug: "koganei",
    title: "小金井市の地域別・保育園の入りやすさ",
    description:
      "小金井市内の地域別に保育園の入りやすさを比較し、保活の参考情報をまとめました。",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=400&fit=crop",
    category: "地域情報",
    categoryColor: "teal",
    content: `<h2>小金井市の地域特性</h2>
<p>小金井市はJR中央線の武蔵小金井駅・東小金井駅を中心に住宅地が広がり、小金井公園や江戸東京たてもの園など緑豊かな環境が特徴です。地域によって保育園の入りやすさに差があります。</p>

<h3>競争が激しいエリア</h3>
<ul>
<li>武蔵小金井駅周辺：市の中心部で共働き世帯が多い</li>
<li>東小金井駅周辺：マンション開発で若い世帯が増加</li>
</ul>

<h3>比較的入りやすいエリア</h3>
<ul>
<li>小金井公園北側エリア：駅から離れるが競争は緩やか</li>
<li>市の南部エリア：新設園が増えた地域は空きが出やすい</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>小金井市は人口約12.5万人の比較的コンパクトな市です。自転車圏内で複数の園に通えるため、希望園は幅広く書くのがおすすめです。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>保育園の一覧と空き状況は<a href="https://www.city.koganei.lg.jp/kosodatekyoiku/hoikuen/" target="_blank" rel="noopener">小金井市公式サイト</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 45,
  },
  {
    slug: "competition-reality",
    citySlug: "koganei",
    title: "小金井市で保育園に入れる点数の目安　何点あれば安心？",
    description:
      "小金井市の保育園入園に必要な点数の目安を解説します。",
    image: "https://images.unsplash.com/photo-1460518451285-97b6aa326961?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>内定に必要な点数の目安</h2>
<p>小金井市では人気の園ではフルタイム共働き（基本指数40点）だけでは入れないケースもあります。調整指数の加点が勝負を分けます。</p>

<h3>目安</h3>
<table>
<tr><th>エリア・クラス</th><th>目安の点数</th></tr>
<tr><td>武蔵小金井駅周辺（1歳児）</td><td>42〜43点以上</td></tr>
<tr><td>東小金井駅周辺（1歳児）</td><td>41〜42点</td></tr>
<tr><td>市北部・南部エリア（1歳児）</td><td>40点前後</td></tr>
<tr><td>0歳児クラス</td><td>40点前後</td></tr>
</table>

<p>1歳児クラスは最も競争が激しいクラスです。0歳児や3歳児クラスは比較的入りやすい傾向にあります。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>小金井市の満点は40点＋調整指数です。フルタイム共働き40点に認可外利用（+3）やきょうだい在園（+3）を加えた46点前後が上位層の目安です。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>最新の入園状況は<a href="https://www.city.koganei.lg.jp/kosodatekyoiku/hoikuen/" target="_blank" rel="noopener">小金井市公式サイト</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 50,
  },
  {
    slug: "next-year-changes",
    citySlug: "koganei",
    title: "小金井市の保育園事情　最新動向と今後の見通し",
    description:
      "小金井市の保育園整備計画や待機児童の動向など、最新の保育園事情をまとめました。",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=400&fit=crop",
    category: "最新情報",
    categoryColor: "purple",
    content: `<h2>小金井市の保育園整備</h2>
<p>小金井市は待機児童対策として認可保育所の新設や既存園の定員拡大を進めています。市内には認可保育園が約20か所あります。</p>

<h2>最近の傾向</h2>
<ul>
<li>武蔵小金井駅周辺の再開発に伴う新規保育施設の開設</li>
<li>小規模保育事業所の卒園児対策として連携園の拡充</li>
<li>少子化の影響で一部の園では定員割れも発生</li>
</ul>

<h2>小金井市の特徴</h2>
<p>小金井市は人口約12.5万人で、小金井公園や江戸東京たてもの園がある緑豊かなまちです。JR中央線で新宿まで約30分のアクセスで、子育て世帯に人気があります。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>新設園は初年度に空きが出やすいため、保活では要チェックです。小金井市の最新の募集数は公式サイトで確認できます。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>最新の保育園情報は<a href="https://www.city.koganei.lg.jp/kosodatekyoiku/hoikuen/" target="_blank" rel="noopener">小金井市公式サイト 保育園入園案内</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 30,
  },
  {
    slug: "hoikuryo-keisan",
    citySlug: "koganei",
    title: "小金井市の保育料計算【令和8年度版】年収別シミュレーション・早見表",
    description:
      "小金井市の認可保育園の保育料を年収・子ども数別に詳しく解説。市民税所得割額に基づく階層区分早見表、無償化（3歳〜）の対象確認、副食費・第2子以降の減免制度まで。令和8年度対応。",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop",
    category: "お金・制度",
    categoryColor: "amber",
    content: `<h2>小金井市の保育料はどうやって決まる？</h2>
<p>小金井市の認可保育園の保育料（利用者負担額）は、<strong>世帯の市民税所得割額</strong>によって決まります。東京都の基準に基づき階層区分が設定されており、所得が高いほど保育料も高くなる応能負担方式です。</p>

<h2>年齢ごとの基本ルール</h2>
<table>
<tr><th>年齢</th><th>保育料</th><th>注意点</th></tr>
<tr><td>0〜2歳児</td><td>有料（階層区分による）</td><td>世帯の所得割額で決定</td></tr>
<tr><td>3〜5歳児</td><td>無償（月額上限あり）</td><td>幼児教育・保育の無償化対象</td></tr>
</table>
<div class="point-box">
<p><strong>ポイント</strong></p>
<p>3歳以上は保育料が無償化されますが、<span class="highlight">副食費（給食の食材費）は別途負担</span>が必要です。低所得世帯や第3子以降は免除される場合があります。</p>
</div>

<h2>保育料の階層区分（0〜2歳の目安）</h2>
<table>
<tr><th>市民税所得割額（世帯合計）</th><th>保育料目安（月額・0歳）</th></tr>
<tr><td>非課税世帯</td><td>無料</td></tr>
<tr><td>〜約5万円</td><td>6,000〜9,000円</td></tr>
<tr><td>〜約10万円</td><td>12,000〜19,000円</td></tr>
<tr><td>〜約20万円</td><td>25,000〜38,000円</td></tr>
<tr><td>〜約30万円</td><td>42,000〜52,000円</td></tr>
<tr><td>30万円超</td><td>58,000〜77,000円</td></tr>
</table>
<p class="text-xs text-muted-foreground">※上記は目安です。詳細は小金井市の公式保育料表をご確認ください。</p>

<h2>多子世帯・ひとり親世帯の軽減</h2>
<ul>
<li><strong>第2子</strong>：同一世帯で保育所等を利用中の場合、半額</li>
<li><strong>第3子以降</strong>：無料</li>
<li><strong>ひとり親世帯・生活保護世帯</strong>：最低階層として算定（大幅減額）</li>
</ul>

<h2>副食費について（3歳以上）</h2>
<p>3歳以上は保育料が無償化されますが、副食費（おかず代）は月額4,500円程度の実費負担があります。以下の場合は免除されます。</p>
<ul>
<li>年収360万円未満相当の世帯</li>
<li>第3子以降の子ども</li>
</ul>

<h2>保育料の確認方法</h2>
<p>毎年6月ごろ、前年度の市民税額が確定した後に保育料が決定・通知されます。入園前に目安を知りたい場合は小金井市担当課にお問い合わせください。</p>
<div class="info-box">
<p><strong>公式情報</strong></p>
<p>最新の保育料表は小金井市公式サイトからご確認ください。</p>
</div>`,
    publishedAt: "2026-05-13",
    popularity: 42,
  },
  {
    slug: "shokuhi-jippi",
    citySlug: "koganei",
    title: "小金井市の保育園の給食費（副食費）はいくら？【令和8年度版】免除条件と金額",
    description:
      "小金井市の保育園の給食費（副食費）は月いくら？所得・子ども数による副食費免除の条件と申請方法、保育料無償化の範囲と実費負担の全額をわかりやすく解説。令和8年度対応。",
    image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&h=400&fit=crop",
    category: "お金・制度",
    categoryColor: "amber",
    content: `<h2>小金井市の副食費とは？</h2>
<p>2019年10月の幼児教育・保育無償化により、<strong>3歳以上の保育料は無料</strong>になりました。ただし、給食の<strong>副食費（おかず代）は実費負担</strong>が残ります。小金井市では副食費として月額4,500円程度が別途かかります。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>3歳以上でも副食費は無償化の対象外です。ただし、低所得世帯・第3子以降は免除制度があります。</p>
</div>

<h2>副食費の月額目安</h2>
<table>
<tr><th>年齢</th><th>副食費（月額目安）</th></tr>
<tr><td>3〜5歳児</td><td>約4,500円</td></tr>
<tr><td>0〜2歳児</td><td>保育料に含む（副食費別途なし）</td></tr>
</table>
<p class="text-xs text-muted-foreground">※金額は目安です。詳細は小金井市公式サイトでご確認ください。</p>

<h2>副食費が免除される条件</h2>
<table>
<tr><th>免除条件</th><th>内容</th></tr>
<tr><td>年収360万円未満相当の世帯</td><td>市民税所得割額が一定以下の世帯は副食費が免除</td></tr>
<tr><td>第3子以降の子ども</td><td>小学3年生以下のきょうだいが2人以上いる場合、3人目以降は免除</td></tr>
<tr><td>生活保護世帯</td><td>副食費の負担なし</td></tr>
</table>

<h2>保育料無償化の対象範囲</h2>
<ul>
<li>無償化対象：<strong>保育料（基本利用料）</strong>のみ — 3歳〜5歳</li>
<li>実費負担が残るもの：副食費（おかず代）・主食費（ご飯代）・行事費・通園バス代など</li>
</ul>

<h2>副食費の支払い方法</h2>
<p>副食費は園から直接請求されます。毎月口座引き落としまたは現金納付が一般的です。免除に該当する場合は入園時や毎年6月ごろに申請手続きが必要です。小金井市担当課に確認してください。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>最新の副食費・実費負担の詳細は小金井市公式サイトからご確認ください。</p>
</div>`,
    publishedAt: "2026-05-13",
    popularity: 40,
  },
];

registerArticles(articles);
