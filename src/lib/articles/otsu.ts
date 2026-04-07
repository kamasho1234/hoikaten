import type { Article } from "./types";
import { registerArticles } from "./index";

const articles: Article[] = [
  {
    slug: "hokatsu-schedule",
    citySlug: "otsu",
    title: "大津市の保活スケジュール完全ガイド　申込から内定まで",
    description:
      "大津市の認可保育園の申込時期・選考の流れをまとめました。令和8年度4月入園のスケジュールを解説します。",
    image: "https://images.unsplash.com/photo-1484820540004-14229fe36ca4?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>大津市の4月入園スケジュール</h2>
<p>大津市の認可保育園は毎年秋に翌年度4月入園の一斉申込を受付けます。「保育所等利用案内」を入手して準備しましょう。</p>

<h3>保活の全体スケジュール</h3>
<div class="step">
<div class="step-num">1</div>
<div class="step-content">
<strong>4月〜6月：情報収集</strong>
<p>大津市のホームページで保育園一覧や空き状況を確認します。大津市は認可保育所・認定こども園・小規模保育事業所・事業所内保育事業など多くの施設があります。</p>
</div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content">
<strong>6月〜9月：保育園見学</strong>
<p>気になる園に連絡して見学を予約しましょう。大津市はJR琵琶湖線・京阪沿線に多くの保育施設があり、通勤ルート上の園も候補になります。</p>
</div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content">
<strong>9月〜10月：利用案内の入手・書類準備</strong>
<p>勤務（内定）証明書などの必要書類を準備します。大津市のホームページから書類をダウンロードできます。</p>
</div>
</div>
<div class="step">
<div class="step-num">4</div>
<div class="step-content">
<strong>10月〜11月：申込書類の提出</strong>
<p>保育入所課の窓口で提出します。</p>
</div>
</div>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>大津市は基本表の点数が最大6点で、父母の低い方の点数で選考が行われる「低位採用」方式です。フルタイム共働き世帯は基本点6点が出発点になります。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳しくは<a href="https://www.city.otsu.lg.jp/soshiki/015/1410/g/hn/69848.html" target="_blank" rel="noopener">大津市公式サイト「保育所等利用案内」</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 55,
  },
  {
    slug: "scoring-system-guide",
    citySlug: "otsu",
    title: "大津市の点数の仕組みと計算方法　基本表と点数変更項目を解説",
    description:
      "大津市の保育園入園選考で使われる基本表と点数変更項目の仕組みを解説します。",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>大津市の利用調整基準とは</h2>
<p>大津市の認可保育園の入園選考は「基本表の点数（父母の低い方を採用）＋ 点数変更項目」で行われます。基本表の最大は6点、点数変更項目は合計±2までですが、基本表が6点の場合は加点の上限がありません。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>選考点数 = 基本表の点数（父母の低い方）+ 点数変更項目（合計±2まで）</p>
</div>

<h2>基本表（最大6点）</h2>
<p>就労の場合、月20日以上かつ日7時間以上の実働で満点の<span class="highlight">6点</span>です。</p>

<table>
<tr><th>保育が必要な理由</th><th>条件</th><th>点数</th></tr>
<tr><td>就労</td><td>月20日以上かつ日7時間以上</td><td>6</td></tr>
<tr><td>就労</td><td>月16日以上かつ日7時間以上</td><td>5</td></tr>
<tr><td>就労</td><td>月20日以上かつ日4〜7時間</td><td>4</td></tr>
<tr><td>就労</td><td>月16日以上かつ日4〜7時間</td><td>3</td></tr>
<tr><td>就労</td><td>上記以外の労働</td><td>2</td></tr>
<tr><td>妊娠・出産</td><td>—</td><td>6</td></tr>
<tr><td>疾病（入院）</td><td>入院中</td><td>6</td></tr>
<tr><td>疾病（居宅療養）</td><td>入院相当・常時困難</td><td>6</td></tr>
<tr><td>障害</td><td>著しく困難</td><td>6</td></tr>
<tr><td>介護（同居親族）</td><td>重症者の介護で常時困難</td><td>6</td></tr>
<tr><td>就学</td><td>月20日以上かつ日7時間以上</td><td>4</td></tr>
<tr><td>求職活動</td><td>—</td><td>1</td></tr>
</table>

<h2>点数変更項目の代表例</h2>
<ul>
<li>ひとり親世帯：<span class="highlight">+2点</span></li>
<li>生活保護世帯：<span class="highlight">+2点</span></li>
<li>きょうだい入所（同園）：<span class="highlight">+2点</span></li>
<li>3歳児継続（2歳児クラスまでの施設卒園）：<span class="highlight">+2点</span></li>
<li>主たる生計者が求職中：<span class="highlight">+2点</span></li>
<li>産休・育休復帰：<span class="highlight">+1点</span></li>
<li>保育士加点：<span class="highlight">+1点</span></li>
</ul>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>全項目は<a href="https://www.city.otsu.lg.jp/material/files/group/10/R8cyouseikijyunn.pdf" target="_blank" rel="noopener">大津市「保育施設等利用調整基準」（PDF）</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 60,
  },
  {
    slug: "score-up-tips",
    citySlug: "otsu",
    title: "大津市の加点のコツ　点数アップ戦略と点数変更項目の活用法",
    description:
      "大津市の保育園入園選考で点数変更項目の加点を最大限に活用する方法を解説します。",
    image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>基本点6点は出発点</h2>
<p>大津市ではフルタイム共働き世帯は基本表<span class="highlight">6点</span>で横並びです。差がつくのは点数変更項目です。しかも基本表6点の場合は加点の上限がないため、該当する項目はすべて積み上げられます。</p>

<h2>加点チェックリスト</h2>
<table>
<tr><th>項目</th><th>点数</th><th>条件</th></tr>
<tr><td>ひとり親世帯</td><td>+2</td><td>ひとり親家庭等（里親委託含む）</td></tr>
<tr><td>生活保護世帯</td><td>+2</td><td>生活保護受給世帯</td></tr>
<tr><td>きょうだい入所</td><td>+2</td><td>希望施設にきょうだいが在籍</td></tr>
<tr><td>3歳児継続</td><td>+2</td><td>2歳児クラスまでの施設を卒園</td></tr>
<tr><td>主たる生計者が求職中</td><td>+2</td><td>主たる生計者が求職活動中</td></tr>
<tr><td>産休・育休復帰</td><td>+1</td><td>休業終了により職場復帰</td></tr>
<tr><td>きょうだい同時申請</td><td>+1</td><td>同じ認可保育所に同時に新規申込</td></tr>
<tr><td>多胎児</td><td>+1</td><td>双子等の多胎児</td></tr>
<tr><td>単身赴任</td><td>+1</td><td>保護者のいずれかが単身赴任</td></tr>
<tr><td>保育士加点</td><td>+1</td><td>保育士資格で市内保育施設に就労</td></tr>
<tr><td>転園希望</td><td>+1</td><td>転入・転居で現施設への通園が不適当</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>大津市の特徴は「基本表6点の場合は加点上限なし」です。きょうだい加点+2、育休復帰+1、保育士加点+1など該当するものをすべて積み上げて8点以上を目指しましょう。一方、基本表が6点未満の場合は変更幅が±2までに制限されます。</p>
</div>

<div class="info-box">
<p><strong>注意：減点項目</strong></p>
<p>就学前児童の自宅保育（-1点）、自営業で就労証明書のみ（-1点）の減点項目もあるため注意してください。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 58,
  },
  {
    slug: "low-score-adopted",
    citySlug: "otsu",
    title: "大津市は「低位採用」方式！父母の低い方の点数で選考される仕組み",
    description:
      "大津市独自の低位採用方式を解説。父母の点数が異なる場合にどう選考されるかを詳しく説明します。",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>大津市の「低位採用」とは</h2>
<p>大津市の利用選考は「保護者によって該当する点数が異なるときは低いほうの点数により行います」と明記されています。これは父母の基本点のうち低い方が採用される仕組みです。</p>

<h3>具体例で理解する</h3>
<table>
<tr><th>ケース</th><th>保護者1</th><th>保護者2</th><th>採用される点数</th></tr>
<tr><td>両方フルタイム</td><td>6点</td><td>6点</td><td><span class="highlight">6点</span></td></tr>
<tr><td>片方パート</td><td>6点</td><td>3点</td><td><span class="highlight">3点</span></td></tr>
<tr><td>片方求職中</td><td>6点</td><td>1点</td><td><span class="highlight">1点</span></td></tr>
</table>

<h3>低位採用で不利にならないために</h3>
<ul>
<li>両方の保護者がフルタイム就労（6点）であることが理想</li>
<li>片方がパートタイムの場合、月20日以上かつ日7時間以上を目指すと6点に</li>
<li>月16日以上かつ日7時間以上でも5点を確保できる</li>
<li>求職中（1点）は大きく不利になるため、内定を得てから申込むのが有利</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>大津市の基本表は「日数×時間」の組み合わせで点数が決まります。週4日で日7時間以上（月16日以上）なら5点、週5日で日4〜7時間なら4点です。フルタイムに近い働き方で6点を確保することが最重要です。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 48,
  },
  {
    slug: "nursery-visit-checklist",
    citySlug: "otsu",
    title: "大津市の保育園見学チェックリスト　見るべき10のポイント",
    description:
      "大津市の保育園見学で確認すべきポイントをチェックリスト形式でまとめました。",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>見学前に知っておくこと</h2>
<p>大津市には認可保育所・認定こども園・小規模保育事業所など多くの施設があります。琵琶湖沿いの南部エリアを中心に保育需要が高く、見学は6月〜9月に集中するため早めに予約しましょう。</p>

<h3>見学チェックリスト</h3>
<table>
<tr><th>チェック項目</th><th>確認ポイント</th></tr>
<tr><td>園庭の広さ</td><td>外遊びの頻度と場所</td></tr>
<tr><td>給食の内容</td><td>自園調理かどうか、アレルギー対応</td></tr>
<tr><td>保育士の雰囲気</td><td>子どもへの声かけの仕方</td></tr>
<tr><td>お迎え時間</td><td>延長保育の有無と時間</td></tr>
<tr><td>持ち物</td><td>おむつ・布団の持参が必要か</td></tr>
<tr><td>登園方法</td><td>自転車・車での送迎のしやすさ</td></tr>
<tr><td>行事の頻度</td><td>平日の行事参加が必要か</td></tr>
<tr><td>慣らし保育</td><td>期間と進め方</td></tr>
<tr><td>病児対応</td><td>発熱時のお迎え基準</td></tr>
<tr><td>安全対策</td><td>門の施錠・防犯カメラの有無</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>大津市はJR琵琶湖線の大津駅・膳所駅・石山駅周辺や、京阪沿線の浜大津・近江神宮前エリアで保育需要が高い傾向です。0〜2歳児クラスは特に競争率が高いため、複数の園を見学しておくことをおすすめします。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 42,
  },
  {
    slug: "ikukyu-hokatsu",
    citySlug: "otsu",
    title: "大津市で育休中の保活でやるべきこと　復帰までの準備",
    description:
      "大津市で育児休業中に進めるべき保活の手順と注意点をまとめました。",
    image: "https://images.unsplash.com/photo-1590650153855-d9e808231d41?w=800&h=400&fit=crop",
    category: "育休中の保活",
    categoryColor: "purple",
    content: `<h2>育休中にやるべきこと</h2>
<p>育児休業中の保活は時間との勝負です。大津市の申込スケジュールに合わせて計画的に進めましょう。</p>

<h3>育休中の保活ステップ</h3>
<div class="step">
<div class="step-num">1</div>
<div class="step-content">
<strong>産後3か月頃：情報収集開始</strong>
<p>大津市の「保育所等利用案内」を入手し、近隣の保育園をリストアップします。</p>
</div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content">
<strong>産後5〜8か月頃：見学</strong>
<p>候補の園を見学します。大津市では見学は随時受付の園が多いです。</p>
</div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content">
<strong>10月頃：申込書類の準備・提出</strong>
<p>勤務（内定）証明書を会社に依頼し、育児休業取得中であることがわかる書類とともに提出します。</p>
</div>
</div>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>大津市では産休・育休から職場復帰する場合、点数変更項目で<span class="highlight">+1点</span>の加点があります。復帰する職場が決まっている場合に限られるため、勤務先の復帰証明を用意しましょう。なお、希望する保育施設に入所できない際に育児休業の延長も許容できる場合は基本点が0点になるため注意してください。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳しくは<a href="https://www.city.otsu.lg.jp/soshiki/015/1410/g/hn/69848.html" target="_blank" rel="noopener">大津市公式サイト「保育所等利用案内」</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 50,
  },
  {
    slug: "small-nursery",
    citySlug: "otsu",
    title: "大津市の小規模保育園という選択肢　3歳児継続で+2点の加点",
    description:
      "大津市の小規模保育事業所のメリットと卒園後の3歳児継続加点の仕組みを解説します。",
    image: "https://images.unsplash.com/photo-1576495199011-eb94736d05d6?w=800&h=400&fit=crop",
    category: "施設の種類",
    categoryColor: "teal",
    content: `<h2>小規模保育事業所とは</h2>
<p>大津市には0〜2歳児を対象にした小規模保育事業所があります。定員6〜19名の少人数保育で、家庭的な雰囲気が特徴です。</p>

<h3>小規模保育のメリット</h3>
<ul>
<li>少人数で手厚い保育が受けられる</li>
<li>認可保育園より競争率が低い場合がある</li>
<li>卒園後に点数変更項目で<span class="highlight">+2点</span>の「3歳児継続」加点がもらえる</li>
</ul>

<h3>卒園後の進路</h3>
<p>大津市では在籍する保育施設や企業主導型保育施設が2歳児クラスまでしかなく、3歳児以降も保育施設の利用を希望する場合に+2点が加算されます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>大津市の3歳児継続加点+2は、基本表6点の場合はさらに上乗せできるため非常に有効です。0〜2歳は小規模保育に入園し、3歳以降は+2点を活かして人気園に転園する戦略が考えられます。さらにきょうだい入所+2と合わせると合計10点も可能です。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>小規模保育事業所の一覧は<a href="https://www.city.otsu.lg.jp/soshiki/015/1410/g/hn/69848.html" target="_blank" rel="noopener">大津市公式サイト</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 52,
  },
  {
    slug: "second-child-hokatsu",
    citySlug: "otsu",
    title: "大津市で二人目の保活で注意すること　きょうだい加点を活用",
    description:
      "大津市で二人目のお子さんの保活をする際の注意点ときょうだい加点の仕組みを解説します。",
    image: "https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=800&h=400&fit=crop",
    category: "二人目の保活",
    categoryColor: "rose",
    content: `<h2>二人目の保活のポイント</h2>
<p>大津市では二人目の保活で「きょうだい加点」を活用することが重要です。</p>

<h3>きょうだいに関する加点</h3>
<table>
<tr><th>条件</th><th>加点</th></tr>
<tr><td>希望する保育施設にきょうだいが在籍</td><td>+2</td></tr>
<tr><td>きょうだいと同一の認可保育所に同時新規申込</td><td>+1</td></tr>
<tr><td>多胎児（双子等）</td><td>+1</td></tr>
</table>

<h3>同じ園に通わせるには</h3>
<p>上の子が通っている園を希望すれば<span class="highlight">+2点</span>の加点がもらえます。大津市の点数変更項目の中で最大の加点です。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>大津市ではきょうだい入所+2は「同点優先項目」でも優先されます。同点の場合、きょうだいが在籍している方が優先されるため、上の子と同じ園を第1希望にするのが鉄則です。さらに同時申込の場合は+1も加算されます。</p>
</div>

<div class="info-box">
<p><strong>注意</strong></p>
<p>同点の場合は「3歳児継続」「希望先順位」「きょうだい入所」「きょうだい同時申請」「入所待機期間」の順に優先度が判断されます。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 45,
  },
  {
    slug: "hoikuryo-guide",
    citySlug: "otsu",
    title: "大津市の保育料の決まり方と節約のコツ",
    description:
      "大津市の認可保育園の保育料の算定方法と負担を軽減する方法を解説します。",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop",
    category: "保育料",
    categoryColor: "purple",
    content: `<h2>大津市の保育料の決まり方</h2>
<p>大津市の認可保育園の保育料（利用者負担額）は、世帯の市民税額と子どもの年齢によって決まります。</p>

<h3>保育料のポイント</h3>
<ul>
<li>3〜5歳児：幼児教育・保育無償化により<span class="highlight">無料</span></li>
<li>0〜2歳児：世帯の市民税所得割額に応じて決定</li>
<li>第2子以降の保育料は軽減あり</li>
<li>利用者負担額の滞納が特別な事情なくある場合は同点選考で不利に</li>
</ul>

<h3>節約のコツ</h3>
<table>
<tr><th>方法</th><th>効果</th></tr>
<tr><td>iDeCo・ふるさと納税の活用</td><td>市民税を下げて保育料を抑える</td></tr>
<tr><td>育休のタイミング調整</td><td>算定年度の所得を抑える</td></tr>
<tr><td>認定こども園の1号認定</td><td>教育部分は無償化の対象</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>大津市では同点優先項目の中に「世帯の所得割額が低い方」が含まれています。保育料の節約だけでなく、同点時の優先順位にも関わる重要なポイントです。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>保育料の詳細は<a href="https://www.city.otsu.lg.jp/soshiki/015/1410/g/hn/1470809007828.html" target="_blank" rel="noopener">大津市「保育所等保育料について」</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 38,
  },
  {
    slug: "rejection-options",
    citySlug: "otsu",
    title: "大津市で保育園に落ちたときの対処法　次にやるべきこと",
    description:
      "大津市の保育園入園で不承諾になった場合の対処法と次のステップをまとめました。",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=400&fit=crop",
    category: "不承諾対策",
    categoryColor: "rose",
    content: `<h2>不承諾通知が届いたら</h2>
<p>大津市では4月一斉入所の選考結果が2月頃に届きます。不承諾だった場合でも、まだ選択肢はあります。</p>

<h3>すぐにやること</h3>
<div class="step">
<div class="step-num">1</div>
<div class="step-content">
<strong>2次選考に申し込む</strong>
<p>1次選考で空きが出た園の2次募集があります。速やかに申し込みましょう。</p>
</div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content">
<strong>5月以降の途中入所を申し込む</strong>
<p>年度途中でも空きが出れば入所できます。毎月の選考に自動的にかかります。</p>
</div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content">
<strong>認可外保育施設や一時預かりを利用する</strong>
<p>認可外施設を利用しながら翌年度の再申込に備えましょう。同点優先項目で「一時預かり・認可外保育施設等を利用している場合」が有利に考慮されます。</p>
</div>
</div>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>大津市では同点の場合「入所待機の期間が長い方」が優先されます。早めに申込んでおくことで、翌年度に同点時の優先順位が上がります。また大津市は市内保育施設で就労する保育士資格保持者を最優先で審査する特別措置があります。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>最新の情報は<a href="https://www.city.otsu.lg.jp/soshiki/015/1410/g/hn/69848.html" target="_blank" rel="noopener">大津市公式サイト「保育所等利用案内」</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 46,
  },
];

registerArticles(articles);
