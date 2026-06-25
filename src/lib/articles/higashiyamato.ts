import type { Article } from "./types";
import { registerArticles } from "./index";

const higashiyamatoArticles: Article[] = [
  {
    slug: "higashiyamato-guide",
    citySlug: "higashiyamato",
    title: "東大和市の保活ガイド｜基準指数50点制と入園の基本",
    description:
      "東大和市の保育園入園選考で使われる基準指数システムを解説。合計方式（父最大50点＋母最大50点＋調整指数）の仕組みと入園スケジュールをまとめました。",
    image:
      "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>東大和市の保育園入園制度</h2>
<p>東大和市の保育園入園選考は<span class="highlight">基準指数の合計方式</span>を採用しています。父母それぞれの基準指数を合計し、さらに調整指数を加算して世帯の選考点を決定します。</p>

<h3>点数の構成</h3>
<p>東大和市では父母各最大<strong>50点</strong>、合計で最大100点の基準指数に調整指数を加えて選考が行われます。</p>

<h3>基準指数の主な区分</h3>
<ul>
<li>就労：最高50点（月20日以上・月160時間以上で50点）</li>
<li>疾病（入院・臥床）：50点</li>
<li>障害（1・2級）：50点</li>
<li>出産前後：40点</li>
<li>就学（月120時間以上）：40点</li>
<li>求職活動：20点</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>東大和市は就労の点数が非常に細かく設定されており、月48時間から月160時間以上まで7段階に分かれています。フルタイム勤務であれば50点が付与されます。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳細は<a href="https://www.city.higashiyamato.lg.jp/" target="_blank" rel="noopener">東大和市公式サイト</a>の保育施設入園手続きページをご確認ください。</p>
</div>`,
    publishedAt: "2026-06-09",
    popularity: 75,
  },

  {
    slug: "higashiyamato-scoring-system",
    citySlug: "higashiyamato",
    title: "東大和市の基準指数システム徹底解説｜50点×2の合計方式",
    description:
      "東大和市の保育園入園で使われる基準指数システムのしくみを解説。就労時間の7段階評価、調整指数の加点、合計方式の考え方をわかりやすくまとめました。",
    image:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>基準指数の計算方法</h2>
<p>東大和市の選考指数は以下の式で決まります。</p>
<p><strong>選考指数 = 父の基準指数 + 母の基準指数 + 調整指数</strong></p>

<h3>就労の基準指数（7段階）</h3>
<table>
<tr><th>就労状況</th><th>基準指数</th></tr>
<tr><td>月20日以上・月160時間以上</td><td>50点</td></tr>
<tr><td>月140時間以上160時間未満</td><td>49点</td></tr>
<tr><td>月120時間以上140時間未満</td><td>47点</td></tr>
<tr><td>月100時間以上120時間未満</td><td>40点</td></tr>
<tr><td>月80時間以上100時間未満</td><td>38点</td></tr>
<tr><td>月60時間以上80時間未満</td><td>34点</td></tr>
<tr><td>月48時間以上60時間未満</td><td>29点</td></tr>
</table>

<h3>その他の基準指数</h3>
<table>
<tr><th>区分</th><th>基準指数</th></tr>
<tr><td>入院・常時臥床</td><td>50点</td></tr>
<tr><td>障害1・2級</td><td>50点</td></tr>
<tr><td>障害3・4級</td><td>30点</td></tr>
<tr><td>災害復旧</td><td>50点</td></tr>
<tr><td>出産前後</td><td>40点</td></tr>
<tr><td>就学（月120h以上）</td><td>40点</td></tr>
<tr><td>就学（月48〜120h未満）</td><td>25点</td></tr>
<tr><td>求職活動</td><td>20点</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>東大和市は月160時間以上で50点と高い上限が設定されています。両親フルタイムなら基本指数だけで100点となり、多摩地域でも高水準の点数体系です。</p>
</div>`,
    publishedAt: "2026-06-09",
    popularity: 85,
  },

  {
    slug: "higashiyamato-employment-points",
    citySlug: "higashiyamato",
    title: "東大和市の就労点数計算｜月間時間数で最大50点の仕組み",
    description:
      "東大和市の保育園入園で就労による基準指数がどのように計算されるかを解説。月48時間から160時間以上まで7段階の詳細な点数制度をまとめました。",
    image:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>就労時間と基準指数の関係</h2>
<p>東大和市では月間の就労日数と就労時間で基準指数が決まります。最大50点で、7段階に分かれています。</p>

<h3>計算例</h3>
<ul>
<li>週5日×8時間（フルタイム）：月160時間以上 → 50点</li>
<li>週5日×7時間：月140時間程度 → 49点</li>
<li>週4日×8時間：月128時間程度 → 47点</li>
<li>週4日×6時間：月96時間程度 → 38点</li>
<li>週3日×5時間：月60時間程度 → 34点</li>
</ul>

<h2>両親フルタイムの場合</h2>
<p>両親ともフルタイム勤務の場合：50 + 50 = <strong>100点</strong>。これに調整指数が加算されます。</p>

<h2>パートタイム勤務の場合</h2>
<p>月48時間以上であれば29点が付与されます。週12時間程度のパートでも対象になります。</p>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>月48時間未満の就労は基準指数の対象外です。週12時間以上の勤務実績が必要です。</p>
</div>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>東大和市は月140時間で49点、月160時間で50点と、上位の差がわずか1点です。月120〜140時間は47点で、そこから上は差が小さいため、フルタイムに近い勤務なら大きな差はつきにくい設計です。</p>
</div>`,
    publishedAt: "2026-06-09",
    popularity: 80,
  },

  {
    slug: "higashiyamato-adjustment-items",
    citySlug: "higashiyamato",
    title: "東大和市の調整指数チェックリスト｜育休復帰+10が最大の加点",
    description:
      "東大和市の保育園選考で使われる調整指数をチェックリスト形式でまとめました。育休復帰加点+10、ひとり親加点、多子世帯加点など該当する加点を確認しましょう。",
    image:
      "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>調整指数の一覧</h2>
<table>
<tr><th>項目</th><th>加点</th></tr>
<tr><td>育児休業終了時の再入所</td><td>+10</td></tr>
<tr><td>ひとり親（離別等から3か月以内）</td><td>+8</td></tr>
<tr><td>ひとり親（3か月経過）</td><td>+7</td></tr>
<tr><td>児童に障害あり（手帳所持等）</td><td>+6</td></tr>
<tr><td>家庭的保育事業終了後</td><td>+5</td></tr>
<tr><td>多子世帯（3人以上・多胎児）</td><td>+4</td></tr>
<tr><td>多子世帯（2人）</td><td>+3</td></tr>
<tr><td>きょうだい同園希望</td><td>+3</td></tr>
<tr><td>生活保護受給</td><td>+3</td></tr>
<tr><td>市内保育所勤務（月120h以上）</td><td>+3</td></tr>
<tr><td>海外赴任</td><td>+2</td></tr>
<tr><td>国内赴任</td><td>+1</td></tr>
<tr><td>認可外保育利用</td><td>+1</td></tr>
<tr><td>深夜勤務</td><td>+1</td></tr>
<tr><td>保育料滞納（6か月以上）</td><td>-3</td></tr>
</table>

<h3>育休復帰の加点が手厚い</h3>
<p>東大和市の特徴は<strong>育休復帰の加点が+10</strong>と非常に大きいことです。フルタイム勤務（50点×2）+ 育休復帰（+10）で合計110点となり、非常に有利です。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>複数の調整指数に該当する場合は合算されます。育休復帰+10とひとり親+8で計+18の加算が可能です。</p>
</div>`,
    publishedAt: "2026-06-09",
    popularity: 88,
  },

  {
    slug: "higashiyamato-schedule-timeline",
    citySlug: "higashiyamato",
    title: "東大和市の保育園入園スケジュール｜令和8年度の申込から入園まで",
    description:
      "東大和市の保育園入園の流れをスケジュール形式で解説。一次申込、選考、結果通知から入園までのタイムラインをまとめました。",
    image:
      "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>東大和市の入園スケジュール</h2>
<p>東大和市の保育園入園は以下のスケジュールで進みます。4月入園の場合は秋から手続きが始まります。</p>

<h3>4月入園の場合</h3>
<table>
<tr><th>時期</th><th>手続き内容</th></tr>
<tr><td>9月下旬</td><td>入園案内・申込書の配布開始</td></tr>
<tr><td>10月中旬〜11月上旬</td><td>一次申込期間</td></tr>
<tr><td>1月下旬</td><td>選考結果通知</td></tr>
<tr><td>3月上旬</td><td>入園前面接</td></tr>
<tr><td>4月1日</td><td>入園</td></tr>
</table>

<h2>必要書類</h2>
<ul>
<li>入園申込書</li>
<li>就労証明書（両親分）</li>
<li>保育が必要な事由の証明書類</li>
<li>調整指数に該当する証明書類</li>
</ul>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>最新のスケジュールは<a href="https://www.city.higashiyamato.lg.jp/" target="_blank" rel="noopener">東大和市公式サイト</a>で確認してください。</p>
</div>`,
    publishedAt: "2026-06-09",
    popularity: 72,
  },

  {
    slug: "higashiyamato-strategy-tips",
    citySlug: "higashiyamato",
    title: "東大和市の保活攻略法｜育休復帰加点を最大限活用する方法",
    description:
      "東大和市で保育園入園を成功させるための実践的な戦略。育休復帰加点+10の活用、就労時間の最適化、園選びのコツをまとめました。",
    image:
      "https://images.unsplash.com/photo-1473649085228-583485e6e4d7?w=800&h=400&fit=crop",
    category: "保活のコツ",
    categoryColor: "amber",
    content: `<h2>東大和市の保活3つの戦略</h2>

<h3>戦略1：育休復帰加点+10を活用</h3>
<p>東大和市最大の特徴は<strong>育休復帰の加点が+10</strong>と非常に大きいことです。育休からの復帰を前提に申し込むことで、大きなアドバンテージが得られます。</p>

<h3>戦略2：就労時間を最適化</h3>
<p>月120時間以上で47点、月140時間以上で49点、月160時間以上で50点です。月120時間を超えると47点以上が確保でき、上位との差は小さくなります。</p>

<h3>戦略3：調整指数を漏れなく申告</h3>
<ul>
<li>きょうだい同園希望：+3</li>
<li>多子世帯：+3〜4</li>
<li>認可外保育利用：+1</li>
</ul>
<p>小さな加点でも合計すると大きな差になります。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>両親フルタイム（100点）+ 育休復帰（+10）+ きょうだい同園（+3）= 113点。この水準であれば多くの園で内定が期待できます。</p>
</div>`,
    publishedAt: "2026-06-09",
    popularity: 78,
  },

  {
    slug: "higashiyamato-nearby-comparison",
    citySlug: "higashiyamato",
    title: "東大和市と周辺自治体の保活比較｜武蔵村山市・東村山市・立川市との違い",
    description:
      "東大和市と周辺自治体（武蔵村山市・東村山市・立川市）の保活事情を比較。点数制の仕組み、難易度、待機児童の状況をまとめました。",
    image:
      "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=400&fit=crop",
    category: "保活のコツ",
    categoryColor: "amber",
    content: `<h2>東大和市周辺の保活比較</h2>
<table>
<tr><th>自治体</th><th>計算方式</th><th>片親最大</th><th>特徴</th></tr>
<tr><td>東大和市</td><td>合計方式</td><td>50点</td><td>育休復帰+10が大きい</td></tr>
<tr><td>武蔵村山市</td><td>合計方式</td><td>50点</td><td>保育従事者+15が大きい</td></tr>
<tr><td>東村山市</td><td>合計方式</td><td>20点</td><td>立川市と同水準</td></tr>
<tr><td>立川市</td><td>合計方式</td><td>20点</td><td>ひとり親+10が大きい</td></tr>
</table>

<p>東大和市と武蔵村山市は片親最大50点と高い上限設定で、点数の差がつきやすい設計です。東村山市・立川市は片親最大20点で、より差がつきにくい設計です。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>東大和市は自然豊かな環境で保育園の競争率が比較的穏やかです。転居も含めて検討する場合は、各自治体の最新の待機児童数を確認しましょう。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>各自治体の最新情報は公式サイトで確認してください。</p>
</div>`,
    publishedAt: "2026-06-09",
    popularity: 68,
  },

  {
    slug: "higashiyamato-faq",
    citySlug: "higashiyamato",
    title: "東大和市の保活Q&A｜よくある質問と回答",
    description:
      "東大和市の保育園入園に関するよくある質問をまとめました。点数計算、調整指数、申し込み手続きについての疑問を解決します。",
    image:
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=400&fit=crop",
    category: "よくある質問",
    categoryColor: "rose",
    content: `<h2>点数計算に関する質問</h2>

<h3>Q：フルタイムで50点になる条件は？</h3>
<p><strong>A:</strong> 月20日以上かつ月160時間以上の就労が必要です。週5日×1日8時間勤務が目安になります。</p>

<h3>Q：パートタイムでも点数はつきますか？</h3>
<p><strong>A:</strong> はい。月48時間以上（週12時間程度）であれば29点が付与されます。月80時間以上なら38点です。</p>

<h3>Q：育休中でも申し込めますか？</h3>
<p><strong>A:</strong> はい。育休からの復帰予定がある場合は就労の基準指数が適用され、さらに育休復帰の調整指数+10が加算されます。</p>

<h2>調整指数に関する質問</h2>

<h3>Q：ひとり親で育休復帰の場合、加点はいくつ？</h3>
<p><strong>A:</strong> ひとり親（+8）+ 育休復帰（+10）= +18の加算となります。複数の調整指数は合算されます。</p>

<h3>Q：保育料を滞納しているとどうなりますか？</h3>
<p><strong>A:</strong> 6か月以上の滞納がある場合、-3点の減点となります。申し込み前に完納しておくことをお勧めします。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>その他の質問は、東大和市子育て支援部保育課にお問い合わせください。</p>
</div>`,
    publishedAt: "2026-06-09",
    popularity: 92,
  },

  {
    slug: "higashiyamato-area-guide",
    citySlug: "higashiyamato",
    title: "東大和市内の保育園事情｜地域別の特徴と園選び",
    description:
      "東大和市内の保育園分布を地域別に解説。玉川上水駅周辺、上北台駅周辺、郊外エリアの特徴をまとめました。",
    image:
      "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>東大和市の地域別保育園事情</h2>

<h3>玉川上水駅・東大和市駅周辺</h3>
<p>多摩モノレール沿線は子育て世帯が多く、保育園の需要が高いエリアです。</p>
<ul>
<li>交通利便性が高い</li>
<li>競争率はやや高め</li>
</ul>

<h3>上北台駅周辺</h3>
<p>モノレール終点の上北台駅周辺は住宅地として発展しており、保育施設も充実しています。</p>

<h3>市北部エリア</h3>
<p>武蔵村山市との境界エリアは比較的競争率が低い傾向にあります。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>東大和市は都心から離れているため全体的に保育園の競争率は穏やかですが、モノレール駅周辺は需要が集中する傾向があります。</p>
</div>`,
    publishedAt: "2026-06-09",
    popularity: 65,
  },

  {
    slug: "higashiyamato-trends-2026",
    citySlug: "higashiyamato",
    title: "東大和市の保活トレンド2026｜最新動向と変化",
    description:
      "東大和市の保活事情の最新トレンド。施設整備の状況、入園難易度の変化など2026年の保活事情をまとめました。",
    image:
      "https://images.unsplash.com/photo-1473649085228-583485e6e4d7?w=800&h=400&fit=crop",
    category: "保活のコツ",
    categoryColor: "amber",
    content: `<h2>2026年の東大和市保活事情</h2>
<p>東大和市では保育施設の整備が進み、待機児童の減少傾向が続いています。</p>

<h3>施設整備の状況</h3>
<ul>
<li>認可保育園の定員拡大</li>
<li>小規模保育施設の増設</li>
<li>認定こども園の活用促進</li>
</ul>

<h3>入園のポイント</h3>
<p>2026年度の申し込みでは、育休復帰の+10加点を活用することが最も効果的です。両親フルタイムに加えて育休復帰加点があれば、ほとんどの園で内定が期待できます。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>最新の施設情報は<a href="https://www.city.higashiyamato.lg.jp/" target="_blank" rel="noopener">東大和市公式サイト</a>で確認してください。</p>
</div>`,
    publishedAt: "2026-06-09",
    popularity: 55,
  },
];

registerArticles(higashiyamatoArticles);
