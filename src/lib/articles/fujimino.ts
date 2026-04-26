import type { Article } from "./types";
import { registerArticles } from "./index";

const articles: Article[] = [
  // ===== 保活の基本 (1) =====
  {
    slug: "hokatsu-schedule",
    citySlug: "fujimino",
    title: "ふじみ野市の保活スケジュール　令和8年度4月入園の流れ",
    description:
      "ふじみ野市の認可保育園の申込時期・選考の流れ・結果通知の時期をわかりやすく解説。令和8年度4月入園のスケジュールを中心にまとめました。",
    image:
      "https://images.unsplash.com/photo-1484820540004-14229fe36ca4?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>令和8年度（2026年度）4月入園のスケジュール</h2>
<p>ふじみ野市の4月入園は<strong>一次利用調整</strong>と<strong>二次利用調整</strong>の2回に分かれています。申込先はふじみ野市こども・元気健康部保育課です。</p>

<h3>一次利用調整</h3>
<table>
<tr><th>項目</th><th>日程</th></tr>
<tr><td>申込受付期間</td><td>令和7年11月上旬〜12月上旬</td></tr>
<tr><td>結果通知</td><td>令和8年1月下旬</td></tr>
</table>

<h3>二次利用調整</h3>
<table>
<tr><th>項目</th><th>日程</th></tr>
<tr><td>申込受付期間</td><td>令和8年2月上旬〜2月中旬</td></tr>
<tr><td>結果通知</td><td>令和8年3月上旬</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>一次で不承諾だった方は自動的に二次の対象になります。希望園の変更も可能です。</p>
</div>

<h2>いつから動き始めるべき？</h2>

<div class="step">
<div class="step-num">1</div>
<div class="step-content">
<strong>4月〜5月：情報収集スタート</strong>
<p>ふじみ野市の認可保育園は約30か所。東武東上線沿線のエリア特性を理解しましょう。</p>
</div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content">
<strong>6月〜9月：保育園見学</strong>
<p>気になる園に電話して見学予約。見学のベストシーズンです。</p>
</div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content">
<strong>10月：申込案内の入手</strong>
<p>ふじみ野市が発行する「保育所利用のご案内」を入手しましょう。</p>
</div>
</div>
<div class="step">
<div class="step-num">4</div>
<div class="step-content">
<strong>11月〜12月：申込書類の準備・提出</strong>
<p>就労証明書などの書類を揃えて保育課へ提出します。</p>
</div>
</div>

<h2>途中入園（5月〜3月）の申込</h2>
<p>各月の申込締切日は、入園希望月の<span class="highlight">前月10日頃</span>です。詳しくはふじみ野市の公式サイトをご確認ください。</p>`,
    publishedAt: "2026-04-26",
    popularity: 55,
  },
  // ===== 選考のしくみ =====
  {
    slug: "scoring-system-guide",
    citySlug: "fujimino",
    title: "ふじみ野市の入園点数のしくみ　基本指数と調整指数をやさしく解説",
    description:
      "ふじみ野市の保育園入園選考で使われる基本指数と調整指数の仕組みを、初めての方にもわかるように解説します。",
    image:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>点数ってなに？</h2>
<p>ふじみ野市の保育園入園は「先着順」ではなく「点数（指数）」の高い順に内定が決まります。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>選考指数 ＝ 基本指数（父）＋ 基本指数（母）＋ 調整指数</p>
</div>

<h2>基本指数とは？</h2>
<p>父母それぞれの「保育が必要な理由」を点数化したものです。1人あたり最大<span class="highlight">20点</span>で、父母合計の最大は<span class="highlight">40点</span>。</p>
<p>最も多い「就労」の場合、月160時間以上で満点の20点になります。</p>

<table>
<tr><th>就労状況</th><th>指数</th></tr>
<tr><td>月160時間以上</td><td>20</td></tr>
<tr><td>月120時間以上160時間未満</td><td>18</td></tr>
<tr><td>月100時間以上120時間未満</td><td>16</td></tr>
<tr><td>月80時間以上100時間未満</td><td>14</td></tr>
<tr><td>月64時間以上80時間未満</td><td>12</td></tr>
</table>

<h2>調整指数とは？</h2>
<p>世帯の特別な事情に応じて加減される点数です。加算項目と減算項目があります。</p>

<h3>主な加算項目</h3>
<ul>
<li>ひとり親世帯（就労中）：<span class="highlight">+5点</span></li>
<li>きょうだいが在園中：<span class="highlight">+3点</span></li>
<li>認可外保育施設の利用実績：<span class="highlight">+3点</span></li>
<li>生活保護世帯：<span class="highlight">+3点</span></li>
<li>育休明け復職予定：<span class="highlight">+2点</span></li>
<li>きょうだい同時申込：<span class="highlight">+2点</span></li>
</ul>

<h3>主な減算項目</h3>
<ul>
<li>市外からの申込：<span class="highlight">-10点</span></li>
<li>認可園からの転園希望：<span class="highlight">-5点</span></li>
<li>同居祖父母が保育可能：<span class="highlight">-3点</span></li>
</ul>`,
    publishedAt: "2026-04-26",
    popularity: 65,
  },
  // ===== 点数アップ =====
  {
    slug: "score-up-tips",
    citySlug: "fujimino",
    title: "ふじみ野市で点数を1点でも上げる方法　加点のチェックリスト",
    description:
      "ふじみ野市の入園選考で調整指数の加点を最大限に活用する方法を、チェックリスト形式で解説します。",
    image:
      "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>加点の取りこぼしをなくそう</h2>
<p>ふじみ野市の入園選考では<span class="highlight">1点</span>の差が明暗を分けることも。使える加点は漏れなく活用しましょう。</p>

<h3>加点チェックリスト</h3>

<ul>
<li>ひとり親で就労中 → <span class="highlight">+5点</span></li>
<li>きょうだいが希望施設に在園中 → <span class="highlight">+3点</span></li>
<li>認可外保育施設に月ぎめで預けている → <span class="highlight">+3点</span></li>
<li>生活保護を受給中 → <span class="highlight">+3点</span></li>
<li>きょうだいを同時に申込 → <span class="highlight">+2点</span></li>
<li>育休・産休から入園月に復帰予定 → <span class="highlight">+2点</span></li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>認可外保育施設に預けながら翌年の4月入園を申し込むと、+3点の加点がつきます。0歳児クラスで認可外に預け、1歳児クラスで認可園を狙うのはふじみ野市でも有効な戦略です。</p>
</div>

<div class="info-box">
<p><strong>注意すべき減点項目</strong></p>
<p>ふじみ野市外からの申込は-10点、認可園からの転園は-5点、同居祖父母が保育可能な場合は-3点の減点があります。特に市外からの申込は大幅な減点となるため要注意です。</p>
</div>`,
    publishedAt: "2026-04-26",
    popularity: 60,
  },
  // ===== 同点対策 =====
  {
    slug: "tiebreaker-rules",
    citySlug: "fujimino",
    title: "ふじみ野市で同点になったらどうなる？　優先順位のしくみ",
    description:
      "ふじみ野市の保育園入園選考で同点になった場合の優先順位と、事前にできる対策を解説します。",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>同点の場合の優先順位</h2>
<p>ふじみ野市では選考指数が同点の場合、以下の順番で優先されます。</p>

<ol>
<li>ひとり親世帯</li>
<li>希望する保育施設にきょうだいが在園している世帯</li>
<li>基本指数が高い世帯（調整指数による加点が少ない＝就労状況が安定）</li>
<li>ふじみ野市の居住期間が長い世帯</li>
<li>所得が低い世帯</li>
</ol>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>きょうだいが在園中の園を希望に入れると、指数+3点だけでなく同点時の優先順位でも有利になります。</p>
</div>

<h2>対策のポイント</h2>
<ul>
<li>加点を1つでも積み上げて同点を避ける</li>
<li>きょうだいが在園中の園を第1希望にする</li>
<li>ボーダーラインが低い園も希望に入れる</li>
</ul>

<div class="info-box">
<p><strong>情報</strong></p>
<p>ふじみ野市では過去の入園最低指数を公開していることがあります。保育課の窓口で確認してみましょう。</p>
</div>`,
    publishedAt: "2026-04-26",
    popularity: 48,
  },
  // ===== 就労時間 =====
  {
    slug: "part-time-work-score",
    citySlug: "fujimino",
    title: "ふじみ野市　パートタイム・短時間勤務の点数を詳しく解説",
    description:
      "ふじみ野市の保育園入園選考で、パートタイムや短時間勤務がどのくらいの点数になるか、具体例を交えて解説します。",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>ふじみ野市のパート・短時間勤務の点数</h2>
<p>ふじみ野市の基本指数は、月あたりの就労時間で細かく区分されています。</p>

<table>
<tr><th>月あたりの就労時間</th><th>指数</th></tr>
<tr><td>160時間以上</td><td>20</td></tr>
<tr><td>120時間以上160時間未満</td><td>18</td></tr>
<tr><td>100時間以上120時間未満</td><td>16</td></tr>
<tr><td>80時間以上100時間未満</td><td>14</td></tr>
<tr><td>64時間以上80時間未満</td><td>12</td></tr>
<tr><td>48時間以上64時間未満</td><td>8</td></tr>
</table>

<h2>具体的な労働パターン例</h2>

<h3>フルタイム（20点）</h3>
<ul>
<li>週5日、1日8時間勤務 = 月160時間</li>
<li>週4日、1日8時間勤務 = 月128時間（18点）</li>
</ul>

<h3>パートタイム（12〜16点）</h3>
<ul>
<li>週5日、1日4時間勤務 = 月80時間（14点）</li>
<li>週4日、1日4時間勤務 = 月64時間（12点）</li>
</ul>

<h3>短時間勤務（8点）</h3>
<ul>
<li>週5日、1日2時間勤務 = 月40時間（該当なし）</li>
<li>週4日、1日3時間勤務 = 月48時間（8点）</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>月64時間の壁が大きく、ここを超えるだけで12点になります。パート勤務を調整する際の目安にしましょう。</p>
</div>

<div class="info-box">
<p><strong>注意</strong></p>
<p>通勤時間は就労時間に含まれません。また、育休中や産休中の場合は「出産」の事由で評価されます。</p>
</div>`,
    publishedAt: "2026-04-26",
    popularity: 52,
  },
  // ===== ひとり親 =====
  {
    slug: "single-parent-score",
    citySlug: "fujimino",
    title: "ふじみ野市のひとり親世帯　入園選考で有利な理由と加点戦略",
    description:
      "ふじみ野市のひとり親世帯が受ける基本指数の加点・優先措置と、入園選考を有利に進めるコツを解説します。",
    image:
      "https://images.unsplash.com/photo-1488754612908-cf78fc443644?w=800&h=400&fit=crop",
    category: "入園のコツ",
    categoryColor: "rose",
    content: `<h2>ひとり親世帯の強み</h2>
<p>ふじみ野市ではひとり親世帯（母子家庭・父子家庭）で就労または就学している場合、調整指数で<span class="highlight">+5点</span>の加点が付きます。</p>

<h2>基本指数は通常通り</h2>
<p>加点は調整指数に含まれるため、基本指数（就労の点数）は両親家庭と同じ基準で評価されます。例えば、月160時間以上勤務なら基本指数20点、調整指数+5点で合計25点になります。</p>

<h2>同点時の優先順位</h2>
<p>ふじみ野市の同点時の優先ルールでは、ひとり親世帯が第1優先とされています。つまり、<strong>フルタイムで働くひとり親と両親がどちらも20点+20点で40点の場合、ひとり親世帯が優先されます</strong>。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>ひとり親世帯＋認可外保育利用中なら+3点、きょうだい同時申込なら+2点が重ねてつくので、合計で最大+10点の調整指数を獲得できます。</p>
</div>

<h2>就学中のひとり親</h2>
<p>就学中で月160時間以上の就学が確認できれば、基本指数20点+調整指数+5点で25点になります。</p>

<div class="info-box">
<p><strong>届出に必要な書類</strong></p>
<p>ひとり親であることを証明するため、戸籍謄本や児童扶養手当受給証等の提出が必要になります。申し込み時に保育課に確認しましょう。</p>
</div>`,
    publishedAt: "2026-04-26",
    popularity: 58,
  },
  // ===== 育休タイミング =====
  {
    slug: "parental-leave-timing",
    citySlug: "fujimino",
    title: "ふじみ野市の育休・産休タイミング　入園のベストなタイミングは？",
    description:
      "ふじみ野市で育休明けの保育園入園を考える方へ。入園月の選び方と育休・産休からの復帰でもらえる加点について解説します。",
    image:
      "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?w=800&h=400&fit=crop",
    category: "入園のコツ",
    categoryColor: "rose",
    content: `<h2>育休・産休で変わる基本指数</h2>
<p>育休・産休中は保育が必要な理由が「出産」となり、産前2ヶ月～産後8週間の期間で基本指数20点が付きます。</p>

<h2>入園月のタイミング</h2>
<p>育休明けで保育園を希望する場合、<strong>入園月中に職場復帰する予定であれば、調整指数で+2点の加点</strong>が付きます。</p>

<div class="point-box">
<p><strong>おすすめの入園月</strong></p>
<p>4月入園がおすすめです。育休を産後8週から計算して調整し、翌年の4月に職場復帰して保育園に預けるというパターンが一般的です。</p>
</div>

<h2>途中入園との比較</h2>
<table>
<tr><th>入園時期</th><th>基本指数</th><th>調整指数</th><th>メリット</th></tr>
<tr><td>4月入園</td><td>20点</td><td>+2点（育休明け）</td><td>競争率が高いが加点あり</td></tr>
<tr><td>途中入園</td><td>0点（育休中）</td><td>+2点（入園月に復帰予定）</td><td>空きがあれば入りやすい</td></tr>
</table>

<h2>出産前後の申し込み</h2>
<p>出産予定日の<span class="highlight">1ヶ月前</span>から申し込みが可能です。出産予定月の翌々月入園を狙うと、産後8週を超えて安定した状況での入園になります。</p>

<div class="info-box">
<p><strong>注意</strong></p>
<p>育休からの復帰予定日は、申し込み書類に必ず記入してください。この日付で加点の対象判定が行われます。</p>
</div>`,
    publishedAt: "2026-04-26",
    popularity: 50,
  },
  // ===== 待機児童 =====
  {
    slug: "nursery-wait-time",
    citySlug: "fujimino",
    title: "ふじみ野市の待機児童の実態　入園難易度と対策",
    description:
      "ふじみ野市の待機児童数・保育園の施設数・エリア別の入園難易度など、リアルな保活事情をまとめました。",
    image:
      "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>ふじみ野市の保育園事情</h2>
<p>ふじみ野市は埼玉県南西部に位置する人口約11.5万人の市です。東武東上線の鶴瀬駅、上福岡駅、ふじみ野駅を中心に住宅地が広がっています。認可保育園は約30か所、認定こども園や小規模保育事業所を含めると、認可施設は50か所以上あります。</p>

<h2>待機児童数の推移</h2>
<p>ふじみ野市は埼玉県の中でも待機児童が比較的少ない自治体として知られています。ただし、年によって変動があるため、最新の数字はふじみ野市役所に確認しましょう。</p>

<h2>入園しやすい園・しにくい園の特徴</h2>

<h3>入園しやすい傾向</h3>
<ul>
<li>小規模保育事業所（0〜2歳対象）</li>
<li>駅から遠い園</li>
<li>新しく開園した園</li>
<li>定員が大きい園</li>
</ul>

<h3>入園しにくい傾向</h3>
<ul>
<li>駅近の人気園</li>
<li>0〜1歳児クラス</li>
<li>評判の良い園</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>ふじみ野市は比較的入園しやすい自治体ですが、人気園には集中するため、複数の園を希望に入れることが大切です。</p>
</div>

<h2>対策</h2>
<ul>
<li>希望園は最低5園以上書く</li>
<li>小規模保育も選択肢に入れる</li>
<li>認可外保育施設を活用して翌年の加点を狙う</li>
</ul>`,
    publishedAt: "2026-04-26",
    popularity: 45,
  },
  // ===== 申込チェックリスト =====
  {
    slug: "application-checklist",
    citySlug: "fujimino",
    title: "ふじみ野市の保育園申込　必要書類と提出前チェックリスト",
    description:
      "ふじみ野市の認可保育園申込に必要な書類一覧と、提出前の確認チェックリストで申請漏れを防ぎます。",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=400&fit=crop",
    category: "申込のコツ",
    categoryColor: "teal",
    content: `<h2>基本的な必要書類</h2>

<h3>全員必須</h3>
<ul>
<li>保育所（園）利用申込書</li>
<li>支給認定申請書</li>
<li>基準指数・調整指数確認票</li>
</ul>

<h3>世帯構成に応じて必要な書類</h3>
<ul>
<li>市税証明書（前年分の所得確認）</li>
<li>就労証明書（勤務先に記入してもらう）</li>
<li>自営業・農業の場合：確定申告書等</li>
<li>育休中の場合：育休取得証明書</li>
<li>ひとり親の場合：戸籍謄本、児童扶養手当受給証等</li>
<li>障害がある場合：身体障害者手帳等</li>
</ul>

<h2>提出前のチェックリスト</h2>

<table>
<tr><th>項目</th><th>確認内容</th></tr>
<tr><td>氏名・住所</td><td>全ての書類で統一されているか</td></tr>
<tr><td>生年月日</td><td>正確に記入されているか</td></tr>
<tr><td>就労時間</td><td>月額で正確に計算されているか</td></tr>
<tr><td>勤務先名</td><td>正式名称か</td></tr>
<tr><td>ハンコ</td><td>必要な欄すべてに押してあるか</td></tr>
<tr><td>希望園</td><td>第5希望まで記入されているか</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>就労証明書の記入漏れが最も多い申請ミスです。勤務先に提出する前に、保育課の窓口で書類をチェックしてもらうことをおすすめします。</p>
</div>

<h2>提出期限</h2>
<p>4月入園の場合、申込締切は<span class="highlight">12月上旬</span>です。締切日を過ぎると次の調整ラウンドになるため、余裕を持って提出しましょう。</p>

<div class="info-box">
<p><strong>相談窓口</strong></p>
<p>書類に不安がある場合は、ふじみ野市こども・元気健康部保育課（049-262-9035）に電話して確認できます。</p>
</div>`,
    publishedAt: "2026-04-26",
    popularity: 55,
  },
  // ===== 認可外 =====
  {
    slug: "unlicensed-nursery",
    citySlug: "fujimino",
    title: "ふじみ野市の認可外保育施設ガイド　認可園との違いと活用法",
    description:
      "ふじみ野市で認可園に入れなかった場合の選択肢として、認可外保育施設の特徴と加点活用法を解説します。",
    image:
      "https://images.unsplash.com/photo-1587654780291-39c9404d7dd0?w=800&h=400&fit=crop",
    category: "認可外保育",
    categoryColor: "teal",
    content: `<h2>認可外保育施設とは？</h2>
<p>認可外保育施設は、認可基準を満たしていないものの、自治体に届出をして運営している保育施設です。ふじみ野市内にも複数の認可外保育施設があります。</p>

<h2>認可園との主な違い</h2>
<table>
<tr><th>項目</th><th>認可</th><th>認可外</th></tr>
<tr><td>保育料</td><td>所得に応じて決定</td><td>施設が設定</td></tr>
<tr><td>申込先</td><td>ふじみ野市保育課</td><td>施設に直接</td></tr>
<tr><td>入園選考</td><td>指数による利用調整</td><td>施設独自の基準</td></tr>
<tr><td>翌年の入園加点</td><td>-</td><td>+3点</td></tr>
</table>

<h2>翌年の加点戦略</h2>
<p>認可外保育施設に月ぎめで預けながら翌年度の認可園を申請すると、調整指数で<span class="highlight">+3点</span>の加点がつきます。これは非常に有効な戦略です。</p>

<div class="point-box">
<p><strong>0歳→1歳戦略</strong></p>
<p>0歳児クラスで認可外に預け、翌年1歳児クラスで認可園を狙うと、+3点の加点で入園確率が大きく上がります。</p>
</div>

<h2>認可外を選ぶときのチェックポイント</h2>
<ul>
<li>自治体への届出が済んでいるか</li>
<li>保育料と追加料金の内訳</li>
<li>保育士の配置人数</li>
<li>施設の安全対策（防火訓練等）</li>
<li>保育の方針が合致しているか</li>
</ul>

<div class="info-box">
<p><strong>情報入手</strong></p>
<p>ふじみ野市の認可外保育施設一覧は、ふじみ野市こども・元気健康部保育課の窓口で確認できます。</p>
</div>`,
    publishedAt: "2026-04-26",
    popularity: 42,
  },
];

registerArticles(articles);
