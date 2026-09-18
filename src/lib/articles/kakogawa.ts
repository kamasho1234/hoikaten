import type { Article } from "./types";
import { registerArticles } from "./index";

const articles: Article[] = [
  {
    slug: "fulltime-40-line",
    citySlug: "kakogawa",
    title: "フルタイム共働きで基本指数40点は安心？加古川市のボーダーライン事情",
    description:
      "加古川市でフルタイム共働き（基本指数40点）なら入園できるのか？競争状況と調整指数の重要性を解説します。",
    image:
      "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>基本指数40点がスタートライン</h2>
<p>加古川市では父母ともフルタイム勤務（月160時間以上）であれば基本指数は<span class="highlight">20＋20＝40点</span>になります。</p>

<h2>加古川市の競争状況</h2>
<p>加古川市は人口約26万人の兵庫県東播磨地域の中心都市です。JR加古川駅周辺を中心にファミリー層の住宅需要が高く、人気園では基本指数40点でも入れないケースがあります。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>認可外施設利用（+3）、きょうだい在園（+3）、育休復帰（+2）などの調整指数が差を分けます。該当する項目がないか確認しましょう。</p>
</div>

<h2>同点の場合はどうなる？</h2>
<p>選考指数が同一の場合、加古川市が定める優先順位に基づき判定されます。基本指数が高い順、就労時間の長さ、世帯の所得額などが比較されます。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>0歳児クラスは枠が少ないため、年齢によって入りやすさが大きく異なります。受入予定児童数は加古川市の公式サイトで確認しましょう。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 55,
  },
  {
    slug: "jitan-kinmu-scoring",
    citySlug: "kakogawa",
    title: "時短勤務だと指数は下がる？加古川市の基本指数と勤務時間の関係",
    description:
      "加古川市で時短勤務の場合、基本指数がどう変わるかを解説。フルタイムとの差や調整指数を最大化するポイントも紹介します。",
    image:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>時短勤務の基本指数</h2>
<p>加古川市では月あたりの就労時間に応じて基本指数が決まります。</p>

<table>
<tr><th>就労時間（月あたり）</th><th>基本指数</th></tr>
<tr><td>月160時間以上</td><td><span class="highlight">20</span></td></tr>
<tr><td>月140時間以上160時間未満</td><td><span class="highlight">18</span></td></tr>
<tr><td>月120時間以上140時間未満</td><td><span class="highlight">16</span></td></tr>
<tr><td>月100時間以上120時間未満</td><td><span class="highlight">14</span></td></tr>
<tr><td>月80時間以上100時間未満</td><td><span class="highlight">12</span></td></tr>
</table>

<h2>時短勤務で基本指数はどうなる？</h2>
<div class="point-box">
<p><strong>ポイント</strong></p>
<p>例：母が月120時間の時短勤務（指数16）、父がフルタイム月160時間（指数20）の場合は、基本指数＝20＋16＝<span class="highlight">36点</span>。フルタイム同士の40点より4点低くなります。</p>
</div>

<h2>調整指数でカバーする方法</h2>
<p>時短勤務による基本指数の低下は、調整指数でカバーできる可能性があります。認可外保育施設の利用（+3）や、きょうだいが同一施設に在園中（+3）など、該当する項目を漏れなく申告しましょう。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>就労証明書に記載される勤務時間が基本指数の根拠になります。勤務先に正確な記載を依頼しましょう。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 50,
  },
  {
    slug: "ochita-toki-sentakushi",
    citySlug: "kakogawa",
    title: "加古川市で保育園に落ちたときの選択肢　次にやるべきこと",
    description:
      "加古川市の1次選考で保留になった場合の対処法を解説。取れる選択肢をまとめました。",
    image:
      "https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>保留通知が届いたら</h2>
<p>1次選考で保留になっても、まだ選択肢はあります。落ち着いて次の手を考えましょう。</p>

<h2>選択肢1：2次選考に申し込む</h2>
<p>1次で辞退が出た枠で再度選考されます。希望園の変更・追加も可能です。</p>

<h2>選択肢2：途中入園を申し込む</h2>
<p>毎月の空き状況に応じて途中入園の受付があります。年度途中でも諦めずに申し込みましょう。</p>

<h2>選択肢3：認可外保育施設を利用する</h2>
<p>認可外保育施設に預けながら翌年度に再申込することができます。ただし、加古川市の基準表には認可外利用に関する調整指数の加点はありません。</p>

<h2>選択肢4：育児休業を延長する</h2>
<p>保留通知書があれば育児休業を延長できます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>加古川市では空き状況が公式サイトで公開されることがあります。途中入園のチャンスを逃さないよう定期的にチェックしましょう。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>最新の空き状況は<a href="https://www.city.kakogawa.lg.jp/" target="_blank" rel="noopener">加古川市公式サイト</a>の幼児保育課のページで確認できます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 45,
  },
  {
    slug: "ninkagai-katen",
    citySlug: "kakogawa",
    title: "加古川市では認可外利用に加点がない　代わりに評価される項目とは",
    description:
      "加古川市の利用調整基準表に認可外保育施設の利用に関する調整指数加点はありません。代わりに評価される項目を解説します。",
    image:
      "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=800&h=400&fit=crop",
    category: "認可外",
    categoryColor: "rose",
    content: `<h2>加古川市では認可外利用は加点にならない</h2>
<p>加古川市の保育利用調整基準表には<span class="highlight">認可外保育施設の利用に関する調整指数の加点がありません</span>。他の自治体では認可外利用で加点を得られることがありますが、加古川市では該当する項目がないため、加点は適用されません。</p>

<h2>代わりに評価される項目</h2>
<p>加古川市では、認可外利用の加点がない代わりに、以下の項目で選考されます。</p>
<ul>
<li>基本指数：父母の月あたり就労時間（最大11点×2）</li>
<li>ひとり親世帯：+2点</li>
<li>きょうだいが同一施設に在園中：+4点</li>
<li>きょうだい同時申込：+1点</li>
<li>育児休業からの復帰予定：+2点</li>
<li>生活保護受給世帯：+5点</li>
<li>希望園までの距離が短い：+2点</li>
<li>加古川市での居住年数が長い：+1点</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>加古川市では、基本指数の月あたり就労時間が最も重要な評価項目です。月170時間以上のフルタイム就労で、父母各11点の合計22点が基本指数の最高値となります。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳細な利用調整基準表は<a href="https://www.city.kakogawa.lg.jp/" target="_blank" rel="noopener">加古川市公式サイト</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 45,
  },
  {
    slug: "area-guide",
    citySlug: "kakogawa",
    title: "加古川市のエリア別保育園事情　入りやすい地域は？",
    description:
      "加古川市の地域ごとの保育園の特徴と入りやすさの傾向を解説します。",
    image:
      "https://images.unsplash.com/photo-1524813686514-a57563d77965?w=800&h=400&fit=crop",
    category: "保育園選び",
    categoryColor: "teal",
    content: `<h2>エリアによって事情が異なる</h2>
<p>加古川市は人口約26万人の兵庫県東播磨地域の中心都市です。JR加古川線・山陽本線沿線を中心にエリアごとの保育園事情が異なります。</p>

<table>
<tr><th>エリア</th><th>特徴</th></tr>
<tr><td>JR加古川駅周辺</td><td>市の中心部で商業施設も充実。ファミリー層に人気が高く競争は激しい</td></tr>
<tr><td>JR東加古川駅周辺</td><td>住宅地として発展中。新しいマンションが増え、保育需要が高まっている</td></tr>
<tr><td>加古川町・野口町</td><td>市の中心エリアで保育施設が集中しているが、人口密度も高い</td></tr>
<tr><td>別府町・平岡町</td><td>山陽電鉄沿線。住宅地で比較的落ち着いた競争状況</td></tr>
<tr><td>志方町・八幡町</td><td>郊外エリア。園の数は少ないが競争は穏やか</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>加古川市は約40か所の認可保育園があります。希望する園だけでなく、通勤経路上の園も含めて幅広く検討しましょう。JR加古川駅から姫路・神戸方面への通勤者が多いため、駅周辺の園は特に人気です。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 40,
  },
  {
    slug: "hitorioya-katen",
    citySlug: "kakogawa",
    title: "加古川市のひとり親加点　調整指数+2点の仕組みを解説",
    description:
      "加古川市でひとり親世帯に適用される調整指数+2点の計算方法と必要書類について解説します。",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>ひとり親世帯の調整指数</h2>
<p>加古川市ではひとり親世帯に対し、調整指数として<span class="highlight">+2点</span>が加算されます。</p>

<h2>ひとり親世帯の選考指数イメージ</h2>
<div class="point-box">
<p><strong>ポイント</strong></p>
<p>月170時間以上のフルタイム就労のひとり親の場合：基本指数11（1人分） ＋ ひとり親加点2 ＝ <span class="highlight">選考指数13</span>。フルタイム共働き世帯（基本指数22）と比較すると点数差がありますが、加古川市では父母各11点の基本指数が標準です。</p>
</div>

<h2>必要書類</h2>
<p>ひとり親であることを証明する書類が必要です。</p>
<ul>
<li>戸籍謄本</li>
<li>児童扶養手当証書の写し</li>
<li>その他、ひとり親であることがわかる書類</li>
</ul>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>必要書類の詳細は加古川市こども部幼児保育課にお問い合わせください。書類の不備があると加点が認められない場合があります。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 50,
  },
  {
    slug: "ikukyu-kyuufukin-genkakuka",
    citySlug: "kakogawa",
    title: "2025年4月から育休給付金延長の審査が厳格化　加古川市での影響",
    description:
      "2025年4月からの育児休業給付金の延長手続き厳格化について、加古川市の保活にどう影響するかを解説します。",
    image:
      "https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?w=800&h=400&fit=crop",
    category: "最新情報",
    categoryColor: "blue",
    content: `<h2>制度改正の概要</h2>
<p>2025年4月から、育児休業給付金の支給対象期間延長の審査が厳格化されました。「速やかな職場復帰のために保育所の利用申込をした」と認められることが必要です。</p>

<h2>加古川市の保活への影響</h2>
<p>通勤可能な範囲の園を複数希望し、真剣に入園を目指している方は影響を受けません。一方、意図的に落選を狙うような申込は給付金延長が認められなくなります。</p>

<h2>加古川市の育休関連の調整指数</h2>
<p>加古川市では育児休業からの復帰に関連する調整指数があります。</p>
<ul>
<li>育児休業からの復帰予定：+2点</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>育休復帰の+2点は、入所月の翌月1日までに復帰することが条件です。復帰予定日を勤務先と相談しておきましょう。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>制度改正の詳細は<a href="https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/0000160564_00040.html" target="_blank" rel="noopener">厚生労働省「育児休業給付金の支給対象期間延長手続き」</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 35,
  },
  {
    slug: "tennen-gensan",
    citySlug: "kakogawa",
    title: "転園希望は-5点　加古川市で転園を成功させるポイント",
    description:
      "加古川市で認可保育園の転園を希望する場合の減点と、転園を成功させるための戦略を解説します。",
    image:
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>転園希望は-5点の調整指数</h2>
<p>加古川市では、現在通っている認可保育施設から別の認可保育施設への転園を希望する場合、調整指数として<span class="highlight">-5点</span>が適用されます。</p>

<h2>なぜ減点されるのか</h2>
<p>すでに認可保育施設に在園している世帯よりも、まだ入園できていない世帯を優先するための仕組みです。転園希望者は新規入園希望者より不利な条件で選考されます。</p>

<h2>転園を成功させるポイント</h2>
<div class="step">
<div class="step-num">1</div>
<div class="step-content"><strong>空きが出やすいタイミングを狙う</strong><p>4月入園は最も枠が多い時期です。年度途中よりも4月入園で申し込むのが有利です。</p></div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content"><strong>複数の希望園を出す</strong><p>転園先の選択肢を広げることで、入れる可能性を高めます。</p></div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content"><strong>3歳児クラスの進級タイミング</strong><p>小規模保育の卒園児が抜けるタイミングでは枠が増えることがあります。</p></div>
</div>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>フルタイム共働き（基本指数40）でも転園の-5で35点に。新規入園のフルタイム共働き世帯（40点）より大幅に不利になるため、転園の必要性を慎重に検討しましょう。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 30,
  },
];

registerArticles(articles);
