import type { Article } from "./types";
import { registerArticles } from "./index";

const articles: Article[] = [
  {
    slug: "hokatsu-schedule",
    citySlug: "tsu",
    title: "津市の保活スケジュール　令和8年度4月入園の流れ",
    description:
      "津市の令和8年度（2026年度）4月入園の申込時期・必要書類・結果通知の時期をまとめました。",
    image:
      "https://images.unsplash.com/photo-1484820540004-14229fe36ca4?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>令和8年度（2026年度）4月入園のスケジュール</h2>
<p>津市の認可保育所等への4月入所は、毎年秋頃に一斉受付が行われます。三重県の県庁所在地として認可保育園が約40か所あり、選択肢は比較的豊富です。</p>

<h3>申込から入所までの流れ</h3>
<table>
<tr><th>時期</th><th>内容</th></tr>
<tr><td>10月上旬</td><td>入所案内・申請書の配布開始</td></tr>
<tr><td>11月上旬〜下旬</td><td>4月入所の一斉申込受付</td></tr>
<tr><td>1月下旬〜2月上旬</td><td>利用調整結果の通知</td></tr>
<tr><td>2月〜3月</td><td>入所前説明会・面談</td></tr>
<tr><td>4月1日</td><td>入所</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>津市では一斉受付の期間に申し込むのが最も有利です。期間後も随時受付はありますが、空き枠での調整となるため選択肢が限られます。年度途中入所は毎月の締切日までに申請が必要です。</p>
</div>

<h2>いつから動き始めるべき？</h2>
<div class="step">
<div class="step-num">1</div>
<div class="step-content"><strong>4月〜6月：情報収集</strong><p>津市こども支援課の公式サイトで前年度の入所案内を参考に準備を始めます。</p></div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content"><strong>6月〜10月：保育園見学</strong><p>気になる園に電話して見学予約を入れましょう。津市は市域が広いため、通勤経路に合わせた園選びが重要です。</p></div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content"><strong>10月〜11月：書類準備</strong><p>就労証明書を勤務先に依頼します。教育・保育給付認定申請書と保育利用申込書が必要です。</p></div>
</div>
<div class="step">
<div class="step-num">4</div>
<div class="step-content"><strong>11月：一斉申込</strong><p>津市こども支援課または各総合支所の窓口で書類を提出します。</p></div>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>最新情報は<a href="https://www.info.city.tsu.mie.jp/www/contents/1001000008103/index.html" target="_blank" rel="noopener">津市公式サイト「保育所・認定こども園」</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 55,
  },
  {
    slug: "scoring-system-guide",
    citySlug: "tsu",
    title: "津市の入園指数のしくみ　基本指数と調整指数をやさしく解説",
    description:
      "津市の保育園入園選考で使われる指数制度の仕組みを、初めての方にもわかるように解説します。",
    image:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>指数制度の全体像</h2>
<p>津市の認可保育施設は<strong>利用調整指数の高い世帯から優先</strong>して入所が決まります。指数は「基本指数」と「調整指数」の合計で算出されます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>利用調整指数 ＝ 父の基本指数（最大20点） ＋ 母の基本指数（最大20点） ＋ 調整指数</p>
</div>

<h2>基本指数とは</h2>
<p>保護者それぞれの「保育を必要とする事由」を指数化したものです。1人あたり<span class="highlight">最大20点</span>、父母合わせて<span class="highlight">最大40点</span>です。</p>
<table>
<tr><th>保育の必要事由</th><th>指数</th></tr>
<tr><td>就労：月160時間以上</td><td>20</td></tr>
<tr><td>就労：月120時間以上160時間未満</td><td>18</td></tr>
<tr><td>就労：月100時間以上120時間未満</td><td>16</td></tr>
<tr><td>就労：月80時間以上100時間未満</td><td>14</td></tr>
<tr><td>就労：月64時間以上80時間未満</td><td>12</td></tr>
<tr><td>出産前後（産前2ヶ月〜産後8週）</td><td>20</td></tr>
<tr><td>疾病（入院1ヶ月以上）</td><td>20</td></tr>
<tr><td>介護・看護（月160時間以上）</td><td>20</td></tr>
<tr><td>就労内定あり</td><td>10</td></tr>
<tr><td>求職活動中</td><td>5</td></tr>
</table>

<h2>調整指数とは</h2>
<p>世帯の状況に応じて加算（または減算）される指数です。複数の項目に該当する場合はすべて合算されます。</p>
<table>
<tr><th>項目</th><th>指数</th></tr>
<tr><td>ひとり親家庭</td><td>+5</td></tr>
<tr><td>きょうだいが希望園に在園中</td><td>+3</td></tr>
<tr><td>認可外保育施設に月極で預託中</td><td>+3</td></tr>
<tr><td>生活保護世帯</td><td>+3</td></tr>
<tr><td>きょうだい同時申込</td><td>+2</td></tr>
<tr><td>育休・産休明け復帰</td><td>+2</td></tr>
<tr><td>同居祖父母が保育可能</td><td>-3</td></tr>
<tr><td>認可園からの転園希望</td><td>-5</td></tr>
<tr><td>市外在住</td><td>-10</td></tr>
</table>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳細な指数表は<a href="https://www.info.city.tsu.mie.jp/www/contents/1001000008103/index.html" target="_blank" rel="noopener">津市公式サイト「保育所・認定こども園」</a>からダウンロードできます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 60,
  },
  {
    slug: "katen-no-kotsu",
    citySlug: "tsu",
    title: "津市で加点を最大化するコツ　調整指数を積み上げる方法",
    description:
      "津市の保育園入園選考で有利になる調整指数の加点項目と、活用のポイントを解説します。",
    image:
      "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>基本指数40点がスタートライン</h2>
<p>津市では父母ともフルタイム勤務（月160時間以上）であれば基本指数は<span class="highlight">20＋20＝40点</span>になります。多くの共働き家庭がこの水準になるため、差を分けるのは調整指数です。</p>

<h2>主な加点項目と活用のポイント</h2>

<h3>1. ひとり親家庭（+5点）</h3>
<p>母子家庭・父子家庭で就労中または就労が内定している場合に加算されます。津市の調整指数で最大の加点項目です。</p>

<h3>2. きょうだいが希望園に在園中（+3点）</h3>
<p>上の子が既に希望する保育園に通っている場合に加算されます。同じ園を希望することで送迎の負担も軽減できます。</p>

<h3>3. 認可外保育施設に預託中（+3点）</h3>
<p>認可外保育施設に月極で預けている場合に加算されます。認可園に入れなかった場合のつなぎとして認可外に預けることで、次年度の選考で有利になります。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>フルタイム共働き＋きょうだい在園＋認可外預託の場合：基本40＋きょうだい3＋認可外3＝<span class="highlight">合計46点</span>。この水準であれば多くの園で有利に選考が進みます。</p>
</div>

<h3>4. 育休・産休明け復帰（+2点）</h3>
<p>入園月中に職場復帰する場合に加算されます。育休明けの4月入園を目指す方は忘れずに申告しましょう。</p>

<h3>5. きょうだい同時申込（+2点）</h3>
<p>2人以上のきょうだいを同時に申し込む場合に加算されます。</p>

<h2>減点に注意</h2>
<p>市外在住で津市の保育園を希望する場合は<span class="highlight">-10点</span>、認可園からの転園希望は<span class="highlight">-5点</span>、同居祖父母が保育可能な場合は<span class="highlight">-3点</span>の減点があります。</p>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>津市は人口約27.5万人の県庁所在地ですが、地域によって保育園の競争率に差があります。中心部は激戦の傾向があるため、調整指数の積み上げが重要です。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 50,
  },
  {
    slug: "ninka-vs-ninkagai",
    citySlug: "tsu",
    title: "津市の認可保育園と認可外保育施設の違い　選び方ガイド",
    description:
      "津市で保育園を選ぶとき知っておきたい、認可保育園と認可外保育施設の違いをまとめました。",
    image:
      "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=800&h=400&fit=crop",
    category: "保育園選び",
    categoryColor: "teal",
    content: `<h2>認可保育園とは</h2>
<p>国が定めた基準（面積、保育士数、設備など）を満たし、津市が認可した保育施設です。保育料は世帯の所得に応じて決まり、3歳以上は無償化の対象です。津市には認可保育園が約40か所あります。</p>

<h3>津市の認可保育施設の種類</h3>
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
<p>津市では認可外保育施設に月極で預けている場合、翌年度の利用調整で<span class="highlight">+3点</span>の加算があります。認可園に入れなかった場合のつなぎとして活用し、次年度に認可園を目指す戦略が有効です。</p>
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
<p>津市内の保育施設一覧は<a href="https://www.info.city.tsu.mie.jp/www/contents/1001000008103/index.html" target="_blank" rel="noopener">津市公式サイト「保育所・認定こども園」</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 45,
  },
  {
    slug: "kengaku-checklist",
    citySlug: "tsu",
    title: "津市の保育園見学チェックリスト　見るべきポイント15選",
    description:
      "津市で保育園見学に行く前に知っておきたい、チェックすべきポイントをまとめました。",
    image:
      "https://images.unsplash.com/photo-1524813686514-a57563d77965?w=800&h=400&fit=crop",
    category: "保育園選び",
    categoryColor: "teal",
    content: `<h2>見学前の準備</h2>
<p>津市では例年6月〜10月が見学シーズンです。希望する園に電話で見学予約を入れましょう。津市は市域が広く、旧津市エリアから美杉地域まで園の環境が大きく異なるため、通勤経路に合った園選びが重要です。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>津市は南北に長い市域を持ち、エリアによって園の規模や雰囲気が異なります。中心部の園は定員が大きく競争率も高い傾向があるため、複数エリアで見学しておくと選択肢が広がります。</p>
</div>

<h2>見学チェックリスト</h2>
<h3>施設環境</h3>
<ul>
<li>園舎の清潔さ・安全対策（階段、窓、角）</li>
<li>園庭の広さ・遊具の状態</li>
<li>駐車場の台数（津市は車通園が多い）</li>
<li>空調設備（夏の暑さ対策）</li>
<li>セキュリティ（玄関施錠、防犯カメラ）</li>
</ul>

<h3>保育内容</h3>
<ul>
<li>1日のスケジュール</li>
<li>外遊びの頻度と場所</li>
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
<p>津市は夏場の気温が高くなるため、室内の空調設備やプール・水遊びの環境も確認しましょう。また車社会のため、駐車場の広さと送迎時の動線は特に重要です。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 40,
  },
  {
    slug: "ikukyu-hokatsu",
    citySlug: "tsu",
    title: "育休中の保活ガイド　津市で育休明け入園を成功させるコツ",
    description:
      "津市で育休中に保活を進めるスケジュールと、育休明け加点（+2点）を活かす方法を解説します。",
    image:
      "https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>育休明け加点は+2点</h2>
<p>津市では育休・産休から復帰して入園月中に職場復帰する場合、調整指数として<span class="highlight">+2点</span>が加算されます。フルタイム共働き世帯なら基本40＋育休明け2＝<span class="highlight">合計42点</span>になります。</p>

<h2>認可外預託で+3点を上乗せ</h2>
<p>認可外保育施設に月極で預けている場合は<span class="highlight">+3点</span>が加算されます。育休中に認可外に預けて復職し、翌年度の4月入園で認可園を目指す戦略も有効です。</p>

<h2>育休中の保活スケジュール</h2>
<div class="step">
<div class="step-num">1</div>
<div class="step-content"><strong>産後〜6か月：情報収集</strong><p>津市こども支援課の公式サイトで保育施設一覧と前年度の入所案内を確認します。</p></div>
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
<div class="step-content"><strong>11月：一斉申込</strong><p>津市こども支援課または各総合支所の窓口で書類を提出します。</p></div>
</div>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>津市は人口約27.5万人の県庁所在地で、中心部は競争率が高めです。育休明け加点だけでは差がつきにくいため、きょうだい加点や認可外預託加点と組み合わせて指数を積み上げましょう。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>育休給付金延長の詳細は<a href="https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/0000160564_00040.html" target="_blank" rel="noopener">厚生労働省「育児休業給付金の支給対象期間延長手続き」</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 50,
  },
  {
    slug: "shokibo-hoikuen",
    citySlug: "tsu",
    title: "津市の小規模保育園ガイド　0〜2歳児向けの手厚い保育",
    description:
      "津市の小規模保育事業の特徴と、少人数保育のメリット・デメリットを解説します。",
    image:
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=400&fit=crop",
    category: "保育園選び",
    categoryColor: "teal",
    content: `<h2>小規模保育事業とは</h2>
<p>0〜2歳児を対象とした定員6〜19人の小さな保育施設です。少人数のため手厚い保育が受けられるのが特徴です。</p>

<h2>小規模保育園のメリット</h2>
<ul>
<li>少人数で一人ひとりに目が行き届く</li>
<li>家庭的な雰囲気で子どもが安心しやすい</li>
<li>大規模園に比べて入りやすい場合がある</li>
<li>保育士の配置基準が手厚い（A型の場合）</li>
</ul>

<h2>卒園後の進路を考える</h2>
<p>小規模保育園は2歳児クラスまでのため、3歳以降は別の園に移る必要があります。津市では連携施設が設定されている場合があるため、入園前に確認しておきましょう。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>津市の小規模保育園は中心部を中心に複数あります。3歳以降の転園先も含めて、長期的な視点で園選びをすることが大切です。連携施設への優先入所枠がある場合は、卒園後も安心です。</p>
</div>

<h2>小規模保育園を選ぶ際の注意点</h2>
<ul>
<li>3歳以降は別の園に移る必要がある（転園先の準備が必要）</li>
<li>園庭がない施設もある（近隣の公園を利用）</li>
<li>連携施設がどの園かを入所前に確認しておく</li>
<li>A型・B型・C型で保育士の配置基準が異なる</li>
</ul>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>津市内の保育施設一覧は<a href="https://www.info.city.tsu.mie.jp/www/contents/1001000008103/index.html" target="_blank" rel="noopener">津市公式サイト「保育所・認定こども園」</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 35,
  },
  {
    slug: "futarime-hokatsu",
    citySlug: "tsu",
    title: "津市で二人目の保活　きょうだい加点+3と同時申込+2を活用",
    description:
      "津市で二人目の保活をする際のきょうだい在園加点（+3）や同時申込加点（+2）の仕組みを解説します。",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>きょうだいが希望園に在園中で+3点</h2>
<p>津市では対象児童のきょうだいが既に希望する保育施設に在園している場合、<span class="highlight">+3点</span>の調整指数が加算されます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>フルタイム共働き＋きょうだい在園＋育休明けの場合：基本40＋きょうだい3＋育休明け2＝<span class="highlight">合計45点</span>。同じ園を希望する場合は有利に選考が進みます。</p>
</div>

<h2>きょうだい同時申込は+2点</h2>
<p>2人以上のきょうだいを同時に保育施設へ申し込む場合に<span class="highlight">+2点</span>が加算されます。双子や年子の場合に該当します。</p>

<table>
<tr><th>パターン</th><th>調整指数</th></tr>
<tr><td>きょうだいが希望園に在園中</td><td>+3</td></tr>
<tr><td>きょうだい同時申込</td><td>+2</td></tr>
<tr><td>育休・産休明け復帰</td><td>+2</td></tr>
</table>

<h2>上の子と同じ園を希望するメリット</h2>
<p>きょうだい加点が得られるだけでなく、送迎が1か所で済むため日々の負担が大幅に軽減されます。津市は車社会のため、2つの園を回る時間的・体力的な負担は大きくなりがちです。</p>

<h2>保育料の多子軽減</h2>
<p>津市では多子軽減制度があり、きょうだいがいる場合は第2子以降の保育料が軽減されます。3歳以上は無償化の対象です。</p>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>きょうだい加点は「希望する保育施設」に在園していることが条件です。別の園に通っている場合は対象外となるため注意しましょう。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 45,
  },
  {
    slug: "hoikuryo-guide",
    citySlug: "tsu",
    title: "津市の保育料ガイド　世帯年収別の目安と軽減制度",
    description:
      "津市の保育料の決まり方、無償化の範囲、多子軽減やひとり親世帯向け軽減制度をわかりやすく解説します。",
    image:
      "https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>保育料の決まり方</h2>
<p>津市の保育料は<strong>市町村民税の所得割額</strong>に基づいて階層ごとに設定されます。世帯の課税状況によって月額が決まります。</p>

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
<p>ひとり親世帯は保育料が軽減される場合があります。詳細はこども支援課にお問い合わせください。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>保育料の詳細は<a href="https://www.info.city.tsu.mie.jp/www/contents/1001000008103/index.html" target="_blank" rel="noopener">津市公式サイト「保育所・認定こども園」</a>をご確認ください。保育料徴収額基準表が掲載されています。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 40,
  },
  {
    slug: "ochita-toki-sentakushi",
    citySlug: "tsu",
    title: "津市で保育園に落ちたときの対処法　次にやるべきこと",
    description:
      "津市の利用調整で入所できなかった場合の選択肢と、次にとるべきアクションをまとめました。",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>利用調整で入所できなかったら</h2>
<p>一斉受付の結果で入所できなくても、まだ選択肢はあります。落ち着いて次の手を打ちましょう。</p>

<h2>選択肢1：年度途中入所を申し込む</h2>
<p>津市では毎月の途中入所を受け付けています。空きが出た園に対して利用調整が行われます。毎月の締切日までに申請が必要です。</p>

<div class="step">
<div class="step-num">1</div>
<div class="step-content"><strong>希望園の見直し</strong><p>人気園だけでなく、周辺地域の園も含めて希望園を広げましょう。</p></div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content"><strong>途中入所の申請</strong><p>こども支援課に毎月の締切日を確認し、継続して申請を出します。</p></div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content"><strong>空き状況の確認</strong><p>津市の公式サイトや窓口で最新の空き状況を定期的にチェックします。</p></div>
</div>

<h2>選択肢2：認可外保育施設を利用する</h2>
<p>認可外保育施設は利用調整がないため、空きがあればすぐに入れます。認可外に預けることで翌年度は<span class="highlight">+3点</span>の加算も得られます。</p>

<h2>選択肢3：育児休業を延長する</h2>
<p>利用調整の結果、入所できなかった場合の通知書があれば育児休業を延長できます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>津市は市域が広いため、中心部以外の園は比較的空きがある場合があります。通勤経路を工夫すれば、少し離れた地域の園も選択肢になります。</p>
</div>

<h2>次年度に向けた準備</h2>
<ul>
<li>希望園を見直す（人気園以外も検討）</li>
<li>認可外保育施設の利用で+3点を確保する</li>
<li>家庭の状況変化（転職、引越し等）で指数が変わる可能性を確認</li>
<li>きょうだいの状況で加点が得られるか確認</li>
</ul>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>空き状況は<a href="https://www.info.city.tsu.mie.jp/www/contents/1001000008103/index.html" target="_blank" rel="noopener">津市公式サイト「保育所・認定こども園」</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 30,
  },
];

registerArticles(articles);
