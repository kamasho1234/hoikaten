import type { Article } from "./types";
import { registerArticles } from "./index";

const articles: Article[] = [
  // ========== 保活の基本 ==========
  {
    slug: "hokatsu-schedule",
    citySlug: "hino",
    title: "日野市の保活スケジュール　申込から内定までの流れ",
    description:
      "日野市の認可保育園の申込時期・選考の流れをまとめました。令和8年度4月入園に向けた動き方を解説します。",
    image:
      "https://images.unsplash.com/photo-1484820540004-14229fe36ca4?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>日野市の4月入園スケジュール</h2>
<p>日野市の認可保育園は毎年秋に翌年度4月入園の申込を受付けます。日野市子ども部保育課が窓口です。市内には約35か所の認可保育園があり、多摩地域の中では選択肢が比較的多いエリアです。</p>

<h3>保活の全体スケジュール</h3>
<div class="step">
<div class="step-num">1</div>
<div class="step-content">
<strong>4月〜6月：情報収集</strong>
<p>日野市公式サイトで保育園一覧や前年度の「保育所入所のご案内」を確認します。</p>
</div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content">
<strong>6月〜9月：保育園見学</strong>
<p>気になる園に連絡して見学を予約しましょう。日野駅・豊田駅周辺は人気が集中するため早めの行動が大切です。</p>
</div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content">
<strong>10月〜11月：入所案内の入手・書類準備</strong>
<p>最新の「保育所入所のご案内」を入手し、就労証明書などを準備します。</p>
</div>
</div>
<div class="step">
<div class="step-num">4</div>
<div class="step-content">
<strong>11月〜12月：申込書類の提出</strong>
<p>保育課窓口または郵送で提出します。締切は例年12月上旬です。</p>
</div>
</div>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>日野市は基本指数が父母各最大20点（合計40点満点）です。月の就労日数と1日の就労時間で判定されます。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳しくは<a href="https://www.city.hino.lg.jp/kosodate/hoikuen/nyuen/index.html" target="_blank" rel="noopener">日野市公式サイト 保育園</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 60,
  },

  // ========== 点数を知る ==========
  {
    slug: "scoring-system-guide",
    citySlug: "hino",
    title: "日野市の入園点数のしくみ　基本指数と調整指数を解説",
    description:
      "日野市の保育園入園選考で使われる基本指数と調整指数のしくみを解説します。40点満点の点数体系を理解しましょう。",
    image:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop",
    category: "点数を知る",
    categoryColor: "blue",
    content: `<h2>日野市の選考指数とは</h2>
<p>日野市の認可保育園の入園選考は「基本指数＋調整指数」の合計で行われます。保護者それぞれの基本指数に調整指数を加えた合計点が高い世帯が優先されます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>合計点 = 基本指数（保護者1 + 保護者2）+ 調整指数</p>
</div>

<h2>基本指数（父母各最大20点、合計40点）</h2>
<p>就労の場合、月20日以上かつ日8時間以上で満点の<span class="highlight">20点</span>になります。</p>

<table>
<tr><th>就労状況</th><th>基本指数</th></tr>
<tr><td>月20日以上かつ日8時間以上</td><td>20</td></tr>
<tr><td>月20日以上かつ日6時間以上</td><td>18</td></tr>
<tr><td>月16日以上かつ日6時間以上</td><td>16</td></tr>
<tr><td>月16日以上かつ日4時間以上</td><td>14</td></tr>
<tr><td>月12日以上かつ日4時間以上</td><td>12</td></tr>
<tr><td>月64時間以上（上記に該当しない）</td><td>10</td></tr>
</table>

<h2>調整指数の代表例</h2>
<table>
<tr><th>項目</th><th>点数</th></tr>
<tr><td>ひとり親世帯</td><td>+5</td></tr>
<tr><td>きょうだい在園</td><td>+3</td></tr>
<tr><td>認可外保育施設利用</td><td>+3</td></tr>
<tr><td>生活保護受給世帯</td><td>+3</td></tr>
<tr><td>同時申込</td><td>+2</td></tr>
<tr><td>育休復帰予定</td><td>+2</td></tr>
<tr><td>同居親族が保育可能</td><td>-3</td></tr>
<tr><td>転園</td><td>-5</td></tr>
<tr><td>市外からの申込</td><td>-10</td></tr>
</table>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>全項目は<a href="https://www.city.hino.lg.jp/kosodate/hoikuen/nyuen/index.html" target="_blank" rel="noopener">日野市公式サイト</a>の「保育所入所のご案内」で確認できます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 70,
  },
  {
    slug: "work-points-detail",
    citySlug: "hino",
    title: "日野市の就労点数を詳しく解説　勤務時間別の基本指数",
    description:
      "日野市の保育園入園で就労の基本指数がどう決まるのか、勤務日数・時間別に詳しく解説します。",
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop",
    category: "点数を知る",
    categoryColor: "blue",
    content: `<h2>就労の基本指数は日数と時間で決まる</h2>
<p>日野市では月の就労日数と1日の就労時間の組み合わせで基本指数が決まります。フルタイム勤務でなくても点数が付きます。</p>

<h3>就労の基本指数一覧</h3>
<table>
<tr><th>就労条件</th><th>基本指数</th></tr>
<tr><td>月20日以上かつ日8時間以上</td><td><span class="highlight">20点</span></td></tr>
<tr><td>月20日以上かつ日6時間以上</td><td>18点</td></tr>
<tr><td>月16日以上かつ日6時間以上</td><td>16点</td></tr>
<tr><td>月16日以上かつ日4時間以上</td><td>14点</td></tr>
<tr><td>月12日以上かつ日4時間以上</td><td>12点</td></tr>
<tr><td>月64時間以上（上記に該当しない）</td><td>10点</td></tr>
</table>

<h2>パート・時短勤務の場合</h2>
<p>週4日・1日6時間のパート（月16日以上かつ日6時間以上）なら<span class="highlight">16点</span>です。週3日・1日5時間（月12日以上かつ日4時間以上）なら<span class="highlight">12点</span>になります。</p>

<h2>自営業・在宅勤務の場合</h2>
<p>自営業や在宅勤務でも、就労証明書に記載される勤務日数・時間に基づいて同じ基準で判定されます。実態に合った就労証明を準備しましょう。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>日野市は「日数」と「1日の時間」の両方が条件を満たす必要があります。月20日働いていても1日6時間未満なら18点にはなりません。就労証明書の記載内容を確認しましょう。</p>
</div>

<h2>求職中の場合</h2>
<p>求職活動中は基本指数<span class="highlight">6点</span>です。就労が決まったら速やかに就労証明書を提出することで点数が上がります。</p>`,
    publishedAt: "2026-04-07",
    popularity: 55,
  },

  // ========== 点数アップ ==========
  {
    slug: "adjustment-points",
    citySlug: "hino",
    title: "日野市の調整指数で点数アップ　加点項目と注意すべき減点",
    description:
      "日野市の保育園入園で調整指数の加点を最大限に活用する方法と、注意すべき減点項目を解説します。",
    image:
      "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>基本指数40点は出発点</h2>
<p>日野市ではフルタイム共働き世帯は基本指数<span class="highlight">40点</span>で横並びです。差がつくのは調整指数の部分です。</p>

<h2>加点項目チェックリスト</h2>
<table>
<tr><th>項目</th><th>点数</th><th>条件</th></tr>
<tr><td>ひとり親世帯</td><td>+5</td><td>ひとり親で保育が必要な世帯</td></tr>
<tr><td>きょうだい在園</td><td>+3</td><td>きょうだいが認可保育園に在園中</td></tr>
<tr><td>認可外保育施設利用</td><td>+3</td><td>認可外保育施設に月ぎめで利用中</td></tr>
<tr><td>生活保護受給世帯</td><td>+3</td><td>生活保護を受給中</td></tr>
<tr><td>同時申込</td><td>+2</td><td>きょうだいと同時に申し込む場合</td></tr>
<tr><td>育休復帰予定</td><td>+2</td><td>育児休業から入園月に復帰予定</td></tr>
</table>

<h2>減点項目にも注意</h2>
<table>
<tr><th>項目</th><th>点数</th><th>条件</th></tr>
<tr><td>市外からの申込</td><td>-10</td><td>日野市外から申し込む場合</td></tr>
<tr><td>転園</td><td>-5</td><td>認可園に在園中で別の園への転園希望</td></tr>
<tr><td>同居親族が保育可能</td><td>-3</td><td>同居の祖父母等が保育できる場合</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>認可外保育施設の利用で+3点、育休復帰予定で+2点。これらを組み合わせると基本40点に+5点で45点に。人気園では調整指数の有無が当落を分けます。</p>
</div>

<h2>認可外保育施設の活用</h2>
<p>認可外保育施設に月ぎめで預けると+3点の加点が得られます。一時保育は対象外です。費用はかかりますが、入園可能性を高める有効な手段です。</p>`,
    publishedAt: "2026-04-07",
    popularity: 65,
  },

  // ========== 保活の基本 ==========
  {
    slug: "required-documents",
    citySlug: "hino",
    title: "日野市の保育園申込に必要な書類一覧",
    description:
      "日野市の認可保育園に申し込む際に必要な書類をまとめました。就労証明書の注意点も解説します。",
    image:
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>必要書類の一覧</h2>
<p>日野市の認可保育園の申込には、以下の書類が必要です。書類不備があると受理されないことがあるため、早めに準備しましょう。</p>

<h3>全員共通の書類</h3>
<ul>
<li>保育所等入所申込書</li>
<li>家庭状況調査票</li>
<li>マイナンバーに係る書類（番号確認・本人確認）</li>
<li>保育を必要とする事由を証明する書類（父母それぞれ）</li>
</ul>

<h3>就労の場合</h3>
<ul>
<li>就労証明書（勤務先が記入・押印）</li>
<li>自営業の場合は開業届の写しや確定申告書の写し</li>
</ul>

<h3>その他の事由の場合</h3>
<ul>
<li>疾病：診断書</li>
<li>障害：障害者手帳の写し</li>
<li>介護：被介護者の診断書・介護保険証の写し</li>
<li>就学：在学証明書・時間割</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>就労証明書は勤務先に記入してもらう書類です。年末は企業の人事部も繁忙期のため、10月頃には早めに依頼しましょう。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>申込書類は<a href="https://www.city.hino.lg.jp/kosodate/hoikuen/nyuen/index.html" target="_blank" rel="noopener">日野市公式サイト</a>からダウンロードできます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 50,
  },

  // ========== 園えらび ==========
  {
    slug: "nursery-types",
    citySlug: "hino",
    title: "日野市の保育施設の種類　認可園・小規模・認証の違い",
    description:
      "日野市にある保育施設の種類と特徴を比較します。認可保育園・小規模保育・認証保育所の違いを理解しましょう。",
    image:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=400&fit=crop",
    category: "園えらび",
    categoryColor: "purple",
    content: `<h2>日野市の保育施設の種類</h2>
<p>日野市には約35か所の認可保育園のほか、小規模保育事業所や認証保育所など複数の種類の保育施設があります。それぞれの特徴を理解して園選びに活かしましょう。</p>

<h3>認可保育園</h3>
<p>国の基準を満たし、市が認可した保育施設です。0歳児から5歳児まで受け入れ、定員は60〜150名程度。保育料は世帯の所得に応じて決まります。</p>

<h3>小規模保育事業所（A型・B型）</h3>
<p>0〜2歳児が対象で定員6〜19名の小さな施設です。3歳児クラスからは連携施設や認可保育園に転園する必要があります。少人数で手厚い保育が特徴です。</p>

<h3>認証保育所（東京都独自の制度）</h3>
<p>東京都が認証した保育施設で、認可外保育施設の一種です。利用調整の対象外のため、園に直接申し込みます。保育料は施設ごとに異なります。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>認証保育所に月ぎめで預けると、認可園の申込で調整指数+3点の加点が得られます。認可園の結果を待ちながら認証保育所を利用する戦略も有効です。</p>
</div>

<h3>企業主導型保育施設</h3>
<p>企業が従業員のために設置する保育施設で、地域枠として一般の方も利用できる場合があります。利用調整の対象外です。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>日野市内の保育施設一覧は<a href="https://www.city.hino.lg.jp/kosodate/hoikuen/nyuen/index.html" target="_blank" rel="noopener">日野市公式サイト</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 45,
  },

  // ========== データ分析 ==========
  {
    slug: "age-class-competition",
    citySlug: "hino",
    title: "日野市の年齢別クラスの競争率　何歳児が入りやすい？",
    description:
      "日野市の保育園は年齢クラスによって入りやすさが異なります。0歳児・1歳児・3歳児の傾向を解説します。",
    image:
      "https://images.unsplash.com/photo-1460518451285-97b6aa326961?w=800&h=400&fit=crop",
    category: "データ分析",
    categoryColor: "teal",
    content: `<h2>年齢クラスごとの競争率</h2>
<p>日野市の保育園は年齢クラスによって定員枠と申込数が大きく異なります。一般的な傾向を把握して保活の戦略を立てましょう。</p>

<h3>1歳児クラス（最激戦）</h3>
<p>育休明けの申込が集中する1歳児クラスは最も競争が激しいクラスです。定員枠が少ない園も多く、フルタイム共働き40点でも加点がないと厳しい場合があります。</p>

<h3>0歳児クラス（比較的入りやすい）</h3>
<p>0歳児クラスは受入開始月齢（生後57日〜、生後6か月〜など）が園によって異なりますが、1歳児に比べると競争は緩やかです。早めの復帰を検討できる場合は有利です。</p>

<h3>3歳児クラス（定員増で入りやすい）</h3>
<p>3歳児クラスは多くの園で定員が大幅に増えるため、比較的入りやすい傾向があります。小規模保育事業所からの転園組の受け皿にもなっています。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>日野市では1歳児クラスの競争が最も激しいため、0歳児での入園も視野に入れると選択肢が広がります。</p>
</div>

<h2>日野駅・豊田駅周辺の傾向</h2>
<p>駅周辺は共働き世帯が多く競争率が高い傾向にあります。通勤経路上の少し離れたエリアも候補に加えると入園の可能性が上がります。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>各園の空き状況は<a href="https://www.city.hino.lg.jp/kosodate/hoikuen/nyuen/index.html" target="_blank" rel="noopener">日野市公式サイト</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 60,
  },

  // ========== 点数アップ ==========
  {
    slug: "dual-income-strategy",
    citySlug: "hino",
    title: "日野市の共働き世帯が入園するための戦略",
    description:
      "日野市でフルタイム共働き（40点）の世帯が確実に入園するための加点戦略と園選びのコツを解説します。",
    image:
      "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>フルタイム共働き40点がスタートライン</h2>
<p>日野市では父母とも月20日以上・日8時間以上のフルタイム勤務であれば、父20点＋母20点＝<span class="highlight">基本40点</span>になります。多くの申込者がこの40点に並ぶため、調整指数の加点が勝負を分けます。</p>

<h2>加点を積み上げる方法</h2>
<div class="step">
<div class="step-num">1</div>
<div class="step-content">
<strong>認可外保育施設を活用（+3点）</strong>
<p>認可外保育施設や認証保育所に月ぎめで預けると+3点。費用はかかりますが、入園可能性を大きく高めます。</p>
</div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content">
<strong>育休復帰のタイミングを合わせる（+2点）</strong>
<p>育児休業から入園月に復帰する場合は+2点の加点があります。</p>
</div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content">
<strong>きょうだいがいる場合（+2〜3点）</strong>
<p>きょうだいが在園中なら+3点、同時申込なら+2点です。</p>
</div>
</div>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>認可外利用+3点と育休復帰+2点で合計45点。きょうだい在園も加われば48点。日野市の人気園でも十分に戦える点数です。</p>
</div>

<h2>希望園は多めに書く</h2>
<p>日野市では希望園を多く書いても不利にはなりません。通える範囲の園はすべて記入して入園の可能性を広げましょう。新設園や駅から離れた園は倍率が低い傾向があります。</p>

<h2>減点に注意</h2>
<p>同居の祖父母が保育可能な場合は-3点になります。転園希望の場合は-5点と大きな減点です。申込前に自分の世帯に減点がないか確認しましょう。</p>`,
    publishedAt: "2026-04-07",
    popularity: 55,
  },

  // ========== 制度を知る ==========
  {
    slug: "single-parent-support",
    citySlug: "hino",
    title: "日野市のひとり親世帯の保育園入園　優遇制度と加点",
    description:
      "日野市のひとり親世帯が保育園入園で受けられる優遇措置や加点を解説します。利用できる支援制度もまとめました。",
    image:
      "https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=800&h=400&fit=crop",
    category: "制度を知る",
    categoryColor: "rose",
    content: `<h2>ひとり親世帯の調整指数</h2>
<p>日野市ではひとり親世帯に対して調整指数<span class="highlight">+5点</span>の加点があります。基本指数と合わせると入園選考で有利になります。</p>

<h2>ひとり親世帯の点数シミュレーション</h2>
<table>
<tr><th>状況</th><th>合計点</th></tr>
<tr><td>フルタイム就労（20点）＋ひとり親加点（+5点）</td><td>25点</td></tr>
<tr><td>パート月16日以上・日6時間以上（16点）＋ひとり親加点（+5点）</td><td>21点</td></tr>
<tr><td>求職中（6点）＋ひとり親加点（+5点）</td><td>11点</td></tr>
</table>

<p>ひとり親世帯は片方の保護者の基本指数のみとなりますが、ひとり親加点+5点により、共働き世帯（40点）に近い点数で選考を受けられます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>ひとり親加点に加え、認可外保育施設の利用（+3点）などを組み合わせると、さらに入園の可能性が高まります。</p>
</div>

<h2>ひとり親世帯が利用できる支援制度</h2>
<ul>
<li>児童扶養手当</li>
<li>ひとり親家庭等医療費助成</li>
<li>母子父子寡婦福祉資金貸付</li>
<li>保育料の減免（住民税非課税世帯は無料）</li>
</ul>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>日野市のひとり親支援については<a href="https://www.city.hino.lg.jp/kosodate/index.html" target="_blank" rel="noopener">日野市公式サイト 子育て</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 40,
  },

  // ========== データ分析 ==========
  {
    slug: "waiting-child-status",
    citySlug: "hino",
    title: "日野市の待機児童の現状と入園のしやすさ",
    description:
      "日野市の待機児童数の推移と保育園の入りやすさの傾向を解説します。エリア別の特徴もまとめました。",
    image:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=400&fit=crop",
    category: "データ分析",
    categoryColor: "teal",
    content: `<h2>日野市の待機児童の推移</h2>
<p>日野市は多摩地域中部に位置する人口約19万人の市です。新選組ゆかりの地としても知られ、ファミリー層の居住者が多いエリアです。近年は保育施設の整備が進み、待機児童数は減少傾向にあります。</p>

<h2>エリア別の特徴</h2>
<h3>競争が激しいエリア</h3>
<ul>
<li>日野駅周辺：中央線沿線で通勤利便性が高く、共働き世帯が集中</li>
<li>豊田駅周辺：マンション開発が進み、子育て世帯が増加中</li>
<li>高幡不動駅周辺：多摩モノレール乗換で利便性が高い</li>
</ul>

<h3>比較的入りやすいエリア</h3>
<ul>
<li>万願寺・甲州街道沿い：駅から離れるが競争は緩やか</li>
<li>三沢・程久保エリア：自然が豊かで園庭が広い園が多い</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>日野市は新設園の開設や定員拡大を継続しています。最新の空き状況は毎月更新されるため、定期的に確認しましょう。</p>
</div>

<h2>入園しやすくするには</h2>
<p>人気エリアだけでなく、通勤経路上の園や隣接エリアの園も候補に入れると入園の可能性が広がります。希望園は記入欄いっぱいに書きましょう。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>最新の待機児童・空き状況は<a href="https://www.city.hino.lg.jp/kosodate/hoikuen/nyuen/index.html" target="_blank" rel="noopener">日野市公式サイト</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 50,
  },
];

registerArticles(articles);
