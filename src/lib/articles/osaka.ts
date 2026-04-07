import type { Article } from "./types";
import { registerArticles } from "./index";

const articles: Article[] = [
  // ===== 保活の基本 (2) =====
  {
    slug: "hokatsu-schedule",
    citySlug: "osaka",
    title: "大阪市の保活スケジュール完全ガイド｜令和8年度4月入園",
    description:
      "大阪市の認可保育園の申込時期・選考の流れ・結果通知の時期をわかりやすく解説。令和8年度4月入園のスケジュールを中心にまとめました。",
    image:
      "https://images.unsplash.com/photo-1484820540004-14229fe36ca4?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>令和8年度（2026年度）4月入園のスケジュール</h2>
<p>大阪市の4月一斉入所は、<strong>1次調整</strong>と<strong>2次調整</strong>の2段階で行われます。申込は各区の保健福祉センターで受け付けています。</p>

<h3>1次調整</h3>
<table>
<tr><th>項目</th><th>日程</th></tr>
<tr><td>申込書配付開始</td><td>令和7年9月4日</td></tr>
<tr><td>募集予定人数の公表</td><td>令和7年9月8日</td></tr>
<tr><td>申込受付期間</td><td>令和7年10月1日〜10月15日</td></tr>
<tr><td>結果通知発送</td><td>令和8年1月26日</td></tr>
</table>

<h3>2次調整</h3>
<table>
<tr><th>項目</th><th>日程</th></tr>
<tr><td>空き情報の公表</td><td>令和8年1月26日</td></tr>
<tr><td>希望変更・不足書類提出期限</td><td>令和8年2月6日</td></tr>
<tr><td>結果通知発送</td><td>令和8年2月27日</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>1次調整で不承諾だった方は、自動的に2次調整の対象となります。ただし希望施設の変更は2月6日までに手続きが必要です。</p>
</div>

<h2>いつから動き始めるべき？</h2>
<div class="step">
<div class="step-num">1</div>
<div class="step-content"><strong>4月〜6月：情報収集</strong><p>大阪市の保育施設の種類やエリアごとの特徴を調べましょう。</p></div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content"><strong>6月〜9月：保育園見学</strong><p>気になる園に電話して見学予約。夏場が見学のベストシーズンです。</p></div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content"><strong>9月：「利用の案内」を入手</strong><p>大阪市が発行する保活ガイド。区の窓口または市の公式サイトで入手できます。</p></div>
</div>
<div class="step">
<div class="step-num">4</div>
<div class="step-content"><strong>10月上旬：申込書類の提出</strong><p>就労証明書などを揃えて、お住まいの区の保健福祉センターに提出します。</p></div>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>申込受付は事前にオンライン予約が必要です。大阪市行政オンラインシステムで予約してから窓口に行きましょう。詳しくは<a href="https://www.city.osaka.lg.jp/kodomo/page/0000658390.html" target="_blank" rel="noopener">大阪市公式サイト</a>をご確認ください。</p>
</div>

<h2>途中入園（5月〜3月）の申込</h2>
<p>途中入園の申込は随時受け付けています。空き状況は大阪市の公式サイトで毎月更新されますので、こまめにチェックしましょう。</p>`,
    publishedAt: "2026-03-28",
    popularity: 55,
  },
  {
    slug: "ward-characteristics",
    citySlug: "osaka",
    title: "大阪市24区の保活事情｜区別の特徴と入りやすさ",
    description:
      "大阪市24区それぞれの保活の特徴を解説。子育て世帯が多いエリアや比較的入りやすい区の傾向をまとめました。",
    image:
      "https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>大阪市24区の保活は区によって大きく違う</h2>
<p>大阪市は24の行政区から構成されています。区によって保育施設の数、申込倍率、子育て世帯の数が大きく異なるため、保活の難易度も変わります。</p>

<h3>競争が激しい傾向のエリア</h3>
<p>以下の区は子育て世帯の流入が多く、人気園は激戦になりやすい傾向があります。</p>
<ul>
<li><strong>北区・中央区・西区・天王寺区・福島区</strong>：都心部でタワーマンション建設が進み、若い子育て世帯が急増</li>
<li><strong>阿倍野区・住吉区</strong>：教育環境の良さから人気が高い</li>
</ul>

<h3>比較的入りやすい傾向のエリア</h3>
<ul>
<li><strong>平野区・東住吉区・生野区</strong>：保育施設数が多く、定員に余裕がある園も</li>
<li><strong>此花区・大正区・港区</strong>：人口流入が落ち着いており、競争率が低め</li>
</ul>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>上記はあくまで傾向です。同じ区内でも園によって倍率は大きく異なります。必ず希望する園ごとの申込状況を確認してください。</p>
</div>

<h2>申込状況の確認方法</h2>
<p>大阪市では、一斉入所の申込締切後に<strong>施設ごとの申込状況</strong>（申込数と募集数）が公表されます。2次調整前には空き情報も公開されます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>区をまたいでの申込も可能です。自宅近くの園だけでなく、通勤経路上の他区の園も検討すると選択肢が広がります。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>申込状況は<a href="https://www.city.osaka.lg.jp/kodomo/page/0000659771.html" target="_blank" rel="noopener">大阪市公式サイト「保育施設等利用申込み状況の公表」</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 60,
  },

  // ===== 点数・選考 (4) =====
  {
    slug: "scoring-system-guide",
    citySlug: "osaka",
    title: "大阪市の保育園入園点数のしくみ｜基本点数と調整指数を解説",
    description:
      "大阪市の保育園入園選考で使われる点数制度を解説。基本点数（父母各100点）と調整指数のしくみをわかりやすくまとめました。",
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>点数制のしくみ</h2>
<p>大阪市の認可保育園の入園選考は、<strong>利用調整基準</strong>に基づく点数制で行われます。定員を超える申込があった場合、点数の高い順に入園が決まります。</p>

<h3>基本点数</h3>
<p>父・母それぞれに<strong>最大100点</strong>が付き、合計<strong>最大200点</strong>が基本点数となります。</p>

<table>
<tr><th>保育の必要性の事由</th><th>点数（目安）</th></tr>
<tr><td>居宅外就労（月20日以上・週40時間以上）</td><td>100点</td></tr>
<tr><td>居宅外就労（月16日以上・週30時間以上）</td><td>90点</td></tr>
<tr><td>居宅外就労（月16日以上・週24時間以上）</td><td>80点</td></tr>
<tr><td>疾病・障がい</td><td>100点</td></tr>
<tr><td>出産（前後各2か月）</td><td>100点</td></tr>
<tr><td>求職活動</td><td>60点</td></tr>
</table>

<h3>調整指数</h3>
<p>基本点数に加えて、世帯の状況に応じた加点・減点があります。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>フルタイム共働き（週40時間以上）の場合は基本点数だけで200点になります。200点が「スタートライン」と考え、調整指数でいかに加点できるかが勝負の分かれ目です。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>利用調整基準の詳細は<a href="https://www.city.osaka.lg.jp/kodomo/page/0000656530.html" target="_blank" rel="noopener">大阪市公式サイト「保育施設・保育事業利用の案内」</a>に掲載されています。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 65,
  },
  {
    slug: "score-up-tips",
    citySlug: "osaka",
    title: "大阪市で保育園の点数を上げる方法｜調整指数の加点項目まとめ",
    description:
      "大阪市の保活で点数アップにつながる調整指数の加点項目を網羅的に解説。認可外利用、育休復帰、きょうだい加点などを整理しました。",
    image:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>大阪市の主な加点項目</h2>
<p>大阪市の調整指数には加点と減点の項目があります。以下は主な加点項目です。</p>

<table>
<tr><th>加点項目</th><th>加点</th></tr>
<tr><td>ひとり親世帯</td><td>+9点</td></tr>
<tr><td>育休明け復帰（利用開始月中に復帰）</td><td>+7点</td></tr>
<tr><td>きょうだいが同一施設に在園中</td><td>+7点</td></tr>
<tr><td>認可外保育施設の利用（月48時間以上・有償）</td><td>+5点 または +7点</td></tr>
<tr><td>生活保護世帯</td><td>+5点</td></tr>
<tr><td>きょうだい同時申込（同一施設希望）</td><td>+3点</td></tr>
</table>

<h3>認可外利用での加点</h3>
<p>認可外保育施設に月48時間以上預けており、有償で利用している実績があると加点されます。利用期間によって+5点または+7点の差があります。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>認可外を利用している場合は必ず<strong>在園証明書</strong>を添付しましょう。証明がないと加点されません。</p>
</div>

<h3>注意すべき減点項目</h3>
<p>祖父母が近居（同一区内等）で保育できる状況にある場合、減点がされることがあります。</p>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>加点・減点の項目や点数は年度によって変更される場合があります。必ず最新の「保育施設・保育事業利用の案内」で確認してください。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>利用調整基準は<a href="https://www.city.osaka.lg.jp/kodomo/page/0000656530.html" target="_blank" rel="noopener">大阪市公式サイト</a>で公開されています。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 100,
  },
  {
    slug: "200-point-wall",
    citySlug: "osaka",
    title: "大阪市「200点の壁」とは？フルタイム共働きでも安心できない理由",
    description:
      "大阪市の保活で「200点の壁」と呼ばれる現象を解説。フルタイム共働きの基本点数200点だけでは入園が難しい人気園の実態をまとめました。",
    image:
      "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>「200点の壁」とは？</h2>
<p>大阪市の点数制では、父母ともにフルタイム勤務（週40時間以上）の場合、基本点数は<strong>100点+100点＝200点</strong>となります。しかし人気園では200点の世帯がずらりと並ぶため、200点だけでは入れないことがあります。これが「200点の壁」です。</p>

<h3>200点では入れない園がある</h3>
<p>特に北区・中央区・西区・天王寺区などの都心部や、0歳児・1歳児クラスでは、200点＋調整指数の加点がある世帯が多く、基本点数のみでは不利になります。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>200点はあくまで「スタートライン」。調整指数でいかに加点できるかが合否を分けます。</p>
</div>

<h2>200点の壁を超えるには</h2>
<ul>
<li><strong>認可外保育施設の利用実績</strong>をつくる（+5〜+7点）</li>
<li><strong>育休明け復帰</strong>のタイミングを利用開始月に合わせる（+7点）</li>
<li><strong>きょうだいが同一施設に在園</strong>していれば活用する（+7点）</li>
<li>希望園の<strong>申込状況を確認</strong>し、倍率の低い園も候補に入れる</li>
</ul>

<h2>同点の場合はどうなる？</h2>
<p>同じ点数の場合は、大阪市が定める<strong>優先順位</strong>で選考されます。保育の必要性の事由や世帯状況によって順位が決まるため、点数が同じでも結果が変わります。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>点数が同じ場合の優先順位の詳細は、利用の案内に記載されています。当サイトの「同点時の優先順位」記事もあわせてご確認ください。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 95,
  },
  {
    slug: "tiebreaker-rules",
    citySlug: "osaka",
    title: "大阪市の同点時の優先順位｜点数が並んだらどう決まる？",
    description:
      "大阪市の保育園選考で同じ点数になった場合の優先順位を解説。どの事由が優先されるのか、順番をまとめました。",
    image:
      "https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>同点の場合の優先順位</h2>
<p>大阪市の利用調整では、点数が同じ世帯が複数いる場合、以下の順序で優先されます。</p>

<h3>保育の必要性の事由による優先順位</h3>
<ol>
<li>災害復旧</li>
<li>就労（親族以外に保育を委託）</li>
<li>就労（親族に保育を委託）</li>
<li>就労内定</li>
<li>ひとり親世帯での求職活動</li>
<li>疾病・障がい</li>
<li>障がい児（者）等の介護・看護</li>
<li>介護・看護</li>
<li>就学・職業訓練</li>
<li>出産</li>
<li>求職活動</li>
</ol>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>「就労」の中でも、親族に預けているか、親族以外（認可外保育施設など）に預けているかで優先順位が変わります。認可外を利用していると、調整指数の加点に加えて、同点時にも有利になります。</p>
</div>

<h2>さらに同じ場合は？</h2>
<p>事由の優先順位も同じ場合は、さらに世帯の状況（所得や世帯構成など）で判断されます。具体的な基準はすべて公開されているわけではありません。</p>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>優先順位の詳細は年度によって変更されることがあります。最新の利用調整基準を必ず確認してください。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>利用調整基準は<a href="https://www.city.osaka.lg.jp/kodomo/page/0000656530.html" target="_blank" rel="noopener">大阪市公式サイト「保育施設・保育事業利用の案内」</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 85,
  },

  // ===== 認可外 (2) =====
  {
    slug: "ninkagai-score-bonus",
    citySlug: "osaka",
    title: "大阪市で認可外保育施設を使って加点を得る方法",
    description:
      "大阪市の保活で認可外保育施設の利用実績を調整指数の加点につなげる方法と注意点を解説します。",
    image:
      "https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=800&h=400&fit=crop",
    category: "認可外",
    categoryColor: "purple",
    content: `<h2>認可外利用で調整指数が加点される仕組み</h2>
<p>大阪市の利用調整基準では、認可外保育施設に子どもを預けて就労している場合、<strong>調整指数が+5点または+7点</strong>加算されます。</p>

<h3>加点の条件</h3>
<ul>
<li>認可外保育施設に<strong>月48時間以上</strong>預けていること</li>
<li><strong>有償</strong>で利用していること（無償の預かりは対象外）</li>
<li>利用していることを証明する<strong>在園証明書</strong>を提出すること</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>利用期間によって+5点か+7点かが変わります。長期間利用しているほど高い加点が得られる傾向があります。詳細は最新の利用調整基準をご確認ください。</p>
</div>

<h2>加点を得るためのスケジュール</h2>
<div class="step">
<div class="step-num">1</div>
<div class="step-content"><strong>4月〜6月：認可外保育施設を探す</strong><p>空き状況を確認し、見学・申込を行います。</p></div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content"><strong>利用開始</strong><p>月48時間以上の有償利用を継続します。</p></div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content"><strong>10月：認可保育園の申込時に在園証明書を添付</strong><p>認可外の利用実績を証明する書類を必ず提出します。</p></div>
</div>

<h2>注意点</h2>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>認可外の費用は月額3〜8万円程度かかります。加点目的だけで利用するにはコストがかかるため、家計への影響も考慮して判断しましょう。また、認可外の無償化制度が利用できるか事前に確認してください。</p>
</div>

<h2>同点時にも有利</h2>
<p>認可外に預けて就労している場合、同点時の優先順位でも「親族以外に保育を委託して就労」として有利に扱われます。加点と優先順位の両面でメリットがあります。</p>`,
    publishedAt: "2026-03-28",
    popularity: 75,
  },
  {
    slug: "rejected-options",
    citySlug: "osaka",
    title: "大阪市で認可保育園に落ちた場合の選択肢",
    description:
      "大阪市の認可保育園に不承諾となった場合の対処法を解説。認可外・企業主導型・二次募集など、次のアクションをまとめました。",
    image:
      "https://images.unsplash.com/photo-1493836512294-502baa1986e2?w=800&h=400&fit=crop",
    category: "認可外",
    categoryColor: "purple",
    content: `<h2>不承諾通知が届いたら</h2>
<p>大阪市の1次調整の結果は1月下旬に届きます。不承諾だった場合でも、まだ選択肢はあります。慌てずに次のアクションを検討しましょう。</p>

<h2>選択肢1：2次調整に期待する</h2>
<p>1次調整で不承諾の方は自動的に2次調整の対象になります。2月上旬に公表される空き情報を確認し、希望園の変更も検討しましょう。</p>

<h2>選択肢2：認可外保育施設を探す</h2>
<p>認可外保育施設は園との直接契約なので、空きがあればすぐに利用できます。利用実績は翌年の認可申込で加点にもつながります。</p>

<h2>選択肢3：企業主導型保育事業</h2>
<p>企業主導型保育事業には「地域枠」があり、その企業の従業員でなくても利用できます。認可並みの保育料で利用でき、令和8年秋からは0〜2歳児の無償化も予定されています。</p>

<h2>選択肢4：育休を延長する</h2>
<p>不承諾通知を利用して育児休業を最長2年まで延長し、翌年度の4月入園を目指す方法もあります。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>育休延長にはハローワークへの申請が必要です。不承諾通知は大切に保管してください。</p>
</div>

<h2>選択肢5：途中入園を狙う</h2>
<p>4月以降も毎月空き状況が更新されます。転勤や引越しなどで空きが出ることがあるため、途中入園の申込を出しておくのも有効です。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>空き情報は<a href="https://www.city.osaka.lg.jp/kodomo/page/0000293428.html" target="_blank" rel="noopener">大阪市公式サイト「保育施設等の空き情報」</a>で毎月更新されます。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 80,
  },

  // ===== 育休・復職 (1) =====
  {
    slug: "jitan-score",
    citySlug: "osaka",
    title: "大阪市で時短勤務だと保育園の点数はどうなる？",
    description:
      "大阪市で時短勤務を選んだ場合の基本点数への影響を解説。フルタイムとの点数差と対策をまとめました。",
    image:
      "https://images.unsplash.com/photo-1488998427799-e3362cec87c3?w=800&h=400&fit=crop",
    category: "育休・復職",
    categoryColor: "teal",
    content: `<h2>時短勤務だと点数は下がる？</h2>
<p>大阪市の基本点数は、就労時間によって異なります。フルタイム（週40時間以上）なら100点ですが、時短勤務で就労時間が短くなると点数が下がります。</p>

<h3>就労時間と基本点数の目安</h3>
<table>
<tr><th>就労時間</th><th>基本点数（1人分）</th></tr>
<tr><td>月20日以上・週40時間以上</td><td>100点</td></tr>
<tr><td>月16日以上・週30時間以上</td><td>90点</td></tr>
<tr><td>月16日以上・週24時間以上</td><td>80点</td></tr>
<tr><td>月16日以上・週16時間以上</td><td>70点</td></tr>
</table>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>時短勤務で週30時間の場合、基本点数は90点。夫婦で合計180点となり、フルタイムの200点と<span class="highlight">20点差</span>がつきます。この差は大きく、人気園では不利になります。</p>
</div>

<h2>対策：申込時はフルタイムで復帰予定とする</h2>
<p>就労証明書に記載される就労時間は<strong>復帰後の予定</strong>です。入園申込の時点では「フルタイム復帰予定」として就労証明書を出してもらい、入園後に時短勤務に変更する方法があります。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>入園後に勤務時間を変更した場合、変更届の提出が必要です。ただし、保育の必要性の認定要件（月48時間以上の就労等）を満たしていれば、退園になることはありません。</p>
</div>

<h2>時短勤務と保育時間の関係</h2>
<p>保育の「標準時間」（最大11時間）と「短時間」（最大8時間）の区分は、就労時間によって変わります。月120時間以上の就労で標準時間の認定を受けられます。</p>`,
    publishedAt: "2026-03-28",
    popularity: 90,
  },

  // ===== 最新情報 (1) =====
  {
    slug: "next-year-changes",
    citySlug: "osaka",
    title: "大阪市の保育園制度｜来年度（令和9年度）の変更点と注目ポイント",
    description:
      "大阪市の保育園制度の最新の変更点と、来年度に向けて注目すべきポイントを解説します。",
    image:
      "https://images.unsplash.com/photo-1504711434969-e33886168d5c?w=800&h=400&fit=crop",
    category: "最新情報",
    categoryColor: "blue",
    content: `<h2>令和8年度（2026年度）の主な変更点</h2>
<p>大阪市の保育に関する制度は毎年少しずつ変更されています。令和8年度の注目ポイントをまとめます。</p>

<h3>1. 0〜2歳児の保育料完全無償化（令和8年度中）</h3>
<p>最大の変更点は、<strong>0〜2歳児の保育料が第1子から完全無償化</strong>されることです。所得制限もなく、認可保育施設を利用する全世帯が対象です。</p>
<ul>
<li>実施時期：令和8年度（2026年度）中</li>
<li>対象：認可保育施設の0〜2歳児（第1子含む全員）</li>
<li>所得制限：なし</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>これまで第2子以降が無償だった0〜2歳児の保育料が、第1子も無償になります。家計への影響は大きく、保活のモチベーションにもつながるでしょう。</p>
</div>

<h3>2. 企業主導型保育事業の無償化拡大</h3>
<p>令和8年秋頃から、企業主導型保育事業を利用する0〜2歳児の保育料についても無償化が予定されています。認可外のうち企業主導型に限った施策です。</p>

<h3>3. 利用調整基準の確認</h3>
<p>利用調整基準（点数表）は毎年見直される可能性があります。令和9年度の申込が始まる前に、最新の基準を必ず確認しましょう。</p>

<h2>来年度（令和9年度）に向けて注目すべきこと</h2>
<ul>
<li>0〜2歳児の完全無償化による保育需要の変化</li>
<li>待機児童ゼロの維持と保留児童対策</li>
<li>保育士の処遇改善と人材確保の動向</li>
</ul>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>最新の制度変更は<a href="https://www.city.osaka.lg.jp/kodomo/page/0000634370.html" target="_blank" rel="noopener">大阪市公式サイト「0〜2歳児保育無償化に向けた取組」</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 70,
  },

  // ===== 園えらび (3) =====
  {
    slug: "nursery-visit-guide",
    citySlug: "osaka",
    title: "大阪市の保育園見学ガイド｜チェックすべきポイントと質問リスト",
    description:
      "大阪市で保育園見学をする際に確認すべきポイントと、先生に聞いておきたい質問リストをまとめました。見学の予約方法や時期も解説します。",
    image:
      "https://images.unsplash.com/photo-1587654780291-39c9404d7dd0?w=800&h=400&fit=crop",
    category: "園えらび",
    categoryColor: "purple",
    content: `<h2>保育園見学はなぜ必要？</h2>
<p>保育園は子どもが1日の大半を過ごす場所です。パンフレットや口コミだけではわからない<strong>園の雰囲気・保育士の対応・設備の清潔さ</strong>を自分の目で確認することが大切です。大阪市には認可保育所だけでも約900施設あり、見学で比較することが後悔しない園えらびにつながります。</p>

<h2>見学の予約方法と時期</h2>
<h3>予約方法</h3>
<p>各園に直接電話して見学を申し込みます。大阪市の公式サイトで園の連絡先を確認できます。</p>

<h3>おすすめの時期</h3>
<ul>
<li><strong>6月〜9月</strong>が見学のベストシーズン。10月の申込に間に合います</li>
<li>午前中の活動時間（9:30〜11:00頃）がおすすめ。子どもたちの普段の様子が見られます</li>
</ul>

<h2>見学でチェックすべき10のポイント</h2>
<table>
<tr><th>チェック項目</th><th>見るべきポイント</th></tr>
<tr><td>保育士の表情・声かけ</td><td>笑顔で子どもに接しているか、声のトーンは穏やかか</td></tr>
<tr><td>子どもたちの様子</td><td>のびのび遊んでいるか、表情が明るいか</td></tr>
<tr><td>施設の清潔さ</td><td>トイレ・給食室・おもちゃの衛生状態</td></tr>
<tr><td>安全対策</td><td>門の施錠・防犯カメラ・避難経路の掲示</td></tr>
<tr><td>園庭の広さ</td><td>園庭がない場合は近隣の公園への散歩頻度</td></tr>
<tr><td>給食</td><td>自園調理か外部委託か、アレルギー対応の有無</td></tr>
<tr><td>持ち物</td><td>布団・おむつの持参が必要か、手ぶら登園に対応しているか</td></tr>
<tr><td>延長保育</td><td>延長保育の時間帯と料金</td></tr>
<tr><td>保護者との連携</td><td>連絡帳の方法（紙・アプリ）、保護者会の有無</td></tr>
<tr><td>通園のしやすさ</td><td>自宅・駅からの距離、自転車置き場の有無</td></tr>
</table>

<h2>先生に聞いておきたい質問リスト</h2>
<ul>
<li>慣らし保育の期間はどれくらいですか？</li>
<li>急な発熱時のお迎え基準は何度ですか？</li>
<li>保育士の配置人数と離職率はどのくらいですか？</li>
<li>行事の頻度と保護者の参加が必要な行事はありますか？</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>見学は最低3〜5園を比較するのがおすすめです。同じ区内でも園によって雰囲気は大きく異なります。見学後すぐにメモを取っておくと、申込時の希望順位を決めやすくなります。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>大阪市内の保育施設一覧は<a href="https://www.city.osaka.lg.jp/kodomo/page/0000293428.html" target="_blank" rel="noopener">大阪市公式サイト</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 45,
  },
  {
    slug: "ninkagai-selection",
    citySlug: "osaka",
    title: "大阪市の認可外保育施設の選び方｜安全な施設を見極めるポイント",
    description:
      "大阪市で認可外保育施設を選ぶ際のチェックポイントを解説。届出済み施設の確認方法や、認可外ならではの注意点をまとめました。",
    image:
      "https://images.unsplash.com/photo-1544776193-352d25ca82cd?w=800&h=400&fit=crop",
    category: "園えらび",
    categoryColor: "purple",
    content: `<h2>認可外保育施設とは？</h2>
<p>認可外保育施設は、都道府県への届出のもと運営される保育施設です。認可保育所の入園待ちの間に利用したり、加点を得るために活用するケースが多いですが、<strong>施設の質に大きなばらつき</strong>があるため、慎重に選ぶ必要があります。</p>

<h2>大阪市の認可外保育施設の種類</h2>
<ul>
<li><strong>認可外保育施設（届出済み）</strong>：大阪市に届出を行い、年1回の立入調査を受けている施設</li>
<li><strong>企業主導型保育事業</strong>：企業が設置し、地域枠で一般の方も利用可能</li>
<li><strong>ベビーホテル</strong>：夜間保育や一時預かりを行う施設</li>
</ul>

<h2>安全な施設を見極める5つのポイント</h2>
<table>
<tr><th>チェック項目</th><th>確認方法</th></tr>
<tr><td>届出済みかどうか</td><td>大阪市の認可外保育施設一覧に掲載されているか確認</td></tr>
<tr><td>立入調査の結果</td><td>大阪市が公表する立入調査結果を確認（指摘事項の有無）</td></tr>
<tr><td>保育士の配置</td><td>有資格者の割合が3分の1以上（基準）を満たしているか</td></tr>
<tr><td>保険への加入</td><td>賠償責任保険・傷害保険に加入しているか</td></tr>
<tr><td>契約内容</td><td>料金体系・解約条件・緊急時の対応が明確か</td></tr>
</table>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>認可外保育施設のうち、立入調査で改善指導を受けている施設もあります。大阪市が公表する立入調査結果は必ず確認しましょう。</p>
</div>

<h2>認可外の費用の目安</h2>
<p>大阪市内の認可外保育施設の月額費用は<strong>3万円〜8万円程度</strong>が相場です。入園金が別途かかる施設もあります。認可保育園の加点目的で利用する場合は、月48時間以上の有償利用が条件です。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>令和元年10月からの幼保無償化により、認可外保育施設も月額3.7万円まで（0〜2歳は住民税非課税世帯のみ4.2万円まで）の補助が受けられます。保育の必要性の認定を受けていることが条件です。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>認可外保育施設の一覧と立入調査結果は<a href="https://www.city.osaka.lg.jp/kodomo/page/0000369157.html" target="_blank" rel="noopener">大阪市公式サイト</a>で公開されています。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 40,
  },
  {
    slug: "small-nursery-guide",
    citySlug: "osaka",
    title: "大阪市の小規模保育園ガイド｜メリット・デメリットと卒園後の進路",
    description:
      "大阪市の小規模保育事業の特徴を解説。少人数保育のメリットと、2歳で卒園した後の進路（連携施設）についてまとめました。",
    image:
      "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&h=400&fit=crop",
    category: "園えらび",
    categoryColor: "purple",
    content: `<h2>小規模保育事業とは？</h2>
<p>小規模保育事業は、<strong>0〜2歳児を対象</strong>に、定員6〜19人の少人数で保育を行う認可事業です。大阪市内には多数の小規模保育園があり、特に0〜1歳児クラスでは認可保育所より入りやすいケースもあります。</p>

<h3>小規模保育のA型・B型・C型</h3>
<table>
<tr><th>類型</th><th>定員</th><th>保育士配置</th></tr>
<tr><td>A型</td><td>6〜19人</td><td>全員が保育士資格あり</td></tr>
<tr><td>B型</td><td>6〜19人</td><td>2分の1以上が保育士資格あり</td></tr>
<tr><td>C型</td><td>6〜10人</td><td>家庭的保育者（研修修了者）</td></tr>
</table>

<h2>小規模保育のメリット</h2>
<ul>
<li><strong>手厚い保育</strong>：少人数のため、一人ひとりに目が行き届きやすい</li>
<li><strong>入りやすさ</strong>：認可保育所より申込倍率が低い傾向がある</li>
<li><strong>アットホームな環境</strong>：家庭的な雰囲気で過ごせる</li>
<li><strong>認可事業</strong>：保育料は認可保育所と同じ基準で算定される</li>
</ul>

<h2>デメリットと注意点</h2>
<ul>
<li><strong>2歳で卒園</strong>：3歳以降の預け先を改めて探す必要がある</li>
<li><strong>園庭がない施設が多い</strong>：近隣の公園への散歩で対応</li>
<li><strong>給食が外部搬入</strong>の場合がある（A型以外）</li>
</ul>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>最大のデメリットは2歳で卒園になることです。3歳の4月に再度保活が必要になるため、卒園後の進路を入園前に確認しておくことが重要です。</p>
</div>

<h2>卒園後の進路（連携施設）</h2>
<p>大阪市の小規模保育園の多くは、<strong>連携施設</strong>（卒園後に優先的に入れる認可保育所や認定こども園）が設定されています。連携施設への入園は加点がつくため有利です。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>小規模保育園を選ぶ際は、必ず連携施設がどこなのかを確認しましょう。連携施設が自宅から遠い場合は通園が大変になります。入園前に見学しておくと安心です。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>小規模保育事業の施設一覧は<a href="https://www.city.osaka.lg.jp/kodomo/page/0000293428.html" target="_blank" rel="noopener">大阪市公式サイト</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 50,
  },

  // ===== データ分析 (2) =====
  {
    slug: "zero-vs-one-year",
    citySlug: "osaka",
    title: "大阪市の0歳vs1歳入園｜倍率と入りやすさを徹底比較",
    description:
      "大阪市で0歳児クラスと1歳児クラスのどちらが入りやすいかを解説。定員数・申込倍率の傾向と、それぞれのメリット・デメリットをまとめました。",
    image:
      "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=800&h=400&fit=crop",
    category: "データ分析",
    categoryColor: "teal",
    content: `<h2>0歳入園と1歳入園、どちらが有利？</h2>
<p>大阪市の認可保育園の入園で最も競争が激しいのは<strong>1歳児クラス</strong>です。育休が1年の家庭が多く、1歳の4月入園に申込が集中するためです。0歳児クラスは1歳児に比べて倍率が低い傾向があります。</p>

<h3>年齢別の傾向</h3>
<table>
<tr><th>クラス</th><th>競争率の傾向</th><th>理由</th></tr>
<tr><td>0歳児</td><td>やや低め</td><td>育休中の家庭が多く、申込数が少ない</td></tr>
<tr><td>1歳児</td><td>最も高い</td><td>育休明けの申込が集中する</td></tr>
<tr><td>2歳児</td><td>高め</td><td>新設枠が少なく、持ち上がりで埋まる</td></tr>
<tr><td>3歳児</td><td>やや低め</td><td>小規模保育卒園児の受け皿として枠が広い</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>0歳児クラスは定員自体が少ない（6〜9名程度）ため、倍率が低くても油断はできません。一方、1歳児クラスは持ち上がりを除いた「新規募集枠」が少なくなるのが激戦の原因です。</p>
</div>

<h2>0歳入園のメリット・デメリット</h2>
<h3>メリット</h3>
<ul>
<li>1歳児クラスに比べて競争率が低い傾向がある</li>
<li>入園できれば、きょうだい加点が使える</li>
<li>早期復帰で勤務実績がつく</li>
</ul>
<h3>デメリット</h3>
<ul>
<li>育休を短く切り上げる必要がある（生後57日〜が受入開始）</li>
<li>月齢によっては4月入園に間に合わない</li>
<li>低月齢での集団保育への不安</li>
</ul>

<h2>1歳入園のメリット・デメリット</h2>
<h3>メリット</h3>
<ul>
<li>育休を1年取得できる</li>
<li>子どもの体力・免疫力がある程度ついている</li>
</ul>
<h3>デメリット</h3>
<ul>
<li>最も競争率が高く、200点でも入れない園がある</li>
<li>認可外の利用実績などで加点を積む必要がある</li>
</ul>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>0歳児の受入開始月齢は園によって異なります（生後57日・生後6か月など）。4月1日時点の月齢で申込可能かどうかが決まるため、早めに確認しましょう。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>年齢別の募集人数は<a href="https://www.city.osaka.lg.jp/kodomo/page/0000659771.html" target="_blank" rel="noopener">大阪市公式サイト「保育施設等利用申込み状況の公表」</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 65,
  },
  {
    slug: "waiting-child-data",
    citySlug: "osaka",
    title: "大阪市の待機児童数の推移｜データで見る保活の今",
    description:
      "大阪市の待機児童数・保留児童数の推移をデータで解説。待機児童ゼロの裏にある「隠れ待機児童」の実態と、区別の傾向をまとめました。",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop",
    category: "データ分析",
    categoryColor: "teal",
    content: `<h2>大阪市の待機児童数の推移</h2>
<p>大阪市は保育施設の整備を進め、近年は国の定義による<strong>待機児童数はゼロまたはごくわずか</strong>の水準を維持しています。しかし、希望する園に入れなかった「保留児童」は依然として存在します。</p>

<h3>待機児童数の推移</h3>
<table>
<tr><th>年度</th><th>待機児童数</th><th>保留児童数</th></tr>
<tr><td>令和3年（2021年）</td><td>12人</td><td>約1,200人</td></tr>
<tr><td>令和4年（2022年）</td><td>0人</td><td>約1,000人</td></tr>
<tr><td>令和5年（2023年）</td><td>0人</td><td>約900人</td></tr>
<tr><td>令和6年（2024年）</td><td>0人</td><td>約800人</td></tr>
</table>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>「待機児童ゼロ」は国の定義によるもので、認可外に入った方や特定の園のみ希望している方は待機児童にカウントされません。実際に希望する園に入れなかった「保留児童」は数百人規模で存在しています。</p>
</div>

<h2>待機児童と保留児童の違い</h2>
<ul>
<li><strong>待機児童</strong>：認可保育施設に申し込んだが入れず、他の保育サービスも利用していない児童（国の定義）</li>
<li><strong>保留児童</strong>：認可保育施設に申し込んだが第1希望に入れなかった児童を含む、より広い概念</li>
</ul>

<h2>区別の傾向</h2>
<p>保留児童が多い傾向にあるのは、子育て世帯の流入が多い<strong>北区・中央区・西区・天王寺区・福島区</strong>などの都心部です。一方、<strong>平野区・東住吉区・生野区</strong>などでは比較的余裕がある傾向です。</p>

<h2>今後の見通し</h2>
<p>大阪市では0〜2歳児の保育料完全無償化が進められており、保育需要がさらに増加する可能性があります。一方で少子化も進んでおり、中長期的には需要と供給のバランスが変わる見込みです。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>待機児童ゼロだからといって安心はできません。希望する園に入るためには、点数を積み上げ、複数の園を候補に入れることが重要です。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>待機児童数・保留児童数のデータは<a href="https://www.city.osaka.lg.jp/kodomo/page/0000447885.html" target="_blank" rel="noopener">大阪市公式サイト「保育を取り巻く現状」</a>で公開されています。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 55,
  },

  // ===== 制度を知る (2) =====
  {
    slug: "single-parent-guide",
    citySlug: "osaka",
    title: "大阪市のひとり親家庭の保活ガイド｜加点・支援制度を徹底解説",
    description:
      "大阪市でひとり親家庭が保育園入園で受けられる加点や、利用できる支援制度をまとめました。保育料の軽減措置も解説します。",
    image:
      "https://images.unsplash.com/photo-1531983412531-1f49a365ffed?w=800&h=400&fit=crop",
    category: "制度を知る",
    categoryColor: "rose",
    content: `<h2>ひとり親家庭は加点で有利</h2>
<p>大阪市の利用調整基準では、ひとり親世帯には<strong>調整指数で+9点</strong>が加算されます。これは調整指数の中でも最大級の加点であり、入園選考で大きなアドバンテージとなります。</p>

<h3>ひとり親の加点の条件</h3>
<ul>
<li>戸籍上のひとり親であること（離婚・死別・未婚など）</li>
<li>事実婚状態でないこと</li>
<li>申込時に証明書類（戸籍謄本など）の提出が必要</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>ひとり親の加点+9点があれば、フルタイム勤務の場合は基本点数100点+調整指数9点で、合計109点（父母合計ではなく1人分+加点）となります。ひとり親の場合は片親のみの基本点数で判定されるため、計算方法が異なる点に注意してください。</p>
</div>

<h2>ひとり親が使える支援制度</h2>

<h3>保育料の軽減</h3>
<ul>
<li><strong>0〜2歳児</strong>：住民税非課税世帯は保育料無償。令和8年度からは所得制限なく全世帯無償化予定</li>
<li><strong>3〜5歳児</strong>：すでに全世帯無償</li>
<li>副食費（おかず代）：年収360万円未満相当のひとり親世帯は免除</li>
</ul>

<h3>児童扶養手当</h3>
<p>18歳以下の子どもを養育するひとり親に支給される手当です。所得に応じて月額約1万円〜4.4万円が支給されます。</p>

<h3>ひとり親家庭医療費助成</h3>
<p>大阪市ではひとり親家庭の医療費の自己負担が軽減されます。1医療機関あたり1日500円（月2回まで）の負担で受診できます。</p>

<h3>母子父子寡婦福祉資金貸付</h3>
<p>就学資金や生活資金など、ひとり親家庭向けの低利または無利子の貸付制度があります。</p>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>離婚調停中や別居中の場合、ひとり親としての加点が認められるかは個別の状況によります。事前に区の保健福祉センターに相談することをおすすめします。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>ひとり親家庭向けの支援制度は<a href="https://www.city.osaka.lg.jp/kodomo/page/0000369692.html" target="_blank" rel="noopener">大阪市公式サイト「ひとり親家庭等の支援」</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 50,
  },
  {
    slug: "futago-hokatsu",
    citySlug: "osaka",
    title: "大阪市の双子・多胎児の保活ガイド｜同時入園のコツと支援制度",
    description:
      "大阪市で双子や三つ子の保活を進めるためのポイントを解説。きょうだい同時申込の加点や多胎児向けの支援制度をまとめました。",
    image:
      "https://images.unsplash.com/photo-1609220136736-443140cffec6?w=800&h=400&fit=crop",
    category: "制度を知る",
    categoryColor: "rose",
    content: `<h2>双子の保活は2倍大変？</h2>
<p>双子や三つ子の保活は、1人分でも大変な保活を同時に2人分・3人分行う必要があり、精神的にも体力的にも大きな負担がかかります。しかし大阪市では<strong>きょうだい同時申込の加点</strong>があり、同じ園に同時入園できるよう配慮されています。</p>

<h2>双子に関連する加点項目</h2>
<table>
<tr><th>項目</th><th>加点</th></tr>
<tr><td>きょうだい同時申込（同一施設希望）</td><td>+3点</td></tr>
<tr><td>きょうだいが同一施設に在園中</td><td>+7点（上の子がいる場合）</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>双子で同じ園を希望する場合、きょうだい同時申込の+3点が加算されます。三つ子の場合も同様です。同一施設を第1希望にすることで加点が得られるため、希望園の記入順序に注意しましょう。</p>
</div>

<h2>同じ園に入れない場合</h2>
<p>人気園では双子が2人とも同じ園に入れないケースもあります。その場合の選択肢は以下のとおりです。</p>
<ul>
<li><strong>別々の園に通う</strong>：送迎が2か所になり大変だが、両方とも認可に入れる</li>
<li><strong>定員に余裕のある園を希望する</strong>：同時入園の確率が上がる</li>
<li><strong>小規模保育園も候補に入れる</strong>：比較的空きがある場合も</li>
</ul>

<h2>多胎児向けの支援制度</h2>

<h3>大阪市の多胎児支援</h3>
<ul>
<li><strong>多胎児家庭サポーター事業</strong>：ヘルパーの派遣や外出支援</li>
<li><strong>多胎児の保育料軽減</strong>：第2子以降の保育料は半額または無償（令和8年度からは全員無償化予定）</li>
<li><strong>産前産後ヘルパー</strong>：多胎妊娠の場合は利用期間が延長される</li>
</ul>

<h3>多胎児サークル・交流会</h3>
<p>大阪市内の子育て支援施設では、多胎児家庭向けの交流会が開催されています。保活の情報交換にもなるので、積極的に参加するとよいでしょう。</p>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>双子が別々の園になった場合、送迎の負担は想像以上に大きくなります。通園経路のシミュレーションを事前にしておくことが大切です。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>多胎児支援に関する情報は各区の保健福祉センターにお問い合わせください。利用調整基準は<a href="https://www.city.osaka.lg.jp/kodomo/page/0000656530.html" target="_blank" rel="noopener">大阪市公式サイト</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 35,
  },

  // ===== 保活の基本 (2) =====
  {
    slug: "ikukyu-timing",
    citySlug: "osaka",
    title: "大阪市で育休復帰のベストタイミングは？加点と保育料を考慮した戦略",
    description:
      "大阪市で育休からの復帰タイミングを解説。復帰月による加点の違いや、保育料の無償化を踏まえた最適な復帰戦略をまとめました。",
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>育休復帰のタイミングが点数に影響する</h2>
<p>大阪市の利用調整基準では、<strong>育休明けに復帰する場合に+7点の加点</strong>があります。この加点は「利用開始月中に復帰すること」が条件となるため、復帰のタイミングが非常に重要です。</p>

<h3>育休復帰加点の条件</h3>
<ul>
<li>育児休業を取得していること</li>
<li><strong>利用開始月中に職場復帰</strong>すること</li>
<li>就労証明書に復帰予定日が記載されていること</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>4月入園の場合、4月中に復帰すれば+7点の加点が得られます。慣らし保育期間（1〜2週間）を考慮すると、4月中旬〜下旬の復帰が現実的です。職場と事前に復帰日を調整しておきましょう。</p>
</div>

<h2>復帰タイミング別の比較</h2>
<table>
<tr><th>復帰時期</th><th>メリット</th><th>デメリット</th></tr>
<tr><td>0歳4月（生後6か月〜）</td><td>0歳入園は倍率が低め</td><td>育休が短くなる・月齢制限あり</td></tr>
<tr><td>1歳4月（育休1年）</td><td>育休をしっかり取れる</td><td>1歳児は最激戦</td></tr>
<tr><td>1歳途中（育休延長）</td><td>不承諾通知で延長可能</td><td>途中入園は空き次第</td></tr>
<tr><td>2歳4月（育休2年）</td><td>最大限育休を取れる</td><td>2歳児枠は少ない</td></tr>
</table>

<h2>育休延長の活用</h2>
<p>1歳の4月入園で不承諾だった場合、不承諾通知を利用して育児休業を<strong>最長2年まで延長</strong>できます。育休給付金も延長期間中は支給されます（給付率は50%）。</p>

<h3>育休延長のスケジュール</h3>
<div class="step">
<div class="step-num">1</div>
<div class="step-content"><strong>1歳の誕生日前に認可保育園に申込</strong><p>延長には「入園申込をしたが不承諾だった」事実が必要です。</p></div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content"><strong>不承諾通知を受け取る</strong><p>不承諾通知はハローワークへの提出に必要なので大切に保管します。</p></div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content"><strong>勤務先とハローワークに届出</strong><p>育休延長の手続きを行います。</p></div>
</div>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>育休延長を目的とした「わざと落ちる」申込（希望園を1つだけにする等）は、令和7年4月以降、ハローワークの審査が厳格化されています。複数園に申し込んだうえでの不承諾であることが求められます。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>育児休業給付の詳細は<a href="https://www.hellowork.mhlw.go.jp/" target="_blank" rel="noopener">ハローワーク公式サイト</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 55,
  },
  {
    slug: "hoiku-mama-interview",
    citySlug: "osaka",
    title: "大阪市の保活体験談｜先輩ママ3人のリアルな声",
    description:
      "大阪市で実際に保活を経験した先輩ママ3人の体験談を紹介。成功のコツや失敗談、後悔していることをリアルにまとめました。",
    image:
      "https://images.unsplash.com/photo-1491013516836-7db643ee125a?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>先輩ママの保活体験談</h2>
<p>大阪市で保活を経験したママたちのリアルな声を集めました。点数の工夫や園選びのコツなど、これから保活を始める方の参考になる情報をまとめています。</p>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>以下の体験談は個人の経験に基づくものです。制度や倍率は年度によって変わるため、最新の情報は大阪市公式サイトでご確認ください。</p>
</div>

<h3>体験談1：西区・1歳4月入園（Aさん）</h3>
<p><strong>家庭状況</strong>：共働きフルタイム、第1子</p>
<p><strong>結果</strong>：第3希望の園に内定</p>
<blockquote>
<p>西区はタワマンが増えて激戦と聞いていたので、早めに動きました。6月から8園を見学し、10月に申込。基本点数200点に加えて、認可外を4月から利用して+5点を確保しました。第1・第2希望は落ちましたが、第3希望に内定。<strong>認可外の利用実績がなければ入れなかった</strong>と思います。</p>
</blockquote>
<p><strong>アドバイス</strong>：認可外の費用は月5万円かかりましたが、加点のための「投資」だと思って割り切りました。見学は早めに、多めに行くのがおすすめです。</p>

<h3>体験談2：天王寺区・0歳4月入園（Bさん）</h3>
<p><strong>家庭状況</strong>：共働きフルタイム、第1子（12月生まれ）</p>
<p><strong>結果</strong>：第1希望の園に内定</p>
<blockquote>
<p>12月生まれで1歳4月だと激戦になると思い、0歳4月入園を選びました。生後4か月での入園は不安でしたが、0歳児クラスは定員9名に対して申込が8名で、基本点数200点だけで内定。<strong>0歳入園にして正解</strong>でした。</p>
</blockquote>
<p><strong>アドバイス</strong>：0歳入園は月齢の制限があるので、生まれ月によっては選択できません。早生まれの方は1歳入園で加点を積む戦略が必要です。</p>

<h3>体験談3：北区・1歳4月入園（Cさん）</h3>
<p><strong>家庭状況</strong>：共働き（母は時短予定）、第2子</p>
<p><strong>結果</strong>：1次不承諾→2次で内定</p>
<blockquote>
<p>上の子と同じ園を希望しましたが、1次調整で不承諾。きょうだい加点+7点があっても北区は厳しかったです。2次調整で希望園を広げたところ、別の園に内定しました。送迎が2か所になり大変ですが、<strong>入れただけでもありがたい</strong>です。</p>
</blockquote>
<p><strong>アドバイス</strong>：きょうだい加点があっても油断は禁物。希望園は多めに書くことをおすすめします。私は1次で3園しか書かなかったのを後悔しています。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>3人の体験談に共通するのは「早めの行動」と「希望園を多く書くこと」の重要性です。特に都心部（北区・西区・天王寺区）では、200点＋加点があっても安心できない状況が続いています。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>申込状況や空き情報は<a href="https://www.city.osaka.lg.jp/kodomo/page/0000659771.html" target="_blank" rel="noopener">大阪市公式サイト</a>で公開されています。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 60,
  },

  // ===== 点数アップ (1) =====
  {
    slug: "secondchild-hokatsu",
    citySlug: "osaka",
    title: "大阪市の2人目の保活ガイド｜きょうだい加点を最大限活用する方法",
    description:
      "大阪市で2人目の保活を有利に進めるためのきょうだい加点の仕組みと活用法を解説。同一園に通わせるための戦略をまとめました。",
    image:
      "https://images.unsplash.com/photo-1471286174890-9c112ffca5b4?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>2人目の保活は「きょうだい加点」がカギ</h2>
<p>大阪市では、上の子が認可保育施設に在園している場合、下の子の入園選考で<strong>きょうだい加点（+7点）</strong>が得られます。この加点を最大限活用することが、2人目の保活成功のポイントです。</p>

<h3>きょうだいに関する加点項目</h3>
<table>
<tr><th>項目</th><th>加点</th></tr>
<tr><td>きょうだいが同一施設に在園中（同一施設を希望）</td><td>+7点</td></tr>
<tr><td>きょうだい同時申込（同一施設希望）</td><td>+3点</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>きょうだい加点+7点は、育休復帰加点と並ぶ大きな加点です。フルタイム共働き（200点）+きょうだい加点（+7点）+育休復帰加点（+7点）で合計214点となれば、多くの園で内定圏内に入れます。</p>
</div>

<h2>同じ園に通わせるための戦略</h2>

<h3>戦略1：上の子の園を第1希望にする</h3>
<p>きょうだい加点が最大になるのは、上の子と<strong>同一施設を希望</strong>した場合です。まずは上の子が通っている園を第1希望にしましょう。</p>

<h3>戦略2：0歳入園を検討する</h3>
<p>1歳児クラスは最激戦のため、きょうだい加点があっても入れない可能性があります。0歳入園なら倍率が低い傾向があるため、確実に同じ園に入れる可能性が高まります。</p>

<h3>戦略3：育休復帰のタイミングを合わせる</h3>
<p>育休復帰加点（+7点）も併せて取得できるよう、利用開始月中の復帰を計画しましょう。</p>

<h2>別々の園になった場合の対処法</h2>
<p>上の子と別の園に内定した場合、以下の選択肢があります。</p>
<ul>
<li><strong>転園申請を出す</strong>：入園後に上の子と同じ園への転園申請を出し、空きが出るのを待つ</li>
<li><strong>上の子を転園させる</strong>：下の子の園に上の子を転園させる（空きがある場合）</li>
<li><strong>そのまま別の園に通う</strong>：送迎が大変だが、どちらの園も環境が良ければ無理に動かない選択も</li>
</ul>

<h2>2人目の保育料</h2>
<p>大阪市では、きょうだいが保育施設を利用している場合、<strong>第2子の保育料は半額</strong>になります。さらに令和8年度からは0〜2歳児の保育料が全員無償化される予定です。</p>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>上の子が卒園して小学生になると、きょうだい加点の対象外になります。年齢差が大きい場合は加点が得られないため、別の加点方法を検討する必要があります。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>きょうだいに関する利用調整基準は<a href="https://www.city.osaka.lg.jp/kodomo/page/0000656530.html" target="_blank" rel="noopener">大阪市公式サイト「保育施設・保育事業利用の案内」</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 55,
  },
];

registerArticles(articles);
