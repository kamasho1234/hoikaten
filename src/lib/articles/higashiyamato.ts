import type { Article } from "./types";
import { registerArticles } from "./index";

const articles: Article[] = [
  {
    slug: "hokatsu-schedule",
    citySlug: "higashiyamato",
    title: "東大和市の保活スケジュール　申込から内定までの流れ",
    description:
      "東大和市の認可保育園の申込時期・選考の流れをまとめました。令和8年度4月入園の動き方を解説します。",
    image: "https://images.unsplash.com/photo-1484820540004-14229fe36ca4?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>東大和市の4月入園スケジュール</h2>
<p>東大和市の認可保育園は毎年秋に翌年度4月入園の一次申込を受付けます。実施基準指数表を理解して準備を進めましょう。</p>

<h3>保活の全体スケジュール</h3>
<div class="step">
<div class="step-num">1</div>
<div class="step-content">
<strong>4月〜6月：情報収集</strong>
<p>東大和市のホームページで保育園の一覧や前年度のボーダー（最低指数一覧）を確認します。</p>
</div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content">
<strong>7月〜9月：保育園見学</strong>
<p>東大和市内の保育園を見学して、通勤経路との相性を確認しましょう。</p>
</div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content">
<strong>9月〜10月：書類準備</strong>
<p>就労証明書の月あたり就労時間は正確に記載してもらいましょう。指数に直結します。</p>
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
<p>東大和市の基準指数は父母各最大20点（合計40点満点）です。月の就労時間で判定される制度です。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳しくは<a href="https://www.city.higashiyamato.lg.jp/kosodatekyoiku/hoiku/" target="_blank" rel="noopener">東大和市公式サイト 保育施設の入園手続き</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-04-26",
    popularity: 50,
  },
  {
    slug: "scoring-system-guide",
    citySlug: "higashiyamato",
    title: "東大和市の入園点数のしくみ　基準指数と調整指数を解説",
    description:
      "東大和市の保育園入園選考で使われる基準指数と調整指数のしくみをわかりやすく解説します。",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>東大和市の選考指数とは</h2>
<p>東大和市の認可保育園は「基準指数（父＋母）＋ 調整指数」の合計で選考されます。参考値ですので、詳細は市の公式資料をご確認ください。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>利用調整指数 ＝ 基準指数（父＋母）＋ 調整指数</p>
</div>

<h2>基準指数（父母各最大20点、合計40点）</h2>
<p>就労の場合、月160時間以上の就労で満点の<span class="highlight">20点</span>です。</p>

<table>
<tr><th>月の就労時間</th><th>指数</th></tr>
<tr><td>月160時間以上</td><td>20</td></tr>
<tr><td>月140時間以上160時間未満</td><td>18</td></tr>
<tr><td>月120時間以上140時間未満</td><td>16</td></tr>
<tr><td>月100時間以上120時間未満</td><td>14</td></tr>
<tr><td>月80時間以上100時間未満</td><td>12</td></tr>
<tr><td>月64時間以上80時間未満</td><td>10</td></tr>
<tr><td>月48時間以上64時間未満</td><td>8</td></tr>
</table>

<h2>調整指数の代表例</h2>
<ul>
<li>地域型保育施設卒園に伴う転所：<span class="highlight">+3点</span></li>
<li>ひとり親世帯：<span class="highlight">+2点</span></li>
<li>認証保育所等に月ぎめ利用中：<span class="highlight">+2点</span></li>
<li>生活保護世帯：<span class="highlight">+2点</span></li>
<li>きょうだいが在園中：<span class="highlight">+1点</span></li>
<li>育休復帰予定：<span class="highlight">+1点</span></li>
<li>多子世帯（3人以上）：<span class="highlight">+1点</span></li>
</ul>

<div class="info-box">
<p><strong>注記</strong></p>
<p>このページの数値は参考値です。正確な点数配分は市発行の「保育園等入園・在園のしおり」をご確認ください。</p>
</div>`,
    publishedAt: "2026-04-26",
    popularity: 60,
  },
  {
    slug: "score-up-tips",
    citySlug: "higashiyamato",
    title: "東大和市で入園点数を上げるコツ　調整指数の活用法",
    description:
      "東大和市の認可保育園入園で有利になる調整指数の加点方法をまとめました。",
    image: "https://images.unsplash.com/photo-1516627285519-91faf0ee0000?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "amber",
    content: `<h2>調整指数で加点を受けるには</h2>
<p>基準指数だけでなく、調整指数を活用することで入園可能性が大きく変わります。</p>

<h3>確実に加点される項目</h3>

<div class="point-box">
<p><strong>ひとり親世帯</strong></p>
<p>ひとり親は＋2点の加点対象です。母子家庭・父子家庭であることが確認されれば自動的に加点されます。</p>
</div>

<div class="point-box">
<p><strong>地域型保育施設からの転所</strong></p>
<p>小規模保育やおうち保育園等の卒園に伴う転所は＋3点の加点対象です。最も高い調整指数です。</p>
</div>

<div class="point-box">
<p><strong>認証保育所等に月ぎめ利用中</strong></p>
<p>認証保育所に月ぎめで利用中の場合は＋2点です。現在の保育利用状況を書類に記載しましょう。</p>
</div>

<h3>申請で加点される項目</h3>

<div class="point-box">
<p><strong>育児休業からの復帰</strong></p>
<p>育児休業を取得して入園月に復帰する場合は＋1点です。人事部門に確認して申請しましょう。</p>
</div>

<div class="point-box">
<p><strong>きょうだいが在園・同時申込</strong></p>
<p>きょうだいが認可保育園に在園中または同時に申し込む場合は＋1点です。</p>
</div>

<h3>加点チェックリスト</h3>
<ul>
<li>ひとり親であること：確認書類を用意しましたか？</li>
<li>地域型保育施設から転所：卒園証明書を取得しましたか？</li>
<li>認証保育所利用中：利用契約書を持っていますか？</li>
<li>育休復帰予定：人事から復帰見込み月の確認をもらいましたか？</li>
<li>きょうだい情報：すべて申告書に記載しましたか？</li>
</ul>`,
    publishedAt: "2026-04-26",
    popularity: 45,
  },
  {
    slug: "tiebreaker-rules",
    citySlug: "higashiyamato",
    title: "東大和市の保活　同点の場合の順位決定ルール",
    description:
      "東大和市で複数の家庭が同じ点数だった場合の順位決定方法と対策を解説します。",
    image: "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>同点の場合どうなるの？</h2>
<p>東大和市で複数の家庭が同じ指数だった場合、市の規定に従って順位が決定されます。</p>

<h3>同点時の順位決定基準</h3>

<div class="point-box">
<p><strong>基準指数が同じ場合</strong></p>
<p>調整指数の高い順で優先されます。基準指数40点同士の場合、調整指数でどれだけ加点されているかが勝負になります。</p>
</div>

<div class="point-box">
<p><strong>調整指数まで同じ場合</strong></p>
<p>この場合、申込みの順序（先着順）で判定される可能性が高いです。早めの申込みが有利になります。</p>
</div>

<h3>同点を回避する工夫</h3>

<ul>
<li>調整指数を1点でも増やす（育休復帰確認、きょうだい加算など）</li>
<li>就労証明書の時間数を正確に記載してもらう（月160時間ちょうどより多いように）</li>
<li>複数園申請で選択肢を増やす</li>
<li>希望順位を工夫する（ボーダーが異なる園を組み合わせる）</li>
</ul>

<div class="info-box">
<p><strong>早めの準備が鍵</strong></p>
<p>同点回避には調整指数の加点がカギになります。確実に加点される要件がないか、今からチェックしましょう。</p>
</div>`,
    publishedAt: "2026-04-26",
    popularity: 40,
  },
  {
    slug: "part-time-work-score",
    citySlug: "higashiyamato",
    title: "東大和市の保活　パート・時短勤務での点数の取り方",
    description:
      "パートタイムや時短勤務の場合、東大和市でどれくらいの点数がつくのか解説します。",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=400&fit=crop",
    category: "点数を稼ぐコツ",
    categoryColor: "purple",
    content: `<h2>パート・時短での入園点数</h2>
<p>フルタイムでなくても保育園に入園できます。ただし点数が下がるため、調整指数で補う工夫が大事です。</p>

<h3>就労時間別の点数一覧</h3>

<table>
<tr><th>月の就労時間</th><th>基準指数（1人分）</th></tr>
<tr><td>月160時間以上</td><td>20点</td></tr>
<tr><td>月140〜159時間</td><td>18点</td></tr>
<tr><td>月120〜139時間</td><td>16点</td></tr>
<tr><td>月100〜119時間</td><td>14点</td></tr>
<tr><td>月80〜99時間</td><td>12点</td></tr>
<tr><td>月64〜79時間</td><td>10点</td></tr>
<tr><td>月48〜63時間</td><td>8点</td></tr>
</table>

<h3>時間数の計算方法</h3>

<div class="point-box">
<p><strong>月の総就労時間を正確に計算</strong></p>
<p>週20時間 × 4週 = 月80時間というイメージで計算します。給与計算の基礎となる時間数で判定されます。</p>
</div>

<p>例）週15時間勤務：15時間 × 4週 = 月60時間 → 8点<br>
例）週25時間勤務：25時間 × 4週 = 月100時間 → 14点</p>

<h3>パート採用時の注意点</h3>

<ul>
<li>就労証明書は会社の人事に依頼し、月の総就労時間を正確に記載してもらう</li>
<li>試用期間中の場合、終了後の勤務時間を見込みで申告できるか確認</li>
<li>変動がある場合は平均値を計算する</li>
<li>フルタイム勤務への昇格予定がある場合は、事前に人事に相談</li>
</ul>

<h3>パートでも入園しやすいコツ</h3>

<div class="point-box">
<p><strong>調整指数で稼ぐ</strong></p>
<p>基準指数が下がる分、ひとり親加算や地域型保育施設からの転所などで調整指数を増やす必要があります。</p>
</div>`,
    publishedAt: "2026-04-26",
    popularity: 55,
  },
  {
    slug: "single-parent-score",
    citySlug: "higashiyamato",
    title: "東大和市の保活　ひとり親世帯の加点と有利な制度",
    description:
      "東大和市でひとり親世帯が受けられる加点や優遇制度をまとめました。",
    image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&h=400&fit=crop",
    category: "点数を稼ぐコツ",
    categoryColor: "rose",
    content: `<h2>ひとり親世帯の加点制度</h2>
<p>ひとり親世帯は東大和市の保育園入園選考で加点対象です。申告忘れがないように注意しましょう。</p>

<h3>ひとり親加点の詳細</h3>

<div class="point-box">
<p><strong>調整指数：+2点</strong></p>
<p>ひとり親（母子家庭または父子家庭）であることが確認されれば自動的に+2点の加点対象となります。</p>
</div>

<h3>ひとり親と認定される要件</h3>

<ul>
<li>母親が養育者の場合：父親が死亡、遺棄、離婚、未婚の出産など</li>
<li>父親が養育者の場合：母親が死亡、遺棄、離婚、未婚の出産など</li>
<li>親権は養育者にあることが前提です</li>
</ul>

<h3>必要な確認書類</h3>

<ul>
<li>離婚の場合：離婚届受理証明書または戸籍謄本</li>
<li>死別の場合：死亡診断書または戸籍謄本</li>
<li>未婚の場合：出生証明書または戸籍謄本</li>
<li>遺棄の場合：市町村長の判定を別途取得</li>
</ul>

<h3>ひとり親の入園戦略</h3>

<div class="point-box">
<p><strong>基本指数+調整指数で勝負</strong></p>
<p>ひとり親加算で+2点が得られるため、基準指数が下がっても十分競争力があります。</p>
</div>

<p>例）基準指数30点（フルタイム勤務で一人親） → 30 + 2 = 32点<br>
これは共働きで基準指数35点と同等の競争力があります。</p>

<h3>複数加点の組み合わせ</h3>

<div class="point-box">
<p><strong>ひとり親 + その他加点</strong></p>
<p>ひとり親加算だけでなく、以下の条件を組み合わせることで更に有利になります。</p>
</div>

<ul>
<li>ひとり親 + 認証保育所利用中：+2 + 2 = +4点</li>
<li>ひとり親 + きょうだいが在園：+2 + 1 = +3点</li>
<li>ひとり親 + 地域型保育からの転所：+2 + 3 = +5点</li>
</ul>`,
    publishedAt: "2026-04-26",
    popularity: 50,
  },
  {
    slug: "parental-leave-timing",
    citySlug: "higashiyamato",
    title: "東大和市の保活　育児休業からの復帰タイミング戦略",
    description:
      "東大和市で育児休業から復帰して保育園に入園する場合のタイミングと加点を解説します。",
    image: "https://images.unsplash.com/photo-1567427190347-fd0d310e7edf?w=800&h=400&fit=crop",
    category: "保活戦略",
    categoryColor: "teal",
    content: `<h2>育児休業からの復帰と入園</h2>
<p>育児休業を取得している場合、復帰予定月に合わせて保育園の入園申し込みを進めることが大切です。</p>

<h3>育児休業からの復帰加点</h3>

<div class="point-box">
<p><strong>調整指数：+1点</strong></p>
<p>育児休業を取得して入園月に復帰する場合、+1点の加点対象です。</p>
</div>

<h3>育児休業と保育園申込みのタイミング</h3>

<table>
<tr><th>入園月</th><th>申込時期（目安）</th><th>復帰時期</th></tr>
<tr><td>4月</td><td>前年11月</td><td>4月から復帰</td></tr>
<tr><td>10月</td><td>7月〜8月</td><td>10月から復帰</td></tr>
</table>

<h3>育児休業復帰時の注意点</h3>

<ul>
<li>人事部に「入園月に復帰予定」であることを伝える</li>
<li>就労証明書に「育児休業中」と記載されていないか確認</li>
<li>復帰見込み月を書類に明記する</li>
<li>人事から復帰見込み月を確認する書類をもらう</li>
</ul>

<h3>復帰後の勤務形態</h3>

<div class="point-box">
<p><strong>短時間勤務制度の活用</strong></p>
<p>法律で認められた育児休業からの復帰短時間勤務制度（3年以内）を利用できます。</p>
</div>

<p>例）育休から復帰後、6時間勤務で対応<br>
→ 月160時間未満になる可能性があるため、申込み時に確認</p>

<h3>基準指数への影響</h3>

<div class="point-box">
<p><strong>復帰予定月の就労時間で判定</strong></p>
<p>育児休業中の今の基準指数ではなく、復帰月以降の実際の就労時間で指数が決まります。</p>
</div>

<p>例）現在育休中（基準指数0点） → 復帰後フルタイム（基準指数20点）<br>
→ 申込みでは復帰後の20点で判定</p>`,
    publishedAt: "2026-04-26",
    popularity: 42,
  },
  {
    slug: "nursery-wait-time",
    citySlug: "higashiyamato",
    title: "東大和市の保育園　待機児童と入園難易度の動き",
    description:
      "東大和市の待機児童数や保育園の競争状況、年度による変動を解説します。",
    image: "https://images.unsplash.com/photo-1503454537688-e47a5c0997c1?w=800&h=400&fit=crop",
    category: "保活情報",
    categoryColor: "green",
    content: `<h2>東大和市の保活状況</h2>
<p>東大和市の待機児童数や入園難易度の推移を把握することで、現実的な計画が立てられます。</p>

<h3>東大和市の保育需要</h3>

<div class="point-box">
<p><strong>人口約8.5万の東京都多摩地区</strong></p>
<p>東大和市は都心へのアクセスが良好な立地のため、保育需要が安定しています。</p>
</div>

<h3>待機児童のトレンド</h3>

<ul>
<li>認可保育園の定員は年々増加傾向</li>
<li>人口動態により待機児童数は変動</li>
<li>4月入園は10月入園より競争が激しい傾向</li>
<li>0歳児の待機が多く、1歳児以上は相対的に入園しやすい</li>
</ul>

<h3>年度による入園難易度の違い</h3>

<table>
<tr><th>年度</th><th>難易度</th><th>傾向</th></tr>
<tr><td>令和7年度</td><td>中程度</td><td>新園開設により定員増</td></tr>
<tr><td>令和8年度</td><td>中程度</td><td>継続して確認中</td></tr>
</table>

<h3>ボーダーの予測</h3>

<div class="point-box">
<p><strong>共働きフルタイムの場合（基準指数40点）</strong></p>
<p>調整指数なしの場合、40点で0点加点の家庭と同じ競争になります。やや不利側に位置する可能性があります。</p>
</div>

<h3>入園戦略</h3>

<ul>
<li>複数園申請が必須（5園以上が目安）</li>
<li>希望順位を工夫して、ボーダーが異なる園を組み合わせる</li>
<li>秋の説明会で前年度ボーダーを確認する</li>
<li>調整指数の加点要件がないか事前チェック</li>
</ul>`,
    publishedAt: "2026-04-26",
    popularity: 35,
  },
  {
    slug: "application-checklist",
    citySlug: "higashiyamato",
    title: "東大和市の保活　申込み書類チェックリスト",
    description:
      "東大和市の保育園申し込みに必要な書類と準備のチェックリストです。",
    image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "amber",
    content: `<h2>申込み書類の準備</h2>
<p>東大和市の保育園申し込みに必要な書類を早めに確認して、提出期限に間に合わせましょう。</p>

<h3>基本的な申込み書類</h3>

<ul>
<li>保育園申込書（市発行）</li>
<li>保育が必要な理由を示す書類（就労証明書など）</li>
<li>世帯状況を証明する書類（戸籍謄本、住民票など）</li>
<li>所得を証明する書類（前年度の税務申告書など）</li>
</ul>

<h3>就労証明書の準備チェック</h3>

<div class="point-box">
<p><strong>月の総就労時間を正確に記載</strong></p>
<p>就労証明書が基準指数を左右する最重要書類です。以下を確認してから提出してください。</p>
</div>

<ul>
<li>会社名と勤務地が正確に記載されているか</li>
<li>月の総就労時間が（給与計算の基礎となる）正確な時間か</li>
<li>勤務開始日から現在までの継続就労が明記されているか</li>
<li>就労予定期間は入園後6ヶ月以上が見込まれているか</li>
<li>会社の認印押印があるか</li>
</ul>

<h3>その他の加点申告書類</h3>

<ul>
<li>ひとり親世帯：離婚届受理証明書・戸籍謄本など</li>
<li>認証保育所利用中：利用契約書</li>
<li>地域型保育施設からの転所：卒園証明書</li>
<li>育児休業からの復帰：人事部からの復帰見込み月確認書</li>
<li>きょうだい情報：出生証明書・保育園在園証など</li>
</ul>

<h3>提出前の最終チェック</h3>

<ul>
<li>全ページに保護者の署名・捺印がされているか</li>
<li>第一希望から優先順位順に園を記載しているか</li>
<li>住所・電話番号・生年月日などに誤記がないか</li>
<li>必要な添付書類がすべてそろっているか</li>
<li>コピーはとったか（手元に控えを置く）</li>
</ul>

<h3>郵送または直接持参</h3>

<div class="point-box">
<p><strong>提出方法を確認</strong></p>
<p>東大和市の場合、郵送受付または直接持参の両方が可能な場合が多いです。期限内に確実に提出しましょう。</p>
</div>`,
    publishedAt: "2026-04-26",
    popularity: 48,
  },
  {
    slug: "unlicensed-nursery",
    citySlug: "higashiyamato",
    title: "東大和市の保活　認証保育所・認可外施設の活用法",
    description:
      "認証保育所や認可外保育施設を保活戦略に組み込む方法を解説します。",
    image: "https://images.unsplash.com/photo-1488387155694-d56b29e3c59f?w=800&h=400&fit=crop",
    category: "保活戦略",
    categoryColor: "purple",
    content: `<h2>認証保育所・認可外施設との併用</h2>
<p>認可保育園の入園待ちの間、認証保育所や認可外施設を活用する方法をご紹介します。</p>

<h3>認証保育所等での加点メリット</h3>

<div class="point-box">
<p><strong>調整指数：+2点</strong></p>
<p>認証保育所、認可外保育施設に月ぎめで利用している場合、+2点の加点対象です。</p>
</div>

<h3>対象となる施設</h3>

<ul>
<li>認証保育所（東京都認証）</li>
<li>認可外保育施設（都知事通知施設）</li>
<li>ベビーシッター等の月ぎめ契約</li>
<li>幼稚園の預かり保育 ※施設による</li>
</ul>

<h3>加点に必要な条件</h3>

<ul>
<li>月ぎめ契約であること（スポット利用は対象外）</li>
<li>保育園申込月に現在利用中であること</li>
<li>利用契約書が確認できる書類があること</li>
<li>月の保育時間が一定以上であること（目安：月48時間以上）</li>
</ul>

<h3>認証保育所の特徴</h3>

<table>
<tr><th>項目</th><th>特徴</th></tr>
<tr><td>保育時間</td><td>認可より長い（延長料金）</td></tr>
<tr><td>定員</td><td>小さめ（6〜29人）</td></tr>
<tr><td>利用料</td><td>認可より高め</td></tr>
<tr><td>柔軟性</td><td>月単位で退園可能</td></tr>
</table>

<h3>保活との組み合わせ戦略</h3>

<div class="point-box">
<p><strong>ステップ1：認証保育所に入園</strong></p>
<p>認可園の入園待ちの間、認証保育所に預けて+2点の加点を確保します。</p>
</div>

<div class="point-box">
<p><strong>ステップ2：認可園に申し込み</strong></p>
<p>認証保育所+2点の加点を活用して、認可園の競争に参加します。</p>
</div>

<div class="point-box">
<p><strong>ステップ3：認可園への転園</strong></p>
<p>認可園に内定したら、認証保育所から転園します。</p>
</div>

<h3>費用負担の注意</h3>

<ul>
<li>認証保育所の利用料は全額自己負担</li>
<li>認可園との並行利用は経済的負担大</li>
<li>都や市の補助制度がないか事前確認</li>
<li>認可園内定後の返金規定を確認</li>
</ul>`,
    publishedAt: "2026-04-26",
    popularity: 38,
  },
];

registerArticles(articles);
