import type { Article } from "./types";
import { registerArticles } from "./index";

const articles: Article[] = [
  // ===== 保活の基本 (1) =====
  {
    slug: "hokatsu-schedule",
    citySlug: "gyoda",
    title: "行田市の保活スケジュール　令和8年度4月入園の流れ",
    description:
      "行田市の認可保育園の申込時期・選考の流れ・結果通知の時期をわかりやすく解説。令和8年度4月入園のスケジュールを中心にまとめました。",
    image:
      "https://images.unsplash.com/photo-1484820540004-14229fe36ca4?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>令和8年度（2026年度）4月入園のスケジュール</h2>
<p>行田市の4月入園は<strong>一次利用調整</strong>と<strong>二次利用調整</strong>の2回に分かれています。申込先は行田市子ども未来課です。</p>

<h3>一次利用調整</h3>
<table>
<tr><th>項目</th><th>日程</th></tr>
<tr><td>申込受付期間</td><td>令和7年11月上旬〜12月上旬</td></tr>
<tr><td>結果通知</td><td>令和8年1月下旬</td></tr>
</table>

<h3>二次利用調整</h3>
<table>
<tr><th>項目</th><th>日程</th></tr>
<tr><td>申込受付期間</td><td>令和8年2月上旬〜2月中旬</td></tr>
<tr><td>結果通知</td><td>令和8年3月上旬</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>一次で不承諾だった方は自動的に二次の対象になります。希望園の変更も可能です。</p>
</div>

<h2>いつから動き始めるべき？</h2>

<div class="step">
<div class="step-num">1</div>
<div class="step-content">
<strong>4月〜5月：情報収集スタート</strong>
<p>行田市の認可保育園は約20か所。エリアや園の特徴を調べましょう。</p>
</div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content">
<strong>6月〜9月：保育園見学</strong>
<p>気になる園に電話して見学予約。見学のベストシーズンです。</p>
</div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content">
<strong>10月：申込案内の入手</strong>
<p>行田市が発行する「保育施設利用のご案内」を入手しましょう。</p>
</div>
</div>
<div class="step">
<div class="step-num">4</div>
<div class="step-content">
<strong>11月〜12月：申込書類の準備・提出</strong>
<p>就労証明書などの書類を揃えて保育課へ提出します。</p>
</div>
</div>

<h2>途中入園（5月〜3月）の申込</h2>
<p>各月の申込締切日は、入園希望月の<span class="highlight">前月10日頃</span>です。詳しくは行田市の公式サイトをご確認ください。</p>`,
    publishedAt: "2026-04-26",
    popularity: 55,
  },
  // ===== 基本指数 =====
  {
    slug: "scoring-system-guide",
    citySlug: "gyoda",
    title: "行田市の保育園入園　基本指数と調整指数の計算方法",
    description:
      "行田市の保育園入園選考に使われる点数システムを徹底解説。自分の点数を計算してみましょう。",
    image:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>行田市の点数システムについて</h2>
<p>行田市では「基本指数」と「調整指数」の合計で入園者を決定します。参考値として、フルタイム共働き世帯の基本指数は約40点です。</p>

<h2>基本指数とは</h2>
<p>基本指数は、保護者が保育を必要とする理由と、その程度を点数化したものです。父と母それぞれの点数を合算します。</p>

<h3>就労時の基本指数（参考値）</h3>
<ul>
<li>月160時間以上：20点</li>
<li>月120時間以上160時間未満：18点</li>
<li>月100時間以上120時間未満：16点</li>
<li>月80時間以上100時間未満：14点</li>
<li>月64時間以上80時間未満：12点</li>
<li>月48時間以上64時間未満：8点</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>月160時間は、約月22日勤務・1日7.5時間程度に相当します。フルタイム勤務ならほぼこのレベルです。</p>
</div>

<h2>調整指数とは</h2>
<p>調整指数は、基本指数に加えて家庭の特殊な事情を点数化したものです。加算される場合と減点される場合があります。</p>

<h3>加算される主な調整指数</h3>
<ul>
<li>ひとり親世帯の就労：+5点</li>
<li>きょうだいが同じ園に在園中：+3点</li>
<li>きょうだいを同時申込：+2点</li>
<li>認可外保育施設利用中：+3点</li>
<li>育休明けで復帰予定：+2点</li>
<li>生活保護受給：+3点</li>
</ul>

<h3>減点される主な調整指数</h3>
<ul>
<li>市外在住：-10点</li>
<li>同居の祖父母が保育可能：-3点</li>
<li>認可園からの転園：-5点</li>
</ul>`,
    publishedAt: "2026-04-26",
    popularity: 65,
  },
  // ===== 点数アップ =====
  {
    slug: "score-up-tips",
    citySlug: "gyoda",
    title: "行田市で保育園に入りやすくするための点数アップ作戦",
    description:
      "行田市の保育園入園で点数を上げるための実践的な対策を5つ紹介します。",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>点数を上げる5つの作戦</h2>

<h3>1. 認可外保育施設の活用（+3点）</h3>
<p>認可園に入れない場合、認可外保育施設に預けることで翌年度の申請時に+3点がつきます。特に0歳児で認可園に入れなかった場合、認可外を選択肢に入れると1年後に大きなアドバンテージになります。</p>

<h3>2. 育休明けタイミングの活用（+2点）</h3>
<p>入園月中に職場復帰する予定があれば、+2点の加点がつきます。スケジュール調整が可能であれば、復帰時期を入園月に合わせることも検討しましょう。</p>

<h3>3. きょうだいの活用（+3点または+2点）</h3>
<p>上の子が既に同じ園に在園中であれば+3点、同時申込なら+2点がつきます。複数の子どもがいる場合は大きなアドバンテージです。</p>

<h3>4. ひとり親世帯の場合（+5点）</h3>
<p>母子家庭・父子家庭で就労中なら+5点です。この加点は他の加点と比較しても最大級なので、選考で有利に働きます。</p>

<h3>5. 就労時間の調整</h3>
<p>パート勤務で月48時間以上の就労が見込まれれば最低8点が付きます。勤務時間の相談が可能であれば、月64時間（約月8日×8時間）以上を目指しましょう。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>複数の加点を組み合わせることで、確実に点数を上げられます。使える加点は漏れなく活用しましょう。</p>
</div>`,
    publishedAt: "2026-04-26",
    popularity: 62,
  },
  // ===== 同点対策 =====
  {
    slug: "tiebreaker-rules",
    citySlug: "gyoda",
    title: "行田市で同点になったらどうなる？　優先順位のしくみ",
    description:
      "行田市の保育園入園選考で同点になった場合の優先順位と、事前にできる対策を解説します。",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>同点の場合の優先順位</h2>
<p>行田市では選考指数が同点の場合、以下の順番で優先されます（参考値）。</p>

<ol>
<li>ひとり親世帯</li>
<li>希望する保育施設にきょうだいが在園している世帯</li>
<li>基本指数が高い世帯（調整指数による加点が少ない＝就労状況が安定）</li>
<li>行田市の居住期間が長い世帯</li>
<li>所得が低い世帯</li>
</ol>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>きょうだいが在園中の園を希望に入れると、指数+3点だけでなく同点時の優先順位でも有利になります。</p>
</div>

<h2>対策のポイント</h2>
<ul>
<li>加点を1つでも積み上げて同点を避ける</li>
<li>きょうだいが在園中の園を第1希望にする</li>
<li>ボーダーラインが低い園も希望に入れる</li>
</ul>

<div class="info-box">
<p><strong>情報</strong></p>
<p>行田市の公式サイトで、前年度の選考ボーダーラインが公開されていることがあります。参考にしましょう。</p>
</div>`,
    publishedAt: "2026-04-26",
    popularity: 58,
  },
  // ===== 就労証明 =====
  {
    slug: "part-time-work-score",
    citySlug: "gyoda",
    title: "行田市　パート・時短勤務での保育園入園戦略",
    description:
      "パートタイムや時短勤務でも保育園に入れるのか、点数計算と対策を解説します。",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>パート・時短勤務の点数</h2>
<p>行田市でもパート勤務や時短勤務での入園は可能です。ただし、就労時間によって点数が変わるため、計画が重要です。</p>

<h3>パート勤務での基本指数（参考値）</h3>
<ul>
<li>月64時間以上80時間未満（約月8日×8時間）：12点</li>
<li>月48時間以上64時間未満（約月6日×8時間）：8点</li>
</ul>

<h3>時短勤務の場合</h3>
<p>勤務時間が同じであれば、パートも時短も同じ点数が付きます。重要なのは「月あたりの総就労時間」です。</p>

<h2>入園を目指すならば</h2>

<div class="step">
<div class="step-num">1</div>
<div class="step-content">
<strong>最低でも月64時間を目指す</strong>
<p>月64時間あれば12点の基本指数がつき、配偶者とのダブルインカムで24点以上が見込めます。</p>
</div>
</div>

<div class="step">
<div class="step-num">2</div>
<div class="step-content">
<strong>就労証明書の記載内容</strong>
<p>経理担当者に「月あたりの就労時間」を正確に記載してもらいましょう。1時間の違いが重要になります。</p>
</div>
</div>

<div class="step">
<div class="step-num">3</div>
<div class="step-content">
<strong>加点の活用</strong>
<p>認可外保育施設の利用や育休明けの復帰で、さらに加点できないか検討しましょう。</p>
</div>
</div>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>月48時間のパート（月6日×8時間）よりも月64時間（月8日×8時間）のパートの方が、4点高くなります。ボーダーラインが近い場合は、この4点が決定的な差になることもあります。</p>
</div>`,
    publishedAt: "2026-04-26",
    popularity: 52,
  },
  // ===== ひとり親 =====
  {
    slug: "single-parent-score",
    citySlug: "gyoda",
    title: "行田市　ひとり親家庭の保育園入園　加点と優遇措置",
    description:
      "母子家庭・父子家庭が行田市で保育園に入るときの加点と優遇措置をまとめました。",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>ひとり親家庭の加点</h2>
<p>行田市では、ひとり親世帯（母子家庭・父子家庭）で就労中または就労が内定している場合、+5点の加点がつきます。</p>

<h3>加点の内訳</h3>
<ul>
<li>基本指数：親1人分の就労時間に応じた点数（最大20点）</li>
<li>調整指数：ひとり親加算 +5点</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>ひとり親加算の+5点は、全調整指数の中でも最大級です。他の加点と組み合わせると、かなり競争力が高まります。</p>
</div>

<h2>必要な書類</h2>
<ul>
<li>戸籍謄本（ひとり親であることの証明）</li>
<li>就労証明書（親1人分）</li>
<li>在学証明書（親が就学中の場合）</li>
</ul>

<h2>加点を確実にもらうために</h2>

<div class="step">
<div class="step-num">1</div>
<div class="step-content">
<strong>戸籍謄本の準備</strong>
<p>離婚後や死別の場合、戸籍謄本で証明します。ひとり親であることの確認には不可欠です。</p>
</div>
</div>

<div class="step">
<div class="step-num">2</div>
<div class="step-content">
<strong>就労証明書の正確な記載</strong>
<p>月あたりの就労時間を正確に記載してもらい、できるだけ多くの基本指数を取得しましょう。</p>
</div>
</div>

<div class="step">
<div class="step-num">3</div>
<div class="step-content">
<strong>他の加点との組み合わせ</strong>
<p>ひとり親＋認可外利用＋育休明け復帰で、最大15点の加点が見込めます。</p>
</div>
</div>`,
    publishedAt: "2026-04-26",
    popularity: 58,
  },
  // ===== 育休タイミング =====
  {
    slug: "parental-leave-timing",
    citySlug: "gyoda",
    title: "行田市　育休からの復帰タイミング　保育園入園を成功させるには",
    description:
      "育休から復帰するときの保育園入園のベストタイミングと書類準備について解説します。",
    image:
      "https://images.unsplash.com/photo-1476307822519-e21cc028cb29?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>育休復帰と保育園入園のセット戦略</h2>
<p>育休からの復帰と保育園入園はセットで計画することが成功のカギです。行田市では入園月中に職場復帰すれば+2点の加点がつきます。</p>

<h2>育休復帰のベストタイミング</h2>

<h3>春（4月入園）での復帰</h3>
<ul>
<li>最も多くの入園枠がある時期</li>
<li>4月中に職場復帰で+2点の加点</li>
<li>新年度スタートで園も新しいクラス編成のため、慣らし保育が進めやすい</li>
</ul>

<h3>その他の時期での復帰</h3>
<p>年間を通じて途中入園も受け付けています。ただし、春ほど入園枠は多くありません。</p>

<h2>必要な書類と確認ポイント</h2>

<div class="step">
<div class="step-num">1</div>
<div class="step-content">
<strong>育児休業給付金受給中は要注意</strong>
<p>育休中は「労働」の事由に該当しません。+2点の加点を受けるなら、復帰予定日を入園月中に設定してください。</p>
</div>
</div>

<div class="step">
<div class="step-num">2</div>
<div class="step-content">
<strong>復帰予定日の証明</strong>
<p>勤務先から「育休復帰予定証明書」をもらい、入園月中の復帰予定であることを証明します。</p>
</div>
</div>

<div class="step">
<div class="step-num">3</div>
<div class="step-content">
<strong>夫婦での育休からの復帰</strong>
<p>両親が育休中の場合、どちらが先に復帰するかで点数計算が変わります。事前に相談しましょう。</p>
</div>
</div>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>+2点は小さく見えますが、同点でのボーダーラインが近い場合は決定的な差になります。復帰タイミングの調整は重要です。</p>
</div>`,
    publishedAt: "2026-04-26",
    popularity: 55,
  },
  // ===== 待機児童 =====
  {
    slug: "nursery-wait-time",
    citySlug: "gyoda",
    title: "行田市の保育園　待機児童と入園難易度",
    description:
      "行田市の待機児童数と入園難易度の推移、競争率が高い時期と入りやすい園の見つけ方。",
    image:
      "https://images.unsplash.com/photo-1544776278-ca5e3af521d7?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>行田市の待機児童状況</h2>
<p>行田市は埼玉県北部の中核都市で、人口約8万人。保育園の数は約20か所とコンパクトながら、入園競争は年ごと、園ごとに異なります。</p>

<h2>特に入りにくいクラス</h2>
<ul>
<li><strong>0歳児</strong>：定員が少なく（1クラス6〜10名程度）最も競争率が高い</li>
<li><strong>1歳児</strong>：0歳での定員落選者が希望するため、次に難しい</li>
<li><strong>2歳児以降</strong>：比較的空きが出やすい</li>
</ul>

<h2>比較的入りやすい時期</h2>
<ul>
<li><strong>秋以降の途中入園</strong>：4月ほどの申込が集中しない</li>
<li><strong>年度途中</strong>：転園や卒園による空きが出ることがある</li>
</ul>

<h2>戦略的な園選び</h2>

<div class="step">
<div class="step-num">1</div>
<div class="step-content">
<strong>公式サイトで空き状況を確認</strong>
<p>行田市の公式サイトで保育施設ごとの利用可能状況を公開しています。定期的にチェックしましょう。</p>
</div>
</div>

<div class="step">
<div class="step-num">2</div>
<div class="step-content">
<strong>複数園の希望を戦略的に</strong>
<p>駅周辺の競争率の高い園だけでなく、郊外の園も希望に入れると入園率が高まります。</p>
</div>
</div>

<div class="step">
<div class="step-num">3</div>
<div class="step-content">
<strong>二次利用調整の活用</strong>
<p>一次で不承諾でも、二次で希望園を変更できます。戦略的な選択が可能です。</p>
</div>
</div>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>行田市は規模が大きすぎず小さすぎず、園ごとの特色がはっきりしています。複数の園を見学して、狙い目を見つけることが大切です。</p>
</div>`,
    publishedAt: "2026-04-26",
    popularity: 48,
  },
  // ===== 申込チェック =====
  {
    slug: "application-checklist",
    citySlug: "gyoda",
    title: "行田市　保育園申込のチェックリスト　書類漏れで不利にならない方法",
    description:
      "行田市の保育園申込で必要な書類と提出期限、提出漏れで損しないための確認リストです。",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>申込に必要な書類</h2>

<h3>基本的な書類</h3>
<ul>
<li>保育施設利用申込書</li>
<li>認定教育・保育施設利用申告書</li>
<li>児童票</li>
<li>教育・保育給付認定申請書</li>
</ul>

<h3>就労している場合</h3>
<ul>
<li>就労証明書（両親分）</li>
<li>雇用契約書またはシフト表（日々雇用の場合）</li>
<li>自営業：営業許可書と事業実績報告書</li>
</ul>

<h3>その他の事由の場合</h3>
<ul>
<li>疾病：診断書</li>
<li>障害：障害者手帳のコピー</li>
<li>介護：介護保険証またはケアプランのコピー</li>
<li>出産：母子健康手帳のコピー</li>
<li>就学：在学証明書</li>
<li>求職：職業訓練校の入学証明書（必要な場合）</li>
</ul>

<h3>ひとり親世帯の場合</h3>
<ul>
<li>戸籍謄本</li>
<li>母子相談員の証明書または、児童扶養手当認定通知書</li>
</ul>

<h2>提出期限と確認事項</h2>

<div class="checklist">
<input type="checkbox"> 一次申込締切日（11月上旬〜12月上旬）を確認した
<br>
<input type="checkbox"> 二次申込締切日（2月上旬〜2月中旬）を確認した
<br>
<input type="checkbox"> 郵送の場合の必着日を確認した
<br>
<input type="checkbox"> 就労証明書が正確に記載されている
<br>
<input type="checkbox"> 月あたりの就労時間が正確に記載されている
<br>
<input type="checkbox"> 勤務先の押印がある
<br>
<input type="checkbox"> ひとり親の場合、戸籍謄本を用意した
<br>
<input type="checkbox"> 認可外保育施設利用中の場合、領収書を用意した
<br>
<input type="checkbox"> 全ページに記入漏れがないか確認した
</div>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>書類の不備や記載漏れは、加点の取りこぼしや、場合によっては選考自体に影響します。提出前に必ず複数回チェックしましょう。</p>
</div>`,
    publishedAt: "2026-04-26",
    popularity: 60,
  },
  // ===== 認可外 =====
  {
    slug: "unlicensed-nursery",
    citySlug: "gyoda",
    title: "行田市の認可外保育施設ガイド　認可園との違いは？",
    description:
      "行田市で認可園に入れなかった場合の選択肢として、認可外保育施設について解説します。",
    image:
      "https://images.unsplash.com/photo-1587654780291-39c9404d7dd0?w=800&h=400&fit=crop",
    category: "認可外保育",
    categoryColor: "teal",
    content: `<h2>認可外保育施設とは？</h2>
<p>認可外保育施設は、認可基準を満たしていないものの、自治体に届出をして運営している保育施設です。行田市内にも複数の認可外保育施設があります。</p>

<h2>認可園との違い</h2>
<table>
<tr><th>項目</th><th>認可</th><th>認可外</th></tr>
<tr><td>保育料</td><td>所得に応じて決定</td><td>施設が設定</td></tr>
<tr><td>申込先</td><td>行田市保育課</td><td>施設に直接</td></tr>
<tr><td>入園選考</td><td>指数による利用調整</td><td>施設独自の基準</td></tr>
<tr><td>翌年の入園加点</td><td>-</td><td>+3点</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>認可外に預けながら翌年度の認可園を再申請すると、加点（+3点）がつくため入りやすくなります。認可園に入れなかった場合の有効な戦略です。</p>
</div>

<h2>認可外を選ぶときのチェックポイント</h2>
<ul>
<li>自治体への届出が済んでいるか</li>
<li>保育料と追加料金の内訳</li>
<li>保育士の配置人数</li>
<li>施設の安全対策</li>
<li>給食の内容（弁当持参か施設提供か）</li>
</ul>`,
    publishedAt: "2026-04-26",
    popularity: 42,
  },
];

registerArticles(articles);
