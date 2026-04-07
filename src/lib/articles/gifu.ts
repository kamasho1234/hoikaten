import type { Article } from "./types";
import { registerArticles } from "./index";

const articles: Article[] = [
  // 1. 保活スケジュール
  {
    slug: "hokatsu-schedule",
    citySlug: "gifu",
    title: "岐阜市の保活スケジュール完全ガイド｜申込時期と流れを解説",
    description:
      "岐阜市の認可保育園・認定こども園の申込時期・選考の流れ・結果通知時期をわかりやすく解説。令和8年度4月入園のスケジュールを中心にまとめました。",
    image: "https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>令和8年度（2026年度）4月入園のスケジュール</h2>
<p>岐阜市の4月入園の申込みは、例年<strong>10月上旬〜10月下旬</strong>に受付が行われます。早めにスケジュールを把握して準備を進めましょう。</p>

<h3>4月入園の流れ</h3>
<table>
<tr><th>時期</th><th>やること</th></tr>
<tr><td>9月頃</td><td>入所案内・申請書類の配布開始（各保育所・認定こども園・子ども保育課）</td></tr>
<tr><td>10月上旬〜下旬</td><td>利用申込受付期間（第1希望の園に提出）</td></tr>
<tr><td>1月下旬〜2月</td><td>結果通知（郵送）</td></tr>
<tr><td>2月〜3月</td><td>内定した園での面談・健康診断</td></tr>
<tr><td>4月</td><td>入園</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>5月以降の途中入園は、入園希望月の前月10日頃が締切です。子ども保育課（058-214-2143）に確認しましょう。</p>
</div>

<h2>保活の理想的な進め方</h2>
<div class="step">
<div class="step-num">1</div>
<div class="step-content">
<strong>4月〜6月：情報収集</strong>
<p>岐阜市の保育施設一覧を確認し、通園可能な範囲の園をリストアップします。</p>
</div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content">
<strong>6月〜9月：保育園見学</strong>
<p>気になる園に電話して見学を予約。園の雰囲気や保育方針を直接確かめましょう。</p>
</div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content">
<strong>9月末〜10月：書類準備・提出</strong>
<p>就労証明書（有効期限3か月）など必要書類を揃えて、期限内に第1希望の園に提出します。</p>
</div>
</div>

<div class="info-box">
<p><strong>問い合わせ先</strong></p>
<p>岐阜市 子ども保育課 TEL：058-214-2143</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 55,
  },

  // 2. 点数の仕組み
  {
    slug: "scoring-system",
    citySlug: "gifu",
    title: "岐阜市の保育園入園｜点数の仕組みと計算方法をやさしく解説",
    description:
      "岐阜市の利用調整基準をもとに、基本点数と補正点数の仕組み・計算方法をわかりやすく解説します。",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop",
    category: "点数の仕組み",
    categoryColor: "blue",
    content: `<h2>岐阜市の点数制度のしくみ</h2>
<p>岐阜市では「<strong>優先順位（ランクA〜E）</strong>」と「<strong>基本点数＋補正点数</strong>」の二段階で入園の順位が決まります。同じランクの中で、点数が高い世帯が優先されます。</p>

<h3>計算の流れ</h3>
<div class="step">
<div class="step-num">1</div>
<div class="step-content">
<strong>父母それぞれの基本点数を出す</strong>
<p>就労・疾病・障害・介護・出産・就学・求職などの理由に応じて点数が付きます。最大100点です。</p>
</div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content">
<strong>父母の基本点数を合算する</strong>
<p>岐阜市は父母の点数を合計します。最大200点になります。</p>
</div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content">
<strong>補正点数を加算する</strong>
<p>ひとり親・きょうだい・障害・多子世帯などの世帯状況に応じた加点が加わります。</p>
</div>
</div>

<h2>基本点数の一覧（就労の場合）</h2>
<table>
<tr><th>月の就労時間</th><th>基本点数</th></tr>
<tr><td>月140時間以上</td><td>100点</td></tr>
<tr><td>月120〜140時間未満</td><td>90点</td></tr>
<tr><td>月100〜120時間未満</td><td>80点</td></tr>
<tr><td>月80〜100時間未満</td><td>70点</td></tr>
<tr><td>月60〜80時間未満</td><td>60点</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>就労は月60時間以上が前提条件です。父母ともにフルタイム（月140時間以上）であれば基本点数の合計は200点になります。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>利用調整基準の詳細は<a href="https://www.city.gifu.lg.jp/kosodate/hoiku/1012359/1012413/1003705.html" target="_blank" rel="noopener">岐阜市公式サイト「保育所（園）の入所選考」</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 60,
  },

  // 3. 補正点数（加点・減点）
  {
    slug: "hosei-tensuu",
    citySlug: "gifu",
    title: "岐阜市の補正点数を完全解説｜加点を積み上げるコツ",
    description:
      "岐阜市の保育園入園で重要な補正点数（加点）の全項目を解説。ひとり親・きょうだい加点・育休復帰など、加点を積み上げるコツをまとめました。",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>補正点数とは</h2>
<p>岐阜市では基本点数が同じ場合、「補正点数」の合計が高い世帯が優先されます。世帯の状況に応じた加点項目があり、漏れなく申告することが内定のカギです。</p>

<h2>主な加点項目</h2>
<table>
<tr><th>項目</th><th>補正点</th></tr>
<tr><td>ひとり親世帯または生活保護世帯</td><td>+25</td></tr>
<tr><td>保護者の月120時間以上の就労</td><td>+25</td></tr>
<tr><td>卒園児の連携施設への継続利用希望</td><td>+20</td></tr>
<tr><td>きょうだいが連携施設を利用中</td><td>+15</td></tr>
<tr><td>きょうだい同時利用希望</td><td>+15</td></tr>
<tr><td>身体障害者手帳1・2級／精神1級／療育手帳A</td><td>+15</td></tr>
<tr><td>その他の障害等級</td><td>+10</td></tr>
<tr><td>多子世帯（児童3人以上）</td><td>+10</td></tr>
<tr><td>要介護者が同居</td><td>+10</td></tr>
<tr><td>育児休業復帰1年以内</td><td>+10</td></tr>
<tr><td>保育可能な親族（20〜60歳）なし</td><td>+10</td></tr>
<tr><td>配偶者の単身赴任（60km以上等）</td><td>+5</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>ひとり親世帯と月120時間以上の就労はそれぞれ+25点と非常に大きい加点です。フルタイム勤務を維持することが有利に働きます。</p>
</div>

<h2>加点を積み上げるコツ</h2>
<h3>コツ1：就労時間を月120時間以上に</h3>
<p>基本点数が90→100点に上がるだけでなく、補正点数で+25点の加点が得られます。合わせて35点の差が生まれます。</p>

<h3>コツ2：きょうだい加点を活かす</h3>
<p>上の子が通う園や連携施設に申し込むと+15点の加点が得られます。第1子の園選びの段階から二人目以降を見据えた選択が大切です。</p>

<h3>コツ3：育休復帰加点を忘れずに</h3>
<p>育休から復帰して1年以内であれば+10点です。就労証明書と合わせて漏れなく申告しましょう。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>補正点数の詳細は<a href="https://www.city.gifu.lg.jp/kosodate/hoiku/1012359/1012413/1003705.html" target="_blank" rel="noopener">岐阜市公式サイト「保育所（園）の入所選考」</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 55,
  },

  // 4. 優先順位（ランク）の仕組み
  {
    slug: "rank-system",
    citySlug: "gifu",
    title: "岐阜市の優先順位（ランクA〜E）の仕組みを解説",
    description:
      "岐阜市の保育園入園選考で使われる優先順位（ランクA〜E）の決まり方を、初めての方にもわかるように解説します。",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>岐阜市の優先順位（ランク）とは</h2>
<p>岐阜市では、まず「<strong>優先順位（ランクA〜E）</strong>」で大きく選考が分けられ、同じランクの中で点数による順位が付けられます。</p>

<h2>ランク一覧</h2>
<table>
<tr><th>ランク</th><th>主な該当事由</th></tr>
<tr><td>A（最優先）</td><td>きょうだいが認可保育所等に在園中、小規模保育卒園児の連携施設希望、保護者が保育士・幼稚園教諭として月140時間以上勤務、里親、多胎児3人以上の同時利用希望、医療的ケア児の受入体制確保</td></tr>
<tr><td>B</td><td>保護者が個人事業者で就労、就労・就学等に該当する場合</td></tr>
<tr><td>C</td><td>その他の特定要件に該当する場合</td></tr>
<tr><td>D</td><td>特定要件に該当する場合</td></tr>
<tr><td>E（最低）</td><td>求職活動中</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>きょうだいが既に認可保育所に在園している場合はランクAになります。第1子の入園が2人目以降の保活にも大きく影響します。</p>
</div>

<h2>ランクが同じ場合の決まり方</h2>
<p>同じランク内では「基本点数（父母合計）＋補正点数」の合計が高い世帯が優先されます。さらに点数も同じ場合は抽選で決まります。</p>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>求職活動中はランクEとなり、最も低い優先順位です。入園が難しい場合は、先にパートなどで就労を開始してからの申請も検討しましょう。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>優先順位の詳細は<a href="https://www1.g-reiki.net/gifu/reiki_honbun/i700RG00001651.html" target="_blank" rel="noopener">岐阜市児童保育条例施行規則</a>の別表第1で確認できます。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 50,
  },

  // 5. 時短勤務・パートの影響
  {
    slug: "jitan-part-score",
    citySlug: "gifu",
    title: "岐阜市で時短勤務・パートだと点数はどうなる？不利を減らす方法",
    description:
      "岐阜市の保育園入園で時短勤務やパートタイムの場合の点数への影響と、不利を少しでも減らすための方法を解説します。",
    image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&h=400&fit=crop",
    category: "働き方と点数",
    categoryColor: "amber",
    content: `<h2>就労時間と基本点数の関係</h2>
<p>岐阜市では月あたりの就労時間で基本点数が段階的に決まります。フルタイム（月140時間以上）なら100点ですが、時短やパートだと点数が下がります。</p>

<table>
<tr><th>就労形態の例</th><th>月の就労時間目安</th><th>基本点数</th></tr>
<tr><td>フルタイム</td><td>160時間以上</td><td>100点</td></tr>
<tr><td>時短勤務（6時間×22日）</td><td>132時間</td><td>90点</td></tr>
<tr><td>パート（5時間×20日）</td><td>100時間</td><td>80点</td></tr>
<tr><td>パート（4時間×20日）</td><td>80時間</td><td>70点</td></tr>
<tr><td>パート（4時間×16日）</td><td>64時間</td><td>60点</td></tr>
</table>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>月120時間未満になると、補正点数の+25点の加点も得られなくなります。基本点数の差（10〜40点）と合わせると、フルタイムと大きな差が生まれます。</p>
</div>

<h2>不利を減らすための方法</h2>
<h3>方法1：就労時間を月120時間以上にする</h3>
<p>月120時間以上で基本点数90点＋補正25点が得られます。週5日・1日6時間以上を目指しましょう。</p>

<h3>方法2：他の加点をしっかり申告する</h3>
<p>育休復帰（+10）、保育可能な親族なし（+10）、多子世帯（+10）など、該当する補正点数を漏れなく申告しましょう。</p>

<h3>方法3：競争率の低い園を候補に入れる</h3>
<p>駅から離れた園や小規模保育は、人気園より競争率が低い場合があります。複数の園を希望することで内定の可能性が上がります。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>就労証明書の書式は<a href="https://www.city.gifu.lg.jp/kosodate/hoiku/1012359/1012413/index.html" target="_blank" rel="noopener">岐阜市公式サイト「保育施設入園あんない」</a>からダウンロードできます。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 45,
  },

  // 6. きょうだい加点
  {
    slug: "sibling-bonus",
    citySlug: "gifu",
    title: "岐阜市のきょうだい加点を解説｜2人目・3人目を同じ園に入れるコツ",
    description:
      "岐阜市の保育園できょうだいを同じ園に入れるための加点や優先順位のしくみ、戦略を解説します。",
    image: "https://images.unsplash.com/photo-1502781252888-9143f8790664?w=800&h=400&fit=crop",
    category: "きょうだい対策",
    categoryColor: "purple",
    content: `<h2>きょうだいに関する優遇制度</h2>
<p>岐阜市では、きょうだいがいる世帯にはランクと補正点数の両面で優遇措置があります。</p>

<h3>ランクでの優遇</h3>
<p>きょうだいが認可保育所等に在園中の場合、<strong>ランクA（最優先）</strong>に分類されます。これは選考上非常に有利です。</p>

<h3>補正点数での優遇</h3>
<table>
<tr><th>項目</th><th>補正点</th></tr>
<tr><td>きょうだいが連携施設を利用中で同施設を希望</td><td>+15</td></tr>
<tr><td>きょうだい同時利用希望</td><td>+15</td></tr>
<tr><td>多子世帯（児童3人以上）</td><td>+10</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>きょうだいが在園していればランクAに加え、連携施設への申込みで+15点、多子世帯であれば+10点と、大幅な優遇を受けられます。</p>
</div>

<h2>2人目を同じ園に入れるコツ</h2>
<h3>コツ1：上の子の園を第1希望にする</h3>
<p>きょうだいが在園中の園を希望すればランクAになります。これだけでかなり有利です。</p>

<h3>コツ2：小規模保育の卒園タイミングに合わせる</h3>
<p>上の子が小規模保育を卒園する際に連携施設を希望すれば、ランクA＋補正+20点（卒園児加点）が得られます。</p>

<h3>コツ3：同時入園の加点を活用する</h3>
<p>双子やきょうだいで同時に申し込む場合も+15点の加点があります。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>きょうだい加点の詳細は<a href="https://www.city.gifu.lg.jp/kosodate/hoiku/1012359/1012413/1003705.html" target="_blank" rel="noopener">岐阜市公式サイト「保育所（園）の入所選考」</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 45,
  },

  // 7. 認可外保育施設の活用
  {
    slug: "ninkagai-katsuyou",
    citySlug: "gifu",
    title: "岐阜市で認可外保育園を活用する保活戦略｜入園待ちの過ごし方",
    description:
      "岐阜市で認可保育園に入れなかった場合の認可外保育施設の活用法や、次の申込みに向けた戦略を解説します。",
    image: "https://images.unsplash.com/photo-1587654780293-b50e2cf18ee0?w=800&h=400&fit=crop",
    category: "保活テクニック",
    categoryColor: "amber",
    content: `<h2>認可外保育施設とは</h2>
<p>岐阜市では認可保育園に入れなかった場合、認可外保育施設（認可外保育園、企業主導型保育など）の利用を検討することが有効です。</p>

<h2>認可外を活用する保活戦略</h2>
<h3>戦略1：就労実績を作る</h3>
<p>認可外保育施設に子どもを預けて就労を開始すれば、次回の申込みで就労実績による基本点数を得られます。月140時間以上働ければ100点です。</p>

<h3>戦略2：育休復帰加点を得る</h3>
<p>育休から復帰して1年以内であれば+10点の補正点数が得られます。認可外を活用して早期に復帰するのも選択肢です。</p>

<h3>戦略3：途中入園を狙う</h3>
<p>岐阜市では5月以降の途中入園も受け付けています。4月入園で不承諾の場合は、空きが出る園に途中入園を申し込みましょう。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>認可外施設を利用中でも、認可保育園の入園申込みは引き続き可能です。認可外は「つなぎ」として活用し、次の選考に備えましょう。</p>
</div>

<h2>岐阜市の企業主導型保育事業</h2>
<p>企業主導型保育は認可外ですが、比較的保育料が安い施設もあります。地域枠があれば企業に勤務していなくても利用できます。</p>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>認可外保育施設は自治体ごとの基準ではなく、施設によって保育の質や料金が異なります。見学して安全面や保育内容を確認してから利用しましょう。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>岐阜市内の認可外保育施設の一覧は<a href="https://www.city.gifu.lg.jp/kosodate/hoiku/1012359/1012413/1012883.html" target="_blank" rel="noopener">岐阜市公式サイト「保育施設一覧表」</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 40,
  },

  // 8. 保育料と無償化
  {
    slug: "hoikuryo-mushouka",
    citySlug: "gifu",
    title: "岐阜市の保育料はいくら？無償化の対象と注意点まとめ",
    description:
      "岐阜市の保育料の決まり方と幼児教育・保育の無償化制度について、対象年齢や注意点をわかりやすく解説します。",
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&h=400&fit=crop",
    category: "費用・補助",
    categoryColor: "teal",
    content: `<h2>岐阜市の保育料の決まり方</h2>
<p>岐阜市の認可保育園の保育料は、<strong>世帯の市町村民税所得割額</strong>をもとに決まります。所得が高いほど保育料も高くなる段階制です。</p>

<h2>幼児教育・保育の無償化</h2>
<p>2019年10月から始まった幼児教育・保育の無償化により、以下が対象です。</p>

<table>
<tr><th>対象</th><th>内容</th></tr>
<tr><td>3〜5歳児クラス</td><td>保育料が無料（全員対象）</td></tr>
<tr><td>0〜2歳児クラス</td><td>住民税非課税世帯のみ保育料が無料</td></tr>
</table>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>無償化の対象は保育料のみです。給食費（副食費）、延長保育料、教材費などは実費負担です。副食費は月4,500円程度が目安ですが、年収360万円未満世帯や第3子以降は免除される場合があります。</p>
</div>

<h2>保育料の目安</h2>
<p>0〜2歳児の保育料は、世帯年収によっておおむね以下の範囲です（2号・3号認定の場合）。</p>
<table>
<tr><th>世帯年収の目安</th><th>月額保育料の目安</th></tr>
<tr><td>非課税世帯</td><td>0円</td></tr>
<tr><td>約300万円</td><td>15,000〜25,000円</td></tr>
<tr><td>約500万円</td><td>30,000〜40,000円</td></tr>
<tr><td>約700万円以上</td><td>45,000〜55,000円</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>第2子は半額、第3子以降は無料になる多子軽減制度があります。世帯年収360万円未満の場合は小学校3年生までのきょうだいがカウント対象になります。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>保育料の詳細は<a href="https://www.city.gifu.lg.jp/kosodate/hoiku/1012359/1012413/1003706.html" target="_blank" rel="noopener">岐阜市公式サイト「利用者負担額（保育料）及び給食費」</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 40,
  },

  // 9. ひとり親世帯の保活
  {
    slug: "single-parent-guide",
    citySlug: "gifu",
    title: "岐阜市のひとり親世帯向け保活ガイド｜加点と支援制度まとめ",
    description:
      "岐阜市でひとり親世帯が保育園入園で受けられる加点や、利用できる支援制度をまとめました。",
    image: "https://images.unsplash.com/photo-1531983412531-1f49a365ffed?w=800&h=400&fit=crop",
    category: "世帯別ガイド",
    categoryColor: "rose",
    content: `<h2>ひとり親世帯の加点</h2>
<p>岐阜市では、ひとり親世帯（母子家庭・父子家庭）は補正点数で<strong>+25点</strong>の大きな加点が得られます。これは全補正項目の中で最大級の加点です。</p>

<h2>ひとり親世帯が得られる加点の内訳例</h2>
<table>
<tr><th>項目</th><th>補正点</th></tr>
<tr><td>ひとり親世帯</td><td>+25</td></tr>
<tr><td>月120時間以上の就労</td><td>+25</td></tr>
<tr><td>保育可能な親族なし</td><td>+10</td></tr>
<tr><td>合計</td><td><strong>+60</strong></td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>ひとり親で月140時間以上のフルタイム勤務の場合、基本点数100点＋補正60点＝160点となり、非常に有利です。</p>
</div>

<h2>ひとり親世帯が利用できる支援制度</h2>
<h3>児童扶養手当</h3>
<p>ひとり親世帯を対象とした手当で、所得に応じて月額最大45,500円（2026年度）が支給されます。</p>

<h3>医療費助成</h3>
<p>岐阜市ではひとり親家庭等医療費助成制度があり、医療費の自己負担が軽減されます。</p>

<h3>保育料の軽減</h3>
<p>所得が低い場合は保育料の階層が下がるため、保育料がさらに安くなります。</p>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>ひとり親加点を受けるには、申込み時に戸籍謄本などの証明書類が必要です。事前に子ども保育課に確認し、書類の不備がないようにしましょう。</p>
</div>

<div class="info-box">
<p><strong>相談窓口</strong></p>
<p>岐阜市 子ども保育課 TEL：058-214-2143</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 35,
  },

  // 10. 不承諾時の対処法
  {
    slug: "fushouchi-taisaku",
    citySlug: "gifu",
    title: "岐阜市で保育園に落ちたら？不承諾時の対処法と次の手",
    description:
      "岐阜市で保育園の入園申込みが不承諾になった場合の対処法と、次の入園に向けた具体的な戦略を解説します。",
    image: "https://images.unsplash.com/photo-1450101499163-c8848e968698?w=800&h=400&fit=crop",
    category: "保活テクニック",
    categoryColor: "amber",
    content: `<h2>不承諾（落選）の通知を受けたら</h2>
<p>岐阜市で不承諾の通知を受け取っても、すぐに諦める必要はありません。途中入園や次年度に向けてできることがあります。</p>

<h2>すぐにやるべきこと</h2>
<h3>1. 途中入園の申込みを継続する</h3>
<p>4月に入れなくても、5月以降に空きが出ることがあります。岐阜市では月ごとに利用調整を行っているため、申込みを継続することで空きが出た際に案内を受けられます。</p>

<h3>2. 認可外保育施設を探す</h3>
<p>認可外保育園や企業主導型保育など、認可以外の施設も検討しましょう。就労を維持するためのつなぎとして利用できます。</p>

<h3>3. 育休延長の手続き</h3>
<p>不承諾通知書があれば、育休延長の手続きが可能です。最大2年（子が2歳になるまで）延長できます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>不承諾通知書は育休延長に必要な書類です。大切に保管しましょう。</p>
</div>

<h2>次年度に向けた戦略</h2>
<h3>就労実績を積む</h3>
<p>認可外施設に預けて就労を開始し、月140時間以上の実績を作れば基本点数100点を確保できます。</p>

<h3>加点項目を見直す</h3>
<p>補正点数で取れる加点がないか、改めて確認しましょう。育休復帰加点（+10）、多子世帯（+10）など見落としがないか点検します。</p>

<h3>希望園の範囲を広げる</h3>
<p>人気園だけでなく、競争率の低い園も候補に入れましょう。通園範囲を広げることで内定の可能性が上がります。</p>

<div class="info-box">
<p><strong>相談窓口</strong></p>
<p>岐阜市 子ども保育課 TEL：058-214-2143</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 30,
  },
];

registerArticles(articles);
