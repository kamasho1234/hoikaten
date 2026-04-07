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

  // ===== 追加30本 (2026-04-07) =====

  // 1. self-employed-score（点数を知る/blue/50）
  {
    slug: "self-employed-score",
    citySlug: "osaka",
    title: "大阪市で自営業・フリーランスの保育園点数はどうなる？",
    description:
      "大阪市で自営業やフリーランスとして働く場合の保育園入園点数の考え方と、就労証明のポイントを解説します。",
    image:
      "https://images.unsplash.com/photo-1450101499163-c8848e66ad76?w=800&h=400&fit=crop",
    category: "点数を知る",
    categoryColor: "blue",
    content: `<h2>自営業・フリーランスの基本点数</h2>
<p>大阪市の利用調整基準では、自営業やフリーランスも「居宅外就労」または「居宅内就労」として点数が付きます。ポイントは<strong>就労時間</strong>です。</p>

<table>
<tr><th>就労形態</th><th>点数の目安</th></tr>
<tr><td>居宅外で月20日以上・週40時間以上</td><td>100点</td></tr>
<tr><td>居宅内で月20日以上・週40時間以上</td><td>90点前後</td></tr>
<tr><td>居宅内で月16日以上・週24時間以上</td><td>70〜80点前後</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>居宅外で事務所やコワーキングスペースに通って働いている場合は、会社員と同じ「居宅外就労」の区分で高い点数が付く可能性があります。事務所の賃貸契約書などが証明に役立ちます。</p>
</div>

<h2>就労証明はどう書く？</h2>
<div class="step">
<div class="step-num">1</div>
<div class="step-content"><strong>就労証明書を自分で記入</strong><p>自営業者は自分自身が事業主として就労証明書を記入します。</p></div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content"><strong>開業届の写しを添付</strong><p>税務署に提出した個人事業の開業届出書の控えを添付しましょう。</p></div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content"><strong>確定申告書の控えを添付</strong><p>直近の確定申告書の控えがあると、就労の実態を証明しやすくなります。</p></div>
</div>

<div class="info-box">
<p><strong>確認を</strong></p>
<p>居宅内就労と居宅外就労で点数が異なる場合があります。詳しくはお住まいの区の保健福祉センターにご確認ください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 50,
  },

  // 2. naishoku-score（点数を知る/blue/40）
  {
    slug: "naishoku-score",
    citySlug: "osaka",
    title: "大阪市で内職・在宅ワークの場合の保育園点数",
    description:
      "大阪市で内職や在宅ワークをしている場合の保育園入園点数について解説。居宅内就労の点数や注意点をまとめました。",
    image:
      "https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?w=800&h=400&fit=crop",
    category: "点数を知る",
    categoryColor: "blue",
    content: `<h2>内職・在宅ワークの点数の考え方</h2>
<p>大阪市では、内職や在宅ワークは「居宅内就労」に分類されます。居宅外就労と比べると、同じ時間数でも点数がやや低くなる傾向があります。</p>

<h3>居宅内就労の点数目安</h3>
<table>
<tr><th>就労時間</th><th>点数の目安</th></tr>
<tr><td>月20日以上・週40時間以上</td><td>90点前後</td></tr>
<tr><td>月16日以上・週30時間以上</td><td>80点前後</td></tr>
<tr><td>月16日以上・週24時間以上</td><td>70点前後</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>在宅勤務（テレワーク）で雇用されている場合は、会社から就労証明書を発行してもらえます。この場合は「居宅外就労」と同等の扱いになることもあるため、会社に確認しましょう。</p>
</div>

<h2>点数を上げるための工夫</h2>
<ul>
<li><strong>就労時間を増やす</strong>：週24時間以上から週40時間以上に増やせると点数が大幅に上がります</li>
<li><strong>認可外保育施設の利用実績</strong>をつくる：調整指数で+5〜+7点の加点</li>
<li><strong>居宅外の作業場を確保する</strong>：コワーキングスペース等で居宅外就労扱いになる可能性</li>
</ul>

<div class="info-box">
<p><strong>確認を</strong></p>
<p>居宅内就労の正確な点数は年度の利用調整基準によります。詳しくはお住まいの区の保健福祉センターにお問い合わせください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 40,
  },

  // 3. kyushoku-hokatsu（保活の基本/green/45）
  {
    slug: "kyushoku-hokatsu",
    citySlug: "osaka",
    title: "大阪市で求職中に保活するときの点数と注意点",
    description:
      "大阪市で求職活動中に保育園を申し込む場合の点数や入園後のルールを解説します。",
    image:
      "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>求職中の基本点数</h2>
<p>大阪市では、求職活動中の保育の必要性は認められていますが、就労中と比べると点数は低くなります。</p>

<table>
<tr><th>事由</th><th>点数の目安</th></tr>
<tr><td>居宅外就労（フルタイム）</td><td>100点</td></tr>
<tr><td>求職活動</td><td>60点</td></tr>
</table>

<p>父母ともに求職中の場合、基本点数は<strong>120点前後</strong>となり、就労世帯（200点）と大きな差がつきます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>片方の保護者が就労中（100点）で、もう片方が求職中（60点）の場合は合計160点前後になります。人気園は厳しいですが、定員に余裕のある園であれば可能性があります。</p>
</div>

<h2>求職中で入園した場合の注意</h2>
<div class="step">
<div class="step-num">1</div>
<div class="step-content"><strong>入園後に就労を開始する期限がある</strong><p>求職活動を理由に入園した場合、入園後一定期間内に就労を開始する必要があります。</p></div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content"><strong>就労証明書の提出が必要</strong><p>就労を開始したら、就労証明書を区の保健福祉センターに提出します。</p></div>
</div>

<div class="info-box">
<p><strong>確認を</strong></p>
<p>求職活動の点数や入園後の就労開始期限は年度によって変更される場合があります。お住まいの区の保健福祉センターにご確認ください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 45,
  },

  // 4. tenshoku-timing（保活の基本/green/40）
  {
    slug: "tenshoku-timing",
    citySlug: "osaka",
    title: "大阪市の保活中に転職しても大丈夫？点数への影響と注意点",
    description:
      "大阪市で保活中や入園後に転職した場合の点数への影響、必要な手続きについて解説します。",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>保活中の転職は点数に影響する？</h2>
<p>大阪市の点数は「就労時間」で決まるため、転職しても<strong>就労時間が変わらなければ基本点数は同じ</strong>です。ただし注意点がいくつかあります。</p>

<h3>転職で点数が変わるケース</h3>
<ul>
<li><strong>フルタイムからパートに変わった場合</strong>：就労時間が減ると点数が下がります</li>
<li><strong>転職先がまだ決まっていない空白期間</strong>：「求職活動」扱いとなり点数が大幅に下がります</li>
<li><strong>居宅外から居宅内就労に変わった場合</strong>：点数が下がる可能性があります</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>転職する場合は、申込書類の提出前に新しい就労証明書を準備しましょう。空白期間ができないよう、退職日と入社日を調整するのが理想的です。</p>
</div>

<h2>入園後に転職する場合</h2>
<p>入園後の転職自体は問題ありませんが、以下の手続きが必要です。</p>
<div class="step">
<div class="step-num">1</div>
<div class="step-content"><strong>新しい就労証明書を提出</strong><p>転職先が決まったら、新しい就労証明書を区の保健福祉センターに提出します。</p></div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content"><strong>保育の必要性の事由を維持</strong><p>退職後に長期間就労しない場合、保育の実施要件を満たさなくなる可能性があります。</p></div>
</div>

<div class="info-box">
<p><strong>確認を</strong></p>
<p>転職に伴う手続きの詳細はお住まいの区の保健福祉センターにお問い合わせください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 40,
  },

  // 5. age2-nyuen（データ分析/teal/50）
  {
    slug: "age2-nyuen",
    citySlug: "osaka",
    title: "大阪市の2歳児クラス入園｜倍率や点数の傾向",
    description:
      "大阪市の2歳児クラスへの入園を狙う場合の特徴、倍率の傾向、保活戦略を解説します。",
    image:
      "https://images.unsplash.com/photo-1587654780291-39c9404d7dd0?w=800&h=400&fit=crop",
    category: "データ分析",
    categoryColor: "teal",
    content: `<h2>2歳児クラスの入園状況</h2>
<p>大阪市では0歳児・1歳児クラスが最も競争が激しいですが、2歳児クラスにもチャンスがあります。</p>

<h3>2歳児クラスの特徴</h3>
<ul>
<li>小規模保育事業（0〜2歳対象）の卒園児が認可保育園に移るため、<strong>一定の枠が確保される</strong>傾向があります</li>
<li>1歳児クラスからの持ち上がりで定員が埋まる園では、募集枠が少ないこともあります</li>
<li>3歳児クラスへの「持ち上がり」ができる園を選ぶと、再度の保活が不要になります</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>大阪市では小規模保育事業の卒園児に対して「連携施設」への優先枠を設けている場合があります。小規模保育を利用中の方は、連携施設がどこかを確認しておきましょう。</p>
</div>

<h2>2歳児入園の保活戦略</h2>
<div class="step">
<div class="step-num">1</div>
<div class="step-content"><strong>募集枠を確認する</strong><p>2歳児の募集人数は園によって大きく異なります。大阪市の公式サイトで各園の募集予定数をチェックしましょう。</p></div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content"><strong>小規模保育の連携施設を調べる</strong><p>小規模保育からの卒園児枠がある園は、外部からの募集枠が減ることがあります。</p></div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content"><strong>認可外の利用実績で加点を狙う</strong><p>1歳の間に認可外保育施設に預けて実績をつくり、調整指数の加点を得る方法も有効です。</p></div>
</div>

<div class="info-box">
<p><strong>確認を</strong></p>
<p>各園の募集人数は年度によって変動します。最新の情報は<a href="https://www.city.osaka.lg.jp/kodomo/page/0000658390.html" target="_blank" rel="noopener">大阪市公式サイト</a>でご確認ください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 50,
  },

  // 6. age3-ikou（制度を知る/rose/45）
  {
    slug: "age3-ikou",
    citySlug: "osaka",
    title: "大阪市の3歳児以降の保育園移行ガイド｜小規模保育からの進路",
    description:
      "大阪市で小規模保育事業を卒園した後の3歳児クラスへの移行方法、連携施設の仕組みを解説します。",
    image:
      "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&h=400&fit=crop",
    category: "制度を知る",
    categoryColor: "rose",
    content: `<h2>小規模保育は2歳児クラスまで</h2>
<p>大阪市には多くの小規模保育事業所がありますが、対象は原則<strong>0〜2歳児</strong>です。3歳児クラスからは認可保育園や認定こども園などに移る必要があり、これを「3歳の壁」と呼ぶことがあります。</p>

<h3>連携施設とは</h3>
<p>大阪市では、小規模保育事業所ごとに<strong>連携施設</strong>（卒園後の受け入れ先）を設定するよう求めています。連携施設がある場合、その園への優先的な利用調整が行われます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>連携施設が設定されていない小規模保育事業所もあります。入園前に連携施設の有無と、どの園が連携先なのかを必ず確認しましょう。</p>
</div>

<h2>3歳児からの移行先の選択肢</h2>
<ul>
<li><strong>連携施設への優先入所</strong>：最も確実な方法</li>
<li><strong>認可保育園への新規申込</strong>：通常の利用調整で選考</li>
<li><strong>認定こども園への移行</strong>：1号認定（教育利用）なら直接申込可能</li>
<li><strong>幼稚園への入園</strong>：預かり保育を利用すれば働きながら通わせることも可能</li>
</ul>

<div class="info-box">
<p><strong>確認を</strong></p>
<p>連携施設の一覧や3歳児以降の利用調整の仕組みは、お住まいの区の保健福祉センターにお問い合わせください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 45,
  },

  // 7. nyuyoji-age0（保活の基本/green/55）
  {
    slug: "nyuyoji-age0",
    citySlug: "osaka",
    title: "大阪市の0歳児入園ガイド｜生後何か月から預けられる？",
    description:
      "大阪市で0歳児クラスに入園する場合の月齢要件、申込タイミング、注意点を解説します。",
    image:
      "https://images.unsplash.com/photo-1519689680058-324335c77eba?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>0歳児クラスの入園条件</h2>
<p>大阪市の認可保育園の0歳児クラスは、園によって<strong>受け入れ開始月齢</strong>が異なります。生後57日（産休明け）から受け入れる園もあれば、生後6か月以降の園もあります。</p>

<h3>受け入れ月齢の例</h3>
<table>
<tr><th>受け入れ開始月齢</th><th>傾向</th></tr>
<tr><td>生後57日〜</td><td>一部の園で対応。数は少なめ</td></tr>
<tr><td>生後3か月〜</td><td>比較的多い</td></tr>
<tr><td>生後6か月〜</td><td>多くの園で設定</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>4月入園の場合、4月1日時点で受け入れ月齢に達している必要があります。出産予定日から逆算して、希望する園の月齢要件を満たすか確認しましょう。</p>
</div>

<h2>0歳児入園のメリット・デメリット</h2>
<h3>メリット</h3>
<ul>
<li>1歳児クラスよりも<strong>募集枠が多い</strong>園がある（1歳児は持ち上がりで枠が少ない）</li>
<li>早くから園に慣れることで、子どもの適応がスムーズになることが多い</li>
</ul>

<h3>デメリット</h3>
<ul>
<li>育休を短縮する必要がある</li>
<li>月齢が低いと体調を崩しやすく、最初は呼び出しが多くなりがち</li>
</ul>

<div class="info-box">
<p><strong>確認を</strong></p>
<p>各園の受け入れ月齢は<a href="https://www.city.osaka.lg.jp/kodomo/page/0000658390.html" target="_blank" rel="noopener">大阪市公式サイト</a>の施設一覧で確認できます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 55,
  },

  // 8. nintei-kodomoen（園えらび/purple/50）
  {
    slug: "nintei-kodomoen",
    citySlug: "osaka",
    title: "大阪市の認定こども園とは？保育園との違いと選び方",
    description:
      "大阪市にある認定こども園の種類や保育園との違い、入園方法について解説します。",
    image:
      "https://images.unsplash.com/photo-1576495199011-eb94736d05d6?w=800&h=400&fit=crop",
    category: "園えらび",
    categoryColor: "purple",
    content: `<h2>認定こども園とは</h2>
<p>認定こども園は、<strong>幼稚園と保育園の機能を併せ持つ</strong>施設です。大阪市内にも多数の認定こども園があり、保育園と同じように利用調整で入園できます。</p>

<h3>認定区分</h3>
<table>
<tr><th>認定区分</th><th>対象</th><th>申込先</th></tr>
<tr><td>1号認定（教育）</td><td>満3歳以上・教育のみ</td><td>園に直接</td></tr>
<tr><td>2号認定（保育）</td><td>3〜5歳・保育が必要</td><td>区の保健福祉センター</td></tr>
<tr><td>3号認定（保育）</td><td>0〜2歳・保育が必要</td><td>区の保健福祉センター</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>2号・3号認定で申し込む場合は、認可保育園と同じ利用調整（点数制）で選考されます。1号認定であれば点数に関係なく園に直接申し込めるため、就労時間が短い方にとっても選択肢になります。</p>
</div>

<h2>保育園との主な違い</h2>
<ul>
<li><strong>教育時間</strong>が設定されており、カリキュラムが充実している園が多い</li>
<li><strong>夏休み等の長期休暇</strong>がある場合がある（1号認定の場合）</li>
<li>2号・3号認定であれば保育園と同等の保育時間が確保される</li>
</ul>

<h2>大阪市での認定こども園の探し方</h2>
<p>大阪市の公式サイトで区ごとの施設一覧が公開されています。認可保育園と一緒に希望施設として記入できるため、選択肢を広げるために積極的に検討しましょう。</p>

<div class="info-box">
<p><strong>確認を</strong></p>
<p>認定こども園の一覧は<a href="https://www.city.osaka.lg.jp/kodomo/page/0000658390.html" target="_blank" rel="noopener">大阪市公式サイト</a>でご確認ください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 50,
  },

  // 9. kigyou-shudogata（園えらび/purple/35）
  {
    slug: "kigyou-shudogata",
    citySlug: "osaka",
    title: "大阪市の企業主導型保育園とは？認可保育園との違い",
    description:
      "大阪市にある企業主導型保育園の特徴、認可保育園との違い、利用する際のメリット・デメリットを解説します。",
    image:
      "https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=800&h=400&fit=crop",
    category: "園えらび",
    categoryColor: "purple",
    content: `<h2>企業主導型保育園とは</h2>
<p>企業主導型保育事業は、企業が従業員の子どもを対象に設置する保育施設です。<strong>認可外保育施設</strong>に分類されますが、国から運営費の助成を受けており、保育料は認可保育園に近い水準です。</p>

<h3>認可保育園との主な違い</h3>
<table>
<tr><th>項目</th><th>認可保育園</th><th>企業主導型</th></tr>
<tr><td>申込先</td><td>区の保健福祉センター</td><td>園に直接</td></tr>
<tr><td>選考方法</td><td>利用調整（点数制）</td><td>園が独自に決定</td></tr>
<tr><td>保育料</td><td>所得に応じた額</td><td>園が設定（認可並みが多い）</td></tr>
<tr><td>利用調整の加点</td><td>-</td><td>認可外利用として加点対象に</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>企業主導型保育園には「従業員枠」と「地域枠」があります。地域枠であれば、設置企業の従業員でなくても利用可能です。認可保育園の保活と並行して申し込むことができます。</p>
</div>

<h2>企業主導型を利用するメリット</h2>
<ul>
<li><strong>点数に関係なく入園できる</strong>：利用調整を経ずに園と直接契約</li>
<li><strong>認可保育園の保活で加点が得られる</strong>：認可外利用実績として調整指数で+5〜+7点</li>
<li>待機児童対策として利用しやすい</li>
</ul>

<div class="info-box">
<p><strong>確認を</strong></p>
<p>企業主導型保育園は認可外施設のため、大阪市の利用調整の対象外です。空き状況や保育料は各園に直接お問い合わせください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 35,
  },

  // 10. yakan-hoiku（園えらび/purple/30）
  {
    slug: "yakan-hoiku",
    citySlug: "osaka",
    title: "大阪市の夜間保育・延長保育ガイド｜夜勤や残業がある場合",
    description:
      "大阪市で夜間保育や延長保育を利用する方法、対応施設の特徴について解説します。",
    image:
      "https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=800&h=400&fit=crop",
    category: "園えらび",
    categoryColor: "purple",
    content: `<h2>大阪市の延長保育</h2>
<p>大阪市の認可保育園の多くは<strong>延長保育</strong>を実施しています。通常の保育時間（保育標準時間：最大11時間）を超えて利用できます。</p>

<h3>延長保育の概要</h3>
<table>
<tr><th>項目</th><th>内容</th></tr>
<tr><td>利用可能時間</td><td>園によって異なる（18:00〜19:00、20:00まで等）</td></tr>
<tr><td>料金</td><td>園ごとに設定（月額制や日額制がある）</td></tr>
<tr><td>申込方法</td><td>利用する園に直接申し込み</td></tr>
</table>

<h2>夜間保育について</h2>
<p>大阪市内には<strong>夜間保育</strong>を行う認可保育園もわずかながら存在します。夜勤がある方や深夜勤務の方にとって貴重な選択肢です。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>夜間保育を行う園は数が非常に限られています。お住まいの区だけでなく、通勤経路上の他の区も含めて広く探すことをおすすめします。</p>
</div>

<h2>夜勤がある場合の保活のコツ</h2>
<ul>
<li><strong>延長保育の時間帯を確認</strong>：園ごとに終了時刻が異なります</li>
<li><strong>認可外のベビーシッター等と組み合わせる</strong>：深夜帯はベビーシッターを併用する方法も</li>
<li><strong>ファミリー・サポート・センター</strong>：大阪市の事業で、地域の支援者に子どもを預けられます</li>
</ul>

<div class="info-box">
<p><strong>確認を</strong></p>
<p>延長保育の実施状況や夜間保育園の一覧は、お住まいの区の保健福祉センターにお問い合わせください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 30,
  },

  // 11. mushoka-seido（制度を知る/rose/55）
  {
    slug: "mushoka-seido",
    citySlug: "osaka",
    title: "大阪市の保育料無償化制度｜対象年齢と条件を解説",
    description:
      "大阪市の保育料無償化の対象年齢・条件・申請方法をわかりやすくまとめました。国の制度と大阪市独自の制度の違いも解説します。",
    image:
      "https://images.unsplash.com/photo-1554224155-8d04cb21cd6e?w=800&h=400&fit=crop",
    category: "制度を知る",
    categoryColor: "rose",
    content: `<h2>保育料無償化の概要</h2>
<p>2019年10月から始まった幼児教育・保育の無償化により、<strong>3〜5歳児クラス</strong>の保育料は全員が無償です。0〜2歳児クラスは住民税非課税世帯が無償化の対象です。</p>

<h3>国の制度</h3>
<table>
<tr><th>年齢</th><th>対象</th><th>保育料</th></tr>
<tr><td>3〜5歳児クラス</td><td>全員</td><td>無償</td></tr>
<tr><td>0〜2歳児クラス</td><td>住民税非課税世帯</td><td>無償</td></tr>
</table>

<h3>大阪市の独自施策</h3>
<p>大阪市では国の制度に加え、<strong>0〜2歳児クラスについても段階的に保育料の軽減・無償化</strong>を進めています。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>無償化の対象になっても、給食費（副食費）は別途かかる場合があります。園によって金額が異なるため、見学時に確認しましょう。</p>
</div>

<h2>認可外保育施設の無償化</h2>
<p>認可外保育施設を利用する場合も、保育の必要性の認定（2号・3号認定）を受けていれば、月額上限内で利用料が無償化されます。</p>
<ul>
<li>3〜5歳児：月額37,000円まで</li>
<li>0〜2歳児（非課税世帯）：月額42,000円まで</li>
</ul>

<div class="info-box">
<p><strong>確認を</strong></p>
<p>大阪市の独自施策の最新情報は<a href="https://www.city.osaka.lg.jp/kodomo/" target="_blank" rel="noopener">大阪市こども青少年局</a>の公式サイトでご確認ください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 55,
  },

  // 12. shokuhi-jippi（制度を知る/rose/35）
  {
    slug: "shokuhi-jippi",
    citySlug: "osaka",
    title: "大阪市の保育園の給食費（副食費）はいくらかかる？",
    description:
      "大阪市の認可保育園で無償化後も自己負担となる給食費（副食費）の金額や免除条件について解説します。",
    image:
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&h=400&fit=crop",
    category: "制度を知る",
    categoryColor: "rose",
    content: `<h2>無償化後も給食費は自己負担</h2>
<p>3〜5歳児クラスの保育料は無償化されましたが、<strong>給食費（副食費）</strong>は保護者の負担です。大阪市の認可保育園では、園ごとに金額が設定されています。</p>

<h3>副食費の目安</h3>
<table>
<tr><th>施設種別</th><th>副食費の目安</th></tr>
<tr><td>認可保育園（公立）</td><td>月額4,500円程度</td></tr>
<tr><td>認可保育園（私立）</td><td>園によって異なる（4,000〜6,000円程度）</td></tr>
<tr><td>認定こども園</td><td>園によって異なる</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>副食費の金額は園が決めるため、同じ区内でも園によって差があります。見学時に必ず確認しましょう。</p>
</div>

<h2>副食費が免除されるケース</h2>
<p>以下に該当する場合は副食費が免除されます。</p>
<ul>
<li><strong>年収360万円未満相当の世帯</strong></li>
<li><strong>第3子以降の子ども</strong>（一定の条件あり）</li>
<li><strong>生活保護世帯</strong></li>
</ul>

<div class="info-box">
<p><strong>確認を</strong></p>
<p>副食費の免除要件は世帯の状況によって異なります。詳しくはお住まいの区の保健福祉センターにお問い合わせください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 35,
  },

  // 13. hoikuryo-keisan（制度を知る/rose/50）
  {
    slug: "hoikuryo-keisan",
    citySlug: "osaka",
    title: "大阪市の保育料の計算方法｜世帯年収別の目安",
    description:
      "大阪市の認可保育園の保育料がどのように計算されるか、所得階層別の金額の目安を解説します。",
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop",
    category: "制度を知る",
    categoryColor: "rose",
    content: `<h2>保育料の計算のしくみ</h2>
<p>大阪市の認可保育園の保育料は、<strong>世帯の市民税所得割額</strong>に基づいて階層区分が決まり、子どもの年齢と認定区分に応じた金額が設定されます。</p>

<h3>保育料に影響する要素</h3>
<ul>
<li><strong>世帯の市民税所得割額</strong>（父母合算）</li>
<li><strong>子どもの年齢</strong>（0〜2歳児クラスは3〜5歳児クラスより高い）</li>
<li><strong>保育認定区分</strong>（保育標準時間 or 保育短時間）</li>
<li><strong>きょうだいの有無</strong>（第2子は半額、第3子以降は無料の場合あり）</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>3〜5歳児クラスは無償化により保育料は0円です。保育料がかかるのは<strong>0〜2歳児クラス</strong>で、住民税非課税世帯は無料です。</p>
</div>

<h2>0〜2歳児クラスの保育料の目安</h2>
<p>大阪市の保育料は所得に応じて細かく階層が分かれています。以下はあくまで目安です。</p>

<table>
<tr><th>世帯年収のイメージ</th><th>月額保育料の目安</th></tr>
<tr><td>住民税非課税</td><td>0円</td></tr>
<tr><td>年収300万円台</td><td>15,000〜25,000円程度</td></tr>
<tr><td>年収500万円台</td><td>30,000〜40,000円程度</td></tr>
<tr><td>年収700万円台</td><td>45,000〜55,000円程度</td></tr>
<tr><td>年収1,000万円以上</td><td>最高額（60,000円台〜）</td></tr>
</table>

<div class="info-box">
<p><strong>確認を</strong></p>
<p>正確な保育料は市民税所得割額に基づいて決まります。大阪市の保育料表は<a href="https://www.city.osaka.lg.jp/kodomo/" target="_blank" rel="noopener">大阪市こども青少年局</a>の公式サイトでご確認ください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 50,
  },

  // 14. zeikin-koujo（制度を知る/rose/30）
  {
    slug: "zeikin-koujo",
    citySlug: "osaka",
    title: "保育料に関連する税金の控除・助成制度まとめ｜大阪市",
    description:
      "大阪市で保育園に通わせる際に使える税金控除や助成制度について解説します。",
    image:
      "https://images.unsplash.com/photo-1554224154-26032ffc0d07?w=800&h=400&fit=crop",
    category: "制度を知る",
    categoryColor: "rose",
    content: `<h2>保育に関連する税制・助成制度</h2>
<p>保育園に通わせている世帯が利用できる可能性のある制度を整理します。</p>

<h3>認可外保育施設の利用料に関する助成</h3>
<p>認可保育園に入れず認可外保育施設を利用している場合、無償化の範囲内（月額上限あり）で利用料が助成されます。ただし、保育の必要性の認定（2号・3号認定）を受けている必要があります。</p>

<h3>ベビーシッター利用支援</h3>
<p>大阪市では、待機児童等の保護者がベビーシッターを利用する場合の助成制度がある場合があります。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>児童手当や医療費助成など、保育園利用とは別に子育て世帯向けの支援制度もあります。あわせて確認しておきましょう。</p>
</div>

<h2>確定申告での控除</h2>
<p>保育料そのものは所得控除の対象にはなりませんが、以下の控除が間接的に家計の助けになります。</p>
<ul>
<li><strong>配偶者控除・配偶者特別控除</strong>：配偶者の就労状況によって適用</li>
<li><strong>医療費控除</strong>：子どもの医療費が多い年は確定申告で還付の可能性</li>
<li><strong>ひとり親控除</strong>：ひとり親世帯は所得税・住民税の控除あり</li>
</ul>

<div class="info-box">
<p><strong>確認を</strong></p>
<p>助成制度の最新情報はお住まいの区の保健福祉センターや<a href="https://www.city.osaka.lg.jp/kodomo/" target="_blank" rel="noopener">大阪市こども青少年局</a>のサイトでご確認ください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 30,
  },

  // 15. shurou-shoumeisho（保活の基本/green/60）
  {
    slug: "shurou-shoumeisho",
    citySlug: "osaka",
    title: "大阪市の就労証明書の書き方ガイド｜会社に依頼するポイント",
    description:
      "大阪市の保育園申込に必要な就労証明書の書き方、会社への依頼方法、よくあるミスと対策を解説します。",
    image:
      "https://images.unsplash.com/photo-1450101499163-c8848e66ad76?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>就労証明書とは</h2>
<p>就労証明書は保育園の入園申込で<strong>最も重要な書類</strong>のひとつです。保護者の就労状況を証明するもので、これに基づいて基本点数が決まります。</p>

<h3>記載が必要な項目</h3>
<ul>
<li>勤務先の名称・所在地・電話番号</li>
<li>雇用形態（正規・非正規・自営など）</li>
<li>勤務日数・勤務時間</li>
<li>就労開始日</li>
<li>育児休業の取得状況・復帰予定日</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>就労証明書は<strong>勤務先が記入・押印するもの</strong>です。早めに人事部や総務部に依頼しましょう。大阪市の申込時期（10月上旬）の1〜2か月前に依頼するのが安心です。</p>
</div>

<h2>よくあるミスと対策</h2>
<div class="step">
<div class="step-num">1</div>
<div class="step-content"><strong>勤務時間の記載ミス</strong><p>実際の勤務時間と記載内容が異なると、点数が正しく付きません。週の勤務時間・月の勤務日数を正確に記入してもらいましょう。</p></div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content"><strong>育休復帰日の未記入</strong><p>育休中の場合は復帰予定日の記入が必須です。未記入だと加点が得られない場合があります。</p></div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content"><strong>押印漏れ</strong><p>事業主の押印が必要な様式の場合、押印がないと受付されません。</p></div>
</div>

<div class="info-box">
<p><strong>確認を</strong></p>
<p>就労証明書の様式は<a href="https://www.city.osaka.lg.jp/kodomo/page/0000658390.html" target="_blank" rel="noopener">大阪市公式サイト</a>からダウンロードできます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 60,
  },

  // 16. shinsei-shorui-list（保活の基本/green/55）
  {
    slug: "shinsei-shorui-list",
    citySlug: "osaka",
    title: "大阪市の保育園申込に必要な書類一覧チェックリスト",
    description:
      "大阪市の認可保育園の入園申込に必要な書類を一覧でまとめました。提出漏れを防ぐチェックリストとしてご活用ください。",
    image:
      "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>基本の必要書類</h2>
<p>大阪市の認可保育園の入園申込には、以下の書類が必要です。世帯の状況によって追加書類が求められます。</p>

<h3>全員が提出する書類</h3>
<ul>
<li><strong>支給認定申請書兼保育施設・保育事業利用申込書</strong></li>
<li><strong>就労証明書</strong>（父・母それぞれ）</li>
<li><strong>マイナンバー確認書類</strong></li>
<li><strong>本人確認書類</strong></li>
</ul>

<h3>該当者のみ提出する書類</h3>
<table>
<tr><th>状況</th><th>必要書類</th></tr>
<tr><td>育児休業中</td><td>育児休業取得証明（就労証明書に記載）</td></tr>
<tr><td>求職活動中</td><td>求職活動に関する申告書</td></tr>
<tr><td>自営業</td><td>開業届の写し、確定申告書の控え</td></tr>
<tr><td>ひとり親</td><td>ひとり親であることの証明書類</td></tr>
<tr><td>認可外利用中</td><td>在園証明書</td></tr>
<tr><td>障がい等</td><td>障害者手帳の写し等</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>書類に不備があると受付できない場合があります。提出前にチェックリストで漏れがないか確認しましょう。不明点は早めに区の保健福祉センターに問い合わせると安心です。</p>
</div>

<h2>提出方法</h2>
<p>大阪市では、申込書類は<strong>お住まいの区の保健福祉センター</strong>の窓口に提出します。事前にオンラインで来所予約が必要です。</p>

<div class="info-box">
<p><strong>確認を</strong></p>
<p>必要書類の最新情報は<a href="https://www.city.osaka.lg.jp/kodomo/page/0000658390.html" target="_blank" rel="noopener">大阪市公式サイト「保育施設・保育事業利用の案内」</a>でご確認ください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 55,
  },

  // 17. niji-shinsei（保活の基本/green/45）
  {
    slug: "niji-shinsei",
    citySlug: "osaka",
    title: "大阪市の2次調整（2次申込）の活用方法と注意点",
    description:
      "大阪市の保育園入園選考で1次調整が不承諾だった場合の2次調整の仕組みと、希望変更のポイントを解説します。",
    image:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>2次調整とは</h2>
<p>大阪市の4月一斉入所では、1次調整で不承諾となった方を対象に<strong>2次調整</strong>が行われます。1次調整後に空きのある施設を対象に、再度利用調整が実施されます。</p>

<h3>2次調整のスケジュール（目安）</h3>
<table>
<tr><th>項目</th><th>時期</th></tr>
<tr><td>1次結果通知・空き情報公表</td><td>1月下旬</td></tr>
<tr><td>希望変更・追加書類提出期限</td><td>2月上旬</td></tr>
<tr><td>2次結果通知</td><td>2月下旬</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>1次調整で不承諾だった方は<strong>自動的に2次調整の対象</strong>になります。ただし、希望施設の変更や追加をしたい場合は、期限までに手続きが必要です。</p>
</div>

<h2>2次調整で内定をもらうコツ</h2>
<div class="step">
<div class="step-num">1</div>
<div class="step-content"><strong>空き情報を速やかに確認</strong><p>1次の結果が出たらすぐに空き施設の一覧をチェック。大阪市の公式サイトで公開されます。</p></div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content"><strong>希望施設を柔軟に変更</strong><p>空きのある園に希望を切り替えましょう。通勤経路上の他区の園も検討範囲に入れると選択肢が広がります。</p></div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content"><strong>小規模保育や認定こども園も視野に</strong><p>認可保育園だけでなく、小規模保育事業や認定こども園にも空きがある場合があります。</p></div>
</div>

<div class="info-box">
<p><strong>確認を</strong></p>
<p>2次調整の詳細は<a href="https://www.city.osaka.lg.jp/kodomo/page/0000658390.html" target="_blank" rel="noopener">大阪市公式サイト</a>でご確認ください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 45,
  },

  // 18. tenkyo-hokatsu（保活の基本/green/40）
  {
    slug: "tenkyo-hokatsu",
    citySlug: "osaka",
    title: "大阪市に転居して保活する場合の手続きと注意点",
    description:
      "大阪市に引っ越して保育園に申し込む場合の手続き、転入前申込の可否、注意点を解説します。",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>転入前に大阪市の保育園に申し込める？</h2>
<p>大阪市では、<strong>転入予定者も保育園の申込が可能</strong>です。ただし、入園月までに大阪市内に転入していることが条件です。</p>

<h3>転入前申込の注意点</h3>
<ul>
<li>申込時に<strong>転入先の住所が確認できる書類</strong>（売買契約書、賃貸契約書など）が必要</li>
<li>申込先は<strong>転入予定の区の保健福祉センター</strong></li>
<li>入園月の前月末までに転入届を提出する必要がある</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>転入前の申込は受け付けてもらえますが、転入が確認できない場合は内定が取り消されます。引っ越しのスケジュールは余裕をもって計画しましょう。</p>
</div>

<h2>他市からの転入で気をつけること</h2>
<div class="step">
<div class="step-num">1</div>
<div class="step-content"><strong>点数制度が異なる</strong><p>前の自治体と大阪市では点数のつけ方が異なります。大阪市の利用調整基準を必ず確認しましょう。</p></div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content"><strong>就労証明書は大阪市の様式で</strong><p>大阪市指定の就労証明書の様式で提出する必要があります。前の自治体の様式は使えません。</p></div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content"><strong>区の窓口に早めに相談</strong><p>転入予定の区の保健福祉センターに事前に電話で相談し、必要書類を確認しましょう。</p></div>
</div>

<div class="info-box">
<p><strong>確認を</strong></p>
<p>転入に伴う保育園申込の手続きは、転入予定の区の保健福祉センターにお問い合わせください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 40,
  },

  // 19. kyoiku-hoiku-chigai（園えらび/purple/40）
  {
    slug: "kyoiku-hoiku-chigai",
    citySlug: "osaka",
    title: "大阪市の保育園・幼稚園・認定こども園の違い｜どれを選ぶ？",
    description:
      "大阪市で利用できる保育園・幼稚園・認定こども園の違いを比較。それぞれの特徴と選び方のポイントを解説します。",
    image:
      "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&h=400&fit=crop",
    category: "園えらび",
    categoryColor: "purple",
    content: `<h2>3つの施設の比較</h2>
<table>
<tr><th>項目</th><th>保育園</th><th>幼稚園</th><th>認定こども園</th></tr>
<tr><td>対象年齢</td><td>0〜5歳</td><td>満3〜5歳</td><td>0〜5歳</td></tr>
<tr><td>保育時間</td><td>最大11時間</td><td>4時間程度</td><td>認定区分による</td></tr>
<tr><td>保育の必要性</td><td>必要</td><td>不要</td><td>1号は不要</td></tr>
<tr><td>申込先</td><td>区の窓口</td><td>園に直接</td><td>認定区分による</td></tr>
<tr><td>選考方法</td><td>利用調整（点数制）</td><td>園が決定</td><td>認定区分による</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>フルタイムで働いている場合は保育園か認定こども園（2号・3号認定）が基本的な選択肢です。パートタイムや短時間勤務の場合は、幼稚園の預かり保育や認定こども園の1号認定も検討しましょう。</p>
</div>

<h2>大阪市の幼稚園の預かり保育</h2>
<p>大阪市内の幼稚園（市立・私立）では<strong>預かり保育</strong>を実施している園が多くあります。通常の教育時間の前後に子どもを預けられるため、働いている保護者も利用可能です。</p>

<h3>預かり保育のポイント</h3>
<ul>
<li>実施時間・料金は園によって異なる</li>
<li>無償化の対象（保育の必要性の認定が必要、月額11,300円まで）</li>
<li>夏休み等の長期休暇中も実施している園がある</li>
</ul>

<div class="info-box">
<p><strong>確認を</strong></p>
<p>各園の情報は大阪市の公式サイトや各園のホームページでご確認ください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 40,
  },

  // 20. hokatsu-calendar（保活の基本/green/65）
  {
    slug: "hokatsu-calendar",
    citySlug: "osaka",
    title: "大阪市の保活カレンダー｜月別やることリスト",
    description:
      "大阪市で4月入園を目指す場合の保活スケジュールを月別にまとめたカレンダー。いつ何をすべきかが一目でわかります。",
    image:
      "https://images.unsplash.com/photo-1506784365847-bbad939e9335?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>保活カレンダー（4月入園の場合）</h2>
<p>大阪市で翌年4月の認可保育園入園を目指す場合のスケジュールです。</p>

<div class="step">
<div class="step-num">4月</div>
<div class="step-content"><strong>情報収集スタート</strong><p>大阪市の保育施設の種類や自分の区の施設一覧を確認。先輩ママ・パパの体験談も参考に。</p></div>
</div>
<div class="step">
<div class="step-num">5月</div>
<div class="step-content"><strong>保育園見学の予約開始</strong><p>気になる園に電話して見学予約。人気園は予約が埋まりやすいので早めに動きましょう。</p></div>
</div>
<div class="step">
<div class="step-num">6〜8月</div>
<div class="step-content"><strong>保育園見学</strong><p>複数の園を見学して比較。園の雰囲気、保育方針、通園のしやすさを確認しましょう。</p></div>
</div>
<div class="step">
<div class="step-num">9月</div>
<div class="step-content"><strong>利用の案内を入手</strong><p>大阪市が発行する「保育施設・保育事業利用の案内」を入手。点数のしくみと必要書類を確認。</p></div>
</div>
<div class="step">
<div class="step-num">9〜10月</div>
<div class="step-content"><strong>書類の準備</strong><p>就労証明書を会社に依頼。その他の必要書類もこの時期に揃えましょう。</p></div>
</div>
<div class="step">
<div class="step-num">10月上旬</div>
<div class="step-content"><strong>申込書類の提出</strong><p>お住まいの区の保健福祉センターに提出。事前にオンラインで来所予約が必要です。</p></div>
</div>
<div class="step">
<div class="step-num">1月下旬</div>
<div class="step-content"><strong>1次調整の結果通知</strong><p>結果通知が届きます。不承諾の場合は2次調整に向けて空き情報を確認。</p></div>
</div>
<div class="step">
<div class="step-num">2月</div>
<div class="step-content"><strong>2次調整の手続き・結果通知</strong><p>希望変更は2月上旬まで。2次結果は2月下旬に届きます。</p></div>
</div>
<div class="step">
<div class="step-num">3月</div>
<div class="step-content"><strong>入園準備</strong><p>内定した園の説明会に参加。持ち物の準備や慣らし保育のスケジュールを確認。</p></div>
</div>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>保活は早く始めるほど有利です。特に園見学は夏場が最も予約が取りやすい時期です。</p>
</div>

<div class="info-box">
<p><strong>確認を</strong></p>
<p>最新のスケジュールは<a href="https://www.city.osaka.lg.jp/kodomo/page/0000658390.html" target="_blank" rel="noopener">大阪市公式サイト</a>でご確認ください。日程は年度によって変更される場合があります。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 65,
  },

  // 21. souba-tensuu（データ分析/teal/60）
  {
    slug: "souba-tensuu",
    citySlug: "osaka",
    title: "大阪市の保育園入園に必要な点数の相場｜区・年齢別の傾向",
    description:
      "大阪市の認可保育園に入園するために実際に必要な点数の目安を、区や年齢ごとの傾向から分析します。",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop",
    category: "データ分析",
    categoryColor: "teal",
    content: `<h2>入園に必要な点数の目安</h2>
<p>大阪市の認可保育園に入園するために必要な点数は、<strong>区・年齢クラス・園の人気度</strong>によって大きく異なります。以下は一般的な傾向です。</p>

<h3>年齢クラス別の傾向</h3>
<table>
<tr><th>年齢クラス</th><th>競争率</th><th>必要点数の傾向</th></tr>
<tr><td>0歳児</td><td>高い</td><td>200点＋加点がないと厳しい園が多い</td></tr>
<tr><td>1歳児</td><td>最も高い</td><td>200点＋加点7〜14点程度が目安</td></tr>
<tr><td>2歳児</td><td>園による</td><td>200点前後で入れる園もある</td></tr>
<tr><td>3歳児以上</td><td>比較的低い</td><td>200点以下でも可能な園がある</td></tr>
</table>

<h3>区別の傾向</h3>
<table>
<tr><th>エリア</th><th>傾向</th></tr>
<tr><td>北区・中央区・西区・天王寺区</td><td>激戦区。200点＋加点が必須</td></tr>
<tr><td>福島区・阿倍野区</td><td>人気エリア。加点があると安心</td></tr>
<tr><td>平野区・東住吉区・生野区</td><td>比較的入りやすい園がある</td></tr>
<tr><td>此花区・大正区・港区</td><td>倍率が低めの園が多い</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>上記はあくまで傾向であり、年度や園によって大きく変動します。大阪市が公表する施設ごとの申込状況を必ず確認してください。</p>
</div>

<div class="info-box">
<p><strong>確認を</strong></p>
<p>施設ごとの申込状況は<a href="https://www.city.osaka.lg.jp/kodomo/page/0000659771.html" target="_blank" rel="noopener">大阪市公式サイト</a>で公表されています。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 60,
  },

  // 22. ku-betsu-bairitsu（データ分析/teal/55）
  {
    slug: "ku-betsu-bairitsu",
    citySlug: "osaka",
    title: "大阪市24区の保育園申込倍率｜入りやすい区はどこ？",
    description:
      "大阪市24区の保育園申込倍率の傾向を分析。比較的入りやすい区と激戦区の違いを解説します。",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop",
    category: "データ分析",
    categoryColor: "teal",
    content: `<h2>区によって倍率は大きく異なる</h2>
<p>大阪市は24の行政区があり、区によって保育園の申込倍率に大きな差があります。特に1歳児クラスは区ごとの差が顕著です。</p>

<h3>倍率が高い傾向の区</h3>
<ul>
<li><strong>北区</strong>：タワーマンション開発で子育て世帯が急増</li>
<li><strong>中央区・西区</strong>：都心部で保育需要が供給を上回る</li>
<li><strong>天王寺区</strong>：教育環境の良さから人気</li>
<li><strong>福島区</strong>：面積が小さく施設数が限られる</li>
</ul>

<h3>比較的倍率が低い傾向の区</h3>
<ul>
<li><strong>平野区</strong>：市内最大の面積で施設数が多い</li>
<li><strong>東住吉区・住之江区</strong>：施設整備が進み空きのある園も</li>
<li><strong>此花区・大正区</strong>：人口増加が緩やかで競争率が低い</li>
<li><strong>旭区・鶴見区</strong>：施設数に対して需要が落ち着いている</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>大阪市では区をまたいでの申込も可能です。自宅の区だけでなく、通勤経路上の他区も含めて広く検討すると、入園のチャンスが広がります。</p>
</div>

<div class="info-box">
<p><strong>確認を</strong></p>
<p>上記はあくまで一般的な傾向です。最新の申込状況は<a href="https://www.city.osaka.lg.jp/kodomo/page/0000659771.html" target="_blank" rel="noopener">大阪市公式サイト</a>で公表される施設ごとのデータをご確認ください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 55,
  },

  // 23. ikukyu-enchou-risk（制度を知る/rose/50）
  {
    slug: "ikukyu-enchou-risk",
    citySlug: "osaka",
    title: "大阪市で育休延長するリスクと保活への影響",
    description:
      "大阪市で育児休業を延長した場合の保活への影響、不承諾通知の扱い、点数面での注意点を解説します。",
    image:
      "https://images.unsplash.com/photo-1476994230281-1448088947db?w=800&h=400&fit=crop",
    category: "制度を知る",
    categoryColor: "rose",
    content: `<h2>育休延長と保活の関係</h2>
<p>育児休業は原則として子どもが1歳になるまでですが、保育園に入れない場合は<strong>最長2歳まで延長</strong>できます。延長には「保育園に申し込んだが入れなかった」ことの証明（不承諾通知）が必要です。</p>

<h3>育休延長の条件</h3>
<ul>
<li>子どもが1歳（または1歳6か月）の時点で保育園に入園できないこと</li>
<li>保育園に申込をした事実があること</li>
<li>不承諾通知（利用保留通知）を受け取っていること</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>大阪市では、育休延長のために「あえて入りにくい園だけを希望する」ケースについて、申込意思の確認を行う場合があります。制度の趣旨を理解したうえで申込しましょう。</p>
</div>

<h2>育休延長が保活に与える影響</h2>
<ul>
<li><strong>育休明け復帰の加点（+7点）</strong>は、利用開始月中に復帰する場合に付与されます。育休を延長して翌年の4月入園を狙う場合も、入園月に復帰予定であれば加点対象になります。</li>
<li>育休中に<strong>認可外保育施設を利用する</strong>ことで、利用実績による加点を得る戦略も考えられます。</li>
</ul>

<div class="info-box">
<p><strong>確認を</strong></p>
<p>育休延長に関する手続きは勤務先の人事部門に、保育園の申込に関しては区の保健福祉センターにご確認ください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 50,
  },

  // 24. fukushoku-junbi（保活の基本/green/45）
  {
    slug: "fukushoku-junbi",
    citySlug: "osaka",
    title: "大阪市で保育園入園後の復職準備ガイド",
    description:
      "大阪市で保育園に入園が決まった後の復職準備について、慣らし保育から職場復帰までの流れを解説します。",
    image:
      "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>入園から復職までのスケジュール</h2>
<p>保育園の入園が決まったら、復職に向けた準備を進めましょう。</p>

<div class="step">
<div class="step-num">1</div>
<div class="step-content"><strong>入園説明会に参加（2〜3月）</strong><p>内定した園の説明会で、持ち物や慣らし保育のスケジュールを確認します。</p></div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content"><strong>持ち物の準備（3月）</strong><p>お昼寝用布団、着替え、おむつなど園が指定する持ち物を揃えます。名前付けも忘れずに。</p></div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content"><strong>慣らし保育（4月上旬）</strong><p>最初の1〜2週間は短時間から始めて、徐々に保育時間を延ばしていきます。</p></div>
</div>
<div class="step">
<div class="step-num">4</div>
<div class="step-content"><strong>職場復帰（4月中旬〜）</strong><p>慣らし保育が終わったら、いよいよ復職です。</p></div>
</div>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>育休明け復帰の加点（+7点）を受けている場合、<strong>利用開始月中に復帰する</strong>必要があります。4月入園の場合は4月中に復帰届を出しましょう。復帰が遅れると内定取り消しの可能性もあります。</p>
</div>

<h2>復職後に気をつけること</h2>
<ul>
<li><strong>急な呼び出しへの備え</strong>：最初の数か月は子どもが体調を崩しやすいです。職場と事前に相談しておきましょう</li>
<li><strong>病児保育の登録</strong>：大阪市には病児・病後児保育事業があります。事前に登録しておくと安心です</li>
<li><strong>ファミサポの登録</strong>：急なお迎えに対応できるよう、ファミリー・サポート・センターに登録しておくのもおすすめです</li>
</ul>

<div class="info-box">
<p><strong>確認を</strong></p>
<p>病児保育やファミリー・サポート・センターの情報は<a href="https://www.city.osaka.lg.jp/kodomo/" target="_blank" rel="noopener">大阪市こども青少年局</a>のサイトでご確認ください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 45,
  },

  // 25. sannin-me-hokatsu（点数アップ/amber/40）
  {
    slug: "sannin-me-hokatsu",
    citySlug: "osaka",
    title: "大阪市で3人目の保活｜第3子の加点と保育料の優遇",
    description:
      "大阪市で第3子の保育園入園を目指す場合の加点要素、保育料の優遇制度について解説します。",
    image:
      "https://images.unsplash.com/photo-1609220136736-443140cffec6?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>第3子の保活で知っておくべきこと</h2>
<p>大阪市では第3子以降の子どもに対して、保育料や利用調整で優遇措置があります。</p>

<h3>きょうだい加点</h3>
<p>上のきょうだいが同一の保育施設に在園している場合、<strong>きょうだい加点（+7点）</strong>が得られます。また、きょうだい同時申込の場合も加点があります。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>きょうだい加点は「同一施設に在園中」の場合に付くのが基本です。上の子が別の園に通っている場合は、同一施設への転園申請を検討するのも一つの方法です。</p>
</div>

<h2>第3子の保育料</h2>
<p>大阪市では、きょうだいの人数に応じた保育料の軽減があります。</p>
<table>
<tr><th>子どもの順番</th><th>保育料</th></tr>
<tr><td>第1子</td><td>通常額</td></tr>
<tr><td>第2子</td><td>半額</td></tr>
<tr><td>第3子以降</td><td>無料の場合あり</td></tr>
</table>

<p>また、3〜5歳児クラスは全員が保育料無償化の対象です。0〜2歳児クラスについても、大阪市の独自施策で軽減が進んでいます。</p>

<h2>副食費の免除</h2>
<p>第3子以降の子どもは、一定の条件のもとで<strong>副食費（給食費）が免除</strong>される場合があります。</p>

<div class="info-box">
<p><strong>確認を</strong></p>
<p>第3子以降の保育料や副食費の免除条件は年度によって変更される場合があります。詳しくはお住まいの区の保健福祉センターにご確認ください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 40,
  },

  // 26. tanshin-funin（点数アップ/amber/35）
  {
    slug: "tanshin-funin",
    citySlug: "osaka",
    title: "大阪市で単身赴任中の保活｜点数への影響と手続き",
    description:
      "大阪市で配偶者が単身赴任中の場合の保育園入園点数への影響と、必要な手続きについて解説します。",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>単身赴任と保活の点数</h2>
<p>配偶者が単身赴任で大阪市外に住んでいる場合でも、保育園の申込は可能です。点数は通常通り父母それぞれの就労状況に基づいて計算されます。</p>

<h3>基本的な考え方</h3>
<ul>
<li>父母の就労状況がそれぞれ証明できれば、<strong>通常通りの点数</strong>が付きます</li>
<li>単身赴任であること自体による特別な加点は、大阪市の公開資料では明記されていません</li>
<li>ただし、保育の必要性が高い状況として考慮される可能性はあります</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>単身赴任中で日常的に子どもの送迎ができない状況は、保活において不利ではありません。片方の保護者がフルタイム就労（100点）であれば、基本点数はしっかり確保できます。</p>
</div>

<h2>必要な手続き</h2>
<div class="step">
<div class="step-num">1</div>
<div class="step-content"><strong>両方の就労証明書を提出</strong><p>単身赴任中の配偶者の就労証明書も必要です。赴任先の勤務先に発行を依頼しましょう。</p></div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content"><strong>世帯の状況を説明</strong><p>申込時に単身赴任の状況を区の保健福祉センターに伝えておくとスムーズです。</p></div>
</div>

<div class="info-box">
<p><strong>確認を</strong></p>
<p>単身赴任に関する利用調整上の扱いは、お住まいの区の保健福祉センターにお問い合わせください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 35,
  },

  // 27. sofu-sobo-doukyo（点数アップ/amber/45）
  {
    slug: "sofu-sobo-doukyo",
    citySlug: "osaka",
    title: "大阪市で祖父母と同居・近居の場合の保育園点数への影響",
    description:
      "大阪市で祖父母と同居または近居している場合の保育園入園点数への影響と対策を解説します。",
    image:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>祖父母の同居・近居は点数に影響する？</h2>
<p>大阪市の利用調整基準では、<strong>同居の祖父母が保育できる状況</strong>にある場合、調整指数で<strong>減点</strong>される可能性があります。</p>

<h3>減点の条件</h3>
<ul>
<li>同居の祖父母（65歳未満）がいて、就労等の「保育できない理由」がない場合</li>
<li>近居（同一区内等）の祖父母がいる場合にも減点対象になることがある</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>祖父母が就労している、高齢である、疾病がある等の場合は「保育ができない」と判断され、減点されないことがあります。祖父母の状況を証明する書類を準備しましょう。</p>
</div>

<h2>減点を回避する方法</h2>
<div class="step">
<div class="step-num">1</div>
<div class="step-content"><strong>祖父母の就労証明書を提出</strong><p>祖父母が働いている場合は就労証明書を提出すると、減点を回避できる可能性があります。</p></div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content"><strong>祖父母の健康状態を証明</strong><p>高齢や疾病で保育が困難な場合は、医師の診断書等を添付しましょう。</p></div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content"><strong>区の窓口に相談</strong><p>減点の基準は年度によって変わる場合があります。事前に区の保健福祉センターに確認しましょう。</p></div>
</div>

<div class="info-box">
<p><strong>確認を</strong></p>
<p>祖父母に関する減点の詳細な基準は、お住まいの区の保健福祉センターにお問い合わせください。年度によって変更される場合があります。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 45,
  },

  // 28. fushoninchi-taiou（保活の基本/green/55）
  {
    slug: "fushoninchi-taiou",
    citySlug: "osaka",
    title: "大阪市で保育園が不承諾（落ちた）場合の対処法",
    description:
      "大阪市の保育園選考で不承諾になった場合にとるべき行動を、2次調整・認可外・途中入園など選択肢ごとに解説します。",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>不承諾になったらまずやること</h2>
<p>1次調整で不承諾の通知が届いても、まだチャンスはあります。落ち着いて次のアクションに移りましょう。</p>

<div class="step">
<div class="step-num">1</div>
<div class="step-content"><strong>2次調整の空き情報を確認</strong><p>1次結果と同時に空き施設の情報が公表されます。すぐに確認しましょう。</p></div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content"><strong>希望施設の変更を検討</strong><p>空きのある園に希望を切り替えることで、2次調整での内定の可能性が高まります。</p></div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content"><strong>認可外保育施設を並行して探す</strong><p>企業主導型保育園や認可外保育園は園と直接契約できます。4月入園に間に合う園がないか探しましょう。</p></div>
</div>
<div class="step">
<div class="step-num">4</div>
<div class="step-content"><strong>途中入園の申込を続ける</strong><p>4月以降も毎月の途中入園の利用調整があります。自動的に対象になりますが、希望園の変更は都度手続きが必要です。</p></div>
</div>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>認可外保育施設に預けながら翌年の4月入園を再度申し込む方法が、点数面でも有利です。認可外の利用実績で調整指数の加点（+5〜+7点）が得られます。</p>
</div>

<h2>育休延長が必要な場合</h2>
<p>保育園に入れなかった場合、育休を延長できます。不承諾通知（利用保留通知）を勤務先に提出して手続きを進めましょう。</p>

<div class="info-box">
<p><strong>確認を</strong></p>
<p>途中入園の空き状況は<a href="https://www.city.osaka.lg.jp/kodomo/" target="_blank" rel="noopener">大阪市こども青少年局</a>のサイトで毎月更新されます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 55,
  },

  // 29. taiki-jidou-taisaku（保活の基本/green/50）
  {
    slug: "taiki-jidou-taisaku",
    citySlug: "osaka",
    title: "大阪市の待機児童対策と最新動向",
    description:
      "大阪市が進めている待機児童対策の最新動向と、保活への影響について解説します。",
    image:
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>大阪市の待機児童の状況</h2>
<p>大阪市はこども青少年局保育施策部を中心に待機児童対策を進めています。保育施設の新設や小規模保育事業の拡充により、待機児童数は減少傾向にあります。</p>

<h3>主な取り組み</h3>
<ul>
<li><strong>保育施設の新設・定員増</strong>：認可保育園や認定こども園の整備を推進</li>
<li><strong>小規模保育事業の拡充</strong>：0〜2歳児の受け皿として小規模保育事業所を増設</li>
<li><strong>保育士確保策</strong>：保育士の処遇改善や就職支援による人材確保</li>
<li><strong>企業主導型保育の活用</strong>：企業主導型保育園の設置促進</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>待機児童数が減少しても、特定の区や年齢クラスでは依然として入園が難しい状況があります。全体の数字だけでなく、希望する区・年齢の状況を個別に確認することが重要です。</p>
</div>

<h2>「隠れ待機児童」に注意</h2>
<p>国の定義では待機児童に含まれないものの、希望する園に入れていない「隠れ待機児童」も多くいます。以下のケースは待機児童にカウントされません。</p>
<ul>
<li>認可外保育施設に通いながら認可園を待っている</li>
<li>特定の園のみを希望している</li>
<li>育休を延長して待っている</li>
</ul>

<div class="info-box">
<p><strong>確認を</strong></p>
<p>大阪市の待機児童数や保育施策の最新情報は<a href="https://www.city.osaka.lg.jp/kodomo/" target="_blank" rel="noopener">大阪市こども青少年局</a>の公式サイトでご確認ください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 50,
  },

  // 30. tennen-moshikomi（保活の基本/green/35）
  {
    slug: "tennen-moshikomi",
    citySlug: "osaka",
    title: "大阪市の保育園転園申込の方法と注意点",
    description:
      "大阪市で現在通っている保育園から別の園に転園したい場合の申込方法、点数の考え方、注意点を解説します。",
    image:
      "https://images.unsplash.com/photo-1544776193-352d25ca82cd?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>転園申込のしくみ</h2>
<p>大阪市で保育園に在園中の方が別の認可保育園に移りたい場合、<strong>転園申込</strong>が必要です。通常の入園申込と同じく利用調整（点数制）で選考されます。</p>

<h3>転園の主な理由</h3>
<ul>
<li>引っ越しで通園が遠くなった</li>
<li>きょうだいと同じ園に通わせたい</li>
<li>園の保育方針が合わない</li>
<li>小規模保育の卒園に伴う3歳児移行</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>転園申込は新規入園の申込と同じ利用調整の対象です。在園中であっても特別な優先はなく、点数による選考になります。ただし、きょうだいが希望先に在園している場合はきょうだい加点が付きます。</p>
</div>

<h2>転園申込の手続き</h2>
<div class="step">
<div class="step-num">1</div>
<div class="step-content"><strong>区の保健福祉センターに相談</strong><p>転園を希望する旨を伝え、必要書類を確認します。</p></div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content"><strong>転園申込書を提出</strong><p>4月一斉入所に合わせて申し込むか、途中入園として随時申し込むかを選べます。</p></div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content"><strong>結果を待つ</strong><p>転園先に空きがあり、点数が足りれば内定します。内定しなかった場合は現在の園に引き続き通えます。</p></div>
</div>

<h2>転園時の注意点</h2>
<ul>
<li><strong>転園が決まると元の園には戻れない</strong>：転園先が合わなくても、元の園の席は保証されません</li>
<li><strong>慣らし保育がある</strong>：新しい園でも慣らし保育からのスタートになります</li>
<li><strong>保育料は変わらない</strong>：認可保育園間の転園であれば保育料は所得に応じた額のままです</li>
</ul>

<div class="info-box">
<p><strong>確認を</strong></p>
<p>転園申込の手続きはお住まいの区の保健福祉センターにお問い合わせください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 35,
  },
];

registerArticles(articles);
