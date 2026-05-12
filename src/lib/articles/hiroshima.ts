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

  // ===== 追加記事 2026-04-07 =====
  {
    slug: "self-employed-score",
    citySlug: "hiroshima",
    title: "広島市で自営業・フリーランスが保育園に入るためのランク戦略",
    description: "広島市で自営業やフリーランスの方が保育園入園のランク制で不利にならないための対策を解説します。",
    image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>自営業・フリーランスのランク</h2>
<p>広島市では自営業・フリーランスも会社員と同じランク基準が適用されます。月の就労時間が<span class="highlight">160時間以上</span>ならAランクを取得できます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>自営業の場合、「就労状況申告書」と「開業届の写し」または「確定申告書の写し」が必要です。</p>
</div>

<h2>ランクを最大化するコツ</h2>
<div class="step">
<div class="step-num">1</div>
<div class="step-content"><strong>就労時間の記録を残す</strong><p>月160時間以上の就労実態を証明できるようにしましょう。</p></div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content"><strong>開業届を出しておく</strong><p>税務署への開業届は就労証明の基本です。</p></div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content"><strong>確定申告書を用意する</strong><p>事業実態の証明になります。</p></div>
</div>

<h2>広島市の低い方ルールに注意</h2>
<p>広島市は父母の低い方のランクが世帯ランクになります。自営業の方は配偶者のランクも重要です。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳細は<a href="https://www.city.hiroshima.lg.jp/living/kosodate/1021251/1025852/1003487.html" target="_blank" rel="noopener">広島市公式サイト</a>でご確認ください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 40,
  },
  {
    slug: "naishoku-score",
    citySlug: "hiroshima",
    title: "広島市で内職・在宅ワークの場合のランクと入園",
    description: "広島市で内職や在宅ワークをしている場合のランクの扱いと注意点を解説します。",
    image: "https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>在宅ワーク・内職のランク</h2>
<p>広島市では在宅ワーク（居宅内労働）も居宅外労働と<strong>同じランク基準</strong>が適用されます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>在宅ワークだからといってランクが下がることはありません。就労実態の証明が重要です。</p>
</div>

<h2>必要な証明書類</h2>
<table>
<tr><th>働き方</th><th>必要書類</th></tr>
<tr><td>業務委託・フリーランス</td><td>就労状況申告書＋開業届＋契約書等</td></tr>
<tr><td>内職</td><td>就労状況申告書＋内職証明書</td></tr>
<tr><td>在宅勤務（会社員）</td><td>就労証明書（在宅勤務の旨を記載）</td></tr>
</table>

<div class="info-box">
<p><strong>注意</strong></p>
<p>就労実態と申告内容に相違がある場合、利用取消の可能性があります。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 35,
  },
  {
    slug: "kyushoku-hokatsu",
    citySlug: "hiroshima",
    title: "広島市で求職中に保育園に申し込む方法とランク",
    description: "広島市で求職活動中の保育園申込とランクの扱いを解説します。",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>求職中でも申し込める</h2>
<p>広島市では「求職活動中」も保育を必要とする事由として認可保育園に申し込めます。</p>

<h2>求職中のランク</h2>
<p>求職活動中のランクはフルタイム就労（Aランク）より低く設定されています。人気園での入園は厳しい場合が多いです。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>求職中の場合、入園後<strong>90日以内</strong>に就労を開始する必要があります。</p>
</div>

<h2>ランクを上げる方法</h2>
<div class="step">
<div class="step-num">1</div>
<div class="step-content"><strong>先に就職先を決める</strong><p>内定があれば就労同等のランクが適用されます。</p></div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content"><strong>認可外に預けて就労開始</strong><p>認可外利用＋就労でランクと加点の両方を得られます。</p></div>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳細は<a href="https://www.city.hiroshima.lg.jp/living/kosodate/1021251/1025852/1003487.html" target="_blank" rel="noopener">広島市公式サイト</a>でご確認ください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 40,
  },
  {
    slug: "tenshoku-timing",
    citySlug: "hiroshima",
    title: "広島市で転職するタイミングと保育園への影響",
    description: "転職が広島市の保育園入園やランクに与える影響を解説します。",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>転職がランクに与える影響</h2>
<p>入園申込時の就労証明書は現在の勤務先のものが必要です。転職で就労時間が変わるとランクも変動します。</p>

<h2>入園後に転職する場合</h2>
<div class="point-box">
<p><strong>ポイント</strong></p>
<p>入園後の転職は可能ですが、新しい就労証明書を速やかに区の福祉課に提出してください。退職から再就職まで<strong>90日以内</strong>に就労開始が必要です。</p>
</div>

<h2>注意点</h2>
<ul>
<li>就労時間が大幅に減るとランクが下がり、保育の必要性を満たさなくなる場合があります</li>
<li>広島市は低い方ルールのため、片方の転職が世帯ランクに直結します</li>
</ul>

<div class="info-box">
<p><strong>注意</strong></p>
<p>詳細はお住まいの区の福祉課にご相談ください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 35,
  },
  {
    slug: "age2-nyuen",
    citySlug: "hiroshima",
    title: "広島市で2歳児クラスから入園するメリットと注意点",
    description: "広島市で2歳児クラスから保育園に入るメリットと競争率の傾向を解説します。",
    image: "https://images.unsplash.com/photo-1587654780291-39c9404d7dd0?w=800&h=400&fit=crop",
    category: "年齢別対策",
    categoryColor: "amber",
    content: `<h2>2歳児クラスの特徴</h2>
<p>2歳児クラスは4月1日時点で2歳の子どもが対象です。</p>

<h2>メリット</h2>
<ul>
<li>1歳児クラスに比べて競争率が低い園がある</li>
<li>小規模保育からの転園組がいるため枠が増える園もある</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>2歳児クラスは持ち上がりが多く新規募集枠が少ない園もあります。各園の募集予定数を確認しましょう。</p>
</div>

<h2>小規模保育からの連携枠</h2>
<p>広島市でも小規模保育の卒園児に連携先への優先枠が設けられている場合があります。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>各園の情報は<a href="https://www.city.hiroshima.lg.jp/living/kosodate/1021251/1025852/1003487.html" target="_blank" rel="noopener">広島市公式サイト</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 35,
  },
  {
    slug: "age3-ikou",
    citySlug: "hiroshima",
    title: "広島市で3歳児クラスへの移行・転園ガイド",
    description: "小規模保育からの3歳児クラスへの移行について広島市の制度を解説します。",
    image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&h=400&fit=crop",
    category: "年齢別対策",
    categoryColor: "amber",
    content: `<h2>3歳児クラスへの移行</h2>
<p>小規模保育は原則0〜2歳が対象。3歳で卒園するため認可保育園等への移行が必要です。</p>

<h2>連携施設の優先枠</h2>
<p>広島市では小規模保育事業所ごとに連携施設が設定されている場合があります。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>連携施設がない小規模保育もあります。入園前に確認しておきましょう。</p>
</div>

<h2>幼稚園の預かり保育も選択肢</h2>
<p>3歳からは幼稚園の預かり保育（新2号認定）も利用できます。</p>

<div class="info-box">
<p><strong>注意</strong></p>
<p>連携施設の情報は年度ごとに変わります。こども未来局にお問い合わせください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 30,
  },
  {
    slug: "nyuyoji-age0",
    citySlug: "hiroshima",
    title: "広島市の0歳児クラス入園ガイド",
    description: "広島市で0歳児クラスに入園する場合の月齢要件と注意点をまとめました。",
    image: "https://images.unsplash.com/photo-1544126592-807ade215a0b?w=800&h=400&fit=crop",
    category: "年齢別対策",
    categoryColor: "amber",
    content: `<h2>0歳児クラスの受入月齢</h2>
<p>広島市の認可保育園では多くの園が<span class="highlight">生後57日（産休明け）</span>から受入可能です。園によって異なります。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>4月入園の場合、4月1日時点で受入月齢を満たしている必要があります。</p>
</div>

<h2>0歳児クラスのメリット・デメリット</h2>
<ul>
<li>メリット：1歳児クラスより競争率が低い傾向</li>
<li>デメリット：育休を短縮する必要がある</li>
</ul>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>各園の受入月齢は<a href="https://www.city.hiroshima.lg.jp/living/kosodate/1021251/1025852/1003487.html" target="_blank" rel="noopener">広島市の保育施設一覧</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 40,
  },
  {
    slug: "nintei-kodomoen",
    citySlug: "hiroshima",
    title: "広島市の認定こども園ガイド　保育園との違い",
    description: "広島市の認定こども園の特徴と保育園との違いを解説します。",
    image: "https://images.unsplash.com/photo-1576495199011-eb94736d05d6?w=800&h=400&fit=crop",
    category: "施設の種類",
    categoryColor: "purple",
    content: `<h2>認定こども園とは</h2>
<p>保育園と幼稚園の機能を併せ持つ施設です。広島市内にも認定こども園があります。</p>

<h2>保育園との主な違い</h2>
<table>
<tr><th>項目</th><th>認可保育園</th><th>認定こども園</th></tr>
<tr><td>対象年齢</td><td>0〜5歳</td><td>0〜5歳</td></tr>
<tr><td>保護者の就労要件</td><td>必要</td><td>保育利用は必要、教育利用は不要</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>保育利用の入園申込は認可保育園と同じく区の福祉課を通じて行います。選考基準も同じランク制です。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>一覧は<a href="https://www.city.hiroshima.lg.jp/living/kosodate/1021251/1025852/1003487.html" target="_blank" rel="noopener">広島市公式サイト</a>でご確認ください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 35,
  },
  {
    slug: "kigyou-shudogata",
    citySlug: "hiroshima",
    title: "広島市の企業主導型保育園とは？認可との違い",
    description: "広島市にある企業主導型保育園の仕組みと活用法を解説します。",
    image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&h=400&fit=crop",
    category: "施設の種類",
    categoryColor: "purple",
    content: `<h2>企業主導型保育園とは</h2>
<p>企業が従業員のために設置する保育施設です。認可外ですが国から助成を受けています。</p>

<h2>認可保育園との違い</h2>
<table>
<tr><th>項目</th><th>認可保育園</th><th>企業主導型</th></tr>
<tr><td>申込先</td><td>区の福祉課</td><td>施設に直接</td></tr>
<tr><td>選考方法</td><td>ランク制</td><td>施設が決定</td></tr>
<tr><td>入園時期</td><td>主に4月</td><td>随時可能な場合が多い</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>「地域枠」があれば企業の従業員でなくても利用可能です。ランクが低い場合の選択肢として有効です。</p>
</div>

<div class="info-box">
<p><strong>注意</strong></p>
<p>企業主導型は認可外です。見学時に保育の質を確認しましょう。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 30,
  },
  {
    slug: "yakan-hoiku",
    citySlug: "hiroshima",
    title: "広島市の延長保育・夜間保育ガイド",
    description: "広島市で延長保育や夜間保育を利用する方法と料金を解説します。",
    image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&h=400&fit=crop",
    category: "施設の種類",
    categoryColor: "purple",
    content: `<h2>延長保育とは</h2>
<p>広島市の認可保育園では通常の保育時間を超えて利用できる延長保育があります。</p>

<h2>延長保育の料金目安</h2>
<table>
<tr><th>区分</th><th>料金の目安</th></tr>
<tr><td>延長保育（1時間）</td><td>月額2,000〜4,000円程度</td></tr>
<tr><td>延長保育（2時間）</td><td>月額4,000〜6,000円程度</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>料金は園ごとに異なります。入園前に希望園に確認しましょう。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>延長保育の実施園は<a href="https://www.city.hiroshima.lg.jp/living/kosodate/1021251/1025852/1003487.html" target="_blank" rel="noopener">広島市公式サイト</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 30,
  },
  {
    slug: "mushoka-seido",
    citySlug: "hiroshima",
    title: "広島市の幼児教育・保育無償化制度まとめ",
    description: "広島市における無償化制度の対象範囲と手続きを解説します。",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop",
    category: "お金・制度",
    categoryColor: "rose",
    content: `<h2>無償化の対象</h2>
<table>
<tr><th>対象</th><th>無償化の内容</th></tr>
<tr><td>3〜5歳児（認可保育園）</td><td>保育料が無料</td></tr>
<tr><td>0〜2歳児（非課税世帯）</td><td>保育料が無料</td></tr>
<tr><td>認可外（3〜5歳）</td><td>月額37,000円まで無償</td></tr>
<tr><td>認可外（0〜2歳、非課税世帯）</td><td>月額42,000円まで無償</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>無償化は「保育料」のみ。給食費・教材費等は別途必要です。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳細は<a href="https://www.city.hiroshima.lg.jp/living/kosodate/1021251/1025852/1003487.html" target="_blank" rel="noopener">広島市公式サイト</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 45,
  },
  {
    slug: "shokuhi-jippi",
    citySlug: "hiroshima",
    title: "広島市の保育園の給食費（副食費）はいくら？【令和8年度版】免除条件と金額",
    description: "広島市の保育園の給食費（副食費）は月いくら？所得・子ども数による副食費免除の条件と申請方法、保育料無償化の範囲と実費負担の全額をわかりやすく解説。令和8年度対応。",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=400&fit=crop",
    category: "お金・制度",
    categoryColor: "rose",
    content: `<h2>給食費の目安</h2>
<table>
<tr><th>年齢</th><th>主食費</th><th>副食費</th></tr>
<tr><td>0〜2歳児</td><td colspan="2">保育料に含まれる</td></tr>
<tr><td>3〜5歳児</td><td>月額約1,000〜3,000円</td><td>月額約4,500円</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>年収360万円未満相当の世帯や第3子以降は副食費が免除されます。</p>
</div>

<div class="info-box">
<p><strong>注意</strong></p>
<p>金額は園によって異なります。各園にお問い合わせください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 35,
  },
  {
    slug: "hoikuryo-keisan",
    citySlug: "hiroshima",
    title: "広島市の保育料計算【令和8年度版】年収別の金額シミュレーション",
    description: "広島市の認可保育園の保育料（利用者負担額）を年収別に詳しく解説。3歳未満・3歳以上の計算方法、無償化の対象確認、副食費・第2子以降の減額制度まで。令和8年度対応。",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop",
    category: "お金・制度",
    categoryColor: "rose",
    content: `<h2>保育料の計算の仕組み</h2>
<p>広島市の保育料は世帯の<strong>市民税所得割額</strong>（父母合算）で決定されます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>3〜5歳児は無償化で0円。以下は0〜2歳児に適用されます。</p>
</div>

<h2>保育料の目安（0〜2歳児）</h2>
<table>
<tr><th>市民税所得割額</th><th>月額保育料の目安</th></tr>
<tr><td>非課税世帯</td><td>0円</td></tr>
<tr><td>〜約57,700円未満</td><td>約5,000〜14,000円</td></tr>
<tr><td>〜約169,000円未満</td><td>約18,000〜38,000円</td></tr>
<tr><td>169,000円以上</td><td>約42,000〜55,000円</td></tr>
</table>

<h2>多子世帯の軽減</h2>
<ul>
<li>同時在園の2人目：半額</li>
<li>同時在園の3人目以降：無料</li>
</ul>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>正確な保育料表は<a href="https://www.city.hiroshima.lg.jp/living/kosodate/1021251/1025852/1003487.html" target="_blank" rel="noopener">広島市公式サイト</a>でご確認ください。上記は目安です。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 40,
  },
  {
    slug: "zeikin-koujo",
    citySlug: "hiroshima",
    title: "保育料と税金の関係　広島市で控除を活用する方法",
    description: "広島市の保育料は市民税額で決まります。控除を活用して保育料を下げる方法を解説します。",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop",
    category: "お金・制度",
    categoryColor: "rose",
    content: `<h2>保育料と市民税の関係</h2>
<p>広島市の保育料は「市民税所得割額」で決まります。</p>

<h2>活用できる主な控除</h2>
<table>
<tr><th>控除の種類</th><th>効果</th></tr>
<tr><td>医療費控除</td><td>年間10万円超の医療費で申告可能</td></tr>
<tr><td>iDeCo</td><td>掛金が全額所得控除</td></tr>
<tr><td>生命保険料控除</td><td>確定申告で追加可能</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>ふるさと納税は保育料の「所得割額」には影響しないことが一般的です。iDeCoや医療費控除が効果的です。</p>
</div>

<div class="info-box">
<p><strong>注意</strong></p>
<p>控除の適用は個別に異なります。税務署や区の福祉課にご相談ください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 30,
  },
  {
    slug: "shurou-shoumeisho",
    citySlug: "hiroshima",
    title: "広島市の就労証明書の書き方と注意点",
    description: "広島市の保育園申込に必要な就労証明書の記入ポイントを解説します。",
    image: "https://images.unsplash.com/photo-1568667256549-094345857637?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>就労証明書とは</h2>
<p>保護者の就労状況を証明する書類です。勤務先に作成を依頼します。</p>

<h2>記入のポイント</h2>
<div class="step">
<div class="step-num">1</div>
<div class="step-content"><strong>広島市指定の様式を使う</strong><p>市公式サイトからダウンロードできます。</p></div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content"><strong>月の就労時間を正確に記入</strong><p>就労時間がランクに直結します。160時間以上ならAランクです。</p></div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content"><strong>証明者の押印</strong><p>会社の代表者印が必要です。</p></div>
</div>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>広島市は低い方ルールのため、父母双方の就労証明書が重要です。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>様式は<a href="https://www.city.hiroshima.lg.jp/living/kosodate/1021251/1025852/1003487.html" target="_blank" rel="noopener">広島市公式サイト</a>からダウンロードできます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 45,
  },
  {
    slug: "shinsei-shorui-list",
    citySlug: "hiroshima",
    title: "広島市の保育園申込に必要な書類チェックリスト",
    description: "広島市の保育園入園申込に必要な書類をまとめました。",
    image: "https://images.unsplash.com/photo-1568667256549-094345857637?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>全員必須の書類</h2>
<ul>
<li>教育・保育給付認定申請書兼利用申込書</li>
<li>就労証明書等（父母それぞれ）</li>
<li>マイナンバー確認書類</li>
</ul>

<h2>該当者のみ必要な書類</h2>
<table>
<tr><th>状況</th><th>追加書類</th></tr>
<tr><td>ひとり親</td><td>児童扶養手当証書の写し等</td></tr>
<tr><td>自営業</td><td>開業届・確定申告書の写し</td></tr>
<tr><td>育休中</td><td>育休期間のわかる書類</td></tr>
<tr><td>認可外利用中</td><td>在園証明書</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>書類の不備は受付が遅れる原因になります。区の福祉課で事前確認しましょう。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳細は<a href="https://www.city.hiroshima.lg.jp/living/kosodate/1021251/1025852/1003487.html" target="_blank" rel="noopener">広島市「保育園等の入園案内」</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 40,
  },
  {
    slug: "niji-shinsei-flow",
    citySlug: "hiroshima",
    title: "広島市の保育園2次受付の流れと対策",
    description: "広島市の1次で入園できなかった場合の2次受付の流れを解説します。",
    image: "https://images.unsplash.com/photo-1484820540004-14229fe36ca4?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>2次受付とは</h2>
<p>1次選考後に空きがある園について追加募集が行われます。</p>

<h2>2次の流れ</h2>
<div class="step">
<div class="step-num">1</div>
<div class="step-content"><strong>1次結果通知を確認</strong><p>2月下旬に届きます。</p></div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content"><strong>2次受付に申込</strong><p>空きのある園について追加申込できます。</p></div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content"><strong>2次結果通知</strong><p>3月中旬に届きます。</p></div>
</div>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>2次で空きのある園は限られます。通える範囲で幅広く検討しましょう。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>2次の詳細は1次結果通知後に公表されます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 40,
  },
  {
    slug: "tenkyo-hokatsu",
    citySlug: "hiroshima",
    title: "広島市への転居を伴う保活ガイド",
    description: "他の自治体から広島市へ転居予定の場合の保育園申込方法を解説します。",
    image: "https://images.unsplash.com/photo-1516156008625-3a9d6067fab5?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>市外からの転入と保活</h2>
<p>広島市への転入予定がある場合、転入前でも保育園の申込が可能です。</p>

<h2>申込の流れ</h2>
<div class="step">
<div class="step-num">1</div>
<div class="step-content"><strong>転入先の区の福祉課に相談</strong><p>電話で事前相談しましょう。</p></div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content"><strong>必要書類の準備</strong><p>転入を証明する書類が追加で必要です。</p></div>
</div>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>入園月の前月末までに広島市に住民票を移す必要があります。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳細は転入予定の区の福祉課にお問い合わせください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 30,
  },
  {
    slug: "kyoiku-hoiku-chigai",
    citySlug: "hiroshima",
    title: "広島市の保育園と幼稚園の違い",
    description: "広島市の保育園と幼稚園の違いを比較します。",
    image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&h=400&fit=crop",
    category: "施設の種類",
    categoryColor: "purple",
    content: `<h2>保育園と幼稚園の基本的な違い</h2>
<table>
<tr><th>項目</th><th>保育園</th><th>幼稚園</th></tr>
<tr><td>対象年齢</td><td>0〜5歳</td><td>3〜5歳</td></tr>
<tr><td>利用時間</td><td>最大11時間</td><td>4〜5時間＋預かり保育</td></tr>
<tr><td>保護者の要件</td><td>就労等が必要</td><td>不要</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>共働きなら保育園、教育重視なら幼稚園が一般的です。認定こども園なら両方の機能を備えています。</p>
</div>

<h2>幼稚園の預かり保育（新2号認定）</h2>
<p>月額11,300円まで無償化の対象です。</p>

<div class="info-box">
<p><strong>注意</strong></p>
<p>預かり保育の実施時間は園によって異なります。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 35,
  },
  {
    slug: "hokatsu-calendar",
    citySlug: "hiroshima",
    title: "広島市の保活カレンダー　月別やることリスト",
    description: "広島市で4月入園を目指す方のための月別保活カレンダーです。",
    image: "https://images.unsplash.com/photo-1506784365847-bbad939e9335?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>保活カレンダー（4月入園の場合）</h2>
<table>
<tr><th>時期</th><th>やること</th></tr>
<tr><td>4〜6月</td><td>情報収集開始。ランク制度を理解</td></tr>
<tr><td>7〜10月</td><td>保育園見学</td></tr>
<tr><td>11月</td><td>申込書ダウンロード開始・就労証明書を依頼</td></tr>
<tr><td>11月〜1月</td><td>申込書類提出</td></tr>
<tr><td>2月下旬</td><td>1次結果通知</td></tr>
<tr><td>3月</td><td>2次受付・入園準備</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>広島市の申込期間は11月〜1月と比較的長めです。余裕を持って準備しましょう。</p>
</div>

<div class="info-box">
<p><strong>注意</strong></p>
<p>日程は年度によって変わります。最新情報は広島市公式サイトでご確認ください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 45,
  },
  {
    slug: "souba-tensuu",
    citySlug: "hiroshima",
    title: "広島市の保育園入園に必要なランクの目安",
    description: "広島市の保育園入園に必要なランクの目安をエリア別に解説します。",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>入園に必要なランクの目安</h2>
<p>広島市の認可保育園入園では<span class="highlight">Aランク</span>（父母とも月160時間以上就労）が基本ラインです。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>同じAランクの中では「調整点数」で優先順位が決まります。きょうだい加点や認可外利用の加点がある方が有利です。</p>
</div>

<h2>エリア別の傾向</h2>
<table>
<tr><th>エリア</th><th>競争率の傾向</th></tr>
<tr><td>中区</td><td>中心部で人気。1歳児は激戦</td></tr>
<tr><td>南区</td><td>駅周辺は競争率高め</td></tr>
<tr><td>西区</td><td>エリアにより差がある</td></tr>
<tr><td>安佐南区</td><td>住宅地で保育需要が高い</td></tr>
<tr><td>安佐北区</td><td>比較的入りやすい傾向</td></tr>
</table>

<div class="info-box">
<p><strong>注意</strong></p>
<p>上記は一般的な傾向です。最新情報は区の福祉課でご確認ください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 45,
  },
  {
    slug: "ku-betsu-bairitsu",
    citySlug: "hiroshima",
    title: "広島市の区別・保育園入園倍率の傾向",
    description: "広島市8区の保育園入園の競争率の傾向を紹介します。",
    image: "https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=800&h=400&fit=crop",
    category: "エリア情報",
    categoryColor: "teal",
    content: `<h2>広島市8区の入園傾向</h2>
<table>
<tr><th>区</th><th>傾向</th></tr>
<tr><td>中区</td><td>中心部で人気。1歳児は激戦</td></tr>
<tr><td>東区</td><td>比較的入りやすい園もある</td></tr>
<tr><td>南区</td><td>広島駅周辺は競争率高め</td></tr>
<tr><td>西区</td><td>エリアにより差が大きい</td></tr>
<tr><td>安佐南区</td><td>住宅地で保育需要が高い</td></tr>
<tr><td>安佐北区</td><td>比較的入りやすい傾向</td></tr>
<tr><td>安芸区</td><td>比較的入りやすい</td></tr>
<tr><td>佐伯区</td><td>五日市周辺はやや競争率高め</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>区をまたいだ申込も可能です。隣の区の園も検討しましょう。</p>
</div>

<div class="info-box">
<p><strong>注意</strong></p>
<p>上記は一般的な傾向です。最新の情報は各区の福祉課にお問い合わせください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 40,
  },
  {
    slug: "ikukyu-enchou-risk-detail",
    citySlug: "hiroshima",
    title: "広島市で育休延長する場合のリスクと保活への影響",
    description: "広島市で育休を延長する場合の保活への影響と注意点を解説します。",
    image: "https://images.unsplash.com/photo-1531983412531-1f49a365ffed?w=800&h=400&fit=crop",
    category: "育休・復職",
    categoryColor: "purple",
    content: `<h2>育休延長と不承諾通知</h2>
<p>育休延長には保育園の「不承諾通知」が必要です。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>2025年4月以降、育休延長目的での保育園申込についてハローワークの確認が厳格化されています。</p>
</div>

<h2>育休延長のリスク</h2>
<ul>
<li>1歳児クラスは最も激戦で延長後はさらに厳しくなる</li>
<li>広島市のランク制では、復職後の就労時間も重要</li>
</ul>

<h2>対策</h2>
<ul>
<li>入園可能な園があれば入園する方が安全</li>
<li>認可外保育施設も検討する</li>
</ul>

<div class="info-box">
<p><strong>注意</strong></p>
<p>最新の情報はハローワークおよび勤務先にご確認ください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 40,
  },
  {
    slug: "fukushoku-junbi",
    citySlug: "hiroshima",
    title: "広島市で保育園入園後の復職準備チェックリスト",
    description: "広島市で保育園内定後から復職までにやることを解説します。",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=400&fit=crop",
    category: "育休・復職",
    categoryColor: "purple",
    content: `<h2>復職までのチェックリスト</h2>
<div class="step">
<div class="step-num">1</div>
<div class="step-content"><strong>勤務先に復職日を連絡</strong><p>慣らし保育期間を考慮しましょう。</p></div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content"><strong>入園説明会に出席</strong><p>持ち物や生活の流れを確認します。</p></div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content"><strong>入園準備品の購入</strong><p>園のリストに従って準備します。</p></div>
</div>
<div class="step">
<div class="step-num">4</div>
<div class="step-content"><strong>病児保育・ファミサポの登録</strong><p>バックアッププランを用意しましょう。</p></div>
</div>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>慣らし保育（1〜2週間）中は仕事を休む必要があります。</p>
</div>

<div class="info-box">
<p><strong>注意</strong></p>
<p>準備品は園によって異なります。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 35,
  },
  {
    slug: "sannin-me-hokatsu",
    citySlug: "hiroshima",
    title: "広島市で3人目の保活　多子世帯の優遇制度",
    description: "広島市で3人目以降の保活における優遇制度と戦略を解説します。",
    image: "https://images.unsplash.com/photo-1475503572774-15a45e5d60b9?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>保育料の軽減</h2>
<table>
<tr><th>子ども</th><th>保育料</th></tr>
<tr><td>1人目</td><td>通常額</td></tr>
<tr><td>同時在園の2人目</td><td>半額</td></tr>
<tr><td>同時在園の3人目以降</td><td>無料</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>0〜2歳児の3人目以降は保育料無料です。きょうだい優先制度も活用しましょう。</p>
</div>

<h2>3人目保活のコツ</h2>
<ul>
<li>上の子と同じ園を第一希望にしてきょうだい優先を活用</li>
<li>送迎動線を考えて園を選ぶ</li>
</ul>

<div class="info-box">
<p><strong>注意</strong></p>
<p>制度は年度によって変更される場合があります。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 30,
  },
  {
    slug: "tanshin-funin",
    citySlug: "hiroshima",
    title: "広島市で単身赴任中の場合の保育園申込",
    description: "配偶者が単身赴任中の場合の広島市での保育園申込とランクへの影響を解説します。",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>単身赴任中の保育園申込</h2>
<p>配偶者が単身赴任で別居していても申込は可能です。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>単身赴任であっても「ひとり親世帯」の優遇は適用されません。離婚・死別等の場合に限られます。</p>
</div>

<h2>必要な追加書類</h2>
<ul>
<li>配偶者の就労証明書</li>
<li>単身赴任であることがわかる書類</li>
</ul>

<h2>ランクへの影響</h2>
<p>広島市は低い方ルールのため、単身赴任中の配偶者のランクも世帯ランクに影響します。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳しくは区の福祉課にお問い合わせください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 25,
  },
  {
    slug: "sofu-sobo-doukyo",
    citySlug: "hiroshima",
    title: "広島市で祖父母と同居している場合の保育園入園への影響",
    description: "祖父母と同居している場合の広島市の入園選考への影響を解説します。",
    image: "https://images.unsplash.com/photo-1475503572774-15a45e5d60b9?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>祖父母同居と保育の必要性</h2>
<p>広島市では祖父母と同居していることだけで保育の必要性が否定されることはありません。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>同居の祖父母が65歳未満で無職の場合、選考で不利になる可能性があります。</p>
</div>

<h2>対策</h2>
<ul>
<li>祖父母が就労している場合は就労証明書を提出</li>
<li>祖父母が病気等の場合はその証明書を提出</li>
<li>65歳以上は影響なしが一般的</li>
</ul>

<div class="info-box">
<p><strong>注意</strong></p>
<p>条件は年度によって変わります。区の福祉課にお問い合わせください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 30,
  },
  {
    slug: "fushoninchi-taiou",
    citySlug: "hiroshima",
    title: "広島市で保育園に入れなかった場合の対応策まとめ",
    description: "広島市の1次選考で入園できなかった場合の対応策を解説します。",
    image: "https://images.unsplash.com/photo-1494883759339-0b042055a4ee?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>入園できなかったら</h2>
<p>1次選考で入園できなくても選択肢はあります。</p>

<h2>対応策</h2>
<div class="step">
<div class="step-num">1</div>
<div class="step-content"><strong>2次受付に申込</strong><p>空きのある園に追加申込できます。</p></div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content"><strong>認可外保育施設を探す</strong><p>企業主導型等を検討しましょう。</p></div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content"><strong>育休延長を検討</strong><p>不承諾通知で育休延長が可能です。</p></div>
</div>
<div class="step">
<div class="step-num">4</div>
<div class="step-content"><strong>途中入園を待つ</strong><p>毎月空きが出る可能性があります。</p></div>
</div>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>不承諾通知は大切に保管してください。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>2次受付の詳細は1次結果通知後に区の福祉課で確認できます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 45,
  },
  {
    slug: "taiki-jidou-taisaku",
    citySlug: "hiroshima",
    title: "広島市の待機児童の現状と対策（2026年版）",
    description: "広島市の待機児童の傾向と市の対策について解説します。",
    image: "https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=800&h=400&fit=crop",
    category: "エリア情報",
    categoryColor: "teal",
    content: `<h2>広島市の待機児童の状況</h2>
<p>広島市は待機児童対策に取り組んでおり、待機児童数は減少傾向です。ただし中区・安佐南区を中心に入園が厳しいエリアがあります。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>特に中区・安佐南区の1歳児クラスは競争率が高めです。Aランクでも調整点数が必要な場合があります。</p>
</div>

<h2>市の対策</h2>
<ul>
<li>保育施設の新設・定員増</li>
<li>保育士の処遇改善</li>
<li>小規模保育の拡充</li>
</ul>

<h2>保護者側の対策</h2>
<ul>
<li>希望園を幅広く記入する</li>
<li>隣の区の園も検討する</li>
<li>0歳4月入園を検討する</li>
</ul>

<div class="info-box">
<p><strong>注意</strong></p>
<p>最新データはこども未来局の公式サイトでご確認ください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 40,
  },
  {
    slug: "tennen-moshikomi",
    citySlug: "hiroshima",
    title: "広島市の保育園への転園申込の方法",
    description: "広島市で保育園の転園を希望する場合の手続きを解説します。",
    image: "https://images.unsplash.com/photo-1516156008625-3a9d6067fab5?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>転園申込とは</h2>
<p>現在通っている保育園から別の園に移りたい場合の手続きです。</p>

<h2>流れ</h2>
<div class="step">
<div class="step-num">1</div>
<div class="step-content"><strong>区の福祉課に相談</strong><p>転園希望を伝えます。</p></div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content"><strong>申込書類の提出</strong><p>新規入園と同じ書類が必要です。</p></div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content"><strong>利用調整</strong><p>新規と同じランク制で選考されます。</p></div>
</div>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>転園が決まらなくても今の園に通い続けられます。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>手続きの詳細は区の福祉課にお問い合わせください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 30,
  },
];

registerArticles(articles);
