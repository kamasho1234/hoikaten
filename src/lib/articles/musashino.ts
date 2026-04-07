import type { Article } from "./types";
import { registerArticles } from "./index";

const articles: Article[] = [
  {
    slug: "hokatsu-schedule",
    citySlug: "musashino",
    title: "武蔵野市の保活スケジュール　申込から内定までの流れ",
    description:
      "武蔵野市の認可保育園の申込時期・選考の流れをまとめました。令和8年度4月入園のスケジュールを中心に解説します。",
    image: "https://images.unsplash.com/photo-1484820540004-14229fe36ca4?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>武蔵野市の4月入園スケジュール</h2>
<p>武蔵野市の認可保育園は毎年秋に翌年度4月入園の申込を受付けます。子ども家庭部子ども育成課が窓口です。市内には認可保育園が約35か所あり、毎年多くの家庭が保活に取り組んでいます。</p>

<h3>保活の全体スケジュール</h3>
<div class="step">
<div class="step-num">1</div>
<div class="step-content">
<strong>4月〜6月：情報収集</strong>
<p>武蔵野市の公式サイトや「保育園入園のご案内」で保育園の一覧や制度を確認します。</p>
</div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content">
<strong>6月〜9月：保育園見学</strong>
<p>気になる園に連絡して見学を予約しましょう。吉祥寺エリアは人気が高いため早めの行動が大切です。</p>
</div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content">
<strong>9月〜10月：入園案内の入手・書類準備</strong>
<p>最新の入園案内を入手し、就労証明書などの書類を準備します。</p>
</div>
</div>
<div class="step">
<div class="step-num">4</div>
<div class="step-content">
<strong>10月〜11月：申込書類の提出</strong>
<p>子ども育成課の窓口または郵送で提出します。</p>
</div>
</div>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>武蔵野市は基本指数が父母各最大12点（合計24点満点）です。週あたりの勤務日数と時間の組み合わせで判定されます。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳しくは<a href="https://www.city.musashino.lg.jp/kosodate/hoikuen_youchien/index.html" target="_blank" rel="noopener">武蔵野市公式サイト</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 60,
  },
  {
    slug: "scoring-system-guide",
    citySlug: "musashino",
    title: "武蔵野市の入園点数のしくみ　基本指数と調整指数を解説",
    description:
      "武蔵野市の保育園入園選考で使われる基本指数と調整指数のしくみを、初めての方にもわかるように解説します。",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop",
    category: "点数を知る",
    categoryColor: "blue",
    content: `<h2>武蔵野市の選考指数とは</h2>
<p>武蔵野市の認可保育園の入園選考は「基本指数＋調整指数」の合計で行われます。点数が高い順に内定が決まります。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>選考指数 = 基本指数（保護者1 + 保護者2）+ 調整指数</p>
</div>

<h2>基本指数（父母各最大12点、合計24点）</h2>
<p>父母それぞれの「保育が必要な理由」を点数化したものです。就労の場合、週5日以上かつ週40時間以上で満点の<span class="highlight">12点</span>になります。</p>

<table>
<tr><th>就労日数・時間</th><th>指数</th></tr>
<tr><td>週5日以上かつ週40時間以上</td><td>12</td></tr>
<tr><td>週5日以上かつ週35時間以上</td><td>11</td></tr>
<tr><td>週4日以上かつ週28時間以上</td><td>10</td></tr>
<tr><td>週4日以上かつ週24時間以上</td><td>9</td></tr>
<tr><td>週3日以上かつ週20時間以上</td><td>8</td></tr>
<tr><td>週3日以上かつ週16時間以上</td><td>7</td></tr>
<tr><td>月48時間以上64時間未満</td><td>6</td></tr>
</table>

<h2>調整指数の代表例</h2>
<ul>
<li>ひとり親世帯：<span class="highlight">+3点</span></li>
<li>きょうだい在園（同園希望）：<span class="highlight">+2点</span></li>
<li>認可外保育施設利用（月ぎめ3か月以上）：<span class="highlight">+2点</span></li>
<li>生活保護世帯：<span class="highlight">+2点</span></li>
<li>育休復帰予定：<span class="highlight">+1点</span></li>
<li>市外申込：<span class="highlight">-6点</span></li>
</ul>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>全項目は<a href="https://www.city.musashino.lg.jp/kosodate/hoikuen_youchien/index.html" target="_blank" rel="noopener">武蔵野市公式サイト</a>の入園案内で確認できます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 70,
  },
  {
    slug: "work-points-detail",
    citySlug: "musashino",
    title: "武蔵野市のパート・時短勤務の点数　何時間で何点もらえる？",
    description:
      "武蔵野市の保育園入園で、パートや時短勤務の場合にもらえる基本指数を詳しく解説します。",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop",
    category: "点数を知る",
    categoryColor: "blue",
    content: `<h2>就労パターン別の基本指数</h2>
<p>武蔵野市では週あたりの勤務日数と勤務時間の組み合わせで基本指数が決まります。フルタイムでなくても点数が付きます。</p>

<table>
<tr><th>勤務パターン</th><th>指数</th></tr>
<tr><td>週5日以上・週40時間以上</td><td>12</td></tr>
<tr><td>週5日以上・週35時間以上</td><td>11</td></tr>
<tr><td>週4日以上・週28時間以上</td><td>10</td></tr>
<tr><td>週4日以上・週24時間以上</td><td>9</td></tr>
<tr><td>週3日以上・週20時間以上</td><td>8</td></tr>
<tr><td>週3日以上・週16時間以上</td><td>7</td></tr>
<tr><td>月48時間以上64時間未満</td><td>6</td></tr>
</table>

<h2>パートで入園を目指すには</h2>
<p>週3日・1日6時間のパートなら週18時間で<span class="highlight">8点</span>です。フルタイム12点との差は4点。調整指数の加点でカバーできる可能性があります。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>武蔵野市の入所要件は月48時間以上の就労です。これを下回ると申込みそのものができません。週3日・週16時間以上が最低ラインになります。</p>
</div>

<h2>時短勤務の場合</h2>
<p>育休復帰後に時短勤務（1日6時間）を予定している場合、週5日勤務なら週30時間で<span class="highlight">11点</span>が見込めます。フルタイムとの差はわずか1点です。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>就労証明書の記載内容で判定されます。詳しくは<a href="https://www.city.musashino.lg.jp/kosodate/hoikuen_youchien/index.html" target="_blank" rel="noopener">武蔵野市公式サイト</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 55,
  },
  {
    slug: "adjustment-points",
    citySlug: "musashino",
    title: "武蔵野市で点数を上げる方法　調整指数の加点チェックリスト",
    description:
      "武蔵野市の保育園入園選考で調整指数の加点を最大限に活用する方法をチェックリスト形式で解説します。",
    image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>基本指数24点は出発点</h2>
<p>武蔵野市ではフルタイム共働き世帯は基本指数<span class="highlight">24点</span>で横並びです。差がつくのは調整指数の部分。1点でも多く加点を積み上げることが重要です。</p>

<h2>加点チェックリスト</h2>
<table>
<tr><th>項目</th><th>点数</th><th>条件</th></tr>
<tr><td>ひとり親</td><td>+3</td><td>ひとり親世帯であること</td></tr>
<tr><td>きょうだい在園（同園希望）</td><td>+2</td><td>きょうだいが在園中の同じ園を希望</td></tr>
<tr><td>認可外保育施設利用</td><td>+2</td><td>月ぎめで3か月以上利用中</td></tr>
<tr><td>生活保護世帯</td><td>+2</td><td>生活保護を受給中</td></tr>
<tr><td>同時申込</td><td>+1</td><td>きょうだいを同時に申し込む</td></tr>
<tr><td>育休復帰予定</td><td>+1</td><td>入園月に育休から復帰する</td></tr>
</table>

<h2>認可外保育施設の活用</h2>
<p>認可外保育施設に月ぎめで3か月以上預けている場合、<span class="highlight">+2点</span>の加点が得られます。一時保育は対象外です。費用はかかりますが、人気園を狙うなら検討する価値があります。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>武蔵野市は吉祥寺エリアを中心に競争が激しい地域です。加点を取れるものは確実に取りましょう。</p>
</div>

<h2>減点項目にも注意</h2>
<ul>
<li>市外からの申込：<span class="highlight">-6点</span></li>
<li>同居親族が保育可能：<span class="highlight">-2点</span></li>
<li>転園希望：<span class="highlight">-3点</span></li>
</ul>
<p>減点項目に該当しないか事前に確認しておきましょう。</p>`,
    publishedAt: "2026-04-07",
    popularity: 65,
  },
  {
    slug: "required-documents",
    citySlug: "musashino",
    title: "武蔵野市の保育園申込に必要な書類一覧",
    description:
      "武蔵野市の認可保育園の入園申込に必要な書類をまとめました。書類の不備で不受理にならないよう、事前にチェックしましょう。",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>基本の提出書類</h2>
<p>武蔵野市の認可保育園に申し込む際は、以下の書類が必要です。子ども家庭部子ども育成課の窓口または郵送で提出します。</p>

<h3>全員が必要な書類</h3>
<ul>
<li>教育・保育給付認定申請書兼保育所等入所申込書</li>
<li>保育が必要であることを証明する書類（就労証明書など）</li>
<li>マイナンバー関連書類</li>
</ul>

<h3>就労の場合</h3>
<div class="step">
<div class="step-num">1</div>
<div class="step-content">
<strong>就労証明書</strong>
<p>勤務先に記入してもらいます。武蔵野市の指定様式を使用してください。</p>
</div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content">
<strong>自営業の場合</strong>
<p>就労状況申告書と確定申告書の写しなどが必要です。</p>
</div>
</div>

<h3>状況に応じて必要な書類</h3>
<table>
<tr><th>状況</th><th>追加書類</th></tr>
<tr><td>疾病・障害</td><td>診断書・障害者手帳の写し</td></tr>
<tr><td>介護</td><td>介護状況申告書・被介護者の診断書</td></tr>
<tr><td>求職中</td><td>求職活動状況申告書</td></tr>
<tr><td>ひとり親</td><td>児童扶養手当証書の写しなど</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>就労証明書は勤務先に依頼してから返却まで2〜4週間かかることもあります。早めに依頼しましょう。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>書類の様式は<a href="https://www.city.musashino.lg.jp/kosodate/hoikuen_youchien/index.html" target="_blank" rel="noopener">武蔵野市公式サイト</a>からダウンロードできます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 50,
  },
  {
    slug: "nursery-types",
    citySlug: "musashino",
    title: "武蔵野市の保育園の種類　認可・認証・小規模の違い",
    description:
      "武蔵野市にある保育園の種類と特徴を解説します。認可保育園、認証保育所、小規模保育事業所の違いを知って園選びに役立てましょう。",
    image: "https://images.unsplash.com/photo-1587654780291-39c9404d7dd0?w=800&h=400&fit=crop",
    category: "園えらび",
    categoryColor: "purple",
    content: `<h2>武蔵野市の保育施設の種類</h2>
<p>武蔵野市には約35か所の認可保育園のほか、認証保育所や小規模保育事業所など複数の保育施設があります。それぞれの特徴を理解して園選びに活かしましょう。</p>

<h3>認可保育園</h3>
<p>国の基準を満たし、武蔵野市が入園選考を行う保育施設です。保育料は世帯の所得に応じて決まります。0歳〜5歳児クラスまであるのが一般的です。</p>

<h3>認証保育所（東京都独自の制度）</h3>
<p>東京都が独自に認証した保育施設です。認可保育園と異なり、園に直接申し込みます。保育料は園ごとに設定されており、武蔵野市の補助金制度を利用できます。</p>

<h3>小規模保育事業所</h3>
<p>定員19人以下の小さな保育施設で、0〜2歳児が対象です。3歳以降は連携園や幼稚園への転園が必要です。</p>

<table>
<tr><th>種類</th><th>対象年齢</th><th>申込先</th><th>保育料</th></tr>
<tr><td>認可保育園</td><td>0〜5歳</td><td>武蔵野市</td><td>所得に応じて決定</td></tr>
<tr><td>認証保育所</td><td>0〜5歳</td><td>各園に直接</td><td>園ごとに設定</td></tr>
<tr><td>小規模保育</td><td>0〜2歳</td><td>武蔵野市</td><td>所得に応じて決定</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>認可外（認証保育所含む）に預けてから認可保育園に申し込むと、調整指数で+2点の加点がもらえます。保活戦略として活用する家庭も多いです。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>武蔵野市内の保育施設一覧は<a href="https://www.city.musashino.lg.jp/kosodate/hoikuen_youchien/index.html" target="_blank" rel="noopener">武蔵野市公式サイト</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 45,
  },
  {
    slug: "age-class-competition",
    citySlug: "musashino",
    title: "武蔵野市の年齢別・クラス別の入園競争率",
    description:
      "武蔵野市の保育園入園で、0歳児・1歳児・2歳児クラスごとの競争の傾向を解説します。",
    image: "https://images.unsplash.com/photo-1460518451285-97b6aa326961?w=800&h=400&fit=crop",
    category: "データ分析",
    categoryColor: "teal",
    content: `<h2>年齢別の競争傾向</h2>
<p>武蔵野市は人口約15万人の都市で、吉祥寺を中心に子育て世帯に人気があります。年齢クラスによって入園の難易度が大きく変わります。</p>

<h3>1歳児クラス：最も競争が激しい</h3>
<p>育休明けの4月入園を狙う家庭が集中するため、1歳児クラスは最も定員に対する申込者が多くなります。フルタイム共働き（基本指数24点）に加えて、調整指数の加点がないと厳しい園もあります。</p>

<h3>0歳児クラス：入りやすいが園が限られる</h3>
<p>0歳児クラスは定員が少ないものの、申込者も少なめです。ただし0歳児保育を実施していない園もあるため選択肢が限られます。</p>

<h3>3歳児クラス：定員増で比較的入りやすい</h3>
<p>3歳児クラスは持ち上がりに加えて定員が増える園が多く、新規の入園枠が生まれます。小規模保育事業所の卒園児の受け皿にもなっています。</p>

<table>
<tr><th>年齢クラス</th><th>競争の傾向</th><th>目安の必要点数</th></tr>
<tr><td>0歳児</td><td>やや入りやすい</td><td>24点前後</td></tr>
<tr><td>1歳児</td><td>最も激戦</td><td>25〜27点</td></tr>
<tr><td>2歳児</td><td>激戦</td><td>24〜26点</td></tr>
<tr><td>3歳児以上</td><td>比較的入りやすい</td><td>24点前後</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>吉祥寺エリアは特に競争が激しいため、エリアを広げて申し込むのも有効な戦略です。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 60,
  },
  {
    slug: "dual-income-strategy",
    citySlug: "musashino",
    title: "武蔵野市の共働き家庭の保活戦略　24点からの上積み",
    description:
      "武蔵野市でフルタイム共働き家庭が保活を成功させるための戦略を解説します。基本指数24点からどう加点するかがカギです。",
    image: "https://images.unsplash.com/photo-1590650153855-d9e808231d41?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>フルタイム共働き24点は最低ライン</h2>
<p>武蔵野市でフルタイム共働きの場合、基本指数は父母各12点の合計<span class="highlight">24点</span>です。人気園ではこの24点で横並びになるため、調整指数の加点が勝負を分けます。</p>

<h2>加点を積み上げる3つの方法</h2>

<h3>1. 認可外保育施設を活用する</h3>
<p>月ぎめで3か月以上預けると<span class="highlight">+2点</span>。費用はかかりますが、吉祥寺エリアの人気園を狙うなら効果的です。</p>

<h3>2. 育休復帰のタイミングを合わせる</h3>
<p>入園月に育休から復帰する場合、<span class="highlight">+1点</span>の加点があります。復帰時期を4月に合わせましょう。</p>

<h3>3. きょうだい在園を活かす</h3>
<p>上の子が通っている園と同じ園を希望すると<span class="highlight">+2点</span>。同時申込でも<span class="highlight">+1点</span>が付きます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>最大で24点+2点（認可外）+1点（育休復帰）+2点（きょうだい在園）=<span class="highlight">29点</span>まで積み上げ可能です。使える加点はすべて活用しましょう。</p>
</div>

<h2>希望園は多めに書く</h2>
<p>武蔵野市では希望園を複数書いても不利にはなりません。通える範囲の園はすべて記入して、内定の可能性を最大化しましょう。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>調整指数の全項目は<a href="https://www.city.musashino.lg.jp/kosodate/hoikuen_youchien/index.html" target="_blank" rel="noopener">武蔵野市公式サイト</a>の入園案内で確認できます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 55,
  },
  {
    slug: "single-parent-support",
    citySlug: "musashino",
    title: "武蔵野市のひとり親家庭の保育園入園　加点と支援制度",
    description:
      "武蔵野市でひとり親家庭が保育園に入園する際の加点や、利用できる支援制度をまとめました。",
    image: "https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=800&h=400&fit=crop",
    category: "制度を知る",
    categoryColor: "rose",
    content: `<h2>ひとり親家庭の加点</h2>
<p>武蔵野市ではひとり親世帯に対して調整指数で<span class="highlight">+3点</span>の加点があります。基本指数と合わせて有利に選考を受けられます。</p>

<h3>ひとり親の基本指数の考え方</h3>
<p>ひとり親の場合、保護者2の基本指数は「不存在」として最大の12点が付きます。つまり、保護者1がフルタイム勤務なら基本指数は<span class="highlight">24点</span>、さらにひとり親加点で<span class="highlight">27点</span>になります。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>ひとり親＋フルタイム＋認可外利用で24+3+2=<span class="highlight">29点</span>。多くの園で十分に内定圏内に入れる点数です。</p>
</div>

<h2>ひとり親が利用できる支援制度</h2>
<ul>
<li>児童扶養手当（国の制度）</li>
<li>ひとり親家庭等医療費助成（武蔵野市）</li>
<li>保育料の減免制度</li>
<li>武蔵野市ひとり親家庭ホームヘルプサービス</li>
</ul>

<h2>必要な書類</h2>
<p>ひとり親の加点を受けるには、以下のいずれかの書類が必要です。</p>
<ul>
<li>児童扶養手当証書の写し</li>
<li>戸籍謄本（ひとり親であることが確認できるもの）</li>
</ul>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>ひとり親支援制度の詳細は<a href="https://www.city.musashino.lg.jp/kosodate/hitorioya/index.html" target="_blank" rel="noopener">武蔵野市公式サイト</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 40,
  },
  {
    slug: "waiting-child-status",
    citySlug: "musashino",
    title: "武蔵野市の待機児童の現状と今後の見通し",
    description:
      "武蔵野市の待機児童数の推移と、市が進めている対策をまとめました。保活の参考にしてください。",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=400&fit=crop",
    category: "データ分析",
    categoryColor: "teal",
    content: `<h2>武蔵野市の待機児童対策</h2>
<p>武蔵野市は待機児童の解消に力を入れており、認可保育園の新設や定員拡大を継続的に進めています。市内には約35か所の認可保育園があります。</p>

<h2>エリア別の傾向</h2>
<h3>吉祥寺エリア</h3>
<p>武蔵野市で最も人気が高く、競争も激しいエリアです。商業施設や公園が充実し、子育て世帯に人気があります。</p>

<h3>三鷹駅・武蔵境駅周辺</h3>
<p>吉祥寺エリアに比べると競争は緩やかですが、駅近の園は人気があります。</p>

<h3>市の北部エリア</h3>
<p>比較的入りやすい傾向がありますが、園の数自体が少ない地域もあります。</p>

<h2>今後の見通し</h2>
<ul>
<li>新規保育園の開設による定員増</li>
<li>小規模保育事業所の卒園児対策として連携園の拡充</li>
<li>申請手続きのオンライン化による利便性向上</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>新設園は初年度に空きが出やすいため、保活では要チェックです。武蔵野市の公式サイトで最新の整備計画を確認しましょう。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>最新の待機児童数や保育園整備情報は<a href="https://www.city.musashino.lg.jp/kosodate/hoikuen_youchien/index.html" target="_blank" rel="noopener">武蔵野市公式サイト</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 50,
  },
];

registerArticles(articles);
