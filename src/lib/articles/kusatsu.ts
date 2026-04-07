import type { Article } from "./types";
import { registerArticles } from "./index";

const articles: Article[] = [
  // ===== 保活の基本 (1) =====
  {
    slug: "hokatsu-schedule",
    citySlug: "kusatsu",
    title: "草津市の保活スケジュール　令和8年度4月入園の流れ",
    description:
      "草津市の認可保育園の申込時期・選考の流れ・結果通知の時期をわかりやすく解説。令和8年度4月入園のスケジュールを中心にまとめました。",
    image:
      "https://images.unsplash.com/photo-1484820540004-14229fe36ca4?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>令和8年度（2026年度）4月入園のスケジュール</h2>
<p>草津市の4月入園は<strong>一次利用調整</strong>と<strong>二次利用調整</strong>の2回に分かれています。申込先は草津市子ども未来部子ども子育て推進課です。</p>

<h3>一次利用調整</h3>
<table>
<tr><th>項目</th><th>日程</th></tr>
<tr><td>申込受付期間</td><td>令和7年10月上旬〜11月上旬</td></tr>
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
<p>草津市の認可保育園は約25か所。エリアや園の特徴を調べましょう。草津市は滋賀県南部に位置し、JR琵琶湖線沿線で大阪・京都への通勤圏として子育て世帯の転入が増加しています。</p>
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
<strong>9月〜10月：申込案内の入手</strong>
<p>草津市が発行する「保育施設利用のご案内」を入手しましょう。</p>
</div>
</div>
<div class="step">
<div class="step-num">4</div>
<div class="step-content">
<strong>10月〜11月：申込書類の準備・提出</strong>
<p>就労証明書などの書類を揃えて子ども子育て推進課へ提出します。</p>
</div>
</div>

<h2>途中入園（5月〜3月）の申込</h2>
<p>各月の申込締切日は、入園希望月の<span class="highlight">前月10日頃</span>です。詳しくは草津市の公式サイトをご確認ください。</p>`,
    publishedAt: "2026-04-07",
    popularity: 55,
  },
  // ===== 保活の基本 (2) =====
  {
    slug: "hokatsu-mistakes",
    citySlug: "kusatsu",
    title: "草津市の保活でよくある失敗と対策5選",
    description:
      "草津市の保活で初めてのママがやりがちな失敗パターンと、その対策をまとめました。",
    image:
      "https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>失敗1：情報収集のスタートが遅い</h2>
<p>草津市の4月入園の申込は<span class="highlight">10月</span>から始まります。見学の予約が埋まる前に動きましょう。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>遅くとも6月には情報収集を始めましょう。草津市は人口約14.5万人ですが、大阪・京都通勤圏として子育て世帯の転入が増えており、駅周辺の園は競争率が高めです。</p>
</div>

<h2>失敗2：希望園を少なく書く</h2>
<p>草津市では希望園を複数記入できます。1〜2園しか書かないと不承諾のリスクが高まります。通える範囲の園はできるだけ多く書きましょう。</p>

<h2>失敗3：自分の点数を把握していない</h2>
<p>草津市では「基本指数＋調整指数」の合計で選考されます。フルタイム共働きで<span class="highlight">40点</span>が基本ラインです。</p>

<h2>失敗4：加点の取りこぼし</h2>
<p>認可外保育施設に預けると<span class="highlight">+3点</span>、育休明けで<span class="highlight">+2点</span>の加点がつきます。使える加点は漏れなくチェックしましょう。</p>

<h2>失敗5：書類の不備</h2>
<p>就労証明書の記入漏れや指定様式以外の提出は受理されない場合があります。</p>

<div class="info-box">
<p><strong>情報</strong></p>
<p>草津市子ども未来部子ども子育て推進課の窓口で、申込前に書類の事前確認ができます。不安な方は活用しましょう。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 50,
  },
  // ===== 選考のしくみ =====
  {
    slug: "scoring-system-guide",
    citySlug: "kusatsu",
    title: "草津市の入園点数のしくみ　基本指数と調整指数をやさしく解説",
    description:
      "草津市の保育園入園選考で使われる基本指数と調整指数の仕組みを、初めての方にもわかるように解説します。",
    image:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>点数ってなに？</h2>
<p>草津市の保育園入園は「先着順」ではなく「点数（指数）」の高い順に内定が決まります。</p>

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
    publishedAt: "2026-04-07",
    popularity: 65,
  },
  // ===== 点数アップ =====
  {
    slug: "score-up-checklist",
    citySlug: "kusatsu",
    title: "草津市で点数を1点でも上げる方法　加点のチェックリスト",
    description:
      "草津市の入園選考で調整指数の加点を最大限に活用する方法を、チェックリスト形式で解説します。",
    image:
      "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>加点の取りこぼしをなくそう</h2>
<p>草津市の入園選考では<span class="highlight">1点</span>の差が明暗を分けることも。使える加点は漏れなく活用しましょう。</p>

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
<p>認可外保育施設に預けながら翌年の4月入園を申し込むと、+3点の加点がつきます。0歳児クラスで認可外に預け、1歳児クラスで認可園を狙うのは草津市でも有効な戦略です。</p>
</div>

<div class="info-box">
<p><strong>注意すべき減点項目</strong></p>
<p>草津市外からの申込は-10点、認可園からの転園は-5点、同居祖父母が保育可能な場合は-3点の減点があります。特に市外からの申込は大幅な減点となるため要注意です。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 60,
  },
  // ===== エリア情報 =====
  {
    slug: "area-guide",
    citySlug: "kusatsu",
    title: "草津市の保育園マップ　エリアごとの入りやすさを比較",
    description:
      "草津市内のエリアごとの保育園の競争率や特徴をまとめました。",
    image:
      "https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?w=800&h=400&fit=crop",
    category: "エリア情報",
    categoryColor: "purple",
    content: `<h2>草津市の保育園事情</h2>
<p>草津市は滋賀県南部に位置する人口約14.5万人の市で、JR琵琶湖線の草津駅・南草津駅を中心に住宅地が広がっています。大阪・京都への通勤圏として子育て世帯の転入が増加しており、認可保育園は約25か所あります。</p>

<h2>エリアごとの競争率</h2>

<h3>競争率が高いエリア</h3>
<ul>
<li><strong>南草津駅周辺</strong>：マンション開発が進み、若いファミリー層が集中。特に0歳児・1歳児クラスは激戦</li>
<li><strong>草津駅周辺</strong>：駅近の園は人気が高く、通勤の利便性から希望者が多い</li>
</ul>

<h3>比較的入りやすいエリア</h3>
<ul>
<li><strong>笠山・老上エリア</strong>：駅から離れるため、比較的空きがある園も</li>
<li><strong>志津・草津東エリア</strong>：新興住宅地だが園の整備も進んでおり穴場になることがある</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>草津市の公式サイトで保育施設ごとの空き状況が公開されています。南草津駅周辺は近年特に人口増加が著しく、新設園もありますが需要に追いつかない状況です。希望園を決める前に必ず空き状況を確認しましょう。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 45,
  },
  // ===== 認可外 =====
  {
    slug: "ninkagai-guide",
    citySlug: "kusatsu",
    title: "草津市の認可外保育施設ガイド　認可園との違いは？",
    description:
      "草津市で認可園に入れなかった場合の選択肢として、認可外保育施設について解説します。",
    image:
      "https://images.unsplash.com/photo-1587654780291-39c9404d7dd0?w=800&h=400&fit=crop",
    category: "認可外保育",
    categoryColor: "teal",
    content: `<h2>認可外保育施設とは？</h2>
<p>認可外保育施設は、認可基準を満たしていないものの、自治体に届出をして運営している保育施設です。草津市内にも複数の認可外保育施設があります。</p>

<h2>認可園との違い</h2>
<table>
<tr><th>項目</th><th>認可</th><th>認可外</th></tr>
<tr><td>保育料</td><td>所得に応じて決定</td><td>施設が設定</td></tr>
<tr><td>申込先</td><td>草津市子ども子育て推進課</td><td>施設に直接</td></tr>
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
</ul>

<div class="info-box">
<p><strong>情報</strong></p>
<p>草津市内の認可外保育施設の一覧は、草津市子ども未来部子ども子育て推進課の窓口または滋賀県の公式サイトで確認できます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 40,
  },
  // ===== 小規模保育 =====
  {
    slug: "small-nursery",
    citySlug: "kusatsu",
    title: "草津市の小規模保育って？　メリット・デメリットを解説",
    description:
      "草津市の小規模保育事業の特徴やメリット・デメリット、卒園後の進路について解説します。",
    image:
      "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>小規模保育事業とは？</h2>
<p>定員6〜19人の少人数で保育を行う施設です。対象は<span class="highlight">0〜2歳児</span>のみ。3歳以降は連携施設や別の保育園に転園します。草津市内にも複数の小規模保育事業所があります。</p>

<h2>メリット</h2>
<ul>
<li>少人数でアットホームな環境</li>
<li>認可園より比較的入りやすい</li>
<li>卒園時に連携施設への優先枠がある場合がある</li>
</ul>

<h2>デメリット</h2>
<ul>
<li>3歳で転園が必要（いわゆる「3歳の壁」）</li>
<li>園庭がない施設が多い</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>草津市では小規模保育の卒園児に対して、認可園への優先的な利用調整を行っています。3歳の壁を心配しすぎず、まずは入れる園を確保することが大切です。特に南草津駅周辺の激戦エリアでは、小規模保育を経由するルートも有効な戦略です。</p>
</div>

<div class="info-box">
<p><strong>情報</strong></p>
<p>草津市内の小規模保育事業所の一覧は、草津市子ども未来部子ども子育て推進課の窓口または公式サイトで確認できます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 35,
  },
  // ===== 同点対策 =====
  {
    slug: "tiebreaker-guide",
    citySlug: "kusatsu",
    title: "草津市で同点になったらどうなる？　優先順位のしくみ",
    description:
      "草津市の保育園入園選考で同点になった場合の優先順位と、事前にできる対策を解説します。",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>同点の場合の優先順位</h2>
<p>草津市では選考指数が同点の場合、以下の順番で優先されます。</p>

<ol>
<li>ひとり親世帯</li>
<li>希望する保育施設にきょうだいが在園している世帯</li>
<li>基本指数が高い世帯（調整指数による加点が少ない＝就労状況が安定）</li>
<li>草津市の居住期間が長い世帯</li>
<li>所得が低い世帯</li>
</ol>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>きょうだいが在園中の園を希望に入れると、指数+3点だけでなく同点時の優先順位でも有利になります。草津市は子育て世帯の転入が多く、フルタイム共働き40点で横並びになりやすいため、同点時の優先順位を意識することが重要です。</p>
</div>

<h2>対策のポイント</h2>
<ul>
<li>加点を1つでも積み上げて同点を避ける</li>
<li>きょうだいが在園中の園を第1希望にする</li>
<li>ボーダーラインが低い園も希望に入れる</li>
</ul>

<div class="info-box">
<p><strong>情報</strong></p>
<p>草津市では過去の入園最低指数を公開していることがあります。子ども子育て推進課の窓口で確認してみましょう。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 48,
  },
  // ===== 保育料 =====
  {
    slug: "nursery-fees",
    citySlug: "kusatsu",
    title: "草津市の保育料はいくら？　世帯年収別の目安を紹介",
    description:
      "草津市の認可保育園の保育料を世帯年収別にわかりやすく紹介します。無償化の対象も解説。",
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop",
    category: "お金の話",
    categoryColor: "rose",
    content: `<h2>保育料の決まり方</h2>
<p>草津市の認可保育園の保育料は、<span class="highlight">世帯の住民税額</span>と<span class="highlight">子どもの年齢</span>で決まります。</p>

<h2>3歳以上は無償化</h2>
<p>2019年10月からの幼児教育・保育の無償化により、<span class="highlight">3歳児クラス以上</span>の保育料は無料です。ただし給食費（副食費）は別途必要です。</p>

<h2>世帯年収別の保育料の目安（0〜2歳児）</h2>
<table>
<tr><th>世帯年収の目安</th><th>月額保育料の目安</th></tr>
<tr><td>〜300万円</td><td>0〜6,000円</td></tr>
<tr><td>300〜500万円</td><td>10,000〜25,000円</td></tr>
<tr><td>500〜700万円</td><td>25,000〜40,000円</td></tr>
<tr><td>700〜1,000万円</td><td>40,000〜55,000円</td></tr>
<tr><td>1,000万円〜</td><td>55,000〜64,000円</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>草津市では第2子の保育料は半額、第3子以降は無料になります。きょうだいが多い世帯は大きなメリットです。</p>
</div>

<div class="info-box">
<p><strong>注意</strong></p>
<p>上記はあくまで目安です。正確な保育料は住民税額で決まります。詳しくは草津市子ども未来部子ども子育て推進課にお問い合わせください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 42,
  },
  // ===== 見学ガイド =====
  {
    slug: "nursery-visit-guide",
    citySlug: "kusatsu",
    title: "草津市の保育園見学ガイド　チェックポイントと質問リスト",
    description:
      "草津市の保育園見学で確認すべきポイントと、先輩ママが聞いてよかった質問をまとめました。",
    image:
      "https://images.unsplash.com/photo-1544776193-352d25ca82cd?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>見学はいつ行くのがベスト？</h2>
<p><span class="highlight">6月〜9月</span>が見学のベストシーズンです。10月以降は申込直前で混み合います。草津市内の認可保育園は約25か所あるので、気になる園を絞り込んでから見学に行きましょう。</p>

<h2>見学時のチェックポイント</h2>
<ul>
<li>園児たちの表情や雰囲気</li>
<li>保育士の子どもへの接し方</li>
<li>園庭や室内の広さ・清潔さ</li>
<li>給食の内容（アレルギー対応）</li>
<li>持ち物の量（おむつの持参が必要か等）</li>
<li>登園・降園時の動線（駐車場・ベビーカー置き場等）</li>
</ul>

<h2>聞いておきたい質問リスト</h2>
<ul>
<li>延長保育は何時まで？ 料金は？</li>
<li>慣らし保育の期間はどのくらい？</li>
<li>急な発熱時のお迎えルール</li>
<li>保護者参加の行事はどのくらいある？</li>
<li>駐車場は何台分あるか？（草津市はJR利用と車利用が半々の家庭も多い）</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>見学はできるだけ複数の園を回りましょう。比較することで自分に合った園が見えてきます。草津市はJR草津駅・南草津駅から徒歩圏の園と、車での送迎が前提の園で雰囲気が異なります。通勤ルートに合った園を選ぶことが長く通い続けるコツです。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 38,
  },
];

registerArticles(articles);
