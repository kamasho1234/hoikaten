import type { Article } from "./types";
import { registerArticles } from "./index";

const articles: Article[] = [
  {
    slug: "hokatsu-schedule",
    citySlug: "wakayama",
    title: "和歌山市の保活スケジュール　令和8年度4月入園の流れ",
    description:
      "和歌山市の令和8年度（2026年度）4月入園の申込時期・必要書類・結果通知の時期をまとめました。",
    image:
      "https://images.unsplash.com/photo-1484820540004-14229fe36ca4?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>令和8年度（2026年度）4月入園のスケジュール</h2>
<p>和歌山市の4月入園申込は例年11月に受け付けられます。</p>

<h3>申込の流れ</h3>
<table>
<tr><th>項目</th><th>日程（目安）</th></tr>
<tr><td>申請書類配布</td><td>2025年10月頃〜</td></tr>
<tr><td>4月利用申込受付</td><td>2025年11月7日〜11月28日</td></tr>
<tr><td>受付時間</td><td>8:30〜17:15</td></tr>
<tr><td>受付場所</td><td>市役所東庁舎2階 保育こども園課</td></tr>
<tr><td>結果通知</td><td>2026年2月末まで</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>和歌山市では面接による家庭調査を行うため、郵送での申込は受け付けていません。必ず保育こども園課の窓口に書類を持参してください。</p>
</div>

<h2>いつから動き始めるべき？</h2>
<div class="step">
<div class="step-num">1</div>
<div class="step-content"><strong>4月〜6月：情報収集</strong><p>和歌山市の公式サイトで前年度の利用案内を参考に準備を始めます。</p></div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content"><strong>6月〜9月：保育園見学</strong><p>気になる園に電話して見学予約を入れましょう。第1希望から第5希望まで記入欄があります。</p></div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content"><strong>9月〜10月：書類準備</strong><p>就労証明書を勤務先に依頼します。</p></div>
</div>
<div class="step">
<div class="step-num">4</div>
<div class="step-content"><strong>11月：申込</strong><p>窓口で面接を受けて書類を提出します。混雑するので余裕をもってお越しください。</p></div>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>最新情報は<a href="https://www.city.wakayama.wakayama.jp/kurashi/kosodate/1001104/1010398/1001801.html" target="_blank" rel="noopener">和歌山市公式サイト「教育・保育給付認定・利用申込について」</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 60,
  },
  {
    slug: "scoring-system-guide",
    citySlug: "wakayama",
    title: "和歌山市の入園選考のしくみ　保育の必要性で決まる利用調整",
    description:
      "和歌山市の保育園入園選考で使われる利用調整の仕組みを、初めての方にもわかるように解説します。",
    image:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>利用調整の全体像</h2>
<p>和歌山市の認可保育施設は<strong>保育の必要性の高い世帯から優先</strong>して利用調整されます。毎月15日の申込締切後に選考が行われます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>利用調整指数 ＝ 父母のうち基本点数の低い方 ＋ 調整点数<br>保護者それぞれの状況を点数化し、低い方の点数をベースに世帯全体の点数が決まります。</p>
</div>

<h2>基本点数とは</h2>
<p>保護者それぞれの「保育を必要とする事由」を点数化したものです。就労時間の長さや病気・介護の程度に応じて点数が決まります。</p>
<table>
<tr><th>就労時間（月あたり）</th><th>基本点数</th></tr>
<tr><td>120時間以上（フルタイム）</td><td>10</td></tr>
<tr><td>100時間以上120時間未満</td><td>9</td></tr>
<tr><td>80時間以上100時間未満</td><td>8</td></tr>
<tr><td>64時間以上80時間未満</td><td>7</td></tr>
<tr><td>48時間以上64時間未満</td><td>6</td></tr>
</table>

<h2>調整点数とは</h2>
<p>世帯の状況に応じて加点・減点される点数です。</p>
<table>
<tr><th>項目</th><th>点数</th></tr>
<tr><td>ひとり親世帯</td><td>+3</td></tr>
<tr><td>きょうだいが同一施設に在園中</td><td>+3</td></tr>
<tr><td>保育士として市内施設に勤務</td><td>+3</td></tr>
<tr><td>認可外保育施設等を利用中</td><td>+2</td></tr>
<tr><td>育児休業からの復帰予定</td><td>+2</td></tr>
<tr><td>生活保護受給世帯</td><td>+2</td></tr>
<tr><td>65歳未満の無職の祖父母等と同居</td><td>-1</td></tr>
</table>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳細は<a href="https://www.city.wakayama.wakayama.jp/kurashi/kosodate/1001104/1010398/1001802.html" target="_blank" rel="noopener">和歌山市公式サイト「保育所・認定こども園の利用案内」</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 55,
  },
  {
    slug: "fulltime-10-line",
    citySlug: "wakayama",
    title: "フルタイム共働きで基本点数10は安心？和歌山市のボーダーライン",
    description:
      "和歌山市でフルタイム共働き（基本点数10）なら入園できるのか？競争状況と調整点数の重要性を解説します。",
    image:
      "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>基本点数10がスタートライン</h2>
<p>和歌山市では父母ともフルタイム勤務（月120時間以上）であれば基本点数は<span class="highlight">10点</span>になります（低い方の点数を採用するため、両方フルタイムなら10点）。</p>

<h2>和歌山市の競争状況</h2>
<p>和歌山市は人口約35万人の中核市です。JR和歌山駅・南海和歌山市駅周辺を中心に保育ニーズが高く、0歳児クラスを中心に競争が発生することがあります。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>認可外施設利用（+2）、きょうだい在園（+3）、育休復帰（+2）などの調整点数が差を分けます。該当する項目がないか確認しましょう。</p>
</div>

<h2>同点の場合はどうなる？</h2>
<p>利用調整指数が同じ場合、和歌山市が定める優先順位に基づき判定されます。保育の必要性がより高い世帯、就労時間の長い世帯などが優先されます。</p>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>0歳児クラスは枠が少ないため、年齢によって入りやすさが大きく異なります。各園の空き状況は毎月和歌山市のホームページで公開されています。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 50,
  },
  {
    slug: "jitan-kinmu-scoring",
    citySlug: "wakayama",
    title: "時短勤務だと点数は下がる？和歌山市の基本点数と勤務時間の関係",
    description:
      "和歌山市で時短勤務の場合、基本点数がどう変わるかを解説。フルタイムとの差や調整点数で補う方法も紹介します。",
    image:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>時短勤務の基本点数</h2>
<p>和歌山市では月あたりの就労時間に応じて基本点数が決まります。</p>

<table>
<tr><th>就労時間（月あたり）</th><th>基本点数</th></tr>
<tr><td>月120時間以上</td><td><span class="highlight">10</span></td></tr>
<tr><td>月100時間以上120時間未満</td><td><span class="highlight">9</span></td></tr>
<tr><td>月80時間以上100時間未満</td><td><span class="highlight">8</span></td></tr>
<tr><td>月64時間以上80時間未満</td><td><span class="highlight">7</span></td></tr>
<tr><td>月48時間以上64時間未満</td><td><span class="highlight">6</span></td></tr>
</table>

<h2>時短勤務で基本点数はどうなる？</h2>
<div class="point-box">
<p><strong>ポイント</strong></p>
<p>和歌山市では「父母のうち低い方の基本点数」が利用調整の基礎になります。例：母が月90時間の時短勤務（8点）、父がフルタイム月120時間（10点）の場合は、低い方の<span class="highlight">8点</span>が採用されます。</p>
</div>

<h2>保育必要量の認定にも影響</h2>
<p>月120時間以上の就労は「保育標準時間」（最長11時間）、月48〜120時間は「保育短時間」（最長8時間）の認定になります。時短勤務の時間数によって利用できる保育時間も変わるので注意しましょう。</p>`,
    publishedAt: "2026-04-05",
    popularity: 45,
  },
  {
    slug: "ochita-toki-sentakushi",
    citySlug: "wakayama",
    title: "和歌山市で保育園に落ちたときの選択肢　次にやるべきこと",
    description:
      "和歌山市の利用調整で保留になった場合の対処法を解説。取れる選択肢をまとめました。",
    image:
      "https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>保留通知が届いたら</h2>
<p>利用調整で保留になっても、まだ選択肢はあります。和歌山市では年度内は毎月利用調整が行われ、内定した場合に連絡があります。</p>

<h2>選択肢1：毎月の利用調整を待つ</h2>
<p>和歌山市では利用申込は年度内有効です。毎月の利用調整で空きが出れば、利用開始月の前月25日までに連絡が届きます。</p>

<h2>選択肢2：希望園を見直す</h2>
<p>第1希望から第5希望まで記入できます。競争が激しい園だけでなく、通勤経路上の園も含めて幅広く検討しましょう。</p>

<h2>選択肢3：認可外保育施設を利用する</h2>
<p>認可外に預けて復職すると、次回の利用調整で+2点の調整点数を得られます。</p>

<h2>選択肢4：育児休業を延長する</h2>
<p>保留通知書があれば育児休業を延長できます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>和歌山市では各園の空き状況が毎月初めにホームページで公開されています。途中入園のチャンスを逃さないよう定期的にチェックしましょう。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>空き状況は<a href="https://www.city.wakayama.wakayama.jp/kurashi/kosodate/1001104/1032937/index.html" target="_blank" rel="noopener">和歌山市公式サイト「保育施設・幼稚園の空き状況」</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 45,
  },
  {
    slug: "ninkagai-katen",
    citySlug: "wakayama",
    title: "認可外保育施設の利用で+2点　和歌山市の調整点数を得る条件",
    description:
      "和歌山市で認可外保育施設の利用実績により調整点数+2を得るための条件を解説します。",
    image:
      "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=800&h=400&fit=crop",
    category: "認可外",
    categoryColor: "rose",
    content: `<h2>認可外利用で+2点の調整点数</h2>
<p>和歌山市では認可外保育施設等を月48時間以上利用している実績があると<span class="highlight">+2点</span>の調整点数が得られます。</p>

<h2>対象となる施設</h2>
<ul>
<li>認可外保育施設</li>
<li>企業主導型保育所</li>
<li>一時預かり事業（月48時間以上利用）</li>
</ul>

<h2>注意点</h2>
<div class="warn-box">
<p><strong>注意</strong></p>
<p>育児休業中に認可外施設等を利用している場合は調整点数の対象外です。育児休業から復帰した上での利用であることが必要です。</p>
</div>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>基本点数10＋認可外利用+2＝利用調整指数12に。人気園ではこの2点が当落を分けることがあります。和歌山市の認可外施設一覧は市の公式サイトで確認できます。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 40,
  },
  {
    slug: "area-guide",
    citySlug: "wakayama",
    title: "和歌山市のエリア別保育園事情　入りやすい地域は？",
    description:
      "和歌山市の地域ごとの保育園の特徴と入りやすさの傾向を解説します。",
    image:
      "https://images.unsplash.com/photo-1524813686514-a57563d77965?w=800&h=400&fit=crop",
    category: "保育園選び",
    categoryColor: "teal",
    content: `<h2>エリアによって事情が異なる</h2>
<p>和歌山市は県庁所在地で市域が広く、エリアによって保育園の競争状況が異なります。</p>

<table>
<tr><th>エリア</th><th>特徴</th></tr>
<tr><td>JR和歌山駅周辺</td><td>市の中心部で通勤に便利。マンション開発が進み子育て世帯が多く競争あり</td></tr>
<tr><td>南海和歌山市駅周辺</td><td>南海電鉄で大阪方面へのアクセスが良い。保育ニーズが高い</td></tr>
<tr><td>紀三井寺・紀伊エリア</td><td>住宅地として人気。新しい保育施設も増えている</td></tr>
<tr><td>岩出市寄り北部</td><td>郊外の住宅地。比較的園の選択肢がある</td></tr>
<tr><td>海南市寄り南部</td><td>競争は穏やか。園の定員に余裕がある場合も</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>和歌山市では毎月初めに各園の空き状況がホームページで公開されています。第1希望の園だけでなく、通勤経路上の園も含めて幅広く検討しましょう。4月の受入予定数は11月末に公開されます。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 40,
  },
  {
    slug: "hitorioya-katen",
    citySlug: "wakayama",
    title: "和歌山市のひとり親加点　調整点数+3点を解説",
    description:
      "和歌山市でひとり親世帯に適用される調整点数+3点と利用調整指数の計算方法について解説します。",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>ひとり親世帯の利用調整指数</h2>
<p>和歌山市ではひとり親世帯の場合、調整点数として<span class="highlight">+3点</span>が加算されます。</p>

<h2>ひとり親世帯の利用調整指数イメージ</h2>
<div class="point-box">
<p><strong>ポイント</strong></p>
<p>フルタイム就労のひとり親の場合：基本点数10 ＋ ひとり親加点3 ＝ <span class="highlight">利用調整指数13</span>。フルタイム共働き世帯（基本点数10）を上回る水準になります。</p>
</div>

<h2>必要書類</h2>
<p>ひとり親であることを証明する書類が必要です。児童扶養手当を受給している場合は手当証書の写しを提出してください。</p>

<h2>他の調整点数との併用</h2>
<p>ひとり親加点は他の調整点数と併用可能です。例えば認可外利用（+2）と合わせて基本点数10＋3＋2＝15点も可能です。</p>`,
    publishedAt: "2026-04-05",
    popularity: 45,
  },
  {
    slug: "ikukyu-kyuufukin-genkakuka",
    citySlug: "wakayama",
    title: "2025年4月から育休給付金延長の審査が厳格化　和歌山市での影響",
    description:
      "2025年4月からの育児休業給付金の延長手続き厳格化について、和歌山市の保活にどう影響するかを解説します。",
    image:
      "https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?w=800&h=400&fit=crop",
    category: "最新情報",
    categoryColor: "purple",
    content: `<h2>制度改正の概要</h2>
<p>2025年4月から、育児休業給付金の支給対象期間延長の審査が厳格化されました。「速やかな職場復帰のために保育所の利用申込をした」と認められることが必要です。</p>

<h2>和歌山市の保活への影響</h2>
<p>通勤可能な範囲の園を複数希望し、真剣に入園を目指している方は影響を受けません。</p>

<h2>和歌山市の育休関連の調整点数</h2>
<p>和歌山市では育児休業に関連する点数があります。</p>
<ul>
<li>育児休業からの復帰予定：+2点</li>
<li>育児休業中の継続利用（在園児）：基本点数3点</li>
</ul>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>和歌山市では育児休業中の継続利用は保育短時間の認定となります。育児休業対象児が1歳になる年度末を超えて育休を取得する場合は退所となります。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>制度改正の詳細は<a href="https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/0000160564_00040.html" target="_blank" rel="noopener">厚生労働省「育児休業給付金の支給対象期間延長手続き」</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 35,
  },
  {
    slug: "hoikushi-katen",
    citySlug: "wakayama",
    title: "保育士として勤務で+3点　和歌山市の保育士優遇制度を解説",
    description:
      "和歌山市で保育士として市内施設に勤務している保護者に適用される調整点数+3点について解説します。",
    image:
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "amber",
    content: `<h2>保育士優遇の加点制度</h2>
<p>和歌山市では保護者が市内の認可保育施設・認定こども園で保育士として勤務（内定含む）している場合、<span class="highlight">+3点</span>の調整点数が加算されます。</p>

<h2>対象となる勤務先</h2>
<ul>
<li>和歌山市内の認可保育所</li>
<li>和歌山市内の認定こども園</li>
<li>内定の段階でも対象</li>
</ul>

<h2>保育士不足対策として</h2>
<p>この制度は保育士不足への対応策の一つです。保育士自身の子どもが保育園に入りやすくすることで、保育現場の人材確保を後押ししています。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>フルタイム保育士の場合：基本点数10 ＋ 保育士加点3 ＝ <span class="highlight">利用調整指数13</span>。さらにきょうだい在園（+3）があれば16点に。非常に有利な状況です。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>保育士の求人情報は<a href="https://www.city.wakayama.wakayama.jp/shisei/1009417/soshiki/1002616/1002641/1002704.html" target="_blank" rel="noopener">和歌山市保育こども園課</a>でも案内しています。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 30,
  },
];

registerArticles(articles);
