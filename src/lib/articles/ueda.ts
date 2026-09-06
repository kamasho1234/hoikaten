import type { Article } from "./types";
import { registerArticles } from "./index";

const articles: Article[] = [
  {
    slug: "hokatsu-schedule",
    citySlug: "ueda",
    title: "上田市の保活スケジュール　令和8年度4月入園の流れ",
    description: "上田市の認可保育所の申込時期・選考の流れ・結果通知の時期をわかりやすく解説。令和8年度4月入園のスケジュールを中心にまとめました。",
    image: "https://images.unsplash.com/photo-1484820540004-14229fe36ca4?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>令和8年度4月入園のスケジュール</h2><p>上田市は長野県の東部（上田盆地）に位置し、人口約15万人の都市です。戦国時代の真田氏の城下町として知られ、製造業や観光業が盛んな地域です。申込先は上田市保育課です。</p><h3>一次利用調整</h3><table><tr><th>項目</th><th>日程</th></tr><tr><td>申込受付期間</td><td>令和7年10月中旬〜11月上旬</td></tr><tr><td>結果通知</td><td>令和8年1月中旬</td></tr></table><h3>二次利用調整</h3><table><tr><th>項目</th><th>日程</th></tr><tr><td>申込受付期間</td><td>令和8年2月上旬〜2月中旬</td></tr><tr><td>結果通知</td><td>令和8年3月上旬</td></tr></table><div class="point-box"><p><strong>ポイント</strong></p><p>上田市は「利用調整点数 = 保護者のうち基本点数の低い方 + 調整点数」という独特のmin方式を採用しています。片方の保護者が短時間就労だと点数が大きく下がります。</p></div>`,
    publishedAt: "2026-05-11",
    popularity: 42,
  },
  {
    slug: "hokatsu-mistakes",
    citySlug: "ueda",
    title: "上田市の保活でよくある失敗と対策5選",
    description: "上田市の保活で初めてのママがやりがちな失敗パターンと、その対策をまとめました。",
    image: "https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>失敗1：min方式の仕組みを知らない</h2><p>上田市は父母の基本点数の「低い方」を採用する独自方式です。例えば父100点・母60点であれば基本点数は60点になります。両方の就労時間を上げることが重要です。</p><h2>失敗2：情報収集のスタートが遅い</h2><p>上田市の4月入園の申込は10月から始まります。見学の予約は夏前から始めましょう。</p><h2>失敗3：希望園を少なく書く</h2><p>上田市では希望施設を複数記入できます。1〜2か所しか書かないと不承諾のリスクが高まります。</p><h2>失敗4：調整点数の取りこぼし</h2><p>ひとり親で+20点、生活保護で+20点など大きな調整点数があります。使える加点を漏れなくチェックしましょう。</p><h2>失敗5：月64時間未満の就労</h2><p>上田市では月64時間未満の就労は認定されません。最低月64時間の就労が必要です。</p>`,
    publishedAt: "2026-05-11",
    popularity: 50,
  },
  {
    slug: "hokatsu-basics",
    citySlug: "ueda",
    title: "上田市での保活、いつから始めるべき？新米ママ向けガイド",
    description: "上田市で初めて保活をする方向けに、いつから何を始めるべきかをステップごとに解説します。min方式の解説も。",
    image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>保活ってなに？</h2><p>保活とは、認可保育所への入所を目指して活動することです。上田市は長野県の東部に位置し、人口約15万人。真田氏の城下町で、製造業・精密機器産業が盛んな地域です。</p><h2>上田市の保育施設の種類</h2><ul><li>認可保育所：上田市が認可した施設。保育料は世帯年収に応じて決定。選考は点数方式。</li><li>小規模保育事業：定員6～19人の少人数保育。0～2歳児対象。</li><li>認定こども園：保育と教育の両方を行う施設。</li><li>認可外保育施設：認可外だが届出済みの施設。</li></ul><h2>上田市特有の注意点</h2><p>上田市は「min方式」を採用しています。父母2人の基本点数のうち、低い方が採用されます。一方が短時間勤務だと点数が大きく下がるため注意が必要です。</p>`,
    publishedAt: "2026-05-11",
    popularity: 48,
  },
  {
    slug: "point-system",
    citySlug: "ueda",
    title: "上田市の基本点数システム　100点満点×min方式の仕組みをわかりやすく",
    description: "上田市の保育所利用調整で使われる独自のmin方式（基本点数の低い方を採用する方式）を、初心者向けに解説します。",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>上田市の独自方式：min方式とは</h2><p>上田市では、父母それぞれの基本点数を計算し、そのうち「低い方」の点数に調整点数を加算して利用調整点数を算出します。</p><div class="point-box"><p>利用調整点数＝min（基本点数・父, 基本点数・母）＋調整点数</p></div><h2>具体例</h2><p>父（フルタイム・月160時間以上）：100点、母（パートタイム・月80〜100時間）：65点の場合、利用調整点数の基礎は65点になります。</p><h3>就労（雇用）の基本点数</h3><ul><li>月160時間以上：100点</li><li>月140〜160時間未満：95点</li><li>月120〜140時間未満：90点</li><li>月100〜120時間未満：70点</li><li>月80〜100時間未満：65点</li><li>月64〜80時間未満：60点</li></ul>`,
    publishedAt: "2026-05-11",
    popularity: 58,
  },
  {
    slug: "scoring-system-guide",
    citySlug: "ueda",
    title: "上田市の入園点数のしくみ　min方式と調整点数をやさしく解説",
    description: "上田市の保育所利用調整で使われるmin方式（基本点数の低い方採用）と調整点数の仕組みを解説します。",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>調整点数とは？</h2><p>世帯の特別な事情に応じて加算される点数です。上田市の調整点数は加算のみです（減算はありません）。</p><h3>主な加算項目</h3><ul><li>ひとり親世帯：+20点</li><li>きょうだいが希望施設に在園中：+10点</li><li>きょうだいと同時申込み：+5点</li><li>生活保護受給：+20点</li><li>認可外保育施設に月ぎめで利用中：+5点</li><li>育児休業から復帰予定：+5点</li></ul><div class="point-box"><p>上田市の調整点数はひとり親・生活保護で+20点と非常に大きいです。また基本点数はmin方式なので、両方の保護者がフルタイムで働くことが最高得点への近道です。</p></div>`,
    publishedAt: "2026-05-11",
    popularity: 55,
  },
  {
    slug: "selection-process",
    citySlug: "ueda",
    title: "上田市の保育所選考フロー　書類提出から入所決定まで",
    description: "上田市の保育所利用調整の全フローを、min方式の特徴を含めて各ステップごとに解説します。",
    image: "https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>選考フロー</h2><div class="step"><div class="step-num">1</div><div class="step-content"><strong>申込書・必要書類の提出</strong><p>10〜11月に、上田市保育課へ提出します。就労証明書など必要書類を揃えましょう。月あたりの就労時間が正確に記載されているか確認が重要です。</p></div></div><div class="step"><div class="step-num">2</div><div class="step-content"><strong>点数の計算（min方式）</strong><p>上田市が申込書類に基づいて点数を計算します。父母それぞれの基本点数を算出し、低い方に調整点数を加算した値が利用調整点数になります。</p></div></div><div class="step"><div class="step-num">3</div><div class="step-content"><strong>利用調整</strong><p>点数の高い順に、希望施設との相性を調整します。</p></div></div><div class="step"><div class="step-num">4</div><div class="step-content"><strong>結果通知</strong><p>一次は1月中旬、二次は3月上旬に通知が届きます。</p></div></div>`,
    publishedAt: "2026-05-11",
    popularity: 46,
  },
  {
    slug: "score-up-checklist",
    citySlug: "ueda",
    title: "上田市で点数を上げる方法　min方式対策チェックリスト",
    description: "上田市の独自のmin方式に対応した点数アップの方法を、チェックリスト形式で解説します。",
    image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>min方式対策</h2><p>上田市では父母の基本点数の低い方が採用されます。片方がフルタイムでも、もう一方が短時間勤務だと点数が下がります。</p><h2>加点チェックリスト</h2><ul><li>ひとり親世帯で就労中→+20点（大きな加点）</li><li>きょうだいが希望施設に在園中→+10点</li><li>きょうだいと同時申込み→+5点</li><li>生活保護受給中→+20点（大きな加点）</li><li>認可外保育施設に月ぎめで利用中→+5点</li><li>育休から復帰予定→+5点</li></ul><div class="point-box"><p>上田市では両方の保護者が月64時間以上勤務することが基本です。特に低い方の保護者の就労時間を増やすことが、利用調整点数アップへの最短ルートです。</p></div>`,
    publishedAt: "2026-05-11",
    popularity: 60,
  },
  {
    slug: "area-guide",
    citySlug: "ueda",
    title: "上田市の保育所マップ　エリアごとの入りやすさを比較",
    description: "上田市内のエリアごとの保育所の競争率や特徴をまとめました。",
    image: "https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?w=800&h=400&fit=crop",
    category: "エリア情報",
    categoryColor: "purple",
    content: `<h2>上田市の保育所事情</h2><p>上田市は長野県の東部（上田盆地）に位置する人口約15万人の都市です。真田氏の城下町として知られ、精密機器・電子部品の製造業が盛んです。市内に認可保育所が25か所以上あります。</p><h2>エリアごとの競争率</h2><h3>競争率が高いエリア</h3><ul><li>上田駅周辺・中心市街地：交通の便が良く人気が集中</li><li>丸子地区：精密工場が多く共働き率が高い</li></ul><h3>比較的入りやすいエリア</h3><ul><li>武石・真田・長和地区：市の北部・東部の山間エリア</li></ul>`,
    publishedAt: "2026-05-11",
    popularity: 37,
  },
  {
    slug: "ninkagai-guide",
    citySlug: "ueda",
    title: "上田市の認可外保育施設ガイド　認可所との違いは？",
    description: "上田市で認可保育所に入れなかった場合の選択肢として、認可外保育施設について解説します。",
    image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&h=400&fit=crop",
    category: "認可外保育",
    categoryColor: "teal",
    content: `<h2>認可外保育施設とは？</h2><p>認可外保育施設は、認可基準を満たしていないものの、自治体に届出をして運営している保育施設です。上田市内にも複数存在します。</p><h2>認可所との違い</h2><table><tr><th>項目</th><th>認可</th><th>認可外</th></tr><tr><td>保育料</td><td>所得に応じて決定</td><td>施設が設定</td></tr><tr><td>翌年の調整点数</td><td>-</td><td>+5点の加点</td></tr></table><div class="point-box"><p>上田市では認可外保育施設に月ぎめで預けている場合、翌年度の選考で+5点の加点があります。一度不承諾になっても認可外に預けながら再申請する戦略は有効です。</p></div>`,
    publishedAt: "2026-05-11",
    popularity: 39,
  },
  {
    slug: "ikukyuu-guide",
    citySlug: "ueda",
    title: "上田市で育休から保育所へ復帰する流れ",
    description: "上田市で育児休業から認可保育所に入所して職場復帰するための手順を解説します。min方式への対応も解説。",
    image: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>育休中の保活スケジュール</h2><p>育休中の保護者が4月入所を目指す場合、育休終了時期と入所時期を合わせることが重要です。</p><h2>育休復帰の加点について</h2><p>上田市では、育児休業から復帰予定の場合、調整点数で+5点の加点があります。復職予定の書類を準備して申込みましょう。</p><h2>上田市のmin方式と育休の関係</h2><p>育休中は就労時間がゼロです。配偶者がフルタイムで働いていても、育休中の保護者の基本点数はゼロになるため、利用調整点数は調整点数のみになります（min方式により）。育休から復帰する旨の書類を必ず提出してください。</p><h2>注意点</h2><ul><li>内定後に育休を延長した場合、入所が取り消されることがあります</li><li>復職後は月64時間以上の就労を維持することが必要です</li></ul>`,
    publishedAt: "2026-05-11",
    popularity: 53,
  },
  {
    slug: "nursery-fees",
    citySlug: "ueda",
    title: "上田市の保育料はいくら？　上限額と決まり方",
    description:
      "上田市の認可保育施設の保育料について、0〜2歳児クラスの上限額と決まり方を、市が公表している保育料表をもとに紹介します。",
    category: "お金の話",
    categoryColor: "rose",
    content: `<h2>3歳児クラス以上は保育料が無料</h2>
<p>2019年10月からの幼児教育・保育の無償化により、<span class="highlight">3歳児クラス以上</span>の保育料は無料です。ただし給食費（主食費・副食費）は別に必要です。</p>
<h2>0〜2歳児クラスの保育料の決まり方</h2>
<p>上田市の認可保育施設の保育料は、<span class="highlight">世帯の住民税額</span>と<span class="highlight">保育を利用する時間（保育標準時間・保育短時間）</span>で決まる階層表になっています。所得が高いほど階層が上がり、保育料も上がります。</p>
<h2>上田市でいちばん高い階層はいくら？</h2>
<p>上田市が公表している保育料表では、0〜2歳児クラス・保育標準時間のいちばん高い階層で<span class="highlight">月額64,500円</span>です。ここが上限で、これを超えることはありません。</p>
<div class="point-box">
<p><strong>ポイント</strong></p>
<p>保育料は毎年9月に切り替わります。4月分から8月分は前年度の住民税額、9月分から翌年3月分は当年度の住民税額で決まる自治体が多いため、9月に金額が変わることがあります。</p>
</div>
<h2>きょうだいがいる世帯の軽減</h2>
<p>上田市は次のように案内しています。</p>
<blockquote><p>軽減の拡充の概要軽減の拡充の概要区分対象軽減割合多子世帯第2子50％軽減第3子以降100％軽減（無償化）低所得世帯（市民税所得割額57,700円未満世帯）第1子50％軽減第2子100％軽減（無償化）※詳細な軽減内容は「保育料の軽減」をご参照ください。</p></blockquote>
<div class="info-box">
<p><strong>出典</strong></p>
<p>上記の金額は上田市が公表している保育料表によります。階層ごとの正確な金額は<a href="https://www.city.ueda.nagano.jp/uploaded/attachment/58012.pdf" target="_blank" rel="noopener">上田市の保育料表</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-09-06",
    popularity: 42,
  },
];

registerArticles(articles);
