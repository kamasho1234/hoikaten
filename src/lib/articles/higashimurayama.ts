import type { Article } from "./types";
import { registerArticles } from "./index";

const articles: Article[] = [
  {
    slug: "hokatsu-schedule",
    citySlug: "higashimurayama",
    title: "東村山市の保活スケジュール　申込から内定までの流れ",
    description:
      "東村山市の認可保育園の申込時期・選考の流れをまとめました。令和8年度4月入園の動き方を解説します。",
    image: "https://images.unsplash.com/photo-1484820540004-14229fe36ca4?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>東村山市の4月入園スケジュール</h2>
<p>東村山市の認可保育園は毎年10月〜11月に翌年度4月入園の一次募集を受付けます。子ども家庭部保育幼稚園課が窓口です。</p>

<h3>保活の全体スケジュール</h3>
<div class="step">
<div class="step-num">1</div>
<div class="step-content">
<strong>4月〜6月：情報収集</strong>
<p>東村山市公式サイトで前年度の入園案内や保育園一覧を確認します。東村山市には認可保育園が約25か所あります。</p>
</div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content">
<strong>6月〜9月：保育園見学</strong>
<p>気になる園に連絡して見学を予約しましょう。西武線沿線の園は人気が高い傾向です。</p>
</div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content">
<strong>9月〜10月：入園案内入手・書類準備</strong>
<p>最新の入園案内を入手し、就労証明書などを勤務先に依頼します。</p>
</div>
</div>
<div class="step">
<div class="step-num">4</div>
<div class="step-content">
<strong>10月〜11月：申込書類の提出</strong>
<p>東村山市子ども家庭部保育幼稚園課へ提出します。</p>
</div>
</div>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>東村山市は基本指数が父母各最大20点（合計40点満点）です。月あたりの就労日数と1日あたりの就労時間で判定されます。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳しくは<a href="https://www.city.higashimurayama.tokyo.jp/kosodate/kyouikuhoikushisetsu/hoikujyo/index.htmlkyouikuhoikushisetsu/hoikujyo/index.html" target="_blank" rel="noopener">東村山市公式サイト 保育園入園案内</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 60,
  },
  {
    slug: "scoring-system-guide",
    citySlug: "higashimurayama",
    title: "東村山市の入園点数のしくみ　基本指数と調整指数を解説",
    description:
      "東村山市の保育園入園選考で使われる基本指数と調整指数のしくみを解説します。",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>東村山市の選考指数とは</h2>
<p>東村山市の認可保育園の入園選考は「基本指数＋調整指数」の合計で行われます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>選考指数 = 基本指数（保護者1 + 保護者2）+ 調整指数</p>
</div>

<h2>基本指数（父母各最大20点、合計40点）</h2>
<p>就労の場合、月20日以上かつ1日8時間以上の就労で満点の<span class="highlight">20点</span>になります。月あたりの就労日数と1日あたりの就労時間の組み合わせで判定されるのが東村山市の特徴です。</p>

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
<li>認可外保育施設に預けている：<span class="highlight">+3点</span></li>
<li>生活保護世帯：<span class="highlight">+3点</span></li>
<li>同時申込（双子など）：<span class="highlight">+2点</span></li>
<li>育児休業から復帰予定：<span class="highlight">+2点</span></li>
</ul>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>全項目は<a href="https://www.city.higashimurayama.tokyo.jp/kosodate/kyouikuhoikushisetsu/hoikujyo/index.htmlkyouikuhoikushisetsu/hoikujyo/index.html" target="_blank" rel="noopener">東村山市公式サイト 保育園入園案内</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 55,
  },
  {
    slug: "work-points-detail",
    citySlug: "higashimurayama",
    title: "東村山市の就労点数を詳しく解説　何日・何時間で何点？",
    description:
      "東村山市の保育園入園選考で就労の基本指数がどう決まるかを詳しく解説します。パート・時短勤務の方も必見です。",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop",
    category: "点数の詳細",
    categoryColor: "blue",
    content: `<h2>就労の基本指数一覧</h2>
<p>東村山市では月あたりの就労日数と1日あたりの就労時間の組み合わせで基本指数が決まります。</p>

<table>
<tr><th>就労状況</th><th>指数</th><th>勤務パターン例</th></tr>
<tr><td>月20日以上かつ1日8時間以上</td><td>20</td><td>週5日×8時間のフルタイム</td></tr>
<tr><td>月20日以上かつ1日6時間以上</td><td>18</td><td>週5日×6時間の時短勤務</td></tr>
<tr><td>月16日以上かつ1日6時間以上</td><td>16</td><td>週4日×6時間</td></tr>
<tr><td>月16日以上かつ1日4時間以上</td><td>14</td><td>週4日×4〜5時間のパート</td></tr>
<tr><td>月12日以上かつ1日4時間以上</td><td>12</td><td>週3日×4時間のパート</td></tr>
<tr><td>月64時間以上</td><td>10</td><td>上記以外で月64時間以上</td></tr>
</table>

<h2>パート・時短勤務で入園するには</h2>
<p>週3日・1日4時間のパートでも<span class="highlight">12点</span>が付きます。フルタイム20点との差は8点ですが、認可外利用+3やひとり親+5などの調整指数で差を縮められます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>東村山市の入所要件は月64時間以上の就労です。これを下回ると申込みそのものができません。時短勤務でも月64時間を超えていれば申込可能です。</p>
</div>

<h2>自営業・フリーランスの場合</h2>
<p>自営業やフリーランスの方も同じ基準で判定されます。就労証明書の代わりに自営業申告書や開業届の写しなどが必要です。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>就労証明書の様式は<a href="https://www.city.higashimurayama.tokyo.jp/kosodate/kyouikuhoikushisetsu/hoikujyo/index.htmlkyouikuhoikushisetsu/hoikujyo/index.html" target="_blank" rel="noopener">東村山市公式サイト</a>からダウンロードできます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 50,
  },
  {
    slug: "adjustment-points",
    citySlug: "higashimurayama",
    title: "東村山市の調整指数一覧　加点・減点の全項目を解説",
    description:
      "東村山市の保育園入園選考で適用される調整指数（加点・減点）の全項目を解説します。",
    image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&h=400&fit=crop",
    category: "点数の詳細",
    categoryColor: "blue",
    content: `<h2>調整指数とは</h2>
<p>東村山市の入園選考では基本指数に加えて、世帯の状況に応じた調整指数が加算・減算されます。加点を確実に取ることが入園の鍵です。</p>

<h2>加点項目</h2>
<table>
<tr><th>項目</th><th>点数</th><th>条件</th></tr>
<tr><td>ひとり親</td><td>+5</td><td>ひとり親世帯であること</td></tr>
<tr><td>きょうだい在園</td><td>+3</td><td>きょうだいが認可保育園に在園中</td></tr>
<tr><td>認可外利用</td><td>+3</td><td>認可外保育施設に月ぎめで預けている</td></tr>
<tr><td>生活保護</td><td>+3</td><td>生活保護を受給している</td></tr>
<tr><td>同時申込</td><td>+2</td><td>きょうだいと同時に申し込む（双子など）</td></tr>
<tr><td>育休復帰</td><td>+2</td><td>育児休業を取得し入園月に復帰する</td></tr>
</table>

<h2>減点項目</h2>
<table>
<tr><th>項目</th><th>点数</th><th>条件</th></tr>
<tr><td>市外申込</td><td>-10</td><td>東村山市外からの申込み</td></tr>
<tr><td>転園</td><td>-5</td><td>既に認可保育園に在園しており転園を希望</td></tr>
<tr><td>同居親族保育可能</td><td>-3</td><td>同居の親族に保育可能な方がいる</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>フルタイム共働き世帯は基本指数40点で横並びです。ひとり親+5点、きょうだい在園+3点、認可外利用+3点など、該当する加点を漏れなく申告しましょう。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>調整指数の全項目は<a href="https://www.city.higashimurayama.tokyo.jp/kosodate/kyouikuhoikushisetsu/hoikujyo/index.htmlkyouikuhoikushisetsu/hoikujyo/index.html" target="_blank" rel="noopener">東村山市公式サイト 入園案内</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 50,
  },
  {
    slug: "required-documents",
    citySlug: "higashimurayama",
    title: "東村山市の保育園申込に必要な書類一覧",
    description:
      "東村山市の認可保育園の申込に必要な書類をまとめました。就労証明書や家庭状況届など、提出前にチェックしましょう。",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>全員が提出する書類</h2>
<ul>
<li>保育施設等利用申込書</li>
<li>家庭状況届</li>
<li>保育が必要な事由を証明する書類（就労証明書など）</li>
<li>マイナンバー確認書類</li>
</ul>

<h2>保育が必要な事由ごとの書類</h2>
<table>
<tr><th>事由</th><th>必要書類</th></tr>
<tr><td>就労</td><td>就労証明書（勤務先が記入）</td></tr>
<tr><td>自営業</td><td>自営業申告書＋開業届の写し等</td></tr>
<tr><td>求職中</td><td>求職活動に関する申立書</td></tr>
<tr><td>疾病</td><td>医師の診断書</td></tr>
<tr><td>障害</td><td>障害者手帳の写し</td></tr>
<tr><td>介護・看護</td><td>介護・看護に関する申告書＋要介護認定通知書等</td></tr>
<tr><td>就学</td><td>在学証明書＋時間割等</td></tr>
</table>

<div class="step">
<div class="step-num">1</div>
<div class="step-content">
<strong>就労証明書は早めに依頼</strong>
<p>勤務先に記入してもらう書類は2〜3週間かかる場合があります。早めに依頼しましょう。</p>
</div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content">
<strong>調整指数の加点書類も忘れずに</strong>
<p>認可外利用の証明書やきょうだいの在園証明など、加点に必要な書類も併せて準備します。</p>
</div>
</div>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>書類の様式は東村山市公式サイトからダウンロードできます。記入漏れがあると受理されない場合があるので、提出前に窓口で確認するのがおすすめです。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>申請書類の様式は<a href="https://www.city.higashimurayama.tokyo.jp/kosodate/kyouikuhoikushisetsu/hoikujyo/index.htmlkyouikuhoikushisetsu/hoikujyo/index.html" target="_blank" rel="noopener">東村山市公式サイト</a>からダウンロードできます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 45,
  },
  {
    slug: "nursery-types",
    citySlug: "higashimurayama",
    title: "東村山市の保育施設の種類　認可・認証・小規模の違い",
    description:
      "東村山市にある保育施設の種類と特徴を解説します。認可保育園・認証保育所・小規模保育の違いを知りましょう。",
    image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&h=400&fit=crop",
    category: "保育園選び",
    categoryColor: "teal",
    content: `<h2>東村山市の保育施設の種類</h2>
<p>東村山市には認可保育園が約25か所あり、それ以外にも認証保育所や小規模保育事業所があります。</p>

<h3>認可保育園</h3>
<p>国の基準を満たした保育施設です。東村山市では子ども家庭部保育幼稚園課を通じて申込みます。0歳〜5歳児が対象で、保育料は世帯の所得に応じて決まります。</p>

<h3>認証保育所（東京都独自の制度）</h3>
<p>東京都が独自に認証した保育施設です。認可保育園に入れなかった場合の選択肢として有力です。認可外利用の加点（+3点）の対象にもなります。</p>

<h3>小規模保育事業所</h3>
<p>定員6〜19名の少人数の保育施設です。0〜2歳児が対象で、3歳児以降は連携先の保育園や幼稚園に移行します。</p>

<h3>家庭的保育（保育ママ）</h3>
<p>保育者の自宅などで少人数（定員5名以下）を保育する制度です。家庭的な環境で保育を受けられます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>認可外保育施設に預けてから翌年度に認可保育園に再申込すると、調整指数+3点の加点が得られます。認可に入れなかった場合の戦略として覚えておきましょう。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>保育施設一覧は<a href="https://www.city.higashimurayama.tokyo.jp/kosodate/kyouikuhoikushisetsu/hoikujyo/index.htmlkyouikuhoikushisetsu/hoikujyo/index.html" target="_blank" rel="noopener">東村山市公式サイト</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 40,
  },
  {
    slug: "age-class-competition",
    citySlug: "higashimurayama",
    title: "東村山市の年齢別・クラス別の競争状況",
    description:
      "東村山市の保育園入園で0歳児・1歳児・2歳児クラスそれぞれの競争状況と入りやすさを解説します。",
    image: "https://images.unsplash.com/photo-1460518451285-97b6aa326961?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>年齢別の競争状況</h2>
<p>東村山市では年齢（クラス）によって入りやすさが大きく異なります。</p>

<h3>0歳児クラス</h3>
<p>募集枠は少ないものの、申込者も限られるため入りやすい傾向です。産休・育休明けに合わせて0歳児クラスで入園するのは有力な戦略です。</p>

<h3>1歳児クラス</h3>
<p>最も競争が激しいクラスです。育児休業を1年取得してから復帰する方が多いため、申込者が集中します。フルタイム共働き（基本指数40点）でも調整指数の加点がないと厳しい園があります。</p>

<h3>2歳児クラス</h3>
<p>1歳児クラスほどではありませんが、持ち上がりで枠が埋まるため募集数は少ない傾向です。</p>

<h3>3歳児クラス以上</h3>
<p>幼稚園への移行や小規模保育からの卒園児の受け入れ枠があるため、比較的入りやすくなります。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>東村山市では1歳児クラスの競争が特に激しいため、0歳児クラスでの入園を検討するか、認可外利用で加点を確保してから1歳児クラスに再申込する戦略が有効です。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>各園の募集数は<a href="https://www.city.higashimurayama.tokyo.jp/kosodate/kyouikuhoikushisetsu/hoikujyo/index.htmlkyouikuhoikushisetsu/hoikujyo/index.html" target="_blank" rel="noopener">東村山市公式サイト</a>で公開されています。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 45,
  },
  {
    slug: "dual-income-strategy",
    citySlug: "higashimurayama",
    title: "東村山市で共働き世帯が入園するための戦略",
    description:
      "東村山市でフルタイム共働き世帯が確実に入園するための戦略を解説します。基本指数40点からの加点ポイントを紹介。",
    image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>基本指数40点がスタートライン</h2>
<p>東村山市ではフルタイム共働き世帯（月20日以上かつ1日8時間以上）は父母それぞれ20点、合計<span class="highlight">40点</span>になります。人気園ではこの40点で横並びになるため、調整指数が勝負を分けます。</p>

<h2>加点チェックリスト</h2>
<table>
<tr><th>項目</th><th>点数</th><th>条件</th></tr>
<tr><td>きょうだい在園</td><td>+3</td><td>きょうだいが認可保育園に在園中</td></tr>
<tr><td>認可外利用</td><td>+3</td><td>認可外保育施設に月ぎめで預けている</td></tr>
<tr><td>育休復帰</td><td>+2</td><td>育児休業を取得し入園月に復帰する</td></tr>
<tr><td>同時申込</td><td>+2</td><td>きょうだいと同時に申し込む</td></tr>
</table>

<h2>認可外保育施設の活用</h2>
<p>認可外保育施設に月ぎめで預けていると+3点の加点が得られます。認証保育所やベビーシッターの月ぎめ利用も対象になる場合があります。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>東村山市は基本指数の上限が40点と他の市区町村に比べて低いため、調整指数の加点が相対的に大きな意味を持ちます。+3点の加点でも入園可否が変わるケースがあります。</p>
</div>

<h2>希望園は多めに書く</h2>
<p>東村山市では希望園を多く書いても不利にはなりません。通える範囲の園はすべて記入しましょう。西武新宿線・西武国分寺線の沿線だけでなく、少し離れた園も候補に入れると可能性が広がります。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>各園の空き状況は<a href="https://www.city.higashimurayama.tokyo.jp/kosodate/kyouikuhoikushisetsu/hoikujyo/index.htmlkyouikuhoikushisetsu/hoikujyo/index.html" target="_blank" rel="noopener">東村山市公式サイト</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 55,
  },
  {
    slug: "single-parent-support",
    citySlug: "higashimurayama",
    title: "東村山市のひとり親世帯の保育園入園　+5点の加点を解説",
    description:
      "東村山市でひとり親世帯に適用される+5点の調整指数と、入園に向けた戦略を解説します。",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=400&fit=crop",
    category: "ひとり親支援",
    categoryColor: "purple",
    content: `<h2>ひとり親世帯の加点</h2>
<p>東村山市ではひとり親世帯の場合、調整指数として<span class="highlight">+5点</span>が加算されます。基本指数と合わせた点数で入園の可能性が広がります。</p>

<h2>ひとり親世帯の点数イメージ</h2>
<p>ひとり親でフルタイム就労の場合：</p>
<div class="point-box">
<p><strong>ポイント</strong></p>
<p>基本指数20点 ＋ ひとり親加点5点 ＝ <span class="highlight">合計25点</span>。両親フルタイム共働き世帯（40点）と比べると差がありますが、認可外利用+3点やきょうだい+3点などの加点を組み合わせることが重要です。</p>
</div>

<h2>ひとり親が活用できるその他の加点</h2>
<table>
<tr><th>項目</th><th>点数</th></tr>
<tr><td>ひとり親加点</td><td>+5</td></tr>
<tr><td>認可外利用</td><td>+3</td></tr>
<tr><td>きょうだい在園</td><td>+3</td></tr>
<tr><td>生活保護</td><td>+3</td></tr>
<tr><td>育休復帰</td><td>+2</td></tr>
</table>

<h2>ひとり親向けの支援制度</h2>
<p>東村山市ではひとり親世帯向けに児童扶養手当やひとり親家庭医療費助成など、保育以外にもさまざまな支援制度があります。保育幼稚園課だけでなく子育て支援課にも相談してみましょう。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>ひとり親支援の詳細は<a href="https://www.city.higashimurayama.tokyo.jp/kosodate/kyouikuhoikushisetsu/hoikujyo/index.html" target="_blank" rel="noopener">東村山市公式サイト 子育て支援</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 40,
  },
  {
    slug: "waiting-child-status",
    citySlug: "higashimurayama",
    title: "東村山市の待機児童の状況と今後の見通し",
    description:
      "東村山市の待機児童数の推移と保育園整備の動向をまとめました。今後の保活の参考にしてください。",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=400&fit=crop",
    category: "最新情報",
    categoryColor: "purple",
    content: `<h2>東村山市の待機児童の状況</h2>
<p>東村山市は人口約15万人の東京都多摩地域の市です。志村けんの出身地としても知られています。近年は待機児童対策として保育施設の整備を進めています。</p>

<h2>保育園整備の動向</h2>
<ul>
<li>認可保育園の新設・定員増による受け入れ枠の拡大</li>
<li>小規模保育事業所の整備</li>
<li>認証保育所への支援</li>
</ul>

<h2>入りやすくなっている？</h2>
<p>保育施設の整備が進んだことで、以前に比べると入園しやすくなっている傾向です。ただし1歳児クラスは依然として競争が激しい状況が続いています。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>新設園は初年度に空きが出やすいため、保活では要チェックです。東村山市の最新の募集数は公式サイトで確認できます。</p>
</div>

<h2>東村山市の保活の特徴</h2>
<p>東村山市は基本指数の上限が40点と比較的低い設定です。そのため調整指数の加点（ひとり親+5、きょうだい+3、認可外+3など）が選考結果に大きく影響します。加点対象に該当する項目がないか、しっかり確認しましょう。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>最新の保育園情報は<a href="https://www.city.higashimurayama.tokyo.jp/kosodate/kyouikuhoikushisetsu/hoikujyo/index.htmlkyouikuhoikushisetsu/hoikujyo/index.html" target="_blank" rel="noopener">東村山市公式サイト</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 35,
  },
];

registerArticles(articles);
