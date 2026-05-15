import type { Article } from "./types";
import { registerArticles } from "./index";

const articles: Article[] = [
  {
    slug: "hokatsu-schedule",
    citySlug: "fukui",
    title: "福井市の保活スケジュール　令和8年度4月入園の流れ",
    description:
      "福井市の令和8年度（2026年度）4月入園の申込時期・必要書類・結果通知の時期をまとめました。",
    image:
      "https://images.unsplash.com/photo-1484820540004-14229fe36ca4?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>令和8年度（2026年度）4月入園のスケジュール</h2>
<p>福井市の4月入園は例年10月〜11月頃に一斉受付が行われます。マイナポータルからの電子申請にも対応しています。</p>

<h3>申込から入所までの流れ</h3>
<table>
<tr><th>時期</th><th>内容</th></tr>
<tr><td>10月頃</td><td>入園案内・申込書類の配布開始</td></tr>
<tr><td>10月〜11月</td><td>一斉受付（窓口またはマイナポータル）</td></tr>
<tr><td>1月下旬〜2月</td><td>利用調整結果の通知</td></tr>
<tr><td>3月</td><td>入園説明会・面談</td></tr>
<tr><td>4月1日</td><td>入園</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>福井市では定員を超えた場合に利用調整（選考）が行われます。先着順ではなく、保護者の保育の必要度を点数化して判定します。5月以降の途中入園は別途手続きが必要です。</p>
</div>

<h2>いつから動き始めるべき？</h2>
<div class="step">
<div class="step-num">1</div>
<div class="step-content"><strong>4月〜6月：情報収集</strong><p>福井市の公式サイトで前年度の入所案内を参考に準備を始めます。</p></div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content"><strong>6月〜9月：保育園見学</strong><p>気になる園に電話して見学予約を入れましょう。</p></div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content"><strong>9月〜10月：書類準備</strong><p>就労証明書を勤務先に依頼します。教育・保育給付認定申請書が必要です。</p></div>
</div>
<div class="step">
<div class="step-num">4</div>
<div class="step-content"><strong>10月〜11月：申込み</strong><p>こども保育課の窓口またはマイナポータルで書類を提出します。</p></div>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>最新情報は<a href="https://www.city.fukui.lg.jp/fukusi/kosodate/hoikuen/p015545.html" target="_blank" rel="noopener">福井市公式サイト「保育園・認定こども園の入園申込」</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 55,
  },
  {
    slug: "scoring-system-guide",
    citySlug: "fukui",
    title: "福井市の入園点数のしくみ　基本点数と調整点数をやさしく解説",
    description:
      "福井市の保育園入園選考で使われる点数制度の仕組みを、初めての方にもわかるように解説します。",
    image:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>点数制度の全体像</h2>
<p>福井市の認可保育施設は<strong>利用調整点数の高い世帯から優先</strong>して入所が決まります。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>利用調整点数 ＝ 父母のうち基本点数の<span class="highlight">低い方</span> ＋ 調整点数</p>
</div>

<p>福井市の大きな特徴は、父母それぞれの基本点数を算出し、<strong>低い方を採用する</strong>点です。多くの自治体が合算方式を採るなか、福井市では「保育の必要性が低い方の保護者」に注目する仕組みになっています。</p>

<h2>基本点数とは</h2>
<p>保護者それぞれの「保育を必要とする事由」を点数化したものです。1人あたり<span class="highlight">最大11点</span>です。</p>
<table>
<tr><th>保育の事由</th><th>点数</th></tr>
<tr><td>就労：月150時間以上</td><td>11</td></tr>
<tr><td>就労：月140〜150時間未満</td><td>10</td></tr>
<tr><td>就労：月120〜140時間未満</td><td>9</td></tr>
<tr><td>就労：月100〜120時間未満</td><td>8</td></tr>
<tr><td>就労：月64〜100時間未満</td><td>7</td></tr>
<tr><td>入院等で相当の治療が必要</td><td>10</td></tr>
<tr><td>身体障害者手帳1・2級等</td><td>9</td></tr>
<tr><td>常時介護・看護が必要</td><td>9</td></tr>
<tr><td>災害復旧</td><td>11</td></tr>
<tr><td>就学：月120時間以上</td><td>8</td></tr>
<tr><td>妊娠・出産</td><td>5</td></tr>
<tr><td>求職活動</td><td>3</td></tr>
</table>

<h2>調整点数とは</h2>
<p>世帯の状況に応じて加算される点数です。複数の項目に該当する場合はすべて合算されます。</p>
<table>
<tr><th>項目</th><th>点数</th></tr>
<tr><td>保育教諭・保育士として市内勤務</td><td>+4</td></tr>
<tr><td>きょうだいが保育理由で入所中の施設へ申込み</td><td>+4</td></tr>
<tr><td>ひとり親家庭</td><td>+3</td></tr>
<tr><td>生活保護世帯（就労自立支援見込み）</td><td>+2</td></tr>
<tr><td>同日出生きょうだい（多胎児）同時申込み</td><td>+2</td></tr>
<tr><td>きょうだいが保育以外で入所中の施設へ申込み</td><td>+2</td></tr>
<tr><td>育児休業後の復職</td><td>+1</td></tr>
<tr><td>きょうだい同時申込み</td><td>+1</td></tr>
<tr><td>生計中心者の失業で就労必要性が高い</td><td>+1</td></tr>
</table>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳細な点数表は<a href="https://www1.g-reiki.net/city.fukui/reiki_honbun/s500RG00000400.html" target="_blank" rel="noopener">福井市保育の提供に係る教育・保育給付認定等事務取扱要綱</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 60,
  },
  {
    slug: "katen-no-kotsu",
    citySlug: "fukui",
    title: "福井市で加点を最大化するコツ　調整点数を積み上げる方法",
    description:
      "福井市の保育園入園選考で有利になる調整点数の加点項目と、活用のポイントを解説します。",
    image:
      "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>基本点数11点がスタートライン</h2>
<p>福井市では父母とも月150時間以上の就労であれば基本点数は<span class="highlight">11点</span>です。ただし福井市は「低い方を採用」する方式のため、一方の保護者の就労時間が短いと基本点数が下がります。</p>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>福井市では父母の基本点数のうち低い方が採用されるため、両方の保護者の就労時間を意識することが重要です。片方がパートタイムで月64〜100時間未満だと基本点数は7点になります。</p>
</div>

<h2>主な加点項目と活用のポイント</h2>

<h3>1. 保育教諭・保育士として市内勤務（+4点）</h3>
<p>保護者が福井市内で保育教諭・保育士として勤務（内定含む）している場合、<span class="highlight">+4点</span>の加算があります。保育人材確保のための優遇措置です。</p>

<h3>2. きょうだいが保育理由で入所中の施設へ申込み（+4点）</h3>
<p>上のお子さんが既に保育を理由に入所している園に下のお子さんを申し込む場合、<span class="highlight">+4点</span>の加算があります。</p>

<h3>3. ひとり親家庭（+3点）</h3>
<p>ひとり親家庭には+3点が加算されます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>フルタイム共働き＋きょうだい入所中施設へ申込みの場合：基本11＋きょうだい4＝<span class="highlight">合計15点</span>。福井市は加点の幅が大きくないため、1点の差が選考結果を左右します。</p>
</div>

<h3>4. 育児休業後の復職（+1点）</h3>
<p>育児休業から復帰して入所を希望する場合に+1点。多くの保護者が該当する項目です。</p>

<h2>同点時の優先順位</h2>
<p>福井市では同一点数の場合、さらに別の調整点数表で優先順位が決まります。65歳未満の保育可能な同居祖父母がいると<span class="highlight">−3点</span>の減点になるため注意が必要です。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳しくは<a href="https://www1.g-reiki.net/city.fukui/reiki_honbun/s500RG00000400.html" target="_blank" rel="noopener">福井市保育の提供に係る教育・保育給付認定等事務取扱要綱</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 50,
  },
  {
    slug: "ninka-vs-ninkagai",
    citySlug: "fukui",
    title: "福井市の認可保育園と認可外保育施設の違い　選び方ガイド",
    description:
      "福井市で保育園を選ぶとき知っておきたい、認可保育園と認可外保育施設の違いをまとめました。",
    image:
      "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=800&h=400&fit=crop",
    category: "保育園選び",
    categoryColor: "teal",
    content: `<h2>認可保育園とは</h2>
<p>国が定めた基準（面積、保育士数、設備など）を満たし、福井市が認可した保育施設です。保育料は世帯の所得に応じて決まり、3歳以上は無償化の対象です。</p>

<h3>福井市の認可保育施設の種類</h3>
<table>
<tr><th>種類</th><th>特徴</th></tr>
<tr><td>認可保育所</td><td>0〜5歳児。最も一般的な保育施設</td></tr>
<tr><td>認定こども園</td><td>教育と保育を一体的に提供。1号（教育）と2号・3号（保育）がある</td></tr>
<tr><td>小規模保育事業</td><td>0〜2歳児。定員6〜19人の少人数保育</td></tr>
</table>

<h2>認可外保育施設とは</h2>
<p>認可基準を満たしていないか、あえて認可を受けていない保育施設です。利用調整（選考）がなく、施設と直接契約します。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>認可外保育施設は利用調整がないため、認可園に入れなかった場合のセーフティネットとして利用できます。0〜2歳の住民税非課税世帯は月額42,000円まで無償化の対象です。</p>
</div>

<h2>福井市の保育料の特徴</h2>
<p>福井市では令和6年9月から<strong>第2子以降の保育料が完全無償化</strong>されています。きょうだいがいる世帯にとって大きな経済的メリットがあります。</p>

<h2>どちらを選ぶべき？</h2>
<ul>
<li><strong>保育料を抑えたい</strong> → 認可保育園（3歳以上は無償、第2子以降も無償）</li>
<li><strong>すぐに預けたい</strong> → 認可外保育施設（選考なし）</li>
<li><strong>少人数保育を希望</strong> → 小規模保育事業や認可外</li>
<li><strong>教育も重視</strong> → 認定こども園</li>
</ul>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>福井市内の保育施設一覧は<a href="https://www.city.fukui.lg.jp/fukusi/kosodate/hoikuen/p015545.html" target="_blank" rel="noopener">福井市公式サイト「保育園・認定こども園の入園申込」</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 45,
  },
  {
    slug: "kengaku-checklist",
    citySlug: "fukui",
    title: "福井市の保育園見学チェックリスト　見るべきポイント15選",
    description:
      "福井市で保育園見学に行く前に知っておきたい、チェックすべきポイントをまとめました。",
    image:
      "https://images.unsplash.com/photo-1524813686514-a57563d77965?w=800&h=400&fit=crop",
    category: "保育園選び",
    categoryColor: "teal",
    content: `<h2>見学前の準備</h2>
<p>福井市では例年6月〜9月が見学シーズンです。希望する園に電話で見学予約を入れましょう。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>福井市は冬季の積雪が多い地域です。冬場の通園を想定した園選びが重要です。駐車場の広さや除雪状況も確認しましょう。</p>
</div>

<h2>見学チェックリスト</h2>
<h3>施設環境</h3>
<ul>
<li>園舎の清潔さ・安全対策（階段、窓、角）</li>
<li>園庭の広さ・遊具の状態</li>
<li>冬季の室内遊びスペース</li>
<li>駐車場の台数と冬場の除雪状況</li>
<li>セキュリティ（玄関施錠、防犯カメラ）</li>
</ul>

<h3>保育内容</h3>
<ul>
<li>1日のスケジュール</li>
<li>外遊びの頻度（冬場を含む）</li>
<li>給食の内容とアレルギー対応</li>
<li>お昼寝の環境と見守り体制</li>
<li>行事・イベントの年間予定</li>
</ul>

<h3>職員・運営</h3>
<ul>
<li>保育士の人数と年齢構成</li>
<li>先生の子どもへの接し方・雰囲気</li>
<li>延長保育の対応時間と料金</li>
<li>急な発熱時の対応方針</li>
<li>保護者との連絡方法（アプリ・連絡帳）</li>
</ul>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>見学は平日の午前中（10時頃）がおすすめです。普段の保育の様子を見ることができます。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>福井市内の保育園・認定こども園の一覧は<a href="https://www.city.fukui.lg.jp/fukusi/kosodate/hoikuen/p015545.html" target="_blank" rel="noopener">福井市公式サイト</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 40,
  },
  {
    slug: "hitorioya-katei",
    citySlug: "fukui",
    title: "福井市のひとり親家庭が使える保育園入園の優遇制度",
    description:
      "福井市でひとり親家庭が保育園入園で受けられる加点や支援制度を解説します。",
    image:
      "https://images.unsplash.com/photo-1531983412531-1f49a365ffed?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>ひとり親家庭の優遇ポイント</h2>
<p>福井市ではひとり親家庭に対して、利用調整で<span class="highlight">+3点</span>の加算が設けられています。</p>

<h3>基本点数の計算方法</h3>
<p>福井市は「父母のうち低い方の基本点数」を採用しますが、ひとり親家庭の場合は1名分の基本点数がそのまま採用されます。フルタイム就労（月150時間以上）であれば基本点数11点＋ひとり親加点3点＝<span class="highlight">14点</span>になります。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>ひとり親家庭で求職活動中の場合：基本3点＋ひとり親加点3点＝6点。就労が決まれば基本点数が大幅に上がるため、早めの就職活動が保活にも有利です。</p>
</div>

<h2>ひとり親家庭が利用できるその他の支援</h2>
<ul>
<li>児童扶養手当の受給</li>
<li>ひとり親家庭等医療費助成</li>
<li>保育料の軽減（市民税非課税世帯は無料）</li>
<li>第2子以降の保育料完全無償化（令和6年9月〜）</li>
</ul>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳しくは<a href="https://www.city.fukui.lg.jp/fukusi/kosodate/hoikuen/index.html" target="_blank" rel="noopener">福井市公式サイト「保育園・児童館」</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 40,
  },
  {
    slug: "ikukyu-ake-nyuen",
    citySlug: "fukui",
    title: "福井市の育休明け入園ガイド　復職時期と申込みのポイント",
    description:
      "福井市で育児休業明けに保育園入園を目指す方向けに、申込みの流れと注意点を解説します。",
    image:
      "https://images.unsplash.com/photo-1590650153855-d9e808231d41?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>育休明け入園のポイント</h2>
<p>福井市では育児休業後の復職に伴う入園申込みに<span class="highlight">+1点</span>の調整点数が加算されます。</p>

<h3>復職時期と入園時期の調整</h3>
<p>4月入園に合わせて復職するのが最も枠が多く有利です。年度途中入園は空きがある場合のみとなるため、計画的に準備しましょう。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>育児休業中で既に上のお子さんが保育園に入所している場合、育児休業中の基本点数は3〜4点です。復職すれば就労の点数（最大11点）に変わるため、入園申込時は「復職予定」として就労証明書を提出するのが一般的です。</p>
</div>

<h2>申込みの流れ</h2>
<div class="step">
<div class="step-num">1</div>
<div class="step-content"><strong>復職日の決定</strong><p>職場と相談して復職日を決めます。4月入園なら4月中の復職が目安です。</p></div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content"><strong>就労証明書の準備</strong><p>勤務先に「復職予定」として就労証明書を作成してもらいます。</p></div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content"><strong>10月〜11月の一斉受付で申込み</strong><p>窓口またはマイナポータルで申込みます。</p></div>
</div>
<div class="step">
<div class="step-num">4</div>
<div class="step-content"><strong>結果通知後に復職手続き</strong><p>入園が決まったら職場に正式に復職日を連絡します。</p></div>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳しくは<a href="https://www.city.fukui.lg.jp/fukusi/kosodate/hoikuen/p015545.html" target="_blank" rel="noopener">福井市公式サイト「保育園・認定こども園の入園申込」</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 45,
  },
  {
    slug: "hoikushi-yuugu",
    citySlug: "fukui",
    title: "福井市は保育士の子どもが有利？　保育教諭・保育士の優遇制度を解説",
    description:
      "福井市で保育教諭・保育士として働く保護者が受けられる入園加点制度について解説します。",
    image:
      "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>保育教諭・保育士への優遇加点</h2>
<p>福井市では、保護者が<strong>福井市内</strong>で保育教諭・保育士として勤務している場合（内定を含む）、調整点数として<span class="highlight">+4点</span>が加算されます。</p>

<p>これは福井市の調整点数の中で、きょうだい入所中施設への申込みと並んで<strong>最も大きい加点</strong>です。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>フルタイム就労の保育士の場合：基本11点＋保育士加点4点＝<span class="highlight">15点</span>。さらにきょうだいが入所中の施設に申し込めば+4点で合計19点。非常に有利な状況になります。</p>
</div>

<h2>なぜ保育士が優遇されるの？</h2>
<p>全国的な保育士不足の解消を目的とした施策です。保育士自身が安心して子どもを預けられる環境を整えることで、保育の担い手を確保する狙いがあります。</p>

<h2>対象となる条件</h2>
<ul>
<li>福井市内の保育施設で保育教諭・保育士として勤務していること</li>
<li>内定状態でも対象</li>
<li>パート・非常勤でも保育教諭・保育士として勤務していれば対象</li>
</ul>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳しくは<a href="https://www1.g-reiki.net/city.fukui/reiki_honbun/s500RG00000400.html" target="_blank" rel="noopener">福井市保育の提供に係る教育・保育給付認定等事務取扱要綱</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 35,
  },
  {
    slug: "kyoudai-doujinyuen",
    citySlug: "fukui",
    title: "福井市のきょうだい加点を徹底解説　同時入園・在園児がいる場合",
    description:
      "福井市できょうだいがいる場合の加点制度と、同時入園・在園施設への申込みのポイントを解説します。",
    image:
      "https://images.unsplash.com/photo-1609220136736-443140cffec6?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>きょうだいに関する加点一覧</h2>
<p>福井市ではきょうだいの状況に応じて複数の加点パターンがあります。</p>

<table>
<tr><th>状況</th><th>調整点数</th></tr>
<tr><td>きょうだいが保育理由で入所中の施設へ申込み</td><td>+4</td></tr>
<tr><td>きょうだいが保育以外の理由で入所中の施設へ申込み</td><td>+2</td></tr>
<tr><td>同日出生のきょうだい（多胎児）で同時申込み</td><td>+2</td></tr>
<tr><td>きょうだいで同時申込み</td><td>+1</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>上のお子さんが「保育を理由に」入所している施設に下のお子さんを申し込むと<span class="highlight">+4点</span>。同じきょうだい加点でも、保育理由かどうかで2点の差があります。</p>
</div>

<h2>「保育理由」と「保育以外の理由」の違い</h2>
<p>認定こども園の場合、1号認定（教育認定）で在園している場合は「保育以外の理由」、2号・3号認定（保育認定）で在園している場合は「保育理由」に該当します。</p>

<h2>双子・三つ子の場合</h2>
<p>同日出生のきょうだい（多胎児）が同時に入園を申し込む場合は<span class="highlight">+2点</span>です。通常のきょうだい同時申込み（+1点）より1点高い加点になります。</p>

<h2>別々の施設に申し込む場合</h2>
<p>きょうだいが在園中の施設以外に申し込む場合は、きょうだい加点の対象外となります。送迎の負担は増えますが、入りやすい園を選ぶという戦略もあります。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳しくは<a href="https://www1.g-reiki.net/city.fukui/reiki_honbun/s500RG00000400.html" target="_blank" rel="noopener">福井市保育の提供に係る教育・保育給付認定等事務取扱要綱</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 35,
  },
  {
    slug: "doutensu-yuusenjunni",
    citySlug: "fukui",
    title: "福井市で同点になったらどうなる？　同一点数時の優先順位を解説",
    description:
      "福井市の保育園入園選考で同点になった場合の優先順位の決め方を詳しく解説します。",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>同一点数時の調整点数表</h2>
<p>福井市では利用調整の合計点数が同点になった場合、別の調整点数表によって優先順位が決まります。</p>

<table>
<tr><th>項目</th><th>点数</th></tr>
<tr><td>父母に障害（1・2級等）がある（保護者以外の認定）</td><td>+2</td></tr>
<tr><td>父母にその他の障害がある（保護者以外の認定）</td><td>+1</td></tr>
<tr><td>県外単身赴任</td><td>+1</td></tr>
<tr><td>就学予定小学校区域内施設に申込み</td><td>+1</td></tr>
<tr><td>住所地で自営</td><td>−1</td></tr>
<tr><td>就労事由で内定状態</td><td>−1</td></tr>
<tr><td>65歳未満の保育可能な同居祖父母あり</td><td>−3</td></tr>
</table>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>65歳未満の保育可能な同居祖父母がいると<span class="highlight">−3点</span>の大きな減点になります。祖父母と同居している方は注意が必要です。</p>
</div>

<h2>同点時に有利になるケース</h2>
<ul>
<li>県外に単身赴任中の配偶者がいる場合（+1点）</li>
<li>入学予定の小学校区域内の保育施設に申し込む場合（+1点）</li>
<li>保護者以外の家族に障害がある場合（+1〜2点）</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>同点調整で最も影響が大きいのは「同居祖父母」の−3点です。三世代同居の場合は、祖父母が65歳以上かどうか、あるいは祖父母自身に就労等の保育を必要とする事由があるかがポイントになります。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳しくは<a href="https://www1.g-reiki.net/city.fukui/reiki_honbun/s500RG00000400.html" target="_blank" rel="noopener">福井市保育の提供に係る教育・保育給付認定等事務取扱要綱</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 30,
  },
];

registerArticles(articles);
