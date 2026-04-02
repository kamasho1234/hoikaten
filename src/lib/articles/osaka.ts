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
];

registerArticles(articles);
