import type { Article } from "./types";
import { registerArticles } from "./index";

const articles: Article[] = [
  // ===== 保活の基本 (1) =====
  {
    slug: "hokatsu-schedule",
    citySlug: "ichikawa",
    title: "市川市の保活スケジュール　令和8年度4月入園の流れ",
    description:
      "市川市の認可保育園の申込時期・選考の流れ・結果通知の時期をわかりやすく解説。令和8年度4月入園のスケジュールを中心にまとめました。",
    image:
      "https://images.unsplash.com/photo-1484820540004-14229fe36ca4?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>令和8年度（2026年度）4月入園のスケジュール</h2>
<p>市川市の4月入園は<strong>一次利用調整</strong>と<strong>二次利用調整</strong>の2回に分かれています。市川市こども部保育課が窓口です。</p>

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
<p>一次で不承諾だった方は自動的に二次の選考対象になります。希望園の変更がある場合のみ届出が必要です。</p>
</div>

<h2>いつから動き始めるべき？</h2>

<div class="step">
<div class="step-num">1</div>
<div class="step-content">
<strong>4月〜5月：情報収集スタート</strong>
<p>市川市には認可保育園が約80か所あります。エリアや園の特徴を調べましょう。</p>
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
<p>市川市が発行する「保育園等利用案内」を入手しましょう。市川市こども部保育課や各支所で配布されます。</p>
</div>
</div>
<div class="step">
<div class="step-num">4</div>
<div class="step-content">
<strong>11月〜12月：申込書類の準備・提出</strong>
<p>就労証明書などの書類を揃えて提出します。</p>
</div>
</div>

<h2>途中入園（5月〜3月）の申込</h2>
<p>各月の申込締切日は、入園希望月の<span class="highlight">前月10日頃</span>です。詳しくは市川市の公式サイトをご確認ください。</p>`,
    publishedAt: "2026-04-07",
    popularity: 55,
  },
  // ===== 保活の基本 (2) =====
  {
    slug: "hokatsu-mistakes",
    citySlug: "ichikawa",
    title: "市川市の保活でよくある失敗と対策5選",
    description:
      "市川市の保活で初めてのママがやりがちな失敗パターンと、その対策をまとめました。",
    image:
      "https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>失敗1：情報収集のスタートが遅い</h2>
<p>市川市の4月入園の申込は<span class="highlight">11月</span>から始まります。見学の予約が埋まる前に動きましょう。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>遅くとも6月には情報収集を始めましょう。市川市は東京に隣接しており、ファミリー層の流入が多いエリアです。</p>
</div>

<h2>失敗2：希望園を少なく書く</h2>
<p>市川市では希望園を複数記入できます。1〜2園しか書かないと不承諾のリスクが高まります。通える範囲の園はできるだけ多く書きましょう。</p>

<h2>失敗3：自分の点数を把握していない</h2>
<p>市川市では「基本指数＋調整指数」の合計で選考されます。フルタイム共働きで<span class="highlight">40点</span>が基本ラインです。</p>

<h2>失敗4：加点の取りこぼし</h2>
<p>認可外保育施設に預けると<span class="highlight">+3点</span>、育休明けで<span class="highlight">+2点</span>の加点がつきます。使える加点は漏れなくチェックしましょう。</p>

<h2>失敗5：書類の不備</h2>
<p>就労証明書の記入漏れや指定様式以外の提出は受理されない場合があります。市川市こども部保育課の窓口で事前に確認するのが安心です。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>当サイトのシミュレーターで事前に点数を確認しておきましょう。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 50,
  },
  // ===== 選考のしくみ =====
  {
    slug: "scoring-system-guide",
    citySlug: "ichikawa",
    title: "市川市の入園点数のしくみ　基本指数と調整指数をやさしく解説",
    description:
      "市川市の保育園入園選考で使われる基本指数と調整指数の仕組みを、初めての方にもわかるように解説します。",
    image:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>点数ってなに？</h2>
<p>市川市の保育園入園は「先着順」ではなく「点数（指数）」の高い順に内定が決まります。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>選考指数 ＝ 基本指数（父）＋ 基本指数（母）＋ 調整指数</p>
</div>

<h2>基本指数とは？</h2>
<p>父母それぞれの「保育が必要な理由」を点数化したものです。1人あたり最大<span class="highlight">20点</span>で、父母合計の最大は<span class="highlight">40点</span>。</p>
<p>最も多い「就労」の場合、月20日以上かつ日8時間以上で満点の20点になります。</p>

<table>
<tr><th>就労状況</th><th>指数</th></tr>
<tr><td>月20日以上かつ日8時間以上</td><td>20</td></tr>
<tr><td>月20日以上かつ日6時間以上</td><td>18</td></tr>
<tr><td>月16日以上かつ日6時間以上</td><td>16</td></tr>
<tr><td>月16日以上かつ日4時間以上</td><td>14</td></tr>
<tr><td>月12日以上かつ日4時間以上</td><td>12</td></tr>
<tr><td>月64時間以上</td><td>10</td></tr>
</table>

<h2>調整指数とは？</h2>
<p>世帯の特別な事情に応じて加減される点数です。主な加点・減点は以下の通りです。</p>

<h3>加点</h3>
<ul>
<li>ひとり親世帯：<span class="highlight">+5点</span></li>
<li>きょうだいが在園中の園を希望：<span class="highlight">+3点</span></li>
<li>認可外保育施設の利用実績：<span class="highlight">+3点</span></li>
<li>生活保護受給中：<span class="highlight">+3点</span></li>
<li>きょうだい同時申込：<span class="highlight">+2点</span></li>
<li>育休明け復職予定：<span class="highlight">+2点</span></li>
</ul>

<h3>減点</h3>
<ul>
<li>市外からの申込：<span class="highlight">-10点</span></li>
<li>転園希望：<span class="highlight">-5点</span></li>
<li>同居の保育可能者あり：<span class="highlight">-3点</span></li>
</ul>`,
    publishedAt: "2026-04-07",
    popularity: 65,
  },
  // ===== 点数アップ =====
  {
    slug: "score-up-checklist",
    citySlug: "ichikawa",
    title: "市川市で点数を1点でも上げる方法　加点のチェックリスト",
    description:
      "市川市の入園選考で調整指数の加点を最大限に活用する方法を、チェックリスト形式で解説します。",
    image:
      "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>加点の取りこぼしをなくそう</h2>
<p>市川市の入園選考では<span class="highlight">1点</span>の差が明暗を分けることも。使える加点は漏れなく活用しましょう。</p>

<h3>加点チェックリスト</h3>

<ul>
<li>認可外保育施設に月ぎめで預けている → <span class="highlight">+3点</span></li>
<li>きょうだいが希望施設に在園中 → <span class="highlight">+3点</span></li>
<li>ひとり親で就労中 → <span class="highlight">+5点</span></li>
<li>生活保護受給中 → <span class="highlight">+3点</span></li>
<li>きょうだいと同時に申し込む → <span class="highlight">+2点</span></li>
<li>育休・産休から入園月に復帰予定 → <span class="highlight">+2点</span></li>
</ul>

<div class="info-box">
<p><strong>情報</strong></p>
<p>市川市では認可外保育施設の利用実績による加点が大きな武器になります。0歳児クラスで認可外に預けてから1歳児クラスで認可園を狙う「認可外加点戦略」は市川市でも有効です。</p>
</div>

<h2>減点にも注意</h2>
<ul>
<li>市川市外から申し込む → <span class="highlight">-10点</span></li>
<li>転園を希望する → <span class="highlight">-5点</span></li>
<li>同居の保育可能な方がいる → <span class="highlight">-3点</span></li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>転入予定で市外から申し込む場合は-10点のハンデがあるため、転入後に申し込むほうが有利です。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 60,
  },
  // ===== エリア情報 =====
  {
    slug: "area-guide",
    citySlug: "ichikawa",
    title: "市川市の保育園マップ　エリアごとの入りやすさを比較",
    description:
      "市川市内のエリアごとの保育園の競争率や特徴をまとめました。人口約50万人の市川市で保活を成功させるヒント。",
    image:
      "https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?w=800&h=400&fit=crop",
    category: "エリア情報",
    categoryColor: "purple",
    content: `<h2>市川市の保育園事情</h2>
<p>市川市は千葉県北西部に位置し、人口約50万人。東京都に隣接しているため通勤利便性が高く、ファミリー層に人気のエリアです。認可保育園は約80か所あります。</p>

<h2>エリアごとの競争率</h2>

<h3>競争率が高いエリア</h3>
<ul>
<li><strong>本八幡エリア</strong>：市の中心部で駅近の園は激戦。都営新宿線の始発駅で通勤に便利なためファミリー層が多い</li>
<li><strong>市川駅周辺エリア</strong>：JR総武線沿線で東京への通勤に便利。再開発が進み人気上昇中</li>
<li><strong>南行徳・行徳エリア</strong>：東西線沿線で東京へのアクセスが良好。マンション開発で若い世帯が増加</li>
</ul>

<h3>比較的入りやすいエリア</h3>
<ul>
<li><strong>北部エリア（大野・柏井）</strong>：駅から離れるため競争率が下がる傾向</li>
<li><strong>中山エリア</strong>：園の数が多く比較的選択肢がある</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>市川市の公式サイトで過去の利用調整結果（内定最低指数）が公開されています。希望園を選ぶ際の参考にしましょう。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 45,
  },
  // ===== 認可外 =====
  {
    slug: "ninkagai-guide",
    citySlug: "ichikawa",
    title: "市川市の認可外保育施設ガイド　加点を得るための活用法",
    description:
      "市川市で認可園に入れなかった場合の選択肢として、認可外保育施設の活用法と加点の仕組みを解説します。",
    image:
      "https://images.unsplash.com/photo-1587654780291-39c9404d7dd0?w=800&h=400&fit=crop",
    category: "認可外保育",
    categoryColor: "teal",
    content: `<h2>認可外保育施設とは？</h2>
<p>認可外保育施設は、認可基準を満たしていないものの、自治体に届出をして運営している保育施設です。市川市にも多数の認可外保育施設があります。</p>

<h2>認可外を利用するメリット</h2>
<ul>
<li>認可園の選考に落ちても預け先が確保できる</li>
<li>翌年度の認可園申込で<span class="highlight">+3点</span>の加点がつく</li>
<li>施設によっては認可園より柔軟な保育時間</li>
</ul>

<h2>認可外加点の条件</h2>
<p>市川市で認可外保育施設利用による加点（+3点）を得るには、月ぎめで継続的に利用していることが条件です。</p>

<div class="info-box">
<p><strong>情報</strong></p>
<p>市川市では0歳児クラスから認可外に預け、1歳児クラスの4月入園で認可園を狙う方法が有効です。加点+3が得られるため、フルタイム共働き40点に加えて43点で勝負できます。</p>
</div>

<h2>認可外保育施設の探し方</h2>

<div class="step">
<div class="step-num">1</div>
<div class="step-content">
<strong>市川市の公式サイトで一覧を確認</strong>
<p>認可外保育施設の一覧が公開されています。</p>
</div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content">
<strong>見学して比較する</strong>
<p>複数の施設を見学し、保育方針や料金を比較しましょう。</p>
</div>
</div>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>認可外に預けながら翌年度の認可園を再申請すると、加点（+3）がつくため入りやすくなります。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 40,
  },
  // ===== 小規模保育 =====
  {
    slug: "small-nursery",
    citySlug: "ichikawa",
    title: "市川市の小規模保育って？　メリット・デメリットを解説",
    description:
      "市川市の小規模保育事業の特徴やメリット・デメリット、卒園後の進路について解説します。",
    image:
      "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>小規模保育事業とは？</h2>
<p>定員6〜19人の少人数で保育を行う施設です。対象は<span class="highlight">0〜2歳児</span>のみ。3歳以降は連携施設や別の保育園に転園します。</p>

<h2>市川市の小規模保育の特徴</h2>
<p>市川市では小規模保育事業所が複数あり、特に駅近のエリアに多く設置されています。認可園に比べて入りやすい傾向があります。</p>

<h2>メリット</h2>
<ul>
<li>少人数でアットホームな環境</li>
<li>認可園より比較的入りやすい</li>
<li>卒園時に連携施設への優先枠がある場合がある</li>
<li>駅近に設置されていることが多く通園に便利</li>
</ul>

<h2>デメリット</h2>
<ul>
<li>3歳で転園が必要（いわゆる「3歳の壁」）</li>
<li>園庭がない施設が多い</li>
<li>行事が少ない傾向</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>市川市では小規模保育の卒園児に対して、連携施設への優先利用調整を行っています。3歳の壁を心配しすぎる必要はありませんが、事前に連携先を確認しておきましょう。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 35,
  },
  // ===== 同点対策 =====
  {
    slug: "tiebreaker-guide",
    citySlug: "ichikawa",
    title: "市川市で同点になったらどうなる？　優先順位のしくみ",
    description:
      "市川市の保育園入園選考で同点になった場合の優先順位と、事前にできる対策を解説します。",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>同点の場合の優先順位</h2>
<p>市川市では選考指数が同点の場合、以下のような順番で優先されます。</p>

<ol>
<li>ひとり親世帯</li>
<li>希望する保育施設にきょうだいが在園している世帯</li>
<li>市川市に引き続き居住している期間が長い世帯</li>
<li>基本指数が高い世帯</li>
<li>所得が低い世帯</li>
</ol>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>きょうだいが在園中の園を希望に入れると、指数+3だけでなく同点時の優先順位でも有利になります。</p>
</div>

<h2>フルタイム共働き（40点）で同点になったら？</h2>
<p>市川市では基本指数の満点が40点です。フルタイム共働きの世帯は40点で横並びになるため、調整指数の加点が勝負を分けます。</p>

<h3>同点を避けるための対策</h3>
<ul>
<li>認可外保育施設を利用して<span class="highlight">+3点</span>を確保する</li>
<li>育休復帰予定の届出で<span class="highlight">+2点</span>を確保する</li>
<li>きょうだいが在園中の園を第1希望にする</li>
<li>ボーダーラインが低い園も希望に入れる</li>
</ul>`,
    publishedAt: "2026-04-07",
    popularity: 48,
  },
  // ===== 保育料 =====
  {
    slug: "nursery-fees",
    citySlug: "ichikawa",
    title: "市川市の保育料はいくら？　世帯年収別の目安を紹介",
    description:
      "市川市の認可保育園の保育料を世帯年収別にわかりやすく紹介します。無償化の対象も解説。",
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop",
    category: "お金の話",
    categoryColor: "rose",
    content: `<h2>保育料の決まり方</h2>
<p>市川市の認可保育園の保育料は、<span class="highlight">世帯の住民税額</span>と<span class="highlight">子どもの年齢</span>で決まります。</p>

<h2>3歳以上は無償化</h2>
<p>2019年10月からの幼児教育・保育の無償化により、<span class="highlight">3歳児クラス以上</span>の保育料は無料です。ただし給食費（副食費）は実費負担となります。</p>

<h2>世帯年収別の保育料の目安（0〜2歳児）</h2>
<table>
<tr><th>世帯年収の目安</th><th>月額保育料の目安</th></tr>
<tr><td>〜300万円</td><td>0〜6,000円</td></tr>
<tr><td>300〜500万円</td><td>10,000〜25,000円</td></tr>
<tr><td>500〜700万円</td><td>25,000〜42,000円</td></tr>
<tr><td>700〜1,000万円</td><td>42,000〜58,000円</td></tr>
<tr><td>1,000万円〜</td><td>58,000〜70,000円</td></tr>
</table>

<div class="info-box">
<p><strong>情報</strong></p>
<p>市川市では第2子以降の保育料が軽減される制度があります。きょうだいの状況によっては保育料が半額や無料になる場合があります。</p>
</div>

<h2>保育料以外にかかる費用</h2>
<ul>
<li>延長保育料：利用した場合のみ</li>
<li>給食費（3歳以上）：月4,500〜5,500円程度</li>
<li>教材費・行事費：園によって異なる</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>正確な保育料は住民税額で決まります。市川市こども部保育課に問い合わせると、具体的な金額を教えてもらえます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 42,
  },
  // ===== 見学ガイド =====
  {
    slug: "nursery-visit-guide",
    citySlug: "ichikawa",
    title: "市川市の保育園見学ガイド　チェックポイントと質問リスト",
    description:
      "市川市の保育園見学で確認すべきポイントと、先輩ママが聞いてよかった質問をまとめました。",
    image:
      "https://images.unsplash.com/photo-1544776193-352d25ca82cd?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>見学はいつ行くのがベスト？</h2>
<p><span class="highlight">6月〜9月</span>が見学のベストシーズンです。10月以降は申込直前で混み合います。市川市には約80か所の認可保育園があるので、エリアを絞って計画的に回りましょう。</p>

<h2>見学時のチェックポイント</h2>
<ul>
<li>園児たちの表情や雰囲気</li>
<li>保育士の子どもへの接し方</li>
<li>園庭や室内の広さ・清潔さ</li>
<li>給食の内容（アレルギー対応）</li>
<li>持ち物の量（おむつの持参が必要か等）</li>
<li>登園・降園時の動線（ベビーカー置き場・駐輪場）</li>
</ul>

<h2>聞いておきたい質問リスト</h2>
<ul>
<li>延長保育は何時まで？ 料金は？</li>
<li>慣らし保育の期間はどのくらい？</li>
<li>急な発熱時のお迎えルール</li>
<li>保護者参加の行事はどのくらいある？</li>
<li>災害時の避難先・連絡体制</li>
</ul>

<div class="info-box">
<p><strong>情報</strong></p>
<p>市川市は東京に隣接しているため、通勤経路上の園も候補に入れると選択肢が広がります。JR総武線・東西線・京成線沿線の園をチェックしましょう。</p>
</div>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>見学はできるだけ複数の園を回りましょう。比較することで自分に合った園が見えてきます。見学メモを残しておくと、希望順位を決めるときに役立ちます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 38,
  },
];

registerArticles(articles);
