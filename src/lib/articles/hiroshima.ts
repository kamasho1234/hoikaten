import type { Article } from "./types";
import { registerArticles } from "./index";

const articles: Article[] = [
  // ===== 保活の基本 (1) =====
  {
    slug: "hokatsu-schedule",
    citySlug: "hiroshima",
    title: "広島市の保活スケジュール　令和8年度4月入園の流れ",
    description:
      "広島市の認可保育園の4月入園に向けた申込時期・選考・結果通知の流れを時系列でまとめました。",
    image: "https://images.unsplash.com/photo-1484820540004-14229fe36ca4?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>令和8年度（2026年度）4月入園のスケジュール</h2>
<p>広島市の4月入園は<strong>一次受付</strong>と<strong>二次受付</strong>に分かれています。一次で定員に達しなかった園のみ二次で追加募集されます。</p>

<h3>一次受付</h3>
<table>
<tr><th>項目</th><th>日程</th></tr>
<tr><td>申込書ダウンロード開始</td><td>令和7年11月21日（金）</td></tr>
<tr><td>申込期間</td><td>令和7年11月21日（金）〜令和8年1月13日（火）</td></tr>
<tr><td>結果通知発送</td><td>令和8年2月20日（金）〜2月27日（金）</td></tr>
</table>

<h3>二次受付</h3>
<p>一次選考後に空きがある園について追加募集が行われます。日程は一次結果通知後に公表されます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>申込書はお住まいの区の福祉課窓口で受け取るか、広島市公式サイトからダウンロードできます。電子申請（ぴったりサービス）も利用可能です。</p>
</div>

<h2>いつから動き始めるべき？</h2>
<div class="step">
<div class="step-num">1</div>
<div class="step-content">
<strong>4月〜6月：情報収集</strong>
<p>広島市の「保育園等のごあんない」を確認し、ランク制度を理解しましょう。</p>
</div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content">
<strong>7月〜10月：保育園見学</strong>
<p>気になる園に電話で見学予約。複数園を比較しましょう。</p>
</div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content">
<strong>11月〜1月：申込書類の準備・提出</strong>
<p>就労証明書などを揃え、区の福祉課へ提出します。</p>
</div>
</div>

<h2>途中入園（5月〜3月）の申込</h2>
<p>毎月の途中入園も可能です。入園希望月の<span class="highlight">前月10日</span>が締切の目安ですが、月ごとに異なる場合があるため、区の福祉課に確認してください。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳しくは<a href="https://www.city.hiroshima.lg.jp/living/kosodate/1021251/1025852/1003487.html" target="_blank" rel="noopener">広島市公式サイト「保育園等の入園について」</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 55,
  },

  // ===== 選考のしくみ (3) =====
  {
    slug: "rank-system-guide",
    citySlug: "hiroshima",
    title: "広島市のランク制を徹底解説　S〜Gランクの決まり方",
    description:
      "広島市の保育園入園選考で使われるランク制（S〜G）の仕組みと、世帯ランクの決まり方をわかりやすく解説します。",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>ランク制とは？</h2>
<p>広島市の保育園入園選考は「点数の合計」ではなく<strong>「ランク」</strong>で優先順位が決まります。保育を必要とする理由に応じて、父母それぞれにS〜Gのランクが付与されます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>世帯ランクは父母のうち<span class="highlight">低い方のランク</span>で決まります。両親ともAランクなら世帯はAランク、片方がBなら世帯はBランクです。</p>
</div>

<h2>就労によるランクの目安</h2>
<p>最も多いケースである「就労（居宅外）」の場合、月の就労時間でランクが変わります。</p>

<table>
<tr><th>月の就労時間</th><th>ランク</th></tr>
<tr><td>160時間以上</td><td>A</td></tr>
<tr><td>120時間以上160時間未満</td><td>B</td></tr>
<tr><td>64時間以上120時間未満</td><td>C</td></tr>
<tr><td>64時間未満（48時間以上等）</td><td>D以下</td></tr>
</table>

<h2>就労以外のランク例</h2>
<ul>
<li><strong>Sランク</strong>：進級に伴う転園で行き先が確定している場合など</li>
<li><strong>Aランク</strong>：ひとり親世帯（就労時間に関係なくA扱い）</li>
<li><strong>Cランク</strong>：妊娠・出産（産前8週〜産後8週）</li>
</ul>

<h2>同ランクの場合はどうなる？</h2>
<p>同じランク内では<strong>調整指数</strong>の高い順に選考されます。さらに同点の場合は、所得が低い世帯が優先されるなどの細かい基準があります。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>ランク表の詳細は<a href="https://www.city.hiroshima.lg.jp/living/kosodate/1021251/1025852/1003487.html" target="_blank" rel="noopener">広島市公式サイト「保育園等のごあんない」</a>に掲載されています。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 65,
  },
  {
    slug: "score-up-checklist",
    citySlug: "hiroshima",
    title: "広島市で入園の優先度を上げる方法　加点チェックリスト",
    description:
      "広島市の保育園選考で調整指数の加点を最大限に活用するためのチェックリストです。",
    image: "https://images.unsplash.com/photo-1607453998774-d533f65dac99?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>加点の取りこぼしをなくそう</h2>
<p>広島市のランク制では、同ランク内の順位は調整指数で決まります。<span class="highlight">1点</span>の差が明暗を分けることもあるため、該当する加点は漏れなく活用しましょう。</p>

<h3>加点チェックリスト</h3>
<table>
<tr><th>チェック</th><th>項目</th><th>指数</th></tr>
<tr><td></td><td>育休明けに復職予定</td><td>+3</td></tr>
<tr><td></td><td>きょうだいが希望園に在園中</td><td>+4</td></tr>
<tr><td></td><td>きょうだい同時申込</td><td>+2</td></tr>
<tr><td></td><td>保育士・保育教諭として市内で勤務</td><td>+5</td></tr>
<tr><td></td><td>ひとり親世帯</td><td>ランクA + 30</td></tr>
<tr><td></td><td>生活保護世帯</td><td>加点あり</td></tr>
</table>

<h2>ランクそのものを上げるには</h2>
<p>調整指数だけでなく、ランクを上げることも重要です。例えば月の就労時間が120時間のBランクの方は、就労時間を<span class="highlight">160時間以上</span>に増やせればAランクに上がります。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>世帯ランクは「低い方の親」で決まるため、就労時間が短い方の親の時間を増やす方が効果的です。</p>
</div>

<h2>注意すべき減点項目</h2>
<p>育休延長を許容する場合はランクが最低ランクに下がる場合があります。「不承諾でも構わない」という申告は慎重に判断してください。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>調整指数の詳細は<a href="https://www.city.hiroshima.lg.jp/living/kosodate/1021251/1025852/1003487.html" target="_blank" rel="noopener">広島市公式サイト「保育園等のごあんない」</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 100,
  },
  {
    slug: "selection-process",
    citySlug: "hiroshima",
    title: "広島市の保育園選考　同点時の優先順位を解説",
    description:
      "広島市の保育園入園選考で同ランク・同調整指数の場合にどう優先されるか、選考の流れを解説します。",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>選考の基本ルール</h2>
<p>広島市の認可保育園の入園選考は<strong>先着順ではありません</strong>。申込期間中に届いた申込書をすべて受け付けた後、利用調整基準に基づいて区長が選考を行います。</p>

<h2>選考の手順</h2>
<div class="step">
<div class="step-num">1</div>
<div class="step-content">
<strong>ランク判定</strong>
<p>父母それぞれの保育必要事由からランク（S〜G）を判定。低い方が世帯ランクになります。</p>
</div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content">
<strong>調整指数の算出</strong>
<p>きょうだい在園、育休明け復職、ひとり親などの加点・減点を計算します。</p>
</div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content">
<strong>ランク順に内定</strong>
<p>ランクの高い世帯から順に、希望園の空き枠に割り当てられます。同ランク内は調整指数の高い順です。</p>
</div>
</div>
<div class="step">
<div class="step-num">4</div>
<div class="step-content">
<strong>同点の場合</strong>
<p>ランクも調整指数も同じ場合は、所得が低い世帯や保育の必要性が高い世帯が優先されます。</p>
</div>
</div>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>Aランク同士の競争では、調整指数が決め手になります。きょうだい在園（+4）や保育士勤務（+5）がある世帯が有利です。同調整指数の場合は所得の低い世帯が優先される傾向にあるため、希望園を幅広く書くことが重要です。</p>
</div>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>第一希望の園が不承諾でも、第二希望以降の園で空きがあれば内定する場合があります。希望順位は多めに記入しましょう。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>利用調整の詳細は<a href="https://www.city.hiroshima.lg.jp/_res/projects/default_project/_page_/001/003/487/198848.pdf" target="_blank" rel="noopener">広島市「利用調整の考え方」（PDF）</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 85,
  },

  // ===== 育休・復職 (2) =====
  {
    slug: "part-time-work-rank",
    citySlug: "hiroshima",
    title: "時短勤務だとランクはどうなる？広島市の就労時間とランクの関係",
    description:
      "パートや時短勤務の場合、広島市の保育園選考でどのランクになるのか。入園の可能性を上げる方法を解説します。",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=400&fit=crop",
    category: "育休・復職",
    categoryColor: "teal",
    content: `<h2>時短勤務のランクは？</h2>
<p>広島市では就労時間によってランクが決まります。時短勤務の場合、フルタイムのAランクより下のランクになることが多いです。</p>

<table>
<tr><th>働き方の例</th><th>月の就労時間</th><th>ランク目安</th></tr>
<tr><td>フルタイム（週40時間）</td><td>160時間以上</td><td>A</td></tr>
<tr><td>時短勤務（週30時間）</td><td>120時間以上</td><td>B</td></tr>
<tr><td>パート（週20時間）</td><td>80時間程度</td><td>C</td></tr>
<tr><td>パート（週16時間）</td><td>64時間程度</td><td>C</td></tr>
</table>

<h2>ランクを上げるには</h2>
<p>世帯ランクは「低い方の親」で決まるため、就労時間が短い方の親がカギになります。</p>
<ul>
<li>月64時間未満 → <span class="highlight">64時間以上</span>に増やせばCランクに</li>
<li>月120時間未満 → <span class="highlight">120時間以上</span>に増やせばBランクに</li>
<li>月160時間未満 → <span class="highlight">160時間以上</span>に増やせばAランクに</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>就労証明書に記載される「月の就労時間」は、残業を含めた実績ではなく、雇用契約上の所定労働時間で判定されます。</p>
</div>

<h2>入園申込時は「復職後の勤務時間」で判定</h2>
<p>育休中の申込では、復職後の予定勤務条件で判定されます。復職後にフルタイムで働く予定なら、Aランクで選考を受けられます。「入園後に時短に変更する」ことは可能ですが、月64時間未満になると保育の利用資格を失います。</p>

<h2>在宅勤務（テレワーク）の場合</h2>
<p>広島市では在宅勤務も就労として認められます。ただし、居宅外労働と居宅内労働で取り扱いが異なる場合があるため、就労証明書の記載内容を区の福祉課に確認しましょう。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>就労証明書の様式は<a href="https://www.city.hiroshima.lg.jp/living/kosodate/1021251/1025852/1003487.html" target="_blank" rel="noopener">広島市公式サイト</a>からダウンロードできます。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 90,
  },
  {
    slug: "ikukyu-enchou-risk",
    citySlug: "hiroshima",
    title: "育休延長許容でランクXに？広島市で知っておくべき注意点",
    description:
      "広島市で育休延長を選んだ場合の保育園選考への影響と、ランクが最低ランクに下がるリスクを解説します。",
    image: "https://images.unsplash.com/photo-1531545514256-b1400bc00f31?w=800&h=400&fit=crop",
    category: "育休・復職",
    categoryColor: "teal",
    content: `<h2>育休延長許容とランクXの関係</h2>
<p>広島市では、入園申込の際に「育休延長を許容する（入園できなくても構わない）」旨を申告した場合、選考上のランクが<span class="highlight">最低ランク（X）</span>に引き下げられます。これは事実上、入園がほぼ不可能になることを意味します。</p>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>ランクXは通常のS〜Gランクよりもさらに低い扱いです。空き枠があっても他の全ての申込者が優先されるため、入園できる可能性は極めて低くなります。</p>
</div>

<h2>なぜランクが下がるのか</h2>
<p>広島市の利用調整は「保育の必要性が高い世帯」を優先する仕組みです。育休延長を許容するということは「今すぐ保育が必要ではない」と判断されるため、優先度が最も低くなります。</p>

<h2>「落選狙い」のリスク</h2>
<p>育休を延長するために、あえて不承諾通知をもらおうとする「落選狙い」は、広島市では通用しにくくなっています。</p>
<ul>
<li>入園意思の確認が強化されている</li>
<li>希望園を極端に絞ると、入園意思なしとみなされる可能性がある</li>
<li>2025年4月以降、全国的に育休延長の審査が厳格化された</li>
</ul>

<h2>育休延長したい場合の正しい対応</h2>
<p>育休の延長自体は権利ですが、保育園の選考において不利になる点を理解した上で判断しましょう。不承諾通知が必要な場合は、入園の意思を持って誠実に申し込むことが求められます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>育休延長を希望する場合は、区の福祉課に相談して正確な影響を確認してください。ハローワークへの手続きも変更されているため、勤務先の人事担当にも早めに相談しましょう。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>育休関連の手続きは<a href="https://www.city.hiroshima.lg.jp/living/kosodate/1021251/1025852/1003487.html" target="_blank" rel="noopener">広島市公式サイト「保育園等の入園について」</a>をご確認ください。育休延長の制度変更については<a href="https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/0000160564_00040.html" target="_blank" rel="noopener">厚生労働省の公式ページ</a>もご参照ください。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 50,
  },

  // ===== 認可外 (2) =====
  {
    slug: "ninkagai-oyako",
    citySlug: "hiroshima",
    title: "認可園に落ちた場合の選択肢　広島市の認可外・企業主導型活用法",
    description:
      "広島市の認可保育園に入れなかった場合に検討すべき認可外保育施設や企業主導型保育の活用法を紹介します。",
    image: "https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=800&h=400&fit=crop",
    category: "認可外",
    categoryColor: "rose",
    content: `<h2>認可園に入れなかったらどうする？</h2>
<p>広島市の認可保育園に入れなかった場合でも、いくつかの選択肢があります。慌てずに次のステップを検討しましょう。</p>

<h2>選択肢1：二次受付に申し込む</h2>
<p>一次選考後に空きがある園について追加募集が行われます。一次で不承諾だった方は二次を検討しましょう。</p>

<h2>選択肢2：認可外保育施設を利用する</h2>
<p>認可外保育施設は園と直接契約するため、ランクによる選考はありません。空きがあればすぐに入園できます。</p>

<h2>選択肢3：企業主導型保育の地域枠を利用する</h2>
<p>企業主導型保育施設の地域枠は、その企業の従業員でなくても利用可能です。保育料も認可園と同水準の施設が多く、有力な選択肢です。</p>

<h2>選択肢4：途中入園を毎月申し込む</h2>
<p>途中入園の締切は毎月10日頃です。辞退や転園で空きが出るタイミングで内定する可能性があります。認可外に通いながら、毎月の途中入園を継続して申し込むことができます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>広島市は毎月の空き状況を公式サイトで公開しています。定期的にチェックして、空きが出た園を候補に追加しましょう。</p>
</div>

<h2>選択肢5：育休を延長する</h2>
<p>認可保育園に入れなかったことを理由に育児休業を最長2歳まで延長できます。ただし、育休延長許容の申告はランクXへの引き下げにつながるため注意してください。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>空き状況は<a href="https://www.city.hiroshima.lg.jp/living/kosodate/1021251/1025847/1023646.html" target="_blank" rel="noopener">広島市公式サイト「保育園等の空き状況」</a>で確認できます。認可外保育施設の一覧は<a href="https://www.city.hiroshima.lg.jp/living/kosodate/1021251/1025848/1023596.html" target="_blank" rel="noopener">広島市公式サイト</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 80,
  },
  {
    slug: "ninkagai-katen",
    citySlug: "hiroshima",
    title: "広島市で認可外保育施設を経由して加点を得る方法",
    description:
      "広島市で認可外保育施設を活用して認可園への入園を有利にする戦略を解説します。",
    image: "https://images.unsplash.com/photo-1587654780860-5e6801e6e7f5?w=800&h=400&fit=crop",
    category: "認可外",
    categoryColor: "rose",
    content: `<h2>認可外に通っていると加点はある？</h2>
<p>広島市の利用調整基準では、認可外保育施設に通っていること自体は直接的な加点項目ではありません。ただし、認可外を活用することで間接的に入園の可能性を高める戦略はあります。</p>

<h2>認可外を「つなぎ」で使う戦略</h2>
<div class="step">
<div class="step-num">1</div>
<div class="step-content">
<strong>認可外に入園して復職する</strong>
<p>認可園の選考結果を待たずに復職を開始。育休明け復職の加点（+3）を確実に得る準備ができます。</p>
</div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content">
<strong>毎月の途中入園に申し込み続ける</strong>
<p>認可外に通いながら、毎月10日の締切に合わせて認可園への途中入園を申し込みます。</p>
</div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content">
<strong>翌年4月の一次受付で再挑戦</strong>
<p>4月は最も空きが出るタイミングです。Aランク+調整指数で再チャレンジしましょう。</p>
</div>
</div>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>認可外に通っている間も就労を継続していれば、ランクは維持されます。育休を延長してランクXになるより、認可外に預けて就労を続ける方が翌年の選考で有利です。</p>
</div>

<h2>企業主導型保育施設の活用</h2>
<p>企業主導型保育施設は認可外に分類されますが、国の助成を受けているため保育料が比較的安く、保育の質も一定の基準を満たしています。地域枠があれば誰でも利用可能です。</p>

<h2>認可外利用時の無償化</h2>
<p>認可外保育施設でも「保育の必要性」の認定を受ければ無償化の対象になります。3〜5歳児は月額37,000円まで、0〜2歳児（住民税非課税世帯）は月額42,000円まで補助されます。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>広島市の認可外保育施設一覧は<a href="https://www.city.hiroshima.lg.jp/living/kosodate/1021251/1025848/1023596.html" target="_blank" rel="noopener">広島市公式サイト</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 75,
  },

  // ===== 保育園選び (1) =====
  {
    slug: "area-guide",
    citySlug: "hiroshima",
    title: "広島市の区別・保育園入りやすさマップ",
    description:
      "広島市8区の保育園の入りやすさを区別に比較。競争が激しいエリアと入りやすいエリアの特徴を解説します。",
    image: "https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&h=400&fit=crop",
    category: "保育園選び",
    categoryColor: "purple",
    content: `<h2>広島市8区の保育園事情</h2>
<p>広島市は8つの区で構成されており、区によって保育園の入りやすさに差があります。</p>

<h3>競争が激しいエリア</h3>
<table>
<tr><th>区</th><th>特徴</th></tr>
<tr><td>安佐南区</td><td>市内最多の保育園児童数を抱える子育て世帯の多いエリア。0〜2歳児の競争が激しい</td></tr>
<tr><td>南区</td><td>都市部で保育ニーズが高く、3歳未満の競争率が高い</td></tr>
<tr><td>中区</td><td>中心部のためニーズが集中しやすい</td></tr>
<tr><td>西区</td><td>ファミリー層の増加で需要が伸びているエリア</td></tr>
</table>

<h3>比較的入りやすいエリア</h3>
<table>
<tr><th>区</th><th>特徴</th></tr>
<tr><td>安芸区</td><td>待機児童が少なく、比較的入りやすい傾向</td></tr>
<tr><td>安佐北区</td><td>園数は限られるが、競争率は低め</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>広島市は2024年・2025年と2年連続で待機児童ゼロを達成しています。ただし、特定の人気園や0〜2歳児クラスでは依然として競争があります。分園整備なども進められているため、最新の空き状況を確認しましょう。</p>
</div>

<h2>空き状況の確認方法</h2>
<p>広島市は毎月の保育園の空き状況を公式サイトで公開しています。希望する園の空き状況をこまめにチェックしましょう。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>最新の空き状況は<a href="https://www.city.hiroshima.lg.jp/living/kosodate/1021251/1025847/1023646.html" target="_blank" rel="noopener">広島市公式サイト「保育園等の空き状況」</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 60,
  },

  // ===== 最新情報 (1) =====
  {
    slug: "seido-kaisei-2026",
    citySlug: "hiroshima",
    title: "令和8年度の広島市保育園制度　変更点と注意事項",
    description:
      "令和8年度（2026年度）の広島市の保育園入園制度について、申込方法や注意すべき変更点をまとめました。",
    image: "https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?w=800&h=400&fit=crop",
    category: "最新情報",
    categoryColor: "blue",
    content: `<h2>令和8年度の申込について</h2>
<p>令和8年度（2026年度）の4月入園申込は、令和7年11月21日から受付が開始されています。申込書は広島市公式サイトからダウンロードするか、各区の福祉課で入手できます。</p>

<h2>電子申請の活用</h2>
<p>広島市では<strong>電子申請（ぴったりサービス）</strong>による申込も可能です。窓口に出向く必要がないため、仕事が忙しい方にも便利です。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>電子申請の締切日は窓口の締切日と異なる場合があります。申込前に締切日を必ず確認してください。</p>
</div>

<h2>育休延長の審査厳格化</h2>
<p>全国的な制度改正として、育休延長を目的とした保育園の「落選狙い」への対応が厳しくなっています。広島市でも、入園意思の確認が強化される方向です。</p>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>育休延長の不承諾通知の取得を目的とした申込は、意図どおりに不承諾にならず入園が決まってしまう可能性もあります。慎重に判断してください。</p>
</div>

<h2>待機児童ゼロの継続</h2>
<p>広島市は2024年・2025年と2年連続で待機児童ゼロを達成しています。安佐南区や南区など需要の高い地域では分園整備が進められており、受け入れ枠の拡大が続いています。</p>

<h2>最新情報の確認方法</h2>
<p>制度の変更点は「保育園等のごあんない」に反映されます。毎年秋に更新されるため、最新版を入手して確認してください。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>最新の入園案内は<a href="https://www.city.hiroshima.lg.jp/living/kosodate/1021251/1025852/1003487.html" target="_blank" rel="noopener">広島市公式サイト「保育園等の入園について」</a>をご確認ください。電子申請は<a href="https://www.city.hiroshima.lg.jp/living/kosodate/1021251/1025852/1035830.html" target="_blank" rel="noopener">電子申請のご案内</a>をご覧ください。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 70,
  },
  // ===== 園えらび (11) =====
  {
    slug: "nursery-visit-guide",
    citySlug: "hiroshima",
    title: "広島市の保育園見学ガイド　チェックリストと質問例",
    description:
      "広島市で保育園見学をする際の予約方法・見るべきポイント・先生への質問例をまとめました。園えらびで後悔しないために。",
    image:
      "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&h=400&fit=crop",
    category: "園えらび",
    categoryColor: "purple",
    content: `<h2>保育園見学はいつから始める？</h2>
<p>広島市の4月入園申込は11月下旬開始です。見学は<span class="highlight">7月〜10月</span>に集中して行うのがおすすめ。人気園は見学枠が埋まりやすいため、早めの予約が大切です。</p>

<h2>見学の予約方法</h2>
<div class="step">
<div class="step-num">1</div>
<div class="step-content">
<strong>電話で予約</strong>
<p>園に直接電話して見学希望日を伝えます。「見学したい」と言えばOKです。</p>
</div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content">
<strong>見学日は平日午前が基本</strong>
<p>子どもたちの活動を見られる10時〜11時がベスト。園庭遊びや給食前の様子を確認できます。</p>
</div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content">
<strong>複数園を比較する</strong>
<p>最低3園は見学しましょう。広島市は8区あり園の特色も多様です。区をまたいだ比較もおすすめです。</p>
</div>
</div>

<h2>見学時のチェックリスト</h2>
<table>
<tr><th>項目</th><th>チェックポイント</th></tr>
<tr><td>安全面</td><td>柵・施錠・プール監視体制</td></tr>
<tr><td>衛生面</td><td>トイレ・おむつ交換台・手洗い場の清潔さ</td></tr>
<tr><td>保育士の様子</td><td>子どもへの声かけが穏やかか、笑顔があるか</td></tr>
<tr><td>園庭</td><td>広さ・遊具の種類。園庭なしなら散歩先の公園を確認</td></tr>
<tr><td>給食</td><td>自園調理か外注か、アレルギー対応の有無</td></tr>
<tr><td>持ち物</td><td>布おむつか紙おむつか、布団持参の有無</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>広島市はランク制度（A〜Eランク）で選考します。見学時に「この園の昨年のボーダーランクはどのくらいですか？」と聞いてみると参考になります。</p>
</div>

<h2>先生に聞くべき質問</h2>
<ul>
<li>慣らし保育の期間はどのくらいですか？</li>
<li>発熱時のお迎え基準は何度ですか？</li>
<li>延長保育は何時まで対応していますか？</li>
<li>保護者参加の行事はどのくらいありますか？</li>
</ul>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>広島市の保育園一覧は<a href="https://www.city.hiroshima.lg.jp/living/kosodate/1021251/1025852/1003487.html" target="_blank" rel="noopener">広島市こども未来局の公式サイト</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 45,
  },
  // ===== データ分析 (12) =====
  {
    slug: "zero-vs-one-year",
    citySlug: "hiroshima",
    title: "広島市、0歳入園と1歳入園を数字で比較分析",
    description:
      "広島市の保育園に0歳で入るか1歳で入るか迷っている方へ。受入枠・競争率・育休給付金への影響をデータで比較します。",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop",
    category: "データ分析",
    categoryColor: "teal",
    content: `<h2>0歳入園と1歳入園の数字を比較</h2>
<p>広島市でも全国と同様に<strong>1歳児クラス</strong>の競争が最も激しくなっています。ランク制度での違いを含めて比較します。</p>

<h2>受入枠の違い</h2>
<table>
<tr><th></th><th>0歳児クラス</th><th>1歳児クラス</th></tr>
<tr><td>定員の目安</td><td>6〜12名</td><td>新規枠は数名（持ち上がりが多い）</td></tr>
<tr><td>競争率</td><td>比較的入りやすい</td><td>最も厳しい</td></tr>
<tr><td>必要ランク</td><td>Bランクでも入れる園が多い</td><td>Aランクでも厳しい園がある</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>広島市のランク制度では、0歳入園でも1歳入園でもランクの決まり方は同じです。ただし0歳の方が枠が多いため、同じランクでも入りやすくなります。</p>
</div>

<h2>育休給付金への影響</h2>
<table>
<tr><th>項目</th><th>0歳4月入園</th><th>1歳4月入園</th></tr>
<tr><td>育休期間</td><td>産後約6〜10か月</td><td>約1年〜1年半</td></tr>
<tr><td>給付金受給期間</td><td>短くなる</td><td>フル受給可能</td></tr>
<tr><td>給付金の差額目安</td><td colspan="2">月額約15〜20万円 x 差分月数</td></tr>
</table>

<h2>区別の傾向</h2>
<table>
<tr><th>区</th><th>0歳児クラス</th><th>1歳児クラス</th></tr>
<tr><td>安佐南区</td><td>やや厳しい</td><td>最激戦</td></tr>
<tr><td>南区</td><td>やや厳しい</td><td>激戦</td></tr>
<tr><td>西区</td><td>標準</td><td>やや厳しい</td></tr>
<tr><td>安佐北区</td><td>入りやすい</td><td>比較的入りやすい</td></tr>
</table>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>各園の年齢別受入枠は<a href="https://www.city.hiroshima.lg.jp/living/kosodate/1021251/1025852/1003487.html" target="_blank" rel="noopener">広島市公式サイト</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 65,
  },
  // ===== 制度を知る (13) =====
  {
    slug: "single-parent-guide",
    citySlug: "hiroshima",
    title: "広島市のひとり親家庭向け保活ガイド　優先制度と支援策",
    description:
      "広島市でひとり親世帯が保育園入園で優遇される仕組みと、利用できる支援制度をまとめました。",
    image:
      "https://images.unsplash.com/photo-1531983412531-1f49a365ffed?w=800&h=400&fit=crop",
    category: "制度を知る",
    categoryColor: "rose",
    content: `<h2>ひとり親世帯は入園選考で優先される</h2>
<p>広島市のランク制度では、ひとり親世帯に対して<strong>ランクの優遇</strong>があります。同じ就労状況でもひとり親の方がランクが高くなるため、入園しやすくなります。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>ひとり親の優遇を受けるには、申込時に「ひとり親であること」を証明する書類（児童扶養手当証書のコピー・戸籍謄本など）を提出する必要があります。</p>
</div>

<h2>利用できる支援制度</h2>
<table>
<tr><th>制度</th><th>内容</th></tr>
<tr><td>保育料の軽減</td><td>市民税非課税世帯は保育料無料。課税世帯も階層に応じて軽減</td></tr>
<tr><td>児童扶養手当</td><td>月額最大45,500円（令和7年度）。所得に応じて支給</td></tr>
<tr><td>ひとり親家庭等医療費補助</td><td>医療費の自己負担が軽減される</td></tr>
<tr><td>母子父子寡婦福祉資金</td><td>就学・就職・転宅等の資金貸付制度</td></tr>
<tr><td>JR通勤定期の割引</td><td>児童扶養手当受給世帯は3割引</td></tr>
</table>

<h2>申込時の注意点</h2>
<div class="step">
<div class="step-num">1</div>
<div class="step-content">
<strong>証明書類を早めに準備</strong>
<p>児童扶養手当証書・戸籍謄本など、ひとり親であることを証明する書類が必要です。発行に時間がかかる場合があるため余裕をもちましょう。</p>
</div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content">
<strong>就労証明書はフルタイムで</strong>
<p>ランクは就労時間で決まります。フルタイム（月160時間以上）であればAランクに該当します。</p>
</div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content">
<strong>各区の福祉課で相談</strong>
<p>ひとり親世帯向けの優遇措置について、お住まいの区の福祉課で個別に相談できます。</p>
</div>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>ひとり親家庭向けの支援制度は<a href="https://www.city.hiroshima.lg.jp/living/kosodate/" target="_blank" rel="noopener">広島市こども未来局</a>のサイトで確認できます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 50,
  },
  // ===== 保活の基本 (14) =====
  {
    slug: "ikukyu-timing",
    citySlug: "hiroshima",
    title: "広島市で育休中に保活、復帰タイミングはいつがベスト？",
    description:
      "広島市で育休中に保活をする際の復帰タイミングとランクへの影響を解説。育休延長のリスクも合わせてお伝えします。",
    image:
      "https://images.unsplash.com/photo-1493894473891-10fc1e5dbd22?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>育休中の申込とランクの関係</h2>
<p>広島市では育休中に保育園を申し込むことができます。育休中の方は就労状況に基づくランクが適用され、復職予定として扱われます。</p>

<h2>復帰タイミングの選択肢</h2>
<table>
<tr><th>パターン</th><th>メリット</th><th>デメリット</th></tr>
<tr><td>0歳4月で復帰</td><td>入園しやすい。Bランクでも可能</td><td>育休給付金が短い。体力的に大変</td></tr>
<tr><td>1歳4月で復帰</td><td>育休を1年取れる。給付金フル受給</td><td>1歳児クラスは激戦。Aランク必須</td></tr>
<tr><td>認可外経由で1歳4月</td><td>認可外利用でランクが上がる場合あり</td><td>認可外の費用負担あり</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>広島市では入園月の翌月末までに復職することが条件です。4月入園なら5月末までに復帰する必要があります。</p>
</div>

<h2>育休延長の注意点</h2>
<p>1歳で入園できなかった場合、育休を延長できます。しかし令和7年度から全国的に<strong>育休延長の審査が厳格化</strong>されています。</p>

<div class="step">
<div class="step-num">1</div>
<div class="step-content">
<strong>「落選狙い」は危険</strong>
<p>わざと競争率の高い園だけ希望して不承諾通知を得る手法は、制度改正で通用しにくくなっています。</p>
</div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content">
<strong>入園意思の確認が強化</strong>
<p>広島市でも「本当に入園する意思があるか」の確認が厳しくなる方向です。慎重に判断してください。</p>
</div>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>復職期限等の詳細は<a href="https://www.city.hiroshima.lg.jp/living/kosodate/1021251/1025852/1003487.html" target="_blank" rel="noopener">広島市「保育園等の入園について」</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 55,
  },
  // ===== 園えらび (15) =====
  {
    slug: "ninkagai-selection",
    citySlug: "hiroshima",
    title: "広島市の認可外保育施設の選び方ガイド",
    description:
      "広島市で認可外保育施設を検討する方向けに、施設の種類・費用の目安・選ぶ際のチェックポイントを解説します。",
    image:
      "https://images.unsplash.com/photo-1576495199011-eb94736d05d6?w=800&h=400&fit=crop",
    category: "園えらび",
    categoryColor: "purple",
    content: `<h2>広島市の認可外保育施設とは</h2>
<p>認可外保育施設は、認可保育所の基準を満たしていないものの、広島市に届出をして運営されている保育施設です。認可園に入れなかった場合の受け皿として利用されています。</p>

<h2>認可外施設の種類</h2>
<table>
<tr><th>種類</th><th>特徴</th></tr>
<tr><td>企業主導型保育</td><td>企業が設置。従業員枠と地域枠がある</td></tr>
<tr><td>認可外保育室</td><td>小規模で家庭的な雰囲気。0〜2歳が多い</td></tr>
<tr><td>ベビーホテル</td><td>夜間・休日対応。一時利用も可能</td></tr>
<tr><td>院内保育所</td><td>病院等の職員向け。地域枠があれば利用可能</td></tr>
</table>

<h2>費用の目安</h2>
<p>広島市内の認可外保育施設の保育料は<span class="highlight">月額4万〜8万円</span>程度が一般的です。政令市の中では東京・大阪より安い傾向にあります。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>0〜2歳の非課税世帯は月額42,000円まで、3〜5歳は月額37,000円まで無償化の対象になる場合があります。</p>
</div>

<h2>選ぶ際のチェックリスト</h2>
<div class="step">
<div class="step-num">1</div>
<div class="step-content">
<strong>広島市への届出があるか</strong>
<p>届出施設一覧は広島市こども未来局のサイトで公開されています。</p>
</div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content">
<strong>立入調査の結果を確認</strong>
<p>広島市は年1回、認可外施設への立入調査を実施しています。改善指導の有無を確認しましょう。</p>
</div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content">
<strong>保育士の配置と資格</strong>
<p>有資格者の割合が高いほど安心です。見学時に聞いてみましょう。</p>
</div>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>届出施設一覧は<a href="https://www.city.hiroshima.lg.jp/living/kosodate/" target="_blank" rel="noopener">広島市こども未来局</a>のサイトで確認できます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 40,
  },
  // ===== 制度を知る (16) =====
  {
    slug: "futago-hokatsu",
    citySlug: "hiroshima",
    title: "広島市で双子・多胎児の保活、知っておきたい制度と戦略",
    description:
      "広島市で双子や三つ子を保育園に入れる際のランク制度での扱い・同時入園の配慮措置・注意点を解説します。",
    image:
      "https://images.unsplash.com/photo-1609220136736-443140cffec6?w=800&h=400&fit=crop",
    category: "制度を知る",
    categoryColor: "rose",
    content: `<h2>双子・多胎児の保活は特有の大変さがある</h2>
<p>双子や三つ子の場合、「2人とも同じ園に入れたい」という希望が強い一方で、空き枠が2名以上ある園は限られます。広島市のランク制度での扱いを正しく理解しましょう。</p>

<h2>広島市の多胎児向け配慮</h2>
<table>
<tr><th>項目</th><th>内容</th></tr>
<tr><td>きょうだい同時申込</td><td>同時に申し込む場合、同一園への入園が配慮される</td></tr>
<tr><td>きょうだい在園</td><td>上の子が在園中であれば優先順位が上がる</td></tr>
<tr><td>保育料の軽減</td><td>同時在園の場合、2人目は半額、3人目以降は無料</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>双子は2人とも新規入園のため、きょうだい在園の優先は使えません。ただし「同時入園希望」として配慮される場合があります。各区の福祉課に事前相談しましょう。</p>
</div>

<h2>双子の保活を成功させるコツ</h2>
<div class="step">
<div class="step-num">1</div>
<div class="step-content">
<strong>定員の大きい園を中心に希望</strong>
<p>2名以上の空きが出やすい大規模園を優先的に希望園に入れましょう。広島市は8区ありますが、園の定員は区によって大きく異なります。</p>
</div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content">
<strong>0歳4月入園を検討</strong>
<p>0歳児クラスは定員枠が大きいため、2名同時に入園できる可能性が高まります。</p>
</div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content">
<strong>安佐北区・佐伯区も視野に</strong>
<p>比較的空きが出やすい区の園も候補に入れると、同じ園に入れる確率が上がります。</p>
</div>
</div>

<h2>保育料の軽減は大きなメリット</h2>
<p>双子が同時に在園する場合、2人目の保育料は半額になります。月額3万円の保育料なら年間で<span class="highlight">約18万円</span>の軽減効果があります。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>多胎児への配慮措置については、各区の福祉課窓口で直接お問い合わせください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 35,
  },
  // ===== 保活の基本 (17) =====
  {
    slug: "hoiku-mama-interview",
    citySlug: "hiroshima",
    title: "広島市の保活体験談　先輩ママに聞く成功と失敗のリアル",
    description:
      "広島市で保活を経験した先輩ママの声を集めました。成功パターンと失敗パターンから学ぶ保活のリアルをお伝えします。",
    image:
      "https://images.unsplash.com/photo-1491013516836-7db643ee125a?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>先輩ママの保活体験を紹介</h2>
<p>広島市で実際に保活を経験した先輩ママの声をもとに、成功パターンと失敗パターンをまとめました。（個人が特定されないよう内容を一部編集しています）</p>

<h2>成功パターン</h2>
<h3>Aさん（安佐南区・1歳4月入園・Aランク）</h3>
<div class="point-box">
<p><strong>フルタイム復帰でAランク確保</strong></p>
<p>安佐南区は広島市で最も競争が激しいと聞き、フルタイム復帰を前提にAランクを確保。希望園を8園書いたことで第3希望に内定。「多めに書いたのが正解でした」と振り返ります。</p>
</div>

<h3>Bさん（安佐北区・1歳4月入園・Bランク）</h3>
<div class="point-box">
<p><strong>競争の穏やかな区で余裕の入園</strong></p>
<p>時短勤務予定でBランクだったが、安佐北区は余裕があり第1希望に内定。「区によって全然違う」と実感したそうです。</p>
</div>

<h2>失敗パターン</h2>
<h3>Cさん（南区・1歳4月入園・Aランク）</h3>
<div class="info-box">
<p><strong>希望園を2つしか書かず保留に</strong></p>
<p>「この2園以外は通えない」と希望を絞った結果、一次で保留。二次で離れた園に入園し、毎日の送迎が大変だったそうです。</p>
</div>

<h3>Dさん（西区・1歳4月入園・Bランク）</h3>
<div class="info-box">
<p><strong>時短勤務でランクが下がり不利に</strong></p>
<p>就労証明書に時短勤務の時間を記載したところBランクに。Aランクの方が優先され、希望園すべて保留になってしまいました。</p>
</div>

<h2>体験談から学ぶポイント</h2>
<ul>
<li>希望園はできるだけ多く書く（最低5園以上）</li>
<li>就労証明書の記載内容がランクに直結する</li>
<li>安佐南区・南区は特に厳しいので多めの対策を</li>
<li>見学は妊娠中から始めると余裕がある</li>
</ul>`,
    publishedAt: "2026-04-07",
    popularity: 60,
  },
  // ===== データ分析 (18) =====
  {
    slug: "waiting-child-data",
    citySlug: "hiroshima",
    title: "広島市の待機児童データ分析　区別の実態を読み解く",
    description:
      "広島市8区の待機児童・保留児童の実態をデータで分析。区ごとの入りやすさの違いを解説します。",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop",
    category: "データ分析",
    categoryColor: "teal",
    content: `<h2>広島市は2年連続待機児童ゼロ</h2>
<p>広島市は2024年・2025年と<span class="highlight">2年連続で待機児童ゼロ</span>を達成しています。しかし「希望する園に入れなかった」保留児童は依然として存在します。</p>

<h2>区別の入りやすさ</h2>
<table>
<tr><th>区</th><th>入りやすさ</th><th>特徴</th></tr>
<tr><td>安佐南区</td><td>最も厳しい</td><td>人口約25万人。ファミリー層が最も多い</td></tr>
<tr><td>南区</td><td>厳しい</td><td>広島駅周辺。マンション開発で需要増</td></tr>
<tr><td>西区</td><td>やや厳しい</td><td>己斐・横川周辺で需要あり</td></tr>
<tr><td>中区</td><td>標準</td><td>都心部だが居住者は少なめ</td></tr>
<tr><td>東区</td><td>比較的入りやすい</td><td>園の数が一定あり</td></tr>
<tr><td>佐伯区</td><td>比較的入りやすい</td><td>五日市周辺に園が集中</td></tr>
<tr><td>安佐北区</td><td>入りやすい</td><td>園に余裕がある</td></tr>
<tr><td>安芸区</td><td>入りやすい</td><td>園の数は少ないが需要も少ない</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>安佐南区は広島市の人口の約2割を占め、保育需要が集中しています。Aランクでも入れない園があるため、隣接する安佐北区・西区の園も視野に入れましょう。</p>
</div>

<h2>年齢別の傾向</h2>
<p>全区共通で<span class="highlight">1歳児クラス</span>の競争が最も激しくなっています。0歳児クラスは比較的入りやすく、3歳以上は幼稚園・認定こども園への流出もあって空きが出やすくなります。</p>

<div class="step">
<div class="step-num">1</div>
<div class="step-content">
<strong>データの活用法</strong>
<p>各園の空き状況は広島市公式サイトで公開されています。申込前に必ずチェックし、空きのある園を中心に希望園を組み立てましょう。</p>
</div>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>最新の空き状況は<a href="https://www.city.hiroshima.lg.jp/living/kosodate/1021251/1025852/1003487.html" target="_blank" rel="noopener">広島市公式サイト</a>で公開されています。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 55,
  },
  // ===== 園えらび (19) =====
  {
    slug: "small-nursery-guide",
    citySlug: "hiroshima",
    title: "広島市の小規模保育事業とは？メリットと3歳の壁対策",
    description:
      "広島市の小規模保育事業の特徴・メリット・デメリットと、卒園後の3歳の壁への対策を解説します。",
    image:
      "https://images.unsplash.com/photo-1577896852618-01da1dd79f7e?w=800&h=400&fit=crop",
    category: "園えらび",
    categoryColor: "purple",
    content: `<h2>小規模保育事業とは</h2>
<p>小規模保育事業は<strong>0〜2歳児</strong>を対象とした定員6〜19名の保育施設です。広島市内にも多数設置されており、認可保育所と同じ利用調整で入園します。</p>

<h2>小規模保育のメリット</h2>
<table>
<tr><th>メリット</th><th>内容</th></tr>
<tr><td>少人数保育</td><td>保育士の目が行き届きやすい</td></tr>
<tr><td>入りやすい</td><td>認可園より空きがある場合が多い</td></tr>
<tr><td>アットホーム</td><td>家庭的な雰囲気で初めての集団生活に馴染みやすい</td></tr>
<tr><td>駅近が多い</td><td>ビルのテナント等に設置され、通勤途中に預けやすい</td></tr>
</table>

<h2>「3歳の壁」とは？</h2>
<p>小規模保育は2歳児クラスまでのため、3歳になると転園が必要です。これを「3歳の壁」と呼びます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>広島市では小規模保育の卒園児に対して、連携先の認可保育所が設定されている場合があります。入園前に連携先を確認しておくと安心です。</p>
</div>

<h2>3歳の壁を乗り越えるには</h2>
<div class="step">
<div class="step-num">1</div>
<div class="step-content">
<strong>連携先の園を確認</strong>
<p>入園前に「卒園後の連携先はどこか」を園に確認しましょう。</p>
</div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content">
<strong>認定こども園も選択肢に</strong>
<p>広島市には認定こども園が多数あり、3歳からの受入枠が大きい園もあります。</p>
</div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content">
<strong>きょうだいの優先を活用</strong>
<p>小規模保育に在園中の子がいると、きょうだいの認可園申込時に優先される場合があります。</p>
</div>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>小規模保育の施設一覧は<a href="https://www.city.hiroshima.lg.jp/living/kosodate/1021251/1025852/1003487.html" target="_blank" rel="noopener">広島市公式サイト</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 50,
  },
  // ===== 点数アップ (20) =====
  {
    slug: "secondchild-hokatsu",
    citySlug: "hiroshima",
    title: "広島市で2人目の保活、きょうだい優先を最大活用する方法",
    description:
      "広島市の保育園入園でのきょうだい在園による優先措置を最大限に活かすための戦略と注意点を解説します。",
    image:
      "https://images.unsplash.com/photo-1471286174890-9c112ffca5b4?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>2人目の保活はきょうだい優先が武器</h2>
<p>広島市のランク制度では、上の子が認可保育園に在園中の場合に<strong>きょうだい在園の優先措置</strong>があります。同じランクの中できょうだい在園世帯が優先されるため、2人目の保活は有利です。</p>

<h2>きょうだい優先の仕組み</h2>
<table>
<tr><th>条件</th><th>内容</th></tr>
<tr><td>対象</td><td>上の子が認可保育所・認定こども園・小規模保育に在園中</td></tr>
<tr><td>優先内容</td><td>同じランク内で優先的に選考される</td></tr>
<tr><td>同一園希望</td><td>上の子と同じ園を希望する場合、さらに優先度が上がる</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>Aランク＋きょうだい在園であれば、安佐南区の人気園でもほぼ確実に入園できます。上の子と同じ園を第1希望に書くのが鉄則です。</p>
</div>

<h2>きょうだい優先を最大活用する戦略</h2>
<div class="step">
<div class="step-num">1</div>
<div class="step-content">
<strong>上の子と同じ園を第1希望に</strong>
<p>きょうだい優先の効果を最大化するため、在園中の園を必ず第1希望に入れましょう。</p>
</div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content">
<strong>上の子が卒園する前に申し込む</strong>
<p>上の子が卒園するときょうだい優先がなくなります。年齢差に注意しましょう。</p>
</div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content">
<strong>保育料の軽減も確認</strong>
<p>同時在園の場合、2人目は保育料が半額になります。3人目以降は無料です。</p>
</div>
</div>

<h2>注意点：上の子が小規模保育の場合</h2>
<p>上の子が小規模保育に通っている場合、2歳児クラスで卒園するため、下の子の保活時にはきょうだい優先がなくなる可能性があります。年齢差とタイミングを計算しておきましょう。</p>

<h2>保育料の軽減効果</h2>
<p>2人が同時に在園する場合、2人目の保育料は半額。月額3万円なら年間<span class="highlight">約18万円</span>の軽減になります。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>きょうだい優先の詳細は<a href="https://www.city.hiroshima.lg.jp/living/kosodate/1021251/1025852/1003487.html" target="_blank" rel="noopener">広島市の入園案内</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 55,
  },
];

registerArticles(articles);
