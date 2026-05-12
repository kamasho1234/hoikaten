import type { Article } from "./types";
import { registerArticles } from "./index";

const articles: Article[] = [
  {
    slug: "hokatsu-schedule",
    citySlug: "kodaira",
    title: "小平市の保活スケジュール　申込から内定までの流れ",
    description:
      "小平市の認可保育園の申込時期・選考の流れをまとめました。令和8年度4月入園の動き方を解説します。",
    image: "https://images.unsplash.com/photo-1484820540004-14229fe36ca4?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>小平市の4月入園スケジュール</h2>
<p>小平市の認可保育園は毎年11月ごろに翌年度4月入園の一次募集を受付けます。小平市子ども家庭部保育課が窓口です。</p>

<h3>保活の全体スケジュール</h3>
<div class="step">
<div class="step-num">1</div>
<div class="step-content">
<strong>4月〜6月：情報収集</strong>
<p>小平市公式サイトで保育園の一覧や前年度の入園案内を確認します。市内には認可保育園が約30か所あります。</p>
</div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content">
<strong>7月〜9月：保育園見学</strong>
<p>気になる園に連絡して見学を予約しましょう。小平市は東京都多摩地域中部に位置し、住宅街のなかに園が点在しています。</p>
</div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content">
<strong>10月〜11月：入園案内入手・書類準備</strong>
<p>最新の入園案内を入手し、就労証明書などを準備します。小平市は月あたりの就労日数と1日あたりの就労時間で基本指数が決まります。</p>
</div>
</div>
<div class="step">
<div class="step-num">4</div>
<div class="step-content">
<strong>11月：申込書類の提出</strong>
<p>小平市子ども家庭部保育課へ提出します。郵送または窓口で受付されます。</p>
</div>
</div>
<div class="step">
<div class="step-num">5</div>
<div class="step-content">
<strong>2月：選考結果の通知</strong>
<p>一次選考の結果が届きます。内定の場合は入園説明会と健康診断に進みます。</p>
</div>
</div>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>小平市は基本指数が父母各最大20点（合計40点満点）です。月あたりの就労日数と1日の就労時間の組み合わせで判定されます。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳しくは小平市公式サイト「保育園入園案内」をご確認ください。問い合わせ先は小平市子ども家庭部保育課です。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 60,
  },
  {
    slug: "scoring-system-guide",
    citySlug: "kodaira",
    title: "小平市の入園点数のしくみ　基本指数と調整指数を解説",
    description:
      "小平市の保育園入園選考で使われる基本指数と調整指数のしくみを解説します。合計40点満点の計算方法がわかります。",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop",
    category: "点数を知る",
    categoryColor: "blue",
    content: `<h2>小平市の選考指数とは</h2>
<p>小平市の認可保育園の入園選考は「基本指数＋調整指数」の合計で行われます。基本指数は父母それぞれに付き、合計が選考の基礎点になります。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>選考指数 = 基本指数（保護者1 + 保護者2）+ 調整指数</p>
</div>

<h2>基本指数（父母各最大20点、合計40点）</h2>
<p>就労の場合、月20日以上かつ日8時間以上の就労で満点の<span class="highlight">20点</span>になります。月あたりの就労日数と1日あたりの就労時間の組み合わせで判定されるのが小平市の特徴です。</p>

<table>
<tr><th>就労状況</th><th>指数</th></tr>
<tr><td>月20日以上かつ日8時間以上</td><td>20</td></tr>
<tr><td>月20日以上かつ日7時間以上</td><td>18</td></tr>
<tr><td>月16日以上かつ日6時間以上</td><td>16</td></tr>
<tr><td>月16日以上かつ日4時間以上</td><td>14</td></tr>
<tr><td>月12日以上かつ日4時間以上</td><td>12</td></tr>
<tr><td>月64時間以上（それ以外）</td><td>10</td></tr>
</table>

<h2>就労以外の基本指数</h2>
<table>
<tr><th>事由</th><th>指数</th></tr>
<tr><td>疾病（入院中・常時臥床）</td><td>20</td></tr>
<tr><td>疾病（自宅療養・一般）</td><td>16</td></tr>
<tr><td>疾病（通院加療）</td><td>12</td></tr>
<tr><td>障害（身体1〜2級/愛の手帳1〜3度/精神1〜2級）</td><td>20</td></tr>
<tr><td>障害（身体3級/愛の手帳4度/精神3級）</td><td>16</td></tr>
<tr><td>障害（身体4級以下）</td><td>12</td></tr>
<tr><td>出産前後2か月</td><td>16</td></tr>
<tr><td>求職活動中</td><td>6</td></tr>
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
<p>全項目は小平市公式サイト「保育園入園案内」で確認できます。問い合わせ先は小平市子ども家庭部保育課です。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 70,
  },
  {
    slug: "work-points-detail",
    citySlug: "kodaira",
    title: "小平市の就労状況別の点数　月何日・1日何時間で何点？",
    description:
      "小平市の保育園入園で、就労日数と就労時間の組み合わせでもらえる基本指数を詳しく解説します。",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop",
    category: "点数を知る",
    categoryColor: "blue",
    content: `<h2>就労の基本指数を理解する</h2>
<p>小平市では月あたりの就労日数と1日あたりの就労時間の両方で基本指数が決まります。日数と時間のどちらの条件も満たす必要があります。</p>

<h3>就労パターン別の点数一覧</h3>
<table>
<tr><th>勤務パターン例</th><th>月の日数</th><th>1日の時間</th><th>指数</th></tr>
<tr><td>週5日×8時間（フルタイム）</td><td>20日以上</td><td>8時間以上</td><td>20</td></tr>
<tr><td>週5日×7時間（時短勤務）</td><td>20日以上</td><td>7時間以上</td><td>18</td></tr>
<tr><td>週4日×6時間</td><td>16日以上</td><td>6時間以上</td><td>16</td></tr>
<tr><td>週4日×5時間</td><td>16日以上</td><td>4時間以上</td><td>14</td></tr>
<tr><td>週3日×5時間</td><td>12日以上</td><td>4時間以上</td><td>12</td></tr>
<tr><td>上記以外で月64時間以上</td><td>-</td><td>-</td><td>10</td></tr>
</table>

<h2>時短勤務でも高い点数を取るには</h2>
<p>週5日勤務であれば月20日以上の条件を満たしやすく、1日7時間以上なら<span class="highlight">18点</span>が取れます。フルタイム20点との差はわずか2点です。</p>

<h2>パートタイムの場合</h2>
<p>週3日・1日5時間のパートなら月12日以上かつ日4時間以上で<span class="highlight">12点</span>です。フルタイム20点との差は8点。夫婦合計で16点の差になりますが、調整指数で加点を確保できれば入園の可能性はあります。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>小平市の入所要件は月64時間以上の就労です。これを下回ると申込みそのものができません。月64時間以上であれば最低でも10点が付きます。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>就労証明書は勤務先に記入してもらう必要があります。申込期限に余裕をもって依頼しましょう。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 55,
  },
  {
    slug: "adjustment-points",
    citySlug: "kodaira",
    title: "小平市の調整指数で加点を取るテクニック",
    description:
      "小平市の保育園入園選考で調整指数の加点を最大限に活用する方法を解説します。",
    image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>基本指数40点は出発点</h2>
<p>小平市ではフルタイム共働き世帯は基本指数<span class="highlight">40点</span>で横並びです。差がつくのは調整指数の部分です。</p>

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

<h2>減点に注意</h2>
<table>
<tr><th>項目</th><th>点数</th></tr>
<tr><td>市外からの申込み</td><td>-10</td></tr>
<tr><td>転園</td><td>-5</td></tr>
<tr><td>65歳未満の同居親族が保育可能</td><td>-3</td></tr>
</table>

<h2>認可外保育施設の活用</h2>
<p>認可外保育施設に月ぎめで預けていると<span class="highlight">+3点</span>の加点が得られます。0歳児から認可外に預けて1歳児クラスで認可に申し込む戦略が有効です。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>小平市は基本指数の満点が40点と他市に比べてコンパクトなため、調整指数の1点の重みが大きいです。取れる加点は確実に取りましょう。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 65,
  },
  {
    slug: "required-documents",
    citySlug: "kodaira",
    title: "小平市の保育園入園に必要な書類チェックリスト",
    description:
      "小平市の認可保育園の申込みに必要な書類を一覧にまとめました。提出忘れを防ぎましょう。",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>全員が提出する書類</h2>
<ul>
<li>保育所等利用申込書（小平市所定の様式）</li>
<li>保育が必要であることを証明する書類（就労証明書など）</li>
<li>マイナンバー確認書類</li>
<li>本人確認書類</li>
</ul>

<h2>就労の場合に必要な書類</h2>
<div class="step">
<div class="step-num">1</div>
<div class="step-content">
<strong>就労証明書</strong>
<p>勤務先に記入してもらいます。父母それぞれ必要です。小平市所定の様式を使用してください。</p>
</div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content">
<strong>自営業の場合</strong>
<p>自営業・フリーランスの方は就労状況申告書と開業届の写しや確定申告書の写しが必要です。</p>
</div>
</div>

<h2>状況に応じて必要な書類</h2>
<ul>
<li>疾病・障害：診断書または障害者手帳の写し</li>
<li>介護・看護：介護の状況がわかる書類（介護保険証の写しなど）</li>
<li>出産：母子健康手帳の写し</li>
<li>求職活動：求職活動を証明する書類</li>
<li>ひとり親：児童扶養手当証書の写しなど</li>
<li>認可外利用：在園証明書</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>就労証明書は勤務先での記入に時間がかかることがあります。申込期限の1か月前には依頼しましょう。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>書類の様式は小平市公式サイトからダウンロードできます。不明な点は小平市子ども家庭部保育課に問い合わせてください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 50,
  },
  {
    slug: "nursery-types",
    citySlug: "kodaira",
    title: "小平市の保育施設の種類と選び方ガイド",
    description:
      "小平市にある認可保育園・小規模保育・認証保育所など保育施設の種類と特徴を解説します。",
    image: "https://images.unsplash.com/photo-1587654780291-39c9404d7dd0?w=800&h=400&fit=crop",
    category: "園えらび",
    categoryColor: "purple",
    content: `<h2>小平市の保育施設の種類</h2>
<p>小平市には複数の種類の保育施設があります。それぞれの特徴を理解して、家庭に合った施設を選びましょう。</p>

<h3>認可保育園</h3>
<p>小平市には認可保育園が約30か所あります。0歳児（生後57日）から5歳児まで預けられる園が多く、保育時間は原則11時間です。保育料は世帯の所得に応じて決まります。</p>

<h3>小規模保育事業所</h3>
<p>0〜2歳児を対象とした定員19人以下の施設です。少人数のため一人ひとりに手厚い保育が受けられます。3歳からは連携園や別の認可保育園に移る必要があります。</p>

<h3>認証保育所</h3>
<p>東京都独自の制度による保育施設です。認可保育園に入れなかった場合の選択肢になります。認可外に預けると翌年度の申込みで調整指数<span class="highlight">+3点</span>の加点が得られます。</p>

<h3>家庭的保育事業（保育ママ）</h3>
<p>保育者の自宅などで少人数の子どもを預かる制度です。0〜2歳児が対象です。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>小平市は人口約19.5万人の多摩地域中部の市です。西武新宿線・西武拝島線・西武多摩湖線の各駅周辺に保育施設が集まっています。通勤経路を考慮して園を選びましょう。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>施設の一覧と空き状況は小平市公式サイトで確認できます。見学は事前予約が必要です。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 45,
  },
  {
    slug: "age-class-competition",
    citySlug: "kodaira",
    title: "小平市の年齢別の倍率と入りやすさ　何歳が狙い目？",
    description:
      "小平市の保育園の年齢別クラスの入りやすさを比較し、申込戦略を解説します。",
    image: "https://images.unsplash.com/photo-1460518451285-97b6aa326961?w=800&h=400&fit=crop",
    category: "データ分析",
    categoryColor: "teal",
    content: `<h2>年齢別クラスの特徴</h2>
<p>小平市の認可保育園は年齢によって入りやすさが大きく異なります。一般的な傾向を押さえておきましょう。</p>

<h3>0歳児クラス</h3>
<p>生後57日から入園できる園が多いです。定員は少ないものの、申込者数も少ないため比較的入りやすいクラスです。育児休業を早めに切り上げて0歳児クラスから入園する家庭もあります。</p>

<h3>1歳児クラス</h3>
<p>最も競争が激しいクラスです。育休明けの申込みが集中するため、フルタイム共働きの基本指数40点でも入園が難しいケースがあります。調整指数の加点が勝負を分けます。</p>

<h3>2歳児クラス</h3>
<p>1歳児クラスからの持ち上がりがあるため、新規の募集枠は限られます。小規模保育からの卒園児の受け入れ枠がある場合もあります。</p>

<h3>3歳児クラス以上</h3>
<p>幼稚園に移行する家庭があるため空きが出やすく、比較的入りやすいクラスです。3歳児クラスは新規枠が増える園もあります。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>小平市で確実に入園したいなら0歳児クラスか3歳児クラスが狙い目です。1歳児クラスを目指す場合は認可外加点（+3点）の確保を検討しましょう。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>園ごとの空き状況は小平市公式サイトで毎月更新されています。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 60,
  },
  {
    slug: "dual-income-strategy",
    citySlug: "kodaira",
    title: "小平市の共働き世帯の保活戦略　40点からの上乗せ",
    description:
      "小平市でフルタイム共働き世帯が確実に入園するための戦略を解説します。",
    image: "https://images.unsplash.com/photo-1590650153855-d9e808231d41?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>フルタイム共働きの基本指数は40点</h2>
<p>小平市で父母ともにフルタイム（月20日以上かつ日8時間以上）の場合、基本指数は20点+20点=<span class="highlight">40点</span>です。多くの世帯がこのラインで横並びになります。</p>

<h2>40点からの差をつけるには</h2>
<div class="step">
<div class="step-num">1</div>
<div class="step-content">
<strong>認可外保育施設を利用する（+3点）</strong>
<p>0歳児のうちに認可外保育施設に月ぎめで預け、1歳児クラスの4月入園時に加点を得る方法です。費用はかかりますが確実に加点が取れます。</p>
</div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content">
<strong>育児休業復帰予定の加点（+2点）</strong>
<p>育児休業を取得し、入園月に職場復帰する予定であれば加点されます。復帰証明書の提出が必要です。</p>
</div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content">
<strong>きょうだい加点（+3点）</strong>
<p>すでにきょうだいが認可保育園に在園している場合に加点されます。第二子以降の入園では大きなアドバンテージです。</p>
</div>
</div>

<h2>減点を避ける</h2>
<p>同居の祖父母が65歳未満で保育可能と判断されると<span class="highlight">-3点</span>の減点になります。同居の定義や保育可能の判断基準は保育課に事前に確認しましょう。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>小平市は基本指数の満点が40点と比較的コンパクトなため、調整指数の+3点や+2点が選考結果を大きく左右します。加点項目を漏れなくチェックしましょう。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 55,
  },
  {
    slug: "single-parent-support",
    citySlug: "kodaira",
    title: "小平市のひとり親世帯の加点と支援制度",
    description:
      "小平市でひとり親世帯が保育園入園で得られる加点と、利用できる支援制度をまとめました。",
    image: "https://images.unsplash.com/photo-1476234251651-f353f8fc108c?w=800&h=400&fit=crop",
    category: "制度を知る",
    categoryColor: "rose",
    content: `<h2>ひとり親世帯の調整指数</h2>
<p>小平市ではひとり親世帯に対して調整指数<span class="highlight">+5点</span>が加算されます。基本指数と合わせた合計点で選考されるため、入園に有利に働きます。</p>

<h2>ひとり親の認定要件</h2>
<ul>
<li>離婚している（戸籍で確認）</li>
<li>配偶者と死別している</li>
<li>未婚のひとり親である</li>
<li>配偶者が行方不明・拘禁中など</li>
</ul>
<p>事実婚の場合はひとり親として認定されません。児童扶養手当証書の写しなどの提出が求められます。</p>

<h2>ひとり親世帯が利用できる支援制度</h2>
<h3>保育料の減免</h3>
<p>ひとり親世帯は保育料が軽減される場合があります。所得に応じた保育料表で確認してください。</p>

<h3>児童扶養手当</h3>
<p>小平市を通じて申請できる国の制度です。所得制限がありますが、月額最大で約4万円が支給されます。</p>

<h3>ひとり親家庭等医療費助成</h3>
<p>小平市独自の制度で、ひとり親家庭の医療費の自己負担分が助成されます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>ひとり親の+5点は大きな加点です。フルタイム就労で基本指数20点に加え、ひとり親加点と認可外利用加点を合わせれば、入園の可能性はかなり高まります。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>支援制度の詳細は小平市子ども家庭部に問い合わせてください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 40,
  },
  {
    slug: "waiting-child-status",
    citySlug: "kodaira",
    title: "小平市の待機児童の最新状況と対策",
    description:
      "小平市の待機児童数の推移と最新の状況、入園できなかった場合の対策をまとめました。",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=400&fit=crop",
    category: "データ分析",
    categoryColor: "teal",
    content: `<h2>小平市の待機児童の状況</h2>
<p>小平市は東京都多摩地域中部に位置し、人口約19.5万人の住宅都市です。保育需要は依然として高く、特に1歳児クラスでは希望する園に入れないケースが見られます。</p>

<h2>待機児童対策の取り組み</h2>
<ul>
<li>認可保育所の新設・定員拡大</li>
<li>小規模保育事業所の設置推進</li>
<li>保育人材の確保・処遇改善</li>
<li>認証保育所への運営費補助</li>
</ul>

<h2>入園できなかった場合の選択肢</h2>
<div class="step">
<div class="step-num">1</div>
<div class="step-content">
<strong>二次募集に申し込む</strong>
<p>一次選考で空きが出た園に申し込めます。辞退や転出で枠が発生することがあります。</p>
</div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content">
<strong>途中入園を待つ</strong>
<p>年度途中でも転出などで空きが出ることがあります。待機登録をしておけば空きが出た際に案内されます。</p>
</div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content">
<strong>認可外保育施設を利用する</strong>
<p>認証保育所や認可外保育施設に月ぎめで預け、翌年度に再申込みすると調整指数+3点の加点が得られます。</p>
</div>
</div>
<div class="step">
<div class="step-num">4</div>
<div class="step-content">
<strong>幼稚園の預かり保育を検討する</strong>
<p>3歳以上であれば幼稚園の預かり保育（延長保育）も選択肢です。小平市内の幼稚園でも預かり保育を実施している園があります。</p>
</div>
</div>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>不承諾になっても翌年度に向けた準備が重要です。認可外に預けながら加点を確保し、翌年度に再挑戦する戦略が有効です。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>最新の待機児童数や空き状況は小平市公式サイトで公開されています。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 50,
  },
  {
    slug: "hoikuryo-keisan",
    citySlug: "kodaira",
    title: "小平市の保育料計算【令和8年度版】年収別シミュレーション・早見表",
    description:
      "小平市の認可保育園の保育料を年収・子ども数別に詳しく解説。市民税所得割額に基づく階層区分早見表、無償化（3歳〜）の対象確認、副食費・第2子以降の減免制度まで。令和8年度対応。",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop",
    category: "お金・制度",
    categoryColor: "amber",
    content: `<h2>小平市の保育料はどうやって決まる？</h2>
<p>小平市の認可保育園の保育料（利用者負担額）は、<strong>世帯の市区町村民税所得割額</strong>によって決まります。東京都の基準に基づき階層区分が設定されており、所得が高いほど保育料も高くなる応能負担方式です。</p>

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
<p class="text-xs text-muted-foreground">※上記は目安です。詳細は小平市の公式保育料表をご確認ください。</p>

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
<p>毎年6月ごろ、前年度の市民税額が確定した後に保育料が決定・通知されます。入園前に目安を知りたい場合は小平市子ども家庭部保育課にお問い合わせください。</p>
<div class="info-box">
<p><strong>公式情報</strong></p>
<p>最新の保育料表は<a href="https://www.city.kodaira.tokyo.jp/kurashi/009/009588.html" target="_blank" rel="noopener">小平市公式サイト「保育料について」</a>からご確認ください。</p>
</div>`,
    publishedAt: "2026-05-13",
    popularity: 42,
  },
  {
    slug: "shokuhi-jippi",
    citySlug: "kodaira",
    title: "小平市の保育園の給食費（副食費）はいくら？【令和8年度版】免除条件と金額",
    description:
      "小平市の保育園の給食費（副食費）は月いくら？所得・子ども数による副食費免除の条件と申請方法、保育料無償化の範囲と実費負担の全額をわかりやすく解説。令和8年度対応。",
    image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&h=400&fit=crop",
    category: "お金・制度",
    categoryColor: "amber",
    content: `<h2>小平市の副食費とは？</h2>
<p>2019年10月の幼児教育・保育無償化により、<strong>3歳以上の保育料は無料</strong>になりました。ただし、給食の<strong>副食費（おかず代）は実費負担</strong>が残ります。小平市では副食費として月額4,500円程度が別途かかります。</p>

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
<p class="text-xs text-muted-foreground">※金額は目安です。詳細は小平市公式サイトでご確認ください。</p>

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
<p>副食費は園から直接請求されます。毎月口座引き落としまたは現金納付が一般的です。免除に該当する場合は入園時や毎年6月ごろに申請手続きが必要です。小平市子ども家庭部保育課に確認してください。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>最新の副食費・実費負担の詳細は<a href="https://www.city.kodaira.tokyo.jp/kurashi/009/009588.html" target="_blank" rel="noopener">小平市公式サイト「保育料について」</a>からご確認ください。</p>
</div>`,
    publishedAt: "2026-05-13",
    popularity: 40,
  },
];

registerArticles(articles);
