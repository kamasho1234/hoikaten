import type { Article } from "./types";
import { registerArticles } from "./index";

const articles: Article[] = [
  {
    slug: "hokatsu-schedule",
    citySlug: "obu",
    title: "大府市の保活スケジュール　申込から内定までの流れ",
    description:
      "大府市の認可保育園の申込時期・選考の流れをまとめました。令和8年度4月入園の動き方を解説します。",
    image: "https://images.unsplash.com/photo-1484820540004-14229fe36ca4?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>大府市の4月入園スケジュール</h2>
<p>大府市の認可保育園は毎年秋に翌年度4月入園の一次申込を受付けます。基準点数・調整点数を理解して準備を進めましょう。</p>

<h3>保活の全体スケジュール</h3>
<div class="step">
<div class="step-num">1</div>
<div class="step-content">
<strong>4月〜6月：情報収集</strong>
<p>大府市のホームページで保育園の一覧や前年度のボーダー（最低点数一覧）を確認します。</p>
</div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content">
<strong>7月〜9月：保育園見学</strong>
<p>大府市内の保育園を見学して、通勤経路との相性を確認しましょう。</p>
</div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content">
<strong>9月〜10月：書類準備</strong>
<p>月あたり就労時間は正確に記載してもらいましょう。点数に直結します。</p>
</div>
</div>
<div class="step">
<div class="step-num">4</div>
<div class="step-content">
<strong>11月：申込書類の提出</strong>
<p>4月一次の申込期限は例年11月中旬です。期限厳守で提出しましょう。</p>
</div>
</div>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>大府市の基準点数は父母それぞれ最大11点（合計22点満点）です。月の就労時間で判定される制度です。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳しくは<a href="https://www.city.obu.aichi.jp/kosodate/hoikuen/index.html" target="_blank" rel="noopener">大府市公式サイト 保育施設</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-04-26",
  },
  {
    slug: "scoring-system-guide",
    citySlug: "obu",
    title: "大府市の入園点数のしくみ　基準点数と調整点数を解説",
    description:
      "大府市の保育園入園選考で使われる基準点数と調整点数のしくみをわかりやすく解説します。",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>大府市の選考点数とは</h2>
<p>大府市の認可保育園は「基準点数（父＋母）＋ 調整点数」の合計で選考されます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>総合点数 ＝ 基準点数（父＋母）＋ 調整点数</p>
</div>

<h2>基準点数（父母それぞれ最大11点、合計22点）</h2>
<p>就労の場合、月160時間以上の就労で満点の<span class="highlight">11点</span>です。</p>

<table>
<tr><th>月の就労時間</th><th>点数</th></tr>
<tr><td>月160時間以上</td><td>11</td></tr>
<tr><td>月140時間以上160時間未満</td><td>10</td></tr>
<tr><td>月120時間以上140時間未満</td><td>9</td></tr>
<tr><td>月100時間以上120時間未満</td><td>8</td></tr>
<tr><td>月100時間未満</td><td>7</td></tr>
</table>

<h2>調整点数の代表例</h2>
<ul>
<li>ひとり親世帯：<span class="highlight">+16点</span></li>
<li>生活保護世帯：<span class="highlight">+5点</span></li>
<li>きょうだいが在園中：<span class="highlight">+3点</span></li>
<li>きょうだいと同時申込：<span class="highlight">+2点</span></li>
</ul>

<div class="info-box">
<p><strong>同点の場合の判定</strong></p>
<p>総合点数が同じ場合は基準点数の高い者が優先されます。さらに基準点数も同じ場合は所得の低い者から承諾されます。</p>
</div>`,
    publishedAt: "2026-04-26",
  },
  {
    slug: "score-up-tips",
    citySlug: "obu",
    title: "大府市で入園点数を上げるコツ　調整点数チェックリスト",
    description:
      "大府市の保育園入園選考で調整点数の加点を最大限に活用する方法を解説します。",
    image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>基準点数22点は出発点</h2>
<p>大府市ではフルタイム共働き世帯は基準点数<span class="highlight">22点</span>（父母各11点）で横並びです。差がつくのは調整点数の加点です。</p>

<h2>加点チェックリスト</h2>
<table>
<tr><th>項目</th><th>点数</th><th>条件</th></tr>
<tr><td>ひとり親世帯</td><td>+16点</td><td>母子・父子家庭の場合</td></tr>
<tr><td>生活保護</td><td>+5点</td><td>生活保護を受けている場合</td></tr>
<tr><td>きょうだい在園</td><td>+3点</td><td>認可保育園にきょうだいが在園中</td></tr>
<tr><td>きょうだい同時申込</td><td>+2点</td><td>きょうだいと同時に申し込む場合</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>大府市は入所決定者の最低点数一覧を公開しています。園ごとのボーダーを確認して、自分の点数で入園できそうな園を探しましょう。</p>
</div>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>就労証明書の月あたり就労時間は正確に記載してください。実態と異なる記載は入園取消しの対象です。</p>
</div>`,
    publishedAt: "2026-04-26",
  },
  {
    slug: "tiebreaker-rules",
    citySlug: "obu",
    title: "大府市で同点になったらどうなる？優先順位を解説",
    description:
      "大府市の保育園入園選考で同点だった場合の優先順位の判定方法を解説します。",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>同点時の判定方法</h2>
<p>大府市の入園選考で総合点数が同点になった場合、さらに優先順位で判定されます。</p>

<h2>同点時に優先される順序</h2>
<ol>
<li>基準点数の高い者</li>
<li>所得の低い者</li>
<li>その他、児童福祉の観点から配慮が必要な世帯</li>
</ol>

<h3>児童福祉の観点から配慮される世帯</h3>
<ul>
<li>ひとり親世帯</li>
<li>きょうだいが同じ園に在園中</li>
<li>認可外保育施設に在所中</li>
<li>生活保護世帯</li>
<li>市外から転入予定の家庭</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>大府市の22点制では、フルタイム共働きで22点が基本ラインです。調整点数の加点が当落を分けることがあります。</p>
</div>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>優先順位は年度によって変更される場合があります。最新の「入園のご案内」で必ず確認しましょう。</p>
</div>`,
    publishedAt: "2026-04-26",
  },
  {
    slug: "part-time-work-score",
    citySlug: "obu",
    title: "大府市で時短勤務だと点数はどう変わる？",
    description:
      "大府市の保育園入園選考で時短勤務の場合の基準点数への影響を解説します。",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>大府市は月の就労時間で判定</h2>
<p>大府市の基準点数は月の就労時間で決まります。時短勤務の影響を確認しましょう。</p>

<table>
<tr><th>月の就労時間</th><th>基準点数</th></tr>
<tr><td>月160時間以上</td><td>11点</td></tr>
<tr><td>月140時間以上160時間未満</td><td>10点</td></tr>
<tr><td>月120時間以上140時間未満</td><td>9点</td></tr>
<tr><td>月100時間以上120時間未満</td><td>8点</td></tr>
<tr><td>月100時間未満</td><td>7点</td></tr>
</table>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>1日6時間×週5日＝月約120時間の時短勤務の場合、基準点数は<span class="highlight">9点</span>です。フルタイムの11点と比べて2点下がります。</p>
</div>

<h2>月160時間の壁</h2>
<p>満点の11点を得るには月160時間以上が必要です。1日8時間×月20日＝160時間がちょうど満点ラインです。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>復職後のフルタイム勤務条件を就労証明書に記載してもらえるか、勤務先に確認しましょう。育休中でも復職後の勤務条件で点数が判定されます。</p>
</div>`,
    publishedAt: "2026-04-26",
  },
  {
    slug: "single-parent-score",
    citySlug: "obu",
    title: "大府市でひとり親の場合　加点と支援制度を解説",
    description:
      "大府市の保育園入園選考でひとり親世帯が受ける加点と、利用できる支援制度をまとめました。",
    image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>ひとり親世帯の加点</h2>
<p>大府市の入園選考で、ひとり親世帯は調整点数で<span class="highlight">+16点</span>の加点が得られます。</p>

<h3>加点の対象</h3>
<ul>
<li>母子家庭（父親が不在）</li>
<li>父子家庭（母親が不在）</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>ひとり親は基準点数が同じ場合の同点調整でも優先される傾向があります。必ず申込書類でひとり親であることを記載しましょう。</p>
</div>

<h2>ひとり親が利用できる支援制度</h2>
<p>大府市ではひとり親世帯向けの様々な支援制度があります。保育園入園時の相談窓口で詳しく説明を受けられます。</p>

<h3>保育料の軽減</h3>
<p>市町村民税非課税世帯のひとり親は、保育料が軽減される場合があります。</p>

<h3>児童扶養手当</h3>
<p>18歳未満の子どもを育てるひとり親に対して、児童扶養手当が支給されます。</p>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>加点を受けるには、戸籍謄本や児童扶養手当受給証などの書類提出が必要な場合があります。事前に大府市に確認しましょう。</p>
</div>`,
    publishedAt: "2026-04-26",
  },
  {
    slug: "parental-leave-timing",
    citySlug: "obu",
    title: "大府市の育休明けのタイミング　入園点数への影響",
    description:
      "大府市の保育園入園選考で育休明けの復帰タイミングが点数に与える影響を解説します。",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>育休中の点数判定</h2>
<p>育児休業中の保護者の基準点数は、復職後の勤務条件で判定されます。フルタイム復帰予定であれば、育休中でも11点（満点）が認定されます。</p>

<h3>基準点数の判定</h3>
<ul>
<li>育児休業中であっても、復職後の就労時間で基準点が決まります</li>
<li>就労証明書に「復帰予定日」と「復帰後の勤務時間」を記載してもらいましょう</li>
<li>これが点数認定に直結します</li>
</ul>

<h2>育休と調整点数</h2>
<p>大府市の基準表にはNo.18〜20で育休に関する事項が定められていますが、これらは減点の対象です。翌年度4月1日以降に復帰する場合は−3点、復帰予定が未定の場合は−5点の減点があります。また入園できない場合の育児休業継続に同意する場合は−18点の減点があります。</p>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>育休関連の調整項目は加点ではなく減点の対象です。復帰タイミングや不承諾時の対応については、申込時に大府市に詳しく確認しましょう。</p>
</div>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>育休中の基準点数は復職後の条件で判定されるため、復帰予定の就労条件を正確に証明することが重要です。</p>
</div>`,
    publishedAt: "2026-04-26",
  },
  {
    slug: "nursery-wait-time",
    citySlug: "obu",
    title: "大府市の待機児童の現状　入園の難易度を解説",
    description:
      "大府市の認可保育園の待機児童数や競争率から、入園の難易度を分析します。",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>大府市の待機児童状況</h2>
<p>大府市の認可保育園の需要と供給のバランスを把握することが、保活戦略の第一歩です。</p>

<h3>保育園の競争率</h3>
<p>大府市内の保育園は地域によって競争率が異なります。駅前や商業施設近くの人気園は倍率が高い傾向にあります。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>前年度の「入所決定者の最低点数一覧」を確認することで、自分の点数で合格できそうな園を見つけることができます。</p>
</div>

<h2>大府市内の園の特徴</h2>
<ul>
<li>駅前の認可保育園：競争率高、倍率2倍以上</li>
<li>駅から少し離れた園：競争率中程度、倍率1.5倍</li>
<li>郊外の園：比較的入りやすい傾向</li>
</ul>

<h3>0歳児クラスと1歳児クラスの難易度</h3>
<p>0歳児は定員が少ないため、最もボーダーが高くなる傾向があります。1歳児は0歳児よりは入りやすいですが、2歳児以上と比べるとやや難しい傾向があります。</p>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>待機児童数は毎年変動します。必ず最新の大府市公式情報で確認しましょう。</p>
</div>`,
    publishedAt: "2026-04-26",
  },
  {
    slug: "application-checklist",
    citySlug: "obu",
    title: "大府市の申込書類チェックリスト　書き漏れを防ぐ",
    description:
      "大府市の保育園申込に必要な書類と、記入時の注意点をまとめたチェックリストです。",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>申込書類チェックリスト</h2>
<p>申込期限の前に書類不備を防ぐため、チェックリストを確認しましょう。</p>

<h3>提出が必須の書類</h3>
<ul>
<li>保育園入園申込書（指定様式）</li>
<li>家庭状況調査票</li>
<li>就労証明書（就労している場合）</li>
<li>保険証の写し</li>
<li>印鑑</li>
</ul>

<h3>就労証明書の記入ポイント</h3>
<ul>
<li>月の就労時間を正確に記載する</li>
<li>通勤時間は含めない</li>
<li>残業時間も含めた実働時間で計算する</li>
<li>勤務先の押印を忘れずに</li>
</ul>

<h3>その他の加点に関連する提出書類</h3>
<table>
<tr><th>加点項目</th><th>必要な書類</th></tr>
<tr><td>ひとり親</td><td>戸籍謄本（コピー）、児童扶養手当受給証</td></tr>
<tr><td>生活保護</td><td>生活保護受給証明書</td></tr>
<tr><td>認可外保育施設利用中</td><td>施設からの在園証明書</td></tr>
<tr><td>身体障害者手帳</td><td>手帳のコピー</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>書類は期限までに余裕を持って提出しましょう。郵送の場合は消印有効日を確認してください。</p>
</div>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>書類に記載漏れがあると点数が認定されない場合があります。申込む前に大府市役所に確認することをお勧めします。</p>
</div>`,
    publishedAt: "2026-04-26",
  },
  {
    slug: "unlicensed-nursery",
    citySlug: "obu",
    title: "大府市で認可外保育施設を利用する場合の加点",
    description:
      "大府市の保育園入園選考で認可外保育施設の利用が与える影響と加点制度を解説します。",
    image: "https://images.unsplash.com/photo-1503454537688-e47a8b0b5a20?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>大府市の基準表にはこの項目はありません</h2>
<p>大府市の保育所等利用調整指数表（令和8年度）には、認可外保育施設の利用に対する加点項目は設定されていません。</p>

<h2>調整点数に含まれる項目</h2>
<p>大府市の調整点数（加算・減算）に含まれる項目は以下の通りです：</p>
<ul>
<li>生活保護による被保護世帯（加算5点）</li>
<li>ひとり親世帯（加算16点）</li>
<li>きょうだいの在園・申込状況（加算2〜3点）</li>
<li>保育士の資格を有する保護者が市内の保育施設等で勤務・内定（加算1〜2点）</li>
<li>居住する小学校区域内にある保育園への第1希望（加算1点）</li>
<li>保育料等の滞納（減点3点）</li>
<li>育児休業関連（減点3〜18点）</li>
</ul>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳しくは<a href="https://www.city.obu.aichi.jp/kosodate/hoikuen/1015050/1011404.html" target="_blank" rel="noopener">大府市の「入園のご案内」</a>をご確認ください。</p>
</div>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>他自治体では認可外保育施設の利用で加点がある場合もありますが、大府市ではこの項目は設定されていません。申込時に市役所で詳しく確認しましょう。</p>
</div>`,
    publishedAt: "2026-04-26",
  },
  {
    slug: "nursery-fees",
    citySlug: "obu",
    title: "大府市の保育料はいくら？　上限額と決まり方",
    description:
      "大府市の認可保育施設の保育料について、0〜2歳児クラスの上限額と決まり方を、市が公表している保育料表をもとに紹介します。",
    category: "お金の話",
    categoryColor: "rose",
    content: `<h2>3歳児クラス以上は保育料が無料</h2>
<p>2019年10月からの幼児教育・保育の無償化により、<span class="highlight">3歳児クラス以上</span>の保育料は無料です。ただし給食費（主食費・副食費）は別に必要です。</p>
<h2>0〜2歳児クラスの保育料の決まり方</h2>
<p>大府市の認可保育施設の保育料は、<span class="highlight">世帯の住民税額</span>と<span class="highlight">保育を利用する時間（保育標準時間・保育短時間）</span>で決まる階層表になっています。所得が高いほど階層が上がり、保育料も上がります。</p>
<h2>大府市でいちばん高い階層はいくら？</h2>
<p>大府市が公表している保育料表では、0〜2歳児クラス・保育標準時間のいちばん高い階層で<span class="highlight">月額58,700円</span>です。ここが上限で、これを超えることはありません。</p>
<div class="point-box">
<p><strong>ポイント</strong></p>
<p>保育料は毎年9月に切り替わります。4月分から8月分は前年度の住民税額、9月分から翌年3月分は当年度の住民税額で決まる自治体が多いため、9月に金額が変わることがあります。</p>
</div>
<div class="info-box">
<p><strong>出典</strong></p>
<p>上記の金額は大府市が公表している保育料表によります。階層ごとの正確な金額は<a href="https://www.city.obu.aichi.jp/_res/projects/default_project/_page_/001/038/342/hoikuryokijungaku.pdf" target="_blank" rel="noopener">大府市の保育料表</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-09-06",
    popularity: 42,
  },
];

registerArticles(articles);
