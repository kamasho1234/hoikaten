import type { Article } from "./types";
import { registerArticles } from "./index";

const articles: Article[] = [
  // ===== 保活の基本 (1) =====
  {
    slug: "hokatsu-schedule",
    citySlug: "nasushiobara",
    title: "那須塩原市の保活スケジュール　令和8年度4月入園の流れ",
    description:
      "那須塩原市の認可保育園の申込時期・選考の流れ・結果通知の時期をわかりやすく解説。令和8年度4月入園のスケジュールを中心にまとめました。",
    image:
      "https://images.unsplash.com/photo-1484820540004-14229fe36ca4?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>令和8年度（2026年度）4月入園のスケジュール</h2>
<p>那須塩原市の4月入園は<strong>一次利用調整</strong>と<strong>二次利用調整</strong>の2回に分かれています。申込先は那須塩原市保育課です。</p>

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
<p>那須塩原市は人口約12万人で、北関東の田園地帯に広がる自然豊かな地域です。一次で不承諾だった方は自動的に二次の対象になります。</p>
</div>

<h2>いつから動き始めるべき？</h2>

<div class="step">
<div class="step-num">1</div>
<div class="step-content">
<strong>4月〜5月：情報収集スタート</strong>
<p>那須塩原市の認可保育園は約25か所。西那須野地域・黒磯地域を中心に園を調べましょう。</p>
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
<p>那須塩原市が発行する「保育施設利用のご案内」を入手しましょう。</p>
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
<p>各月の申込締切日は、入園希望月の<span class="highlight">前月10日頃</span>です。詳しくは那須塩原市の公式サイトをご確認ください。</p>`,
    publishedAt: "2026-04-29",
    popularity: 47,
  },
  // ===== 保活の基本 (2) =====
  {
    slug: "hokatsu-mistakes",
    citySlug: "nasushiobara",
    title: "那須塩原市の保活でよくある失敗と対策5選",
    description:
      "那須塩原市の保活で初めてのママがやりがちな失敗パターンと、その対策をまとめました。",
    image:
      "https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>失敗1：情報収集のスタートが遅い</h2>
<p>那須塩原市の4月入園の申込は<span class="highlight">11月</span>から始まります。見学の予約が埋まる前に動きましょう。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>遅くとも6月には情報収集を始めましょう。那須塩原市は広い地域で、園が点在しています。</p>
</div>

<h2>失敗2：希望園を少なく書く</h2>
<p>那須塩原市では希望園を複数記入できます。1〜2園しか書かないと不承諾のリスクが高まります。通える範囲の園はできるだけ多く書きましょう。</p>

<h2>失敗3：自分の点数を把握していない</h2>
<p>那須塩原市では「基本指数＋調整指数」の合計で選考されます。フルタイム共働きで<span class="highlight">40点</span>が基本ラインです。</p>

<h2>失敗4：加点の取りこぼし</h2>
<p>認可外保育施設に預けると<span class="highlight">+3点</span>、育休明けで<span class="highlight">+2点</span>の加点がつきます。使える加点は漏れなくチェックしましょう。</p>

<h2>失敗5：書類の不備</h2>
<p>就労証明書の記入漏れや指定様式以外の提出は受理されない場合があります。</p>

<div class="info-box">
<p><strong>情報</strong></p>
<p>那須塩原市保育課の窓口で、申込前に書類の事前確認ができます。不安な方は活用しましょう。</p>
</div>`,
    publishedAt: "2026-04-29",
    popularity: 44,
  },
  // ===== 保活の基本 (3) =====
  {
    slug: "hokatsu-basics",
    citySlug: "nasushiobara",
    title: "那須塩原市での保活、いつから始めるべき？　新米ママ向けガイド",
    description:
      "那須塩原市で初めて保活をする方向けに、いつから何を始めるべきかをステップごとに解説します。",
    image:
      "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>保活ってなに？</h2>
<p>保活（ほかつ）とは、認可保育園への入園を目指して活動することです。那須塩原市は人口約12万人で、自然豊かなエリアです。</p>

<h2>那須塩原市の保育園の種類</h2>
<ul>
<li><strong>認可保育園</strong>：那須塩原市が認可した園。保育料は世帯年収に応じて決定。選考は指数方式。</li>
<li><strong>小規模保育事業</strong>：定員6〜19人の少人数保育。0〜2歳児対象。</li>
<li><strong>認定こども園</strong>：保育と教育の両方を行う施設。</li>
<li><strong>認可外保育施設</strong>：認可基準を満たさないが届出済みの施設。</li>
</ul>

<h2>いつから始める？</h2>

<div class="step">
<div class="step-num">1</div>
<div class="step-content">
<strong>妊娠中・出産直後</strong>
<p>那須塩原市の「保育施設利用のご案内」を入手し、園の一覧と基本指数システムを理解しましょう。</p>
</div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content">
<strong>生後3〜4ヶ月以降</strong>
<p>本格的な情報収集と園選びスタート。保育園見学は6月以降がベストです。</p>
</div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content">
<strong>秋（10月〜11月）</strong>
<p>申込書類の準備と提出。就労証明書や住所確認書類などを集めます。</p>
</div>
</div>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>那須塩原市は広大な地域なので、園の立地条件によって通園時間が大きく変わります。早めの準備が成功のカギです。</p>
</div>`,
    publishedAt: "2026-04-29",
    popularity: 40,
  },
  // ===== 保活の基本 (4) =====
  {
    slug: "point-system",
    citySlug: "nasushiobara",
    title: "那須塩原市の基本指数システム　40点満点の仕組みをわかりやすく",
    description:
      "那須塩原市の保育園入園選考で最も重要な基本指数システムについて、初心者向けに詳しく解説します。",
    image:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>基本指数とは</h2>
<p>那須塩原市の保育園入園は「先着順」ではなく「基本指数＋調整指数」の合計点で選考されます。基本指数は父母それぞれの「保育が必要な理由」を数値化したものです。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>選考指数 ＝ 基本指数（父）＋ 基本指数（母）＋ 調整指数</p>
<p>父母の基本指数は各最大20点、合計最大40点です。</p>
</div>

<h2>基本指数の主な項目（父・母それぞれ）</h2>
<table>
<tr><th>保育が必要な理由</th><th>最高点</th></tr>
<tr><td>就労（月160時間以上）</td><td>20点</td></tr>
<tr><td>出産予定・出産直後</td><td>20点</td></tr>
<tr><td>疾病・障害</td><td>17〜20点</td></tr>
<tr><td>介護・看護</td><td>18〜20点</td></tr>
<tr><td>就学</td><td>18〜20点</td></tr>
<tr><td>求職活動中</td><td>10点</td></tr>
</table>

<h2>フルタイム共働きの場合</h2>
<p>父・母ともに月160時間以上の就労で、各20点ずつ、基本指数の合計は<span class="highlight">40点</span>になります。これが最高得点です。</p>`,
    publishedAt: "2026-04-29",
    popularity: 51,
  },
  // ===== 選考のしくみ (1) =====
  {
    slug: "scoring-system-guide",
    citySlug: "nasushiobara",
    title: "那須塩原市の入園点数のしくみ　基本指数と調整指数をやさしく解説",
    description:
      "那須塩原市の保育園入園選考で使われる基本指数と調整指数の仕組みを、初めての方にもわかるように解説します。",
    image:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>那須塩原市の選考指数の仕組み</h2>
<p>那須塩原市では「基本指数＋調整指数」の合計で入園の可否が決まります。高い点数の家庭から順に承諾されます。</p>

<h3>調整指数とは？</h3>
<p>世帯の特別な事情に応じて加減される点数です。プラス（加点）とマイナス（減点）があります。</p>

<h3>主な加算項目</h3>
<ul>
<li>ひとり親世帯：<span class="highlight">+5点</span></li>
<li>きょうだいが在園中：<span class="highlight">+3点</span></li>
<li>認可外保育利用実績：<span class="highlight">+3点</span></li>
<li>生活保護受給：<span class="highlight">+3点</span></li>
<li>育休明け復職予定：<span class="highlight">+2点</span></li>
<li>きょうだい同時申込：<span class="highlight">+2点</span></li>
</ul>

<h3>主な減算項目</h3>
<ul>
<li>市外からの申込：<span class="highlight">-5点</span></li>
<li>同居祖父母が保育可能：<span class="highlight">-4点</span></li>
<li>認可園からの転園希望：<span class="highlight">-3点</span></li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>1点の差が内定を左右することもあります。使える加点は必ず申請書で記載しましょう。</p>
</div>`,
    publishedAt: "2026-04-29",
    popularity: 56,
  },
  // ===== 選考のしくみ (2) =====
  {
    slug: "selection-process",
    citySlug: "nasushiobara",
    title: "那須塩原市の保育園選考フロー　書類提出から入園決定まで",
    description:
      "那須塩原市の保育園入園選考の全フローを、各ステップごとに詳しく解説します。",
    image:
      "https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>選考フロー</h2>

<div class="step">
<div class="step-num">1</div>
<div class="step-content">
<strong>申込書・必要書類の提出</strong>
<p>11月〜12月中に、那須塩原市保育課へ提出します。書類には基本指数と調整指数に関する情報を記載します。</p>
</div>
</div>

<div class="step">
<div class="step-num">2</div>
<div class="step-content">
<strong>指数の計算</strong>
<p>那須塩原市が申込書類に基づいて「基本指数＋調整指数」を計算します。不明な点があれば確認の連絡が来ます。</p>
</div>
</div>

<div class="step">
<div class="step-num">3</div>
<div class="step-content">
<strong>利用調整（マッチング）</strong>
<p>指数の高い順に、希望園との相性を調整します。全員の希望を叶えられるわけではありません。</p>
</div>
</div>

<div class="step">
<div class="step-num">4</div>
<div class="step-content">
<strong>結果通知</strong>
<p>一次は1月下旬、二次は3月上旬に通知が届きます。承諾・不承諾が告知されます。</p>
</div>
</div>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>書類の不備は不承諾の大きな要因です。提出前に必ずチェックシートで確認しましょう。</p>
</div>`,
    publishedAt: "2026-04-29",
    popularity: 45,
  },
  // ===---- 点数アップ =====
  {
    slug: "score-up-checklist",
    citySlug: "nasushiobara",
    title: "那須塩原市で点数を1点でも上げる方法　加点のチェックリスト",
    description:
      "那須塩原市の入園選考で調整指数の加点を最大限に活用する方法を、チェックリスト形式で解説します。",
    image:
      "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>加点の取りこぼしをなくそう</h2>
<p>那須塩原市の入園選考では<span class="highlight">1点</span>の差が明暗を分けることも。使える加点は漏れなく活用しましょう。</p>

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
<p>認可外保育施設に預けながら翌年の4月入園を申し込むと、+3点の加点がつくため入りやすくなります。0歳児クラスで認可外に預け、1歳児クラスで認可園を狙うのは那須塩原市でも有効な戦略です。</p>
</div>

<div class="info-box">
<p><strong>注意すべき減点項目</strong></p>
<p>那須塩原市外からの申込は-5点、同居祖父母が保育可能な場合は-4点、認可園からの転園は-3点の減点があります。</p>
</div>`,
    publishedAt: "2026-04-29",
    popularity: 52,
  },
  // ===== エリア情報 =====
  {
    slug: "area-guide",
    citySlug: "nasushiobara",
    title: "那須塩原市の保育園マップ　エリアごとの入りやすさを比較",
    description:
      "那須塩原市内のエリアごとの保育園の競争率や特徴をまとめました。",
    image:
      "https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?w=800&h=400&fit=crop",
    category: "エリア情報",
    categoryColor: "purple",
    content: `<h2>那須塩原市の保育園事情</h2>
<p>那須塩原市は栃木県北部に位置する人口約12万人の広大なエリアで、西那須野地域と黒磯地域に分かれています。認可保育園は約25か所あります。</p>

<h2>エリアごとの競争率</h2>

<h3>競争率が高いエリア</h3>
<ul>
<li><strong>黒磯駅周辺</strong>：駅近の園は人気が集中。0歳児・1歳児クラスは激戦</li>
<li><strong>西那須野地域</strong>：工業団地周辺で企業のファミリー層が集中</li>
</ul>

<h3>比較的入りやすいエリア</h3>
<ul>
<li><strong>大田原方面</strong>：隣接市との関係で、比較的空きがある園も</li>
<li><strong>鍋掛・豊浦エリア</strong>：郊外で静かな環境の園が多い</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>那須塩原市の公式サイトで保育施設ごとの空き状況が公開されています。希望園を決める前に必ず確認しましょう。</p>
</div>`,
    publishedAt: "2026-04-29",
    popularity: 41,
  },
  // ===== 認可外 =====
  {
    slug: "ninkagai-guide",
    citySlug: "nasushiobara",
    title: "那須塩原市の認可外保育施設ガイド　認可園との違いは？",
    description:
      "那須塩原市で認可園に入れなかった場合の選択肢として、認可外保育施設について解説します。",
    image:
      "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&h=400&fit=crop",
    category: "認可外保育",
    categoryColor: "teal",
    content: `<h2>認可外保育施設とは？</h2>
<p>認可外保育施設は、認可基準を満たしていないものの、自治体に届出をして運営している保育施設です。那須塩原市内にも複数の認可外保育施設があります。</p>

<h2>認可園との違い</h2>
<table>
<tr><th>項目</th><th>認可</th><th>認可外</th></tr>
<tr><td>保育料</td><td>所得に応じて決定</td><td>施設が設定</td></tr>
<tr><td>申込先</td><td>那須塩原市保育課</td><td>施設に直接</td></tr>
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
</ul>`,
    publishedAt: "2026-04-29",
    popularity: 36,
  },
  // ===== 保育料 =====
  {
    slug: "nursery-fees",
    citySlug: "nasushiobara",
    title: "那須塩原市の保育料はいくら？　世帯年収別の目安を紹介",
    description:
      "那須塩原市の認可保育園の保育料を世帯年収別にわかりやすく紹介します。無償化の対象も解説。",
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop",
    category: "お金の話",
    categoryColor: "rose",
    content: `<h2>保育料の決まり方</h2>
<p>那須塩原市の認可保育園の保育料は、<span class="highlight">世帯の住民税額</span>と<span class="highlight">子どもの年齢</span>で決まります。</p>

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
<p>那須塩原市では第2子の保育料は半額、第3子以降は無料になります（年収制限なし）。きょうだいが多い世帯は大きなメリットです。</p>
</div>

<div class="info-box">
<p><strong>注意</strong></p>
<p>上記はあくまで目安です。正確な保育料は住民税額で決まります。詳しくは那須塩原市保育課にお問い合わせください。</p>
</div>`,
    publishedAt: "2026-04-29",
    popularity: 35,
  },
  // ===== 見学ガイド =====
  {
    slug: "nursery-visit-guide",
    citySlug: "nasushiobara",
    title: "那須塩原市の保育園見学ガイド　チェックポイントと質問リスト",
    description:
      "那須塩原市の保育園見学で確認すべきポイントと、先輩ママが聞いてよかった質問をまとめました。",
    image:
      "https://images.unsplash.com/photo-1544776193-352d25ca82cd?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>見学はいつ行くのがベスト？</h2>
<p><span class="highlight">6月〜9月</span>が見学のベストシーズンです。10月以降は申込直前で混み合います。那須塩原市内の認可保育園は約25か所あるので、気になる園を絞り込んでから見学に行きましょう。</p>

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
<li>駐車場は何台分あるか？（那須塩原市は車利用の家庭が多い）</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>見学はできるだけ複数の園を回りましょう。比較することで自分に合った園が見えてきます。那須塩原市は広大なエリアなので、通園時間も重要な判断基準です。</p>
</div>`,
    publishedAt: "2026-04-29",
    popularity: 32,
  },
];

registerArticles(articles);
