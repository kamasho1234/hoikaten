import type { Article } from "./types";
import { registerArticles } from "./index";

const articles: Article[] = [
  {
    slug: "hokatsu-schedule",
    citySlug: "ikoma",
    title: "生駒市の保活スケジュール　申込から内定までの流れ",
    description:
      "生駒市の認可保育園の申込時期・選考の流れをまとめました。令和8年度4月入園の動き方を解説します。",
    image: "https://images.unsplash.com/photo-1484820540004-14229fe36ca4?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>生駒市の4月入園スケジュール</h2>
<p>生駒市の認可保育園は毎年秋に翌年度4月入園の一次申込を受付けます。基準指数・調整指数を理解して準備を進めましょう。</p>

<h3>保活の全体スケジュール</h3>
<div class="step">
<div class="step-num">1</div>
<div class="step-content">
<strong>4月〜6月：情報収集</strong>
<p>生駒市のホームページで保育園の一覧や前年度のボーダー（最低点数一覧）を確認します。</p>
</div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content">
<strong>7月〜9月：保育園見学</strong>
<p>生駒市内の保育園を見学して、通勤経路との相性を確認しましょう。</p>
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
<p>生駒市の基準指数は父母各最大100点（合計200点満点）です。月の就労時間で判定される制度です。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳しくは<a href="https://www.city.ikoma.lg.jp/0000037043.html" target="_blank" rel="noopener">生駒市公式サイト 保育所等入所申込みについて</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-04-26",
    popularity: 55,
  },
  {
    slug: "scoring-system-guide",
    citySlug: "ikoma",
    title: "生駒市の入園点数のしくみ　基準指数と調整指数を解説",
    description:
      "生駒市の保育園入園選考で使われる基準指数と調整指数のしくみをわかりやすく解説します。",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>生駒市の選考点数とは</h2>
<p>生駒市の認可保育園は「基準指数（父＋母）＋ 調整指数」の合計で選考されます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>総合点数 ＝ 基準指数（父＋母）＋ 調整指数</p>
</div>

<h2>基準指数（父母各最大100点、合計200点）</h2>
<p>就労の場合、月160時間以上の就労で満点の<span class="highlight">100点</span>です。</p>

<table>
<tr><th>月の就労時間</th><th>基準指数</th></tr>
<tr><td>月160時間以上</td><td>100</td></tr>
<tr><td>月150〜159時間</td><td>95</td></tr>
<tr><td>月130〜149時間</td><td>90</td></tr>
<tr><td>月120〜129時間</td><td>85</td></tr>
<tr><td>月110〜119時間</td><td>80</td></tr>
<tr><td>月100〜109時間</td><td>75</td></tr>
<tr><td>月80〜99時間</td><td>70</td></tr>
<tr><td>月70〜79時間</td><td>65</td></tr>
<tr><td>月64〜69時間</td><td>63</td></tr>
</table>

<h2>調整指数の代表例</h2>
<ul>
<li>保育士・看護師として勤務：<span class="highlight">+40点</span></li>
<li>ひとり親世帯：<span class="highlight">+30点</span></li>
<li>きょうだいが同じ園に在園中：<span class="highlight">+25点</span></li>
<li>育休復帰予定：<span class="highlight">+14点</span></li>
<li>きょうだいと同時申込：<span class="highlight">+11点</span></li>
<li>認可外保育施設利用中：<span class="highlight">+3点</span></li>
</ul>

<div class="info-box">
<p><strong>同点の場合の判定</strong></p>
<p>総合点数が同じ場合は世帯の合計所得金額が低い者が優先されます。</p>
</div>`,
    publishedAt: "2026-04-26",
    popularity: 60,
  },
  {
    slug: "score-up-tips",
    citySlug: "ikoma",
    title: "生駒市で入園点数を上げるコツ　調整指数チェックリスト",
    description:
      "生駒市の保育園入園選考で調整指数の加点を最大限に活用する方法を解説します。",
    image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>基準指数200点は出発点</h2>
<p>生駒市ではフルタイム共働き世帯は基準指数<span class="highlight">200点</span>で横並びです。差がつくのは調整指数の加点です。</p>

<h2>加点チェックリスト</h2>
<table>
<tr><th>項目</th><th>点数</th><th>条件</th></tr>
<tr><td>保育士・看護師</td><td>+40点</td><td>市内の認可保育施設で勤務予定</td></tr>
<tr><td>ひとり親世帯</td><td>+30点</td><td>母子・父子家庭の場合</td></tr>
<tr><td>きょうだい在園</td><td>+25点</td><td>認可保育園にきょうだいが在園中</td></tr>
<tr><td>育休復帰予定</td><td>+14点</td><td>入園月に職場復帰する場合</td></tr>
<tr><td>きょうだい同時申込</td><td>+11点</td><td>きょうだいと同時に申し込む場合</td></tr>
<tr><td>認可外保育施設利用</td><td>+3点</td><td>月64時間以上継続利用</td></tr>
<tr><td>単身赴任</td><td>+1点</td><td>保護者が単身赴任している場合</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>生駒市は入所決定者の最低点数一覧を公開しています。園ごとのボーダーを確認して、自分の点数で入園できそうな園を探しましょう。</p>
</div>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>就労証明書の月あたり就労時間は正確に記載してください。実態と異なる記載は入園取消しの対象です。</p>
</div>`,
    publishedAt: "2026-04-26",
    popularity: 55,
  },
  {
    slug: "tiebreaker-rules",
    citySlug: "ikoma",
    title: "生駒市で同点になったらどうなる？優先順位を解説",
    description:
      "生駒市の保育園入園選考で同点だった場合の優先順位の判定方法を解説します。",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>同点時の判定方法</h2>
<p>生駒市の入園選考で総合点数が同点になった場合、さらに優先順位で判定されます。</p>

<h2>同点時に優先される順序</h2>
<ol>
<li>世帯の合計所得金額が低い方</li>
<li>その他、児童福祉の観点から配慮が必要な世帯</li>
</ol>

<h3>児童福祉の観点から配慮される世帯</h3>
<ul>
<li>ひとり親世帯</li>
<li>きょうだいが同じ園に在園中</li>
<li>生活保護受給世帯</li>
<li>身体障害者・療育手帳所持者</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>生駒市の基準指数は両親の合計で200点が満点です。同点での所得判定が重要になります。</p>
</div>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>優先順位は年度によって変更される場合があります。最新の「保育所等入所案内」で必ず確認しましょう。</p>
</div>`,
    publishedAt: "2026-04-26",
    popularity: 45,
  },
  {
    slug: "part-time-work-score",
    citySlug: "ikoma",
    title: "生駒市で時短勤務だと点数はどう変わる？",
    description:
      "生駒市の保育園入園選考で時短勤務の場合の基準指数への影響を解説します。",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>生駒市は月の就労時間で判定</h2>
<p>生駒市の基準指数は月の就労時間で決まります。時短勤務の影響を確認しましょう。</p>

<table>
<tr><th>月の就労時間</th><th>基準指数</th></tr>
<tr><td>月160時間以上</td><td>100点</td></tr>
<tr><td>月150〜159時間</td><td>95点</td></tr>
<tr><td>月130〜149時間</td><td>90点</td></tr>
<tr><td>月120〜129時間</td><td>85点</td></tr>
<tr><td>月110〜119時間</td><td>80点</td></tr>
<tr><td>月100〜109時間</td><td>75点</td></tr>
<tr><td>月80〜99時間</td><td>70点</td></tr>
<tr><td>月70〜79時間</td><td>65点</td></tr>
<tr><td>月64〜69時間</td><td>63点</td></tr>
</table>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>1日6時間×週5日＝月約120時間の時短勤務の場合、基準指数は<span class="highlight">85点</span>です。フルタイムの100点と比べて15点下がります。</p>
</div>

<h2>月160時間の壁</h2>
<p>満点の100点を得るには月160時間以上が必要です。1日8時間×月20日＝160時間がちょうど満点ラインです。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>復職後のフルタイム勤務条件を就労証明書に記載してもらえるか、勤務先に確認しましょう。育休中でも復職後の勤務条件で点数が判定されます。</p>
</div>`,
    publishedAt: "2026-04-26",
    popularity: 50,
  },
  {
    slug: "single-parent-score",
    citySlug: "ikoma",
    title: "生駒市でひとり親の場合　加点と支援制度を解説",
    description:
      "生駒市の保育園入園選考でひとり親世帯が受ける加点と、利用できる支援制度をまとめました。",
    image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>ひとり親世帯の加点</h2>
<p>生駒市の入園選考で、ひとり親世帯は調整指数で<span class="highlight">+30点</span>の加点が得られます。</p>

<h3>加点の対象</h3>
<ul>
<li>母子家庭（父親が不在）</li>
<li>父子家庭（母親が不在）</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>ひとり親は調整指数で大きな加点が得られます。必ず申込書類でひとり親であることを記載しましょう。</p>
</div>

<h2>ひとり親が利用できる支援制度</h2>
<p>生駒市ではひとり親世帯向けの様々な支援制度があります。保育園入園時の相談窓口で詳しく説明を受けられます。</p>

<h3>保育料の軽減</h3>
<p>市町村民税非課税世帯のひとり親は、保育料が軽減される場合があります。</p>

<h3>児童扶養手当</h3>
<p>18歳未満の子どもを育てるひとり親に対して、児童扶養手当が支給されます。</p>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>加点を受けるには、戸籍謄本や児童扶養手当受給証などの書類提出が必要な場合があります。事前に生駒市に確認しましょう。</p>
</div>`,
    publishedAt: "2026-04-26",
    popularity: 48,
  },
  {
    slug: "parental-leave-timing",
    citySlug: "ikoma",
    title: "生駒市の育休明けのタイミング　入園点数への影響",
    description:
      "生駒市の保育園入園選考で育休明けの復帰タイミングが点数に与える影響を解説します。",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>育休復帰予定で加点</h2>
<p>生駒市の入園選考では、育児休業を取得して入園月に復帰する場合、調整指数で<span class="highlight">+14点</span>の加点が得られます。</p>

<h3>加点の条件</h3>
<ul>
<li>育児休業中である</li>
<li>入園月に職場復帰予定である</li>
<li>就労証明書などで証明できる</li>
</ul>

<h2>育休中の点数判定</h2>
<p>育児休業中の保護者の基準指数は、復職後の勤務条件で判定されます。フルタイム復帰予定であれば、育休中でも100点が認定されます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>就労証明書には「復帰予定日」と「復帰後の勤務時間」を正確に記載してもらいましょう。これが点数認定に直結します。</p>
</div>

<h2>入園月の選択の重要性</h2>
<p>育休明けに合わせて入園月を選ぶことで、確実に加点が得られます。</p>

<table>
<tr><th>パターン</th><th>基準指数</th><th>調整指数</th><th>加点</th></tr>
<tr><td>育休中・復帰予定</td><td>100点（復帰後）</td><td>+14点</td><td>あり</td></tr>
<tr><td>育休中・復帰予定なし</td><td>0点</td><td>0点</td><td>なし</td></tr>
<tr><td>既に復帰</td><td>100点</td><td>0点</td><td>なし</td></tr>
</table>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>入園月の前月までに復帰してしまうと、加点の対象にならない場合があります。申込時に必ず確認しましょう。</p>
</div>`,
    publishedAt: "2026-04-26",
    popularity: 52,
  },
  {
    slug: "nursery-wait-time",
    citySlug: "ikoma",
    title: "生駒市の待機児童の現状　入園の難易度を解説",
    description:
      "生駒市の認可保育園の待機児童数や競争率から、入園の難易度を分析します。",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>生駒市の待機児童状況</h2>
<p>生駒市の認可保育園の需要と供給のバランスを把握することが、保活戦略の第一歩です。</p>

<h3>保育園の競争率</h3>
<p>生駒市内の保育園は地域によって競争率が異なります。駅前や商業施設近くの人気園は倍率が高い傾向にあります。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>前年度の「入所決定者の最低点数一覧」を確認することで、自分の点数で合格できそうな園を見つけることができます。</p>
</div>

<h2>生駒市内の園の特徴</h2>
<ul>
<li>駅前の認可保育園：競争率高、倍率2倍以上</li>
<li>駅から少し離れた園：競争率中程度、倍率1.5倍</li>
<li>郊外の園：比較的入りやすい傾向</li>
</ul>

<h3>0歳児クラスと1歳児クラスの難易度</h3>
<p>0歳児は定員が少ないため、最もボーダーが高くなる傾向があります。1歳児は0歳児よりは入りやすいですが、2歳児以上と比べるとやや難しい傾向があります。</p>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>待機児童数は毎年変動します。必ず最新の生駒市公式情報で確認しましょう。</p>
</div>`,
    publishedAt: "2026-04-26",
    popularity: 42,
  },
  {
    slug: "application-checklist",
    citySlug: "ikoma",
    title: "生駒市の申込書類チェックリスト　書き漏れを防ぐ",
    description:
      "生駒市の保育園申込に必要な書類と、記入時の注意点をまとめたチェックリストです。",
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
<p>書類に記載漏れがあると点数が認定されない場合があります。申込む前に生駒市役所に確認することをお勧めします。</p>
</div>`,
    publishedAt: "2026-04-26",
    popularity: 50,
  },
  {
    slug: "unlicensed-nursery",
    citySlug: "ikoma",
    title: "生駒市で認可外保育施設を利用する場合の加点",
    description:
      "生駒市の保育園入園選考で認可外保育施設の利用が与える影響と加点制度を解説します。",
    image: "https://images.unsplash.com/photo-1503454537688-e47a8b0b5a20?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>認可外保育施設の利用で加点</h2>
<p>生駒市の入園選考では、認可外保育施設に月64時間以上継続利用している場合、調整指数で<span class="highlight">+3点</span>の加点が得られます。</p>

<h3>加点の対象となる施設</h3>
<ul>
<li>認可外保育施設</li>
<li>企業主導型保育施設</li>
<li>一時預かり保育</li>
<li>ベビーシッター（継続利用）</li>
</ul>

<h3>加点の条件</h3>
<ul>
<li>月64時間以上継続利用している</li>
<li>実績が確認できる書類がある</li>
<li>継続的に利用している</li>
</ul>

<h2>認可外と認可保育園の組み合わせ戦略</h2>
<p>不承諾となった場合のリスク対策として、認可外保育施設を先に利用することで、翌年度申込時に加点が得られます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>認可外に1年利用した場合、翌年度申込時の調整指数で+3点の加点が得られるため、入園実現の確度が上がります。</p>
</div>

<h3>必要な証明書</h3>
<p>加点を受けるには、施設からの「利用証明書」や「在園証明書」が必要です。申込時に施設に発行を依頼しておきましょう。</p>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>認可外施設の利用実績がないと加点が認定されません。領収書などの証拠書類を保管しておきましょう。</p>
</div>`,
    publishedAt: "2026-04-26",
    popularity: 45,
  },
];

registerArticles(articles);
