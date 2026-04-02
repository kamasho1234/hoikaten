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
];

registerArticles(articles);
