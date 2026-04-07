import type { Article } from "./types";
import { registerArticles } from "./index";

const articles: Article[] = [
  {
    slug: "hokatsu-schedule",
    citySlug: "akita",
    title: "秋田市の保活スケジュール　令和8年度4月入園の流れ",
    description:
      "秋田市の令和8年度（2026年度）4月入園の申込時期・必要書類・結果通知の時期をまとめました。",
    image:
      "https://images.unsplash.com/photo-1484820540004-14229fe36ca4?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>令和8年度（2026年度）4月入園のスケジュール</h2>
<p>秋田市の4月入園は第1回〜第4回の複数回にわたって審査が行われます。</p>

<h3>申込から入所までの流れ</h3>
<table>
<tr><th>審査回</th><th>受付期間</th><th>結果通知</th></tr>
<tr><td>第1回</td><td>11月4日〜28日</td><td>1月下旬</td></tr>
<tr><td>第2回</td><td>12月1日〜1月30日</td><td>2月下旬</td></tr>
<tr><td>第3回</td><td>2月2日〜27日</td><td>3月上旬</td></tr>
<tr><td>第4回</td><td>3月2日〜9日</td><td>3月中旬</td></tr>
<tr><td>途中入所</td><td>3月10日以降随時</td><td>審査後随時</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>秋田市は4回の審査があるのが特徴です。第1回に申し込むのがもっとも選択肢が多く有利です。年度途中入所は毎月2回の審査があり、審査日からおおむね3週間後の1日または15日が入所日になります。</p>
</div>

<h2>いつから動き始めるべき？</h2>
<div class="step">
<div class="step-num">1</div>
<div class="step-content"><strong>4月〜6月：情報収集</strong><p>秋田市の公式サイトで前年度の入所案内を参考に準備を始めます。</p></div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content"><strong>6月〜10月：保育園見学</strong><p>気になる園に電話して見学予約を入れましょう。</p></div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content"><strong>10月〜11月：書類準備</strong><p>就労証明書を勤務先に依頼します。教育・保育給付認定申請書（兼保育利用申込書）が必要です。</p></div>
</div>
<div class="step">
<div class="step-num">4</div>
<div class="step-content"><strong>11月：第1回申込</strong><p>子ども育成課の窓口や市民サービスセンターで書類を提出します。電子申請にも一部対応しています。</p></div>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>最新情報は<a href="https://www.city.akita.lg.jp/kurashi/kosodate/1005999/1009962/1047377.html" target="_blank" rel="noopener">秋田市公式サイト「令和8年度保育所などの入所手続きについて」</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 55,
  },
  {
    slug: "scoring-system-guide",
    citySlug: "akita",
    title: "秋田市の入園指数のしくみ　基礎指数と調整指数をやさしく解説",
    description:
      "秋田市の保育園入園選考で使われる指数制度の仕組みを、初めての方にもわかるように解説します。",
    image:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>指数制度の全体像</h2>
<p>秋田市の認可保育施設は<strong>利用調整指数の高い世帯から優先</strong>して入所が決まります。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>利用調整指数 ＝（父の基礎指数 ＋ 母の基礎指数）÷ 保護者数 × 2 ＋ 調整指数</p>
</div>

<h2>基礎指数（Ａ基礎指数）とは</h2>
<p>保護者それぞれの「保育を必要とする事由」を指数化したものです。1人あたり<span class="highlight">最大10点</span>です。両親世帯の場合は合算して保護者数2で割り2を掛けるため、最大20点になります。</p>
<table>
<tr><th>保育の実施基準</th><th>指数</th></tr>
<tr><td>家庭外就労：標準時間（月120時間以上）</td><td>10</td></tr>
<tr><td>家庭外就労：短時間（週4日以上・1日4時間以上）</td><td>8</td></tr>
<tr><td>家庭外自営業：中心者</td><td>10</td></tr>
<tr><td>家庭外自営業：協力者</td><td>7</td></tr>
<tr><td>家庭内自営業：中心者</td><td>9</td></tr>
<tr><td>家庭内自営業：協力者</td><td>6</td></tr>
<tr><td>内職</td><td>6</td></tr>
<tr><td>妊娠・出産（前後各8週以内）</td><td>10</td></tr>
<tr><td>疾病・負傷（入院1か月以上等）</td><td>10</td></tr>
<tr><td>求職活動</td><td>3</td></tr>
</table>

<h2>調整指数（Ｂ調整指数）とは</h2>
<p>世帯の状況に応じて加算（または減算）される指数です。複数の項目に該当する場合はすべて合算されます。</p>
<table>
<tr><th>項目</th><th>指数</th></tr>
<tr><td>地域型保育施設卒園児（連携枠）</td><td>+45</td></tr>
<tr><td>産休・育休明け再入所</td><td>+10</td></tr>
<tr><td>産休・育休明け</td><td>+6</td></tr>
<tr><td>ひとり親家庭</td><td>+5</td></tr>
<tr><td>生活保護世帯</td><td>+5</td></tr>
<tr><td>きょうだいの同時入所</td><td>+5</td></tr>
<tr><td>障がい児童</td><td>+5</td></tr>
<tr><td>幼稚園教諭・保育士等として従事</td><td>+3</td></tr>
<tr><td>61歳未満の同居親族が保育可能</td><td>−3</td></tr>
</table>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳細な指数表は<a href="https://www.city.akita.lg.jp/kurashi/kosodate/1005999/1009962/1047377.html" target="_blank" rel="noopener">秋田市公式サイト「令和8年度保育所などの入所手続きについて」</a>からダウンロードできます。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 60,
  },
  {
    slug: "katen-no-kotsu",
    citySlug: "akita",
    title: "秋田市で加点を最大化するコツ　調整指数を積み上げる方法",
    description:
      "秋田市の保育園入園選考で有利になる調整指数の加点項目と、活用のポイントを解説します。",
    image:
      "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>基礎指数20点がスタートライン</h2>
<p>秋田市では父母ともフルタイム勤務（月120時間以上）であれば基礎指数は<span class="highlight">（10＋10）÷ 2 × 2 ＝ 20</span>になります。多くの家庭がこの水準になるため、差を分けるのは調整指数です。</p>

<h2>主な加点項目と活用のポイント</h2>

<h3>1. 産休・育休明け（+6点）</h3>
<p>産休または育休から復帰して入所を希望する場合に加算されます。多くの保護者が該当する項目です。</p>

<h3>2. 産休・育休明け再入所（+10点）</h3>
<p>産休・育休で一度退所し、再度同一保育所に申し込む場合は<span class="highlight">+10点</span>と、通常の産休・育休明けより高い加点になります。上の子の園を退所せずに済むか検討しましょう。</p>

<h3>3. きょうだいの同時入所（+5点）</h3>
<p>きょうだいが既に希望の保育所に入所している場合、またはきょうだい（多胎児含む）の同時入所を希望する場合に加算されます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>フルタイム共働き＋育休明け＋きょうだい同時入所の場合：基礎20＋育休明け6＋きょうだい5＝<span class="highlight">合計31点</span>。この水準であれば多くの園で有利に選考が進みます。</p>
</div>

<h3>4. 地域型保育施設卒園児・連携枠（+45点）</h3>
<p>小規模保育所などの地域型保育施設の卒園児が連携施設への入所を希望する場合、<span class="highlight">+45点</span>という非常に大きな加点があります。3歳以降の入園戦略として有効です。</p>

<h2>減点に注意</h2>
<p>61歳未満の同居親族が保育の実施基準のいずれも満たしていない場合、<span class="highlight">−3点</span>の減点となります。祖父母と同居している方は注意が必要です。</p>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>秋田市の指数は他の大都市圏に比べてスケールが小さいため、1点の差が大きな影響を持ちます。加点できる項目は確実に押さえましょう。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 50,
  },
  {
    slug: "ninka-vs-ninkagai",
    citySlug: "akita",
    title: "秋田市の認可保育園と認可外保育施設の違い　選び方ガイド",
    description:
      "秋田市で保育園を選ぶとき知っておきたい、認可保育園と認可外保育施設の違いをまとめました。",
    image:
      "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=800&h=400&fit=crop",
    category: "保育園選び",
    categoryColor: "teal",
    content: `<h2>認可保育園とは</h2>
<p>国が定めた基準（面積、保育士数、設備など）を満たし、秋田市が認可した保育施設です。保育料は世帯の所得に応じて決まり、3歳以上は無償化の対象です。</p>

<h3>秋田市の認可保育施設の種類</h3>
<table>
<tr><th>種類</th><th>特徴</th></tr>
<tr><td>認可保育所</td><td>0〜5歳児。最も一般的な保育施設</td></tr>
<tr><td>認定こども園</td><td>教育と保育を一体的に提供。1号（教育）と2号・3号（保育）がある</td></tr>
<tr><td>小規模保育事業</td><td>0〜2歳児。定員6〜19人の少人数保育</td></tr>
<tr><td>事業所内保育事業</td><td>企業が主に従業員向けに設置。地域枠あり</td></tr>
</table>

<h2>認可外保育施設とは</h2>
<p>認可基準を満たしていないか、あえて認可を受けていない保育施設です。利用調整（選考）がなく、施設と直接契約します。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>認可外保育施設は利用調整がないため、認可園に入れなかった場合のセーフティネットとして利用できます。0〜2歳の住民税非課税世帯は月額42,000円まで無償化の対象です。</p>
</div>

<h2>どちらを選ぶべき？</h2>
<ul>
<li><strong>保育料を抑えたい</strong> → 認可保育園（3歳以上は無償）</li>
<li><strong>すぐに預けたい</strong> → 認可外保育施設（選考なし）</li>
<li><strong>少人数保育を希望</strong> → 小規模保育事業や認可外</li>
<li><strong>教育も重視</strong> → 認定こども園</li>
</ul>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>秋田市内の保育施設一覧は<a href="https://www.city.akita.lg.jp/kurashi/kosodate/1005859/1015920/1015851.html" target="_blank" rel="noopener">秋田市公式サイト「認可保育所施設一覧」</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 45,
  },
  {
    slug: "kengaku-checklist",
    citySlug: "akita",
    title: "秋田市の保育園見学チェックリスト　見るべきポイント15選",
    description:
      "秋田市で保育園見学に行く前に知っておきたい、チェックすべきポイントをまとめました。",
    image:
      "https://images.unsplash.com/photo-1524813686514-a57563d77965?w=800&h=400&fit=crop",
    category: "保育園選び",
    categoryColor: "teal",
    content: `<h2>見学前の準備</h2>
<p>秋田市では例年6月〜10月が見学シーズンです。希望する園に電話で見学予約を入れましょう。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>秋田市は冬の積雪が多いため、冬場の通園を想定した園選びが重要です。駐車場の広さや除雪状況も確認しましょう。</p>
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
<p>秋田市は冬場の積雪が多く、道路状況が悪くなることがあります。暖房設備の種類や室温管理、冬場の送迎動線は必ず確認しましょう。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 40,
  },
  {
    slug: "ikukyu-hokatsu",
    citySlug: "akita",
    title: "育休中の保活ガイド　秋田市で育休明け入園を成功させるコツ",
    description:
      "秋田市で育休中に保活を進めるスケジュールと、育休明け加点（+6点）を活かす方法を解説します。",
    image:
      "https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>育休明け加点は+6点</h2>
<p>秋田市では産休または育休から復帰して入所を希望する場合、調整指数として<span class="highlight">+6点</span>が加算されます。フルタイム共働き世帯なら基礎20＋育休明け6＝<span class="highlight">合計26点</span>になります。</p>

<h2>再入所なら+10点</h2>
<p>産休・育休を理由に保育所を退所した児童が再度同一保育所に申し込む場合は<span class="highlight">+10点</span>が加算されます。上の子がいる場合はこちらの加点も確認しましょう。</p>

<h2>育休中の保活スケジュール</h2>
<div class="step">
<div class="step-num">1</div>
<div class="step-content"><strong>産後〜6か月：情報収集</strong><p>秋田市の公式サイトで保育施設一覧と前年度の入所案内を確認します。</p></div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content"><strong>生後6か月〜：保育園見学</strong><p>気になる園に電話して見学予約。3〜5園は見学しましょう。</p></div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content"><strong>10月頃：書類準備</strong><p>就労証明書を勤務先に依頼。育休中でも勤務先に在籍していることが必要です。</p></div>
</div>
<div class="step">
<div class="step-num">4</div>
<div class="step-content"><strong>11月：第1回申込</strong><p>子ども育成課や市民サービスセンターの窓口に書類を提出します。</p></div>
</div>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>秋田市では第1回〜第4回の複数回の審査があります。第1回で入所できなくても自動的に次回の審査に回されるため、できるだけ早い回に申し込みましょう。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>育休給付金延長の詳細は<a href="https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/0000160564_00040.html" target="_blank" rel="noopener">厚生労働省「育児休業給付金の支給対象期間延長手続き」</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 50,
  },
  {
    slug: "shokibo-hoikuen",
    citySlug: "akita",
    title: "秋田市の小規模保育園ガイド　卒園後+45点の加点を活かす戦略",
    description:
      "秋田市の小規模保育事業の特徴と、卒園後に連携施設へ入所する場合+45点の大きな調整加点が得られるメリットを解説します。",
    image:
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=400&fit=crop",
    category: "保育園選び",
    categoryColor: "teal",
    content: `<h2>小規模保育事業とは</h2>
<p>0〜2歳児を対象とした定員6〜19人の小さな保育施設です。少人数のため手厚い保育が受けられるのが特徴です。</p>

<h2>卒園後の大きなメリット：連携枠+45点</h2>
<p>秋田市では地域型保育施設の卒園児が連携施設への入所を希望する場合、<span class="highlight">+45点</span>の調整指数が加算されます。これは秋田市の加点項目の中で最大の値です。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>フルタイム共働き＋連携枠卒園児の場合：基礎20＋連携枠45＝<span class="highlight">合計65点</span>。圧倒的な指数となるため、3歳以降の認可保育園への入園がほぼ確実になります。</p>
</div>

<h2>連携枠以外でも+5点</h2>
<p>連携施設ではない園を希望する場合や、3歳未満児園の卒園児が給付施設への入所を希望する場合でも<span class="highlight">+5点</span>の加算があります。</p>

<h2>小規模保育園を選ぶ際の注意点</h2>
<ul>
<li>3歳以降は別の園に移る必要がある（転園先の準備が必要）</li>
<li>園庭がない施設もある（近隣の公園を利用）</li>
<li>連携施設がどの園かを入所前に確認しておく</li>
<li>連携枠の+45点を活かすなら、卒園後の連携施設が希望に合うか要チェック</li>
</ul>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>秋田市内の保育施設一覧は<a href="https://www.city.akita.lg.jp/kurashi/kosodate/1005859/1015920/1015851.html" target="_blank" rel="noopener">秋田市公式サイト「認可保育所施設一覧」</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 35,
  },
  {
    slug: "futarime-hokatsu",
    citySlug: "akita",
    title: "秋田市で二人目の保活　きょうだい加点+5と再入所加点を活用",
    description:
      "秋田市で二人目の保活をする際のきょうだい同時入所加点（+5）や産休・育休明け再入所加点の仕組みを解説します。",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>きょうだいの同時入所で+5点</h2>
<p>秋田市では対象児童のきょうだいが既に希望の保育所に入所している場合、またはきょうだい（多胎児含む）の同時入所を希望する場合に<span class="highlight">+5点</span>の調整指数が加算されます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>フルタイム共働き＋きょうだい同時入所＋育休明けの場合：基礎20＋きょうだい5＋育休明け6＝<span class="highlight">合計31点</span>。同じ園を希望する場合は有利に選考が進みます。</p>
</div>

<h2>産休・育休明け再入所は+10点</h2>
<p>二人目の出産で上の子を一度退所させた場合、再度同一保育所に申し込むと<span class="highlight">+10点</span>の加算があります。通常の育休明け（+6点）より大きな加点です。</p>

<table>
<tr><th>パターン</th><th>調整指数</th></tr>
<tr><td>産休・育休明け（通常）</td><td>+6</td></tr>
<tr><td>退所後の同一保育所への再入所</td><td>+10</td></tr>
<tr><td>きょうだい同時入所</td><td>+5</td></tr>
</table>

<h2>上の子を退所させるべき？</h2>
<p>上の子を退所させて再入所加点（+10）を狙うか、在園させたままきょうだい加点（+5）＋育休明け（+6）を使うかは状況次第です。退所リスクを考慮して判断しましょう。</p>

<h2>保育料の多子軽減</h2>
<p>秋田市では多子軽減制度があり、きょうだいがいる場合は第2子以降の保育料が軽減されます。3歳以上は無償化の対象です。</p>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>きょうだい加点は「希望の保育所」に入所していることが条件です。別の園に通っている場合は対象外となるため注意しましょう。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 45,
  },
  {
    slug: "hoikuryo-guide",
    citySlug: "akita",
    title: "秋田市の保育料ガイド　世帯年収別の目安と軽減制度",
    description:
      "秋田市の保育料の決まり方、無償化の範囲、多子軽減やひとり親世帯向け軽減制度をわかりやすく解説します。",
    image:
      "https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>保育料の決まり方</h2>
<p>秋田市の保育料は<strong>市町村民税の所得割額</strong>に基づいて階層ごとに設定されます。世帯の課税状況によって月額が決まります。</p>

<h2>3歳以上は無償</h2>
<p>2019年10月からの幼児教育・保育の無償化により、3歳〜5歳児クラスの保育料は<span class="highlight">0円</span>です。ただし給食費（副食費）は別途かかります。</p>

<h2>0〜2歳の保育料の目安</h2>
<table>
<tr><th>階層</th><th>対象</th><th>月額（目安）</th></tr>
<tr><td>生活保護世帯</td><td>生活保護受給者</td><td>0円</td></tr>
<tr><td>非課税世帯</td><td>市町村民税非課税</td><td>0円</td></tr>
<tr><td>低所得層</td><td>所得割額の低い世帯</td><td>約5,000〜15,000円</td></tr>
<tr><td>中間層</td><td>所得割額が中程度の世帯</td><td>約20,000〜40,000円</td></tr>
<tr><td>高所得層</td><td>所得割額が高い世帯</td><td>約50,000〜70,000円</td></tr>
</table>

<h2>軽減制度</h2>
<h3>多子軽減</h3>
<p>きょうだいがいる場合、第2子以降の保育料が軽減されます。</p>

<h3>ひとり親世帯向け軽減</h3>
<p>ひとり親世帯は保育料が軽減される場合があります。詳細は子ども育成課にお問い合わせください。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>保育料の詳細は<a href="https://www.city.akita.lg.jp/kurashi/kosodate/1005999/1009962/1047377.html" target="_blank" rel="noopener">秋田市公式サイト「令和8年度保育所などの入所手続きについて」</a>をご確認ください。保育料徴収額基準表のPDFが掲載されています。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 40,
  },
  {
    slug: "ochita-toki-sentakushi",
    citySlug: "akita",
    title: "秋田市で保育園に落ちたときの対処法　次にやるべきこと",
    description:
      "秋田市の利用調整で入所できなかった場合の選択肢と、次にとるべきアクションをまとめました。",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>利用調整で入所できなかったら</h2>
<p>第1回の審査で入所できなくても、まだ選択肢はあります。落ち着いて次の手を打ちましょう。</p>

<h2>選択肢1：第2回〜第4回の審査を待つ</h2>
<p>秋田市は4回の審査があります。第1回で入所できなかった場合、辞退や空きが出た枠で第2回以降に選考が行われます。希望園の変更・追加も可能です。</p>
<table>
<tr><th>審査回</th><th>受付期間</th><th>結果通知</th></tr>
<tr><td>第2回</td><td>12月1日〜1月30日</td><td>2月下旬</td></tr>
<tr><td>第3回</td><td>2月2日〜27日</td><td>3月上旬</td></tr>
<tr><td>第4回</td><td>3月2日〜9日</td><td>3月中旬</td></tr>
</table>

<h2>選択肢2：年度途中入所を申し込む</h2>
<p>秋田市では3月10日以降、毎月2回の審査で途中入所を受け付けています。審査日からおおむね3週間後の1日または15日が入所日になります。</p>

<h2>選択肢3：認可外保育施設を利用する</h2>
<p>認可外保育施設は利用調整がないため、空きがあればすぐに入れます。復職して次年度に再挑戦する戦略として有効です。</p>

<h2>選択肢4：育児休業を延長する</h2>
<p>利用調整の結果、入所できなかった場合の通知書があれば育児休業を延長できます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>秋田市では受入可能状況が公式サイトで公開されています。途中入所のチャンスを逃さないよう定期的にチェックしましょう。</p>
</div>

<h2>次年度に向けた準備</h2>
<ul>
<li>希望園を見直す（人気園以外も検討）</li>
<li>小規模保育事業も視野に入れる（卒園後に連携枠で+45点の加点あり）</li>
<li>家庭の状況変化（転職、引越し等）で指数が変わる可能性を確認</li>
</ul>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>受入可能状況は<a href="https://www.city.akita.lg.jp/kurashi/kosodate/1005999/1009962/1026753.html" target="_blank" rel="noopener">秋田市公式サイト「保育施設の受入可能状況について」</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 30,
  },
];

registerArticles(articles);
