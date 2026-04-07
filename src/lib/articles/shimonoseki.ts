import type { Article } from "./types";
import { registerArticles } from "./index";

const articles: Article[] = [
  {
    slug: "hokatsu-schedule",
    citySlug: "shimonoseki",
    title: "下関市の保活スケジュール　令和8年度4月入園の流れ",
    description:
      "下関市の令和8年度（2026年度）4月入園の申込時期・必要書類・結果通知の時期をまとめました。",
    image:
      "https://images.unsplash.com/photo-1484820540004-14229fe36ca4?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>令和8年度（2026年度）4月入園のスケジュール</h2>
<p>下関市の4月入園申込は例年10月頃から書類配布が始まり、11月〜12月が受付期間です。通常募集と追加募集の2回に分けて利用調整が実施されます。</p>

<h3>申込の流れ</h3>
<table>
<tr><th>項目</th><th>日程（目安）</th></tr>
<tr><td>申請書類配布</td><td>2025年10月頃〜</td></tr>
<tr><td>通常募集受付</td><td>2025年11月上旬〜12月上旬</td></tr>
<tr><td>通常募集結果通知</td><td>2026年1月下旬〜2月上旬（郵送）</td></tr>
<tr><td>追加募集受付</td><td>2026年1月〜2月</td></tr>
<tr><td>追加募集結果通知</td><td>2026年2月下旬〜3月上旬（郵送）</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>下関市では年度途中の入所も毎月受け付けています。入所希望月の前月20日頃に利用調整が行われるため、早めの準備が大切です。</p>
</div>

<h2>いつから動き始めるべき？</h2>
<div class="step">
<div class="step-num">1</div>
<div class="step-content"><strong>4月〜6月：情報収集</strong><p>下関市幼児保育課の公式サイトで前年度の資料を参考に準備を始めます。</p></div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content"><strong>6月〜9月：保育園見学</strong><p>気になる園に電話して見学予約を入れましょう。下関市内には認可保育所・認定こども園・小規模保育事業所があります。</p></div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content"><strong>10月〜11月：書類準備</strong><p>就労証明書を勤務先に依頼します。保育の利用申込書と支給認定申請書が必要です。</p></div>
</div>
<div class="step">
<div class="step-num">4</div>
<div class="step-content"><strong>11月〜12月：申込</strong><p>幼児保育課の窓口で期限内に必要書類を提出します。</p></div>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>最新情報は<a href="https://www.city.shimonoseki.lg.jp/soshiki/45/4626.html" target="_blank" rel="noopener">下関市公式サイト「保育園・こども園の入園手続きについて」</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 55,
  },
  {
    slug: "scoring-system-guide",
    citySlug: "shimonoseki",
    title: "下関市の入園点数のしくみ　基準指数と調整指数をやさしく解説",
    description:
      "下関市の保育園入園選考で使われる選考指数の仕組みを、初めての方にもわかるように解説します。",
    image:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>選考指数の全体像</h2>
<p>下関市の認可保育施設は<strong>選考指数の高い世帯から優先</strong>して利用調整されます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>選考指数 ＝ 基準指数（父母いずれか低い方） ＋ 調整指数</p>
</div>

<h2>基準指数とは</h2>
<p>保護者それぞれの「保育を必要とする事由」を点数化したものです。下関市では<strong>父母いずれか低い方の点数</strong>を基準指数として採用します。フルタイム就労（月170時間以上）の場合は<span class="highlight">10点</span>です。</p>
<table>
<tr><th>就労時間（月あたり・休憩含む）</th><th>基準指数</th></tr>
<tr><td>月170時間以上</td><td>10</td></tr>
<tr><td>月150時間以上</td><td>9</td></tr>
<tr><td>月130時間以上</td><td>8</td></tr>
<tr><td>月110時間以上</td><td>7</td></tr>
<tr><td>月90時間以上</td><td>6</td></tr>
<tr><td>月70時間以上</td><td>5</td></tr>
<tr><td>月52時間以上</td><td>4</td></tr>
</table>

<h2>調整指数とは</h2>
<p>世帯の状況に応じて加点・減点される点数です。複数の項目に該当する場合はすべて合算されます。</p>
<table>
<tr><th>項目</th><th>点数</th></tr>
<tr><td>保育施設の統廃合による転園</td><td>+10</td></tr>
<tr><td>育休延長退園からの再入園</td><td>+5</td></tr>
<tr><td>里帰り出産等退園からの再入園</td><td>+5</td></tr>
<tr><td>医療的ケア児</td><td>+5</td></tr>
<tr><td>保育士・保育教諭として勤務</td><td>+4</td></tr>
<tr><td>ひとり親（祖父母非同居）</td><td>+4</td></tr>
<tr><td>両親不存在</td><td>+4</td></tr>
<tr><td>兄弟姉妹が在籍する園を希望</td><td>+3</td></tr>
</table>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>下関市では「父母いずれか低い方」の基準指数が採用されます。片方がフルタイム（10点）でも、もう片方がパート（4点）なら基準指数は4点です。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳細な利用調整基準は<a href="https://www.city.shimonoseki.lg.jp/soshiki/45/4626.html" target="_blank" rel="noopener">下関市公式サイト「保育園・こども園の入園手続きについて」</a>から「利用調整に関する要領」PDFをダウンロードできます。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 60,
  },
  {
    slug: "katen-no-kotsu",
    citySlug: "shimonoseki",
    title: "下関市で加点を最大化するコツ　調整指数を積み上げる方法",
    description:
      "下関市の保育園入園選考で有利になる調整指数の加点項目と、活用のポイントを解説します。",
    image:
      "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>基準指数10がスタートライン</h2>
<p>下関市では父母いずれか低い方の基準指数を採用するため、両親ともフルタイム（月170時間以上）なら基準指数は<span class="highlight">10点</span>になります。多くの共働き家庭がこの水準で横並びになるため、差を分けるのは調整指数です。</p>

<h2>主な加点項目と活用のポイント</h2>

<h3>1. 保育士・保育教諭として勤務（+4点）</h3>
<p>保護者が保育士又は保育教諭として保育施設に勤務している（又は勤務予定の）場合に加算されます。保育人材確保のための優遇措置です。</p>

<h3>2. ひとり親で祖父母と同居していない（+4点）</h3>
<p>ひとり親家庭は大きな加点があります。祖父母と同居している場合は+2点に減りますが、それでもプラスです。</p>

<h3>3. 兄弟姉妹が在籍する園を希望（+3点）</h3>
<p>兄弟姉妹が在籍している保育施設への入園を第一希望にする場合+3点が加算されます。同じ園に通わせたい場合に有効です。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>フルタイム共働き＋兄弟姉妹同一園希望＋育休復帰の場合：基準10＋きょうだい3＋育休復帰2＝<span class="highlight">合計15点</span>。この水準であれば多くの園で有利に選考が進みます。</p>
</div>

<h3>4. 育休復帰（+2点）</h3>
<p>育児休業から復帰する場合に加算されます。多くの保護者が該当する項目です。</p>

<h2>減点にも注意</h2>
<p>下関市には減点項目もあります。特に注意すべきは以下の3つです。</p>
<ul>
<li>保育料の滞納（-5点）</li>
<li>65歳未満の祖父母と同居し保育の必要事由に該当しない場合（-3点）</li>
<li>居宅内勤務で接客・危険物取扱いなし（-2点）</li>
</ul>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>過年度分の保育料を滞納していると-5点の大きな減点があります。分納誓約を履行している場合は減点されません。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 55,
  },
  {
    slug: "min-scoring-explained",
    citySlug: "shimonoseki",
    title: "下関市は「低い方採用」方式　父母の点数差が選考に与える影響",
    description:
      "下関市の保育園入園選考では父母いずれか低い方の基準指数を採用します。この仕組みと対策を解説します。",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>「低い方採用」とは？</h2>
<p>下関市の保育園入園選考では、基準指数を<strong>父母いずれか低い方の点数</strong>で算定します。多くの自治体が「父母合算」方式を採用する中、下関市のこの方式は特徴的です。</p>

<h2>具体例で理解する</h2>
<table>
<tr><th>ケース</th><th>保護者1</th><th>保護者2</th><th>基準指数</th></tr>
<tr><td>両親フルタイム</td><td>10（月170h以上）</td><td>10（月170h以上）</td><td><span class="highlight">10</span></td></tr>
<tr><td>フルタイム＋パート</td><td>10（月170h以上）</td><td>6（月90h以上）</td><td><span class="highlight">6</span></td></tr>
<tr><td>フルタイム＋短時間</td><td>10（月170h以上）</td><td>4（月52h以上）</td><td><span class="highlight">4</span></td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>「低い方採用」方式では、片方の保護者の就労時間を増やすことが基準指数アップに直結します。保護者2がパートからフルタイムに切り替えると基準指数が大きく上がります。</p>
</div>

<h2>低い方採用方式の対策</h2>
<ol>
<li><strong>両親の就労時間をそろえる</strong>：片方だけフルタイムでも基準指数は上がりません</li>
<li><strong>調整指数で差をつける</strong>：基準指数が同じ場合、調整指数の加点が勝負を分けます</li>
<li><strong>同点時の優先順位を意識</strong>：同点の場合は兄弟姉妹在籍、市内在住、ひとり親等の優先順位で決まります</li>
</ol>

<h2>同点の場合の優先順位</h2>
<p>選考指数が同点の場合は以下の順で優先者が決まります。</p>
<ol>
<li>兄弟姉妹が入所希望園に在籍している</li>
<li>市内在住</li>
<li>ひとり親世帯</li>
<li>希望順位が高い</li>
<li>入所保留期間が長い</li>
<li>基準指数の合計点数が高い</li>
<li>市町村民税の所得割課税額が低い</li>
</ol>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>利用調整の詳細は<a href="https://www.city.shimonoseki.lg.jp/soshiki/45/4626.html" target="_blank" rel="noopener">下関市公式サイト「保育園・こども園の入園手続きについて」</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 50,
  },
  {
    slug: "ninka-vs-ninkagai",
    citySlug: "shimonoseki",
    title: "下関市の認可保育園と認可外保育施設の違い　選び方ガイド",
    description:
      "下関市で保育園を選ぶとき知っておきたい、認可保育園と認可外保育施設の違いをまとめました。",
    image:
      "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=800&h=400&fit=crop",
    category: "保育園選び",
    categoryColor: "teal",
    content: `<h2>認可保育施設とは</h2>
<p>国が定めた基準（面積、保育士数、設備など）を満たし、下関市が認可した保育施設です。保育料は世帯の所得に応じて決まり、3歳以上は無償化の対象です。</p>

<h3>下関市の認可保育施設の種類</h3>
<table>
<tr><th>種類</th><th>特徴</th></tr>
<tr><td>認可保育所</td><td>0〜5歳児。最も一般的な保育施設</td></tr>
<tr><td>認定こども園</td><td>教育と保育を一体的に提供。1号（教育）と2号・3号（保育）がある</td></tr>
<tr><td>小規模保育事業</td><td>0〜2歳児。定員6〜19人の少人数保育</td></tr>
<tr><td>事業所内保育事業</td><td>企業が主に従業員向けに設置。地域枠あり</td></tr>
</table>

<h2>認可外保育施設とは</h2>
<p>認可基準を満たしていないか、あえて認可を受けていない保育施設です。利用調整（選考）がなく、施設と直接契約します。</p>

<h2>どちらを選ぶべき？</h2>
<ul>
<li><strong>保育料を抑えたい</strong> → 認可保育園（3歳以上は無償）</li>
<li><strong>すぐに預けたい</strong> → 認可外保育施設（選考なし）</li>
<li><strong>少人数保育を希望</strong> → 小規模保育事業や認可外</li>
<li><strong>教育も重視</strong> → 認定こども園</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>下関市では地域型保育事業（小規模保育等）を卒園する児童が連携施設の利用を希望する場合、他の入所希望児童より優先されます。0〜2歳で小規模に入り、3歳で連携施設に進むルートは非常に有利です。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>下関市内の保育施設一覧と空き状況は<a href="https://www.city.shimonoseki.lg.jp/soshiki/45/4609.html" target="_blank" rel="noopener">下関市公式サイト「保育所等空き状況一覧表」</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 45,
  },
  {
    slug: "kengaku-checklist",
    citySlug: "shimonoseki",
    title: "下関市の保育園見学チェックリスト　見るべきポイント15選",
    description:
      "下関市で保育園見学に行く前に知っておきたい、チェックすべきポイントをまとめました。",
    image:
      "https://images.unsplash.com/photo-1524813686514-a57563d77965?w=800&h=400&fit=crop",
    category: "保育園選び",
    categoryColor: "teal",
    content: `<h2>見学前の準備</h2>
<p>下関市では例年6月〜9月が見学シーズンです。希望する園に電話で見学予約を入れましょう。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>下関市は関門海峡に面した港町で、冬場は北西の季節風が強く吹きます。通園の利便性や駐車場の広さも重要なチェックポイントです。</p>
</div>

<h2>見学チェックリスト</h2>
<h3>施設環境</h3>
<ul>
<li>園舎の清潔さ・安全対策（階段、窓、角）</li>
<li>園庭の広さ・遊具の状態</li>
<li>駐車場の台数と送迎時の混雑状況</li>
<li>セキュリティ（玄関施錠、防犯カメラ）</li>
<li>災害時の避難経路と訓練状況</li>
</ul>

<h3>保育内容</h3>
<ul>
<li>1日のスケジュール</li>
<li>外遊びの頻度</li>
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
<p>下関市は市域が広く、旧市街地・新下関・長府・彦島など地域によって保育施設の数や通園事情が異なります。複数の地域の園を比較して見学することをおすすめします。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 40,
  },
  {
    slug: "ikukyu-hokatsu",
    citySlug: "shimonoseki",
    title: "育休中の保活ガイド　下関市で育休明け入園を成功させるコツ",
    description:
      "下関市で育休中に保活を進めるスケジュールと、育休復帰の加点を活かす方法を解説します。",
    image:
      "https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>育休復帰の加点は+2点</h2>
<p>下関市では育児休業から復帰する場合、調整指数として<span class="highlight">+2点</span>が加算されます。フルタイム共働き世帯なら基準10＋育休復帰2＝<span class="highlight">合計12点</span>になります。</p>

<h2>育休中の保活スケジュール</h2>
<div class="step">
<div class="step-num">1</div>
<div class="step-content"><strong>産後〜6か月：情報収集</strong><p>下関市幼児保育課の公式サイトで保育施設一覧と前年度のしおりを確認します。</p></div>
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
<div class="step-content"><strong>11月〜12月：申込</strong><p>下関市幼児保育課の窓口に書類を提出します。</p></div>
</div>

<h2>育休延長で退園した場合は+5点</h2>
<p>育児休業対象児童が入所保留となったことによる育休延長が原因で退園した保育施設への再入園を希望する場合、<span class="highlight">+5点</span>の調整指数が加算されます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>下関市には「育児休業明け保育施設入所予約事業」という制度があります。育休明けの入所を事前に予約できる仕組みなので、幼児保育課に確認してみましょう。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>育休給付金延長の詳細は<a href="https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/0000160564_00040.html" target="_blank" rel="noopener">厚生労働省「育児休業給付金の支給対象期間延長手続き」</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 50,
  },
  {
    slug: "futarime-hokatsu",
    citySlug: "shimonoseki",
    title: "下関市で二人目の保活　きょうだい加点+3と同時申込+1を活用",
    description:
      "下関市で二人目の保活をする際のきょうだい在園加点やきょうだい同時申込加点の仕組みを解説します。",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>きょうだい同一園希望で+3点</h2>
<p>下関市では兄弟姉妹が在籍している保育施設への入園を希望する場合、<span class="highlight">+3点</span>の調整指数が加算されます。別の園を希望する場合でも+2点が付きます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>フルタイム共働き＋兄弟姉妹同一園希望＋育休復帰の場合：基準10＋きょうだい3＋育休復帰2＝<span class="highlight">合計15点</span></p>
</div>

<h2>きょうだい関連の加点まとめ</h2>
<table>
<tr><th>条件</th><th>調整指数</th></tr>
<tr><td>兄弟姉妹が在籍する園への入園希望</td><td>+3</td></tr>
<tr><td>兄弟姉妹が在籍する園以外への入園希望</td><td>+2</td></tr>
<tr><td>兄弟姉妹が同時に入園を希望</td><td>+1</td></tr>
<tr><td>3人目以降の同時入園（1人ごとに）</td><td>+1</td></tr>
</table>

<h2>同じ園に入るためのポイント</h2>
<p>兄弟姉妹が在籍する園を希望することで+3点を確保できます。さらに同点の場合の優先順位でも「兄弟姉妹が入所希望園に在籍している」が第1位に設定されています。つまり下関市ではきょうだいが同じ園に入りやすい制度設計です。</p>

<h2>保育料の多子軽減</h2>
<p>下関市では多子軽減制度があり、第2子以降の保育料が軽減されます。3歳以上は無償化、0〜2歳も第2子は半額、第3子以降は無料が原則です。</p>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>申込児童以外の就学前児童を特別な理由なく家庭で保育している場合は-1点の減点があります。上の子を保育施設に入れず自宅保育している場合に該当する可能性があるため注意しましょう。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 45,
  },
  {
    slug: "hoikuryo-guide",
    citySlug: "shimonoseki",
    title: "下関市の保育料ガイド　世帯年収別の目安と軽減制度",
    description:
      "下関市の保育料の決まり方、無償化の範囲、多子軽減やひとり親世帯向け軽減制度をわかりやすく解説します。",
    image:
      "https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>保育料の決まり方</h2>
<p>下関市の保育料は<strong>市町村民税の所得割額</strong>に基づいて階層ごとに設定されます。世帯の課税状況によって月額が決まります。</p>

<h2>3歳以上は無償</h2>
<p>2019年10月からの幼児教育・保育の無償化により、3歳〜5歳児クラスの保育料は<span class="highlight">0円</span>です。ただし給食費（副食費）は別途かかります。</p>

<h2>軽減制度</h2>
<h3>多子軽減</h3>
<p>きょうだいがいる場合、第2子は保育料が半額、第3子以降は無料になります（年齢制限あり）。</p>

<h3>ひとり親世帯向け軽減</h3>
<p>ひとり親世帯は保育料が軽減されます。市町村民税非課税世帯のひとり親は保育料が0円になります。さらに利用調整でも+4点（祖父母非同居）の調整加点があります。</p>

<h3>生活保護世帯</h3>
<p>生活保護世帯は保育料が0円で、利用調整でも+1点の調整加点が加算されます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>下関市では令和7年度から保育料の見直しが行われています。最新の保育料表は公式サイトで確認しましょう。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>保育料の詳細は<a href="https://www.city.shimonoseki.lg.jp/soshiki/45/4614.html" target="_blank" rel="noopener">下関市公式サイト「保育料等について」</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 40,
  },
  {
    slug: "ochita-toki-sentakushi",
    citySlug: "shimonoseki",
    title: "下関市で保育園に落ちたときの対処法　次にやるべきこと",
    description:
      "下関市の通常募集で入所できなかった場合の選択肢と、次にとるべきアクションをまとめました。",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>通常募集で入所できなかったら</h2>
<p>通常募集で入所できなくても、まだ選択肢はあります。落ち着いて次の手を打ちましょう。</p>

<h2>選択肢1：追加募集に申し込む</h2>
<p>下関市では4月入所の利用調整を通常募集と追加募集の2回実施します。通常募集で辞退が出た枠で追加の利用調整が行われます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>追加募集は通常募集の利用調整が全て終了した後に実施されます。追加で希望園の変更・追加も可能なため、人気が低めの園も候補に入れましょう。</p>
</div>

<h2>選択肢2：年度途中入園を申し込む</h2>
<p>下関市では毎月の利用調整があり、空きが出れば途中入園できます。入所希望月の前月20日頃に利用調整が行われます。</p>

<h2>選択肢3：認可外保育施設を利用する</h2>
<p>認可外保育施設は利用調整がないため、空きがあればすぐに入れます。認可園への入園までのつなぎとして活用できます。</p>

<h2>選択肢4：育児休業を延長する</h2>
<p>利用調整の結果、入所できなかった場合の通知書があれば育児休業を延長できます。なお、育休延長が原因で退園した園への再入園時には+5点の調整加点があります。</p>

<h2>次年度に向けた準備</h2>
<ul>
<li>希望園を見直す（人気園以外も検討）</li>
<li>就労時間を増やして基準指数を上げる（低い方採用のため効果が大きい）</li>
<li>地域型保育事業（小規模保育等）も視野に入れる（卒園後の連携施設利用は最優先）</li>
<li>家庭の状況変化（転職、引越し等）で点数が変わる可能性を確認</li>
</ul>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>保育所等の空き状況は<a href="https://www.city.shimonoseki.lg.jp/soshiki/45/4609.html" target="_blank" rel="noopener">下関市公式サイト「保育所等空き状況一覧表」</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 30,
  },
];

registerArticles(articles);
