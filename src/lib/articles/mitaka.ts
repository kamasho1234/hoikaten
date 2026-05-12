import type { Article } from "./types";
import { registerArticles } from "./index";

const articles: Article[] = [
  {
    slug: "hokatsu-schedule",
    citySlug: "mitaka",
    title: "三鷹市の保活スケジュール　申込から内定までの流れ",
    description:
      "三鷹市の認可保育園の申込時期・選考の流れをまとめました。令和8年度4月入園の動き方を解説します。",
    image: "https://images.unsplash.com/photo-1484820540004-14229fe36ca4?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>三鷹市の4月入園スケジュール</h2>
<p>三鷹市の認可保育園は毎年秋に翌年度4月入園の申込を受付けます。子ども政策部保育園管理運営課が窓口です。</p>

<h3>保活の全体スケジュール</h3>
<div class="step">
<div class="step-num">1</div>
<div class="step-content">
<strong>4月〜6月：情報収集</strong>
<p>三鷹市の公式サイトで保育園の一覧や前年度の入園のしおりを確認します。市内には認可保育園が約40か所あります。</p>
</div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content">
<strong>6月〜9月：保育園見学</strong>
<p>気になる園に電話して見学を予約しましょう。三鷹市は住宅街に園が点在しているため、自宅からの距離を実際に確認することが大切です。</p>
</div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content">
<strong>9月〜10月：入園のしおり入手・書類準備</strong>
<p>最新のしおりを入手し、就労証明書や課税証明書などを準備します。</p>
</div>
</div>
<div class="step">
<div class="step-num">4</div>
<div class="step-content">
<strong>10月〜11月：申込書類の提出</strong>
<p>子ども政策部保育園管理運営課の窓口または郵送で提出します。</p>
</div>
</div>
<div class="step">
<div class="step-num">5</div>
<div class="step-content">
<strong>1月下旬〜2月：選考結果の通知</strong>
<p>内定または不承諾の通知が届きます。不承諾の場合は二次募集に申し込めます。</p>
</div>
</div>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>三鷹市は基本指数が父母各最大10点（合計20点満点）です。週あたりの勤務日数と勤務時間の組み合わせで判定されます。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳しくは<a href="https://www.city.mitaka.lg.jp/c_categories/index03003001.htmlc_00704/" target="_blank" rel="noopener">三鷹市公式サイト 保育園入園案内</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 60,
  },
  {
    slug: "scoring-system-guide",
    citySlug: "mitaka",
    title: "三鷹市の入園点数のしくみ　基本指数と調整指数を解説",
    description:
      "三鷹市の保育園入園選考で使われる基本指数と調整指数のしくみを解説します。",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop",
    category: "点数を知る",
    categoryColor: "blue",
    content: `<h2>三鷹市の選考指数とは</h2>
<p>三鷹市の認可保育園の入園選考は「基本指数＋調整指数」の合計で行われます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>選考指数 = 基本指数（保護者1 + 保護者2）+ 調整指数</p>
</div>

<h2>基本指数（父母各最大10点、合計20点）</h2>
<p>就労の場合、週5日以上かつ週40時間以上で満点の<span class="highlight">10点</span>になります。三鷹市は他の自治体と比べて最大点数が低めの配点体系です。</p>

<table>
<tr><th>勤務状況</th><th>指数</th></tr>
<tr><td>週5日以上かつ週40時間以上</td><td>10</td></tr>
<tr><td>週5日以上かつ週35時間以上</td><td>9</td></tr>
<tr><td>週4日以上かつ週28時間以上</td><td>8</td></tr>
<tr><td>週4日以上かつ週24時間以上</td><td>7</td></tr>
<tr><td>週3日以上かつ週20時間以上</td><td>6</td></tr>
<tr><td>週3日以上かつ週16時間以上</td><td>5</td></tr>
<tr><td>月48時間以上64時間未満</td><td>4</td></tr>
</table>

<h2>調整指数の代表例</h2>
<ul>
<li>ひとり親世帯：<span class="highlight">+2点</span></li>
<li>きょうだい在園（同園希望）：<span class="highlight">+2点</span></li>
<li>認可外保育施設利用（月ぎめ月48時間以上、3か月以上）：<span class="highlight">+2点</span></li>
<li>きょうだい同時申込：<span class="highlight">+1点</span></li>
<li>育休復帰予定：<span class="highlight">+1点</span></li>
<li>市外からの申込：<span class="highlight">-5点</span></li>
</ul>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>全項目は<a href="https://www.city.mitaka.lg.jp/c_categories/index03003001.htmlc_00704/" target="_blank" rel="noopener">三鷹市公式サイト 保育園入園案内</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 70,
  },
  {
    slug: "work-points-detail",
    citySlug: "mitaka",
    title: "三鷹市の就労状況別の点数　パート・時短・フルタイム",
    description:
      "三鷹市の保育園入園で就労状況ごとにもらえる基本指数を詳しく解説します。",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop",
    category: "点数を知る",
    categoryColor: "blue",
    content: `<h2>就労状況による基本指数</h2>
<p>三鷹市では週あたりの勤務日数と勤務時間の組み合わせで基本指数が決まります。フルタイムでなくても点数が付きます。</p>

<table>
<tr><th>勤務パターン</th><th>指数</th></tr>
<tr><td>週5日以上・週40時間以上（フルタイム）</td><td>10</td></tr>
<tr><td>週5日以上・週35時間以上40時間未満</td><td>9</td></tr>
<tr><td>週4日以上・週28時間以上35時間未満</td><td>8</td></tr>
<tr><td>週4日以上・週24時間以上28時間未満</td><td>7</td></tr>
<tr><td>週3日以上・週20時間以上24時間未満</td><td>6</td></tr>
<tr><td>週3日以上・週16時間以上20時間未満</td><td>5</td></tr>
<tr><td>月48時間以上64時間未満</td><td>4</td></tr>
</table>

<h2>パート勤務でも入園できる？</h2>
<p>週3日・週20時間のパートなら<span class="highlight">6点</span>です。フルタイム10点との差は4点。夫婦合計では最大8点差になりますが、調整指数で差を縮めることは可能です。</p>

<h2>時短勤務の注意点</h2>
<p>育休から時短勤務で復帰する場合、復帰後の勤務時間で判定されます。時短で週35時間以上なら9点です。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>三鷹市の最低ラインは月48時間以上（4点）です。これを下回ると就労での申込が難しくなります。求職中の場合は2点になります。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 55,
  },
  {
    slug: "adjustment-points",
    citySlug: "mitaka",
    title: "三鷹市の調整指数で加点する方法　知らないと損するテクニック",
    description:
      "三鷹市の保育園入園で調整指数の加点を最大限に活用する方法を解説します。",
    image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>基本指数20点は出発点</h2>
<p>三鷹市ではフルタイム共働き世帯は基本指数<span class="highlight">20点</span>で横並びです。差がつくのは調整指数の部分です。</p>

<h2>加点チェックリスト</h2>
<table>
<tr><th>項目</th><th>点数</th><th>条件</th></tr>
<tr><td>ひとり親</td><td>+2</td><td>ひとり親世帯であること</td></tr>
<tr><td>きょうだい在園（同園希望）</td><td>+2</td><td>きょうだいが在園中の同じ園を希望</td></tr>
<tr><td>認可外保育施設利用</td><td>+2</td><td>月ぎめ月48時間以上、3か月以上利用</td></tr>
<tr><td>きょうだい同時申込</td><td>+1</td><td>双子などきょうだいを同時に申し込む</td></tr>
<tr><td>育休復帰予定</td><td>+1</td><td>育児休業を取得し入園月に復帰する</td></tr>
<tr><td>生活保護世帯</td><td>+1</td><td>生活保護を受給している世帯</td></tr>
</table>

<h2>減点に注意</h2>
<table>
<tr><th>項目</th><th>点数</th><th>条件</th></tr>
<tr><td>市外からの申込</td><td>-5</td><td>三鷹市に在住していない</td></tr>
<tr><td>転園</td><td>-2</td><td>認可園に在園中で別の園への転園を希望</td></tr>
<tr><td>同居保育可能親族</td><td>-1</td><td>65歳未満の同居親族が保育できる</td></tr>
</table>

<h2>認可外保育施設の活用</h2>
<p>認可外保育施設に月ぎめ月48時間以上かつ3か月以上利用している場合、+2点の加点が得られます。三鷹市では他市より配点が低い分、この2点は非常に大きいです。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>三鷹市は基本指数の最大が20点と低い配点体系のため、調整指数の1点の重みが大きくなります。取れる加点は確実に取りましょう。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 65,
  },
  {
    slug: "required-documents",
    citySlug: "mitaka",
    title: "三鷹市の保育園申込に必要な書類チェックリスト",
    description:
      "三鷹市の認可保育園の申込で必要な書類を一覧にまとめました。準備漏れを防ぎましょう。",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>必要書類一覧</h2>
<p>三鷹市の認可保育園に申し込む際に必要な書類をまとめました。子ども政策部保育園管理運営課に提出します。</p>

<h3>全員が必要な書類</h3>
<ul>
<li>教育・保育給付認定申請書兼保育施設利用申込書</li>
<li>保育を必要とすることを証明する書類（父母それぞれ）</li>
<li>マイナンバー確認書類</li>
<li>本人確認書類</li>
</ul>

<h3>就労の場合</h3>
<div class="step">
<div class="step-num">1</div>
<div class="step-content">
<strong>就労証明書</strong>
<p>勤務先に記入してもらいます。三鷹市の所定の様式を使用してください。</p>
</div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content">
<strong>自営業の場合</strong>
<p>就労状況申告書と開業届の写し、確定申告書の写しなどが必要です。</p>
</div>
</div>

<h3>状況に応じて必要な書類</h3>
<ul>
<li>疾病・障害の場合：診断書または障害者手帳の写し</li>
<li>介護・看護の場合：介護状況申告書、被介護者の診断書など</li>
<li>出産の場合：母子健康手帳の写し</li>
<li>求職中の場合：求職活動状況申告書</li>
<li>ひとり親の場合：児童扶養手当証書の写しなど</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>就労証明書は勤務先に依頼してから受け取るまで2〜3週間かかることがあります。早めに依頼しましょう。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>書類の様式は<a href="https://www.city.mitaka.lg.jp/c_categories/index03003001.htmlc_00704/" target="_blank" rel="noopener">三鷹市公式サイト</a>からダウンロードできます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 50,
  },
  {
    slug: "nursery-types",
    citySlug: "mitaka",
    title: "三鷹市の保育施設の種類と選び方ガイド",
    description:
      "三鷹市にある認可保育園・小規模保育・認証保育所など、保育施設の種類と特徴を解説します。",
    image: "https://images.unsplash.com/photo-1587654780291-39c9404d7dd0?w=800&h=400&fit=crop",
    category: "園えらび",
    categoryColor: "purple",
    content: `<h2>三鷹市の保育施設の種類</h2>
<p>三鷹市には認可保育園を中心に約40か所の保育施設があります。施設の種類ごとの特徴を理解して、家庭に合った園を選びましょう。</p>

<h3>認可保育園</h3>
<p>市が認可した保育施設で、入園選考は三鷹市が一括して行います。公立園と私立園があり、保育料は世帯の所得に応じて決まります。</p>

<h3>小規模保育事業所</h3>
<p>0〜2歳児を対象とした定員19人以下の施設です。3歳からは連携園や他の園に転園する必要があります。少人数で手厚い保育が特徴です。</p>

<h3>認証保育所（東京都独自の制度）</h3>
<p>東京都が独自に認証した保育施設です。認可保育園とは別に直接園に申し込みます。認可外保育施設として利用すると調整指数で+2点の加点対象になります。</p>

<h3>家庭的保育（保育ママ）</h3>
<p>保育者の自宅で少人数の子どもを預かる制度です。0〜2歳児が対象で、定員は5人以下です。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>三鷹市は東京都多摩地域東部に位置し、ジブリ美術館がある街としても知られています。閑静な住宅街が多く、園の周辺環境も比較的良好です。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>施設の一覧は<a href="https://www.city.mitaka.lg.jp/c_categories/index03003001.html" target="_blank" rel="noopener">三鷹市公式サイト 保育施設一覧</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 45,
  },
  {
    slug: "age-class-competition",
    citySlug: "mitaka",
    title: "三鷹市の年齢別の倍率と入りやすいクラス",
    description:
      "三鷹市の保育園で年齢クラスごとの競争率の違いと入りやすさを解説します。",
    image: "https://images.unsplash.com/photo-1460518451285-97b6aa326961?w=800&h=400&fit=crop",
    category: "データ分析",
    categoryColor: "teal",
    content: `<h2>年齢クラスによる入りやすさの違い</h2>
<p>三鷹市の認可保育園は年齢クラスによって競争率が大きく異なります。人口約19万人の三鷹市では、特に1歳児クラスの競争が激しくなっています。</p>

<h3>クラス別の傾向</h3>
<table>
<tr><th>クラス</th><th>競争率</th><th>コメント</th></tr>
<tr><td>0歳児</td><td>やや高い</td><td>定員が少ないが申込者も限られる</td></tr>
<tr><td>1歳児</td><td>最も高い</td><td>育休明けの申込が集中する</td></tr>
<tr><td>2歳児</td><td>高い</td><td>小規模保育の卒園児が加わる</td></tr>
<tr><td>3歳児</td><td>比較的低い</td><td>持ち上がりで定員が埋まりにくい</td></tr>
<tr><td>4〜5歳児</td><td>低い</td><td>空きが出やすい</td></tr>
</table>

<h2>0歳児入園のメリット</h2>
<p>0歳児クラスは定員が少ないものの、申込者数も少ないため、1歳児クラスより入りやすい場合があります。ただし生後57日目以降など園によって受入月齢が異なります。</p>

<h2>1歳児クラスの対策</h2>
<p>1歳児クラスは最も競争が激しいクラスです。フルタイム共働き（基本指数20点）に加えて調整指数の加点がないと難しい園が多くなります。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>三鷹市は配点が低い分、同点勝負になりやすい傾向があります。希望園は通える範囲の園をすべて記入するのが基本です。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 60,
  },
  {
    slug: "dual-income-strategy",
    citySlug: "mitaka",
    title: "三鷹市の共働き世帯の保活戦略　20点からの勝ち方",
    description:
      "三鷹市でフルタイム共働き世帯が保育園に入るための戦略を解説します。",
    image: "https://images.unsplash.com/photo-1590650153855-d9e808231d41?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>フルタイム共働きの基本指数</h2>
<p>三鷹市では父母ともにフルタイム（週5日以上・週40時間以上）で基本指数は<span class="highlight">20点</span>です。多くの世帯がこの点数で並ぶため、調整指数で差をつける必要があります。</p>

<h2>加点を確保する3つの方法</h2>
<div class="step">
<div class="step-num">1</div>
<div class="step-content">
<strong>認可外保育施設を利用する（+2点）</strong>
<p>認証保育所や認可外保育施設に月ぎめ月48時間以上かつ3か月以上預けると+2点。三鷹市では最も現実的な加点手段です。</p>
</div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content">
<strong>育休復帰のタイミングを合わせる（+1点）</strong>
<p>育児休業を取得して入園月に復帰する場合は+1点です。復帰日を4月中に設定しましょう。</p>
</div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content">
<strong>きょうだい在園の園を希望する（+2点）</strong>
<p>上の子が在園中の園に下の子を申し込むと+2点。第2子以降の保活では最も大きな加点です。</p>
</div>
</div>

<h2>減点を避ける</h2>
<p>同居の祖父母（65歳未満）がいると-1点になります。同居の定義は住民票上の同一世帯です。世帯分離している場合は該当しないケースもあるため、窓口で確認しましょう。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>三鷹市は基本指数の最大が20点と低い配点のため、ほとんどの共働き世帯が満点で横並びになります。調整指数の1〜2点が勝負を分けます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 55,
  },
  {
    slug: "single-parent-support",
    citySlug: "mitaka",
    title: "三鷹市のひとり親世帯の加点と支援制度",
    description:
      "三鷹市でひとり親世帯が保育園入園時に受けられる加点と各種支援制度をまとめました。",
    image: "https://images.unsplash.com/photo-1476234251651-f353f9217b7c?w=800&h=400&fit=crop",
    category: "制度を知る",
    categoryColor: "rose",
    content: `<h2>ひとり親世帯の調整指数</h2>
<p>三鷹市ではひとり親世帯に調整指数<span class="highlight">+2点</span>が加算されます。基本指数と合わせて優先的に入園できる仕組みです。</p>

<h2>ひとり親の認定に必要な書類</h2>
<ul>
<li>児童扶養手当証書の写し</li>
<li>戸籍謄本（離婚の場合）</li>
<li>ひとり親医療証の写し</li>
</ul>
<p>いずれかの書類でひとり親であることを証明します。</p>

<h2>ひとり親世帯の点数シミュレーション</h2>
<p>ひとり親でフルタイム勤務の場合：</p>
<table>
<tr><th>項目</th><th>点数</th></tr>
<tr><td>保護者1の基本指数（フルタイム）</td><td>10</td></tr>
<tr><td>保護者2なし</td><td>0</td></tr>
<tr><td>ひとり親加点</td><td>+2</td></tr>
<tr><td>合計</td><td>12</td></tr>
</table>
<p>共働き世帯の20点には届きませんが、同点時の優先順位でひとり親世帯が優先されるケースがあります。</p>

<h2>三鷹市のひとり親支援制度</h2>
<ul>
<li>児童扶養手当</li>
<li>ひとり親家庭等医療費助成</li>
<li>母子・父子福祉資金の貸付</li>
<li>JR通勤定期乗車券の割引</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>ひとり親世帯は保育園の入園選考で配慮される場合が多いです。加点だけでなく、同点時の優先順位も確認しましょう。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>ひとり親支援の詳細は<a href="https://www.city.mitaka.lg.jp/" target="_blank" rel="noopener">三鷹市公式サイト</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 40,
  },
  {
    slug: "waiting-child-status",
    citySlug: "mitaka",
    title: "三鷹市の待機児童の最新状況と今後の見通し",
    description:
      "三鷹市の待機児童数の推移と保育園整備の最新動向をまとめました。",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=400&fit=crop",
    category: "データ分析",
    categoryColor: "teal",
    content: `<h2>三鷹市の待機児童の状況</h2>
<p>三鷹市は東京都多摩地域東部に位置し、人口約19万人の住宅都市です。待機児童の解消に向けて保育施設の整備を進めてきました。</p>

<h2>待機児童数の推移</h2>
<p>三鷹市は近年、待機児童数を大幅に減少させてきました。認可保育園の新設や定員拡大により、保育の受け皿を増やしています。</p>

<h3>保育施設の整備状況</h3>
<ul>
<li>認可保育園：約40か所</li>
<li>小規模保育事業所：複数か所</li>
<li>認証保育所：複数か所</li>
<li>家庭的保育（保育ママ）：実施あり</li>
</ul>

<h2>地域による差</h2>
<p>三鷹駅周辺は利便性が高く人気があるため、競争率が高い傾向にあります。一方、市の東部や北部は比較的空きがある園もあります。</p>

<h2>今後の見通し</h2>
<ul>
<li>共働き世帯の増加に伴い、保育需要は引き続き高い水準</li>
<li>1歳児クラスの競争率は依然として高い状態</li>
<li>小規模保育の卒園児の受け皿確保が課題</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>三鷹市は待機児童対策を進めていますが、人気エリアの1歳児クラスは依然として競争が激しい状態です。早めの情報収集と準備が重要です。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>最新の待機児童数や保育園整備情報は<a href="https://www.city.mitaka.lg.jp/c_categories/index03003001.html" target="_blank" rel="noopener">三鷹市公式サイト</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 50,
  },
  {
    slug: "hoikuryo-keisan",
    citySlug: "mitaka",
    title: "三鷹市の保育料計算【令和8年度版】年収別シミュレーション・早見表",
    description:
      "三鷹市の認可保育園の保育料を年収・子ども数別に詳しく解説。市民税所得割額に基づく階層区分早見表、無償化（3歳〜）の対象確認、副食費・第2子以降の減免制度まで。令和8年度対応。",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop",
    category: "お金・制度",
    categoryColor: "amber",
    content: `<h2>三鷹市の保育料はどうやって決まる？</h2>
<p>三鷹市の認可保育園の保育料（利用者負担額）は、<strong>世帯の市民税所得割額</strong>によって決まります。東京都の基準に基づき階層区分が設定されており、所得が高いほど保育料も高くなる応能負担方式です。</p>

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
<p class="text-xs text-muted-foreground">※上記は目安です。詳細は三鷹市の公式保育料表をご確認ください。</p>

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
<p>毎年6月ごろ、前年度の市民税額が確定した後に保育料が決定・通知されます。入園前に目安を知りたい場合は三鷹市担当課にお問い合わせください。</p>
<div class="info-box">
<p><strong>公式情報</strong></p>
<p>最新の保育料表は三鷹市公式サイトからご確認ください。</p>
</div>`,
    publishedAt: "2026-05-13",
    popularity: 42,
  },
  {
    slug: "shokuhi-jippi",
    citySlug: "mitaka",
    title: "三鷹市の保育園の給食費（副食費）はいくら？【令和8年度版】免除条件と金額",
    description:
      "三鷹市の保育園の給食費（副食費）は月いくら？所得・子ども数による副食費免除の条件と申請方法、保育料無償化の範囲と実費負担の全額をわかりやすく解説。令和8年度対応。",
    image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&h=400&fit=crop",
    category: "お金・制度",
    categoryColor: "amber",
    content: `<h2>三鷹市の副食費とは？</h2>
<p>2019年10月の幼児教育・保育無償化により、<strong>3歳以上の保育料は無料</strong>になりました。ただし、給食の<strong>副食費（おかず代）は実費負担</strong>が残ります。三鷹市では副食費として月額4,500円程度が別途かかります。</p>

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
<p class="text-xs text-muted-foreground">※金額は目安です。詳細は三鷹市公式サイトでご確認ください。</p>

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
<p>副食費は園から直接請求されます。毎月口座引き落としまたは現金納付が一般的です。免除に該当する場合は入園時や毎年6月ごろに申請手続きが必要です。三鷹市担当課に確認してください。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>最新の副食費・実費負担の詳細は三鷹市公式サイトからご確認ください。</p>
</div>`,
    publishedAt: "2026-05-13",
    popularity: 40,
  },
];

registerArticles(articles);
