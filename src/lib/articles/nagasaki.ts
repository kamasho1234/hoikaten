import type { Article } from "./types";
import { registerArticles } from "./index";

const articles: Article[] = [
  // ========== 保活の基本 ==========
  {
    slug: "hokatsu-schedule",
    citySlug: "nagasaki",
    title: "長崎市の保活スケジュール　令和8年度4月入園の流れ",
    description:
      "長崎市の令和8年度（2026年度）4月入園の申込時期・書類配布・結果通知の時期をまとめました。初めての保活でも迷わないスケジュールガイドです。",
    image:
      "https://images.unsplash.com/photo-1484820540004-14229fe36ca4?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>令和8年度（2026年度）4月入園のスケジュール</h2>
<p>長崎市の認可保育所・認定こども園の4月入園は、毎年秋ごろに一斉受付が行われます。申込先は長崎市こども部幼児課または各地域センターです。</p>

<h3>スケジュールの目安</h3>
<table>
<tr><th>項目</th><th>日程（目安）</th></tr>
<tr><td>申請書類配布開始</td><td>2025年9月頃〜</td></tr>
<tr><td>一斉申込受付</td><td>2025年10月〜11月頃</td></tr>
<tr><td>1次結果通知</td><td>2026年1月下旬〜2月頃</td></tr>
<tr><td>2次募集（空きがある場合）</td><td>2026年2月〜3月頃</td></tr>
</table>

<p>1次で入園が決まらなかった場合は、2次募集や年度途中の空き待ちで再度選考されます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>長崎市では窓口申込が基本です。こども部幼児課（095-829-1142）に電話で事前確認してから訪問するとスムーズです。</p>
</div>

<h2>いつから動き始めるべき？</h2>
<div class="step">
<div class="step-num">1</div>
<div class="step-content"><strong>4月〜6月：情報収集</strong><p>長崎市の「保育所等利用案内」を市のホームページまたは窓口で入手しましょう。</p></div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content"><strong>6月〜9月：保育園見学</strong><p>気になる園に電話して見学予約。長崎市は坂が多いため通園経路の確認も大切です。</p></div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content"><strong>9月〜10月：書類準備</strong><p>就労証明書などを勤務先に依頼し、余裕を持って準備します。</p></div>
</div>
<div class="step">
<div class="step-num">4</div>
<div class="step-content"><strong>10月〜11月：申込</strong><p>必要書類を揃え、期限内に窓口へ提出します。</p></div>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>最新の申込方法は<a href="https://www.city.nagasaki.lg.jp/site/e-kao/20145.html" target="_blank" rel="noopener">長崎市公式サイト「幼稚園・保育所・認定こども園の利用手続き」</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-04-04",
    popularity: 55,
  },

  // ========== 点数・選考 ==========
  {
    slug: "scoring-system-guide",
    citySlug: "nagasaki",
    title: "長崎市の入園点数のしくみ　基本点数と調整点数をやさしく解説",
    description:
      "長崎市の保育園入園選考で使われる「基本点数」と「調整点数」の仕組みを、初めての方にもわかるように解説します。",
    image:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>点数制度の全体像</h2>
<p>長崎市の認可保育所等は「先着順」ではなく、<strong>保育の必要性の高い世帯から優先</strong>して利用調整（選考）されます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>合計点数 ＝ 基本点数（保護者1）＋ 基本点数（保護者2）＋ 調整点数</p>
</div>

<h2>基本点数とは</h2>
<p>保護者それぞれの「保育を必要とする事由」を点数化したものです。1人あたり<span class="highlight">最大100点</span>、保護者2人の合計で<span class="highlight">最大200点</span>です。</p>
<table>
<tr><th>就労状況</th><th>基本点数</th></tr>
<tr><td>月20日以上・1日8時間以上（月160時間以上）</td><td>100</td></tr>
<tr><td>月20日以上・1日6時間以上（月120時間以上）</td><td>90</td></tr>
<tr><td>月16日以上・1日6時間以上（月96時間以上）</td><td>80</td></tr>
<tr><td>月12日以上・1日4時間以上（月64時間以上）</td><td>70</td></tr>
</table>
<p>就労以外にも、疾病・障害・介護・出産・就学・求職活動などの事由ごとに基本点数が定められています。</p>

<h2>調整点数とは</h2>
<p>世帯の状況に応じて加点・減点される点数です。</p>
<table>
<tr><th>項目</th><th>点数</th></tr>
<tr><td>ひとり親世帯</td><td>+10</td></tr>
<tr><td>小規模保育等の卒園に伴う転所</td><td>+10</td></tr>
<tr><td>きょうだい在園中（同じ園を希望）</td><td>+5</td></tr>
<tr><td>認可外保育施設を利用中</td><td>+5</td></tr>
<tr><td>育児休業からの復帰予定</td><td>+5</td></tr>
<tr><td>生活保護受給世帯</td><td>+5</td></tr>
<tr><td>同居の祖父母（65歳未満）</td><td>-2</td></tr>
</table>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳細は<a href="https://www.city.nagasaki.lg.jp/site/e-kao/20145.html" target="_blank" rel="noopener">長崎市公式サイト</a>で配布される利用案内をご確認ください。</p>
</div>`,
    publishedAt: "2026-04-04",
    popularity: 60,
  },

  // ========== 加点のコツ ==========
  {
    slug: "katen-no-kotsu",
    citySlug: "nagasaki",
    title: "長崎市で加点を増やすコツ　調整点数アップの具体策",
    description:
      "長崎市の保育園入園選考で調整点数を上げるための具体的な方法を解説。認可外利用やきょうだい加点など、知っておきたいポイントをまとめました。",
    image:
      "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>フルタイム共働き200点は安心？</h2>
<p>長崎市では保護者がともにフルタイム勤務（月160時間以上）であれば、各100点ずつで<span class="highlight">基本200点</span>です。多くの申込者がこのラインに並ぶため、人気園では200点だけでは安心できません。</p>

<h2>加点を増やす具体策</h2>
<h3>1. 認可外保育施設を利用する（+5点）</h3>
<p>認可外施設に月ぎめで預けて復職すると、利用調整で+5点を得られます。長崎市内には認可外施設が複数あるので、一時的に利用する戦略も有効です。</p>

<h3>2. きょうだい加点を活かす（+5点）</h3>
<p>上のお子さんが在園中の園を第1希望にすると+5点。きょうだいで同じ園に通えるメリットもあります。</p>

<h3>3. 育休復帰のタイミング（+5点）</h3>
<p>入園月に職場復帰する場合は+5点が加算されます。復帰時期を4月に合わせると加点が得られます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>認可外利用（+5）＋きょうだい加点（+5）＋育休復帰（+5）を組み合わせれば、基本200点に+15点で215点も可能です。</p>
</div>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>就労証明書に記載される就労時間がそのまま点数に反映されます。育休復帰後に時短勤務の場合は基本点数が下がる可能性があるため、事前に確認しましょう。</p>
</div>`,
    publishedAt: "2026-04-04",
    popularity: 55,
  },

  // ========== 認可vs認可外 ==========
  {
    slug: "ninka-vs-ninkagai",
    citySlug: "nagasaki",
    title: "長崎市の認可保育園と認可外保育施設の違い　選び方ガイド",
    description:
      "長崎市で認可保育園と認可外保育施設のどちらを選ぶべきか。費用・保育内容・入りやすさの違いをわかりやすく比較します。",
    image:
      "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=800&h=400&fit=crop",
    category: "保育園選び",
    categoryColor: "teal",
    content: `<h2>認可と認可外の基本的な違い</h2>
<table>
<tr><th>項目</th><th>認可保育園</th><th>認可外保育施設</th></tr>
<tr><td>設置基準</td><td>国の基準を満たす</td><td>都道府県に届出</td></tr>
<tr><td>保育料</td><td>所得に応じた負担</td><td>施設が独自に設定</td></tr>
<tr><td>申込先</td><td>長崎市役所</td><td>施設に直接</td></tr>
<tr><td>選考</td><td>利用調整（点数制）</td><td>先着順が多い</td></tr>
</table>

<h2>長崎市の認可外保育施設の特徴</h2>
<p>長崎市内にはいくつかの認可外保育施設があり、月額3万〜7万円程度が目安です。認可園に入れなかった場合の受け皿として利用するケースが多く見られます。</p>

<h3>認可外を利用するメリット</h3>
<ul>
<li>先着順で入園しやすい</li>
<li>次年度の認可園申込で加点（+5点）が得られる</li>
<li>延長保育や休日保育に柔軟に対応する施設もある</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>認可外施設の利用実績で加点を得て翌年度の認可園申込に臨む「認可外ステップ」は、長崎市でも有効な保活戦略です。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>長崎市内の認可外保育施設の一覧は<a href="https://www.city.nagasaki.lg.jp/site/e-kao/20145.html" target="_blank" rel="noopener">長崎市公式サイト</a>や長崎県のホームページで確認できます。</p>
</div>`,
    publishedAt: "2026-04-04",
    popularity: 40,
  },

  // ========== 見学チェックリスト ==========
  {
    slug: "kengaku-checklist",
    citySlug: "nagasaki",
    title: "長崎市の保育園見学チェックリスト　確認すべき10のポイント",
    description:
      "長崎市で保育園見学に行くとき確認すべきポイントを10項目のチェックリストにまとめました。坂の多い長崎ならではの注意点も紹介します。",
    image:
      "https://images.unsplash.com/photo-1524813686514-a57563d77965?w=800&h=400&fit=crop",
    category: "保育園選び",
    categoryColor: "teal",
    content: `<h2>見学で確認すべき10のポイント</h2>
<table>
<tr><th>No.</th><th>チェック項目</th></tr>
<tr><td>1</td><td>園の雰囲気（子どもたちの表情・先生の接し方）</td></tr>
<tr><td>2</td><td>保育方針と1日の流れ</td></tr>
<tr><td>3</td><td>給食の内容（アレルギー対応の有無）</td></tr>
<tr><td>4</td><td>延長保育の時間と料金</td></tr>
<tr><td>5</td><td>園庭の広さと遊具の充実度</td></tr>
<tr><td>6</td><td>通園路の坂道・階段の状況</td></tr>
<tr><td>7</td><td>駐車場の有無と台数</td></tr>
<tr><td>8</td><td>保護者の行事参加の頻度</td></tr>
<tr><td>9</td><td>病児・病後児保育への対応</td></tr>
<tr><td>10</td><td>持ち物の準備（布団・おむつなど）</td></tr>
</table>

<h2>長崎市ならではの注意点</h2>
<p>長崎市は坂の街として知られ、園までの通園路に急な坂道や階段が含まれることがあります。ベビーカーや自転車での送迎が難しい場合もあるため、<strong>実際の通園ルートを歩いて確認</strong>することが大切です。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>見学は6月〜9月がおすすめです。電話予約の際に「駐車場はありますか？」「坂道の状況は？」と聞いておくと当日スムーズです。</p>
</div>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>雨の日の通園も想定しましょう。長崎市は年間降水量が多い地域です。雨天時の通園手段も見学前に考えておくと安心です。</p>
</div>`,
    publishedAt: "2026-04-04",
    popularity: 45,
  },

  // ========== 育休中の保活 ==========
  {
    slug: "ikukyu-chu-hokatsu",
    citySlug: "nagasaki",
    title: "育休中に始める長崎市の保活　やるべきことリスト",
    description:
      "長崎市で育児休業中に保活を進めるためのステップを時系列で解説。復帰時期の決め方や書類準備のコツも紹介します。",
    image:
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=400&fit=crop",
    category: "育休・復職",
    categoryColor: "purple",
    content: `<h2>育休中の保活スケジュール</h2>
<p>育児休業中は赤ちゃんのお世話で忙しい時期ですが、保活は早めに動くほど有利です。長崎市の4月入園を目指す場合のやるべきことを時系列で整理しました。</p>

<div class="step">
<div class="step-num">1</div>
<div class="step-content"><strong>出産後〜生後3か月：情報収集</strong><p>長崎市の利用案内を入手し、自宅・職場周辺の保育園をリストアップします。</p></div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content"><strong>生後3〜6か月：保育園見学</strong><p>候補の園に電話して見学予約。3〜5園は見学するのが理想です。</p></div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content"><strong>9月頃：書類準備</strong><p>勤務先に就労証明書を依頼。復帰予定日の記載が加点に影響します。</p></div>
</div>
<div class="step">
<div class="step-num">4</div>
<div class="step-content"><strong>10〜11月：申込</strong><p>書類を揃えて長崎市役所の窓口へ提出します。</p></div>
</div>

<h2>育休復帰で+5点の加点</h2>
<p>入園月に職場復帰する場合、調整点数として<span class="highlight">+5点</span>が加算されます。復帰日を4月中に設定するのがポイントです。</p>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>2025年4月から育児休業給付金の延長審査が厳格化されました。給付金延長目的で「わざと落ちる」申込は認められません。通勤可能な範囲で複数の園を希望しましょう。</p>
</div>`,
    publishedAt: "2026-04-04",
    popularity: 45,
  },

  // ========== 小規模保育園 ==========
  {
    slug: "shokibo-hoikuen",
    citySlug: "nagasaki",
    title: "長崎市の小規模保育園とは？メリットと3歳の壁の対策",
    description:
      "長崎市の小規模保育園（0〜2歳対象）の特徴やメリット、3歳以降の転園「3歳の壁」への対策を解説します。",
    image:
      "https://images.unsplash.com/photo-1587654780291-39c9404d7dd0?w=800&h=400&fit=crop",
    category: "保育園選び",
    categoryColor: "teal",
    content: `<h2>小規模保育園とは</h2>
<p>小規模保育園は定員6〜19人の少人数制で、0〜2歳児を対象とした保育施設です。長崎市内にも複数の小規模保育園があり、家庭的な雰囲気の中できめ細かい保育を受けられます。</p>

<h2>小規模保育園のメリット</h2>
<ul>
<li>少人数なので一人ひとりに目が行き届く</li>
<li>認可保育園より入りやすい傾向がある</li>
<li>保育料は認可保育園と同じ（所得に応じた負担）</li>
</ul>

<h2>「3歳の壁」とは</h2>
<p>小規模保育園は2歳児クラスまでのため、3歳からは別の保育園や認定こども園に転園する必要があります。これが「3歳の壁」と呼ばれます。</p>

<h3>長崎市の3歳の壁対策</h3>
<p>長崎市では小規模保育園等の卒園児に対して、利用調整で<span class="highlight">+10点</span>の調整加点が適用されます。この加点は非常に大きく、3歳からの転園がスムーズに進むケースが多いです。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>0〜1歳で認可園に入れなかった場合、まず小規模保育園に入園し、3歳で卒園加点（+10点）を利用して認可園に転園する戦略が有効です。</p>
</div>`,
    publishedAt: "2026-04-04",
    popularity: 40,
  },

  // ========== 二人目の保活 ==========
  {
    slug: "futarime-hokatsu",
    citySlug: "nagasaki",
    title: "長崎市で二人目の保活　きょうだい加点と同園入園のコツ",
    description:
      "長崎市で二人目のお子さんの保活を進めるときのポイントを解説。きょうだい加点の仕組みと同じ園に入るための戦略を紹介します。",
    image:
      "https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>きょうだい加点を活用しよう</h2>
<p>長崎市では、上のお子さんが在園している園を希望すると<span class="highlight">+5点</span>の調整加点が得られます。双子など同時申込の場合は+3点です。</p>

<h2>同じ園に入るための戦略</h2>
<h3>第1希望はきょうだいの在園する園に</h3>
<p>きょうだい加点は在園中の園を希望した場合にのみ適用されます。別の園を第1希望にすると加点が得られないため注意が必要です。</p>

<h3>フルタイム＋きょうだい加点で205点</h3>
<p>両親フルタイム（200点）にきょうだい加点（+5点）で<span class="highlight">合計205点</span>。多くの園ではこの点数で入園の可能性が高まります。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>二人目の保活は一人目の経験を活かせるのが強みです。上の子の通園先の園長や先生に「下の子も入りたい」と早めに伝えておくと、情報が得やすくなることもあります。</p>
</div>

<h2>長崎市の第2子保育料無償化</h2>
<p>長崎市では第2子以降の保育料無償化が進んでいます。きょうだいで保育園に通う場合の家計の負担が大きく軽減されています。詳細は長崎市のホームページでご確認ください。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>第2子無償化の詳細は<a href="https://www.city.nagasaki.lg.jp/site/e-kao/45621.html" target="_blank" rel="noopener">長崎市「第2子無償化について」</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-04-04",
    popularity: 50,
  },

  // ========== 保育料 ==========
  {
    slug: "hoikuryou-guide",
    citySlug: "nagasaki",
    title: "長崎市の保育料はいくら？世帯年収別の目安と無償化制度",
    description:
      "長崎市の認可保育園の保育料を世帯年収別にわかりやすく解説。3歳以上の無償化や第2子無償化についてもまとめました。",
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop",
    category: "制度解説",
    categoryColor: "amber",
    content: `<h2>長崎市の保育料の決まり方</h2>
<p>認可保育園の保育料は、世帯の<strong>市町村民税所得割額</strong>に基づいて階層区分が決まり、子どもの年齢（3歳未満/3歳以上）と保育時間（標準時間/短時間）によって金額が異なります。</p>

<h2>保育料の目安（3歳未満・標準時間）</h2>
<table>
<tr><th>世帯年収の目安</th><th>月額保育料の目安</th></tr>
<tr><td>非課税世帯</td><td>0円</td></tr>
<tr><td>約300万円</td><td>約15,000〜25,000円</td></tr>
<tr><td>約500万円</td><td>約30,000〜40,000円</td></tr>
<tr><td>約700万円</td><td>約45,000〜55,000円</td></tr>
<tr><td>約1,000万円以上</td><td>約60,000円〜</td></tr>
</table>
<p>※上記は目安です。実際の金額は市町村民税額により異なります。</p>

<h2>3歳以上は無償化</h2>
<p>2019年10月から、3〜5歳児クラスの保育料は全国的に<span class="highlight">無償化</span>されています。ただし給食費（副食費）は別途負担が必要です。</p>

<h2>長崎市の第2子無償化</h2>
<p>長崎市では第2子以降の保育料無償化制度があります。上のお子さんの年齢を問わず、第2子は保育料が無料になります。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>保育料は毎年9月に切り替わります（前期4〜8月は前年度の市町村民税、後期9〜3月は当年度の市町村民税で算定）。</p>
</div>`,
    publishedAt: "2026-04-04",
    popularity: 35,
  },

  // ========== 落ちたときの対処法 ==========
  {
    slug: "ochita-toki-taishohou",
    citySlug: "nagasaki",
    title: "長崎市で保育園に落ちたときの対処法　次にやるべきこと",
    description:
      "長崎市の選考で保留になった場合の対処法を解説。2次募集・途中入園・認可外の活用・育休延長など、取れる選択肢をまとめました。",
    image:
      "https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>保留通知が届いたら</h2>
<p>1次選考で保留になっても、まだ選択肢はあります。落ち着いて次のステップを検討しましょう。</p>

<h2>選択肢1：2次募集を待つ</h2>
<p>1次で辞退が出た枠や追加の空き枠で2次募集が行われることがあります。長崎市の幼児課に問い合わせて、2次募集の有無と時期を確認しましょう。</p>

<h2>選択肢2：途中入園（5月以降）を申し込む</h2>
<p>年度途中の入園申込は随時受け付けています。転勤や退園による空きが出ることがあるため、粘り強く申し込み続けることが大切です。</p>

<h2>選択肢3：認可外保育施設を利用する</h2>
<p>認可外施設に預けて復職し、次年度の認可園申込で認可外利用の加点（+5点）を得る戦略があります。</p>

<h2>選択肢4：育児休業を延長する</h2>
<p>保留通知書があれば、育児休業を子どもが2歳になるまで延長でき、育児休業給付金も継続受給できます。</p>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>2025年4月から育児休業給付金の延長審査が厳格化されています。給付金延長目的で「わざと落ちる」申込は認められなくなりました。通勤可能な範囲で複数の園を希望してください。</p>
</div>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>保留になっても諦めないことが大切です。長崎市は年度途中の空きが出ることもあるため、途中入園で入れるケースも少なくありません。</p>
</div>`,
    publishedAt: "2026-04-04",
    popularity: 50,
  },
];

registerArticles(articles);
