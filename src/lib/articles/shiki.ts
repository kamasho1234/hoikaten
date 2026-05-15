import type { Article } from "./types";
import { registerArticles } from "./index";

const articles: Article[] = [
  // ===== 保活の基本 (1) =====
  {
    slug: "hokatsu-schedule",
    citySlug: "shiki",
    title: "志木市の保活スケジュール　令和8年度4月入園の流れ",
    description:
      "志木市の認可保育園の申込時期・選考の流れ・結果通知の時期をわかりやすく解説。令和8年度4月入園のスケジュールを中心にまとめました。",
    image:
      "https://images.unsplash.com/photo-1484820540004-14229fe36ca4?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>令和8年度（2026年度）4月入園のスケジュール</h2>
<p>志木市の4月入園は<strong>一次利用調整</strong>と<strong>二次利用調整</strong>の2回に分かれています。申込先は志木市保育課です。</p>

<h3>一次利用調整</h3>
<table>
<tr><th>項目</th><th>日程</th></tr>
<tr><td>申込受付期間</td><td>令和7年11月上旬～12月上旬</td></tr>
<tr><td>結果通知</td><td>令和8年1月下旬</td></tr>
</table>

<h3>二次利用調整</h3>
<table>
<tr><th>項目</th><th>日程</th></tr>
<tr><td>申込受付期間</td><td>令和8年2月上旬～2月中旬</td></tr>
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
<strong>4月～5月：情報収集スタート</strong>
<p>志木市の認可保育園は約15か所。エリアや園の特徴を調べましょう。</p>
</div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content">
<strong>6月～9月：保育園見学</strong>
<p>気になる園に電話して見学予約。見学のベストシーズンです。</p>
</div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content">
<strong>10月：申込案内の入手</strong>
<p>志木市が発行する「保育施設利用のご案内」を入手しましょう。</p>
</div>
</div>
<div class="step">
<div class="step-num">4</div>
<div class="step-content">
<strong>11月～12月：申込書類の準備・提出</strong>
<p>就労証明書などの書類を揃えて保育課へ提出します。</p>
</div>
</div>

<h2>途中入園（5月～3月）の申込</h2>
<p>各月の申込締切日は、入園希望月の<span class="highlight">前月10日頃</span>です。詳しくは志木市の公式サイトをご確認ください。</p>`,
    publishedAt: "2026-04-26",
    popularity: 50,
  },
  // ===== 選考のしくみ =====
  {
    slug: "scoring-system-guide",
    citySlug: "shiki",
    title: "志木市の入園点数のしくみ　基本指数と調整指数をやさしく解説",
    description:
      "志木市の保育園入園選考で使われる基本指数と調整指数の仕組みを、初めての方にもわかるように解説します。",
    image:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>点数ってなに？</h2>
<p>志木市の保育園入園は「先着順」ではなく「点数（指数）」の高い順に内定が決まります。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>選考指数 = 基本指数（父）+ 基本指数（母）+ 調整指数</p>
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
    popularity: 60,
  },
  // ===== 点数アップ =====
  {
    slug: "part-time-work-score",
    citySlug: "shiki",
    title: "志木市で点数を1点でも上げる方法　加点のチェックリスト",
    description:
      "志木市の入園選考で調整指数の加点を最大限に活用する方法を、チェックリスト形式で解説します。",
    image:
      "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>加点の取りこぼしをなくそう</h2>
<p>志木市の入園選考では<span class="highlight">1点</span>の差が明暗を分けることも。使える加点は漏れなく活用しましょう。</p>

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
<p>認可外保育施設に預けながら翌年の4月入園を申し込むと、+3点の加点がつきます。0歳児クラスで認可外に預け、1歳児クラスで認可園を狙うのは志木市でも有効な戦略です。</p>
</div>

<div class="info-box">
<p><strong>注意すべき減点項目</strong></p>
<p>志木市外からの申込は-10点、認可園からの転園は-5点、同居祖父母が保育可能な場合は-3点の減点があります。特に市外からの申込は大幅な減点となるため要注意です。</p>
</div>`,
    publishedAt: "2026-04-26",
    popularity: 55,
  },
  // ===== スコア戦略 =====
  {
    slug: "score-up-tips",
    citySlug: "shiki",
    title: "志木市の保育園入園　スコア別の対策と戦略",
    description:
      "志木市の保育園入園で自分のスコアを把握し、必要な対策を実行するための戦略をまとめました。",
    image:
      "https://images.unsplash.com/photo-1588072432836-e10032774350?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>まずは自分のスコアを把握しよう</h2>
<p>志木市の保育園入園では、自分たちの指数が平均的なレベルにあるのか、高いのか、それとも低いのかを知ることが重要です。</p>

<h2>スコア別対策</h2>

<h3>基本指数が40点に満たない場合</h3>
<p>夫婦ともにフルタイム勤務でない場合、基本指数の上限に達していない可能性があります。この場合、調整指数での加点がより重要になります。</p>

<ul>
<li>認可外保育施設の利用実績をつける（+3点）</li>
<li>複数園申込で同点時有利を活かす</li>
<li>育休復帰タイミングを工夫（+2点）</li>
</ul>

<h3>基本指数が40点でも入園難しい場合</h3>
<p>フルタイム共働きでも不承諾になることがあります。この場合、調整指数での加点が不可欠です。</p>

<ul>
<li>全ての使える加点を活用する</li>
<li>認可外実績を申込時期に間に合わせる</li>
<li>複数のきょうだい加点を組み合わせる</li>
<li>ひとり親世帯なら同点時優先が有利</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>志木市では加点が1点の差で合否が決まることも珍しくありません。使える制度は漏れなく活用しましょう。</p>
</div>

<div class="info-box">
<p><strong>情報</strong></p>
<p>志木市保育課では、入園申込前にスコア計算のお手伝いをしてくれることがあります。不安な場合はご相談ください。</p>
</div>`,
    publishedAt: "2026-04-26",
    popularity: 58,
  },
  // ===== 同点対策 =====
  {
    slug: "tiebreaker-rules",
    citySlug: "shiki",
    title: "志木市で同点になったらどうなる？　優先順位のしくみ",
    description:
      "志木市の保育園入園選考で同点になった場合の優先順位と、事前にできる対策を解説します。",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>同点の場合の優先順位</h2>
<p>志木市では選考指数が同点の場合、以下の順番で優先されます。</p>

<ol>
<li>ひとり親世帯</li>
<li>希望する保育施設にきょうだいが在園している世帯</li>
<li>基本指数が高い世帯（調整指数による加点が少ない = 就労状況が安定）</li>
<li>志木市の居住期間が長い世帯</li>
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
<p>志木市では過去の入園最低指数を公開していることがあります。保育課の窓口で確認してみましょう。</p>
</div>`,
    publishedAt: "2026-04-26",
    popularity: 48,
  },
  // ===== ひとり親 =====
  {
    slug: "single-parent-score",
    citySlug: "shiki",
    title: "志木市のひとり親向け保活　加点ルールと有利な申込ポイント",
    description:
      "志木市でひとり親世帯が受けられる加点制度と、入園のコツをまとめました。",
    image:
      "https://images.unsplash.com/photo-1608748543803-ba4f8c70ae0b?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>ひとり親世帯の加点制度</h2>
<p>志木市では、母子家庭・父子家庭で就労中または就労が内定している場合、<span class="highlight">+5点</span>の加点がつきます。</p>

<h2>加点を受けるための条件</h2>
<ul>
<li>母子家庭または父子家庭であること</li>
<li>就労中、または入園月までに就労が確定していること</li>
<li>児童扶養手当の受給状況は関係ありません</li>
</ul>

<h2>ひとり親世帯の有利な点</h2>

<h3>加点だけでなく同点時も有利</h3>
<p>志木市では選考指数が同点の場合、ひとり親世帯が最優先されます。+5点だけでなく、同点時の優先順位でも大きなアドバンテージがあります。</p>

<h3>結婚・再婚時の手続きに注意</h3>
<p>再婚予定がある場合は、申込前に済ませるか申込後に済ませるかで判断が変わります。詳しくは保育課にご相談ください。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>ひとり親世帯は点数的に有利な立場です。複数の園を希望に入れることで、入園成功率を高められます。</p>
</div>

<div class="info-box">
<p><strong>相談窓口</strong></p>
<p>志木市保育課（048-473-1764）では、ひとり親向けの保活相談も受け付けています。疑問や不安なことはお気軽にご相談ください。</p>
</div>`,
    publishedAt: "2026-04-26",
    popularity: 45,
  },
  // ===== 育休からの復帰 =====
  {
    slug: "parental-leave-timing",
    citySlug: "shiki",
    title: "志木市の育休明けタイミング戦略　加点を活かした保活プラン",
    description:
      "育休から復帰する時期を工夫して、志木市の保育園入園を有利にする方法を解説します。",
    image:
      "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>育休明け復帰で+2点の加点</h2>
<p>志木市では、入園月に育休・産休から復帰する予定がある場合、<span class="highlight">+2点</span>の加点がつきます。</p>

<h2>加点を活かすための条件</h2>
<ul>
<li>入園月中に職場復帰すること</li>
<li>育休中であることと復帰予定を証明する書類が必要です</li>
<li>復帰日が確定していることが条件です</li>
</ul>

<h2>育休復帰のタイミング戦略</h2>

<h3>4月入園を狙う場合</h3>
<p>4月中に職場復帰予定なら+2点の加点が得られます。0歳児での入園と同時に復帰するなら、+2点は大きな武器になります。</p>

<h3>他の加点との組み合わせ</h3>
<p>育休明け復帰と同時に、きょうだい同時申込（+2点）や認可外利用実績（+3点）と組み合わせることで、合計で大幅な加点が可能です。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>0歳児での入園を考えている方は、育休タイミングを工夫することで確実に加点を獲得できます。</p>
</div>

<div class="info-box">
<p><strong>注意</strong></p>
<p>加点を申請する際は、育休中であること・復帰予定日が確定していることを証明する書類（会社からの書面等）が必要です。事前に確認しておきましょう。</p>
</div>`,
    publishedAt: "2026-04-26",
    popularity: 52,
  },
  // ===== 待機児童 =====
  {
    slug: "nursery-wait-time",
    citySlug: "shiki",
    title: "志木市の待機児童事情　入園難易度と穴場園の見つけ方",
    description:
      "志木市の待機児童数と、入園しやすい園・激戦園の特徴をまとめました。",
    image:
      "https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?w=800&h=400&fit=crop",
    category: "エリア情報",
    categoryColor: "purple",
    content: `<h2>志木市の保育園事情</h2>
<p>志木市は埼玉県南部に位置する人口約7.5万人の市です。東武東上線志木駅を中心にコンパクトな市街地が広がっており、認可保育園は約15か所あります。</p>

<h2>待機児童状況</h2>
<p>近年、志木市の待機児童数は比較的少ない傾向にあります。ただし、駅周辺の人気園は競争が高いため注意が必要です。</p>

<h2>入園難易度の傾向</h2>

<h3>入りやすい時期</h3>
<ul>
<li>4月以外の途中入園（5月～3月）は空きが出やすい</li>
<li>2歳児以上の就園を希望する場合、0歳児よりも比較的入りやすい傾向</li>
</ul>

<h3>激戦園の特徴</h3>
<ul>
<li>志木駅直近の園</li>
<li>駅前の分園</li>
<li>人気の私立園</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>複数の園を希望に入れることが鉄則です。第1希望の園が激戦園なら、第2希望以降に入りやすい園も組み込んでリスク回避しましょう。</p>
</div>

<div class="info-box">
<p><strong>最新情報の確認</strong></p>
<p>志木市保育課のホームページで、最新の入園最低指数や空き状況が公開されています。申込前に必ず確認しましょう。</p>
</div>`,
    publishedAt: "2026-04-26",
    popularity: 42,
  },
  // ===== 申込チェックリスト =====
  {
    slug: "application-checklist",
    citySlug: "shiki",
    title: "志木市の保育園申込　直前確認チェックリスト",
    description:
      "志木市の申込で提出する書類と、チェックすべき項目を一覧にまとめました。",
    image:
      "https://images.unsplash.com/photo-1588072432836-e10032774350?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>申込前のチェックリスト</h2>
<p>志木市の保育園申込は書類の不備で受理されない場合があります。申込前に必ず確認しましょう。</p>

<h3>提出書類のチェック</h3>
<ul>
<li>保育施設利用申込書（指定様式）</li>
<li>児童の状況票（指定様式）</li>
<li>家庭の状況票（指定様式）</li>
<li>勤務（就労）証明書（指定様式）- 両親分</li>
<li>マイナンバーカードまたは通知カードの写し</li>
<li>世帯全員の住民票</li>
<li>世帯全員の所得・納税証明書</li>
</ul>

<h3>申込書記入時のチェック</h3>
<ul>
<li>記入漏れ、空欄がないか</li>
<li>押印忘れ（署名でも可の場合も確認）</li>
<li>希望する園の名前・施設番号は正確か</li>
<li>申込者と世帯主の関係は正確か</li>
<li>特別な事情がある場合は記入欄に記載</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>就労証明書は勤務先の押印が必須です。会社の手続きに時間がかかるため、申込締切の1ヶ月前には取得を依頼しましょう。</p>
</div>

<div class="info-box">
<p><strong>不安な場合は事前確認</strong></p>
<p>志木市保育課（048-473-1764）では、申込前の書類事前確認を行っています。不備で不承諾になるのを避けるため、ぜひ活用しましょう。</p>
</div>`,
    publishedAt: "2026-04-26",
    popularity: 48,
  },
  // ===== 認可外保育施設 =====
  {
    slug: "unlicensed-nursery",
    citySlug: "shiki",
    title: "志木市の認可外保育施設ガイド　認可園との違いは？",
    description:
      "志木市で認可園に入れなかった場合の選択肢として、認可外保育施設について解説します。",
    image:
      "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&h=400&fit=crop",
    category: "認可外保育",
    categoryColor: "teal",
    content: `<h2>認可外保育施設とは？</h2>
<p>認可外保育施設は、認可基準を満たしていないものの、自治体に届出をして運営している保育施設です。志木市内にも複数の認可外保育施設があります。</p>

<h2>認可園との違い</h2>
<table>
<tr><th>項目</th><th>認可</th><th>認可外</th></tr>
<tr><td>保育料</td><td>所得に応じて決定</td><td>施設が設定</td></tr>
<tr><td>申込先</td><td>志木市保育課</td><td>施設に直接</td></tr>
<tr><td>入園選考</td><td>指数による利用調整</td><td>施設独自の基準</td></tr>
<tr><td>翌年の入園加点</td><td>-</td><td>+3点</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>認可外に預けながら翌年度の認可園を再申請すると、加点（+3点）がつくため入りやすくなります。認可園に入れなかった場合の有効な戦略です。</p>
</div>

<h2>認可外を選ぶときのチェックポイント</h2>
<ul>
<li>自治体への届出が済んでいるか</li>
<li>保育料と追加料金の内訳</li>
<li>保育士の配置人数</li>
<li>施設の安全対策</li>
<li>無償化の対象施設か（月上限額あり）</li>
</ul>

<div class="info-box">
<p><strong>無償化について</strong></p>
<p>認可外保育施設も幼児教育・保育無償化の対象です。月上限額がありますが、上手に活用すれば負担を減らせます。</p>
</div>`,
    publishedAt: "2026-04-26",
    popularity: 44,
  },
];

registerArticles(articles);
